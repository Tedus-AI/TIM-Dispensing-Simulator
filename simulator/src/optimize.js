import { estimateCompression } from './compression.js';
import { tuneForVolume } from './tuning.js';

/*
 * Goal-based ranking and a numerical settings search for one dispensing pattern.
 *
 * Goal: reach a coverage target with overflow under a limit, using as little material as possible.
 * A result "passes" when both limits hold; passing results rank by least material, the rest by how
 * far they miss (5 % coverage short counts like 1 mm too much overflow).
 *
 * The search keeps the pattern type, heat source, gap, material, equipment pressure, nozzle and press
 * conditions fixed. It varies the edge inset, the pitch (serpentine and spiral only) and the dose, which
 * is set through the travel speed. For each geometry it finds the smallest dose that meets the coverage
 * target by bisection, on a coarser grid; the best few are then re-run on the configured grid.
 * Simulator-only search: as uncertain as the model it runs on.
 */

export const GOAL_DEFAULTS = Object.freeze({ coverage: 95, overflow: 3 });

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

export function optimizeSettings(config, heat, { goals = GOAL_DEFAULTS, dose = [0.8, 2.5], searchCell = 0.75, verify = 3, bisections = 4, onProgress } = {}) {
  if (config.mode !== 'pattern') throw new Error('自動最佳化目前只支援「依熱源」圖樣');
  if (!(dose[0] > 0 && dose[1] > dose[0])) throw new Error('膠量範圍需為 0 < 下限 < 上限');
  const area = heat.shape === 'circle' ? (Math.PI * heat.width ** 2) / 4 : heat.width * heat.depth;
  const required = (area * heat.gap) / 1000;
  const coarse = { ...heat, cellSize: Math.max(heat.cellSize, searchCell), frames: 0 };
  const space = searchSpace(config, heat);
  const combos = space.spacings.flatMap((spacing) => space.insets.map((edgeInset) => ({ spacing, edgeInset })));
  const budget = combos.length * (2 + bisections) + verify;
  let done = 0;
  const tick = (label) => {
    done++;
    onProgress?.(Math.min(1, done / budget), label);
  };

  const evaluate = ({ spacing, edgeInset }, factor, h) => {
    const c = { ...config, pathSettings: { ...config.pathSettings, spacing, edgeInset } };
    let tuned;
    try {
      tuned = tuneForVolume(c, required * factor, { iterations: 14 });
    } catch {
      return null;
    }
    const squeeze = estimateCompression(tuned.run, h);
    return { spacing, edgeInset, factor, speed: tuned.config.speed, reached: tuned.reached, ...metricsOf(tuned.run, squeeze) };
  };

  const candidates = [];
  for (const combo of combos) {
    const label = `${space.pitched ? `間距 ${combo.spacing} mm、` : ''}內縮 ${combo.edgeInset} mm`;
    let best = evaluate(combo, dose[1], coarse);
    tick(label);
    if (!best) continue;
    if (best.coveredPercent >= goals.coverage) {
      // Smallest dose meeting the coverage target; coverage rises with dose.
      let lo = dose[0];
      let hi = dose[1];
      const low = evaluate(combo, lo, coarse);
      tick(label);
      if (low && low.coveredPercent >= goals.coverage) best = low;
      else
        for (let k = 0; k < bisections; k++) {
          const mid = (lo + hi) / 2;
          const r = evaluate(combo, mid, coarse);
          tick(label);
          if (r && r.coveredPercent >= goals.coverage) {
            hi = mid;
            best = r;
          } else lo = mid;
        }
    }
    candidates.push(best);
  }
  if (!candidates.length) throw new Error('所有組合都無法在設備限制內完成，請放寬膠量範圍或調整壓力／針嘴');

  // Re-run the best few on the configured grid; ranking uses those values.
  const ranked = rank(candidates, goals);
  for (let k = 0; k < Math.min(verify, ranked.length); k++) {
    const r = ranked[k];
    const fine = evaluate(r, r.factor, { ...heat, frames: 0 });
    tick('以設定網格複核');
    if (fine) ranked[k] = { ...fine, verified: true };
  }
  const final = rank(ranked, goals);
  return {
    goals,
    required,
    dose,
    space,
    searchCell: coarse.cellSize,
    evaluations: done,
    candidates: final.map((r) => ({ ...r, ...judge(r, goals) })),
    best: final[0],
  };
}
