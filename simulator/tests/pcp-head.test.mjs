import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3,Vector3} from 'three';
import {createPcpHead} from '../src/pcp-head.js';
test('PCP reference has 303 mm body datum and attached inlet',()=>{
  const {group,inletPort,bodyLengthMm,flangeBoltCircleMm}=createPcpHead();group.updateMatrixWorld(true);
  assert.equal(bodyLengthMm,303);assert.equal(flangeBoltCircleMm,70);
  const flange=new Box3().setFromObject(group.getObjectByName('gearbox flange'));
  assert.ok(Math.abs(flange.max.z-303)<1e-6);
  const inlet=new Box3().setFromObject(group.getObjectByName('schematic side inlet #8/#6 JIC'));
  assert.ok(new Vector3().copy(inletPort.position).clamp(inlet.min,inlet.max).distanceTo(inletPort.position)<1e-6);
  assert.ok(new Box3().setFromObject(group.getObjectByName('motor housing estimated')).min.z>=303);
});
