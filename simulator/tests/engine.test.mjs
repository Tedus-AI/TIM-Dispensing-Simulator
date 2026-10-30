import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fromRegistry,steadyFlow,simulate,pulse,motionProfile,timeAtDistance,lineDimensions,dotDimensions,frameAt,beadProfile,BEAD_SIDES} from '../src/engine.js';
import {volumeOf,lineGeometry,capGeometry,continuousLineGeometry,nozzleGeometry,nozzleStemGeometry,DispenseScene} from '../src/scene.js';
import {OrthographicCamera,Vector3} from 'three';
const registry=JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json',import.meta.url)));
const cfg=(material='putty',arch='R75')=>fromRegistry(registry,material,arch);
const near=(a,b,eps=1e-9)=>assert.ok(Math.abs(a-b)<=eps,`${a} != ${b}`);
test('physical nozzle retains TCP at zero and its selectable bore, independent of display length',()=>{
  for(const bore of [.2,3.175,8])for(const length of [10,63.5]){
    const g=nozzleGeometry(bore,length);g.computeBoundingBox();near(g.boundingBox.min.z,0,1e-6);near(g.boundingBox.max.z,length,1e-5);
    const p=g.attributes.position,atTip=[];for(let i=0;i<p.count;i++)if(Math.abs(p.getZ(i))<1e-6)atTip.push(Math.hypot(p.getX(i),p.getY(i)));
    near(Math.min(...atTip),bore/2,1e-6);g.dispose();
    const stem=nozzleStemGeometry(bore,length);stem.computeBoundingBox();near(stem.boundingBox.min.z,length,1e-5);near(stem.boundingBox.max.z,length+7,1e-5);near(stem.boundingBox.max.x,6.2,1e-5);stem.dispose();
  }
});
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
test('deposited geometry and unresolved off-surface material account for outlet volume',()=>{
  for(const mode of ['point','line']){const r=simulate({...cfg(),mode});for(const f of r.frames){near(Array.from(f.deposits).reduce((a,b)=>a+b,0),f.deposited,1e-10);near(f.deposited+f.offSurface,f.output,1e-10);assert.ok(Number.isFinite(f.speed));}
    if(mode==='point'){const g=dotDimensions(r.summary.deposited,.25);near(Math.PI*g.height*(3*g.radius**2+g.height**2)/6,r.summary.deposited*1000,1e-8);}
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

test('distance shutoff follows inverse acceleration profile, not cruise-speed multiplication',()=>{
  for(const [L,v,a]of [[100,100,500],[1,800,500]]){const p=motionProfile(L,v,a);for(const f of [0,.01,.2,.5,.8,.99,1])near(p.at(timeAtDistance(p,L,a,L*f)).x,L*f,1e-10);}
  const r=simulate(cfg());near(r.gate,1);near(r.ending.movementEnd,1.2);near(r.ending.leadTime,.2);near(r.summary.output,.3711186061289325,1e-10);near(r.ending.afterStopVolume,.007126993547854621,1e-10);
  const f=frameAt(r,1.1);assert.equal(f.command,0);assert.ok(f.speed>0&&f.q>0);assert.match(f.phase,/收尾移動/);near(f.z,r.config.surfaceZ+r.config.standoff);
});

test('uncompensated reference retains old dose; early shutoff reduces tail without hiding total loss',()=>{
  const a=simulate({...cfg(),shutoffDistance:0}),b=simulate(cfg());near(a.summary.output,.44922530200445093,1e-10);near(a.ending.afterStopVolume,.05076379409552623,1e-10);
  assert.ok(b.summary.output<a.summary.output);assert.ok(b.ending.afterStopVolume<a.ending.afterStopVolume*.15);assert.ok(b.maxHeight<a.maxHeight);assert.ok(a.warnings.some(w=>w.includes('積膠')));
  const tooEarly=simulate({...cfg(),shutoffDistance:60});assert.ok(tooEarly.warnings.some(w=>w.includes('欠膠')));
});

test('short paths, disabled pulses, point independence and early depletion stay well-defined',()=>{
  for(const architecture of ['R75','P300']){
    const c=cfg('putty',architecture),empty=simulate({...c,lineLength:1});near(empty.summary.output,0);assert.ok(empty.warnings.some(w=>w.includes('本次不開膠')));assert.ok(empty.tailEnd>=empty.ending.movementEnd);
    const a=simulate({...c,mode:'point',shutoffDistance:0}),b=simulate({...c,mode:'point',shutoffDistance:250});near(a.summary.output,b.summary.output);near(a.duration,b.duration);
    const depleted=simulate({...c,fill:c.residual+.001});for(const f of depleted.frames){near(f.balance,0,1e-10);near([...f.deposits].reduce((s,v)=>s+v,0),f.deposited,1e-10);near(f.deposited+f.offSurface,f.output,1e-10);}
  }
  assert.throws(()=>simulate({...cfg(),shutoffDistance:-1}),/範圍/);assert.throws(()=>simulate({...cfg(),shutoffDistance:NaN}),/有限/);
});

test('continuous bead is volume-correct and has no internal transverse caps, including replay and zero flow',()=>{
  for(const options of [{},{shutoffDistance:0},{lineLength:1,shutoffDistance:0,cellSize:5},{pressure:0},{shutoffDistance:60}]){
    const r=simulate({...cfg(),...options});
    for(const f of [r.frames.at(-1),frameAt(r,.2),frameAt(r,1.1),r.frames[0]]){
      const g=continuousLineGeometry(f.deposits,r.cellLength,r.config.lineRatio),p=g.attributes.position,ix=g.index;
      // Float32 renderer coordinates: allow one part per million of the analytical volume.
      near(volumeOf(g),f.deposited*1000,Math.max(1e-6,f.deposited*.001));
      for(const value of p.array)assert.ok(Number.isFinite(value));
      for(let i=0;i<ix.count;i+=3){const xs=[0,1,2].map(k=>p.getX(ix.getX(i+k)));assert.ok(Math.max(...xs)>Math.min(...xs),'unexpected transverse cap');}
      const profile=beadProfile(f.deposits,r.cellLength,r.config.lineRatio);
      for(let i=0;i<profile.widths.length;i++){near(p.getZ(i*(BEAD_SIDES+1)+BEAD_SIDES/2),profile.heights[i],1e-5);}
      g.dispose();
    }
  }
});

test('legacy motion preserves the v0.2 continuous output and volume result',()=>{
  const r=simulate({...cfg(),endMotion:'legacy'});
  near(r.summary.output,.3711186061289325,1e-10);near(r.summary.offSurface,0);
  near(r.duration,4.28,1e-10);near(r.ending.liftStart,4.03,1e-10);
  for(const f of r.frames)near(f.deposited,f.output,1e-10);
});

test('exit trajectories match vertical, diagonal, and lifted-then-retreat poses',()=>{
  const c=cfg(),vertical=simulate({...c,endMotion:'vertical'}),diagonal=simulate({...c,endMotion:'diagonal'}),serial=simulate({...c,endMotion:'liftThenBack'});
  const endX=c.offsetX+c.lineLength/2,baseZ=c.surfaceZ+c.standoff,lift=motionProfile(c.liftDistance,c.liftSpeed,c.acceleration);
  for(const r of [vertical,diagonal,serial]){
    near(r.ending.liftStart,r.ending.movementEnd+c.endDwell);
    near(frameAt(r,r.duration).z,baseZ+c.liftDistance,1e-10);
    near(r.summary.output,r.summary.deposited+r.summary.offSurface,1e-10);
  }
  near(vertical.summary.x,endX);near(diagonal.summary.x,endX-c.backtrackDistance);near(serial.summary.x,endX-c.backtrackDistance);
  const d=frameAt(diagonal,diagonal.ending.liftStart+(diagonal.ending.motionEnd-diagonal.ending.liftStart)/2);
  assert.ok(d.x<endX&&d.z>baseZ,'diagonal motion moves both X and Z');
  const s=frameAt(serial,serial.ending.liftStart+lift.duration*.5);
  near(s.x,endX);assert.ok(s.z>baseZ&&s.z<baseZ+c.liftDistance);
  const afterLift=frameAt(serial,serial.ending.liftStart+lift.duration+(serial.ending.motionEnd-serial.ending.liftStart-lift.duration)/2);
  near(afterLift.z,baseZ+c.liftDistance);assert.ok(afterLift.x<endX);
  // No wetting/filament model: the three trajectories currently differ visually,
  // but the same lift start deliberately yields the same deposited dose.
  near(vertical.summary.deposited,diagonal.summary.deposited,1e-10);near(vertical.summary.deposited,serial.summary.deposited,1e-10);
});

test('earlier lift changes allocation without deleting material or assigning a fall location',()=>{
  for(const mode of ['line','point']){
    const c={...cfg(),mode},early=simulate({...c,endDwell:0}),late=simulate({...c,endDwell:1});
    near(early.summary.output,late.summary.output,1e-9);
    assert.ok(early.summary.offSurface>late.summary.offSurface);
    assert.ok(early.summary.deposited<late.summary.deposited);
    for(const r of [early,late])for(const f of r.frames){
      near(f.output,f.deposited+f.offSurface,1e-10);
      near([...f.deposits].reduce((sum,v)=>sum+v,0),f.deposited,1e-10);
      near(f.balance,0,1e-10);
    }
  }
});

test('PCP recovery removes only pending inventory and conserves every ledger',()=>{
  const c=cfg('putty','P300'),normal=simulate(c),reverse=simulate({...c,reverseRpm:30,reverseDuration:.05});
  assert.ok(reverse.summary.recovered>0);
  near(normal.summary.output,reverse.summary.output+reverse.summary.recovered,1e-9);
  for(const f of reverse.frames){
    assert.ok(f.pending>=0&&f.recovered>=0&&f.offSurface>=0&&f.q>=0);
    near(f.initial,f.remaining+f.fixed+f.pending+f.recovered+f.output,1e-10);
    near(f.output,f.deposited+f.offSurface,1e-10);
    near([...f.deposits].reduce((s,v)=>s+v,0),f.deposited,1e-10);
  }
  assert.throws(()=>simulate({...cfg(),reverseDuration:.05}),/氣壓式/);
});

test('long PCP reverse command remains active after recoverable inventory is exhausted',()=>{
  const c={...cfg('putty','P300'),tauOn:.001,tauOff:.001,delay:.02,reverseRpm:.001,reverseDuration:2,endDwell:0,liftSpeed:200,liftDistance:.1,acceleration:10000};
  const r=simulate(c),commandEnd=r.ending.commandOff+c.reverseDuration,responseEnd=commandEnd+c.delay;
  near(r.ending.reverseCommandStart,r.ending.commandOff);
  near(r.ending.reverseCommandEnd,commandEnd);
  near(r.ending.reverseStart,r.ending.commandOff+c.delay);
  near(r.ending.reverseResponseEnd,responseEnd);
  assert.ok(r.duration>=responseEnd);
  const during=frameAt(r,r.ending.commandOff+1);
  assert.ok(during.reverseCommandActive,'the command continues after inventory is empty');
  assert.ok(during.reverseResponseActive);
  assert.equal(during.reverseRecoveryActive,false);
  assert.equal(r.summary.reverseCommandActive,false);
  assert.equal(r.summary.reverseResponseActive,false);
  assert.ok(r.summary.recovered>0&&r.summary.recovered<r.ending.reverseRequestedVolume);
  near(r.summary.balance,0,1e-10);
});
