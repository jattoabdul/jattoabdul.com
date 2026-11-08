import type {NextConfig} from 'next';
import {initOpenNextCloudflareForDev} from '@opennextjs/cloudflare';
if(process.env.NEWSLETTER_LOCAL_BINDINGS==='true')void initOpenNextCloudflareForDev();
const nextConfig:NextConfig={
 async headers(){return process.env.SEO_INDEXABLE==='true'?[]:[{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'}]}]},
};
export default nextConfig;
