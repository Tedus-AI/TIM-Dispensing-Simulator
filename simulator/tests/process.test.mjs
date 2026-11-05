import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromRegistry, simulate, runTiming, calibrateFlow, steadyFlow } from '../src/engine.js';
import { planDispensePath } from '../src/path-planning.js';
import { PRESS_DEFAULTS } from '../src/compression.js';
import { optimizeSettings, chooseProcess, autoRanges, processCost, NEEDLES, CYCLE_REFERENCE, searchSpace } from '../src/optimize.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));
const square = (pattern, extra = {}) => ({ shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, pattern, spacing: 5, edgeInset: 2.5, spiralShape: 'auto', spiralDirection: 'inside-out', ...extra });
// The thin-gap case from v1.7 user feedback: Tgrease 2500, 30 × 30 mm, 0.05 mm gap, 18G needle at 1 mm/s.
const thinHeat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.05, cellSize: 0.5, power: 25, ...PRESS_DEFAULTS };
const thin = (path = {}) => ({ ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 1, diameter: 0.84, pathSettings: square('spiral', path) });
const required = (30 * 30 * 0.05) / 1000;

test('runTiming gives the deposit, cycle and duration of a run without stepping it', () => {
  const cases = [];
  for (const material of ['putty', 'grease'])
    for (const arch of ['R75', 'P300']) {
      const base = fromRegistry(registry, material, arch);
      cases.push({ ...base, mode: 'line' }, { ...base, mode: 'point' }, { ...base, mode: 'pattern', speed: 40, pathSettings: square('serpentine', { spacing: 4 }) });
      cases.push({ ...base, mode: 'line', endMotion: 'legacy' });
      if (arch === 'P300') cases.push({ ...base, mode: 'line', reverseDuration: 0.05 });
    }
  cases.push(thin());
  for (const c of cases) {
    const run = simulate(c);
    const t = runTiming(c);
    assert.ok(Math.abs(t.deposited / run.summary.deposited - 1) < 1e-9, `${c.material} ${c.architecture} ${c.mode}`);
    assert.ok(Math.abs(t.cycle - run.ending.motionEnd) < 1e-9 && Math.abs(t.duration - run.duration) < 1e-9 && t.fits);
    assert.equal(t.Q, run.Q);
  }
  // Past the simulation limit: simulate refuses, runTiming says it does not fit.
  const slow = { ...thin({ pattern: 'serpentine', spacing: 2.5, edgeInset: 1 }) };
  assert.throws(() => simulate(slow), /180/);
  assert.equal(runTiming(slow).fits, false);
});

test('米字形 (star): eight spokes laid out and back from the centre, inside the edge inset', () => {
  const p = planDispensePath(square('star', { edgeInset: 2.5 }));
  const a = 15 - 2.5;
  assert.deepEqual(p.points[0], { x: 0, y: 0 });
  assert.deepEqual(p.points.at(-1), { x: 0, y: 0 });
  assert.equal(p.points.length, 17, 'centre + 8 × (tip, centre)');
  const tips = p.points.filter((_, i) => i % 2 === 1);
  assert.ok(tips.every((q) => Math.max(Math.abs(q.x), Math.abs(q.y)) === a), 'tips on the inset boundary');
  assert.ok(Math.abs(p.length - 2 * (4 * a + 4 * a * Math.SQRT2)) < 1e-9, 'every spoke twice');
  const disk = planDispensePath({ ...square('star', { edgeInset: 2 }), shape: 'circle' });
  assert.ok(disk.points.filter((_, i) => i % 2 === 1).every((q) => Math.abs(Math.hypot(q.x, q.y) - 13) < 1e-9));
  // The engine runs it like any pattern: the nozzle stops at every tip.
  const run = simulate({ ...fromRegistry(registry, 'grease'), mode: 'pattern', speed: 20, pathSettings: square('star') });
  assert.ok(run.summary.deposited > 0 && run.motion.corners >= 8);
});

test('flow calibration fits the flow law to one measured output', () => {
  const grease = { ...fromRegistry(registry, 'grease'), diameter: 0.84, pressure: 100 };
  const model = steadyFlow(grease);
  // Ten times the model flow: the equivalent viscosity drops tenfold and the model then matches.
  const fit = calibrateFlow(grease, model * 10 * grease.density * 60, 60);
  assert.equal(fit.key, 'viscosity');
  assert.ok(Math.abs(fit.ratio - 10) < 1e-9 && Math.abs(fit.value - grease.viscosity / 10) < 1e-9 && fit.inRange);
  assert.ok(Math.abs(steadyFlow({ ...grease, viscosity: fit.value }) / (model * 10) - 1) < 1e-12);
  const putty = fromRegistry(registry, 'putty');
  const p = calibrateFlow(putty, steadyFlow(putty) * 0.5 * putty.density * 10, 10);
  assert.ok(p.key === 'referenceRate' && Math.abs(p.value - putty.referenceRate * 0.5) < 1e-12);
  const pcp = fromRegistry(registry, 'grease', 'P300');
  const e = calibrateFlow(pcp, steadyFlow(pcp) * 2 * pcp.density * 10, 10);
  assert.ok(e.key === 'efficiency' && !e.inRange, 'twice the ideal displacement is outside 0–1');
  assert.throws(() => calibrateFlow(grease, 0, 10));
});

