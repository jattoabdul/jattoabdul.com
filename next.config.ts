import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 async headers(){return process.env.SEO_INDEXABLE==='true'?[]:[{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'}]}]},
};
export default nextConfig;
