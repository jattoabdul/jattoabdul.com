import {parse} from 'yaml';
export function parseWriting(raw,filename){
 const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
 if(!match)throw new Error(`Missing front matter: ${filename}`);
 const metadata=parse(match[1]);
 if(!metadata.title||!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date)||!metadata.slug||!Array.isArray(metadata.tags))throw new Error(`Invalid writing metadata: ${filename}`);
 return {...metadata,body:match[2].trim()};
}
