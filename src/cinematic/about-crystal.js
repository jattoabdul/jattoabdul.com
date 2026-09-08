import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

const clamp=(v)=>Math.max(0,Math.min(1,v));
const smooth=(v)=>{v=clamp(v);return v*v*(3-2*v);};

// A single irregular crystal, with broad facets and an uneven mineral base.
function crystalGeometry(){
  const points=[];
  const rings=[[-1.65,.52,.18],[-1.16,.92,0],[.73,.83,.13],[1.45,.47,.08]];
  for(const [y,r,offset] of rings){for(let i=0;i<7;i++){
    const a=i/7*Math.PI*2+offset;const irregular=1+Math.sin(i*4.7+y)*.13;
    points.push(new THREE.Vector3(Math.cos(a)*r*irregular,y+Math.sin(i*2.8)*.1,Math.sin(a)*r));
  }}
  points.push(new THREE.Vector3(.12,2.12,-.1));
  return new ConvexGeometry(points);
}

export function startAboutCrystal(canvas,root){
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});}catch{return()=>{};}
  root.dataset.crystal='ready';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=()=>innerWidth<768;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,80);camera.position.set(0,0,12.69);
  renderer.localClippingEnabled=true;
  renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.82;
  const pmrem=new THREE.PMREMGenerator(renderer);
  const studio=document.createElement('canvas');studio.width=2048;studio.height=1024;
  const light=studio.getContext('2d');light.fillStyle='#020408';light.fillRect(0,0,2048,1024);
  for(const [x,width,color] of [[210,190,'#efc9a3'],[730,65,'#ffffff'],[1240,260,'#527cab'],[1740,95,'#fff0d9']]){
    const panel=light.createLinearGradient(x,0,x+width,0);panel.addColorStop(0,'#05080d');panel.addColorStop(.45,color);panel.addColorStop(.55,color);panel.addColorStop(1,'#05080d');light.fillStyle=panel;light.fillRect(x,80,width,860);
  }
  const studioTexture=new THREE.CanvasTexture(studio);studioTexture.mapping=THREE.EquirectangularReflectionMapping;studioTexture.colorSpace=THREE.SRGBColorSpace;
  const env=pmrem.fromEquirectangular(studioTexture);scene.environment=env.texture;studioTexture.dispose();pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xb0c6e0,.15));
  const warm=new THREE.DirectionalLight(0xefc9a3,1.8);warm.position.set(-3,6,7);scene.add(warm);
  const blue=new THREE.DirectionalLight(0x6189c0,1.3);blue.position.set(4,2,-2);scene.add(blue);
  const rim=new THREE.DirectionalLight(0xffffff,1.8);rim.position.set(-3,-1,-4);scene.add(rim);
  const sculpture=new THREE.Group();scene.add(sculpture);
  const geometry=crystalGeometry();
  const material=new THREE.MeshPhysicalMaterial({color:0xc5b4a2,roughness:.38,metalness:.32,transmission:.12,thickness:1.3,ior:1.8,envMapIntensity:1.2,clearcoat:1,clearcoatRoughness:.12,flatShading:true});
  const mineral=new THREE.Mesh(geometry,material);sculpture.add(mineral);
  const coreMaterial=new THREE.MeshStandardMaterial({color:0x53718e,metalness:.85,roughness:.16,flatShading:true});
  const floorClip=new THREE.Plane(new THREE.Vector3(0,1,0),0);material.clippingPlanes=[floorClip];coreMaterial.clippingPlanes=[floorClip];
  const core=new THREE.Mesh(geometry,coreMaterial);core.scale.set(.7,.85,.7);core.rotation.y=.58;mineral.add(core);
  const baseGeometry=new THREE.DodecahedronGeometry(.82,0);
  const baseMaterial=new THREE.MeshStandardMaterial({color:0x080c13,roughness:.65,metalness:.7,flatShading:true});
  const base=new THREE.Mesh(baseGeometry,baseMaterial);base.scale.set(1.6,.35,1);base.position.y=-1.65;sculpture.add(base);
  // Soft pool of light anchors the mineral without drawing a literal floor.
  const textureCanvas=document.createElement('canvas');textureCanvas.width=256;textureCanvas.height=256;
  const ctx=textureCanvas.getContext('2d');const grad=ctx.createRadialGradient(128,128,0,128,128,128);
  grad.addColorStop(0,'rgba(239,201,163,.35)');grad.addColorStop(.35,'rgba(80,111,153,.13)');grad.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,256,256);
  const glowTexture=new THREE.CanvasTexture(textureCanvas);const glowMaterial=new THREE.SpriteMaterial({map:glowTexture,transparent:true,depthWrite:false});
  const glow=new THREE.Sprite(glowMaterial);glow.position.set(0,-1.85,-1);glow.scale.set(5,.65,1);sculpture.add(glow);
  let frame=0,dead=false,lost=false,current=null;
  const intro=root.querySelector('.about-crystal-intro');
  const sections=['foundations','finding-direction','first-pages','learning-by-building'].map(id=>root.querySelector('#'+id));
  function target(){
    const h=innerHeight,w=innerWidth;const bounds=intro.getBoundingClientRect();
    if(mobile()){
      const gaps=[intro,...root.querySelectorAll('.about-crystal-mobile-space')];
      let best=null,visibility=0,phase=0;
      gaps.forEach((el,i)=>{const b=el.getBoundingClientRect(),center=b.top+b.height/2;const v=clamp(1-Math.abs(center-h*.53)/(h*.47));if(v>visibility){best=b;visibility=v;phase=i===0?0:(i-1)/2;}});
      return {x:w*.5,y:best?best.top+best.height/2:h*.5,size:mobile()?.62:1,opacity:visibility,phase,emerge:phase};
    }
    const first=sections[0].getBoundingClientRect();const end=sections[3].getBoundingClientRect();
    const enter=smooth((h-bounds.top)/(h*.65));const dock=smooth((h*.7-first.top)/(h*.55));
    let phase=0;
    for(let i=0;i<3;i++){const b=sections[i].getBoundingClientRect();if(b.top<h*.45)phase=Math.max(phase,(i+clamp((h*.45-b.top)/b.height))/3);}
    const exit=1-smooth((h*.85-end.top)/(h*.55));
    const rail=root.querySelector('.about-contents').getBoundingClientRect();
    return {x:w*.5*(1-dock)+(rail.left+rail.width*.5)*dock,y:h*(.51+.22*dock),size:1.28*(1-dock)+.66*dock,opacity:enter*exit,phase,emerge:smooth(phase*2)};
  }
  function paint(){
    frame=0;if(dead||lost||document.hidden)return;
    const goal=target();
    if(!current||reduced.matches)current={...goal};
    let unsettled=false;
    for(const key of Object.keys(goal)){const diff=goal[key]-current[key];if(Math.abs(diff)>.001){current[key]+=diff*.13;unsettled=true;}else current[key]=goal[key];}
    canvas.style.opacity=String(current.opacity);
    canvas.dataset.phase=current.phase.toFixed(2);
    canvas.dataset.motion=reduced.matches?'reduced':'scroll';
    const aspect=innerWidth/innerHeight;
    sculpture.position.set((current.x/innerWidth-.5)*8*aspect,(.5-current.y/innerHeight)*8,0);
    sculpture.scale.setScalar(current.size);
    floorClip.constant=-(sculpture.position.y-1.6*current.size);
    mineral.position.y=-.48*(1-current.emerge);
    mineral.rotation.set(.1,-.65+current.phase*1.5,.09-current.phase*.12);
    material.roughness=.1-current.phase*.07;material.metalness=.15;
    material.transmission=.55+current.phase*.3;material.envMapIntensity=1.35;
    material.color.set(0xbed3e8).lerp(new THREE.Color(0xffe1bb),current.phase);
    coreMaterial.color.set(0x304d70).lerp(new THREE.Color(0x9b754f),current.phase);
    base.material.color.set(0x080c13);glow.material.opacity=.45+current.phase*.55;
    if(current.opacity>.005)renderer.render(scene,camera);
    if(unsettled&&!reduced.matches)frame=requestAnimationFrame(paint);
  }
  function request(){if(!frame&&!dead&&!lost)frame=requestAnimationFrame(paint);}
  function resize(){const a=innerWidth/innerHeight;camera.aspect=a;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);current=null;request();}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else request();}
  function restore(){lost=false;root.dataset.crystal='ready';resize();}
  const observer=new ResizeObserver(request);observer.observe(root);
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',resize);
  reduced.addEventListener('change',request);document.addEventListener('visibilitychange',visibility);
  canvas.addEventListener('webglcontextlost',hide);canvas.addEventListener('webglcontextrestored',restore);
  function hide(event){event.preventDefault();lost=true;root.dataset.crystal='unavailable';canvas.style.opacity='0';cancelAnimationFrame(frame);frame=0;}
  resize();
  return()=>{delete root.dataset.crystal;dead=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',resize);reduced.removeEventListener('change',request);document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',hide);canvas.removeEventListener('webglcontextrestored',restore);geometry.dispose();baseGeometry.dispose();material.dispose();baseMaterial.dispose();coreMaterial.dispose();glowTexture.dispose();glowMaterial.dispose();env.dispose();renderer.dispose();};
}
