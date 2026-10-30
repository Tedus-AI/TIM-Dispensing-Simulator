import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCompressionScene} from '../src/compression-scene.js';

const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-5,`${a} != ${b}`);
test('heat source and transparent plate use the configured size, offset and gap',()=>{
  const config={surfaceZ:13,material:'putty'};
  const settings={shape:'rectangle',width:30,depth:20,offsetX:5,offsetY:-8,gap:.2};
  const result={grid:{originX:0,originY:0,cellSize:1,cols:2,rows:1,coverage:new Float32Array([.25,1])}};
  const scene=createCompressionScene(config,settings,result); scene.group.updateMatrixWorld(true);
  const sourceSize=new THREE.Box3().setFromObject(scene.source).getSize(new THREE.Vector3());
  near(sourceSize.x,30);near(sourceSize.y,20);
  near(scene.source.position.x,5);near(scene.source.position.y,-8);
  const plateBounds=new THREE.Box3().setFromObject(scene.plate);
  near(plateBounds.min.z,13.2);near(plateBounds.getSize(new THREE.Vector3()).z,3);
  assert.equal(scene.area.geometry.getAttribute('position').count,8);
  const color=scene.area.geometry.getAttribute('color'); assert.ok(color.getW(0)<color.getW(4));
  scene.dispose();
});
test('round heat source has true specified diameter and releases geometries and materials',()=>{
  const scene=createCompressionScene({surfaceZ:2,material:'grease'}, {shape:'circle',width:20,depth:3,offsetX:0,offsetY:0,gap:1}, {grid:{originX:0,originY:0,cellSize:1,cols:1,rows:1,coverage:[0]}});
  const bounds=new THREE.Box3().setFromObject(scene.source),size=bounds.getSize(new THREE.Vector3());
  near(size.x,20);near(size.y,20);assert.equal(scene.area.geometry.getAttribute('position').count,0);
  let count=0;scene.plate.geometry.addEventListener('dispose',()=>count++);scene.plate.material.addEventListener('dispose',()=>count++);
  scene.dispose();assert.equal(count,2);
});

test('inspection plate extends beyond all estimated material and the heat source',()=>{
  const config={surfaceZ:0,material:'putty'};
  const settings={shape:'rectangle',width:10,depth:10,offsetX:0,offsetY:0,gap:.2};
  const result={grid:{originX:17,originY:-22,cellSize:2,cols:1,rows:1,coverage:[1]}};
  const scene=createCompressionScene(config,settings,result);scene.group.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(scene.plate);
  near(box.min.x,-11);near(box.max.x,25);near(box.min.y,-28);near(box.max.y,11);
  scene.dispose();
});
