import * as THREE from 'three';

// A visible connection only, not the hose used by the hydraulic approximation.
// Coordinates are mm in the machine frame. Ports are endpoints, not loose decorative lines.
export function hoseRoute(start, end, kind = 'feed') {
  const a = start.clone();
  const b = end.clone();
  if (kind === 'air') return [a, a.clone().add(new THREE.Vector3(0, 0, 28)), b.clone().add(new THREE.Vector3(0, 0, 30)), b];
  if (kind === 'stationAir')
    return [a, a.clone().add(new THREE.Vector3(0, -30, 0)), b.clone().add(new THREE.Vector3(-40, 0, 0)), b];
  if (kind === 'supply') {
    // Slack loop from a bench-standing controller up to a fitting on the moving gantry.
    const mid = a.clone().lerp(b, 0.5);
    mid.z = Math.max(a.z, b.z) + 70;
    return [a, a.clone().add(new THREE.Vector3(0, 0, 40)), mid, b.clone().add(new THREE.Vector3(-50, 0, 0)), b];
  }
  return [
    a,
    a.clone().add(new THREE.Vector3(35, 0, 0)),
    new THREE.Vector3(-520, 330, a.z + 65),
    new THREE.Vector3(-520, 360, Math.max(b.z + 120, 180)),
    new THREE.Vector3(b.x + 120, 180, b.z + 100),
    b.clone().add(new THREE.Vector3(50, 0, 0)),
    b,
  ];
}

export function buildHoseGeometry(start, end, kind = 'feed', radius = 3) {
  const points = hoseRoute(start, end, kind);
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  return new THREE.TubeGeometry(curve, 96, radius, 12, false);
}
