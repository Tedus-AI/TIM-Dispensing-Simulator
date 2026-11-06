import { beadProfile } from './engine.js';
import { pointOnPath } from './path-planning.js';

/*
 * Deposited glue (v1.9): one height field of glue thickness on the part, laid cell by cell in the order the
 * nozzle lays it, so a pass that comes back over earlier glue lands on that glue. The 3D bead, the stack
 * check and the squeeze all start from this field.
 *  - Superposition: every cell's volume goes where it is laid; the total is exact.
 *  - Remaining gap: the needle tip stays at the standoff above the part, so over earlier glue the gap left
 *    under it is the standoff minus the glue below the bore. A bead taller than that gap is pressed to it
 *    and widens up to the nozzle reach (bore + 2 × gap) — the rule beadProfile applies to one pass on a
 *    clean part, with the remaining gap in place of the standoff. As a pile nears the tip the needle presses
 *    the new glue flat and wide, so the pile grows sideways instead of up.
 *  - Needle plough: glue standing above the needle tip inside the needle's outer diameter is in its way; the
 *    moving needle pushes it out to the side it is on, into a ridge beside the needle (volume conserved).
 * The glue a pass has just laid is hidden from its own nozzle for a few grid cells behind it, so the grid does
 * not mistake a bead for its own predecessor. Not modelled: glue the needle wets and carries away (strings,
 * tails), slumping under gravity or surface tension, air folded in where a bead crosses another (evaluated in
 * 30_v1.9來回點膠的疊膠物理.md). Engineering model, not free-surface flow.
 */

const MAX_CELLS = 600000;
const TILE = 16; // cells per side of the tiles that bound the glue height, to skip the plough search

// Regular-wall stainless dispensing tips: bore → outer diameter (mm). 14–25G EFD general-purpose tips, the
// coarser gauges standard tubing; other bores interpolate the wall thickness.
const TIPS = [
  [0.25, 0.51],
  [0.33, 0.64],
  [0.41, 0.72],
  [0.51, 0.82],
  [0.61, 0.91],
  [0.69, 1.07],
  [0.84, 1.27],
  [1.07, 1.47],
  [1.19, 1.65],
  [1.36, 1.65],
  [1.54, 1.83],
  [1.8, 2.41],
  [2.16, 2.77],
  [2.39, 3.05],
  [2.69, 3.4],
  [3.43, 4.19],
];

/** Outer diameter of a needle tip with this bore (mm). */
export function needleOuterDiameter(bore) {
  const wall = (k) => (TIPS[k][1] - TIPS[k][0]) / 2;
  if (!(bore > TIPS[0][0])) return bore + 2 * wall(0);
  for (let k = 1; k < TIPS.length; k++)
    if (bore <= TIPS[k][0]) {
      const t = (bore - TIPS[k - 1][0]) / (TIPS[k][0] - TIPS[k - 1][0]);
      return bore + 2 * (wall(k - 1) + t * (wall(k) - wall(k - 1)));
    }
  return bore + 2 * wall(TIPS.length - 1);
}

// Centre line of the deposit grid: the path (pattern) or the straight line, extended along the end tangents
// where the nozzle footprint reaches past either end.
function centreLine(run) {
  const c = run.config;
  if (c.mode === 'pattern') {
    const path = run.path;
    return (s) => {
      const p = pointOnPath(path, s);
      const d = s - Math.max(0, Math.min(path.length, s));
      return { x: p.x + p.tx * d, y: p.y + p.ty * d, tx: p.tx, ty: p.ty };
    };
  }
  return (s) => ({ x: c.offsetX + s - c.lineLength / 2, y: c.offsetY, tx: 1, ty: 0 });
}

// Free bead width for a cross-section A (mm²) under a gap, pressed when it does not fit (beadProfile's rule).
function pressedWidth(A, gap, ratio, bore) {
  const w = Math.sqrt((4 * A) / (Math.PI * ratio));
  if (!(ratio * w > gap)) return w;
  if (!(gap > 1e-9)) return Math.max(w, bore);
  return Math.min((4 * A) / (Math.PI * gap), Math.max(w, bore + 2 * gap));
}

/**
 * Grid of a run's deposit field: covers the whole path with room for the widest bead the nozzle can press
 * and the needle's side ridges; at least six cells across a typical bead, at most 0.1 mm.
 */
