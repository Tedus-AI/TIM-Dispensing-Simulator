import './style.css';
import registry from '../../data/engineering_defaults_v0.3.json';
import { fromRegistry, simulate, frameAt, calibrateFlow, LABEL, VERSION, ENDING_DEFAULT, MOTION_DEFAULTS, CORNER_DEFAULTS } from './engine.js';
import { PARAMETER_UPDATES, parameterValue } from './parameters.js';
import { MATERIALS } from './materials.js';
import { DispenseScene, VIEW_LABELS } from './scene.js';
import { HARDWARE_REFERENCES } from './hardware-reference.js';
import { estimateCompression, squeezeRheology, PRESS_DEFAULTS } from './compression.js';
import { GOAL_DEFAULTS, OPTIMIZE_DEFAULTS, SEARCH_LEVELS, SEARCH_PATTERNS, VARS_DEFAULT, TYPE_LABEL, DIRECTION_LABEL, CYCLE_REFERENCE, NOZZLE_PRESETS, levelOf, planSearch, searchSpace, autoRanges, currentPathLength, nozzleMode, nearestNeedle, gaugeTable, estimateSeconds, screeningDoses, optimizeSettings, judge, rank, metricsOf, beadMatch, needleLabel } from './optimize.js';
import { tuneDose, driveOf } from './tuning.js';
import { pageTemplate, ICONS, PATTERN_ICONS, PATTERN_NAMES } from './ui/template.js';
import { stackedBead } from './stacking.js';
import { drawChart, moveCursor, CHARTS } from './ui/chart.js';

// ───────────────────────── helpers ─────────────────────────
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fmt = (n, d = 3) => (Number.isFinite(n) ? Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—');
const clean = (n) => (Number.isFinite(n) ? +Number(n).toPrecision(6) : n);
// Hover note: a small circled "?" next to what it explains; the text shows on hover, focus or tap.
const tip = (text) => (text ? `<span class="tip" tabindex="0" role="img" aria-label="${esc(text)}" data-tip="${esc(text)}">?</span>` : '');
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

// v1.8: the nozzle default became 'auto' and travel speed a free per-geometry choice (no extra squeeze);
// optimiser settings saved by earlier versions take the new defaults for these two.
function migrateOptOptions(saved) {
  const o = { ...(saved || {}) };
  if (o.version !== 18) {
    delete o.nozzle;
    if (o.vars) o.vars = Object.fromEntries(Object.entries(o.vars).filter(([k]) => k !== 'speed'));
  }
  return { ...OPTIMIZE_DEFAULTS, ...o, version: 18 };
}
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
  busy: false,
  goals: { ...GOAL_DEFAULTS, ...(readJson('tim-goals') || {}) },
  scenarios: readJson('tim-scenarios') || [],
  optimize: null,
  optOptions: migrateOptOptions(readJson('tim-opt')),
  optCal: null,
  optSpeed: readJson('tim-opt-speed') || { ratio: 1, runs: 0 },
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

// One floating box for every [data-tip]: shown in the top layer (above dialogs, never clipped by a scroll
// area), placed below the target or above it near the bottom of the window.
const tipbox = $('#tipbox');
const canPopover = typeof tipbox.showPopover === 'function';
let tipFor = null;
function showTip(el) {
  const text = el.dataset.tip;
  if (!text) return;
  if (!canPopover) {
    el.title = text;
    return;
  }
  tipFor = el;
  tipbox.textContent = text;
  if (!tipbox.matches(':popover-open')) tipbox.showPopover();
  const r = el.getBoundingClientRect();
  const b = tipbox.getBoundingClientRect();
  const m = 8;
  const left = Math.min(window.innerWidth - b.width - m, Math.max(m, r.left + r.width / 2 - b.width / 2));
  let top = r.bottom + 6;
  if (top + b.height > window.innerHeight - m) top = Math.max(m, r.top - b.height - 6);
  tipbox.style.left = `${left}px`;
  tipbox.style.top = `${top}px`;
}
function hideTip() {
  if (!tipFor) return;
  tipFor = null;
  if (canPopover && tipbox.matches(':popover-open')) tipbox.hidePopover();
}
document.addEventListener('pointerover', (e) => {
  const el = e.target.closest?.('[data-tip]');
  if (el) {
    if (el !== tipFor) showTip(el);
  } else hideTip();
});
document.addEventListener('pointerout', (e) => {
  if (tipFor && !tipFor.contains(e.relatedTarget)) hideTip();
});
document.addEventListener('focusin', (e) => {
  const el = e.target.closest?.('[data-tip]');
  if (el) showTip(el);
});
document.addEventListener('focusout', () => hideTip());
document.addEventListener('scroll', () => hideTip(), true);
window.addEventListener('resize', () => hideTip());
// A "?" inside a group heading explains the group; tapping it must not fold the group.
document.addEventListener(
  'click',
  (e) => {
    const t = e.target.closest?.('.tip');
    if (!t) return;
    if (t.closest('summary, label')) e.preventDefault();
    showTip(t);
  },
  true,
);
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
        } else reject(new Error('此瀏覽器不支援背景計算，無法執行最佳化或時間估算'));
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
  return `<label class="field${disabled ? ' disabled' : ''}"><span class="lbl">${label}${tag ? `<em class="tag ${cls}">${t}</em>` : ''}${tip(hint)}</span><span class="input"><input type="number" data-bind="${bind}" value="${clean(value)}" min="${min}" max="${max}" step="${step}" ${disabled ? 'disabled' : ''} aria-label="${esc(label)}"><b>${unit}</b></span></label>`;
}
function select({ bind, id, label, value, options, hint }) {
  return `<label class="field"><span class="lbl">${label}${tip(hint)}</span><select ${bind ? `data-bind="${bind}"` : ''} ${id ? `id="${id}"` : ''}>${options.map(([v, t]) => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${t}</option>`).join('')}</select></label>`;
}
// The gauge closest to a bore, only when the bore is within the gauge range (else empty).
const gaugeNear = (d) => (d >= 0.2 && d <= 4.3 ? nearestNeedle(d).label : '');
// Needle size: a standard gauge (or the 1/8" guideline nozzle) from the list, or any bore typed in.
function nozzleFields(c, isPcp) {
  const preset = NOZZLE_PRESETS.find((n) => Math.abs(n.id - c.diameter) < 1e-6);
  const options = NOZZLE_PRESETS.map((n) => [String(n.id), n.label === '1/8"' ? `1/8 吋（${n.id} mm，Laird 指南用嘴）` : `${n.label}（${n.id.toFixed(2)} mm）`]);
  options.push(['custom', preset ? '自訂內徑' : `自訂（最接近 ${nearestNeedle(c.diameter).label}）`]);
  const table = `常見點膠針頭內徑（mm），號數越大越細：\n${gaugeTable()}\n1/8 吋 3.175（Laird 指南用嘴）\n14–25G 為 Nordson EFD 一般針頭型錄值，其餘為標準壁厚不鏽鋼針管；不同廠牌、薄壁針頭略有差異，請以手上針頭的型錄為準。${isPcp ? '\nP300 的出膠量不受針嘴影響，只影響持膠量、膠條與外觀。' : ''}`;
  return `<div class="pair">${select({ id: 'sel-nozzle', label: '針頭規格', value: preset ? String(preset.id) : 'custom', options, hint: '選標準針頭會自動填入右邊的內徑；也可以直接在右邊輸入任何內徑。' })}${num({ bind: 'c.diameter', label: '虛擬針嘴內徑', value: c.diameter, unit: 'mm', min: 0.2, max: 8, tag: 'geo', hint: table })}</div>`;
}
const group = (title, body, { open = true, note } = {}) =>
  `<details class="group" ${open ? 'open' : ''}><summary><span>${title}${tip(note)}</span></summary><div class="group-body">${body}</div></details>`;

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
  <div class="method"><span>${method}${tip(methodNote)}</span><strong>${fmt(q, 3)} <small>mL/s 穩態</small></strong></div>
  ${group(
    '驅動與針嘴',
    (isPcp
      ? num({ bind: 'c.rpm', label: '計量軸轉速', value: c.rpm, unit: 'rpm', min: 0, max: 300, tag: 'ai' }) + num({ bind: 'c.efficiency', label: '容積效率', value: c.efficiency, unit: '', min: 0, max: 1, tag: 'ai' })
      : `<div class="with-btn">${num({ bind: 'c.pressure', label: '驅動表壓', value: S.pressureUnit === 'bar' ? c.pressure * BAR : c.pressure, unit: S.pressureUnit, min: 0, max: S.pressureUnit === 'bar' ? 6.89475729 : 100, tag: 'ai', hint: '控制器上限 100 psi（Performus X100 額定）' })}<button class="chip-btn" id="pressure-unit">${S.pressureUnit === 'psi' ? 'bar' : 'psi'}</button></div>`) +
      nozzleFields(c, isPcp) +
      num({ bind: 'c.nozzleLength', label: '等效直管長', value: c.nozzleLength, unit: 'mm', min: 1, max: 100, tag: 'ai', hint: isPcp ? '只影響持膠量' : '流量基準長度，非針嘴總長' }),
  )}
  ${group(
    '用實測出膠量校正',
    `<div class="pair"><label class="field"><span class="lbl">實測重量</span><span class="input"><input type="number" id="cal-grams" min="0" step="any" placeholder="秤重結果" aria-label="實測重量"><b>g</b></span></label><label class="field"><span class="lbl">出膠時間</span><span class="input"><input type="number" id="cal-seconds" min="0" step="any" value="60" aria-label="出膠時間"><b>s</b></span></label></div><button class="chip-btn" id="cal-apply">校正出膠量</button>`,
    {
      open: false,
      note: `模型的出膠量是用資料表推估的，未經實機校準。用目前的${isPcp ? '轉速' : '壓力'}與針嘴（${fmt(c.diameter, 2)} mm）在原地連續出膠（例如 60 秒，避開開關膠的頭尾）後秤重，輸入重量與時間，模型就會對齊實測：${isPcp ? '調整容積效率' : c.material === 'putty' ? '調整 90 psi 參考流率' : '調整等效黏度'}。目前模型約 ${fmt(q * c.density * 60, 3)} g/min；換針嘴或膠材後建議再量一次。`,
    },
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
  ${select({ bind: 'h.shape', label: '熱源形狀', value: h.shape, options: [['rectangle', '矩形'], ['circle', '圓形']], hint: '熱源＝元件接觸面。它和組裝間隙決定膠量需求（上方膠量列）與「依熱源」路徑；中心偏移以工件中心為原點。' })}
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
    const pitchedPattern = ['serpentine', 'spiral'].includes(p.pattern);
    body += `<div class="pair">${pitchedPattern ? num({ bind: 'p.spacing', label: '路徑間距', value: p.spacing, unit: 'mm', min: 0.2, max: 1000, tag: 'ai' }) : ''}${num({ bind: 'p.edgeInset', label: '邊界內縮', value: p.edgeInset, unit: 'mm', min: 0, max: 500, tag: 'ai' })}</div>`;
    const patternNote =
      p.pattern === 'star'
        ? '米字形：從中心往四角與四邊中點各畫一條、再回到中心（每條走兩次，尖端會停一下），整條一筆完成。膠從中心往外推、空氣往外排，四角也有膠。邊界內縮只限制針尖中心，膠會再向外擴。'
        : '邊界內縮只限制針尖中心，膠會再向外擴。Laird／Parker 指南提醒蛇形、螺旋、外框較易夾氣。';
    body += `<p class="note inline-note">路徑長 ${fmt(S.run?.pathLength, 1)} mm${S.run?.motion?.corners ? ` · ${S.run.motion.corners} 個減速轉角（最低 ${fmt(S.run.motion.slowestCorner, 1)} mm/s）` : ''}${tip(patternNote)}</p>`;
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
    : `<p class="note inline-note">R75 沒有反轉回吸${tip('氣壓式關閉後，以「卸壓下降時間常數」近似殘壓出膠；不提供螺桿反轉。')}</p>`;
  return body;
}

// ⑤ Press: transparent plate pressed with a set force onto the spacers (the gap set in ①).
function renderPressTab() {
  const h = S.heat;
  return `
  ${group('壓合條件（透明板＋墊片）', pressFields(h), { open: true, note: `透明板以定力壓到墊片（組裝間隙 ${fmt(h.gap, 2)} mm，在「熱源工件」設定）即停，估算覆蓋、夾氣、溢膠與熱阻；設定好後按結果卡的「模擬壓合」。\n到墊片後膠壓消退，被壓縮的氣泡回脹到降伏應力擋住為止。實際手壓若先快後慢，壓合中的氣泡壓縮程度不同，最終回脹結果影響較小。\n模型：平行板 Hele-Shaw 擠壓；被膠包圍的空氣依所選方式處理（預設可壓縮：pV＝常數、可隨膠流移動、膠牆變薄時排出）。熱阻＝（間隙 ÷ k＋TDS 推算接觸熱阻）÷ 濕潤面積。皆未經透明板實測校準。` })}
  ${group('估算網格', num({ bind: 'h.cellSize', label: '網格解析度', value: h.cellSize, unit: 'mm', min: 0.2, max: 5, tag: 'ai', hint: '越小越細，計算時間增加；上限 90,000 格。夾氣數量對網格敏感，比較圖樣請用相同網格' }), { open: false })}
