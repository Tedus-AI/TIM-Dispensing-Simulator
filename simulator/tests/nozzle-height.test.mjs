import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromRegistry, simulate, ENDING_DEFAULT, SHUTOFF_COMPARISON } from '../src/engine.js';
import { beadMatch, clearNozzle, evaluateTask, optimizeSettings, processCost, nozzleLift, ropeHeight, resultOrder, STANDOFF_STEP, STANDOFF_MAX, OPTIMIZE_DEFAULTS, standoffMode } from '../src/optimize.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));
const heat = { shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, gap: 0.5, cellSize: 1 };
const pattern = (name, extra = {}) => ({ shape: 'rectangle', width: 30, depth: 30, offsetX: 0, offsetY: 0, pattern: name, spacing: 5, edgeInset: 2, spiralShape: 'auto', spiralDirection: 'outside-in', ...extra });
// A star lays every spoke out and back through the centre: 16 passes pile up there.
const star = () => ({ ...fromRegistry(registry, 'putty'), mode: 'pattern', pressure: 55, pathSettings: pattern('star') });

test('defaults (v3.1): the dispenser closes at the end of the path; 10 mm stays as the comparison value', () => {
  assert.equal(ENDING_DEFAULT.value, 0);
  assert.equal(SHUTOFF_COMPARISON, 10);
  for (const material of ['putty', 'grease']) for (const architecture of ['R75', 'P300']) assert.equal(fromRegistry(registry, material, architecture).shutoffDistance, 0);
  // With no early shut-off the gate closes when the nozzle arrives.
  const run = simulate({ ...fromRegistry(registry, 'putty'), mode: 'line' });
  assert.equal(run.ending.effectiveShutoffDistance, 0);
  assert.ok(Math.abs(run.ending.commandOff - run.ending.movementEnd) < 1e-9);
  assert.equal(OPTIMIZE_DEFAULTS.standoff, 'raise');
  assert.equal(standoffMode(undefined), 'raise');
  assert.equal(standoffMode('fixed'), 'fixed');
});

test('clearNozzle lifts the nozzle in 1 mm steps to the first height that touches no glue', () => {
  const run = simulate(star());
  const before = beadMatch(run);
  assert.equal(run.config.standoff, 2);
  assert.ok(before.stack.contact && before.drags, 'the centre pile reaches the needle at 2 mm');
  const fit = clearNozzle(run);
  assert.equal(fit.clear, true);
  assert.equal(fit.bead.drags, false);
  assert.ok(fit.raised >= STANDOFF_STEP && Math.abs(fit.raised / STANDOFF_STEP - Math.round(fit.raised / STANDOFF_STEP)) < 1e-9, `raised by whole steps: ${fit.raised}`);
  assert.ok(Math.abs(fit.standoff - (2 + fit.raised)) < 1e-9 && fit.run.config.standoff === fit.standoff);
  // The first clear height on the ladder: one step lower still touches.
  assert.equal(beadMatch(simulate({ ...run.config, standoff: fit.standoff - STANDOFF_STEP })).drags, true);
  // Lifting the nozzle changes the bead's shape, not the amount laid.
  assert.ok(Math.abs(fit.run.summary.deposited - run.summary.deposited) < 1e-12);
  // The pile it clears is about as tall as the nozzle now stands (the last glue lands on top after it).
  assert.ok(fit.bead.stack.maxHeight > 2 && fit.bead.stack.maxHeight < fit.standoff + 2);
});

test('clearNozzle: a single pass taller than the nozzle counts; a clear run is returned as it is; the lift is capped', () => {
  // Default N pattern at 90 psi: one bead already stands above the 2 mm nozzle (buried).
  const buried = simulate({ ...fromRegistry(registry, 'putty'), mode: 'pattern', pathSettings: pattern('n') });
  const b = beadMatch(buried);
  assert.ok(b.buried && b.drags);
  const fit = clearNozzle(buried);
  assert.ok(fit.clear && !fit.bead.buried && fit.raised > 0);
  assert.ok(fit.run.summary.maxHeight <= fit.standoff + 1e-9, 'the free bead fits under the raised nozzle');
  // A thin line under a high nozzle touches nothing.
  const thin = simulate({ ...fromRegistry(registry, 'putty'), mode: 'line', pressure: 30, speed: 60, standoff: 3 });
  const same = clearNozzle(thin);
  assert.equal(same.run, thin);
  assert.equal(same.raised, 0);
  assert.equal(same.clear, true);
  // A cap the pile exceeds: the nozzle stops there and is reported as not clear.
  const capped = clearNozzle(simulate(star()), { max: 4 });
  assert.equal(capped.standoff, 4);
  assert.equal(capped.clear, false);
  assert.equal(STANDOFF_MAX, 20);
});

