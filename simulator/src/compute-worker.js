import { estimateCompression } from './compression.js';
import { tuneDose } from './tuning.js';
import { evaluateTask, calibrateTask, chooseProcess, NEEDLES } from './optimize.js';

// Squeeze estimates, dose tuning and optimiser evaluations run here (the optimiser
// spreads its evaluations over a pool of these workers) so the 3D view stays responsive.
const slim = (run) => ({
  config: run.config,
  summary: { deposits: run.summary.deposits },
  path: run.path,
  pathLength: run.pathLength,
  gridStart: run.gridStart,
  cellLength: run.cellLength,
  maxHeight: run.maxHeight,
});

function compress(run, heat, frames) {
  return estimateCompression(slim(run), { ...heat, frames });
}

self.onmessage = (event) => {
  const { id, type, payload } = event.data;
  try {
    if (type === 'compress') {
      const result = compress(payload.run, payload.heat, payload.frames ?? 24);
      const transfer = [];
      for (const f of result.grid.frames) transfer.push(f.coverage.buffer, f.trapped.buffer);
      self.postMessage({ id, ok: true, result }, transfer);
      return;
    }
    if (type === 'tune') {
      const t = tuneDose(payload.config, payload.target, payload.knob);
      // Short of the target with the drive and motion at their limits: the finest coarser needle that lays it
      // at the current speed (gate time) within the drive range.
      let suggest = null;
      if (!t.reached && t.run.summary.deposited < payload.target) {
        const c = payload.config;
        const needles = NEEDLES.map((n) => n.id).filter((d) => d > c.diameter + 1e-9);
        const p = needles.length ? chooseProcess(c, { needles, nominalMl: payload.target, lowMl: 0, needMl: payload.target, knob: payload.knob === 'drive' ? 'drive' : 'motion' }) : null;
        if (p?.fits && p.ok) suggest = { diameter: p.diameter };
      }
      self.postMessage({ id, ok: true, result: { config: t.config, key: t.key, reached: t.reached, fallback: t.fallback, deposited: t.run.summary.deposited, suggest } });
      return;
    }
    if (type === 'evaluate') {
      // One optimiser evaluation; a failed one (e.g. outside the equipment range) is reported as null.
      let result = null;
      try {
        result = evaluateTask(payload);
      } catch {
        result = null;
      }
      self.postMessage({ id, ok: true, result });
      return;
    }
    if (type === 'calibrate') {
      self.postMessage({ id, ok: true, result: calibrateTask(payload) });
      return;
    }
    throw new Error('unknown job');
  } catch (error) {
    self.postMessage({ id, ok: false, error: error.message });
  }
};
