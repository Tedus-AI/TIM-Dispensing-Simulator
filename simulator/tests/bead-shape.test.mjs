import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromRegistry, simulate, dotDimensions, beadProfile, troweledWidth, BEAD_SIDES } from '../src/engine.js';
import { volumeOf, continuousLineGeometry } from '../src/scene.js';

const registry = JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json', import.meta.url)));
const capVolume = (r, h) => (Math.PI * h * (3 * r * r + h * h)) / 6;
const near = (a, b, rel = 1e-9) => assert.ok(Math.abs(a - b) <= rel * Math.max(1, Math.abs(b)), `${a} vs ${b}`);

test('dot under a low nozzle is pressed to the standoff with its volume kept, within the nozzle reach', () => {
  const free = dotDimensions(0.05, 0.6);
  assert.equal(free.flattened, false);
  near(capVolume(free.radius, free.height), 50);
  // Nozzle well above the dot: unchanged.
  assert.deepEqual(dotDimensions(0.05, 0.6, free.height + 1, 2), free);
  // Pressed: as tall as the standoff, wider, same volume.
  const pressed = dotDimensions(0.05, 0.6, free.height * 0.8, 3.175);
  assert.ok(pressed.flattened && pressed.radius > free.radius);
  near(pressed.height, free.height * 0.8);
  near(capVolume(pressed.radius, pressed.height), 50);
  // A nozzle buried in the dot can only spread it as far as it reaches: taller than the standoff.
  const buried = dotDimensions(0.05, 0.6, 1, 4);
  near(buried.radius, troweledWidth(4, 1) / 2);
  assert.ok(buried.flattened && buried.height > 1 && buried.height < free.height);
  near(capVolume(buried.radius, buried.height), 50, 1e-6);
  // A nozzle narrower than the dot itself does not spread it at all.
  const tiny = dotDimensions(0.05, 0.6, 0.1, 1);
  near(tiny.radius, free.radius);
  near(tiny.height, free.height);
});

test('bead under a low nozzle keeps the deposited volume, flattens to the standoff and widens', () => {
  const deposits = new Float64Array(40).fill(0.002); // 2 mm³ per 1 mm cell
  const free = beadProfile(deposits, 1, 0.6);
  assert.equal(free.flattened, false);
  near(free.volumeMm3, 80);
  const standoff = free.maxHeight * 0.6;
  const low = beadProfile(deposits, 1, 0.6, standoff, 3);
  assert.ok(low.flattened && low.maxWidth > free.maxWidth);
  assert.ok(low.maxHeight <= standoff * (1 + 1e-9));
  // Lofted volume of the rings matches the deposit exactly.
  const k = (BEAD_SIDES * Math.sin(Math.PI / BEAD_SIDES)) / 4;
  let v = 0;
  for (let i = 0; i < deposits.length; i++) {
    const [w0, h0, w1, h1] = [low.widths[i], low.heights[i], low.widths[i + 1], low.heights[i + 1]];
    v += (k * (w0 * h0 + (w0 * h1 + w1 * h0) / 2 + w1 * h1)) / 3;
  }
  near(v, 80, 1e-9);
  // The rendered tube holds the same volume.
  near(volumeOf(continuousLineGeometry(deposits, 1, 0.6, standoff, 3)), 80, 2e-3);
  // Beyond the nozzle reach the bead stays taller than the standoff.
  const buried = beadProfile(deposits, 1, 0.6, 0.3, 2.5);
  assert.ok(buried.flattened && buried.maxHeight > 0.3);
  assert.ok(Math.abs(buried.maxWidth / troweledWidth(2.5, 0.3) - 1) < 0.05, `${buried.maxWidth}`);
});

test('simulation reports a pressed or buried bead and warns about a buried nozzle', () => {
  const line = { ...fromRegistry(registry, 'grease'), mode: 'line', lineLength: 60, shutoffDistance: 0, speed: 10, diameter: 0.84 };
  const high = simulate({ ...line, standoff: 20 });
  assert.equal(high.summary.flattened, false);
  const low = simulate({ ...line, standoff: high.summary.maxHeight * 0.7 });
  assert.ok(low.summary.flattened && low.summary.maxHeight <= low.config.standoff * (1 + 1e-9));
  assert.ok(Math.abs(low.summary.deposited - high.summary.deposited) < 1e-12, 'standoff does not change the dose');
  assert.ok(low.warnings.some((w) => /壓平/.test(w)));
  const buried = simulate({ ...line, standoff: 0.1 });
  assert.ok(buried.summary.maxHeight > 0.1 && buried.warnings.some((w) => /埋入/.test(w)));
});
