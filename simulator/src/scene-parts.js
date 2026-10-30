import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Colour palette for the machine. Colours are visual choices for legibility, not OEM finishes.
export function createPalette() {
  const std = (color, roughness, metalness, extra = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  return {
    graphite: std(0x2b3139, 0.5, 0.35),
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
    this.edgeMaterial = new THREE.LineBasicMaterial({ color: 0x0b0f14, transparent: true, opacity: 0.13 });
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
