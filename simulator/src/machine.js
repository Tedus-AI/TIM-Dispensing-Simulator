import * as THREE from 'three';
import { frame, createDragChain, createLcd, createLabel } from './scene-parts.js';
import { needleOuterDiameter } from './deposit.js';
import { GAUGES } from './optimize.js';

/*
 * Benchtop three-axis dispensing robot (v3.0), drawn the way such machines are built: a painted base housing
 * with the operator controls on its front and a hood over the Y drives at the rear; two enclosed Y modules
 * carrying a bridge; an X beam of T-slot extrusion with two profiled guide rails, a ball screw between its
 * bearing supports and a stepper at the end; a Z axis of the same parts on the X carriage; drag chains for the
 * moving leads. World mm, Z up, tooling-plate top at z = 0, the bench (or the cell's deck) at z = −70.
 * Generic catalogue proportions: no maker's CAD, travel limits or load ratings are implied.
 */

const DECK = -70; // what the machine stands on
export const ROBOT = Object.freeze({ width: 500, front: -200, rear: 392, beamZ: 198, beamHeight: 60 });

function nameplate(lines) {
  return createLabel(92, 18, (ctx, w, h) => {
    ctx.fillStyle = '#d9dcdf';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#6b7279';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, w - 8, h - 8);
    ctx.fillStyle = '#1c2024';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(h * 0.34)}px 'Segoe UI', system-ui, sans-serif`;
    ctx.fillText(lines[0], 22, h * 0.33);
    ctx.font = `${Math.round(h * 0.24)}px 'Segoe UI', 'Noto Sans TC', system-ui, sans-serif`;
    ctx.fillStyle = '#4b5158';
    ctx.fillText(lines[1], 22, h * 0.7);
  });
}
function warningLabel() {
  return createLabel(16, 14, (ctx, w, h) => {
    ctx.fillStyle = '#f4c41f';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#16181b';
    ctx.beginPath();
    ctx.moveTo(w / 2, h * 0.12);
    ctx.lineTo(w * 0.9, h * 0.88);
    ctx.lineTo(w * 0.1, h * 0.88);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f4c41f';
    ctx.font = `bold ${Math.round(h * 0.52)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', w / 2, h * 0.62);
  });
}
const place = (parent, mesh, x, y, z) => {
  if (!mesh) return;
  mesh.position.set(x, y, z);
  parent.add(mesh);
};

// A panel push button: chrome bezel and a coloured cap, standing out of a local frame's z = 0 face.
function pushButton(k, panel, x, y, material, r = 5.6) {
  k.pin(panel, r + 1.8, 2, 'z', x, y, 1, 'steel', 28);
  k.pin(panel, r, 3.4, 'z', x, y, 2.7, material, 28);
}

