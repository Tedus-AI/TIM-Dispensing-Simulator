import * as THREE from 'three';

// Graco 25B192 is a geometry reference for the generic P300 candidate only.
// Laird's specific upgraded PCP and pressure adapter have not been identified.
// Datum: dispensing outlet = local Z 0, motor/gearbox flange = Z 303 mm.
export function createPcpHead() {
  const group=new THREE.Group();group.name='PCP 0.30cc reference - 303mm body';
  const steel=new THREE.MeshStandardMaterial({color:0xbac2c0,metalness:.75,roughness:.33});
  const dark=new THREE.MeshStandardMaterial({color:0x333d40,metalness:.35,roughness:.55});
  const black=new THREE.MeshStandardMaterial({color:0x263234,metalness:.15,roughness:.65});
  const blue=new THREE.MeshStandardMaterial({color:0x37678a,metalness:.3,roughness:.48});
  group.userData.ownedMaterials=[steel,dark,black,blue];
  function cyl(name,r,h,z,material=steel,sides=48){const g=new THREE.CylinderGeometry(r,r,h,sides);g.rotateX(Math.PI/2);const o=new THREE.Mesh(g,material);o.name=name;o.position.z=z+h/2;o.castShadow=o.receiveShadow=true;group.add(o);return o;}
  function box(name,w,d,h,x,y,z,material=steel){const o=new THREE.Mesh(new THREE.BoxGeometry(w,d,h),material);o.name=name;o.position.set(x,y,z+h/2);o.castShadow=o.receiveShadow=true;group.add(o);return o;}
  // Axial envelope is 303 mm measured from end adapter to gearbox attachment.
  cyl('end adapter',12,13,0,steel,6);cyl('stator end ring',15,5,13,dark);
  cyl('stator body',14,105,18,black);cyl('stator coupling',18,10,123,steel,6);
  cyl('pump barrel',20,78,133,steel);cyl('seal housing',25,25,211,dark);
  cyl('bearing housing',27,24,236,steel);cyl('sanitary clamp',29,8,260,steel);
  cyl('drive adapter',22,26,268,dark);cyl('gearbox flange',39,9,294,steel);
  // Bolt circle Ø70 mm is published, head sizes are visual estimates.
  for(let i=0;i<4;i++){const a=i*Math.PI/2,o=cyl('flange M4 visual',2.3,1.2,303,dark,12);o.position.x=35*Math.cos(a);o.position.y=35*Math.sin(a);}
  // Motor is outside the 303 mm body and has estimated dimensions.
  cyl('motor shoulder',31,10,303,dark);cyl('motor housing estimated',34,72,313,blue);
  for(let i=0;i<8;i++){const a=i*Math.PI/4;box('motor cooling rib',3,3,52,32*Math.cos(a),32*Math.sin(a),321,dark);}
  cyl('motor rear cap',34,6,385,dark);
  // Published #8/#6 JIC inlet; protrusion and the pressure adapter are schematic.
  const inletZ=195;const connector=new THREE.Mesh(new THREE.CylinderGeometry(8,8,24,6),steel);
  connector.name='schematic side inlet #8/#6 JIC';connector.rotation.z=-Math.PI/2;connector.position.set(31,0,inletZ);group.add(connector);
  const inletPort=new THREE.Object3D();inletPort.name='PCP material inlet (schematic outlet face)';inletPort.position.set(43,0,inletZ);group.add(inletPort);
  box('mounting rail plate estimated',58,8,125,0,38,125,dark);
  for(const z of [145,225]){box('clamp bridge estimated',58,12,9,0,27,z,steel);for(const x of [-24,24]){const b=cyl('clamp bolt',2.2,1.5,z+9,dark,12);b.position.set(x,27,z+9.75);}}
  return {group,inletPort,bodyLengthMm:303,flangeBoltCircleMm:70};
}
