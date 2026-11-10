import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Colour palette for the machine. Colours are visual choices for legibility, not OEM finishes.
export function createPalette() {
  const std = (color, roughness, metalness, extra = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  return {
    graphite: std(0x2b3139, 0.5, 0.35),
    // v3.0 machine finishes: warm white powder coat on castings and covers, clear and black anodised aluminium,
    // matt black motor bodies, polymer seals and cable jackets.
    paint: new THREE.MeshPhysicalMaterial({ color: 0xe9e7e1, roughness: 0.5, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.55 }),
    paintAccent: new THREE.MeshPhysicalMaterial({ color: 0x2c4f86, roughness: 0.45, metalness: 0.05, clearcoat: 0.3, clearcoatRoughness: 0.5 }),
    anodized: std(0xcfd3d6, 0.34, 0.86),
    anodizedDark: std(0x2a2d31, 0.4, 0.75),
    motor: std(0x1b1d20, 0.62, 0.25),
    seal: std(0xb02a32, 0.55, 0.02),
    cable: std(0x202327, 0.75, 0),
    thread: std(0xc9ced3, 0.3, 0.9),
    screen: std(0x0d2231, 0.25, 0.1, { emissive: 0x0d3b55, emissiveIntensity: 0.9 }),
    keys: std(0x3a4047, 0.7, 0.05),
    wood: std(0xcdb48f, 0.78, 0),
    cover: std(0xeceae5, 0.42, 0.05),
    coverGrey: std(0xc9ccd0, 0.45, 0.1),
    cobalt: std(0x1f5fd1, 0.34, 0.3),
    cobaltDark: std(0x173e8c, 0.42, 0.3),
    steel: std(0xd5dadf, 0.24, 0.92),
    steelDark: std(0x8d959d, 0.32, 0.88),
    aluminum: std(0xc4cad0, 0.3, 0.82),
    castAl: std(0xb3bac1, 0.46, 0.7),
    black: std(0x17191c, 0.48, 0.35),
    rubber: std(0x101113, 0.92, 0),
    orange: std(0xf07c1b, 0.5, 0.05),
    red: std(0xd8283a, 0.36, 0.05),
    yellow: std(0xf4c41f, 0.42, 0.05),
    green: std(0x22b462, 0.38, 0.05),
    teal: std(0x16808a, 0.4, 0.45),
    hole: std(0x30363d, 0.7, 0.3),
    bench: std(0xd9d3c7, 0.82, 0),
    mat: std(0x2a5f68, 0.88, 0),
    brass: std(0xc9a24d, 0.3, 0.9),
    lens: std(0x0d1116, 0.2, 0.1),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xdff2ff,
      roughness: 0.08,
      metalness: 0,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      side: THREE.DoubleSide,
      clearcoat: 1,
    }),
    polymer: new THREE.MeshPhysicalMaterial({
      color: 0x9fb07a,
      roughness: 0.35,
      metalness: 0,
      transparent: true,
      opacity: 0.82,
      clearcoat: 0.6,
    }),
  };
}

