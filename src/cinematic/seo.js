export const siteOrigin='https://jattoabdul.com';
export const pages={
 '/':['Jatto Abdul · Engineer, Entrepreneur, Mentor & Author','I build software, share ideas, and mentor young people navigating career, character, and faith, so they can grow without losing themselves.'],
 '/about':['About · Jatto Abdul','From growing up in Ilorin to engineering, entrepreneurship and life in Canada. The people, lessons and foundations behind my work.'],
 '/writing':['Writing | Jatto Abdul','Essays, poetry, notes and a book in progress. Writing about work, faith, character, and the things I am learning along the way.'],
 '/notes':['Notes | Jatto Abdul','Short observations and weekly reflections on building software, making decisions, and growing without losing yourself.'],
 '/speaking':['Speaking | Jatto Abdul','Videos and conversations about engineering, career, character and faith. Watch my work or invite me to speak.'],
 '/videos':['Videos | Jatto Abdul','Explore my published videos, spoken word and conversations about work, life and faith.'],
 '/mentoring':['Mentoring | Jatto Abdul','Find a place to begin through practical writing, conversations and informal guidance on career, character and faith.'],
 '/building':['Building | Jatto Abdul','Explore the software I build, including Discova and TrustKarry, and my engineering contributions with teams.'],
 '/building/discova':['Discova | Building | Jatto Abdul','How I am building a calmer way to discover and read useful engineering ideas with Discova.'],
 '/building/trustkarry':['TrustKarry | Building | Jatto Abdul','My work as founding engineer on TrustKarry, connecting senders and travellers through clearer handoff workflows.'],
 '/press':['Press & Brand · Jatto Abdul','Download my press kit and website brand guide, find a short bio and host introduction, or get in touch about a conversation.'],
 '/contact':['Contact | Jatto Abdul','Get in touch with Jatto Abdul about engineering work, speaking, mentoring, or a question you would like to explore.'],
 '/books/present-without-performing':['Present Without Performing | Jatto Abdul','A book in progress about finding your voice and sharing your work without losing yourself. Working title; coming soon.'],
};
export const redirects={
 '/projects':'/building','/projects/discova':'/building/discova','/projects/trustkarry':'/building/trustkarry',
 '/projects/minerva':'/building#minerva','/projects/fera':'/building#fera','/projects/heroshe':'/building#heroshe','/projects/ai-experiments':'/building#experiments',
};
export function setMetadata(path,title,description,{article=false,date,missing=false}={}){
 document.title=title;
 const meta=(key,value,property=false)=>{const attr=property?'property':'name';let el=document.head.querySelector(`meta[${attr}="${key}"]`);if(!el){el=document.createElement('meta');el.setAttribute(attr,key);document.head.append(el)}el.content=value;};
 meta('description',description);meta('og:title',title,true);meta('og:description',description,true);meta('og:type',article?'article':'website',true);meta('og:url',siteOrigin+path,true);meta('og:image',siteOrigin+'/assets/personal/jatto-portrait.png',true);meta('twitter:card','summary');meta('twitter:title',title);meta('twitter:description',description);meta('twitter:image',siteOrigin+'/assets/personal/jatto-portrait.png');
 if(article&&date)meta('article:published_time',date,true);
 let canonical=document.head.querySelector('link[rel="canonical"]');if(missing){canonical?.remove();meta('robots','noindex,nofollow');return;}
 if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}canonical.href=siteOrigin+path;
}