export function buildRobot(S, k, pcp) {
  const m = S.machine;
  const stackY = pcp ? 4 : 0;
  const beamY = 110 + stackY;
  S.beamY = beamY;
  const zTop = pcp ? 380 : 300;
  const { width, front, rear, beamZ, beamHeight } = ROBOT;
  const midY = (front + rear) / 2;
  const depth = rear - front;
  const beamMid = beamZ + beamHeight / 2;

  // ── base housing ──
  const base = new THREE.Group();
  base.name = 'base';
  m.add(base);
  k.box(width, depth, 40, 0, midY, -58, 'paint', base, 6);
  k.box(width - 14, depth - 14, 6, 0, midY, -64, 'graphite', base, 2);
  k.box(width - 8, depth - 8, 2, 0, midY, -18, 'anodizedDark', base, 0.6);
  for (const x of [-215, 215])
    for (const y of [front + 36, rear - 36]) {
      k.cyl(17, 5, x, y, DECK, 'rubber', base);
      k.cyl(7, 2.5, x, y, DECK + 4.5, 'steel', base, 6);
    }
  // Operator controls on the front face.
  const panel = frame(base, 0, front, -38, 'x', '-y');
  k.slab(panel, 214, 28, 1.6, 122, 0, 0.8, 'anodizedDark', 0.5);
  k.pin(panel, 15, 2.5, 'z', 204, 0, 2.8, 'yellow', 36);
  k.pin(panel, 6, 7, 'z', 204, 0, 7, 'steelDark', 20);
  k.pin(panel, 11.5, 6, 'z', 204, 0, 13, 'red', 36);
  pushButton(k, panel, 166, 0, 'green');
  pushButton(k, panel, 144, 0, 'paintAccent');
  k.pin(panel, 7, 3, 'z', 118, 0, 2.5, 'steel', 28);
  k.slab(panel, 2, 9, 3, 118, 0, 5, 'motor', 0.4);
  for (const [x, mat] of [[92, 'green'], [84, 'yellow'], [76, 'red']]) k.pin(panel, 1.8, 1.2, 'z', x, 0, 2, mat, 12);
  k.slab(panel, 26, 12, 1.2, 46, 0, 2, 'black', 0.3); // USB / memory slot cover
  // Teach-pendant connector and the nameplate.
  k.pin(panel, 9.5, 3, 'z', -196, 0, 1.5, 'steel', 28);
  k.pin(panel, 7, 6, 'z', -196, 0, 4, 'motor', 20);
  S.pendantPort = new THREE.Object3D();
  S.pendantPort.position.set(-196, 0, 8);
  panel.add(S.pendantPort);
  place(panel, nameplate(['BENCH DISPENSING ROBOT  300 × 300', pcp ? '示意外形・非原廠 CAD　X300 Y300 Z100' : '示意外形・非原廠 CAD　X300 Y300 Z100']), -92, 0, 0.25);
  // Hood over the Y drives at the rear, with cooling slots and the service connectors.
  k.box(width, 74, 62, 0, rear - 37, -18, 'paint', base, 5);
  for (let i = 0; i < 7; i++) k.box(60, 3, 1, -150 + i * 0.01, rear - 62 + i * 8, 44.1, 'hole', base, 0);
  for (let i = 0; i < 7; i++) k.box(60, 3, 1, 150, rear - 62 + i * 8, 44.1, 'hole', base, 0);
  const back = frame(base, 0, rear, 4, '-x', 'y');
  k.slab(back, 150, 34, 1.5, 0, 0, 0.75, 'anodizedDark', 0.5);
  k.slab(back, 30, 22, 4, -52, 0, 3, 'motor', 1); // mains inlet
  for (const x of [-10, 14, 38]) k.pin(back, 6.5, 5, 'z', x, 0, 3.5, 'steel', 20);
  k.pin(back, 4, 9, 'z', 62, 0, 5, 'brass', 16);

  // ── tooling plate: M6 grid on 25 mm, millimetre scale along the front edge ──
  k.box(320, 320, 16, 0, 0, -16, 'aluminum', base, 1.5);
  const holes = [];
  for (let x = -137.5; x <= 137.5; x += 25) for (let y = -137.5; y <= 137.5; y += 25) holes.push([x, y]);
  const holeGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.2, 16);
  holeGeo.rotateX(Math.PI / 2);
  const holeMesh = new THREE.InstancedMesh(holeGeo, k.palette.hole, holes.length);
  holes.forEach(([x, y], i) => holeMesh.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, y, 0.02)));
  holeMesh.receiveShadow = true;
  base.add(holeMesh);
  const ticks = [];
  for (let x = -150; x <= 150; x += 5) ticks.push(x);
  const tickMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 1, 0.12), k.palette.black, ticks.length);
  ticks.forEach((x, i) => tickMesh.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(x, -157 + (x % 25 === 0 ? 2.5 : 1.25), 0.06), new THREE.Quaternion(), new THREE.Vector3(1, x % 25 === 0 ? 5 : 2.5, 1))));
  base.add(tickMesh);
  for (const x of [-150, 150]) for (const y of [-150, 150]) k.screw(x, y, -1.3, base, 3.2); // countersunk

  // ── Y modules: enclosed actuators with a steel cover band, running into the rear hood ──
  const yLength = rear - 74 - (front + 24);
  const yMid = (front + 24 + rear - 74) / 2;
  for (const x of [-200, 200]) {
    const f = frame(base, x, yMid, -1, 'y', 'z');
    k.extrusion(f, yLength, 44, 30, 'anodized');
    k.slab(f, yLength - 8, 26, 0.8, 0, 0, 15.4, 'steel', 0);
    k.slab(f, 6, 48, 34, -yLength / 2 - 3, 0, 0, 'anodizedDark', 1.2, true);
    k.slab(f, 5, 20, 12, -yLength / 2 + 20, 0, 21, 'rubber', 1.5); // end-of-travel bumper
    // Home sensor on the outer flank.
    const out = Math.sign(x);
    k.box(8, 18, 10, x + out * 26, front + 60, -8, 'black', base, 1);
    k.box(1, 4, 3, x + out * 30.2, front + 60, -4, 'orange', base, 0);
  }
  // Y drag chain in a tray along the left side; its moving end follows the bridge.
  k.box(30, depth - 110, 3, -238, midY - 10, -16, 'anodizedDark', base, 0.5);
  k.box(2, depth - 110, 14, -252, midY - 10, -16, 'anodizedDark', base, 0.4);
  const chainMat = new THREE.MeshStandardMaterial({ color: 0x24282d, roughness: 0.55, metalness: 0.1 });
  const chainSide = new THREE.MeshStandardMaterial({ color: 0x3a4047, roughness: 0.5, metalness: 0.1 });
  S.chainMaterials = [chainMat, chainSide];
  S.chainYAnchor = rear - 80;
  S.chainY = createDragChain({ material: chainMat, sideMaterial: chainSide, pitch: 8, width: 20, height: 10, radius: 14, free: 400 });
  const cy = frame(base, -238, S.chainYAnchor, -8, '-y', 'z');
  cy.add(S.chainY.group);

  // ── bridge (moves in Y): saddles, cast uprights, X beam ──
  S.bridge = new THREE.Group();
  S.bridge.name = 'bridge';
  m.add(S.bridge);
  const b = S.bridge;
  const saddleTop = 25.8;
  for (const x of [-200, 200]) {
    k.box(64, 112, 10, x, beamY, 15.8, 'anodized', b, 1.5);
    for (const dy of [-44, 44]) for (const dx of [-22, 22]) k.screw(x + dx, beamY + dy, 26.2, b, 1.8);
    const col = frame(b, x, beamY, saddleTop, 'x', 'z');
    const top = beamZ - saddleTop;
    // The front edge stays behind the Z axis at every height, so the carriage clears the uprights at both ends
    // of its travel; the casting widens toward the rear instead.
    k.prism(col, [[-30, 0], [52, 0], [52, 12], [26, top - 24], [26, top], [-20, top], [-20, top - 24], [-30, 12]], 40, 'paint');
    // Machined pad and bolts where the beam lands, a rib on the outer face.
    const out = Math.sign(x);
    k.box(3, 30, top - 60, x + out * 20.5, beamY + 3, saddleTop + 24, 'paintAccent', b, 1);
    for (const dz of [14, top - 14]) for (const dy of [-10, 16]) k.screw(x + out * 21.6, beamY + dy, saddleTop + dz, b, 1.8, 'x');
  }
  // Chain bracket on the left saddle.
  k.box(46, 12, 4, -234, beamY + 34, 22, 'anodizedDark', b, 0.8);
  S.chainYAttach = beamY + 34;
  const beam = frame(b, 0, beamY + 3, beamMid, 'x', 'z');
  k.extrusion(beam, 480, 46, beamHeight, 'anodized');
  for (const x of [-244, 244]) k.box(8, 54, beamHeight + 8, x, beamY + 3, beamZ - 4, 'anodizedDark', b, 1.5);
  k.box(470, 46, 2, 0, beamY + 3, beamZ + beamHeight, 'anodizedDark', b, 0.5);
  const railZ = [beamMid - 16, beamMid + 16];
  for (const z of railZ) k.linearRail(frame(b, 0, beamY - 20, z, 'x', '-y'), 440, { width: 12, height: 8 });
  k.ballScrew(frame(b, 0, beamY - 29, beamMid, 'x', '-y'), 416, { r: 5, nut: null, support: [16, 20, 18] });
  // X drive: coupling housing and stepper beyond the right end plate.
  k.box(26, 40, 40, 261, beamY - 29, beamMid - 20, 'anodizedDark', b, 2);
  const xMotor = k.stepper(frame(b, 274, beamY - 29, beamMid, '-x', 'z'), { size: 42, length: 50 });
  for (const x of [-222, 222]) {
    k.box(12, 9, 11, x, beamY - 25, beamZ - 13, 'black', b, 1);
    k.box(4, 1, 3, x, beamY - 29.8, beamZ - 9, 'orange', b, 0);
  }
  for (const x of [-226, 226]) k.box(5, 14, 20, x, beamY - 29, beamMid - 10, 'rubber', b, 1.5);
  // Air bulkhead fitting at the beam's left end (the R75 supply line passes through it).
  const beamTop = beamZ + beamHeight + 2;
  k.box(18, 18, 12, -205, beamY + 3, beamTop, 'black', b, 1);
  k.cyl(4, 10, -205, beamY + 3, beamTop + 12, 'brass', b);
  S.airFitting = new THREE.Object3D();
  S.airFitting.position.set(-205, beamY + 3, beamTop + 22);
  b.add(S.airFitting);
  S.supplyFitting = new THREE.Object3D();
  S.supplyFitting.position.set(-214, beamY + 3, beamTop + 6);
  b.add(S.supplyFitting);
  // X drag chain along the beam top.
  S.chain = createDragChain({ material: chainMat, sideMaterial: chainSide, free: 200 });
  S.chain.group.position.set(0, beamY + 3, beamTop + 6);
  S.chain.group.userData.ownedMaterials = [chainMat, chainSide];
  b.add(S.chain.group);
  k.box(28, 30, 4, 0, beamY + 3, beamTop, 'steelDark', b, 0.8);
  // Lead from the X motor into the beam end.
  xMotor.updateWorldMatrix(true, false);
  b.updateWorldMatrix(true, false);
  const lead = b.worldToLocal(xMotor.userData.cable.getWorldPosition(new THREE.Vector3()));
  k.cable(b, [lead, lead.clone().add(new THREE.Vector3(0, 0, 16)), new THREE.Vector3(258, beamY + 10, beamTop + 14), new THREE.Vector3(236, beamY + 3, beamTop + 4)], 2.2);

  // ── X carriage (moves along the beam): bearing blocks, ball nut, plate, Z axis ──
  S.carriage = new THREE.Group();
  S.carriage.name = 'x carriage';
  b.add(S.carriage);
  const cr = S.carriage;
  for (const z of railZ) {
    const fb = frame(cr, 0, beamY - 20, z, 'x', '-y');
    for (const x of [-27, 27]) k.bearingBlock(fb, x, { width: 26, length: 36, total: 14, railHeight: 8 });
  }
  const nut = frame(cr, 0, beamY - 29, beamMid, 'x', '-y');
  k.pin(nut, 10, 24, 'x', 0, 0, 0, 'steelDark', 24);
  k.pin(nut, 14, 5, 'x', -12, 0, 0, 'steel', 24);
  k.slab(nut, 20, 22, 6, 6, 0, 4, 'anodizedDark', 1);
  // 100 mm wide: at ±150 mm of travel its edge stops 6 mm short of the screw's bearing supports.
  k.box(100, 6, 96, 0, beamY - 37, beamMid - 48, 'anodized', cr, 2);
  for (const x of [-43, 43]) for (const z of [beamMid - 40, beamMid + 40]) k.screw(x, beamY - 40.4, z, cr, 1.8, 'y');
  // Z axis: U-shaped body, two rails, ball screw, top bearing plate, coupling housing and stepper.
  const zLen = zTop - 60;
  const zMid = 60 + zLen / 2;
  const yz = 62 + stackY; // the body's front face (rails stand on it toward the operator)
  k.box(76, 8, zLen, 0, yz + 4, 60, 'anodized', cr, 1.5);
  for (const x of [-36, 36]) k.box(4, 18, zLen, x, yz - 7, 60, 'anodized', cr, 1);
  for (const x of [-20, 20]) k.linearRail(frame(cr, x, yz, zMid, 'z', '-y'), zLen - 20, { width: 10, height: 8 });
  k.ballScrew(frame(cr, 0, yz - 8, zMid, 'z', '-y'), zLen - 50, { r: 4, nut: null, support: [12, 16, 14] });
  k.box(80, 30, 8, 0, yz - 5, zTop, 'anodizedDark', cr, 1.5);
  k.box(40, 40, 22, 0, yz - 7, zTop + 8, 'anodizedDark', cr, 2);
  const zMotor = k.stepper(frame(cr, 0, yz - 7, zTop + 30, '-z', 'y'), { size: 42, length: 46 });
  k.box(80, 8, 6, 0, yz + 4, 54, 'anodizedDark', cr, 1); // lower end stop
  place(cr, warningLabel(), -26, beamY - 40.1, beamMid + 26);
  cr.children.at(-1)?.rotateX(Math.PI / 2);
  // Chain bracket from the Z body to the X chain's moving end, and the Z motor lead to it.
  const chainTop = beamTop + 6 + 32 + 7;
  k.box(30, beamY - 56, 4, 0, (beamY + 3 + yz + 4) / 2, chainTop, 'anodizedDark', cr, 0.8);
  k.box(30, 6, Math.max(4, chainTop - zTop + 4), 0, yz + 8, Math.min(zTop, chainTop) - 2, 'anodizedDark', cr, 0.8);
  zMotor.updateWorldMatrix(true, false);
  cr.updateWorldMatrix(true, false);
  const zl = cr.worldToLocal(zMotor.userData.cable.getWorldPosition(new THREE.Vector3()));
  k.cable(cr, [zl, zl.clone().add(new THREE.Vector3(0, 14, -4)), new THREE.Vector3(8, beamY - 6, chainTop + 14), new THREE.Vector3(4, beamY + 3, chainTop + 4)], 2.2);
  return { zTop };
}

