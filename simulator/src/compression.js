import { beadProfile, dotDimensions, pasteRheology } from './engine.js';
import { pointOnPath } from './path-planning.js';
import { MATERIALS } from './materials.js';
import { runField } from './deposit.js';

/*
 * Squeeze estimate (v1.1): a time-stepped Hele-Shaw squeeze between two flat parallel plates.
 *
 * The deposited bead is rasterised with its own cross-section. A constant press force drives the plate
 * from the bead crest down to the spacer gap; at each step the lubrication pressure field
 * (∇·(h³/12μ ∇p) = −ḣ in the wetted film, p = 0 on fronts open to the atmosphere) moves the displaced
 * material, and the step's duration follows from requiring the film to carry the press force.
 *
 * Air that becomes completely surrounded by material is handled by `airMode`:
 *  - 'compressible' (default): each enclosed pocket keeps its gas (isothermal, pV = const). Its pressure
 *    is a boundary condition on the film, solved implicitly with the film pressure. The air/material
 *    interface moves both ways, so pockets shrink under pressure, drift with the flow, re-expand and can
 *    reach an open front (venting) when the material wall between them thins out. After the plate seats
 *    on the spacers the pockets relax until their overpressure is held by the material's yield stress.
 *  - 'rigid' (v1.0): an enclosed pocket is frozen as an impermeable obstacle.
 *  - 'vent': enclosed air is assumed to escape (upper bound on coverage).
 * Power-law film (v2.0) with a Bingham yield stress (v2.2): the paste can only flow where the pressure gradient
 * exceeds 2τy/h, so a press force spread over the film cannot drive it below the plastic-limit gap where the
 * film carries the whole force at that gradient (F = 2τy/h · ∫ distance-to-front dA); the plate stops there.
 * While it flows, the yield part is added to the viscous pressures (additive Herschel–Bulkley lubrication
 * approximation). The yield stress also holds pockets after seating. Not a validated rheology or fingering
 * solution.
 */

export const ATM = 101325; // Pa
export const KGF = 9.80665; // N
export const AIR_MODES = Object.freeze(['compressible', 'rigid', 'vent']);
export const PRESS_DEFAULTS = Object.freeze({ airMode: 'compressible', pressKgf: 10, pressSpeed: 1, settleTime: 300, holdTime: 0 });

const MAX_CELLS = 90000;
const FILLED = 0;
const OPEN = 1;
const POCKET = 2;
const FROZEN = 3;
const DRY = 1e-3; // a cell below (1 − DRY) of the plate height is dry (well above solver round-off)
const HELD = 0.003 * ATM; // overpressure below which a relaxing pocket counts as settled
const CG_TOL = 5e-5; // per-cell volume residual / cell volume; 20× below DRY so round-off never opens cells
const FRONT = 0.8; // target front overshoot per plate step (cells)
const PICARD = 30; // power-law face-factor iterations at most per solve
const PICARD_TOL = 1e-2; // relative pressure change that ends them (press time within 0.5 % of 2e-3)

// The deposited nozzle footprint extends slightly past either end of the path.
function pathPoint(path, s) {
  const p = pointOnPath(path, s);
  const t = Math.max(0, Math.min(path.length, s));
  const d = s - t;
  return { ...p, x: p.x + p.tx * d, y: p.y + p.ty * d };
}

/** Deposited centre-line elements in world mm with volume (mm³), local bead width and tangent. */
export function depositSources(run) {
  const c = run.config;
  const deposits = run.summary.deposits;
  if (c.mode === 'point') {
    const v = deposits[0] * 1000;
    return v > 0 ? [{ x: c.offsetX, y: c.offsetY, v, tx: 1, ty: 0, width: 0 }] : [];
  }
  const profile = beadProfile(deposits, run.cellLength, c.lineRatio, c.standoff, c.diameter);
  const sources = [];
  for (let i = 0; i < deposits.length; i++) {
    const v = deposits[i] * 1000;
    if (!(v > 0)) continue;
    const s = run.gridStart + (i + 0.5) * run.cellLength;
    const width = (profile.widths[i] + profile.widths[i + 1]) / 2;
    if (c.mode === 'pattern') {
      const p = pathPoint(run.path, s);
      sources.push({ x: p.x, y: p.y, v, tx: p.tx, ty: p.ty, width });
    } else sources.push({ x: c.offsetX + s - c.lineLength / 2, y: c.offsetY, v, tx: 1, ty: 0, width });
  }
  return sources;
}

/**
 * Squeeze rheology of a run (v2.0): the same power law τ = K·γ̇ⁿ as its nozzle flow (pasteRheology), so a flow
 * calibration also moves the squeeze; options override K (`viscosity`, Pa·sⁿ), n (`flowIndex`) and the yield
 * stress. Before v2.0 the squeeze used one Newtonian viscosity.
 */
export function squeezeRheology(config, options = {}) {
  const material = MATERIALS[config.material] || MATERIALS.putty;
  let paste = { K: material.squeezeViscosity, n: 1 };
  try {
    const r = pasteRheology(config);
    if (r.K > 0 && r.n > 0) paste = r;
  } catch {
    /* incomplete config: material card */
  }
  const viscosity = Number.isFinite(options.viscosity) && options.viscosity > 0 ? options.viscosity : paste.K;
  const flowIndex = Number.isFinite(options.flowIndex) && options.flowIndex > 0 ? options.flowIndex : paste.n;
  const yieldStress = Number.isFinite(options.yieldStress) && options.yieldStress >= 0 ? options.yieldStress : material.yieldStress;
  return { viscosity, flowIndex, yieldStress };
}

// Jacobi-preconditioned conjugate gradient. Rows 0..m−1 are film cells (4 faces each, `nb`/`w`);
// rows m.. are pocket nodes, coupled only through the film cells' faces (the matrix stays symmetric).
// v2.2: one pass per iteration does the update and both reductions, p·Ap comes out of the product, and the
// work vectors are reused between solves (same arithmetic as before, about a third less memory traffic).
let cgBuf = null;
function cgVectors(size) {
  if (!cgBuf || cgBuf.r.length < size) {
    const len = Math.max(size, Math.ceil((cgBuf?.r.length ?? 0) * 1.5));
    cgBuf = { r: new Float64Array(len), p: new Float64Array(len), q: new Float64Array(len), inv: new Float64Array(len) };
  }
  return cgBuf;
}
function solvePressure(m, size, nb, w, diag, rhs, x, absTol2) {
  const { r, p, q, inv } = cgVectors(size);
  // out = A·v; returns v·out.
  const apply = (v, out) => {
    for (let k = m; k < size; k++) out[k] = diag[k] * v[k];
    let dot = 0;
    for (let k = 0; k < m; k++) {
      const vk = v[k];
      let s = diag[k] * vk;
      const e0 = 4 * k;
      for (let e = e0; e < e0 + 4; e++) {
        const j = nb[e];
        if (j < 0) continue;
        s -= w[e] * v[j];
        if (j >= m) out[j] -= w[e] * vk;
      }
      out[k] = s;
      dot += vk * s;
    }
    for (let k = m; k < size; k++) dot += v[k] * out[k];
    return dot;
  };
  apply(x, q);
  let rz = 0;
  let rr = 0;
  let norm0 = 0;
  for (let k = 0; k < size; k++) {
    inv[k] = 1 / diag[k];
    const rk = rhs[k] - q[k];
    r[k] = rk;
    const zk = rk * inv[k];
    p[k] = zk;
    rz += rk * zk;
    rr += rk * rk;
    norm0 += rhs[k] * rhs[k];
  }
  const tol = Math.max(1e-20 * norm0, absTol2);
  for (let it = 0; it < 4000; it++) {
    if (rr <= tol) break;
    const pq = apply(p, q);
    if (!(pq > 0)) break;
    const alpha = rz / pq;
    let next = 0;
    rr = 0;
    for (let k = 0; k < size; k++) {
      x[k] += alpha * p[k];
      const rk = r[k] - alpha * q[k];
      r[k] = rk;
      next += rk * rk * inv[k];
      rr += rk * rk;
    }
    const beta = next / rz;
    rz = next;
    for (let k = 0; k < size; k++) p[k] = r[k] * inv[k] + beta * p[k];
  }
  return x;
}

/**
 * Squeeze a rasterised deposit. `raster` = { cols, rows, cellSize, volume (mm³ per cell) }.
 * `settings` = { gap, airMode, force (N), pressSpeed (mm/s cap), viscosity (Pa·s), yieldStress (Pa),
 *   settleTime (s), holdTime (s, optional press-time limit: the plate stops where it is then), frames,
 *   sourceFraction (per cell, for frame coverage), trace (debug callback after every air classification),
 *   progress (callback(fraction 0–1, plate height) after every accepted press step) }.
 */
