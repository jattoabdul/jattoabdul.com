export default function robots(){return {rules:{userAgent:'*',...(process.env.SEO_INDEXABLE==='true'?{allow:'/'}:{disallow:'/'})},sitemap:'https://jattoabdul.com/sitemap.xml'}}
