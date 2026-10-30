import './style.css';
import registry from '../../data/engineering_defaults_v0.3.json';
import { fromRegistry, simulate, frameAt, LABEL, VERSION, ENDING_DEFAULT, MOTION_DEFAULTS, CORNER_DEFAULTS } from './engine.js';
import { PARAMETER_UPDATES, parameterValue } from './parameters.js';
import { MATERIALS } from './materials.js';
import { DispenseScene, VIEW_LABELS } from './scene.js';
import { HARDWARE_REFERENCES } from './hardware-reference.js';
import { estimateCompression } from './compression.js';
import { tuneForVolume } from './tuning.js';
import { pageTemplate, ICONS, PATTERN_ICONS, PATTERN_NAMES } from './ui/template.js';
import { drawChart, moveCursor, CHARTS } from './ui/chart.js';

// ───────────────────────── helpers ─────────────────────────
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fmt = (n, d = 3) => (Number.isFinite(n) ? Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—');
const clean = (n) => (Number.isFinite(n) ? +Number(n).toPrecision(6) : n);
const BAR = 0.0689475729;
const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode */
    }
  },
};

// Per-material/architecture parameters; everything else carries over when switching scenario.
const PROFILE_KEYS = ['pressure', 'rpm', 'efficiency', 'delay', 'tauOn', 'tauOff', 'fill', 'residual', 'referenceRate', 'pressureExponent', 'viscosity', 'hoseId', 'hoseLength', 'reverseRpm', 'reverseDuration', 'density'];
const DEFAULT_HEAT = () => ({
  shape: 'rectangle',
  width: 30,
  depth: 30,
  offsetX: 0,
  offsetY: 0,
  gap: parameterValue(registry, 'assembly.gap'),
  cellSize: 0.5,
  power: parameterValue(registry, 'thermal.power'),
});
const DEFAULT_PATTERN = () => ({ pattern: 'n', spacing: 5, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' });

const S = {
  config: null,
  run: null,
  frame: null,
  time: 0,
  playing: false,
  clock: null,
  tab: 'equipment',
  chartType: 'q',
  chart: null,
  pressureUnit: 'psi',
  heat: DEFAULT_HEAT(),
  pattern: DEFAULT_PATTERN(),
  overrides: new Map(),
  baseline: null,
  press: null,
  pressBaseline: null,
  pressAnim: null,
  tuneFactor: 1.2,
  compare: null,
  busy: false,
};

// ───────────────────────── page ─────────────────────────
$('#app').innerHTML = pageTemplate(VERSION);
const theme = store.get('tim-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = theme;

function toast(text, kind = '') {
  const t = $('#toast');
  t.textContent = text;
  t.className = `visible ${kind}`;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (t.className = ''), 4200);
}

let scene;
try {
  scene = new DispenseScene($('#viewport'), {
    onScale(px, angle) {
      // Pick a round length whose projected bar is 36–110 px long.
      const mm = [0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500].find((v) => (px * v) / 10 >= 36) ?? 500;
      $('#scale-line').style.width = `${Math.min(110, (px * mm) / 10)}px`;
      $('#scale-label').textContent = `X 軸 ${mm} mm`;
      $('#scale-line').style.transform = `rotate(${angle > 90 ? angle - 180 : angle < -90 ? angle + 180 : angle}deg)`;
    },
    onView: () => cameraLabels(),
  });
  scene.setTheme(theme);
} catch (e) {
  $('#viewport').innerHTML = '<div class="webgl-error">無法啟動 3D 顯示，請使用啟用硬體加速的桌面瀏覽器。</div>';
  throw e;
}

// ───────────────────────── compute worker ─────────────────────────
let worker = null;
let jobId = 0;
const jobs = new Map();
try {
  worker = new Worker(new URL('./compute-worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = ({ data }) => {
    const job = jobs.get(data.id);
    if (!job) return;
    if (data.progress !== undefined) return job.progress?.(data.progress, data.label);
    jobs.delete(data.id);
    if (data.ok) job.resolve(data.result);
    else job.reject(new Error(data.error));
  };
  worker.onerror = () => (worker = null);
} catch {
  worker = null;
}
const slimRun = (run) => ({ config: run.config, summary: { deposits: run.summary.deposits }, path: run.path, gridStart: run.gridStart, cellLength: run.cellLength, maxHeight: run.maxHeight });
function compute(type, payload, progress) {
  if (worker)
    return new Promise((resolve, reject) => {
      const id = ++jobId;
      jobs.set(id, { resolve, reject, progress });
      worker.postMessage({ id, type, payload });
    });
  // Fallback on the main thread (e.g. file:// without module workers).
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        if (type === 'compress') resolve(estimateCompression(payload.run, { ...payload.heat, frames: payload.frames }));
        else reject(new Error('此瀏覽器不支援背景計算，無法執行圖樣比較'));
      } catch (e) {
        reject(e);
      }
    }, 30),
  );
}

// ───────────────────────── configuration ─────────────────────────
const pcp = () => S.config.architecture === 'P300';
const pathSettings = () => ({
  shape: S.heat.shape,
  width: S.heat.width,
  depth: S.heat.depth,
  offsetX: S.heat.offsetX,
  offsetY: S.heat.offsetY,
  pattern: S.pattern.pattern,
  spacing: S.pattern.spacing,
  edgeInset: S.pattern.edgeInset,
  spiralShape: S.pattern.spiralShape,
  spiralDirection: S.pattern.spiralDirection,
});
function materialize(c) {
  const next = { ...c, surfaceZ: c.fixtureHeight + c.thickness };
  if (next.mode === 'pattern') next.pathSettings = pathSettings();
  else delete next.pathSettings;
  return next;
}
function initialConfig(material = 'putty', architecture = 'R75') {
  return materialize({ ...fromRegistry(registry, material, architecture), mode: 'pattern' });
}

/** Simulate a candidate; on success it becomes the current configuration. */
function tryRecompute(candidate, { silent = false } = {}) {
  try {
    const next = materialize(candidate);
    const run = simulate(next);
    S.config = next;
    S.overrides.set(next.profile, Object.fromEntries(PROFILE_KEYS.map((k) => [k, next[k]])));
    applyRun(run);
    return true;
  } catch (e) {
    if (!silent) toast(e.message, 'error');
    renderTab();
    return false;
  }
}

function switchProfile(material, architecture) {
  const fresh = fromRegistry(registry, material, architecture);
  const saved = S.overrides.get(fresh.profile) || {};
  const carried = Object.fromEntries(Object.entries(S.config).filter(([k]) => !PROFILE_KEYS.includes(k) && !['material', 'architecture', 'profile'].includes(k)));
  const next = { ...fresh, ...carried, ...Object.fromEntries(PROFILE_KEYS.map((k) => [k, saved[k] ?? fresh[k]])) };
  next.material = material;
  next.architecture = architecture;
  next.profile = fresh.profile;
  if (!tryRecompute(next)) {
    $('#sel-material') && ($('#sel-material').value = S.config.material);
    $('#sel-arch') && ($('#sel-arch').value = S.config.architecture);
  }
}

