import * as THREE from "three";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { pose, clamp } from "./timeline.js";
import { personalPose } from "./personal-timeline.js";
import { createHandsFormation } from "./hands-formation.js";
import { applyPlayFormation } from "./play-formation.js";
import { applyBookFormation } from "./book-formation.js";
import { applyJatFormation } from "./jat-formation.prototype.js";
import { DepthOfFieldPass } from "./depth-of-field.js";

const atlasFunctions = `
vec3 atlas(sampler2D tex, vec2 uv, float phase) {
 vec3 a=texture2D(tex,uv*.5).rgb;
 vec3 b=texture2D(tex,uv*.5+vec2(.5,0.)).rgb;
 vec3 c=texture2D(tex,uv*.5+vec2(0.,.5)).rgb;
 vec3 d=texture2D(tex,uv*.5+vec2(.5,.5)).rgb;
 return mix(mix(mix(a,b,clamp(phase,0.,1.)),c,clamp(phase-1.,0.,1.)),d,clamp(phase-2.,0.,1.));
}
`;
const targetFunctions = `
uniform sampler2D atlasPosition, handsPosition;
uniform sampler2D parameters;
uniform float morph, explode, factor, reveal, initialized;
${atlasFunctions}
vec3 target(vec2 uv) {
 vec4 param=texture2D(parameters,uv);
 vec3 original=texture2D(atlasPosition,uv*.5).rgb;
 float wave=clamp(reveal*1.5-(1.-original.y)*.5,0.,1.);
 float radius=factor+(1.-smoothstep(0.,1.,wave))*(param.x-.5)*6.;
 float phase=floor(morph)+smoothstep(0.,1.,clamp(fract(morph)*2.-param.y,0.,1.));
 if(morph>=4.)phase=4.;
 vec3 destination=mix(atlas(atlasPosition,uv,phase),texture2D(handsPosition,uv).rgb,clamp(phase-3.,0.,1.));
 vec3 p=(destination-.5)*2.*radius;
 float burst=smoothstep(0.,1.,clamp(explode*2.5-(1.-original.y)*1.5,0.,1.));
 return p*mix(1.,1.+param.z*5.,burst);
}
`;

// Recolour the source atlas by colour family while retaining its shading.
const brandColors = `
vec3 brandColor(vec3 c) {
 float hi=max(c.r,max(c.g,c.b)), lo=min(c.r,min(c.g,c.b));
 float saturation=(hi-lo)/max(hi,.001);
 if(saturation<.15) return c;
 vec3 tint;
 if(c.b>c.g && c.r>c.g) tint=vec3(.47451,.16471,.23922);
 else if(c.r>c.b && c.g>c.b && c.r>=c.g) tint=vec3(.93725,.78824,.63922);
 else tint=vec3(.10588,.2,.34510);
 return mix(vec3(hi),tint*hi,smoothstep(.15,.5,saturation));
}
`;

const renderVertex = `
${brandColors}
uniform sampler2D simulation, atlasColor, atlasScale;
uniform float morph, time, reveal, particleScale, explode, mobileRotation;
uniform vec2 mouse, offset;
attribute vec2 lookup;
attribute vec3 randoms;
varying vec3 vColor;
varying float vAlpha;
${atlasFunctions}
mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
mat3 rotZ(float a){float c=cos(a),s=sin(a);return mat3(c,s,0.,-s,c,0.,0.,0.,1.);}
void main(){
 vec3 center=texture2D(simulation,lookup).xyz;
 vec4 viewCenter=modelViewMatrix*vec4(center,1.);
 float proximity=1.-smoothstep(0.,1.6,distance(viewCenter.xy,mouse));

 float s=atlas(atlasScale,lookup,morph).r*particleScale+proximity*.75*(1.-explode);
 float angle=-time-sin(center.x*1.7+center.y*.8+center.z*1.3);
 vec3 axis=normalize(vec3(0.,1.,1.));
 vec3 local=(position*cos(angle)+cross(axis,position)*sin(angle)+axis*dot(axis,position)*(1.-cos(angle)))*s*.1;
 vec4 mv=modelViewMatrix*vec4(center+local,1.);
 if(mobileRotation>.5){mv=viewCenter;vec2 shape=vec2(position.x,-position.z);mv.xy+=mat2(.92,-.39,.39,.92)*shape*s*.085;}
 mv.xy+=vec2(sin(time*randoms.y),cos(time*randoms.y))*proximity*randoms.z*.35*(1.-explode);
 gl_Position=projectionMatrix*mv;
 vColor=mix(brandColor(atlas(atlasColor,lookup,morph)),vec3(.45),proximity*(1.-explode))*1.3;
 vAlpha=smoothstep(-4.5,4.,mv.z+10.)*smoothstep(0.,.45,reveal);
}
`;

