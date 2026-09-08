import {readdir,readFile,writeFile} from 'node:fs/promises';
import {parseWriting} from '../src/cinematic/content/parse-writing.js';
const base=new URL('../src/cinematic/content/',import.meta.url);
const archive=JSON.parse(await readFile(new URL('writing.json',base),'utf8'));
const data={medium:archive.medium,essays:[],notes:[]};
for(const collection of ['essays','notes'])for(const file of await readdir(new URL(collection+'/',base))){if(!file.endsWith('.md'))continue;const item=parseWriting(await readFile(new URL(collection+'/'+file,base),'utf8'),file);if(item.published!==false)data[collection].push(item)}
for(const collection of ['essays','notes'])data[collection].sort((a,b)=>b.date.localeCompare(a.date));
await writeFile(new URL('published.json',base),JSON.stringify(data));
const summary=entry=>Object.fromEntries(Object.entries(entry).filter(([key])=>key!=='body'));
const index={...data,essays:data.essays.map(summary),notes:data.notes.map(summary)};
await writeFile(new URL('published-index.json',base),JSON.stringify(index));
