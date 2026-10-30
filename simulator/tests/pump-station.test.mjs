import test from 'node:test';
import assert from 'node:assert/strict';
import {Box3, Vector3} from 'three';
import {createPumpStation} from '../src/pump-station.js';

const near=(a,b,tolerance=.001)=>assert.ok(Math.abs(a-b)<tolerance,`${a} is not ${b} ± ${tolerance}`);

test('reference station matches documented lowered outer envelope with the base at z=0',()=>{
  const {group}=createPumpStation();group.updateMatrixWorld(true);
  const bounds=new Box3().setFromObject(group),size=bounds.getSize(new Vector3());
  near(bounds.min.z,0);near(size.x,360);near(size.y,300);near(size.z,550);
  assert.equal(group.userData.fluidConnection,'1/4 NPT female, nominal');
  assert.equal(group.userData.airConnection,'8 mm female, nominal');
});

test('air and fluid connection datums lie at their visible fitting faces and point outward',()=>{
  const {group,fluidPort,airPort}=createPumpStation();group.updateMatrixWorld(true);
  for(const [port,partName,axis,index] of [[fluidPort,'fluid fitting mouth',[1,0,0],0],[airPort,'air inlet face',[0,-1,0],1]]){
    const object=group.getObjectByName(partName);assert.ok(object,`${partName} absent`);
    const b=new Box3().setFromObject(object),point=port.getWorldPosition(new Vector3()),dir=port.getWorldDirection(new Vector3());
    const face=index===0?b.max.x:b.min.y;
    near(point.getComponent(index),face);near(dir.distanceTo(new Vector3(...axis)),0);
    assert.ok(point.clone().clamp(b.min,b.max).distanceTo(point)<.001,'connector is detached from fitting');
  }
});

test('moving the assembly preserves connection positions and direction',()=>{
  const {group,fluidPort,airPort}=createPumpStation();group.position.set(-750,0,-900);group.updateMatrixWorld(true);
  const f=fluidPort.getWorldPosition(new Vector3()),a=airPort.getWorldPosition(new Vector3());
  near(f.x,-630);near(f.y,32);near(f.z,-653);
  near(a.x,-636);near(a.y,-127);near(a.z,-845);
});
