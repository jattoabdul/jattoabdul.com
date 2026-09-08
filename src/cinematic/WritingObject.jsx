'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { applyBookFormation } from './book-formation';
import { createHandsFormation } from './hands-formation';
export function WritingObject({kind='particles'}) {
  const wrap=useRef(null), canvas=useRef(null);
  useEffect(()=>{
    const host=wrap.current; let renderer;
    try {renderer=new THREE.WebGLRenderer({canvas:canvas.current,alpha:true,antialias:true});}catch{return;}
    const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.z=7;
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
    const group=new THREE.Group();scene.add(group);
    const resources=[];const materials=[];let mesh; const targets=[]; const particlePose=new THREE.Object3D(); const started=performance.now(); const canvasElement=canvas.current;
    if(kind==='particles'||kind==='hands'||kind==='assembly'){
      const tex=kind==='hands'?createHandsFormation():new THREE.DataTexture(new Float32Array(64*64*4),64,64,THREE.RGBAFormat,THREE.FloatType);if(kind==='assembly'){let seed=79;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);for(let i=0;i<4096;i++){const block=i%3;const v=[(rand()-.5)*.25,(rand()-.5)*.25,(rand()-.5)*.25];v[Math.floor(rand()*3)]=(rand()>.5?1:-1)*.125;tex.image.data.set([.5+v[0]+(block-1)*.17,.5+v[1]+(block-1)*.14,.5+v[2],1],i*4)}tex.needsUpdate=true}else if(kind!=='hands')applyBookFormation(tex);
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([-.5,-.35,0,.5,-.35,0,0,.6,0],3));geo.computeVertexNormals();resources.push(geo,tex);
      const mat=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,roughness:.6,metalness:.3});materials.push(mat);
      const count=kind==='assembly'?2048:1024;
      mesh=new THREE.InstancedMesh(geo,mat,count);group.add(mesh);
      const dummy=new THREE.Object3D(), colors=['#EFC9A3','#792A3D','#5279a8','#f4eee6'];let i=0;
      for(let sample=0;sample<count;sample++) {const p=kind==='hands'?((sample*9)%10000)*4:kind==='assembly'?sample*8:((32+Math.floor(sample/32))*64+sample%32)*4;targets.push(new THREE.Vector3((tex.image.data[p]-.5)*(kind==='hands'||kind==='assembly'?4.3:6),(tex.image.data[p+1]-.5)*(kind==='hands'||kind==='assembly'?4.3:6),(tex.image.data[p+2]-.5)*4));dummy.position.copy(targets[i]);dummy.rotation.set(i*.9,i*.3,i*2.1);dummy.scale.setScalar(.024+(i%11)*.003);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,new THREE.Color(colors[i%4]));i++;}
    }else{
      const loader=new THREE.TextureLoader();const texture=loader.load('/assets/personal/present-without-performing-cover.svg',()=>draw());texture.colorSpace=THREE.SRGBColorSpace;resources.push(texture);
      const coverMat=new THREE.MeshStandardMaterial({map:texture,roughness:.72});const cloth=new THREE.MeshStandardMaterial({color:'#792A3D',roughness:.86});const paper=new THREE.MeshStandardMaterial({color:'#eadbc5',roughness:1});materials.push(coverMat,cloth,paper);
      const slab=(w,h,d,z,mat)=>{const g=new THREE.BoxGeometry(w,h,d);resources.push(g);const m=new THREE.Mesh(g,mat);m.position.z=z;group.add(m);return m;};
      slab(2.28,3.3,.07,.26,[cloth,cloth,cloth,cloth,coverMat,cloth]);slab(2.28,3.3,.07,-.26,cloth);slab(2.2,3.2,.47,0,paper);
      const spine=slab(.1,3.3,.58,0,cloth);spine.position.x=-1.1;
      for(let i=0;i<28;i++){const g=new THREE.BoxGeometry(2.19,.004,.002);resources.push(g);const line=new THREE.Mesh(g,cloth);line.position.set(0,-1.585,i*.016-.22);group.add(line);}
    }
    scene.add(new THREE.AmbientLight('#ffffff',1.7));const warm=new THREE.DirectionalLight('#efc9a3',3);warm.position.set(-3,4,5);scene.add(warm);const blue=new THREE.DirectionalLight('#6e91ca',2);blue.position.set(3,1,2);scene.add(blue);
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');let raf=0,visible=false,dead=false;let current=0;
    function draw(){if(dead)return;const r=host.getBoundingClientRect();const target=reduced.matches ? .5 : Math.max(0,Math.min(1,1-r.top/innerHeight));current+=(target-current)*.09;group.rotation.y=(kind==='particles'||kind==='hands'||kind==='assembly')?-.25+current*.7:-.55+current*.65;group.rotation.z=(kind==='particles'||kind==='hands'||kind==='assembly')?-.12: .05;group.scale.setScalar(kind==='assembly'?1.12:1);group.position.y=(kind==='particles'||kind==='hands'||kind==='assembly')?.05:.02;if(mesh){const entrance=reduced.matches?1:Math.min(1,(performance.now()-started)/1500);const scatter=reduced.matches?0:Math.max(0,Math.min(1,-r.top/innerHeight-.12));const amount=(1-Math.pow(entrance,.4))+scatter;for(let i=0;i<targets.length;i++){particlePose.position.copy(targets[i]);particlePose.position.x+=Math.sin(i*7.1)*amount*3;particlePose.position.y+=Math.cos(i*3.7)*amount*2;particlePose.position.z+=Math.sin(i*2.1)*amount*2;particlePose.rotation.set(i*.9,i*.3,i*2.1+amount);particlePose.scale.setScalar(.037+(i%11)*.004);particlePose.updateMatrix();mesh.setMatrixAt(i,particlePose.matrix)}mesh.instanceMatrix.needsUpdate=true;}warm.position.x=-3+current*3;renderer.render(scene,camera);host.dataset.ready='true';}
    function tick(){raf=0;if(!visible||dead||document.hidden)return;draw();if(!reduced.matches)raf=requestAnimationFrame(tick);}
    function resize(){const r=host.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();draw();}
    const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf)tick();else if(!visible){cancelAnimationFrame(raf);raf=0;}});observer.observe(host);const ro=new ResizeObserver(resize);ro.observe(host);
    const resume=()=>{cancelAnimationFrame(raf);raf=0;if(visible)tick();};document.addEventListener('visibilitychange',resume);reduced.addEventListener('change',resume);
    const lost=e=>{e.preventDefault();dead=true;delete host.dataset.ready;cancelAnimationFrame(raf);};canvas.current.addEventListener('webglcontextlost',lost);resize();
    return()=>{dead=true;cancelAnimationFrame(raf);observer.disconnect();ro.disconnect();document.removeEventListener('visibilitychange',resume);reduced.removeEventListener('change',resume);canvasElement.removeEventListener('webglcontextlost',lost);resources.forEach(r=>r.dispose());materials.forEach(m=>m.dispose());renderer.dispose();};
  },[kind]);
  return <div className={'w-object w-object-'+kind} ref={wrap} aria-hidden="true"><img className="w-object-fallback" src={(kind==='particles'||kind==='hands'||kind==='assembly')?'/assets/personal/about-first-pages.webp':'/assets/personal/present-without-performing-cover.svg'} alt=""/><canvas ref={canvas}/></div>;
}
