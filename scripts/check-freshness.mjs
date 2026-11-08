// Lists site claims that are due for a check. Reads src/data/freshness.json.
//   npm run check:freshness              # report; always exits 0
//   npm run check:freshness -- --markdown   # report as Markdown (used by the monthly issue)
//   npm run check:freshness -- --strict     # exit 1 when anything is due
import {readFile, access} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {pages, shareImageKey} from '../src/cinematic/seo.js';
import {marketingSeries} from '../src/cinematic/content/series.js';

const root = resolve(import.meta.dirname, '..');
const markdown = process.argv.includes('--markdown');
const strict = process.argv.includes('--strict');
const today = new Date(process.env.FRESHNESS_TODAY || Date.now());
const daysSince = date => Math.floor((today - new Date(date + 'T12:00:00Z')) / 864e5);

const {claims} = JSON.parse(await readFile(join(root, 'src/data/freshness.json'), 'utf8'));
spawnSync(process.execPath, ['scripts/prepare-content.mjs'], {cwd: root, stdio: 'ignore'});
const content = JSON.parse(await readFile(join(root, 'src/cinematic/content/published.json'), 'utf8'));

async function missingShareImages() {
  const paths = [...Object.keys(pages), ...content.essays.map(e => '/writing/' + e.slug), ...content.notes.map(n => '/notes/' + n.slug)];
  const missing = [];
  for (const path of paths) {
    try { await access(join(root, 'public/og', shareImageKey(path) + '.jpg')); } catch { missing.push(path); }
  }
  return missing;
}

const rows = [];
for (const c of claims) {
  if (c.source === 'share-images') {
    const missing = await missingShareImages();
    rows.push({...c, due: missing.length > 0, age: null, note: missing.length ? 'Missing: ' + missing.join(', ') : 'All present'});
    continue;
  }
  const verifiedAt = c.source === 'series' ? marketingSeries.verifiedAt : c.verifiedAt;
  const age = daysSince(verifiedAt);
  const extra = c.source === 'series' ? ` (${marketingSeries.episodes.length} of ${marketingSeries.total} days listed)` : '';
  rows.push({...c, verifiedAt, age, due: age > c.maxAgeDays, note: `Checked ${verifiedAt}, ${age} days ago${extra}`});
}

const latest = [...content.essays, ...content.notes].map(i => i.date).sort().at(-1);
const quiet = latest ? daysSince(latest) : null;
const due = rows.filter(r => r.due);

if (markdown) {
  console.log(`Freshness check for ${today.toISOString().slice(0, 10)}. ${due.length ? `${due.length} item(s) to confirm.` : 'Nothing is overdue.'}\n`);
  for (const r of [...due, ...rows.filter(r => !r.due)])
    console.log(`- [${r.due ? ' ' : 'x'}] **${r.id}**: ${r.claim}  \n  ${r.note}. Where: \`${r.where}\``);
  if (quiet !== null) console.log(`\nLatest essay or note: ${latest} (${quiet} days ago).`);
  console.log('\nTo close: confirm each unchecked claim, update the page if needed, set its `verifiedAt` in `src/data/freshness.json`, and deploy.');
} else {
  for (const r of rows) console.log(`${r.due ? 'DUE ' : 'ok  '} ${r.id.padEnd(20)} ${r.note}`);
  if (quiet !== null) console.log(`info latest writing        ${latest} (${quiet} days ago)`);
  console.log(due.length ? `\n${due.length} item(s) due. Confirm them and update verifiedAt in src/data/freshness.json.` : '\nNothing is overdue.');
}
if (strict && due.length) process.exit(1);
