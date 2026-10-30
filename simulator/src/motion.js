// Motion profiles in arc length. All lengths are mm, speeds mm/s, accelerations mm/s².
// `at(t)` returns {x: arc length, v: path speed}; `timeAt(x)` is its exact inverse.

/** Single point-to-point trapezoid (or triangle when too short to cruise), starting and ending at rest. */
export function motionProfile(length, speed, acceleration) {
  const peak = Math.min(speed, Math.sqrt(length * acceleration));
  const ramp = peak / acceleration;
  const cruise = peak > 0 ? Math.max(0, (length - (peak * peak) / acceleration) / peak) : 0;
  const duration = 2 * ramp + cruise;
  const rampDistance = (peak * ramp) / 2;
  return {
    kind: 'single',
    length,
    duration,
    peak,
    ramp,
    cruise,
    at(t) {
      if (t <= 0) return { x: 0, v: 0 };
      if (t >= duration) return { x: length, v: 0 };
      if (t < ramp) return { x: 0.5 * acceleration * t * t, v: acceleration * t };
      if (t < ramp + cruise) return { x: rampDistance + peak * (t - ramp), v: peak };
      const rem = duration - t;
      return { x: length - 0.5 * acceleration * rem * rem, v: acceleration * rem };
    },
    timeAt(distance) {
      return timeAtDistance(this, length, acceleration, distance);
    },
  };
}

// Inverse of the same triangular/trapezoidal motion, so a shutoff distance stays a distance during deceleration.
export function timeAtDistance(profile, length, acceleration, distance) {
  const x = Math.max(0, Math.min(length, distance));
  const rampDistance = (profile.peak * profile.ramp) / 2;
  if (x <= rampDistance) return Math.sqrt((2 * x) / acceleration);
  if (x >= length - rampDistance) return profile.duration - Math.sqrt((2 * (length - x)) / acceleration);
  return profile.ramp + (x - rampDistance) / profile.peak;
}

/**
 * Maximum speed through a polyline vertex, using the junction-deviation rule common in CNC
 * firmware: the tool may round the corner within `deviation` mm while staying under `acceleration`.
 * Straight continuation is unlimited; a full reversal must stop.
 */
export function junctionSpeed(u1, u2, acceleration, deviation, speed) {
  const cosTheta = -(u1.x * u2.x + u1.y * u2.y);
  if (cosTheta <= -0.999999) return speed;
  if (cosTheta >= 0.999999) return 0;
  const sinHalf = Math.sqrt(0.5 * (1 - cosTheta));
  return Math.min(speed, Math.sqrt((acceleration * deviation * sinHalf) / (1 - sinHalf)));
}

/**
 * Look-ahead planner along a polyline: every segment is a trapezoid between junction speeds that
 * respect the corner rule and the shared acceleration limit (backward + forward pass).
 * This is a generic engineering approximation, not a particular robot controller.
 */
export function planPolylineMotion(points, { speed, acceleration, deviation }) {
  const segments = [];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const length = Math.hypot(dx, dy);
    if (length > 1e-12) segments.push({ length, u: { x: dx / length, y: dy / length } });
  }
  const n = segments.length;
  if (!n) return motionProfile(0, speed, acceleration);
  if (n === 1) return motionProfile(segments[0].length, speed, acceleration);
  // Junction limits; v[i] is the speed at the start of segment i, v[n] the final stop.
  const v = new Float64Array(n + 1);
  for (let i = 1; i < n; i++) v[i] = junctionSpeed(segments[i - 1].u, segments[i].u, acceleration, deviation, speed);
  v[0] = 0;
  v[n] = 0;
  for (let i = n - 1; i >= 0; i--) v[i] = Math.min(v[i], Math.sqrt(v[i + 1] ** 2 + 2 * acceleration * segments[i].length));
  for (let i = 0; i < n; i++) v[i + 1] = Math.min(v[i + 1], Math.sqrt(v[i] ** 2 + 2 * acceleration * segments[i].length));

  let start = 0;
  let distance = 0;
  let slowest = speed;
  let corners = 0;
  for (let i = 0; i < n; i++) {
    const s = segments[i];
    const v0 = v[i];
    const v1 = v[i + 1];
    const vp = Math.max(v0, v1, Math.min(speed, Math.sqrt((2 * acceleration * s.length + v0 * v0 + v1 * v1) / 2)));
    const d1 = Math.max(0, (vp * vp - v0 * v0) / (2 * acceleration));
    const d3 = Math.max(0, (vp * vp - v1 * v1) / (2 * acceleration));
    const d2 = Math.max(0, s.length - d1 - d3);
    Object.assign(s, {
      v0, v1, vp, d1, d2, d3,
      t1: (vp - v0) / acceleration,
      t2: vp > 0 ? d2 / vp : 0,
      t3: (vp - v1) / acceleration,
      start,
      distance,
    });
    s.duration = s.t1 + s.t2 + s.t3;
    start += s.duration;
    distance += s.length;
    if (i > 0 && v0 < speed - 1e-9) {
      corners++;
      slowest = Math.min(slowest, v0);
    }
  }
  const duration = start;
  const length = distance;
  const find = (key, value) => {
    let lo = 0;
    let hi = n - 1;
    while (lo < hi) {
      const m = Math.ceil((lo + hi) / 2);
      if (segments[m][key] <= value) lo = m;
      else hi = m - 1;
    }
    return segments[lo];
  };
  return {
    kind: 'polyline',
    length,
    duration,
    peak: Math.max(...segments.map((s) => s.vp)),
    corners,
    slowestCorner: corners ? slowest : null,
    junctions: Array.from(v),
    at(t) {
      if (t <= 0) return { x: 0, v: 0 };
      if (t >= duration) return { x: length, v: 0 };
      const s = find('start', t);
      const tau = Math.min(s.duration, t - s.start);
      if (tau < s.t1) return { x: s.distance + s.v0 * tau + 0.5 * acceleration * tau * tau, v: s.v0 + acceleration * tau };
      if (tau < s.t1 + s.t2) return { x: s.distance + s.d1 + s.vp * (tau - s.t1), v: s.vp };
      const u = tau - s.t1 - s.t2;
      return { x: s.distance + s.d1 + s.d2 + s.vp * u - 0.5 * acceleration * u * u, v: Math.max(0, s.vp - acceleration * u) };
    },
    timeAt(x) {
      const d = Math.max(0, Math.min(length, x));
      if (d >= length) return duration;
      const s = find('distance', d);
      const local = Math.min(s.length, d - s.distance);
      if (local <= s.d1) return s.start + (Math.sqrt(s.v0 * s.v0 + 2 * acceleration * local) - s.v0) / acceleration;
      if (local <= s.d1 + s.d2) return s.start + s.t1 + (local - s.d1) / s.vp;
      const y = local - s.d1 - s.d2;
      return s.start + s.t1 + s.t2 + (s.vp - Math.sqrt(Math.max(0, s.vp * s.vp - 2 * acceleration * y))) / acceleration;
    },
  };
}
