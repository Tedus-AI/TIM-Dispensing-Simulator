import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {hoseRoute,buildHoseGeometry} from '../src/visual-hose.js';

test('visual hose stays connected to both ports at representative moving poses',()=>{
  for(const kind of ['air','feed'])for(const x of [-125,0,125])for(const z of [20,90]){
    const start=new Vector3(-700,0,-500),end=new Vector3(x,25,z),p=hoseRoute(start,end,kind);
    assert.ok(p[0].distanceTo(start)<1e-12);assert.ok(p.at(-1).distanceTo(end)<1e-12);
    const geometry=buildHoseGeometry(start,end,kind,3);for(const n of geometry.attributes.position.array)assert.ok(Number.isFinite(n));geometry.dispose();
  }
});
