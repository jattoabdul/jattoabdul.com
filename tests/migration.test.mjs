import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pages,redirects} from '../src/cinematic/seo.js';
const base=process.env.MIGRATION_URL||'http://127.0.0.1:3015';
const content=JSON.parse(await readFile(new URL('../src/cinematic/content/published.json',import.meta.url)));
const entries=[...content.essays.map(p=>({...p,path:'/writing/'+p.slug})),...content.notes.map(p=>({...p,path:'/notes/'+p.slug}))];
const paths=[...Object.keys(pages),...entries.map(p=>p.path)];
const bodyOnly=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
test('every published route returns prerendered headings, canonical and preview protection',async()=>{
 for(const path of paths){const r=await fetch(base+path);assert.equal(r.status,200,path);const html=bodyOnly(await r.text());assert.match(html,/<h1\b/,path);assert.ok(html.includes('https://jattoabdul.com'+path),path);assert.match(r.headers.get('x-robots-tag')||'',/noindex/,path);assert.equal((html.match(/rel="canonical"/g)||[]).length,1,path);const e=entries.find(e=>e.path===path);if(e){assert.match(html,/class="w-prose"/);assert.ok(html.includes('<p>'),path)}}
});
test('all live URLs are preserved or redirected, retaining query before fragment',async()=>{
 const xml=await readFile(new URL('../docs/migration/live-sitemap-2026-09-07.xml',import.meta.url),'utf8');
 for(const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)){const path=new URL(match[1]).pathname;assert.ok(paths.includes(path)||redirects[path],path)}
 for(const [path,dest] of Object.entries(redirects)){const r=await fetch(base+path+'?from=archive',{redirect:'manual'});assert.equal(r.status,308);const got=new URL(r.headers.get('location'),base);const want=new URL(dest,base);want.search='?from=archive';assert.equal(got.href,want.href)}
});
test('missing and unpublished content returns 404',async()=>{for(const path of ['/missing-page','/notes/does-not-exist','/writing/ai-workflows','/projects/not-real'])assert.equal((await fetch(base+path)).status,404,path)});
test('sitemap, robots, RSS and integration validation',async()=>{
 const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert.equal((sitemap.match(/<loc>/g)||[]).length,paths.length);for(const path of paths)assert.ok(sitemap.includes('https://jattoabdul.com'+path));assert.ok(!sitemap.includes('/projects'));
 assert.match(await(await fetch(base+'/robots.txt')).text(),/Disallow: \/\s/);
 assert.match(await(await fetch(base+'/rss.xml')).text(),/recognising-myself-in-the-work/);
 assert.equal((await fetch(base+'/api/health')).status,200);
 assert.equal((await fetch(base+'/api/subscribe',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'invalid'})})).status,400);
});
