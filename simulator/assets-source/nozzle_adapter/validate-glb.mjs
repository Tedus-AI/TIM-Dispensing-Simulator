import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const bytes=await readFile(new URL('../../public/assets/nozzle-adapter.glb',import.meta.url));
const buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
const asset=await new GLTFLoader().parseAsync(buffer,'');
const wrapper=new THREE.Group();
wrapper.add(asset.scene);
// glTF metres and Y-up -> simulator mm and Z-up.
wrapper.scale.setScalar(1000);
wrapper.rotation.x=Math.PI/2;
wrapper.updateMatrixWorld(true);
const box=new THREE.Box3().setFromObject(wrapper);
const size=box.getSize(new THREE.Vector3());
const near=(actual,expected,tolerance=.015)=>{
  if(Math.abs(actual-expected)>tolerance)throw new Error(`${actual} is not ${expected} ± ${tolerance} mm`);
};
near(box.min.x,-7.25);near(box.max.x,7.25);
near(box.min.y,-8.30565);near(box.max.y,8.30565);
near(box.min.z,0);near(box.max.z,16);
let meshes=0,triangles=0;
wrapper.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;}});
console.log(JSON.stringify({meshes,triangles,minMm:box.min.toArray(),maxMm:box.max.toArray(),sizeMm:size.toArray(),bytes:bytes.length},null,2));