`;
}

const RENDERERS = { part: renderPart, equipment: renderEquipment, path: renderPath, ending: renderEnding, press: renderPressTab };
function renderTab() {
  const body = $('#tab-body');
  // Re-rendering the same tab keeps its scroll and which groups are open; another tab starts as designed.
  const same = body.dataset.tab === S.tab;
  const scroll = same ? body.scrollTop : 0;
  const openGroups = same ? $$('details.group', body).map((d) => d.open) : [];
  body.innerHTML = RENDERERS[S.tab]();
  body.dataset.tab = S.tab;
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
  if (el.id === 'sel-nozzle') {
    if (el.value === 'custom') return $('[data-bind="c.diameter"]')?.focus();
    return tryRecompute({ ...S.config, diameter: Number(el.value) });
  }
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
    if (!tryRecompute(S.config)) {
      S.pattern = previous;
      renderTab();
    }
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
    case 'cal-apply': {
      // Fit the flow law to a measured steady output at the current drive and nozzle.
      try {
        const fit = calibrateFlow(S.config, Number($('#cal-grams').value), Number($('#cal-seconds').value));
        if (!fit.inRange) return toast(`實測是模型的 ${fmt(fit.ratio, 2)} 倍，換算的數值超出允許範圍（${fit.range.join('–')}）；請確認重量、時間與目前的壓力和針嘴`, 'error');
        const label = { viscosity: '等效黏度', referenceRate: '90 psi 參考流率', efficiency: '容積效率' }[fit.key];
        const value = Number(fit.value.toPrecision(4));
        if (tryRecompute({ ...S.config, [fit.key]: value })) toast(`已校正：實測出膠是模型的 ${fmt(fit.ratio, 2)} 倍，${label}改為 ${value}`, 'ok');
      } catch (err) {
        toast(err.message, 'error');
      }
      return;
    }
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
  if (!t.reached && t.suggest)
    return `已達設備限制（${needleLabel(before.diameter)}），最接近 ${result}。改用 ${needleLabel(t.suggest.diameter)} 針頭（設備頁「針頭規格」選 ${needleLabel(t.suggest.diameter)}，內徑 ${t.suggest.diameter} mm）在目前速度就能達到；也可用自動最佳化一起選針嘴與速度`;
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

function kpi(label, value, unit, hint = '', cls = '', note = '') {
  return `<div class="kpi ${cls}"><span>${label}${tip(note)}</span><b>${value}<small>${unit}</small></b>${hint ? `<em>${hint}</em>` : ''}</div>`;
}

// What the stretch ratio means, shared by the result card and the optimiser table.
function beadTipText(b, nozzle) {
  const r = b.speedRatio;
  return [
    `拉細倍率 ×${fmt(r, 1)}＝針嘴平均移動速度 ÷ 膠從針嘴流出的速度＝針嘴內孔截面 ÷ 膠條截面。`,
    '約 ×1 時，膠像一條和針嘴差不多粗的繩子放到面上；0.7–1.5 為 AI 初估的良好範圍。',
    r > 1.5 ? `大於 1.5 是「被拉細」：膠條截面只有內孔的 1/${fmt(r, 1)}，被拉成細線，容易斷線或粗細不均。` : r < 0.7 ? '小於 0.7 是「堆疊」：膠出得比針嘴走得快，會堆疊、捲折、包住空氣。' : '',
    `匹配內徑約 ${fmt(b.matchedId, 2)} mm${gaugeNear(b.matchedId) ? `，最接近 ${gaugeNear(b.matchedId)}` : '，不在常見針頭範圍內'}（目前 ${needleLabel(nozzle)}，${fmt(nozzle, 2)} mm）。平均移動速度約 ${fmt(b.averageSpeed, 0)} mm/s；轉角與加速度會讓它低於設定速度。`,
  ]
    .filter(Boolean)
    .join('\n');
}
// Nozzle vs bead: bore area ÷ laid bead cross-section (≈1 lays a round bead about the nozzle's size).
function beadKpi(run) {
  const b = beadMatch(run);
  if (b.speedRatio === null) return '';
  const bad = b.state !== 'ok';
  const what = b.state === 'stretched' ? '被拉細' : b.state === 'piled' ? '堆疊' : '良好';
  return `<div class="kpi wide ${bad ? 'warn' : ''}"><span>針嘴與膠條${tip(beadTipText(b, run.config.diameter))}</span><b>×${fmt(b.speedRatio, 2)}<small>${what}</small></b><em>匹配內徑約 ${fmt(b.matchedId, 2)} mm${gaugeNear(b.matchedId) ? ` ≈ ${gaugeNear(b.matchedId)}` : ''}（目前 ${needleLabel(run.config.diameter)}）</em></div>`;
}

// Where stacked glue stands highest, in words.
const STACK_WHERE = { centre: '中心', vertex: '轉角或尖端', path: '路徑上', point: '膠點', none: '' };
// What a pile stacked above the standoff means, for the card, the warnings and the optimiser table.
const stackText = (h, where, standoff) =>
  `重複經過的地方膠會疊起來：最高約 ${fmt(h, 2)} mm（${STACK_WHERE[where] || '路徑上'}），高於針嘴離面 ${fmt(standoff, 1)} mm。針嘴下一次經過時會碰到前一道膠，可能刮膠、沾針、拖絲；模擬沒有算刮膠，覆蓋與夾氣結果可能偏樂觀。可提高針距、改用不重複走的圖樣，或減少膠量。`;
// Bead (dot) shape against the nozzle height: free, pressed flat to the standoff, burying the nozzle, or
// glue stacked by passes that come back over it standing above the nozzle.
function shapeKpi(s, c, run) {
  const st = run ? stackedBead(run) : null;
  const buried = s.maxHeight > c.standoff + 1e-9;
  const contact = Boolean(st?.contact);
  const what = c.mode === 'point' ? '膠點' : '膠條';
  const stacked = st?.overlap && !contact ? `\n重複經過的地方膠會疊起來：最高約 ${fmt(st.maxHeight, 2)} mm（${STACK_WHERE[st.where]}），仍低於針嘴離面 ${fmt(c.standoff, 1)} mm。` : '';
  const [hint, title] = buried
    ? [`埋針 · 針距 ${fmt(c.standoff, 1)}`, `${what}高 ${fmt(s.maxHeight, 2)} mm 高於針嘴離面 ${fmt(c.standoff, 1)} mm：針嘴埋在膠裡，易拖膠、沾針。提高針距或減少每 mm 膠量。`]
    : contact
      ? [`疊高 ${fmt(st.maxHeight, 1)} mm > 針距 ${fmt(c.standoff, 1)}`, `單一趟${what}高 ${fmt(s.maxHeight, 2)} mm。${stackText(st.maxHeight, st.where, c.standoff)}`]
      : s.flattened
        ? [`已壓平 · 針距 ${fmt(c.standoff, 1)}`, `${what}自然高度約 ${fmt(s.freeHeight, 2)} mm，被針嘴壓成 ${fmt(c.standoff, 1)} mm 高並變寬；膠量不變。${stacked}`]
        : [`針距 ${fmt(c.standoff, 1)} mm`, `${what}以自然形狀堆在面上（自然高度低於針嘴離面高度）。${stacked}`];
  return kpi('膠高 / 寬', `${fmt(s.maxHeight, 2)} / ${fmt(s.maxWidth, 1)}`, 'mm', hint, buried || contact ? 'warn' : '', title);
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
  const pile = stackedBead(run);
  const warnings = [...(pile.contact ? [stackText(pile.maxHeight, pile.where, c.standoff)] : []), ...run.warnings, ...(S.press && !stale ? S.press.result.warnings : [])];
  $('#results').innerHTML = `
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">完整試驗預估</span><span class="pill">${esc(c.profile)}</span></div>
    <div class="hero"><b>${fmt(s.deposited, 3)}</b><span>mL 工件沉積</span><em>${fmt(s.deposited * c.density, 3)} g · 出口總計 ${fmt(s.output, 3)} mL</em></div>
    <div class="kpis">
      ${kpi('熱源需求比', fmt(required > 0 ? s.deposited / required : 0, 2), '×', `需 ${fmt(required, 3)} mL`, required > 0 && s.deposited / required < 1 ? 'bad' : '')}
      ${kpi('開膠時間', fmt(run.gate, 2), 's', `動作完成 ${fmt(e.motionEnd, 2)} s`)}
      ${shapeKpi(s, c, run)}
      ${kpi('末段 / 中段', ratio === null ? '—' : fmt(ratio, 2), '×', '', ratio !== null && (ratio < 0.5 || ratio > 1.5) ? 'warn' : '', '路徑末段與中段的每 mm 膠量比，看收尾是否堆膠（>1）或欠膠（<1）；0.5–1.5 為 AI 初估的比較帶。')}
      ${beadKpi(run)}
    </div>
  </section>
  <section class="card-sec press-sec">
    <div class="sec-head"><span class="eyebrow">壓合 · 熱阻估算${tip('以完整試驗的沉積分布，估算透明板定力壓到墊片後的覆蓋、夾氣、溢膠與熱阻（未經透明板校準）。壓合條件在「⑤ 壓合」分頁。')}</span>${S.press ? `<span class="pill ${stale ? 'pill-warn' : ''}">${stale ? '設定已變更' : `${fmt(S.press.settings.gap, 2)} mm · ${AIR_MODE_SHORT[S.press.settings.airMode]}`}</span>` : ''}</div>
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
        : `<div class="cta">${stale ? '<p>熱源或點膠設定已變更，請重新模擬。</p>' : ''}<button class="primary" id="press-cta">${ICONS.press}<span>模擬壓合</span></button><button class="secondary" id="scenario-save-cta">${ICONS.save}<span>存成情境（自動壓合）</span></button></div>`
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
    <p class="note inline-note">停移後流出 ${fmt(e.afterStopVolume * 1000, 2)} µL（${fmt(e.afterStopPercent, 1)}%）${tip(`針嘴停止移動後仍流出的膠。其中離開工件表面後的 ${fmt(s.offSurface * 1000, 2)} µL 形狀不定，只記帳、不加入膠形。${pcp() && e.reverseStart !== null ? `PCP 反轉回收暫存 ${fmt(s.recovered * 1000, 2)} µL。` : ''}`)}</p>
  </section>
  <details class="card-sec warnings" ${warnings.length > 4 ? '' : 'open'}><summary><span class="eyebrow">提醒與模型界線</span><span class="count">${warnings.length}</span></summary>${warnings.map((w) => `<p>${esc(w)}</p>`).join('')}</details>
  <section class="card-sec">
    <div class="sec-head"><span class="eyebrow">基準比較${tip('保存基準後再調整參數，可比較沉積量與配置差異；流量曲線會疊上基準。')}</span><button class="chip-btn" id="save-baseline">保存目前為基準</button></div>
    ${baselineHtml()}
  </section>
  <section class="card-sec exports">
    <button class="chip-btn" id="export-json">${ICONS.download}配置 JSON</button>
    <button class="chip-btn" id="export-csv">${ICONS.download}結果 CSV</button>
    <button class="chip-btn" id="export-image">${ICONS.download}畫面 PNG</button>
  </section>
