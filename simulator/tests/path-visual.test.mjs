import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3} from 'three';
import {planDispensePath} from '../src/path-planning.js';
import {DepositTerrain,createPatternSource} from '../src/scene.js';
import {estimateCompression} from '../src/compression.js';

const close=(a,b,e=1e-7)=>assert.ok(Math.abs(a-b)<=e,`${a} != ${b}`);
const pathSettings={shape:'rectangle',pattern:'n',width:30,depth:30,offsetX:20,offsetY:-10,spacing:5,edgeInset:2};
function fakeRun(){
 const path=planDispensePath(pathSettings),cellLength=.5,gridStart=-1,n=Math.ceil((path.length+2)/cellLength),deposits=Array(n).fill(.0002);
 return {path,pathLength:path.length,cellLength,gridStart,frames:[{t:0,s:path.length,deposits}],config:{mode:'pattern',width:100,depth:100,diameter:2,standoff:2,lineRatio:.5,offsetX:0,offsetY:0,material:'putty',workpieceKind:'plate'},summary:{deposits,deposited:deposits.reduce((a,b)=>a+b,0)}};
}
test('path visual geometry follows world path and footprint, remains finite and disposable',()=>{
 const run=fakeRun(),terrain=new DepositTerrain(run),g=terrain.show(run.frames[0]);
 g.computeBoundingBox();const b=g.boundingBox;
 assert.ok(b.min.x>0&&b.max.x>30);assert.ok(b.min.y<-20&&b.max.y>0);
 close(g.userData.unitVolume,run.summary.deposited*1000,1e-9);
 for(const x of g.attributes.position.array)assert.ok(Number.isFinite(x));
 for(const x of g.attributes.normal.array)assert.ok(Number.isFinite(x));
 terrain.dispose();
});
test('heat-source reference uses exact dimensions and configured world position',()=>{
 const group=createPatternSource(pathSettings,13),bounds=new Box3().setFromObject(group);
 close(bounds.min.x,5);close(bounds.max.x,35);close(bounds.min.y,-25);close(bounds.max.y,5);
 let mats=group.userData.ownedMaterials;assert.equal(mats.length,2);
 group.traverse(o=>o.geometry?.dispose());mats.forEach(m=>m.dispose());
});
test('multi-segment compression uses path location and conserves volume',()=>{
 const run=fakeRun(),settings={shape:'rectangle',width:30,depth:30,offsetX:20,offsetY:-10,gap:.5,cellSize:1};
 const actual=estimateCompression(run,settings),other=estimateCompression(run,{...settings,offsetX:-40,offsetY:-40});
 assert.ok(actual.summary.coveredPercent>other.summary.coveredPercent+1);
 close(actual.summary.insideMl+actual.summary.outsideMl,run.summary.deposited,1e-8);
 close(actual.summary.conservationErrorMl,0,1e-8);
 assert.ok(actual.warnings.some(w=>w.includes('依出膠順序鋪出')));
});
