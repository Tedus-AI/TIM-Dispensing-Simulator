import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/**
 * Display-only supply station inspired by Graco 25T471 (300 cc), not OEM CAD.
 * Manufacturer envelope: W 360 mm × D 300 mm, lowered H 550 mm.
 * Every small dimension, position, hose fitting and the transparent inspection
 * panel is an engineering approximation, NOT a verified physical connection.
 * Group origin is centred on the bottom face, Z up, 1 scene unit = 1 mm.
 * Port origins are at the outside coupling faces; their +Z axes point outwards.
 * Caller may connect display hoses but must not use this as a pressure spec.
 */
export function createPumpStation() {
  const group = new THREE.Group();
  group.name = 'P300_supply_station_reference';
  group.userData = { reference: 'Graco DM-22 25T471', evidence: 'exterior envelope from manual; individual parts engineering approximation', lowerHeightMm: 550, raisedHeightMm: 800, widthMm: 360, depthMm: 300, units: 'mm', fluidConnection: '1/4 NPT female, nominal', airConnection: '8 mm female, nominal' };

  const material = {
    blue: new THREE.MeshStandardMaterial({ color: 0x1f5fbf, roughness: .42, metalness: .35 }),
    blueDark: new THREE.MeshStandardMaterial({ color: 0x163f80, roughness: .5, metalness: .3 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xc3cbcb, roughness: .37, metalness: .74 }),
    satin: new THREE.MeshStandardMaterial({ color: 0x8a9899, roughness: .46, metalness: .68 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x263138, roughness: .7, metalness: .2 }),
    black: new THREE.MeshStandardMaterial({ color: 0x11191d, roughness: .62, metalness: .1 }),
    dial: new THREE.MeshStandardMaterial({ color: 0xe2e6df, roughness: .8, metalness: 0 }),
    red: new THREE.MeshStandardMaterial({ color: 0xb8453c, roughness: .55, metalness: .15 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xb59a56, roughness: .38, metalness: .72 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xc0d7da, transparent: true, opacity: .24, depthWrite: false, roughness: .25, metalness: .02, side: THREE.DoubleSide })
  };
  group.userData.ownedMaterials=Object.values(material);
  const box = (name,w,d,h,x,y,z,mat='steel',round=1.2) => {
    const bevel=Math.min(round,w/8,d/8,h/8);
    const mesh=new THREE.Mesh(bevel>0?new RoundedBoxGeometry(w,d,h,2,bevel):new THREE.BoxGeometry(w,d,h),material[mat]);
    mesh.name=name;mesh.position.set(x,y,z+h/2);mesh.castShadow=mat!=='glass';mesh.receiveShadow=true;group.add(mesh);return mesh;
  };
  const cylinder = (name,r,h,x,y,z,mat='steel',axis='z',segments=32) => {
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),material[mat]);
    mesh.name=name;mesh.castShadow=mat!=='glass';mesh.receiveShadow=true;
    if(axis==='z') { mesh.rotation.x=Math.PI/2; mesh.position.set(x,y,z+h/2); }
    else if(axis==='x') { mesh.rotation.z=-Math.PI/2; mesh.position.set(x+h/2,y,z); }
    else { mesh.position.set(x,y-h/2,z); } // y begins at the rear face, projects toward front (-Y)
    group.add(mesh);return mesh;
  };
  const bolt = (x,y,z,r=2.6) => {
    cylinder('bolt washer',r+1.2,.5,x,y,z,'steel');cylinder('hex fastener',r,2.1,x,y,z+.5,'dark','z',6);
  };
  const port = (name,pos,axis) => {
    const p=new THREE.Object3D();p.name=name;p.position.set(...pos);
    const dir=new THREE.Vector3(...axis).normalize();p.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),dir);
    p.userData={ axis:dir.toArray(), reference:'visual connection datum; unverified physical fitting' };group.add(p);return p;
  };

  // Full-footprint base, recessed controls, and structural feet.
  box('base footprint',360,300,18,0,0,0,'blueDark',1);
  box('lower enclosure',360,230,92,0,15,18,'blue',2);
  box('recessed front control panel',284,10,88,0,-105,20,'blueDark',1);
  for(const x of [-155,155])for(const y of [-125,125])bolt(x,y,18);
  for(const x of [-156,156])box('side edge protection',12,12,74,x,-107,21,'dark',1);
  for(const x of [-140,140])for(const z of [30,94]){
    cylinder('panel screw',2,1.2,x,-110,z,'steel','y',6);
  }

  // Gauges face the operator, in the X–Z plane. Tick marks are purely visual.
  function gauge(x,z){
    cylinder('pressure gauge body',16,6,x,-110,z,'black','y');
    cylinder('pressure gauge rim',14.6,1.4,x,-116,z,'steel','y');
    cylinder('pressure gauge face',12.6,.5,x,-117.4,z,'dial','y');
    for(let i=0;i<9;i++){
      const angle=(-.75+i*1.5/8)*Math.PI, xx=x+10*Math.sin(angle),zz=z+10*Math.cos(angle);
      const tick=box('gauge tick',.6,.2,1.8,xx,-118.1,zz-.9,'dark',0);tick.rotation.y=angle;
    }
    const needle=box('gauge needle',.75,.3,8,x,-118.3,z-1,'red',0);needle.rotation.y=.7;
    cylinder('gauge spindle',1.4,.6,x,-118.5,z,'dark','y');
  }
  function regulator(x,z){
    cylinder('regulator collar',11,4,x,-110,z,'steel','y');
    cylinder('regulator knob',10,15,x,-114,z,'black','y',32);
    for(let i=0;i<12;i++){
      const a=i*Math.PI/6, xx=x+9.7*Math.sin(a),zz=z+9.7*Math.cos(a);
      const rib=box('knob grip rib',1,11,1.5,xx,-122,zz-.75,'satin',0);rib.rotation.y=a;
    }
  }
  gauge(-92,80);gauge(66,80);regulator(-92,46);regulator(66,46);
  for(const x of [-30,18]){
    cylinder('selector mounting ring',7,3,x,-110,48,'steel','y');
    cylinder('selector switch',4.4,10,x,-113,48,'black','y');
    box('selector grip',2.5,4,12,x,-124,42,'satin',.3);
  }

  // Two opposed lift posts on the upper deck. Heights are display assumptions.
  for(const x of [-126,126]){
    cylinder('ram foot flange',24,9,x,24,110,'steel');
    for(const dx of [-13,13])for(const dy of [-13,13])bolt(x+dx,24+dy,119,2);
    cylinder('vertical ram post',13.5,255,x,24,119,'satin');
    cylinder('upper ram collar',20,13,x,24,374,'steel');
    cylinder('upper ram collar cap',15,4,x,24,387,'dark');
  }
  box('crossbeam below upper plate',298,40,15,0,24,382,'steel',1.5);
  box('upper equipment mounting plate',300,150,12,0,14,397,'steel',1.5);
  for(const x of [-130,130])for(const y of [-40,68])bolt(x,y,409,2.2);

  // Cartridge: 48 × 170 mm chosen within manufacturer compatibility limits;
  // the transparent window is a cutaway so the otherwise opaque container can be seen.
  const cx=-62,cy=12;
  box('cartridge housing lower mounting block',78,80,13,cx,cy,110,'satin',2);
  cylinder('cartridge housing lower seat',35,10,cx,cy,123,'dark');
  cylinder('candidate aluminium cartridge',24,170,cx,cy,133,'steel');
  cylinder('candidate cartridge bottom shoulder',21,4,cx,cy,133,'satin');
  cylinder('candidate cartridge top edge',24.4,3,cx,cy,300,'satin');
  for(const dx of [-33,33]){
    box('cartridge housing upright',8,52,206,cx+dx,cy,123,'satin',1);
    for(const z of [135,210,310])bolt(cx+dx,cy-18,z,2);
  }
  box('cartridge housing head',76,67,10,cx,cy,329,'satin',2);
  cylinder('cartridge ram rod',8,43,cx,cy,339,'steel');
  cylinder('ram rod upper bushing',14,7,cx,cy,375,'dark');
  // Front glass is intentionally a transparent inspection aid, not an OEM housing.
  box('transparent inspection panel',59,2,190,cx,cy-30,132,'glass',.2);
  for(const x of [cx-23,cx+23])for(const z of [142,308]){
    cylinder('inspection panel fastener',2,1.4,x,cy-32,z,'dark','y');
  }

  // Pump / air motor and feed-body, mechanically connected to upper plate.
  const px=62,py=32;
  cylinder('pump lower mounting foot',38,10,px,py,110,'steel');
  // Illustrative internal supply manifold linking the cartridge seat to the pump inlet.
  box('estimated feed manifold between cartridge and pump',68,32,18,0,cy,120,'satin',1);
  cylinder('pump lower body',29,210,px,py,120,'steel');
  cylinder('pump lower sleeve',33,55,px,py,150,'satin');
  cylinder('pump lower collar',34,7,px,py,205,'dark');
  cylinder('pump lower upper collar',33,7,px,py,323,'satin');
  cylinder('pump shaft neck',16,67,px,py,330,'steel');
  cylinder('pump motor lower flange',43,11,px,py,409,'steel');
  cylinder('pump pneumatic motor body',42,113,px,py,420,'satin');
  cylinder('pump motor upper lip',43,8,px,py,533,'steel');
  cylinder('pump motor cap',34,9,px,py,541,'dark');
  for(const a of [0,Math.PI/2,Math.PI,3*Math.PI/2]){
    bolt(px+31*Math.cos(a),py+31*Math.sin(a),541,2.2);
  }
  for(const x of [px-22,px+22])for(const y of [py-20,py+20])bolt(x,y,120,2.3);

  // Pump-to-hose coupling: +X is outward, port is precisely at coupling's face.
  const pz=247,fluidStart=px+29;
  cylinder('fluid fitting boss',11,6,fluidStart,py,pz,'satin','x',6);
  cylinder('fluid fitting nut',10,10,fluidStart+6,py,pz,'steel','x',6);
  cylinder('fluid fitting coupling',7,12,fluidStart+16,py,pz,'steel','x');
  cylinder('fluid fitting mouth',5.4,1,fluidStart+28,py,pz,'dark','x');
  const fluidPort=port('fluid outlet datum',[fluidStart+29,py,pz],[1,0,0]);

  // Main air line entry on the front panel; this is separate from fluid outlet.
  const ax=114,az=55;
  cylinder('air inlet panel boss',7,4,ax,-110,az,'steel','y',6);
  cylinder('air inlet coupling',5.8,12,ax,-114,az,'brass','y');
  cylinder('air inlet face',4.2,1,ax,-126,az,'dark','y');
  const airPort=port('main air inlet datum',[ax,-127,az],[0,-1,0]);

  group.updateMatrixWorld(true);
  return {group,fluidPort,airPort};
}