export function squeezeRaster(raster, settings) {
  const { cols, rows, cellSize } = raster;
  const n = cols * rows;
  const area = cellSize * cellSize;
  const volume = Float64Array.from(raster.volume);
  const gap = settings.gap;
  const mode = settings.airMode || 'compressible';
  // Power-law film (v2.0): τ = K·γ̇ⁿ with K = `viscosity` (Pa·sⁿ) and n = `flowIndex` (1 = Newtonian). Flow per
  // unit width in a slit of height h under gradient G is q = c·h^(2+1/n)·(G/K)^(1/n), c = 2n/(2n+1)·2^-(2+1/n);
  // through one cell face in Δt that is κ·|Δp|^(1/n−1)·Δp with κ = c·h^(2+1/n)·K^(-1/n)·Δt·Δx^(1−1/n), which is
  // h³Δt/12μ for n = 1. The face factor |Δp|^(1/n−1) is iterated (Picard, damped by n) inside each solve.
  const K = settings.viscosity;
  const nIndex = settings.flowIndex > 0 ? settings.flowIndex : 1;
  const nonlinear = Math.abs(nIndex - 1) > 1e-9;
  const cn = ((2 * nIndex) / (2 * nIndex + 1)) * 2 ** -(2 + 1 / nIndex);
  const kappaOf = (h, dt) => cn * h ** (2 + 1 / nIndex) * K ** (-1 / nIndex) * dt * cellSize ** (1 - 1 / nIndex);
  const dtOf = (h, kappa) => kappa / kappaOf(h, 1);
  // A unit solve's pressures scale as κ^-n (κ^-1 when Newtonian), so the load fixes κ in closed form.
  const kappaForLoad = (unit, F) => (unit / F) ** (1 / nIndex);
  const force = settings.force;
  const tauY = settings.yieldStress || 0;
  const settle = Math.max(0, settings.settleTime ?? PRESS_DEFAULTS.settleTime);
  const holdLimit = settings.holdTime > 0 ? settings.holdTime : Infinity; // s: press time available (v2.2)
  const vmax = settings.pressSpeed > 0 ? settings.pressSpeed : Infinity; // mm/s approach-speed cap
  const frameBudget = settings.frames || 0;
  const sourceFraction = settings.sourceFraction || null;
  let sourceArea = 0;
  if (sourceFraction) for (let i = 0; i < n; i++) sourceArea += sourceFraction[i] * area;
  let crest = 0;
  for (let i = 0; i < n; i++) crest = Math.max(crest, volume[i] / area);

  const neighbours = (i, out) => {
    const x = i % cols;
    out[0] = x > 0 ? i - 1 : -1;
    out[1] = x + 1 < cols ? i + 1 : -1;
    out[2] = i >= cols ? i - cols : -1;
    out[3] = i + cols < n ? i + cols : -1;
    return out;
  };
  const nbBuf = [0, 0, 0, 0];

  // ── air bookkeeping ──
  const state = new Uint8Array(n).fill(OPEN);
  const prevState = new Uint8Array(n);
  const pocketOf = new Int32Array(n).fill(-1);
  const prevPocket = new Int32Array(n);
  const reach = new Uint8Array(n);
  const comp = new Int32Array(n);
  const stack = new Int32Array(n);
  const pockets = new Map();
  let nextId = 0;
  const events = { sealed: 0, vented: 0, collapsed: 0, dissolved: 0, ventedAtmMm3: 0 };
  const tinyGas = ATM * area * gap;
  let time = 0;
  let phase = 'press';
  let peakBubble = 0;

  const air = (i, cap) => Math.max(0, cap - volume[i]);
  const gauge = (b) => b.gas / Math.max(b.air, 1e-12) - ATM;

  function classify(cap, h, record = true) {
    const lim = cap * (1 - DRY);
    const dry = (i) => volume[i] < lim && state[i] !== FROZEN;
    reach.fill(0);
    let top = 0;
    for (let i = 0; i < n; i++) {
      const x = i % cols;
      if ((x === 0 || x === cols - 1 || i < cols || i >= n - cols) && dry(i)) {
        reach[i] = 1;
        stack[top++] = i;
      }
    }
    while (top) {
      const i = stack[--top];
      for (const j of neighbours(i, nbBuf))
        if (j >= 0 && !reach[j] && dry(j)) {
          reach[j] = 1;
          stack[top++] = j;
        }
    }
    if (mode !== 'compressible') {
      for (let i = 0; i < n; i++) {
        if (state[i] === FROZEN) continue;
        if (!dry(i)) state[i] = FILLED;
        else if (reach[i] || mode === 'vent') state[i] = OPEN;
        else state[i] = FROZEN;
      }
      return;
    }
    prevState.set(state);
    prevPocket.set(pocketOf);
    comp.fill(-1);
    const comps = [];
    for (let i0 = 0; i0 < n; i0++) {
      if (comp[i0] >= 0 || reach[i0] || !(volume[i0] < lim)) continue;
      const c = { cells: [], fresh: 0, drained: 0, prior: new Map() };
      comp[i0] = comps.length;
      stack[0] = i0;
      top = 1;
      while (top) {
        const i = stack[--top];
        c.cells.push(i);
        const a = air(i, cap);
        if (prevState[i] === POCKET) c.prior.set(prevPocket[i], (c.prior.get(prevPocket[i]) || 0) + a);
        else if (prevState[i] === OPEN) c.fresh += a;
        else c.drained += a; // film cell the pocket's own air moved into this step
        for (const j of neighbours(i, nbBuf))
          if (j >= 0 && comp[j] < 0 && !reach[j] && volume[j] < lim) {
            comp[j] = comps.length;
            stack[top++] = j;
          }
      }
      comps.push(c);
    }
    state.fill(OPEN);
    pocketOf.fill(-1);
    for (let i = 0; i < n; i++) if (!(volume[i] < lim)) state[i] = FILLED;
    const claimed = new Set();
    const next = new Map();
    // Each previous pocket's gas is split over the components its air now occupies: its former cells
    // plus the film cells its air drained this step (shared among the pockets in that component), and
    // the part that reached an open front, which is lost.
    const priorTotal = new Map();
    const add = (b, a) => priorTotal.set(b, (priorTotal.get(b) || 0) + a);
    for (const c of comps) {
      let own = 0;
      for (const a of c.prior.values()) own += a;
      for (const [b, a] of c.prior) {
        const share = a + (own > 0 ? (c.drained * a) / own : c.drained / c.prior.size);
        c.prior.set(b, share);
        add(b, share);
      }
    }
    for (let i = 0; i < n; i++) if (prevState[i] === POCKET && reach[i]) add(prevPocket[i], air(i, cap));
    // Gas before this step: a record reused by one component must not shrink another's share.
    const priorGas = new Map([...pockets.values()].map((b) => [b.id, b.gas]));
    for (const c of comps) {
      let gas = c.fresh * ATM;
      let lead = null;
      let leadAir = -1;
      for (const [b, a] of c.prior) {
        const old = pockets.get(b);
        if (!old) continue;
        gas += (priorGas.get(b) * a) / Math.max(priorTotal.get(b) || a, 1e-15);
        if (a > leadAir) {
          lead = old;
          leadAir = a;
        }
      }
      if (!(gas > 0)) {
        // Drained below the plate with no air source at all (solver round-off): still film.
        for (const i of c.cells) state[i] = FILLED;
        continue;
      }
      if (gas < tinyGas) {
        // Less air than one final-gap cell at 1 atm: below the grid's resolution. It stays a free
        // surface at atmospheric pressure (fills like an open front) rather than a tracked bubble.
        if (c.prior.size) events.dissolved++;
        continue;
      }
      let rec;
      if (lead && !claimed.has(lead.id)) {
        claimed.add(lead.id);
        rec = lead;
      } else {
        rec = { id: nextId++, sealGap: lead ? lead.sealGap : h, sealTime: lead ? lead.sealTime : time, sealPhase: lead ? lead.sealPhase : phase, maxP: 0, minRatio: 1, q: null };
        if (!lead) events.sealed++;
      }
      rec.gas = gas;
      rec.cells = c.cells.length;
      let a = 0;
      let sx = 0;
      let sy = 0;
      for (const i of c.cells) {
        state[i] = POCKET;
        pocketOf[i] = rec.id;
        const ai = air(i, cap);
        a += ai;
        sx += (i % cols) * ai;
        sy += Math.floor(i / cols) * ai;
      }
      rec.air = a;
      rec.cx = a > 0 ? sx / a : c.cells[0] % cols;
      rec.cy = a > 0 ? sy / a : Math.floor(c.cells[0] / cols);
      const p = gauge(rec);
      rec.p = p;
      if (record) {
        rec.maxP = Math.max(rec.maxP, p);
        rec.minRatio = Math.min(rec.minRatio, (a * ATM) / rec.gas);
        if (phase === 'press' && rec.gas >= 3 * tinyGas) peakBubble = Math.max(peakBubble, p);
      }
      next.set(rec.id, rec);
    }
    const reached = new Set();
    for (let i = 0; i < n; i++) if (prevState[i] === POCKET && state[i] === OPEN) reached.add(prevPocket[i]);
    const merged = new Set();
    for (const c of comps) for (const b of c.prior.keys()) merged.add(b);
    for (const [id, old] of pockets) {
      if (next.has(id) || claimed.has(id) || merged.has(id)) continue;
      // Gone: either its air now reaches an open front (vented) or material filled it.
      if (reached.has(id)) {
        events.vented++;
        events.ventedAtmMm3 += old.gas / ATM;
      } else events.collapsed++;
    }
    pockets.clear();
    for (const [id, rec] of next) pockets.set(id, rec);
    settings.trace?.({ h, time, phase, record, pockets: [...pockets.values()], events: { ...events }, comps });
  }

  // Shortest film path (mm) from each pocket to an open front, for the yield-stress hold.
  // A pocket enclosed by another pocket (film ring inside an air ring, e.g. an outside-in spiral) has no path
  // through film alone: its wall holds against the outer pocket, which holds against the front. Film cells cost
  // one step and cells of other pockets none (0–1 breadth-first search), so the hold adds up along the way.
  // (v2.2 searched film only and gave such a pocket an infinite hold, which made the press time infinite.)
  const dist = new Float64Array(n);
  const ring = new Int32Array(n);
  function holdPressures(h) {
    if (!(tauY > 0)) {
      for (const b of pockets.values()) b.hold = 0;
      return;
    }
    dist.fill(Infinity);
    let count = 0;
    for (let i = 0; i < n; i++)
      if (state[i] === OPEN) {
        dist[i] = 0;
        stack[count++] = i;
      }
    // `stack` holds the cells at the current distance, `ring` those one film step further.
    let level = 0;
    while (count) {
      let next = 0;
      for (let q = 0; q < count; q++) {
        const i = stack[q];
        if (dist[i] !== level) continue; // reached again at a shorter distance
        for (const j of neighbours(i, nbBuf)) {
          if (j < 0) continue;
          const sj = state[j];
          if (sj === POCKET && dist[j] > level) {
            dist[j] = level;
            stack[count++] = j; // same level: `count` grows while this loop runs
          } else if (sj === FILLED && dist[j] > level + 1) {
            dist[j] = level + 1;
            ring[next++] = j;
          }
        }
      }
      stack.set(ring.subarray(0, next));
      count = next;
      level++;
    }
    const best = new Map();
    for (let i = 0; i < n; i++) {
      if (state[i] !== POCKET) continue;
      for (const j of neighbours(i, nbBuf)) if (j >= 0 && state[j] === FILLED) best.set(pocketOf[i], Math.min(best.get(pocketOf[i]) ?? Infinity, dist[j]));
    }
    // Bingham slit: flow needs |∇p| > 2τy/h, so a pocket holds Δp = 2τy·L/h against the open front. A pocket
    // with no film path at all (it touches no film, or the film around it is sealed) holds nothing.
    for (const b of pockets.values()) {
      const cells = best.get(b.id);
      b.hold = Number.isFinite(cells) ? ((2 * tauY) / h) * (cells + 0.5) * cellSize : 0;
    }
  }

  // Plastic-limit load of the film (N) at plate height h (v2.2): in a Bingham slit the paste only flows where
  // |∇p| > 2τy/h, so holding the plate at h takes p = 2τy/h × distance to the nearest open front everywhere in
  // the film. The straight line from a film cell to its nearest front lies in the film, so that distance is the
  // Euclidean one: an exact two-pass distance transform (Felzenszwalb & Huttenlocher) from every open cell.
  // The front itself lies inside that open cell, as far in as the cell is filled (the same ghost-front position
  // the flow solver uses), so the distance is: centre to centre − ½ cell + the open cell's fill. The load of a
  // disc of radius R then comes out at (2π/3)·τy·R³/h. (v2.2 used a 3–4 chamfer metric and put the front at the
  // open cell's near edge, which let the plate stop about 4 % too thin.)
  const BIG = 1e18;
  const span = Math.max(cols, rows);
  const edt = new Float64Array(n); // squared distance to the nearest open cell, in cells
  const lineIn = new Float64Array(span);
  const lineOut = new Float64Array(span);
  const hullAt = new Int32Array(span);
  const hullFrom = new Float64Array(span + 1);
  const lineArg = new Int32Array(span); // which sample each result came from
  const nearestX = new Int32Array(n); // column of the nearest open cell within the row (first pass)
  // Lower envelope of the parabolas f[q] + (x − q)²: the 1-D squared-distance transform.
  function transform(len) {
    let k = 0;
    hullAt[0] = 0;
    hullFrom[0] = -Infinity;
    hullFrom[1] = Infinity;
    for (let q = 1; q < len; q++) {
      let s;
      for (;;) {
        const p = hullAt[k];
        s = (lineIn[q] + q * q - (lineIn[p] + p * p)) / (2 * q - 2 * p);
        if (s <= hullFrom[k] && k > 0) k--;
        else break;
      }
      k++;
      hullAt[k] = q;
      hullFrom[k] = s;
      hullFrom[k + 1] = Infinity;
    }
    k = 0;
    for (let q = 0; q < len; q++) {
      while (hullFrom[k + 1] < q) k++;
      const p = hullAt[k];
      lineOut[q] = (q - p) * (q - p) + lineIn[p];
      lineArg[q] = p;
    }
  }
  function yieldLoad(h) {
    if (!(tauY > 0)) return 0;
    let open = false;
    for (let y = 0; y < rows; y++) {
      const row = y * cols;
      for (let x = 0; x < cols; x++) {
        const o = state[row + x] === OPEN;
        lineIn[x] = o ? 0 : BIG;
        open = open || o;
      }
      transform(cols);
      for (let x = 0; x < cols; x++) {
        edt[row + x] = lineOut[x];
        nearestX[row + x] = lineArg[x];
      }
    }
    if (!open) return 0;
    const cap = h * area;
    let sum = 0;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) lineIn[y] = edt[y * cols + x];
      transform(rows);
      for (let y = 0; y < rows; y++) {
        if (state[y * cols + x] !== FILLED) continue;
        const front = lineArg[y] * cols + nearestX[lineArg[y] * cols + x]; // the nearest open cell
        sum += Math.max(0, Math.sqrt(lineOut[y]) - 0.5 + Math.min(1, Math.max(0, volume[front] / cap)));
      }
    }
    return ((2 * tauY) / h) * sum * cellSize * area * 1e-6;
  }

  // ── linear system for one step ──
  const idx = new Int32Array(n).fill(-1);
  const warm = new Float64Array(n);
  function build(cap, activePockets) {
    const cells = [];
    for (let i = 0; i < n; i++) if (state[i] === FILLED) idx[i] = cells.push(i) - 1;
    const m = cells.length;
    const node = new Map();
    activePockets.forEach((b, k) => node.set(b.id, m + k));
    const size = m + activePockets.length;
    const nb = new Int32Array(4 * m).fill(-1);
    const w = new Float64Array(4 * m);
    const diag = new Float64Array(size);
    const rhsVol = new Float64Array(m);
    const open = [];
    const pface = [];
    const anchored = new Uint8Array(m);
    let excess = 0;
    for (let k = 0; k < m; k++) {
      const i = cells[k];
      rhsVol[k] = volume[i] - cap;
      excess += Math.max(0, rhsVol[k]);
      neighbours(i, nbBuf);
      for (let e = 0; e < 4; e++) {
        const j = nbBuf[e];
        if (j < 0) continue;
        const s = state[j];
        if (s === FILLED) {
          nb[4 * k + e] = idx[j];
          w[4 * k + e] = 1;
          diag[k] += 1;
          continue;
        }
        if (s === FROZEN) continue;
        // Ghost front: the interface sits inside the partly filled neighbour, (½ + fill) cells away.
        const g = 1 / (0.5 + Math.min(1, Math.max(0, volume[j] / cap)));
        if (s === OPEN) {
          open.push(k, j, g);
          diag[k] += g;
          anchored[k] = 1;
        } else {
          const nd = node.get(pocketOf[j]);
          if (nd === undefined) continue; // settled pocket: held by yield stress, acts as a wall
          nb[4 * k + e] = nd;
          w[4 * k + e] = g;
          diag[k] += g;
          diag[nd] += g;
          pface.push(k, j, nd, g, 4 * k + e);
          anchored[k] = 1;
        }
      }
    }
    // Film regions with no open front and no pocket cannot move (incompressible, sealed): freeze them.
    const seen = new Uint8Array(m);
    const members = [];
    for (let k0 = 0; k0 < m; k0++) {
      if (seen[k0]) continue;
      members.length = 0;
      let ok = false;
      seen[k0] = 1;
      members.push(k0);
      for (let s = 0; s < members.length; s++) {
        const k = members[s];
        if (anchored[k]) ok = true;
        for (let e = 4 * k; e < 4 * k + 4; e++) {
          const j = nb[e];
          if (j >= 0 && j < m && !seen[j]) {
            seen[j] = 1;
            members.push(j);
          }
        }
      }
      if (!ok)
        for (const k of members) {
          diag[k] = 1;
          rhsVol[k] = 0;
          nb.fill(-1, 4 * k, 4 * k + 4);
        }
    }
    for (let k = 0; k < size; k++) if (!(diag[k] > 0)) diag[k] = 1;
    const sys = { cells, m, size, nb, w, diag, rhsVol, open, pface, activePockets, excess, cap };
    if (nonlinear) {
      sys.w0 = Float64Array.from(w);
      sys.open0 = open.slice();
      sys.pface0 = pface.slice();
      // ln φ per face (0 = φ of 1).
      sys.phiW = new Float64Array(4 * m);
      sys.phiO = new Float64Array(open.length / 3);
      sys.phiP = new Float64Array(pface.length / 5);
      sys.fixed = new Uint8Array(size);
      for (let k = 0; k < m; k++) {
        let any = false;
        for (let e = 4 * k; e < 4 * k + 4; e++) if (nb[e] >= 0) any = true;
        if (!any) sys.fixed[k] = 1;
      }
      for (let f = 0; f < open.length; f += 3) sys.fixed[open[f]] = 0;
      for (let f = 0; f < pface.length; f += 5) sys.fixed[pface[f]] = 0;
    }
    return sys;
  }

  // Power-law face factors from pressures x (in the units the system is posed in): φ = |∇p|^(1/n−1), with |∇p|
  // the full gradient at the face (its normal difference, w·Δp, and the tangential difference averaged from the
  // cells on either side) so the film conducts the same in every direction, not only along the grid axes. φ is
  // blended geometrically with the previous factors by `beta` (β = n removes the 1-D Picard error in one step);
  // then the effective weights and diagonal. A floor at 1e-4 of the largest face gradient keeps φ finite.
  function reweight(sys, x, beta) {
    const { m, size, nb, w0, open0, pface0, phiW, phiO, phiP, cells } = sys;
    const ex = 1 / nIndex - 1;
    // Central (or one-sided) pressure differences per cell along x and y over film neighbours.
    const gx = new Float64Array(m);
    const gy = new Float64Array(m);
    for (let k = 0; k < m; k++) {
      const l = nb[4 * k];
      const r = nb[4 * k + 1];
      const d = nb[4 * k + 2];
      const u = nb[4 * k + 3];
      const L = l >= 0 && l < m;
      const Rr = r >= 0 && r < m;
      const D = d >= 0 && d < m;
      const U = u >= 0 && u < m;
      gx[k] = L && Rr ? (x[r] - x[l]) / 2 : Rr ? x[r] - x[k] : L ? x[k] - x[l] : 0;
      gy[k] = D && U ? (x[u] - x[d]) / 2 : U ? x[u] - x[k] : D ? x[k] - x[d] : 0;
    }
    // Work with ln φ = (ex/2)·ln(|∇p|²): one log and one exp per face.
    const sq = (normal, tangent) => normal * normal + tangent * tangent;
    let big = 0;
    for (let k = 0; k < m; k++) big = Math.max(big, gx[k] * gx[k] + gy[k] * gy[k]);
    for (let f = 0; f < open0.length; f += 3) big = Math.max(big, (open0[f + 2] * x[open0[f]]) ** 2);
    for (let f = 0; f < pface0.length; f += 5) big = Math.max(big, (pface0[f + 3] * (x[pface0[f]] - x[pface0[f + 2]])) ** 2);
    if (!(big > 0)) return;
    const floor2 = 1e-8 * big; // (1e-4 of the largest gradient)²
    const half = ex / 2;
    const phi = (g2) => half * Math.log(g2 > floor2 ? g2 : floor2);
    const mix = (old, now) => (beta >= 1 ? now : old + beta * (now - old));
    const diag = new Float64Array(size);
    for (let k = 0; k < m; k++)
      for (let e = 4 * k; e < 4 * k + 4; e++) {
        const j = nb[e];
        if (j < 0 || j >= m) continue;
        const across = e - 4 * k < 2 ? (gy[k] + gy[j]) / 2 : (gx[k] + gx[j]) / 2;
        phiW[e] = mix(phiW[e], phi(sq(w0[e] * (x[k] - x[j]), across)));
        sys.w[e] = w0[e] * Math.exp(phiW[e]);
        diag[k] += sys.w[e];
      }
    for (let f = 0, q = 0; f < open0.length; f += 3, q++) {
      const k = open0[f];
      const horizontal = Math.abs(open0[f + 1] - cells[k]) === 1;
      phiO[q] = mix(phiO[q], phi(sq(open0[f + 2] * x[k], horizontal ? gy[k] : gx[k])));
      sys.open[f + 2] = open0[f + 2] * Math.exp(phiO[q]);
      diag[k] += sys.open[f + 2];
    }
    for (let f = 0, q = 0; f < pface0.length; f += 5, q++) {
      const k = pface0[f];
      const nd = pface0[f + 2];
      const horizontal = (pface0[f + 4] - 4 * k) < 2;
      phiP[q] = mix(phiP[q], phi(sq(pface0[f + 3] * (x[k] - x[nd]), horizontal ? gy[k] : gx[k])));
      const g = pface0[f + 3] * Math.exp(phiP[q]);
      sys.pface[f + 3] = g;
      sys.w[pface0[f + 4]] = g;
      diag[k] += g;
      diag[nd] += g;
    }
    for (let k = 0; k < size; k++) sys.diag[k] = sys.fixed[k] || !(diag[k] > 0) ? 1 : diag[k];
  }

  // Solve with film conductance κ (kappaOf; h³Δt/12μ when Newtonian, mm³/Pa); pocket nodes use Newton on
  // pV = const. With κ = 1 and no pockets the unknowns are in volume units ("unit" solve) and scale with κ^-n.
  // A power-law film also iterates its face factors until the pressures settle.
  function solve(sys, kappa, guessScale = 1, tight = false) {
    const { m, size, nb, w, rhsVol, activePockets: act, pface } = sys;
    const x = new Float64Array(size);
    for (let k = 0; k < m; k++) x[k] = warm[sys.cells[k]] * guessScale;
    const B = act.length;
    const V0 = act.map((b) => b.air);
    // A pocket's gas carries the whole film pressure at its wall: the viscous part solved here plus, with a yield
    // stress, the plastic part 2τy/h × its distance to the open front (v2.2: also while pressing; after seating it
    // is the hold that keeps the pocket from re-expanding).
    const hold = act.map((b) => (Number.isFinite(b.hold) ? b.hold : 0));
    const fgas = (b, q) => V0[b] - act[b].gas / Math.max(ATM + q + hold[b], 0.02 * ATM);
    const qi = act.map((b, k) => {
      const now = gauge(b) - hold[k];
      return Number.isFinite(b.q) ? Math.max(now, b.q) : now;
    });
    const absTol2 = size * (((tight ? 1e-10 : CG_TOL) * sys.cap) / kappa) ** 2;
    let inflow = new Float64Array(B);
    if (nonlinear) reweight(sys, x, 1);
    let prevX = null;
    let lastChange = 1;
    for (let it = 0; it < (B ? 5 : 1) + (nonlinear ? PICARD : 0); it++) {
      const diag = Float64Array.from(sys.diag);
      const rhs = new Float64Array(size);
      for (let k = 0; k < m; k++) rhs[k] = rhsVol[k] / kappa;
      for (let b = 0; b < B; b++) {
        const pa = Math.max(ATM + qi[b] + hold[b], 0.02 * ATM);
        const C = act[b].gas / (pa * pa);
        diag[m + b] += C / kappa;
        rhs[m + b] = (C * qi[b] - fgas(b, qi[b])) / kappa;
        x[m + b] = qi[b];
      }
      // Early face-factor rounds only steer the next one: a 10× looser residual is enough there.
      solvePressure(m, size, nb, w, diag, rhs, x, nonlinear && lastChange > 10 * PICARD_TOL ? absTol2 * 100 : absTol2);
      inflow = new Float64Array(B);
      for (let f = 0; f < pface.length; f += 5) inflow[pface[f + 2] - m] += kappa * pface[f + 3] * (x[pface[f]] - x[pface[f + 2]]);
      let worst = 0;
      for (let b = 0; b < B; b++) {
        const q = Math.max(x[m + b], 0.02 * ATM - ATM - hold[b]);
        worst = Math.max(worst, Math.abs(inflow[b] - fgas(b, q)) / (V0[b] + 0.05 * sys.cap));
        qi[b] = q;
      }
      if (!nonlinear) {
        if (worst < 0.02) break;
        continue;
      }
      let change = 1;
      if (prevX) {
        let d = 0;
        let big = 0;
        for (let k = 0; k < m; k++) {
          d = Math.max(d, Math.abs(x[k] - prevX[k]));
          big = Math.max(big, Math.abs(x[k]));
        }
        change = big > 0 ? d / big : 0;
      }
      if (worst < 0.02 && change < (tight ? PICARD_TOL / 10 : PICARD_TOL) && lastChange <= 10 * PICARD_TOL) break;
      lastChange = change;
      prevX = x.slice(0, m);
      reweight(sys, x, nIndex);
    }
    return { x, kappa, inflow, q: qi, hold };
  }

  // Move material along every face; air entering a film cell from a pocket moves no material.
  function trialVolumes(sys, sol) {
    const { cells, m, nb, w, open, pface } = sys;
    const { x, kappa } = sol;
    const trial = Float64Array.from(volume);
    for (let k = 0; k < m; k++)
      for (let e = 4 * k; e < 4 * k + 4; e++) {
        const j = nb[e];
        if (j <= k || j >= m) continue;
        const F = kappa * w[e] * (x[k] - x[j]);
        trial[cells[k]] -= F;
        trial[cells[j]] += F;
      }
    // At an interface face, flow toward the film first pushes the material still in the partly filled
    // interface cell; only once that cell is empty does air advance into the film cell (which then
    // loses that volume through its other faces). Keeps the air/material interface one cell wide.
    const airIn = new Float64Array(m);
    const across = (k, j, F) => {
      if (F >= 0) {
        trial[cells[k]] -= F;
        trial[j] += F;
        return;
      }
      const g = Math.min(-F, Math.max(0, trial[j]));
      trial[j] -= g;
      trial[cells[k]] += g;
      airIn[k] += -F - g;
    };
    for (let f = 0; f < open.length; f += 3) across(open[f], open[f + 1], kappa * open[f + 2] * x[open[f]]);
    for (let f = 0; f < pface.length; f += 5) across(pface[f], pface[f + 1], kappa * pface[f + 3] * (x[pface[f]] - x[pface[f + 2]]));
    // Material entering a pocket fills it from the interface inward: overflow of an interface cell moves
    // on into the same pocket's neighbouring cells, so the pocket's air stays equal to V0 − inflow.
    for (let f = 0; f < pface.length; f += 5) {
      const j0 = pface[f + 1];
      if (!(trial[j0] > sys.cap)) continue;
      const id = pocketOf[j0];
      let excess = trial[j0] - sys.cap;
      trial[j0] = sys.cap;
      const queue = [j0];
      const visited = new Set(queue);
      for (let q = 0; q < queue.length && excess > 0; q++)
        for (const j of neighbours(queue[q], [0, 0, 0, 0])) {
          if (j < 0 || visited.has(j) || state[j] !== POCKET || pocketOf[j] !== id) continue;
          visited.add(j);
          queue.push(j);
          const room = Math.max(0, sys.cap - trial[j]);
          const put = Math.min(room, excess);
          trial[j] += put;
          excess -= put;
        }
      trial[j0] += excess; // the whole pocket is full: the rest stays as overshoot
    }
    let drain = 0;
    let negative = false;
    for (let k = 0; k < m; k++) {
      drain = Math.max(drain, airIn[k] / sys.cap);
      if (trial[cells[k]] < -1e-12 * sys.cap) negative = true;
    }
    // Front overshoot: how far past full a receiving cell ends up (≈ cells the front should have moved).
    let front = 0;
    for (let f = 0; f < open.length; f += 3) front = Math.max(front, (trial[open[f + 1]] - sys.cap) / sys.cap);
    for (let f = 0; f < pface.length; f += 5) front = Math.max(front, (trial[pface[f + 1]] - sys.cap) / sys.cap);
    let swing = 0;
    sys.activePockets.forEach((b, k) => (swing = Math.max(swing, Math.abs(sol.inflow[k]) / (b.air + 0.5 * sys.cap))));
    return { trial, drain, swing, negative, front };
  }

  // Film load (N) for a physical solve: film cells plus every pocket's gauge pressure.
  function load(sys, sol) {
    let s = 0;
    for (let k = 0; k < sys.m; k++) s += sol.x[k];
    sys.activePockets.forEach((b, k) => (s += Math.max(0, sol.q[k] + sol.hold[k]) * b.cells));
    return s * area * 1e-6;
  }
  const unitLoad = (sys, sol) => {
    let s = 0;
    for (let k = 0; k < sys.m; k++) s += sol.x[k];
    return s * area * 1e-6;
  };

  // Rejected steps must leave the air bookkeeping untouched.
  const saveAir = () => ({
    state: state.slice(),
    pocketOf: pocketOf.slice(),
    pockets: [...pockets.values()].map((b) => ({ ...b })),
    events: { ...events },
    nextId,
    peakBubble,
  });
  const restoreAir = (s) => {
    state.set(s.state);
    pocketOf.set(s.pocketOf);
    pockets.clear();
    for (const b of s.pockets) pockets.set(b.id, b);
    Object.assign(events, s.events);
    nextId = s.nextId;
    peakBubble = s.peakBubble;
  };

  // ── frames ──
  const frames = [];
  const snapshot = (h, cap) => {
    const cov = new Uint8Array(n);
    const trapped = new Uint8Array(n);
    const air = new Uint8Array(n); // air share of the cell (pockets and rigid trapped air), 0–255
    let covered = 0;
    for (let i = 0; i < n; i++) {
      const f = state[i] === FROZEN ? 0 : Math.min(1, volume[i] / cap);
      cov[i] = Math.round(f * 255);
      if (state[i] === FROZEN || (state[i] === POCKET && f < 0.5)) trapped[i] = 1;
      if (state[i] === FROZEN || state[i] === POCKET) air[i] = Math.round((1 - f) * 255);
      if (sourceFraction) covered += sourceFraction[i] * f * area;
    }
    // Count bubbles the way the summary does (at least max(3 cells, 0.5 mm²) of footprint).
    const minArea = Math.max(3 * area, 0.5);
    let maxP = 0;
    let count = 0;
    for (const b of pockets.values())
      if (b.air / h >= minArea - 1e-9) {
        count++;
        maxP = Math.max(maxP, gauge(b));
      }
    frames.push({
      gap: h,
      t: time,
      phase,
      coverage: cov,
      trapped,
      air,
      coveredPercent: sourceArea > 0 ? (covered / sourceArea) * 100 : 0,
      bubbles: count,
      bubbleKPa: maxP / 1000,
    });
  };

  // ── phase 1: constant force press from the crest down to the spacer gap ──
  // The plate step adapts so the film front advances about one cell per step (one pressure solve moves
  // material only into the neighbouring cells); a step that crushes a pocket or drains a cell is retried
  // at half the height change.
  const relaxFrames = mode === 'compressible' && settle > 0 && frameBudget > 1 ? Math.max(1, Math.round(frameBudget * 0.3)) : 0;
  const pressFrames = frameBudget > 1 ? frameBudget - relaxFrames : 0;
  const h0 = Math.max(crest, gap);
  const targets = pressFrames > 1 ? Array.from({ length: pressFrames - 1 }, (_, k) => h0 * (gap / h0) ** ((k + 1) / (pressFrames - 1))) : [];
  let target = 0;
  classify(h0 * area, h0, true);
  if (pressFrames > 1) snapshot(h0, h0 * area);
  const DLN_MAX = 0.07;
  let dln = DLN_MAX;
  let kappaPrev = 0;
  let excessPrev = 0;
  let dtLast = 0;
  let substeps = 0;
  let steps = 0;
  let hCur = h0;
  // Past the step budget the rest of the descent uses fixed coarse steps without retries, so the plate
  // always reaches the spacers (with a warning) instead of stopping short.
  const STEP_BUDGET = 900;
  let coarse = false;
  let stalled = null; // 'yield': the force cannot push the paste further; 'time': the hold time ran out
  let peakForce = 0;
  while (hCur > gap * (1 + 1e-12)) {
    if (Number.isFinite(holdLimit) && time >= holdLimit * (1 - 1e-9)) {
      stalled = 'time';
      break;
    }
    if (!coarse && steps >= STEP_BUDGET) {
      coarse = true;
      dln = DLN_MAX;
    }
    const h = Math.max(gap, hCur * Math.exp(-dln));
    const cap = h * area;
    const saved = saveAir();
    classify(cap, h, false);
    // A step that compresses a pocket by geometry alone (absolute pressure up more than 1.8×) is
    // retried smaller. Pinching a channel into pieces is not compression: the gas is split with the
    // air, so each piece keeps the parent's pressure.
    let crushed = false;
    if (!coarse && dln > 2e-4)
      for (const b of saved.pockets) {
        const now = pockets.get(b.id);
        if (now && now.gas / Math.max(now.air, 1e-15) > 1.8 * (b.gas / Math.max(b.air, 1e-15))) crushed = true;
      }
    // The yield stress takes part of the force; the rest drives the viscous flow. At the plastic limit the
    // plate stops (to within 0.1 % of its height).
    const Fy = !crushed && tauY > 0 ? yieldLoad(h) : 0;
    if (Fy >= force * (1 - 1e-3)) {
      restoreAir(saved);
      if (dln > 1e-3) {
        dln *= 0.5;
        substeps++;
        continue;
      }
      stalled = 'yield';
      break;
    }
    const Fv = force - Fy;
    const act = mode === 'compressible' ? [...pockets.values()] : [];
    if (act.length && tauY > 0) holdPressures(h);
    const sys = build(cap, act);
    if (!crushed && (sys.m === 0 || sys.excess <= 1e-12 * cap)) {
      if (Number.isFinite(vmax) && sys.m) time += (hCur - h) / vmax;
      hCur = h; // the plate has not reached any material yet
      continue;
    }
    let sol = null;
    let kappa = 0;
    let t = null;
    let kappaTime = 0; // κ for the step's duration: the solved κ, corrected to the load actually carried
    let applied = 0; // viscous load the film carries this step (N)
    if (!crushed) {
      const guess = kappaPrev && excessPrev ? (kappaPrev * sys.excess) / excessPrev : 0;
      // The plate moves no faster than the approach speed; below that the press force limits it.
      const kappaSpeed = Number.isFinite(vmax) ? kappaOf(h, (hCur - h) / vmax) : 0;
      if (!act.length) {
        // Pressures scale exactly with κ^-n: solve once in volume units and pick κ to carry the force.
        sol = solve(sys, 1, guess ** nIndex);
        kappa = Math.max(kappaSpeed, Fv > 0 ? Math.max(1e-30, kappaForLoad(unitLoad(sys, sol), Fv)) : 1);
        kappaTime = kappa;
        applied = unitLoad(sys, sol) / kappa ** nIndex;
      } else {
        kappa = Math.max(kappaSpeed, guess || Math.max(1e-30, kappaForLoad(unitLoad(sys, solve(build(cap, []), 1, 0)), Fv)));
        let ratio = 1;
        for (let r = 0; r < 3; r++) {
          sol = solve(sys, kappa);
          ratio = load(sys, sol) / Fv;
          if (!(ratio > 0) || Math.abs(ratio - 1) < 0.35 || (ratio < 1 && kappa <= kappaSpeed * (1 + 1e-9))) break;
          kappa = Math.max(kappaSpeed, kappa * Math.min(20, Math.max(0.05, ratio)) ** (1 / nIndex));
        }
        applied = ratio * Fv;
        // The step accepts a load within 35 % of the force (the material moved is set by the plate step). Its
        // duration is not: pressures scale as κ^-n, so the film carries exactly the force at κ·ratio^(1/n)
        // (v2.2; before, the step time could be off by (1.35)^(1/n), about 2× for n = 0.4).
        const speedHeld = kappa <= kappaSpeed * (1 + 1e-9) && ratio < 1;
        kappaTime = ratio > 0 && Number.isFinite(ratio) && !speedHeld ? Math.max(kappaSpeed, kappa * ratio ** (1 / nIndex)) : kappa;
        if (speedHeld) applied = Math.min(applied, Fv);
        else applied = Fv;
      }
      t = trialVolumes(sys, sol);
    }
    if (!coarse && (crushed || t.negative || t.drain > 0.9 || t.swing > 0.6) && dln > 2e-4) {
      restoreAir(saved);
      dln *= 0.5;
      substeps++;
      continue;
    }
    const dt = dtOf(h, kappaTime || kappa);
    // A step without a finite duration would end the press at once as if a hold time had run out.
    if (!Number.isFinite(dt) || dt < 0) throw new Error('壓合計算的時間步長不是有限值；請回報這組設定');
    // Do not run past the hold time by more than 2 %: retry a shorter step that ends about there.
    if (!coarse && time + dt > holdLimit * 1.02 && dln > 2e-4) {
      restoreAir(saved);
      dln = Math.max(2e-4, dln * Math.max(0.05, Math.min(0.9, (0.9 * (holdLimit - time)) / dt)));
      substeps++;
      continue;
    }
    volume.set(t.trial);
    const scale = act.length ? 1 : kappa ** nIndex;
    for (let q = 0; q < sys.m; q++) warm[sys.cells[q]] = sol.x[q] / scale;
    act.forEach((b, q) => (b.q = sol.q[q]));
    // Force the press actually applies: the film's viscous load (below the set force while the approach-speed
    // cap holds the plate back) plus the yield part.
    peakForce = Math.max(peakForce, Fy + applied);
    time += dt;
    dtLast = dt;
    kappaPrev = kappaTime || kappa;
    excessPrev = sys.excess;
    hCur = h;
    steps++;
    classify(cap, h, true);
    if (coarse) dln = DLN_MAX;
    else if (t.front > FRONT || t.swing > 0.3) dln = Math.max(2e-4, dln * 0.6);
    else if (t.front < FRONT * 0.4 && t.swing < 0.15) dln = Math.min(DLN_MAX, dln * 1.25);
    while (target < targets.length && hCur <= targets[target] * (1 + 1e-9)) {
      snapshot(hCur, cap);
      target++;
    }
    // Progress by plate travel in ln h (the steps are about even in it), or by the hold time when that ends first.
    if (settings.progress) {
      const byGap = h0 > gap ? Math.log(h0 / hCur) / Math.log(h0 / gap) : 1;
      settings.progress(Math.min(1, Math.max(byGap, Number.isFinite(holdLimit) ? time / holdLimit : 0)), hCur);
    }
  }
  // Final film thickness: the spacer gap, or where the yield stress or the hold time stopped the plate.
  const hEnd = stalled ? hCur : gap;
  const cap = hEnd * area;
  classify(cap, hEnd);
  const pressTime = time;
  let wetAtSeat = 0;
  for (let i = 0; i < n; i++) if (state[i] === FILLED) wetAtSeat += area;

  // ── phase 2: the plate rests on the spacers; pockets relax against the yield-stress hold ──
  let relaxTime = 0;
  let settled = true;
  if (mode === 'compressible' && settle > 0 && pockets.size) {
    phase = 'relax';
    let dt = Math.min(Math.max(dtLast, 1e-3), settle / 20);
    const marks = Array.from({ length: Math.max(0, relaxFrames - 1) }, (_, k) => settle * 0.002 * 500 ** (k / Math.max(1, relaxFrames - 2)));
    let mark = 0;
    for (let iter = 0; iter < 800; iter++) {
      holdPressures(hEnd);
      const act = [...pockets.values()].filter((b) => gauge(b) - b.hold > HELD);
      if (!act.length) break;
      if (relaxTime >= settle * (1 - 1e-9)) {
        settled = false;
        break;
      }
      const step = Math.min(dt, settle - relaxTime);
      const sys = build(cap, act);
      if (sys.m === 0) break;
      const sol = solve(sys, kappaOf(hEnd, step));
      const t = trialVolumes(sys, sol);
      if ((t.negative || t.drain > 0.6 || t.swing > 0.3) && dt > 1e-6) {
        dt *= 0.5;
        continue;
      }
      volume.set(t.trial);
      for (let q = 0; q < sys.m; q++) warm[sys.cells[q]] = sol.x[q];
      act.forEach((b, q) => (b.q = sol.q[q]));
      relaxTime += step;
      time += step;
      classify(cap, hEnd);
      while (mark < marks.length && relaxTime >= marks[mark]) {
        snapshot(hEnd, cap);
        mark++;
      }
      if (t.swing < 0.05 && t.drain < 0.15) dt *= 2;
      else if (t.swing < 0.12) dt *= 1.3;
    }
  }
  // Final material overshoot: a few rounds with every pocket held in place (no time accounting).
  // Material sealed in by held pockets cannot move; stop once a round no longer reduces the total.
  let before = Infinity;
  for (let round = 0; round < 60; round++) {
    let overshoot = 0;
    let sum = 0;
    for (let i = 0; i < n; i++)
      if (state[i] === FILLED && volume[i] > cap) {
        overshoot = Math.max(overshoot, volume[i] - cap);
        sum += volume[i] - cap;
      }
    if (overshoot < 1e-9 * cap || sum > 0.9 * before) break;
    before = sum;
    const sys = build(cap, []);
    if (sys.m === 0) break;
    volume.set(trialVolumes(sys, solve(sys, 1, 0, true)).trial);
    classify(cap, hEnd);
  }
  holdPressures(hEnd);
  if (frameBudget > 1) {
    if (frames.length >= frameBudget) frames.length = frameBudget - 1;
    snapshot(hEnd, cap);
  }

  return {
    volume,
    state,
    pocketOf,
    pockets: [...pockets.values()],
    frames,
    crest,
    cap,
    gap: hEnd,
    press: {
      time: pressTime,
      stalled,
      finalGap: hEnd,
      peakForceN: peakForce,
      yieldLoadN: tauY > 0 ? yieldLoad(hEnd) : 0,
      relaxTime,
      settled,
      substeps,
      steps,
      coarse,
      seatPressureKPa: wetAtSeat > 0 ? force / (wetAtSeat * 1e-6) / 1000 : 0,
      peakBubbleKPa: peakBubble / 1000,
      ...events,
    },
  };
}

