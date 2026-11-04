import { beadProfile, dotDimensions } from './engine.js';
import { pointOnPath } from './path-planning.js';
import { MATERIALS } from './materials.js';

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
 * Effective Newtonian viscosity; yield stress only limits the post-press relaxation. Not a validated
 * rheology or fingering solution.
 */

export const ATM = 101325; // Pa
export const KGF = 9.80665; // N
export const AIR_MODES = Object.freeze(['compressible', 'rigid', 'vent']);
export const PRESS_DEFAULTS = Object.freeze({ airMode: 'compressible', pressKgf: 10, pressSpeed: 1, settleTime: 300 });

const MAX_CELLS = 90000;
const FILLED = 0;
const OPEN = 1;
const POCKET = 2;
const FROZEN = 3;
const DRY = 1e-3; // a cell below (1 − DRY) of the plate height is dry (well above solver round-off)
const HELD = 0.003 * ATM; // overpressure below which a relaxing pocket counts as settled
const CG_TOL = 5e-5; // per-cell volume residual / cell volume; 20× below DRY so round-off never opens cells
const FRONT = 0.8; // target front overshoot per plate step (cells)

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

/** Effective squeeze rheology for a run: options override the material card. */
export function squeezeRheology(config, options = {}) {
  const material = MATERIALS[config.material] || MATERIALS.putty;
  const viscosity =
    Number.isFinite(options.viscosity) && options.viscosity > 0
      ? options.viscosity
      : config.material === 'grease' && Number.isFinite(config.viscosity) && config.viscosity > 0
        ? config.viscosity
        : material.squeezeViscosity;
  const yieldStress = Number.isFinite(options.yieldStress) && options.yieldStress >= 0 ? options.yieldStress : material.yieldStress;
  return { viscosity, yieldStress };
}

// Jacobi-preconditioned conjugate gradient. Rows 0..m−1 are film cells (4 faces each, `nb`/`w`);
// rows m.. are pocket nodes, coupled only through the film cells' faces (the matrix stays symmetric).
function solvePressure(m, size, nb, w, diag, rhs, x, absTol2) {
  const r = new Float64Array(size);
  const z = new Float64Array(size);
  const p = new Float64Array(size);
  const q = new Float64Array(size);
  const apply = (v, out) => {
    for (let k = 0; k < size; k++) out[k] = diag[k] * v[k];
    for (let k = 0; k < m; k++)
      for (let e = 4 * k; e < 4 * k + 4; e++) {
        const j = nb[e];
        if (j < 0) continue;
        out[k] -= w[e] * v[j];
        if (j >= m) out[j] -= w[e] * v[k];
      }
  };
  apply(x, q);
  let rz = 0;
  let norm0 = 0;
  for (let k = 0; k < size; k++) {
    r[k] = rhs[k] - q[k];
    z[k] = r[k] / diag[k];
    p[k] = z[k];
    rz += r[k] * z[k];
    norm0 += rhs[k] * rhs[k];
  }
  const tol = Math.max(1e-20 * norm0, absTol2);
  for (let it = 0; it < 4000; it++) {
    let rr = 0;
    for (let k = 0; k < size; k++) rr += r[k] * r[k];
    if (rr <= tol) break;
    apply(p, q);
    let pq = 0;
    for (let k = 0; k < size; k++) pq += p[k] * q[k];
    if (!(pq > 0)) break;
    const alpha = rz / pq;
    let next = 0;
    for (let k = 0; k < size; k++) {
      x[k] += alpha * p[k];
      r[k] -= alpha * q[k];
      z[k] = r[k] / diag[k];
      next += r[k] * z[k];
    }
    const beta = next / rz;
    rz = next;
    for (let k = 0; k < size; k++) p[k] = z[k] + beta * p[k];
  }
  return x;
}

/**
 * Squeeze a rasterised deposit. `raster` = { cols, rows, cellSize, volume (mm³ per cell) }.
 * `settings` = { gap, airMode, force (N), pressSpeed (mm/s cap), viscosity (Pa·s), yieldStress (Pa),
 *   settleTime (s), frames, sourceFraction (per cell, for frame coverage), trace (debug callback after
 *   every air classification) }.
 */
