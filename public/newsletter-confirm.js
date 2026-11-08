(() => {
 const token=location.hash.slice(1);
 history.replaceState(null,'',location.pathname);
 const button=document.getElementById('confirm'),heading=document.getElementById('heading'),message=document.getElementById('message'),next=document.getElementById('next');
 if(!/^[a-f0-9]{64}$/.test(token)){heading.textContent='Open the link in your email.';message.textContent='A confirmation link is needed to subscribe. You can request a new one below.';return;}
 button.hidden=false;
 button.addEventListener('click',async()=>{
  button.disabled=true;button.textContent='Confirming…';
  try{
   const response=await fetch('/api/newsletter/confirm',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token})});
   const {code}=await response.json();
   const states={
    confirmed:['You’re in.','Thanks for joining me here. A welcome note is on its way.'],
    already_used:['This link has already been used.','Your subscription has not been changed. If you unsubscribed, this link will not subscribe you again.'],
    expired_link:['This confirmation link has expired.','Please request a new one.'],
    invalid_link:['This link is incomplete.','Please reopen the link from your email or request a new one.'],
    preferences_preserved:['Your unsubscribe is still in place.','I haven’t changed your preferences. Please get in touch if you would like to subscribe again.'],
    finishing_confirmation:['Your email is confirmed.','The welcome step needs a check on my side. You don’t need to click again.'],
   };
   if(!states[code])throw new Error('unavailable');
   [heading.textContent,message.textContent]=states[code];button.hidden=true;
   if(['confirmed','already_used','finishing_confirmation'].includes(code)){next.href='/writing';next.textContent='Read my writing ↗';}
   heading.focus();
  }catch{message.textContent='I couldn’t finish that request. Please try again, or get in touch if it keeps happening.';button.disabled=false;button.textContent='Try again';}
 });
})();
