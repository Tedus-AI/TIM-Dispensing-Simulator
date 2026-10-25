import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { lineDimensions, dotDimensions } from './engine.js';

const COLORS={base:0x5b6868,structure:0xa1ada9,rail:0xd5ddda,dark:0x394747,white:0xe8ece6,ink:0x263d38,work:0x9eaba3,glue:0xf1dfbd};
function volumeOf(g){const a=g.attributes.position,ix=g.index;let v=0;for(let i=0;i<(ix?ix.count:a.count);i+=3){const ids=[0,1,2].map(k=>ix?ix.getX(i+k):i+k),p=ids.map(j=>new THREE.Vector3().fromBufferAttribute(a,j));v+=p[0].dot(p[1].clone().cross(p[2]))/6;}return Math.abs(v);}
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
    this.host=host;this.onScale=onScale;this.mode='close';this.config=null;this.parts=0;this.isoCorner=0;this.freeOrbit=false;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0xf1f3ef);
    this.camera=new THREE.OrthographicCamera(-150,150,100,-100,0.1,4000);this.camera.up.set(0,0,1);
    this.renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));this.renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-label','毫米比例的等角點膠場景，可拖曳平移及滾輪縮放');
    this.renderer.domElement.setAttribute('tabindex','0');
    this.scene.add(new THREE.HemisphereLight(0xffffff,0x79867c,2.6));const sun=new THREE.DirectionalLight(0xffffff,2.1);sun.position.set(-120,-160,500);this.scene.add(sun);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableRotate=false;this.controls.enableDamping=false;this.controls.minZoom=.2;this.controls.maxZoom=30;this.controls.minPolarAngle=.01;this.controls.maxPolarAngle=Math.PI-.01;this.controls.mouseButtons.LEFT=THREE.MOUSE.PAN;this.controls.mouseButtons.RIGHT=THREE.MOUSE.PAN;
    this.controls.addEventListener('change',()=>this.render());
    this.materials=Object.fromEntries(Object.entries(COLORS).map(([k,color])=>[k,new THREE.MeshStandardMaterial({color,roughness:k==='rail'?.4:.75,metalness:k==='rail'?.45:.15})]));
    this.materials.glue.metalness=0;this.materials.glue.roughness=.85;
    this.resizeObserver=new ResizeObserver(()=>{this.resize();});this.resizeObserver.observe(host);
    this.renderer.domElement.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){this.camera.zoom*=1.2;}else if(e.key==='-'){this.camera.zoom/=1.2;}else if(e.key==='Home'){this.fit(this.mode);return;}else{return;}e.preventDefault();this.camera.updateProjectionMatrix();this.render();});
  }
  mesh(g,mat,parent=this.machine,edges=true){const m=new THREE.Mesh(g,this.materials[mat]||mat);parent.add(m);this.parts++;if(edges){const line=new THREE.LineSegments(new THREE.EdgesGeometry(g,30),new THREE.LineBasicMaterial({color:0x3e5048,transparent:true,opacity:.22}));m.add(line);}return m;}
  box(w,d,h,x,y,z,mat='structure',parent){const m=this.mesh(new THREE.BoxGeometry(w,d,h),mat,parent);m.position.set(x,y,z+h/2);return m;}
  cyl(r,h,x,y,z,mat='rail',parent){const g=new THREE.CylinderGeometry(r,r,h,32);g.rotateX(Math.PI/2);const m=this.mesh(g,mat,parent);m.position.set(x,y,z+h/2);return m;}
  bolt(x,y,z,parent){return this.cyl(1.8,1.2,x,y,z,'dark',parent);}
  disposeGroup(group){if(!group)return;group.traverse(o=>{o.geometry?.dispose();if(o.isLineSegments)o.material.dispose();});group.removeFromParent();}
  rebuild(c,run){
    this.imported?.removeFromParent();this.disposeGroup(this.machine);this.disposeGroup(this.depositGroup);this.piston=null;this.parts=0;this.config=c;
    this.machine=new THREE.Group();this.scene.add(this.machine);this.depositGroup=new THREE.Group();this.scene.add(this.depositGroup);
    this.box(360,360,24,0,0,-40,'base');
    for(const x of [-145,145])for(const y of [-145,145]){this.cyl(15,10,x,y,-50,'dark');this.cyl(10,6,x,y,-40,'rail');}
    this.box(300,300,16,0,0,-16,'structure');
    // Precision work-table holes, with no fictitious hidden edges.
    for(let x=-125;x<=125;x+=25)for(let y=-125;y<=125;y+=25){if(Math.abs(x)<c.width/2+8&&Math.abs(y)<c.depth/2+8)continue;this.cyl(1.3,.12,x,y,.02,'dark');}
    for(const x of [-167,167]){this.box(20,324,10,x,0,-10,'dark');this.box(9,310,5,x,0,0,'rail');for(const y of [-158,158]){this.box(22,12,12,x,y,0,'structure');this.bolt(x,y,12);}}
    this.bridge=new THREE.Group();this.machine.add(this.bridge);
    for(const x of [-167,167]){this.box(30,46,12,x,52,5,'dark',this.bridge);this.box(20,28,220,x,52,17,'structure',this.bridge);this.box(24,30,5,x,52,237,'rail',this.bridge);for(const y of [35,68])this.bolt(x,y,17,this.bridge);}
    this.box(354,30,34,0,52,215,'structure',this.bridge);
    for(const z of [219,241])this.box(330,6,5,0,34,z,'rail',this.bridge);
    for(const x of [-179,179])this.box(6,32,36,x,52,214,'dark',this.bridge);
    this.box(32,35,32,-202,52,215,'dark',this.bridge);
    const screw=this.cyl(2.5,330,0,0,0,'rail',this.bridge);screw.rotation.y=Math.PI/2;screw.position.set(0,29,233);
    this.carriage=new THREE.Group();this.bridge.add(this.carriage);
    this.box(56,12,42,0,36,211,'dark',this.carriage);for(const x of [-19,19])for(const z of [220,241]){this.box(13,14,8,x,32,z-4,'rail',this.carriage);}
    this.box(52,8,180,0,42,55,'structure',this.carriage);
    for(const x of [-18,18]){this.box(6,6,160,x,34,65,'rail',this.carriage);}
    this.cyl(2,158,0,34,65,'rail',this.carriage);this.box(28,28,25,0,42,235,'dark',this.carriage);
    this.tool=new THREE.Group();this.machine.add(this.tool);
    for(const x of [-18,18]){this.box(12,9,24,x,34,38,'dark',this.tool);this.bolt(x,34,62,this.tool);}
    const mount=new THREE.Shape();mount.moveTo(-28,-26);mount.lineTo(28,-26);mount.lineTo(28,42);mount.lineTo(-28,42);mount.closePath();
    const mountHole=new THREE.Path();mountHole.absarc(0,0,c.architecture==='R75'?21.2:13.2,0,Math.PI*2,true);mount.holes.push(mountHole);
    const bracket=this.mesh(new THREE.ExtrudeGeometry(mount,{depth:7,bevelEnabled:false,curveSegments:32}),'rail',this.tool);bracket.position.z=42;
    if(c.architecture==='R75'){
      const height=75*1000/(Math.PI*38**2/4);
      this.cyl(21,height,0,0,c.nozzleLength+18,'white',this.tool);
      this.cyl(23,5,0,0,c.nozzleLength+18+height,'dark',this.tool);
      this.cyl(22,5,0,0,c.nozzleLength+13,'rail',this.tool);
      this.cyl(5,7,0,0,c.nozzleLength+height+23,'rail',this.tool);
      this.piston=this.cyl(21.3,2,0,0,c.nozzleLength+18+height*.75,'structure',this.tool);
      for(const z of [c.nozzleLength+23,c.nozzleLength+55]){const ring=new THREE.Mesh(new THREE.TorusGeometry(21.4,1,6,40),this.materials.dark);ring.position.z=z;this.tool.add(ring);}
    }else{
      this.cyl(13,65,0,0,c.nozzleLength+13,'white',this.tool);this.cyl(16,35,0,0,c.nozzleLength+78,'dark',this.tool);
      this.cyl(15,5,0,0,c.nozzleLength+8,'rail',this.tool);this.cyl(15,5,0,0,c.nozzleLength+73,'rail',this.tool);
      this.box(64,60,12,-235,100,-40,'base');this.cyl(24.25,220,-235,100,-28,'white');this.cyl(27,9,-235,100,192,'dark');
    }
    this.cyl(7,13,0,0,c.nozzleLength,'rail',this.tool);
    // Hollow virtual straight nozzle: bore is exactly the active diameter, length exactly the effective straight length.
    const shape=new THREE.Shape();shape.absarc(0,0,c.diameter/2+.6,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(0,0,c.diameter/2,0,Math.PI*2,true);shape.holes.push(hole);
    const nozzle=new THREE.ExtrudeGeometry(shape,{depth:c.nozzleLength,bevelEnabled:false,curveSegments:32});this.mesh(nozzle,'rail',this.tool);
    this.fixture=this.box(Math.min(c.width+16,300),Math.min(c.depth+16,300),Math.max(0,c.fixtureHeight-2),0,0,Math.min(2,c.fixtureHeight),'dark');
    for(const x of [-1,1])for(const y of [-1,1])this.box(12,12,Math.min(2,c.fixtureHeight),x*Math.min(c.width/2,135),y*Math.min(c.depth/2,135),0,'rail');
    this.partHolder=new THREE.Group();this.machine.add(this.partHolder);
    if(this.imported){this.partHolder.add(this.imported);this.imported.position.set(0,0,c.fixtureHeight);}
    else{this.box(c.width,c.depth,c.thickness,0,0,c.fixtureHeight,'work',this.partHolder);for(const x of [-1,1])this.box(8,18,Math.min(3,c.thickness),x*(c.width/2+4),-c.depth/2+12,c.fixtureHeight,'rail');}
    this.box(70,1,12,75,-180.6,-34,'dark');
    // Millimetre ticks on the exposed front edge of the table.
    for(let x=-140;x<=140;x+=5)this.box(.35,x%25===0?5:2,.1,x,-147,0,'dark');
    this.lineGeo=lineGeometry();this.dotGeo=capGeometry(c.dotRatio);this.depositMeshes=[];
    const count=run.frames[0].deposits.length;
    for(let i=0;i<count;i++){const m=new THREE.Mesh(c.mode==='line'?this.lineGeo:this.dotGeo,this.materials.glue);m.visible=false;this.depositGroup.add(m);this.depositMeshes.push(m);}
    this.run=run;this.update(run.frames[0]);this.fit(this.mode);
  }
  update(s){if(!this.config)return;const c=this.config;this.tool.position.set(s.x,s.y,s.z);this.carriage.position.x=s.x;this.bridge.position.y=s.y;
    if(this.piston)this.piston.position.z=c.nozzleLength+18+75*1000/(Math.PI*38**2/4)*(s.remaining/75)+1;
    for(let i=0;i<this.depositMeshes.length;i++){const v=s.deposits[i],m=this.depositMeshes[i];m.visible=v>1e-12;if(!m.visible)continue;
      if(c.mode==='line'){const d=lineDimensions(v,this.run.cellLength,c.lineRatio);m.scale.set(this.run.cellLength,d.width,v*1000/(this.lineGeo.userData.unitVolume*this.run.cellLength*d.width));m.position.set(c.offsetX-c.lineLength/2+this.run.gridStart+(i+.5)*this.run.cellLength,c.offsetY,c.surfaceZ+.001);}
      else{const d=dotDimensions(v,c.dotRatio),b=d.radius;m.scale.set(b,b,v*1000/(this.dotGeo.userData.unitVolume*b*b));m.position.set(c.offsetX,c.offsetY,c.surfaceZ+.001);}
    }
    if(this.mode==='follow'){const target=new THREE.Vector3(s.x,s.y,c.surfaceZ);this.camera.position.add(target.clone().sub(this.controls.target));this.controls.target.copy(target);}
    this.render();
  }
  resize(){const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h,false);if(this.config)this.fit(this.mode);}
  fit(mode='close'){
    this.mode=mode; if(!this.config)return; const c=this.config,w=this.host.clientWidth,h=this.host.clientHeight,aspect=w/h;
    // Inspection layers hide obstructing supports without changing any physical dimensions.
    for(const child of this.machine.children)child.visible=mode==='whole'||child===this.tool||child===this.partHolder||child===this.fixture;
    for(const child of this.tool.children){child.updateMatrixWorld();const bounds=new THREE.Box3().setFromObject(child);child.visible=mode==='whole'||bounds.min.z-this.tool.position.z<c.nozzleLength+13;}
    let pts=[];let target;
    if(mode==='whole'){const b=new THREE.Box3().setFromObject(this.machine);for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])pts.push(new THREE.Vector3(x,y,z));target=b.getCenter(new THREE.Vector3());}
    else{for(const x of [-c.width/2,c.width/2])for(const y of [-c.depth/2,c.depth/2])for(const z of [c.fixtureHeight,c.surfaceZ+Math.min(25,c.nozzleLength+13)])pts.push(new THREE.Vector3(x,y,z));target=new THREE.Vector3(0,0,c.surfaceZ+5);}
    const direction=this.freeOrbit?this.camera.position.clone().sub(this.controls.target).normalize():this.isoDirection();
    this.controls.target.copy(target);this.camera.position.copy(target).add(direction.multiplyScalar(1200));this.camera.zoom=1;this.camera.lookAt(target);this.camera.updateMatrixWorld();
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
  geometryAudit(){return {parts:this.parts,lineUnitVolume:this.lineGeo.userData.unitVolume,dotUnitVolume:this.dotGeo.userData.unitVolume,renderedDepositVolumeMm3:this.depositMeshes.filter(m=>m.visible).reduce((s,m)=>s+m.geometry.userData.unitVolume*m.scale.x*m.scale.y*m.scale.z,0),cameraDirection:this.camera.position.clone().sub(this.controls.target).normalize().toArray()};}
  screenshot(){this.render();return this.renderer.domElement.toDataURL('image/png');}
}
export {volumeOf,lineGeometry,capGeometry};