// Small part factory: every mesh casts/receives shadow and carries a faint edge line.
export class PartKit {
  constructor(palette, counter = { parts: 0 }) {
    this.palette = palette;
    this.counter = counter;
    // A faint outline keeps parts legible in the orthographic views without turning the model into a drawing.
    this.edgeMaterial = new THREE.LineBasicMaterial({ color: 0x0b0f14, transparent: true, opacity: 0.09 });
  }
  material(m) {
    return typeof m === 'string' ? this.palette[m] : m;
  }
  mesh(geometry, material, parent, { edges = true, shadow = true } = {}) {
    const m = new THREE.Mesh(geometry, this.material(material));
    m.castShadow = shadow;
    m.receiveShadow = true;
    if (edges) m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 32), this.edgeMaterial));
    parent.add(m);
    this.counter.parts++;
    return m;
  }
  /** Box resting on z (its bottom face), centred on x/y. */
  box(w, d, h, x, y, z, material, parent, radius) {
    const r = radius ?? Math.min(1.2, w / 12, d / 12, h / 6);
    const g = r > 0.15 && Math.min(w, d, h) >= 2.5 ? new RoundedBoxGeometry(w, d, h, 2, r) : new THREE.BoxGeometry(w, d, h);
    const m = this.mesh(g, material, parent);
    m.position.set(x, y, z + h / 2);
    return m;
  }
  /** Vertical cylinder resting on z. */
  cyl(r, h, x, y, z, material, parent, segments = 32) {
    const g = new THREE.CylinderGeometry(r, r, h, segments);
    g.rotateX(Math.PI / 2);
    const m = this.mesh(g, material, parent, { edges: segments <= 8 });
    m.position.set(x, y, z + h / 2);
    return m;
  }
  /** Cylinder along an axis ('x' | 'y'), centred at (x, y, z). */
  rod(r, length, axis, x, y, z, material, parent, segments = 24) {
    const g = new THREE.CylinderGeometry(r, r, length, segments);
    if (axis === 'x') g.rotateZ(Math.PI / 2);
    else if (axis === 'z') g.rotateX(Math.PI / 2);
    const m = this.mesh(g, material, parent, { edges: false });
    m.position.set(x, y, z);
    return m;
  }
  /** Socket-head cap screw seen from its head: dark head with a hex socket. */
  screw(x, y, z, parent, r = 1.6, axis = 'z') {
    const head = new THREE.CylinderGeometry(r, r, r * 0.9, 14);
    const socket = new THREE.CylinderGeometry(r * 0.45, r * 0.45, r * 0.95, 6);
    if (axis === 'z') {
      head.rotateX(Math.PI / 2);
      socket.rotateX(Math.PI / 2);
    } else if (axis === 'y') {
      // default cylinder axis is y
    } else {
      head.rotateZ(Math.PI / 2);
      socket.rotateZ(Math.PI / 2);
    }
    const h = this.mesh(head, 'black', parent, { edges: false, shadow: false });
    h.position.set(x, y, z);
    const s = this.mesh(socket, 'hole', parent, { edges: false, shadow: false });
    s.position.set(x, y, z);
    return h;
  }
}

/**
 * Cable drag chain of fixed length between a fixed end (x = 0) and a moving end on the upper run.
 * Instanced links follow: lower run → semicircular bend → upper run back to the moving end.
 */
export function createDragChain({ material, sideMaterial, pitch = 9, width = 26, height = 12, radius = 16, free = 200 }) {
  const count = Math.ceil((free + Math.PI * radius) / pitch) + 2;
  const link = new RoundedBoxGeometry(pitch * 0.92, width, height, 1, 1.2);
  const side = new THREE.BoxGeometry(pitch * 0.6, width + 2, height * 0.45);
  const links = new THREE.InstancedMesh(link, material, count);
  const plates = new THREE.InstancedMesh(side, sideMaterial, count);
  links.castShadow = plates.castShadow = true;
  links.receiveShadow = true;
  const group = new THREE.Group();
  group.add(links, plates);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const one = new THREE.Vector3(1, 1, 1);
  const pos = new THREE.Vector3();
  function update(xMoving) {
    const xb = (free + xMoving) / 2; // bend location keeps total length constant
    const lower = Math.max(0, xb);
    const upper = Math.max(0, xb - xMoving);
    for (let i = 0; i < count; i++) {
      let s = (i + 0.5) * pitch;
      let angle = 0;
      if (s <= lower) pos.set(s, 0, 0);
      else if ((s -= lower) <= Math.PI * radius) {
        const a = s / radius;
        pos.set(xb + radius * Math.sin(a), 0, radius - radius * Math.cos(a));
        angle = -a;
      } else {
        s -= Math.PI * radius;
        pos.set(xb - Math.min(s, upper), 0, 2 * radius);
        angle = -Math.PI;
      }
      q.setFromEuler(e.set(0, angle, 0));
      m.compose(pos, q, one);
      links.setMatrixAt(i, m);
      plates.setMatrixAt(i, m);
    }
    links.instanceMatrix.needsUpdate = plates.instanceMatrix.needsUpdate = true;
    links.computeBoundingSphere();
    plates.computeBoundingSphere();
  }
  update(0);
  return { group, update, dispose: () => [link, side].forEach((g) => g.dispose()) };
}

/** Live LCD for the air dispenser controller, drawn to a canvas texture. */
export function createLcd(width = 256, height = 112) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const ctx = canvas.getContext('2d');
  let last = '';
  function draw(lines, active) {
    const key = lines.join('|') + active;
    if (key === last) return;
    last = key;
    ctx.fillStyle = '#0b2b1f';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = active ? '#7dffb2' : '#47d38a';
    ctx.font = 'bold 40px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(lines[0], 14, 50);
    ctx.font = '22px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(lines[1], 14, 88);
    if (active) {
      ctx.fillStyle = '#ffcf5a';
      ctx.fillRect(width - 30, 14, 14, 14);
    }
    texture.needsUpdate = true;
  }
  return { texture, draw };
}

