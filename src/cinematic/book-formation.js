import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
// An open book: two broad page surfaces, a central valley, and a visible spine.
export function applyBookFormation(texture) {
  const left=new THREE.Shape();
  left.moveTo(-.48,.32);left.lineTo(-.06,.23);left.lineTo(0,.16);
  left.lineTo(0,-.38);left.lineTo(-.08,-.30);left.lineTo(-.48,-.23);left.closePath();
  const right=new THREE.Shape();
  right.moveTo(0,.16);right.lineTo(.06,.23);right.lineTo(.48,.32);
  right.lineTo(.48,-.23);right.lineTo(.08,-.30);right.lineTo(0,-.38);right.closePath();
  const geometry=new THREE.ExtrudeGeometry([left,right],{depth:.07,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:2,steps:1});
  const mesh=new THREE.Mesh(geometry);
  let seed=173;
  const sampler=new MeshSurfaceSampler(mesh).setRandomGenerator(()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296)).build();
  const point=new THREE.Vector3(), {width,height,data}=texture.image;
  for(let y=height/2;y<height;y++) for(let x=0;x<width/2;x++) {
    sampler.sample(point);
    const i=(y*width+x)*4;
    data[i]=.5+point.x*.75;data[i+1]=.5+point.y*.9;
    data[i+2]=.5+(point.z-.035)+Math.abs(point.x)*.22;data[i+3]=1;
  }
  geometry.dispose();mesh.material.dispose();texture.needsUpdate=true;
}
