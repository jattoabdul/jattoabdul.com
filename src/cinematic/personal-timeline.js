import { pose, clamp } from './timeline.js';
// Preserve the opening; later formations have their own reading-length holds.
export function personalPose(chapter, mobile = false) {
  if (chapter <= 2.3) return pose(chapter, mobile);
  const base = pose(2.3, mobile);
  const frames = [
    [2.3, base],
    [3.85, base],
    [4.25, {x:2.7,y:.7,rotationY:0,rotationZ:0,explode:0,morph:1,factor:3.7}],
    [4.8, {x:2.7,y:.7,rotationY:.12,rotationZ:0,explode:0,morph:1,factor:3.7}],
    [5.2, {x:-2.7,y:.7,rotationY:-.2,rotationZ:0,explode:0,morph:1,factor:3.7}],
    [5.65, {x:-2.7,y:.7,rotationY:-.2,rotationZ:0,explode:0,morph:1,factor:3.7}],
    [6, {x:0,y:.7,rotationY:0,rotationZ:0,explode:1,morph:1,factor:3.7}],
    [6.35, {x:2.7,y:.7,rotationY:-.18,rotationZ:-.08,explode:0,morph:2,factor:3.6}],
    [6.8, {x:2.7,y:.7,rotationY:.12,rotationZ:-.08,explode:0,morph:2,factor:3.6}],
    [7.05, {x:0,y:.7,rotationY:.3,rotationZ:0,explode:1,morph:2,factor:3.6}],
    [7.3, {x:-2.7,y:.7,rotationY:.12,rotationZ:0,explode:0,morph:3,factor:3.4}],
    [7.8, {x:-2.7,y:.7,rotationY:-.12,rotationZ:0,explode:0,morph:3,factor:3.4}],
    [8.3, {x:0,y:.7,rotationY:.2,rotationZ:0,explode:1,morph:3,factor:3.4}],
    [10.1, {x:0,y:.7,rotationY:.2,rotationZ:0,explode:1,morph:3,factor:3.4}],
    [10.7, {x:0,y:-1,rotationY:0,rotationZ:0,explode:0,morph:4,factor:3.8}],
    [11, {x:0,y:-1.8,rotationY:0,rotationZ:0,explode:0,morph:4,factor:3.8}],
  ];
  let i=1;
  while(i<frames.length-1 && chapter>frames[i][0]) i++;
  const [start,a]=frames[i-1], [end,b]=frames[i];
  const t=clamp((chapter-start)/(end-start)), eased=t*t*(3-2*t);
  const result=Object.fromEntries(Object.keys(a).map(k=>[k,a[k]+(b[k]-a[k])*eased]));
  if(mobile && chapter>3.85){
    const blend=clamp((chapter-3.85)/.4);
    const finale=clamp((chapter-10.1)/.6);
    result.x*=1-blend;result.y+=((2.5-4.1*finale)-result.y)*blend;result.factor+=((2.1+.3*finale)-result.factor)*blend;
  }
  return result;
}
