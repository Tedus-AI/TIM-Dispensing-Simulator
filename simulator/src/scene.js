import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { dotDimensions, beadProfile, BEAD_SIDES } from './engine.js';
import { createCartridgeAssembly } from './cartridge-assembly.js';
import { createPumpStation } from './pump-station.js';
import { createC300Enclosure } from './c300-enclosure.js';
import { createPcpHead } from './pcp-head.js';
import { buildHoseGeometry } from './visual-hose.js';
import { R75_NOZZLE } from './hardware-reference.js';
import { pointOnPath } from './path-planning.js';
import { MATERIALS } from './materials.js';
import { createPalette, PartKit, createDragChain, createLcd } from './scene-parts.js';
import { createCompressionScene } from './compression-scene.js';

// ───────────────────────── Geometry helpers (mm, Z up) ─────────────────────────

// Visual nozzle dimensions are independent of the equivalent hydraulic length.
// The 63.5 mm R75 candidate is split into 56.5 mm exposed plus an assumed 7 mm inserted stem.
function nozzleGeometry(bore, length) {
  const r = bore / 2;
  const outer = r + 0.55;
  const top = Math.max(5, outer + 0.4);
  const points = [
    [r, 0],
    [outer, 0],
    [outer + 0.12, Math.min(2, length * 0.12)],
    [top, length],
    [r, length],
    [r, 0],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(points, 64);
  g.rotateX(Math.PI / 2);
  return g;
}

function nozzleStemGeometry(bore, length) {
  // Visual insert into the female outlet; no exact 1/4 NPT thread geometry is claimed.
  const r = bore / 2;
  const insert = R75_NOZZLE.assumedInsertionMm;
  const p = [
    [r, length],
    [6.2, length],
    [6.2, length + insert],
    [r, length + insert],
    [r, length],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(p, 48);
  g.rotateX(Math.PI / 2);
  return g;
}

function volumeOf(g) {
  const a = g.attributes.position;
  const ix = g.index;
  let v = 0;
  for (let i = 0; i < (ix ? ix.count : a.count); i += 3) {
    const j = ix ? ix.getX(i) : i;
    const k = ix ? ix.getX(i + 1) : i + 1;
    const l = ix ? ix.getX(i + 2) : i + 2;
    v +=
      (a.getX(j) * (a.getY(k) * a.getZ(l) - a.getZ(k) * a.getY(l)) +
        a.getY(j) * (a.getZ(k) * a.getX(l) - a.getX(k) * a.getZ(l)) +
        a.getZ(j) * (a.getX(k) * a.getY(l) - a.getY(k) * a.getX(l))) /
      6;
  }
  return Math.abs(v);
}

// Shared bead mesh builder: rings at each grid node, a flat underside, no internal caps.
function beadGeometry(deposits, cellLength, ratio, ringAt) {
  const profile = beadProfile(deposits, cellLength, ratio);
  const n = deposits.length;
  const sides = BEAD_SIDES;
  const m = sides + 1;
  const pos = [];
  const idx = [];
  for (let i = 0; i <= n; i++) {
    const p = ringAt(i);
    for (let j = 0; j <= sides; j++) {
      const a = (j * Math.PI) / sides;
      const w = (profile.widths[i] * Math.cos(a)) / 2;
      pos.push(p.x + p.nx * w, p.y + p.ny * w, profile.heights[i] * Math.sin(a));
    }
  }
  for (let i = 0; i < n; i++)
    for (let j = 0; j < sides; j++) {
      const a = i * m + j;
      idx.push(a, a + 1, a + m + 1, a, a + m + 1, a + m);
    }
  // Duplicate only the underside edge vertices to keep its flat normals off the curved surface.
  const bottom = pos.length / 3;
  for (let i = 0; i <= n; i++) {
    const p = ringAt(i);
    const w = profile.widths[i] / 2;
    pos.push(p.x + p.nx * w, p.y + p.ny * w, 0, p.x - p.nx * w, p.y - p.ny * w, 0);
  }
  for (let i = 0; i < n; i++) {
    const a = bottom + 2 * i;
    idx.push(a, a + 2, a + 3, a, a + 3, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.userData.unitVolume = volumeOf(g);
  return g;
}

// One watertight surface with shared longitudinal rings: no internal end caps or overlapping slices.
function continuousLineGeometry(deposits, cellLength, ratio) {
  return beadGeometry(deposits, cellLength, ratio, (i) => ({ x: i * cellLength, y: 0, nx: 0, ny: 1 }));
}

// Bins follow path arc length; the nozzle footprint may extend beyond the ends, so extend the end
// tangent. Bent rings are a geometric illustration; crossings are not a material union.
function continuousPathGeometry(deposits, cellLength, ratio, path, gridStart) {
  return beadGeometry(deposits, cellLength, ratio, (i) => {
    const s = gridStart + i * cellLength;
    const q = pointOnPath(path, s);
    const extra = s - Math.max(0, Math.min(path.length, s));
    return { x: q.x + q.tx * extra, y: q.y + q.ty * extra, nx: -q.ty, ny: q.tx };
  });
}

// Heat-source footprint: a coordinate guide, not the chip itself.
function createPatternSource(settings, z) {
  const group = new THREE.Group();
  const w = settings.width;
  const d = settings.shape === 'circle' ? w : settings.depth;
  const fill = new THREE.MeshBasicMaterial({ color: 0x19b5c2, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false });
  const edge = new THREE.LineBasicMaterial({ color: 0x0a8f9c, transparent: true, opacity: 0.95, depthWrite: false });
  const geometry = settings.shape === 'circle' ? new THREE.CircleGeometry(w / 2, 96) : new THREE.PlaneGeometry(w, d);
  const mesh = new THREE.Mesh(geometry, fill);
  mesh.position.z = z + 0.003;
  mesh.renderOrder = 1;
  group.add(mesh);
  const pts =
    settings.shape === 'circle'
      ? Array.from({ length: 97 }, (_, i) => new THREE.Vector3((w / 2) * Math.cos((i * 2 * Math.PI) / 96), (w / 2) * Math.sin((i * 2 * Math.PI) / 96), z + 0.006))
      : [
          [-w / 2, -d / 2],
          [w / 2, -d / 2],
          [w / 2, d / 2],
          [-w / 2, d / 2],
          [-w / 2, -d / 2],
        ].map(([x, y]) => new THREE.Vector3(x, y, z + 0.006));
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), edge);
  line.renderOrder = 2;
  group.add(line);
  group.position.set(settings.offsetX, settings.offsetY, 0);
  group.name = '設定的熱源參考輪廓';
  group.userData.ownedMaterials = [fill, edge];
  return group;
}

function lineGeometry() {
  const n = 32;
  const pos = [];
  const idx = [];
  for (const x of [-0.5, 0.5])
    for (let j = 0; j <= n; j++) {
      const a = (j * Math.PI) / n;
      pos.push(x, Math.cos(a) / 2, Math.sin(a));
    }
  const m = n + 1;
  for (let j = 0; j < m; j++) {
    const k = (j + 1) % m;
    idx.push(j, k, m + k, j, m + k, m + j);
  }
  const capStart = pos.length / 3;
  for (const x of [-0.5, 0.5])
    for (let j = 0; j <= n; j++) {
      const a = (j * Math.PI) / n;
      pos.push(x, Math.cos(a) / 2, Math.sin(a));
    }
  for (let j = 1; j < n; j++) idx.push(capStart, capStart + j + 1, capStart + j, capStart + m, capStart + m + j, capStart + m + j + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.userData.unitVolume = volumeOf(g);
  return g;
}

function capGeometry(ratio) {
  const b = 1;
  const h = 2 * ratio;
  const R = (b * b + h * h) / (2 * h);
  const z0 = h - R;
  const theta = Math.acos((R - h) / R);
  const radial = 48;
  const rings = 16;
  const pos = [0, 0, h];
  const idx = [];
  for (let j = 1; j <= rings; j++) {
    const a = (theta * j) / rings;
    const r = R * Math.sin(a);
    const z = z0 + R * Math.cos(a);
    for (let k = 0; k < radial; k++) {
      const t = (k * 2 * Math.PI) / radial;
      pos.push(r * Math.cos(t), r * Math.sin(t), z);
    }
  }
  for (let k = 0; k < radial; k++) idx.push(0, 1 + k, 1 + ((k + 1) % radial));
  for (let j = 0; j < rings - 1; j++)
    for (let k = 0; k < radial; k++) {
      const a = 1 + j * radial + k;
      const bb = 1 + j * radial + ((k + 1) % radial);
      idx.push(a, a + radial, bb, bb, a + radial, bb + radial);
    }
  const center = pos.length / 3;
  pos.push(0, 0, 0);
  const start = 1 + (rings - 1) * radial;
  for (let k = 0; k < radial; k++) idx.push(center, start + ((k + 1) % radial), start + k);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.userData.unitVolume = volumeOf(g);
  return g;
}

function gradientTexture(top, bottom) {
  if (typeof document === 'undefined') return new THREE.Color(bottom);
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const VIEW_LABELS = { whole: '全機', work: '工作區', head: '機頭', feed: '供膠站', close: '點膠近看', heat: '熱源特寫', follow: '局部跟隨' };

// ───────────────────────── Scene ─────────────────────────

export class DispenseScene {
  constructor(host, { onScale, onView } = {}) {
    this.host = host;
    this.onScale = onScale;
    this.onView = onView;
    this.mode = 'close';
    this.config = null;
    this.counter = { parts: 0 };
    this.isoCorner = 2;
    this.freeOrbit = false;
    this.projection = 'ortho';
    this.showExitPath = true;
    this.showPlannedPath = true;
    this.theme = 'light';
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(this.renderer.domElement);
    const canvas = this.renderer.domElement;
    canvas.setAttribute('aria-label', '毫米比例的點膠機台 3D 場景；可拖曳、滾輪縮放，Home 重設');
    canvas.setAttribute('tabindex', '0');
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.7;
    pmrem.dispose();
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x6d7a86, 0.9);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xfff4e6, 2.4);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0002;
    this.sun.shadow.normalBias = 0.6;
    this.scene.add(this.sun, this.sun.target);
    const rim = new THREE.DirectionalLight(0xc9dcff, 0.8);
    rim.position.set(400, 600, 300);
    this.scene.add(rim);
    this.setTheme('light');

    this.ortho = new THREE.OrthographicCamera(-150, 150, 100, -100, 0.1, 20000);
    this.persp = new THREE.PerspectiveCamera(32, 1, 1, 30000);
    this.ortho.up.set(0, 0, 1);
    this.persp.up.set(0, 0, 1);
    this.camera = this.ortho;
    this.makeControls();
    this.palette = createPalette();
    this.kit = new PartKit(this.palette, this.counter);
    this.glue = new THREE.MeshPhysicalMaterial({ color: MATERIALS.putty.color, roughness: 0.48, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.4, sheen: 0.4 });
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    canvas.addEventListener('keydown', (e) => {
      if (e.key === '+' || e.key === '=') this.zoomBy(1.2);
      else if (e.key === '-') this.zoomBy(1 / 1.2);
      else if (e.key === 'Home') this.fit(this.mode);
      else return;
      e.preventDefault();
    });
  }

  makeControls() {
    this.controls?.dispose();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.minZoom = 0.2;
    this.controls.maxZoom = 40;
    this.controls.minDistance = 20;
    this.controls.maxDistance = 20000;
    this.controls.minPolarAngle = 0.01;
    this.controls.maxPolarAngle = Math.PI - 0.01;
    this.controls.zoomToCursor = true;
    this.controls.addEventListener('change', () => this.render());
    this.applyOrbitMode();
  }

  applyOrbitMode() {
    const free = this.freeOrbit;
    this.controls.enableRotate = free;
    this.controls.mouseButtons.LEFT = free ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN;
    this.controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
    this.controls.touches.ONE = free ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN;
    this.controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
  }

  setTheme(theme) {
    this.theme = theme;
    const dark = theme === 'dark';
    this.scene.background?.dispose?.();
    this.scene.background = gradientTexture(dark ? '#243042' : '#f4f7fb', dark ? '#0d1218' : '#cdd6e1');
    this.hemi.intensity = dark ? 0.7 : 0.9;
    this.render();
  }

  // ── Build ──
  disposeGroup(group) {
    if (!group) return;
    group.traverse((o) => {
      o.geometry?.dispose();
      for (const m of o.userData?.ownedMaterials || []) m.dispose();
    });
    group.removeFromParent();
  }

  rebuild(c, run) {
    this.clearCompression();
    this.imported?.removeFromParent();
    for (const g of [this.machine, this.environment, this.depositGroup, this.patternSource, this.overlays]) this.disposeGroup(g);
    this.chain?.dispose();
    this.hose?.material.dispose();
    this.supplyHose?.material.dispose();
    this.stationAirHose?.material.dispose();
    Object.assign(this, { cartridge: null, pumpStation: null, head: null, hose: null, supplyHose: null, stationAirHose: null, chain: null, lcd: null, lastHose: null, enclosure: null, stationAirAnchor: null });
    this.counter.parts = 0;
    this.config = c;
    this.run = run;
    const pcp = c.architecture === 'P300';
    const k = this.kit;
    this.glue.color.setHex((MATERIALS[c.material] || MATERIALS.putty).color);
    const nozzleLength = c.architecture === 'R75' ? R75_NOZZLE.nominalLengthMm - R75_NOZZLE.assumedInsertionMm : c.nozzleLength;
    this.visualNozzleLength = nozzleLength;
    this.machine = new THREE.Group();
    this.machine.name = 'machine';
    this.environment = new THREE.Group();
    this.depositGroup = new THREE.Group();
    this.overlays = new THREE.Group();
    this.scene.add(this.machine, this.environment, this.depositGroup, this.overlays);
    if (c.heatSource) {
      this.patternSource = createPatternSource(c.heatSource, c.surfaceZ);
      this.scene.add(this.patternSource);
    }

    if (pcp) this.buildCell(k);
    else this.buildBench(k);
    this.buildGantry(k, pcp);
    this.buildFixture(k, c);

    // Tool: TCP is the open nozzle bottom at local Z = 0; never scale extrusion or bore for the camera.
    this.tool = new THREE.Group();
    this.tool.name = 'tool';
    this.machine.add(this.tool);
    const stackY = pcp ? 4 : 0;
    this.buildZSlide(k, pcp, stackY);
    if (pcp) {
      this.head = createPcpHead();
      this.head.group.position.z = nozzleLength;
      this.tool.add(this.head.group);
      this.hoseStart = this.pumpStation.fluidPort;
      this.hoseEnd = this.head.inletPort;
    } else {
      this.cartridge = createCartridgeAssembly({ fillMaterial: this.glue });
      this.cartridge.group.position.z = nozzleLength;
      this.tool.add(this.cartridge.group);
      this.hoseStart = this.airFitting;
      this.hoseEnd = this.cartridge.airPort;
    }
    const nozzle = k.mesh(nozzleGeometry(c.diameter, nozzleLength), pcp ? 'steel' : 'polymer', this.tool, { edges: false });
    nozzle.castShadow = false;
    if (!pcp) k.mesh(nozzleStemGeometry(c.diameter, nozzleLength), 'polymer', this.tool, { edges: false }).castShadow = false;
    this.hose = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: pcp ? 0x1c2a33 : 0x3f8de0, roughness: pcp ? 0.6 : 0.25, metalness: 0, transparent: !pcp, opacity: pcp ? 1 : 0.85 }));
    this.hose.castShadow = true;
    this.hose.name = pcp ? '示意供膠管' : '示意供氣管';
    this.machine.add(this.hose);
    if (!pcp) {
      this.supplyHose = new THREE.Mesh(new THREE.BufferGeometry(), this.hose.material.clone());
      this.supplyHose.castShadow = true;
      this.machine.add(this.supplyHose);
    }

    // Flow column: a visual cue of material bridging nozzle and bead while the outlet flows.
    this.flowColumn = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 24, 1, true), this.glue);
    this.flowColumn.geometry.rotateX(Math.PI / 2);
    this.flowColumn.geometry.translate(0, 0, 0.5);
    this.flowColumn.visible = false;
    this.depositGroup.add(this.flowColumn);

    // Deposit mesh.
    this.lastDeposits = null;
    this.depositMeshes = [];
    if (c.mode === 'point') this.dotGeo = capGeometry(c.dotRatio);
    const geometry =
      c.mode === 'pattern'
        ? continuousPathGeometry(run.frames[0].deposits, run.cellLength, c.lineRatio, run.path, run.gridStart)
        : c.mode === 'line'
          ? continuousLineGeometry(run.frames[0].deposits, run.cellLength, c.lineRatio)
          : this.dotGeo;
    const bead = new THREE.Mesh(geometry, this.glue);
    bead.visible = false;
    bead.castShadow = bead.receiveShadow = true;
    this.depositGroup.add(bead);
    this.depositMeshes.push(bead);

    // Planned tool-centre path on the surface and the exit trajectory after lift.
    const planned =
      c.mode === 'pattern'
        ? run.path.points.map((p) => new THREE.Vector3(p.x, p.y, c.surfaceZ + 0.02))
        : c.mode === 'line'
          ? [new THREE.Vector3(c.offsetX - c.lineLength / 2, c.offsetY, c.surfaceZ + 0.02), new THREE.Vector3(c.offsetX + c.lineLength / 2, c.offsetY, c.surfaceZ + 0.02)]
          : [];
    this.plannedPath = new THREE.Line(new THREE.BufferGeometry().setFromPoints(planned), new THREE.LineDashedMaterial({ color: 0xf2a33a, dashSize: 1.2, gapSize: 0.8, transparent: true, opacity: 0.9 }));
    this.plannedPath.computeLineDistances();
    this.plannedPath.userData.ownedMaterials = [this.plannedPath.material];
    this.plannedPath.visible = this.showPlannedPath;
    this.overlays.add(this.plannedPath);
    const exitPoints = run.frames.filter((f) => f.t >= run.ending.liftStart - 0.01 && f.t <= run.ending.motionEnd + 0.01).map((f) => new THREE.Vector3(f.x, f.y, f.z));
    this.exitPath = new THREE.Line(new THREE.BufferGeometry().setFromPoints(exitPoints), new THREE.LineDashedMaterial({ color: 0xe0531f, dashSize: 0.7, gapSize: 0.4, transparent: true, opacity: 0.85 }));
    this.exitPath.computeLineDistances();
    this.exitPath.userData.ownedMaterials = [this.exitPath.material];
    this.exitPath.visible = this.showExitPath;
    this.overlays.add(this.exitPath);

    this.configureShadow(pcp);
    this.update(run.frames[0]);
    this.fit(this.mode, { animate: false });
  }

  configureShadow(pcp) {
    const s = pcp ? 700 : 420;
    this.sun.position.set(-260, -420, 900);
    this.sun.target.position.set(0, 40, 0);
    Object.assign(this.sun.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 10, far: 3000 });
    this.sun.shadow.camera.updateProjectionMatrix();
  }

  buildBench(k) {
    const env = this.environment;
    k.box(1180, 820, 40, -60, 40, -112, 'bench', env, 4);
    k.box(1040, 680, 2, -60, 40, -72, 'mat', env, 1);
    // Mat ground snap and earthing lead are routine ESD bench details.
    k.cyl(6, 3, 440, -280, -70, 'steel', env);
  }

  buildCell(k) {
    this.enclosure = createC300Enclosure();
    this.machine.add(this.enclosure);
    this.pumpStation = createPumpStation();
    this.pumpStation.group.position.set(-750, 0, -900);
    this.machine.add(this.pumpStation.group);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.MeshStandardMaterial({ color: 0x9aa3ad, roughness: 0.9 }));
    floor.position.z = -900.5;
    floor.receiveShadow = true;
    floor.userData.ownedMaterials = [floor.material];
    this.environment.add(floor);
    // A visual plant-air service port and line, not a measured pneumatic circuit.
    const anchor = new THREE.Group();
    anchor.position.set(-469.5, -300, -700);
    this.machine.add(anchor);
    this.stationAirAnchor = anchor;
    k.box(12, 32, 32, 0, 0, -16, 'black', anchor);
    k.rod(5, 14, 'x', -13, 0, 0, 'steel', anchor);
    this.stationAirSource = new THREE.Object3D();
    this.stationAirSource.position.x = -20;
    anchor.add(this.stationAirSource);
    this.stationAirHose = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: 0x2f7fd8, roughness: 0.4 }));
    this.stationAirHose.name = '示意外部氣源接管';
    this.machine.add(this.stationAirHose);
    this.pumpStation.group.updateMatrixWorld(true);
    anchor.updateMatrixWorld(true);
    this.stationAirHose.geometry = buildHoseGeometry(this.pumpStation.airPort.getWorldPosition(new THREE.Vector3()), this.stationAirSource.getWorldPosition(new THREE.Vector3()), 'stationAir', 3);
  }

  // Benchtop 3-axis gantry: fixed table, Y-moving bridge, X carriage, Z slide. Generic, not an OEM model.
  buildGantry(k, pcp) {
    const m = this.machine;
    const stackY = pcp ? 4 : 0;
    const beamY = 110 + stackY;
    this.beamY = beamY;
    // Base casting, feet and front operator strip.
    const base = new THREE.Group();
    base.name = 'base';
    m.add(base);
    k.box(420, 500, 40, 0, 60, -56, 'graphite', base, 3);
    k.box(408, 488, 3, 0, 60, -19, 'coverGrey', base, 1);
    for (const x of [-185, 185])
      for (const y of [-160, 280]) {
        k.cyl(16, 4, x, y, -70, 'rubber', base);
        k.cyl(9, 10, x, y, -66, 'steel', base);
      }
    // Operator controls on the front face (y = -190).
    const front = -190;
    k.box(150, 4, 30, 110, front - 2, -50, 'black', base, 1);
    k.cyl(10, 4, 165, front - 4, -40, 'yellow', base).rotation.x = Math.PI / 2;
    const estop = k.cyl(8, 8, 165, front - 10, -40, 'red', base);
    estop.rotation.x = Math.PI / 2;
    for (const [x, mat] of [
      [70, 'green'],
      [95, 'red'],
      [120, 'black'],
    ]) {
      const b = k.cyl(5, 4, x, front - 4, -36, mat, base, 20);
      b.rotation.x = Math.PI / 2;
    }
    k.box(90, 1, 16, -110, front - 0.5, -46, 'aluminum', base, 0.6);
    for (const z of [-42, -38, -34]) k.box(70, 0.6, 0.8, -110, front - 1.1, z, 'hole', base, 0);
    // Tooling plate with M6 grid and a millimetre scale on its front edge.
    k.box(320, 320, 16, 0, 0, -16, 'aluminum', base, 1.5);
    const holes = [];
    for (let x = -137.5; x <= 137.5; x += 25) for (let y = -137.5; y <= 137.5; y += 25) holes.push([x, y]);
    const holeGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.2, 16);
    holeGeo.rotateX(Math.PI / 2);
    const holeMesh = new THREE.InstancedMesh(holeGeo, this.palette.hole, holes.length);
    holes.forEach(([x, y], i) => holeMesh.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, y, 0.02)));
    holeMesh.receiveShadow = true;
    base.add(holeMesh);
    const ticks = [];
    for (let x = -150; x <= 150; x += 5) ticks.push(x);
    const tickGeo = new THREE.BoxGeometry(0.5, 1, 0.12);
    const tickMesh = new THREE.InstancedMesh(tickGeo, this.palette.black, ticks.length);
    ticks.forEach((x, i) => tickMesh.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(x, -157 + (x % 25 === 0 ? 2.5 : 1.25), 0.06), new THREE.Quaternion(), new THREE.Vector3(1, x % 25 === 0 ? 5 : 2.5, 1))));
    base.add(tickMesh);
    // Y axes: extrusion, rail, end stops, motors with belt covers.
    for (const x of [-190, 190]) {
      k.box(34, 470, 18, x, 60, -16, 'graphite', base, 1.5);
      k.box(15, 460, 10, x, 60, 2, 'steel', base, 0.4);
      for (let y = -160; y <= 280; y += 40) k.screw(x, y, 12.4, base, 1.4);
      for (const y of [-172, 292]) k.box(30, 8, 22, x, y, 2, 'orange', base, 1);
      k.box(46, 52, 46, x, 318, -16, 'black', base, 2);
      k.cyl(16, 4, x, 318, 30, 'steel', base);
      k.box(10, 40, 30, x + Math.sign(x) * 25, 318, -10, 'coverGrey', base, 1);
    }

    // Bridge (moves in Y): carriage blocks, columns, beam with X rails, ball screw, motor, cable chain.
    this.bridge = new THREE.Group();
    this.bridge.name = 'bridge';
    m.add(this.bridge);
    const b = this.bridge;
    for (const x of [-190, 190]) {
      for (const dy of [-22, 22]) k.box(30, 34, 14, x, beamY + dy, 12, 'steelDark', b, 1);
      k.box(56, 92, 10, x, beamY, 26, 'cobaltDark', b, 2);
      k.box(40, 52, 174, x, beamY, 36, 'cobalt', b, 3);
      k.box(44, 56, 6, x, beamY, 206, 'coverGrey', b, 2);
      for (const dy of [-18, 18]) for (const dx of [-18, 18]) k.screw(x + dx, beamY + dy, 36.6, b, 1.6);
    }
    k.box(440, 40, 50, 0, beamY, 205, 'cobalt', b, 3);
    k.box(400, 2, 36, 0, beamY + 20.5, 212, 'coverGrey', b, 0.6);
    for (const z of [212, 240]) {
      k.box(400, 6, 10, 0, beamY - 23, z - 5, 'steel', b, 0.4);
      for (let x = -180; x <= 180; x += 40) k.screw(x, beamY - 26.2, z, b, 1.2, 'y');
    }
    k.rod(4.5, 390, 'x', 0, beamY - 29, 226, 'steel', b);
    for (const x of [-212, 212]) k.box(10, 46, 56, x + Math.sign(x) * 5, beamY, 202, 'coverGrey', b, 2);
    // X motor beyond the right end cap, with flange and connector.
    k.box(50, 44, 44, 247, beamY, 208, 'black', b, 2);
    k.rod(16, 6, 'x', 275, beamY, 230, 'steel', b);
    k.box(10, 10, 10, 250, beamY - 26, 240, 'orange', b, 1);
    // Air bulkhead fitting at the beam's left end (R75 supply line passes through it).
    k.box(18, 18, 12, -200, beamY, 255, 'black', b, 1);
    k.cyl(4, 10, -200, beamY, 267, 'brass', b);
    this.airFitting = new THREE.Object3D();
    this.airFitting.position.set(-200, beamY, 277);
    b.add(this.airFitting);
    this.supplyFitting = new THREE.Object3D();
    this.supplyFitting.position.set(-209, beamY, 261);
    b.add(this.supplyFitting);
    // Drag chain along the beam top.
    const chainMat = new THREE.MeshStandardMaterial({ color: 0x24282d, roughness: 0.55, metalness: 0.1 });
    const chainSide = new THREE.MeshStandardMaterial({ color: 0xf07c1b, roughness: 0.5, metalness: 0.05 });
    this.chain = createDragChain({ material: chainMat, sideMaterial: chainSide, free: 200 });
    this.chain.group.position.set(0, beamY, 255 + 6);
    this.chain.group.userData.ownedMaterials = [chainMat, chainSide];
    b.add(this.chain.group);
    k.box(28, 30, 4, 0, beamY, 255, 'steelDark', b, 0.8);

    // X carriage (moves along the beam): bearing blocks, plate, Z column, Z rails, Z motor, chain bracket.
    this.carriage = new THREE.Group();
    this.carriage.name = 'x carriage';
    b.add(this.carriage);
    const cr = this.carriage;
    const zTop = pcp ? 380 : 300;
    for (const x of [-22, 22]) for (const z of [212, 240]) k.box(30, 8, 16, x, beamY - 30, z - 8, 'steelDark', cr, 1);
    k.box(90, 6, 80, 0, beamY - 37, 186, 'cover', cr, 2);
    k.box(70, 8, zTop - 60, 0, 66 + stackY, 60, 'cover', cr, 2);
    k.box(70, 2, zTop - 70, 0, 61 + stackY, 65, 'cobalt', cr, 0.5);
    for (const x of [-20, 20]) k.box(9, 6, zTop - 80, x, 57 + stackY, 70, 'steel', cr, 0.3);
    k.rod(3.5, zTop - 90, 'z', 0, 57 + stackY, 65 + (zTop - 90) / 2, 'steel', cr);
    k.box(44, 44, 54, 0, 66 + stackY, zTop, 'black', cr, 2);
    k.cyl(15, 4, 0, 66 + stackY, zTop + 54, 'steel', cr);
    k.box(12, 10, 10, 18, 66 + stackY, zTop + 40, 'orange', cr, 1);
    for (const x of [-28, 28]) for (const z of [80, zTop - 20]) k.screw(x, 61.8 + stackY - 1.2, z, cr, 1.6, 'y');
    k.box(30, beamY - 64, 6, 0, (beamY + 64) / 2, 255 + 30, 'steelDark', cr, 1);
  }

  // Z slide moves with the tool; it carries the cartridge clamp or the PCP mounting rail.
  buildZSlide(k, pcp, stackY) {
    const t = this.tool;
    const z0 = pcp ? 130 : 70;
    const h = pcp ? 140 : 125;
    k.box(64, 8, h, 0, 42 + stackY, z0, 'cobalt', t, 1.5);
    for (const x of [-20, 20]) for (const z of [z0 + 10, z0 + h - 30]) k.box(18, 8, 20, x, 50 + stackY, z, 'steelDark', t, 1);
    for (const x of [-24, 24]) for (const z of [z0 + 8, z0 + h - 8]) k.screw(x, 37.6 + stackY, z, t, 1.5, 'y');
  }

  buildFixture(k, c) {
    const m = this.machine;
    const fw = Math.min(c.width + 24, 310);
    const fd = Math.min(c.depth + 24, 310);
    this.fixture = new THREE.Group();
    this.fixture.name = 'fixture';
    m.add(this.fixture);
    const fh = Math.max(0, c.fixtureHeight - 2);
    for (const x of [-1, 1]) for (const y of [-1, 1]) k.cyl(5, Math.min(2, c.fixtureHeight), (x * fw) / 2.4, (y * fd) / 2.4, 0, 'steel', this.fixture);
    if (fh > 0.2) k.box(fw, fd, fh, 0, 0, Math.min(2, c.fixtureHeight), 'teal', this.fixture, 1.5);
    for (const [x, y] of [
      [-fw / 2 + 6, -fd / 2 + 6],
      [fw / 2 - 6, fd / 2 - 6],
      [fw / 2 - 6, -fd / 2 + 6],
      [-fw / 2 + 6, fd / 2 - 6],
    ])
      k.screw(x, y, c.fixtureHeight + 0.45, this.fixture, 2.2);
    // Locating pins against the workpiece left and rear edges.
    for (const [x, y] of [
      [-c.width / 2 - 3, -c.depth / 4],
      [-c.width / 2 - 3, c.depth / 4],
      [c.width / 4, c.depth / 2 + 3],
    ])
      if (Math.abs(x) < fw / 2 && Math.abs(y) < fd / 2) k.cyl(2.5, Math.min(c.thickness, 4) + 1, x, y, c.fixtureHeight, 'steel', this.fixture, 20);
    // Low-profile swing clamps at the front corners, outside the part.
    for (const s of [-1, 1]) {
      const x = s * (c.width / 2 - 10);
      const y = -c.depth / 2 - 7;
      if (Math.abs(y) > fd / 2) continue;
      k.cyl(5, 6, x, y, c.fixtureHeight, 'steelDark', this.fixture);
      k.box(8, 16, 3, x, y + 5, c.fixtureHeight + Math.min(c.thickness, 6), 'red', this.fixture, 1);
    }
    this.partHolder = new THREE.Group();
    this.partHolder.name = 'workpiece';
    m.add(this.partHolder);
    if (this.imported) {
      this.partHolder.add(this.imported);
      this.imported.position.set(0, 0, c.fixtureHeight);
    } else {
      // Generic die-cast housing plate (illustrative). Corner holes are drawn flush.
      k.box(c.width, c.depth, c.thickness, 0, 0, c.fixtureHeight, 'castAl', this.partHolder, Math.min(1.2, c.thickness / 4));
      for (const x of [-1, 1])
        for (const y of [-1, 1]) {
          const hx = x * (c.width / 2 - 6);
          const hy = y * (c.depth / 2 - 6);
          if (c.width > 30 && c.depth > 30) k.cyl(1.8, 0.1, hx, hy, c.surfaceZ - 0.04, 'hole', this.partHolder, 16);
        }
    }
    // Dispenser controller on the bench for the air-time architecture.
    if (c.architecture === 'R75') this.buildController(k);
  }

  buildController(k) {
    const g = new THREE.Group();
    g.name = 'air dispenser controller (generic)';
    g.position.set(-360, -40, -70);
    this.machine.add(g);
    k.box(150, 190, 86, 0, 0, 0, 'cover', g, 4);
    k.box(150, 4, 86, 0, -96, 0, 'cobalt', g, 1.5);
    for (const x of [-60, 60]) for (const y of [-80, 80]) k.cyl(6, 3, x, y, -3, 'rubber', g);
    this.lcd = createLcd();
    if (this.lcd) {
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(62, 27), new THREE.MeshBasicMaterial({ map: this.lcd.texture, toneMapped: false }));
      screen.rotation.x = Math.PI / 2;
      screen.position.set(-28, -98.8, 56);
      screen.userData.ownedMaterials = [screen.material];
      g.add(screen);
      k.box(68, 1.5, 33, -28, -97.9, 39.5, 'black', g, 0.6);
    }
    for (const [x, mat] of [
      [-50, 'green'],
      [-36, 'cover'],
      [-22, 'cover'],
      [-8, 'red'],
    ]) {
      const b = k.cyl(4, 3, x, -99, 22, mat, g, 18);
      b.rotation.x = Math.PI / 2;
    }
    // Regulator knob and gauge.
    const knob = k.cyl(11, 12, 42, -102, 52, 'black', g, 24);
    knob.rotation.x = Math.PI / 2;
    const gauge = k.cyl(14, 4, 42, -99, 24, 'steel', g, 32);
    gauge.rotation.x = Math.PI / 2;
    const face = k.cyl(12, 1, 42, -101.2, 24, 'cover', g, 32);
    face.rotation.x = Math.PI / 2;
    this.gaugeNeedle = k.box(1.2, 0.6, 10, 42, -101.9, 19, 'red', g, 0);
    this.gaugeNeedle.geometry.translate(0, 0, 0);
    // Air outlet on the top rear.
    k.cyl(5, 10, 50, 70, 86, 'brass', g);
    this.supplyOutlet = new THREE.Object3D();
    this.supplyOutlet.position.set(50, 70, 96);
    g.add(this.supplyOutlet);
  }

  // ── Per-frame state ──
  update(s) {
    if (!this.config) return;
    const c = this.config;
    this.frame = s;
    this.tool.position.set(s.x, s.y, s.z);
    this.carriage.position.x = s.x;
    this.bridge.position.y = s.y;
    this.chain?.update(Math.max(-170, Math.min(170, s.x)));
    if (this.cartridge) this.cartridge.updateFill(s.remaining / 75);
    if (this.lcd) {
      const psi = c.pressure;
      this.lcd.draw([`${psi.toFixed(1)} psi`, s.command ? 'DISPENSE ●' : 'READY  ' + s.t.toFixed(2) + 's'], !!s.command);
      if (this.gaugeNeedle) this.gaugeNeedle.rotation.y = -1.2 + (psi / 100) * 2.4;
    }
    this.machine.updateMatrixWorld(true);
    const a = this.machine.worldToLocal(this.hoseStart.getWorldPosition(new THREE.Vector3()));
    const b = this.machine.worldToLocal(this.hoseEnd.getWorldPosition(new THREE.Vector3()));
    if (!this.lastHose || a.distanceToSquared(this.lastHose[0]) > 1e-5 || b.distanceToSquared(this.lastHose[1]) > 1e-5) {
      this.hose.geometry.dispose();
      this.hose.geometry = buildHoseGeometry(a, b, c.architecture === 'R75' ? 'air' : 'feed', c.architecture === 'R75' ? 2.6 : 5);
      if (this.supplyHose) {
        this.supplyHose.geometry.dispose();
        const p = this.machine.worldToLocal(this.supplyOutlet.getWorldPosition(new THREE.Vector3()));
        const q = this.machine.worldToLocal(this.supplyFitting.getWorldPosition(new THREE.Vector3()));
        this.supplyHose.geometry = buildHoseGeometry(p, q, 'supply', 2.6);
      }
      this.lastHose = [a, b];
    }
    const bead = this.depositMeshes[0];
    const v = s.deposited;
    bead.visible = v > 1e-12 && !this.compression;
    if (c.mode === 'line' || c.mode === 'pattern') {
      if (this.lastDeposits !== s.deposits) {
        bead.geometry.dispose();
        bead.geometry =
          c.mode === 'pattern'
            ? continuousPathGeometry(s.deposits, this.run.cellLength, c.lineRatio, this.run.path, this.run.gridStart)
            : continuousLineGeometry(s.deposits, this.run.cellLength, c.lineRatio);
        this.lastDeposits = s.deposits;
      }
      if (c.mode === 'pattern') bead.position.set(0, 0, c.surfaceZ + 0.001);
      else bead.position.set(c.offsetX - c.lineLength / 2 + this.run.gridStart, c.offsetY, c.surfaceZ + 0.001);
    } else if (bead.visible) {
      const d = dotDimensions(v, c.dotRatio);
      bead.scale.set(d.radius, d.radius, (v * 1000) / (this.dotGeo.userData.unitVolume * d.radius * d.radius));
      bead.position.set(c.offsetX, c.offsetY, c.surfaceZ + 0.001);
    }
    // Material visibly bridges nozzle and surface only while it flows and the nozzle is down.
    const gap = s.z - c.surfaceZ;
    const flowing = s.q > 0.02 * (this.run.Q || 1) && gap <= c.standoff + 0.05 && !this.compression;
    this.flowColumn.visible = flowing;
    if (flowing) {
      const r = (c.diameter / 2) * Math.min(1, 0.55 + 0.45 * (s.q / this.run.Q));
      this.flowColumn.scale.set(r, r, gap);
      this.flowColumn.position.set(s.x, s.y, c.surfaceZ);
    }
    if (this.mode === 'follow' || this.mode === 'head') this.trackTool();
    this.render();
  }

  trackTool() {
    const s = this.frame;
    if (!s || this.tween) return;
    const target =
      this.mode === 'follow' ? new THREE.Vector3(s.x, s.y, this.config.surfaceZ) : new THREE.Vector3(s.x, s.y, s.z).add(this.headTargetOffset || new THREE.Vector3());
    this.camera.position.add(target.clone().sub(this.controls.target));
    this.controls.target.copy(target);
  }

  // ── Camera ──
  resize() {
    const w = this.host.clientWidth;
    const h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.persp.aspect = w / h;
    this.persp.updateProjectionMatrix();
    if (this.config) this.fit(this.mode, { animate: false });
  }

  isoDirection() {
    const signs = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, -1, 1],
      [1, -1, 1],
    ][this.isoCorner];
    return new THREE.Vector3(...signs).normalize();
  }

  visibility(mode) {
    const pcp = this.config.architecture === 'P300';
    const keep = {
      whole: () => true,
      work: (o) => o !== this.enclosure && o !== this.pumpStation?.group && o !== this.stationAirHose && o !== this.stationAirAnchor,
      feed: (o) => [this.pumpStation?.group, this.enclosure, this.stationAirAnchor, this.hose, this.stationAirHose].includes(o),
      head: (o) => [this.tool, this.bridge, this.partHolder, this.fixture, this.hose].includes(o),
      close: (o) => [this.tool, this.partHolder, this.fixture].includes(o),
      heat: (o) => [this.tool, this.partHolder, this.fixture].includes(o),
      follow: (o) => [this.tool, this.partHolder, this.fixture].includes(o),
    }[mode];
    for (const child of this.machine.children) child.visible = keep(child) && !(this.compression && child === this.tool);
    this.environment.visible = mode === 'whole' || mode === 'work' || (pcp && mode === 'feed');
    // Close views hide the upper cartridge so the nozzle and bead stay unobstructed; geometry is unchanged.
    for (const child of this.tool.children) {
      child.updateMatrixWorld();
      const bounds = new THREE.Box3().setFromObject(child);
      child.visible = ['whole', 'work', 'head'].includes(mode) || bounds.min.z - this.tool.position.z < (mode === 'heat' ? 20 : this.visualNozzleLength - 1);
    }
  }

  framing(mode) {
    const c = this.config;
    const pts = [];
    let target;
    if (mode === 'whole' || mode === 'feed' || mode === 'head') {
      const object = mode === 'whole' ? this.machine : mode === 'feed' ? this.pumpStation.group : this.tool;
      const b = new THREE.Box3();
      object.traverseVisible((o) => {
        if (o.isMesh || o.isInstancedMesh) b.expandByObject(o);
      });
      for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) pts.push(new THREE.Vector3(x, y, z));
      target = b.getCenter(new THREE.Vector3());
      if (mode === 'head') this.headTargetOffset = target.clone().sub(this.tool.position);
    } else if (mode === 'work') {
      for (const x of [-250, 250]) for (const y of [-200, 330]) for (const z of [-60, c.architecture === 'P300' ? 430 : 330]) pts.push(new THREE.Vector3(x, y, z));
      target = new THREE.Vector3(0, 60, c.architecture === 'P300' ? 180 : 130);
    } else if (mode === 'heat' && c.heatSource) {
      // Heat-source close-up: the footprint plus any squeezed material, with room for squeeze-out.
      const hs = c.heatSource;
      const hw = hs.width / 2 + Math.max(6, hs.width * 0.35);
      const hd = (hs.shape === 'circle' ? hs.width : hs.depth) / 2 + Math.max(6, hs.width * 0.35);
      const box = this.compression ? new THREE.Box3().setFromObject(this.compression.plate) : null;
      const x0 = box ? Math.min(hs.offsetX - hw, box.min.x) : hs.offsetX - hw;
      const x1 = box ? Math.max(hs.offsetX + hw, box.max.x) : hs.offsetX + hw;
      const y0 = box ? Math.min(hs.offsetY - hd, box.min.y) : hs.offsetY - hd;
      const y1 = box ? Math.max(hs.offsetY + hd, box.max.y) : hs.offsetY + hd;
      for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [c.surfaceZ - 2, c.surfaceZ + 4]) pts.push(new THREE.Vector3(x, y, z));
      target = new THREE.Vector3((x0 + x1) / 2, (y0 + y1) / 2, c.surfaceZ + 1);
    } else {
      const hs = c.heatSource;
      const w = mode === 'follow' ? 20 : Math.max(Math.min(c.width + 24, 310) / 2, hs ? Math.abs(hs.offsetX) + hs.width / 2 : 0);
      const d = mode === 'follow' ? 20 : Math.max(Math.min(c.depth + 24, 310) / 2, hs ? Math.abs(hs.offsetY) + (hs.shape === 'circle' ? hs.width : hs.depth) / 2 : 0);
      for (const x of [-w, w]) for (const y of [-d, d]) for (const z of [c.fixtureHeight, c.surfaceZ + 25]) pts.push(new THREE.Vector3(x, y, z));
      target = new THREE.Vector3(0, 0, c.surfaceZ + 5);
      if (mode === 'follow' && this.frame) target.set(this.frame.x, this.frame.y, c.surfaceZ);
    }
    return { pts, target };
  }

  fit(mode = 'close', { animate = true } = {}) {
    if (mode === 'feed' && !this.pumpStation) mode = 'work';
    this.mode = mode;
    if (!this.config) return;
    this.visibility(mode);
    const w = this.host.clientWidth || 800;
    const h = this.host.clientHeight || 500;
    const aspect = w / h;
    const { pts, target } = this.framing(mode);
    const direction = this.freeOrbit ? this.camera.position.clone().sub(this.controls.target).normalize() : this.isoDirection();
    // Measure the framed points in the view basis of the chosen direction.
    const probe = this.ortho.clone();
    probe.position.copy(target).add(direction.clone().multiplyScalar(5000));
    probe.up.set(0, 0, 1);
    probe.lookAt(target);
    probe.updateMatrixWorld();
    const view = pts.map((p) => p.clone().applyMatrix4(probe.matrixWorldInverse));
    const margin = mode === 'close' ? 1.22 : mode === 'heat' ? 1.08 : 1.12;
    let hw = Math.max(1, ...view.map((p) => Math.abs(p.x))) * margin;
    let hh = Math.max(1, ...view.map((p) => Math.abs(p.y))) * margin;
    const depth = Math.max(1, ...view.map((p) => Math.abs(p.z + 5000)));
    if (mode === 'follow') {
      hw = 20;
      hh = hw / aspect;
    }
    const span = Math.max(hh, hw / aspect) * 2;
    let end;
    if (this.projection === 'ortho') end = { position: target.clone().add(direction.clone().multiplyScalar(5000)), target: target.clone(), span };
    else {
      const dist = span / 2 / Math.tan(THREE.MathUtils.degToRad(this.persp.fov / 2)) + depth;
      end = { position: target.clone().add(direction.clone().multiplyScalar(dist)), target: target.clone(), span };
    }
    const begin = { position: this.camera.position.clone(), target: this.controls.target.clone(), span: this.currentSpan ?? span };
    const run = animate && !reducedMotion() && this.currentSpan !== undefined;
    this.tween = null;
    if (!run) this.applyCamera(end, aspect);
    else {
      const t0 = performance.now();
      this.tween = { begin, end, t0, aspect };
      const step = (now) => {
        if (!this.tween || this.tween.t0 !== t0) return;
        const t = Math.min(1, (now - t0) / 480);
        const e = easeInOut(t);
        // Keep the final direction while blending distance and target (no swing through the model).
        const p = begin.position.clone().lerp(end.position, e);
        this.applyCamera({ position: p, target: begin.target.clone().lerp(end.target, e), span: begin.span + (end.span - begin.span) * e }, aspect);
        if (t < 1) requestAnimationFrame(step);
        else {
          this.tween = null;
          this.applyCamera(end, aspect);
          // The tool may have moved while the camera was travelling.
          if (this.mode === 'follow' || this.mode === 'head') {
            this.trackTool();
            this.render();
          }
        }
      };
      requestAnimationFrame(step);
    }
    this.onView?.();
  }

  applyCamera({ position, target, span }, aspect = this.persp.aspect) {
    this.currentSpan = span;
    const cam = this.camera;
    cam.position.copy(position);
    this.controls.target.copy(target);
    cam.lookAt(target);
    if (cam.isOrthographicCamera) {
      cam.zoom = 1;
      cam.left = (-span * aspect) / 2;
      cam.right = (span * aspect) / 2;
      cam.top = span / 2;
      cam.bottom = -span / 2;
    }
    cam.updateProjectionMatrix();
    this.controls.update();
    this.render();
  }

  zoomBy(factor) {
    if (this.camera.isOrthographicCamera) {
      this.camera.zoom *= factor;
      this.camera.updateProjectionMatrix();
    } else {
      const offset = this.camera.position.clone().sub(this.controls.target).divideScalar(factor);
      this.camera.position.copy(this.controls.target).add(offset);
    }
    this.controls.update();
    this.render();
  }

  setCorner(index) {
    this.isoCorner = index;
    this.setFreeOrbit(false, false);
    this.fit(this.mode);
  }

  setFreeOrbit(enabled, refit = true) {
    this.freeOrbit = enabled;
    this.applyOrbitMode();
    if (!enabled && refit) this.fit(this.mode);
    this.onView?.();
  }

  setProjection(kind) {
    if (kind === this.projection) return;
    const from = this.camera;
    this.projection = kind;
    this.camera = kind === 'ortho' ? this.ortho : this.persp;
    this.camera.position.copy(from.position);
    this.makeControls();
    this.fit(this.mode, { animate: false });
  }

  render() {
    if (!this.renderer || !this.camera || !this.controls) return;
    this.renderer.render(this.scene, this.camera);
    if (this.onScale) {
      const t = this.controls.target;
      const a = t.clone().project(this.camera);
      const b = t.clone().add(new THREE.Vector3(10, 0, 0)).project(this.camera);
      const W = this.host.clientWidth;
      const H = this.host.clientHeight;
      const px = Math.hypot(((b.x - a.x) * W) / 2, ((b.y - a.y) * H) / 2);
      this.onScale(px, (Math.atan2(-(b.y - a.y) * H, (b.x - a.x) * W) * 180) / Math.PI);
    }
  }

  setOverlayVisibility({ exitPath, plannedPath, heatSource } = {}) {
    if (exitPath !== undefined) this.showExitPath = exitPath;
    if (plannedPath !== undefined) this.showPlannedPath = plannedPath;
    if (this.exitPath) this.exitPath.visible = this.showExitPath && !this.compression;
    if (this.plannedPath) this.plannedPath.visible = this.showPlannedPath && !this.compression;
    if (heatSource !== undefined && this.patternSource) this.patternSource.visible = heatSource;
    this.render();
  }

  // ── Compression view ──
  showCompression(result, settings, options = {}) {
    this.clearCompression();
    this.compression = createCompressionScene(this.config, settings, result, options);
    this.scene.add(this.compression.group);
    this.tool.visible = false;
    this.depositMeshes[0].visible = false;
    this.flowColumn.visible = false;
    this.setOverlayVisibility({});
    if (this.patternSource) this.patternSource.visible = false;
    this.render();
    return this.compression;
  }

  setCompressionFrame(index) {
    this.compression?.setFrame(index);
    this.render();
  }

  setCompressionColor(mode) {
    this.compression?.setColorMode(mode);
    this.render();
  }

  clearCompression() {
    if (!this.compression) return;
    this.compression.dispose();
    this.compression = null;
    if (this.tool) this.tool.visible = true;
    if (this.patternSource) this.patternSource.visible = true;
    if (this.frame) this.update(this.frame);
    this.setOverlayVisibility({});
    if (this.config) this.visibility(this.mode);
  }

  // ── Import ──
  async importFile(file, unit, up) {
    const ext = file.name.toLowerCase().split('.').pop();
    const buffer = await file.arrayBuffer();
    let object;
    if (ext === 'stl') {
      const geometry = new STLLoader().parse(buffer);
      geometry.computeVertexNormals();
      object = new THREE.Mesh(geometry, this.palette.castAl);
      object.castShadow = object.receiveShadow = true;
    } else if (ext === 'glb' || ext === 'gltf') {
      if (ext === 'gltf') {
        const json = JSON.parse(new TextDecoder().decode(buffer));
        if ([...(json.buffers || []), ...(json.images || [])].some((x) => x.uri && !x.uri.startsWith('data:')))
          throw new Error('此 glTF 含外接檔案，請匯出單一 GLB 或內嵌資源 glTF。');
      }
      const manager = new THREE.LoadingManager();
      manager.setURLModifier((url) => {
        if (!url.startsWith('blob:') && !url.startsWith('data:')) throw new Error('工件引用外部資源，請匯出內嵌材質的 GLB。');
        return url;
      });
      const data = await new GLTFLoader(manager).parseAsync(ext === 'gltf' ? new TextDecoder().decode(buffer) : buffer, '');
      object = data.scene;
      object.traverse((o) => {
        if (o.isMesh) o.castShadow = o.receiveShadow = true;
      });
    } else throw new Error('目前可載入 STL、GLB、內嵌 glTF。STEP 請先轉換。');
    const wrapper = new THREE.Group();
    wrapper.add(object);
    const factor = ext === 'stl' ? { mm: 1, cm: 10, m: 1000, inch: 25.4 }[unit] : 1000;
    wrapper.scale.setScalar(factor);
    if (ext !== 'stl' || up === 'Y') wrapper.rotation.x = Math.PI / 2;
    wrapper.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(wrapper);
    const size = box.getSize(new THREE.Vector3());
    if (![size.x, size.y, size.z].every((v) => Number.isFinite(v)) || size.x < 1 || size.x > 1000 || size.y < 1 || size.y > 1000 || size.z < 0.1 || size.z > 200)
      throw new Error('工件尺寸不在原型範圍內（長寬 1–1000mm，厚 0.1–200mm），請檢查來源單位與檔案。');
    const centered = new THREE.Group();
    centered.add(wrapper);
    wrapper.position.set(-(box.min.x + box.max.x) / 2, -(box.min.y + box.max.y) / 2, -box.min.z);
    this.clearImport();
    this.imported = centered;
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buffer)))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');
    return {
      width: size.x,
      depth: size.y,
      thickness: size.z,
      workpieceKind: 'imported',
      workpieceFile: { name: file.name, sha256: digest, sourceUnit: ext === 'stl' ? unit : 'm', up: ext === 'stl' ? up : 'Y', unitFactorToMm: factor },
    };
  }

  clearImport() {
    if (!this.imported) return;
    this.imported.removeFromParent();
    this.imported.traverse((o) => o.geometry?.dispose());
    this.imported = null;
  }

  geometryAudit() {
    return {
      parts: this.counter.parts,
      renderedDepositVolumeMm3: this.depositMeshes.filter((m) => m.visible).reduce((s, m) => s + m.geometry.userData.unitVolume * m.scale.x * m.scale.y * m.scale.z, 0),
      cameraDirection: this.camera.position.clone().sub(this.controls.target).normalize().toArray(),
    };
  }

  screenshot() {
    this.render();
    return this.renderer.domElement.toDataURL('image/png');
  }
}

export { volumeOf, lineGeometry, capGeometry, continuousLineGeometry, continuousPathGeometry, createPatternSource, nozzleGeometry, nozzleStemGeometry };
