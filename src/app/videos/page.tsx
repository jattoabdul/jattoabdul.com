import {SpeakingPage} from '@/cinematic/SpeakingPage';
import {metadataFor} from '@/cinematic/metadata';
export const metadata=metadataFor('/videos');
export default function Page(){return <SpeakingPage archiveOnly/>}
