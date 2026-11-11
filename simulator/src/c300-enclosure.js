import * as THREE from 'three';

/**
 * Open inspection representation inspired by the Graco UniXact C300.
 * Manufacturer brochure 349735EN-B p.33 states H 1905 x W 939 x D 1041 mm.
 * Only the external envelope is sourced. Door, controls, support height,
 * and detailed construction are visual engineering assumptions, not CAD.
 * Axes X/Y on the working table, Z up. The working-table datum is Z=0.
 */
export function createC300Enclosure() {
  const group = new THREE.Group();
  group.name = 'C300 reference envelope — open inspection';
  group.userData = {
    kind: 'visual_envelope', source: 'Graco 349735EN-B p.33',
    widthMm: 939, depthMm: 1041, heightMm: 1905,
    bottomMm: -900, topMm: 1005,
    caveat: 'external envelope published; panel geometry, mounting and opening assumed; not OEM CAD'
  };

  const material = {
    body: new THREE.MeshStandardMaterial({color:0xe9ebe8, roughness:.55, metalness:.1}),
    frame: new THREE.MeshStandardMaterial({color:0xbac1c0, roughness:.54, metalness:.34}),
    door: new THREE.MeshStandardMaterial({color:0xe2e5df, roughness:.72, metalness:.14}),
    gasket: new THREE.MeshStandardMaterial({color:0x40494b, roughness:.8, metalness:.08}),
    steel: new THREE.MeshStandardMaterial({color:0x7f8d8e, roughness:.4, metalness:.7}),
    screen: new THREE.MeshStandardMaterial({color:0x0f2a3a, roughness:.25, metalness:.1, emissive:0x0b3a52, emissiveIntensity:.8}),
    screenLine: new THREE.MeshStandardMaterial({color:0x7bb3bd, roughness:.6, metalness:0}),
    blue: new THREE.MeshStandardMaterial({color:0x1f5fd1, roughness:.45, metalness:.15}),
    red: new THREE.MeshStandardMaterial({color:0xc13524, roughness:.42, metalness:.08}),
    yellow: new THREE.MeshStandardMaterial({color:0xdfc544, roughness:.55, metalness:0}),
    foot: new THREE.MeshStandardMaterial({color:0x2a2f33, roughness:.7, metalness:.3}),
    // Guard glazing: clear polycarbonate, drawn faintly so the robot stays readable through it.
    glazing: new THREE.MeshPhysicalMaterial({color:0xd9ecf2, roughness:.06, metalness:0, transparent:true, opacity:.13, depthWrite:false, side:THREE.DoubleSide, clearcoat:.6})
  };
  group.userData.ownedMaterials = Object.values(material);

  function box(name,w,d,h,x,y,z,mat) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,d,h),material[mat]);
    mesh.name=name; mesh.position.set(x,y,z+h/2); mesh.castShadow=true; mesh.receiveShadow=true;
    group.add(mesh); return mesh;
  }
  function roundFront(name,r,depth,x,y,z,mat,segments=20) {
    // CylinderGeometry is Y-oriented: its axis is normal to the front skin.
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r,r,depth,segments),material[mat]);
    mesh.name=name;mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;
    group.add(mesh);return mesh;
  }

  // Machine base: exterior datum runs from Z -900 to -50. Front/rear skins
  // complete the published 1041 mm depth; door panels are inset visual details.
  // The work deck (cabinet top) is at Z -70: the robot's feet stand on it, as on the bench of the R75 scene.
  // The cabinet stands on four levelling feet (v3.0); the outer envelope is unchanged.
  box('cabinet structure',939,1037,802,0,0,-872,'body');
  box('front skin',939,2,822,0,-519.5,-872,'body');
  box('rear skin',939,2,822,0,519.5,-872,'body');
  for (const x of [-410,410]) for (const y of [-460,460]) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(32,36,10,28),material.foot);
    pad.name='levelling foot pad';pad.rotation.x=Math.PI/2;pad.position.set(x,y,-895);pad.castShadow=pad.receiveShadow=true;group.add(pad);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(10,10,18,16),material.steel);
    stem.name='levelling foot stem';stem.rotation.x=Math.PI/2;stem.position.set(x,y,-881);stem.castShadow=true;group.add(stem);
  }
  box('kick plate',939,.6,60,0,-520.2,-872,'gasket');
  // Cooling grille and mains isolator on the right flank (illustrative).
  for (let i=0;i<8;i++) box('vent slot',.6,180,6,469.2,300,-760+i*14,'gasket');
  box('isolator plate',.8,70,90,469.1,-380,-420,'frame');
  box('isolator handle',6,16,44,466.5,-380,-397,'red');
  box('front access door gasket',710,.5,620,0,-520.15,-830,'gasket');
  box('front access door',704,.35,614,0,-520.0,-827,'door');
  box('door label plate',180,.2,74,0,-520.29,-560,'frame');
  box('door visual label inset',148,.15,42,0,-520.40,-544,'blue');
  for (const x of [-280,280]) {
    box('cabinet door pull',8,.8,95,x,-520.0,-315,'steel');
    box('door pull lower bracket',24,.8,8,x,-520.0,-320,'gasket');
    box('door pull upper bracket',24,.8,8,x,-520.0,-220,'gasket');
  }
  // Fasteners sit within the supplied envelope and remain decorative details.
  for (const x of [-443,-360,-180,0,180,360,443]) {
    for (const z of [-874,-83]) roundFront('cabinet fastener',3,.55,x,-520.15,z,'steel',12);
  }
  for (const x of [-340,340]) {
    for (const z of [-814,-230]) roundFront('access door fastener',2.6,.45,x,-520.2,z,'steel',12);
  }

  // Four posts and roof. Until v2.2 the openings were drawn without glazing,
  // so the motion/dispensing head is visible from any of the four iso corners.
  for (const x of [-448.5,448.5]) {
    for (const y of [-499.5,499.5]) {
      box('window support post',42,42,1000,x,y,-50,'frame');
      box('post face inset',16,1,950,x,y<0?-520.0:520.0,-25,'gasket');
    }
  }
  box('roof structure',939,1041,55,0,0,950,'body');
  // Guard glazing in the three fixed sides and the front door (v3.0), inside the published envelope.
  const pane=(name,w,d,h,x,y,z)=>{const m=box(name,w,d,h,x,y,z,'glazing');m.castShadow=false;m.receiveShadow=false;m.renderOrder=3;return m;};
  pane('rear guard pane',855,3,954,0,508,-28);
  pane('front door pane',855,3,954,0,-508,-28);
  for (const x of [-458,458]) pane('side guard pane',3,957,954,x,0,-28);
  // Door frame around the front pane.
  for (const x of [-424,424]) box('front door stile',14,6,954,x,-512,-28,'frame');
  for (const z of [-28,912]) box('front door rail',834,6,14,0,-512,z,'frame');
  for (const y of [-510,510]) {
    box('window upper rail',855,20,24,0,y,926,'frame');
    box('window sill',855,20,22,0,y,-50,'frame');
  }
  for (const x of [-459,459]) {
    box('window side upper rail',20,957,24,x,0,926,'frame');
    box('window side sill',20,957,22,x,0,-50,'frame');
  }
  // Back and side rails indicate safety framing without falsely claiming a guard.
  box('rear window mid rail',855,12,12,0,510,420,'frame');
  for(const x of [-459,459]) box('side window mid rail',12,957,12,x,0,420,'frame');
  // Front opening: hinges and handle indicate a door position; no moving-door model.
  for (const z of [115,420,735]) {
    box('front door hinge',18,4,40,436,-518.0,z,'steel');
    roundFront('hinge pin',3,1,436,-519.6,z+20,'gasket',12);
  }
  box('door latch backing',18,5,180,430,-517.8,280,'gasket');
  box('door latch grip',9,4,144,430,-518.5,298,'steel');

  // Operator console within the left front post: all sizes and placement estimated.
  box('console support bracket',78,20,24,-403,-500,620,'steel');
  box('console housing',190,20,155,-330,-508,490,'gasket');
  box('console bezel',176,1,141,-330,-518.4,497,'frame');
  box('console screen',160,.7,106,-330,-519.3,524,'screen');
  for(let i=0;i<4;i++)box('screen interface row',118-i*13,.2,3,-334,-519.77,598-i*17,'screenLine');
  for(let i=0;i<4;i++)box('screen soft key',15,.2,7,-385+i*35,-519.77,532,'blue');
  for (const x of [-410,-250]) for (const z of [503,632]) roundFront('console fastener',2,.5,x,-519.4,z,'steel',12);
  box('operator button panel',108,10,68,-343,-511,404,'frame');
  roundFront('emergency stop yellow surround',18,3,-372,-517.5,438,'yellow');
  roundFront('emergency stop head',11,1.5,-372,-519.3,438,'red');
  roundFront('start indicator',6,2,-332,-519,438,'blue');
  roundFront('auxiliary indicator',6,2,-308,-519,438,'gasket');

  return group;
}
