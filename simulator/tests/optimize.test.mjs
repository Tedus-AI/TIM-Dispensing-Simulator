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

test('dose can be set through drive pressure (R75) or pump speed (P300) as well as travel speed', async () => {
  const { tuneForVolume } = await import('../src/tuning.js');
  const { simulate } = await import('../src/engine.js');
  const line = { ...fromRegistry(registry, 'grease'), mode: 'line', lineLength: 60, shutoffDistance: 0 };
  const byPressure = tuneForVolume(line, 0.03, { key: 'pressure', lo: 10, hi: 100 });
  assert.ok(byPressure.reached && byPressure.key === 'pressure' && byPressure.config.speed === line.speed);
  assert.ok(Math.abs(byPressure.run.summary.deposited - 0.03) < 0.03 * 0.03);
  assert.ok(simulate({ ...line, pressure: byPressure.config.pressure * 1.2 }).summary.deposited > byPressure.run.summary.deposited);
  const pcp = { ...fromRegistry(registry, 'grease', 'P300'), mode: 'line', lineLength: 60, shutoffDistance: 0 };
  const byRpm = tuneForVolume(pcp, 0.2, { key: 'rpm', lo: 10, hi: 150 });
  assert.ok(byRpm.reached && Math.abs(byRpm.run.summary.deposited - 0.2) < 0.2 * 0.03);
  assert.equal(tuneForVolume(line, 5, { key: 'pressure', lo: 10, hi: 100 }).reached, false, 'beyond the drive range');
});

test('bead match: matched bore from the bead cross-section, speed ratio against the nozzle exit speed', async () => {
  const { simulate } = await import('../src/engine.js');
  const { beadMatch, nearestNeedle, MATCH_BAND } = await import('../src/optimize.js');
  const run = simulate({ ...fromRegistry(registry, 'grease'), mode: 'line', lineLength: 60, shutoffDistance: 0 });
  const b = beadMatch(run);
  const area = (run.summary.deposited * 1000) / run.pathLength;
  assert.ok(Math.abs(b.beadArea - area) < 1e-12 && Math.abs(b.matchedId - Math.sqrt((4 * area) / Math.PI)) < 1e-12);
  const exit = (run.Q * 1000) / ((Math.PI * run.config.diameter ** 2) / 4);
  assert.ok(Math.abs(b.speedRatio - run.config.speed / exit) < 1e-12);
  assert.equal(b.state, b.speedRatio > MATCH_BAND[1] ? 'stretched' : b.speedRatio < MATCH_BAND[0] ? 'piled' : 'ok');
  assert.equal(nearestNeedle(2.2).id, 2.0);
  assert.equal(nearestNeedle(0.55).label, '21G');
});

test('robust search: the nominal dose keeps the tolerance inside the window and the band is verified', () => {
  const heat = { shape: 'rectangle', width: 16, depth: 16, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 10, pathSettings: { ...heat, pattern: 'n', spacing: 5, edgeInset: 2 } };
  const goal = { coverage: 80, overflow: 6 };
  const progress = [];
  const r = optimizeSettings(config, heat, { goals: goal, tolerance: 0.1, searchCell: 1, keep: 2, verify: 1, bisections: 3, onProgress: (p) => progress.push(p) });
  assert.ok(r.evaluations > 4 && progress.length === r.evaluations && progress.at(-1) <= 1);
  assert.equal(r.knob.key, 'pressure');
  assert.equal(r.candidates.length, r.space.insets.length);
  const best = r.candidates[0];
  assert.ok(best.pass, JSON.stringify({ ...best, bead: undefined }));
  assert.ok(best.verified && best.worst.coveredPercent >= goal.coverage && best.worst.squeezeOutMm <= goal.overflow);
  assert.ok(best.fCov !== null && best.factor * 0.9 >= best.fCov - 1e-9 && best.factor * 1.1 <= best.fOvf + 1e-9);
  if (best.reached && !best.fallback) assert.equal(best.settings.speed, 10, 'pressure sets the dose, travel speed stays');
  for (const c of r.candidates.filter((x) => x.pass)) assert.ok(c.depositedMl >= best.depositedMl * 0.99 - 1e-12);
});

