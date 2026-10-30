import * as THREE from 'three';

// Only the bare 75 mL cartridge envelope is published: A = 43.2, B = 98.8 mm.
// The shoulder, wall, retainer, clamp, air fitting and piston proportions are
// visual assumptions, not an OEM model, pressure rating, or flow-path geometry.
// Origin is the lower face of the bare cartridge's female 1/4 NPT port.
export const CARTRIDGE_DIMENSIONS = Object.freeze({outsideDiameterMm:43.2, totalLengthMm:98.8});

const shellMaterial=new THREE.MeshStandardMaterial({color:0xd8eeee,transparent:true,opacity:.21,depthWrite:false,side:THREE.DoubleSide,roughness:.25,metalness:0});
const retainerMaterial=new THREE.MeshStandardMaterial({color:0xc6e0e1,transparent:true,opacity:.19,depthWrite:false,side:THREE.DoubleSide,roughness:.23,metalness:0});
const blueMaterial=new THREE.MeshStandardMaterial({color:0x345f88,roughness:.54,metalness:.08});
const metalMaterial=new THREE.MeshStandardMaterial({color:0xbfc8c6,roughness:.35,metalness:.65});
const darkMaterial=new THREE.MeshStandardMaterial({color:0x2e3a3d,roughness:.61,metalness:.25});
const pistonMaterial=new THREE.MeshStandardMaterial({color:0xd6d8d2,roughness:.69,metalness:0});
const defaultFill=new THREE.MeshStandardMaterial({color:0xd99391,roughness:.72});

