'use client';
import {useContact} from './SiteShell';
import { Fragment, useEffect, useRef, useState } from 'react';
import './about.css';
import { startAboutCrystal } from './about-crystal.js';
import { AboutGallery } from './AboutGallery.jsx';

const journey = [
  {id:'foundations', label:'Growing up', title:'A foundation I understand more deeply now.', paragraphs:[
    'I grew up in Ilorin, in a family where education mattered. My parents owned a primary school, and they took my learning seriously, both in the classroom and in my religious education.',
    'As a child, I did not always appreciate their determination.',
    'There were mornings when I did not want to go to Zumrah, my madrasa. My mum would make me wash my white uniform and send me off wearing it half dry. She also arranged extra lessons with a scholar near our home, where I would go at night.',
    'If I stopped writing my school notes or she became concerned about the company I was keeping, she would follow me to school and speak with my teachers.',
    'At the time, I mostly felt the pressure. Today, I appreciate the effort she put into giving me a foundation I still return to.',
  ]},
  {id:'finding-direction',label:'University',title:'A path I hadn’t chosen.',paragraphs:[
    'My secondary-school years took me through Unilorin Secondary School and KWCOED Model Secondary School in Ilorin. By my final year, I was taking my studies seriously. I finished with strong WAEC results and scored 281 in JAMB, the university entrance examination.',
    'I wanted to study computer engineering or computer science. Instead, I found myself having to study geology at the Federal University of Technology, Minna.',
    'That was difficult to accept, especially after doing well in my exams. In my second year, I tried another university, hoping to change direction. I was offered geology again.',
    'Eventually, I decided to stay at FUT Minna and make my way through the course. I began to see that path as part of my destiny, even though I could not yet understand where it was taking me.',
    'University was also where I began taking on responsibility for others. In my first year, I was chosen as class representative without campaigning for the role. I later stepped away as my direction changed.',
    'I served as Wakeel, a leadership role in the Muslim Students’ Society’s paramilitary group. I helped coordinate camps and organize members supporting security at school events. Physical endurance, discipline, and my commitment to my faith were important parts of that experience.',
  ]},
  {id:'first-pages',label:'The first pages',title:'A book, a laptop, and something I could make.',paragraphs:[
    'Before university, I had spent a short period learning hardware engineering and repairs at a local shop. Later, my family bought me an HP laptop for schoolwork.',
    'In 2012, during my second year, my friend Ali Alege visited my apartment. An HTML book was lying there, and I picked it up.',
    'What caught my attention was how practical it was. I could follow a few pages, type something into the computer, and see what I had made appear in a browser.',
    'I kept going.',
    'Soon, programming was taking up much of my spare time. HTML and CSS led me into learning how the web worked. I explored Python and started using JavaScript to make the websites I was building respond to people.',
    'Books were a big part of that beginning: the HTML and CSS book, Eloquent JavaScript, and Python for Dummies. I would read, try things on the laptop, and learn from what happened.',
    'My mum sometimes took the computer away because she thought I was spending too much time on it. From her perspective, I had university work to focus on. I was beginning to discover something that would eventually become my career.',
  ],image:true},
  {id:'learning-by-building',visual:{after:2,src:'/assets/personal/about-writing-desk.webp',alt:'An illustrative still life of a notebook, pen and cup on a writing desk',caption:'Making space to work things out.',kind:'Illustrative study'},label:'Learning by building',title:'The things I was learning became useful to others.',paragraphs:[
    'In my third year, I met Joseph Cobhams. He was already building websites and applications for clients. I was still working on my HP, and seeing him work on a Mac drew me in even further.',
    'I became closer to him and learned from what he was building. Joseph had created a PHP framework called Candor. I took it apart to understand its internals, which became my introduction to how web frameworks worked.',
    'Eventually, I started using it to build things for clients of my own. My first website job was for a farm, through a family connection. Another followed for a geologist’s company.',
    'In my fourth year, I won a hackathon Joseph organized with Intellix, an Ionic-based mobile app that interacted with connected devices in a home.',
    'During my geology-related internship at NAPIMS, I also met people who wanted to learn and build together. We entered an MTN hackathon with a gamified exam-preparation platform built around questions for exams such as WAEC and JAMB.',
    'By then, programming had become part of how I spent my time, made friends, and explored ideas.',
  ]},
  {id:'a-wider-world',label:'Andela',title:'The opportunity that widened my world.',paragraphs:[
    'During the holidays, while working with a friend at Unilorin, I came across an Andela advert. By that point, I had spent years learning from books, experimenting, taking apart other people’s code, and building small projects for clients.',
    'After a rigorous selection process and bootcamp, I joined Andela on August 7, 2017.',
    'I received my first MacBook, entered a paid apprenticeship, and began developing the technical and professional skills needed to work with international teams.',
    'My first international client was Iris Nova, the company behind Dirty Lemon, where I worked with Greg Leuch. Andela also sponsored my first two trips outside Nigeria, both to the United States.',
    'The world I could imagine myself working in had become much larger.',
  ], remembrance:true},
  {id:'making-a-home',label:'Family & Canada',title:'Building a life with my family.',paragraphs:[
    'Around the end of my Andela years, I got married and became a father. I left Andela on August 7, 2020, three years after joining.',
    'Working with Jay Elkaake at Fera opened another chapter. That opportunity eventually brought my family and me to Canada through a work permit.',
    'It was a moment of happiness and gratitude. Over the years, our family grew, and Canada became home. I later became a Canadian citizen.',
    'Today, my wife and I are raising our children here. Family is part of the life I am building, and part of what I want to stay close to as I grow.',
  ]},
  {id:'still-a-student',label:'Faith & languages',title:'The learning that continued alongside everything.',paragraphs:[
    'I’m Muslim. My faith has remained part of my life through university, work, marriage, and moving to another country.',
    'Alongside work and family life, I have continued learning and memorizing the Quran with teachers and friends. I have studied Arabic through institutes including Andalus and, more recently, Al-Bayan.',
    'I want to understand my religion more deeply, and I also love language itself. Ebira, Yoruba, Hausa, English, and Arabic are all part of my life.',
    'Learning keeps giving me reasons to be a student. It also keeps bringing me back to the foundation my parents helped me build.',
  ]},
  {id:'life-now',visual:{after:3,src:'/assets/personal/speaking/arrival-poster.jpg',alt:'Jatto speaking into a microphone at his desk',caption:'Sharing what I’m learning, one conversation at a time.',kind:'From a recording'},label:'Life now',title:'Still learning. Building. Passing it on.',paragraphs:[
    'After Fera, I worked at Minerva as a Senior Software Engineer II, contributing to AML screening and the Pergamon platform.',
    'I’m now using a period between full-time roles to build my own products, consult occasionally with Fera, and explore the next engineering problems I want to work on. I’m open to full-time opportunities while continuing to build independently.',
    'I’m also becoming more intentional about something I have done informally for years: sharing what I know and mentoring younger people.',
    'I write to understand my thoughts more clearly. I speak to open conversations. I mentor because finding your next step can feel less overwhelming when someone is willing to listen.',
    'I’m still learning how to become a better engineer, husband, father, and person. I want what I learn to be useful beyond my own life.',
  ]},
];