test('automatic speed range covers practical dispensing times, not only around the current speed', () => {
  const r = autoRanges(thin({ edgeInset: 4.5 }), thinHeat).speed;
  const length = planDispensePath(square('spiral', { edgeInset: 4.5 })).length;
  assert.equal(r[0], 1);
  assert.ok(Math.abs(r[1] - length / 5) < 1e-9 && r[1] > 20, `${r}`);
  // A user speed keeps its own ¼–2 × span inside the range.
  const fast = autoRanges({ ...thin(), speed: 200 }, thinHeat).speed;
  assert.ok(fast[0] <= 50 && fast[1] === 400);
});

test('process choice: a nozzle and speed that lay the whole dose band, trading bead against cycle', () => {
  const c = thin();
  const band = { nominalMl: required * 1.16, lowMl: required * 0.94, needMl: required * 1.405 };
  const speeds = searchSpace(c, thinHeat).speeds;
  const needles = NEEDLES.map((n) => n.id);
  const p = chooseProcess(c, { ...band, speeds, needles });
  // 18G cannot lay 1.4 × at 100 psi even at 1 mm/s: a coarser needle, with room on the drive at both ends.
  assert.ok(p.fits && p.ok && p.headroom && p.diameter > 0.84, JSON.stringify(p));
  const top = runTiming({ ...c, speed: p.speed, diameter: p.diameter, pressure: 100 }).deposited;
  assert.ok(top >= band.needMl && Math.abs(top / p.capTop - 1) < 1e-9, 'capacity by flow scaling is exact');
  // A longer cycle allowed buys a bead closer to the nozzle (finer needle); a shorter one a coarser needle.
  const slow = chooseProcess(c, { ...band, speeds, needles, cycleRef: 120 });
  const quick = chooseProcess(c, { ...band, speeds, needles, cycleRef: 10 });
  assert.ok(slow.diameter <= p.diameter && quick.diameter >= p.diameter && slow.cycle >= quick.cycle, `${slow.diameter} ${p.diameter} ${quick.diameter}`);
  assert.ok(Math.abs(Math.log(slow.ratio)) <= Math.abs(Math.log(quick.ratio)));
  // The fixed 18G at 1 mm/s cannot reach the band top; a path too long for 1 mm/s cannot run at all.
  const fixed = chooseProcess(thin({ edgeInset: 4.5 }), { ...band, speeds: [1], needles: [0.84] });
  assert.ok(fixed.fits && !fixed.ok && fixed.capTop < band.needMl);
  assert.equal(chooseProcess(thin({ pattern: 'serpentine', spacing: 2.5, edgeInset: 1 }), { ...band, speeds: [1], needles }).fits, false);
  // A volumetric pump: flow does not depend on the needle, so the bead decides the needle.
  const pcp = { ...fromRegistry(registry, 'grease', 'P300'), mode: 'pattern', speed: 20, pathSettings: square('serpentine') };
  const q = chooseProcess(pcp, { nominalMl: 0.3, lowMl: 0.2, needMl: 0.4, speeds: [20], needles });
  assert.ok(q.ok && q.ratio >= 0.7 * 0.8 && q.ratio <= 1.5 * 1.25, `${q.diameter} ${q.ratio}`);
});

test('process cost: bead band, cycle over the reference, drive at its range end', () => {
  assert.equal(processCost({ bead: { speedRatio: 1.2 }, cycle: 20 }), 0);
  assert.ok(Math.abs(processCost({ bead: { speedRatio: 7.5 }, cycle: 20 }) - Math.log(5)) < 1e-12);
  assert.ok(Math.abs(processCost({ bead: { speedRatio: 1 }, cycle: 2 * CYCLE_REFERENCE }) - Math.log(2)) < 1e-12);
  assert.equal(processCost({ bead: { speedRatio: 1 }, cycle: 50 }, 60), 0, 'the cycle limit replaces the reference');
  assert.equal(processCost({ bead: { speedRatio: 1 }, cycle: 10, headroom: false }), 0.5);
});

