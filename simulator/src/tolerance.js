// Worst-case check across the two tolerances that move a TIM joint in production (v3.0): the dispensed dose
// (drift of the dispenser, ± fraction) and the assembly gap (spacer, boss and flatness stack-up, ± mm).
// The material needed is area × gap, so they act together:
//  - least coverage and highest thermal resistance: less glue into the widest gap;
//  - most squeeze-out: more glue into the narrowest gap.
// A drifting dispenser changes its flow at the same path and timing, so every deposit cell scales alike.

export const TOLERANCE_DEFAULTS = Object.freeze({ dose: 0.1, gap: null });
export const MIN_GAP = 0.02; // mm, the squeeze estimate's lower limit

/** Gap tolerance used when none is set: 10 % of the gap, to 0.01 mm. */
export const defaultGapTolerance = (gap) => Math.max(0.01, Math.round(gap * 10) / 100);

/** The three cases of a check: nominal, lean (−dose, +gap) and rich (+dose, −gap). */
export function toleranceCases(gap, { dose = TOLERANCE_DEFAULTS.dose, gap: gapTol = null } = {}) {
  const dg = gapTol ?? defaultGapTolerance(gap);
  return [
    { id: 'nominal', label: '標稱', dose: 1, gap },
    { id: 'lean', label: '膠少・間隙大', dose: 1 - dose, gap: gap + dg },
    { id: 'rich', label: '膠多・間隙小', dose: 1 + dose, gap: Math.max(MIN_GAP, gap - dg) },
  ];
}

/** A run with every deposit scaled by `factor` (the slim form the squeeze needs). */
export function scaledRun(run, factor) {
  return {
    config: run.config,
    summary: { deposits: Array.from(run.summary.deposits, (v) => v * factor) },
    path: run.path,
    pathLength: run.pathLength,
    gridStart: run.gridStart,
    cellLength: run.cellLength,
    maxHeight: run.maxHeight,
  };
}

/** One case's result against the goals. */
export function toleranceRow(c, squeeze, goals) {
  const s = squeeze.summary;
  const short = Math.max(0, goals.coverage - s.coveredPercent);
  const over = Math.max(0, s.squeezeOutMm - goals.overflow);
  return {
    ...c,
    depositedMl: s.depositedMl,
    volumeRatio: s.volumeRatio,
    coveredPercent: s.coveredPercent,
    squeezeOutMm: s.squeezeOutMm,
    voidCount: s.voidCount,
    voidAreaMm2: s.voidAreaMm2,
    bondLineMm: s.thermal.bondLineMm,
    stalled: s.press?.stalled ?? null,
    resistance: s.thermal.resistance,
    rise: s.thermal.rise,
    short,
    over,
    pass: short <= 1e-9 && over <= 1e-9,
  };
}

/** Worst values over the rows and whether every case passes. */
export function toleranceVerdict(rows) {
  return {
    pass: rows.every((r) => r.pass),
    coverage: Math.min(...rows.map((r) => r.coveredPercent)),
    overflow: Math.max(...rows.map((r) => r.squeezeOutMm)),
    rise: Math.max(...rows.map((r) => r.rise)),
    resistance: Math.max(...rows.map((r) => r.resistance)),
  };
}
