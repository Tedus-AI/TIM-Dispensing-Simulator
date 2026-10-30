import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fromRegistry,simulate,frameAt} from '../src/engine.js';
import {pointOnPath} from '../src/path-planning.js';
const registry=JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json',import.meta.url)));
const base=()=>({...fromRegistry(registry),lineLength:20,offsetX:4,offsetY:-3,shutoffDistance:2});
const shape={shape:'rectangle',pattern:'line',width:20,depth:20,edgeInset:0,spacing:5,offsetX:4,offsetY:-3};
const near=(a,b,eps=1e-9)=>assert.ok(Math.abs(a-b)<=eps,`${a} != ${b}`);
test('pattern line is numerically equivalent to existing line including flow and deposition',()=>{
 const a=simulate({...base(),mode:'line'}),b=simulate({...base(),mode:'pattern',pathSettings:shape});
 near(a.pathLength,b.pathLength);near(a.duration,b.duration);near(a.gate,b.gate);
 near(a.summary.output,b.summary.output);near(a.summary.deposited,b.summary.deposited);
 assert.equal(a.frames.length,b.frames.length);
 for(let i=0;i<a.frames.length;i+=17){const x=a.frames[i],y=b.frames[i];near(x.x,y.x);near(x.y,y.y);near(x.output,y.output);near(x.deposited,y.deposited);}
 for(let i=0;i<a.summary.deposits.length;i++)near(a.summary.deposits[i],b.summary.deposits[i]);
});
test('each multisegment trajectory follows the heat source and preserves inventory',()=>{
 for(const architecture of ['R75','P300'])for(const pattern of ['n','serpentine','spiral','perimeter']){
  const run=simulate({...fromRegistry(registry,'putty',architecture),mode:'pattern',pathSettings:{...shape,pattern},shutoffDistance:2});
  assert.ok(run.path.length>0);near(run.path.length,run.pathLength);near(run.summary.deposited,run.summary.deposits.reduce((a,b)=>a+b,0),1e-9);
  near(run.summary.deposited+run.summary.offSurface,run.summary.output,1e-9);
  for(const f of run.frames){near(f.balance,0,1e-9);near(f.depositionBalance,0,1e-9);assert.ok(Number.isFinite(f.x)&&Number.isFinite(f.y)&&Number.isFinite(f.vy));}
  const begin=pointOnPath(run.path,0),end=pointOnPath(run.path,run.path.length);
  near(run.frames[0].x,begin.x);near(run.frames[0].y,begin.y);
  const atEnd=frameAt(run,run.ending.movementEnd+.011);near(atEnd.x,end.x,1e-6);near(atEnd.y,end.y,1e-6);
  assert.ok(run.warnings.some(w=>w.includes('轉角不減速')));
 }
});
test('early shutoff and diagonal retreat follow total path arc length',()=>{
 const c={...base(),mode:'pattern',pathSettings:{...shape,pattern:'n'},endMotion:'diagonal',endDwell:.1,backtrackDistance:3};
 const run=simulate(c),noStop=simulate({...c,shutoffDistance:0});
 near(run.ending.effectiveShutoffDistance,2);assert.ok(run.gate<noStop.gate);assert.ok(run.summary.output<noStop.summary.output);
 const p=pointOnPath(run.path,run.path.length-run.ending.effectiveBacktrack);near(run.summary.x,p.x,1e-7);near(run.summary.y,p.y,1e-7);
});
test('zero flow and zero length pattern do not invent material',()=>{
 const run=simulate({...base(),mode:'pattern',pressure:0,pathSettings:{...shape,pattern:'serpentine'}});
 near(run.summary.output,0);near(run.summary.deposited,0);assert.throws(()=>simulate({...base(),mode:'pattern',pathSettings:{...shape,pattern:'point'}}),/沒有長度/);
});