export function estimateCompression(run, options) {
  const c = run.config;
  const o = { shape: 'rectangle', offsetX: 0, offsetY: 0, cellSize: 1, power: 25, frames: 0, ...PRESS_DEFAULTS, ...options };
  if (o.holdTime == null) o.holdTime = 0; // saved settings from before v2.2
  for (const k of ['width', 'depth', 'offsetX', 'offsetY', 'gap', 'cellSize', 'power', 'pressKgf', 'pressSpeed', 'settleTime', 'holdTime'])
    if (!Number.isFinite(o[k])) throw new Error(`${k} 必須是有限數值`);
  if (!['rectangle', 'circle'].includes(o.shape)) throw new Error('熱源形狀必須為矩形或圓形');
  if (!AIR_MODES.includes(o.airMode)) throw new Error('夾氣處理方式無效');
  if (o.width <= 0 || o.width > 1000 || o.depth <= 0 || o.depth > 1000 || o.gap < 0.02 || o.gap > 10 || o.cellSize < 0.2 || o.cellSize > 10)
    throw new Error('熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm');
  if (o.power < 0 || o.power > 10000) throw new Error('熱源功耗需介於 0 與 10000 W');
  if (o.pressKgf < 0.01 || o.pressKgf > 5000) throw new Error('壓合力需介於 0.01 與 5000 kgf');
  if (o.settleTime < 0 || o.settleTime > 3600) throw new Error('靜置時間需介於 0 與 3600 s');
  if (o.holdTime < 0 || o.holdTime > 86400) throw new Error('保壓時間需介於 0（不限）與 86400 s');
  if (o.pressSpeed < 0.01 || o.pressSpeed > 100) throw new Error('壓板下降速度上限需介於 0.01 與 100 mm/s');
  const material = MATERIALS[c.material] || MATERIALS.putty;
  // null / undefined means "material default"; anything else must be a valid number.
  if (o.viscosity != null && !(o.viscosity >= 1 && o.viscosity <= 1e7)) throw new Error('有效黏度需介於 1 與 10,000,000 Pa·s');
  if (o.yieldStress != null && !(o.yieldStress >= 0 && o.yieldStress <= 1e6)) throw new Error('降伏應力需介於 0 與 1,000,000 Pa');
  if (o.flowIndex != null && !(o.flowIndex >= 0.1 && o.flowIndex <= 1.2)) throw new Error('剪切變稀指數需介於 0.1 與 1.2');
  const { viscosity, flowIndex, yieldStress } = squeezeRheology(c, o);
  if (!(viscosity >= 1 && viscosity <= 1e7)) throw new Error('有效黏度需介於 1 與 10,000,000 Pa·s');
  if (!(yieldStress >= 0 && yieldStress <= 1e6)) throw new Error('降伏應力需介於 0 與 1,000,000 Pa');
  const conductivity = Number.isFinite(o.conductivity) && o.conductivity > 0 ? o.conductivity : material.conductivity;
  const contact = Number.isFinite(o.contactResistance) && o.contactResistance >= 0 ? o.contactResistance : material.contactResistance;
  const deposits = run.summary.deposits;
  const depositedMl = deposits.reduce((a, b) => a + b, 0);
  if (!Number.isFinite(depositedMl) || depositedMl < 0 || deposits.some((v) => !Number.isFinite(v) || v < 0))
    throw new Error('沉積體積資料無效');
  const totalMm3 = depositedMl * 1000;
  const targetDepth = o.shape === 'circle' ? o.width : o.depth;
  // A line or pattern starts from the deposited glue as laid pass by pass (deposit.js: passes that come back
  // over earlier glue land on it, the needle presses and ploughs a pile that reaches it); a dot from its cap.
  const field = c.mode === 'point' ? null : o.field || runField(run);
  const sources = field ? [] : depositSources(run);
  const dot = c.mode === 'point' ? dotDimensions(depositedMl, c.dotRatio, c.standoff, c.diameter) : null;
  let glue = null;
  if (field) {
    const g = field.grid;
    glue = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
    for (let j = 0; j < g.ny; j++)
      for (let i = 0; i < g.nx; i++)
        if (field.z[j * g.nx + i] > 0) {
          const x = g.originX + (i + 0.5) * g.cell;
          const y = g.originY + (j + 0.5) * g.cell;
          glue.minX = Math.min(glue.minX, x);
          glue.maxX = Math.max(glue.maxX, x);
          glue.minY = Math.min(glue.minY, y);
          glue.maxY = Math.max(glue.maxY, y);
        }
    if (!(glue.maxX >= glue.minX)) glue = null;
  }

  // Domain: heat source and deposit plus the farthest any material could travel (all of it as one disc).
  // Cells beyond the workpiece simply count as off-workpiece; the workpiece itself is not gridded.
  const halfBead = Math.max(dot ? dot.radius : 0, ...sources.map((s) => s.width / 2), 0);
  const spread = Math.sqrt(totalMm3 / (Math.PI * o.gap)) + halfBead + 4 * o.cellSize;
  const xs = glue ? [glue.minX, glue.maxX] : sources.map((s) => s.x);
  const ys = glue ? [glue.minY, glue.maxY] : sources.map((s) => s.y);
  const minX = Math.min(o.offsetX - o.width / 2, c.offsetX, ...xs) - spread;
  const maxX = Math.max(o.offsetX + o.width / 2, c.offsetX, ...xs) + spread;
  const minY = Math.min(o.offsetY - targetDepth / 2, c.offsetY, ...ys) - spread;
  const maxY = Math.max(o.offsetY + targetDepth / 2, c.offsetY, ...ys) + spread;
  let cellSize = Math.max(o.cellSize, Math.sqrt(((maxX - minX) * (maxY - minY)) / (MAX_CELLS * 0.89)));
  let cols = Math.ceil((maxX - minX) / cellSize);
  let rows = Math.ceil((maxY - minY) / cellSize);
  while (cols * rows > MAX_CELLS) {
    cellSize *= 1.02;
    cols = Math.ceil((maxX - minX) / cellSize);
    rows = Math.ceil((maxY - minY) / cellSize);
  }
  const originX = minX;
  const originY = minY;
  const n = cols * rows;
  const area = cellSize * cellSize;
  const centerX = (i) => originX + ((i % cols) + 0.5) * cellSize;
  const centerY = (i) => originY + (Math.floor(i / cols) + 0.5) * cellSize;
  const cellOf = (x, y) => {
    const ix = Math.floor((x - originX) / cellSize);
    const iy = Math.floor((y - originY) / cellSize);
    return ix < 0 || iy < 0 || ix >= cols || iy >= rows ? -1 : iy * cols + ix;
  };

  // Rasterise the deposit: a line or pattern from its deposit field (each fine cell's glue into the squeeze
  // cell under it, exact volume), a dot with its spherical-cap cross-section.
  const deposit = new Float64Array(n);
  const addWeighted = (v, samples, fx, fy) => {
    let sum = 0;
    for (const [, w] of samples) sum += w;
    if (sum <= 0) {
      const i = cellOf(fx, fy);
      if (i >= 0) deposit[i] += v;
      return;
    }
    for (const [i, w] of samples) deposit[i] += (v * w) / sum;
  };
  if (dot && sources.length) {
    const s = sources[0];
    const b = dot.radius;
    const H = dot.height;
    const R = (b * b + H * H) / (2 * H);
    const samples = [];
    // Bounded sub-sampling: a dot smaller than the sampling pitch lands in its containing cell
    // through the addWeighted fallback instead of costing sub² evaluations per cell.
    const sub = Math.min(8, Math.max(1, Math.ceil(cellSize / Math.max(b / 6, 1e-6))));
    for (let iy = Math.floor((s.y - b - originY) / cellSize); iy <= Math.floor((s.y + b - originY) / cellSize); iy++)
      for (let ix = Math.floor((s.x - b - originX) / cellSize); ix <= Math.floor((s.x + b - originX) / cellSize); ix++) {
        if (ix < 0 || iy < 0 || ix >= cols || iy >= rows) continue;
        let w = 0;
        for (let a = 0; a < sub; a++)
          for (let d = 0; d < sub; d++) {
            const r = Math.hypot(originX + (ix + (a + 0.5) / sub) * cellSize - s.x, originY + (iy + (d + 0.5) / sub) * cellSize - s.y);
            if (r < b) w += Math.sqrt(R * R - r * r) - (R - H);
          }
        if (w > 0) samples.push([iy * cols + ix, w]);
      }
    addWeighted(s.v, samples, s.x, s.y);
  } else if (field) {
    const g = field.grid;
    const a = g.cell * g.cell;
    for (let j = 0; j < g.ny; j++)
      for (let i = 0; i < g.nx; i++) {
        const v = field.z[j * g.nx + i];
        if (!(v > 0)) continue;
        const k = cellOf(g.originX + (i + 0.5) * g.cell, g.originY + (j + 0.5) * g.cell);
        if (k >= 0) deposit[k] += v * a;
      }
  }

  const sourceFraction = new Float32Array(n);
  const partFraction = new Float32Array(n);
  const insideSource = (x, y) =>
    o.shape === 'circle'
      ? (x - o.offsetX) ** 2 + (y - o.offsetY) ** 2 <= (o.width / 2) ** 2
      : Math.abs(x - o.offsetX) <= o.width / 2 && Math.abs(y - o.offsetY) <= o.depth / 2;
  let sourceSampleArea = 0;
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      let f = 0;
      let p = 0;
      for (let sy = 0; sy < 4; sy++)
        for (let sx = 0; sx < 4; sx++) {
          const px = originX + (x + (sx + 0.5) / 4) * cellSize;
          const py = originY + (y + (sy + 0.5) / 4) * cellSize;
          if (insideSource(px, py)) f += 1 / 16;
          if (Math.abs(px) <= c.width / 2 && Math.abs(py) <= c.depth / 2) p += 1 / 16;
        }
      sourceFraction[i] = f;
      partFraction[i] = p;
      sourceSampleArea += f * area;
    }

  const force = o.pressKgf * KGF;
  const sq = squeezeRaster(
    { cols, rows, cellSize, volume: deposit },
    { gap: o.gap, airMode: o.airMode, force, pressSpeed: o.pressSpeed, viscosity, flowIndex, yieldStress, settleTime: o.settleTime, holdTime: o.holdTime, frames: o.frames, sourceFraction, trace: o.trace, progress: o.progress },
  );
  const volume = sq.volume;
  const cap = sq.cap;
  const crest = sq.crest;

  // Material still standing above the plate at the final gap (sealed by rigid trapped air).
  let unresolved = 0;
  for (let i = 0; i < n; i++) unresolved += Math.max(0, volume[i] - cap);

  // Final metrics at the assembly gap. Air fraction per cell: a rigid trapped cell is all air; a
  // compressible pocket cell holds its unfilled share.
  const coverage = new Float32Array(n);
  const voidMask = new Uint8Array(n);
  const airFraction = new Float32Array(n);
  let coveredArea = 0;
  let inside = 0;
  let offWorkpiece = 0;
  let accounted = 0;
  let wetArea = 0;
  let squeezeOut = 0;
  for (let i = 0; i < n; i++) {
    const v = volume[i];
    const s = sq.state[i];
    coverage[i] = s === FROZEN ? 0 : Math.min(1, v / cap);
    airFraction[i] = s === FROZEN ? 1 : s === POCKET ? 1 - coverage[i] : 0;
    voidMask[i] = s === FROZEN || (s === POCKET && coverage[i] < 0.5) ? 1 : 0;
    coveredArea += sourceFraction[i] * coverage[i] * area;
    wetArea += coverage[i] * area;
    inside += v * sourceFraction[i];
    offWorkpiece += v * (1 - partFraction[i]);
    accounted += v;
    if (coverage[i] >= 0.5 && sourceFraction[i] < 0.5) {
      const x = centerX(i) - o.offsetX;
      const y = centerY(i) - o.offsetY;
      const out =
        o.shape === 'circle'
          ? Math.hypot(x, y) - o.width / 2
          : Math.hypot(Math.max(0, Math.abs(x) - o.width / 2), Math.max(0, Math.abs(y) - o.depth / 2));
      squeezeOut = Math.max(squeezeOut, out);
    }
  }
  // Air pockets: compressible pockets by identity, rigid ones as connected frozen cells.
  const voids = [];
  const pocketById = new Map(sq.pockets.map((b) => [b.id, b]));
  const seen = new Uint8Array(n);
  const stack = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    if (!airFraction[i] || seen[i]) continue;
    const id = sq.pocketOf[i];
    let a = 0;
    let inSource = 0;
    let sx = 0;
    let sy = 0;
    let top = 0;
    seen[i] = 1;
    stack[top++] = i;
    while (top) {
      const k = stack[--top];
      const f = airFraction[k];
      a += f * area;
      inSource += f * sourceFraction[k] * area;
      sx += centerX(k) * f;
      sy += centerY(k) * f;
      const x = k % cols;
      for (const j of [x > 0 ? k - 1 : -1, x + 1 < cols ? k + 1 : -1, k >= cols ? k - cols : -1, k + cols < n ? k + cols : -1])
        if (j >= 0 && airFraction[j] && !seen[j] && sq.pocketOf[j] === id) {
          seen[j] = 1;
          stack[top++] = j;
        }
    }
    if (!(a > 0)) continue;
    const b = id >= 0 ? pocketById.get(id) : null;
    voids.push({
      areaMm2: a,
      inSourceMm2: inSource,
      x: sx / (a / area),
      y: sy / (a / area),
      ...(b
        ? {
            pressureKPa: (b.gas / Math.max(b.air, 1e-12) - ATM) / 1000,
            volumeRatio: (b.air * ATM) / b.gas,
            atmVolumeMm3: b.gas / ATM,
            sealGapMm: b.sealGap,
            minRatio: b.minRatio,
            sealedDuring: b.sealPhase,
          }
        : {}),
    });
  }
  voids.sort((a, b) => b.inSourceMm2 - a.inSourceMm2 || b.areaMm2 - a.areaMm2);
  // One- or two-cell pockets are lattice noise where fronts meet diagonally; report them separately.
  const minVoid = Math.max(3 * area, 0.5);
  const sourceVoids = voids.filter((v) => v.inSourceMm2 > 1e-9 && v.areaMm2 >= minVoid - 1e-9);
  const tinyVoidMm2 = voids.filter((v) => v.areaMm2 < minVoid - 1e-9).reduce((s, v) => s + v.inSourceMm2, 0);
  const voidInSource = sourceVoids.reduce((s, v) => s + v.inSourceMm2, 0);

  const sourceArea = o.shape === 'circle' ? (Math.PI * o.width ** 2) / 4 : o.width * o.depth;
  const requiredMl = (sourceArea * o.gap) / 1000;
  const coveredPercent = sourceSampleArea > 0 ? (coveredArea / sourceSampleArea) * 100 : 0;
  // 1-D conduction through the wetted part of the heat-source footprint only:
  // θ = BLT / k + R_contact (°C·cm²/W), R = θ / wetted area.
  // Bond line: the spacer gap, or the thicker film where the yield stress or the hold time stopped the plate.
  const bondLine = sq.gap;
  const blt = bondLine / 1000;
  const impedanceCm2 = (blt / conductivity) * 1e4 + contact;
  const sourceCm2 = sourceArea / 100;
  const wetCm2 = (coveredPercent / 100) * sourceCm2;
  const thermal = {
    conductivity,
    contactResistance: contact,
    bondLineMm: bondLine,
    power: o.power,
    bulkImpedanceCm2: (blt / conductivity) * 1e4,
    impedanceCm2,
    idealResistance: impedanceCm2 / sourceCm2,
    resistance: wetCm2 > 0 ? impedanceCm2 / wetCm2 : Infinity,
  };
  thermal.idealRise = thermal.idealResistance * o.power;
  thermal.rise = thermal.resistance * o.power;

  const pressed = sourceVoids.filter((v) => Number.isFinite(v.volumeRatio));
  const press = {
    airMode: o.airMode,
    forceN: force,
    forceKgf: o.pressKgf,
    pressSpeed: o.pressSpeed,
    viscosity,
    flowIndex,
    yieldStress,
    settleTime: o.settleTime,
    pressTime: sq.press.time,
    holdTime: o.holdTime,
    stalled: sq.press.stalled,
    finalGapMm: bondLine,
    peakForceN: sq.press.peakForceN,
    peakForceKgf: sq.press.peakForceN / KGF,
    yieldLoadN: sq.press.yieldLoadN,
    relaxTime: sq.press.relaxTime,
    settled: sq.press.settled,
    seatPressureKPa: sq.press.seatPressureKPa,
    peakBubbleKPa: sq.press.peakBubbleKPa,
    sealed: sq.press.sealed,
    vented: sq.press.vented,
    collapsed: sq.press.collapsed,
    remaining: voids.filter((v) => v.areaMm2 >= minVoid - 1e-9).length, // resolved bubbles left anywhere
    bubbleKPa: pressed.length ? Math.max(...pressed.map((v) => v.pressureKPa)) : 0,
    volumeRatio: pressed.length ? pressed.reduce((s, v) => s + v.volumeRatio * v.inSourceMm2, 0) / pressed.reduce((s, v) => s + v.inSourceMm2, 0) : null,
    substeps: sq.press.substeps,
  };

  const AIR_TEXT = {
    compressible: '被膠包圍的空氣依 pV = 常數（等溫）壓縮與回脹，可隨膠流移動、在膠牆變薄時排出',
    rigid: '被膠包圍的乾區凍結為不可變形的夾氣（v1.0 剛性牆）',
    vent: '被膠包圍的空氣假設全部排出（覆蓋率上限）',
  };
  // `issues`: the warnings that call for a change of settings; the rest describe what the model leaves out.
  const issues = [];
  const warnings = [
    `覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（冪律膏體 K ${Math.round(viscosity)} Pa·sⁿ、n ${+flowIndex.toFixed(2)}，與出膠用同一組流變；定力 ${o.pressKgf} kgf 壓到墊片）；${AIR_TEXT[o.airMode]}。未含壁滑、觸變、潤濕與指狀穿透，不能判定實際接觸或可靠度。`,
    '熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。',
  ];
  const flag = (text) => {
    warnings.push(text);
    issues.push(text);
  };
  if (o.airMode === 'compressible' && sq.press.sealed > 0)
    warnings.push(
      `壓到墊片後膠壓消退，被壓縮的氣泡會回脹（降伏應力 ${yieldStress} Pa 只擋住一小部分）；靜置 ${o.settleTime} s ${sq.press.settled ? '內已大致穩定' : '時仍在回脹'}。透明板實測建議在壓好後 0 s、30 s、2 min、10 min 各拍一張比對。`,
    );
  if (sq.press.coarse)
    warnings.push('壓合步數超過上限，後段改以粗步長完成；覆蓋與夾氣仍有效，但壓合時間與壓合中的氣壓精度下降。');
  if (sq.press.stalled === 'yield')
    flag(
      `以 ${o.pressKgf} kgf 壓不到墊片：膠層停在約 ${bondLine.toFixed(3)} mm（目標 ${o.gap} mm）。降伏應力 ${yieldStress} Pa 時，膠層越薄、攤得越大，要推動它所需的力越大（平板塑性極限 F ≈ 2τy/h × ∫ 到膠緣距離 dA），到這裡已等於壓合力。熱阻以這個膠層厚度計算；要壓到墊片需要更大的力。降伏應力為 AI 初估，請以透明板實測停住的厚度回推。`,
    );
  else if (sq.press.stalled === 'time')
    flag(
      `保壓 ${o.holdTime} s 時膠層還在 ${bondLine.toFixed(3)} mm（目標 ${o.gap} mm），壓合停在這裡：覆蓋、夾氣與熱阻都以這個厚度計算。實際持續施力時膠層會繼續變薄。`,
    );
  if (!sq.press.stalled && sq.press.time > 120) {
    const t = sq.press.time;
    const span = t < 600 ? `${t.toFixed(0)} s` : t < 7200 ? `${(t / 60).toFixed(0)} 分鐘` : `${(t / 3600).toFixed(1)} 小時`;
    flag(
      `以 ${o.pressKgf} kgf 壓到墊片約需 ${span}：越接近墊片膠層越薄、膠流越慢，剪切變稀的膏體在低剪切率下黏度很高，最後一段最花時間。實際組裝時間內膠層可能停在比墊片厚的地方（熱阻變高）；要更薄需要更大的力或更長的保壓。壓合中的氣泡壓縮與最後的覆蓋仍以壓到墊片計算。`,
    );
  }
  if (o.airMode === 'compressible' && sq.press.sealed > 0)
    warnings.push('氣泡在膠牆變薄處排出（吹破）的位置與時機受網格影響（指狀穿透未完整解析）；比較圖樣請使用相同網格，建議 ≤ 0.5 mm。');
  if (unresolved > 1e-9) warnings.push('部分膠量被夾氣區完全包圍而無法再推出，已保留在原位；局部膜厚可能高於間隙。');
  if (cellSize > o.cellSize * 1.001)
    warnings.push(`為控制計算量，網格由 ${o.cellSize.toFixed(2)} mm 調整為 ${cellSize.toFixed(2)} mm；細節精度下降。`);
  if (Math.abs(sourceSampleArea - sourceArea) > sourceArea * 0.05)
    flag('熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。');
  if (Math.abs(o.offsetX) + o.width / 2 > c.width / 2 || Math.abs(o.offsetY) + targetDepth / 2 > c.depth / 2)
    flag('熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。');
  if (offWorkpiece > 1e-6) flag('估算有材料超出工件矩形範圍；未模擬實際邊緣流失。');
  if (voidInSource > 0)
    flag(
      `熱源內有 ${sourceVoids.length} 處被膠包圍的夾氣區（共 ${voidInSource.toFixed(1)} mm²）；外框、螺旋與蛇形較易發生，需透明板實測確認。`,
    );
  if (c.workpieceKind !== 'plate') warnings.push('匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。');
  if (c.mode === 'pattern')
    warnings.push('壓合從依出膠順序鋪出的膠面開始（重複經過處疊在先前的膠上，針嘴壓膠、推膠已算）；交叉處夾進的小氣泡、針頭沾膠與流變細節沒有算，並非已驗證的流變模擬。');
  if (sq.press.peakForceN < force * 0.98 && !sq.press.stalled)
    warnings.push(
      `壓板受下降速度上限 ${o.pressSpeed} mm/s 限制，壓合過程最大只用到 ${(sq.press.peakForceN / KGF).toFixed(1)} kgf（設定 ${o.pressKgf} kgf）。螺絲鎖附這類位移控制的組裝，可把壓合力設成治具或螺絲能提供的上限、下降速度設成實際鎖附速度，看這個力與元件可承受的壓力。`,
    );
  if (o.gap < material.minBondLine)
    flag(
      `${material.name} 資料表最小黏結層厚度為 ${material.minBondLine} mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。`,
    );
  else if (o.gap < 1.5 * material.minBondLine)
    flag(
      `目標間隙 ${o.gap} mm 接近 ${material.name} 的最小黏結層厚度 ${material.minBondLine} mm（TDS）：膠層這麼薄時填料顆粒會互相卡住，實際需要的壓合力可能比模型高很多，膠層也可能停在比墊片更厚處。模型把膏體當連續流體，沒有算這一段；請用透明板或實際組裝量膠層厚度。`,
    );

  return {
    options: o,
    grid: { originX, originY, cellSize, cols, rows, coverage, sourceFraction, voidMask, airFraction, frames: sq.frames, crest },
    summary: {
      depositedMl,
      sourceAreaMm2: sourceArea,
      requiredMl,
      coveredPercent,
      idealVolumePercent: requiredMl > 0 ? Math.min(100, (depositedMl / requiredMl) * 100) : 0,
      volumeRatio: requiredMl > 0 ? depositedMl / requiredMl : 0,
      insideMl: inside / 1000,
      outsideMl: (accounted - inside) / 1000,
      offWorkpieceMl: offWorkpiece / 1000,
      conservationErrorMl: accounted / 1000 - depositedMl,
      unresolvedMl: unresolved / 1000,
      wetAreaMm2: wetArea,
      squeezeOutMm: squeezeOut,
      voidCount: sourceVoids.length,
      voidAreaMm2: voidInSource,
      voidPercent: sourceArea > 0 ? (voidInSource / sourceArea) * 100 : 0,
      largestVoidMm2: sourceVoids.length ? Math.max(...sourceVoids.map((v) => v.inSourceMm2)) : 0,
      tinyVoidMm2,
      minVoidMm2: minVoid,
      crestMm: crest,
      steps: sq.press.steps,
      press,
      thermal,
      material: material.name,
    },
    voids,
    warnings,
    issues,
    assumptions: 'engineering_assumption',
    model: `hele_shaw_squeeze_v1.1_${o.airMode}`,
  };
}
