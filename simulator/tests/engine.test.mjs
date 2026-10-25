import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fromRegistry,steadyFlow,simulate,pulse,motionProfile,lineDimensions,dotDimensions,frameAt} from '../src/engine.js';
import {volumeOf,lineGeometry,capGeometry,DispenseScene} from '../src/scene.js';
import {OrthographicCamera,Vector3} from 'three';
const registry=JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json',import.meta.url)));
const cfg=(material='putty',arch='R75')=>fromRegistry(registry,material,arch);
const near=(a,b,eps=1e-9)=>assert.ok(Math.abs(a-b)<=eps,`${a} != ${b}`);
test('three independent steady reference values and material density effect',()=>{
  near(steadyFlow(cfg()),.390625);near(steadyFlow(cfg('grease')),.061906507721617925);near(steadyFlow(cfg('putty','P300')),.3);
  const a=simulate(cfg('putty','P300')),b=simulate(cfg('grease','P300'));near(a.summary.output,b.summary.output);near(a.summary.mass/a.summary.output,3.2);near(b.summary.mass/b.summary.output,3.4);
});
test('pressure and nozzle assumptions obey declared limiting cases',()=>{
  const c=cfg();near(steadyFlow({...c,pressure:0}),0);near(steadyFlow({...c,pressure:45}),steadyFlow(c)/2);near(steadyFlow({...c,nozzleLength:20}),steadyFlow(c)/2);near(steadyFlow({...c,diameter:c.diameter/2}),steadyFlow(c)/16);
  const p=cfg('grease','P300');near(steadyFlow({...p,diameter:1,hoseLength:500}),steadyFlow(p));near(steadyFlow({...p,rpm:0}),0);
});
test('analytic response: no pre-delay flow, correct rising integral and asymmetric tail',()=>{
  near(pulse(.02,1,1,.03,.15,.1).volume,0);
  const a=pulse(.18,1,1,.03,.15,.1);near(a.q,1-Math.exp(-1));near(a.volume,.15*Math.exp(-1));
  const full=pulse(10,1,1,0,.15,.1);near(full.volume,1+(.1-.15)*(1-Math.exp(-1/.15)));
});
test('PCP short pulse complete integral equals metered volume including tail',()=>{
  const r=simulate({...cfg('putty','P300'),mode:'point',gateDuration:.013});near(r.summary.metered,.3*.013);near(r.summary.output+r.summary.pending,r.summary.metered,1e-12);assert.ok(r.summary.pending<1e-9);
  for(const f of r.frames){assert.ok(f.pending>=0);near(f.initial,f.remaining+f.fixed+f.pending+f.output,1e-10);}
});
test('R75 and PCP depletion never use residual or double-count output',()=>{
  for(const arch of ['R75','P300']){const c=cfg('putty',arch),r=simulate({...c,fill:c.residual+.001});near(r.summary.remaining,c.residual);near(r.summary.output+r.summary.pending,.001,1e-10);for(const f of r.frames){assert.ok(f.remaining>=c.residual);near(f.balance,0,1e-10);}}
});
test('zero flow does not create material or geometry',()=>{
  for(const arch of ['R75','P300']){const r=simulate({...cfg('putty',arch),pressure:0,rpm:0});near(r.summary.output,0);near(r.summary.deposits.reduce((a,b)=>a+b,0),0);near(r.maxHeight,0);}
});
test('motion profile triangular and trapezoidal have finite endpoints and continuous ramps',()=>{
  for(const [L,v,a]of [[100,100,500],[1,800,500]]){const p=motionProfile(L,v,a);near(p.at(0).x,0);near(p.at(p.duration).x,L);near(p.at(p.duration).v,0);near(p.at(p.ramp).v,p.peak);assert.ok(p.peak<=v);}
});
test('deposited geometry accounts for all output at every snapshot',()=>{
  for(const mode of ['point','line']){const r=simulate({...cfg(),mode});for(const f of r.frames){near(Array.from(f.deposits).reduce((a,b)=>a+b,0),f.output,1e-10);assert.ok(Number.isFinite(f.speed));}
    if(mode==='point'){const g=dotDimensions(r.summary.output,.25);near(Math.PI*g.height*(3*g.radius**2+g.height**2)/6,r.summary.output*1000,1e-8);}
    else for(const v of r.summary.deposits){const g=lineDimensions(v,r.cellLength,.5);near(Math.PI*g.width*g.height/4*r.cellLength,v*1000,1e-9);}
  }
});
test('half timestep leaves integral unchanged and spatial allocation converges',()=>{
  const a=simulate(cfg()),b=simulate({...cfg(),timestep:.0005});near(a.summary.output,b.summary.output,1e-12);const spatial=a.summary.deposits.reduce((s,v,i)=>s+Math.abs(v-b.summary.deposits[i]),0);assert.ok(spatial/a.summary.output<.02);
});
test('snapshot playback does not mutate calculated results',()=>{
  const r=simulate(cfg()),s=JSON.stringify(r.summary);frameAt(r,3);frameAt(r,1);frameAt(r,0);assert.equal(JSON.stringify(r.summary),s);
});
test('halving spatial cell size preserves dose and stabilizes peak geometric height',()=>{
  const a=simulate(cfg()),b=simulate({...cfg(),cellSize:.25});near(a.summary.output,b.summary.output,1e-12);assert.ok(Math.abs(a.maxHeight/b.maxHeight-1)<.1);
});
test('PCP response contract rejects unequal constants and invalid input',()=>{
  assert.throws(()=>simulate({...cfg('putty','P300'),tauOff:.1}),/共用/);assert.throws(()=>simulate({...cfg(),diameter:0}),/範圍/);assert.throws(()=>simulate({...cfg(),pressure:NaN}),/有限/);
});
test('geometry, inventory and surface warnings are explicit',()=>{
  const r=simulate({...cfg('putty','P300'),hoseLength:2000,workpieceKind:'imported',width:40});assert.ok(r.summary.fixed>250);assert.ok(r.warnings.some(x=>x.includes('水平')));assert.ok(r.warnings.some(x=>x.includes('超出工件')));
});
test('closed triangle meshes match analytic line and spherical-cap volume within tessellation error',()=>{
  const line=lineGeometry();near(volumeOf(line),Math.PI/4,.002);
  for(const ratio of [.05,.25,.5]){const cap=capGeometry(ratio),h=ratio*2,expected=Math.PI*h*(3+h*h)/6;assert.ok(Math.abs(volumeOf(cap)/expected-1)<.015);}
});
test('all four isometric corners preserve equal XYZ projection and differ in quadrant',()=>{
  const scene=Object.create(DispenseScene.prototype),seen=new Set();
  for(let i=0;i<4;i++){
    scene.isoCorner=i;const direction=scene.isoDirection();seen.add(direction.toArray().join(','));
    const camera=new OrthographicCamera(-100,100,100,-100,.1,4000);camera.up.set(0,0,1);camera.position.copy(direction.multiplyScalar(1000));camera.lookAt(0,0,0);camera.updateMatrixWorld();
    const zero=new Vector3().project(camera),lengths=[[10,0,0],[0,10,0],[0,0,10]].map(a=>{const p=new Vector3(...a).project(camera);return Math.hypot(p.x-zero.x,p.y-zero.y);});
    near(lengths[0],lengths[1],1e-12);near(lengths[1],lengths[2],1e-12);
  }
  assert.equal(seen.size,4);
});
