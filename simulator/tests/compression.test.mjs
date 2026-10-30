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
  const v=estimateCompression(run,{...opts,width:1000,depth:1000,cellSize:.2});
  assert.ok(v.grid.cols*v.grid.rows<=90000);assert.ok(v.grid.cellSize>.2);
  assert.ok(v.warnings.some(w=>w.includes('調整')));
});
const pattern=(p,extra={})=>simulate({...fromRegistry(registry),mode:'pattern',pathSettings:{shape:'rectangle',pattern:p,width:30,depth:30,offsetX:0,offsetY:0,spacing:5,edgeInset:2},...extra});
test('squeezed dot becomes a disc of area V/gap with no voids',()=>{
  const run=simulate({...config(),mode:'point',gateDuration:.5});const v=estimateCompression(run,{...opts,shape:'circle',width:60,gap:.3,cellSize:.5});
  const g=v.grid;let minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9;
  for(let i=0;i<g.coverage.length;i++)if(g.coverage[i]>=.5){const x=i%g.cols,y=Math.floor(i/g.cols);minx=Math.min(minx,x);maxx=Math.max(maxx,x);miny=Math.min(miny,y);maxy=Math.max(maxy,y);}
  const d=2*Math.sqrt(run.summary.deposited*1000/(Math.PI*.3));
  assert.ok(Math.abs((maxx-minx+1)*g.cellSize-d)<=2*g.cellSize);assert.ok(Math.abs((maxy-miny+1)*g.cellSize-d)<=2*g.cellSize);
  near(v.summary.wetAreaMm2,run.summary.deposited*1000/.3,1e-6);assert.equal(v.summary.voidCount,0);
});
test('closed perimeter traps air in the middle; a single line does not',()=>{
  const closed=estimateCompression(pattern('perimeter'),{...opts,gap:.5,cellSize:.5});
  assert.ok(closed.summary.voidCount>=1);assert.ok(closed.summary.voidAreaMm2>50);
  near(closed.summary.conservationErrorMl,0,1e-9);
  const open=estimateCompression(pattern('line'),{...opts,gap:.5,cellSize:.5});assert.equal(open.summary.voidCount,0);
});
test('thinner gap spreads further, and thermal resistance follows wetted area',()=>{
  const run=pattern('n');const thick=estimateCompression(run,{...opts,gap:.8,cellSize:.5}),thin=estimateCompression(run,{...opts,gap:.3,cellSize:.5});
  assert.ok(thin.summary.coveredPercent>thick.summary.coveredPercent);
  const t=thin.summary.thermal;near(t.impedanceCm2,0.0003/9.1*1e4+.11,1e-12);near(t.idealResistance,t.impedanceCm2/9,1e-12);
  near(t.resistance,t.idealResistance/(thin.summary.coveredPercent/100),1e-9);near(t.rise,t.resistance*25,1e-9);
});
test('squeeze animation frames run from the bead crest down to the gap',()=>{
  const v=estimateCompression(pattern('n'),{...opts,gap:.5,cellSize:.5,frames:12});
  assert.equal(v.grid.frames.length,12);near(v.grid.frames.at(-1).gap,.5,1e-12);assert.ok(v.grid.frames[0].gap>=v.grid.frames.at(-1).gap);
  for(let k=1;k<v.grid.frames.length;k++)assert.ok(v.grid.frames[k].coveredPercent>=v.grid.frames[k-1].coveredPercent-1e-6);
});
test('a sub-cell dot from a near-zero pressure stays bounded in cost and conserves volume',()=>{
  const run=simulate({...fromRegistry(registry),mode:'point',pressure:0.001});
  assert.ok(run.summary.deposited>0&&run.summary.deposited<1e-12);
  const t=performance.now();const v=estimateCompression(run,{...opts,cellSize:.5});
  assert.ok(performance.now()-t<2000,'tiny dot must not scale with 1/radius²');
  near(v.summary.conservationErrorMl,0,1e-15);near(v.summary.depositedMl,run.summary.deposited,1e-18);
});
