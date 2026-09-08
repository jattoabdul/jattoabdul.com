import {notFound} from 'next/navigation';
import ReadingArticle from '@/cinematic/ReadingArticle';
import {entryFor,metadataFor,publishedPaths} from '@/cinematic/metadata';
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return publishedPaths.filter(p=>p.startsWith('/writing/')).map(p=>({slug:p.split('/').pop()!}))}
export async function generateMetadata({params}:Props){return metadataFor('/writing/'+(await params).slug)}
export default async function Page({params}:Props){const item=entryFor('/writing/'+(await params).slug);if(!item)notFound();return <ReadingArticle item={item} isNote={false}/>}
