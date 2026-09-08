import {publishedPaths} from '@/cinematic/metadata';
export default function sitemap(){return publishedPaths.map(path=>({url:'https://jattoabdul.com'+path}))}