export function fieldGrid(run, profile = null) {
  const c = run.config;
  const deposits = run.summary.deposits;
  const n = deposits.length;
  const p = profile || beadProfile(deposits, run.cellLength, c.lineRatio, c.standoff, c.diameter);
  const widths = [];
  for (let i = 0; i < n; i++) if (deposits[i] > 0) widths.push((p.widths[i] + p.widths[i + 1]) / 2);
  widths.sort((a, b) => a - b);
  const typical = widths.length ? widths[Math.floor(widths.length / 2)] : c.diameter;
  const outer = needleOuterDiameter(c.diameter);
  const pad = Math.max(p.maxWidth, c.diameter + 2 * c.standoff, outer) / 2 + outer + 0.5;
  const line = centreLine(run);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const steps = Math.max(2, n * 4);
  for (let k = 0; k <= steps; k++) {
    const q = line(run.gridStart + (k / steps) * n * run.cellLength);
    minX = Math.min(minX, q.x);
    maxX = Math.max(maxX, q.x);
    minY = Math.min(minY, q.y);
    maxY = Math.max(maxY, q.y);
  }
  minX -= pad;
  minY -= pad;
  maxX += pad;
  maxY += pad;
  let cell = Math.min(0.1, Math.max(0.02, typical / 6));
  while (Math.ceil((maxX - minX) / cell) * Math.ceil((maxY - minY) / cell) > MAX_CELLS) cell *= 1.05;
  return { originX: minX, originY: minY, cell, nx: Math.ceil((maxX - minX) / cell), ny: Math.ceil((maxY - minY) / cell) };
}

/**
 * A layer that lays a run's deposit cells one at a time, in path order, on its field grid. Cells of the
 * finished run keep the run's bead widths; a cell still filling (a frame of the run) is scaled from them, so
 * a layer can be cloned at a cell boundary and continued with a later frame's deposits.
 */