test('dose knob: drive first, motion only at the drive limit, or motion directly', async () => {
  const { tuneDose } = await import('../src/tuning.js');
  const line = { ...fromRegistry(registry, 'grease'), mode: 'line', lineLength: 60, shutoffDistance: 0, speed: 10 };
  // About 0.04 mL at 10 psi and 0.41 mL at 100 psi along this line at 10 mm/s.
  const inRange = tuneDose(line, 0.2, 'drive');
  assert.ok(inRange.reached && !inRange.fallback && inRange.key === 'pressure' && inRange.config.speed === 10);
  // Too much material for 100 psi at 10 mm/s: pressure goes to its limit and the travel speed drops.
  const pushed = tuneDose(line, 0.6, 'drive');
  assert.ok(pushed.fallback && pushed.key === 'speed' && pushed.config.pressure === 100 && pushed.config.speed < 10);
  assert.ok(pushed.reached && Math.abs(pushed.run.summary.deposited - 0.6) <= 0.6 * 0.03);
  // Too little for 10 psi: pressure goes to its lower limit and the travel speed rises.
  const thin = tuneDose(line, 0.02, 'drive');
  assert.ok(thin.fallback && thin.config.pressure === 10 && thin.config.speed > 10 && thin.reached);
  const motion = tuneDose(line, 0.2, 'motion');
  assert.ok(motion.reached && motion.key === 'speed' && motion.config.pressure === line.pressure);
  const dot = { ...line, mode: 'point', gateDuration: 1 };
  const gate = tuneDose(dot, 0.05, 'motion');
  assert.ok(gate.reached && gate.key === 'gateDuration' && Math.abs(gate.run.summary.deposited - 0.05) <= 0.05 * 0.03);
});

test('a single dot or a line is optimised by dose alone', () => {
  const heat = { shape: 'rectangle', width: 12, depth: 12, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const dot = { ...fromRegistry(registry, 'grease'), mode: 'point', gateDuration: 1, offsetX: 0, offsetY: 0 };
  const sp = searchSpace(dot, heat);
  assert.equal(sp.geometry, false);
  assert.deepEqual([sp.spacings, sp.insets], [[null], [null]]);
  const goal = { coverage: 80, overflow: 8 };
  const r = optimizeSettings(dot, heat, { goals: goal, knob: 'motion', tolerance: 0.1, searchCell: 1, verify: 1, bisections: 3 });
  assert.equal(r.candidates.length, 1);
  assert.equal(r.knob.key, 'gateDuration');
  assert.equal(r.nozzle, 'fixed');
  const best = r.candidates[0];
  assert.ok(best.verified && best.settings.gateDuration > 0);
  assert.ok(best.pass === (best.worst.coveredPercent >= goal.coverage && best.worst.squeezeOutMm <= goal.overflow && best.reached && best.cycleOk));
  // The drive knob on a dot works through pressure first.
  const byDrive = optimizeSettings(dot, heat, { goals: goal, searchCell: 1, verify: 0, bisections: 1 });
  assert.equal(byDrive.knob.key, 'pressure');
  assert.equal(byDrive.motion.key, 'gateDuration');
});

test('nozzle matching picks standard needles sized to the bead of each pitch', async () => {
  const { searchSpace, NEEDLES } = await import('../src/optimize.js');
  const heat = { shape: 'rectangle', width: 16, depth: 16, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  // Volumetric PCP: flow does not depend on the needle, so the search stays fast.
  const config = { ...fromRegistry(registry, 'grease', 'P300'), mode: 'pattern', speed: 20, pathSettings: { ...heat, pattern: 'serpentine', spacing: 4, edgeInset: 2 } };
  const r = optimizeSettings(config, heat, { goals: { coverage: 80, overflow: 6 }, nozzle: 'match', searchCell: 1, keep: 1, verify: 0, bisections: 1 });
  assert.equal(r.knob.key, 'rpm');
  const ids = new Set(NEEDLES.map((n) => n.id));
  assert.ok(r.candidates.every((c) => ids.has(c.diameter)));
  // Wider pitch carries more material per bead (shorter path), so at one inset its needle is not smaller.
  const bySpacing = new Map(r.candidates.filter((c) => c.edgeInset === 2).map((c) => [c.spacing, c.diameter]));
  const sp = searchSpace(config, heat).spacings;
  for (let k = 1; k < sp.length; k++) if (bySpacing.has(sp[k]) && bySpacing.has(sp[k - 1])) assert.ok(bySpacing.get(sp[k]) >= bySpacing.get(sp[k - 1]));
});
