import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { dotDimensions, beadProfile, BEAD_SIDES } from './engine.js';
import {createCartridgeAssembly} from './cartridge-assembly.js';
import {createPumpStation} from './pump-station.js';
import {createC300Enclosure} from './c300-enclosure.js';
import {createPcpHead} from './pcp-head.js';
import {buildHoseGeometry} from './visual-hose.js';
import {R75_NOZZLE} from './hardware-reference.js';
import {pointOnPath} from './path-planning.js';

const COLORS={base:0x3d484b,structure:0xa8b1b4,rail:0xcbd2d3,dark:0x2d3538,white:0xe5e7e4,ink:0x263d38,work:0x889591,glue:0xd99391};
// Visual nozzle dimensions are independent of the equivalent hydraulic length.
// The 63.5 mm R75 candidate is split into 56.5 mm exposed plus an assumed 7 mm inserted stem.
function nozzleGeometry(bore,length){
  const r=bore/2,outer=r+.55,top=Math.max(5,outer+.4);
  const points=[[r,0],[outer,0],[outer+.12,Math.min(2,length*.12)],[top,length],[r,length],[r,0]].map(([x,y])=>new THREE.Vector2(x,y));
  const g=new THREE.LatheGeometry(points,64);g.rotateX(Math.PI/2);return g;
}
function nozzleStemGeometry(bore,length){
  // Visual insert into the female outlet; no exact 1/4 NPT thread geometry is claimed.
  const r=bore/2,insert=R75_NOZZLE.assumedInsertionMm,p=[[r,length],[6.2,length],[6.2,length+insert],[r,length+insert],[r,length]].map(([x,y])=>new THREE.Vector2(x,y));
  const g=new THREE.LatheGeometry(p,48);g.rotateX(Math.PI/2);return g;
}
function volumeOf(g){const a=g.attributes.position,ix=g.index;let v=0;for(let i=0;i<(ix?ix.count:a.count);i+=3){const j=ix?ix.getX(i):i,k=ix?ix.getX(i+1):i+1,l=ix?ix.getX(i+2):i+2;v+=(a.getX(j)*(a.getY(k)*a.getZ(l)-a.getZ(k)*a.getY(l))+a.getY(j)*(a.getZ(k)*a.getX(l)-a.getX(k)*a.getZ(l))+a.getZ(j)*(a.getX(k)*a.getY(l)-a.getY(k)*a.getX(l)))/6;}return Math.abs(v);}
// One watertight surface with shared longitudinal rings: no internal end caps or overlapping slices.
function continuousLineGeometry(deposits,cellLength,ratio){
  const profile=beadProfile(deposits,cellLength,ratio),n=deposits.length,sides=BEAD_SIDES,m=sides+1,pos=[],idx=[];
  for(let i=0;i<=n;i++)for(let j=0;j<=sides;j++){const a=j*Math.PI/sides;pos.push(i*cellLength,profile.widths[i]*Math.cos(a)/2,profile.heights[i]*Math.sin(a));}
  for(let i=0;i<n;i++)for(let j=0;j<sides;j++){const a=i*m+j,b=a+1,c=a+m,d=c+1;idx.push(a,b,d,a,d,c);}
  // Duplicate only the underside edge vertices to keep its flat normals off the curved surface.
  const bottom=pos.length/3;
  for(let i=0;i<=n;i++)pos.push(i*cellLength,profile.widths[i]/2,0,i*cellLength,-profile.widths[i]/2,0);
  for(let i=0;i<n;i++){const a=bottom+2*i;idx.push(a,a+2,a+3,a,a+3,a+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();g.userData.unitVolume=volumeOf(g);return g;
}
// The longitudinal bins follow path arc length. The nozzle footprint may extend
// beyond the ends, so extend the end tangent rather than collapsing those rings.
// Bent rings are a geometric illustration; crossings are not a material union.
function continuousPathGeometry(deposits,cellLength,ratio,path,gridStart){
  const profile=beadProfile(deposits,cellLength,ratio),n=deposits.length,sides=BEAD_SIDES,m=sides+1,pos=[],idx=[];
  const ring=i=>{
    const s=gridStart+i*cellLength,q=pointOnPath(path,s),clamped=Math.max(0,Math.min(path.length,s)),extra=s-clamped;
    return {x:q.x+q.tx*extra,y:q.y+q.ty*extra,nx:-q.ty,ny:q.tx};
  };
  for(let i=0;i<=n;i++){
    const p=ring(i);
    for(let j=0;j<=sides;j++){
      const a=j*Math.PI/sides,w=profile.widths[i]*Math.cos(a)/2;
      pos.push(p.x+p.nx*w,p.y+p.ny*w,profile.heights[i]*Math.sin(a));
    }
  }
  for(let i=0;i<n;i++)for(let j=0;j<sides;j++){const a=i*m+j,b=a+1,c=a+m,d=c+1;idx.push(a,b,d,a,d,c);}
  const bottom=pos.length/3;
  for(let i=0;i<=n;i++){
    const p=ring(i),w=profile.widths[i]/2;
    pos.push(p.x+p.nx*w,p.y+p.ny*w,0,p.x-p.nx*w,p.y-p.ny*w,0);
  }
  for(let i=0;i<n;i++){const a=bottom+2*i;idx.push(a,a+2,a+3,a,a+3,a+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();g.userData.unitVolume=volumeOf(g);return g;
}
// Thin source boundary is a coordinate guide, not the actual chip material.
function createPatternSource(settings,z){
  const group=new THREE.Group(),w=settings.width,d=settings.shape==='circle'?w:settings.depth;
  const fill=new THREE.MeshBasicMaterial({color:0x4ca0a3,transparent:true,opacity:.30,side:THREE.DoubleSide,depthWrite:false});
  const edge=new THREE.LineBasicMaterial({color:0x17686d,transparent:true,opacity:.75,depthWrite:false});
  const geometry=settings.shape==='circle'?new THREE.CircleGeometry(w/2,96):new THREE.PlaneGeometry(w,d);
  const mesh=new THREE.Mesh(geometry,fill);mesh.position.z=z+.003;mesh.renderOrder=1;group.add(mesh);
  let pts;
  if(settings.shape==='circle')pts=Array.from({length:97},(_,i)=>new THREE.Vector3(w/2*Math.cos(i*2*Math.PI/96),w/2*Math.sin(i*2*Math.PI/96),z+.006));
  else pts=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2],[-w/2,-d/2]].map(([x,y])=>new THREE.Vector3(x,y,z+.006));
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),edge);line.renderOrder=2;group.add(line);
  group.position.set(settings.offsetX,settings.offsetY,0);group.name='設定的熱源參考輪廓';group.userData.ownedMaterials=[fill,edge];return group;
}
function lineGeometry(){
  const n=32,pos=[],idx=[];
  for(const x of [-.5,.5])for(let j=0;j<=n;j++){let a=j*Math.PI/n;pos.push(x,Math.cos(a)/2,Math.sin(a));}
  const m=n+1;
  for(let j=0;j<m;j++){const k=(j+1)%m;idx.push(j,k,m+k,j,m+k,m+j);}
  // Separate cap vertices keep cap normals from producing false rings along an otherwise smooth bead.
  const capStart=pos.length/3;
  for(const x of [-.5,.5])for(let j=0;j<=n;j++){let a=j*Math.PI/n;pos.push(x,Math.cos(a)/2,Math.sin(a));}
  for(let j=1;j<n;j++){idx.push(capStart,capStart+j+1,capStart+j,capStart+m,capStart+m+j,capStart+m+j+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();g.userData.unitVolume=volumeOf(g);return g;
}
function capGeometry(ratio){
  const b=1,h=2*ratio,R=(b*b+h*h)/(2*h),z0=h-R,theta=Math.acos((R-h)/R),radial=48,rings=16,pos=[0,0,h],idx=[];
  for(let j=1;j<=rings;j++){const a=theta*j/rings,r=R*Math.sin(a),z=z0+R*Math.cos(a);for(let k=0;k<radial;k++){const t=k*2*Math.PI/radial;pos.push(r*Math.cos(t),r*Math.sin(t),z);}}
  for(let k=0;k<radial;k++)idx.push(0,1+k,1+(k+1)%radial);
  for(let j=0;j<rings-1;j++)for(let k=0;k<radial;k++){const a=1+j*radial+k,b=1+j*radial+(k+1)%radial,c=a+radial,d=b+radial;idx.push(a,c,b,b,c,d);}
  const center=pos.length/3;pos.push(0,0,0);const start=1+(rings-1)*radial;for(let k=0;k<radial;k++)idx.push(center,start+(k+1)%radial,start+k);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();g.userData.unitVolume=volumeOf(g);return g;
}

export class DispenseScene {
  constructor(host,onScale){
    this.host=host;this.onScale=onScale;this.mode='close';this.config=null;this.parts=0;this.isoCorner=2;this.freeOrbit=false;this.showExitPath=true;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0xf1f3ef);
    this.camera=new THREE.OrthographicCamera(-150,150,100,-100,0.1,12000);this.camera.up.set(0,0,1);
    this.renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-label','毫米比例的等角點膠場景，可拖曳平移及滾輪縮放');
    this.renderer.domElement.setAttribute('tabindex','0');
    this.scene.add(new THREE.HemisphereLight(0xffffff,0x79867c,2.1));const sun=new THREE.DirectionalLight(0xfff8f0,1.55);sun.position.set(-90,-120,650);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-300,right:300,top:300,bottom:-300,near:1,far:1000});sun.shadow.bias=-.00018;sun.shadow.normalBias=.05;this.scene.add(sun);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableRotate=false;this.controls.enableDamping=false;this.controls.minZoom=.2;this.controls.maxZoom=30;this.controls.minPolarAngle=.01;this.controls.maxPolarAngle=Math.PI-.01;this.controls.mouseButtons.LEFT=THREE.MOUSE.PAN;this.controls.mouseButtons.RIGHT=THREE.MOUSE.PAN;
    this.controls.addEventListener('change',()=>this.render());
    this.materials=Object.fromEntries(Object.entries(COLORS).map(([k,color])=>[k,new THREE.MeshStandardMaterial({color,roughness:k==='rail'?.4:.75,metalness:k==='rail'?.45:.15})]));
    this.materials.glue.metalness=0;this.materials.glue.roughness=.72;
    this.materials.polymer=new THREE.MeshStandardMaterial({color:0xe7e1cb,roughness:.44,metalness:0});
    this.materials.transparentShell=new THREE.MeshStandardMaterial({color:0xeaf5f4,roughness:.28,metalness:0,transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide});
    this.resizeObserver=new ResizeObserver(()=>{this.resize();});this.resizeObserver.observe(host);
    this.renderer.domElement.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){this.camera.zoom*=1.2;}else if(e.key==='-'){this.camera.zoom/=1.2;}else if(e.key==='Home'){this.fit(this.mode);return;}else{return;}e.preventDefault();this.camera.updateProjectionMatrix();this.render();});
  }
  mesh(g,mat,parent=this.machine,edges=true){const m=new THREE.Mesh(g,this.materials[mat]||mat);parent.add(m);this.parts++;m.castShadow=mat!=='transparentShell';m.receiveShadow=true;if(edges){const line=new THREE.LineSegments(new THREE.EdgesGeometry(g,30),new THREE.LineBasicMaterial({color:0x3e5048,transparent:true,opacity:.16}));m.add(line);}return m;}
  box(w,d,h,x,y,z,mat='structure',parent){const bevel=Math.min(.8,w/20,d/20,h/6);const g=Math.min(w,d,h)>=3?new RoundedBoxGeometry(w,d,h,2,bevel):new THREE.BoxGeometry(w,d,h);const m=this.mesh(g,mat,parent);m.position.set(x,y,z+h/2);return m;}
  cyl(r,h,x,y,z,mat='rail',parent){const g=new THREE.CylinderGeometry(r,r,h,32);g.rotateX(Math.PI/2);const m=this.mesh(g,mat,parent);m.position.set(x,y,z+h/2);return m;}
  bolt(x,y,z,parent){return this.cyl(1.8,1.2,x,y,z,'dark',parent);}
  disposeGroup(group){if(!group)return;group.traverse(o=>{o.geometry?.dispose();if(o.isLineSegments)o.material.dispose();});group.removeFromParent();}
  disposeOwned(group){if(!group)return;for(const mat of group.userData.ownedMaterials||[])mat.dispose();}
  rebuild(c,run){
    this.imported?.removeFromParent();this.disposeOwned(this.enclosure);this.disposeOwned(this.pumpStation?.group);this.disposeOwned(this.head?.group);this.disposeOwned(this.patternSource);this.disposeGroup(this.patternSource);this.patternSource=null;this.hose?.material.dispose();this.stationAirHose?.material.dispose();this.disposeGroup(this.machine);this.disposeGroup(this.depositGroup);if(this.exitPath){this.exitPath.geometry.dispose();this.exitPath.material.dispose();this.exitPath.removeFromParent();}this.cartridge=null;this.pumpStation=null;this.head=null;this.hose=null;this.stationAirHose=null;this.lastHoseStart=null;this.lastHoseEnd=null;this.parts=0;this.config=c;
    this.materials.glue.color.setHex(c.material==='putty'?0xd99391:0xd4d6d2);
    const nozzleLength=c.architecture==='R75'?R75_NOZZLE.nominalLengthMm-R75_NOZZLE.assumedInsertionMm:c.nozzleLength;this.visualNozzleLength=nozzleLength;
    this.machine=new THREE.Group();this.scene.add(this.machine);this.depositGroup=new THREE.Group();this.scene.add(this.depositGroup);
    if(c.mode==='pattern'&&c.pathSettings){this.patternSource=createPatternSource(c.pathSettings,c.surfaceZ);this.scene.add(this.patternSource);}
    if(c.architecture==='P300'){
      this.enclosure=createC300Enclosure();this.machine.add(this.enclosure);
      this.pumpStation=createPumpStation();this.pumpStation.group.position.set(-750,0,-900);this.machine.add(this.pumpStation.group);
      // A visual plant-air service port and line, not a measured pneumatic circuit.
      const anchor=new THREE.Group();anchor.position.set(-469.5,-300,-700);this.machine.add(anchor);this.stationAirAnchor=anchor;
      const mount=new THREE.Mesh(new THREE.BoxGeometry(12,32,32),this.materials.dark);anchor.add(mount);
      const endCap=new THREE.Mesh(new THREE.CylinderGeometry(5,5,14,20),this.materials.rail);endCap.rotation.z=Math.PI/2;endCap.position.x=-13;anchor.add(endCap);
      this.stationAirSource=new THREE.Object3D();this.stationAirSource.position.x=-20;anchor.add(this.stationAirSource);
      this.stationAirHose=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshStandardMaterial({color:0x547489,roughness:.7}));this.stationAirHose.name='示意外部氣源接管';this.machine.add(this.stationAirHose);
      this.pumpStation.group.updateMatrixWorld(true);anchor.updateMatrixWorld(true);
      this.stationAirHose.geometry=buildHoseGeometry(this.pumpStation.airPort.getWorldPosition(new THREE.Vector3()),this.stationAirSource.getWorldPosition(new THREE.Vector3()),'stationAir',3);
    }else{this.enclosure=null;this.stationAirAnchor=null;}
    this.box(360,360,24,0,0,-40,'base');
    for(const x of [-145,145])for(const y of [-145,145]){this.cyl(15,10,x,y,-50,'dark');this.cyl(10,6,x,y,-40,'rail');}
    this.box(300,300,16,0,0,-16,'structure');
    // Precision work-table holes, with no fictitious hidden edges.
    for(let x=-125;x<=125;x+=25)for(let y=-125;y<=125;y+=25){if(Math.abs(x)<c.width/2+8&&Math.abs(y)<c.depth/2+8)continue;this.cyl(1.3,.12,x,y,.02,'dark');}
    for(const x of [-167,167]){this.box(20,324,10,x,0,-10,'dark');this.box(9,310,5,x,0,0,'rail');for(const y of [-158,158]){this.box(22,12,12,x,y,0,'structure');this.bolt(x,y,12);}}
    // Visible guide mounting strips, end stops and fasteners are generic engineering detail.
    for(const x of [-167,167])for(let y=-130;y<=130;y+=52){this.cyl(2.1,.7,x,y,5,'dark');this.cyl(.8,.3,x,y,5.7,'rail');}
    for(const y of [-152,152]){this.box(304,5,4,0,y,-4,'rail');for(const x of [-125,-75,-25,25,75,125])this.cyl(1.5,.7,x,y,0,'dark');}
    this.bridge=new THREE.Group();this.machine.add(this.bridge);
    for(const x of [-167,167]){this.box(30,46,12,x,52,5,'dark',this.bridge);this.box(20,28,220,x,52,17,'structure',this.bridge);this.box(24,30,5,x,52,237,'rail',this.bridge);for(const y of [35,68])this.bolt(x,y,17,this.bridge);}
    this.box(354,30,34,0,52,215,'structure',this.bridge);
    for(const z of [219,241])this.box(330,6,5,0,34,z,'rail',this.bridge);
    for(const x of [-145,-100,-55,0,55,100,145])for(const z of [220,241]){const bolt=this.cyl(1.4,1.2,x,0,0,'dark',this.bridge);bolt.rotation.x=Math.PI/2;bolt.position.set(x,30,z);}
    for(const x of [-179,179])this.box(6,32,36,x,52,214,'dark',this.bridge);
    this.box(32,35,32,-202,52,215,'dark',this.bridge);
    const screw=this.cyl(2.5,330,0,0,0,'rail',this.bridge);screw.rotation.y=Math.PI/2;screw.position.set(0,29,233);
    this.carriage=new THREE.Group();this.bridge.add(this.carriage);
    this.box(56,12,42,0,36,211,'dark',this.carriage);for(const x of [-19,19])for(const z of [220,241]){this.box(13,14,8,x,32,z-4,'rail',this.carriage);}
    for(const x of [-18,18])for(const z of [217,238]){const bolt=this.cyl(1.6,1.5,0,0,0,'rail',this.carriage);bolt.rotation.x=Math.PI/2;bolt.position.set(x,28,z);}
    this.box(52,8,180,0,42,55,'structure',this.carriage);
    for(const x of [-18,18]){this.box(6,6,160,x,34,65,'rail',this.carriage);}
    this.cyl(2,158,0,34,65,'rail',this.carriage);this.box(28,28,25,0,42,235,'dark',this.carriage);
    this.tool=new THREE.Group();this.machine.add(this.tool);
    if(c.architecture==='R75'){
      this.cartridge=createCartridgeAssembly({fillMaterial:this.materials.glue});
      this.cartridge.group.position.z=nozzleLength;this.tool.add(this.cartridge.group);
      // Supply connection is attached to the moving bridge; tube routing is illustrative.
      this.box(24,18,16,-125,52,188,'dark',this.bridge);
      const airNipple=this.cyl(4,12,-125,52,204,'rail',this.bridge);
      this.airSource=new THREE.Object3D();this.airSource.position.set(-125,52,216);this.bridge.add(this.airSource);
      this.hoseStart=this.airSource;this.hoseEnd=this.cartridge.airPort;
    }else{
      this.head=createPcpHead();this.head.group.position.z=nozzleLength;this.tool.add(this.head.group);
      this.hoseStart=this.pumpStation.fluidPort;this.hoseEnd=this.head.inletPort;
    }
    this.hose=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshStandardMaterial({color:c.architecture==='R75'?0x72879a:0x263b42,roughness:.65}));
    this.hose.name=c.architecture==='R75'?'示意供氣管':'示意供膠管';this.machine.add(this.hose);
    // TCP is the open nozzle bottom at local Z=0; never scale the extrusion or bore for the camera.
    // The long nozzle casts a coarse oversized shadow in the inspection camera's close view.
    // Keep its shading, but omit that distracting shadow rather than implying an actual stain.
    this.mesh(nozzleGeometry(c.diameter,nozzleLength),c.architecture==='R75'?'polymer':'rail',this.tool,false).castShadow=false;
    if(c.architecture==='R75')this.mesh(nozzleStemGeometry(c.diameter,nozzleLength),'polymer',this.tool,false).castShadow=false;
    this.fixture=this.box(Math.min(c.width+16,300),Math.min(c.depth+16,300),Math.max(0,c.fixtureHeight-2),0,0,Math.min(2,c.fixtureHeight),'dark');
    for(const x of [-1,1])for(const y of [-1,1])this.box(12,12,Math.min(2,c.fixtureHeight),x*Math.min(c.width/2,135),y*Math.min(c.depth/2,135),0,'rail');
    this.partHolder=new THREE.Group();this.machine.add(this.partHolder);
    if(this.imported){this.partHolder.add(this.imported);this.imported.position.set(0,0,c.fixtureHeight);}
    else{this.box(c.width,c.depth,c.thickness,0,0,c.fixtureHeight,'work',this.partHolder);for(const x of [-1,1])this.box(8,18,Math.min(3,c.thickness),x*(c.width/2+4),-c.depth/2+12,c.fixtureHeight,'rail');}
    this.box(70,1,12,75,-180.6,-34,'dark');
    // Millimetre ticks on the exposed front edge of the table.
    for(let x=-140;x<=140;x+=5)this.box(.35,x%25===0?5:2,.1,x,-147,0,'dark');
    this.lastDeposits=null;this.depositMeshes=[];
    if(c.mode==='point')this.dotGeo=capGeometry(c.dotRatio);
    const geometry=c.mode==='pattern'?continuousPathGeometry(run.frames[0].deposits,run.cellLength,c.lineRatio,run.path,run.gridStart):c.mode==='line'?continuousLineGeometry(run.frames[0].deposits,run.cellLength,c.lineRatio):this.dotGeo;
    const m=new THREE.Mesh(geometry,this.materials.glue);m.visible=false;m.castShadow=true;m.receiveShadow=true;this.depositGroup.add(m);this.depositMeshes.push(m);
    const pathPoints=run.frames.filter(f=>f.t>=run.ending.liftStart-.01&&f.t<=run.ending.motionEnd+.01).map(f=>new THREE.Vector3(f.x,f.y,f.z));
    this.exitPath=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPoints),new THREE.LineDashedMaterial({color:0xb47836,dashSize:.7,gapSize:.4,transparent:true,opacity:.7}));this.exitPath.computeLineDistances();this.exitPath.visible=this.showExitPath;this.scene.add(this.exitPath);
    this.run=run;this.update(run.frames[0]);this.fit(this.mode);
  }
  update(s){if(!this.config)return;const c=this.config;this.tool.position.set(s.x,s.y,s.z);this.carriage.position.x=s.x;this.bridge.position.y=s.y;
    if(this.cartridge)this.cartridge.updateFill(s.remaining/75);
    if(this.hose){
      this.machine.updateMatrixWorld(true);
      const a=this.machine.worldToLocal(this.hoseStart.getWorldPosition(new THREE.Vector3())),b=this.machine.worldToLocal(this.hoseEnd.getWorldPosition(new THREE.Vector3()));
      if(!this.lastHoseStart||a.distanceToSquared(this.lastHoseStart)>1e-5||b.distanceToSquared(this.lastHoseEnd)>1e-5){this.hose.geometry.dispose();this.hose.geometry=buildHoseGeometry(a,b,c.architecture==='R75'?'air':'feed',c.architecture==='R75'?3:5);this.lastHoseStart=a;this.lastHoseEnd=b;}
    }
    const m=this.depositMeshes[0],v=s.deposited;m.visible=v>1e-12;
    if(c.mode==='line'||c.mode==='pattern'){
      if(this.lastDeposits!==s.deposits){m.geometry.dispose();m.geometry=c.mode==='pattern'?continuousPathGeometry(s.deposits,this.run.cellLength,c.lineRatio,this.run.path,this.run.gridStart):continuousLineGeometry(s.deposits,this.run.cellLength,c.lineRatio);this.lastDeposits=s.deposits;}
      if(c.mode==='pattern')m.position.set(0,0,c.surfaceZ+.001);
      else m.position.set(c.offsetX-c.lineLength/2+this.run.gridStart,c.offsetY,c.surfaceZ+.001);
    }else if(m.visible){const d=dotDimensions(v,c.dotRatio),b=d.radius;m.scale.set(b,b,v*1000/(this.dotGeo.userData.unitVolume*b*b));m.position.set(c.offsetX,c.offsetY,c.surfaceZ+.001);}
    if(this.mode==='follow'||(this.mode==='head'&&this.headTargetOffset)){
      const target=this.mode==='follow'?new THREE.Vector3(s.x,s.y,c.surfaceZ):new THREE.Vector3(s.x,s.y,s.z).add(this.headTargetOffset);
      this.camera.position.add(target.clone().sub(this.controls.target));this.controls.target.copy(target);
    }
    this.render();
  }
  resize(){const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h,false);if(this.config)this.fit(this.mode);}
  fit(mode='close'){
    this.mode=mode; if(!this.config)return; const c=this.config,w=this.host.clientWidth,h=this.host.clientHeight,aspect=w/h;
    if(mode==='feed'&&!this.pumpStation)mode=this.mode='work';
    // Inspection modes hide obstructing covers, never alter dimensions or the physics.
    for(const child of this.machine.children)child.visible=mode==='whole'||(mode==='work'&&child!==this.enclosure&&child!==this.pumpStation?.group&&child!==this.stationAirHose&&child!==this.stationAirAnchor)||(mode==='feed'&&(child===this.pumpStation?.group||child===this.enclosure||child===this.stationAirAnchor||child===this.hose||child===this.stationAirHose))||(mode==='head'&&(child===this.tool||child===this.bridge||child===this.partHolder||child===this.fixture||child===this.hose))||((mode==='close'||mode==='follow')&&(child===this.tool||child===this.partHolder||child===this.fixture));
    for(const child of this.tool.children){child.updateMatrixWorld();const bounds=new THREE.Box3().setFromObject(child);child.visible=['whole','work','head'].includes(mode)||bounds.min.z-this.tool.position.z<this.visualNozzleLength+13;}
    let pts=[];let target;
    if(mode==='whole'||mode==='feed'||mode==='head'){
      const object=mode==='whole'?this.machine:mode==='feed'?this.pumpStation.group:this.tool;
      const b=new THREE.Box3().setFromObject(object);for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])pts.push(new THREE.Vector3(x,y,z));target=b.getCenter(new THREE.Vector3());
      if(mode==='head')this.headTargetOffset=target.clone().sub(this.tool.position);
    }
    else if(mode==='work'){
      for(const x of [-240,240])for(const y of [-210,210])for(const z of [-50,c.architecture==='P300'?430:300])pts.push(new THREE.Vector3(x,y,z));target=new THREE.Vector3(0,0,c.architecture==='P300'?190:125);
    }
    else{for(const x of [-c.width/2,c.width/2])for(const y of [-c.depth/2,c.depth/2])for(const z of [c.fixtureHeight,c.surfaceZ+Math.min(25,c.nozzleLength+13)])pts.push(new THREE.Vector3(x,y,z));target=new THREE.Vector3(0,0,c.surfaceZ+5);}
    const direction=this.freeOrbit?this.camera.position.clone().sub(this.controls.target).normalize():this.isoDirection();
    this.controls.target.copy(target);this.camera.position.copy(target).add(direction.multiplyScalar(5000));this.camera.zoom=1;this.camera.lookAt(target);this.camera.updateMatrixWorld();
    const projected=pts.map(p=>p.clone().applyMatrix4(this.camera.matrixWorldInverse));
    let ww=Math.max(...projected.map(p=>Math.abs(p.x)))*2.25,hh=Math.max(...projected.map(p=>Math.abs(p.y)))*2.25;
    if(mode==='follow'){ww=40;hh=ww/aspect;}
    const span=Math.max(hh,ww/aspect);this.camera.left=-span*aspect/2;this.camera.right=span*aspect/2;this.camera.top=span/2;this.camera.bottom=-span/2;this.camera.updateProjectionMatrix();this.controls.update();this.render();
  }
  render(){if(!this.renderer)return;this.renderer.render(this.scene,this.camera);if(this.onScale){const a=new THREE.Vector3(0,0,0).project(this.camera),b=new THREE.Vector3(10,0,0).project(this.camera);const px=Math.hypot((b.x-a.x)*this.host.clientWidth/2,(b.y-a.y)*this.host.clientHeight/2);this.onScale(px,Math.atan2(-(b.y-a.y)*this.host.clientHeight,(b.x-a.x)*this.host.clientWidth)*180/Math.PI);}}
  isoDirection(){const signs=[[1,1,1],[-1,1,1],[-1,-1,1],[1,-1,1]][this.isoCorner];return new THREE.Vector3(...signs).normalize();}
  setCorner(index){this.isoCorner=index;this.setFreeOrbit(false);this.fit(this.mode);}
  setFreeOrbit(enabled){this.freeOrbit=enabled;this.controls.enableRotate=enabled;this.controls.mouseButtons.LEFT=enabled?THREE.MOUSE.ROTATE:THREE.MOUSE.PAN;this.controls.touches.ONE=enabled?THREE.TOUCH.ROTATE:THREE.TOUCH.PAN;this.controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;if(!enabled)this.fit(this.mode);}
  async importFile(file,unit,up){
    const ext=file.name.toLowerCase().split('.').pop(),buffer=await file.arrayBuffer();let object;
    if(ext==='stl'){const geometry=new STLLoader().parse(buffer);object=new THREE.Mesh(geometry,this.materials.work);}
    else if(ext==='glb'||ext==='gltf'){
      if(ext==='gltf'){const json=JSON.parse(new TextDecoder().decode(buffer));if([...(json.buffers||[]),...(json.images||[])].some(x=>x.uri&&!x.uri.startsWith('data:')))throw new Error('此 glTF 含外接檔案，請匯出單一 GLB 或內嵌資源 glTF。');}
      const manager=new THREE.LoadingManager();manager.setURLModifier(url=>{if(!url.startsWith('blob:')&&!url.startsWith('data:'))throw new Error('工件引用外部資源，請匯出內嵌材質的 GLB。');return url;});
      const data=await new GLTFLoader(manager).parseAsync(ext==='gltf'?new TextDecoder().decode(buffer):buffer,'');object=data.scene;
    }else throw new Error('目前可載入 STL、GLB、內嵌 glTF。STEP 請先轉換。');
    const wrapper=new THREE.Group();wrapper.add(object);const factor=ext==='stl'?({mm:1,cm:10,m:1000,inch:25.4}[unit]):1000;wrapper.scale.setScalar(factor);
    if(ext!=='stl'||up==='Y')wrapper.rotation.x=Math.PI/2;
    wrapper.updateMatrixWorld(true);let box=new THREE.Box3().setFromObject(wrapper);const size=box.getSize(new THREE.Vector3());
    if(![size.x,size.y,size.z].every(v=>Number.isFinite(v))||size.x<1||size.x>1000||size.y<1||size.y>1000||size.z<.1||size.z>200)throw new Error('工件尺寸不在原型範圍內（長寬 1–1000mm，厚 0.1–200mm），請檢查來源單位與檔案。');
    const centered=new THREE.Group();centered.add(wrapper);wrapper.position.set(-(box.min.x+box.max.x)/2,-(box.min.y+box.max.y)/2,-box.min.z);
    if(this.imported){this.imported.removeFromParent();this.imported.traverse(o=>{o.geometry?.dispose();});}
    this.imported=centered;
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))).map(x=>x.toString(16).padStart(2,'0')).join('');
    return {width:size.x,depth:size.y,thickness:size.z,workpieceKind:'imported',workpieceFile:{name:file.name,sha256:digest,sourceUnit:ext==='stl'?unit:'m',up:ext==='stl'?up:'Y',unitFactorToMm:factor}};
  }
  clearImport(){if(this.imported){this.imported.removeFromParent();this.imported.traverse(o=>o.geometry?.dispose());this.imported=null;}}
  geometryAudit(){return {parts:this.parts,renderedDepositVolumeMm3:this.depositMeshes.filter(m=>m.visible).reduce((s,m)=>s+m.geometry.userData.unitVolume*m.scale.x*m.scale.y*m.scale.z,0),cameraDirection:this.camera.position.clone().sub(this.controls.target).normalize().toArray()};}
  screenshot(){this.render();return this.renderer.domElement.toDataURL('image/png');}
}
export {volumeOf,lineGeometry,capGeometry,continuousLineGeometry,continuousPathGeometry,createPatternSource,nozzleGeometry,nozzleStemGeometry};
