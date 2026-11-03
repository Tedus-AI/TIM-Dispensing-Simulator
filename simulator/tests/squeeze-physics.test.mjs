import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromRegistry } from '../src/engine.js';
import { estimateCompression, squeezeRaster, ATM } from '../src/compression.js';
import { tuneForVolume } from '../src/tuning.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));

// Raster of fluid of height h0 inside `inside(x, y)` (4×4 sub-samples per cell), centred on the origin.
function raster(cell, size, h0, inside) {
  const cols = Math.ceil(size / cell);
  const n = cols * cols;
  const area = cell * cell;
  const volume = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const x = ((i % cols) + 0.5) * cell - size / 2;
    const y = (Math.floor(i / cols) + 0.5) * cell - size / 2;
    let f = 0;
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (inside(x + ((a - 1.5) * cell) / 4, y + ((b - 1.5) * cell) / 4)) f += 1 / 16;
    volume[i] = f * area * h0;
  }
  return { cols, rows: cols, cellSize: cell, volume, size };
}
const total = (v) => v.reduce((a, b) => a + b, 0);

test('constant-force squeeze of a disc matches the Stefan closing time on coarse and fine grids', () => {
  const [h1, h2, mu, F] = [1, 0.3, 1000, 50];
  for (const cell of [0.5, 0.25]) {
    const r0 = raster(cell, 2 * 6 * Math.sqrt(h1 / h2) + 6, h1, (x, y) => Math.hypot(x, y) < 6);
    const out = squeezeRaster(r0, { gap: h2, airMode: 'vent', force: F, viscosity: mu, settleTime: 0 });
    const V = total(r0.volume) * 1e-9;
    const stefan = ((3 * mu * V * V) / (8 * Math.PI * F)) * ((h2 * 1e-3) ** -4 - (h1 * 1e-3) ** -4);
    assert.ok(Math.abs(out.press.time / stefan - 1) < 0.05, `cell ${cell}: ${out.press.time} s vs Stefan ${stefan} s`);
    assert.ok(Math.abs(total(out.volume) - total(r0.volume)) < 1e-9 * total(r0.volume));
  }
});

test('an enclosed bubble drifts with the squeeze flow at about twice the fluid speed (Taylor–Saffman)', () => {
  const [h1, xb] = [1, 4];
  const r0 = raster(0.25, 2 * 10 * Math.SQRT2 + 8, h1, (x, y) => Math.hypot(x, y) < 10 && Math.hypot(x - xb, y) > 1.5);
  const out = squeezeRaster(r0, { gap: 0.5, airMode: 'compressible', force: 1, viscosity: 1000, yieldStress: 0, settleTime: 0, frames: 12 });
  const f = out.frames.find((k) => k.gap < 0.85 && k.gap > 0.78);
  assert.ok(f, 'a frame near h = 0.8 mm');
  let sx = 0;
  let c = 0;
  for (let i = 0; i < f.trapped.length; i++)
    if (f.trapped[i]) {
      sx += ((i % r0.cols) + 0.5) * r0.cellSize - r0.size / 2;
      c++;
    }
  const x = sx / c;
  const fluid = xb * Math.sqrt(h1 / f.gap); // radial squeeze: a fluid particle moves as r ∝ h^-1/2
  const saffman = xb * (h1 / f.gap); // bubble at twice the local speed: r ∝ h^-1
  assert.ok(Math.abs(x - saffman) / saffman < 0.06, `bubble x ${x} vs Taylor–Saffman ${saffman}`);
  assert.ok(x > fluid + 0.3, 'bubble outruns the fluid around it');
});

test('a trapped bubble obeys pV = const, re-expands after the plate seats, and the yield stress holds it back', () => {
  const r0 = raster(0.5, 2 * 10 * Math.SQRT2 + 8, 1, (x, y) => Math.hypot(x, y) < 10 && Math.hypot(x, y) > 2.5);
  const base = { gap: 0.5, airMode: 'compressible', force: 98, viscosity: 2500 };
  const seated = squeezeRaster(r0, { ...base, yieldStress: 0, settleTime: 0 });
  assert.equal(seated.pockets.length, 1);
  const b = seated.pockets[0];
  const p = b.gas / b.air - ATM;
  assert.ok(p > 50e3, 'compressed while the film carries the load');
  assert.ok(Math.abs((b.air * (ATM + p)) / b.gas - 1) < 1e-12);
  assert.ok(Math.abs(b.gas / ATM / (Math.PI * 2.5 ** 2) - 1) < 0.1, 'sealed at first contact with the hole volume at 1 atm');

  const relaxed = squeezeRaster(r0, { ...base, yieldStress: 0, settleTime: 600 });
  const r = relaxed.pockets[0];
  assert.ok(Math.abs(r.gas / b.gas - 1) < 1e-9, 'gas is conserved');
  assert.ok((r.air * ATM) / r.gas > 0.99, 'back to ~1 atm with no yield stress');
  assert.ok(relaxed.press.relaxTime > 5 && relaxed.press.settled);

  const held = squeezeRaster(r0, { ...base, yieldStress: 5000, settleTime: 600 }).pockets[0];
  const ph = held.gas / held.air - ATM;
  assert.ok(Math.abs(ph - held.hold) < 0.05 * held.hold, `held at ${ph} Pa vs Bingham hold ${held.hold} Pa`);
  assert.ok((held.air * ATM) / held.gas < 0.5);
});

