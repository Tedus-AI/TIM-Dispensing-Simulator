import {BoxGeometry} from 'three';
import {writeFileSync} from 'node:fs';
const g=new BoxGeometry(100,50,5).toNonIndexed(),p=g.attributes.position,n=g.attributes.normal;
let stl='solid calibration_100_50_5\n';
for(let i=0;i<p.count;i+=3){stl+=`facet normal ${n.getX(i)} ${n.getY(i)} ${n.getZ(i)}\n outer loop\n`;for(let j=0;j<3;j++)stl+=` vertex ${p.getX(i+j)} ${p.getY(i+j)} ${p.getZ(i+j)}\n`;stl+=' endloop\nendfacet\n';}stl+='endsolid calibration_100_50_5\n';
writeFileSync(new URL('./fixtures/calibration_100x50x5_mm.stl',import.meta.url),stl);
// glTF uses metres, Y up. Project +90deg X conversion produces 100 x 50 x 5 mm.
const gl=new BoxGeometry(.1,.005,.05).toNonIndexed(),values=gl.attributes.position.array,bin=Buffer.from(values.buffer);
const js={asset:{version:'2.0'},scene:0,scenes:[{nodes:[0]}],nodes:[{mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0}}]}],buffers:[{byteLength:bin.length}],bufferViews:[{buffer:0,byteLength:bin.length}],accessors:[{bufferView:0,componentType:5126,count:gl.attributes.position.count,type:'VEC3',min:[-.05,-.0025,-.025],max:[.05,.0025,.025]}]};
let j=Buffer.from(JSON.stringify(js));j=Buffer.concat([j,Buffer.alloc((4-j.length%4)%4,32)]);const data=Buffer.alloc(12+8+j.length+8+bin.length);data.writeUInt32LE(0x46546c67,0);data.writeUInt32LE(2,4);data.writeUInt32LE(data.length,8);data.writeUInt32LE(j.length,12);data.writeUInt32LE(0x4e4f534a,16);j.copy(data,20);data.writeUInt32LE(bin.length,20+j.length);data.writeUInt32LE(0x004e4942,24+j.length);bin.copy(data,28+j.length);
writeFileSync(new URL('./fixtures/calibration_100x50x5_m.glb',import.meta.url),data);
console.log('Created two synthetic calibration workpieces, not customer CAD.');
