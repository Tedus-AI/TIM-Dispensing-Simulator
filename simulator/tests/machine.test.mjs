import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createPalette, PartKit, frame } from '../src/scene-parts.js';
import { buildRobot, buildZSlide, buildAccessories, createNeedle, ROBOT } from '../src/machine.js';
import { needleOuterDiameter } from '../src/deposit.js';

function robot(pcp = false) {
  const k = new PartKit(createPalette());
  const S = { machine: new THREE.Group(), environment: new THREE.Group() };
  const { zTop } = buildRobot(S, k, pcp);
  S.tool = new THREE.Group();
  S.machine.add(S.tool);
  buildZSlide(S, k, pcp, pcp ? 4 : 0);
  return { S, k, zTop };
}
const boxOf = (o) => new THREE.Box3().setFromObject(o);
const meshes = (root, skip = null) => {
  const list = [];
  root.traverse((o) => {
    if (!(o.isMesh || o.isInstancedMesh)) return;
    for (let p = o; p; p = p.parent) if (p === skip) return;
    list.push(o);
  });
  return list;
};

test('a local frame maps its X to the travel axis and its Z to the mounting normal', () => {
  const g = new THREE.Group();
  const f = frame(g, 10, 20, 30, 'z', '-y');
  g.updateMatrixWorld(true);
  const at = (x, y, z) => new THREE.Vector3(x, y, z).applyMatrix4(f.matrixWorld);
  assert.ok(at(5, 0, 0).distanceTo(new THREE.Vector3(10, 20, 35)) < 1e-9, 'local X runs along +z');
  assert.ok(at(0, 0, 4).distanceTo(new THREE.Vector3(10, 16, 30)) < 1e-9, 'local Z points to −y');
  // Right-handed: local Y = Z × X.
  assert.ok(at(0, 1, 0).distanceTo(new THREE.Vector3(9, 20, 30)) < 1e-9);
});

test('bench robot: stands on the deck, has its moving groups and the hose anchors', () => {
  for (const pcp of [false, true]) {
    const { S, k, zTop } = robot(pcp);
    S.machine.updateMatrixWorld(true);
    const b = boxOf(S.machine);
    assert.ok(Math.abs(b.min.z + 70) < 1e-6, `feet on the deck at z = −70 (${b.min.z})`);
    assert.ok(b.max.x - b.min.x > ROBOT.width && b.max.x - b.min.x < 640);
    assert.equal(zTop, pcp ? 380 : 300);
    for (const name of ['bridge', 'carriage', 'chain', 'chainY', 'airFitting', 'supplyFitting', 'pendantPort']) assert.ok(S[name], `${name} missing`);
    assert.equal(S.carriage.parent, S.bridge, 'the X carriage rides on the bridge');
    assert.ok(k.counter.parts > 250, `detailed model: ${k.counter.parts} parts`);
    // The tooling plate top is the z = 0 datum and the table is clear above it around the centre.
    const above = meshes(S.machine.getObjectByName('base')).filter((o) => {
      const m = boxOf(o);
      return m.max.z > 0.5 && m.min.x < 160 && m.max.x > -160 && m.min.y < 160 && m.max.y > -160;
    });
    assert.equal(above.length, 0, 'nothing of the base stands on the work area');
  }
});

test('the carriage and Z axis clear the uprights and beam ends over the whole X travel', () => {
  for (const pcp of [false, true]) {
    const { S } = robot(pcp);
    const fixed = meshes(S.bridge, S.carriage).filter((o) => {
      // Parts the carriage must never touch: the cast uprights, the beam's end plates and the X drive.
      S.machine.updateMatrixWorld(true);
      const m = boxOf(o);
      return Math.abs((m.min.x + m.max.x) / 2) > 170;
    });
    assert.ok(fixed.length > 10);
    for (const x of [-150, 0, 150]) {
      S.carriage.position.x = x;
      S.tool.position.set(x, 0, 15);
      S.machine.updateMatrixWorld(true);
      const moving = [...meshes(S.carriage), ...meshes(S.tool)].map((o) => ({ o, box: boxOf(o) }));
      for (const f of fixed) {
        const fb = boxOf(f);
        for (const { o, box } of moving) {
          const hit = box.intersectsBox(fb) && Math.min(box.max.x, fb.max.x) - Math.max(box.min.x, fb.min.x) > 0.5 && Math.min(box.max.y, fb.max.y) - Math.max(box.min.y, fb.min.y) > 0.5 && Math.min(box.max.z, fb.max.z) - Math.max(box.min.z, fb.min.z) > 0.5;
          assert.ok(!hit, `at x = ${x}: ${o.geometry.type} of the carriage meets a fixed part of the bridge`);
        }
      }
    }
  }
});

test('the bridge stays on its Y modules and in front of the rear hood over the whole Y travel', () => {
  const { S } = robot(false);
  for (const y of [-150, 150]) {
    S.bridge.position.y = y;
    S.machine.updateMatrixWorld(true);
    const b = boxOf(S.bridge);
    assert.ok(b.max.y <= ROBOT.rear - 74 + 1e-6, `bridge rear ${b.max.y} clears the hood at ${ROBOT.rear - 74}`);
    assert.ok(b.min.y >= ROBOT.front, 'bridge front stays over the base');
  }
});

test('a gauge bore is drawn as a luer-lock needle with the gauge outer diameter; other bores are not', () => {
  const k = new PartKit(createPalette());
  const n = createNeedle(k, { diameter: 0.84 });
  assert.equal(n.gauge, 18);
  assert.equal(n.outer, needleOuterDiameter(0.84));
  n.group.updateMatrixWorld(true);
  const b = boxOf(n.group);
  assert.ok(Math.abs(b.min.z) < 1e-6, 'the cannula tip is the TCP at z = 0');
  assert.ok(Math.abs(b.max.z - n.length) < 1e-6, 'the adapter top is where the cartridge or pump outlet sits');
  assert.ok(Math.abs(n.length - (12.7 + 17 + 13)) < 1e-9);
  // The cannula alone, below the hub, is as wide as the gauge's tube.
  const cannula = n.group.children[0];
  const cb = boxOf(cannula);
  assert.ok(Math.abs(cb.max.x - cb.min.x - n.outer) < 0.02);
  assert.equal(createNeedle(k, { diameter: 3.175 }), null, 'the 1/8 in tapered nozzle is not a needle');
  assert.equal(createNeedle(k, { diameter: 1.0 }), null);
});

test('table accessories keep out of the fixture and leave when the fixture fills the table', () => {
  const k = new PartKit(createPalette());
  const S = { machine: new THREE.Group() };
  buildAccessories(S, k, { width: 150, depth: 100 });
  S.machine.updateMatrixWorld(true);
  const b = boxOf(S.accessories);
  assert.ok(b.min.x > (150 + 24) / 2, 'beside the fixture');
  assert.ok(b.max.x <= 160 && b.max.y <= 160, 'on the tooling plate');
  const full = { machine: new THREE.Group() };
  buildAccessories(full, k, { width: 300, depth: 300 });
  assert.equal(full.accessories, undefined);
});
