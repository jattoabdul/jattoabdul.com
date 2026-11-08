'use client';
import {useEffect,useRef,useState} from 'react';

const EMAIL='me@jattoabdul.com';

// Gives visitors without a configured mail app a visible way to reach out.
export function CopyEmail(){
  const [status,setStatus]=useState('idle');
  const timer=useRef(0);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  const copy=async()=>{
    try{await navigator.clipboard.writeText(EMAIL);setStatus('copied');}
    catch{setStatus('failed');}
    clearTimeout(timer.current);timer.current=setTimeout(()=>setStatus('idle'),2600);
  };
  return <p className="p-copy-email">
    <span>or write to <a href={'mailto:'+EMAIL}>{EMAIL}</a></span>
    <button type="button" onClick={copy}>{status==='copied'?'Copied':'Copy address'}</button>
    <span className="p-copy-email-status" role="status" aria-live="polite">{status==='copied'?'Email address copied.':status==='failed'?'Could not copy. Select the address instead.':''}</span>
  </p>;
}
