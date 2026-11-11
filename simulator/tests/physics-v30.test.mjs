import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromRegistry, simulate, runTiming, steadyFlow, pasteRheology, needlePressure, thermalShift, calibrateFlow, REFERENCE_TEMPERATURE } from '../src/engine.js';
import { planPolylineMotion, curveRadius } from '../src/motion.js';
import { planDispensePath } from '../src/path-planning.js';
import { squeezeRaster, estimateCompression, KGF } from '../src/compression.js';
import { discPress, fitSqueeze, plasticLimitMm } from '../src/calibration.js';
import { toleranceCases, scaledRun, toleranceRow, toleranceVerdict, defaultGapTolerance } from '../src/tolerance.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));

test('curved paths obey the centripetal limit v² / r ≤ a; sharp corners still follow junction deviation', () => {
  const a = 500;
  // A circle outline of radius 13 mm: 150 mm/s would need 1,730 mm/s² toward the centre.
  const circle = planDispensePath({ shape: 'circle', width: 30, pattern: 'perimeter', edgeInset: 2 });
  const fast = planPolylineMotion(circle.points, { speed: 150, acceleration: a, deviation: 0.05 });
  const limit = Math.sqrt(a * 13);
  assert.ok(fast.peak <= limit * 1.05, `peak ${fast.peak} within 5 % of √(a·r) = ${limit}`);
  assert.ok(fast.peak >= limit * 0.9, 'and close to it, not far below');
  assert.equal(fast.corners, 0, 'a circle has no corners');
  assert.ok(fast.curveSlowest > 0 && fast.curveSlowest <= limit * 1.001);
  // Below the limit nothing changes.
  const slow = planPolylineMotion(circle.points, { speed: 30, acceleration: a, deviation: 0.05 });
  assert.ok(Math.abs(slow.peak - 30) < 1e-9);
  assert.equal(slow.curveSlowest, null);
  // Round spiral: every vertex outside the innermost turn stays within the limit.
  const spiral = planDispensePath({ shape: 'circle', width: 30, pattern: 'spiral', spacing: 4, edgeInset: 2, spiralShape: 'round' });
  const m = planPolylineMotion(spiral.points, { speed: 300, acceleration: a, deviation: 0.05 });
  for (let i = 1; i < spiral.points.length - 1; i++) {
    const r = Math.hypot(spiral.points[i].x, spiral.points[i].y);
    if (r < 2) continue;
    const v = m.at(m.timeAt(spiral.cumulative[i])).v;
    assert.ok((v * v) / r <= a * 1.1, `vertex ${i}: v²/r = ${((v * v) / r).toFixed(0)} at r = ${r.toFixed(1)}`);
  }
  // A right angle between long segments: the circumradius is large, the corner rule decides as before.
  const corner = [{ x: 0, y: 0 }, { x: 30, y: 0 }, { x: 30, y: 30 }];
  const c = planPolylineMotion(corner, { speed: 100, acceleration: a, deviation: 0.05 });
  const s = Math.SQRT1_2;
  assert.ok(Math.abs(c.junctions[1] - Math.sqrt((a * 0.05 * s) / (1 - s))) < 1e-9);
  assert.equal(c.corners, 1);
  assert.equal(c.curveSlowest, null);
  // Circumradius of three points on a circle is its radius; collinear points have none.
  const seg = (p, q) => ({ length: Math.hypot(q.x - p.x, q.y - p.y), u: { x: (q.x - p.x) / Math.hypot(q.x - p.x, q.y - p.y), y: (q.y - p.y) / Math.hypot(q.x - p.x, q.y - p.y) } });
  const on = (t) => ({ x: 7 * Math.cos(t), y: 7 * Math.sin(t) });
  assert.ok(Math.abs(curveRadius(seg(on(0), on(0.2)), seg(on(0.2), on(0.5))) - 7) < 1e-9);
  assert.equal(curveRadius(seg({ x: 0, y: 0 }, { x: 1, y: 0 }), seg({ x: 1, y: 0 }, { x: 3, y: 0 })), Infinity);
});

