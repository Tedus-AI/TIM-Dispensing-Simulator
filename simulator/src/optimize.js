import { estimateCompression } from './compression.js';
import { tuneDose, driveOf, motionKeyOf } from './tuning.js';
import { planDispensePath } from './path-planning.js';

/*
 * Goal-based ranking and a robust settings search for one dispensing path.
 *
 * Goal: reach a coverage target with overflow under a limit, using as little material as possible.
 * A single result "passes" when both limits hold; passing results rank by least material, the rest by
 * how far they miss (5 % coverage short counts like 1 mm too much overflow).
 *
 * The search mirrors how a dispensing process is set up on a new part:
 *  - pattern type, heat source, gap, material, acceleration, standoff and press conditions stay fixed;
 *  - for a heat-source pattern it varies the edge inset and, for serpentine and spiral, the pitch; a line
 *    or a dot has no pattern geometry and only its dose is searched;
 *  - for each geometry it finds the dose window: the least dose reaching the coverage target and the
 *    most dose keeping overflow under the limit. The nominal dose must keep both within a dose
 *    tolerance (default ±10 %, the usual drift of a time-pressure dispenser), so a setting is chosen
 *    for its margin, not for one lucky point;
 *  - dose is set through drive pressure (R75) or pump speed (P300) at the current travel speed (gate time),
 *    and only at the drive's range limit through the motion; or through the motion alone;
 *  - the nozzle is either kept or matched to the bead per pitch from standard needle sizes (a bead-quality
 *    check: travel speed vs paste exit speed).
 * Stages: (1) every geometry is screened on the search grid at two doses and ranked by its estimated dose
 * window; (2) the best few get their window by bisection from the bracket the screening already gives;
 * (3) the leaders are re-run on the final grid at 3 or 5 doses across the tolerance band, and the next one
 * is checked whenever a leader fails, so only a re-run result can pass. The search fineness (candidates,
 * window count, bisections, band points, grids) comes in four levels. Evaluations are independent and
 * can run in parallel. Simulator-only search: as uncertain as the model it runs on.
 */

export const GOAL_DEFAULTS = Object.freeze({ coverage: 95, overflow: 3 });
export const OPTIMIZE_DEFAULTS = Object.freeze({ tolerance: 0.1, knob: 'drive', nozzle: 'fixed', cycleLimit: null, dose: [0.8, 2.5], level: 2 });

// Common dispensing needle inner diameters, mm (approximate catalogue values) and the 1/8" bore of the
// Laird Tputty guideline.
export const NEEDLES = Object.freeze([
  { id: 0.41, label: '22G' },
  { id: 0.51, label: '21G' },
  { id: 0.61, label: '20G' },
  { id: 0.84, label: '18G' },
  { id: 1.19, label: '16G' },
  { id: 1.36, label: '15G' },
  { id: 1.54, label: '14G' },
  { id: 2.0, label: 'Ø2.0' },
  { id: 2.5, label: 'Ø2.5' },
  { id: 3.175, label: '1/8"' },
]);
export const nearestNeedle = (d) => NEEDLES.reduce((a, b) => (Math.abs(Math.log(b.id / d)) < Math.abs(Math.log(a.id / d)) ? b : a));
export const needleLabel = (d) => NEEDLES.find((n) => Math.abs(n.id - d) < 1e-6)?.label ?? `Ø${d}`;

// Stretch ratio = average travel speed ÷ paste exit speed = nozzle bore area ÷ bead cross-section. Near 1
// the paste is laid as a rope about the nozzle's size; well above it the bead is drawn thin (it can neck or
// break), well below it the paste piles up and folds air in. The band is an engineering assumption.
export const MATCH_BAND = Object.freeze([0.7, 1.5]);

/**
 * How well the nozzle suits the bead it lays: bead cross-section, matched bore, stretch ratio, height. The
 * ratio comes from the bead actually laid (deposit per mm of path), so acceleration and corners that keep
 * the nozzle below its set speed are included; the set speed alone overstates the stretch on short segments.
 */
export function beadMatch(run) {
  const c = run.config;
  const length = run.pathLength || 0;
  const beadArea = length > 0 ? (run.summary.deposited * 1000) / length : 0;
  const boreArea = (Math.PI * c.diameter ** 2) / 4;
  const exitSpeed = (run.Q * 1000) / boreArea;
  const speedRatio = c.mode !== 'point' && beadArea > 0 ? boreArea / beadArea : null;
  const state = speedRatio === null ? 'n/a' : speedRatio > MATCH_BAND[1] ? 'stretched' : speedRatio < MATCH_BAND[0] ? 'piled' : 'ok';
  return {
    beadArea,
    matchedId: Math.sqrt((4 * beadArea) / Math.PI),
    exitSpeed,
    speedRatio,
    averageSpeed: speedRatio === null ? null : speedRatio * exitSpeed,
    state,
    beadHeight: run.summary.maxHeight,
    standoff: c.standoff,
    drags: run.summary.maxHeight > c.standoff + 1e-9, // nozzle buried in the material
    flattened: Boolean(run.summary.flattened),
  };
}

