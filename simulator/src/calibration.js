// Squeeze calibration from one pressed-dot test (v3.0): a dot of known mass between two flat transparent
// plates, pressed with a known force for a known time, spreads to a disc whose diameter is easy to measure.
// The closed-form squeeze of a constant-volume disc then gives the paste's consistency at squeeze shear rates
// (far below those in the needle, where the flow calibration works), or its yield stress when the disc has
// stopped growing. Same film model as compression.js: power law plus an additive Bingham plastic limit.

const KGF = 9.80665; // N

/** Plastic-limit load (N) of a disc of volume V (m³) at thickness h (m): F_y = (2π/3)·τy·R³/h, R² = V/(πh). */
const yieldLoad = (tauY, V, h) => ((2 * Math.PI) / 3) * tauY * (V / Math.PI) ** 1.5 * h ** -2.5;

/** Thickness (mm) at which a force can no longer thin a disc of this volume against its yield stress. */
export function plasticLimitMm(tauY, volumeMm3, forceN) {
  if (!(tauY > 0) || !(forceN > 0) || !(volumeMm3 > 0)) return 0;
  return ((((2 * Math.PI) / 3) * tauY * (volumeMm3 * 1e-9 / Math.PI) ** 1.5) / forceN) ** 0.4 * 1000;
}

/**
 * Thickness of a constant-volume disc pressed by a constant force for `time` seconds. Power-law film
 * (Scott 1931): F = B·(−ḣ)ⁿ·h^(−5(n+1)/2), B = K·((2n+1)/4n)ⁿ·2^(2n+1)·π·(V/π)^((n+3)/2)/(n+3); the yield
 * stress takes F_y(h) of the force (additive, as in the squeeze). Integrated in ln h. Returns { thicknessMm,
 * stalled } — stalled when the yield stress carries the whole force before the time is up.
 */
export function discPress({ K, n, tauY = 0, volumeMm3, forceN, time, startMm = null }) {
  const V = volumeMm3 * 1e-9;
  const B = (K * ((2 * n + 1) / (4 * n)) ** n * 2 ** (2 * n + 1) * Math.PI * (V / Math.PI) ** ((n + 3) / 2)) / (n + 3);
  const a = (5 * (n + 1)) / (2 * n);
  let h = (startMm ?? Math.cbrt(volumeMm3)) / 1000;
  let t = 0;
  const step = 0.005; // in ln h
  const floor = plasticLimitMm(tauY, volumeMm3, forceN) / 1000; // the film never gets thinner than this
  for (let i = 0; i < 200000; i++) {
    const drive = forceN - yieldLoad(tauY, V, h);
    if (!(drive > 0)) return { thicknessMm: Math.max(h, floor) * 1000, stalled: true, time: t };
    const rate = (drive / B) ** (1 / n) * h ** a; // −dh/dt at the start of the step
    const next = h * Math.exp(-step);
    const driveNext = forceN - yieldLoad(tauY, V, next);
    const rateNext = driveNext > 0 ? (driveNext / B) ** (1 / n) * next ** a : 0;
    // Trapezoid in 1/rate over the step; a stalled end takes the rest of the time.
    const dt = rateNext > 0 ? ((h - next) / 2) * (1 / rate + 1 / rateNext) : Infinity;
    if (t + dt >= time) {
      // Finish inside the step at the starting rate's power law h^(−a) (exact without a yield stress).
      const left = time - t;
      const end = (h ** (1 - a) + (a - 1) * (rate / h ** a) * left) ** (1 / (1 - a));
      const thickness = Math.max(next, floor, Math.min(h, end));
      return { thicknessMm: thickness * 1000, stalled: thickness <= floor * (1 + 1e-9), time };
    }
    t += dt;
    h = next;
  }
  return { thicknessMm: h * 1000, stalled: false, time: t };
}

/**
 * Fit the squeeze rheology to one pressed-dot test: `grams` of paste (density g/mL) pressed with `kgf` for
 * `seconds` spread to a disc of `diameterMm`.
 *  - mode 'viscosity': the consistency K (Pa·sⁿ) at the given flow index n and yield stress that reproduces the
 *    measured thickness. Use while the disc is still growing when it is measured.
 *  - mode 'yield': the yield stress (Pa) whose plastic limit is the measured thickness. Use when the disc has
 *    stopped growing (pressed long enough that more time changes nothing).
 * Returns { key, value, thicknessMm, limitMm, note }.
 */
export function fitSqueeze({ mode = 'viscosity', grams, density, kgf, seconds, diameterMm, n, tauY = 0, K = null }) {
  if (!(grams > 0) || !(density > 0) || !(kgf > 0) || !(diameterMm > 0)) throw new Error('請輸入大於 0 的重量、壓合力與攤開直徑');
  const volumeMm3 = (grams / density) * 1000;
  const forceN = kgf * KGF;
  const thicknessMm = volumeMm3 / ((Math.PI * diameterMm ** 2) / 4);
  if (!(thicknessMm > 0.005 && thicknessMm < 20)) throw new Error(`換算的膠層厚度 ${thicknessMm.toFixed(3)} mm 不合理，請檢查重量與直徑`);
  if (mode === 'yield') {
    const h = thicknessMm / 1000;
    const value = (3 * forceN * h ** 2.5) / (2 * Math.PI * (volumeMm3 * 1e-9 / Math.PI) ** 1.5);
    // Where the viscous film alone would be after this time: clearly thinner than measured means the yield
    // stress is what stopped the disc; otherwise it may still have been creeping and the fit is an upper bound.
    const viscous = K > 0 && n > 0 && seconds > 0 ? discPress({ K, n, tauY: 0, volumeMm3, forceN, time: seconds }).thicknessMm : null;
    return { key: 'yieldStress', value, thicknessMm, limitMm: thicknessMm, viscousMm: viscous, yieldLimited: viscous === null ? null : viscous < thicknessMm * 0.95 };
  }
  if (!(seconds > 0)) throw new Error('請輸入大於 0 的保壓時間');
  if (!(n > 0)) throw new Error('剪切變稀指數需大於 0');
  const limitMm = plasticLimitMm(tauY, volumeMm3, forceN);
  if (limitMm >= thicknessMm * (1 - 1e-6))
    throw new Error(`以目前的降伏應力 ${tauY} Pa，${kgf} kgf 最薄只壓得到 ${limitMm.toFixed(3)} mm，比實測的 ${thicknessMm.toFixed(3)} mm 還厚：請先把降伏應力調低，或改用「擬合降伏應力」`);
  const at = (k) => discPress({ K: k, n, tauY, volumeMm3, forceN, time: seconds }).thicknessMm;
  let lo = Math.log(1e-3);
  let hi = Math.log(1e9);
  if (at(Math.exp(lo)) > thicknessMm || at(Math.exp(hi)) < thicknessMm) throw new Error('量測值超出可擬合的範圍，請檢查壓合力、時間與直徑');
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (at(Math.exp(mid)) > thicknessMm) hi = mid; // too thick: the paste must be thinner
    else lo = mid;
  }
  return { key: 'viscosity', value: Math.exp((lo + hi) / 2), thicknessMm, limitMm };
}
