import { depositSources } from './compression.js';

/*
 * Stacked glue height where a path comes back over itself: a star's spokes laid out and back, a centre
 * crossed again and again, tips where the nozzle stops. The bead profile and its burial check describe one
 * pass on a clean surface; here every deposit is laid with its own bead cross-section (the half ellipse of
 * the bead profile) and the passes are added on a fine grid. Volume-conserving and local: nothing spreads or
 * is scraped, so a pile above the standoff means the nozzle meets glue it laid earlier (scraping, wetting the
 * needle, strings), which the simulation does not model. Engineering estimate, not wetting physics.
 */

const MAX_CELLS = 500000;
const cache = new WeakMap();

/** Highest stacked glue of a run, where it is, and whether the nozzle would meet it (cached per run). */
export function stackedBead(run) {
  if (cache.has(run)) return cache.get(run);
  const c = run.config;
  const single = run.summary.maxHeight;
  let result;
  if (c.mode === 'point') {
    result = { maxHeight: single, single, x: c.offsetX, y: c.offsetY, overlap: false, contact: false, where: 'point' };
  } else {
    const src = depositSources(run);
    if (!src.length) {
      result = { maxHeight: 0, single, x: 0, y: 0, overlap: false, contact: false, where: 'none' };
    } else {
      const widths = src.map((s) => s.width).filter((w) => w > 0).sort((a, b) => a - b);
      const typical = widths.length ? widths[Math.floor(widths.length / 2)] : 1;
      const maxW = widths.length ? widths.at(-1) : 1;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const s of src) {
        minX = Math.min(minX, s.x);
        maxX = Math.max(maxX, s.x);
        minY = Math.min(minY, s.y);
        maxY = Math.max(maxY, s.y);
      }
      const pad = maxW + run.cellLength + 0.5;
      minX -= pad;
      minY -= pad;
      maxX += pad;
      maxY += pad;
      // At least six cells across a typical bead, at most 0.1 mm, within the cell budget.
      let h = Math.min(0.1, Math.max(0.02, typical / 6));
      while (Math.ceil((maxX - minX) / h) * Math.ceil((maxY - minY) / h) > MAX_CELLS) h *= 1.1;
      const nx = Math.ceil((maxX - minX) / h);
      const ny = Math.ceil((maxY - minY) / h);
      const vol = new Float64Array(nx * ny);
      const put = (i, j, v) => {
        if (i >= 0 && j >= 0 && i < nx && j < ny) vol[j * nx + i] += v;
      };
      // Bilinear splatting onto cell centres, so the result does not depend on how samples fall into cells.
      const add = (x, y, v) => {
        const fx = (x - minX) / h - 0.5;
        const fy = (y - minY) / h - 0.5;
        const i = Math.floor(fx);
        const j = Math.floor(fy);
        const ax = fx - i;
        const ay = fy - j;
        put(i, j, v * (1 - ax) * (1 - ay));
        put(i + 1, j, v * ax * (1 - ay));
        put(i, j + 1, v * (1 - ax) * ay);
        put(i + 1, j + 1, v * ax * ay);
      };
      const along = Math.max(2, Math.ceil((2 * run.cellLength) / h));
      for (const s of src) {
        const w = Math.max(s.width, h);
        const across = Math.max(4, Math.ceil((2 * w) / h));
        let sum = 0;
        for (let b = 0; b < across; b++) sum += Math.sqrt(Math.max(0, 1 - ((2 * (b + 0.5)) / across - 1) ** 2));
        const share = s.v / (sum * along);
        for (let a = 0; a < along; a++) {
          const t = ((a + 0.5) / along - 0.5) * run.cellLength;
          for (let b = 0; b < across; b++) {
            const q = (2 * (b + 0.5)) / across - 1;
            const u = (q * w) / 2;
            add(s.x + s.tx * t - s.ty * u, s.y + s.ty * t + s.tx * u, share * Math.sqrt(Math.max(0, 1 - q * q)));
          }
        }
      }
      let best = 0;
      let at = 0;
      for (let k = 0; k < vol.length; k++)
        if (vol[k] > best) {
          best = vol[k];
          at = k;
        }
      const maxHeight = best / (h * h);
      const x = minX + ((at % nx) + 0.5) * h;
      const y = minY + (Math.floor(at / nx) + 0.5) * h;
      // Where the pile is: the heat-source (path) centre, a vertex of the path (tip, corner), or along it.
      const cx = c.mode === 'pattern' ? (c.pathSettings?.offsetX ?? 0) : c.offsetX;
      const cy = c.mode === 'pattern' ? (c.pathSettings?.offsetY ?? 0) : c.offsetY;
      const nearVertex = run.path?.points?.some((p) => Math.hypot(p.x - x, p.y - y) < 1.2);
      const where = Math.hypot(x - cx, y - cy) < 1.5 ? 'centre' : nearVertex ? 'vertex' : 'path';
      // Passes overlap noticeably when the stack clearly exceeds the single bead; the nozzle meets the
      // earlier glue when the stack stands above it.
      const overlap = maxHeight > single * 1.15 + 1e-6;
      result = { maxHeight, single, x, y, overlap, contact: overlap && maxHeight > c.standoff * 1.05, where, cell: h };
    }
  }
  cache.set(run, result);
  return result;
}
