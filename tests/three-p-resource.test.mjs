import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {parseWriting} from '../src/cinematic/content/parse-writing.js';

const name = 'people-problem-pay.md';
const source = new URL('../src/cinematic/content/essays/' + name, import.meta.url);
const downloadPath = '/downloads/three-p-decision-check-v2.pdf';
const approvedPdfHash = '44ba35d16ed547dde321416d6b7b673fb9fd604f26a34ab4f19f8c170776adb6';

test('Three-P companion links the approved fillable PDF from the public directory', async () => {
  const post = parseWriting(await readFile(source, 'utf8'), name);
  const pdf = new URL('../public' + downloadPath, import.meta.url);
  const bytes = await readFile(pdf);
  assert.equal(post.slug, 'people-problem-pay');
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), approvedPdfHash);
  assert.ok((await stat(pdf)).size < 100_000);
  assert.equal(post.body.split('](' + downloadPath + ')').length - 1, 2);
  assert.ok(post.body.indexOf(downloadPath) < post.body.indexOf('## People:'));
});

test('Three-P companion uses approved interview wording and no publication placeholders', async () => {
  const post = parseWriting(await readFile(source, 'utf8'), name);
  assert.ok(post.body.includes('Who would I work with most closely, and how does the team work together?'));
  assert.ok(post.body.includes('Did you feel listened to?'));
  assert.ok(post.body.includes('That tutor is an example.'));
  assert.equal(/recent team disagreement|APPROVED PUBLIC|TODO|\[PLACEHOLDER\]|—|\/Users\//.test(post.body), false);
  assert.equal(/youtu\.be|youtube\.com\/watch/.test(post.body), false);
});