`;
}

function describe(c, heat) {
  const mode = c.mode === 'pattern' ? `${PATTERN_NAMES[c.pathSettings?.pattern] || ''}（間距 ${c.pathSettings?.spacing} mm）` : c.mode === 'line' ? `直線 ${c.lineLength} mm` : `單點 ${fmt(c.gateDuration, 3)} s`;
  return `${MATERIALS[c.material].name} · ${c.architecture} · ${mode} · ${c.architecture === 'P300' ? `${fmt(c.rpm, 1)} rpm` : `${fmt(c.pressure, 1)} psi`}${c.mode === 'point' ? '' : ` · ${fmt(c.speed, 1)} mm/s`}${heat ? ` · 熱源 ${heat.width}${heat.shape === 'circle' ? ' Ø' : ` × ${heat.depth}`} mm / ${heat.gap} mm` : ''}`;
}

function baselineHtml() {
  const b = S.baseline;
  if (!b) return '';
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
  const controls = scene.freeOrbit ? '左鍵旋轉 · 右鍵平移 · 滾輪縮放 · Home 重設' : '拖曳平移 · 滾輪縮放 · Home 重設';
  $('#view-label').textContent = `${VIEW_LABELS[scene.mode]} · ${scene.freeOrbit ? '自由旋轉' : `等角 ${scene.isoCorner + 1}`}${scene.projection === 'persp' ? ' · 透視' : ''}`;
  const geometry = S.press
    ? '透明板與覆蓋為未校準幾何估算'
    : ['whole', 'work', 'head', 'feed'].includes(scene.mode)
      ? '設備依公開外形參考，局部、支架與管路為示意'
      : '近看會隱藏上部機構；膠形為幾何示意';
  const stageTip = $('#stage-tip');
  stageTip.dataset.tip = `操作：${controls}\n所有零件以 mm 真實比例繪製；${geometry}。`;
  stageTip.setAttribute('aria-label', stageTip.dataset.tip);
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
    syncVoidColor();
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
// Trapped-air colour: four choices so it can always differ from the material (Tputty is pale red, so it
// starts blue; Tgrease is grey-white, so it starts magenta) until the user picks one.
const VOID_DEFAULT = { putty: '#2563eb', grease: '#ff2d55' };
const voidColor = () => store.get('tim-void-color') || VOID_DEFAULT[S.config?.material] || '#ff2d55';
function syncVoidColor() {
  const c = voidColor();
  scene.setVoidColor(c);
  $$('[data-void-color]').forEach((b) => b.classList.toggle('active', b.dataset.voidColor === c));
}
$$('[data-void-color]').forEach((b) =>
  b.addEventListener('click', () => {
    store.set('tim-void-color', b.dataset.voidColor);
    syncVoidColor();
  }),
);
$$('[data-press-color]').forEach((b) =>
  b.addEventListener('click', () => {
    $$('[data-press-color]').forEach((x) => x.classList.toggle('active', x === b));
    scene.setCompressionColor(b.dataset.pressColor);
  }),
);

// ───────────────────────── goals, scenarios and optimisation ─────────────────────────
// Goal: coverage ≥ target and overflow ≤ limit with the least material (ranking in optimize.js).
const goalControls = () =>
  `<div class="goal-controls"><label>覆蓋率目標 <input type="number" data-goal="coverage" value="${S.goals.coverage}" min="50" max="100" step="any"> %</label><label>溢膠上限 <input type="number" data-goal="overflow" value="${S.goals.overflow}" min="0" max="50" step="any"> mm</label>${tip('達標＝覆蓋 ≥ 目標且溢膠 ≤ 上限；達標者膠量越少排越前，未達標者依差距排序（覆蓋差 5% 約等於溢膠多 1 mm）。')}</div>`;
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
      ? `<div class="table-scroll"><table class="cmp scen"><thead><tr><th>#</th><th>情境</th><th>判定${tip('綠色數字為各欄最佳值；第一列加框代表依目標排序的最佳情境（達標者膠量越少越前，未達標者依差距排序）。夾氣與覆蓋來自未校準的模型，僅供相對比較。')}</th><th>膠量<br><small>mL（×需求）</small></th><th>覆蓋<br><small>%</small></th><th>溢出<br><small>mm</small></th><th>夾氣<br><small>處 / mm²</small></th><th>溫升<br><small>°C</small></th><th>動作<br><small>s</small></th><th></th></tr></thead><tbody>
      ${order
        .map((x, i) => {
          const m = x.metrics;
          return `<tr class="${i === 0 && judge(m, S.goals).pass ? 'top' : ''}"><td>${i + 1}</td><td class="scen-name"><input value="${esc(x.name)}" data-rename="${x.id}" aria-label="情境名稱"><small>${esc(settingsText(x))}</small><small class="muted">${esc(x.source || '')} · ${new Date(x.savedAt).toLocaleString()}</small></td><td>${verdict(m)}</td><td class="${mark(m.depositedMl, b.dep)}">${fmt(m.depositedMl, 3)} <small>(${fmt(m.volumeRatio, 2)}×)</small></td><td class="${mark(m.coveredPercent, b.cover)}">${fmt(m.coveredPercent, 1)}</td><td class="${mark(m.squeezeOutMm, b.out)}">${fmt(m.squeezeOutMm, 1)}</td><td class="${m.voidCount ? 'bad' : ''}">${m.voidCount} / ${fmt(m.voidAreaMm2, 1)}</td><td class="${mark(m.rise, b.rise)}">${fmt(m.rise, 2)}</td><td>${fmt(m.cycle, 2)}</td><td class="row-actions"><button class="chip-btn" data-load="${x.id}">載入</button><button class="chip-btn" data-remove="${x.id}">刪除</button></td></tr>`;
        })
        .join('')}
      </tbody></table></div>
