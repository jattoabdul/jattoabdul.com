import test from 'node:test';
import assert from 'node:assert/strict';
import { personalPose } from '../src/cinematic/personal-timeline.js';
import { pose } from '../src/cinematic/timeline.js';
test('personal story preserves arrival and gives mission, bulb, book and foundations their own beats',()=>{
 for(const mobile of [false,true]){
  for(const p of [0,.5,1,2.3]) assert.deepEqual(personalPose(p,mobile),pose(p,mobile));
  assert.equal(personalPose(2.8,mobile).explode,1);
  assert.equal(personalPose(3.7,mobile).explode,1);
  assert.equal(personalPose(3.7,mobile).morph,0);
  assert.equal(personalPose(4.5,mobile).morph,1);
  assert.equal(personalPose(4.5,mobile).explode,0);
  assert.equal(personalPose(6,mobile).explode,1);
  assert.equal(personalPose(6.6,mobile).morph,2);
  assert.equal(personalPose(6.6,mobile).explode,0);
  assert.equal(personalPose(7.6,mobile).morph,3);
  assert.equal(personalPose(7.6,mobile).explode,0);
  assert.equal(personalPose(8.5,mobile).explode,1);
  assert.equal(personalPose(10.8,mobile).morph,4);
  assert.equal(personalPose(11.5,mobile).explode,0);
  assert.deepEqual(personalPose(11,mobile),personalPose(13,mobile));
  assert.equal(personalPose(9.8,mobile).explode,1);
  let previous=personalPose(0,mobile);
  for(let p=.001;p<13;p+=.001){
   const current=personalPose(p,mobile);
   for(const key of Object.keys(current)){
    assert.ok(Number.isFinite(current[key]));
    assert.ok(Math.abs(current[key]-previous[key])<.08,`${key} jumps at ${p}`);
   }
   previous=current;
  }
 }
});
