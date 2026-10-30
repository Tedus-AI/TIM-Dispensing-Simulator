import { simulate } from './engine.js';
import { estimateCompression } from './compression.js';
import { tuneForVolume } from './tuning.js';

// Squeeze estimates and pattern comparisons run here so the 3D view stays responsive.
const slim = (run) => ({
  config: run.config,
  summary: { deposits: run.summary.deposits },
  path: run.path,
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
    if (type === 'compare') {
      const { config, heat, patterns, factor, matchVolume } = payload;
      const required = ((heat.shape === 'circle' ? (Math.PI * heat.width ** 2) / 4 : heat.width * heat.depth) * heat.gap) / 1000;
      const rows = [];
      patterns.forEach((pattern, k) => {
        self.postMessage({ id, progress: k / patterns.length, label: pattern });
        const c = { ...config, mode: 'pattern', pathSettings: { ...config.pathSettings, pattern } };
        try {
          let run;
          let tuned = c;
          let reached = true;
          if (matchVolume) {
            const t = tuneForVolume(c, required * factor);
            run = t.run;
            tuned = t.config;
            reached = t.reached;
          } else run = simulate(c);
          const r = compress(run, heat, 0).summary;
          rows.push({
            pattern,
            ok: true,
            reached,
            speed: tuned.speed,
            pathLength: run.pathLength,
            cycle: run.ending.motionEnd,
            deposited: run.summary.deposited,
            volumeRatio: r.volumeRatio,
            coveredPercent: r.coveredPercent,
            voidCount: r.voidCount,
            voidAreaMm2: r.voidAreaMm2,
            squeezeOutMm: r.squeezeOutMm,
            rise: r.thermal.rise,
            resistance: r.thermal.resistance,
            corners: run.motion?.corners ?? 0,
          });
        } catch (error) {
          rows.push({ pattern, ok: false, error: error.message });
        }
      });
      self.postMessage({ id, ok: true, result: { rows, required, factor, matchVolume } });
      return;
    }
    throw new Error('unknown job');
  } catch (error) {
    self.postMessage({ id, ok: false, error: error.message });
  }
};
