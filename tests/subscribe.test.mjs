import test from 'node:test';
import assert from 'node:assert/strict';
import {subscribe} from '../src/lib/subscribe.ts';
const make=(body,headers={})=>new Request('https://staging.example/api/subscribe',{method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)});
const originalFetch=globalThis.fetch;
test.afterEach(()=>{globalThis.fetch=originalFetch;for(const key of ['RESEND_API_KEY','RESEND_SEGMENT_ID','RESEND_AUDIENCE_ID','SITE_ENV','STAGING_CHECK_TOKEN','STAGING_SUBSCRIBE_TEST_EMAIL'])delete process.env[key]});
test('rejects malformed email types and invalid email',async()=>{for(const email of [null,{},42,'invalid'])assert.equal((await subscribe(make({email}))).status,400)});
test('missing real configuration cannot return success',async()=>{assert.equal((await subscribe(make({email:'test@example.com'}))).status,503)});
test('staging requires authorization and the approved address',async()=>{process.env.SITE_ENV='staging';process.env.STAGING_CHECK_TOKEN='test';process.env.STAGING_SUBSCRIBE_TEST_EMAIL='approved@example.com';assert.equal((await subscribe(make({email:'approved@example.com'}))).status,503);assert.equal((await subscribe(make({email:'other@example.com'},{authorization:'Bearer test'}))).status,503)});
test('creates a real segment contact only after the provider accepts it',async()=>{
 process.env.RESEND_API_KEY='test-only';process.env.RESEND_SEGMENT_ID='segment-test';process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN='';const calls=[];
 globalThis.fetch=async(url,options)=>{calls.push({url:String(url),...options});return options?.method==='POST'?Response.json({id:'new-test-contact'}):Response.json({name:'not_found',message:'Contact not found'},{status:404})};
 const result=await subscribe(make({email:' TEST@example.com '}));assert.equal(result.status,200);assert.deepEqual(await result.json(),{ok:true,mode:'resend'});const body=JSON.parse(calls.find(c=>c.method==='POST').body);assert.equal(body.email,'test@example.com');assert.deepEqual(body.segments,[{id:'segment-test'}]);
});
test('preserves an existing opt-out without any mutation',async()=>{process.env.RESEND_API_KEY='test-only';process.env.RESEND_SEGMENT_ID='segment-test';let calls=0;globalThis.fetch=async()=>{calls++;return Response.json({id:'existing',unsubscribed:true})};assert.equal((await subscribe(make({email:'test@example.com'}))).status,409);assert.equal(calls,1)});
test('waits for analytics delivery before ending a successful subscription request',async()=>{
 process.env.RESEND_API_KEY='test-only';process.env.RESEND_SEGMENT_ID='segment-test';process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN='phc_test_only';
 let delivered=false;
 globalThis.fetch=async(url,options)=>{
  if(String(url).includes('posthog.com')){await new Promise(resolve=>setTimeout(resolve,20));delivered=true;return Response.json({status:1})}
  return options?.method==='POST'?Response.json({id:'new-test-contact'}):Response.json({name:'not_found',message:'Contact not found'},{status:404});
 };
 const result=await subscribe(make({email:'test@example.com'}));assert.equal(result.status,200);assert.equal(delivered,true);
 delete process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
});
