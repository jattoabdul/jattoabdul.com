import { Vector2 } from "three";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

// The depth buffer is produced by the same displaced particle vertices as the
// colour buffer. A separate undeformed depth mesh would blur the wrong places.
export class DepthOfFieldPass extends ShaderPass {
  constructor() {
    super({
      uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        resolution: { value: new Vector2(1, 1) },
      },
      vertexShader:
        "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: `
        uniform sampler2D tDiffuse,tDepth;
        uniform vec2 resolution;
        varying vec2 vUv;
        void main(){
          float z=texture2D(tDepth,vUv).r;
          float distanceToCamera=(.1*60.)/(60.-z*(60.-.1));
          float radius=clamp(abs(distanceToCamera-7.5)*.2,0.,1.2);
          vec2 stepSize=vec2(radius)/resolution;
          vec3 c=texture2D(tDiffuse,vUv).rgb*4.;
          c+=texture2D(tDiffuse,vUv+vec2(stepSize.x,0.)).rgb;
          c+=texture2D(tDiffuse,vUv-vec2(stepSize.x,0.)).rgb;
          c+=texture2D(tDiffuse,vUv+vec2(0.,stepSize.y)).rgb;
          c+=texture2D(tDiffuse,vUv-vec2(0.,stepSize.y)).rgb;
          gl_FragColor=vec4(c/8.,1.);
        }`,
    });
  }
  render(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.uniforms.tDepth.value = readBuffer.depthTexture;
    this.uniforms.resolution.value.set(readBuffer.width, readBuffer.height);
    super.render(renderer, writeBuffer, readBuffer, delta, maskActive);
  }
}