test('thin gap, viscous grease: the auto process lays the dose band where a fixed 18G is capped', async () => {
  const opts = { goals: { coverage: 95, overflow: 3 }, tolerance: 0.1, searchCell: 0.75, verifyCell: 0.5, keep: 1, verify: 1, band: 3, bisections: 3 };
  const geometry = { spacing: { search: false }, inset: { search: false } };
  const auto = await optimizeSettings(thin(), thinHeat, { ...opts, nozzle: 'auto', vars: geometry });
  const a = auto.best;
  assert.equal(auto.sizing.limited, 0);
  assert.ok(a.verified && a.diameter > 0.84 && a.headroom === true && a.cycle < 60, JSON.stringify({ d: a.diameter, v: a.speed, cycle: a.cycle }));
  assert.ok(a.bandPoints.length === 3 && a.bandPoints.every((p) => p.reached && !p.capped && !p.fallback));
  assert.ok(a.bandPoints.every((p) => Math.abs(p.laid / p.factor - 1) < 0.03), 'every dose of the band is laid');
  // Fixed 18G at 1 mm/s (the v1.7 result): the top of the band is beyond the equipment, and the page is told so.
  const fixed = await optimizeSettings(thin(), thinHeat, { ...opts, nozzle: 'fixed', vars: { ...geometry, speed: { search: false } } });
  const f = fixed.best;
  assert.equal(fixed.sizing.limited, 1);
  assert.ok(!f.pass && f.capFactor > 1 && f.capFactor < fixed.sizing.needFactor, `${f.capFactor}`);
  assert.ok(f.bandPoints.some((p) => p.capped && p.laid < p.factor * 0.97));
});

test('needle sizes: whole gauges for the automatic choice, the 1/8" guideline nozzle only as a preset', async () => {
  const { GAUGES, NOZZLE_PRESETS, needleLabel, gaugeTable } = await import('../src/optimize.js');
  assert.ok(GAUGES.every((g) => Number.isInteger(g.gauge)));
  for (let i = 1; i < GAUGES.length; i++) assert.ok(GAUGES[i].gauge > GAUGES[i - 1].gauge && GAUGES[i].id < GAUGES[i - 1].id, 'a larger gauge is a finer bore');
  assert.equal(NEEDLES.length, GAUGES.length);
  assert.ok(NEEDLES.every((n) => /^\d+G$/.test(n.label)));
  assert.ok(!NEEDLES.some((n) => n.id === 3.175) && NOZZLE_PRESETS.some((n) => n.id === 3.175));
  assert.deepEqual([needleLabel(1.54), needleLabel(0.84), needleLabel(3.175), needleLabel(0.7)], ['14G', '18G', '1/8"', 'Ø0.7']);
  assert.ok(gaugeTable().includes('14G 1.54') && gaugeTable().split('\n').length === Math.ceil(GAUGES.length / 4));
  // The process choice of the thin-gap case lands on a whole gauge.
  const p = chooseProcess(thin(), { nominalMl: required * 1.16, lowMl: required * 0.94, needMl: required * 1.405, speeds: searchSpace(thin(), thinHeat).speeds, needles: NEEDLES.map((n) => n.id) });
  assert.ok(p.ok && NEEDLES.some((n) => n.id === p.diameter) && /^\d+G$/.test(needleLabel(p.diameter)), needleLabel(p.diameter));
});

test('stacked glue: passes that come back over themselves add up, and the nozzle meets a pile above the standoff', async () => {
  const { stackedBead } = await import('../src/stacking.js');
  const { beadMatch } = await import('../src/optimize.js');
  const { tuneDose } = await import('../src/tuning.js');
  // One straight pass: the stack is the bead itself.
  const line = tuneDose({ ...thin(), mode: 'line', lineLength: 20, diameter: 1.54, speed: 11, offsetX: 0, offsetY: 0 }, 0.01, 'drive').run;
  const one = stackedBead(line);
  assert.ok(!one.overlap && !one.contact && Math.abs(one.maxHeight / one.single - 1) < 0.15, JSON.stringify(one));
  // The star lays every spoke twice and passes its centre nine times: a pile at the centre above the 2 mm standoff.
  const starCase = { ...thin({ pattern: 'star', edgeInset: 3.5 }), diameter: 1.54, speed: 11 };
  const star = tuneDose(starCase, required * 1.1, 'drive').run;
  const s = stackedBead(star);
  assert.ok(s.overlap && s.contact && s.where === 'centre' && s.maxHeight > 1.5 * star.config.standoff, JSON.stringify(s));
  const b = beadMatch(star);
  assert.ok(b.drags && b.stack.contact && !b.buried && processCost({ bead: b, cycle: 10 }) >= 1);
  // A higher standoff clears the pile; a serpentine does not come back over itself enough to reach the nozzle.
  assert.equal(stackedBead(tuneDose({ ...starCase, standoff: 6 }, required * 1.1, 'drive').run).contact, false);
  const serp = tuneDose({ ...thin({ pattern: 'serpentine', spacing: 5, edgeInset: 2 }), diameter: 1.36, speed: 6 }, required * 1.1, 'drive').run;
  assert.ok(!stackedBead(serp).contact && !beadMatch(serp).drags);
});
