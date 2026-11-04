import { estimateCompression } from './compression.js';
import { tuneForVolume } from './tuning.js';
import { planDispensePath } from './path-planning.js';

/*
 * Goal-based ranking and a robust settings search for one dispensing pattern.
 *
 * Goal: reach a coverage target with overflow under a limit, using as little material as possible.
 * A single result "passes" when both limits hold; passing results rank by least material, the rest by
 * how far they miss (5 % coverage short counts like 1 mm too much overflow).
 *
 * The search mirrors how a dispensing process is set up on a new part:
 *  - pattern type, heat source, gap, material, acceleration and press conditions stay fixed;
 *  - it varies the edge inset and, for serpentine and spiral, the pitch;
 *  - for each geometry it finds the dose window: the least dose reaching the coverage target and the
 *    most dose keeping overflow under the limit. The nominal dose must keep both within a dose
 *    tolerance (default ±10 %, the usual drift of a time-pressure dispenser), so a setting is chosen
 *    for its margin, not for one lucky point;
 *  - dose is set through drive pressure (R75) or pump speed (P300) at the current travel speed, and
 *    only when the drive reaches its range limit through travel speed; or through travel speed alone;
 *  - the nozzle is either kept or matched to the bead per pitch from standard needle sizes. The model's
 *    bead shape does not depend on the nozzle, so the match is a bead-quality check (travel speed vs
 *    paste exit speed), not a coverage effect.
 * Geometries are screened at one dose on a coarse grid, the best few get their window, and the best three
 * are re-run on the configured grid at −tol, nominal and +tol. Simulator-only search: as uncertain as the
 * model it runs on.
 */

export const GOAL_DEFAULTS = Object.freeze({ coverage: 95, overflow: 3 });
export const OPTIMIZE_DEFAULTS = Object.freeze({ tolerance: 0.1, knob: 'flow', nozzle: 'fixed', cycleLimit: null, dose: [0.8, 2.5] });

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

// Travel speed ÷ paste exit speed. Near 1 the paste is laid as a rope about the nozzle's size; well above
// it the bead is drawn thin (it can neck or break), well below it the paste piles up and folds air in.
// The band is an engineering assumption.
export const MATCH_BAND = Object.freeze([0.7, 1.5]);