test('a curved pattern lays more glue per mm on the arcs once the set speed is out of reach', () => {
  const base = { ...fromRegistry(registry, 'putty'), mode: 'pattern', shutoffDistance: 0, pathSettings: { shape: 'circle', width: 30, offsetX: 0, offsetY: 0, pattern: 'perimeter', spacing: 5, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' } };
  const at = (speed) => simulate({ ...base, speed });
  const a = at(150);
  const b = at(300);
  // Both are held near √(500·13) ≈ 81 mm/s on the circle, so doubling the set speed barely changes the dose.
  assert.ok(a.motion.curveSlowest !== null && a.motion.peak < 90);
  assert.ok(Math.abs(b.summary.deposited / a.summary.deposited - 1) < 0.02);
  assert.ok(a.warnings.some((w) => w.includes('向心加速度')));
  assert.ok(!at(30).warnings.some((w) => w.includes('向心加速度')));
});

test('temperature: Arrhenius shift of the consistency, flow ∝ K^(−1/n), reference 23 °C unchanged', () => {
  for (const material of ['putty', 'grease']) {
    const c = fromRegistry(registry, material);
    assert.equal(c.temperature, REFERENCE_TEMPERATURE);
    assert.ok(c.activationEnergy > 0);
    assert.equal(thermalShift(c), 1);
    const warm = { ...c, temperature: 33 };
    const aT = thermalShift(warm);
    const expected = Math.exp(((c.activationEnergy * 1000) / 8.314462618) * (1 / 306.15 - 1 / 296.15));
    assert.ok(Math.abs(aT / expected - 1) < 1e-12 && aT < 1, 'warmer paste is thinner');
    const { K, n } = pasteRheology(c);
    const hot = pasteRheology(warm);
    assert.ok(Math.abs(hot.K / K - aT) < 1e-12 && hot.n === n);
    // Time-pressure flow goes as K^(−1/n).
    assert.ok(Math.abs(steadyFlow(warm) / steadyFlow(c) - aT ** (-1 / n)) < 1e-9);
    // The deposit of a whole run follows.
    const run = (cfg) => runTiming({ ...cfg, mode: 'line' }).deposited;
    assert.ok(Math.abs(run(warm) / run(c) - aT ** (-1 / n)) < 1e-6);
    // A config without a temperature (saved before v3.0) behaves as at 23 °C.
    const old = { ...c };
    delete old.temperature;
    delete old.activationEnergy;
    assert.equal(steadyFlow(old), steadyFlow(c));
  }
  // P300 meters volume: the dose does not change, the needle pressure falls with the consistency.
  const p = fromRegistry(registry, 'grease', 'P300');
  const warm = { ...p, temperature: 40 };
  assert.equal(steadyFlow(warm), steadyFlow(p));
  assert.ok(Math.abs(needlePressure(warm, steadyFlow(p)) / needlePressure(p, steadyFlow(p)) - thermalShift(warm)) < 1e-9);
  // Activation energy 0 switches the effect off.
  assert.equal(thermalShift({ ...p, temperature: 60, activationEnergy: 0 }), 1);
});

test('a flow calibration at another paste temperature still fits the 23 °C reference values', () => {
  // Paste at 30 °C flows 1.5× the 23 °C model; the true 23 °C consistency is the default. Measuring exactly the
  // model's 30 °C flow must leave K unchanged.
  const c = { ...fromRegistry(registry, 'grease'), temperature: 30 };
  const grams = steadyFlow(c) * c.density * 60;
  const fit = calibrateFlow(c, grams, 60);
  assert.ok(Math.abs(fit.value / c.viscosity - 1) < 1e-9);
  const p = { ...fromRegistry(registry, 'putty'), temperature: 18 };
  const fitP = calibrateFlow(p, steadyFlow(p) * p.density * 60, 60);
  assert.ok(Math.abs(fitP.value / p.referenceRate - 1) < 1e-9);
});

test('the squeeze uses the paste at its temperature: a warmer film reaches the spacers sooner', () => {
  // A light force and no approach-speed cap, so the film (not the plate speed) sets the time; no yield stress.
  const heat = { shape: 'rectangle', width: 20, depth: 20, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, pressKgf: 0.5, pressSpeed: 100, yieldStress: 0 };
  const base = { ...fromRegistry(registry, 'putty'), mode: 'point', gateDuration: 0.6 };
  // Same glue in both: compare the squeeze alone.
  const cold = simulate(base);
  const warmRun = { ...cold, config: { ...cold.config, temperature: 40 } };
  const a = estimateCompression(cold, heat).summary.press;
  const b = estimateCompression(warmRun, heat).summary.press;
  const aT = thermalShift(warmRun.config);
  const n = a.flowIndex;
  assert.ok(Math.abs(b.viscosity / a.viscosity - aT) < 1e-9);
  // Press time ∝ K^(1/n) for the same force and glue (while the approach-speed cap is not what limits it).
  assert.ok(b.pressTime < a.pressTime);
  assert.ok(Math.abs(b.pressTime / a.pressTime / aT ** (1 / n) - 1) < 0.05, `time ratio ${b.pressTime / a.pressTime} vs ${aT ** (1 / n)}`);
});

test('nested air pockets: a pocket enclosed by another pocket holds a finite pressure and the press finishes', () => {
  // Two concentric rings of glue: the outer ring seals an air ring, which encloses the inner ring and its air.
  const cell = 0.5;
  const size = 40;
  const cols = size / cell;
  const volume = new Float64Array(cols * cols);
  for (let i = 0; i < volume.length; i++) {
    const r = Math.hypot(((i % cols) + 0.5) * cell - size / 2, (Math.floor(i / cols) + 0.5) * cell - size / 2);
    if ((r > 4 && r < 6) || (r > 10 && r < 12)) volume[i] = cell * cell * 1.5;
  }
  for (const tauY of [200, 0]) {
    const sq = squeezeRaster({ cols, rows: cols, cellSize: cell, volume }, { gap: 0.6, airMode: 'compressible', force: 10 * KGF, pressSpeed: 1, viscosity: 7000, flowIndex: 0.4, yieldStress: tauY, settleTime: 30, frames: 0 });
    assert.ok(Number.isFinite(sq.press.time) && sq.press.time > 0, `finite press time (τy ${tauY}): ${sq.press.time}`);
    assert.equal(sq.press.stalled, null, 'reaches the spacers');
    assert.ok(Math.abs(sq.gap - 0.6) < 1e-12);
    assert.ok(sq.press.sealed >= 2, 'both pockets were sealed');
    for (const b of sq.pockets) assert.ok(Number.isFinite(b.hold) && b.hold >= 0, `finite hold ${b.hold}`);
    const total = sq.volume.reduce((s, v) => s + v, 0);
    assert.ok(Math.abs(total / volume.reduce((s, v) => s + v, 0) - 1) < 1e-9, 'volume conserved');
  }
});

test('pressed-dot calibration: closed-form disc press, fit of the consistency and of the yield stress', () => {
  const K = 2500;
  const n = 0.4;
  const V = 50; // mm³
  const F = 10 * KGF;
  // Closed form without a yield stress: t = (h₂^(1−a) − h₁^(1−a)) / (C·(a−1)).
  const r = discPress({ K, n, volumeMm3: V, forceN: F, time: 60 });
  const Vm = V * 1e-9;
  const B = (K * ((2 * n + 1) / (4 * n)) ** n * 2 ** (2 * n + 1) * Math.PI * (Vm / Math.PI) ** ((n + 3) / 2)) / (n + 3);
  const a = (5 * (n + 1)) / (2 * n);
  const C = (F / B) ** (1 / n);
  const h1 = Math.cbrt(V) / 1000;
  const h2 = r.thicknessMm / 1000;
  assert.ok(Math.abs((h2 ** (1 - a) - h1 ** (1 - a)) / (C * (a - 1)) / 60 - 1) < 1e-3);
  // Newtonian: Stefan's h(t) for a constant-volume disc, 1/h⁴ grows linearly in time.
  const s = discPress({ K: 500, n: 1, volumeMm3: 200, forceN: 20, time: 5, startMm: 3 });
  const stefan = (1 / 0.003 ** 4 + (4 * 20 * 5 * 2 * Math.PI) / (3 * 500 * (200e-9) ** 2)) ** -0.25 * 1000;
  assert.ok(Math.abs(s.thicknessMm / stefan - 1) < 2e-3, `${s.thicknessMm} vs Stefan ${stefan}`);
  // Round trip: the measured diameter gives back the consistency.
  const density = 3.4;
  const diameterMm = Math.sqrt((4 * V) / (Math.PI * r.thicknessMm));
  const fit = fitSqueeze({ grams: (V / 1000) * density, density, kgf: 10, seconds: 60, diameterMm, n });
  assert.equal(fit.key, 'viscosity');
  assert.ok(Math.abs(fit.value / K - 1) < 1e-6);
  assert.ok(Math.abs(fit.thicknessMm - r.thicknessMm) < 1e-9);
  // With a yield stress the same reading means a thinner paste (part of the force only holds the disc).
  const withYield = fitSqueeze({ grams: (V / 1000) * density, density, kgf: 10, seconds: 60, diameterMm, n, tauY: 300 });
  assert.ok(withYield.value < K);
  assert.ok(Math.abs(discPress({ K: withYield.value, n, tauY: 300, volumeMm3: V, forceN: F, time: 60 }).thicknessMm / r.thicknessMm - 1) < 1e-4);
  // Plastic limit and the yield fit: h = ((2π/3)·τy·(V/π)^1.5 / F)^(2/5).
  const limit = plasticLimitMm(500, V, F);
  assert.ok(Math.abs(limit / 1000 - ((((2 * Math.PI) / 3) * 500 * (Vm / Math.PI) ** 1.5) / F) ** 0.4) < 1e-12);
  const long = discPress({ K, n, tauY: 500, volumeMm3: V, forceN: F, time: 1e9 });
  assert.ok(long.thicknessMm >= limit * (1 - 1e-9) && long.thicknessMm < limit * 1.02, 'a long press ends at the plastic limit');
  const y = fitSqueeze({ mode: 'yield', grams: (V / 1000) * density, density, kgf: 10, seconds: 600, diameterMm: Math.sqrt((4 * V) / (Math.PI * limit)), n, K: 20 });
  assert.equal(y.key, 'yieldStress');
  assert.ok(Math.abs(y.value / 500 - 1) < 1e-9);
  assert.equal(y.yieldLimited, true, 'a thin paste would have gone much further in that time');
  // A reading thicker than the current yield stress allows cannot be fitted with a consistency.
  assert.throws(() => fitSqueeze({ grams: (V / 1000) * density, density, kgf: 10, seconds: 60, diameterMm: Math.sqrt((4 * V) / (Math.PI * limit * 0.8)), n, tauY: 500 }), /降伏應力/);
  assert.throws(() => fitSqueeze({ grams: 0, density, kgf: 10, seconds: 60, diameterMm: 10, n }), /大於 0/);
});

test('the squeeze simulation agrees with the pressed-dot closed form it is calibrated against', () => {
  // A disc on the grid pressed for a set time: the simulated thickness matches discPress within the grid error.
  const cell = 0.5;
  const size = 60;
  const cols = size / cell;
  const volume = new Float64Array(cols * cols);
  const h0 = 2;
  for (let i = 0; i < volume.length; i++) {
    const x = ((i % cols) + 0.5) * cell - size / 2;
    const y = (Math.floor(i / cols) + 0.5) * cell - size / 2;
    let f = 0;
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (Math.hypot(x + ((a - 1.5) * cell) / 4, y + ((b - 1.5) * cell) / 4) < 6) f += 1 / 16;
    volume[i] = f * cell * cell * h0;
  }
  const V = volume.reduce((s, v) => s + v, 0);
  const K = 3000;
  const n = 0.5;
  const sq = squeezeRaster({ cols, rows: cols, cellSize: cell, volume }, { gap: 0.1, airMode: 'vent', force: 50, pressSpeed: 100, viscosity: K, flowIndex: n, yieldStress: 0, settleTime: 0, holdTime: 20, frames: 0 });
  assert.equal(sq.press.stalled, 'time');
  const closed = discPress({ K, n, volumeMm3: V, forceN: 50, time: sq.press.time, startMm: h0 });
  assert.ok(Math.abs(sq.gap / closed.thicknessMm - 1) < 0.04, `simulated ${sq.gap} vs closed form ${closed.thicknessMm}`);
});

test('tolerance check: lean and rich cases pair the dose and gap tolerances; deposits scale exactly', () => {
  assert.equal(defaultGapTolerance(0.5), 0.05);
  assert.equal(defaultGapTolerance(0.05), 0.01);
  const cases = toleranceCases(0.5, { dose: 0.1, gap: 0.1 });
  assert.deepEqual(cases.map((c) => c.id), ['nominal', 'lean', 'rich']);
  assert.deepEqual(cases.map((c) => [c.dose, +c.gap.toFixed(6)]), [[1, 0.5], [0.9, 0.6], [1.1, 0.4]]);
  assert.equal(toleranceCases(0.05, { dose: 0.1, gap: 0.1 })[2].gap, 0.02, 'the gap never goes below the estimate limit');
  const run = simulate({ ...fromRegistry(registry, 'putty'), mode: 'pattern', pathSettings: { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, pattern: 'star', spacing: 5, edgeInset: 3, spiralShape: 'auto', spiralDirection: 'outside-in' } });
  const lean = scaledRun(run, 0.9);
  const sum = (a) => a.reduce((s, v) => s + v, 0);
  assert.ok(Math.abs(sum(lean.summary.deposits) / sum(run.summary.deposits) - 0.9) < 1e-12);
  assert.equal(lean.pathLength, run.pathLength);
  const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1 };
  const goals = { coverage: 95, overflow: 3 };
  const rows = cases.map((c) => toleranceRow(c, estimateCompression(scaledRun(run, c.dose), { ...heat, gap: c.gap }), goals));
  const [nominal, leanRow, richRow] = rows;
  assert.ok(Math.abs(leanRow.depositedMl / nominal.depositedMl - 0.9) < 1e-9);
  // Less glue in a wider gap covers less and conducts worse; more glue in a narrower gap squeezes out further.
  assert.ok(leanRow.coveredPercent <= nominal.coveredPercent + 1e-9);
  assert.ok(leanRow.resistance > nominal.resistance);
  assert.ok(richRow.squeezeOutMm >= nominal.squeezeOutMm - 1e-9);
  assert.ok(Math.abs(leanRow.bondLineMm - 0.6) < 1e-9 && Math.abs(richRow.bondLineMm - 0.4) < 1e-9);
  const verdict = toleranceVerdict(rows);
  assert.equal(verdict.coverage, Math.min(...rows.map((r) => r.coveredPercent)));
  assert.equal(verdict.overflow, Math.max(...rows.map((r) => r.squeezeOutMm)));
  assert.equal(verdict.pass, rows.every((r) => r.pass));
  for (const r of rows) assert.equal(r.pass, r.coveredPercent >= goals.coverage && r.squeezeOutMm <= goals.overflow);
});