// ───────────────────────── v3.0: machine elements ─────────────────────────
// Parts that make a motion axis read as one: T-slot extrusion, profiled guide rail with its bolt holes,
// recirculating bearing blocks with end seals, a stepper motor with flange and connector, a ball screw with
// its thread, printed labels. Generic catalogue proportions, not a maker's CAD.

const AXES = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1], '-x': [-1, 0, 0], '-y': [0, -1, 0], '-z': [0, 0, -1] };

/**
 * A group at (x, y, z) whose local +X runs along `axis` and local +Z along `normal` (both one of ±x/±y/±z).
 * Parts are built once in that local frame (length along X, mounting face at z = 0, standing up in +Z).
 */
export function frame(parent, x, y, z, axis = 'x', normal = 'z') {
  const g = new THREE.Group();
  const ex = new THREE.Vector3(...AXES[axis]);
  const ez = new THREE.Vector3(...AXES[normal]);
  const ey = new THREE.Vector3().crossVectors(ez, ex);
  g.matrix.makeBasis(ex, ey, ez);
  g.quaternion.setFromRotationMatrix(g.matrix);
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

function canvasTexture(width, height, draw) {
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  draw(c.getContext('2d'), width, height);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Textures shared by a scene: a screw thread, a dial face, a fine grain for cast and coated surfaces. */
export function createFinishes() {
  const thread = canvasTexture(64, 64, (ctx, w, h) => {
    ctx.fillStyle = '#c9ced3';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#5d646b';
    ctx.lineWidth = 5;
    for (let i = -h; i < w + h; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h * 0.35, h);
      ctx.stroke();
    }
  });
  if (thread) thread.wrapS = thread.wrapT = THREE.RepeatWrapping;
  const grain = canvasTexture(128, 128, (ctx, w, h) => {
    const image = ctx.createImageData(w, h);
    let seed = 7;
    for (let i = 0; i < w * h; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const v = 118 + (seed >>> 24) * 0.08 * 2.4;
      image.data.set([v, v, v, 255], 4 * i);
    }
    ctx.putImageData(image, 0, 0);
  });
  if (grain) {
    grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
    grain.repeat.set(6, 6);
    grain.colorSpace = THREE.NoColorSpace;
  }
  const dial = canvasTexture(128, 128, (ctx, w) => {
    const c = w / 2;
    ctx.fillStyle = '#f4f3ee';
    ctx.beginPath();
    ctx.arc(c, c, c, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#1c2024';
    for (let i = 0; i <= 20; i++) {
      const a = Math.PI * 0.75 + (i / 20) * Math.PI * 1.5;
      const major = i % 5 === 0;
      ctx.lineWidth = major ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * (c - (major ? 20 : 13)), c + Math.sin(a) * (c - (major ? 20 : 13)));
      ctx.lineTo(c + Math.cos(a) * (c - 6), c + Math.sin(a) * (c - 6));
      ctx.stroke();
    }
    ctx.strokeStyle = '#c62f3b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(c, c, c - 9, Math.PI * 0.75 + Math.PI * 1.5 * 0.85, Math.PI * 0.75 + Math.PI * 1.5);
    ctx.stroke();
    ctx.fillStyle = '#1c2024';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('psi', c, c + 34);
  });
  return { thread, grain, dial, dispose: () => [thread, grain, dial].forEach((t) => t?.dispose()) };
}

/** A printed label (canvas texture) as a flat plate; `draw(ctx, w, h)` paints it at 8 px per mm. */
export function createLabel(widthMm, heightMm, draw) {
  const texture = canvasTexture(Math.round(widthMm * 8), Math.round(heightMm * 8), draw);
  if (!texture) return null;
  const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0.05 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(widthMm, heightMm), material);
  mesh.userData.ownedMaterials = [material];
  mesh.userData.ownedTextures = [texture];
  return mesh;
}

