import { simulate, runTiming, pcpPressureRpm } from './engine.js';

// Deposited volume falls with travel speed and rises with gate time, drive pressure and pump speed.
const RISING = new Set(['gateDuration', 'pressure', 'rpm']);
export const BOUNDS = Object.freeze({ speed: [1, 800], gateDuration: [0.001, 10], pressure: [10, 100], rpm: [10, 150] });

/**
 * Find the value of one setting whose deposited volume matches a target: travel speed (default for
 * lines and patterns), gate time (default for a point), drive pressure (R75) or pump speed (P300).
 *
 * Volume is monotonic in each setting and close to a power law, so the search works on
 * F = ln(volume ÷ target) against ln(setting): a secant step (starting from the current setting with
 * slope 1, i.e. volume ∝ setting) inside the bracket found so far, bisection whenever the step would
 * leave the bracket and every fourth step. It stops at 0.1 % (typically 3–6 probes instead of 26).
 * Each probe uses the run's closed-form deposit (runTiming, equal to a full simulation's) and only the
 * chosen setting is simulated. Values are clamped to the exact range ends. `reached` is false when the target lies outside the range;
 * the closest setting is then returned, and where the volume has stopped changing toward the range end
 * (e.g. acceleration-limited travel speed) the least extreme setting with that volume (`refineLimit`).
 */
export function tuneForVolume(config, targetMl, { iterations = 26, key, lo, hi, tolerance = 1e-3, refineLimit = true } = {}) {
  const k = key ?? (config.mode === 'point' ? 'gateDuration' : 'speed');
  const rising = RISING.has(k);
  const vLo = lo ?? BOUNDS[k][0];
  const vHi = hi ?? BOUNDS[k][1];
  const xa = Math.log(vLo);
  const xb = Math.log(vHi);
  let best = null;
  let simulations = 0;
  const probes = [];
  const valueAt = (x) => (x <= xa ? vLo : x >= xb ? vHi : Math.min(vHi, Math.max(vLo, Math.exp(x))));
  const probe = (x) => {
    const value = valueAt(x);
    let timing = null;
    try {
      timing = runTiming({ ...config, [k]: value });
      if (!timing.fits) timing = null; // e.g. a very slow path exceeds the 180 s run limit: too much material for speed
    } catch {
      timing = null;
    }
    simulations++;
    const volume = timing ? timing.deposited : null;
    if (timing && (!best || Math.abs(volume - targetMl) < Math.abs(best.volume - targetMl) - 1e-12)) best = { value, volume };
    const h = timing ? (volume > 0 ? Math.log(volume / targetMl) : -Infinity) : rising ? -Infinity : Infinity;
    const pt = { x, value, volume, F: rising ? h : -h }; // F rises with x
    probes.push(pt);
    return pt;
  };
  const tolF = Math.log(1 + tolerance);
  const start = Number(config[k]) > 0 ? Math.log(config[k]) : (xa + xb) / 2;
  let p = probe(Math.min(xb, Math.max(xa, start)));
  let prev = null;
  let L = null; // too little material (F < 0)
  let R = null; // too much (F > 0)
  let limit = null; // range end reached without bracketing the target
  for (let i = 1; i < iterations && !(Math.abs(p.F) <= tolF); i++) {
    if (p.F < 0) L = p;
    else R = p;
    if (L && R && R.x - L.x < 1e-7) break;
    let slope = 1;
    if (prev && Number.isFinite(prev.F) && Number.isFinite(p.F) && prev.x !== p.x) {
      const s = (p.F - prev.F) / (p.x - prev.x);
      if (s > 0.05) slope = s;
    }
    let x = Number.isFinite(p.F) ? p.x - p.F / slope : NaN;
    if (L && R) {
      if (!(x > L.x && x < R.x) || i % 4 === 0) x = (L.x + R.x) / 2;
    } else if (L) {
      if (L.x >= xb) {
        limit = L;
        break;
      }
      x = Math.min(xb, x > L.x ? x : L.x + 1);
    } else {
      if (R.x <= xa) {
        limit = R;
        break;
      }
      x = Math.max(xa, x < R.x ? x : R.x - 1);
    }
    prev = p;
    p = probe(x);
  }
  if (!best) throw new Error('無法在設備限制內達到目標膠量');
  // Out of range with a volume that no longer changes toward the range end: take the least extreme
  // setting that still gives (within 0.1 %) the end volume, not the end itself.
  if (refineLimit && limit && limit.volume > 0 && Math.abs(best.volume / limit.volume - 1) <= tolerance) {
    const same = (q) => q.volume > 0 && Math.abs(q.volume / limit.volume - 1) <= tolerance;
    const away = (q) => Math.abs(q.x - limit.x);
    // Knee between the nearest probe that still differs and the farthest one that already matches.
    const differ = probes.filter((q) => !same(q)).sort((u, v) => away(u) - away(v))[0];
    if (differ) {
      let a = differ.x;
      let b = probes.filter((q) => same(q) && away(q) < away(differ)).sort((u, v) => away(v) - away(u))[0].x;
      for (let j = 0; j < 8; j++) {
        const m = probe((a + b) / 2);
        if (same(m)) b = m.x;
        else a = m.x;
      }
      best = { ...best, value: valueAt(b) };
    }
  }
  const value = Number(best.value.toPrecision(4));
  const run = simulate({ ...config, [k]: Math.min(vHi, Math.max(vLo, value)) });
  return {
    config: { ...config, [k]: Math.min(vHi, Math.max(vLo, value)) },
    run,
    key: k,
    reached: Math.abs(run.summary.deposited - targetMl) <= Math.max(1e-6, targetMl * 0.03),
    simulations: simulations + 1,
  };
}

