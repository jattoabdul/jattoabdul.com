import * as THREE from 'three';

// One shared particle field: threshold, portrait surround, rooms, foundation.
// Targets are deterministic so revisiting a chapter never changes its composition.
export function createPersonalScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
  camera.position.z = 11;
  const count = 10500;
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,-.5,0,.5,.5,0,-.5,.5,0],3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,1,1,0,0,1,1,0,1],2));
  // A small texture atlas keeps all semantic marks in a single draw call.
  const atlas=document.createElement('canvas');atlas.width=512;atlas.height=128;
  const ctx=atlas.getContext('2d');ctx.strokeStyle='#fff';ctx.fillStyle='#fff';ctx.lineWidth=6;ctx.lineCap='round';ctx.lineJoin='round';
  ctx.font='500 54px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('</>',64,66);
  ctx.font='500 96px Georgia';ctx.fillText('“',192,86);
  for(let i=0;i<5;i++){const x=278+i*20,h=[15,30,47,30,15][i];ctx.beginPath();ctx.moveTo(x,64-h);ctx.lineTo(x,64+h);ctx.stroke();}
  ctx.beginPath();ctx.arc(414,64,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(478,64,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(430,64);ctx.lineTo(462,64);ctx.stroke();
  const atlasTexture=new THREE.CanvasTexture(atlas);
  const data = {door:[], halo:[], rooms:[], base:[], seed:[], tint:[]};
  let seed=917;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const palette = ['#efc9a3','#792a3d','#b36b7e','#1b3358','#5c769d','#f4ede4'].map(c=>new THREE.Color(c));
  function frame(t,w,h) {
    // Open threshold, with a subtle sill rather than a heavy bottom bar.
    if(t<.36)return [-w/2,-h/2+t/.36*h];
    if(t<.64)return [-w/2+(t-.36)/.28*w,h/2];
    return [w/2,h/2-(t-.64)/.36*h];
  }
  for(let i=0;i<count;i++) {
    const r=random(), u=random(), v=random(), leaf=i>count*.58;
    let x,y;
    if(leaf){x=(u-.5)*2.05;y=(v-.5)*4.5;}
    else {[x,y]=frame(u,2.2,4.65);x+=(v-.5)*.13;y+=(random()-.5)*.08;}
    data.door.push(x,y,(random()-.5)*.12);
    const angle=u*Math.PI*2;
    const radius=1.55+v*.6;
    data.halo.push(Math.cos(angle)*radius, Math.sin(angle)*radius*1.35-.15,(random()-.5)*1.4);
    const room=i%4;
    const [rx,ry]=frame(u,.76,1.65);
    data.rooms.push(rx+(room-1.5)*1.03+(random()-.5)*.06,ry+Math.sin(room*.9)*.3,(room%2)*.22);
    data.base.push((u-.5)*5,(v-.5)*.055-1.5,(random()-.5)*.16);
    data.seed.push(r,u,v,leaf?1:0);
    const color=palette[leaf?(r<.6?1:r<.85?2:3):(r<.52?0:r<.72?5:r<.86?2:4)];
    data.tint.push(color.r,color.g,color.b);
  }
  for(const [key,values] of Object.entries(data))geometry.setAttribute(key,new THREE.InstancedBufferAttribute(new Float32Array(values),key==='seed'?4:3));
  geometry.instanceCount=count;
  const uniforms={marks:{value:atlasTexture},time:{value:0},chapter:{value:0},reveal:{value:0},mobile:{value:0},center:{value:2.5},pointer:{value:new THREE.Vector2()},still:{value:0}};
  const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:`
      attribute vec3 door,halo,rooms,base,tint; attribute vec4 seed;
      uniform float time,chapter,reveal,mobile,center,still; uniform vec2 pointer;
      varying vec3 vColor; varying float vAlpha; varying vec2 vUv; varying float vTile; varying float vGlyph;
      float ramp(float a,float b,float p){return smoothstep(a,b,p);}
      void main(){
        float p=chapter;
        float opening=ramp(.08,.83,p)*1.65;
        vec3 d=door;
        if(seed.w>.5){float x=d.x+1.06;d.x=-1.06+x*cos(opening);d.z=-x*sin(opening);}
        vec3 target=mix(d,halo,ramp(.85,1.45,p));
        target=mix(target,rooms,ramp(1.88,2.32,p));
        target=mix(target,base,ramp(2.75,3.15,p));
        vec3 last=door;
        if(seed.w>.5){float x=last.x+1.06;last.x=-1.06+x*cos(1.65);last.z=-x*sin(1.65);}
        target=mix(target,last,ramp(3.7,4.05,p));
        float drift=(1.-still)*(.015+ramp(.85,1.45,p)*.035)*(1.-ramp(3.,3.6,p));
        target+=vec3(sin(time*.45+seed.x*60.),cos(time*.36+seed.y*50.),sin(time*.3+seed.z*30.))*drift;
        target.x-=.28*ramp(1.88,2.32,p)*(1.-ramp(2.75,3.15,p));
        target*=mix(1.,.69,mobile);
        target.xy+=vec2(center,mix(0.,-2.,mobile));
        target.xy+=pointer*.025*(1.-still);
        target+=normalize(vec3(seed.xy-.5,seed.z+.1))*pow(1.-reveal,2.)*4.;
        float glyph=step(.955,seed.z);float size=mix(mix(.009,.022,seed.x),mix(.09,.19,seed.x),glyph)*mix(1.,.8,mobile);vUv=uv;vTile=floor(seed.y*4.);vGlyph=glyph;
        float a=time*.25+seed.x*30.;
        vec2 local=mat2(cos(a),-sin(a),sin(a),cos(a))*position.xy*size;
        target.xy+=local;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(target,1.);
        vColor=tint;
        float portrait=ramp(.9,1.35,p)*(1.-ramp(1.9,2.3,p));
        vAlpha=reveal*mix(.7,.35,seed.w)*mix(1.,.5,portrait);
      }`,
    fragmentShader:`uniform sampler2D marks;varying vec3 vColor;varying float vAlpha;varying vec2 vUv;varying float vTile;varying float vGlyph;void main(){float ink=texture2D(marks,vec2((vUv.x+vTile)/4.,vUv.y)).a;float dot=1.-smoothstep(.2,.5,length(vUv-.5));float alpha=mix(dot,ink,vGlyph)*vAlpha;if(alpha<.01)discard;gl_FragColor=vec4(vColor*1.35,alpha);}`
  });
  const mesh=new THREE.Mesh(geometry,material);mesh.frustumCulled=false;scene.add(mesh);
  let width=0,height=0;
  return {
    update(t,p,reveal,reduced,pointer={x:0,y:0}) {
      if(width!==innerWidth||height!==innerHeight){width=innerWidth;height=innerHeight;renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();uniforms.mobile.value=width<768?1:0;uniforms.center.value=width<768?0:Math.tan(THREE.MathUtils.degToRad(20))*11*camera.aspect*.46;}
      uniforms.time.value=reduced?0:t;uniforms.chapter.value=p;uniforms.reveal.value=reveal;uniforms.still.value=reduced?1:0;uniforms.pointer.value.set(pointer.x,pointer.y);renderer.render(scene,camera);
    },
    dispose(){geometry.dispose();material.dispose();atlasTexture.dispose();renderer.dispose();}
  };
}