/** Cross-section of a T-slot extrusion (w × h, centred), with one slot per ~40 mm of each face. */
function slotProfile(w, h) {
  const slot = 6.2;
  const depth = Math.min(5.5, w / 5, h / 5);
  const s = new THREE.Shape();
  const side = (len) => {
    const count = Math.max(1, Math.round(len / 40));
    return Array.from({ length: count }, (_, i) => -len / 2 + ((i + 0.5) * len) / count);
  };
  const r = Math.min(2, w / 12, h / 12);
  // Counter-clockwise from the lower left corner; slots cut inward on every face.
  s.moveTo(-w / 2 + r, -h / 2);
  for (const c of side(w)) {
    s.lineTo(c - slot / 2, -h / 2);
    s.lineTo(c - slot / 2, -h / 2 + depth);
    s.lineTo(c + slot / 2, -h / 2 + depth);
    s.lineTo(c + slot / 2, -h / 2);
  }
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  for (const c of side(h)) {
    s.lineTo(w / 2, c - slot / 2);
    s.lineTo(w / 2 - depth, c - slot / 2);
    s.lineTo(w / 2 - depth, c + slot / 2);
    s.lineTo(w / 2, c + slot / 2);
  }
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  for (const c of side(w).reverse()) {
    s.lineTo(c + slot / 2, h / 2);
    s.lineTo(c + slot / 2, h / 2 - depth);
    s.lineTo(c - slot / 2, h / 2 - depth);
    s.lineTo(c - slot / 2, h / 2);
  }
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  for (const c of side(h).reverse()) {
    s.lineTo(-w / 2, c + slot / 2);
    s.lineTo(-w / 2 + depth, c + slot / 2);
    s.lineTo(-w / 2 + depth, c - slot / 2);
    s.lineTo(-w / 2, c - slot / 2);
  }
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
}

