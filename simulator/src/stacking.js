import { runField } from './deposit.js';

/*
 * Stacked glue where a path comes back over itself (a star's spokes laid out and back, a centre crossed again
 * and again, a corner folding onto itself), read from the deposit field that the 3D bead and the squeeze use
 * (deposit.js): how high the glue stands and where, and whether the needle tip met glue of an earlier pass.
 * When it does, the needle presses its new glue flat against that pile and pushes aside what stands above its
 * tip — both are in the field; what it does not show is the glue the needle wets and carries off (strings,
 * smears, a drop falling later).
 */

const cache = new WeakMap();

// Where a point of a run lies: the heat-source (path) centre, a vertex of the path (tip, corner), or along it.
function placeOf(run, x, y) {
  const c = run.config;
  const cx = c.mode === 'pattern' ? (c.pathSettings?.offsetX ?? 0) : c.offsetX;
  const cy = c.mode === 'pattern' ? (c.pathSettings?.offsetY ?? 0) : c.offsetY;
  if (Math.hypot(x - cx, y - cy) < 1.5) return 'centre';
  return run.path?.points?.some((p) => Math.hypot(p.x - x, p.y - y) < 1.2) ? 'vertex' : 'path';
}

/** Highest stacked glue of a run, where it is, and whether the needle met glue it had laid before (cached). */
export function stackedBead(run) {
  if (cache.has(run)) return cache.get(run);
  const c = run.config;
  const single = run.summary.maxHeight;
  let result;
  if (c.mode === 'point') {
    result = { maxHeight: single, single, x: c.offsetX, y: c.offsetY, overlap: false, contact: false, where: 'point', contactMm: 0, ploughedMm3: 0, stackedMm3: 0 };
  } else {
    const f = runField(run);
    if (!(f.volumeMm3 > 0)) {
      result = { maxHeight: 0, single, x: 0, y: 0, overlap: false, contact: false, where: 'none', contactMm: 0, ploughedMm3: 0, stackedMm3: 0 };
    } else {
      // Passes overlap noticeably when the stack clearly exceeds the single bead; the needle meets an
      // earlier pass when that glue reaches its tip.
      const contact = f.contactMm > 0;
      result = {
        maxHeight: f.maxHeight,
        single,
        x: f.x,
        y: f.y,
        overlap: f.maxHeight > single * 1.15 + 1e-6,
        contact,
        where: placeOf(run, f.x, f.y),
        contactWhere: contact ? placeOf(run, f.contactX, f.contactY) : null,
        contactMm: f.contactMm,
        ploughedMm3: f.ploughedMm3,
        stackedMm3: f.stackedMm3,
        cell: f.grid.cell,
      };
    }
  }
  cache.set(run, result);
  return result;
}
