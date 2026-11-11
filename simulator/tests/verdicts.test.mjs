// v3.1.1: the plain-language glossary of the optimiser's verdict column.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VERDICTS, VERDICT_TERMS, shortLabel, overLabel, missLabel, verdictGlossaryHtml } from '../src/ui/verdicts.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');

test('every verdict has a label, a badge style, a plain explanation and what to do about it', () => {
  const ids = Object.keys(VERDICTS);
  assert.deepEqual(ids, ['pass', 'marginal', 'needle', 'equipment', 'cycle', 'narrow', 'short', 'over', 'both', 'partial', 'pending', 'unfinished']);
  const labels = new Set();
  for (const id of ids) {
    const v = VERDICTS[id];
    assert.ok(['ok-badge', 'mid-badge', 'no-badge'].includes(v.cls), `${id}: badge style`);
    assert.ok(css.includes(`.${v.cls}`), `${id}: the style exists`);
    assert.ok(v.label && !labels.has(v.label), `${id}: a label of its own`);
    labels.add(v.label);
    assert.ok(v.plain.length >= 20 && v.plain.endsWith('。'), `${id}: explanation`);
    assert.ok(v.todo.length >= 8 && v.todo.endsWith('。'), `${id}: what to do`);
  }
  // Only a checked pass is green; a marginal pass is hollow; everything else is a miss.
  assert.equal(VERDICTS.pass.cls, 'ok-badge');
  assert.equal(VERDICTS.marginal.cls, 'mid-badge');
  for (const id of ids.slice(2)) assert.equal(VERDICTS[id].cls, 'no-badge', id);
});

test('the two verdicts with a number are written the same way in the table and in the glossary', () => {
  assert.equal(shortLabel('2.5'), '覆蓋差 2.5%');
  assert.equal(overLabel('0.4'), '溢膠超 0.4 mm');
  assert.equal(missLabel('2.5', ''), '覆蓋差 2.5%');
  assert.equal(missLabel('', '0.4'), '溢膠超 0.4 mm');
  assert.equal(missLabel('2.5', '0.4'), '覆蓋差 2.5%・溢膠超 0.4 mm');
  assert.equal(missLabel('', ''), '');
  assert.equal(VERDICTS.short.label, shortLabel('x'));
  assert.equal(VERDICTS.over.label, overLabel('x'));
  assert.equal(VERDICTS.both.label, missLabel('x', 'x'));
});

test('the table takes every verdict from the list: no badge text of its own', () => {
  const from = main.indexOf('const rowVerdict = (x) => {');
  const to = main.indexOf('const knobCell = (x) => {');
  assert.ok(from > 0 && to > from);
  const body = main.slice(from, to);
  // Every verdict the page gives is one of the list.
  const used = [...body.matchAll(/verdict\(\s*(?:text \? )?'(\w+)'(?: : '(\w+)')?/g)].flatMap((m) => [m[1], m[2]].filter(Boolean));
  assert.ok(used.length >= 9, `found ${used.length}`);
  for (const id of used) assert.ok(VERDICTS[id], `${id} is explained`);
  // The numbered ones go through missLabel (short, over or both); the rest are named directly.
  for (const id of Object.keys(VERDICTS).filter((k) => !['over', 'both'].includes(k))) assert.ok(used.includes(id), `${id} is given by the table`);
  assert.match(body, /missLabel\(/);
  // No verdict is written out in the table code any more.
  assert.doesNotMatch(body, /badge\('(?:ok|mid|no)-badge'/);
  for (const v of Object.values(VERDICTS)) if (!/x/.test(v.label)) assert.ok(!body.includes(`'${v.label}'`), `${v.label} is not repeated`);
});

test('the glossary lists the terms first, then every verdict with its badge', () => {
  const html = verdictGlossaryHtml();
  assert.match(html, /^<details class="verdict-glossary" id="verdict-glossary" open>/);
  assert.doesNotMatch(verdictGlossaryHtml(false), /<details[^>]* open/);
  assert.match(html, /判定名詞解釋/);
  assert.equal(VERDICT_TERMS.length, 4);
  let at = 0;
  for (const t of VERDICT_TERMS) {
    const i = html.indexOf(`<dt>${t.term}</dt>`);
    assert.ok(i > at, `${t.term} in order`);
    at = i;
  }
  for (const [id, v] of Object.entries(VERDICTS)) {
    const i = html.indexOf(`data-verdict="${id}"`);
    assert.ok(i > at, `${id} in order, after the terms`);
    at = i;
    assert.ok(html.includes(`<span class="${v.cls}">${v.label}</span>`), `${id}: badge`);
    assert.ok(html.includes(v.plain) && html.includes(v.todo), `${id}: text`);
  }
  assert.equal((html.match(/class="vg-item"/g) || []).length, Object.keys(VERDICTS).length);
  // It is the last thing in the optimiser dialog.
  assert.match(main, /\$\{verdictGlossaryHtml\(S\.optGlossaryOpen !== false\)\}`;/);
});

test('the explanations use everyday words: no symbols or jargon left unexplained', () => {
  const text = [...Object.values(VERDICTS).flatMap((v) => [v.plain, v.todo]), ...VERDICT_TERMS.map((t) => t.plain)].join('\n');
  for (const word of ['標稱', '漂移', '魯棒', 'robust', '≥', '≤', 'fCov', '可行窗口']) assert.ok(!text.includes(word), `${word} is not used`);
  // Words the verdicts lean on are explained in the terms above them.
  const terms = VERDICT_TERMS.map((t) => t.term).join(' ');
  for (const word of ['窗口', '容差', '複核', '網格']) assert.ok(terms.includes(word), `${word} is explained`);
});
