import { simulate } from './engine.js';

/**
 * Find the travel speed (line / pattern) or gate time (point) whose deposited volume matches a target.
 * Deposited volume falls monotonically with speed and rises with gate time, so bisection (in log space)
 * is safe. `reached` is false when the target lies outside the equipment limits.
 */
export function tuneForVolume(config, targetMl, { iterations = 26 } = {}) {
  const point = config.mode === 'point';
  const key = point ? 'gateDuration' : 'speed';
  let lo = point ? 0.001 : 1;
  let hi = point ? 10 : 800;
  let best = null;
  for (let i = 0; i < iterations; i++) {
    const value = Math.sqrt(lo * hi);
    let run = null;
    try {
      run = simulate({ ...config, [key]: value });
    } catch {
      run = null; // e.g. a very slow path exceeds the 180 s run limit: treat as too much material
    }
    const volume = run ? run.summary.deposited : Infinity;
    if (run && (!best || Math.abs(volume - targetMl) < Math.abs(best.volume - targetMl))) best = { run, value, volume };
    const tooMuch = volume > targetMl;
    if (point === tooMuch) hi = value;
    else lo = value;
  }
  if (!best) throw new Error('無法在設備限制內達到目標膠量');
  const value = Number(best.value.toPrecision(4));
  const run = simulate({ ...config, [key]: value });
  return {
    config: { ...config, [key]: value },
    run,
    key,
    reached: Math.abs(run.summary.deposited - targetMl) <= Math.max(1e-6, targetMl * 0.03),
  };
}
