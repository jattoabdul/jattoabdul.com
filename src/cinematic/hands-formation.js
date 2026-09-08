import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

// Two mirrored open palms. Rounded fingertips, separated digits and a cupped
// surface give this story gesture depth without requiring a new brand mark.
export function createHandsFormation() {
  const hand=new THREE.Shape();
  hand.moveTo(-.20,-.43);hand.lineTo(.10,-.43);
  hand.bezierCurveTo(.13,-.28,.20,-.20,.25,-.11);
  hand.lineTo(.37,.06);hand.bezierCurveTo(.41,.12,.36,.18,.31,.14);
  hand.lineTo(.17,-.01);hand.quadraticCurveTo(.13,-.03,.13,.03);
  hand.lineTo(.15,.36);hand.bezierCurveTo(.16,.45,.07,.47,.06,.38);
  hand.lineTo(.035,.15);hand.lineTo(.015,.49);
  hand.bezierCurveTo(.01,.58,-.08,.58,-.085,.49);hand.lineTo(-.095,.16);
  hand.lineTo(-.125,.45);hand.bezierCurveTo(-.135,.53,-.22,.52,-.215,.43);
  hand.lineTo(-.20,.13);hand.lineTo(-.25,.32);
  hand.bezierCurveTo(-.275,.39,-.35,.36,-.33,.29);
  hand.lineTo(-.28,-.03);hand.bezierCurveTo(-.28,-.19,-.22,-.28,-.20,-.43);hand.closePath();
  const geometry=new THREE.ExtrudeGeometry(hand,{depth:.07,bevelEnabled:true,bevelSize:.014,bevelThickness:.018,bevelSegments:3,curveSegments:18,steps:1});
  const mesh=new THREE.Mesh(geometry);let seed=619;
  const sampler=new MeshSurfaceSampler(mesh).setRandomGenerator(()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296)).build();
  const data=new Float32Array(100*100*4),point=new THREE.Vector3();
  const angle=.35,c=Math.cos(angle),s=Math.sin(angle);
  for(let i=0;i<10000;i++){
    sampler.sample(point);
    const side=i%2===0?1:-1;
    const x=(point.x*c-point.y*s-.53)*side;
    const y=point.x*s+point.y*c;
    const z=point.z-.035+.20*(point.x*point.x+point.y*point.y);
    data.set([.5+x*.59,.5+y*.59,.5+z,1],i*4);
  }
  geometry.dispose();mesh.material.dispose();
  const texture=new THREE.DataTexture(data,100,100,THREE.RGBAFormat,THREE.FloatType);
  texture.minFilter=texture.magFilter=THREE.NearestFilter;texture.needsUpdate=true;
  return texture;
}