function lathe(name,points,material,segments=64){
  const geometry=new THREE.LatheGeometry(points.map(([r,z])=>new THREE.Vector2(r,z)),segments);
  geometry.rotateX(Math.PI/2);
  const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.receiveShadow=true;return mesh;
}
function cylinder(name,radius,height,z,material,segments=48){
  const geometry=new THREE.CylinderGeometry(radius,radius,height,segments);
  geometry.rotateX(Math.PI/2);
  const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.position.z=z+height/2;
  mesh.castShadow=material!==shellMaterial&&material!==retainerMaterial;mesh.receiveShadow=true;return mesh;
}
function box(name,w,d,h,x,y,z,material){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,d,h),material);mesh.name=name;mesh.position.set(x,y,z+h/2);
  mesh.castShadow=mesh.receiveShadow=true;return mesh;
}
// A split sector shows a clamp with a small front/back gap. It is not a thread.
function clampSector(name,a0,a1){
  const geometry=new THREE.LatheGeometry([new THREE.Vector2(23.3,0),new THREE.Vector2(26.6,0),new THREE.Vector2(26.6,7),new THREE.Vector2(23.3,7),new THREE.Vector2(23.3,0)],32,a0,a1-a0);
  geometry.rotateX(Math.PI/2);
  const mesh=new THREE.Mesh(geometry,metalMaterial);mesh.name=name;mesh.position.z=48;mesh.castShadow=mesh.receiveShadow=true;return mesh;
}
// Four-sided wedge matching the sloping front shoulder; its maximum radius
// remains within the published 21.6 mm bare-body radius.
function shoulderRib(name,angle){
  const points=[[8.1,8.6],[10.0,11.0],[16.8,15.4],[20.9,19.4]];
  const halfWidth=.62,positions=[],indices=[];
  for(const [r,z] of points){
    for(const t of [-halfWidth,halfWidth]){
      positions.push(r*Math.cos(angle)-t*Math.sin(angle),r*Math.sin(angle)+t*Math.cos(angle),z);
    }
  }
  for(let i=0;i<points.length-1;i++){const k=2*i;indices.push(k,k+1,k+3,k,k+3,k+2);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  const mesh=new THREE.Mesh(geometry,shellMaterial);mesh.name=name;return mesh;
}

export function createCartridgeAssembly({fillMaterial=defaultFill}={}){
  const group=new THREE.Group();group.name='R75 cartridge, retainer and clamp (illustrative)';
  group.userData={bareOutsideDiameterMm:43.2,bareLengthMm:98.8,datum:'bare outlet face z=0',dimensionalBasis:'Nordson Optimum typical envelope; internal and accessories estimated'};

  const bare=new THREE.Group();bare.name='cartridge_bare';group.add(bare);
  // Profile includes the female outlet neck and shoulder inside B; the inner
  // wall and shoulder shape are illustrative. It is an open bore, no thread mesh.
  const profile=[[6.2,0],[7.6,0],[7.6,8.3],[10,10.4],[16.8,15.3],[21.6,19.5],[21.6,98.8],
    [20.0,98.8],[20.0,20.5],[15.5,16.3],[9.0,11.5],[6.2,8.3],[6.2,0]];
  bare.add(lathe('bare cartridge body and outlet',profile,shellMaterial));
  bare.add(lathe('bare outlet hex, no thread detail',[[6.2,1.1],[9.4,1.1],[9.4,8.3],[6.2,8.3],[6.2,1.1]],shellMaterial,6));
  for(let i=0;i<6;i++)bare.add(shoulderRib(`bare shoulder rib ${i+1}`,i*Math.PI/3));
  // An open end-rim, not a lid; B stops exactly at this upper datum.
  bare.add(lathe('bare upper rim',[[20,97.5],[21.6,97.5],[21.6,98.8],[20,98.8],[20,97.5]],shellMaterial));

  // Display-only fill height. It is not a measured piston position or inner volume.
  const fillBottom=20.7,maxFillHeight=75;
  const fill=cylinder('illustrative material fill',18.8,1,fillBottom,fillMaterial);group.add(fill);
  const piston=cylinder('illustrative piston',19.2,1.6,fillBottom,pistonMaterial);group.add(piston);
  const pistonSeal=cylinder('illustrative piston seal',19.4,.6,fillBottom,darkMaterial);group.add(pistonSeal);
  function updateFill(fraction){
    const f=Number.isFinite(fraction)?Math.min(1,Math.max(0,fraction)):0;
    const height=maxFillHeight*f;
    fill.visible=height>1e-9;fill.scale.z=Math.max(height,1e-6);fill.position.z=fillBottom+height/2;
    piston.position.z=fillBottom+height+.8;pistonSeal.position.z=fillBottom+height+.3;
  }
  updateFill(1);

  // Transparent pressure retainer and separate cap extend beyond the bare datum.
  group.add(lathe('separate transparent pressure retainer',[[21.9,14],[23.2,14],[23.2,101],[21.9,101],[21.9,14]],retainerMaterial));
  group.add(lathe('retainer lower collar',[[9.4,8.8],[23.2,8.8],[23.2,14],[21.9,14],[18.0,14],[9.4,10.0],[9.4,8.8]],blueMaterial));
  group.add(lathe('retainer top retaining lip',[[21.9,99.0],[24.0,99.0],[24.0,102.2],[21.9,102.2],[21.9,99.0]],blueMaterial));
  group.add(cylinder('separate pressure cap',24,8.5,102.2,blueMaterial));
  group.add(cylinder('air connector base',8,3,110.7,metalMaterial,6));
  group.add(cylinder('air push-fit body',5.3,7,113.7,darkMaterial));
  group.add(cylinder('air push-fit collar',5.8,2,120.7,metalMaterial));
  const airPort=new THREE.Object3D();airPort.name='air inlet tubing end';airPort.position.set(0,0,122.7);airPort.userData.direction=[0,0,1];group.add(airPort);

  // Split clamp, screw blocks and rear mounting plate. These are engineering
  // visuals and are not offered as a measured or rated mounting assembly.
  const clamp=new THREE.Group();clamp.name='estimated split clamp and mounting plate';group.add(clamp);
  clamp.add(clampSector('left clamp half',.08,Math.PI-.08),clampSector('right clamp half',Math.PI+.08,2*Math.PI-.08));
  for(const x of [-27,27]){
    clamp.add(box('clamp lug',9,10,9,x,0,47,metalMaterial));
    // Vertical cap screw passes through the lug; small dark recess is visual only.
    const head=cylinder('clamp screw head',2.6,2,56,darkMaterial,12);head.position.x=x;clamp.add(head);
    const recess=cylinder('clamp screw socket',1,0.25,58,metalMaterial,6);recess.position.x=x;clamp.add(recess);
  }
  clamp.add(box('mounting plate',58,8,42,0,30,30,darkMaterial));
  clamp.add(box('rear machine attachment face',46,4,34,0,36,34,metalMaterial));
  for(const x of [-20,20])for(const z of [38,62]){
    const bolt=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,1.4,12),metalMaterial);
    bolt.name='rear mounting screw';bolt.position.set(x,24.9,z);clamp.add(bolt);
  }

  return {group,bare,piston,fill,airPort,updateFill};
}