function JourneyLinks({active,onNavigate}){
  return <nav aria-label="Life journey">{journey.map(item=><a key={item.id} href={`#${item.id}`} aria-current={active===item.id?'location':undefined} onClick={onNavigate}>{item.label}</a>)}</nav>;
}

export function AboutPage(){const onContact=useContact();
  const root=useRef(null);const mobileContents=useRef(null);const [active,setActive]=useState(journey[0].id);
  useEffect(()=>startAboutCrystal(root.current.querySelector('.about-crystal-canvas'),root.current),[]);
  useEffect(()=>{
    const el=root.current;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const animations=new Set();
    const seen=new WeakSet();
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting||seen.has(entry.target))return;
      seen.add(entry.target);reveal.unobserve(entry.target);
      if(!reduced.matches){const animation=entry.target.animate([{opacity:.15,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.65,.3,1)'});animations.add(animation);animation.onfinish=()=>animations.delete(animation);}
    }),{threshold:.05});
    el.querySelectorAll('.about-reveal').forEach(node=>reveal.observe(node));
    const sections=Array.from(el.querySelectorAll('[data-journey]'));
    let frame=0;
    const update=()=>{frame=0;let current=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=innerHeight*.4)current=section;}setActive(current.id);};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const onMotion=()=>{if(reduced.matches){animations.forEach(a=>a.cancel());animations.clear();}};
    window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);reduced.addEventListener('change',onMotion);update();
    return ()=>{reveal.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);reduced.removeEventListener('change',onMotion);animations.forEach(a=>a.cancel());};
  },[]);
  return <article ref={root} className="about-page"><canvas className="about-crystal-canvas" aria-hidden="true"/>
    <section className="about-intro" aria-labelledby="about-heading">
      <div className="about-intro-copy about-reveal"><h1 id="about-heading">I’m Jatto Abdul.<br/><em>This is how <br/>I got here.</em></h1><p>I’m an engineer, entrepreneur, mentor, and author, living in Canada with my wife and our children.</p><a className="p-text-link" href="#foundations">Read my story <span aria-hidden="true">↓</span></a></div>
      <figure className="about-portrait about-reveal"><img src="/assets/personal/jatto-portrait.webp" alt="Jatto Abdul wearing a maroon top" width="800" height="800" fetchPriority="high"/></figure>
    </section>
    <div className="about-synopsis about-reveal"><p>My journey into software began with a laptop meant for university work and friends who introduced me to programming. It grew through years of learning, building, and working with people who helped me see what was possible.</p><p>Through it all, faith, family, and education have remained part of my foundation. Today, I build software, share what I’m learning, and mentor young people finding their own way through career, character, and faith.</p><p className="about-transition">To understand why those things matter to me, it helps to start a little earlier.</p></div>
    <div className="about-crystal-intro" aria-hidden="true"/>
    <div className="about-journey-layout">
      <aside className="about-contents"><p>My story</p><JourneyLinks active={active}/></aside>
      <details className="about-mobile-contents" ref={mobileContents}><summary>Explore my story</summary><JourneyLinks active={active} onNavigate={()=>{mobileContents.current.open=false;}}/></details>
      <div className="about-chapters">{journey.map((item,index)=><section id={item.id} data-journey key={item.id} className="about-chapter" aria-labelledby={`${item.id}-heading`}>
        {index<3&&<div className="about-crystal-mobile-space" aria-hidden="true"/>}
        <h2 id={`${item.id}-heading`} className="about-reveal">{item.title}</h2>
        {item.image&&<figure className="about-book about-reveal"><img src="/assets/personal/about-first-pages.webp" width="1536" height="1024" alt="An open programming book beside a laptop in warm lamplight" loading="lazy"/><figcaption>A few pages. Something I could make. <span>Illustrative study</span></figcaption></figure>}
        <div className="about-prose">{item.paragraphs.map((paragraph,i)=><Fragment key={i}><p className="about-reveal">{paragraph}</p>{item.visual?.after===i&&<figure className="about-story-image about-reveal"><img src={item.visual.src} alt={item.visual.alt} loading="lazy"/><figcaption>{item.visual.caption}<span>{item.visual.kind}</span></figcaption></figure>}</Fragment>)}</div>
        {item.remembrance&&<aside className="about-remembrance about-reveal" aria-labelledby="michael-heading"><h3 id="michael-heading">A friendship I still carry.</h3><p>One of the people I met during bootcamp was Michael Ozoemena. He was exceptionally bright, and we became close. He visited me a few times outside work.</p><p>Michael died on January 4, 2020. He was 22.</p><p>Losing him changed how I thought about time. It reminded me that the next stage of life is never promised, and that the life we are living now deserves our attention.</p></aside>}
      </section>)}</div>
    </div>
    <section className="about-reflection about-reveal" aria-labelledby="about-reflection-heading"><h2 id="about-reflection-heading">I kept learning<br/><em>with what I had.</em></h2><div><p>I can now see connections I could not see while I was living through them: my parents’ persistence, a course I struggled to accept, friends who shared what they knew, and a laptop that gave me somewhere to practise.</p><p>That experience is part of why I want to help young people find their own next step. Sometimes a book, a conversation, or someone willing to share what they know can open a possibility you had not considered.</p></div></section>
    <AboutGallery/>
    <section className="about-closing about-reveal" aria-labelledby="about-closing-heading"><h2 id="about-closing-heading">There’s more ahead.</h2><p>If something in my journey connects with where you are, I’d be glad to hear your story.</p><div><button className="p-button" onClick={onContact}>Let’s talk <span aria-hidden="true">↗</span></button><a className="p-text-link" href="/building">Explore my work <span aria-hidden="true">↗</span></a></div></section>
  </article>;
}
