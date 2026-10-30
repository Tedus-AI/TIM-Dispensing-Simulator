import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createC300Enclosure} from '../src/c300-enclosure.js';

const near=(x,y)=>assert.ok(Math.abs(x-y)<.0001,`${x} != ${y}`);
test('C300 display envelope maintains published overall dimensions and exact datum',()=>{
  const group=createC300Enclosure();group.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(group),size=bounds.getSize(new THREE.Vector3());
  near(size.x,939);near(size.y,1041);near(size.z,1905);
  near(bounds.min.x,-469.5);near(bounds.max.x,469.5);
  near(bounds.min.y,-520.5);near(bounds.max.y,520.5);
  near(bounds.min.z,-900);near(bounds.max.z,1005);
  assert.equal(group.userData.source,'Graco 349735EN-B p.33');
  assert.match(group.userData.caveat,/not OEM CAD/);
});
test('open inspection envelope keeps the existing machine work area clear',()=>{
  const group=createC300Enclosure();group.updateMatrixWorld(true);
  const reserved=new THREE.Box3(new THREE.Vector3(-200,-200,0),new THREE.Vector3(200,200,350));
  let meshes=0;
  group.traverse(o=>{if(!o.isMesh)return;meshes++;const box=new THREE.Box3().setFromObject(o);
    assert.equal(box.intersectsBox(reserved),false,`${o.name} intrudes into the work cell`);
  });
  assert.ok(meshes>=60,`too few modeled components: ${meshes}`);
});
