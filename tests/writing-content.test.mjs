import test from 'node:test';
import assert from 'node:assert/strict';
import {readdir,readFile} from 'node:fs/promises';
import {parseWriting} from '../src/cinematic/content/parse-writing.js';
test('local Markdown archive has valid unique URLs and readable bodies',async()=>{
 let count=0;for(const kind of ['essays','notes']){const seen=new Set();for(const name of await readdir(new URL('../src/cinematic/content/'+kind+'/',import.meta.url))){if(!name.endsWith('.md'))continue;const item=parseWriting(await readFile(new URL('../src/cinematic/content/'+kind+'/'+name,import.meta.url),'utf8'),name);assert.equal(name,item.slug+'.md');assert.ok(!seen.has(item.slug));seen.add(item.slug);assert.ok(item.body.length>0);assert.equal(item.body.includes('—'),false);count++}}assert.ok(count>=39);
});
test('Markdown metadata rejects missing fields instead of producing broken routes',()=>{assert.throws(()=>parseWriting('hello','bad.md'));assert.throws(()=>parseWriting('---\ntitle: Missing route\n---\nBody','bad.md'))});
