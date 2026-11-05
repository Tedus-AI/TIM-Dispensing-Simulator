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

test('robust search: the nominal dose keeps the tolerance inside the window and the band is verified', async () => {
  const heat = { shape: 'rectangle', width: 16, depth: 16, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 10, pathSettings: { ...heat, pattern: 'n', spacing: 5, edgeInset: 2 } };
  const goal = { coverage: 80, overflow: 6 };
  const progress = [];
  const r = await optimizeSettings(config, heat, { goals: goal, tolerance: 0.1, searchCell: 1, keep: 2, verify: 1, bisections: 3, onProgress: (p) => progress.push(p) });
  assert.ok(r.evaluations > 4 && progress.length === r.evaluations + 1 && progress.at(-1) === 1 && r.complete);
  assert.ok(progress.slice(0, -1).every((p, i, a) => p < 1 && (i === 0 || p >= a[i - 1])), 'progress rises and only reaches 1 at the end');
  assert.equal(r.knob.key, 'pressure');
  assert.equal(r.candidates.length, r.space.insets.length);
  const best = r.candidates[0];
  assert.ok(best.pass, JSON.stringify({ ...best, bead: undefined }));
  assert.ok(best.verified && best.worst.coveredPercent >= goal.coverage && best.worst.squeezeOutMm <= goal.overflow);
  assert.ok(best.fCov !== null && best.factor * 0.9 >= best.fCov - 1e-9 && best.factor * 1.1 <= best.fOvf + 1e-9);
  if (best.reached && !best.fallback) assert.equal(best.settings.speed, 10, 'pressure sets the dose, travel speed stays');
  for (const c of r.candidates.filter((x) => x.pass)) assert.ok(c.verified && c.depositedMl >= best.depositedMl * 0.99 - 1e-12);
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

test('a single dot or a line is optimised by dose alone', async () => {
  const heat = { shape: 'rectangle', width: 12, depth: 12, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const dot = { ...fromRegistry(registry, 'grease'), mode: 'point', gateDuration: 1, offsetX: 0, offsetY: 0 };
  const sp = searchSpace(dot, heat);
  assert.equal(sp.geometry, false);
  assert.deepEqual([sp.spacings, sp.insets], [[null], [null]]);
  const goal = { coverage: 80, overflow: 8 };
  const r = await optimizeSettings(dot, heat, { goals: goal, knob: 'motion', tolerance: 0.1, searchCell: 1, verify: 1, bisections: 3 });
  assert.equal(r.candidates.length, 1);
  assert.equal(r.knob.key, 'gateDuration');
  assert.equal(r.nozzle, 'fixed');
  const best = r.candidates[0];
  assert.ok(best.verified && best.settings.gateDuration > 0);
  assert.ok(best.pass === (best.worst.coveredPercent >= goal.coverage && best.worst.squeezeOutMm <= goal.overflow && best.reached && best.cycleOk));
  assert.ok(!byDriveUnverified(r), 'nothing passes without the final-grid check');
  // The drive knob on a dot works through pressure first.
  const byDrive = await optimizeSettings(dot, heat, { goals: goal, searchCell: 1, verify: 0, bisections: 1 });
  assert.equal(byDrive.knob.key, 'pressure');
  assert.equal(byDrive.motion.key, 'gateDuration');
  assert.ok(byDrive.candidates.every((c) => !c.pass), 'verify: 0 leaves every result unchecked, so none passes');
});
const byDriveUnverified = (r) => r.candidates.some((c) => c.pass && !c.verified);

test('nozzle matching picks standard needles sized to the bead of each pitch', async () => {
  const { searchSpace, NEEDLES } = await import('../src/optimize.js');
  const heat = { shape: 'rectangle', width: 16, depth: 16, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  // Volumetric PCP: flow does not depend on the needle, so the search stays fast.
  const config = { ...fromRegistry(registry, 'grease', 'P300'), mode: 'pattern', speed: 20, pathSettings: { ...heat, pattern: 'serpentine', spacing: 4, edgeInset: 2 } };
  const r = await optimizeSettings(config, heat, { goals: { coverage: 80, overflow: 6 }, nozzle: 'match', searchCell: 1, keep: 1, verify: 0, bisections: 1 });
  assert.equal(r.knob.key, 'rpm');
  const ids = new Set(NEEDLES.map((n) => n.id));
  assert.ok(r.candidates.every((c) => ids.has(c.diameter)));
  // Wider pitch carries more material per bead (shorter path), so at one inset its needle is not smaller.
  const bySpacing = new Map(r.candidates.filter((c) => c.edgeInset === 2).map((c) => [c.spacing, c.diameter]));
  const sp = searchSpace(config, heat).spacings;
  for (let k = 1; k < sp.length; k++) if (bySpacing.has(sp[k]) && bySpacing.has(sp[k - 1])) assert.ok(bySpacing.get(sp[k]) >= bySpacing.get(sp[k - 1]));
});

test('search levels: more candidates, windows, band points and finer grids; time estimate follows', async () => {
  const { SEARCH_LEVELS, planSearch, estimateSeconds, squeezeMs } = await import('../src/optimize.js');
  const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 0.5, power: 10, ...PRESS_DEFAULTS };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', pathSettings: { ...heat, pattern: 'serpentine', spacing: 5, edgeInset: 2 } };
  const plans = SEARCH_LEVELS.map((l) => planSearch(config, heat, { level: l.level }));
  for (let k = 1; k < plans.length; k++) {
    const [a, b] = [plans[k - 1], plans[k]];
    assert.ok(b.geometries >= a.geometries && b.keep > a.keep && b.coarse > a.coarse && b.fine >= a.fine, JSON.stringify([a, b]));
    assert.ok(b.searchCell < a.searchCell && b.verifyCell < a.verifyCell);
  }
  assert.ok(plans.every((p) => p.screenDoses === 2), 'every level screens at two doses in the decision zone');
  assert.equal(plans[3].band, 5);
  // Grid time grows as cells^q (q fitted between the calibration grids, at least 1.8 finer than 0.5 mm)
  // until the 90,000-cell cap.
  const cal = { tune: 200, cells: [{ cell: 1, ms: 300, n: 7000, gridCell: 1 }, { cell: 0.5, ms: 2400, n: 28000, gridCell: 0.5 }] };
  assert.ok(Math.abs(squeezeMs(cal, 0.5) - 2400) < 1, 'q = ln 8 / ln 4 = 1.5 reproduces the second point');
  assert.ok(squeezeMs(cal, 0.3) > squeezeMs(cal, 0.4) && squeezeMs(cal, 0.1) === squeezeMs(cal, 0.05), 'capped grid');
  const times = plans.map((p) => estimateSeconds(p, cal, 1));
  for (let k = 1; k < times.length; k++) assert.ok(times[k] > times[k - 1]);
  assert.ok(estimateSeconds(plans[2], cal, 4) < times[2] / 2, 'parallel workers shorten the search');
  // A real calibration on this machine: positive times, more cells on the finer grid.
  const { calibrateTask } = await import('../src/optimize.js');
  const real = calibrateTask({ config, heat, target: 0.45 * 1.4, knob: 'drive' });
  assert.ok(real.tune > 0 && real.cells[1].n > real.cells[0].n && real.cells.every((c) => c.ms > 0));
});

test('parallel evaluation finishing in any order gives the same result; partial results and stopping', async () => {
  const { evaluateTask } = await import('../src/optimize.js');
  const heat = { shape: 'rectangle', width: 14, depth: 14, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 10, pathSettings: { ...heat, pattern: 'serpentine', spacing: 3, edgeInset: 2 } };
  const opts = { goals: { coverage: 80, overflow: 6 }, searchCell: 1, candidates: 3, keep: 2, verify: 1, bisections: 2 };
  const sequential = await optimizeSettings(config, heat, opts);
  let seed = 7;
  const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const scrambled = async (task) => {
    await new Promise((r) => setTimeout(r, random() * 4));
    try {
      return evaluateTask(task);
    } catch {
      return null;
    }
  };
  const partials = [];
  const parallel = await optimizeSettings(config, heat, { ...opts, evaluate: scrambled, onPartial: (p) => partials.push(p) });
  const key = (r) => r.candidates.map((c) => [c.spacing, c.edgeInset, c.factor.toFixed(6), c.pass, c.verified ?? false].join('/')).join(' ');
  assert.equal(key(parallel), key(sequential));
  assert.equal(parallel.evaluations, sequential.evaluations);
  assert.ok(partials.length >= 2 && !partials[0].complete && partials[0].candidates.every((c) => c.screenedOnly) && parallel.complete);
  // Stopping: pending evaluations reject; the search rejects and the last partial result remains.
  let n = 0;
  const stopping = async (task) => {
    if (++n > 6) throw new Error('已取消');
    return evaluateTask(task);
  };
  const seen = [];
  await assert.rejects(optimizeSettings(config, heat, { ...opts, evaluate: stopping, onPartial: (p) => seen.push(p) }), /已取消/);
  await new Promise((r) => setImmediate(r));
  assert.ok(seen.length >= 1 && seen.at(-1).candidates.length > 0 && !seen.at(-1).complete);
});

test('dose tuning: secant search reaches 0.1 % in a few simulations, range ends are exact', async () => {
  const { tuneForVolume } = await import('../src/tuning.js');
  const { simulate } = await import('../src/engine.js');
  const line = { ...fromRegistry(registry, 'grease'), mode: 'line', lineLength: 60, shutoffDistance: 0, speed: 10 };
  for (const target of [0.06, 0.2, 0.35]) {
    const t = tuneForVolume(line, target, { key: 'pressure', lo: 10, hi: 100 });
    assert.ok(t.reached && t.simulations <= 10 && Math.abs(t.run.summary.deposited / target - 1) < 2e-3, `${target}: ${t.simulations}`);
  }
  // The deposit at exactly 100 psi is reachable (no rounding past the limit).
  const top = simulate({ ...line, pressure: 100 }).summary.deposited;
  const atTop = tuneForVolume(line, top, { key: 'pressure', lo: 10, hi: 100 });
  assert.ok(atTop.reached && atTop.config.pressure <= 100);
  // Travel speed that no longer lowers the deposit (acceleration-limited): out of range, and the least
  // extreme speed with that deposit is returned rather than the 800 mm/s end of the range.
  const pcp = { ...fromRegistry(registry, 'grease', 'P300'), mode: 'pattern', pathSettings: { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, pattern: 'serpentine', spacing: 5, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' } };
  const floor = simulate({ ...pcp, speed: 800 }).summary.deposited;
  const t = tuneForVolume(pcp, floor * 0.3);
  assert.ok(!t.reached && t.config.speed < 300 && Math.abs(t.run.summary.deposited / floor - 1) < 3e-3, `${t.config.speed}`);
});

test('search variables: path types, spiral start and travel speed, each fixed or searched', async () => {
  const { SEARCH_PATTERNS, speedCount, planSearch } = await import('../src/optimize.js');
  const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 0.5, power: 10, ...PRESS_DEFAULTS };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 20, pathSettings: { ...heat, pattern: 'serpentine', spacing: 5, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' } };
  // Defaults: as before v1.6, only pitch and inset of the current pattern.
  const plain = searchSpace(config, heat, 5);
  assert.deepEqual(plain.types, ['serpentine']);
  assert.ok(plain.geometries.every((g) => g.type === 'serpentine' && g.speed === 20 && g.spiralDirection === 'outside-in'));
  assert.equal(plain.geometries.length, plain.spacings.length * plain.insets.length);
  // All four path types, spiral start and speed searched.
  const vars = { pattern: { search: true, options: SEARCH_PATTERNS }, spiralDirection: { search: true }, speed: { search: true, min: 10, max: 40 } };
  const s = searchSpace(config, heat, 5, vars, 'drive');
  const count = (t) => s.geometries.filter((g) => g.type === t).length;
  const speeds = new Set(s.geometries.filter((g) => g.mode !== 'point').map((g) => g.speed));
  assert.equal(speeds.size, speedCount(5));
  assert.ok([...speeds].every((v) => v >= 10 && v <= 40) && speeds.has(10) && speeds.has(40), [...speeds].join());
  assert.equal(count('point'), 1);
  assert.equal(count('line'), s.insets.length * speeds.size);
  assert.equal(count('serpentine'), s.spacings.length * s.insets.length * speeds.size);
  assert.equal(count('spiral'), 2 * count('serpentine'));
  assert.ok(s.varies.pattern && s.varies.spiralDirection && s.varies.speed);
  assert.ok(s.geometries.filter((g) => g.type === 'line' || g.type === 'point').every((g) => g.spacing == null));
  assert.equal(new Set(s.geometries.map((g) => g.key)).size, s.geometries.length, 'unique keys');
  // Travel speed cannot be searched while it is the dose knob.
  const locked = searchSpace(config, heat, 5, vars, 'motion');
  assert.ok(locked.speedLocked && !locked.varies.speed && locked.geometries.every((g) => g.mode === 'point' || g.speed === 20));
  // Fixed variables keep the current setting; a user range replaces the automatic one (no current value added).
  const fixed = searchSpace(config, heat, 5, { spacing: { search: false }, inset: { search: true, min: 3, max: 5 } });
  assert.deepEqual(fixed.spacings, [5]);
  assert.ok(fixed.insets.every((v) => v >= 3 && v <= 5) && !fixed.insets.includes(2));
  // The plan counts every geometry and gives each extra path type its own dose window.
  const plan = planSearch(config, heat, { level: 2, vars, knob: 'drive' });
  assert.equal(plan.geometries, s.geometries.length);
  assert.equal(plan.keep, 4 + 3);
});

test('a search across path types gives every type a dose window; a dot uses its own dose knob', async () => {
  const heat = { shape: 'rectangle', width: 14, depth: 14, offsetX: 3, offsetY: -2, gap: 0.5, cellSize: 1, power: 10, ...PRESS_DEFAULTS, airMode: 'vent' };
  const config = { ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 10, offsetX: 40, offsetY: 30, pathSettings: { ...heat, pattern: 'serpentine', spacing: 3, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in' } };
  const vars = { pattern: { search: true, options: ['serpentine', 'spiral', 'point', 'line'] }, spacing: { search: false }, inset: { search: false }, spiralDirection: { search: true } };
  const r = await optimizeSettings(config, heat, { goals: { coverage: 80, overflow: 6 }, vars, knob: 'drive', pointKnob: 'motion', searchCell: 1, keep: 1, verify: 1, bisections: 2 });
  assert.deepEqual(r.types, ['serpentine', 'spiral', 'point', 'line']);
  for (const t of r.types) assert.ok(r.candidates.some((c) => c.type === t && !c.screenedOnly), `${t} has a window`);
  assert.ok(r.candidates.some((c) => c.type === 'spiral' && c.spiralDirection === 'inside-out'));
  const dot = r.candidates.find((c) => c.type === 'point');
  assert.equal(dot.knobInfo.key, 'gateDuration');
  assert.equal(dot.motionInfo.key, 'gateDuration');
  const serp = r.candidates.find((c) => c.type === 'serpentine');
  assert.equal(serp.knobInfo.key, 'pressure');
  assert.ok(r.best.verified, 'the leader is checked on the final grid');
  // The dot of a pattern search is placed at the heat-source centre.
  const { evaluateTask } = await import('../src/optimize.js');
  let seen = null;
  await optimizeSettings(config, heat, {
    goals: { coverage: 80, overflow: 6 },
    vars: { ...vars, pattern: { search: true, options: ['point'] } },
    pointKnob: 'motion',
    searchCell: 1,
    keep: 1,
    verify: 0,
    bisections: 1,
    evaluate: async (task) => {
      seen = task.config;
      try {
        return evaluateTask(task);
      } catch {
        return null;
      }
    },
  });
  assert.ok(seen.mode === 'point' && seen.offsetX === 3 && seen.offsetY === -2 && !seen.pathSettings);
});