export function squeezeRaster(raster, settings) {
  const { cols, rows, cellSize } = raster;
  const n = cols * rows;
  const area = cellSize * cellSize;
  const volume = Float64Array.from(raster.volume);
  const gap = settings.gap;
  const mode = settings.airMode || 'compressible';
  const mu = settings.viscosity;
  const force = settings.force;
  const tauY = settings.yieldStress || 0;
  const settle = Math.max(0, settings.settleTime ?? PRESS_DEFAULTS.settleTime);
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
  const dist = new Float64Array(n);
  function holdPressures(h) {
    if (!(tauY > 0)) {
      for (const b of pockets.values()) b.hold = 0;
      return;
    }
    dist.fill(Infinity);
    let head = 0;
    let tail = 0;
    for (let i = 0; i < n; i++)
      if (state[i] === OPEN) {
        dist[i] = 0;
        stack[tail++] = i;
      }
    while (head < tail) {
      const i = stack[head++];
      for (const j of neighbours(i, nbBuf))
        if (j >= 0 && state[j] === FILLED && dist[j] === Infinity) {
          dist[j] = dist[i] + 1;
          stack[tail++] = j;
        }
    }
    const best = new Map();
    for (let i = 0; i < n; i++) {
      if (state[i] !== POCKET) continue;
      for (const j of neighbours(i, nbBuf)) if (j >= 0 && state[j] === FILLED) best.set(pocketOf[i], Math.min(best.get(pocketOf[i]) ?? Infinity, dist[j]));
    }
    // Bingham slit: flow needs |∇p| > 2τy/h, so a pocket holds Δp = 2τy·L/h against the open front.
    for (const b of pockets.values()) b.hold = ((2 * tauY) / h) * ((best.get(b.id) ?? Infinity) + 0.5) * cellSize;
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
    return { cells, m, size, nb, w, diag, rhsVol, open, pface, activePockets, excess, cap };
  }

  // Solve with film conductance κ = h³Δt/12μ (mm³/Pa); pocket nodes use Newton on pV = const.
  // With κ = 1 and no pockets the unknowns are in volume units ("unit" solve) and scale with 1/κ.
  function solve(sys, kappa, guessScale = 1, tight = false) {
    const { m, size, nb, w, rhsVol, activePockets: act, pface } = sys;
    const x = new Float64Array(size);
    for (let k = 0; k < m; k++) x[k] = warm[sys.cells[k]] * guessScale;
    const B = act.length;
    const V0 = act.map((b) => b.air);
    const hold = act.map((b) => (phase === 'relax' ? b.hold || 0 : 0));
    const fgas = (b, q) => V0[b] - act[b].gas / Math.max(ATM + q + hold[b], 0.02 * ATM);
    const qi = act.map((b, k) => {
      const now = gauge(b) - hold[k];
      return Number.isFinite(b.q) ? Math.max(now, b.q) : now;
    });
    const absTol2 = size * (((tight ? 1e-10 : CG_TOL) * sys.cap) / kappa) ** 2;
    let inflow = new Float64Array(B);
    for (let it = 0; it < (B ? 5 : 1); it++) {
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
      solvePressure(m, size, nb, w, diag, rhs, x, absTol2);
      inflow = new Float64Array(B);
      for (let f = 0; f < pface.length; f += 5) inflow[pface[f + 2] - m] += kappa * pface[f + 3] * (x[pface[f]] - x[pface[f + 2]]);
      let worst = 0;
      for (let b = 0; b < B; b++) {
        const q = Math.max(x[m + b], 0.02 * ATM - ATM - hold[b]);
        worst = Math.max(worst, Math.abs(inflow[b] - fgas(b, q)) / (V0[b] + 0.05 * sys.cap));
        qi[b] = q;
      }
      if (worst < 0.02) break;
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
    let covered = 0;
    for (let i = 0; i < n; i++) {
      const f = state[i] === FROZEN ? 0 : Math.min(1, volume[i] / cap);
      cov[i] = Math.round(f * 255);
      if (state[i] === FROZEN || (state[i] === POCKET && f < 0.5)) trapped[i] = 1;
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
  while (hCur > gap * (1 + 1e-12)) {
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
    const act = mode === 'compressible' ? [...pockets.values()] : [];
    const sys = build(cap, act);
    if (!crushed && (sys.m === 0 || sys.excess <= 1e-12 * cap)) {
      if (Number.isFinite(vmax) && sys.m) time += (hCur - h) / vmax;
      hCur = h; // the plate has not reached any material yet
      continue;
    }
    let sol = null;
    let kappa = 0;
    let t = null;
    if (!crushed) {
      const guess = kappaPrev && excessPrev ? (kappaPrev * sys.excess) / excessPrev : 0;
      // The plate moves no faster than the approach speed; below that the press force limits it.
      const kappaSpeed = Number.isFinite(vmax) ? (h ** 3 * ((hCur - h) / vmax)) / (12 * mu) : 0;
      if (!act.length) {
        // Pressures scale exactly with 1/κ: solve once in volume units and pick κ to carry the force.
        sol = solve(sys, 1, guess);
        kappa = Math.max(kappaSpeed, force > 0 ? Math.max(1e-30, unitLoad(sys, sol) / force) : 1);
      } else {
        kappa = Math.max(kappaSpeed, guess || Math.max(1e-30, unitLoad(sys, solve(build(cap, []), 1, 0)) / force));
        for (let r = 0; r < 3; r++) {
          sol = solve(sys, kappa);
          const ratio = load(sys, sol) / force;
          if (!(ratio > 0) || Math.abs(ratio - 1) < 0.35 || (ratio < 1 && kappa <= kappaSpeed * (1 + 1e-9))) break;
          kappa = Math.max(kappaSpeed, kappa * Math.min(20, Math.max(0.05, ratio)));
        }
      }
      t = trialVolumes(sys, sol);
    }
    if (!coarse && (crushed || t.negative || t.drain > 0.9 || t.swing > 0.6) && dln > 2e-4) {
      restoreAir(saved);
      dln *= 0.5;
      substeps++;
      continue;
    }
    volume.set(t.trial);
    const scale = act.length ? 1 : kappa;
    for (let q = 0; q < sys.m; q++) warm[sys.cells[q]] = sol.x[q] / scale;
    act.forEach((b, q) => (b.q = sol.q[q]));
    const dt = (12 * mu * kappa) / h ** 3;
    time += dt;
    dtLast = dt;
    kappaPrev = kappa;
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
  }
  const cap = gap * area;
  classify(cap, gap);
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
      holdPressures(gap);
      const act = [...pockets.values()].filter((b) => gauge(b) - b.hold > HELD);
      if (!act.length) break;
      if (relaxTime >= settle * (1 - 1e-9)) {
        settled = false;
        break;
      }
      const step = Math.min(dt, settle - relaxTime);
      const sys = build(cap, act);
      if (sys.m === 0) break;
      const sol = solve(sys, (gap ** 3 * step) / (12 * mu));
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
      classify(cap, gap);
      while (mark < marks.length && relaxTime >= marks[mark]) {
        snapshot(gap, cap);
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
    classify(cap, gap);
  }
  holdPressures(gap);
  if (frameBudget > 1) {
    if (frames.length >= frameBudget) frames.length = frameBudget - 1;
    snapshot(gap, cap);
  }

  return {
    volume,
    state,
    pocketOf,
    pockets: [...pockets.values()],
    frames,
    crest,
    cap,
    press: {
      time: pressTime,
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
  for (const k of ['width', 'depth', 'offsetX', 'offsetY', 'gap', 'cellSize', 'power', 'pressKgf', 'pressSpeed', 'settleTime'])
    if (!Number.isFinite(o[k])) throw new Error(`${k} 必須是有限數值`);
  if (!['rectangle', 'circle'].includes(o.shape)) throw new Error('熱源形狀必須為矩形或圓形');
  if (!AIR_MODES.includes(o.airMode)) throw new Error('夾氣處理方式無效');
  if (o.width <= 0 || o.width > 1000 || o.depth <= 0 || o.depth > 1000 || o.gap < 0.02 || o.gap > 10 || o.cellSize < 0.2 || o.cellSize > 10)
    throw new Error('熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm');
  if (o.power < 0 || o.power > 10000) throw new Error('熱源功耗需介於 0 與 10000 W');
  if (o.pressKgf < 0.01 || o.pressKgf > 5000) throw new Error('壓合力需介於 0.01 與 5000 kgf');
  if (o.settleTime < 0 || o.settleTime > 3600) throw new Error('靜置時間需介於 0 與 3600 s');
  if (o.pressSpeed < 0.01 || o.pressSpeed > 100) throw new Error('壓板下降速度上限需介於 0.01 與 100 mm/s');
  const material = MATERIALS[c.material] || MATERIALS.putty;
  // null / undefined means "material default"; anything else must be a valid number.
  if (o.viscosity != null && !(o.viscosity >= 1 && o.viscosity <= 1e7)) throw new Error('有效黏度需介於 1 與 10,000,000 Pa·s');
  if (o.yieldStress != null && !(o.yieldStress >= 0 && o.yieldStress <= 1e6)) throw new Error('降伏應力需介於 0 與 1,000,000 Pa');
  const { viscosity, yieldStress } = squeezeRheology(c, o);
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
  const sources = depositSources(run);
  const dot = c.mode === 'point' ? dotDimensions(depositedMl, c.dotRatio, c.standoff, c.diameter) : null;

  // Domain: heat source and deposit plus the farthest any material could travel (all of it as one disc).
  // Cells beyond the workpiece simply count as off-workpiece; the workpiece itself is not gridded.
  const halfBead = Math.max(dot ? dot.radius : 0, ...sources.map((s) => s.width / 2), 0);
  const spread = Math.sqrt(totalMm3 / (Math.PI * o.gap)) + halfBead + 4 * o.cellSize;
  const xs = sources.map((s) => s.x);
  const ys = sources.map((s) => s.y);
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

  // Rasterise the undisturbed deposit with its own cross-section (half-ellipse bead, spherical-cap dot).
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
  } else {
    for (const s of sources) {
      const half = Math.max(s.width / 2, 1e-6);
      const count = Math.max(1, Math.min(256, Math.ceil((4 * half) / cellSize)));
      const samples = [];
      for (let j = 0; j < count; j++) {
        const u = ((2 * (j + 0.5)) / count - 1) * half;
        const i = cellOf(s.x - s.ty * u, s.y + s.tx * u);
        if (i >= 0) samples.push([i, Math.sqrt(Math.max(0, 1 - (u / half) ** 2))]);
      }
      addWeighted(s.v, samples, s.x, s.y);
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
    { gap: o.gap, airMode: o.airMode, force, pressSpeed: o.pressSpeed, viscosity, yieldStress, settleTime: o.settleTime, frames: o.frames, sourceFraction, trace: o.trace },
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
  const blt = o.gap / 1000;
  const impedanceCm2 = (blt / conductivity) * 1e4 + contact;
  const sourceCm2 = sourceArea / 100;
  const wetCm2 = (coveredPercent / 100) * sourceCm2;
  const thermal = {
    conductivity,
    contactResistance: contact,
    bondLineMm: o.gap,
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
    yieldStress,
    settleTime: o.settleTime,
    pressTime: sq.press.time,
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
  const warnings = [
    `覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（等效牛頓黏度 ${Math.round(viscosity)} Pa·s、定力 ${o.pressKgf} kgf 壓到墊片）；${AIR_TEXT[o.airMode]}。未含剪切稀化、壁滑、潤濕與指狀穿透，不能判定實際接觸或可靠度。`,
    '熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。',
  ];
  if (o.airMode === 'compressible' && sq.press.sealed > 0)
    warnings.push(
      `壓到墊片後膠壓消退，被壓縮的氣泡會回脹（降伏應力 ${yieldStress} Pa 只擋住一小部分）；靜置 ${o.settleTime} s ${sq.press.settled ? '內已大致穩定' : '時仍在回脹'}。透明板實測建議在壓好後 0 s、30 s、2 min、10 min 各拍一張比對。`,
    );
  if (sq.press.coarse)
    warnings.push('壓合步數超過上限，後段改以粗步長完成；覆蓋與夾氣仍有效，但壓合時間與壓合中的氣壓精度下降。');
  if (sq.press.time > 120) warnings.push(`以 ${o.pressKgf} kgf 壓到墊片約需 ${sq.press.time.toFixed(0)} s；實際手壓若較快，壓合中的氣泡壓縮會更大。`);
  if (o.airMode === 'compressible' && sq.press.sealed > 0)
    warnings.push('氣泡在膠牆變薄處排出（吹破）的位置與時機受網格影響（指狀穿透未完整解析）；比較圖樣請使用相同網格，建議 ≤ 0.5 mm。');
  if (unresolved > 1e-9) warnings.push('部分膠量被夾氣區完全包圍而無法再推出，已保留在原位；局部膜厚可能高於間隙。');
  if (cellSize > o.cellSize * 1.001)
    warnings.push(`為控制計算量，網格由 ${o.cellSize.toFixed(2)} mm 調整為 ${cellSize.toFixed(2)} mm；細節精度下降。`);
  if (Math.abs(sourceSampleArea - sourceArea) > sourceArea * 0.05)
    warnings.push('熱源相對網格過小，熱源面積的網格取樣誤差超過 5%；請縮小工件範圍或使用更細網格，覆蓋數值不宜判讀。');
  if (Math.abs(o.offsetX) + o.width / 2 > c.width / 2 || Math.abs(o.offsetY) + targetDepth / 2 > c.depth / 2)
    warnings.push('熱源範圍超出工件矩形參考邊界；請核對尺寸和中心偏移，匯入工件僅以包圍框近似。');
  if (offWorkpiece > 1e-6) warnings.push('估算有材料超出工件矩形範圍；未模擬實際邊緣流失。');
  if (voidInSource > 0)
    warnings.push(
      `熱源內有 ${sourceVoids.length} 處被膠包圍的夾氣區（共 ${voidInSource.toFixed(1)} mm²）；外框、螺旋與蛇形較易發生，需透明板實測確認。`,
    );
  if (c.workpieceKind !== 'plate') warnings.push('匯入工件仍以其矩形邊界和水平上表面近似，不包含孔洞與曲面。');
  if (c.mode === 'pattern') warnings.push('膠沿規劃路徑累加；彎角、重疊與壓合輪廓為幾何近似，並非已驗證的流變模擬。');
  if (o.gap < material.minBondLine)
    warnings.push(
      `${material.name} 資料表最小黏結層厚度為 ${material.minBondLine} mm；目前目標間隙較小，須向廠商確認適用性，不代表此模型已考慮顆粒或硬接觸。`,
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
    assumptions: 'engineering_assumption',
    model: `hele_shaw_squeeze_v1.1_${o.airMode}`,
  };
}
