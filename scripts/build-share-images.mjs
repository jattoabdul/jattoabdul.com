// Builds the 1200×630 share image (Open Graph / X card) for every page, essay and note.
// Output: public/og/<key>.jpg, where <key> comes from shareImageKey() in src/cinematic/seo.js.
// Rendered locally with headless Google Chrome, then compressed with sharp. Commit the results.
//   npm run build:share-images            # all images
//   npm run build:share-images -- --missing   # only images that do not exist yet
// Fonts: system Helvetica Neue (the brand web font licence does not yet cover social graphics, BL-E01).
import {mkdir, mkdtemp, readFile, rm, writeFile, access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import sharp from 'sharp';
import {pages, shareImageKey} from '../src/cinematic/seo.js';
import {signature} from '../src/cinematic/loader-data.js';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'public/og');
const onlyMissing = process.argv.includes('--missing');

spawnSync(process.execPath, ['scripts/prepare-content.mjs'], {cwd: root, stdio: 'ignore'});
const content = JSON.parse(await readFile(join(root, 'src/cinematic/content/published.json'), 'utf8'));
const portrait = 'data:image/png;base64,' + (await readFile(join(root, 'public/assets/personal/jatto-portrait.png'))).toString('base64');

// Page headlines echo each page's own arrival heading.
const headlines = {
  '/': ['Grow without', 'losing yourself.'],
  '/about': ['The lessons', 'behind my work.'],
  '/writing': ['Essays, poems,', 'and notes in progress.'],
  '/notes': ['Still thinking', 'it through.'],
  '/speaking': ['Some ideas come alive', 'in conversation.'],
  '/videos': ['Keep the', 'conversation going.'],
  '/mentoring': ['You don’t have to figure', 'it all out alone.'],
  '/building': ['Ideas become useful', 'when you build them.'],
  '/building/discova': ['Discova:', 'a calmer way to read.'],
  '/building/trustkarry': ['TrustKarry:', 'senders and travellers.'],
  '/press': ['Press', '& brand.'],
  '/contact': ['My door', 'is open.'],
  '/books/present-without-performing': ['Present Without Performing.', 'A book in progress.'],
};

const formatDate = d => new Intl.DateTimeFormat('en', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'}).format(new Date(d + 'T12:00:00Z'));
const items = [
  ...Object.keys(pages).map(path => ({path, lines: headlines[path] || [pages[path][0].split(/ [|·] /)[0], '']})),
  ...content.essays.map(e => ({path: '/writing/' + e.slug, lines: [e.title, ''], meta: 'Essay · ' + formatDate(e.date)})),
  ...content.notes.map(n => ({path: '/notes/' + n.slug, lines: [n.title, ''], meta: 'Note · ' + formatDate(n.date)})),
];

// Deterministic particle field drifting around the portrait.
function particles(seed) {
  let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) || 1;
  const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
  let dots = '';
  for (let i = 0; i < 340; i++) {
    const x = 950 + gauss() * 280, y = 330 + gauss() * 260, r = 0.8 + rand() * 2.2, o = 0.12 + rand() * 0.55;
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="#efc9a3" fill-opacity="${o.toFixed(2)}"/>`;
  }
  return `<svg class="field" width="1200" height="630" viewBox="0 0 1200 630">${dots}</svg>`;
}

const escape = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
function html({path, lines: [main, em], meta}) {
  const long = (main + em).length;
  const size = meta ? (long > 70 ? 42 : long > 40 ? 48 : 56) : long > 40 ? 52 : 62;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#080808}
body{position:relative;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#f4eee6}
.glow{position:absolute;right:-120px;top:40px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,#792a3d66 0%,#792a3d1f 38%,transparent 66%)}
.field{position:absolute;inset:0}
.portrait{position:absolute;right:0;bottom:0;height:500px}
.sig{position:absolute;left:72px;top:58px;width:170px;height:66px}
.sig svg{width:100%;height:100%;overflow:visible}
.sig .loader-signature__letter{animation:none!important;opacity:1!important}
h1{position:absolute;left:72px;top:${meta ? 190 : 205}px;width:560px;margin:0;font-weight:300;font-size:${size}px;line-height:1.06;letter-spacing:-.025em}
h1 em{display:block;font-style:normal;color:#efc9a3}
.meta{position:absolute;left:72px;bottom:118px;font-size:20px;color:#efc9a3}
.url{position:absolute;left:72px;bottom:60px;font-size:20px;letter-spacing:.01em;color:#b4aea9}
</style></head><body>
<div class="glow"></div>${particles(path)}<img class="portrait" src="${portrait}" alt="">
<div class="sig">${signature}</div>
<h1>${escape(main)}${em ? `<em>${escape(em)}</em>` : ''}</h1>
${meta ? `<div class="meta">${escape(meta)}</div>` : ''}
<div class="url">jattoabdul.com${path === '/' ? '' : escape(path)}</div>
</body></html>`;
}

await mkdir(outDir, {recursive: true});
const work = await mkdtemp(join(tmpdir(), 'share-images-'));
let built = 0;
try {
  for (const item of items) {
    const target = join(outDir, shareImageKey(item.path) + '.jpg');
    if (onlyMissing) { try { await access(target); continue; } catch {} }
    const page = join(work, 'page.html'), shot = join(work, 'shot.png');
    await writeFile(page, html(item));
    const run = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--screenshot=' + shot, 'file://' + page], {stdio: 'ignore'});
    if (run.status !== 0) throw Error('Chrome could not render ' + item.path + '. Set CHROME_PATH if Chrome lives elsewhere.');
    await sharp(shot).resize(1200, 630).jpeg({quality: 84, mozjpeg: true}).toFile(target);
    built++;
  }
} finally {
  await rm(work, {recursive: true, force: true});
}
console.log(`Share images: ${built} built, ${items.length} pages covered in public/og.`);