test('one evaluation: raised nozzle and clear needle, or the set height and a needle in the glue', () => {
  const target = (30 * 30 * 0.5 * 1.2) / 1000;
  const raised = evaluateTask({ config: star(), heat, target, knob: 'drive', standoff: 'raise' });
  assert.equal(raised.needleClear, true);
  assert.ok(raised.standoffRaised >= STANDOFF_STEP && raised.settings.standoff === 2 + raised.standoffRaised);
  assert.equal(raised.bead.standoff, raised.settings.standoff, 'the bead (and the squeeze) belong to the raised nozzle');
  const fixed = evaluateTask({ config: star(), heat, target, knob: 'drive', standoff: 'fixed' });
  assert.equal(fixed.needleClear, false);
  assert.equal(fixed.settings.standoff, 2);
  assert.equal(fixed.standoffRaised, 0);
  // Same dose either way: the nozzle height does not change what is dispensed.
  assert.ok(Math.abs(raised.depositedMl - fixed.depositedMl) < 1e-9);
  // Without the option an evaluation keeps the height (callers before v3.1).
  assert.equal(evaluateTask({ config: star(), heat, target, knob: 'drive' }).settings.standoff, 2);
});

test('a nozzle raised far above its bead costs; one that was not raised, or stays near the bead, does not', () => {
  const bead = { speedRatio: 1, drags: false, freeHeight: 2, bore: 3, point: false };
  assert.equal(ropeHeight(bead), 4);
  assert.equal(ropeHeight({ ...bead, freeHeight: 0.4, point: true }), 3, 'a dot: twice the bore radius when that is larger');
  const row = (standoff, standoffRaised) => ({ bead, cycle: 10, settings: { standoff }, standoffRaised });
  assert.equal(nozzleLift(row(4, 2)), 0, 'raised to twice the bead height: still laid on the surface');
  assert.ok(Math.abs(nozzleLift(row(11, 9)) - Math.log(11 / 4)) < 1e-12);
  assert.equal(nozzleLift(row(11, 0)), 0, 'a height the user set is not weighed');
  // Started above the rope height already: only the part the search added counts.
  assert.ok(Math.abs(nozzleLift(row(8, 2)) - Math.log(8 / 6)) < 1e-12);
  assert.ok(Math.abs(processCost(row(11, 9)) - processCost(row(4, 2)) - Math.log(11 / 4)) < 1e-12);
  // A needle in the glue never ranks as a pass.
  const pass = { robust: true, reached: true, cycleOk: true, depositedMl: 0.6, cycle: 10, bead, settings: { standoff: 2 } };
  const touching = { ...pass, depositedMl: 0.5, needleClear: false, coveredPercent: 99, squeezeOutMm: 1 };
  const order = resultOrder([touching, pass]);
  assert.ok(order(pass, touching) < 0, 'the clear result first although it uses more material');
});

test('search: every usable result has a clear needle; the check holds one nozzle height across its dose band', async () => {
  const goals = { coverage: 80, overflow: 8 };
  const fixedVars = { pattern: { search: false }, spacing: { search: false }, inset: { search: false }, spiralDirection: { search: false }, speed: { search: false } };
  const options = { goals, tolerance: 0.1, nozzle: 'fixed', vars: fixedVars, searchCell: 1, keep: 1, verify: 1, bisections: 1 };
  const r = await optimizeSettings(star(), heat, { ...options, standoff: 'raise' });
  assert.equal(r.standoff, 'raise');
  assert.equal(r.standoffBase, 2);
  const best = r.best;
  assert.equal(best.verified, true);
  assert.equal(best.needleClear, true);
  assert.ok(best.settings.standoff > 2 && best.standoffRaised > 0, `raised to ${best.settings.standoff} mm`);
  // The band was run at one height, the one its largest dose needs, and no point touches.
  assert.ok(best.bandPoints.length >= 3);
  for (const p of best.bandPoints) {
    assert.equal(p.needleClear, true);
    assert.equal(p.standoff, best.settings.standoff);
  }
  assert.equal(best.pass, best.robust, 'with a clear needle the verdict is the coverage / overflow one');
  for (const c of r.candidates) assert.notEqual(c.needleClear, false);

  // The same search with the height fixed at 2 mm: the centre pile reaches the needle, so nothing passes.
  const f = await optimizeSettings(star(), heat, { ...options, standoff: 'fixed' });
  assert.equal(f.standoff, 'fixed');
  assert.equal(f.best.needleClear, false);
  assert.equal(f.best.settings.standoff, 2);
  assert.equal(f.best.pass, false);
  assert.ok(f.candidates.every((c) => !c.pass));
});
