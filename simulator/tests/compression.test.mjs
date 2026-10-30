import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fromRegistry,simulate} from '../src/engine.js';
import {estimateCompression} from '../src/compression.js';

const registry=JSON.parse(readFileSync(new URL('../../data/engineering_defaults_v0.3.json',import.meta.url)));
const config=()=>({...fromRegistry(registry),width:80,depth:80,lineLength:30,cellSize:.5});
const opts={shape:'rectangle',width:30,depth:30,offsetX:0,offsetY:0,gap:.5,cellSize:1};
const near=(a,b,e=1e-9)=>assert.ok(Math.abs(a-b)<=e,`${a} != ${b}`);

test('zero flow yields zero area and no invented material',()=>{
  const run=simulate({...config(),pressure:0});const v=estimateCompression(run,opts);
  near(v.summary.depositedMl,0);near(v.summary.coveredPercent,0);near(v.summary.outsideMl,0);near(v.summary.offWorkpieceMl,0);
});
test('deposited volume, source split, and off-surface separation remain conserved',()=>{
  const run=simulate(config()),v=estimateCompression(run,opts);
  near(v.summary.depositedMl,run.summary.deposited);
  near(v.summary.insideMl+v.summary.outsideMl,v.summary.depositedMl,1e-8);
  near(v.summary.conservationErrorMl,0,1e-8);
  assert.ok(v.summary.offWorkpieceMl<=v.summary.depositedMl+1e-8);
  assert.ok(v.summary.coveredPercent>=0&&v.summary.coveredPercent<=100);
  assert.ok(v.grid.coverage.length===v.grid.cols*v.grid.rows);
});
test('real path position affects coverage, not just dose divided by area',()=>{
  const run=simulate(config());const center=estimateCompression(run,opts);
  const shifted=estimateCompression(run,{...opts,offsetX:60});
  assert.ok(center.summary.coveredPercent>shifted.summary.coveredPercent+1);
  near(center.summary.depositedMl,shifted.summary.depositedMl);
  near(center.summary.requiredMl,shifted.summary.requiredMl);
});
test('gap controls ideal minimum volume, and circular source uses diameter',()=>{
  const run=simulate({...config(),mode:'point'});
  const a=estimateCompression(run,{...opts,shape:'circle',width:20,depth:100,gap:.5});
  const b=estimateCompression(run,{...opts,shape:'circle',width:20,depth:2,gap:1});
  near(a.summary.sourceAreaMm2,Math.PI*100);near(b.summary.requiredMl,2*a.summary.requiredMl);
  near(a.summary.insideMl+a.summary.outsideMl,a.summary.depositedMl,1e-8);
});
test('unvalidated values rejected and Tputty minimum bond thickness disclosed',()=>{
  const run=simulate(config());assert.throws(()=>estimateCompression(run,{...opts,gap:0}),/間隙/);
  assert.throws(()=>estimateCompression(run,{...opts,width:NaN}),/有限/);
  assert.ok(estimateCompression(run,{...opts,gap:.1}).warnings.some(v=>v.includes('0.18 mm')));
});
test('bounded grid increases resolution spacing instead of unbounded allocation',()=>{
  const run=simulate({...config(),pressure:0,width:1000,depth:1000});
  const v=estimateCompression(run,{...opts,cellSize:.2});
  assert.ok(v.grid.cols*v.grid.rows<=90000);assert.ok(v.grid.cellSize>.2);
  assert.ok(v.warnings.some(w=>w.includes('調整')));
});