test('compressible air removes the rigid-wall artifacts: even spread, no stranded material, bounded by the vent case', () => {
  const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 0.75, power: 25 };
  const c = { ...fromRegistry(registry, 'grease'), mode: 'pattern', diameter: 3, pathSettings: { ...heat, pattern: 'spiral', spacing: 3, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' } };
  const run = tuneForVolume(c, 0.45 * 2.5).run;
  const res = Object.fromEntries(['rigid', 'compressible', 'vent'].map((airMode) => [airMode, estimateCompression(run, { ...heat, airMode })]));
  const spread = (r) => {
    const g = r.grid;
    const side = [0, 0, 0, 0];
    for (let i = 0; i < g.coverage.length; i++)
      if (g.coverage[i] >= 0.5) {
        const x = g.originX + ((i % g.cols) + 0.5) * g.cellSize;
        const y = g.originY + (Math.floor(i / g.cols) + 0.5) * g.cellSize;
        side[0] = Math.max(side[0], -x - 15);
        side[1] = Math.max(side[1], x - 15);
        side[2] = Math.max(side[2], -y - 15);
        side[3] = Math.max(side[3], y - 15);
      }
    return Math.max(...side) / Math.min(...side);
  };
  assert.ok(spread(res.compressible) < 1.15, `compressible spread ratio ${spread(res.compressible)}`);
  assert.ok(res.rigid.summary.unresolvedMl > 0.01);
  assert.ok(res.compressible.summary.unresolvedMl < 1e-6);
  assert.ok(res.vent.summary.coveredPercent >= res.compressible.summary.coveredPercent - 0.5);
  assert.ok(res.compressible.summary.coveredPercent > res.rigid.summary.coveredPercent);
  assert.ok(res.compressible.summary.voidAreaMm2 < res.rigid.summary.voidAreaMm2);
  for (const r of Object.values(res)) assert.ok(Math.abs(r.summary.conservationErrorMl) < 1e-9);
  const p = res.compressible.summary.press;
  assert.ok(p.sealed > 0 && p.vented > 0, 'bubbles both form and escape');
  assert.ok(p.pressTime > 0 && Number.isFinite(p.peakBubbleKPa));
});

test('frames carry the press and relaxation phases with time; options are validated', () => {
  const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 0.75, power: 25 };
  const c = { ...fromRegistry(registry, 'grease'), mode: 'pattern', pathSettings: { ...heat, pattern: 'serpentine', spacing: 5, edgeInset: 2 } };
  const run = tuneForVolume(c, 0.54).run;
  const v = estimateCompression(run, { ...heat, frames: 16 });
  const f = v.grid.frames;
  assert.ok(f.length >= 8 && f.length <= 16);
  assert.equal(f[0].phase, 'press');
  for (let k = 1; k < f.length; k++) {
    assert.ok(f[k].t >= f[k - 1].t);
    assert.ok(f[k].gap <= f[k - 1].gap + 1e-12);
    if (f[k].phase === 'press') assert.ok(f[k - 1].phase === 'press');
  }
  assert.equal(f.at(-1).gap, 0.5);
  if (v.summary.press.sealed && v.summary.press.relaxTime > 0) assert.ok(f.some((k) => k.phase === 'relax'));
  assert.throws(() => estimateCompression(run, { ...heat, airMode: 'magic' }), /夾氣/);
  assert.throws(() => estimateCompression(run, { ...heat, pressKgf: 0 }), /壓合力/);
  assert.throws(() => estimateCompression(run, { ...heat, settleTime: -1 }), /靜置/);
  assert.throws(() => estimateCompression(run, { ...heat, viscosity: -5 }), /黏度/);
  assert.throws(() => estimateCompression(run, { ...heat, yieldStress: -1 }), /降伏應力/);
});

test('a thin bond line with a tight spiral still reaches the spacers: more material spreads further and takes longer', async () => {
  // Field case: Tgrease square spiral 1.5 mm pitch, Ø2 mm nozzle, 0.05 mm spacers, two travel speeds.
  // v1.1.0 ran out of plate steps here and jumped to the gap, leaving most material unspread.
  const { simulate } = await import('../src/engine.js');
  const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.05, cellSize: 0.75, power: 25 };
  const base = { ...fromRegistry(registry, 'grease'), mode: 'pattern', diameter: 2, pathSettings: { ...heat, pattern: 'spiral', spacing: 1.5, edgeInset: 3, spiralShape: 'square', spiralDirection: 'inside-out' } };
  const [fast, slow] = [
    { speed: 100, acceleration: 500 },
    { speed: 50, acceleration: 250 },
  ].map((m) => estimateCompression(simulate({ ...base, ...m }), heat).summary);
  assert.ok(slow.depositedMl > fast.depositedMl * 1.3);
  for (const s of [fast, slow]) {
    assert.ok(s.unresolvedMl < 1e-3 * s.depositedMl, `unspread ${s.unresolvedMl} mL`);
    assert.ok(Math.abs(s.conservationErrorMl) < 1e-9);
    assert.ok(s.press.peakBubbleKPa < 5000, `peak bubble ${s.press.peakBubbleKPa} kPa`);
  }
  assert.ok(slow.squeezeOutMm > fast.squeezeOutMm + 2, 'more material squeezes out further');
  assert.ok(slow.coveredPercent >= fast.coveredPercent - 1);
  // Stefan: closing time grows with the square of the volume at a fixed force.
  const ratio = slow.press.pressTime / fast.press.pressTime;
  const expected = (slow.depositedMl / fast.depositedMl) ** 2;
  assert.ok(ratio > 0.6 * expected && ratio < 1.6 * expected, `time ratio ${ratio} vs V² ratio ${expected}`);
});