Object.assign(PartKit.prototype, {
  /**
   * T-slot aluminium extrusion of `length` along the local X of `parent`, section `across` (local Y) × `up`
   * (local Z), centred on the local origin.
   */
  extrusion(parent, length, across, up, material = 'anodized') {
    const g = new THREE.ExtrudeGeometry(slotProfile(across, up), { depth: length, bevelEnabled: false, curveSegments: 3 });
    // Extruded along +Z with the section in XY: turn the section into YZ and the length onto X.
    g.translate(0, 0, -length / 2);
    g.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)));
    return this.mesh(g, material, parent, { edges: false });
  },
  /** Solid of a polygon `points` ([u, v] pairs, counter-clockwise) extruded `thickness` along local X, in the local YZ plane. */
  prism(parent, points, thickness, material) {
    const s = new THREE.Shape(points.map(([u, v]) => new THREE.Vector2(u, v)));
    const g = new THREE.ExtrudeGeometry(s, { depth: thickness, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 2 });
    g.translate(0, 0, -thickness / 2);
    g.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)));
    return this.mesh(g, material, parent, { edges: false });
  },
  /** Box in a local frame: size (lx, ly, lz), centre (x, y, z). */
  slab(parent, lx, ly, lz, x, y, z, material, radius, edges = false) {
    const r = radius ?? Math.min(1, lx / 10, ly / 10, lz / 10);
    const g = r > 0.15 && Math.min(lx, ly, lz) >= 2 ? new RoundedBoxGeometry(lx, ly, lz, 2, r) : new THREE.BoxGeometry(lx, ly, lz);
    const m = this.mesh(g, material, parent, { edges });
    m.position.set(x, y, z);
    return m;
  },
  /** Cylinder in a local frame along 'x' | 'y' | 'z', centred at (x, y, z). */
  pin(parent, r, length, axis, x, y, z, material, segments = 24) {
    const g = new THREE.CylinderGeometry(r, r, length, segments);
    if (axis === 'x') g.rotateZ(Math.PI / 2);
    else if (axis === 'z') g.rotateX(Math.PI / 2);
    const m = this.mesh(g, material, parent, { edges: false });
    m.position.set(x, y, z);
    return m;
  },
  /**
   * Profiled guide rail along local X, centred, sitting on z = 0: ground steel with a bolt hole every 40 mm.
   * Returns the rail's top height.
   */
  linearRail(parent, length, { width = 12, height = 8 } = {}) {
    this.slab(parent, length, width, height, 0, 0, height / 2, 'steel', 0.5);
    // Running grooves along both flanks.
    for (const s of [-1, 1]) this.slab(parent, length, 0.6, height * 0.3, 0, s * (width / 2 + 0.05), height * 0.55, 'steelDark', 0);
    const count = Math.max(2, Math.floor(length / 40));
    const hole = new THREE.CylinderGeometry(width * 0.2, width * 0.2, 0.3, 14);
    hole.rotateX(Math.PI / 2);
    const holes = new THREE.InstancedMesh(hole, this.palette.hole, count);
    const pitch = length / count;
    for (let i = 0; i < count; i++) holes.setMatrixAt(i, new THREE.Matrix4().makeTranslation(-length / 2 + (i + 0.5) * pitch, 0, height + 0.02));
    parent.add(holes);
    this.counter.parts++;
    return height;
  },
  /** Bearing block on a rail at local x: steel body, end seals, grease nipple. `total` = mounting face to block top. */
  bearingBlock(parent, x, { width = 28, length = 36, total = 14, railHeight = 8 } = {}) {
    const clear = Math.max(1.5, railHeight * 0.25);
    const g = new THREE.Group();
    g.position.x = x;
    parent.add(g);
    this.slab(g, length - 6, width, total - clear, 0, 0, clear + (total - clear) / 2, 'steelDark', 0.8, true);
    for (const s of [-1, 1]) {
      this.slab(g, 3, width - 1, total - clear - 1, s * (length / 2 - 1.5), 0, clear + (total - clear) / 2, 'seal', 0.4);
      for (const t of [-1, 1]) this.screw(s * (length / 2 - 8), t * (width / 2 - 4), total + 0.2, g, 1.3);
    }
    this.pin(g, 1.1, 3, 'x', length / 2 + 1.5, 0, clear + (total - clear) * 0.55, 'brass', 8);
    return g;
  },
  /**
   * Stepper motor in a local frame: mounting flange at x = 0, body toward −X, shaft toward +X. Returns the
   * group; `userData.cable` is where its lead leaves the rear.
   */
  stepper(parent, { size = 42, length = 48, shaft = 12 } = {}) {
    const g = new THREE.Group();
    parent.add(g);
    const body = this.palette.motor;
    this.slab(g, 4, size, size, -2, 0, 0, 'aluminum', 1.2);
    this.slab(g, length - 14, size - 1, size - 1, -4 - (length - 14) / 2, 0, 0, body, 3.5);
    // Laminated stack: fine dark steps across the body.
    for (let i = 1; i < 6; i++) this.slab(g, 0.5, size - 0.6, size - 0.6, -4 - ((length - 14) * i) / 6, 0, 0, 'steelDark', 3.5);
    this.slab(g, 10, size, size, -length + 5, 0, 0, 'aluminum', 1.5);
    this.pin(g, size * 0.3, 8, 'x', -length - 4, 0, 0, body, 28);
    this.pin(g, size * 0.26, 2, 'x', 1, 0, 0, 'aluminum', 28);
    this.pin(g, 2.5, shaft, 'x', shaft / 2, 0, 0, 'steel', 12);
    for (const a of [-1, 1]) for (const b of [-1, 1]) this.screw(0.4, a * (size / 2 - 5), b * (size / 2 - 5), g, 1.5, 'x');
    // Connector box and lead on the side that faces local +Z.
    this.slab(g, 14, 16, 7, -length + 12, 0, size / 2 + 3, body, 1);
    const cable = new THREE.Object3D();
    cable.position.set(-length + 12, 0, size / 2 + 6.5);
    g.add(cable);
    g.userData.cable = cable;
    return g;
  },
  /** Ball screw along local X between two bearing supports, centred; `nut` is the nut's local x. */
  ballScrew(parent, length, { r = 5, nut = 0, support = [16, 20, 24], threadMaterial = 'thread' } = {}) {
    const g = new THREE.CylinderGeometry(r, r, length, 20, 1, true);
    g.rotateZ(Math.PI / 2);
    const m = this.mesh(g, threadMaterial, parent, { edges: false });
    m.userData.threadLength = length;
    const [sx, sy, sz] = support;
    for (const s of [-1, 1]) {
      this.slab(parent, sx, sy, sz, s * (length / 2 + sx / 2 - 2), 0, 0, 'anodizedDark', 1.2, true);
      this.pin(parent, r + 3.5, 3, 'x', s * (length / 2 - 3), 0, 0, 'steel', 20);
    }
    const nutGroup = new THREE.Group();
    nutGroup.position.x = nut;
    parent.add(nutGroup);
    this.pin(nutGroup, r + 5, 22, 'x', 0, 0, 0, 'steelDark', 24);
    this.pin(nutGroup, r + 9, 5, 'x', -11, 0, 0, 'steel', 24);
    return nutGroup;
  },
  /** Flexible lead (motor cable, air line) through `points` (THREE.Vector3 in the parent's frame). */
  cable(parent, points, radius = 2, material = 'cable') {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const m = this.mesh(new THREE.TubeGeometry(curve, Math.max(12, points.length * 10), radius, 8, false), material, parent, { edges: false });
    return m;
  },
});
