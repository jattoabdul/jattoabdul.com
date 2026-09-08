'use client';
import {memo,useEffect,useRef,useState,createContext,useContext} from 'react';
import {usePathname} from 'next/navigation';
import {Envelope,YoutubeLogo,LinkedinLogo,InstagramLogo} from '@phosphor-icons/react';
import {testimonials} from './testimonials.js';
import {signature,loader} from './loader-data.js';
const mark=signature.replace('loader-signature"','loader-signature brand-signature"');
const rooms=[['About','/about'],['Writing','/writing'],['Speaking','/speaking'],['Building','/building'],['Mentoring','/mentoring']];
const ContactContext=createContext(()=>{});
export function ContactButton({children,className='p-button'}){const open=useContext(ContactContext);return <button className={className} onClick={open}>{children}</button>}
export function useContact(){return useContext(ContactContext)}
const Loader=memo(function Loader(){return <div className="loader-container" dangerouslySetInnerHTML={{__html:loader}}/>});
export function Testimonials(){
  const [selected,setSelected]=useState(0);
  const item=testimonials[selected];
  return <section className="p-chapter p-testimonials" id="voices" data-chapter="9" aria-labelledby="voices-heading">
    <div className="p-stage"><div className="p-copy">
      <h2 id="voices-heading">A few words from people<br/>along the way.</h2>
      <p className="p-recommendation-label">From colleagues and team leads</p>
      <div className="p-quote-switch" role="group" aria-label="Choose a recommendation">
        {testimonials.map((person,i)=><button key={person.name} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{person.name}</button>)}
      </div>
      <div key={item.name} className="p-quote-content">
        <figure className="p-quote" aria-live="polite">
          <blockquote>“{item.quote}”</blockquote>
          <figcaption>
            <div className="p-quote-author"><img src={item.photo} width="64" height="64" alt="" loading="lazy"/><div><strong>{item.name}</strong><span>{item.role}</span></div></div>
            <span className="p-quote-context">{item.relationship} · <time dateTime={item.datetime}>{item.date}</time></span>
          </figcaption>
        </figure>
        <p className="p-quote-source">LinkedIn recommendation · excerpt</p>
        <details className="p-recommendation"><summary>Read full recommendation</summary><div>{item.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div></details>
      </div>
    </div></div>
  </section>;
}
export function Footer(){return <footer className="p-footer" role="contentinfo"><div className="p-footer-top"><a href="/" className="p-footer-signature" aria-label="Jatto Abdul — home" dangerouslySetInnerHTML={{__html:mark}}/><nav aria-label="Footer navigation">{rooms.map(([name,url])=><a href={url} key={url}>{name}</a>)}</nav></div><div className="p-footer-bottom"><nav aria-label="Stay connected"><a href="mailto:me@jattoabdul.com"><Envelope aria-hidden="true" size={18}/>Email</a><a href="https://www.youtube.com/@jatto_abdul"><YoutubeLogo aria-hidden="true" size={18}/>YouTube</a><a href="https://www.linkedin.com/in/jattoade/"><LinkedinLogo aria-hidden="true" size={18}/>LinkedIn</a><a href="https://www.instagram.com/jatto_abdul/"><InstagramLogo aria-hidden="true" size={18}/>Instagram</a></nav><a className="p-footer-press" href="/press">Press &amp; brand</a><small>© {new Date().getFullYear()} Jatto Abdul</small></div></footer>}
function Arrow(){return <span aria-hidden="true" className="p-arrow">↗</span>}
function Contact({close}) {
  const ref=useRef(null);
  useEffect(()=>{const d=ref.current;d.showModal();return()=>d.close();},[]);
  return <dialog ref={ref} className="p-contact" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}} aria-labelledby="contact-title">
    <button className="p-close" onClick={close} autoFocus aria-label="Close contact">Close <span aria-hidden="true">×</span></button>
    <img src="/assets/personal/jatto-portrait.webp" alt="" />
    <div><p className="p-eyebrow">A conversation starts here</p><h2 id="contact-title">My door<br/>is open.</h2><p>Whether it’s faith, career, building, or a question you’ve been sitting on, write to me. I’ll reply myself.</p><a className="p-button" href="mailto:me@jattoabdul.com">Say hello <Arrow/></a><a className="p-text-link" href="https://www.youtube.com/@jatto_abdul">Or spend a little more time in my world <Arrow/></a></div>
  </dialog>;
}
function Header({onContact,path}){
  const [open,setOpen]=useState(false);
  const button=useRef(null), header=useRef(null);
  useEffect(()=>{
    if(!open)return;
    header.current.querySelector('nav a')?.focus();
    const key=e=>{if(e.key==='Escape'){setOpen(false);button.current?.focus();}};
    const outside=e=>{if(!header.current.contains(e.target))setOpen(false);};
    document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
    return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};
  },[open]);
  return <header ref={header} className="p-header" onBlur={e=>{if(e.relatedTarget&&!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}><a href="/" className="p-brand" aria-label="Jatto Abdul — home" dangerouslySetInnerHTML={{__html:mark}}/><nav id="room-navigation" aria-label="Main navigation" className={open?'is-open':''}>{rooms.map(([label,href])=><a className="nav__link" key={href} href={href} aria-current={(path===href||path.startsWith(href+'/')||(href==='/speaking'&&path==='/videos')||(href==='/writing'&&(path.startsWith('/notes')||path.startsWith('/books'))))?'page':undefined}>{label}</a>)}</nav><button className="p-contact-button" onClick={onContact}>Let’s talk <Arrow/></button><button ref={button} className="p-menu" aria-controls="room-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button></header>;
}

export function SiteShell({children}){
  const root=useRef(null);const [contact,setContact]=useState(false);
  const returnFocus=useRef(null);
  const openContact=()=>{returnFocus.current=document.activeElement;setContact(true);};
  const closeContact=()=>{setContact(false);requestAnimationFrame(()=>returnFocus.current?.focus());};
  const path=usePathname()||'/';const isHome=path==='/';
  useEffect(()=>{
    if(isHome||!location.hash)return;
    let cancelled=false;
    const followHash=()=>{let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const target=document.getElementById(id);if(!target)return;observer.disconnect();document.fonts.ready.then(()=>{if(!cancelled)requestAnimationFrame(()=>{if(!cancelled)target.scrollIntoView();});});};
    const observer=new MutationObserver(followHash);observer.observe(root.current,{subtree:true,childList:true});followHash();
    return()=>{cancelled=true;observer.disconnect();};
  },[isHome,path]);
  useEffect(()=>{
    if(!isHome)return;
    let cancelled=false,stop;
    import('./personal-experience.js').then(({startPersonalExperience})=>{
      if(!cancelled)stop=startPersonalExperience(root.current,{isHome:true});
    }).catch(error=>{
      console.error('Could not load homepage motion',error);
      const loader=root.current?.querySelector('.site-loader');if(loader)loader.hidden=true;
    });
    return()=>{cancelled=true;stop?.();};
  },[isHome]);

return <ContactContext.Provider value={openContact}><div ref={root} className="personal-site">
<a href="#personal-main" className="p-skip">Skip to content</a><Header path={path} onContact={openContact}/>
{isHome&&<><Loader/><canvas className="p-canvas" aria-hidden="true"/><div className="p-portrait" aria-hidden="true"><img src="/assets/personal/jatto-portrait.webp" alt=""/></div></>}
<main id="personal-main" tabIndex={-1}>{children}</main>{!isHome&&<Footer/>}{contact&&<Contact close={closeContact}/>}</div></ContactContext.Provider>;
}