`
      : `<div class="empty"><p>還沒有情境。調好一組參數後，在右側結果卡按「存成情境」（未壓合會自動先壓合），或在「自動最佳化」結果中存入。</p></div>`
  }
  <div class="scen-tools">${tip('情境存在這台電腦的瀏覽器中；可匯出 JSON 帶到其他電腦再匯入，或匯出 CSV 到試算表。')}<button class="chip-btn" id="scen-csv" ${list.length ? '' : 'disabled'}>${ICONS.download}匯出 CSV</button><button class="chip-btn" id="scen-export" ${list.length ? '' : 'disabled'}>${ICONS.download}匯出 JSON</button><label class="chip-btn">匯入 JSON<input type="file" id="scen-import" accept=".json,application/json" hidden></label><button class="chip-btn danger" id="scen-clear" ${list.length ? '' : 'disabled'}>清除全部</button></div>`;
  bindGoals(body, renderScenarios);
}
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
const POOL_SIZE = Math.max(1, Math.min(8, (navigator.hardwareConcurrency || 4) - 1));
// The search may switch path types, so it always gets the heat-source path settings.
const searchConfig = () => ({ ...S.config, pathSettings: pathSettings() });
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
      // Timed while a search kept every core busy: too slow to trust; time it again afterwards.
      if (S.optimize?.running) {
        S.optCal = null;
        return;
      }
      S.optCal = { key, cal };
      if ($('#optimize-dialog').open && !S.optimize?.running) renderOptimize();
    })
    .catch(() => {
      if (S.optCal?.key === key) S.optCal = { key, error: true };
      if ($('#optimize-dialog').open && !S.optimize?.running) renderOptimize();
    });
}
function estimateFor(level, { raw = false } = {}) {
  const cal = S.optCal?.key === calibrationKey() ? S.optCal.cal : null;
  if (!cal) return null;
  const seconds = estimateSeconds(planSearch(searchConfig(), S.heat, optSearchOptions(level)), cal, POOL_SIZE);
  return raw ? seconds : seconds * S.optSpeed.ratio;
}
// Learn this computer's speed from finished searches: blend measured ÷ predicted into the correction.
function learnSpeed(predicted, elapsed) {
  // Short runs are mostly worker start-up and would over-correct longer searches.
  if (!(predicted > 3 && elapsed >= 20)) return;
  const r = elapsed / predicted;
  const old = S.optSpeed;
  const ratio = old.runs ? Math.exp(0.5 * Math.log(old.ratio) + 0.5 * Math.log(r)) : r;
  S.optSpeed = { ratio: Math.min(6, Math.max(0.25, ratio)), runs: old.runs + 1 };
  store.set('tim-opt-speed', JSON.stringify(S.optSpeed));
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

// The optimiser window can be resized by its corner; a size the user chose is kept for next time.
const optDialog = $('#optimize-dialog');
function applyOptSize() {
  const size = readJson('tim-opt-size');
  if (!size) return;
  optDialog.style.width = `${Math.min(size.w, window.innerWidth - 8)}px`;
  optDialog.style.height = `${Math.min(size.h, window.innerHeight - 8)}px`;
}
optDialog.addEventListener('pointerdown', (e) => {
  const r = optDialog.getBoundingClientRect();
  if (e.clientX > r.right - 22 && e.clientY > r.bottom - 22) optDialog.dataset.userSized = '1';
});
new ResizeObserver(() => {
  if (optDialog.open && optDialog.dataset.userSized) store.set('tim-opt-size', JSON.stringify({ w: optDialog.offsetWidth, h: optDialog.offsetHeight }));
}).observe(optDialog);
function openOptimize() {
  requestCalibration();
  applyOptSize();
  renderOptimize();
  optDialog.showModal();
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
// Search variables: each one fixed at the current setting or searched (range or options).
const optVars = () => {
  const v = S.optOptions.vars || {};
  return Object.fromEntries(Object.entries(VARS_DEFAULT).map(([k, d]) => [k, { ...d, ...(v[k] || {}) }]));
};
const optSearchOptions = (level) => ({ ...S.optOptions, level, knob: S.dose.knob, pointKnob: S.dose.pointKnob, vars: optVars() });
const currentTypeLabel = () => (S.config.mode === 'pattern' ? PATTERN_NAMES[S.pattern.pattern] : S.config.mode === 'point' ? '單點' : '直線');
const typeCounts = (space) =>
  space.types.map((t) => `${TYPE_LABEL[t]} ${space.geometries.filter((g) => g.type === t).length}`).join('、');
const valueList = (values, unit) => (values.length > 6 ? `${values.slice(0, 3).join('、')} … ${values.at(-1)} ${unit}（${values.length} 個）` : `${values.join('、')} ${unit}`);
function varsTable(running, level) {
  const v = optVars();
  const space = searchSpace(searchConfig(), S.heat, level.candidates, v, S.dose.knob);
  const auto = autoRanges(searchConfig(), S.heat);
  const types = space.types;
  const moving = types.some((t) => t !== 'point');
  const pitched = types.some((t) => t === 'serpentine' || t === 'spiral');
  const anyPattern = types.some((t) => t !== 'point' && t !== 'straight');
  const off = running ? 'disabled' : '';
  const toggle = (k, fixedText, on) =>
    `<div class="seg small var-toggle" role="group"><button type="button" data-var="${k}" data-search="0" class="${on ? '' : 'active'}" ${off}>固定 ${esc(fixedText)}</button><button type="button" data-var="${k}" data-search="1" class="${on ? 'active' : ''}" ${off}>搜尋</button></div>`;
  const range = (k, [lo, hi], unit, digits) =>
    `<span class="var-range"><input type="number" data-var="${k}" data-bound="min" value="${v[k].min ?? ''}" placeholder="${fmt(lo, digits)}" step="any" min="0" ${off}> – <input type="number" data-var="${k}" data-bound="max" value="${v[k].max ?? ''}" placeholder="${fmt(hi, digits)}" step="any" min="0" ${off}> ${unit}</span>`;
  const values = (list, unit) => `<small class="var-values">${list.length > 6 ? `${list.slice(0, 3).join('、')} … ${list.at(-1)}` : list.join('、')} ${unit}</small>`;
  const na = '<td colspan="2" class="muted var-na">—</td>';
  const speeds = space.speeds;
  const speedLocked = space.speedLocked || S.dose.knob === 'motion';
  // A slow choice: even the fastest speed takes over a minute on the current path.
  const pathMm = currentPathLength(searchConfig(), S.heat);
  const slowest = pathMm / Math.max(...speeds);
  const slowNote =
    moving && slowest > 60
      ? `<small class="warn">${v.speed.search && !speedLocked ? '速度上限' : '目前速度'} ${fmt(Math.max(...speeds), 1)} mm/s 走完目前路徑（約 ${fmt(pathMm, 0)} mm）就要約 ${fmt(slowest, 0)} s${tip('速度很慢通常是針嘴太細或壓力不夠，週期會很長。可把針嘴改成「自動」、提高速度範圍上限，或先在設備頁用實測出膠量校正。')}</small>`
      : '';
  const rows = [
    [
      '圖樣種類',
      '可勾選蛇形、螺旋、單點、中心線。單點放在熱源中心（目前路徑本來就是單點時用目前點位），用自己的膠量調整方式。',
      `<td>${toggle('pattern', currentTypeLabel(), v.pattern.search)}</td><td>${
        v.pattern.search
          ? SEARCH_PATTERNS.map((t) => `<label class="chk"><input type="checkbox" data-var="pattern" data-option="${t}" ${v.pattern.options.includes(t) ? 'checked' : ''} ${off}>${TYPE_LABEL[t]}</label>`).join('')
          : ''
      }</td>`,
      types.length,
    ],
    [
      '路徑間距',
      '只用於蛇形、螺旋。範圍留空為自動：熱源短邊的 1/12 到 1/4（等比），再加上目前值。',
      pitched ? `<td>${toggle('spacing', `${S.pattern.spacing} mm`, v.spacing.search)}</td><td>${v.spacing.search ? `${range('spacing', auto.spacing, 'mm', 1)}${values(space.spacings, 'mm')}` : ''}</td>` : na,
      pitched ? space.spacings.length : '—',
    ],
    [
      '邊界內縮',
      '依熱源的圖樣共用；單點、直線沒有。範圍留空為自動：1 mm 到 max(4 mm, 短邊/5)（等差），再加上目前值。',
      anyPattern ? `<td>${toggle('inset', `${S.pattern.edgeInset} mm`, v.inset.search)}</td><td>${v.inset.search ? `${range('inset', auto.inset, 'mm', 1)}${values(space.insets, 'mm')}` : ''}</td>` : na,
      anyPattern ? space.insets.length : '—',
    ],
    [
      '螺旋起點',
      '只用於螺旋：外向內或中心向外。',
      types.includes('spiral') ? `<td>${toggle('spiralDirection', DIRECTION_LABEL[S.pattern.spiralDirection] || '外向內', v.spiralDirection.search)}</td><td>${v.spiralDirection.search ? '<small class="var-values">外向內、中心向外</small>' : ''}</td>` : na,
      types.includes('spiral') ? (v.spiralDirection.search ? 2 : 1) : '—',
    ],
    [
      '移動速度',
      '只用於會移動的路徑。搜尋時每組幾何從這個範圍自己選一個速度（和針嘴一起選），不增加壓合次數：在壓力（轉速）範圍內鋪得出整個膠量範圍、膠條最接近針嘴大小、週期不超過週期上限（未設定時以 30 s 為參考）。膠量調整選「調移動速度」時速度用來調膠量，不能同時搜尋。範圍留空為自動：目前速度的 ¼–2 倍，再加上目前路徑點膠約 5–60 s 的速度。',
      !moving
        ? na
        : speedLocked
          ? '<td colspan="2" class="var-na"><small class="warn">膠量調整為「調移動速度」，不能同時搜尋速度</small></td>'
          : `<td>${toggle('speed', `${fmt(S.config.speed, 1)} mm/s`, v.speed.search)}</td><td>${v.speed.search ? `${range('speed', auto.speed, 'mm/s', 1)}${values(speeds, 'mm/s')}` : ''}${slowNote}</td>`,
      moving && !speedLocked && v.speed.search ? `<span tabindex="0" data-tip="每組幾何從 ${speeds.length} 個速度中選 1 個，不增加組數。">選 1</span>` : '—',
    ],
    [
      '針嘴',
      '自動：每組幾何從整數 G 數的標準針頭（25G 0.25 mm 到 8G 3.43 mm，對照表在設備頁「虛擬針嘴內徑」的 ?）中，和移動速度一起選一支：在壓力（轉速）範圍內鋪得出整個膠量範圍，膠條又最接近針嘴大小（G 數越大越細）。固定：每組都用目前針嘴。',
      `<td colspan="2"><select data-opt="nozzle" ${off}><option value="auto" ${nozzleMode(S.optOptions.nozzle) === 'auto' ? 'selected' : ''}>自動（與速度一起選）</option><option value="fixed" ${nozzleMode(S.optOptions.nozzle) === 'fixed' ? 'selected' : ''}>固定目前 ${esc(needleLabel(S.config.diameter))}</option></select></td>`,
      '—',
    ],
    [
      '膠量',
      '一定搜尋：每組幾何在這個範圍（需求倍數）內找出「容差內都達標」的膠量窗口。',
      `<td><small>一定搜尋</small></td><td><span class="var-range"><input type="number" data-opt="dose0" value="${S.optOptions.dose[0]}" min="0.05" max="5" step="any" ${off}> – <input type="number" data-opt="dose1" value="${S.optOptions.dose[1]}" min="0.1" max="6" step="any" ${off}> × 需求</span></td>`,
      '窗口',
    ],
  ];
  const total = space.geometries.length;
  const heavy = total > 400;
  const fixedText = `其他固定條件：熱源 ${S.heat.shape === 'circle' ? `Ø${S.heat.width}` : `${S.heat.width} × ${S.heat.depth}`} mm、間隙 ${S.heat.gap} mm、${MATERIALS[S.config.material].name}、加速度 ${S.config.acceleration} mm/s²、針距 ${S.config.standoff} mm、收尾設定、壓合 ${S.heat.pressKgf} kgf／${AIR_MODE_SHORT[S.heat.airMode]}。`;
  return {
    total,
    space,
    title: `搜尋變數${tip(fixedText)}`,
    html: `<div class="vars-scroll"><table class="vars"><thead><tr><th>變數</th><th>固定／搜尋</th><th>範圍或選項</th><th>候選</th></tr></thead><tbody>${rows
      .map(([name, note, cells, n]) => `<tr><th scope="row">${name}${tip(note)}</th>${cells}<td class="mono">${n}</td></tr>`)
      .join('')}</tbody></table></div>
    <p class="var-total ${heavy ? 'warn' : ''}">合計 ${total} 組幾何${space.types.length > 1 ? `（${typeCounts(space)}）` : ''}${heavy ? `　組合很多${total > 3000 ? '，超過 3,000 組無法開始' : '，時間會變長'}` : ''}${tip(`每多搜尋一個變數，主要增加第一階段的篩選次數；找窗口與複核只處理前幾名${space.types.length > 1 ? '，另外每種圖樣的最佳組都會找窗口，方便比較' : ''}。組合太多時可減少搜尋變數、縮小範圍或降低精細度。`)}</p>`,
  };
}

function renderOptimize() {
  if (!S.optimize?.running) requestCalibration();
  const o = S.optimize || {};
  const opt = S.optOptions;
  const r = o.result;
  const running = Boolean(o.running);
  const body = $('#optimize-body');
  const rows = r ? r.candidates.slice(0, 12) : [];
  const best = rows[0];
  const anyPass = rows.some((x) => x.pass);
  const tolPct = Math.round(opt.tolerance * 100);
  const level = levelOf(opt.level);
  const plan = planSearch(searchConfig(), S.heat, optSearchOptions(level.level));
  const vt = varsTable(running, level);
  const space = r?.space;
  const knobOfRow = (x) => x.knobInfo || r.knob;
  const motionOfRow = (x) => motionOf(x.mode || o.config.mode);
  const mv = (x) => {
    const m = motionOfRow(x);
    return `${fmt(x.settings[m.key], m.digits)} ${m.unit}`;
  };
  const moved = (x) => {
    const speed = motionOfRow(x).key === 'speed';
    if (x.motionAtLimit) return speed ? (x.settings.speed <= 1 + 1e-9 ? '速度已到下限' : '速度已到上限') : '開膠時間已到極限';
    return speed ? (x.settings.speed < (x.speed ?? o.config.speed) ? '已降速' : '已提速') : '已改時間';
  };
  // What caps the dose of a row: nozzle, drive at its end, motion at its end.
  const capWhy = (x) => {
    const k = knobOfRow(x);
    const top = k.id === 'drive' ? `${k.label}上限 ${fmt(k.hi, 0)} ${k.unit}、` : '';
    return `${needleLabel(x.diameter)} 針嘴、${top}${motionOfRow(x).label} ${mv(x)}`;
  };
  const doseText = (x) => {
    const k = knobOfRow(x);
    return `${k.id === 'drive' ? `${k.label} ${fmt(x.knobValue, 0)} ${k.unit}、` : ''}${motionOfRow(x).label} ${mv(x)}`;
  };
  const typeText = (x) => `${TYPE_LABEL[x.type] || ''}${x.type === 'spiral' ? `（${DIRECTION_LABEL[x.spiralDirection]}）` : ''}`;
  const geoParts = (x) =>
    [
      x.spacing != null && (x.type === 'serpentine' || x.type === 'spiral') ? `間距 ${x.spacing}` : '',
      x.mode === 'pattern' ? `內縮 ${x.edgeInset}` : '',
      x.mode === 'pattern' || r?.nozzle === 'auto' ? esc(needleLabel(x.diameter)) : '',
      space?.varies.speed && x.mode !== 'point' && x.speed != null ? `設定 ${fmt(x.speed, x.speed < 10 ? 1 : 0)} mm/s` : '',
    ].filter(Boolean);
  const geoText = (x) => `${typeText(x)}${geoParts(x).length ? `、${geoParts(x).join('、').replace(/間距 ([\d.]+)/, '間距 $1 mm').replace(/內縮 ([\d.]+)/, '內縮 $1 mm')}` : ''}、`;
  const shift = (p) => (Math.abs(p.shift) < 1e-9 ? '標稱膠量' : `膠量 ${p.shift > 0 ? '+' : '−'}${fmt(Math.abs(p.shift) * 100, 0)}%`);
  const laidNote = (p) => (p.capped ? `（目標 ${fmt(p.factor, 2)}×，設備只鋪出 ${fmt(p.laid, 2)}×）` : p.fallback ? '（壓力到極限，改速度達成）' : '');
  const bandTip = (x, key, unit, digits) =>
    x.bandPoints?.length ? `容差內各膠量的${key === 'coveredPercent' ? '覆蓋' : '溢膠'}（判定看最差的一點）：\n${x.bandPoints.map((p) => `${shift(p)}${laidNote(p)}：${fmt(p[key], digits)} ${unit}`).join('\n')}` : '';
  const metricCell = (x, key, unit, digits, bad) => {
    const worst = x.worst?.[key];
    const tipText = bandTip(x, key, unit, digits);
    return `<span ${tipText ? `data-tip="${esc(tipText)}" tabindex="0"` : ''}>${fmt(x[key], digits)}${worst !== undefined ? `<small class="${bad(worst) ? 'warn' : ''}">最差 ${fmt(worst, digits)}</small>` : ''}</span>`;
  };
  // Where a checked result misses: the worst dose of the tolerance band, by goal.
  const missText = (x) => {
    if (!x.bandPoints?.length) return '';
    const g = S.goals;
    const cov = x.bandPoints.reduce((a, b) => (b.coveredPercent < a.coveredPercent ? b : a));
    const ovf = x.bandPoints.reduce((a, b) => (b.squeezeOutMm > a.squeezeOutMm ? b : a));
    return [
      cov.coveredPercent < g.coverage ? `${shift(cov)}時覆蓋只有 ${fmt(cov.coveredPercent, 1)}%（目標 ${g.coverage}%）` : '',
      ovf.squeezeOutMm > g.overflow ? `${shift(ovf)}時溢膠 ${fmt(ovf.squeezeOutMm, 1)} mm（上限 ${g.overflow} mm）` : '',
    ]
      .filter(Boolean)
      .join('；');
  };
  // Short verdicts; the details are in the hover note.
  const badge = (cls, text, note) => `<span class="${cls}" tabindex="0" data-tip="${esc(note)}">${text}</span>`;
  const rowVerdict = (x) => {
    if (x.pass) return badge('ok-badge', '達標', `在 ${fmt(r.verifyCell, 2)} mm 網格、膠量 ±${tolPct}% 內 ${r.band} 個點都達到覆蓋 ≥ ${S.goals.coverage}%、溢膠 ≤ ${S.goals.overflow} mm。`);
    if (!x.reached || x.bandPoints?.some((p) => p.capped))
      return badge('no-badge', '設備限制', `${capWhy(x)}都已到極限，${x.capFactor ? `最多只鋪得出約 ${fmt(x.capFactor, 2)}× 需求，` : ''}達不到需要的膠量。針嘴改「自動」或換粗一點、放寬速度範圍，或先用實測出膠量校正（設備頁）。`);
    if (!x.cycleOk) return badge('no-badge', '超過週期', `週期 ${fmt(x.cycle, 1)} s 超過週期上限。`);
    if (x.coarsePass) return badge('no-badge', '待複核', `粗網格（${fmt(r.searchCell, 2)} mm）的膠量窗口夠寬，但還沒以細網格在容差內複核；精細度提高或往下複核時才會確認。`);
    if (x.verified) {
      const j = judge(x.worst, S.goals);
      const text = [j.short > 0 ? `覆蓋差 ${fmt(j.short, 1)}%` : '', j.over > 0 ? `溢膠超 ${fmt(j.over, 1)} mm` : ''].filter(Boolean).join('・') || '未全部達標';
      return badge('no-badge', text, `以容差內最差的一點判定：${missText(x) || '有膠量點設備達不到'}。標稱膠量本身可能達標，但量產漂移 ±${tolPct}% 時會不夠。`);
    }
    const j = judge(x, S.goals);
    if (j.pass) return x.screenedOnly ? badge('no-badge', '未完成', '只在篩選膠量算過，還沒找膠量窗口與複核。') : badge('no-badge', '窗口不足', `標稱膠量達標，但可行窗口比 ±${tolPct}% 窄，膠量漂移時可能超出目標。`);
    return badge('no-badge', [j.short > 0 ? `覆蓋差 ${fmt(j.short, 1)}%` : '', j.over > 0 ? `溢膠超 ${fmt(j.over, 1)} mm` : ''].filter(Boolean).join('・'), `標稱膠量就未達標：覆蓋 ${fmt(x.coveredPercent, 1)}%（目標 ${S.goals.coverage}%）、溢膠 ${fmt(x.squeezeOutMm, 1)} mm（上限 ${S.goals.overflow} mm）。`);
  };
  const knobCell = (x) => {
    const k = knobOfRow(x);
    const avg = x.bead?.averageSpeed;
    const note = `${doseText(x)}${x.fallback ? `；${k.label}已到範圍極限，改以${motionOfRow(x).label}達到膠量${x.motionAtLimit ? `，但${motionOfRow(x).label}也已到極限：這支針嘴出不了需要的膠量` : ''}` : ''}${avg ? `。實際平均移動速度約 ${fmt(avg, 0)} mm/s（轉角與加速度會讓它低於設定速度）` : ''}。`;
    const main = k.id === 'drive' ? `${fmt(x.knobValue, 0)} ${k.unit}<small>${mv(x)}${x.fallback ? `<b class="warn">・${moved(x)}</b>` : ''}</small>` : `${mv(x)}`;
    return `<span tabindex="0" data-tip="${esc(note)}">${main}</span>`;
  };
  const windowCell = (x) => {
    if (x.screenedOnly) return '<small class="muted">只篩選</small>';
    const g = S.goals;
    if (x.fCov === null && x.capFactor != null)
      return badge('warn', `設備上限 ${fmt(x.capFactor, 2)}×`, `${capWhy(x)}時最多只鋪得出約 ${fmt(x.capFactor, 2)}× 需求，還沒到覆蓋 ${g.coverage}% 需要的膠量；不是圖樣做不到。針嘴改「自動」或換粗一點、放寬速度範圍。`);
    if (x.fCov === null) return badge('warn', '達不到覆蓋', `膠量範圍內最多到 ${fmt(r.dose[1], 2)}× 都達不到覆蓋 ${g.coverage}%。`);
    if (x.fOvf === null) return badge('warn', '下限即溢膠', `膠量範圍下限 ${fmt(r.dose[0], 2)}× 的溢膠就已超過 ${g.overflow} mm。`);
    if (x.fCov > x.fOvf) return badge('warn', '無窗口', `兩個目標衝突：覆蓋 ${g.coverage}% 需要 ≥ ${fmt(x.fCov, 2)}× 膠量，但溢膠 ≤ ${g.overflow} mm 只允許 ≤ ${fmt(x.fOvf, 2)}×。`);
    const supported = x.supportedTol != null ? `這個窗口最多可承受約 ±${fmt(x.supportedTol * 100, 0)}% 的膠量漂移（標稱放在窗口正中時）。` : '';
    const capped = x.capFactor != null ? `右界受設備上限（約 ${fmt(x.capFactor, 2)}×）限制。` : '';
    return `<span tabindex="0" data-tip="${esc(`覆蓋 ${g.coverage}% 至少要 ${fmt(x.fCov, 2)}×，溢膠 ≤ ${g.overflow} mm 最多 ${fmt(x.fOvf, 2)}×。${supported}${capped}`)}">${fmt(x.fCov, 2)}–${fmt(x.fOvf, 2)}×${x.margin !== null ? `<small class="${x.margin < opt.tolerance - 1e-9 ? 'warn' : ''}">餘裕 ±${fmt(x.margin * 100, 0)}%</small>` : ''}</span>`;
  };
  const beadCellX = (x) => {
    const b = x.bead;
    if (!b) return '—';
    if (b.speedRatio === null) return b.drags ? badge('warn', '針嘴埋入', '膠點高於針嘴離面高度：針嘴埋在膠裡，易拖膠、沾針。') : '—';
    const warn = b.state !== 'ok' || b.drags;
    const buried = b.buried ?? (b.drags && !b.stack?.contact);
    const text = `${b.state === 'stretched' ? '被拉細' : b.state === 'piled' ? '堆疊' : '良好'} ×${fmt(b.speedRatio, 1)}${buried ? '・埋針' : ''}${b.stack?.contact ? '・疊膠碰針' : ''}`;
    const note = `${beadTipText(b, x.diameter)}${b.stack?.contact ? `\n${stackText(b.stack.maxHeight, b.stack.where, b.standoff)}排序時當作埋針扣分。` : ''}`;
    return `<span class="${warn ? 'warn' : ''}" tabindex="0" data-tip="${esc(note)}">${text}</span>`;
  };
  const geoCell = (x) => `<b>${typeText(x)}</b>${geoParts(x).length ? `<small>${geoParts(x).join(' · ')}</small>` : ''}`;
  const head = (label, note, sub = '') => `<th>${label}${tip(note)}${sub ? `<br><small>${sub}</small>` : ''}</th>`;
  const kinds = vt.space.types;
  const knobSelect = (kind) =>
    `<label>膠量調整${kinds.includes('point') && kinds.some((t) => t !== 'point') ? (kind === 'point' ? '（單點）' : '（線／圖樣）') : ''}${tip('與左上「膠量列」共用。調壓力（轉速）時速度不變，壓力到極限才改速度；也可只調速度（單點：開膠時間）。')} <select data-opt="knob" data-kind="${kind}" ${running ? 'disabled' : ''}>${knobChoices(kind === 'point' ? 'point' : 'pattern')
      .map(([v, t]) => `<option value="${v}" ${v === (kind === 'point' ? S.dose.pointKnob : S.dose.knob) ? 'selected' : ''}>${t}</option>`)
      .join('')}</select></label>`;
  const estimateLabel = (l) => (S.optCal?.pending ? '估算中…' : S.optCal?.error ? '無法估算' : durationText(estimateFor(l.level)));
  const levelNote = `${level.name}：${levelPlanText(plan)}；${POOL_SIZE} 個執行緒並行。\n時間依這台電腦試算一次後估計${S.optSpeed.runs ? `，並已依前 ${S.optSpeed.runs} 次搜尋的實際時間校正` : '；第一次搜尋完成後會依實際時間自動校正'}，實際仍會隨夾氣多寡與膠量差 ±30–50%。`;
  body.innerHTML = `
  <div class="opt-controls">
    ${goalControls()}
    <div class="goal-controls">
      <label>膠量容差 ±${tip('量產時膠量的正常漂移：時間壓力式常見 ±5–10%，容積式較小。標稱膠量在 ±容差內都要達標才算達標。')} <input type="number" data-opt="tolerance" value="${tolPct}" min="0" max="40" step="1" ${running ? 'disabled' : ''}> %</label>
      ${kinds.some((t) => t !== 'point') ? knobSelect('path') : ''}
      ${kinds.includes('point') ? knobSelect('point') : ''}
      <label>週期上限${tip(`超過的組合不算達標。未設定時以 ${CYCLE_REFERENCE} s 為參考：選針嘴與速度、以及膠量相近的組合排序時，較慢的會扣分。`)} <input type="number" data-opt="cycleLimit" value="${opt.cycleLimit ?? ''}" min="1" max="600" step="any" placeholder="不限" ${running ? 'disabled' : ''}> s</label>
    </div>
  </div>
  <div class="opt-vars"><span class="opt-levels-title">${vt.title}</span>${vt.html}</div>
  <div class="opt-levels">
    <span class="opt-levels-title">搜尋精細度${tip(levelNote)}</span>
    <div class="levels" role="radiogroup" aria-label="搜尋精細度">${SEARCH_LEVELS.map(
      (l) => `<button type="button" role="radio" data-level="${l.level}" aria-checked="${l.level === level.level}" class="${l.level === level.level ? 'active' : ''}" ${running ? 'disabled' : ''}><b>${l.level}．${l.name}</b><span>${estimateLabel(l)}</span></button>`,
    ).join('')}</div>
    ${running ? '' : `<button class="primary" id="opt-run" ${vt.total > 3000 ? 'disabled' : ''}>${ICONS.spark}<span>${r ? '重新搜尋' : '開始搜尋'}</span></button>`}
  </div>
  ${
    running
      ? `<div class="opt-run"><div class="progress"><i style="width:${(o.progress || 0) * 100}%"></i></div><div class="opt-run-row"><span id="opt-status">${esc(o.label || '準備中…')}</span><span id="opt-time" class="mono">${optTimeText(o)}</span><button class="stop-btn" id="opt-cancel">${ICONS.stop}<span>停止搜尋</span></button>${tip('停止後會保留已完成的部分結果；標示「待複核」「未完成」的列尚未完成，不能當作最終建議。')}</div></div>`
      : ''
  }
  ${o.error ? `<p class="note warn-note">${esc(o.error)}</p>` : ''}
  ${o.stopped ? `<p class="note warn-note">已停止搜尋（${clockText(o.elapsed)}，完成 ${r.evaluations} 次試算）：以下是部分結果，「待複核」「未完成」的列不能當最終建議。</p>` : ''}
  ${
    r
      ? `${
          best
            ? `<div class="opt-best ${best.pass ? 'pass' : 'fail'}"><b>${best.pass ? '建議設定' : best.coarsePass ? '粗網格達標、尚未複核' : best.screenedOnly ? '目前領先（只完成篩選）' : '最接近的取捨'}</b><span>${geoText(best)}${doseText(best)} → 標稱 ${fmt(best.depositedMl, 3)} mL（${fmt(best.depositedMl * o.config.density, 3)} g，${fmt(best.volumeRatio, 2)}×）</span><span>${
                best.worst ? `膠量 ±${tolPct}% 內：覆蓋 ≥ ${fmt(best.worst.coveredPercent, 1)}%、溢膠 ≤ ${fmt(best.worst.squeezeOutMm, 1)} mm` : `標稱：覆蓋 ${fmt(best.coveredPercent, 1)}%、溢膠 ${fmt(best.squeezeOutMm, 1)} mm`
              }；週期 ${fmt(best.cycle, 1)} s${best.bead.speedRatio !== null || best.bead.drags ? `；${best.mode === 'point' ? '膠點' : '膠條'} ${beadCellX(best)}` : ''}</span>${
                best.fCovAtMin ? `<span class="warn">覆蓋在膠量範圍下限 ${fmt(r.dose[0], 2)}× 就已達標，真正的最少膠量可能更低：可把膠量範圍下限調低再搜尋。</span>` : ''
              }${
                !(best.depositedMl > 1e-9)
                  ? `<span class="warn">這組設定不會有膠沉積到工件${best.mode !== 'point' && o.config.shutoffDistance > 0 ? `（提前關膠 ${o.config.shutoffDistance} mm 是否 ≥ 路徑長？）` : ''}；請先檢查路徑與收尾設定。</span>`
                  : best.pass || best.coarsePass || best.screenedOnly
                    ? ''
                    : best.capFactor != null && (!best.reached || best.fCov === null || best.bandPoints?.some((p) => p.capped))
                      ? `<span class="warn">設備出膠不足：${capWhy(best)}時最多只鋪得出約 ${fmt(best.capFactor, 2)}× 需求，到不了需要的膠量（不是圖樣做不到）。請把「針嘴」改成「自動」或換粗一點、放寬移動速度範圍；也可先在設備頁用實測出膠量校正。</span>`
                    : best.verified && missText(best)
                      ? `<span class="warn">${missText(best)}：量產漂移 ±${tolPct}% 時會不達標${best.supportedTol != null ? `；這組的可行窗口 ${fmt(best.fCov, 2)}–${fmt(best.fOvf, 2)}× 最多約可承受 ±${fmt(best.supportedTol * 100, 0)}%` : ''}。可把容差改成設備實際的漂移、放寬目標，或提高精細度找其他組合。</span>`
                      : best.fCov !== null && best.fOvf !== null && best.fCov > best.fOvf
                        ? `<span class="warn">兩個目標互相衝突：覆蓋 ${S.goals.coverage}% 需要 ≥ ${fmt(best.fCov, 2)}× 膠量，但溢膠 ≤ ${S.goals.overflow} mm 只允許 ≤ ${fmt(best.fOvf, 2)}×。請放寬溢膠上限或降低覆蓋目標，或搜尋其他圖樣。</span>`
                        : best.fCov === null
                          ? `<span class="warn">在膠量範圍與設備限制內都達不到覆蓋 ${S.goals.coverage}%：請提高膠量上限、降低覆蓋目標，或搜尋其他圖樣（單點、中心線難以鋪滿大熱源）。</span>`
                          : best.fOvf === null
                            ? `<span class="warn">膠量範圍下限（${fmt(r.dose[0], 2)}×）的溢膠就已超過 ${S.goals.overflow} mm：${best.mode === 'pattern' ? '請加大邊界內縮、放寬溢膠上限或降低膠量下限' : best.mode === 'line' ? '直線可能比熱源長，請縮短直線、放寬溢膠上限或降低膠量下限' : '請確認點位、放寬溢膠上限或降低膠量下限'}。</span>`
                            : `<span class="warn">可行窗口比 ±${tolPct}% 窄${best.supportedTol != null ? `（${fmt(best.fCov, 2)}–${fmt(best.fOvf, 2)}×，最多約可承受 ±${fmt(best.supportedTol * 100, 0)}%）` : ''}，或受設備、週期限制，量產漂移時可能超出目標。</span>`
              }</div>`
            : ''
        }
      <p class="opt-meta">${esc(o.describe)}　需求 ${fmt(r.required, 3)} mL　${esc(levelOf(r.level ?? 2).name)}：${r.plan?.geometries ?? '—'} 組幾何、試算 ${r.evaluations} 次${o.elapsed ? `、耗時 ${clockText(o.elapsed)}` : ''}${tip(`篩選與找窗口用 ${fmt(r.searchCell, 2)} mm 網格；前幾名以 ${fmt(r.verifyCell, 2)} mm 網格在膠量 ±${tolPct}% 內 ${r.band} 個點複核。${r.nozzle === 'auto' || r.space?.varies.speed ? `每組幾何的${[r.nozzle === 'auto' ? '針嘴' : '', r.space?.varies.speed ? '移動速度' : ''].filter(Boolean).join('與')}是先算好再壓合的：在壓力（轉速）範圍內鋪得出 ${fmt(r.sizing?.lowFactor, 2)}–${fmt(r.sizing?.needFactor, 2)}× 需求、膠條最接近針嘴、週期不超過 ${fmt(r.cycleRef, 0)} s 參考。` : ''}`)}${r.sizing?.tooSlow ? `<small class="warn">${r.sizing.tooSlow} 組在速度範圍內走完路徑都超過 180 s，已略過</small>` : ''}${r.sizing?.limited ? `<small class="warn">${r.sizing.limited} 組在設備範圍內出不了需要的膠量</small>` : ''}</p>
      ${anyPass || o.stopped ? '' : '<p class="note warn-note">沒有設定在膠量容差內同時達到兩個目標；下表依差距排序。</p>'}
      <div class="opt-table"><table class="cmp opt"><thead><tr><th>#</th>${head('判定', '綠色「達標」＝在細網格、膠量 ±容差內每個點都達到覆蓋目標與溢膠上限。待複核＝粗網格窗口夠寬、尚未複核；未完成＝只篩選；窗口不足＝標稱達標但窗口比容差窄。滑到每格可看細節。')}${head('路徑', '圖樣與幾何：間距、邊界內縮（mm）；針嘴與設定速度（自動選時每組不同）。')}${head('標稱膠量', '建議的膠量：可行窗口左界 ÷ (1 − 容差)。括號為需求倍數。', 'mL（×需求）')}${head('可行窗口', '左＝達到覆蓋目標的最少膠量，右＝溢膠不超過上限的最多膠量（需求倍數）。餘裕＝標稱膠量兩側離邊界還有多少，需 ≥ 容差。', '×需求')}${head('膠量設定', '達到標稱膠量的壓力（或轉速）與移動速度；單點是開膠時間。滑到格子可看實際平均速度。')}${head('覆蓋', '上：標稱膠量的覆蓋。下：膠量 ±容差內最差的覆蓋，判定看這個。滑到格子可看每個膠量點。', '%')}${head('溢出', '上：標稱膠量的溢出熱源距離。下：膠量 ±容差內最差的值。', 'mm')}${head('夾氣', '標稱膠量壓合後的夾氣處數 / 面積。', '處 / mm²')}${head('週期', '點膠動作完成時間（含收尾，不含上下料）。', 's')}${head('膠條', '拉細倍率＝針嘴內孔截面 ÷ 膠條截面＝平均移動速度 ÷ 出膠速度；0.7–1.5 為良好。滑到格子看說明。')}${head('', '套用會把參數與網格設成該列的結果，按「模擬壓合」可重現；請再以透明板在 −容差／標稱／+容差 各試一片。')}</tr></thead><tbody>
      ${rows
        .map(
          (x, i) =>
            `<tr class="${i === 0 && x.pass ? 'top' : ''}"><td>${i + 1}</td><td>${rowVerdict(x)}</td><td class="geo">${geoCell(x)}</td><td>${fmt(x.depositedMl, 3)}<small>${fmt(x.volumeRatio, 2)}×</small></td><td>${windowCell(x)}</td><td>${knobCell(x)}</td><td>${metricCell(x, 'coveredPercent', '%', 1, (w) => w < S.goals.coverage)}</td><td>${metricCell(x, 'squeezeOutMm', 'mm', 1, (w) => w > S.goals.overflow)}</td><td>${x.voidCount} / ${fmt(x.voidAreaMm2, 1)}</td><td class="${x.cycleOk ? '' : 'warn'}">${fmt(x.cycle, 1)}</td><td>${beadCellX(x)}</td><td class="row-actions"><button class="chip-btn" data-opt-apply="${i}">套用</button><button class="chip-btn" data-opt-save="${i}">存成情境</button></td></tr>`,
        )
        .join('')}
      </tbody></table></div>`
      : ''
  }`;
  bindGoals(body, renderOptimize);
}
$('#optimize-body').addEventListener('change', (e) => {
  const el = e.target;
  if (el.dataset.var) {
    // Search-variable ranges and path-type options.
    const vars = optVars();
    const spec = { ...vars[el.dataset.var] };
    if (el.dataset.bound) {
      if (el.value.trim() && !(Number(el.value) >= 0)) return toast('請輸入大於 0 的數值', 'error');
      spec[el.dataset.bound] = el.value.trim() ? Number(el.value) : null;
      if (spec.min != null && spec.max != null && spec.min > spec.max) [spec.min, spec.max] = [spec.max, spec.min];
    }
    if (el.dataset.option) {
      const set = new Set(spec.options);
      if (el.checked) set.add(el.dataset.option);
      else set.delete(el.dataset.option);
      if (!set.size) {
        toast('至少要選一種圖樣', 'error');
        return renderOptimize();
      }
      spec.options = SEARCH_PATTERNS.filter((t) => set.has(t));
    }
    S.optOptions = { ...S.optOptions, vars: { ...vars, [el.dataset.var]: spec } };
    store.set('tim-opt', JSON.stringify(S.optOptions));
    return renderOptimize();
  }
  const k = el.dataset.opt;
  if (!k) return;
  if (k === 'knob') {
    // Shared with the dose bar.
    S.dose = { ...S.dose, [el.dataset.kind === 'point' ? 'pointKnob' : 'knob']: el.value };
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
  const total = planSearch(config, heat, optSearchOptions(level)).geometries;
  if (total > 3000) return toast(`組合太多（${total} 組），請減少搜尋變數或縮小範圍`, 'error');
  const pool = createPool(POOL_SIZE);
  const state = { running: true, progress: 0, label: '準備中…', startedAt: performance.now(), estimate: estimateFor(level), raw: estimateFor(level, { raw: true }), pool, partial: null };
  S.optimize = state;
  renderOptimize();
  const timer = setInterval(updateOptRunning, 1000);
  const meta = () => ({ config, heat, pattern, describe: describe(config, heat), elapsed: (performance.now() - state.startedAt) / 1000 });
  try {
    const result = await optimizeSettings(config, heat, {
      ...optSearchOptions(level),
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
    learnSpeed(state.raw, S.optimize.elapsed);
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
const METRIC_KEYS = ['depositedMl', 'requiredMl', 'volumeRatio', 'coveredPercent', 'squeezeOutMm', 'voidCount', 'voidAreaMm2', 'rise', 'cycle', 'pressTime', 'airMode'];
/** Settings of one result row: its path type and geometry, the tuned drive and motion, the grid it used. */
function candidateEntry(x) {
  const o = S.optimize;
  const r = o.result;
  const mode = x.mode || o.config.mode;
  const config = { ...o.config, ...x.settings, mode };
  let pattern = { ...o.pattern };
  if (mode === 'pattern') {
    const geo = { pattern: x.pattern ?? pattern.pattern, spacing: x.spacing ?? pattern.spacing, edgeInset: x.edgeInset ?? pattern.edgeInset, spiralDirection: x.spiralDirection ?? pattern.spiralDirection };
    pattern = { ...pattern, ...geo };
    config.pathSettings = { ...o.config.pathSettings, ...geo };
  } else delete config.pathSettings;
  // A dot that replaced another path type was searched at the heat-source centre.
  if (mode === 'point' && o.config.mode !== 'point') {
    config.offsetX = o.heat.offsetX ?? 0;
    config.offsetY = o.heat.offsetY ?? 0;
  }
  const metrics = Object.fromEntries(METRIC_KEYS.map((k) => [k, x[k]]));
  // The grid the row was computed on, so that "模擬壓合" reproduces it.
  const heat = { ...o.heat, cellSize: x.verified ? r.verifyCell : r.searchCell };
  return { config, heat, pattern, metrics, source: x.verified ? `自動最佳化・${levelOf(r.level ?? 2).name}（已複核）` : o.stopped ? '自動最佳化（未完成）' : '自動最佳化（粗網格）' };
}
const rowSummary = (x) =>
  [
    x.mode === 'pattern' ? `${PATTERN_NAMES[x.pattern] || ''}${x.type === 'spiral' ? `（${DIRECTION_LABEL[x.spiralDirection]}）` : ''}` : x.mode === 'point' ? '單點' : '直線',
    x.spacing != null && x.mode === 'pattern' && (x.type === 'serpentine' || x.type === 'spiral') ? `間距 ${x.spacing} mm` : '',
    x.mode === 'pattern' ? `內縮 ${x.edgeInset} mm` : '',
    `針嘴 ${needleLabel(x.diameter)}`,
    x.mode !== 'point' && x.settings?.speed ? `${fmt(x.settings.speed, x.settings.speed < 10 ? 1 : 0)} mm/s` : '',
  ]
    .filter(Boolean)
    .join('、');
$('#optimize-body').addEventListener('click', (e) => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.level) {
    S.optOptions = { ...S.optOptions, level: Number(el.dataset.level) };
    store.set('tim-opt', JSON.stringify(S.optOptions));
    return renderOptimize();
  }
  if (el.dataset.var && el.dataset.search !== undefined) {
    const vars = optVars();
    S.optOptions = { ...S.optOptions, vars: { ...vars, [el.dataset.var]: { ...vars[el.dataset.var], search: el.dataset.search === '1' } } };
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
      const k = x.knobInfo || r.knob;
      toast(`已套用：${rowSummary(x)}、${k.id === 'drive' ? `${k.label} ${fmt(x.knobValue, 0)} ${k.unit}、` : ''}${motion.label} ${fmt(x.settings[motion.key], motion.digits)} ${motion.unit}${gridChanged ? `；網格設為 ${entry.heat.cellSize} mm（與這列結果相同）` : ''}`, 'ok');
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
  <li><b>② 膠材設備</b>：選膠材（Tputty 910／Tgrease 2500）與架構（R75 氣壓／P300 PCP），設定壓力或轉速、針嘴內徑與響應參數。針頭以 G 數（規格號數，整數，數字越大越細）稱呼：可在「針頭規格」直接選，會自動填入內徑；也可自行輸入內徑，旁邊的 ? 有 G 數對照表。「用實測出膠量校正」：原地連續出膠一段時間後秤重，輸入重量與時間，模型的出膠量就會對齊實測。</li>
  <li><b>③ 路徑</b>：依熱源選中心線／N／蛇形／螺旋／米字形／外框，或直線、單點（米字形：從中心往四角與四邊各畫一條再回中心，空氣較易往外排）；設定速度、加速度與針嘴離面高度。針嘴低於膠的自然高度時，膠被壓成針距高度並變寬（膠量不變）；過低會埋針。</li>
  <li><b>④ 收尾</b>：提前關膠、停留、抬針與回退、PCP 反轉。</li>
  <li><b>⑤ 壓合</b>：透明板的壓合力、下降速度、夾氣處理（可壓縮／剛性牆／全排出）、黏度、降伏應力、靜置時間與估算網格。</li>
  <li><b>膠量列（左上，固定顯示）</b>：顯示需求、目前沉積與比值。輸入目標（× 需求、mL 或 g）後按「套用」：線與圖樣預設「調壓力（P300 調轉速），到極限才改速度」，也可選只調速度；單點預設調開膠時間，也可選調壓力。</li>
  <li><b>播放</b>：空白鍵播放／暫停；拖曳時間軸或點曲線跳到該時刻；時間軸上的標記可跳到關膠、到位、抬針、退離。</li>
  <li><b>模擬壓合</b>：結果卡的「模擬壓合」顯示透明板以定力壓到墊片、膠膜擴散、氣泡壓縮／遷移／排出與靜置後回脹；可切換「前緣時序」著色。</li>
  <li><b>上方工具列</b>：「自動最佳化」搜尋膠量 ±容差（預設 ±10%）內都達標、膠量最少的設定；膠量相差 3% 以內時，選膠條較好、週期較短、壓力有調整餘裕的。「情境比較」一次比較所有存下的情境。</li>
  <li><b>搜尋變數</b>：自動最佳化的「搜尋變數」表裡，每個變數都可選「固定（用目前設定）」或「搜尋」——圖樣種類（蛇形、螺旋、米字形、單點、中心線，可勾選）、路徑間距、邊界內縮、螺旋起點（外向內／中心向外）、移動速度；範圍留空為自動，也可自己輸入。膠量一定搜尋。表下方顯示總組合數；每種圖樣的最佳組都會找膠量窗口，方便比較。</li>
  <li><b>針嘴與速度自動選</b>：針嘴選「自動」、速度選「搜尋」時，每組幾何先算好要用哪支針嘴、多快：在壓力（轉速）範圍內鋪得出整個膠量範圍、膠條最接近針嘴大小、週期不超過週期上限（未設定時以 30 s 為參考）。壓合結果主要由圖樣決定、幾乎不受速度與針嘴影響，所以速度不增加組數。出不了需要的膠量時，表格會標「設備上限 x×」，說明是針嘴、壓力或速度卡住。</li>
  <li><b>說明在「?」裡</b>：介面上的小圓圈問號，游標移過去（手機點一下）就會顯示該項的說明；表格裡的判定、膠條、覆蓋等格子也可以移過去看細節。</li>
  <li><b>夾氣顏色</b>：壓合畫面下方工具列可切換夾氣顏色（洋紅、藍、黃、黑），遇到和膠材相近的顏色時換一個；選擇會記在這台電腦。</li>
  <li><b>最佳化精細度</b>：快速／標準／精細／極精細四級，越精細候選越多、找窗口與複核的組數越多、網格越細；選級時會依這台電腦試算一次估出時間。搜尋分散在多個執行緒並行；搜尋中可按「停止搜尋」，會保留已完成的部分結果（標示「未複核」者不能當最終建議）。只有在細網格、容差內多個膠量都達標的結果才算「達標」；套用時網格會設成該結果使用的網格。</li>
  <li><b>情境</b>：覺得不錯的參數按結果卡的「存成情境」（未壓合會自動先算），再改參數繼續試；「情境比較」依「覆蓋 ≥ 目標、溢膠 ≤ 上限、膠量最少」排序，可載入、改名、刪除、匯出 CSV／JSON。情境存在這台電腦的瀏覽器。</li>
  <li><b>疊高</b>：路徑重複經過的地方（例如米字形每條來回、中心反覆經過、轉角停頓）膠會疊起來。3D 畫面會把後面那趟的膠條畫在先前的膠上；結果卡的「膠高 / 寬」會顯示疊起來的最高點；高於針嘴離面高度時警告「針嘴會碰到前一道膠」，自動最佳化也會當作埋針扣分。</li>
  <li><b>針嘴與膠條</b>：同樣每 mm 膠量下，膠條的高與寬由針嘴離面高度決定；針嘴內徑決定出膠量與膠條品質。結果卡的拉細倍率（針嘴內孔截面 ÷ 膠條截面）0.7–1.5 視為良好，偏大代表膠條被拉細，偏小代表堆疊；匹配內徑 ≈ √(4 × 每 mm 膠量 / π)。間隙很薄、膠又很黏時，細針嘴出膠慢、粗針嘴膠條被拉細，需要在膠條與週期之間取捨。</li>
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