// ───────────────────────── fields ─────────────────────────
const TAGS = { tds: ['TDS', 'tag-tds'], derived: ['推導', 'tag-derived'], ai: ['AI 初估', 'tag-ai'], geo: ['幾何', 'tag-geo'], spec: ['原廠', 'tag-tds'] };
function num({ bind, label, value, unit = '', min, max, tag, hint, disabled, step = 'any' }) {
  const [t, cls] = TAGS[tag] || [tag, 'tag-ai'];
  return `<label class="field${disabled ? ' disabled' : ''}"><span class="lbl">${label}${tag ? `<em class="tag ${cls}">${t}</em>` : ''}</span><span class="input"><input type="number" data-bind="${bind}" value="${clean(value)}" min="${min}" max="${max}" step="${step}" ${disabled ? 'disabled' : ''} aria-label="${esc(label)}"><b>${unit}</b></span>${hint ? `<small>${hint}</small>` : ''}</label>`;
}
function select({ bind, id, label, value, options, hint }) {
  return `<label class="field"><span class="lbl">${label}</span><select ${bind ? `data-bind="${bind}"` : ''} ${id ? `id="${id}"` : ''}>${options.map(([v, t]) => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${t}</option>`).join('')}</select>${hint ? `<small>${hint}</small>` : ''}</label>`;
}
const group = (title, body, { open = true, note } = {}) =>
  `<details class="group" ${open ? 'open' : ''}><summary>${title}</summary><div class="group-body">${body}${note ? `<p class="note">${note}</p>` : ''}</div></details>`;

function renderEquipment() {
  const c = S.config;
  const isPcp = pcp();
  const mat = MATERIALS[c.material];
  const method = isPcp ? '理想容積計量' : c.material === 'putty' ? 'TDS 參考點 × 冪律管流' : '常黏度 Poiseuille 圓管';
  const methodNote = isPcp
    ? `每轉 ${c.displacement} mL × 轉速 × 效率；滿腔與起停時間為假設。`
    : c.material === 'putty'
      ? `90 psi 時 75 g/min（TDS）；壓力冪次 m=${c.pressureExponent} 取自 Laird 點膠指南曲線形狀。Q ∝ P^m · d^(3+m) / L^m。`
      : '黏度 2,500,000 cP（TDS，Brookfield 2 rpm）暫作常數，不代表完整流變。';
  const q = S.run ? S.run.Q : 0;
  return `
  <div class="pair">
    ${select({ id: 'sel-material', label: '膠材', value: c.material, options: [['putty', 'Laird Tputty 910'], ['grease', 'Laird Tgrease 2500']] })}
    ${select({ id: 'sel-arch', label: '出膠架構', value: c.architecture, options: [['R75', 'R75 氣壓 75cc'], ['P300', 'P300 PCP']] })}
  </div>
  <div class="material-card" style="--glue:#${mat.color.toString(16).padStart(6, '0')}">
    <i></i><div><b>${mat.name}</b><span>${mat.kind}</span><span>k ${mat.conductivity} W/m·K · 最小 BLT ${mat.minBondLine * 1000} µm · ${mat.density} g/cc · ${mat.colorName}</span></div>
  </div>
  <div class="method"><span>${method}</span><strong>${fmt(q, 3)} <small>mL/s 穩態</small></strong><p>${methodNote}</p></div>
  ${group(
    '驅動與針嘴',
    (isPcp
      ? num({ bind: 'c.rpm', label: '計量軸轉速', value: c.rpm, unit: 'rpm', min: 0, max: 300, tag: 'ai' }) + num({ bind: 'c.efficiency', label: '容積效率', value: c.efficiency, unit: '', min: 0, max: 1, tag: 'ai' })
      : `<div class="with-btn">${num({ bind: 'c.pressure', label: '驅動表壓', value: S.pressureUnit === 'bar' ? c.pressure * BAR : c.pressure, unit: S.pressureUnit, min: 0, max: S.pressureUnit === 'bar' ? 6.89475729 : 100, tag: 'ai', hint: '控制器上限 100 psi（Performus X100 額定）' })}<button class="chip-btn" id="pressure-unit">${S.pressureUnit === 'psi' ? 'bar' : 'psi'}</button></div>`) +
      num({ bind: 'c.diameter', label: '虛擬針嘴內徑', value: c.diameter, unit: 'mm', min: 0.2, max: 8, tag: 'geo', hint: isPcp ? '只影響持膠量與外觀' : '0.125 in = 3.175 mm（指南曲線用嘴）' }) +
      num({ bind: 'c.nozzleLength', label: '等效直管長', value: c.nozzleLength, unit: 'mm', min: 1, max: 100, tag: 'ai', hint: isPcp ? '只影響持膠量' : '流量基準長度，非針嘴總長' }),
  )}
  ${group(
    '響應與材料模型',
    num({ bind: 'c.delay', label: '起膠延遲', value: c.delay, unit: 's', min: 0, max: 2, tag: 'ai' }) +
      num({ bind: 'c.tauOn', label: isPcp ? '起停時間常數' : '上升時間常數', value: c.tauOn, unit: 's', min: 0.001, max: 2, tag: 'ai' }) +
      (isPcp ? '' : num({ bind: 'c.tauOff', label: '卸壓下降時間常數', value: c.tauOff, unit: 's', min: 0.001, max: 2, tag: 'ai' })) +
      (!isPcp && c.material === 'putty'
        ? num({ bind: 'c.pressureExponent', label: '壓力冪次 m', value: c.pressureExponent, unit: '', min: 0.1, max: 4, tag: 'derived', hint: '指南曲線 20–100 psi 擬合 2.73；設 1 回到 v0.x 線性' }) +
          num({ bind: 'c.referenceRate', label: '90 psi 參考流率', value: c.referenceRate, unit: 'mL/s', min: 0, max: 10, tag: 'tds', hint: '75 g/min ÷ 3.2 g/cc；指南圖讀約 75 cc/min，單位待 Laird 確認' })
        : '') +
      (!isPcp && c.material === 'grease' ? num({ bind: 'c.viscosity', label: '等效黏度', value: c.viscosity, unit: 'Pa·s', min: 1, max: 100000, tag: 'tds' }) : ''),
    { open: false, note: '起停常數為 AI 初估；未含溫度效應（指南：低於 23 °C 流率下降，60–80 °C 加熱可改善）。' },
  )}
  ${group(
    '膠筒與預填管路',
    num({ bind: 'c.fill', label: '膠筒初始裝填', value: c.fill, unit: 'mL', min: c.residual, max: isPcp ? 300 : 75, tag: c.material === 'putty' ? 'tds' : 'ai', hint: c.material === 'putty' ? (isPcp ? '300cc 鋁筒裝填 300 cc（960 g）' : '75cc EFD 裝填 56 cc（179 g）') : `Tgrease 實際包材：${MATERIALS.grease.packaging}` }) +
      num({ bind: 'c.residual', label: '不可用殘量', value: c.residual, unit: 'mL', min: 0, max: c.fill, tag: 'ai' }) +
      (isPcp ? num({ bind: 'c.hoseId', label: '供料管內徑', value: c.hoseId, unit: 'mm', min: 1, max: 25, tag: 'ai' }) + num({ bind: 'c.hoseLength', label: '供料管長', value: c.hoseLength, unit: 'mm', min: 0, max: 5000, tag: 'ai' }) : ''),
    { open: false, note: isPcp ? '管路已預填，只計入持膠量；未求解壓降。畫面管路為示意。' : '氣室與氣管未分開求解；畫面氣管與控制器為示意。' },
  )}`;
}

function renderHeat() {
  const h = S.heat;
  const area = h.shape === 'circle' ? (Math.PI * h.width ** 2) / 4 : h.width * h.depth;
  const required = (area * h.gap) / 1000;
  const dep = S.run?.summary.deposited ?? 0;
  const ratio = required > 0 ? dep / required : 0;
  return `
  <p class="lead">熱源（元件接觸面）設定同時決定「依熱源」路徑與壓合／熱阻估算。偏移以工件中心為原點。</p>
  ${select({ bind: 'h.shape', label: '熱源形狀', value: h.shape, options: [['rectangle', '矩形'], ['circle', '圓形']] })}
  <div class="pair">
    ${num({ bind: 'h.width', label: h.shape === 'circle' ? '直徑' : '長 X', value: h.width, unit: 'mm', min: 1, max: 500, tag: 'ai' })}
    ${h.shape === 'circle' ? '' : num({ bind: 'h.depth', label: '寬 Y', value: h.depth, unit: 'mm', min: 1, max: 500, tag: 'ai' })}
  </div>
  <div class="pair">
    ${num({ bind: 'h.offsetX', label: '中心 X', value: h.offsetX, unit: 'mm', min: -500, max: 500 })}
    ${num({ bind: 'h.offsetY', label: '中心 Y', value: h.offsetY, unit: 'mm', min: -500, max: 500 })}
  </div>
  <div class="pair">
    ${num({ bind: 'h.gap', label: '組裝間隙 BLT', value: h.gap, unit: 'mm', min: 0.02, max: 10, tag: 'ai', hint: `${MATERIALS[S.config.material].name} 最小 ${MATERIALS[S.config.material].minBondLine} mm` })}
    ${num({ bind: 'h.power', label: '元件功耗', value: h.power, unit: 'W', min: 0, max: 10000, tag: 'ai' })}
  </div>
  <div class="volume-meter ${ratio < 1 ? 'low' : ratio > 1.6 ? 'high' : 'ok'}">
    <div><span>熱源間隙體積</span><b>${fmt(required, 3)} mL</b></div>
    <div><span>目前沉積</span><b>${fmt(dep, 3)} mL</b></div>
    <div><span>比值</span><b>${fmt(ratio, 2)}×</b></div>
    <i style="--w:${Math.min(100, (ratio / 2) * 100)}%"></i><em class="tick1"></em>
  </div>
  <div class="tune">
    ${num({ bind: 'x.tuneFactor', label: '目標膠量係數', value: S.tuneFactor, unit: '× 間隙體積', min: 0.3, max: 5, tag: 'ai', hint: '考慮溢膠與夾氣的餘量；1.2 為比較起點' })}
    <button class="secondary" id="tune">${S.config.mode === 'point' ? '自動調整開膠時間' : '自動調整移動速度'}</button>
  </div>
  <div class="actions">
    <button class="primary" id="press">${ICONS.press}<span>模擬壓合</span></button>
    <button class="secondary" id="compare">${ICONS.compare}<span>比較所有圖樣</span></button>
  </div>
  ${group('估算網格', num({ bind: 'h.cellSize', label: '網格解析度', value: h.cellSize, unit: 'mm', min: 0.2, max: 5, tag: 'ai', hint: '越小越細，計算時間增加；上限 90,000 格' }), { open: false })}
  <p class="note">壓合採平行板 Hele-Shaw 擠壓近似：被膠包圍的乾區視為夾氣。熱阻 =（間隙 ÷ k + TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。</p>`;
}

function renderPath() {
  const c = S.config;
  const p = S.pattern;
  const modes = [
    ['pattern', '依熱源'],
    ['line', '直線'],
    ['point', '單點'],
  ];
  let body = `<div class="seg full" role="group" aria-label="路徑模式">${modes.map(([m, t]) => `<button data-mode="${m}" class="${c.mode === m ? 'active' : ''}">${t}</button>`).join('')}</div>`;
  if (c.mode === 'pattern') {
    body += `<div class="patterns">${Object.keys(PATTERN_NAMES)
      .map((k) => `<button data-pattern="${k}" class="${p.pattern === k ? 'active' : ''}" title="${PATTERN_NAMES[k]}"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${PATTERN_ICONS[k]}</svg><span>${PATTERN_NAMES[k]}</span></button>`)
      .join('')}</div>`;
    if (p.pattern === 'spiral')
      body += `<div class="pair">${select({ bind: 'p.spiralShape', label: '螺旋形狀', value: p.spiralShape, options: [['auto', '依熱源'], ['square', '方形'], ['round', '圓形']] })}${select({ bind: 'p.spiralDirection', label: '起點', value: p.spiralDirection, options: [['outside-in', '外向內'], ['inside-out', '中心向外']] })}</div>`;
    body += `<div class="pair">${num({ bind: 'p.spacing', label: '路徑間距', value: p.spacing, unit: 'mm', min: 0.2, max: 1000, tag: 'ai' })}${num({ bind: 'p.edgeInset', label: '邊界內縮', value: p.edgeInset, unit: 'mm', min: 0, max: 500, tag: 'ai' })}</div>`;
    body += `<p class="note">路徑長 ${fmt(S.run?.pathLength, 1)} mm${S.run?.motion?.corners ? ` · ${S.run.motion.corners} 個減速轉角（最低 ${fmt(S.run.motion.slowestCorner, 1)} mm/s）` : ''}。內縮只限制針尖中心；Laird／Parker 指南提醒蛇形、螺旋、外框較易夾氣。</p>`;
  } else if (c.mode === 'line') {
    body += `<div class="pair">${num({ bind: 'c.lineLength', label: '路徑長度', value: c.lineLength, unit: 'mm', min: 1, max: 250, tag: 'ai' })}${num({ bind: 'c.offsetX', label: '中心 X', value: c.offsetX, unit: 'mm', min: -500, max: 500 })}</div>${num({ bind: 'c.offsetY', label: '中心 Y', value: c.offsetY, unit: 'mm', min: -500, max: 500 })}`;
  } else {
    body += `${num({ bind: 'c.gateDuration', label: '開膠時間', value: c.gateDuration, unit: 's', min: 0.001, max: 10, tag: 'ai' })}<div class="pair">${num({ bind: 'c.offsetX', label: '點位 X', value: c.offsetX, unit: 'mm', min: -500, max: 500 })}${num({ bind: 'c.offsetY', label: '點位 Y', value: c.offsetY, unit: 'mm', min: -500, max: 500 })}</div>`;
  }
  if (c.mode !== 'point') {
    body += group(
      '運動',
      `<div class="pair">${num({ bind: 'c.speed', label: '設定速度', value: c.speed, unit: 'mm/s', min: 1, max: 800, tag: 'ai' })}${num({ bind: 'c.acceleration', label: '加速度', value: c.acceleration, unit: 'mm/s²', min: 1, max: 10000, tag: 'ai' })}</div>` +
        (c.mode === 'pattern'
          ? select({ bind: 'c.cornerMode', label: '轉角速度', value: c.cornerMode, options: [['junction', '依轉角減速（junction deviation）'], ['off', '不減速（v0.7 對照）']] }) +
            (c.cornerMode === 'junction' ? num({ bind: 'c.junctionDeviation', label: '轉角偏差', value: c.junctionDeviation, unit: 'mm', min: 0.001, max: 5, tag: 'ai', hint: '越小轉角越慢、轉角積膠越多' }) : '')
          : ''),
    );
  }
  body += num({ bind: 'c.standoff', label: '針嘴離面高度', value: c.standoff, unit: 'mm', min: 0.1, max: 20, tag: 'ai', hint: '只做間距／干涉提示' });
  return body;
}

function renderEnding() {
  const c = S.config;
  const isPcp = pcp();
  let body = '';
  if (c.mode !== 'point')
    body += group(
      '提前關膠',
      num({ bind: 'c.shutoffDistance', label: '終點前關膠距離', value: c.shutoffDistance, unit: 'mm', min: 0, max: 250, tag: 'ai' }) +
        `<div class="seg full presets"><button data-shutoff="0">未補償 0 mm</button><button data-shutoff="${ENDING_DEFAULT.value}">初估 ${ENDING_DEFAULT.value} mm</button></div>`,
      { note: '先關膠、針嘴繼續走到終點；距離依當前加減速曲線換算成時間。提前過多會欠膠。' },
    );
  body += group(
    '退離動作',
    select({
      bind: 'c.endMotion',
      label: '退離方式',
      value: c.endMotion,
      options: [
        ['vertical', '垂直抬針'],
        ['diagonal', '邊升邊回退'],
        ['liftThenBack', '先抬高再回退'],
        ['legacy', 'v0.2 尾膠結算後抬針（對照）'],
      ],
    }) +
      (c.endMotion === 'legacy' ? '' : `<div class="with-btn">${num({ bind: 'c.endDwell', label: '終點停留', value: c.endDwell, unit: 's', min: 0, max: 5, tag: 'ai' })}<button class="chip-btn" data-dwell="0.3" title="Laird 910 指南：小點黏針時，移動前加 0.3–0.5 s 等待">指南 0.3 s</button></div>`) +
      `<div class="pair">${num({ bind: 'c.liftSpeed', label: '抬針速度', value: c.liftSpeed, unit: 'mm/s', min: 0.1, max: 200, tag: 'ai' })}${num({ bind: 'c.liftDistance', label: '抬針高度', value: c.liftDistance, unit: 'mm', min: 0.1, max: 50, tag: 'ai' })}</div>` +
      (['diagonal', 'liftThenBack'].includes(c.endMotion) && c.mode !== 'point'
        ? `<div class="pair">${num({ bind: 'c.backtrackDistance', label: '回退距離', value: c.backtrackDistance, unit: 'mm', min: 0, max: 50, tag: 'ai' })}${num({ bind: 'c.backtrackSpeed', label: '回退速度', value: c.backtrackSpeed, unit: 'mm/s', min: 0.1, max: 200, tag: 'ai' })}</div>`
        : ''),
    { note: 'Laird 910 指南建議小點黏針時「先左右移動再抬起」並停留 0.3–0.5 s；本模型只改軌跡與時序，不預測拉絲與落點。' },
  );
  body += isPcp
    ? group(
        'PCP 反轉回吸',
        `<div class="pair">${num({ bind: 'c.reverseDuration', label: '反轉時間', value: c.reverseDuration, unit: 's', min: 0, max: 2, tag: 'ai', hint: '0 = 停用' })}${num({ bind: 'c.reverseRpm', label: '反轉轉速', value: c.reverseRpm, unit: 'rpm', min: 0, max: 300, tag: 'ai' })}</div><button class="chip-btn wide" id="reverse-example">套用比較值 30 rpm / 0.05 s</button>`,
        { note: '只回收未出嘴的暫存量並獨立記帳；不吸回工件上的膠，未求解負壓或斷絲。' },
      )
    : `<p class="note">氣壓式關閉後以「卸壓下降時間常數」近似；不提供螺桿反轉。</p>`;
  return body;
}

function renderWorkpiece() {
  const c = S.config;
  const imported = c.workpieceKind !== 'plate';
  return `
  <div class="pair">${num({ bind: 'c.width', label: '工件長 X', value: c.width, unit: 'mm', min: 1, max: 1000, tag: 'geo', disabled: imported })}${num({ bind: 'c.depth', label: '工件寬 Y', value: c.depth, unit: 'mm', min: 1, max: 1000, tag: 'geo', disabled: imported })}</div>
  <div class="pair">${num({ bind: 'c.thickness', label: '厚度', value: c.thickness, unit: 'mm', min: 0.1, max: 200, tag: 'geo', disabled: imported })}${num({ bind: 'c.fixtureHeight', label: '治具支承高度', value: c.fixtureHeight, unit: 'mm', min: 0, max: 100, tag: 'ai' })}</div>
  ${group(
    '匯入工件',
    `<div class="pair"><label class="field"><span class="lbl">STL 單位</span><select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label class="field"><span class="lbl">STL 向上</span><select id="import-up"><option>Z</option><option>Y</option></select></label></div>
    <label class="file-button">載入 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label>
    ${imported ? `<p class="note">${esc(c.workpieceFile?.name || '')} · ${fmt(c.width, 2)} × ${fmt(c.depth, 2)} × ${fmt(c.thickness, 2)} mm</p><button class="chip-btn wide" id="clear-workpiece">恢復虛擬平板</button>` : ''}`,
    { open: imported, note: 'GLB／glTF 依規格以 m、Y 向上換算；STL 需指定單位與上方向。點膠面取上方水平參考面，未處理孔洞、曲面與碰撞。' },
  )}
  <p class="note">預設 150 × 100 × 5 mm 為虛擬壓鑄鋁平板（示意 RRU 腔體一角），非客戶工件。</p>`;
}

const RENDERERS = { equipment: renderEquipment, heat: renderHeat, path: renderPath, ending: renderEnding, workpiece: renderWorkpiece };
function renderTab() {
  const body = $('#tab-body');
  const scroll = body.scrollTop;
  const openGroups = $$('details.group', body).map((d) => d.open);
  body.innerHTML = RENDERERS[S.tab]();
  $$('details.group', body).forEach((d, i) => openGroups[i] !== undefined && (d.open = openGroups[i]));
  body.scrollTop = scroll;
  $$('[data-tab]').forEach((b) => {
    b.classList.toggle('active', b.dataset.tab === S.tab);
    b.setAttribute('aria-selected', b.dataset.tab === S.tab);
  });
  renderScenario();
}

$$('[data-tab]').forEach((b) =>
  b.addEventListener('click', () => {
    S.tab = b.dataset.tab;
    $('#tab-body').scrollTop = 0;
    renderTab();
  }),
);

// Delegated input handling for every bound field.
$('#tab-body').addEventListener('change', (e) => {
  const el = e.target;
  if (el.id === 'sel-material' || el.id === 'sel-arch') return switchProfile($('#sel-material').value, $('#sel-arch').value);
  if (el.id === 'workpiece-file') return importWorkpiece(el);
  const bind = el.dataset.bind;
  if (!bind) return;
  const [scope, key] = bind.split('.');
  let value = el.value;
  if (el.type === 'number') {
    if (!el.value.trim() || !el.checkValidity()) {
      toast('請輸入欄位範圍內的數值', 'error');
      return renderTab();
    }
    value = Number(el.value);
  }
  if (scope === 'x') {
    S.tuneFactor = value;
    return;
  }
  if (scope === 'c') {
    if (key === 'pressure' && S.pressureUnit === 'bar') value /= BAR;
    const next = { ...S.config, [key]: value };
    if (key === 'tauOn' && pcp()) next.tauOff = value;
    return tryRecompute(next);
  }
  const target = scope === 'h' ? 'heat' : 'pattern';
  const previous = S[target];
  S[target] = { ...previous, [key]: value };
  if (scope === 'h' && ['gap', 'cellSize', 'power'].includes(key)) {
    markPressStale();
    return renderTab();
  }
  if (!tryRecompute(S.config)) {
    S[target] = previous;
    renderTab();
  }
});

$('#tab-body').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.mode) return tryRecompute({ ...S.config, mode: b.dataset.mode });
  if (b.dataset.pattern) {
    const previous = S.pattern;
    S.pattern = { ...S.pattern, pattern: b.dataset.pattern };
    if (!tryRecompute(S.config)) S.pattern = previous;
    return;
  }
  if (b.dataset.shutoff !== undefined) return tryRecompute({ ...S.config, shutoffDistance: Number(b.dataset.shutoff) });
  if (b.dataset.dwell !== undefined) return tryRecompute({ ...S.config, endDwell: Number(b.dataset.dwell) });
  switch (b.id) {
    case 'pressure-unit':
      S.pressureUnit = S.pressureUnit === 'psi' ? 'bar' : 'psi';
      return renderTab();
    case 'reverse-example':
      return tryRecompute({ ...S.config, reverseRpm: 30, reverseDuration: 0.05 });
    case 'tune':
      return tune();
    case 'press':
      return runPress();
    case 'compare':
      return openCompare();
    case 'clear-workpiece':
      scene.clearImport();
      return tryRecompute({ ...S.config, width: 150, depth: 100, thickness: 5, workpieceKind: 'plate', workpieceFile: null });
  }
});

function tune() {
  const h = S.heat;
  const area = h.shape === 'circle' ? (Math.PI * h.width ** 2) / 4 : h.width * h.depth;
  const target = ((area * h.gap) / 1000) * S.tuneFactor;
  try {
    const t = tuneForVolume(S.config, target);
    tryRecompute(t.config);
    toast(
      t.reached
        ? `已調整${t.key === 'speed' ? `移動速度為 ${fmt(t.config.speed, 1)} mm/s` : `開膠時間為 ${fmt(t.config.gateDuration, 3)} s`}，沉積 ${fmt(S.run.summary.deposited, 3)} mL（目標 ${fmt(target, 3)}）`
        : `已達設備限制，最接近 ${fmt(S.run.summary.deposited, 3)} mL（目標 ${fmt(target, 3)}）；請改壓力、轉速或圖樣`,
      t.reached ? 'ok' : 'error',
    );
  } catch (e) {
    toast(e.message, 'error');
  }
}

async function importWorkpiece(input) {
  const file = input.files[0];
  if (!file) return;
  S.playing = false;
  try {
    const data = await scene.importFile(file, $('#import-unit').value, $('#import-up').value);
    if (tryRecompute({ ...S.config, ...data })) toast('工件已載入。請核對尺寸；點膠使用上方水平參考面。', 'ok');
  } catch (error) {
    toast(error.message, 'error');
  }
  input.value = '';
}

$('#defaults').onclick = () => {
  scene.clearImport();
  S.heat = DEFAULT_HEAT();
  S.pattern = DEFAULT_PATTERN();
  S.overrides.delete(S.config.profile);
  tryRecompute(initialConfig(S.config.material, S.config.architecture));
  toast('已恢復此情境的研究預設');
};

// ───────────────────────── run & results ─────────────────────────
function applyRun(run) {
  exitPress(false);
  S.playing = false;
  S.time = 0;
  S.run = run;
  S.frame = run.frames[0];
  scene.rebuild({ ...S.config, heatSource: { ...S.heat } }, run);
  scene.setOverlayVisibility({ heatSource: $('#show-heat').checked, exitPath: $('#show-exit').checked, plannedPath: $('#show-planned').checked });
  $('[data-view=feed]').disabled = !pcp();
  $('#scrubber').max = String(Math.ceil(run.duration * 1000));
  renderMarks();
  renderChart();
  renderTab();
  renderResults();
  renderState();
  cameraLabels();
}

function renderScenario() {
  const c = S.config;
  const mode = c.mode === 'pattern' ? `依熱源 · ${PATTERN_NAMES[S.pattern.pattern]}` : c.mode === 'line' ? '直線' : '單點';
  const drive = c.architecture === 'P300' ? `${fmt(c.rpm, 0)} rpm` : `${fmt(c.pressure, 0)} psi`;
  $('#scenario').innerHTML = [MATERIALS[c.material].name, c.architecture === 'P300' ? 'P300 PCP' : 'R75 氣壓', mode, drive, c.mode === 'point' ? `${fmt(c.gateDuration, 2)} s` : `${fmt(c.speed, 0)} mm/s`]
    .map((t, i) => `<span class="${i === 0 ? 'glue-chip' : ''}" ${i === 0 ? `style="--glue:#${MATERIALS[c.material].color.toString(16).padStart(6, '0')}"` : ''}>${esc(t)}</span>`)
    .join('');
}

function renderMarks() {
  const run = S.run;
  const e = run.ending;
  $('#marks').innerHTML = [
    ['off', e.commandOff, '關膠'],
    ['arrive', e.movementEnd, '到位'],
    ['lift', e.liftStart, '抬針'],
    ['exit', e.motionEnd, '退離'],
  ]
    .map(([k, t, label]) => `<button class="mark ${k}" style="left:${(t / run.duration) * 100}%" data-seek="${t}" title="${label} ${fmt(t, 3)} s"><span>${label}</span></button>`)
    .join('');
}
$('#marks').addEventListener('click', (e) => {
  const b = e.target.closest('[data-seek]');
  if (!b) return;
  exitPress();
  S.playing = false;
  S.time = Math.min(S.run.duration, Number(b.dataset.seek) + 1e-6);
  renderState();
});

function renderChart() {
  S.chart = drawChart($('#chart'), S.run, S.chartType, S.time, S.baseline?.run && S.baseline.run.frames ? S.baseline.run : null);
  $('#chart-unit').textContent = CHARTS[S.chartType].unit;
  $('#legend-command').hidden = S.chartType !== 'q';
  $('#legend-base').hidden = !S.baseline;
}
$$('[data-chart]').forEach((b) =>
  b.addEventListener('click', () => {
    S.chartType = b.dataset.chart;
    $$('[data-chart]').forEach((x) => x.classList.toggle('active', x === b));
    renderChart();
  }),
);
$('#chart').addEventListener('click', (e) => {
  const r = $('#chart').getBoundingClientRect();
  const t = S.chart.toTime(((e.clientX - r.left) / r.width) * 1000);
  exitPress();
  S.playing = false;
  S.time = Math.max(0, Math.min(S.run.duration, t));
  renderState();
});

function kpi(label, value, unit, hint = '', cls = '') {
  return `<div class="kpi ${cls}"><span>${label}</span><b>${value}<small>${unit}</small></b>${hint ? `<em>${hint}</em>` : ''}</div>`;
}

function renderResults() {
  const run = S.run;
  const c = S.config;
  const s = run.summary;
  const e = run.ending;
  const h = S.heat;
  const area = h.shape === 'circle' ? (Math.PI * h.width ** 2) / 4 : h.width * h.depth;
  const required = (area * h.gap) / 1000;
  const p = S.press?.result.summary;
  const stale = S.press?.stale;
  const ratio = e.endToMiddleRatio;
  const coverClass = (v) => (v >= 95 ? 'good' : v >= 80 ? 'warn' : 'bad');
  const ring = (pct) => {
    const r = 34;
    const L = 2 * Math.PI * r;
    return `<svg viewBox="0 0 84 84" class="ring ${coverClass(pct)}"><circle cx="42" cy="42" r="${r}" class="track"/><circle cx="42" cy="42" r="${r}" class="val" stroke-dasharray="${(Math.min(100, pct) / 100) * L} ${L}" transform="rotate(-90 42 42)"/><text x="42" y="46" text-anchor="middle">${fmt(pct, 1)}%</text></svg>`;
  };
  const warnings = [...run.warnings, ...(S.press && !stale ? S.press.result.warnings : [])];
  $('#results').innerHTML = `
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">完整試驗預估</span><span class="pill">${esc(c.profile)}</span></div>
    <div class="hero"><b>${fmt(s.deposited, 3)}</b><span>mL 工件沉積</span><em>${fmt(s.deposited * c.density, 3)} g · 出口總計 ${fmt(s.output, 3)} mL</em></div>
    <div class="kpis">
      ${kpi('熱源需求比', fmt(required > 0 ? s.deposited / required : 0, 2), '×', `需 ${fmt(required, 3)} mL`, required > 0 && s.deposited / required < 1 ? 'bad' : '')}
      ${kpi('開膠時間', fmt(run.gate, 2), 's', `動作完成 ${fmt(e.motionEnd, 2)} s`)}
      ${kpi('膠高 / 寬', `${fmt(s.maxHeight, 2)} / ${fmt(s.maxWidth, 1)}`, 'mm', `針距 ${fmt(c.standoff, 1)} mm`, s.maxHeight > c.standoff ? 'warn' : '')}
      ${kpi('末段 / 中段', ratio === null ? '—' : fmt(ratio, 2), '×', '0.5–1.5 為 AI 比較帶', ratio !== null && (ratio < 0.5 || ratio > 1.5) ? 'warn' : '')}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算</span>${S.press ? `<span class="pill ${stale ? 'pill-warn' : ''}">${stale ? '設定已變更' : `間隙 ${fmt(S.press.settings.gap, 2)} mm`}</span>` : ''}</div>
    ${
      p && !stale
        ? `<div class="press-grid">${ring(p.coveredPercent)}<div class="press-sum"><b>熱源等效覆蓋</b><span>沉積 ${fmt(p.depositedMl, 3)} mL = 間隙體積 ${fmt(p.volumeRatio, 2)}×</span><span>${esc(p.material)} · k ${p.thermal.conductivity} W/m·K</span></div></div><div class="kpis">
          ${kpi('夾氣區', p.voidCount, '處', p.voidCount ? `${fmt(p.voidAreaMm2, 1)} mm² · ${fmt(p.voidPercent, 1)}%` : '未偵測到', p.voidCount ? 'bad' : 'good')}
          ${kpi('溢出熱源', fmt(p.squeezeOutMm, 1), 'mm', `熱源外 ${fmt(p.outsideMl, 3)} mL`, p.squeezeOutMm > 3 ? 'warn' : '')}
          ${kpi('TIM 溫升', fmt(p.thermal.rise, 2), '°C', `滿覆蓋 ${fmt(p.thermal.idealRise, 2)} °C @ ${fmt(p.thermal.power, 0)} W`, p.thermal.rise > p.thermal.idealRise * 1.1 ? 'warn' : '')}
          ${kpi('熱阻', fmt(p.thermal.resistance, 4), 'K/W', `θ ${fmt(p.thermal.impedanceCm2, 3)} °C·cm²/W`)}
        </div>
        <div class="press-actions"><button class="chip-btn" id="press-replay">${ICONS.play}重播壓合</button><button class="chip-btn" id="press-save">保存壓合基準</button></div>
        ${S.pressBaseline ? `<div class="compare-box"><b>壓合基準 → 目前</b><p>覆蓋 ${fmt(S.pressBaseline.summary.coveredPercent, 1)}% → ${fmt(p.coveredPercent, 1)}%　夾氣 ${S.pressBaseline.summary.voidCount} → ${p.voidCount}　溫升 ${fmt(S.pressBaseline.summary.thermal.rise, 2)} → ${fmt(p.thermal.rise, 2)} °C</p><small>${esc(S.pressBaseline.describe)}</small></div>` : ''}`
        : `<div class="cta"><p>${stale ? '熱源或點膠設定已變更，請重新模擬。' : '以完整試驗的沉積分布估算壓合覆蓋、夾氣與熱阻。'}</p><button class="primary" id="press-cta">${ICONS.press}<span>模擬壓合</span></button><button class="secondary" id="compare-cta">${ICONS.compare}<span>比較所有圖樣</span></button></div>`
    }
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">即時帳目</span><span class="pill mono" id="led-t">t = 0.000 s</span></div>
    <dl class="ledger">
      <div><dt>TCP X / Y / Z</dt><dd id="led-xyz"></dd></div>
      <div><dt>移動速度</dt><dd id="led-v"></dd></div>
      <div><dt>膠筒剩餘</dt><dd id="led-rem"></dd></div>
      <div><dt>工件沉積</dt><dd id="led-dep"></dd></div>
      <div><dt>離面後出膠（形狀未定）</dt><dd id="led-off"></dd></div>
      ${pcp() ? '<div><dt>PCP 暫存 / 回收</dt><dd id="led-pend"></dd></div>' : ''}
      <div><dt>預填固定持膠</dt><dd id="led-fixed"></dd></div>
      <div><dt>體積對帳誤差</dt><dd id="led-bal"></dd></div>
    </dl>
  </section>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">收尾時序</span></div>
    <ol class="timeline">
      <li class="off"><b>${fmt(e.commandOff, 3)} s</b>關膠指令</li>
      <li class="arrive"><b>${fmt(e.movementEnd, 3)} s</b>到達終點</li>
      <li class="lift"><b>${fmt(e.liftStart, 3)} s</b>開始抬針</li>
      <li class="exit"><b>${fmt(e.motionEnd, 3)} s</b>退離完成</li>
    </ol>
    <p class="note">停移後流出 ${fmt(e.afterStopVolume * 1000, 2)} µL（${fmt(e.afterStopPercent, 1)}%）；其中離面後 ${fmt(s.offSurface * 1000, 2)} µL 未加入膠形。${pcp() && e.reverseStart !== null ? `回收暫存 ${fmt(s.recovered * 1000, 2)} µL。` : ''}</p>
  </section>
  <details class="card-sec warnings" ${warnings.length > 4 ? '' : 'open'}><summary><span class="eyebrow">提醒與模型界線</span><span class="count">${warnings.length}</span></summary>${warnings.map((w) => `<p>${esc(w)}</p>`).join('')}</details>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">基準比較</span><button class="chip-btn" id="save-baseline">保存目前為基準</button></div>
    ${baselineHtml()}
  </section>
  <section class="card-sec exports">
    <button class="chip-btn" id="export-json">${ICONS.download}配置 JSON</button>
    <button class="chip-btn" id="export-csv">${ICONS.download}結果 CSV</button>
    <button class="chip-btn" id="export-image">${ICONS.download}畫面 PNG</button>
  </section>
  <p class="fineprint">工程假設、未經實機校準；23 °C 參考條件。結果供方案相對比較，不能作為量產配方或驗收依據。</p>`;
}

function describe(c, heat) {
  const mode = c.mode === 'pattern' ? `${PATTERN_NAMES[c.pathSettings?.pattern] || ''}（間距 ${c.pathSettings?.spacing} mm）` : c.mode === 'line' ? `直線 ${c.lineLength} mm` : `單點 ${c.gateDuration} s`;
  return `${MATERIALS[c.material].name} · ${c.architecture} · ${mode} · ${c.architecture === 'P300' ? `${c.rpm} rpm` : `${fmt(c.pressure, 1)} psi`} · ${c.speed} mm/s${heat ? ` · 熱源 ${heat.width}${heat.shape === 'circle' ? ' Ø' : ` × ${heat.depth}`} mm / ${heat.gap} mm` : ''}`;
}

function baselineHtml() {
  const b = S.baseline;
  if (!b) return '<p class="note">保存基準後再調整參數，比較沉積量與配置差異；流量曲線會疊上基準。</p>';
  const d = S.run.summary.deposited - b.summary.deposited;
  const changed = Object.keys(S.config).filter((k) => typeof S.config[k] !== 'object' && S.config[k] !== b.config[k]);
  for (const k of new Set([...Object.keys(S.config.pathSettings || {}), ...Object.keys(b.config.pathSettings || {})]))
    if (S.config.pathSettings?.[k] !== b.config.pathSettings?.[k]) changed.push('pathSettings.' + k);
  const val = (cfg, k) => (k.startsWith('pathSettings.') ? (cfg.pathSettings?.[k.slice(13)] ?? '—') : cfg[k]);
  return `<div class="compare-box"><div class="delta"><span>${fmt(b.summary.deposited, 3)} → ${fmt(S.run.summary.deposited, 3)} mL</span><b class="${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '+' : ''}${fmt(d, 3)} mL</b></div>
    <details><summary>${changed.length ? `${changed.length} 個欄位不同` : '與基準配置相同'}</summary>${changed.map((k) => `<p><code>${esc(k)}</code> ${esc(val(b.config, k))} → ${esc(val(S.config, k))}</p>`).join('') || '<p>無</p>'}</details></div>`;
}

$('#results').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  switch (b.id) {
    case 'press-cta':
      return runPress();
    case 'compare-cta':
      return openCompare();
    case 'press-replay':
      return animatePress(true);
    case 'press-save':
      S.pressBaseline = { summary: structuredClone(S.press.result.summary), describe: describe(S.config, S.press.settings) };
      toast('已保存壓合基準', 'ok');
      return renderResults();
    case 'save-baseline':
      S.baseline = { config: structuredClone(S.config), summary: structuredClone(S.run.summary), run: { frames: S.run.frames.map((f) => ({ t: f.t, q: f.q, output: f.output, speed: f.speed, z: f.z })), duration: S.run.duration } };
      toast('已保存完整試驗結果為基準', 'ok');
      renderChart();
      return renderResults();
    case 'export-json':
      return download(JSON.stringify(exportRecord(), null, 2), 'TIM_工程假設_試驗配置.json', 'application/json');
    case 'export-csv':
      return exportCsv();
    case 'export-image':
      return exportImage();
  }
});

// ───────────────────────── live state ─────────────────────────
function renderState() {
  const run = S.run;
  const f = (S.frame = frameAt(run, S.time));
  if (!S.press) scene.update(f);
  $('#hud-t').textContent = fmt(f.t, 3);
  $('#hud-out').textContent = fmt(f.output, 3);
  $('#hud-q').textContent = fmt(f.q, 3);
  $('#hud-xyz').textContent = `${fmt(f.x, 1)}, ${fmt(f.y, 1)}, ${fmt(f.z, 1)}`;
  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  set('led-t', `t = ${fmt(f.t, 3)} s`);
  set('led-xyz', `${fmt(f.x, 1)} / ${fmt(f.y, 1)} / ${fmt(f.z, 2)} mm`);
  set('led-v', `${fmt(f.speed, 1)} mm/s`);
  set('led-rem', `${fmt(f.remaining, 3)} mL`);
  set('led-dep', `${fmt(f.deposited, 5)} mL`);
  set('led-off', `${fmt(f.offSurface * 1000, 2)} µL`);
  set('led-pend', `${fmt(f.pending * 1000, 2)} / ${fmt(f.recovered * 1000, 2)} µL`);
  set('led-fixed', `${fmt(f.fixed, 3)} mL`);
  set('led-bal', `${f.balance.toExponential(1)} mL`);
  $('#phase').textContent = S.press ? '壓合後估算 · 未校準' : S.time === 0 ? '就緒' : S.time >= run.duration ? '試驗完成' : S.playing ? f.phase : `已暫停 · ${f.phase}`;
  $('.phase').dataset.state = S.press ? 'press' : f.command ? 'dispense' : S.time >= run.duration ? 'done' : 'idle';
  const label = S.playing ? '暫停' : S.time >= run.duration ? '再次播放' : S.time > 0 ? '繼續' : '開始試驗';
  $('#play').innerHTML = `${S.playing ? ICONS.pause : ICONS.play}<span>${label}</span>`;
  $('#time-readout').textContent = `${fmt(f.t, 3)} / ${fmt(run.duration, 3)} s`;
  $('#scrubber').value = String(Math.round(S.time * 1000));
  $('#scrubber').style.setProperty('--p', `${(S.time / run.duration) * 100}%`);
  moveCursor($('#chart'), S.chart, S.time);
}

$('#play').onclick = () => {
  exitPress();
  if (S.time >= S.run.duration) S.time = 0;
  S.playing = !S.playing;
  S.clock = null;
  renderState();
};
$('#restart').onclick = () => {
  exitPress();
  S.playing = false;
  S.time = 0;
  renderState();
};
$('#step').onclick = () => {
  exitPress();
  S.playing = false;
  S.time = Math.min(S.run.duration, S.time + 0.010001);
  renderState();
};
$('#scrubber').oninput = (e) => {
  exitPress();
  S.playing = false;
  S.time = Math.min(S.run.duration, +e.target.value / 1000);
  renderState();
};
document.addEventListener('keydown', (e) => {
  if (e.target.closest('input, select, textarea, dialog')) return;
  if (e.code === 'Space') {
    e.preventDefault();
    $('#play').click();
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && S.playing) {
    S.playing = false;
    S.clock = null;
    renderState();
  }
});
function loop(now) {
  if (S.playing) {
    if (S.clock !== null) S.time = Math.min(S.run.duration, S.time + ((now - S.clock) / 1000) * Number($('#playback-speed').value));
    S.clock = now;
    if (S.time >= S.run.duration) S.playing = false;
    renderState();
  } else S.clock = null;
  requestAnimationFrame(loop);
}

// ───────────────────────── camera ─────────────────────────
function cameraLabels() {
  $$('[data-corner]').forEach((b) => b.classList.toggle('active', !scene.freeOrbit && Number(b.dataset.corner) === scene.isoCorner));
  $('#free-orbit').setAttribute('aria-pressed', String(scene.freeOrbit));
  $('#projection').setAttribute('aria-pressed', String(scene.projection === 'persp'));
  $('#projection-label').textContent = scene.projection === 'persp' ? '透視' : '正交';
  $$('[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === scene.mode));
  $('#camera-hint').textContent = scene.freeOrbit ? '左鍵旋轉 · 右鍵平移 · 滾輪縮放 · Home 重設' : '拖曳平移 · 滾輪縮放 · Home 重設';
  $('#view-label').textContent = `${VIEW_LABELS[scene.mode]} · ${scene.freeOrbit ? '自由旋轉' : `等角 ${scene.isoCorner + 1}`}${scene.projection === 'persp' ? ' · 透視' : ''}`;
  $('#geometry-note').textContent = S.press
    ? '透明板與覆蓋為未校準幾何估算'
    : ['whole', 'work', 'head', 'feed'].includes(scene.mode)
      ? '設備依公開外形參考 · 局部、支架與管路為示意'
      : '近看隱藏上部機構 · 膠形為幾何示意';
}
$$('[data-view]').forEach((b) =>
  b.addEventListener('click', () => {
    scene.fit(b.dataset.view);
    if (!S.press) scene.update(S.frame);
  }),
);
$$('[data-corner]').forEach((b) => b.addEventListener('click', () => scene.setCorner(Number(b.dataset.corner))));
$('#free-orbit').onclick = () => scene.setFreeOrbit(!scene.freeOrbit);
$('#projection').onclick = () => {
  scene.setProjection(scene.projection === 'ortho' ? 'persp' : 'ortho');
  cameraLabels();
};
$('#reset-camera').onclick = () => {
  scene.setFreeOrbit(false, false);
  scene.fit(scene.mode);
};
$('#show-exit').onchange = (e) => scene.setOverlayVisibility({ exitPath: e.target.checked });
$('#show-planned').onchange = (e) => scene.setOverlayVisibility({ plannedPath: e.target.checked });
$('#show-heat').onchange = (e) => scene.setOverlayVisibility({ heatSource: e.target.checked });
$('#theme').onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  store.set('tim-theme', next);
  scene.setTheme(next);
  $('#theme').innerHTML = next === 'dark' ? ICONS.sun : ICONS.moon;
};
$('#theme').innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;

// ───────────────────────── squeeze ─────────────────────────
function markPressStale() {
  if (S.press && !S.press.stale) {
    S.press.stale = true;
    renderResults();
  }
}
function exitPress(render = true) {
  cancelAnimationFrame(S.pressAnim);
  S.pressAnim = null;
  if (!S.press) return;
  S.press = null;
  scene.clearCompression();
  $('#press-bar').hidden = true;
  if (render) {
    renderResults();
    renderState();
    cameraLabels();
  }
}

async function runPress() {
  if (S.busy) return;
  S.busy = true;
  document.body.classList.add('busy');
  $$('#press, #press-cta').forEach((b) => (b.querySelector('span').textContent = '計算中…'));
  const heat = { ...S.heat };
  const run = S.run;
  try {
    const result = await compute('compress', { run: slimRun(run), heat, frames: 24 });
    // Discard a result computed for a run or heat settings that changed while it was running.
    if (run !== S.run || JSON.stringify(heat) !== JSON.stringify(S.heat)) {
      toast('計算期間設定已變更，請重新模擬壓合');
      return;
    }
    exitPress(false);
    S.playing = false;
    S.time = run.duration;
    renderState();
    S.press = { result, settings: heat, stale: false };
    const view = scene.showCompression(result, heat);
    scene.fit('heat');
    const scrub = $('#press-scrub');
    scrub.max = String(view.frameCount - 1);
    $('#press-bar').hidden = false;
    renderResults();
    renderState();
    cameraLabels();
    animatePress(true);
  } catch (e) {
    toast(`壓合估算失敗：${e.message}`, 'error');
  } finally {
    S.busy = false;
    document.body.classList.remove('busy');
    $$('#press, #press-cta').forEach((b) => b.querySelector('span') && (b.querySelector('span').textContent = '模擬壓合'));
  }
}

function showPressFrame(k) {
  const view = scene.compression;
  if (!view) return;
  scene.setCompressionFrame(k);
  const f = view.frames[k];
  $('#press-scrub').value = String(k);
  $('#press-gap').textContent = `間隙 ${fmt(f.gap, 3)} mm · 覆蓋 ${fmt(f.coveredPercent ?? S.press.result.summary.coveredPercent, 1)}%`;
}
function animatePress(fromStart) {
  const view = scene.compression;
  if (!view) return;
  cancelAnimationFrame(S.pressAnim);
  const n = view.frameCount;
  const t0 = performance.now();
  const startK = fromStart ? 0 : Number($('#press-scrub').value);
  const span = 2400 * ((n - 1 - startK) / Math.max(1, n - 1));
  const step = (now) => {
    const k = Math.max(startK, Math.min(n - 1, startK + Math.round((Math.max(0, now - t0) / Math.max(1, span)) * (n - 1 - startK))));
    showPressFrame(k);
    S.pressAnim = k < n - 1 ? requestAnimationFrame(step) : null;
  };
  S.pressAnim = requestAnimationFrame(step);
}
$('#press-scrub').oninput = (e) => {
  cancelAnimationFrame(S.pressAnim);
  showPressFrame(Number(e.target.value));
};
$('#press-play').onclick = () => animatePress(Number($('#press-scrub').value) >= scene.compression.frameCount - 1);
$('#press-exit').onclick = () => exitPress();
$$('[data-press-color]').forEach((b) =>
  b.addEventListener('click', () => {
    $$('[data-press-color]').forEach((x) => x.classList.toggle('active', x === b));
    scene.setCompressionColor(b.dataset.pressColor);
  }),
);

// ───────────────────────── pattern comparison ─────────────────────────
const COMPARE_PATTERNS = ['line', 'n', 'serpentine', 'spiral', 'perimeter'];
async function openCompare() {
  const dlg = $('#compare-dialog');
  if (!dlg.open) dlg.showModal();
  const matchVolume = S.compare?.matchVolume ?? true;
  const factor = S.compare?.factor ?? S.tuneFactor;
  const controls = `<div class="compare-controls"><label class="chk"><input type="checkbox" id="cmp-match" ${matchVolume ? 'checked' : ''}>等膠量比較（自動調整速度到需求 ×</label><input type="number" id="cmp-factor" value="${factor}" min="0.3" max="5" step="any"><span>）</span><button class="primary" id="cmp-run">${ICONS.compare}<span>重新計算</span></button></div>`;
  $('#compare-body').innerHTML = `${controls}<div class="progress"><i style="width:0%"></i></div><p class="note" id="cmp-status">計算中…</p>`;
  bindCompareControls();
  const config = { ...S.config, pathSettings: pathSettings() };
  const heat = { ...S.heat, cellSize: Math.max(0.5, S.heat.cellSize) };
  try {
    const result = await compute('compare', { config, heat, patterns: COMPARE_PATTERNS, factor, matchVolume }, (p, label) => {
      const bar = $('#compare-body .progress i');
      if (bar) bar.style.width = `${p * 100}%`;
      const st = $('#cmp-status');
      if (st) st.textContent = `計算 ${PATTERN_NAMES[label]}…`;
    });
    S.compare = { ...result, matchVolume, factor };
    renderCompare(controls);
  } catch (e) {
    $('#cmp-status').textContent = e.message;
  }
}
function bindCompareControls() {
  $('#cmp-run').onclick = () => {
    S.compare = { matchVolume: $('#cmp-match').checked, factor: Number($('#cmp-factor').value) || 1.2 };
    openCompare();
  };
}
function renderCompare(controls) {
  const r = S.compare;
  const ok = r.rows.filter((x) => x.ok);
  const best = (key, dir) => (ok.length ? ok.reduce((a, b) => ((dir > 0 ? b[key] > a[key] : b[key] < a[key]) ? b : a))[key] : null);
  const bestCover = best('coveredPercent', 1);
  const bestRise = best('rise', -1);
  const bestCycle = best('cycle', -1);
  $('#compare-body').innerHTML = `${controls}
  <p class="note">熱源 ${S.heat.shape === 'circle' ? `Ø${S.heat.width}` : `${S.heat.width} × ${S.heat.depth}`} mm、間隙 ${S.heat.gap} mm，需求 ${fmt(r.required, 3)} mL。${r.matchVolume ? `每個圖樣自動調整移動速度，使沉積 ≈ 需求 × ${r.factor}。` : '沿用目前速度與流量，膠量隨路徑長改變。'}其他設定沿用目前配置；網格 ≥ 0.5 mm。</p>
  <div class="table-scroll"><table class="cmp"><thead><tr><th>圖樣</th><th>速度<br><small>mm/s</small></th><th>沉積<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溢出<br><small>mm</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
  ${r.rows
    .map((x) =>
      x.ok
        ? `<tr><td><span class="pat"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PATTERN_ICONS[x.pattern]}</svg>${PATTERN_NAMES[x.pattern]}</span></td><td>${fmt(x.speed, 1)}</td><td class="${x.reached ? '' : 'warn'}" title="${x.reached ? '' : '加速度與轉角限制了平均速度，提高設定速度也無法再減少膠量；請降低壓力／轉速或增加間距'}">${fmt(x.deposited, 3)} <small>(${fmt(x.volumeRatio, 2)}×)</small>${x.reached ? '' : ' ⚠'}</td><td class="${x.coveredPercent === bestCover ? 'best' : ''}">${fmt(x.coveredPercent, 1)}</td><td class="${x.voidCount ? 'bad' : ''}">${x.voidCount} / ${fmt(x.voidAreaMm2, 1)}</td><td>${fmt(x.squeezeOutMm, 1)}</td><td class="${x.rise === bestRise ? 'best' : ''}">${fmt(x.rise, 2)}</td><td class="${x.cycle === bestCycle ? 'best' : ''}">${fmt(x.cycle, 2)}</td><td><button class="chip-btn" data-apply="${x.pattern}" data-speed="${x.speed}">套用</button></td></tr>`
        : `<tr><td>${PATTERN_NAMES[x.pattern]}</td><td colspan="8" class="bad">${esc(x.error)}</td></tr>`,
    )
    .join('')}
  </tbody></table></div>
  ${r.rows.some((x) => x.ok && !x.reached) ? '<p class="note warn-note">⚠ 該圖樣在目前加速度與轉角限制下無法達到目標膠量（提高設定速度已無效）；請降低壓力或轉速、加大間距，或提高加速度後再比較。</p>' : ''}
  <p class="note">綠色為各欄最佳值。夾氣與覆蓋來自未校準的 Hele-Shaw 近似；動作時間含收尾、不含上下料。請以透明板實測確認後再定案。</p>`;
  bindCompareControls();
}
$('#compare-body').addEventListener('click', (e) => {
  const b = e.target.closest('[data-apply]');
  if (!b) return;
  S.pattern = { ...S.pattern, pattern: b.dataset.apply };
  const next = { ...S.config, mode: 'pattern' };
  if (S.compare?.matchVolume) next.speed = Number(b.dataset.speed);
  $('#compare-dialog').close();
  S.tab = 'path';
  if (tryRecompute(next)) toast(`已套用 ${PATTERN_NAMES[b.dataset.apply]}`, 'ok');
});

// ───────────────────────── exports ─────────────────────────
function download(content, name, type) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(content instanceof Blob ? content : new Blob([content], { type }));
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function exportRecord() {
  return {
    application: 'TIM Dispensing Lab',
    version: VERSION,
    date: new Date().toISOString(),
    label: LABEL,
    validatedAgainstHardware: false,
    parameterRegistryVersion: registry.schema_version,
    parameterUpdates: PARAMETER_UPDATES,
    modelAssumptions: {
      flow: 'delayed_first_order',
      puttyFlowLaw: 'tds_reference_point_power_law_tube',
      motion: S.config.cornerMode === 'junction' ? 'lookahead_trapezoid_junction_deviation' : 'single_arc_length_trapezoid',
      lineGeometry: 'shared_half_ellipse_rings_total_volume_normalized',
      pointGeometry: 'spherical_cap',
      surfaceAllocation: 'outlet_before_first_lift_only_except_legacy',
      squeeze: 'parallel_plate_hele_shaw_trapped_air_frozen',
      thermal: 'one_dimensional_bulk_plus_tds_derived_contact',
      hardwareAppearance: 'reference_envelopes_with_assumed_details_not_OEM_CAD',
    },
    config: S.config,
    heatSource: S.heat,
    pattern: S.pattern,
    hardwareReference: HARDWARE_REFERENCES[S.config.architecture],
    material: MATERIALS[S.config.material],
    referenceParameters: registry.parameters,
    additionalDefaults: [ENDING_DEFAULT, ...MOTION_DEFAULTS, ...CORNER_DEFAULTS],
    sources: registry.sources,
    warnings: S.run.warnings,
    summary: S.run.summary,
    motion: S.run.motion,
    compression: S.press && !S.press.stale ? { settings: S.press.settings, summary: S.press.result.summary, voids: S.press.result.voids.slice(0, 50), warnings: S.press.result.warnings, baseline: S.pressBaseline } : null,
    patternComparison: S.compare?.rows || null,
    baseline: S.baseline ? { config: S.baseline.config, summary: S.baseline.summary } : null,
    view: { mode: scene.mode, projection: scene.projection, isoCorner: scene.isoCorner, freeOrbit: scene.freeOrbit, time: S.frame.t, cameraPosition: scene.camera.position.toArray(), cameraTarget: scene.controls.target.toArray() },
    note: '工件檔案不內嵌，僅保存名稱與雜湊；重新載入需原檔。',
  };
}
function exportCsv() {
  const cols = [
    ['t', 'time_s'],
    ['command', 'command_0_1'],
    ['target', 'target_mL_s'],
    ['q', 'outflow_mL_s'],
    ['output', 'outlet_mL'],
    ['mass', 'mass_g'],
    ['s', 'arc_length_mm'],
    ['x', 'TCP_X_mm'],
    ['y', 'TCP_Y_mm'],
    ['z', 'TCP_Z_mm'],
    ['speed', 'speed_mm_s'],
    ['remaining', 'cartridge_mL'],
    ['pending', 'pending_mL'],
    ['fixed', 'fixed_primed_mL'],
    ['balance', 'balance_error_mL'],
    ['deposited', 'deposited_mL'],
    ['offSurface', 'off_surface_mL'],
    ['recovered', 'recovered_pending_mL'],
    ['vx', 'velocity_X_mm_s'],
    ['vy', 'velocity_Y_mm_s'],
    ['vz', 'velocity_Z_mm_s'],
    ['phase', 'phase'],
    ['depositionBalance', 'deposition_balance_mL'],
  ];
  const quote = (v) => '"' + String(v).replaceAll('"', '""') + '"';
  const rec = exportRecord();
  const meta = JSON.stringify({ config: S.config, heatSource: S.heat, sourceVersion: registry.schema_version, parameterUpdates: PARAMETER_UPDATES.map((p) => [p.id, p.value]), modelAssumptions: rec.modelAssumptions, compression: rec.compression?.summary || null, ending: S.run.ending, warnings: S.run.warnings });
  const lines = [
    ['label', 'app_version', 'profile', ...cols.map((c) => c[1]), 'run_metadata_json_first_row'].join(','),
    ...S.run.frames.map((f, i) => [LABEL, VERSION, S.config.profile, ...cols.map(([k]) => f[k]), i === 0 ? meta : ''].map(quote).join(',')),
  ];
  download('﻿' + lines.join('\r\n'), 'TIM_未校準_試驗結果.csv', 'text/csv;charset=utf-8');
}
async function exportImage() {
  const im = new Image();
  im.src = scene.screenshot();
  await im.decode();
  const cv = document.createElement('canvas');
  cv.width = im.width;
  cv.height = im.height + 110;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#f4f6f8';
  ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.drawImage(im, 0, 0);
  ctx.fillStyle = '#16181b';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(`TIM 點膠研究室 v${VERSION} · ${LABEL}`, 24, im.height + 32);
  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#4f5157';
  ctx.fillText(`${describe(S.config, S.heat)} · t=${S.frame.t.toFixed(3)} s · 沉積 ${S.run.summary.deposited.toFixed(4)} mL`, 24, im.height + 60);
  const p = S.press?.result.summary;
  ctx.fillText(
    p ? `壓合估算：覆蓋 ${p.coveredPercent.toFixed(1)}% · 夾氣 ${p.voidCount} 處 ${p.voidAreaMm2.toFixed(1)} mm² · 溫升 ${p.thermal.rise.toFixed(2)} °C（未校準）` : '工件沉積與離面後出膠分帳；虛線為針尖路徑，非膠絲。mm 真實比例。',
    24,
    im.height + 86,
  );
  cv.toBlob((b) => download(b, p ? 'TIM_未校準_壓合畫面.png' : 'TIM_未校準_點膠畫面.png', 'image/png'));
}

// ───────────────────────── dialogs ─────────────────────────
const EVIDENCE = { published_typical: '原廠典型', published_rated: '原廠額定', published_limit: '原廠上限', derived: '公式／資料推導', engineering_assumption: 'AI 工程初估' };
function renderSources() {
  const updates = new Map(PARAMETER_UPDATES.map((p) => [p.id, p]));
  const original = new Map(registry.parameters.map((p) => [p.id, p]));
  const rows = [...PARAMETER_UPDATES.map((p) => ({ ...p, v1: true })), ...CORNER_DEFAULTS.map((p) => ({ ...p, v1: true })), ENDING_DEFAULT, ...MOTION_DEFAULTS, ...registry.parameters.filter((p) => !updates.has(p.id))];
  $('#source-rows').innerHTML = rows
    .map((p) => {
      const old = p.v1 && original.get(p.id);
      return `<tr class="${p.v1 ? 'v1' : ''}"><td><code>${esc(p.id)}</code>${p.v1 ? '<em class="tag tag-derived">v1.0 更新</em>' : ''}</td><td>${esc(p.value)} ${esc(p.unit || '')}${old ? `<br><small>原 v0.3：${esc(old.value)}</small>` : ''}</td><td>${esc(EVIDENCE[p.evidence] || p.evidence)}<br><small>${esc(p.role || '控制初值')}</small></td><td>${esc(p.basis)}<br><small>${esc((p.source_refs || []).join(' / '))}</small></td></tr>`;
    })
    .join('');
}
$('#help-body').innerHTML = `
<ol class="steps">
  <li><b>設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），調整壓力或轉速。</li>
  <li><b>熱源</b>：輸入元件接觸面尺寸、位置、組裝間隙與功耗。可「自動調整移動速度」讓膠量 = 間隙體積 × 係數。</li>
  <li><b>路徑</b>：依熱源選中心線／N／蛇形／螺旋／外框，或直線、單點。多段路徑在轉角依 junction deviation 減速。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>壓合</b>：按「模擬壓合」看透明板下降、膠膜擴散與夾氣（紅色）；可切換「前緣時序」著色。</li>
  <li><b>比較</b>：「比較所有圖樣」在等膠量下比較覆蓋、夾氣、溢膠、溫升與動作時間，可直接套用。</li>
