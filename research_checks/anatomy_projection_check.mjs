// Research-only check of upstream projection math. No simulator or fluid model.
import { iso } from 'file:///C:/Users/Tedus/.codex/skills/anatomy/kit/iso-kit.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const installed = 'C:/Users/Tedus/.codex/skills/anatomy';
const hash = p => createHash('sha256').update(readFileSync(p)).digest('hex');
const exactElevation = Math.atan(1 / Math.sqrt(2)) * 180 / Math.PI;
const axes = [[10,0,0],[0,10,0],[0,0,10]];
const lengths = (elevation, scale=1, origin=[0,0]) => {
  const P = { origin, scale, azimuth:45, elevation };
  const zero = iso([0,0,0], P);
  return axes.map(a => {
    const p = iso(a, P);
    return Math.hypot(p[0]-zero[0], p[1]-zero[1]);
  });
};
const base = lengths(exactElevation);
const twice = lengths(exactElevation, 2);
const moved = lengths(exactElevation, 1, [100,200]);
const checks = {
  equal_axis_lengths: Math.max(...base)-Math.min(...base) < 1e-10,
  uniform_camera_zoom: twice.every((n,i) => Math.abs(n/base[i]-2)<1e-10),
  camera_translation_preserves_lengths: moved.every((n,i) => Math.abs(n-base[i])<1e-10),
  source_geometry_unchanged: JSON.stringify(axes)==='[[10,0,0],[0,10,0],[0,0,10]]'
};
const report = {
  date:'2026-10-24', scope:'Upstream pure projection arithmetic only; no rendering, simulation, CAD import or hardware validation',
  source:'https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80',
  input_axis_lengths_mm:[10,10,10], azimuth_deg:45,
  default_elevation_deg:30, default_projected_lengths:lengths(30),
  strict_isometric_elevation_deg:exactElevation, strict_projected_lengths:base,
  default_z_to_x_ratio:lengths(30)[2]/lengths(30)[0],
  note:'Lengths are upstream projection units at scale=1, including its sqrt(1.6) factor; not a display calibration.',
  checks, passed:Object.values(checks).every(Boolean),
  engineering_defaults_sha256:hash(path.join(project,'data/engineering_defaults_v0.3.json'))
};
const inventory = dir => readdirSync(dir,{withFileTypes:true}).flatMap(e => {
  const p=path.join(dir,e.name); return e.isDirectory()?inventory(p):[{path:path.relative(installed,p).replaceAll('\\','/'),sha256:hash(p)}];
});
const manifest = {
  date:'2026-10-24', name:'anatomy', installed_path:installed,
  repo:'https://github.com/wheresryan22/anatomy', commit:'1482e8469b0a9e0d8cc18ea2740a01423d29ae80',
  install_method:'skill-installer --repo wheresryan22/anatomy --path . --name anatomy --ref <commit> --method download',
  license:'MIT; retain upstream LICENSE when redistributing upstream code',
  files:inventory(installed)
};
const out = path.join(project,'sources/Anatomy');
mkdirSync(out,{recursive:true});
writeFileSync(path.join(out,'install_manifest.json'),JSON.stringify(manifest,null,2)+'\n');
writeFileSync(path.join(out,'projection_check.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.passed, checks, elevation_deg:exactElevation, lengths_default:lengths(30), lengths_strict:base, file_count:manifest.files.length, engineering_defaults_sha256:report.engineering_defaults_sha256},null,2));
if (!report.passed) process.exitCode=1;
