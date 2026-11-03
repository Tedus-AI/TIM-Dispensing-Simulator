import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromRegistry } from '../src/engine.js';
import { PRESS_DEFAULTS } from '../src/compression.js';
import { judge, rank, optimizeSettings, searchSpace } from '../src/optimize.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));
const goals = { coverage: 90, overflow: 3 };
const row = (depositedMl, coveredPercent, squeezeOutMm) => ({ depositedMl, coveredPercent, squeezeOutMm });

test('ranking: passing rows by least material, then failing rows by how far they miss', () => {
  assert.equal(judge(row(0.5, 92, 2), goals).pass, true);
  assert.equal(judge(row(0.5, 89, 2), goals).pass, false);
  assert.equal(judge(row(0.5, 95, 3.5), goals).pass, false);
  const ordered = rank([row(0.6, 99, 1), row(0.4, 91, 2.9), row(0.3, 80, 1), row(0.35, 95, 3.2)], goals);
  assert.deepEqual(
    ordered.map((r) => r.depositedMl),
    [0.4, 0.6, 0.35, 0.3],
  );
  // 5 % coverage short weighs like 1 mm overflow excess.
  assert.ok(Math.abs(judge(row(0, 85, 4), goals).deficit - 2) < 1e-12);
});

test('search space: pitch only for serpentine/spiral, insets stay inside the source', () => {
  const heat = { shape: 'rectangle', width: 30, depth: 20, gap: 0.5, cellSize: 0.5 };
  const base = { mode: 'pattern', pathSettings: { pattern: 'n', spacing: 5, edgeInset: 2 } };
  const n = searchSpace(base, heat);
  assert.deepEqual(n.spacings, [5]);
  assert.equal(n.pitched, false);
  const s = searchSpace({ ...base, pathSettings: { ...base.pathSettings, pattern: 'serpentine' } }, heat);
  assert.ok(s.pitched && s.spacings.length >= 3 && s.spacings.every((v) => v >= 1.5 && v <= 20 / 2.5));
  assert.ok(s.insets.includes(2) && s.insets.every((v) => v >= 0 && v < 20 / 2 - 1));
});

test('optimizer finds the least dose that meets the goals and ranks it first', () => {
  const heat = { shape: 'rectangle', width: 16, depth: 16, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', pathSettings: { ...heat, pattern: 'n', spacing: 5, edgeInset: 2 } };
  const goal = { coverage: 85, overflow: 6 };
  const progress = [];
  const r = optimizeSettings(config, heat, { goals: goal, dose: [0.8, 2.5], searchCell: 1, verify: 1, onProgress: (p) => progress.push(p) });
  assert.ok(r.evaluations > 4 && progress.length === r.evaluations && progress.at(-1) <= 1);
  assert.ok(r.candidates.length === r.space.insets.length);
  const best = r.candidates[0];
  assert.ok(best.pass, JSON.stringify(best));
  assert.ok(best.coveredPercent >= goal.coverage && best.squeezeOutMm <= goal.overflow);
  assert.ok(best.factor < 2.5, 'bisection lowered the dose below the upper bound');
  for (const c of r.candidates.filter((x) => x.pass)) assert.ok(c.depositedMl >= best.depositedMl - 1e-12);
  assert.throws(() => optimizeSettings({ ...config, mode: 'line' }, heat), /依熱源/);
});
