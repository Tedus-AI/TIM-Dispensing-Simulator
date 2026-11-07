import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  fromRegistry,
  simulate,
  pulse,
  pneumaticPulse,
  startDeficit,
  flowExponent,
  steadyFlow,
  powerLawTubeFlow,
  pasteRheology,
  needlePressure,
  pcpPressureRpm,
  PCP_MAX_PRESSURE,
} from '../src/engine.js';
import { squeezeRaster, estimateCompression, KGF } from '../src/compression.js';
import { driveOf, tuneDose } from '../src/tuning.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));
const PSI = 6894.757293168;

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

test('R75: flow follows the first-order air pressure through Q ∝ P^m (closed form = numerical integral)', () => {
  const [Q, tau, tauOff, gate, delay] = [1, 0.15, 0.1, 0.4, 0.03];
  for (const m of [1, 1.3, 2.5, 2.7]) {
    let v = 0;
    const dt = 2e-6;
    for (let t = 0; t < 1.5; t += dt) {
      const u = t + dt / 2 - delay;
      if (u <= 0) continue;
      const p = u <= gate ? 1 - Math.exp(-u / tau) : (1 - Math.exp(-gate / tau)) * Math.exp(-(u - gate) / tauOff);
      v += Q * p ** m * dt;
    }
    const closed = pneumaticPulse(1.5, Q, gate, delay, tau, tauOff, m).volume;
    assert.ok(Math.abs(closed / v - 1) < 1e-5, `m ${m}: ${closed} vs ${v}`);
  }
  // m = 1 is the v2.1 response; the start-up loss is τ·H_m and the tail τ/m.
  assert.deepEqual(pneumaticPulse(0.7, 2, 0.4, 0.03, 0.15, 0.1, 1), pulse(0.7, 2, 0.4, 0.03, 0.15, 0.1));
  assert.ok(Math.abs(startDeficit(1, 2.5) - 1.680372) < 1e-5, `H_2.5 ${startDeficit(1, 2.5)}`); // ψ(3.5) + γ
  assert.ok(Math.abs(startDeficit(1, 3) - (1 + 1 / 2 + 1 / 3)) < 1e-7);
  const long = pneumaticPulse(100, 1, 10, 0, 0.15, 0.1, 2.5).volume;
  assert.ok(Math.abs(long - (10 - 0.15 * startDeficit(1, 2.5) + 0.1 / 2.5)) < 1e-9);
});

test('R75 run uses the material exponent: a short grease shot lays less than the linear response would', () => {
  const c = { ...fromRegistry(registry, 'grease'), mode: 'point', diameter: 1.19, gateDuration: 0.2, endMotion: 'legacy' };
  assert.equal(flowExponent(c), 1 / c.flowIndex);
  const shot = simulate(c).summary.deposited;
  const Q = steadyFlow(c);
  const linear = pulse(100, Q, 0.2, c.delay, c.tauOn, c.tauOff).volume;
  const power = pneumaticPulse(100, Q, 0.2, c.delay, c.tauOn, c.tauOff, 1 / c.flowIndex).volume;
  assert.ok(Math.abs(shot / power - 1) < 1e-9);
  assert.ok(shot < 0.8 * linear, `${shot} vs linear ${linear}`);
  // A long line hardly changes: the loss is a fixed start and end, not a rate.
  const line = { ...fromRegistry(registry, 'grease'), mode: 'line', diameter: 1.19, lineLength: 100, speed: 5, shutoffDistance: 0, endMotion: 'legacy' };
  const steady = steadyFlow(line) * (100 / 5);
  assert.ok(simulate(line).summary.deposited > 0.95 * steady);
});

test('P300: needle pressure from the paste power law caps the pump speed at 290 psi', () => {
  const c = { ...fromRegistry(registry, 'grease', 'P300'), diameter: 0.84 };
  const { K, n } = pasteRheology(c);
  const q = powerLawTubeFlow(K, n, 200 * PSI, c.diameter, c.nozzleLength);
  assert.ok(Math.abs(needlePressure(c, q) / 200 - 1) < 1e-9, 'inverse of the tube law');
  const rpm = pcpPressureRpm(c);
  assert.ok(Math.abs(needlePressure({ ...c, rpm }, steadyFlow({ ...c, rpm })) / PCP_MAX_PRESSURE - 1) < 1e-9);
  assert.ok(rpm < 60, `18G grease can take only ${rpm} rpm`);
  const drive = driveOf(c);
  assert.ok(drive.pressureLimited && Math.abs(drive.hi - Math.max(10, rpm)) < 1e-9);
  assert.equal(driveOf({ ...c, diameter: 3.175 }).hi, 150, 'a coarse nozzle keeps the full range');
  const run = simulate({ ...c, rpm: 60, mode: 'point', gateDuration: 0.5 });
  assert.ok(run.warnings.some((w) => w.includes('超過 PCP 最高工作壓力')));
  assert.ok(!simulate({ ...c, diameter: 2.16, rpm: 60, mode: 'point', gateDuration: 0.5 }).warnings.some((w) => w.includes('超過 PCP 最高工作壓力')));
  // Dose tuning on the P300 stays within the pressure-limited speed.
  const t = tuneDose({ ...c, diameter: 1.19, mode: 'point', gateDuration: 0.5, rpm: 20 }, 1, 'drive');
  assert.ok(t.config.rpm <= driveOf({ ...c, diameter: 1.19 }).hi + 1e-6);
});