export function createDepositor(run, grid = null) {
  const c = run.config;
  const final = run.summary.deposits;
  const n = final.length;
  const ds = run.cellLength;
  const profile = beadProfile(final, ds, c.lineRatio, c.standoff, c.diameter);
  const g = grid || fieldGrid(run, profile);
  const { originX, originY, cell: h, nx, ny } = g;
  const tilesX = Math.ceil(nx / TILE);
  const tilesY = Math.ceil(ny / TILE);
  const standoff = c.standoff;
  const ratio = c.lineRatio;
  const bore = c.diameter;
  const outer = needleOuterDiameter(bore);
  const half = outer / 2;
  const ridge = Math.max(half, 2 * h); // pushed glue piles up within about a needle radius beside it
  const strips = Math.max(2, Math.ceil(ridge / h));
  const sub = Math.max(2, Math.ceil((2 * ds) / h));
  const step = ds / sub;
  const exclude = step + 2 * h; // a pass's own new bead is hidden from its nozzle this far behind it
  const area = h * h;
  const line = centreLine(run);
  // Glue laid more than this far back along the path belongs to an earlier pass (a star's outward spoke, a
  // centre crossed before); nearer, it is the bead the nozzle is laying (a corner folding onto itself).
  const typical = (() => {
    const w = [];
    for (let i = 0; i < n; i++) if (final[i] > 0) w.push((profile.widths[i] + profile.widths[i + 1]) / 2);
    w.sort((a, b) => a - b);
    return w.length ? w[Math.floor(w.length / 2)] : bore;
  })();
  const revisit = Math.max(3 * typical, 2 * outer, 1);
  // Centre line at every sub-step, and each cell's bead width on a clean part.
  const P = new Float64Array(n * sub * 4);
  for (let i = 0; i < n; i++)
    for (let a = 0; a < sub; a++) {
      const q = line(run.gridStart + (i + (a + 0.5) / sub) * ds);
      const k = (i * sub + a) * 4;
      P[k] = q.x;
      P[k + 1] = q.y;
      P[k + 2] = q.tx;
      P[k + 3] = q.ty;
    }
  const w0 = new Float64Array(n);
  const ref = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    w0[i] = (profile.widths[i] + profile.widths[i + 1]) / 2;
    ref[i] = final[i] > 0 ? pressedWidth((final[i] * 1000) / ds, standoff, ratio, bore) : 0;
  }
  const scratchIdx = new Int32Array(4 * 4096);
  const scratchAmt = new Float64Array(4 * 4096);

  const fresh = () => ({
    z: new Float64Array(nx * ny),
    tiles: new Float64Array(tilesX * tilesY),
    queue: [],
    head: 0,
    next: 0,
    laid: new Float32Array(nx * ny).fill(-Infinity), // path position of the latest glue in each cell
    ploughed: 0,
    stacked: 0,
    pressed: 0, // volume the needle pressed flat against earlier glue (remaining gap below the bead's height)
    lost: 0,
    maxBase: 0,
    contact: 0, // path length (mm) over which the needle tip met glue of an earlier pass
    contactPloughed: 0,
    contactX: 0,
    contactY: 0,
    base: new Float64Array(n),
  });

  const raise = (st, k) => {
    const t = Math.floor(Math.floor(k / nx) / TILE) * tilesX + Math.floor((k % nx) / TILE);
    if (st.z[k] > st.tiles[t]) st.tiles[t] = st.z[k];
  };
  const commit = (st, upTo) => {
    const { queue, z } = st;
    while (st.head < queue.length && queue[st.head].s <= upTo) {
      const q = queue[st.head++];
      for (let k = 0; k < q.idx.length; k++) {
        z[q.idx[k]] += q.amt[k];
        st.laid[q.idx[k]] = q.s;
        raise(st, q.idx[k]);
      }
    }
    if (st.head > 512 && st.head * 2 > queue.length) {
      st.queue = queue.slice(st.head);
      st.head = 0;
    }
  };
  // Bilinear splat (height units) into the scratch list from `count`; returns the new count.
  const splat = (st, x, y, dz, count) => {
    const fx = (x - originX) / h - 0.5;
    const fy = (y - originY) / h - 0.5;
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const ax = fx - i;
    const ay = fy - j;
    for (let e = 0; e < 4; e++) {
      const ii = i + (e & 1);
      const jj = j + (e >> 1);
      const w = (e & 1 ? ax : 1 - ax) * (e >> 1 ? ay : 1 - ay);
      if (!(w > 0)) continue;
      if (ii < 0 || jj < 0 || ii >= nx || jj >= ny) st.lost += dz * w * area;
      else {
        scratchIdx[count] = jj * nx + ii;
        scratchAmt[count++] = dz * w;
      }
    }
    return count;
  };
  const sample = (z, x, y) => {
    const fx = (x - originX) / h - 0.5;
    const fy = (y - originY) / h - 0.5;
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const ax = fx - i;
    const ay = fy - j;
    let v = 0;
    for (let e = 0; e < 4; e++) {
      const ii = i + (e & 1);
      const jj = j + (e >> 1);
      if (ii < 0 || jj < 0 || ii >= nx || jj >= ny) continue;
      v += (e & 1 ? ax : 1 - ax) * (e >> 1 ? ay : 1 - ay) * z[jj * nx + ii];
    }
    return v;
  };

  const nearest = (x, y) => {
    const i = Math.floor((x - originX) / h);
    const j = Math.floor((y - originY) / h);
    return i < 0 || j < 0 || i >= nx || j >= ny ? -1 : j * nx + i;
  };

  // Needle plough over one sub-step: glue above the tip that the leading half of the needle sweeps into (its
  // footprint ahead of the needle centre, so also where it stops or turns) goes to the side ridges. Glue
  // behind the needle is its own new bead. Returns whether the ploughed glue came from an earlier pass.
  const plough = (st, px, py, tx, ty, s) => {
    const z = st.z;
    const ux = -ty;
    const uy = tx;
    const r = half + step + h;
    const i0 = Math.max(0, Math.floor((px - r - originX) / h));
    const i1 = Math.min(nx - 1, Math.floor((px + r - originX) / h));
    const j0 = Math.max(0, Math.floor((py - r - originY) / h));
    const j1 = Math.min(ny - 1, Math.floor((py + r - originY) / h));
    let any = false;
    for (let tj = Math.floor(j0 / TILE); tj <= Math.floor(j1 / TILE) && !any; tj++)
      for (let ti = Math.floor(i0 / TILE); ti <= Math.floor(i1 / TILE); ti++)
        if (st.tiles[tj * tilesX + ti] > standoff) {
          any = true;
          break;
        }
    if (!any) return false;
    let left = 0;
    let right = 0;
    let earlier = 0;
    for (let jj = j0; jj <= j1; jj++)
      for (let ii = i0; ii <= i1; ii++) {
        const k = jj * nx + ii;
        if (!(z[k] > standoff)) continue;
        const dx = originX + (ii + 0.5) * h - px;
        const dy = originY + (jj + 0.5) * h - py;
        const along = dx * tx + dy * ty;
        if (along < -step / 2) continue;
        const u = dx * ux + dy * uy;
        if (Math.abs(u) > half || (along > 0 && along * along + u * u > half * half)) continue;
        const e = z[k] - standoff;
        z[k] = standoff;
        if (s - st.laid[k] > revisit) earlier += e;
        if (u >= 0) right += e;
        else left += e;
      }
    if (!(left + right > 0)) return false;
    st.ploughed += (left + right) * area;
    st.contactPloughed += earlier * area;
    // A ridge beside the needle on each side, highest at the needle and thinning outward.
    const alongN = Math.max(1, Math.ceil(step / h));
    let norm = 0;
    for (let r = 0; r < strips; r++) norm += strips - r - 0.5;
    for (let side = -1; side <= 1; side += 2) {
      const e = side > 0 ? right : left;
      if (!(e > 0)) continue;
      let count = 0;
      for (let r = 0; r < strips; r++) {
        const u = side * (half + ((r + 0.5) / strips) * ridge);
        const share = (e * (strips - r - 0.5)) / norm / alongN;
        for (let b = 0; b < alongN; b++) {
          const t = ((b + 0.5) / alongN - 0.5) * step;
          count = splat(st, px + tx * t + ux * u, py + ty * t + uy * u, share, count);
        }
      }
      for (let k = 0; k < count; k++) {
        z[scratchIdx[k]] += scratchAmt[k];
        st.laid[scratchIdx[k]] = s;
        raise(st, scratchIdx[k]);
      }
    }
    return earlier > 0;
  };

  /**
   * Lay cell i with `volumeMl` (its volume in this frame). Cells must be laid in order. `until` is how far
   * along the path the nozzle has travelled: the needle ploughs only where it has been (never past the path
   * end, where the grid only carries the nozzle footprint).
   */
  const lay = (st, i, volumeMl, until = Infinity) => {
    const v = volumeMl * 1000;
    if (!(v > 0) && run.gridStart + i * ds > until) {
      st.next = i + 1;
      return;
    }
    const A = v / ds;
    // Clean-part width: the run's own profile, scaled by the bead rule while the cell is still filling.
    const clean = A > 0 && ref[i] > 0 ? w0[i] * (pressedWidth(A, standoff, ratio, bore) / ref[i]) : w0[i];
    let cellBase = 0;
    for (let a = 0; a < sub; a++) {
      const k4 = (i * sub + a) * 4;
      const s = run.gridStart + (i + (a + 0.5) / sub) * ds;
      commit(st, s - exclude);
      const px = P[k4];
      const py = P[k4 + 1];
      const tx = P[k4 + 2];
      const ty = P[k4 + 3];
      const moving = s <= until;
      let met = moving && plough(st, px, py, tx, ty, s);
      // Glue already under the bore: the gap left above it presses (and widens) a bead that does not fit.
      let under = 0;
      let old = false;
      for (let f = -2; f <= 2; f++) {
        const x = px - ty * f * 0.4 * (bore / 2);
        const y = py + tx * f * 0.4 * (bore / 2);
        const zf = sample(st.z, x, y);
        if (zf > under) under = zf;
        const k = nearest(x, y);
        if (k >= 0 && st.z[k] >= 0.98 * standoff && s - st.laid[k] > revisit) met = true;
        if (f === 0 && k >= 0 && zf > 0.01 && s - st.laid[k] > revisit) old = true;
      }
      if (met && moving) {
        if (!(st.contact > 0)) {
          st.contactX = px;
          st.contactY = py;
        }
        st.contact += step;
      }
      if (!(v > 0)) continue;
      under = Math.min(under, standoff);
      const w = under > 0.01 && ref[i] > 0 ? clean * (pressedWidth(A, standoff - under, ratio, bore) / pressedWidth(A, standoff, ratio, bore)) : clean;
      if (old) st.stacked += v / sub;
      if (under > 0.01 && ratio * Math.sqrt((4 * A) / (Math.PI * ratio)) > standoff - under) st.pressed += v / sub;
      if (under > cellBase) cellBase = under;
      // The sub-step's bead: a half-ellipse across, uniform along.
      const across = Math.max(4, Math.ceil((2 * w) / h));
      const alongN = Math.max(1, Math.ceil((2 * step) / h));
      let sum = 0;
      for (let b = 0; b < across; b++) sum += Math.sqrt(Math.max(0, 1 - ((2 * (b + 0.5)) / across - 1) ** 2));
      const unit = v / sub / (sum * alongN) / area;
      let count = 0;
      for (let t = 0; t < alongN; t++) {
        const d = ((t + 0.5) / alongN - 0.5) * step;
        for (let b = 0; b < across; b++) {
          const q = (2 * (b + 0.5)) / across - 1;
          const u = (q * w) / 2;
          if (count + 4 > scratchIdx.length) {
            st.queue.push({ s, idx: scratchIdx.slice(0, count), amt: scratchAmt.slice(0, count) });
            count = 0;
          }
          count = splat(st, px + tx * d - ty * u, py + ty * d + tx * u, unit * Math.sqrt(Math.max(0, 1 - q * q)), count);
        }
      }
      st.queue.push({ s, idx: scratchIdx.slice(0, count), amt: scratchAmt.slice(0, count) });
    }
    st.base[i] = cellBase;
    if (cellBase > st.maxBase) st.maxBase = cellBase;
    st.next = i + 1;
  };

  /** Copy of a layer's state (the field into `into` when it fits); queued sub-steps are shared, not copied. */
  const clone = (st, into = null) => {
    const z = into && into.length === st.z.length ? into : new Float64Array(st.z.length);
    z.set(st.z);
    return { ...st, z, laid: st.laid.slice(), tiles: st.tiles.slice(), queue: st.queue.slice(st.head), head: 0, base: st.base.slice() };
  };
  const finish = (st) => commit(st, Infinity);

  return { grid: g, n, outer, standoff, revisit, fresh, lay, clone, finish };
}

