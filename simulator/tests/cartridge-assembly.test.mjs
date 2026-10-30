import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createCartridgeAssembly,CARTRIDGE_DIMENSIONS} from '../src/cartridge-assembly.js';

const near=(a,b,tol=.0001)=>assert.ok(Math.abs(a-b)<tol,`${a} differs from ${b}`);
test('75 cc bare cartridge is measured from outlet to open end, excluding cap and holder',()=>{
  const {group,bare,airPort}=createCartridgeAssembly();group.updateMatrixWorld(true);
  const box=new THREE.Box3().setFromObject(bare),size=box.getSize(new THREE.Vector3());
  near(box.min.z,0);near(box.max.z,98.8);near(size.z,CARTRIDGE_DIMENSIONS.totalLengthMm);
  near(size.x,CARTRIDGE_DIMENSIONS.outsideDiameterMm);near(size.y,CARTRIDGE_DIMENSIONS.outsideDiameterMm);
  const fullBox=new THREE.Box3().setFromObject(group);
  assert.ok(fullBox.max.z>98.8,'separate retainer and cap must extend beyond bare end');
  assert.ok(fullBox.max.x>21.6,'independent clamp must extend beyond bare diameter');
  assert.ok(airPort.position.z>fullBox.max.z-.001,'air tube must touch the connector outer face');
  assert.equal(group.getObjectByName('bare outlet hex, no thread detail').parent,bare);
  assert.equal(bare.children.filter(o=>o.name.startsWith('bare shoulder rib')).length,6);
});

test('display piston follows clamped fill fraction without moving the datum or air inlet',()=>{
  const a=createCartridgeAssembly();const port=a.airPort.position.clone();
  a.updateFill(1);const full=a.piston.position.z;
  a.updateFill(.5);const half=a.piston.position.z;near(a.fill.scale.z,37.5);
  a.updateFill(0);const empty=a.piston.position.z;
  assert.ok(full>half&&half>empty);assert.equal(a.fill.visible,false);
  a.updateFill(3);near(a.piston.position.z,full);
  a.updateFill(-1);near(a.piston.position.z,empty);
  a.updateFill(NaN);near(a.piston.position.z,empty);
  assert.deepEqual(a.airPort.position.toArray(),port.toArray());
  assert.equal(a.bare.position.z,0);
});

test('mounting bracket and air connector are parented to the moving tool assembly',()=>{
  const a=createCartridgeAssembly(),clamp=a.group.getObjectByName('estimated split clamp and mounting plate');
  assert.ok(clamp);assert.ok(clamp.getObjectByName('left clamp half'));assert.ok(clamp.getObjectByName('right clamp half'));
  assert.ok(clamp.getObjectByName('rear machine attachment face'));assert.equal(a.airPort.parent,a.group);
  a.group.position.set(30,-20,63.5);a.group.updateMatrixWorld(true);
  const world=a.airPort.getWorldPosition(new THREE.Vector3());
  near(world.x,30);near(world.y,-20);near(world.z,63.5+122.7);
});