test('Bingham squeeze: a disc stops at the plastic-limit gap F = (2π/3)·τy·R³/h', () => {
  const [h1, tauY, F, K] = [1, 2000, 20, 50];
  const r0 = raster(0.25, 40, h1, (x, y) => Math.hypot(x, y) < 6);
  const V = total(r0.volume); // mm³
  const out = squeezeRaster(r0, { gap: 0.05, airMode: 'vent', force: F, viscosity: K, yieldStress: tauY, settleTime: 0 });
  // F = (2π/3)·τy·(V/πh)^(3/2)/h  ⇒  h = ((2π/3)·τy·(V/π)^(3/2)·1e-6 / F)^(2/5) in mm (Pa·mm²→N).
  const expected = (((2 * Math.PI) / 3) * tauY * (V / Math.PI) ** 1.5 * 1e-6 / F) ** 0.4;
  assert.equal(out.press.stalled, 'yield');
  assert.ok(Math.abs(out.gap / expected - 1) < 0.06, `stopped at ${out.gap} mm vs plastic limit ${expected} mm`);
  assert.ok(Math.abs(out.press.yieldLoadN / F - 1) < 0.02);
  assert.ok(Math.abs(total(out.volume) - V) < 1e-9 * V);
  // Without the yield stress the same press reaches the spacers.
  const free = squeezeRaster(r0, { gap: 0.3, airMode: 'vent', force: F, viscosity: K, yieldStress: 0, settleTime: 0 });
  assert.equal(free.press.stalled, null);
  assert.equal(free.gap, 0.3);
});

test('hold time: the plate stops where the Stefan law puts it at that time; the peak force is the set force', () => {
  const [h1, mu, F] = [1, 1000, 50];
  const r0 = raster(0.5, 2 * 6 * Math.sqrt(h1 / 0.2) + 6, h1, (x, y) => Math.hypot(x, y) < 6);
  const V = total(r0.volume) * 1e-9;
  const hold = 30;
  const out = squeezeRaster(r0, { gap: 0.1, airMode: 'vent', force: F, viscosity: mu, settleTime: 0, holdTime: hold });
  // Stefan: t = 3μV²/(8πF)·(h⁻⁴ − h₀⁻⁴)
  const h = ((hold * 8 * Math.PI * F) / (3 * mu * V * V) + (h1 * 1e-3) ** -4) ** -0.25 * 1e3;
  assert.equal(out.press.stalled, 'time');
  assert.ok(Math.abs(out.press.time / hold - 1) < 0.03, `stopped at ${out.press.time} s`);
  assert.ok(Math.abs(out.gap / h - 1) < 0.04, `h ${out.gap} vs Stefan ${h}`);
  assert.ok(Math.abs(out.press.peakForceN / F - 1) < 1e-6);
  // The approach-speed cap holds the plate back: the press then uses less than the set force.
  const slow = squeezeRaster(r0, { gap: 0.6, airMode: 'vent', force: 5000, viscosity: mu, settleTime: 0, pressSpeed: 0.01 });
  assert.ok(slow.press.peakForceN < 5000 * 0.5 && slow.press.peakForceN > 0);
});

test('estimateCompression: thermal resistance uses the bond line actually reached', () => {
  const heat = { shape: 'rectangle', width: 20, depth: 20, offsetX: 0, offsetY: 0, gap: 0.05, cellSize: 0.75, power: 25 };
  const c = { ...fromRegistry(registry, 'grease'), mode: 'pattern', diameter: 1.19, pressure: 60, speed: 20, pathSettings: { ...heat, pattern: 'serpentine', spacing: 4, edgeInset: 2 } };
  const run = simulate(c);
  const full = estimateCompression(run, heat).summary;
  const held = estimateCompression(run, { ...heat, holdTime: 5 }).summary;
  assert.equal(held.press.stalled, 'time');
  assert.ok(held.press.finalGapMm > 0.05 && held.thermal.bondLineMm === held.press.finalGapMm);
  assert.ok(held.thermal.bulkImpedanceCm2 > full.thermal.bulkImpedanceCm2);
  const weak = estimateCompression(run, { ...heat, pressKgf: 0.2, yieldStress: 500 }).summary;
  assert.equal(weak.press.stalled, 'yield');
  assert.ok(weak.thermal.bondLineMm > 0.05);
  assert.ok(Math.abs(full.press.peakForceKgf - 10) < 0.01 * 10 + 1e-9);
  assert.ok(Math.abs(full.press.peakForceN / KGF - full.press.peakForceKgf) < 1e-9);
});

test('a nozzle far above its bead warns about the free-falling rope', () => {
  const c = { ...fromRegistry(registry, 'putty'), mode: 'line', diameter: 0.84, pressure: 90, speed: 30, standoff: 5 };
  assert.ok(simulate(c).warnings.some((w) => w.includes('懸空')));
  assert.ok(!simulate({ ...c, standoff: 0.1 }).warnings.some((w) => w.includes('懸空')));
});