/** Summary of a laid field: highest glue and where, total volume. */
export function fieldStats(grid, z) {
  let maxHeight = 0;
  let at = 0;
  let volume = 0;
  for (let k = 0; k < z.length; k++) {
    volume += z[k];
    if (z[k] > maxHeight) {
      maxHeight = z[k];
      at = k;
    }
  }
  return {
    maxHeight,
    x: grid.originX + ((at % grid.nx) + 0.5) * grid.cell,
    y: grid.originY + (Math.floor(at / grid.nx) + 0.5) * grid.cell,
    volumeMm3: volume * grid.cell * grid.cell,
  };
}

/**
 * Lay a run's deposits (default: the whole run; a frame's deposits for a partial bead) and return the glue
 * thickness per grid cell (mm) with what happened on the way: the highest glue; the glue the needle met above
 * its tip and pushed aside (`ploughedMm3`); the volume laid on glue of an earlier pass (`stackedMm3`); the
 * highest glue under the bore (`maxBase`, the standoff when the needle reached it); and the path length over
 * which the needle tip met glue of an earlier pass (`contactMm`, first at `contactX/Y`).
 */
export function depositField(run, { deposits = run.summary.deposits, depositor = null, until = run.pathLength ?? Infinity } = {}) {
  const d = depositor || createDepositor(run);
  const st = d.fresh();
  for (let i = 0; i < d.n; i++) d.lay(st, i, deposits[i], until);
  d.finish(st);
  return {
    grid: d.grid,
    z: st.z,
    ...fieldStats(d.grid, st.z),
    lostMm3: st.lost,
    ploughedMm3: st.ploughed,
    earlierPloughedMm3: st.contactPloughed,
    stackedMm3: st.stacked,
    pressedMm3: st.pressed,
    maxBase: st.maxBase,
    contactMm: st.contact,
    contactX: st.contactX,
    contactY: st.contactY,
    base: st.base,
    outer: d.outer,
  };
}

const cache = new WeakMap();
/** The whole run's deposit field, cached per run (null for a dot). */
export function runField(run) {
  if (run.config.mode === 'point') return null;
  if (!cache.has(run)) cache.set(run, depositField(run));
  return cache.get(run);
}
