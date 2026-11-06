import test from 'node:test';
import assert from 'node:assert/strict';
import { depositField, createDepositor, needleOuterDiameter } from '../src/deposit.js';
import { estimateCompression } from '../src/compression.js';

// One straight 10 mm line laid out and back (x 0 → 10 → 0), uniform deposit per 0.5 mm cell.
function outAndBack({ area = 0.3, standoff = 2, bore = 1.54, ratio = 0.5 } = {}) {
  const points = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 0, y: 0 },
  ];
  const path = { points, cumulative: [0, 10, 20], length: 20 };
  const cellLength = 0.5;
  const n = 40;
  const deposits = Array(n).fill((area * cellLength) / 1000);
  return {
    config: { mode: 'pattern', lineRatio: ratio, standoff, diameter: bore, pathSettings: { offsetX: 0, offsetY: 0 } },
    path,
    pathLength: path.length,
    gridStart: 0,
    cellLength,
    summary: { deposits, deposited: deposits.reduce((a, b) => a + b, 0), maxHeight: 0 },
  };
}

// Cross-section of a field at x: the highest glue and the width where glue stands above 2 % of it.
function section(f, x) {
  const g = f.grid;
  const i = Math.floor((x - g.originX) / g.cell);
  let top = 0;
  for (let j = 0; j < g.ny; j++) top = Math.max(top, f.z[j * g.nx + i]);
  let cells = 0;
  for (let j = 0; j < g.ny; j++) if (f.z[j * g.nx + i] > 0.02 * top) cells++;
  return { top, width: cells * g.cell };
}

const free = (area, ratio) => {
  const w = Math.sqrt((4 * area) / (Math.PI * ratio));
  return { w, h: ratio * w };
};

test('deposit field: the return pass stands on the outward bead, volume exact', () => {
  const run = outAndBack();
  const f = depositField(run);
  const { w, h } = free(0.3, 0.5);
  assert.ok(Math.abs(f.volumeMm3 / (run.summary.deposited * 1000) - 1) < 1e-12 && f.lostMm3 === 0);
  // Half way along, both passes: twice the single bead, the same width; nothing reaches the 2 mm needle.
  const mid = section(f, 5);
  assert.ok(Math.abs(mid.top / (2 * h) - 1) < 0.06, `${mid.top} vs ${2 * h}`);
  assert.ok(Math.abs(mid.width / w - 1) < 0.2, `${mid.width} vs ${w}`);
  assert.ok(f.contactMm === 0 && f.ploughedMm3 === 0 && f.stackedMm3 > 0.3 * f.volumeMm3);
});

test('deposit field: over earlier glue the needle is closer, so a bead that does not fit is pressed wider', () => {
  // Single bead 0.44 mm high under a 0.6 mm needle: the return pass has 0.16 mm left and is pressed out sideways.
  const run = outAndBack({ standoff: 0.6 });
  const f = depositField(run);
  const { w, h } = free(0.3, 0.5);
  const mid = section(f, 5);
  assert.ok(mid.width > 1.6 * w, `${mid.width} vs ${w}`);
  assert.ok(mid.top < 2 * h - 0.1 && mid.top > 0.6 - 0.05, `${mid.top}`);
  assert.ok(Math.abs(f.volumeMm3 / (run.summary.deposited * 1000) - 1) < 1e-12);
});

test('deposit field: glue above the needle tip is pushed aside by the returning needle', () => {
  // A heavy bead (3 mm²) under a 0.5 mm, 21G needle piles 1.4 mm high around it (buried); the needle coming
  // back meets it, ploughs what stands above its tip into ridges beside it, and nothing is lost.
  const run = outAndBack({ area: 3, standoff: 0.5, bore: 0.51 });
  const f = depositField(run);
  assert.ok(f.contactMm > 5 && f.ploughedMm3 > 1 && f.earlierPloughedMm3 > 1, JSON.stringify({ c: f.contactMm, p: f.ploughedMm3 }));
  assert.ok(Math.abs(f.volumeMm3 / (run.summary.deposited * 1000) - 1) < 1e-12 && f.lostMm3 === 0);
  // Inside the needle's path the earlier glue is cut down to the tip (the new bead stands on it); the ridges
  // beside the path stand higher than the cut.
  const g = f.grid;
  const i = Math.floor((5 - g.originX) / g.cell);
  const at = (y) => f.z[Math.floor((y - g.originY) / g.cell) * g.nx + i];
  const half = needleOuterDiameter(0.51) / 2;
  assert.ok(at(half + 0.15) > 0.5 && at(half + 0.15) > at(0) - 0.6, `${at(0)} ${at(half + 0.15)}`);
  // A single pass of the same bead never meets glue of an earlier pass.
  const one = depositField({ ...run, path: { points: run.path.points.slice(0, 2), cumulative: [0, 10], length: 10 }, pathLength: 10, summary: { ...run.summary, deposits: run.summary.deposits.slice(0, 20) } });
  assert.ok(one.contactMm === 0 && one.ploughedMm3 === 0);
});

test('deposit field: a layer continued from a cell boundary equals one laid in a single go', () => {
  const run = outAndBack({ standoff: 0.6 });
  const d = createDepositor(run);
  const whole = depositField(run, { depositor: d });
  const st = d.fresh();
  for (let i = 0; i < 25; i++) d.lay(st, i, run.summary.deposits[i], run.pathLength);
  const v = d.clone(st);
  for (let i = 25; i < d.n; i++) d.lay(v, i, run.summary.deposits[i], run.pathLength);
  d.finish(v);
  let diff = 0;
  for (let k = 0; k < whole.z.length; k++) diff = Math.max(diff, Math.abs(whole.z[k] - v.z[k]));
  assert.ok(diff < 1e-12, `${diff}`);
  // The clone left the original layer untouched: it still holds 25 cells' glue.
  let a = 0;
  for (const z of st.z) a += z;
  assert.ok(a * d.grid.cell ** 2 < 0.65 * whole.volumeMm3);
});

test('deposit field: the squeeze starts from it and keeps every mm³', () => {
  const run = outAndBack({ standoff: 0.6 });
  run.config = { ...run.config, material: 'grease', width: 60, depth: 60, workpieceKind: 'plate', offsetX: 0, offsetY: 0 };
  const r = estimateCompression(run, { shape: 'rectangle', width: 12, depth: 6, offsetX: 5, offsetY: 0, gap: 0.1, cellSize: 0.5 });
  assert.ok(Math.abs(r.summary.conservationErrorMl) < 1e-9 && r.summary.crestMm > 0.5);
  // The squeeze grid holds the same glue as the field: its crest is the field's crest averaged over a squeeze cell.
  const f = depositField(run);
  assert.ok(r.summary.crestMm <= f.maxHeight + 1e-9);
});

test('needle outer diameters follow the regular-wall tip table', () => {
  assert.ok(Math.abs(needleOuterDiameter(1.54) - 1.83) < 1e-9);
  assert.ok(Math.abs(needleOuterDiameter(0.84) - 1.27) < 1e-9);
  assert.ok(Math.abs(needleOuterDiameter(0.25) - 0.51) < 1e-9);
  const custom = needleOuterDiameter(1.0);
  assert.ok(custom > 1.27 && custom < 1.47 + 1e-9);
  assert.ok(needleOuterDiameter(3.175) > 3.175 && needleOuterDiameter(5) > 5);
});