/** How well the nozzle suits the bead it lays: bead cross-section, matched bore, speed ratio, height. */
export function beadMatch(run) {
  const c = run.config;
  const length = run.pathLength || 0;
  const beadArea = length > 0 ? (run.summary.deposited * 1000) / length : 0;
  const exitSpeed = (run.Q * 1000) / ((Math.PI * c.diameter ** 2) / 4);
  const speedRatio = exitSpeed > 0 && c.mode !== 'point' ? c.speed / exitSpeed : null;
  const state = speedRatio === null ? 'n/a' : speedRatio > MATCH_BAND[1] ? 'stretched' : speedRatio < MATCH_BAND[0] ? 'piled' : 'ok';
  return {
    beadArea,
    matchedId: Math.sqrt((4 * beadArea) / Math.PI),
    exitSpeed,
    speedRatio,
    state,
    beadHeight: run.summary.maxHeight,
    standoff: c.standoff,
    drags: run.summary.maxHeight > c.standoff,
  };
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

export function searchSpace(config, heat) {
  const p = config.pathSettings;
  const short = Math.min(heat.width, heat.shape === 'circle' ? heat.width : heat.depth);
  const pitched = p.pattern === 'serpentine' || p.pattern === 'spiral';
  const spacings = pitched
    ? unique([short / 12, short / 9, short / 6, short / 4, p.spacing].map((v) => round(v, 0.5)).filter((v) => v >= 1.5 && v <= short / 2.5))
    : [p.spacing];
  const insets = unique([1, 2.5, 4, short / 5, p.edgeInset].map((v) => round(v, 0.5)).filter((v) => v >= 0 && v < short / 2 - 1));
  return { spacings: spacings.length ? spacings : [p.spacing], insets: insets.length ? insets : [p.edgeInset], pitched };
}

/** The setting that sets the dose: drive pressure / pump speed at fixed travel speed, or travel speed. */
export function doseKnob(config, knob = 'flow') {
  if (knob === 'speed') return { key: 'speed', lo: 1, hi: 800, label: '移動速度', unit: 'mm/s' };
  if (config.architecture === 'P300') return { key: 'rpm', lo: 10, hi: 150, label: 'PCP 轉速', unit: 'rpm' };
  return { key: 'pressure', lo: 10, hi: 100, label: '驅動壓力', unit: 'psi' };
}

export function optimizeSettings(config, heat, options = {}) {
  const o = { ...OPTIMIZE_DEFAULTS, goals: GOAL_DEFAULTS, searchCell: 0.75, keep: 4, verify: 3, bisections: 4, ...options };
  const { goals, dose } = o;
  const tol = o.tolerance;
  if (config.mode !== 'pattern') throw new Error('自動最佳化目前只支援「依熱源」圖樣');
  if (!(dose[0] > 0 && dose[1] > dose[0])) throw new Error('膠量範圍需為 0 < 下限 < 上限');
  if (!(tol >= 0 && tol < 0.5)) throw new Error('膠量容差需介於 0 與 50%');
  const area = heat.shape === 'circle' ? (Math.PI * heat.width ** 2) / 4 : heat.width * heat.depth;
  const required = (area * heat.gap) / 1000;
  const coarse = { ...heat, cellSize: Math.max(heat.cellSize, o.searchCell), frames: 0 };
  const fine = { ...heat, frames: 0 };
  const knob = doseKnob(config, o.knob);
  const space = searchSpace(config, heat);
  const screenDose = Math.sqrt(dose[0] * dose[1]);

  const geometries = space.spacings.flatMap((spacing) =>
    space.insets.map((edgeInset) => {
      let diameter = config.diameter;
      if (o.nozzle === 'match') {
        const length = planDispensePath({ ...config.pathSettings, spacing, edgeInset }).length;
        diameter = nearestNeedle(Math.sqrt((4 * ((required * 1000 * screenDose) / length)) / Math.PI)).id;
      }
      return { spacing, edgeInset, diameter };
    }),
  );
  const keep = Math.min(o.keep, geometries.length);
  const budget = geometries.length + keep * (3 + 2 * o.bisections) + o.verify * 3;
  let done = 0;
  const tick = (label) => {
    done++;
    o.onProgress?.(Math.min(1, done / budget), label);
  };
  const describeGeometry = (g) => `${space.pitched ? `間距 ${g.spacing} mm、` : ''}內縮 ${g.edgeInset} mm${o.nozzle === 'match' ? `、針嘴 ${needleLabel(g.diameter)}` : ''}`;

  // Dose through the drive first; when the drive is at its limit, move the travel speed, as on the line.
  const tuneDose = (c, target) => {
    if (knob.key === 'speed') return tuneForVolume(c, target, { key: 'speed', iterations: 16 });
    const t = tuneForVolume(c, target, { key: knob.key, lo: knob.lo, hi: knob.hi, iterations: 16 });
    if (t.reached) return t;
    const short = t.run.summary.deposited < target;
    const s = tuneForVolume({ ...c, [knob.key]: short ? knob.hi : knob.lo }, target, { key: 'speed', iterations: 16 });
    return { ...s, speedChanged: true };
  };
  const cache = new Map();
  const evaluate = (g, f, h) => {
    const key = `${g.spacing}|${g.edgeInset}|${g.diameter}|${f.toFixed(5)}|${h.cellSize}`;
    if (cache.has(key)) return cache.get(key);
    const c = { ...config, diameter: g.diameter, pathSettings: { ...config.pathSettings, spacing: g.spacing, edgeInset: g.edgeInset } };
    let result = null;
    try {
      const tuned = tuneDose(c, required * f);
      const squeeze = estimateCompression(tuned.run, h);
      const cycleOk = !(o.cycleLimit > 0) || tuned.run.ending.motionEnd <= o.cycleLimit;
      result = {
        ...g,
        factor: f,
        knobValue: tuned.config[knob.key],
        settings: { speed: tuned.config.speed, pressure: tuned.config.pressure, rpm: tuned.config.rpm, diameter: tuned.config.diameter },
        reached: tuned.reached,
        speedChanged: Boolean(tuned.speedChanged),
        cycleOk,
        bead: beadMatch(tuned.run),
        ...metricsOf(tuned.run, squeeze),
      };
    } catch {
      result = null;
    }
    cache.set(key, result);
    tick(describeGeometry(g));
    return result;
  };

  // 1. Screen every geometry at one dose.
  const screened = geometries
    .map((g) => ({ g, r: evaluate(g, screenDose, coarse) }))
    .filter((x) => x.r)
    .sort((a, b) => judge(a.r, goals).deficit - judge(b.r, goals).deficit || a.r.depositedMl - b.r.depositedMl);
  if (!screened.length) throw new Error('所有組合都無法在設備限制內完成，請放寬膠量範圍或調整壓力／針嘴');

  // 2. Dose window of the best few: least dose for coverage, most dose within the overflow limit.
  const windowOf = (g) => {
    const at = (f) => evaluate(g, f, coarse);
    const lo = at(dose[0]);
    const hi = at(dose[1]);
    let fCov = null;
    if (hi && hi.coveredPercent >= goals.coverage) {
      if (lo && lo.coveredPercent >= goals.coverage) fCov = dose[0];
      else {
        let a = dose[0];
        let b = dose[1];
        for (let k = 0; k < o.bisections; k++) {
          const m = Math.sqrt(a * b);
          const r = at(m);
          if (r && r.coveredPercent >= goals.coverage) b = m;
          else a = m;
        }
        fCov = b;
      }
    }
    let fOvf = null;
    if (lo && lo.squeezeOutMm <= goals.overflow) {
      if (hi && hi.squeezeOutMm <= goals.overflow) fOvf = dose[1];
      else {
        let a = dose[0];
        let b = dose[1];
        for (let k = 0; k < o.bisections; k++) {
          const m = Math.sqrt(a * b);
          const r = at(m);
          if (r && r.squeezeOutMm <= goals.overflow) a = m;
          else b = m;
        }
        fOvf = a;
      }
    }
    // Nominal dose: the coverage edge plus the tolerance, or the window centre if the window is narrower.
    // Without a window the two goals conflict; take the evaluated dose that misses by the least.
    let nominal;
    if (fCov !== null && fOvf !== null && fCov <= fOvf) {
      nominal = fCov / (1 - tol);
      if (nominal * (1 + tol) > fOvf) nominal = Math.sqrt(fCov * fOvf);
    } else {
      const tried = [...cache.entries()].filter(([k, r]) => r && k.startsWith(`${g.spacing}|${g.edgeInset}|${g.diameter}|`) && k.endsWith(`|${coarse.cellSize}`)).map(([, r]) => r);
      nominal = rank(tried, goals)[0]?.factor ?? dose[1];
    }
    nominal = Math.min(dose[1], Math.max(dose[0], nominal));
    const margin = fCov !== null && fOvf !== null && fCov <= fOvf ? Math.min(1 - fCov / nominal, fOvf / nominal - 1) : null;
    const r = at(nominal);
    return r ? { ...r, fCov, fOvf, margin, robust: margin !== null && margin >= tol - 1e-9 } : null;
  };
  const feasible = (r) => r.reached && r.cycleOk;
  const order = (a, b) => {
    const pa = a.robust && feasible(a);
    const pb = b.robust && feasible(b);
    if (pa !== pb) return pa ? -1 : 1;
    if (pa) {
      // Within 1 % of material, prefer a well-laid bead, then the shorter cycle, then the wider window.
      if (Math.abs(a.depositedMl - b.depositedMl) > 0.01 * Math.max(a.depositedMl, b.depositedMl)) return a.depositedMl - b.depositedMl;
      const beadA = a.bead.state === 'ok' && !a.bead.drags;
      const beadB = b.bead.state === 'ok' && !b.bead.drags;
      if (beadA !== beadB) return beadA ? -1 : 1;
      return a.cycle - b.cycle || b.margin - a.margin;
    }
    return compareRanked(a, b, goals);
  };
  let candidates = screened
    .slice(0, keep)
    .map(({ g }) => windowOf(g))
    .filter(Boolean)
    .sort(order);
  // Geometries that were not kept still show their screening result.
  const rest = screened.slice(keep).map(({ r }) => ({ ...r, fCov: null, fOvf: null, margin: null, robust: false, screenedOnly: true }));

  // 3. Verify the best few on the configured grid at −tol, nominal and +tol.
  candidates = candidates.map((c, k) => {
    if (k >= o.verify) return c;
    const g = { spacing: c.spacing, edgeInset: c.edgeInset, diameter: c.diameter };
    const band = [c.factor * (1 - tol), c.factor, c.factor * (1 + tol)].map((f) => evaluate(g, f, fine)).filter(Boolean);
    const mid = band.find((r) => Math.abs(r.factor - c.factor) < 1e-9) || c;
    if (!band.length) return c;
    const worst = {
      coveredPercent: Math.min(...band.map((r) => r.coveredPercent)),
      squeezeOutMm: Math.max(...band.map((r) => r.squeezeOutMm)),
      voidAreaMm2: Math.max(...band.map((r) => r.voidAreaMm2)),
    };
    const ok = worst.coveredPercent >= goals.coverage && worst.squeezeOutMm <= goals.overflow;
    return { ...c, ...mid, fCov: c.fCov, fOvf: c.fOvf, margin: c.margin, worst, verified: true, robust: ok };
  });
  const final = [...candidates.sort(order), ...rest].map((c) => {
    const basis = c.worst || c;
    const j = judge(basis, goals);
    return { ...c, ...j, pass: c.robust && feasible(c) };
  });
  return {
    goals,
    tolerance: tol,
    knob,
    nozzle: o.nozzle,
    cycleLimit: o.cycleLimit,
    required,
    dose,
    space,
    searchCell: coarse.cellSize,
    evaluations: done,
    candidates: final,
    best: final[0],
  };
}
