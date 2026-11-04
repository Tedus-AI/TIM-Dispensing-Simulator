import { simulate } from './engine.js';

// Deposited volume falls with travel speed and rises with gate time, drive pressure and pump speed.
const RISING = new Set(['gateDuration', 'pressure', 'rpm']);
const BOUNDS = { speed: [1, 800], gateDuration: [0.001, 10], pressure: [10, 100], rpm: [10, 150] };

/**
 * Find the value of one setting whose deposited volume matches a target: travel speed (default for
 * lines and patterns), gate time (default for a point), drive pressure (R75) or pump speed (P300).
 * Volume is monotonic in each, so bisection (in log space) is safe. `reached` is false when the target
 * lies outside the given range or the equipment limits.
 */
export function tuneForVolume(config, targetMl, { iterations = 26, key, lo, hi } = {}) {
  const point = config.mode === 'point';
  const k = key ?? (point ? 'gateDuration' : 'speed');
  const rising = RISING.has(k);
  let a = lo ?? BOUNDS[k][0];
  let b = hi ?? BOUNDS[k][1];
  let best = null;
  for (let i = 0; i < iterations; i++) {
    const value = Math.sqrt(a * b);
    let run = null;
    try {
      run = simulate({ ...config, [k]: value });
    } catch {
      run = null; // e.g. a very slow path exceeds the 180 s run limit: treat as too much material
    }
    const volume = run ? run.summary.deposited : rising ? -Infinity : Infinity;
    if (run && (!best || Math.abs(volume - targetMl) < Math.abs(best.volume - targetMl))) best = { run, value, volume };
    const tooMuch = run ? volume > targetMl : !rising;
    if (rising === tooMuch) b = value;
    else a = value;
  }
  if (!best) throw new Error('無法在設備限制內達到目標膠量');
  const value = Number(best.value.toPrecision(4));
  const run = simulate({ ...config, [k]: value });
  return {
    config: { ...config, [k]: value },
    run,
    key: k,
    reached: Math.abs(run.summary.deposited - targetMl) <= Math.max(1e-6, targetMl * 0.03),
  };
}
