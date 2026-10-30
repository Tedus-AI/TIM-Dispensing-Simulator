import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fromRegistry,simulate,frameAt} from '../src/engine.js';
import {estimateCompression} from '../src/compression.js';

const registry=JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json',import.meta.url)));
const near=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<=e,`${a} != ${b}`);
const base={shape:'rectangle',pattern:'spiral',width:40,depth:30,offsetX:8,offsetY:-6,spacing:5,edgeInset:2,spiralShape:'round'};
function run(settings,architecture='R75') {
 return simulate({...fromRegistry(registry,'putty',architecture),mode:'pattern',width:100,depth:100,shutoffDistance:4,pathSettings:settings});
}

test('round spiral on a rectangle travels from exactly the center or the same outer endpoint according to direction',()=>{
 const inward=run({...base,spiralDirection:'outside-in'}),outward=run({...base,spiralDirection:'inside-out'});
 const start=inward.path.points[0],end=inward.path.points.at(-1);
 near(end.x,base.offsetX);near(end.y,base.offsetY);
 near(inward.frames[0].x,start.x);near(inward.frames[0].y,start.y);
 near(outward.frames[0].x,end.x);near(outward.frames[0].y,end.y);
 const inFinal=frameAt(inward,inward.ending.movementEnd+.011),outFinal=frameAt(outward,outward.ending.movementEnd+.011);
 near(inFinal.x,end.x,1e-5);near(inFinal.y,end.y,1e-5);
 near(outFinal.x,start.x,1e-5);near(outFinal.y,start.y,1e-5);
 near(inward.pathLength,outward.pathLength,1e-7);near(inward.summary.output,outward.summary.output,1e-7);
 // The same length and timing distribute transient start/stop output at opposite
 // physical points: the start/end arc-length bin volume profiles are not mirror symmetric.
 const a=inward.summary.deposits,b=outward.summary.deposits;
 assert.equal(a.length,b.length);
 assert.ok(a.reduce((sum,v,i)=>sum+Math.abs(v-b[b.length-1-i]),0)>1e-5,
  'reversing the timed bead must not be mistaken for identical physical deposition');
});

test('both shapes and both directions preserve dispensed and compressed volume',()=>{
 for(const source of ['rectangle','circle'])for(const spiralShape of ['round','square'])for(const spiralDirection of ['outside-in','inside-out'])for(const architecture of ['R75','P300']){
  const settings={...base,shape:source,spiralShape,spiralDirection};
  const result=run(settings,architecture), s=result.summary;
  assert.ok(result.path.length>0);
  near(s.deposits.reduce((sum,v)=>sum+v,0),s.deposited,1e-8);
  near(s.deposited+s.offSurface,s.output,1e-8);near(s.balance,0,1e-8);
  const pressed=estimateCompression(result,{shape:source,width:base.width,depth:base.depth,offsetX:base.offsetX,offsetY:base.offsetY,gap:.5,cellSize:1});
  near(pressed.summary.depositedMl,s.deposited,1e-8);
  near(pressed.summary.insideMl+pressed.summary.outsideMl,s.deposited,1e-8);
  near(pressed.summary.conservationErrorMl,0,1e-8);
  assert.ok(Number.isFinite(pressed.summary.coveredPercent));
 }
});