/** How far a bead is from the good band, in log units (0 inside it); a buried nozzle adds 1. */
export function beadDeviation(b) {
  if (!b) return 0;
  const r = b.speedRatio;
  const off = r > 0 ? Math.abs(Math.log(r / Math.min(MATCH_BAND[1], Math.max(MATCH_BAND[0], r)))) : 0;
  return off + (b.drags ? 1 : 0);
}

export function judge(m, goals = GOAL_DEFAULTS) {
  const short = Math.max(0, goals.coverage - m.coveredPercent);
  const over = Math.max(0, m.squeezeOutMm - goals.overflow);
  return { pass: short <= 1e-9 && over <= 1e-9, short, over, deficit: short / 5 + over };
}

export function compareRanked(a, b, goals = GOAL_DEFAULTS) {
  const ja = judge(a, goals);
  const jb = judge(b, goals);
  if (ja.pass !== jb.pass) return ja.pass ? -1 : 1;
  if (ja.pass) return a.depositedMl - b.depositedMl || b.coveredPercent - a.coveredPercent || a.squeezeOutMm - b.squeezeOutMm;
  return ja.deficit - jb.deficit || a.depositedMl - b.depositedMl;
}

export const rank = (rows, goals = GOAL_DEFAULTS) => [...rows].sort((a, b) => compareRanked(a, b, goals));

/** Metrics shared by saved scenarios and search candidates. */
export function metricsOf(run, squeeze) {
  const s = squeeze.summary;
  return {
    depositedMl: s.depositedMl,
    requiredMl: s.requiredMl,
    volumeRatio: s.volumeRatio,
    coveredPercent: s.coveredPercent,
    squeezeOutMm: s.squeezeOutMm,
    voidCount: s.voidCount,
    voidAreaMm2: s.voidAreaMm2,
    rise: s.thermal.rise,
    cycle: run.ending.motionEnd,
    pressTime: s.press?.pressTime ?? null,
    airMode: s.press?.airMode ?? null,
  };
}

const round = (v, step) => Math.round(v / step) * step;
const unique = (values) => [...new Set(values.map((v) => Number(v.toFixed(3))))].sort((a, b) => a - b);
const spread = (lo, hi, n, geometric) =>
  n <= 1 ? [geometric ? Math.sqrt(lo * hi) : (lo + hi) / 2] : Array.from({ length: n }, (_, i) => (geometric ? lo * (hi / lo) ** (i / (n - 1)) : lo + ((hi - lo) * i) / (n - 1)));

/*
 * Search fineness. Each level sets how many pitch / inset candidates are tried, how many doses screen them,
 * how many geometries get a dose window, how finely the window edges are bisected, how many results are
 * re-run (and at how many doses inside the tolerance band), and the squeeze grids used for searching and
 * for that final check.
 */
export const SEARCH_LEVELS = Object.freeze([
  { level: 1, name: '快速', candidates: 3, screenDoses: 2, keep: 2, bisections: 3, verify: 1, band: 3, searchCell: 1, verifyCell: 0.75 },
  { level: 2, name: '標準', candidates: 5, screenDoses: 2, keep: 4, bisections: 4, verify: 3, band: 3, searchCell: 0.75, verifyCell: 0.5 },
  { level: 3, name: '精細', candidates: 7, screenDoses: 2, keep: 6, bisections: 5, verify: 4, band: 5, searchCell: 0.6, verifyCell: 0.4 },
  { level: 4, name: '極精細', candidates: 9, screenDoses: 2, keep: 8, bisections: 6, verify: 5, band: 5, searchCell: 0.5, verifyCell: 0.3 },
]);
export const levelOf = (n) => SEARCH_LEVELS.find((l) => l.level === Number(n)) ?? SEARCH_LEVELS[1];

function resolve(heat, options) {
  const base = options.level != null ? levelOf(options.level) : { ...SEARCH_LEVELS[1], level: null, searchCell: Math.max(heat.cellSize, 0.75), verifyCell: heat.cellSize };
  const o = { ...OPTIMIZE_DEFAULTS, goals: GOAL_DEFAULTS, ...base, ...options };
  o.searchCell = Math.max(o.searchCell, o.verifyCell);
  return o;
}

