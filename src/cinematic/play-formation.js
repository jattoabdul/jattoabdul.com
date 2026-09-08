import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
// A single substantial play symbol, built from the same triangular particle mesh.
export function applyPlayFormation(texture) {
  const shape=new THREE.Shape();
  shape.moveTo(-.33,.43);shape.lineTo(.43,0);shape.lineTo(-.33,-.43);shape.closePath();
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:true,bevelSize:.035,bevelThickness:.025,bevelSegments:4,steps:1});
  const mesh=new THREE.Mesh(geometry);
  let seed=937;
  const sampler=new MeshSurfaceSampler(mesh).setRandomGenerator(()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296)).build();
  const point=new THREE.Vector3(),{width,height,data}=texture.image;
  for(let y=height/2;y<height;y++)for(let x=width/2;x<width;x++){
    sampler.sample(point);const i=(y*width+x)*4;
    data[i]=.5+point.x*.85;data[i+1]=.5+point.y*.85;data[i+2]=.5+point.z-.08;data[i+3]=1;
  }
  geometry.dispose();mesh.material.dispose();texture.needsUpdate=true;
}
