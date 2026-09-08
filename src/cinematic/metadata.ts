import type {Metadata} from 'next';
import {pages,siteOrigin} from './seo.js';
import content from './content/published.json';
type Entry={slug:string;title:string;date:string;body:string;excerpt?:string};
export function entryFor(path:string):Entry|undefined{const [collection,slug]=path.slice(1).split('/');return (collection==='notes'?content.notes:collection==='writing'?content.essays:[]).find(item=>item.slug===slug)}
export function metadataFor(path:string):Metadata{const entry=entryFor(path);const page=(pages as Record<string,string[]>)[path];const title=entry?entry.title+' | Jatto Abdul':page?.[0];const description=entry?(entry.excerpt||entry.body.replace(/[#*_`]/g,'').replace(/\s+/g,' ').slice(0,157)):page?.[1];return {title:{absolute:title||'Page not found | Jatto Abdul'},description,alternates:{canonical:path},openGraph:{title,description,url:siteOrigin+path,type:entry?'article':'website',...(entry?{publishedTime:entry.date}:{}),images:[{url:'/assets/personal/jatto-portrait.png',width:800,height:800}]},twitter:{card:'summary',title,description,images:['/assets/personal/jatto-portrait.png']}}}
export const publishedPaths=[...Object.keys(pages),...content.essays.map(p=>'/writing/'+p.slug),...content.notes.map(p=>'/notes/'+p.slug)];
