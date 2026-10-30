import { beadProfile, dotDimensions } from './engine.js';
import { pointOnPath } from './path-planning.js';
import { MATERIALS } from './materials.js';

/*
 * Squeeze estimate (v1.0): a discrete Hele-Shaw squeeze between two flat parallel plates.
 *
 * The deposited bead is rasterised with its own cross-section. The plate then descends from the bead
 * crest to the assembly gap in small steps. At each step every cell taller than the plate is pressed:
 * its excess volume is pushed out by a lubrication pressure field (∇²p = excess, p = 0 on the free
 * front), which spreads material radially, rounds dots into discs and lets neighbouring beads merge.
 * Any dry pocket that becomes completely surrounded by material is frozen as trapped air and is never
 * refilled. For a Newtonian film the front shape does not depend on viscosity or plate speed, so none is
 * needed; yield stress, wall slip, wetting, air compression and force are NOT modelled. Results are an
 * engineering approximation for comparing patterns, not a validated rheology solution.
 */

const MAX_CELLS = 90000;

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
  const profile = beadProfile(deposits, run.cellLength, c.lineRatio);
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

// Jacobi-preconditioned conjugate gradient on the pressed cells (5-point Laplacian, p = 0 on free cells).
function solvePressure(cells, nb, diag, rhs, x) {
  const m = cells.length;
  const r = new Float64Array(m);
  const z = new Float64Array(m);
  const p = new Float64Array(m);
  const q = new Float64Array(m);
  const apply = (v, out) => {
    for (let k = 0; k < m; k++) {
      let s = diag[k] * v[k];
      for (let e = 4 * k; e < 4 * k + 4; e++) if (nb[e] >= 0) s -= v[nb[e]];
      out[k] = s;
    }
  };
  apply(x, q);
  let rz = 0;
  let norm0 = 0;
  for (let k = 0; k < m; k++) {
    r[k] = rhs[k] - q[k];
    z[k] = r[k] / diag[k];
    p[k] = z[k];
    rz += r[k] * z[k];
    norm0 += rhs[k] * rhs[k];
  }
  // Relative residual 1e-4 is ample: the transferred volume is rescaled to the exact excess afterwards.
  const tol = 1e-8 * Math.max(norm0, 1e-30);
  for (let it = 0; it < 2000; it++) {
    let rr = 0;
    for (let k = 0; k < m; k++) rr += r[k] * r[k];
    if (rr <= tol) break;
    apply(p, q);
    let pq = 0;
    for (let k = 0; k < m; k++) pq += p[k] * q[k];
    if (!(pq > 0)) break;
    const alpha = rz / pq;
    let next = 0;
    for (let k = 0; k < m; k++) {
      x[k] += alpha * p[k];
      r[k] -= alpha * q[k];
      z[k] = r[k] / diag[k];
      next += r[k] * z[k];
    }
    const beta = next / rz;
    rz = next;
    for (let k = 0; k < m; k++) p[k] = z[k] + beta * p[k];
  }
  return x;
}

