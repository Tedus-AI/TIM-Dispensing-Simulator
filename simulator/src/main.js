import './style.css';
import registry from '../../data/engineering_defaults_v0.3.json';
import { fromRegistry, simulate, frameAt, LABEL, VERSION, ENDING_DEFAULT, MOTION_DEFAULTS, CORNER_DEFAULTS } from './engine.js';
import { PARAMETER_UPDATES, parameterValue } from './parameters.js';
import { MATERIALS } from './materials.js';
import { DispenseScene, VIEW_LABELS } from './scene.js';
import { HARDWARE_REFERENCES } from './hardware-reference.js';
import { estimateCompression, squeezeRheology, PRESS_DEFAULTS } from './compression.js';
import { GOAL_DEFAULTS, OPTIMIZE_DEFAULTS, SEARCH_LEVELS, levelOf, planSearch, estimateSeconds, screeningDoses, optimizeSettings, judge, rank, metricsOf, beadMatch, needleLabel } from './optimize.js';
import { tuneDose, driveOf } from './tuning.js';
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
  ...PRESS_DEFAULTS,
  viscosity: null, // null = material default (see squeezeRheology)
  yieldStress: null,
});
// Heat-panel keys that only affect the squeeze estimate (no dispensing re-run).
const PRESS_KEYS = ['gap', 'cellSize', 'power', 'airMode', 'pressKgf', 'pressSpeed', 'settleTime', 'viscosity', 'yieldStress'];
const AIR_MODE_NAMES = { compressible: '可壓縮氣泡', rigid: '剛性牆（v1.0）', vent: '全部排出' };
const AIR_MODE_SHORT = { compressible: '可壓縮', rigid: '剛性牆', vent: '全排出' };
const DEFAULT_PATTERN = () => ({ pattern: 'n', spacing: 5, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' });
// Dose target (× requirement, mL or g) and how it is reached: 'drive' = pressure / pump speed first, 'motion' =
// travel speed (gate time for a dot). Lines and patterns default to the drive, a dot to its gate time.
const DOSE_DEFAULTS = Object.freeze({ value: 1.2, unit: 'factor', knob: 'drive', pointKnob: 'motion' });

const S = {
  config: null,
  run: null,
  frame: null,
  time: 0,
  playing: false,
  clock: null,
  tab: 'part',
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
  dose: { ...DOSE_DEFAULTS, ...(readJson('tim-dose') || {}) },
  compare: null,
  busy: false,
  goals: { ...GOAL_DEFAULTS, ...(readJson('tim-goals') || {}) },
  scenarios: readJson('tim-scenarios') || [],
  optimize: null,
  optOptions: { ...OPTIMIZE_DEFAULTS, ...(readJson('tim-opt') || {}) },
  optCal: null,
};

function readJson(key) {
  try {
    return JSON.parse(store.get(key) || 'null');
  } catch {
    return null;
  }
}

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
function startWorker() {
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
}
startWorker();
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
        else if (type === 'tune') {
          const t = tuneDose(payload.config, payload.target, payload.knob);
          resolve({ config: t.config, key: t.key, reached: t.reached, fallback: t.fallback, deposited: t.run.summary.deposited });
        } else reject(new Error('此瀏覽器不支援背景計算，無法執行圖樣比較、最佳化或時間估算'));
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
  if (material !== S.config.material) S.heat = { ...S.heat, viscosity: null, yieldStress: null };
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

// ① Design inputs: the heat source (component contact face), the bond-line gap set by the spacers, the
// component power, and the plate that is dispensed on.
function renderPart() {
  const h = S.heat;
  const c = S.config;
  const mat = MATERIALS[c.material];
  const imported = c.workpieceKind !== 'plate';
  return `
  <p class="lead">熱源（元件接觸面）與組裝間隙決定膠量需求（上方膠量列）與「依熱源」路徑；偏移以工件中心為原點。</p>
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
    ${num({ bind: 'h.gap', label: '組裝間隙 BLT', value: h.gap, unit: 'mm', min: 0.02, max: 10, tag: 'ai', hint: `墊片高度；${mat.name} 最小 ${mat.minBondLine} mm` })}
    ${num({ bind: 'h.power', label: '元件功耗', value: h.power, unit: 'W', min: 0, max: 10000, tag: 'ai', hint: '只用於溫升估算' })}
  </div>
  ${group(
    '工件（點膠平板）',
    `<div class="pair">${num({ bind: 'c.width', label: '工件長 X', value: c.width, unit: 'mm', min: 1, max: 1000, tag: 'geo', disabled: imported })}${num({ bind: 'c.depth', label: '工件寬 Y', value: c.depth, unit: 'mm', min: 1, max: 1000, tag: 'geo', disabled: imported })}</div>
    <div class="pair">${num({ bind: 'c.thickness', label: '厚度', value: c.thickness, unit: 'mm', min: 0.1, max: 200, tag: 'geo', disabled: imported })}${num({ bind: 'c.fixtureHeight', label: '治具支承高度', value: c.fixtureHeight, unit: 'mm', min: 0, max: 100, tag: 'ai' })}</div>
    <div class="pair"><label class="field"><span class="lbl">STL 單位</span><select id="import-unit"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option><option value="inch">inch</option></select></label><label class="field"><span class="lbl">STL 向上</span><select id="import-up"><option>Z</option><option>Y</option></select></label></div>
    <label class="file-button">載入 STL / GLB / glTF<input id="workpiece-file" type="file" accept=".stl,.glb,.gltf"></label>
    ${imported ? `<p class="note">${esc(c.workpieceFile?.name || '')} · ${fmt(c.width, 2)} × ${fmt(c.depth, 2)} × ${fmt(c.thickness, 2)} mm</p><button class="chip-btn wide" id="clear-workpiece">恢復虛擬平板</button>` : ''}`,
    { open: imported, note: '預設 150 × 100 × 5 mm 為虛擬壓鑄鋁平板（示意 RRU 腔體一角），非客戶工件；只影響畫面與點膠面高度。GLB／glTF 依規格以 m、Y 向上換算；STL 需指定單位與上方向。點膠面取上方水平參考面，未處理孔洞、曲面與碰撞。' },
  )}`;
}

function pressFields(h) {
  const c = S.config;
  const rh = squeezeRheology(c, h);
  const grease = c.material === 'grease';
  return `${select({ bind: 'h.airMode', label: '夾氣處理', value: h.airMode, options: [['compressible', '可壓縮氣泡（會壓縮、遷移、排出）'], ['rigid', '剛性牆（v1.0 舊模型）'], ['vent', '全部排出（覆蓋率上限）']] })}
  <div class="pair">
    ${num({ bind: 'h.pressKgf', label: '壓合力', value: h.pressKgf, unit: 'kgf', min: 0.01, max: 5000, tag: 'ai', hint: '手壓或治具的力' })}
    ${num({ bind: 'h.pressSpeed', label: '下降速度上限', value: h.pressSpeed, unit: 'mm/s', min: 0.01, max: 100, tag: 'ai', hint: '剛接觸時的壓板速度' })}
  </div>
  <div class="pair">
    ${num({ bind: 'h.viscosity', label: '有效黏度', value: rh.viscosity, unit: 'Pa·s', min: 1, max: 1e7, tag: grease ? 'tds' : 'derived', hint: grease ? 'TDS Brookfield 2 rpm（同設備頁）' : '由針嘴冪律擬合推算 @1 s⁻¹' })}
    ${num({ bind: 'h.yieldStress', label: '降伏應力', value: rh.yieldStress, unit: 'Pa', min: 0, max: 1e6, tag: 'ai', hint: '公開散熱膏實測約 7–30 Pa' })}
  </div>
  ${num({ bind: 'h.settleTime', label: '靜置觀察時間', value: h.settleTime, unit: 's', min: 0, max: 3600, tag: 'ai', hint: '壓到墊片後氣泡回脹的時間；建議與透明板拍照時間一致' })}
  ${h.viscosity != null || h.yieldStress != null ? '<button class="chip-btn" id="rheo-reset">恢復材料預設黏度／降伏應力</button>' : ''}`;
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
    body += `${num({ bind: 'c.gateDuration', label: '開膠時間', value: c.gateDuration, unit: 's', min: 0.001, max: 10, tag: 'ai', hint: '上方膠量列可依目標自動調整' })}<div class="pair">${num({ bind: 'c.offsetX', label: '點位 X', value: c.offsetX, unit: 'mm', min: -500, max: 500 })}${num({ bind: 'c.offsetY', label: '點位 Y', value: c.offsetY, unit: 'mm', min: -500, max: 500 })}</div>`;
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
  const free = S.run?.summary.freeHeight;
  body += num({
    bind: 'c.standoff',
    label: '針嘴離面高度',
    value: c.standoff,
    unit: 'mm',
    min: 0.1,
    max: 20,
    tag: 'ai',
    hint: `低於膠的自然高度${Number.isFinite(free) ? `（目前約 ${fmt(free, 2)} mm）` : ''}時，膠被針嘴壓成此高度並變寬，膠量不變；太低會埋針、拖膠`,
  });
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

// ⑤ Press: transparent plate pressed with a set force onto the spacers (the gap set in ①).
function renderPressTab() {
  const h = S.heat;
  return `
  <p class="lead">透明板以定力壓到墊片（組裝間隙 ${fmt(h.gap, 2)} mm，在「熱源工件」設定）即停，估算覆蓋、夾氣、溢膠與熱阻。設定好後按結果卡的「模擬壓合」。</p>
  ${group('壓合條件（透明板＋墊片）', pressFields(h), { open: true, note: '定力壓下，到墊片即停；之後膠壓消退，被壓縮的氣泡回脹到降伏應力擋住為止。實際手壓若先快後慢，壓合中的氣泡壓縮程度會不同，最終回脹結果影響較小。' })}
  ${group('估算網格', num({ bind: 'h.cellSize', label: '網格解析度', value: h.cellSize, unit: 'mm', min: 0.2, max: 5, tag: 'ai', hint: '越小越細，計算時間增加；上限 90,000 格。夾氣數量對網格敏感，比較圖樣請用相同網格' }), { open: false })}
  <p class="note">壓合採平行板 Hele-Shaw 擠壓：定力壓到墊片，被膠包圍的空氣依所選方式處理（預設可壓縮：pV = 常數、可隨膠流移動、膠牆變薄時排出）。熱阻 =（間隙 ÷ k + TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。</p>`;
}

const RENDERERS = { part: renderPart, equipment: renderEquipment, path: renderPath, ending: renderEnding, press: renderPressTab };
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
  if (scope === 'c') {
    if (key === 'pressure' && S.pressureUnit === 'bar') value /= BAR;
    const next = { ...S.config, [key]: value };
    if (key === 'tauOn' && pcp()) next.tauOff = value;
    return tryRecompute(next);
  }
  const target = scope === 'h' ? 'heat' : 'pattern';
  const previous = S[target];
  S[target] = { ...previous, [key]: value };
  if (scope === 'h' && PRESS_KEYS.includes(key)) {
    markPressStale();
    renderDose();
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
    case 'rheo-reset':
      S.heat = { ...S.heat, viscosity: null, yieldStress: null };
      markPressStale();
      return renderTab();
    case 'clear-workpiece':
      scene.clearImport();
      return tryRecompute({ ...S.config, width: 150, depth: 100, thickness: 5, workpieceKind: 'plate', workpieceFile: null });
  }
});

// ───────────────────────── dose bar ─────────────────────────
// Pinned above the tabs: the material requirement of the heat source, the current dose, a target in
// × requirement, mL or g, and the setting that reaches it (the drive first, as on the line, or the motion).
const heatArea = (h = S.heat) => (h.shape === 'circle' ? (Math.PI * h.width ** 2) / 4 : h.width * h.depth);
const requiredMl = (h = S.heat) => (heatArea(h) * h.gap) / 1000;
const DOSE_UNIT_TEXT = { factor: '× 需求', ml: 'mL', g: 'g' };
const knobFor = (mode = S.config.mode) => (mode === 'point' ? S.dose.pointKnob : S.dose.knob);
const motionOf = (mode = S.config.mode) => (mode === 'point' ? { key: 'gateDuration', label: '開膠時間', unit: 's', digits: 3 } : { key: 'speed', label: '移動速度', unit: 'mm/s', digits: 1 });
/** Dose-knob choices for a path mode, the mode's default first. */
function knobChoices(mode = S.config.mode) {
  const drive = driveOf(S.config);
  const short = drive.key === 'rpm' ? '轉速' : '壓力';
  if (mode === 'point')
    return [
      ['motion', `調開膠時間（${short}不變）`],
      ['drive', `調${short}（到極限才改開膠時間）`],
    ];
  return [
    ['drive', `調${short}（到極限才改速度）`],
    ['motion', `調移動速度（${short}不變）`],
  ];
}
function doseTargetMl() {
  const d = S.dose;
  return d.unit === 'ml' ? d.value : d.unit === 'g' ? d.value / S.config.density : requiredMl() * d.value;
}
function persistDose() {
  store.set('tim-dose', JSON.stringify(S.dose));
}
function renderDose() {
  if (!S.run) return;
  const required = requiredMl();
  const dep = S.run.summary.deposited;
  const ratio = required > 0 ? dep / required : 0;
  const target = doseTargetMl();
  const density = S.config.density;
  $('.dose').style.setProperty('--glue', `#${MATERIALS[S.config.material].color.toString(16).padStart(6, '0')}`);
  $('#dose-req').textContent = `需求 ${fmt(required, 3)} mL`;
  $('#dose-now').innerHTML = `${fmt(dep, 3)}<small>mL · ${fmt(dep * density, 3)} g</small>`;
  $('#dose-ratio').textContent = `${fmt(ratio, 2)}×`;
  $('#dose-meter').className = `dose-meter ${ratio < 1 ? 'low' : ratio > 1.6 ? 'high' : 'ok'}`;
  $('#dose-fill').style.setProperty('--w', `${Math.min(100, (ratio / 2) * 100)}%`);
  const input = $('#dose-value');
  if (document.activeElement !== input) input.value = String(clean(S.dose.value));
  $('#dose-unit').value = S.dose.unit;
  const eq = [S.dose.unit !== 'factor' && required > 0 ? `${fmt(target / required, 2)}×` : '', S.dose.unit !== 'ml' ? `${fmt(target, 3)} mL` : '', S.dose.unit !== 'g' ? `${fmt(target * density, 3)} g` : ''].filter(Boolean);
  $('#dose-eq').textContent = `= ${eq.join(' · ')}`;
  const knob = $('#dose-knob');
  knob.innerHTML = knobChoices()
    .map(([v, t]) => `<option value="${v}" ${v === knobFor() ? 'selected' : ''}>${t}</option>`)
    .join('');
  knob.title = knob.selectedOptions[0]?.textContent || '';
}
$('#dose-value').addEventListener('change', (e) => {
  const el = e.target;
  if (!el.value.trim() || !el.checkValidity() || !(Number(el.value) > 0)) {
    toast('請輸入大於 0 的目標膠量', 'error');
    return renderDose();
  }
  S.dose = { ...S.dose, value: Number(el.value) };
  persistDose();
  renderDose();
});
$('#dose-unit').addEventListener('change', (e) => {
  // Keep the same amount of material, expressed in the new unit.
  const ml = doseTargetMl();
  const unit = e.target.value;
  const value = unit === 'ml' ? ml : unit === 'g' ? ml * S.config.density : ml / Math.max(1e-12, requiredMl());
  S.dose = { ...S.dose, unit, value: Number(value.toPrecision(4)) };
  persistDose();
  renderDose();
});
$('#dose-knob').addEventListener('change', (e) => {
  S.dose = { ...S.dose, [S.config.mode === 'point' ? 'pointKnob' : 'knob']: e.target.value };
  persistDose();
  renderDose();
  if ($('#optimize-dialog').open && !S.optimize?.running) renderOptimize();
});
$('#dose-apply').addEventListener('click', () => applyDose());

/** What the dose change did, in the words of the line: drive value, motion fallback, result vs target. */
function doseMessage(t, before, target) {
  const drive = driveOf(before);
  const motion = motionOf(before.mode);
  const dv = (cfg) => `${fmt(cfg[drive.key], 0)} ${drive.unit}`;
  const mv = (cfg) => `${fmt(cfg[motion.key], motion.digits)} ${motion.unit}`;
  const result = `沉積 ${fmt(S.run.summary.deposited, 3)} mL（目標 ${fmt(target, 3)}）`;
  if (!t.reached && !(t.deposited > 1e-9)) return `這組設定不會有膠沉積到工件${before.mode !== 'point' && before.shutoffDistance > 0 ? `（提前關膠 ${before.shutoffDistance} mm 是否 ≥ 路徑長？）` : ''}，請先檢查路徑與收尾設定`;
  if (!t.reached) return `已達設備限制，最接近 ${result}；請換針嘴、圖樣或調整目標`;
  if (t.key === drive.key) return `已將${drive.label}調為 ${dv(t.config)}（${motion.label}不變），${result}`;
  if (t.fallback) {
    const way = motion.key === 'speed' ? (t.config.speed < before.speed ? '降速' : '提速') : '改開膠時間';
    return `${drive.label}已到${t.config[drive.key] >= drive.hi ? '上限' : '下限'} ${dv(t.config)}，改調${motion.label}：${mv(before)} → ${mv(t.config)}（已${way}），${result}`;
  }
  return `已將${motion.label}調為 ${mv(t.config)}（${drive.label}不變），${result}`;
}
async function applyDose() {
  if (S.busy) return;
  const target = doseTargetMl();
  if (!(target > 0)) return toast('熱源需求為 0，請改用 mL 或 g 作為目標', 'error');
  const before = S.config;
  const run = S.run;
  const button = $('#dose-apply');
  S.busy = true;
  document.body.classList.add('busy');
  button.textContent = '計算中…';
  try {
    const t = await compute('tune', { config: before, target, knob: knobFor(before.mode) });
    if (run !== S.run) return toast('計算期間設定已變更，請再按一次「套用」');
    if (tryRecompute(t.config)) toast(doseMessage(t, before, target), t.reached ? 'ok' : 'error');
  } catch (e) {
    toast(e.message, 'error');
  } finally {
    S.busy = false;
    document.body.classList.remove('busy');
    button.textContent = '套用';
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
  renderDose();
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

function kpi(label, value, unit, hint = '', cls = '', title = '') {
  return `<div class="kpi ${cls}" ${title ? `title="${esc(title)}"` : ''}><span>${label}</span><b>${value}<small>${unit}</small></b>${hint ? `<em>${hint}</em>` : ''}</div>`;
}

// Nozzle vs bead: travel speed ÷ paste exit speed (≈1 lays a round bead about the nozzle's size).
function beadKpi(run) {
  const b = beadMatch(run);
  if (b.speedRatio === null) return '';
  const bad = b.state !== 'ok';
  const what = b.state === 'stretched' ? '膠條被拉細：針嘴偏大或速度偏快' : b.state === 'piled' ? '膠條會堆疊：針嘴偏小或速度偏慢' : '速度與出膠速度相近';
  return `<div class="kpi wide ${bad ? 'warn' : ''}"><span>針嘴與膠條匹配</span><b>×${fmt(b.speedRatio, 2)}<small>移動速度 ÷ 出膠速度</small></b><em>${what}；匹配內徑約 ${fmt(b.matchedId, 2)} mm（目前 ${fmt(run.config.diameter, 2)}）</em></div>`;
}

// Bead (dot) shape against the nozzle height: free, pressed flat to the standoff, or burying the nozzle.
function shapeKpi(s, c) {
  const buried = s.maxHeight > c.standoff + 1e-9;
  const what = c.mode === 'point' ? '膠點' : '膠條';
  const [hint, title] = buried
    ? [`埋針 · 針距 ${fmt(c.standoff, 1)}`, `${what}高 ${fmt(s.maxHeight, 2)} mm 高於針嘴離面 ${fmt(c.standoff, 1)} mm：針嘴埋在膠裡，易拖膠、沾針。提高針距或減少每 mm 膠量。`]
    : s.flattened
      ? [`已壓平 · 針距 ${fmt(c.standoff, 1)}`, `${what}自然高度約 ${fmt(s.freeHeight, 2)} mm，被針嘴壓成 ${fmt(c.standoff, 1)} mm 高並變寬；膠量不變。`]
      : [`針距 ${fmt(c.standoff, 1)} mm`, `${what}以自然形狀堆在面上（自然高度低於針嘴離面高度）。`];
  return kpi('膠高 / 寬', `${fmt(s.maxHeight, 2)} / ${fmt(s.maxWidth, 1)}`, 'mm', hint, buried ? 'warn' : '', title);
}

function pressKpis(pr) {
  if (!pr) return '';
  const air = pr.airMode === 'compressible';
  const bubbles = air
    ? kpi('氣泡留下', `${pr.remaining}`, '個', pr.sealed ? `封住 ${pr.sealed} 次 · 排出 ${pr.vented} 次${pr.peakBubbleKPa ? ` · 壓合中最高 ${fmt(pr.peakBubbleKPa, 0)} kPa` : ''}` : '壓合過程沒有封住空氣', pr.remaining ? 'warn' : 'good')
    : kpi('氣泡', '—', '', pr.airMode === 'rigid' ? '剛性牆：封住即凍結' : '假設全部排出');
  const relax = air
    ? kpi('靜置回脹', fmt(pr.relaxTime, pr.relaxTime < 10 ? 1 : 0), 's', pr.volumeRatio != null ? `剩餘氣泡 = 1 atm 體積 ${fmt(pr.volumeRatio * 100, 0)}%${pr.settled ? '' : ' · 仍在回脹'}` : '無剩餘氣泡', pr.settled ? '' : 'warn')
    : kpi('靜置回脹', '—', '', '此模式不計');
  return `<div class="kpis three">
    ${kpi('壓到墊片', fmt(pr.pressTime, pr.pressTime < 10 ? 1 : 0), 's', `${fmt(pr.forceKgf, 1)} kgf · 座落 ${fmt(pr.seatPressureKPa, 0)} kPa`)}
    ${bubbles}
    ${relax}
  </div>`;
}

function renderResults() {
  const run = S.run;
  const c = S.config;
  const s = run.summary;
  const e = run.ending;
  const h = S.heat;
  const required = requiredMl(h);
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
      ${shapeKpi(s, c)}
      ${kpi('末段 / 中段', ratio === null ? '—' : fmt(ratio, 2), '×', '0.5–1.5 為 AI 比較帶', ratio !== null && (ratio < 0.5 || ratio > 1.5) ? 'warn' : '')}
      ${beadKpi(run)}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算</span>${S.press ? `<span class="pill ${stale ? 'pill-warn' : ''}">${stale ? '設定已變更' : `${fmt(S.press.settings.gap, 2)} mm · ${AIR_MODE_SHORT[S.press.settings.airMode]}`}</span>` : ''}</div>
    ${
      p && !stale
        ? `<div class="press-grid">${ring(p.coveredPercent)}<div class="press-sum"><b>熱源等效覆蓋</b><span>沉積 ${fmt(p.depositedMl, 3)} mL = 間隙體積 ${fmt(p.volumeRatio, 2)}×</span><span>${esc(p.material)} · k ${p.thermal.conductivity} W/m·K</span></div></div><div class="kpis">
          ${kpi('夾氣區', p.voidCount, '處', p.voidCount ? `${fmt(p.voidAreaMm2, 1)} mm² · ${fmt(p.voidPercent, 1)}%` : '未偵測到', p.voidCount ? 'bad' : 'good')}
          ${kpi('溢出熱源', fmt(p.squeezeOutMm, 1), 'mm', `熱源外 ${fmt(p.outsideMl, 3)} mL`, p.squeezeOutMm > 3 ? 'warn' : '')}
          ${kpi('TIM 溫升', fmt(p.thermal.rise, 2), '°C', `滿覆蓋 ${fmt(p.thermal.idealRise, 2)} °C @ ${fmt(p.thermal.power, 0)} W`, p.thermal.rise > p.thermal.idealRise * 1.1 ? 'warn' : '')}
          ${kpi('熱阻', fmt(p.thermal.resistance, 4), 'K/W', `θ ${fmt(p.thermal.impedanceCm2, 3)} °C·cm²/W`)}
        </div>
        ${pressKpis(p.press)}
        <div class="press-actions"><button class="chip-btn" id="press-replay">${ICONS.play}重播壓合</button><button class="chip-btn" id="press-save">保存壓合基準</button><button class="chip-btn" id="scenario-save">${ICONS.save}存成情境</button></div>
        ${S.pressBaseline ? `<div class="compare-box"><b>壓合基準 → 目前</b><p>覆蓋 ${fmt(S.pressBaseline.summary.coveredPercent, 1)}% → ${fmt(p.coveredPercent, 1)}%　夾氣 ${S.pressBaseline.summary.voidCount} → ${p.voidCount}　溫升 ${fmt(S.pressBaseline.summary.thermal.rise, 2)} → ${fmt(p.thermal.rise, 2)} °C</p><small>${esc(S.pressBaseline.describe)}</small></div>` : ''}`
        : `<div class="cta"><p>${stale ? '熱源或點膠設定已變更，請重新模擬。' : '以完整試驗的沉積分布估算壓合覆蓋、夾氣與熱阻。'}</p><button class="primary" id="press-cta">${ICONS.press}<span>模擬壓合</span></button><button class="secondary" id="scenario-save-cta">${ICONS.save}<span>存成情境（自動壓合）</span></button></div>`
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
  const mode = c.mode === 'pattern' ? `${PATTERN_NAMES[c.pathSettings?.pattern] || ''}（間距 ${c.pathSettings?.spacing} mm）` : c.mode === 'line' ? `直線 ${c.lineLength} mm` : `單點 ${fmt(c.gateDuration, 3)} s`;
  return `${MATERIALS[c.material].name} · ${c.architecture} · ${mode} · ${c.architecture === 'P300' ? `${fmt(c.rpm, 1)} rpm` : `${fmt(c.pressure, 1)} psi`}${c.mode === 'point' ? '' : ` · ${fmt(c.speed, 1)} mm/s`}${heat ? ` · 熱源 ${heat.width}${heat.shape === 'circle' ? ' Ø' : ` × ${heat.depth}`} mm / ${heat.gap} mm` : ''}`;
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
    case 'press-replay':
      return animatePress(true);
    case 'scenario-save':
    case 'scenario-save-cta':
      return saveScenario();
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
  $$('#press-cta').forEach((b) => (b.querySelector('span').textContent = '計算中…'));
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
    $$('#press-cta').forEach((b) => b.querySelector('span') && (b.querySelector('span').textContent = '模擬壓合'));
  }
}

function showPressFrame(k) {
  const view = scene.compression;
  if (!view) return;
  scene.setCompressionFrame(k);
  const f = view.frames[k];
  $('#press-scrub').value = String(k);
  const seat = S.press.result.summary.press?.pressTime ?? 0;
  const when = f.phase === 'relax' ? `靜置 +${fmt(f.t - seat, f.t - seat < 10 ? 1 : 0)} s` : `${f.t !== undefined ? `壓合 ${fmt(f.t, 1)} s · ` : ''}間隙 ${fmt(f.gap, 3)} mm`;
  const air = f.bubbles ? ` · 氣泡 ${f.bubbles}（${fmt(f.bubbleKPa, 0)} kPa）` : '';
  $('#press-gap').textContent = `${when} · 覆蓋 ${fmt(f.coveredPercent ?? S.press.result.summary.coveredPercent, 1)}%${air}`;
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
  const required = requiredMl();
  const factor = S.compare?.factor ?? Number((required > 0 ? doseTargetMl() / required : 1.2).toPrecision(3));
  const knob = S.dose.knob;
  const how = knobChoices('pattern').find(([v]) => v === knob)?.[1] || '';
  const controls = `<div class="compare-controls"><label class="chk"><input type="checkbox" id="cmp-match" ${matchVolume ? 'checked' : ''}>等膠量比較：每個圖樣調到需求 ×</label><input type="number" id="cmp-factor" value="${factor}" min="0.3" max="5" step="any"><span>（${esc(how)}，與膠量列相同）</span><button class="primary" id="cmp-run">${ICONS.compare}<span>重新計算</span></button></div>`;
  $('#compare-body').innerHTML = `${controls}<div class="progress"><i style="width:0%"></i></div><p class="note" id="cmp-status">計算中…</p>`;
  bindCompareControls();
  const config = { ...S.config, pathSettings: pathSettings() };
  const heat = { ...S.heat, cellSize: Math.max(0.5, S.heat.cellSize) };
  try {
    const result = await compute('compare', { config, heat, patterns: COMPARE_PATTERNS, factor, matchVolume, knob }, (p, label) => {
      const bar = $('#compare-body .progress i');
      if (bar) bar.style.width = `${p * 100}%`;
      const st = $('#cmp-status');
      if (st) st.textContent = `計算 ${PATTERN_NAMES[label]}…`;
    });
    S.compare = { ...result, matchVolume, factor, knob };
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
  const drive = driveOf(S.config);
  const driveText = (x) => `${fmt(x[drive.key], 0)} ${drive.unit}`;
  const how = r.knob === 'drive' ? `調${drive.key === 'rpm' ? '轉速' : '壓力'}（到極限才改速度）` : '調移動速度';
  $('#compare-body').innerHTML = `${controls}
  <p class="note">熱源 ${S.heat.shape === 'circle' ? `Ø${S.heat.width}` : `${S.heat.width} × ${S.heat.depth}`} mm、間隙 ${S.heat.gap} mm，需求 ${fmt(r.required, 3)} mL。${r.matchVolume ? `每個圖樣以「${how}」使沉積 ≈ 需求 × ${r.factor}。` : '沿用目前壓力、轉速與速度，膠量隨路徑長改變。'}其他設定沿用目前配置；網格 ≥ 0.5 mm；夾氣處理：${AIR_MODE_NAMES[S.heat.airMode]}，${S.heat.pressKgf} kgf 壓到墊片${S.heat.airMode === 'compressible' ? `、靜置 ${S.heat.settleTime} s` : ''}。</p>
  <div class="table-scroll"><table class="cmp"><thead><tr><th>圖樣</th><th>${drive.label}／速度<br><small>${drive.unit}／mm/s</small></th><th>沉積<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溢出<br><small>mm</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
  ${r.rows
    .map((x) =>
      x.ok && !(x.deposited > 1e-9)
        ? `<tr><td>${PATTERN_NAMES[x.pattern]}</td><td colspan="8" class="warn">${x.pathLength <= S.config.shutoffDistance ? `不出膠：路徑長 ${fmt(x.pathLength, 1)} mm ≤ 提前關膠 ${S.config.shutoffDistance} mm（熱源太小或內縮太大）；請在「收尾」縮短提前關膠距離` : '這組設定沒有膠沉積到工件'}</td></tr>`
        : x.ok
        ? `<tr><td><span class="pat"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PATTERN_ICONS[x.pattern]}</svg>${PATTERN_NAMES[x.pattern]}</span></td><td>${driveText(x)}<br><small>${fmt(x.speed, 1)} mm/s${x.fallback ? `<span class="warn">（已${x.speed < S.config.speed ? '降速' : '提速'}）</span>` : ''}</small></td><td class="${x.reached ? '' : 'warn'}" title="${x.reached ? '' : '壓力／轉速與速度都到極限，或加速度與轉角限制了平均速度；請換針嘴、加大間距或提高加速度'}">${fmt(x.deposited, 3)} <small>(${fmt(x.volumeRatio, 2)}×)</small>${x.reached ? '' : ' ⚠'}</td><td class="${x.coveredPercent === bestCover ? 'best' : ''}">${fmt(x.coveredPercent, 1)}</td><td class="${x.voidCount ? 'bad' : ''}">${x.voidCount} / ${fmt(x.voidAreaMm2, 1)}</td><td>${fmt(x.squeezeOutMm, 1)}</td><td class="${x.rise === bestRise ? 'best' : ''}">${fmt(x.rise, 2)}</td><td class="${x.cycle === bestCycle ? 'best' : ''}">${fmt(x.cycle, 2)}</td><td><button class="chip-btn" data-apply="${x.pattern}" data-speed="${x.speed}" data-drive="${x[drive.key]}">套用</button></td></tr>`
        : `<tr><td>${PATTERN_NAMES[x.pattern]}</td><td colspan="8" class="bad">${esc(x.error)}</td></tr>`,
    )
    .join('')}
  </tbody></table></div>
  ${r.rows.some((x) => x.ok && !x.reached && x.deposited > 1e-9) ? '<p class="note warn-note">⚠ 該圖樣在設備範圍內達不到目標膠量（壓力／轉速與速度都到極限，或加速度與轉角限制了平均速度）；請換針嘴、加大間距，或提高加速度後再比較。</p>' : ''}
  <p class="note">綠色為各欄最佳值。夾氣與覆蓋來自未校準的 Hele-Shaw 近似；動作時間含收尾、不含上下料。請以透明板實測確認後再定案。</p>`;
  bindCompareControls();
}
$('#compare-body').addEventListener('click', (e) => {
  const b = e.target.closest('[data-apply]');
  if (!b) return;
  S.pattern = { ...S.pattern, pattern: b.dataset.apply };
  const next = { ...S.config, mode: 'pattern' };
  if (S.compare?.matchVolume) {
    next.speed = Number(b.dataset.speed);
    next[driveOf(S.config).key] = Number(b.dataset.drive);
  }
  $('#compare-dialog').close();
  S.tab = 'path';
  if (tryRecompute(next)) toast(`已套用 ${PATTERN_NAMES[b.dataset.apply]}`, 'ok');
});

// ───────────────────────── goals, scenarios and optimisation ─────────────────────────
// Goal: coverage ≥ target and overflow ≤ limit with the least material (ranking in optimize.js).
const goalControls = () =>
  `<div class="goal-controls"><label>覆蓋率目標 <input type="number" data-goal="coverage" value="${S.goals.coverage}" min="50" max="100" step="any"> %</label><label>溢膠上限 <input type="number" data-goal="overflow" value="${S.goals.overflow}" min="0" max="50" step="any"> mm</label><span class="muted">達標＝覆蓋 ≥ 目標且溢膠 ≤ 上限；達標者膠量越少排越前，未達標者依差距排序。</span></div>`;
function verdict(m) {
  const j = judge(m, S.goals);
  if (j.pass) return '<span class="ok-badge">達標</span>';
  const why = [j.short > 0 ? `覆蓋差 ${fmt(j.short, 1)}%` : '', j.over > 0 ? `溢膠超 ${fmt(j.over, 1)} mm` : ''].filter(Boolean).join('・');
  return `<span class="no-badge">${why}</span>`;
}
function bindGoals(root, rerender) {
  root.querySelectorAll('[data-goal]').forEach(
    (el) =>
      (el.onchange = () => {
        const v = Number(el.value);
        if (!el.value.trim() || !el.checkValidity()) return toast('請輸入欄位範圍內的數值', 'error');
        S.goals = { ...S.goals, [el.dataset.goal]: v };
        store.set('tim-goals', JSON.stringify(S.goals));
        rerender();
      }),
  );
}
const PITCHED = ['serpentine', 'spiral'];
function settingsText(x) {
  const c = x.config;
  const p = x.pattern;
  const drive = c.architecture === 'P300' ? `${fmt(c.rpm, 0)} rpm` : `${fmt(c.pressure, 0)} psi`;
  const path =
    c.mode === 'pattern'
      ? `${PATTERN_NAMES[p.pattern]}${PITCHED.includes(p.pattern) ? ` 間距 ${p.spacing}` : ''} 內縮 ${p.edgeInset}`
      : c.mode === 'point'
        ? `單點 ${fmt(c.gateDuration, 3)} s`
        : `直線 ${c.lineLength} mm`;
  return `${MATERIALS[c.material].name} · ${drive} · Ø${c.diameter} · ${c.mode === 'point' ? '' : `${fmt(c.speed, 1)} mm/s · a ${c.acceleration} · `}${path} · 針距 ${c.standoff} · 間隙 ${x.heat.gap} · ${x.heat.pressKgf} kgf`;
}

function persistScenarios() {
  store.set('tim-scenarios', JSON.stringify(S.scenarios));
  const n = S.scenarios.length;
  $('#scenario-count').hidden = !n;
  $('#scenario-count').textContent = String(n);
}
function addScenario(entry) {
  const used = new Set(S.scenarios.map((x) => x.name));
  let k = S.scenarios.length + 1;
  while (used.has(`情境 ${k}`)) k++;
  const scenario = { id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, name: `情境 ${k}`, savedAt: new Date().toISOString(), ...entry };
  S.scenarios.push(scenario);
  persistScenarios();
  toast(`已存成「${scenario.name}」，共 ${S.scenarios.length} 個情境`, 'ok');
  if ($('#scenarios-dialog').open) renderScenarios();
}
async function saveScenario() {
  let metrics;
  const heat = { ...S.heat };
  const run = S.run;
  if (S.press && !S.press.stale) metrics = metricsOf(run, S.press.result);
  else {
    if (S.busy) return;
    S.busy = true;
    document.body.classList.add('busy');
    toast('計算壓合後存成情境…');
    try {
      metrics = metricsOf(run, await compute('compress', { run: slimRun(run), heat, frames: 0 }));
    } catch (e) {
      return toast(`壓合估算失敗：${e.message}`, 'error');
    } finally {
      S.busy = false;
      document.body.classList.remove('busy');
    }
    if (run !== S.run || JSON.stringify(heat) !== JSON.stringify(S.heat)) return toast('計算期間設定已變更，請再存一次');
  }
  addScenario({ config: structuredClone(S.config), heat, pattern: { ...S.pattern }, metrics, source: '手動設定' });
}
function loadScenario(x) {
  S.heat = { ...DEFAULT_HEAT(), ...x.heat };
  S.pattern = { ...DEFAULT_PATTERN(), ...x.pattern };
  if (tryRecompute(structuredClone(x.config))) {
    $('#scenarios-dialog').close();
    toast(`已載入「${x.name}」`, 'ok');
  }
}

function renderScenarios() {
  const body = $('#scenarios-body');
  const list = S.scenarios;
  const order = rank(
    list.map((x) => ({ ...x.metrics, id: x.id })),
    S.goals,
  ).map((m) => list.find((x) => x.id === m.id));
  const best = (key, dir) => (list.length ? Math.min(...list.map((x) => dir * x.metrics[key])) * dir : null);
  const b = { cover: best('coveredPercent', -1), out: best('squeezeOutMm', 1), dep: best('depositedMl', 1), rise: best('rise', 1) };
  const mark = (v, ref) => (ref !== null && Math.abs(v - ref) < 1e-9 ? 'best' : '');
  body.innerHTML = `${goalControls()}
  ${
    list.length
      ? `<div class="table-scroll"><table class="cmp scen"><thead><tr><th>#</th><th>情境</th><th>判定</th><th>膠量<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>溢出<br><small>mm</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
      ${order
        .map((x, i) => {
          const m = x.metrics;
          return `<tr class="${i === 0 && judge(m, S.goals).pass ? 'top' : ''}"><td>${i + 1}</td><td class="scen-name"><input value="${esc(x.name)}" data-rename="${x.id}" aria-label="情境名稱"><small>${esc(settingsText(x))}</small><small class="muted">${esc(x.source || '')} · ${new Date(x.savedAt).toLocaleString()}</small></td><td>${verdict(m)}</td><td class="${mark(m.depositedMl, b.dep)}">${fmt(m.depositedMl, 3)} <small>(${fmt(m.volumeRatio, 2)}×)</small></td><td class="${mark(m.coveredPercent, b.cover)}">${fmt(m.coveredPercent, 1)}</td><td class="${mark(m.squeezeOutMm, b.out)}">${fmt(m.squeezeOutMm, 1)}</td><td class="${m.voidCount ? 'bad' : ''}">${m.voidCount} / ${fmt(m.voidAreaMm2, 1)}</td><td class="${mark(m.rise, b.rise)}">${fmt(m.rise, 2)}</td><td>${fmt(m.cycle, 2)}</td><td class="row-actions"><button class="chip-btn" data-load="${x.id}">載入</button><button class="chip-btn" data-remove="${x.id}">刪除</button></td></tr>`;
        })
        .join('')}
      </tbody></table></div>
      <p class="note">綠色為各欄最佳值；第一列加框代表依目標排序的最佳情境。情境存在這台電腦的瀏覽器中，可匯出 JSON 帶到其他電腦再匯入。夾氣與覆蓋來自未校準的模型，僅供相對比較。</p>`
      : `<div class="empty"><p>還沒有情境。調好一組參數後，在右側結果卡按「存成情境」（未壓合會自動先壓合），或在「自動最佳化」結果中存入。</p></div>`
  }
  <div class="scen-tools"><button class="chip-btn" id="scen-csv" ${list.length ? '' : 'disabled'}>${ICONS.download}匯出 CSV</button><button class="chip-btn" id="scen-export" ${list.length ? '' : 'disabled'}>${ICONS.download}匯出 JSON</button><label class="chip-btn">匯入 JSON<input type="file" id="scen-import" accept=".json,application/json" hidden></label><button class="chip-btn danger" id="scen-clear" ${list.length ? '' : 'disabled'}>清除全部</button></div>`;
  bindGoals(body, renderScenarios);
}
$('#open-compare').onclick = () => openCompare();
$('#open-optimize').onclick = () => openOptimize();
$('#show-scenarios').onclick = () => {
  renderScenarios();
  $('#scenarios-dialog').showModal();
};
$('#scenarios-body').addEventListener('click', (e) => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.load) return loadScenario(S.scenarios.find((x) => x.id === el.dataset.load));
  if (el.dataset.remove) {
    S.scenarios = S.scenarios.filter((x) => x.id !== el.dataset.remove);
    persistScenarios();
    return renderScenarios();
  }
  if (el.id === 'scen-clear' && confirm(`刪除全部 ${S.scenarios.length} 個情境？`)) {
    S.scenarios = [];
    persistScenarios();
    return renderScenarios();
  }
  if (el.id === 'scen-export') return download(JSON.stringify({ application: 'TIM Dispensing Lab', version: VERSION, goals: S.goals, scenarios: S.scenarios }, null, 2), 'TIM_情境.json', 'application/json');
  if (el.id === 'scen-csv') {
    const cols = ['排名', '情境', '判定', '膠量 mL', '需求倍數', '覆蓋 %', '溢出 mm', '夾氣 處', '夾氣 mm²', '溫升 °C', '動作 s', '設定', '來源'];
    const order = rank(S.scenarios.map((x) => ({ ...x.metrics, id: x.id })), S.goals).map((m) => S.scenarios.find((x) => x.id === m.id));
    const quote = (v) => `"${String(v).replaceAll('"', '""')}"`;
    const rows = order.map((x, i) => {
      const m = x.metrics;
      const j = judge(m, S.goals);
      return [i + 1, x.name, j.pass ? '達標' : '未達標', m.depositedMl.toFixed(4), m.volumeRatio.toFixed(3), m.coveredPercent.toFixed(2), m.squeezeOutMm.toFixed(2), m.voidCount, m.voidAreaMm2.toFixed(2), m.rise.toFixed(3), m.cycle.toFixed(3), settingsText(x), x.source || ''];
    });
    return download(`﻿${[cols, ...rows].map((r) => r.map(quote).join(',')).join('\n')}`, 'TIM_情境比較.csv', 'text/csv');
  }
});
$('#scenarios-body').addEventListener('change', async (e) => {
  const el = e.target;
  if (el.dataset.rename) {
    const x = S.scenarios.find((y) => y.id === el.dataset.rename);
    if (x) x.name = el.value.trim() || x.name;
    return persistScenarios();
  }
  if (el.id === 'scen-import' && el.files?.[0]) {
    try {
      const data = JSON.parse(await el.files[0].text());
      const items = (Array.isArray(data) ? data : data.scenarios || []).filter((x) => x && x.config && x.heat && x.pattern && x.metrics && Number.isFinite(x.metrics.coveredPercent));
      if (!items.length) throw new Error('檔案中沒有可用的情境');
      for (const x of items) S.scenarios.push({ ...x, id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}` });
      persistScenarios();
      toast(`已匯入 ${items.length} 個情境`, 'ok');
    } catch (err) {
      toast(`匯入失敗：${err.message}`, 'error');
    }
    renderScenarios();
  }
});

// Robust settings search for the current path: a dose window that holds under ±tolerance, the dose set
// through the drive (motion fallback) or through the motion, and for a pattern also its pitch, inset and
// (optionally) the nozzle. A line or a dot has no pattern geometry, so only its dose is searched. The search
// runs on a pool of workers at one of four fineness levels; it can be stopped, keeping what it has found.
const BEAD_TEXT = { ok: '良好', stretched: '被拉細', piled: '堆疊', 'n/a': '—' };
const POOL_SIZE = Math.max(1, Math.min(8, (navigator.hardwareConcurrency || 4) - 1));
function beadCell(b) {
  if (!b) return '—';
  if (b.speedRatio === null) return b.drags ? '<span class="warn">針嘴埋入</span>' : b.flattened ? '被針距壓平' : '—';
  const warn = b.state !== 'ok' || b.drags;
  const note = [b.state === 'ok' ? '' : `${BEAD_TEXT[b.state]} ×${fmt(b.speedRatio, 1)}`, b.drags ? '針嘴埋入' : ''].filter(Boolean).join('・');
  return `<span class="${warn ? 'warn' : ''}" title="移動速度 ÷ 針嘴出膠速度 = ${fmt(b.speedRatio, 2)}；匹配內徑約 ${fmt(b.matchedId, 2)} mm">${warn ? note : `良好 ×${fmt(b.speedRatio, 1)}`}</span>`;
}
const searchConfig = () => (S.config.mode === 'pattern' ? { ...S.config, pathSettings: pathSettings() } : { ...S.config });
const clockText = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
function durationText(s) {
  if (!Number.isFinite(s)) return '—';
  if (s < 90) return `約 ${Math.max(5, Math.round(s / 5) * 5)} 秒`;
  if (s < 3600) return `約 ${(s / 60).toFixed(s < 600 ? 1 : 0)} 分`;
  return `約 ${(s / 3600).toFixed(1)} 小時`;
}

// Duration estimate: one timed dose tuning and two squeezes (1.0 and 0.5 mm) for the current settings at the
// upper screening dose (where most evaluations happen; squeezing more glue takes longer), run in the
// background when the dialog opens, then scaled by each level's plan and the worker count.
function calibrationKey() {
  return JSON.stringify([searchConfig(), S.heat, knobFor(), S.goals, S.optOptions.tolerance, S.optOptions.dose]);
}
function requestCalibration() {
  const key = calibrationKey();
  if (S.optCal?.key === key || S.optimize?.running) return;
  S.optCal = { key, pending: true };
  const config = searchConfig();
  const target = requiredMl() * screeningDoses(S.goals, S.optOptions.tolerance, S.optOptions.dose).at(-1);
  compute('calibrate', { config, heat: { ...S.heat }, target, knob: knobFor(config.mode) })
    .then((cal) => {
      if (S.optCal?.key !== key) return;
      S.optCal = { key, cal };
      if ($('#optimize-dialog').open && !S.optimize?.running) renderOptimize();
    })
    .catch(() => {
      if (S.optCal?.key === key) S.optCal = { key, error: true };
      if ($('#optimize-dialog').open && !S.optimize?.running) renderOptimize();
    });
}
function estimateFor(level) {
  const cal = S.optCal?.key === calibrationKey() ? S.optCal.cal : null;
  return cal ? estimateSeconds(planSearch(searchConfig(), S.heat, { ...S.optOptions, level }), cal, POOL_SIZE) : null;
}
function levelPlanText(plan) {
  const grid = `網格 ${plan.searchCell} mm 篩選與找窗口，${plan.verifyCell} mm 複核`;
  if (plan.geometries === 1) return `只搜尋膠量：${plan.screenDoses} 個膠量起步 → 找膠量窗口（二分 ${plan.bisections} 次）→ 在容差內 ${plan.band} 個膠量複核；${grid}；最多約 ${plan.coarse + plan.fine} 次試算`;
  return `${plan.geometries} 組幾何 × ${plan.screenDoses} 個膠量篩選 → 前 ${plan.keep} 組找膠量窗口（二分 ${plan.bisections} 次）→ 前 ${plan.verify} 組在容差內 ${plan.band} 個膠量複核；${grid}；最多約 ${plan.coarse + plan.fine} 次試算`;
}

// Parallel evaluations: a pool of compute workers, closed when the search ends or is stopped.
function createPool(size) {
  const queue = [];
  const busy = new Map();
  const idle = [];
  let alive = size;
  let closed = false;
  let seq = 0;
  const pump = () => {
    while (!closed && idle.length && queue.length) {
      const w = idle.pop();
      const job = queue.shift();
      job.id = ++seq;
      busy.set(w, job);
      w.postMessage({ id: job.id, type: job.type, payload: job.payload });
    }
  };
  const workers = Array.from({ length: size }, () => {
    const w = new Worker(new URL('./compute-worker.js', import.meta.url), { type: 'module' });
    w.onmessage = ({ data }) => {
      const job = busy.get(w);
      if (!job || data.id !== job.id || data.progress !== undefined) return;
      busy.delete(w);
      idle.push(w);
      if (data.ok) job.resolve(data.result);
      else job.reject(new Error(data.error));
      pump();
    };
    w.onerror = (e) => {
      e.preventDefault?.();
      const job = busy.get(w);
      busy.delete(w);
      job?.reject(new Error('背景計算失敗'));
      if (--alive <= 0) for (const j of queue.splice(0)) j.reject(new Error('背景計算失敗'));
    };
    idle.push(w);
    return w;
  });
  return {
    run: (type, payload) => (closed ? Promise.reject(new Error('已取消')) : new Promise((resolve, reject) => (queue.push({ type, payload, resolve, reject }), pump()))),
    close() {
      if (closed) return;
      closed = true;
      workers.forEach((w) => w.terminate());
      const error = new Error('已取消');
      for (const job of [...busy.values(), ...queue.splice(0)]) job.reject(error);
      busy.clear();
    },
  };
}

function openOptimize() {
  requestCalibration();
  renderOptimize();
  $('#optimize-dialog').showModal();
}
const pathText = (c, pattern) =>
  c.mode === 'pattern' ? PATTERN_NAMES[pattern.pattern] : c.mode === 'point' ? `單點（${c.offsetX}, ${c.offsetY} mm）` : `直線 ${c.lineLength} mm（中心 ${c.offsetX}, ${c.offsetY}）`;
function optTimeText(o) {
  const elapsed = (performance.now() - o.startedAt) / 1000;
  const p = o.progress || 0;
  const byProgress = p > 0.02 ? (elapsed * (1 - p)) / p : null;
  const byEstimate = o.estimate != null ? Math.max(0, o.estimate - elapsed) : null;
  const w = Math.min(1, p / 0.3);
  const left = byProgress === null ? byEstimate : byEstimate === null ? byProgress : w * byProgress + (1 - w) * byEstimate;
  return `已用 ${clockText(elapsed)}${left === null ? '' : ` · 預估剩 ${clockText(Math.max(0, left))}`}`;
}
function updateOptRunning() {
  const o = S.optimize;
  if (!o?.running) return;
  const bar = $('#optimize-body .progress i');
  if (bar) bar.style.width = `${(o.progress || 0) * 100}%`;
  const st = $('#opt-status');
  if (st) st.textContent = `${o.label || '準備中…'}（${Math.round((o.progress || 0) * 100)}%）`;
  const tm = $('#opt-time');
  if (tm) tm.textContent = optTimeText(o);
}
function renderOptimize() {
  if (!S.optimize?.running) requestCalibration();
  const o = S.optimize || {};
  const opt = S.optOptions;
  const c = S.config;
  const r = o.result;
  // Before a run the dialog describes the current path; afterwards the path that was searched.
  const base = r ? o.config : c;
  const geometry = r ? r.space.geometry : c.mode === 'pattern';
  const pitched = r ? r.space.pitched : geometry && PITCHED.includes(S.pattern.pattern);
  const motion = motionOf(base.mode);
  const body = $('#optimize-body');
  const rows = r ? r.candidates.slice(0, 12) : [];
  const best = rows[0];
  const anyPass = rows.some((x) => x.pass);
  const tolPct = Math.round(opt.tolerance * 100);
  const level = levelOf(opt.level);
  const plan = planSearch(searchConfig(), S.heat, { ...opt, level: level.level });
  const mv = (x) => `${fmt(x.settings[motion.key], motion.digits)} ${motion.unit}`;
  const moved = (x) => (motion.key === 'speed' ? (x.settings.speed < o.config.speed ? '已降速' : '已提速') : '已改開膠時間');
  const knobCell = (x) =>
    r.knob.id === 'drive' ? `${fmt(x.knobValue, 0)} ${r.knob.unit}<br><small>${mv(x)}${x.fallback ? `<span class="warn">（${moved(x)}）</span>` : ''}</small>` : mv(x);
  const doseText = (x) => `${r.knob.id === 'drive' ? `${r.knob.label} ${fmt(x.knobValue, 0)} ${r.knob.unit}、` : ''}${motion.label} ${mv(x)}`;
  const geoText = (x) => (geometry ? `${pitched ? `間距 ${x.spacing} mm、` : ''}內縮 ${x.edgeInset} mm、針嘴 ${esc(needleLabel(x.diameter))}、` : '');
  const windowCell = (x) =>
    x.screenedOnly ? '<small class="muted">只篩選</small>' : `${x.fCov === null ? '—' : fmt(x.fCov, 2)}–${x.fOvf === null ? '—' : fmt(x.fOvf, 2)}×${x.margin !== null ? `<br><small>±${fmt(x.margin * 100, 0)}%</small>` : ''}`;
  const pair = (nominal, worst, digits) => `${fmt(nominal, digits)}${worst !== undefined ? `<br><small>±${tolPct}%：${fmt(worst, digits)}</small>` : ''}`;
  const rowVerdict = (x) => (x.pass ? '<span class="ok-badge">達標</span>' : x.coarsePass ? '<span class="no-badge">粗網格達標・未複核</span>' : verdict(x.worst || x));
  const searched = geometry
    ? `${pitched ? '路徑間距、' : ''}邊界內縮；每組幾何找出達標的膠量窗口${opt.nozzle === 'match' ? '；針嘴依間距配對標準規格' : ''}`
    : `膠量窗口（${base.mode === 'point' ? '單點' : '直線'}沒有圖樣幾何可調，只搜尋膠量）`;
  const fixed = `${esc(pathText(base, r ? o.pattern : S.pattern))}、熱源 ${S.heat.shape === 'circle' ? `Ø${S.heat.width}` : `${S.heat.width} × ${S.heat.depth}`} mm、間隙 ${S.heat.gap} mm、${esc(MATERIALS[c.material].name)}、${base.mode === 'point' ? '' : `加速度 ${c.acceleration} mm/s²、`}針距 ${c.standoff} mm、收尾設定、壓合 ${S.heat.pressKgf} kgf／${AIR_MODE_SHORT[S.heat.airMode]}`;
  const estimateLabel = (l) => (S.optCal?.pending ? '估算中…' : S.optCal?.error ? '無法估算' : durationText(estimateFor(l.level)));
  body.innerHTML = `
  <p class="lead">在目前條件下搜尋「膠量在 ±${tolPct}% 變動內仍達標，且標稱膠量最少」的設定。這是模擬器上的數值搜尋，結果與模型同樣未經實機校準。</p>
  <div class="opt-scope"><div><b>固定</b><span>${fixed}</span></div><div><b>搜尋</b><span>${searched}</span></div></div>
  ${goalControls()}
  <div class="goal-controls">
    <label>膠量容差 ± <input type="number" data-opt="tolerance" value="${tolPct}" min="0" max="40" step="1"> %</label>
    <label>膠量調整 <select data-opt="knob">${knobChoices(c.mode)
      .map(([v, t]) => `<option value="${v}" ${v === knobFor(c.mode) ? 'selected' : ''}>${t}</option>`)
      .join('')}</select></label>
    ${c.mode === 'pattern' ? `<label>針嘴 <select data-opt="nozzle"><option value="fixed" ${opt.nozzle === 'fixed' ? 'selected' : ''}>固定目前 ${esc(needleLabel(c.diameter))}</option><option value="match" ${opt.nozzle === 'match' ? 'selected' : ''}>依間距配對標準針嘴</option></select></label>` : ''}
    <label>週期上限 <input type="number" data-opt="cycleLimit" value="${opt.cycleLimit ?? ''}" min="1" max="600" step="any" placeholder="不限"> s</label>
    <label>膠量範圍 <input type="number" data-opt="dose0" value="${opt.dose[0]}" min="0.05" max="5" step="any"> – <input type="number" data-opt="dose1" value="${opt.dose[1]}" min="0.1" max="6" step="any"> × 間隙體積</label>
  </div>
  <div class="opt-levels">
    <span class="opt-levels-title">搜尋精細度</span>
    <div class="levels" role="radiogroup" aria-label="搜尋精細度">${SEARCH_LEVELS.map(
      (l) => `<button type="button" role="radio" data-level="${l.level}" aria-checked="${l.level === level.level}" class="${l.level === level.level ? 'active' : ''}" ${o.running ? 'disabled' : ''}><b>${l.level}．${l.name}</b><span>${estimateLabel(l)}</span></button>`,
    ).join('')}</div>
    ${o.running ? '' : `<button class="primary" id="opt-run">${ICONS.spark}<span>${r ? '重新搜尋' : '開始搜尋'}</span></button>`}
  </div>
  <p class="muted small-note">${esc(level.name)}：${levelPlanText(plan)}；${POOL_SIZE} 個執行緒並行。時間依這台電腦試算一次後估計，實際會隨夾氣多寡與膠量差 ±50%。</p>
  ${
    o.running
      ? `<div class="opt-run"><div class="progress"><i style="width:${(o.progress || 0) * 100}%"></i></div><div class="opt-run-row"><span id="opt-status">${esc(o.label || '準備中…')}</span><span id="opt-time" class="mono">${optTimeText(o)}</span><button class="stop-btn" id="opt-cancel">${ICONS.stop}<span>停止搜尋</span></button></div><p class="muted small-note">停止後會保留已完成的部分結果；標示「未複核」的列尚未以細網格在容差內確認。</p></div>`
      : ''
  }
  <p class="muted small-note">容差代表量產時膠量的正常漂移（時間壓力式常見 ±5–10%，容積式較小）。膠量調整方式與左上「膠量列」共用。${c.mode === 'pattern' ? '針嘴內徑影響出膠量與膠條品質：以「移動速度 ÷ 針嘴出膠速度」檢查是否被拉細或堆疊（0.7–1.5 為 AI 初估的良好範圍）；膠條截面的高寬由針嘴離面高度決定。' : c.mode === 'point' ? '單點的膠量由開膠時間與壓力決定；落點與大小請同時確認針距（太低會把膠點壓扁或埋針）。' : ''}</p>
  ${o.error ? `<p class="note warn-note">${esc(o.error)}</p>` : ''}
  ${o.stopped ? `<p class="note warn-note">已停止搜尋（${clockText(o.elapsed)}，完成 ${r.evaluations} 次試算）。以下是停止前的部分結果；標示「未複核」或「只篩選」的列尚未完成，不能當作最終建議。</p>` : ''}
  ${
    r
      ? `${
          best
            ? `<div class="opt-best ${best.pass ? 'pass' : 'fail'}"><b>${best.pass ? '建議設定' : best.coarsePass ? '粗網格達標、尚未複核' : '最接近的取捨'}</b><span>${geoText(best)}${doseText(best)} → 標稱 ${fmt(best.depositedMl, 3)} mL（${fmt(best.depositedMl * o.config.density, 3)} g，${fmt(best.volumeRatio, 2)}×）</span><span>${
                best.worst ? `膠量 ±${tolPct}% 內（${r.band} 點）：覆蓋 ≥ ${fmt(best.worst.coveredPercent, 1)}%、溢膠 ≤ ${fmt(best.worst.squeezeOutMm, 1)} mm` : `標稱：覆蓋 ${fmt(best.coveredPercent, 1)}%、溢膠 ${fmt(best.squeezeOutMm, 1)} mm`
              }；週期 ${fmt(best.cycle, 1)} s${best.bead.speedRatio !== null || best.bead.drags ? `；${base.mode === 'point' ? '膠點' : '膠條'} ${beadCell(best.bead)}` : ''}${best.bead.state !== 'ok' && best.bead.state !== 'n/a' ? `（匹配內徑約 ${fmt(best.bead.matchedId, 2)} mm）` : ''}</span>${
                best.fallback ? `<span class="warn">${r.knob.label}已到範圍極限，改以${motion.label}達到膠量（${fmt(o.config[motion.key], motion.digits)} → ${mv(best)}）。</span>` : ''
              }${best.fCovAtMin ? `<span class="warn">覆蓋在膠量範圍下限 ${fmt(r.dose[0], 2)}× 就已達標，真正的最少膠量可能更低：可把膠量範圍下限調低後再搜尋。</span>` : ''}${
                !(best.depositedMl > 1e-9)
                  ? `<span class="warn">這組設定不會有膠沉積到工件${base.mode !== 'point' && base.shutoffDistance > 0 ? `（提前關膠 ${base.shutoffDistance} mm 是否 ≥ 路徑長？）` : ''}；請先檢查路徑與收尾設定。</span>`
                  : best.pass || best.coarsePass
                    ? ''
                    : best.fCov !== null && best.fOvf !== null && best.fCov > best.fOvf
                      ? `<span class="warn">兩個目標互相衝突：覆蓋 ${S.goals.coverage}% 需要 ≥ ${fmt(best.fCov, 2)}× 膠量，但溢膠 ≤ ${S.goals.overflow} mm 只允許 ≤ ${fmt(best.fOvf, 2)}×。請放寬溢膠上限或降低覆蓋目標${geometry ? '，或換圖樣' : '，或改用依熱源圖樣'}。</span>`
                      : best.fCov === null && !best.screenedOnly
                        ? `<span class="warn">在膠量範圍與設備限制內都達不到覆蓋 ${S.goals.coverage}%：請提高膠量上限、降低覆蓋目標${geometry ? '或換圖樣' : '，或改用依熱源圖樣（單點／直線難以鋪滿大熱源）'}。</span>`
                        : best.fOvf === null && !best.screenedOnly
                          ? `<span class="warn">膠量範圍下限（${fmt(r.dose[0], 2)}×）的溢膠就已超過 ${S.goals.overflow} mm：${geometry ? '請加大邊界內縮、放寬溢膠上限或降低膠量下限' : base.mode === 'line' ? '直線可能比熱源長（兩端露出熱源），請縮短直線、放寬溢膠上限或降低膠量下限' : '請確認點位在熱源中心、放寬溢膠上限或降低膠量下限'}。</span>`
                          : best.screenedOnly
                            ? ''
                            : `<span class="warn">膠量窗口不足 ±${tolPct}%，或在細網格複核時沒有全部達標、設備或週期限制未達；量產漂移時可能超出目標。</span>`
              }</div>`
            : ''
        }
      <p class="note">${esc(o.describe)}　需求 ${fmt(r.required, 3)} mL；${esc(levelOf(r.level ?? 2).name)}：試算 ${r.evaluations} 次（${fmt(r.searchCell, 2)} mm 網格篩選與找窗口，${fmt(r.verifyCell, 2)} mm 網格在 ${r.band} 個膠量複核）${o.elapsed ? `，耗時 ${clockText(o.elapsed)}` : ''}。</p>
      ${anyPass || o.stopped ? '' : '<p class="note warn-note">沒有設定在膠量容差內同時達到兩個目標；下表依差距排序。</p>'}
      <div class="table-scroll"><table class="cmp opt"><thead><tr><th>#</th><th>判定</th>${pitched ? '<th>間距<br><small>mm</small></th>' : ''}${geometry ? '<th>內縮<br><small>mm</small></th><th>針嘴</th>' : ''}<th>標稱膠量<br><small>mL（×需求）</small></th><th>可行窗口<br><small>×需求</small></th><th>${r.knob.id === 'drive' ? `${r.knob.label}<br><small>${r.knob.unit}／${motion.label}</small>` : `${motion.label}<br><small>${motion.unit}</small>`}</th><th>覆蓋<br><small>%</small></th><th>溢出<br><small>mm</small></th><th>夾氣<br><small>處 / mm²</small></th><th>週期<br><small>s</small></th><th>${base.mode === 'point' ? '膠點' : '膠條'}</th><th></th></tr></thead><tbody>
      ${rows
        .map(
          (x, i) =>
            `<tr class="${i === 0 && x.pass ? 'top' : ''}"><td>${i + 1}</td><td>${rowVerdict(x)}${!x.reached ? '<br><small class="warn">設備範圍內達不到膠量</small>' : ''}${!x.cycleOk ? '<br><small class="warn">超過週期上限</small>' : ''}</td>${pitched ? `<td>${x.spacing}</td>` : ''}${geometry ? `<td>${x.edgeInset}</td><td>${esc(needleLabel(x.diameter))}</td>` : ''}<td>${fmt(x.depositedMl, 3)} <small>(${fmt(x.volumeRatio, 2)}×)</small></td><td>${windowCell(x)}</td><td>${knobCell(x)}</td><td>${pair(x.coveredPercent, x.worst?.coveredPercent, 1)}</td><td>${pair(x.squeezeOutMm, x.worst?.squeezeOutMm, 1)}</td><td>${x.voidCount} / ${fmt(x.voidAreaMm2, 1)}</td><td class="${x.cycleOk ? '' : 'warn'}">${fmt(x.cycle, 1)}</td><td>${beadCell(x.bead)}</td><td class="row-actions"><button class="chip-btn" data-opt-apply="${i}">套用</button><button class="chip-btn" data-opt-save="${i}">存成情境</button>${x.verified ? '' : `<small class="muted">${x.screenedOnly ? '只篩選' : '粗網格'}</small>`}</td></tr>`,
        )
        .join('')}
      </tbody></table></div>
      <p class="note">可行窗口：左＝達到覆蓋目標的最少膠量，右＝溢膠不超過上限的最多膠量；標稱膠量取左界 ÷ (1 − 容差)，並以細網格在容差內 ${r.band} 個膠量複核，全部達標才算「達標」。套用時網格會設成該列使用的網格，按「模擬壓合」可重現表中數值；請再以透明板在 −${tolPct}%／標稱／+${tolPct}% 各試一片。</p>`
      : ''
  }`;
  bindGoals(body, renderOptimize);
}
$('#optimize-body').addEventListener('change', (e) => {
  const el = e.target;
  const k = el.dataset.opt;
  if (!k) return;
  if (k === 'knob') {
    // Shared with the dose bar.
    S.dose = { ...S.dose, [S.config.mode === 'point' ? 'pointKnob' : 'knob']: el.value };
    persistDose();
    renderDose();
    requestCalibration();
    if (!S.optimize?.running) renderOptimize();
    return;
  }
  const o = { ...S.optOptions };
  if (k === 'nozzle') o[k] = el.value;
  else if (k === 'cycleLimit') o.cycleLimit = el.value.trim() ? Number(el.value) : null;
  else {
    if (!el.value.trim() || !el.checkValidity()) return toast('請輸入欄位範圍內的數值', 'error');
    const v = Number(el.value);
    if (k === 'tolerance') o.tolerance = v / 100;
    if (k === 'dose0') o.dose = [v, o.dose[1]];
    if (k === 'dose1') o.dose = [o.dose[0], v];
  }
  S.optOptions = o;
  store.set('tim-opt', JSON.stringify(o));
  if (!S.optimize?.running) renderOptimize();
});
async function runOptimize() {
  const opt = S.optOptions;
  if (!(opt.dose[0] > 0 && opt.dose[1] > opt.dose[0])) return toast('膠量範圍需為 0 < 下限 < 上限', 'error');
  if (typeof Worker === 'undefined') return toast('此瀏覽器不支援背景計算，無法執行自動最佳化', 'error');
  const config = searchConfig();
  const heat = { ...S.heat };
  const pattern = { ...S.pattern };
  const level = levelOf(opt.level).level;
  const pool = createPool(POOL_SIZE);
  const state = { running: true, progress: 0, label: '準備中…', startedAt: performance.now(), estimate: estimateFor(level), pool, partial: null };
  S.optimize = state;
  renderOptimize();
  const timer = setInterval(updateOptRunning, 1000);
  const meta = () => ({ config, heat, pattern, describe: describe(config, heat), elapsed: (performance.now() - state.startedAt) / 1000 });
  try {
    const result = await optimizeSettings(config, heat, {
      ...opt,
      level,
      knob: knobFor(config.mode),
      nozzle: config.mode === 'pattern' ? opt.nozzle : 'fixed',
      goals: { ...S.goals },
      evaluate: (task) => pool.run('evaluate', task),
      onProgress: (progress, label) => {
        state.progress = progress;
        state.label = label;
        updateOptRunning();
      },
      onPartial: (partial) => (state.partial = partial),
    });
    S.optimize = { result, ...meta() };
  } catch (e) {
    const stopped = e.message === '已取消';
    S.optimize = stopped && state.partial ? { result: state.partial, stopped: true, ...meta() } : { error: stopped ? '已停止搜尋；還沒有完成任何一組，沒有結果可顯示。' : e.message };
  } finally {
    clearInterval(timer);
    pool.close();
  }
  if ($('#optimize-dialog').open) renderOptimize();
  else if (S.optimize.result) toast(S.optimize.stopped ? '自動最佳化已停止，部分結果在「自動最佳化」中' : '自動最佳化完成，結果在「自動最佳化」中', 'ok');
}
function candidateEntry(x) {
  const o = S.optimize;
  const r = o.result;
  const geometry = r.space.geometry;
  const pattern = geometry ? { ...o.pattern, spacing: x.spacing, edgeInset: x.edgeInset } : { ...o.pattern };
  const config = { ...o.config, ...x.settings };
  if (geometry) config.pathSettings = { ...o.config.pathSettings, spacing: x.spacing, edgeInset: x.edgeInset };
  const { spacing, edgeInset, diameter, factor, knobValue, settings, reached, fallback, cycleOk, bead, fCov, fOvf, fCovAtMin, margin, robust, worst, verified, screenedOnly, pass, coarsePass, short, over, deficit, ...metrics } = x;
  // The grid the row was computed on, so that "模擬壓合" reproduces it.
  const heat = { ...o.heat, cellSize: verified ? r.verifyCell : r.searchCell };
  return { config, heat, pattern, metrics, source: verified ? `自動最佳化・${levelOf(r.level ?? 2).name}（已複核）` : o.stopped ? '自動最佳化（未完成）' : '自動最佳化（粗網格）' };
}
$('#optimize-body').addEventListener('click', (e) => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.level) {
    S.optOptions = { ...S.optOptions, level: Number(el.dataset.level) };
    store.set('tim-opt', JSON.stringify(S.optOptions));
    return renderOptimize();
  }
  if (el.id === 'opt-run') return runOptimize();
  if (el.id === 'opt-cancel') {
    el.disabled = true;
    return S.optimize?.pool?.close();
  }
  const rows = S.optimize?.result?.candidates || [];
  if (el.dataset.optSave !== undefined) return addScenario(candidateEntry(rows[Number(el.dataset.optSave)]));
  if (el.dataset.optApply !== undefined) {
    const x = rows[Number(el.dataset.optApply)];
    const r = S.optimize.result;
    const entry = candidateEntry(x);
    const gridChanged = entry.heat.cellSize !== S.heat.cellSize;
    S.heat = { ...entry.heat };
    S.pattern = entry.pattern;
    if (tryRecompute({ ...S.config, ...entry.config })) {
      $('#optimize-dialog').close();
      markPressStale();
      const motion = motionOf(entry.config.mode);
      const geo = r.space.geometry ? `${r.space.pitched ? `間距 ${x.spacing} mm、` : ''}內縮 ${x.edgeInset} mm、針嘴 ${needleLabel(x.diameter)}、` : '';
      toast(`已套用：${geo}${r.knob.id === 'drive' ? `${r.knob.label} ${fmt(x.knobValue, 0)} ${r.knob.unit}、` : ''}${motion.label} ${fmt(x.settings[motion.key], motion.digits)} ${motion.unit}${gridChanged ? `；網格設為 ${entry.heat.cellSize} mm（與這列結果相同）` : ''}`, 'ok');
    }
  }
});
persistScenarios();

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
      lineGeometry: 'shared_half_ellipse_rings_total_volume_normalized_pressed_to_standoff_within_nozzle_reach',
      pointGeometry: 'spherical_cap_pressed_to_standoff_within_nozzle_reach',
      surfaceAllocation: 'outlet_before_first_lift_only_except_legacy',
      squeeze: `parallel_plate_hele_shaw_constant_force_to_spacer_${S.heat.airMode}_air`,
      thermal: 'one_dimensional_bulk_plus_tds_derived_contact',
      hardwareAppearance: 'reference_envelopes_with_assumed_details_not_OEM_CAD',
    },
    config: S.config,
    heatSource: S.heat,
    pattern: S.pattern,
    doseTarget: { ...S.dose, targetMl: doseTargetMl(), requiredMl: requiredMl() },
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
      return `<tr class="${p.v1 ? 'v1' : ''}"><td><code>${esc(p.id)}</code>${p.v1 ? `<em class="tag tag-derived">v${p.since || '1.0'} 更新</em>` : ''}</td><td>${esc(p.value)} ${esc(p.unit || '')}${old ? `<br><small>原 v0.3：${esc(old.value)}</small>` : ''}</td><td>${esc(EVIDENCE[p.evidence] || p.evidence)}<br><small>${esc(p.role || '控制初值')}</small></td><td>${esc(p.basis)}<br><small>${esc((p.source_refs || []).join(' / '))}</small></td></tr>`;
    })
    .join('');
}
$('#help-body').innerHTML = `
<ol class="steps">
  <li><b>① 熱源工件</b>：輸入元件接觸面的形狀、尺寸、位置、組裝間隙（墊片高度）與功耗；它們決定膠量需求（熱源面積 × 間隙）與「依熱源」路徑。點膠平板的尺寸與 STL／GLB 匯入收在同頁的「工件」群組。</li>
  <li><b>② 膠材設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），設定壓力或轉速、針嘴內徑與響應參數。</li>
  <li><b>③ 路徑</b>：依熱源選中心線／N／蛇形／螺旋／外框，或直線、單點；設定速度、加速度與針嘴離面高度。針嘴低於膠的自然高度時，膠被壓成針距高度並變寬（膠量不變）；過低會埋針。</li>
  <li><b>④ 收尾</b>：提前關膠、停留、抬針與回退、PCP 反轉。</li>
  <li><b>⑤ 壓合</b>：透明板的壓合力、下降速度、夾氣處理（可壓縮／剛性牆／全排出）、黏度、降伏應力、靜置時間與估算網格。</li>
  <li><b>膠量列（左上，固定顯示）</b>：顯示需求、目前沉積與比值。輸入目標（× 需求、mL 或 g）後按「套用」：線與圖樣預設「調壓力（P300 調轉速），到極限才改速度」，也可選只調速度；單點預設調開膠時間，也可選調壓力。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>模擬壓合</b>：結果卡的「模擬壓合」顯示透明板以定力壓到墊片、膠膜擴散、氣泡（紅色）壓縮／遷移／排出與靜置後回脹；可切換「前緣時序」著色。</li>
  <li><b>上方工具列</b>：「圖樣比較」在等膠量下比較各熱源圖樣（膠量用膠量列的調整方式）；「自動最佳化」搜尋膠量 ±容差（預設 ±10%）內都達標、膠量最少的設定——依熱源圖樣會一併搜尋間距（蛇形／螺旋）、邊界內縮與針嘴，直線與單點只搜尋膠量；「情境比較」一次比較所有存下的情境。</li>
  <li><b>最佳化精細度</b>：快速／標準／精細／極精細四級，越精細候選越多、找窗口與複核的組數越多、網格越細；選級時會依這台電腦試算一次估出時間。搜尋分散在多個執行緒並行；搜尋中可按「停止搜尋」，會保留已完成的部分結果（標示「未複核」者不能當最終建議）。只有在細網格、容差內多個膠量都達標的結果才算「達標」；套用時網格會設成該結果使用的網格。</li>
  <li><b>情境</b>：覺得不錯的參數按結果卡的「存成情境」（未壓合會自動先算），再改參數繼續試；「情境比較」依「覆蓋 ≥ 目標、溢膠 ≤ 上限、膠量最少」排序，可載入、改名、刪除、匯出 CSV／JSON。情境存在這台電腦的瀏覽器。</li>
  <li><b>針嘴與膠條</b>：同樣每 mm 膠量下，膠條的高與寬由針嘴離面高度決定；針嘴內徑決定出膠量與膠條品質。結果卡的「移動速度 ÷ 出膠速度」0.7–1.5 視為良好，偏大代表膠條被拉細，偏小代表堆疊；匹配內徑 ≈ √(4 × 每 mm 膠量 / π)。</li>
  <li><b>曲線</b>：退離完成後的灰色區域是「尾膠結算」——模型繼續積分關膠後逐漸衰減的出膠，讓體積帳目完整，並非機台等待時間；週期時間以「動作完成」計。</li>
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
