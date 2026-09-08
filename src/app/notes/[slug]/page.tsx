import {notFound} from 'next/navigation';
import ReadingArticle from '@/cinematic/ReadingArticle';
import {entryFor,metadataFor,publishedPaths} from '@/cinematic/metadata';
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return publishedPaths.filter(p=>p.startsWith('/notes/')).map(p=>({slug:p.split('/').pop()!}))}
export async function generateMetadata({params}:Props){return metadataFor('/notes/'+(await params).slug)}
export default async function Page({params}:Props){const item=entryFor('/notes/'+(await params).slug);if(!item)notFound();return <ReadingArticle item={item} isNote={true}/>}