export function estimateCompression(run, options) {
  const c = run.config;
  const o = { shape: 'rectangle', offsetX: 0, offsetY: 0, cellSize: 1, power: 25, frames: 0, ...options };
  for (const k of ['width', 'depth', 'offsetX', 'offsetY', 'gap', 'cellSize', 'power'])
    if (!Number.isFinite(o[k])) throw new Error(`${k} 必須是有限數值`);
  if (!['rectangle', 'circle'].includes(o.shape)) throw new Error('熱源形狀必須為矩形或圓形');
  if (o.width <= 0 || o.width > 1000 || o.depth <= 0 || o.depth > 1000 || o.gap < 0.02 || o.gap > 10 || o.cellSize < 0.2 || o.cellSize > 10)
    throw new Error('熱源尺寸需為 0–1000 mm、間隙 0.02–10 mm、網格 0.2–10 mm');
  if (o.power < 0 || o.power > 10000) throw new Error('熱源功耗需介於 0 與 10000 W');
  const material = MATERIALS[c.material] || MATERIALS.putty;
  const conductivity = Number.isFinite(o.conductivity) && o.conductivity > 0 ? o.conductivity : material.conductivity;
  const contact = Number.isFinite(o.contactResistance) && o.contactResistance >= 0 ? o.contactResistance : material.contactResistance;
  const deposits = run.summary.deposits;
  const depositedMl = deposits.reduce((a, b) => a + b, 0);
  if (!Number.isFinite(depositedMl) || depositedMl < 0 || deposits.some((v) => !Number.isFinite(v) || v < 0))
    throw new Error('沉積體積資料無效');
  const totalMm3 = depositedMl * 1000;
  const targetDepth = o.shape === 'circle' ? o.width : o.depth;
  const sources = depositSources(run);
  const dot = c.mode === 'point' ? dotDimensions(depositedMl, c.dotRatio) : null;

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
  const volume = new Float64Array(n);
  const addWeighted = (v, samples, fx, fy) => {
    let sum = 0;
    for (const [, w] of samples) sum += w;
    if (sum <= 0) {
      const i = cellOf(fx, fy);
      if (i >= 0) volume[i] += v;
      return;
    }
    for (const [i, w] of samples) volume[i] += (v * w) / sum;
  };
  if (dot && sources.length) {
    const s = sources[0];
    const b = dot.radius;
    const H = dot.height;
    const R = (b * b + H * H) / (2 * H);
    const samples = [];
    const sub = Math.max(1, Math.ceil(cellSize / Math.max(b / 6, 1e-6)));
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
  let crest = 0;
  for (let i = 0; i < n; i++) crest = Math.max(crest, volume[i] / area);

  // Air: a dry cell (not filled to the plate) is open if it can reach the plate edge through dry cells.
  const trapped = new Uint8Array(n);
  const reach = new Uint8Array(n);
  const stack = new Int32Array(n);
  const neighbours = (i, out) => {
    const x = i % cols;
    out[0] = x > 0 ? i - 1 : -1;
    out[1] = x + 1 < cols ? i + 1 : -1;
    out[2] = i >= cols ? i - cols : -1;
    out[3] = i + cols < n ? i + cols : -1;
    return out;
  };
  const nbBuf = [0, 0, 0, 0];
  const markTrapped = (cap) => {
    reach.fill(0);
    let top = 0;
    const dry = (i) => volume[i] < cap * (1 - 1e-9) && !trapped[i];
    for (let i = 0; i < n; i++) {
      const x = i % cols;
      const border = x === 0 || x === cols - 1 || i < cols || i >= n - cols;
      if (border && dry(i)) {
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
    let added = 0;
    for (let i = 0; i < n; i++)
      if (dry(i) && !reach[i]) {
        trapped[i] = 1;
        added++;
      }
    return added;
  };

  // Press the film to plate height h: push every cell's excess out through the pressure field.
  let unresolved = 0;
  const warm = new Float64Array(n);
  const index = new Int32Array(n).fill(-1);
  // Intermediate plate steps take one pressure solve and carry any front overshoot to the next step;
  // the final step iterates until no cell stands above the plate.
  const press = (h, rounds) => {
    const cap = h * area;
    for (let round = 0; round < rounds; round++) {
      const cells = [];
      for (let i = 0; i < n; i++) if (volume[i] > cap * (1 + 1e-12) || (volume[i] >= cap * (1 - 1e-12) && !trapped[i])) cells.push(i);
      let excess = 0;
      for (const i of cells) excess += Math.max(0, volume[i] - cap);
      if (excess <= 1e-12 * Math.max(totalMm3, 1)) break;
      const m = cells.length;
      cells.forEach((i, k) => (index[i] = k));
      const nb = new Int32Array(4 * m);
      const diag = new Float64Array(m);
      const rhs = new Float64Array(m);
      const outlets = [];
      for (let k = 0; k < m; k++) {
        const i = cells[k];
        rhs[k] = Math.max(0, volume[i] - cap);
        neighbours(i, nbBuf);
        for (let e = 0; e < 4; e++) {
          const j = nbBuf[e];
          nb[4 * k + e] = -1;
          if (j < 0 || trapped[j]) continue; // plate edge never reached; trapped air is a wall
          diag[k]++;
          if (index[j] >= 0) nb[4 * k + e] = index[j];
          else outlets.push(k, j);
        }
        if (diag[k] === 0) diag[k] = 1e-9;
      }
      if (!outlets.length) {
        unresolved += excess;
        cells.forEach((i) => (index[i] = -1));
        break;
      }
      const guess = new Float64Array(m);
      for (let k = 0; k < m; k++) guess[k] = warm[cells[k]];
      const pressure = solvePressure(cells, nb, diag, rhs, guess);
      warm.fill(0);
      for (let k = 0; k < m; k++) warm[cells[k]] = pressure[k];
      let sent = 0;
      for (let e = 0; e < outlets.length; e += 2) sent += Math.max(0, pressure[outlets[e]]);
      const scale = sent > 0 ? excess / sent : 0;
      for (const i of cells) volume[i] = Math.min(volume[i], cap);
      for (let e = 0; e < outlets.length; e += 2) volume[outlets[e + 1]] += Math.max(0, pressure[outlets[e]]) * scale;
      cells.forEach((i) => (index[i] = -1));
    }
    return cap;
  };

  // Plate steps from the crest to the gap; at most ~7 % volume pushed per step.
  const frames = [];
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
  const snapshot = (h, cap) => {
    const cov = new Uint8Array(n);
    let covered = 0;
    for (let i = 0; i < n; i++) {
      const f = Math.min(1, volume[i] / cap);
      cov[i] = trapped[i] ? 0 : Math.round(f * 255);
      covered += trapped[i] ? 0 : sourceFraction[i] * f * area;
    }
    frames.push({ gap: h, coverage: cov, trapped: trapped.slice(), coveredPercent: sourceSampleArea > 0 ? (covered / sourceSampleArea) * 100 : 0 });
  };
  const steps = crest > o.gap ? Math.min(80, Math.max(4, Math.ceil(Math.log(o.gap / crest) / Math.log(0.93)))) : 1;
  const keep = o.frames > 1 ? new Set(Array.from({ length: o.frames }, (_, k) => Math.round((k * steps) / (o.frames - 1)))) : new Set();
  if (keep.has(0)) snapshot(Math.max(crest, o.gap), Math.max(crest, o.gap) * area);
  let cap = o.gap * area;
  for (let k = 1; k <= steps; k++) {
    const h = crest > o.gap ? crest * (o.gap / crest) ** (k / steps) : o.gap;
    cap = press(h, k === steps ? 60 : 1);
    markTrapped(cap);
    if (keep.has(k)) snapshot(h, cap);
  }

  // Final metrics at the assembly gap.
  const coverage = new Float32Array(n);
  const voidMask = new Uint8Array(n);
  let coveredArea = 0;
  let inside = 0;
  let offWorkpiece = 0;
  let accounted = 0;
  let wetArea = 0;
  let squeezeOut = 0;
  for (let i = 0; i < n; i++) {
    const v = volume[i];
    coverage[i] = trapped[i] ? 0 : Math.min(1, v / cap);
    voidMask[i] = trapped[i];
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
  // Connected trapped-air pockets (4-connectivity).
  const voids = [];
  const seen = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (!voidMask[i] || seen[i]) continue;
    let cells = 0;
    let inSource = 0;
    let sx = 0;
    let sy = 0;
    let top = 0;
    seen[i] = 1;
    stack[top++] = i;
    while (top) {
      const k = stack[--top];
      cells++;
      inSource += sourceFraction[k];
      sx += centerX(k);
      sy += centerY(k);
      for (const j of neighbours(k, nbBuf))
        if (j >= 0 && voidMask[j] && !seen[j]) {
          seen[j] = 1;
          stack[top++] = j;
        }
    }
    voids.push({ areaMm2: cells * area, inSourceMm2: inSource * area, x: sx / cells, y: sy / cells });
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

  const warnings = [
    '覆蓋與空洞來自平行板 Hele-Shaw 擠壓近似（牛頓流體形狀、被包圍的乾區視為夾氣不再填入）；未含屈服應力、壁滑、潤濕、壓合力與氣體壓縮，不能判定實際接觸或可靠度。',
    '熱阻為一維估算：(間隙 ÷ 導熱率 + TDS 推算接觸熱阻) ÷ 濕潤面積；不含擴散熱阻與空洞周邊的橫向傳熱，只供方案相對比較。',
  ];
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
    grid: { originX, originY, cellSize, cols, rows, coverage, sourceFraction, voidMask, frames, crest },
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
      steps,
      thermal,
      material: material.name,
    },
    voids,
    warnings,
    assumptions: 'engineering_assumption',
    model: 'hele_shaw_squeeze_v1',
  };
}
