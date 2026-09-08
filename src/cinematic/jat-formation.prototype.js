// Study: can a sculptural JATTO carry the existing Dala particle choreography?
// ?formation=brain retains the untouched source atlas for comparison.
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

export function applyJatFormation(texture, word = 'jatto') {
  const j = new THREE.Shape();
  j.moveTo(-.49,.45); j.lineTo(-.08,.45); j.lineTo(-.08,-.19);
  j.bezierCurveTo(-.08,-.49,-.53,-.50,-.53,-.19);
  j.lineTo(-.38,-.19); j.bezierCurveTo(-.38,-.32,-.24,-.32,-.24,-.19);
  j.lineTo(-.24,.29); j.lineTo(-.49,.29); j.closePath();
  const a = new THREE.Shape();
  a.moveTo(-.04,-.43); a.lineTo(.23,.45); a.lineTo(.39,.45);
  a.lineTo(.66,-.43); a.lineTo(.49,-.43); a.lineTo(.43,-.22);
  a.lineTo(.18,-.22); a.lineTo(.12,-.43); a.closePath();
  const hole = new THREE.Path();
  hole.moveTo(.225,-.065); hole.lineTo(.39,-.065); hole.lineTo(.307,.23); hole.closePath();
  a.holes.push(hole);
  const t = new THREE.Shape();
  t.moveTo(.66,.45); t.lineTo(1.18,.45); t.lineTo(1.18,.28);
  t.lineTo(1.01,.28); t.lineTo(1.01,-.43); t.lineTo(.83,-.43);
  t.lineTo(.83,.28); t.lineTo(.66,.28); t.closePath();
  const secondT = new THREE.Shape();
  secondT.moveTo(1.23,.45); secondT.lineTo(1.75,.45); secondT.lineTo(1.75,.28);
  secondT.lineTo(1.58,.28); secondT.lineTo(1.58,-.43); secondT.lineTo(1.40,-.43);
  secondT.lineTo(1.40,.28); secondT.lineTo(1.23,.28); secondT.closePath();
  const o = new THREE.Shape();
  o.absellipse(2.15,.01,.30,.44,0,Math.PI*2,false);
  const innerO = new THREE.Path();
  innerO.absellipse(2.15,.01,.135,.275,0,Math.PI*2,true);
  o.holes.push(innerO);
  const fullName = word === 'jatto';
  const geometry = new THREE.ExtrudeGeometry(fullName ? [j,a,t,secondT,o] : [j,a,t], {
    depth:.20, bevelEnabled:true, bevelThickness:.035, bevelSize:.025,
    bevelSegments:4, steps:1, curveSegments:32,
  });
  geometry.translate(fullName ? -.96 : -.325,0,-.10);
  const mesh = new THREE.Mesh(geometry);
  let seed = 711175;
  const random = () => ((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  const sampler = new MeshSurfaceSampler(mesh).setRandomGenerator(random).build();
  const point = new THREE.Vector3();
  const {width,height,data} = texture.image;
  for(let y=0;y<height/2;y++) for(let x=0;x<width/2;x++) {
    sampler.sample(point);
    // Keep the atlas's [0,1] coordinate convention and other three targets intact.
    const i=(y*width+x)*4;
    data[i]=.5+point.x*(fullName ? .23 : .35);
    data[i+1]=.5+point.y*(fullName ? .644 : .70);
    data[i+2]=.5+point.z;
    data[i+3]=1;
  }
  geometry.dispose(); mesh.material.dispose();
  texture.needsUpdate=true;
}
