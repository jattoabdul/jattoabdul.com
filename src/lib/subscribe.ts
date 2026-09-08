import {Resend} from 'resend';
import {timingSafeEqual} from 'node:crypto';
import {getPostHogClient} from './posthog-server.ts';

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const reply=(body:Record<string,unknown>,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
function matchesSecret(received:string,expected:string){const a=Buffer.from(received),b=Buffer.from(expected);return a.length===b.length&&timingSafeEqual(a,b)}

export async function subscribe(request:Request){
 let email:string;
 try{const body=await request.json();if(typeof body?.email!=='string')return reply({error:'invalid email'},400);email=body.email.trim().toLowerCase();}catch{return reply({error:'invalid body'},400)}
 if(email.length>254||!EMAIL_RE.test(email))return reply({error:'invalid email'},400);
 // Staging uses the real provider only for the explicitly approved test address.
 if(process.env.SITE_ENV==='staging'){
  const secret=process.env.STAGING_CHECK_TOKEN;
  if(!secret||!matchesSecret(request.headers.get('authorization')||'','Bearer '+secret)||email!==process.env.STAGING_SUBSCRIBE_TEST_EMAIL)return reply({error:'Subscriptions are unavailable on this preview.'},503);
 }
 const apiKey=process.env.RESEND_API_KEY;
 const segmentId=process.env.RESEND_SEGMENT_ID||process.env.RESEND_AUDIENCE_ID;
 if(!apiKey||!segmentId)return reply({error:'Subscriptions are temporarily unavailable.'},503);
 try{
  const resend=new Resend(apiKey);
  const existing=await resend.contacts.get(email);
  if(existing.error&&existing.error.name!=='not_found')return reply({error:'subscribe failed'},502);
  if(existing.data){
   // Preserve existing opt-out preferences; never reset them on a repeated request.
   if(existing.data.unsubscribed)return reply({error:'This address is unsubscribed. Please contact me to update your preferences.'},409);
   const result=await resend.contacts.segments.add({email,segmentId});
   if(result.error)return reply({error:'subscribe failed'},502);
   return reply({ok:true,mode:'existing'});
  }
  const {error}=await resend.contacts.create({email,segments:[{id:segmentId}],unsubscribed:false});
  if(error)return reply({error:'subscribe failed'},502);
  const posthog=getPostHogClient();
  if(posthog){try{await posthog.captureImmediate({distinctId:crypto.randomUUID(),event:'newsletter_subscribed_server',properties:{mode:'resend',site_environment:process.env.SITE_ENV||'production',$process_person_profile:false}});}catch{console.warn('Newsletter analytics delivery failed');}}
  return reply({ok:true,mode:'resend'});
 }catch{return reply({error:'subscribe failed'},502)}
}
