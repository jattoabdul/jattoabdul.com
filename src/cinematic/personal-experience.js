import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { createParticles } from './particles.js';
import { chapterAt, clamp } from './timeline.js';

export function startPersonalExperience(root,{isHome}) {
  const abort=new AbortController();const {signal}=abort;
  const on=(el,event,fn,options={})=>el?.addEventListener(event,fn,{...options,signal});
  const pagePath=location.pathname.replace(/\/$/,'');
  if(!/^\/(writing|notes|books|speaking|videos|mentoring|building)(\/|$)/.test(pagePath))document.title=pagePath==='/press'?'Press & Brand · Jatto Abdul':pagePath==='/about'?'About · Jatto Abdul':'Jatto Abdul · Engineer, Entrepreneur, Mentor & Author';
  if(!isHome)return ()=>abort.abort();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const loader=root.querySelector('.site-loader');
  const main=root.querySelector('main');
  const header=root.querySelector('.p-header');
  const portrait=root.querySelector('.p-portrait');
  const canvas=root.querySelector('canvas');
  const sections=[...root.querySelectorAll('[data-chapter]')];
  const tweens=[];let measurements=[],disposed=false,ready=false,scene,sceneReveal=0,chapter=0,last=0;
  const lenis=new Lenis({lerp:.08,smoothWheel:!reduced.matches,autoRaf:false});lenis.stop();
  main.inert=true;header.inert=true;root.querySelector('footer').inert=true;
  lenis.on('scroll',ScrollTrigger.update);
  const measure=()=>{measurements=sections.map(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight}));};
  measure();on(window,'resize',measure);
  const sectionSizes=new ResizeObserver(()=>{measure();if(ready)ScrollTrigger.refresh();});
  sections.forEach(section=>sectionSizes.observe(section));
  const pointer={x:0,y:0};on(window,'pointermove',e=>{pointer.x=e.clientX/innerWidth-.5;pointer.y=.5-e.clientY/innerHeight;},{passive:true});
  const portraitImage=portrait.querySelector('img');
  const resources=Promise.allSettled([portraitImage.decode(),document.fonts.load('200 18px PPNeueMontreal'),document.fonts.load('400 48px PPNeueMontreal'),document.fonts.load('600 14px PPNeueMontreal')]);
  // Restore the source-derived GPU field, authentic triangle mesh, EXR formations,
  // foreground sprite particles, depth of field, bloom and spring simulation.
  const gpuReady=createParticles(root.querySelector('canvas'),()=>{},signal,{personalStory:true,formation:(['brain','jat'].includes(new URLSearchParams(location.search).get('formation')) ? new URLSearchParams(location.search).get('formation') : 'jatto')})
    .then(value=>{if(disposed){value?.dispose();return;}scene=value;})
    .catch(error=>{if(disposed)return;root.dataset.webgl='unavailable';console.warn('Using static portrait fallback:',error.message);});
  const motion={reveal:0};
  const enter=()=>{
    if(disposed)return;loader.hidden=true;loader.inert=true;main.inert=false;header.inert=false;root.querySelector('footer').inert=false;ready=true;lenis.start();measure();scene?.loadDetails?.();
    tweens.push(gsap.to(motion,{reveal:1,duration:reduced.matches?0:3,ease:'power2.out'}));
    if(!reduced.matches){
      sections.forEach(section=>{const items=section.querySelectorAll('.p-copy > *, .p-writing, .p-anchors');tweens.push(gsap.fromTo(items,{y:28,opacity:0},{y:0,opacity:1,duration:.9,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:section,start:section.classList.contains('p-scatter')?'top -30%':'top 72%',once:true}}));});
    }
    ScrollTrigger.refresh();
    if(location.hash){const target=document.getElementById(location.hash.slice(1));if(target)lenis.scrollTo(target,{immediate:true});}
  };
  Promise.all([resources,gpuReady,new Promise(resolve=>setTimeout(resolve,reduced.matches||location.search.includes('skiploader')?0:2400))]).then(()=>{
    if(disposed)return;
    loader.classList.add('loaded');
    if(reduced.matches||location.search.includes('skiploader')){enter();return;}
    // Let Completed register, clear the loader content together, then leave
    // a short black breath before revealing the homepage.
    tweens.push(gsap.timeline({onComplete:enter})
      .to(root.querySelector('.site-loader__loading-text'),{yPercent:-110,rotation:5,duration:.35,ease:'power2.inOut'},0)
      .to(root.querySelector('.site-loader__completed span'),{y:0,rotation:0,duration:.3,ease:'power2.out'},.1)
      .to(root.querySelectorAll('.js-site-loader-heading-text, .site-loader__spinner, .site-loader__completed'),{opacity:0,duration:.25,ease:'power2.inOut'},.4)
      .to(loader,{autoAlpha:0,duration:.35,ease:'power2.inOut'},.85));
  });
  root.querySelectorAll('a[href^="#"]').forEach(a=>on(a,'click',e=>{const el=document.getElementById(a.hash.slice(1));if(!el)return;e.preventDefault();lenis.scrollTo(el,{duration:reduced.matches?0:1.6,immediate:reduced.matches});history.replaceState(null,'',a.hash);if(a.classList.contains('p-skip'))el.focus();}));
  const visibility=()=>{if(document.hidden)lenis.stop();else if(ready)lenis.start();};on(document,'visibilitychange',visibility);
  const tick=seconds=>{
    if(disposed||document.hidden)return;
    const dialogOpen=!!root.querySelector('dialog[open]');
    if(dialogOpen||!ready)lenis.stop();else if(lenis.isStopped)lenis.start();
    lenis.raf(seconds*1000);
    chapter=chapterAt(scrollY,measurements);
    sceneReveal=motion.reveal;
    const missionQuiet=clamp((chapter-1.9)/.3)*(1-clamp((chapter-3.8)/.2));
    const mentoringQuiet=clamp((chapter-8)/.4)*(1-clamp((chapter-10.1)/.7));
    canvas.style.opacity=String(1-Math.max(.68*missionQuiet,.7*mentoringQuiet));
    const up=1,down=1-clamp((chapter-1.1)/.65);
    const travel=clamp(chapter);
    portrait.style.left=innerWidth<768?'50%':`${75-50*travel}%`;
    portrait.style.opacity=String(scene?up*down*sceneReveal:sceneReveal*(chapter<2?1:0));
    portrait.style.filter=scene?`blur(${(1-up)*8}px)`:'none';
    const delta=last?Math.min(seconds-last,.05):1/60;last=seconds;
    // Re-form the field into a bulb and book as the work story unfolds.
    scene?.update(seconds,delta,chapter,sceneReveal,reduced.matches);
    root.dataset.chapter=chapter.toFixed(3);root.dataset.ready=String(ready);
  };
  gsap.ticker.add(tick);
  return ()=>{disposed=true;abort.abort();sectionSizes.disconnect();gsap.ticker.remove(tick);tweens.forEach(t=>{t.scrollTrigger?.kill();t.kill();});lenis.destroy();scene?.dispose();};
}
