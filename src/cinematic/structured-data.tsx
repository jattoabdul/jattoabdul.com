import {siteOrigin} from './seo.js';

// Verified public surfaces (Command Center brand/public-surfaces.md and press-kit.md, 2026-09-13).
const sameAs=[
  'https://www.linkedin.com/in/jattoade/',
  'https://x.com/Jattorize',
  'https://github.com/jattoabdul',
  'https://www.youtube.com/@jatto_abdul',
  'https://www.instagram.com/jatto_abdul/',
  'https://www.threads.com/@jatto_abdul',
  'https://www.tiktok.com/@jatto_abdul',
  'https://www.facebook.com/jattoabdulq',
  'https://medium.com/@jattoabdul',
  'https://www.youtube.com/@LearnArabicWithJattoAbdul',
];

const personId=siteOrigin+'/#person';
const websiteId=siteOrigin+'/#website';

export const siteGraph={
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'Person',
      '@id':personId,
      name:'Jatto Abdul',
      alternateName:'Abdulqahhar Aminujatto',
      url:siteOrigin+'/',
      image:siteOrigin+'/assets/personal/jatto-portrait.png',
      description:'Jatto Abdul is an engineer and entrepreneur who mentors people on career, character, and faith, so they can grow without losing themselves.',
      jobTitle:['Software engineer','Entrepreneur','Mentor','Author'],
      worksFor:{'@type':'Organization',name:'JITS, Jatto IT Solutions Inc.',url:'https://jattosolutions.com'},
      email:'mailto:me@jattoabdul.com',
      sameAs,
    },
    {
      '@type':'WebSite',
      '@id':websiteId,
      url:siteOrigin+'/',
      name:'Jatto Abdul',
      inLanguage:'en',
      publisher:{'@id':personId},
    },
  ],
};

export function articleGraph(item:{title:string;date:string;slug:string;excerpt?:string},path:string){
  return {
    '@context':'https://schema.org',
    '@type':'BlogPosting',
    headline:item.title,
    ...(item.excerpt?{description:item.excerpt}:{}),
    datePublished:item.date,
    url:siteOrigin+path,
    mainEntityOfPage:siteOrigin+path,
    author:{'@id':personId},
    publisher:{'@id':personId},
    isPartOf:{'@id':websiteId},
    image:siteOrigin+'/assets/personal/jatto-portrait.png',
  };
}

// JSON.stringify does not escape "<", so guard against "</script>" in content.
export function JsonLd({data}:{data:unknown}){
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}
