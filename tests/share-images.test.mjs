import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {pages, shareImageKey} from '../src/cinematic/seo.js';

// Every indexable page, essay and note needs public/og/<key>.jpg.
// Fix a failure with: npm run build:share-images -- --missing
test('every published path has a share image', () => {
  const content = JSON.parse(readFileSync('src/cinematic/content/published.json', 'utf8'));
  const paths = [...Object.keys(pages), ...content.essays.map(e => '/writing/' + e.slug), ...content.notes.map(n => '/notes/' + n.slug)];
  const missing = paths.filter(path => !existsSync('public/og/' + shareImageKey(path) + '.jpg'));
  assert.deepEqual(missing, []);
});

test('share image keys are unique', () => {
  const keys = Object.keys(pages).map(shareImageKey);
  assert.equal(new Set(keys).size, keys.length);
});