// Drive that sets the flow: air pressure on the R75, metering-shaft speed on the P300 (working ranges).
export const DRIVES = Object.freeze({
  R75: { key: 'pressure', lo: 10, hi: 100, label: '驅動壓力', unit: 'psi' },
  P300: { key: 'rpm', lo: 10, hi: 150, label: 'PCP 轉速', unit: 'rpm' },
});
/**
 * Drive range for this config. On the P300 (v2.2) the top speed is also capped where the needle needs the
 * pump's maximum working pressure (290 psi) to take the flow: a fine needle cannot be fed at 150 rpm.
 */
export const driveOf = (config) => {
  if (config.architecture !== 'P300') return DRIVES.R75;
  let cap = Infinity;
  try {
    cap = pcpPressureRpm(config);
  } catch {
    /* incomplete config */
  }
  if (!(cap < DRIVES.P300.hi)) return DRIVES.P300;
  return { ...DRIVES.P300, hi: Math.max(DRIVES.P300.lo, cap), pressureLimited: true };
};
/** Motion setting that sets the dose without touching the drive: travel speed, or gate time for a point. */
export const motionKeyOf = (config) => (config.mode === 'point' ? 'gateDuration' : 'speed');

/**
 * Reach a target dose the way it is done on the line. knob 'drive' changes pressure / pump speed at the
 * current travel speed (or gate time) and only moves that motion setting once the drive is at its range
 * limit (`fallback`); knob 'motion' changes the travel speed (or gate time) at the current drive.
 */
export function tuneDose(config, targetMl, knob = 'drive', { iterations = 26 } = {}) {
  const motionKey = motionKeyOf(config);
  if (knob !== 'drive') return { ...tuneForVolume(config, targetMl, { key: motionKey, iterations }), fallback: false };
  const drive = driveOf(config);
  // Only the direction matters when the drive cannot reach the dose: no need to refine at its range end.
  const t = tuneForVolume(config, targetMl, { key: drive.key, lo: drive.lo, hi: drive.hi, iterations, refineLimit: false });
  if (t.reached) return { ...t, fallback: false };
  const short = t.run.summary.deposited < targetMl;
  const m = tuneForVolume({ ...config, [drive.key]: short ? drive.hi : drive.lo }, targetMl, { key: motionKey, iterations });
  // Both settings at a range end: the dose is out of reach (e.g. too small a nozzle for the material).
  const v = m.config[motionKey];
  const motionAtLimit = !m.reached && (v <= BOUNDS[motionKey][0] + 1e-9 || v >= BOUNDS[motionKey][1] - 1e-9);
  return { ...m, fallback: true, motionAtLimit, simulations: t.simulations + m.simulations };
}