export async function createParticles(canvas, progress, signal, { formation = "brain", personalStory = false } = {}) {
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_, loaded, total) => progress(loaded / total);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000);
  const textures = new THREE.TextureLoader(manager);
  const [positions, colors, scales, gltf, noise, sprite] = await Promise.all([
    new EXRLoader(manager)
      .setDataType(THREE.FloatType)
      .loadAsync("/assets/images/pos-33.exr"),
    textures.loadAsync(personalStory ? "/assets/images/cd-33.webp" : "/assets/images/cd-33.png"),
    textures.loadAsync(personalStory ? "/assets/images/sc-33.webp" : "/assets/images/sc-33.png"),
    new GLTFLoader(manager).loadAsync(
      innerWidth < 768
        ? "/assets/models/py-monbile.glb"
        : "/assets/models/py-lod7.glb",
    ),
    personalStory ? Promise.resolve(new THREE.DataTexture(new Uint8Array([64,64,64,255]),1,1)) : textures.loadAsync("/assets/images/noise.jpg"),
    textures.loadAsync(personalStory ? "/assets/images/dof-2k-10.webp" : "/assets/images/dof-2k-10.jpg"),
  ]);
  if (signal.aborted) {
    renderer.dispose();
    [positions, colors, scales, noise].forEach((t) => t.dispose());
    return null;
  }
  // Current EXRLoader returns bottom-up rows; the archived atlas uses top-down
  // indexing. Typed-array texture uploads do not apply UNPACK_FLIP_Y_WEBGL.
  const rowSize = positions.image.width * 4,
    height = positions.image.height;
  const pixels = positions.image.data;
  for (let y = 0; y < height / 2; y++) {
    const a = y * rowSize,
      b = (height - 1 - y) * rowSize;
    for (let x = 0; x < rowSize; x++) {
      const v = pixels[a + x];
      pixels[a + x] = pixels[b + x];
      pixels[b + x] = v;
    }
  }
  if (formation === "jat" || formation === "jatto") applyJatFormation(positions, formation);
  if (personalStory) { applyBookFormation(positions); applyPlayFormation(positions); }
  positions.flipY = false;
  colors.flipY = false;
  scales.flipY = false;
  [positions, colors, scales].forEach((t) => {
    t.minFilter = t.magFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
  });
  noise.wrapS = noise.wrapT = THREE.RepeatWrapping;noise.needsUpdate=true;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    innerWidth / innerHeight,
    0.1,
    60,
  );
  camera.position.z = 10;
  const mobile = () => innerWidth < 768;
  const gpu = new GPUComputationRenderer(100, 100, renderer);
  const param = gpu.createTexture(),
    initial = gpu.createTexture();
  let seed = 1307;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < param.image.data.length; i++)
    param.image.data[i] = rand();
  param.needsUpdate = true;
  const positionVar = gpu.addVariable(
    "texturePosition",
    `${targetFunctions}
    void main(){vec2 uv=gl_FragCoord.xy/resolution.xy;vec3 p=texture2D(texturePosition,uv).xyz;vec3 v=texture2D(textureVelocity,uv).xyz;gl_FragColor=vec4(initialized<.5?target(uv):p+v,1.);}`,
    initial,
  );
  const velocityVar = gpu.addVariable(
    "textureVelocity",
    `${targetFunctions}
    void main(){vec2 uv=gl_FragCoord.xy/resolution.xy;vec3 p=texture2D(texturePosition,uv).xyz;vec3 v=texture2D(textureVelocity,uv).xyz;
    gl_FragColor=vec4(initialized<.5?vec3(0.):(v+(target(uv)-p)*.012)*.88,1.);}`,
    gpu.createTexture(),
  );
  const handsPosition=createHandsFormation();
  const uniforms = {
    handsPosition: { value: handsPosition },
    atlasPosition: { value: positions },
    parameters: { value: param },
    morph: { value: 0 },
    explode: { value: 0 },
    factor: { value: mobile() ? 2.5 : 4.35 },
    reveal: { value: 0 },
    initialized: { value: 0 },
  };
  Object.assign(positionVar.material.uniforms, uniforms);
  Object.assign(velocityVar.material.uniforms, uniforms);
  gpu.setVariableDependencies(positionVar, [positionVar, velocityVar]);
  gpu.setVariableDependencies(velocityVar, [positionVar, velocityVar]);
  const problem = gpu.init();
  if (problem) throw new Error(problem);
  gpu.compute();
  uniforms.initialized.value = 1;
  let meshSource;
  gltf.scene.traverse((o) => {
    if (o.isMesh && !meshSource) meshSource = o;
  });
  const geometry = new THREE.InstancedBufferGeometry().copy(
    meshSource.geometry,
  );
  geometry.instanceCount = mobile() ? 7000 : 10000;
  const uv = new Float32Array(20000),
    randoms = new Float32Array(30000);
  for (let i = 0; i < 10000; i++) {
    uv[i * 2] = ((i % 100) + 0.5) / 100;
    uv[i * 2 + 1] = (Math.floor(i / 100) + 0.5) / 100;
    randoms.set([rand(), rand(), rand()], i * 3);
  }
  geometry.setAttribute("lookup", new THREE.InstancedBufferAttribute(uv, 2));
  geometry.setAttribute(
    "randoms",
    new THREE.InstancedBufferAttribute(randoms, 3),
  );
  const material = new THREE.ShaderMaterial({
    uniforms: {
      simulation: { value: null },
      atlasColor: { value: colors },
      atlasScale: { value: scales },
      morph: uniforms.morph,
      reveal: uniforms.reveal,
      explode: uniforms.explode,
      time: { value: 0 },
      particleScale: { value: mobile() ? 1.0 : 1.55 },
      mobileRotation: { value: mobile() ? 1 : 0 },
      mouse: { value: new THREE.Vector2() },
      offset: { value: new THREE.Vector2() },
    },
    vertexShader: renderVertex,
    fragmentShader:
      "varying vec3 vColor; varying float vAlpha; void main(){gl_FragColor=vec4(vColor,vAlpha);}",
    transparent: true,
    depthWrite: true,
    side: mobile() ? THREE.DoubleSide : THREE.FrontSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  const group = new THREE.Group();
  group.add(mesh);
  group.position.y = -1.19;
  scene.add(group);
  // Separate larger foreground particles preserve depth while the 10k field morphs.
  const ambientGeometry = new THREE.InstancedBufferGeometry().copy(
    new THREE.PlaneGeometry(1, 1),
  );
  ambientGeometry.instanceCount = 120;
  const ambientData = new Float32Array(120 * 4),
    ambientTile = new Float32Array(120 * 2);
  for (let i = 0; i < 120; i++) {
    ambientData.set(
      [
        (rand() - 0.5) * 24,
        (rand() - 0.5) * 16,
        rand() * 8 - 5,
        0.15 + rand() * 0.65,
      ],
      i * 4,
    );
    ambientTile.set([Math.floor(rand() * 8), Math.floor(rand() * 8)], i * 2);
  }
  ambientGeometry.setAttribute(
    "placement",
    new THREE.InstancedBufferAttribute(ambientData, 4),
  );
  ambientGeometry.setAttribute(
    "tile",
    new THREE.InstancedBufferAttribute(ambientTile, 2),
  );
  const ambientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      sheet: { value: sprite },
      time: { value: 0 },
      size: { value: 1 },
    },
    transparent: true,
    depthWrite: false,
    vertexShader: `attribute vec4 placement;attribute vec2 tile;uniform float time,size;varying vec2 vUv;varying float alpha;void main(){vec3 p=placement.xyz;p.xy+=vec2(sin(time*.07+p.x),cos(time*.08+p.y))*.2;vec4 view=modelViewMatrix*vec4(p,1.);view.xy+=position.xy*placement.w*size;gl_Position=projectionMatrix*view;vUv=(uv+tile)/8.;alpha=.13+placement.w*.12;}`,
    fragmentShader: `${brandColors}
uniform sampler2D sheet;varying vec2 vUv;varying float alpha;void main(){vec3 c=brandColor(texture2D(sheet,vUv).rgb);gl_FragColor=vec4(c,alpha*min(1.,max(max(c.r,c.g),c.b)*3.));}`,
  });
  const ambient = new THREE.Mesh(ambientGeometry, ambientMaterial);
  ambient.frustumCulled = false;
  scene.add(ambient);
  const investorMeshes = [...document.querySelectorAll("[dom2webgl]")].map(
    (el) => {
      const m = new THREE.Mesh(
        meshSource.geometry,
        new THREE.MeshBasicMaterial({
          color: Number(el.getAttribute("material-color")),
        }),
      );
      scene.add(m);
      return { el, mesh: m };
    },
  );
  const renderTarget = new THREE.WebGLRenderTarget(innerWidth, innerHeight, {
    depthBuffer: true,
  });
  renderTarget.depthTexture = new THREE.DepthTexture(innerWidth, innerHeight);
  const composer = new EffectComposer(renderer, renderTarget);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new DepthOfFieldPass());
  composer.addPass(
    new UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.24,
      0.25,
      0.65,
    ),
  );
  const grain = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      noiseMap: { value: noise },
      grainReveal: { value: personalStory ? 0 : 1 },
      resolution: { value: new THREE.Vector2(innerWidth, innerHeight) },
    },
    vertexShader:
      "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader: `uniform sampler2D tDiffuse,noiseMap;uniform float grainReveal;uniform vec2 resolution;varying vec2 vUv;void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;float n=texture2D(noiseMap,vUv*resolution/512.).r; float dots=sin(vUv.x*resolution.x*1.8)*sin(vUv.y*resolution.y*1.8);c+=(n-.25)*.027*grainReveal+max(0.,dots)*.012;float vignette=1.-smoothstep(.3,.9,length(vUv-.5))*.65;gl_FragColor=vec4(c*vignette,1.);}`,
  });
  composer.addPass(grain);
  const pointer = new THREE.Vector2();
  const pointerHandler = (e) =>
    pointer.set(
      (e.clientX / innerWidth - 0.5) * 2,
      -(e.clientY / innerHeight - 0.5) * 2,
    );
  window.addEventListener("pointermove", pointerHandler, { passive: true });
  let accumulator = 0,
    lastWidth = 0,
    lastHeight = 0;
  const resize = () => {
    const w = innerWidth,
      h = innerHeight;
    if (w === lastWidth && h === lastHeight) return;
    lastWidth = w;
    lastHeight = h;
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile() ? 2 : 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(w, h);
    grain.uniforms.resolution.value.set(w, h);
    geometry.instanceCount = mobile() ? 7000 : 10000;
    material.uniforms.particleScale.value = mobile() ? 1.0 : 1.55;
    material.uniforms.mobileRotation.value = mobile() ? 1 : 0;
    ambientGeometry.instanceCount = mobile() ? 45 : 120;
    ambientMaterial.uniforms.size.value = mobile() ? 0.4 : 1;
  };
  resize();
  let disposed=false,detailStarted=false,detailTexture=null,detailReadyAt=0;
  return {
    loadDetails(){
      if(!personalStory||disposed||detailStarted)return;
      detailStarted=true;
      // Film grain is decorative: it must not hold the arrival behind the loader.
      new THREE.TextureLoader().loadAsync('/assets/images/noise.jpg').then(texture=>{
        if(disposed||signal.aborted){texture.dispose();return;}
        texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
        detailTexture=texture;grain.uniforms.noiseMap.value=texture;detailReadyAt=performance.now();
      }).catch(()=>{/* The scene remains usable without optional grain. */});
    },
    update(time, delta, chapter, reveal, reduced) {
      resize();
      if(detailTexture)grain.uniforms.grainReveal.value=reduced?1:Math.min(1,(performance.now()-detailReadyAt)/1000);
      if (reduced) time = 0;
      const target = personalStory ? personalPose(chapter, mobile()) : pose(chapter, mobile());
      // Letterforms need a shallower turn than a brain to remain readable.
      if (formation === "jat" || formation === "jatto") { const weight=1-clamp((chapter-2.3)/.55); target.rotationY *= 1-.72*weight; target.x += (-target.x*.4 + (formation === "jatto" ? 1.0 : .80))*weight; target.y += .65*weight; }
      const ease = reduced ? 1 : 1 - Math.pow(0.9, delta * 60);
      for (const key of ["morph", "explode", "factor"])
        uniforms[key].value = THREE.MathUtils.lerp(
          uniforms[key].value,
          target[key],
          ease,
        );
      uniforms.reveal.value = reveal;
      accumulator += Math.min(delta, 0.05);
      let steps = 0;
      while (accumulator >= 1 / 60 && steps < 3) {
        gpu.compute();
        accumulator -= 1 / 60;
        steps++;
      }
      material.uniforms.simulation.value =
        gpu.getCurrentRenderTarget(positionVar).texture;
      material.uniforms.time.value = reduced ? 0 : time;
      group.position.lerp(
        new THREE.Vector3(target.x, target.y - 1.19, 0),
        ease,
      );
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        target.rotationY,
        ease,
      );
      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        target.rotationZ,
        ease,
      );
      material.uniforms.offset.value.set(
        group.position.x,
        group.position.y + 1.19,
      );
      const visibleHeight =
        2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 10;
      material.uniforms.mouse.value.lerp(
        new THREE.Vector2(
          (pointer.x * visibleHeight * camera.aspect) / 2,
          (pointer.y * visibleHeight) / 2,
        ),
        0.08,
      );
      if (reduced) material.uniforms.mouse.value.set(999, 999);
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        reduced ? 0 : -pointer.x * 0.035,
        0.08,
      );
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        reduced ? 0 : pointer.y * 0.025,
        0.08,
      );
      ambientMaterial.uniforms.time.value = time;
      investorMeshes.forEach(({ el, mesh }, i) => {
        const b = el.getBoundingClientRect();
        mesh.visible = b.top < innerHeight && b.bottom > 0 && b.width > 0;
        mesh.position.set(
          ((b.left + b.width / 2 - innerWidth / 2) * visibleHeight) /
            innerHeight,
          ((-b.top - b.height / 2 + innerHeight / 2) * visibleHeight) /
            innerHeight,
          0,
        );
        mesh.scale.setScalar(((b.width * visibleHeight) / innerHeight) * 0.7);
        mesh.rotation.set(0.3 + time * 0.1, i + time * 0.15, 0.25);
      });
      composer.render();
    },
    dispose() {
      disposed=true;detailTexture?.dispose();
      window.removeEventListener("pointermove", pointerHandler);
      gpu.dispose();
      composer.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) o.material.dispose();
      });
      [positions, colors, scales, noise, sprite, param, initial, handsPosition].forEach((t) =>
        t.dispose(),
      );
      renderer.dispose();
    },
  };
}