// Path types the search can switch between, and the labels used in progress messages and tables.
export const SEARCH_PATTERNS = Object.freeze(['serpentine', 'spiral', 'point', 'line']);
export const TYPE_LABEL = Object.freeze({ serpentine: '蛇形', spiral: '螺旋', line: '中心線', n: 'N 形', perimeter: '外框', point: '單點', straight: '直線' });
export const DIRECTION_LABEL = Object.freeze({ 'outside-in': '外向內', 'inside-out': '中心向外' });
const PITCHED = new Set(['serpentine', 'spiral']);
// Default search variables: pitch and inset searched (as before v1.6), everything else fixed at the current setting.
export const VARS_DEFAULT = Object.freeze({
  pattern: { search: false, options: [...SEARCH_PATTERNS] },
  spacing: { search: true, min: null, max: null },
  inset: { search: true, min: null, max: null },
  spiralDirection: { search: false },
  speed: { search: false, min: null, max: null },
});
const typeOf = (config) => (config.mode === 'pattern' ? config.pathSettings?.pattern : config.mode === 'point' ? 'point' : 'straight');
const shortSide = (heat) => Math.min(heat.width, heat.shape === 'circle' ? heat.width : heat.depth);
/** Heat-source path settings to start from when the current path is a line or a dot. */
export function basePathSettings(config, heat) {
  return config.pathSettings ?? { shape: heat.shape, width: heat.width, depth: heat.depth, offsetX: heat.offsetX ?? 0, offsetY: heat.offsetY ?? 0, pattern: 'serpentine', spacing: Math.max(1.5, round(shortSide(heat) / 6, 0.5)), edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' };
}
/** Automatic ranges (shown in the page; a user range replaces them). */
export function autoRanges(config, heat) {
  const short = shortSide(heat);
  const s0 = Number(config.speed) > 0 ? config.speed : 20;
  return {
    spacing: [Math.max(1.5, short / 12), Math.max(Math.max(1.5, short / 12), short / 4)],
    inset: [1, Math.max(4, short / 5)],
    speed: [Math.max(1, s0 / 4), Math.min(800, s0 * 2)],
  };
}
const niceSpeed = (v) => (v < 10 ? round(v, 0.5) : v < 100 ? round(v, 1) : round(v, 5));
export const speedCount = (n) => Math.max(3, Math.round(n / 2));

/**
 * Geometry candidates. Each geometry is one path type with its own values: pitch for serpentine and spiral,
 * edge inset for every heat-source pattern, start direction for a spiral, travel speed for a moving path
 * (not when travel speed is the dose knob). A variable that is not searched keeps the current setting.
 * Searched ranges are automatic (pitch short/12–short/4 geometric, inset 1 mm–max(4 mm, short/5), speed
 * ¼–2 × current, each plus the current value) unless a range is given; n candidates per range (speed
 * max(3, n/2)), rounded to 0.5 mm (0.25 mm below a 20 mm source).
 */
export function searchSpace(config, heat, n = 5, vars = null, knob = 'drive') {
  const v = { ...VARS_DEFAULT, ...(vars || {}) };
  const p = basePathSettings(config, heat);
  const short = shortSide(heat);
  const step = short >= 20 ? 0.5 : 0.25;
  const auto = autoRanges(config, heat);
  const current = typeOf(config);
  let types = v.pattern.search ? SEARCH_PATTERNS.filter((t) => (v.pattern.options || []).includes(t)) : [current];
  if (!types.length) types = [current];
  const ranged = (spec, [aLo, aHi], geometric, count, fix, keep, nice) => {
    const user = spec.min != null || spec.max != null;
    const lo = spec.min ?? aLo;
    const hi = Math.max(lo, spec.max ?? aHi);
    const values = spread(lo, hi, count, geometric).map(nice).filter(keep);
    if (!user && keep(fix)) values.push(fix);
    return unique(values);
  };
  const spacings = v.spacing.search
    ? ranged(v.spacing, auto.spacing, true, n, p.spacing, (x) => x >= (v.spacing.min != null ? 0.5 : 1.5) && x <= (v.spacing.max != null ? short : short / 2.5), (x) => round(x, step))
    : [p.spacing];
  const insets = v.inset.search ? ranged(v.inset, auto.inset, false, n, p.edgeInset, (x) => x >= 0 && x < short / 2 - (v.inset.max != null ? 0 : 1), (x) => round(x, step)) : [p.edgeInset];
  const directions = v.spiralDirection.search ? ['outside-in', 'inside-out'] : [p.spiralDirection || 'outside-in'];
  const speedSearch = v.speed.search && knob !== 'motion';
  const speeds = speedSearch ? ranged(v.speed, auto.speed, true, speedCount(n), config.speed, (x) => x >= 1 && x <= 800, niceSpeed) : [config.speed];
  const sp = spacings.length ? spacings : [p.spacing];
  const ins = insets.length ? insets : [p.edgeInset];
  const geometries = [];
  for (const type of types) {
    if (type === 'point') {
      geometries.push({ type, mode: 'point', key: 'point' });
      continue;
    }
    for (const speed of speeds) {
      if (type === 'straight') {
        geometries.push({ type, mode: 'line', speed, key: `straight|${speed}` });
        continue;
      }
      for (const spacing of PITCHED.has(type) ? sp : [null])
        for (const edgeInset of ins)
          for (const spiralDirection of type === 'spiral' ? directions : [p.spiralDirection || 'outside-in'])
            geometries.push({ type, mode: 'pattern', pattern: type, spacing, edgeInset, spiralDirection, speed, key: [type, spacing, edgeInset, spiralDirection, speed].join('|') });
    }
  }
  const patternTypes = types.filter((t) => t !== 'point' && t !== 'straight');
  const pitched = types.some((t) => PITCHED.has(t));
  return {
    geometries,
    types,
    spacings: pitched ? sp : patternTypes.length ? [p.spacing] : [null],
    insets: patternTypes.length ? ins : [null],
    pitched,
    geometry: patternTypes.length > 0,
    varies: {
      pattern: types.length > 1,
      spacing: pitched && sp.length > 1,
      inset: patternTypes.length > 0 && ins.length > 1,
      spiralDirection: types.includes('spiral') && directions.length > 1,
      speed: speedSearch && speeds.length > 1 && types.some((t) => t !== 'point'),
    },
    speedLocked: v.speed.search && knob === 'motion',
  };
}

/** The setting that sets the dose: the drive (pressure / pump speed), or travel speed / gate time. */
export function doseKnob(config, knob = 'drive') {
  if (knob === 'drive' || knob === 'flow') return { id: 'drive', ...driveOf(config) };
  return config.mode === 'point'
    ? { id: 'motion', key: 'gateDuration', label: '開膠時間', unit: 's' }
    : { id: 'motion', key: 'speed', label: '移動速度', unit: 'mm/s' };
}

/** One search evaluation: reach the target dose, squeeze, report. Runs in a worker or in place. */
export function evaluateTask({ config, heat, target, knob }) {
  const tuned = tuneDose(config, target, knob);
  const squeeze = estimateCompression(tuned.run, { ...heat, frames: 0 });
  const c = tuned.config;
  return {
    settings: { speed: c.speed, gateDuration: c.gateDuration, pressure: c.pressure, rpm: c.rpm, diameter: c.diameter },
    reached: tuned.reached,
    fallback: Boolean(tuned.fallback),
    bead: beadMatch(tuned.run),
    ...metricsOf(tuned.run, squeeze),
  };
}

const clock = () => (globalThis.performance ? performance.now() : Date.now());
/**
 * Time one dose tuning and one squeeze at 1.0 and 0.5 mm for the duration estimate. A first untimed pass
 * warms up the JavaScript engine, which otherwise makes the first runs in a fresh worker look slow.
 */
export function calibrateTask({ config, heat, target, knob }) {
  const warm = tuneDose(config, target, knob);
  estimateCompression(warm.run, { ...heat, cellSize: 1, frames: 0 });
  let t = clock();
  const tuned = tuneDose(config, target * 1.02, knob);
  const tune = clock() - t;
  const cells = [1, 0.5].map((cellSize) => {
    t = clock();
    const r = estimateCompression(tuned.run, { ...heat, cellSize, frames: 0 });
    return { cell: cellSize, ms: clock() - t, n: r.grid.cols * r.grid.rows, gridCell: r.grid.cellSize };
  });
  return { tune, cells };
}

const GRID_CAP = 80000; // compression.js keeps a grid under 90,000 cells by coarsening it
/**
 * Squeeze time (ms) at a grid size from the calibration: time ∝ cells^q with cells ∝ 1/h² up to the cap.
 * q is fitted between the two calibration grids; finer than the 0.5 mm one it is at least 1.8 (measured
 * 1.8–2.1 from 0.5 to 0.3 mm, as the press needs more and smaller steps on a fine grid).
 */
export function squeezeMs(cal, cell) {
  const [a, b] = cal.cells;
  const fitted = b.n > a.n * 1.05 && a.ms > 0 && b.ms > 0 ? Math.log(b.ms / a.ms) / Math.log(b.n / a.n) : 1.6;
  const q = Math.min(2.2, Math.max(0.8, fitted));
  const area = a.n * a.gridCell ** 2;
  const n = Math.min(GRID_CAP, area / cell ** 2);
  if (n <= b.n || !(b.n > a.n * 1.05)) return Math.max(1, a.ms) * Math.max(n / a.n, 0.05) ** q;
  return Math.max(1, a.ms * (b.n / a.n) ** q) * (n / b.n) ** Math.max(1.8, q);
}

/** How many evaluations a level runs at most (screening, dose windows, final check). */
export function planSearch(config, heat, options = {}) {
  const o = resolve(heat, options);
  const space = searchSpace(config, heat, o.candidates, o.vars, o.knob);
  const geometries = space.geometries.length;
  // Besides the overall leaders, the best geometry of every path type gets a dose window.
  const keep = Math.min(geometries, o.keep + Math.max(0, space.types.length - 1));
  const verify = Math.min(o.verify, keep);
  const screen = geometries * (o.screenDoses >= 2 ? 2 : 1);
  const window = keep * (3 + 2 * o.bisections);
  return { level: o.level, geometries, types: space.types, keep, verify, band: o.band, screenDoses: o.screenDoses >= 2 ? 2 : 1, bisections: o.bisections, screen, window, coarse: screen + window, fine: verify * o.band, searchCell: o.searchCell, verifyCell: o.verifyCell };
}

/**
 * Wall time (s) of a plan with `workers` evaluations in parallel: screening and the final check run fully
 * in parallel; each dose window is two bisection chains whose steps must follow one another. Each extra
 * worker counts as 0.6 of one (shared cores, hyper-threads, memory bandwidth); the page then corrects the
 * estimate with the measured time of earlier searches on the same computer.
 */
export function estimateSeconds(plan, cal, workers = 1) {
  const w = 1 + 0.6 * (Math.max(1, workers) - 1);
  const coarse = (cal.tune + squeezeMs(cal, plan.searchCell)) / 1000;
  const fine = (cal.tune + squeezeMs(cal, plan.verifyCell)) / 1000;
  const rounds = (n) => Math.ceil(n / w);
  const screen = rounds(plan.screen) * coarse;
  const windows = (rounds(2 * plan.keep) * (1 + plan.bisections) + rounds(plan.keep)) * coarse;
  const check = rounds(plan.fine) * fine;
  // Fresh workers load the modules and run their first evaluations before the engine has warmed up.
  const startup = 2 + 2 * coarse;
  return startup + screen + windows + check;
}

/**
 * Screening doses in the decision zone: just above the least dose that could reach the coverage goal at all
 * (coverage cannot exceed the glue's own area at the gap, so f ≥ goal/100), and that dose times
 * (1 + tol)/(1 − tol), where the overflow limit must still hold. Measured against full dose ladders this
 * picks the geometries with the least robust dose far more reliably than screening in the middle of the
 * range, where most geometries already pass and look alike.
 */
export function screeningDoses(goals, tol, dose, count = 2) {
  let fa = Math.min(dose[1], Math.max(dose[0], (1.1 * goals.coverage) / 100));
  const fb = Math.min(dose[1], fa * Math.max(1.15, (1 + tol) / (1 - tol)));
  if (fb - fa < 1e-6) fa = Math.max(dose[0], fb / 1.2);
  return count >= 2 ? [fa, fb] : [fa];
}

/**
 * Estimated dose window from the two screening doses, only used to choose which geometries get a full
 * window: uncovered area (100 − coverage) decays exponentially with dose, bounded below by the volume
 * limit goal/100; overflow grows linearly. Ties (several geometries at the volume limit) go to the higher
 * coverage at the lower dose, then the lower overflow at the higher dose.
 */
export function estimateWindow(points, goals, tol) {
  const deficit = Math.min(...points.map((r) => judge(r, goals).deficit));
  const pts = points.filter((r) => r.reached).sort((a, b) => a.factor - b.factor);
  if (pts.length < 2) {
    const p = pts[0] ?? points[0];
    return { feasible: false, deficit, tie: [-p.coveredPercent, p.squeezeOutMm] };
  }
  const [p, q] = [pts[0], pts.at(-1)];
  const floor = goals.coverage / 100;
  const ua = Math.max(0.05, 100 - p.coveredPercent);
  const ub = Math.max(0.05, 100 - q.coveredPercent);
  const u = 100 - goals.coverage;
  const beta = ub < ua ? Math.log(ub / ua) / (q.factor - p.factor) : 0;
  let fCov = null;
  if (p.coveredPercent >= goals.coverage) fCov = beta < 0 ? Math.max(floor, Math.min(p.factor, p.factor + Math.log(u / ua) / beta)) : p.factor;
  else if (beta < 0) fCov = Math.max(floor, p.factor + Math.log(u / ua) / beta);
  const slope = (q.squeezeOutMm - p.squeezeOutMm) / (q.factor - p.factor);
  let fOvf = null;
  if (q.squeezeOutMm <= goals.overflow) fOvf = slope > 0 ? q.factor + (goals.overflow - q.squeezeOutMm) / slope : Infinity;
  else if (p.squeezeOutMm <= goals.overflow) fOvf = p.factor + (goals.overflow - p.squeezeOutMm) / slope;
  else if (slope > 0) {
    const f = p.factor - (p.squeezeOutMm - goals.overflow) / slope;
    fOvf = f > 0 ? f : null;
  }
  const nominal = fCov !== null ? fCov / (1 - tol) : null;
  return { feasible: nominal !== null && fOvf !== null && nominal * (1 + tol) <= fOvf, nominal, deficit, tie: [-p.coveredPercent, q.squeezeOutMm] };
}
const screenOrder = (a, b) => {
  if (a.est.feasible !== b.est.feasible) return a.est.feasible ? -1 : 1;
  const d = a.est.feasible ? a.est.nominal - b.est.nominal : a.est.deficit - b.est.deficit;
  if (Math.abs(d) > 1e-9) return d;
  return a.est.tie[0] - b.est.tie[0] || a.est.tie[1] - b.est.tie[1] || a.index - b.index;
};

/**
 * Robust settings search (async). `options.evaluate(task)` runs one evaluation (a worker pool in the
 * browser); without it the work runs in place. `onProgress(fraction, label)` reports progress weighted by
 * the expected cost of each evaluation; `onPartial(result)` hands over the results so far after each stage,
 * so a stopped search can still show what it found.
 */
export async function optimizeSettings(config, heat, options = {}) {
  const o = resolve(heat, options);
  const { goals, dose } = o;
  const tol = o.tolerance;
  if (!(dose[0] > 0 && dose[1] > dose[0])) throw new Error('膠量範圍需為 0 < 下限 < 上限');
  if (!(tol >= 0 && tol < 0.5)) throw new Error('膠量容差需介於 0 與 50%');
  const area = heat.shape === 'circle' ? (Math.PI * heat.width ** 2) / 4 : heat.width * heat.depth;
  const required = (area * heat.gap) / 1000;
  const coarse = { ...heat, cellSize: o.searchCell, frames: 0 };
  const fine = { ...heat, cellSize: o.verifyCell, frames: 0 };
  // The dose knob of a geometry follows its path type: a dot has its own (gate time by default).
  const knobOf = (mode) => doseKnob({ ...config, mode }, mode === 'point' ? (o.pointKnob ?? o.knob) : o.knob);
  const motionOf = (mode) => ({ key: mode === 'point' ? 'gateDuration' : 'speed', label: mode === 'point' ? '開膠時間' : '移動速度', unit: mode === 'point' ? 's' : 'mm/s' });
  const knob = knobOf(config.mode);
  const motion = motionOf(config.mode);
  const space = searchSpace(config, heat, o.candidates, o.vars, o.knob);
  const basePath = basePathSettings(config, heat);
  const plan = planSearch(config, heat, o);
  const run =
    o.evaluate ??
    (async (task) => {
      try {
        return evaluateTask(task);
      } catch {
        return null;
      }
    });
  const screenDoses = screeningDoses(goals, tol, dose, plan.screenDoses);
  // Nozzle matching sizes the bead at the dose the search is likely to end near.
  const mid = Math.min(dose[1], Math.max(dose[0], screenDoses[0] / (1 - tol)));
  const bandFactors = o.band >= 5 ? [-1, -0.5, 0, 0.5, 1] : [-1, 0, 1];

  const pathOf = (g) => ({ ...basePath, pattern: g.pattern, spacing: g.spacing ?? basePath.spacing, edgeInset: g.edgeInset, spiralDirection: g.spiralDirection });
  const geometries = space.geometries.map((g) => {
    let diameter = config.diameter;
    if (o.nozzle === 'match' && g.mode === 'pattern') {
      const length = planDispensePath(pathOf(g)).length;
      diameter = nearestNeedle(Math.sqrt((4 * ((required * 1000 * mid) / length)) / Math.PI)).id;
    }
    return { ...g, diameter };
  });
  const describeGeometry = (g) => {
    if (!space.geometry && !space.varies.pattern) return `${g.mode === 'point' ? '單點膠量' : '直線膠量'}${space.varies.speed ? `、${g.speed} mm/s` : ''}`;
    return [
      space.varies.pattern || g.mode !== 'pattern' ? TYPE_LABEL[g.type] : '',
      space.varies.spacing && g.spacing != null ? `間距 ${g.spacing} mm` : '',
      g.mode === 'pattern' ? `內縮 ${g.edgeInset} mm` : '',
      space.varies.spiralDirection && g.type === 'spiral' ? DIRECTION_LABEL[g.spiralDirection] : '',
      space.varies.speed && g.mode !== 'point' ? `${g.speed} mm/s` : '',
      o.nozzle === 'match' && g.mode === 'pattern' ? `針嘴 ${needleLabel(g.diameter)}` : '',
    ]
      .filter(Boolean)
      .join('、');
  };
  // A dot that replaces another path type sits at the heat-source centre; a dot that is the current path
  // keeps its place.
  const configFor = (g) => {
    const c = { ...config, mode: g.mode, diameter: g.diameter };
    if (g.speed != null) c.speed = g.speed;
    if (g.mode === 'pattern') c.pathSettings = pathOf(g);
    else delete c.pathSettings;
    if (g.mode === 'point' && config.mode !== 'point') {
      c.offsetX = heat.offsetX ?? 0;
      c.offsetY = heat.offsetY ?? 0;
    }
    return c;
  };

  // Progress counts an evaluation on the final grid as costlier than one on the search grid.
  const costRatio = o.costRatio ?? (o.searchCell / o.verifyCell) ** 3;
  const budget = plan.coarse + plan.fine * costRatio;
  let done = 0;
  let evaluations = 0;
  const cache = new Map();
  const evaluate = (g, f, h, stage) => {
    const key = `${g.key}|${g.diameter}|${f.toFixed(5)}|${h.cellSize}`;
    if (!cache.has(key)) {
      const k = knobOf(g.mode);
      cache.set(
        key,
        run({ config: configFor(g), heat: h, target: required * f, knob: k.id }).then((r) => {
          evaluations++;
          done += h === fine ? costRatio : 1;
          o.onProgress?.(Math.min(0.99, done / budget), `${stage}：${describeGeometry(g)}`);
          return r ? { ...g, factor: f, knobValue: r.settings[k.key], knobInfo: k, motionInfo: motionOf(g.mode), cycleOk: !(o.cycleLimit > 0) || r.cycle <= o.cycleLimit, ...r } : null;
        }),
      );
    }
    return cache.get(key);
  };
  const geoOf = (c) => geometries.find((g) => g.key === c.key && g.diameter === c.diameter);

  const feasible = (r) => r.reached && r.cycleOk;
  const order = (a, b) => {
    const pa = a.robust && feasible(a);
    const pb = b.robust && feasible(b);
    if (pa !== pb) return pa ? -1 : 1;
    if (pa) {
      // Within 1 % of material, prefer the better-laid bead (less stretched or piled, nozzle not buried),
      // then the shorter cycle, then the wider window.
      if (Math.abs(a.depositedMl - b.depositedMl) > 0.01 * Math.max(a.depositedMl, b.depositedMl)) return a.depositedMl - b.depositedMl;
      const bead = beadDeviation(a.bead) - beadDeviation(b.bead);
      if (Math.abs(bead) > 0.2) return bead;
      return a.cycle - b.cycle || (b.margin ?? 0) - (a.margin ?? 0);
    }
    return compareRanked(a, b, goals);
  };
  // Only a result re-run on the final grid across the tolerance band can pass.
  const isPass = (c) => Boolean(c.verified && c.robust && feasible(c));
  const assemble = (candidates, rest, complete) => {
    const list = [...[...candidates].sort((a, b) => isPass(b) - isPass(a) || order(a, b)), ...rest].map((c) => {
      const j = judge(c.worst || c, goals);
      return { ...c, ...j, pass: isPass(c), coarsePass: !c.verified && Boolean(c.robust) && feasible(c) };
    });
    return { goals, tolerance: tol, knob, motion, types: space.types, nozzle: space.geometry ? o.nozzle : 'fixed', cycleLimit: o.cycleLimit, required, dose, space, plan, level: o.level, searchCell: o.searchCell, verifyCell: o.verifyCell, band: bandFactors.length, evaluations, candidates: list, best: list[0], complete };
  };
  const screenedRow = (s) => ({ ...rank(s.pts, goals)[0], fCov: null, fOvf: null, margin: null, robust: false, screenedOnly: true });

  // 1. Screen every geometry in the decision zone; rank by the estimated dose window (or how far it misses).
  const soFar = [];
  const screened = (
    await Promise.all(
      geometries.map(async (g, index) => {
        const pts = (await Promise.all(screenDoses.map((f) => evaluate(g, f, coarse, '篩選')))).filter(Boolean);
        const s = pts.length ? { g, index, pts, est: estimateWindow(pts, goals, tol) } : null;
        if (s) {
          soFar.push(s);
          o.onPartial?.(assemble([], [...soFar].sort(screenOrder).map(screenedRow), false));
        }
        return s;
      }),
    )
  )
    .filter(Boolean)
    .sort(screenOrder);
  if (!screened.length) throw new Error('所有組合都無法在設備限制內完成，請放寬膠量範圍或調整壓力／針嘴');
  // The overall leaders get a dose window, and so does the best geometry of every other path type, so the
  // table compares path types on their real windows.
  const kept = screened.slice(0, Math.min(o.keep, screened.length));
  for (const t of space.types) if (!kept.some((s) => s.g.type === t)) {
    const best = screened.find((s) => s.g.type === t);
    if (best) kept.push(best);
  }
  const rest = screened.filter((s) => !kept.includes(s)).map(screenedRow);
  o.onPartial?.(assemble([], screened.map(screenedRow), false));

  // 2. Dose window of the best few: least dose reaching the coverage goal, most dose within the overflow
  //    limit. Each edge is bisected from the tightest bracket the screening doses already give.
  const covOk = (r) => Boolean(r && r.reached && r.coveredPercent >= goals.coverage);
  const ovfOk = (r) => Boolean(r && r.reached && r.squeezeOutMm <= goals.overflow);
  const windowOf = async ({ g, pts }) => {
    const at = (f) => evaluate(g, f, coarse, '找膠量窗口');
    const covEdge = async () => {
      let hi = Math.min(...pts.filter(covOk).map((r) => r.factor));
      if (!Number.isFinite(hi)) {
        if (!covOk(await at(dose[1]))) return { f: null };
        hi = dose[1];
      }
      let lo = Math.max(...pts.filter((r) => !covOk(r) && r.factor < hi).map((r) => r.factor));
      if (!Number.isFinite(lo)) {
        if (covOk(await at(dose[0]))) return { f: dose[0], atMin: true };
        lo = dose[0];
      }
      for (let k = 0; k < o.bisections; k++) {
        const m = Math.sqrt(lo * hi);
        if (covOk(await at(m))) hi = m;
        else lo = m;
      }
      return { f: hi };
    };
    const ovfEdge = async () => {
      let lo = Math.max(...pts.filter(ovfOk).map((r) => r.factor));
      if (!Number.isFinite(lo)) {
        if (!ovfOk(await at(dose[0]))) return { f: null };
        lo = dose[0];
      }
      let hi = Math.min(...pts.filter((r) => !ovfOk(r) && r.factor > lo).map((r) => r.factor));
      if (!Number.isFinite(hi)) {
        if (ovfOk(await at(dose[1]))) return { f: dose[1] };
        hi = dose[1];
      }
      for (let k = 0; k < o.bisections; k++) {
        const m = Math.sqrt(lo * hi);
        if (ovfOk(await at(m))) lo = m;
        else hi = m;
      }
      return { f: lo };
    };
    const [cov, ovf] = await Promise.all([covEdge(), ovfEdge()]);
    const fCov = cov.f;
    const fOvf = ovf.f;
    // Nominal dose: the coverage edge plus the tolerance, or the window centre if the window is narrower.
    // Without a window the two goals conflict; take the evaluated dose that misses by the least.
    let nominal;
    const windowed = fCov !== null && fOvf !== null && fCov <= fOvf;
    if (windowed) {
      nominal = fCov / (1 - tol);
      if (nominal * (1 + tol) > fOvf) nominal = Math.sqrt(fCov * fOvf);
    } else {
      const prefix = `${g.key}|${g.diameter}|`;
      const tried = (await Promise.all([...cache.entries()].filter(([k]) => k.startsWith(prefix) && k.endsWith(`|${coarse.cellSize}`)).map(([, p]) => p))).filter(Boolean);
      nominal = rank(tried, goals)[0]?.factor ?? dose[1];
    }
    nominal = Math.min(dose[1], Math.max(dose[0], nominal));
    const margin = windowed ? Math.min(1 - fCov / nominal, fOvf / nominal - 1) : null;
    const r = await at(nominal);
    return r ? { ...r, fCov, fOvf, margin, fCovAtMin: Boolean(cov.atMin), robust: margin !== null && margin >= tol - 1e-9 } : null;
  };
  const windowed = [];
  await Promise.all(
    kept.map((s) =>
      windowOf(s).then((c) => {
        if (c) windowed.push(c);
        o.onPartial?.(assemble(windowed, [...kept.filter((x) => !windowed.some((c2) => c2.key === x.g.key)).map(screenedRow), ...rest], false));
      }),
    ),
  );
  // Deterministic order regardless of which worker finished first.
  let candidates = kept.map((s) => windowed.find((c) => c.key === s.g.key && c.diameter === s.g.diameter)).filter(Boolean);

  // 3. Re-run the leaders on the final grid across the tolerance band, until the top ones are all checked:
  //    a leader that fails moves down and the next one is checked, so the recommendation is never unchecked.
  const verifyOne = async (c) => {
    const g = geoOf(c);
    const band = (await Promise.all(bandFactors.map((s) => evaluate(g, c.factor * (1 + s * tol), fine, '複核')))).filter(Boolean);
    if (!band.length) return { ...c, verified: true, robust: false };
    const nominal = band.find((r) => Math.abs(r.factor - c.factor) < 1e-9) || c;
    const worst = {
      coveredPercent: Math.min(...band.map((r) => r.coveredPercent)),
      squeezeOutMm: Math.max(...band.map((r) => r.squeezeOutMm)),
      voidAreaMm2: Math.max(...band.map((r) => r.voidAreaMm2)),
    };
    const ok = band.length === bandFactors.length && band.every((r) => r.reached) && worst.coveredPercent >= goals.coverage && worst.squeezeOutMm <= goals.overflow;
    // Every dose of the check, for the page to show where a goal was missed.
    const bandPoints = band.map((r) => ({ shift: r.factor / c.factor - 1, factor: r.factor, depositedMl: r.depositedMl, coveredPercent: r.coveredPercent, squeezeOutMm: r.squeezeOutMm, voidAreaMm2: r.voidAreaMm2, reached: r.reached }));
    return { ...c, ...nominal, fCov: c.fCov, fOvf: c.fOvf, margin: c.margin, fCovAtMin: c.fCovAtMin, worst, bandPoints, verified: true, robust: ok };
  };
  for (;;) {
    candidates.sort(order);
    const todo = candidates.slice(0, o.verify).filter((c) => !c.verified);
    if (!todo.length) break;
    const checked = await Promise.all(todo.map(verifyOne));
    candidates = candidates.map((c) => (todo.includes(c) ? checked[todo.indexOf(c)] : c));
    o.onPartial?.(assemble(candidates, rest, false));
  }
  o.onProgress?.(1, '完成');
  return assemble(candidates, rest, true);
}
