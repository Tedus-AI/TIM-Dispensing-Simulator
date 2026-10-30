import test from 'node:test';
import assert from 'node:assert/strict';
import {planDispensePath,pointOnPath,samplePath} from '../src/path-planning.js';

const input={shape:'rectangle',width:40,depth:24,offsetX:11,offsetY:-4,edgeInset:2,spacing:4};
const near=(a,b,e=1e-8)=>assert.ok(Math.abs(a-b)<=e,`${a} != ${b}`);

test('line and N follow actual source dimensions and offsets',()=>{
  const line=planDispensePath({...input,pattern:'line'});
  near(line.length,36);assert.deepEqual(line.points,[{x:-7,y:-4},{x:29,y:-4}]);
  const n=planDispensePath({...input,pattern:'n'});
  assert.equal(n.points.length,4);near(n.length,40+Math.hypot(36,20));
  assert.deepEqual(n.points[0],{x:-7,y:-14});assert.deepEqual(n.points.at(-1),{x:29,y:6});
});
test('every rectangle candidate and its segments remain in inset target bounds',()=>{
  for(const pattern of ['point','line','n','serpentine','spiral','perimeter']){
    const p=planDispensePath({...input,pattern});
    assert.ok(p.points.length>=1);assert.equal(p.cumulative.length,p.points.length);
    for(const q of samplePath(p,.5)){
      assert.ok(Math.abs(q.x-input.offsetX)<=input.width/2-input.edgeInset+1e-9,pattern);
      assert.ok(Math.abs(q.y-input.offsetY)<=input.depth/2-input.edgeInset+1e-9,pattern);
    }
  }
});
test('every circle candidate and its segments remain in inset disk',()=>{
  for(const pattern of ['point','line','n','serpentine','spiral','perimeter']){
    const p=planDispensePath({...input,shape:'circle',pattern});
    for(const q of samplePath(p,.3))assert.ok(Math.hypot(q.x-input.offsetX,q.y-input.offsetY)<=18+1e-8,pattern);
  }
});
test('serpentine pitch changes route length and source translation moves all vertices',()=>{
  const coarse=planDispensePath({...input,pattern:'serpentine',spacing:6});
  const fine=planDispensePath({...input,pattern:'serpentine',spacing:3});
  assert.ok(fine.length>coarse.length);const moved=planDispensePath({...input,pattern:'serpentine',spacing:6,offsetX:0,offsetY:0});
  near(moved.length,coarse.length);
  for(let i=0;i<moved.points.length;i++){near(coarse.points[i].x-moved.points[i].x,11);near(coarse.points[i].y-moved.points[i].y,-4);}
});
test('pointAt clamps distances and samples contain endpoints and monotone distance',()=>{
  const p=planDispensePath({...input,pattern:'n'});
  assert.deepEqual([pointOnPath(p,-1).x,pointOnPath(p,-1).y],[p.points[0].x,p.points[0].y]);
  assert.deepEqual([pointOnPath(p,p.length+1).x,pointOnPath(p,p.length+1).y],[p.points.at(-1).x,p.points.at(-1).y]);
  const points=samplePath(p,2);near(points.at(-1).distance,p.length);
  for(let i=1;i<points.length;i++)assert.ok(points[i].distance>points[i-1].distance);
  const single=samplePath(planDispensePath({...input,pattern:'point'}),1);assert.equal(single.length,1);
});
test('reject invalid margins, nonfinite values and unreasonable sampling',()=>{
  assert.throws(()=>planDispensePath({...input,edgeInset:12}),/內縮/);
  assert.throws(()=>planDispensePath({...input,spacing:0}),/間距/);
  assert.throws(()=>planDispensePath({...input,offsetX:NaN}),/有限/);
  assert.throws(()=>samplePath(planDispensePath({...input,pattern:'line'}),0),/間距/);
  assert.throws(()=>samplePath(planDispensePath({...input,pattern:'line'}),1e-8),/過多/);
});

test('spiral direction reverses the same geometric path and starts exactly at source center',()=>{
  for(const shape of ['rectangle','circle'])for(const spiralShape of ['auto','round','square']){
    const options={...input,shape,pattern:'spiral',spiralShape};
    const inward=planDispensePath({...options,spiralDirection:'outside-in'});
    const outward=planDispensePath({...options,spiralDirection:'inside-out'});
    assert.deepEqual(outward.points,[...inward.points].reverse());near(inward.length,outward.length);
    assert.deepEqual(outward.points[0],{x:input.offsetX,y:input.offsetY});
    for(const fraction of [0,.1,.5,.9,1]){
      const p=pointOnPath(inward,inward.length*fraction),q=pointOnPath(outward,outward.length*(1-fraction));
      near(p.x,q.x);near(p.y,q.y);
    }
  }
});
test('explicit round spiral fits the inset rectangle and square spiral fits inset circle',()=>{
  const round=planDispensePath({...input,pattern:'spiral',spiralShape:'round'});
  const radius=Math.min(input.width/2-input.edgeInset,input.depth/2-input.edgeInset);
  near(round.points[0].x,input.offsetX+radius);near(round.points[0].y,input.offsetY);
  for(const p of samplePath(round,.2))assert.ok(Math.hypot(p.x-input.offsetX,p.y-input.offsetY)<=radius+1e-8);
  const square=planDispensePath({...input,shape:'circle',pattern:'spiral',spiralShape:'square'});
  const circularRadius=input.width/2-input.edgeInset;
  for(const p of samplePath(square,.2))assert.ok(Math.hypot(p.x-input.offsetX,p.y-input.offsetY)<=circularRadius+1e-8);
  near(square.points[0].x,input.offsetX-circularRadius/Math.SQRT2);
  near(square.points[0].y,input.offsetY-circularRadius/Math.SQRT2);
});
test('spiral shape and direction accept only explicit supported values',()=>{
  assert.throws(()=>planDispensePath({...input,pattern:'spiral',spiralShape:'ellipse'}),/螺旋形狀/);
  assert.throws(()=>planDispensePath({...input,pattern:'spiral',spiralDirection:'sideways'}),/螺旋方向/);
});

test('square spiral to center stays open without crossing previous segments',()=>{
  const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
  function properCross(a,b,c,d){return cross(a,b,c)*cross(a,b,d)<-1e-12&&cross(c,d,a)*cross(c,d,b)<-1e-12;}
  for(const width of [10,30,40,100])for(const depth of [10,25,60])for(const spacing of [1,3,5,20]){
    const p=planDispensePath({...input,shape:'rectangle',pattern:'spiral',spiralShape:'square',width,depth,spacing,edgeInset:1});
    near(p.points.at(-1).x,input.offsetX);near(p.points.at(-1).y,input.offsetY);
    for(let i=1;i<p.points.length;i++)for(let j=i+2;j<p.points.length;j++)
      assert.equal(properCross(p.points[i-1],p.points[i],p.points[j-1],p.points[j]),false,`${width} x ${depth}, pitch ${spacing}`);
  }
});
