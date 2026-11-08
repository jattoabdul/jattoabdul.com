(() => {
  const form=document.getElementById('seed'),status=document.getElementById('status');
  form.addEventListener('submit',async event=>{
    event.preventDefault();const button=form.querySelector('button');button.disabled=true;
    const data=new FormData(form);
    try {
      const response=await fetch('/api/subscribe',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
        email:data.get('email'),consent:true,consentVersion:'notes-work-faith-life-2026-09-13-v2',website:'',challenge:data.get('cf-turnstile-response'),
      })});
      const result=await response.json();status.textContent=`${response.status}: ${result.code}`;
    }catch{status.textContent='Request failed. Please try again.';}
    button.disabled=false;window.turnstile?.reset();
  });
})();