// Z slide: the plate that moves with the tool, on four bearing blocks, with the ball-nut bracket.
export function buildZSlide(S, k, pcp, stackY) {
  const t = S.tool;
  const z0 = pcp ? 130 : 70;
  const h = pcp ? 140 : 125;
  const yz = 62 + stackY;
  k.box(66, 8, h, 0, 42 + stackY, z0, 'anodized', t, 1.5);
  for (const x of [-20, 20]) for (const z of [z0 + 22, z0 + h - 22]) k.bearingBlock(frame(t, x, yz, z, 'z', '-y'), 0, { width: 22, length: 30, total: 16, railHeight: 8 });
  k.box(24, 12, 26, 0, yz - 14, z0 + h / 2 - 13, 'steelDark', t, 1);
  for (const x of [-26, 26]) for (const z of [z0 + 8, z0 + h - 8]) k.screw(x, 37.6 + stackY, z, t, 1.6, 'y');
}

// Accessories every dispensing robot has on its table: a needle (tip) locator and a purge cup.
export function buildAccessories(S, k, c) {
  const fw = Math.min(c.width + 24, 310) / 2;
  const fd = Math.min(c.depth + 24, 310) / 2;
  if (fw > 108 && fd > 108) return; // the fixture takes the corner
  const g = new THREE.Group();
  g.name = 'needle locator and purge cup (illustrative)';
  S.machine.add(g);
  S.accessories = g;
  const x = fw > 108 ? 0 : 132;
  const y = fw > 108 ? 132 : fd > 108 ? -132 : 132;
  // Tip locator: block with a V-notch sensor head.
  k.box(34, 34, 14, x, y, 0, 'anodizedDark', g, 1.5);
  k.box(22, 22, 10, x, y, 14, 'anodized', g, 1);
  k.cyl(3.2, 1.2, x, y, 24, 'hole', g, 20);
  k.box(4, 10, 6, x + 15, y, 16, 'orange', g, 0.6);
  for (const dx of [-12, 12]) for (const dy of [-12, 12]) k.screw(x + dx, y + dy, 14.3, g, 1.5);
  // Purge cup beside it.
  const px = fw > 108 ? 40 : x;
  const py = fw > 108 ? y : y - 42 * Math.sign(y);
  k.box(30, 30, 6, px, py, 0, 'anodizedDark', g, 1);
  k.cyl(12, 22, px, py, 6, 'cover', g, 32);
  k.cyl(10, 0.6, px, py, 28, 'hole', g, 32);
}

