import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const [kind,slug,date,...words]=process.argv.slice(2);
if(!['note','essay'].includes(kind)||!slug?.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)||!date?.match(/^\d{4}-\d{2}-\d{2}$/)||!words.length){console.error('Usage: npm run new:writing -- note|essay slug YYYY-MM-DD "Title"');process.exit(1)}
const dir=resolve('src/cinematic/content',kind==='note'?'notes':'essays');await mkdir(dir,{recursive:true});const path=resolve(dir,slug+'.md');
const metadata={slug,title:words.join(' '),date,tags:[],published:false};
const front=Object.entries(metadata).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n');
await writeFile(path,`---\n${front}\n---\n\n<!-- Begin with one real moment, what you noticed, and the lesson you are carrying forward. Remove this comment when ready. -->\n`,{flag:'wx'});
console.log(`Draft created: ${path}\nSet published: true after reviewing the content and date.`);