</ol>
<p class="muted">視角：全機／工作區／機頭／供膠站／近看／跟隨；①–④ 等角方向；360° 自由旋轉；正交與透視可切換。所有零件以 mm 真實比例繪製；設備外形依公開尺寸，細部與管路為示意。</p>
<p class="muted">本工具所有結果為工程假設、未經實機校準，用於縮小試驗範圍與比較方案，不能取代透明板或首件驗證。</p>`;
$('#show-sources').onclick = () => {
  renderSources();
  $('#sources-dialog').showModal();
};
$('#help').onclick = () => $('#help-dialog').showModal();
$$('[data-close]').forEach((b) => (b.onclick = () => b.closest('dialog').close()));
$$('dialog').forEach((d) => d.addEventListener('click', (e) => e.target === d && d.close()));

// ───────────────────────── start ─────────────────────────
S.config = initialConfig();
applyRun(simulate(S.config));
requestAnimationFrame(loop);

// Development-only inspection surface for numerical/rendering acceptance checks.
if (import.meta.env.DEV) window.__scene = scene;
if (import.meta.env.DEV)
  window.timDiagnostics = () => ({
    config: structuredClone(S.config),
    heat: { ...S.heat },
    summary: structuredClone(S.run.summary),
    frame: { ...S.frame, deposits: Array.from(S.frame.deposits) },
    geometry: scene.geometryAudit(),
    tool: scene.tool.children.map((c) => ({ visible: c.visible, type: c.type, z: c.position.z, mat: c.material?.type })),
    toolPos: scene.tool.position.toArray(),
    camera: { mode: scene.mode, span: scene.currentSpan, left: scene.camera.left, right: scene.camera.right, top: scene.camera.top, zoom: scene.camera.zoom, position: scene.camera.position.toArray(), target: scene.controls.target.toArray(), host: [scene.host.clientWidth, scene.host.clientHeight] },
    press: S.press?.result.summary || null,
    playing: S.playing,
    duration: S.run.duration,
    warnings: S.run.warnings,
  });