// Bench: laminate top with an ESD mat, the air dispenser, its foot switch, a filter-regulator and the pendant.
export function buildBench(S, k) {
  const env = S.environment;
  k.box(1300, 900, 40, -90, 40, DECK - 42, 'bench', env, 4);
  k.box(1300, 6, 40, -90, -413, DECK - 42, 'wood', env, 1);
  k.box(1120, 760, 2, -90, 40, DECK - 2, 'mat', env, 1);
  // Mat ground snap and earthing lead are routine ESD bench details.
  k.cyl(6, 3, 420, -260, DECK, 'steel', env);
  k.cable(env, [new THREE.Vector3(420, -260, DECK + 2), new THREE.Vector3(470, -300, DECK + 4), new THREE.Vector3(500, -372, DECK + 2)], 1.4, 'green');
}

export function buildController(S, k) {
  const g = new THREE.Group();
  g.name = 'air dispenser controller (generic)';
  g.position.set(-410, -60, DECK);
  S.machine.add(g);
  const w = 200;
  const d = 210;
  const h = 78;
  k.box(w, d, h, 0, 0, 4, 'paint', g, 5);
  for (const x of [-80, 80]) for (const y of [-85, 85]) k.cyl(7, 4, x, y, 0, 'rubber', g);
  // Front panel.
  const p = frame(g, 0, -d / 2, 4 + h / 2, 'x', '-y');
  k.slab(p, w - 10, h - 10, 1.6, 0, 0, 0.8, 'anodizedDark', 1);
  S.lcd = createLcd();
  if (S.lcd) {
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(70, 30), new THREE.MeshBasicMaterial({ map: S.lcd.texture, toneMapped: false }));
    screen.position.set(-48, 12, 2.2);
    screen.userData.ownedMaterials = [screen.material];
    p.add(screen);
    k.slab(p, 78, 38, 1.2, -48, 12, 1.4, 'black', 0.8);
  }
  for (const [x, mat] of [[-76, 'green'], [-58, 'keys'], [-40, 'keys'], [-22, 'red']]) k.slab(p, 13, 9, 1.6, x, -20, 2, mat, 1);
  // Pressure regulator with its locking ring, and the gauge it sets.
  k.pin(p, 15, 3, 'z', 30, 12, 1.8, 'steel', 32);
  k.pin(p, 12.5, 16, 'z', 30, 12, 10, 'motor', 28);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    k.slab(p, 1.2, 2.4, 13, 30 + 12.6 * Math.cos(a), 12 + 12.6 * Math.sin(a), 10.5, 'keys', 0).rotation.z = a;
  }
  k.pin(p, 17, 6, 'z', 74, 12, 3.4, 'steel', 36);
  const face = new THREE.Mesh(new THREE.CircleGeometry(14.5, 40), new THREE.MeshStandardMaterial({ color: 0xf4f3ee, map: S.finishes?.dial ?? null, roughness: 0.6 }));
  face.position.set(74, 12, 6.6);
  face.userData.ownedMaterials = [face.material];
  p.add(face);
  const pivot = new THREE.Group();
  pivot.position.set(74, 12, 7.2);
  p.add(pivot);
  k.slab(pivot, 1.1, 12, 0.5, 0, 4.5, 0, 'red', 0);
  S.gaugeNeedle = pivot;
  k.pin(p, 1.8, 1.4, 'z', 74, 12, 7.6, 'motor', 12);
  // Vacuum (suck-back) trim, power rocker, air-out quick coupling and the foot-switch socket.
  k.pin(p, 7, 9, 'z', 30, -20, 5.5, 'motor', 24);
  k.slab(p, 16, 11, 3, 74, -20, 2.5, 'red', 1);
  k.pin(p, 6, 10, 'z', -6, -20, 6, 'steel', 6);
  k.pin(p, 4.2, 5, 'z', -6, -20, 13, 'brass', 16);
  S.supplyOutlet = new THREE.Object3D();
  S.supplyOutlet.position.set(-6, -20, 17);
  p.add(S.supplyOutlet);
  place(p, createLabel(70, 8, (ctx, cw, ch) => {
    ctx.fillStyle = '#2a2d31';
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = '#d9dcdf';
    ctx.font = `bold ${Math.round(ch * 0.6)}px 'Segoe UI', system-ui, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText('TIME-PRESSURE DISPENSER  0–100 psi', 6, ch / 2);
  }), -48, 32, 1.75);
  // Rear: plant air in.
  k.cyl(5, 12, 60, d / 2 + 6, 44, 'brass', g).rotation.x = Math.PI / 2;
  const airIn = new THREE.Vector3(60, d / 2 + 12, 44);
  // Foot switch on the bench with its lead to the socket under the panel.
  const pedal = new THREE.Group();
  pedal.position.set(-70, -185, 0);
  g.add(pedal);
  k.box(74, 112, 8, 0, 0, 0, 'motor', pedal, 2);
  const top = k.box(66, 100, 6, 0, -4, 16, 'paintAccent', pedal, 2);
  top.rotation.x = -0.14;
  k.cable(g, [new THREE.Vector3(-70, -129, 8), new THREE.Vector3(-58, -120, 4), new THREE.Vector3(0, -117, 6), new THREE.Vector3(30, -113, 14), new THREE.Vector3(34, -d / 2 - 3, 24)], 1.8);
  // Filter-regulator on a bench post at the rear, feeding the controller.
  const frl = new THREE.Group();
  frl.position.set(-40, 250, 0);
  g.add(frl);
  k.box(50, 40, 6, 0, 0, 0, 'anodizedDark', frl, 1);
  k.box(8, 30, 130, 0, 12, 6, 'anodizedDark', frl, 1);
  k.box(44, 40, 40, 0, -12, 80, 'cover', frl, 3);
  k.cyl(15, 46, 0, -12, 34, 'glass', frl, 28).castShadow = false;
  k.cyl(13, 6, 0, -12, 30, 'motor', frl, 28);
  k.cyl(13, 24, 0, -12, 120, 'motor', frl, 28);
  const dial = k.cyl(12, 5, 0, -34, 100, 'steel', frl, 28);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0, -34.5, 100);
  for (const s of [-1, 1]) k.rod(4.5, 12, 'x', s * 28, -12, 100, 'brass', frl);
  const blue = new THREE.MeshStandardMaterial({ color: 0x3f8de0, roughness: 0.3, transparent: true, opacity: 0.9 });
  S.staticHoseMaterial = blue;
  k.cable(g, [new THREE.Vector3(-6, 238, 100), new THREE.Vector3(30, 236, 104), new THREE.Vector3(62, 190, 70), airIn.clone().add(new THREE.Vector3(0, 26, 4)), airIn], 3, blue);
  k.cable(g, [new THREE.Vector3(-74, 238, 100), new THREE.Vector3(-130, 250, 96), new THREE.Vector3(-190, 330, 40), new THREE.Vector3(-230, 430, 6)], 3, blue);
  return g;
}

// Teach pendant on the bench, tilted on its stand, with a coiled lead to the connector on the base front.
export function buildPendant(S, k) {
  const g = new THREE.Group();
  g.name = 'teach pendant (illustrative)';
  g.position.set(-205, -310, DECK);
  S.machine.add(g);
  S.pendant = g;
  const tilt = new THREE.Group();
  tilt.rotation.x = 0.32;
  tilt.position.z = 6;
  g.add(tilt);
  k.box(96, 176, 24, 0, 0, 0, 'graphite', tilt, 5);
  k.box(84, 20, 30, 0, 78, -16, 'graphite', tilt, 4); // stand under the top edge
  const screen = k.box(70, 46, 1, 0, 46, 24, 'screen', tilt, 0.4);
  screen.castShadow = false;
  for (let r = 0; r < 5; r++) for (let col = 0; col < 4; col++) k.box(14, 12, 2.2, -27 + col * 18, 6 - r * 17, 24, col === 3 && r < 2 ? 'paintAccent' : 'keys', tilt, 0.8);
  k.cyl(7, 2, 30, 78, 24, 'yellow', tilt, 24);
  k.cyl(5, 5, 30, 78, 26, 'red', tilt, 24);
  // Coiled lead.
  S.machine.updateWorldMatrix(true, true);
  const end = g.worldToLocal(S.pendantPort.getWorldPosition(new THREE.Vector3()));
  const start = new THREE.Vector3(0, 96, 26);
  const pts = [start, start.clone().add(new THREE.Vector3(0, 20, -8))];
  const turns = 9;
  const a = pts[1];
  const bEnd = end.clone().add(new THREE.Vector3(0, -22, -6));
  for (let i = 1; i <= turns * 6; i++) {
    const t = i / (turns * 6);
    const p = a.clone().lerp(bEnd, t);
    const ang = t * turns * 2 * Math.PI;
    p.x += 5 * Math.cos(ang) * (1 - Math.abs(2 * t - 1) * 0.3);
    p.z += 5 * Math.sin(ang) + 4;
    pts.push(p);
  }
  pts.push(bEnd, end);
  k.cable(g, pts, 1.5);
}

// Hub colours of general-purpose dispensing tips by gauge (the usual trade convention; makers differ a little).
const HUB_COLOURS = { 14: 0x7d8a3a, 15: 0xe0a030, 16: 0x8f969c, 17: 0xc8ccd0, 18: 0x2f9e55, 19: 0x8a5a36, 20: 0xe98cb0, 21: 0x7a4fb0, 22: 0x2f6fd6, 23: 0xf08a24, 25: 0xd8283a };

/**
 * The dispensing tip as it is fitted (v3.0). A bore from the gauge table is a luer-lock tip: an adapter from the
 * cartridge thread (or the pump outlet), the coloured hub and a stainless cannula with the gauge's real outer
 * diameter, 12.7 mm (½ in) long. Returns null for other bores (the tapered nozzle is drawn instead). TCP is the
 * cannula's lower end at local z = 0; `length` is the height of the adapter's upper face.
 */
export function createNeedle(k, c) {
  const gauge = GAUGES.find((g) => Math.abs(g.id - c.diameter) < 1e-6);
  if (!gauge) return null;
  const group = new THREE.Group();
  group.name = `luer-lock dispensing tip ${gauge.gauge}G (illustrative)`;
  const outer = needleOuterDiameter(c.diameter);
  const cannula = 12.7;
  const hub = 17;
  const adapter = 13;
  const lathe = (points, material, segments = 40) => {
    const g = new THREE.LatheGeometry(points.map(([r, z]) => new THREE.Vector2(r, z)), segments);
    g.rotateX(Math.PI / 2);
    const mesh = k.mesh(g, material, group, { edges: false });
    mesh.castShadow = false;
    return mesh;
  };
  const r = c.diameter / 2;
  const ro = outer / 2;
  // Cannula: a tube with its bore open at the tip.
  lathe([[r, 0], [ro, 0], [ro, cannula + 3], [r, cannula + 3], [r, 0]], 'steel', 28);
  // Hub: cone over the cannula, body, and the two luer-lock ears.
  const hubMaterial = new THREE.MeshPhysicalMaterial({ color: HUB_COLOURS[gauge.gauge] ?? 0xd8d4c6, roughness: 0.4, metalness: 0, clearcoat: 0.4, transparent: true, opacity: HUB_COLOURS[gauge.gauge] ? 0.96 : 0.8 });
  group.userData.ownedMaterials = [hubMaterial];
  const hr = Math.max(ro + 0.6, 1.6);
  lathe([[ro, cannula], [hr, cannula], [3.1, cannula + 6], [3.3, cannula + hub - 3], [3.9, cannula + hub - 3], [3.9, cannula + hub], [2.1, cannula + hub], [2.1, cannula + 4], [ro, cannula + 3], [ro, cannula]], hubMaterial, 32);
  for (const s of [-1, 1]) {
    const ear = k.mesh(new THREE.BoxGeometry(3.4, 2.2, 1.6), hubMaterial, group, { edges: false });
    ear.position.set(s * 4.9, 0, cannula + hub - 1.6);
    ear.castShadow = false;
  }
  // Adapter: luer-lock collar, hex body, thread stub into the cartridge or pump outlet.
  const z = cannula + hub;
  lathe([[2.2, z - 6], [5.4, z - 6], [5.4, z + 3], [2.2, z + 3], [2.2, z - 6]], 'steel', 32);
  lathe([[2.2, z + 3], [7.2, z + 3], [7.2, z + adapter - 3], [2.2, z + adapter - 3], [2.2, z + 3]], 'steel', 6);
  lathe([[2.2, z + adapter - 3], [6, z + adapter - 3], [6, z + adapter], [2.2, z + adapter], [2.2, z + adapter - 3]], 'steelDark', 28);
  return { group, length: z + adapter, gauge: gauge.gauge, outer };
}
