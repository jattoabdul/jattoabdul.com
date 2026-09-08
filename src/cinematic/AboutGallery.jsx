'use client';
import { useEffect, useRef, useState } from 'react';

const images=[
  {src:'/assets/personal/jatto-portrait.webp',title:'Jatto Abdul',alt:'Jatto Abdul wearing a maroon top',kind:'Portrait',className:'portrait'},
  {src:'/assets/personal/about-first-pages.webp',title:'Learning, page by page.',alt:'An illustrative still life of an open programming book and a laptop',kind:'Illustrative study',className:'book'},
  {src:'/assets/personal/about-writing-desk.webp',title:'A place to think.',alt:'An illustrative still life of a notebook, pen and cup on a writing desk',kind:'Illustrative study',className:'writing'},
];
function Lightbox({index,onClose,onChange}){
  const ref=useRef(null);const image=images[index];
  useEffect(()=>{const d=ref.current;d.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{d.close();document.body.style.overflow=previous;};},[]);
  return <dialog ref={ref} className="about-lightbox" aria-labelledby="gallery-image-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();onChange((index+1)%images.length);}if(e.key==='ArrowLeft'){e.preventDefault();onChange((index+images.length-1)%images.length);}}}>
    <button className="about-lightbox-close" autoFocus onClick={onClose} aria-label="Close image">Close <span aria-hidden="true">×</span></button>
    <figure><img src={image.src} alt={image.alt}/><figcaption><h3 id="gallery-image-title">{image.title}</h3><span>{image.kind}</span></figcaption></figure>
    <div className="about-lightbox-controls"><button aria-label="Previous image" onClick={()=>onChange((index+images.length-1)%images.length)}>←</button><span>{index+1} / {images.length}</span><button aria-label="Next image" onClick={()=>onChange((index+1)%images.length)}>→</button></div>
  </dialog>;
}
export function AboutGallery(){
  const [selected,setSelected]=useState(null);const trigger=useRef(null);
  const close=()=>{setSelected(null);requestAnimationFrame(()=>trigger.current?.focus());};
  return <section className="about-gallery" id="gallery" aria-labelledby="about-gallery-heading"><div className="about-gallery-intro about-reveal"><h2 id="about-gallery-heading">A little more<br/><em>of my world.</em></h2><p>Learning, making, and finding a little space to think.</p></div><div className="about-gallery-grid">{images.map((item,i)=><figure key={item.src} className={`about-gallery-item about-gallery-${item.className} about-reveal`}><button aria-label={`View ${item.title}`} onClick={e=>{trigger.current=e.currentTarget;setSelected(i);}}><img src={item.src} alt={item.alt} loading="lazy" width={i===0?800:1536} height={i===0?800:1024}/><span aria-hidden="true" className="about-gallery-expand">↗</span></button><figcaption><span>{item.title}</span><small>{item.kind}</small></figcaption></figure>)}</div>{selected!==null&&<Lightbox index={selected} onClose={close} onChange={setSelected}/>}</section>;
}
