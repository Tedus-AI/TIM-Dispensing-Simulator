import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { motionProfile, planPolylineMotion, junctionSpeed } from '../src/motion.js';
import { fromRegistry, simulate, steadyFlow } from '../src/engine.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);
const square = [
  { x: 0, y: 0 },
  { x: 20, y: 0 },
  { x: 20, y: 20 },
  { x: 0, y: 20 },
];

test('junction rule: straight is unlimited, reversal stops, 90° follows closed form', () => {
  const a = 500;
  const d = 0.05;
  near(junctionSpeed({ x: 1, y: 0 }, { x: 1, y: 0 }, a, d, 100), 100);
  near(junctionSpeed({ x: 1, y: 0 }, { x: -1, y: 0 }, a, d, 100), 0);
  const s = Math.SQRT1_2;
  near(junctionSpeed({ x: 1, y: 0 }, { x: 0, y: 1 }, a, d, 100), Math.sqrt((a * d * s) / (1 - s)), 1e-9);
});

test('polyline planner reaches the full length, respects corner and acceleration limits', () => {
  const m = planPolylineMotion(square, { speed: 100, acceleration: 500, deviation: 0.05 });
  near(m.length, 60);
  near(m.at(m.duration).x, 60);
  near(m.at(0).v, 0);
  assert.equal(m.corners, 2);
  const vCorner = Math.sqrt((500 * 0.05 * Math.SQRT1_2) / (1 - Math.SQRT1_2));
  near(m.slowestCorner, vCorner, 1e-9);
  // At the moment the tool passes each corner the path speed equals the junction speed.
  for (const corner of [20, 40]) near(m.at(m.timeAt(corner)).v, vCorner, 1e-6);
  // Speed is continuous and the acceleration bound holds everywhere.
  let prev = m.at(0);
  const dt = 1e-4;
  for (let t = dt; t <= m.duration; t += dt) {
    const p = m.at(t);
    assert.ok(Math.abs(p.v - prev.v) <= 500 * dt * 1.0001 + 1e-9, `accel violated at ${t}`);
    assert.ok(p.x >= prev.x - 1e-12, 'monotone arc length');
    assert.ok(p.v <= 100 + 1e-9);
    prev = p;
  }
});

test('timeAt is the exact inverse of at() along every phase', () => {
  const m = planPolylineMotion(square, { speed: 80, acceleration: 400, deviation: 0.02 });
  for (let x = 0; x <= 60; x += 0.37) near(m.at(m.timeAt(x)).x, x, 1e-7);
  const single = motionProfile(37, 80, 400);
  for (let x = 0; x <= 37; x += 0.5) near(single.at(single.timeAt(x)).x, x, 1e-9);
});

test('corner slowdown takes longer and puts more glue at corners than v0.7 no-slowdown', () => {
  const base = {
    ...fromRegistry(registry),
    mode: 'pattern',
    shutoffDistance: 0,
    pathSettings: { shape: 'rectangle', pattern: 'n', width: 30, depth: 30, edgeInset: 2, spacing: 5, offsetX: 0, offsetY: 0 },
  };
  const slow = simulate({ ...base, cornerMode: 'junction', junctionDeviation: 0.02 });
  const flat = simulate({ ...base, cornerMode: 'off' });
  assert.ok(slow.motion.duration > flat.motion.duration + 0.05);
  assert.equal(slow.motion.kind, 'polyline');
  assert.equal(flat.motion.kind, 'single');
  assert.ok(slow.summary.output > flat.summary.output, 'longer gate time dispenses more');
  // Deposition density near the first corner (arc length 26 mm) exceeds mid-segment density.
  const bin = (run, s) => run.summary.deposits[Math.floor((s - run.gridStart) / run.cellLength)];
  assert.ok(bin(slow, 26) > 1.3 * bin(slow, 13 + 26 * Math.SQRT2 / 2));
  near(slow.summary.deposited + slow.summary.offSurface, slow.summary.output, 1e-9);
  for (const f of slow.frames) near(f.balance, 0, 1e-9);
});

test('putty power-law scaling is self-consistent and reduces to Poiseuille at m=1', () => {
  const c = fromRegistry(registry);
  const q = steadyFlow(c);
  const m = 0.5;
  const pl = { ...c, pressureExponent: m };
  near(steadyFlow(pl), q, 1e-12);
  near(steadyFlow({ ...pl, pressure: 45 }), q * 0.5 ** m, 1e-12);
  near(steadyFlow({ ...pl, diameter: c.diameter / 2 }), q * 0.5 ** (3 + m), 1e-12);
  near(steadyFlow({ ...pl, nozzleLength: 20 }), q * 0.5 ** m, 1e-12);
  // Doubling both pressure and length leaves the wall-shear driven flow unchanged.
  near(steadyFlow({ ...pl, pressure: 90, nozzleLength: 20, referencePressure: 45 }), q, 1e-12);
});

test('volume tuning finds the speed (or gate time) that meets a reachable target', async () => {
  const { tuneForVolume } = await import('../src/tuning.js');
  const line = { ...fromRegistry(registry), mode: 'line', lineLength: 60, shutoffDistance: 0 };
  const t = tuneForVolume(line, 0.4); // 0.2 mL is below the acceleration-limited floor (~0.23 mL) for 60 mm
  assert.ok(t.reached);
  assert.equal(t.key, 'speed');
  near(t.run.summary.deposited, 0.4, 0.4 * 0.03);
  const dot = tuneForVolume({ ...fromRegistry(registry), mode: 'point' }, 0.05);
  assert.equal(dot.key, 'gateDuration');
  near(dot.run.summary.deposited, 0.05, 0.05 * 0.03);
  // An unreachably small target reports that the limit was hit instead of pretending success.
  assert.equal(tuneForVolume(line, 1e-6).reached, false);
});
