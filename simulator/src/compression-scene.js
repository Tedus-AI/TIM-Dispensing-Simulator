import * as THREE from 'three';
import { MATERIALS } from './materials.js';

// Inspection visualisation of the squeeze estimate, not a mechanical glass/fixture model.
// World mm, Z up. The film top sits at the plate's lower face; trapped-air cells are drawn in a colour the
// page chooses (one of four, so it can differ from the material colour).

// Perceptually ordered ramp for "when did the front arrive" (early = deep blue, late = warm yellow).
const RAMP = [
  [0.0, [0.16, 0.2, 0.55]],
  [0.25, [0.12, 0.45, 0.78]],
  [0.5, [0.1, 0.68, 0.66]],
  [0.75, [0.55, 0.82, 0.32]],
  [1.0, [0.99, 0.82, 0.2]],
];
export function rampColor(t) {
  const x = Math.max(0, Math.min(1, t));
  for (let i = 1; i < RAMP.length; i++)
    if (x <= RAMP[i][0]) {
      const [a, ca] = RAMP[i - 1];
      const [b, cb] = RAMP[i];
      const f = (x - a) / (b - a);
      return ca.map((v, k) => v + (cb[k] - v) * f);
    }
  return RAMP.at(-1)[1];
}

export function createCompressionScene(config, settings, result, { plateMargin = 6, voidColor = 0xff2d55 } = {}) {
  const group = new THREE.Group();
  group.name = 'estimated compression inspection';
  const materials = [];
  const own = (m) => (materials.push(m), m);
  const grid = result.grid;
  const z = config.surfaceZ;
  const sourceWidth = settings.width;
  const sourceDepth = settings.shape === 'circle' ? settings.width : settings.depth;

  // Frames: the squeeze sequence when available, else the final state only.
  const finalCoverage = Uint8Array.from(grid.coverage, (v) => Math.round(Math.max(0, Math.min(1, Number(v) || 0)) * 255));
  const frames = grid.frames?.length
    ? grid.frames
    : [
        {
          gap: settings.gap,
          coverage: finalCoverage,
          trapped: grid.voidMask || new Uint8Array(finalCoverage.length),
          air: grid.airFraction ? Uint8Array.from(grid.airFraction, (v) => Math.round(Math.max(0, Math.min(1, Number(v) || 0)) * 255)) : null,
        },
      ];
  const n = grid.cols * grid.rows;
  const arrival = new Float32Array(n).fill(-1);
  frames.forEach((f, k) => {
    for (let i = 0; i < n; i++) if (arrival[i] < 0 && f.coverage[i] >= 128) arrival[i] = frames.length > 1 ? k / (frames.length - 1) : 1;
  });

  // Heat-source footprint on the workpiece and its outline (raised with the film so it stays visible).
  const sourceGeometry = settings.shape === 'circle' ? new THREE.CircleGeometry(sourceWidth / 2, 96) : new THREE.PlaneGeometry(sourceWidth, sourceDepth);
  const source = new THREE.Mesh(sourceGeometry, own(new THREE.MeshBasicMaterial({ color: 0x19b5c2, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false })));
  source.position.set(settings.offsetX, settings.offsetY, z + 0.004);
  source.name = 'configured heat source';
  source.renderOrder = 1;
  group.add(source);
  const outlinePoints =
    settings.shape === 'circle'
      ? Array.from({ length: 97 }, (_, i) => new THREE.Vector3((sourceWidth / 2) * Math.cos((i * Math.PI * 2) / 96), (sourceWidth / 2) * Math.sin((i * Math.PI * 2) / 96), 0))
      : [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
          [-1, -1],
        ].map(([a, b]) => new THREE.Vector3((a * sourceWidth) / 2, (b * sourceDepth) / 2, 0));
  const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(outlinePoints), own(new THREE.LineBasicMaterial({ color: 0x0bc5d6, depthTest: false, transparent: true })));
  outline.position.set(settings.offsetX, settings.offsetY, z + settings.gap + 0.02);
  outline.name = 'heat source boundary';
  outline.renderOrder = 6;
  group.add(outline);

  // Film region: every cell that is wet in the final state, plus one cell of margin.
  let x0 = grid.cols;
  let x1 = -1;
  let y0 = grid.rows;
  let y1 = -1;
  for (let i = 0; i < n; i++)
    if (finalCoverage[i] > 0 || frames.some((f) => f.coverage[i] > 0)) {
      const x = i % grid.cols;
      const y = Math.floor(i / grid.cols);
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
  const hasFilm = x1 >= x0;
  if (hasFilm) {
    x0 = Math.max(0, x0 - 1);
    y0 = Math.max(0, y0 - 1);
    x1 = Math.min(grid.cols - 1, x1 + 1);
    y1 = Math.min(grid.rows - 1, y1 + 1);
  }
  // One film vertex at every cell centre, so a step between two cells (the film's rim, a hole's wall) sits on
  // the boundary between them.
  const vx = hasFilm ? x1 - x0 + 1 : 0;
  const vy = hasFilm ? y1 - y0 + 1 : 0;
  const filmGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(vx * vy * 3);
  const colors = new Float32Array(vx * vy * 3);
  const smooth = new Float32Array(vx * vy);
  for (let j = 0; j < vy; j++)
    for (let i = 0; i < vx; i++) {
      const v = j * vx + i;
      positions[3 * v] = grid.originX + (x0 + i + 0.5) * grid.cellSize;
      positions[3 * v + 1] = grid.originY + (y0 + j + 0.5) * grid.cellSize;
    }
  filmGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  filmGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const glue = new THREE.Color((MATERIALS[config.material] || MATERIALS.putty).color);
  const film = new THREE.Mesh(
    filmGeometry,
    own(new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.55, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.5, side: THREE.DoubleSide, envMapIntensity: 0.6 })),
  );
  film.name = 'squeezed film';
  film.castShadow = true;
  film.receiveShadow = true;
  group.add(film);

  // Trapped-air cells.
  const voidMesh = new THREE.Mesh(new THREE.BufferGeometry(), own(new THREE.MeshBasicMaterial({ color: voidColor, transparent: true, opacity: 0.88, side: THREE.DoubleSide, depthWrite: false })));
  voidMesh.name = 'trapped air';
  voidMesh.position.z = z + 0.01;
  voidMesh.renderOrder = 4;
  group.add(voidMesh);

  // Generic glass inspection plate spanning the heat source and all material with a margin.
  let minX = settings.offsetX - sourceWidth / 2;
  let maxX = settings.offsetX + sourceWidth / 2;
  let minY = settings.offsetY - sourceDepth / 2;
  let maxY = settings.offsetY + sourceDepth / 2;
  for (let i = 0; i < n; i++) {
    if (!(Number(grid.coverage[i]) > 1e-7)) continue;
    const gx = grid.originX + (i % grid.cols) * grid.cellSize;
    const gy = grid.originY + Math.floor(i / grid.cols) * grid.cellSize;
    minX = Math.min(minX, gx);
    maxX = Math.max(maxX, gx + grid.cellSize);
    minY = Math.min(minY, gy);
    maxY = Math.max(maxY, gy + grid.cellSize);
  }
  const plateThickness = 3;
  const plateGeometry = new THREE.BoxGeometry(maxX - minX + 2 * plateMargin, maxY - minY + 2 * plateMargin, plateThickness);
  const plate = new THREE.Mesh(
    plateGeometry,
    own(new THREE.MeshPhysicalMaterial({ color: 0xcfeaf5, transparent: true, opacity: 0.1, roughness: 0.05, metalness: 0, clearcoat: 0.4, depthWrite: false, side: THREE.DoubleSide })),
  );
  plate.name = 'transparent inspection plate';
  plate.renderOrder = 5;
  group.add(plate);
  plate.add(new THREE.LineSegments(new THREE.EdgesGeometry(plateGeometry), own(new THREE.LineBasicMaterial({ color: 0x4aa7c4, transparent: true, opacity: 0.8, depthWrite: false }))));

  let colorMode = 'material';
  let current = frames.length - 1;
  const shade = new THREE.Color();
  // Trapped air spans the gap: glue around it, the plate above it, the part below. A cell that is mostly air is
  // a hole through the film down to the part, coloured in the chosen colour (the quads below); its vertex drops
  // to the floor, so the hole has a steep glue wall on the cell boundary, like the meniscus, shaded down to the
  // air colour so the hole reads from any angle and its opening matches the bubble's area. A cell with some air
  // but mostly glue (a bubble's edge) stays on the film, lightly tinted by its air share.
  const voidTint = new THREE.Color(voidColor);
  const airSmooth = new Float32Array(vx * vy);
  const hole = new Uint8Array(vx * vy);
  const raw = new Float32Array(vx * vy);
  // Vertex field = the cell's value, then 3×3 box passes so an edge is interpolated across cells instead of
  // following the cell staircase.
  const vertexField = (cell, out, passes = 1) => {
    for (let j = 0; j < vy; j++) for (let i = 0; i < vx; i++) out[j * vx + i] = cell(x0 + i, y0 + j);
    for (let p = 0; p < passes; p++) {
      raw.set(out);
      for (let j = 0; j < vy; j++)
        for (let i = 0; i < vx; i++) {
          let sum = 0;
          let count = 0;
          for (let dj = -1; dj <= 1; dj++)
            for (let di = -1; di <= 1; di++) {
              const a = i + di;
              const b = j + dj;
              if (a < 0 || b < 0 || a >= vx || b >= vy) continue;
              sum += raw[b * vx + a];
              count++;
            }
          out[j * vx + i] = sum / count;
        }
    }
  };
  function setFrame(index) {
    current = Math.max(0, Math.min(frames.length - 1, index));
    const f = frames[current];
    const gap = f.gap;
    plate.position.set((minX + maxX) / 2, (minY + maxY) / 2, z + gap + plateThickness / 2);
    outline.position.z = z + gap + 0.02;
    // The air cells' colour sits half way up the film: seen through the plate it fills each hole up to the
    // middle of its walls, i.e. exactly the bubble's footprint; from the side it shows inside the hole.
    voidMesh.position.z = z + 0.5 * gap;
    if (hasFilm) {
      const inside = (x, y) => x >= 0 && y >= 0 && x < grid.cols && y < grid.rows;
      vertexField((x, y) => (inside(x, y) ? f.coverage[y * grid.cols + x] / 255 : 0), smooth, 2);
      // Mostly-air cells (holes) and the air share of the others (frames before v2.1 carry no air share).
      const core = f.trapped || grid.voidMask;
      const coreAt = (x, y) => (core && inside(x, y) ? core[y * grid.cols + x] : 0);
      if (f.air) vertexField((x, y) => (inside(x, y) && !coreAt(x, y) ? f.air[y * grid.cols + x] / 255 : 0), airSmooth);
      else airSmooth.fill(0);
      for (let j = 0; j < vy; j++)
        for (let i = 0; i < vx; i++) {
          const v = j * vx + i;
          const value = smooth[v];
          hole[v] = coreAt(x0 + i, y0 + j) ? 1 : 0;
          // Below ~¼ the film dips under the workpiece face, so the visible rim is the smooth contour; at a hole
          // it drops to the floor.
          positions[3 * v + 2] = hole[v] ? z - 0.02 : z + gap * Math.min(1, 2.2 * (value - 0.22)) - (value < 0.22 ? 0.02 : 0);
          if (colorMode === 'front') {
            const t = inside(x0 + i, y0 + j) ? arrival[(y0 + j) * grid.cols + x0 + i] : -1;
            const rgb = rampColor(t < 0 ? 1 : t);
            shade.setRGB(rgb[0], rgb[1], rgb[2], THREE.SRGBColorSpace);
          } else shade.copy(glue).multiplyScalar(0.7 + 0.2 * Math.min(1, value));
          if (hole[v]) shade.copy(voidTint);
          else if (airSmooth[v] > 0.02) shade.lerp(voidTint, Math.min(0.6, 1.5 * airSmooth[v]));
          colors[3 * v] = shade.r;
          colors[3 * v + 1] = shade.g;
          colors[3 * v + 2] = shade.b;
        }
      const index = [];
      for (let j = 0; j < vy - 1; j++)
        for (let i = 0; i < vx - 1; i++) {
          const v = j * vx + i;
          if (Math.max(smooth[v], smooth[v + 1], smooth[v + vx], smooth[v + vx + 1]) < 0.22) continue;
          if (hole[v] && hole[v + 1] && hole[v + vx] && hole[v + vx + 1]) continue;
          index.push(v, v + 1, v + vx + 1, v, v + vx + 1, v + vx);
        }
      filmGeometry.setIndex(index);
      filmGeometry.attributes.position.needsUpdate = true;
      filmGeometry.attributes.color.needsUpdate = true;
      filmGeometry.computeVertexNormals();
      filmGeometry.computeBoundingSphere();
    }
    // Hole colour: every mostly-air cell.
    const quads = [];
    const trapped = f.trapped || grid.voidMask;
    for (let i = 0; i < n; i++)
      if (trapped && trapped[i]) {
        const gx = grid.originX + (i % grid.cols) * grid.cellSize;
        const gy = grid.originY + Math.floor(i / grid.cols) * grid.cellSize;
        const s = grid.cellSize;
        quads.push(gx, gy, 0, gx + s, gy, 0, gx + s, gy + s, 0, gx, gy, 0, gx + s, gy + s, 0, gx, gy + s, 0);
      }
    voidMesh.geometry.dispose();
    voidMesh.geometry = new THREE.BufferGeometry();
    voidMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(quads, 3));
    return f;
  }
  setFrame(current);

  return {
    group,
    source,
    film,
    voids: voidMesh,
    plate,
    frameCount: frames.length,
    frames,
    get frameIndex() {
      return current;
    },
    setFrame,
    setVoidColor(color) {
      voidMesh.material.color.set(color);
      voidTint.set(color);
      setFrame(current);
    },
    setColorMode(mode) {
      colorMode = mode;
      setFrame(current);
    },
    dispose() {
      group.removeFromParent();
      group.traverse((object) => object.geometry?.dispose());
      for (const m of materials) m.dispose();
    },
  };
}
