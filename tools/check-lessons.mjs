// Checks the lessons (data/lessons/) before they go on the page:
//  - every example and exercise that cites the Summa (a `ref`) quotes it word for word from that paragraph
//    of tools/text/summa-1-10.json ("…" may stand for words left out; [highlights] and {targets} are ignored);
//  - every paradigm table marked `forms: true` holds only real forms, macrons and all, as the site's
//    morphology engine makes them (plus the few hand-checked forms listed below that it doesn't make);
//  - exercises are well formed: a choice's answer is one of its options, a click-the-words sentence has
//    words to find, a matching exercise has distinct answers, a typed one has an answer;
//  - the markup is balanced and every {{lesson}} link names a lesson.
//
//   node tools/check-lessons.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { readLexicon } from './build-vocab.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const { LESSONS } = await import(pathToFileURL(path.join(ROOT, 'data', 'lessons', 'index.js')).href);
const M = await import(pathToFileURL(path.join(ROOT, 'js', 'morphology.js')).href);

// The Summa's text isn't in the repository (see README); without it, the quotations go unchecked.
const TEXT = path.join(HERE, 'text', 'summa-1-10.json');
const paragraphs = fs.existsSync(TEXT) ? new Map(JSON.parse(fs.readFileSync(TEXT, 'utf8')).map(p => [p.ref, p.text])) : null;
if (!paragraphs) console.log('tools/text/summa-1-10.json is missing (see README), so the quotations are not checked.');
const problems = [];
const problem = (lesson, where, msg) => problems.push(`${lesson.id} · ${where}: ${msg}`);

// ---- Every form the engine can make, with macrons ----
const forms = new Set();
const leaves = v => {
  if (v == null) return;
  if (typeof v === 'string') { v.split('/').forEach(f => f.trim() && forms.add(f.trim())); return; }
  if (Array.isArray(v)) { v.forEach(leaves); return; }
  if (typeof v === 'object') Object.values(v).forEach(leaves);
};
const EXTRA_VERBS = [
  { latin: 'volō', principal_parts: 'velle, voluī, ——', conjugation: 'irregular' },
  { latin: 'nōlō', principal_parts: 'nōlle, nōluī, ——', conjugation: 'irregular' },
  { latin: 'eō', principal_parts: 'īre, iī, itum', conjugation: 'irregular' },
  { latin: 'ferō', principal_parts: 'ferre, tulī, lātum', conjugation: 'irregular' },
  { latin: 'fīō', principal_parts: 'fierī, factus sum', conjugation: 'irregular' },
  { latin: 'sum', principal_parts: 'esse, fuī, futūrus', conjugation: 'irregular' },
  { latin: 'possum', principal_parts: 'posse, potuī, ——', conjugation: 'irregular' },
].map(e => ({ ...e, pos: 'Verb' }));
const lexicon = readLexicon().map(x => x.entry);
for (const entry of [...lexicon, ...EXTRA_VERBS]) {
  try {
    if (entry.pos === 'Noun') leaves(M.declineNoun(entry));
    if (entry.pos === 'Adjective') {
      leaves(M.declineAdjective(entry));
      const compared = M.comparisonOf(entry);
      leaves(compared);
      // the comparative declined in full (perfectior, perfectiōris…) and the superlative as an -us, -a, -um adjective
      if (compared && typeof compared.comparative[0] === 'string') leaves(M.declineComparative(...compared.comparative));
      if (compared && compared.superlative) ['us', 'a', 'um', 'ī', 'ae', 'ō', 'am', 'ā', 'ōrum', 'ārum', 'īs', 'ōs', 'ās'].forEach(e => forms.add(compared.superlative.slice(0, -2) + e));
    }
    if (entry.pos === 'Pronoun') leaves(M.declinePronoun(entry));
    if (entry.pos === 'Verb') {
      for (const mood of ['ind', 'subj']) for (const voice of ['act', 'pass']) for (const tense of ['pres', 'impf', 'fut', 'perf', 'plup', 'futperf']) {
        try { leaves(M.conjugateVerb(entry, tense, voice, mood)); } catch (e) { /* none */ }
      }
      leaves(M.declineParticiple(entry));
      leaves(M.gerundOf(entry));
      // the perfect passive and future active participles, and the gerundive, as -us, -a, -um adjectives
      const [inf, perfect, supine] = (entry.principal_parts || '').replace(/\s*\(?\+.*$/, '').split(',').map(s => s.trim());
      // the perfect active infinitive: mōvī -> mōvisse
      if (perfect && perfect.endsWith('ī')) forms.add(perfect.slice(0, -1) + 'isse');
      const ENDINGS = ['us', 'a', 'um', 'ī', 'ae', 'ō', 'am', 'ā', 'ōrum', 'ārum', 'īs', 'ōs', 'ās'];
      if (supine && supine.endsWith('um')) {
        const stem = supine.slice(0, -2);
        ENDINGS.forEach(e => { forms.add(stem + e); forms.add(stem + 'ūr' + e); });
      }
      const g = M.gerundOf(entry);
      if (g) ENDINGS.forEach(e => forms.add(g.gen.slice(0, -1) + e));
      if (inf) {
        forms.add(inf);
        // the present passive infinitive: amāre -> amārī, movēre -> movērī, audīre -> audīrī; dīcere -> dīcī
        if (!entry.deponent && /(āre|ēre|īre)$/.test(inf)) forms.add(inf.slice(0, -1) + 'ī');
        else if (!entry.deponent && /ere$/.test(inf)) forms.add(inf.slice(0, -3) + 'ī');
      }
    }
  } catch (e) { /* an entry the engine doesn't chart */ }
  entry.latin.split(',').forEach(f => forms.add(f.replace(/\s*\(?\+.*$/, '').trim()));
  if (entry.principal_parts) entry.principal_parts.replace(/\s*\(?\+.*$/, '').split(',').forEach(f => forms.add(f.trim()));
}
// Forms the engine doesn't make, checked by hand against the textbooks' appendices.
const HAND_CHECKED = `
  ego meī mihi mē nōs nostrum nostrī nōbīs tū tuī tibi tē vōs vestrum vestrī vōbīs suī sibi sē sēsē
  quis quid cūius cui quem quō quibus quī quae quod quōrum quārum quōs quās quā
  aliquis aliquid alicūius alicui aliquem aliquō aliquī aliqua aliquod aliquam aliquā aliquae aliquōrum aliquārum aliquibus aliquōs aliquās
  quīdam quaedam quoddam quiddam cūiusdam cuidam quendam quandam quōdam quādam quīdam quōrundam quārundam quibusdam quōsdam quāsdam
  nēmō nihil nūllīus nūllī ūnīus ūnī tōtīus tōtī alterīus alterī alius aliud aliī sōlīus sōlī
  suprēmus postrēmus
  fīam fīās fīat fīāmus fīātis fīant fierem fierēs fieret fierēmus fierētis fierent
`.trim().split(/\s+/);
HAND_CHECKED.forEach(f => forms.add(f));

// The Latin in a table cell: words, minus notes in parentheses and the dashes for "no form".
const cellWords = text => text.replace(/\(.*?\)/g, ' ').replace(/\*\*|\*|\[|\]/g, '').split(/[\s,/;]+/).map(w => w.trim()).filter(w => w && !/^[—–-]+$/.test(w));

// ---- Macrons in the lessons' own Latin ----
// The lessons write their own Latin (inside *…*, in the Latin columns of tables, in typed answers) with
// macrons, which must agree with the vocabulary and the engine wherever those make the word. Quotations of
// the Summa (`ex`, `la`) are printed without macrons and are not checked here. Endings (*-a*, *-um*), single
// letters and Roman numerals are skipped, and a few words are written this way on purpose: *quatuor* as the
// Leonine text prints it, and the adverb *hīc*, "here", which the vocabulary (with only the pronoun *hic*) lacks.
const AS_PRINTED = new Set(['quatuor', 'hīc']);
const bare = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const spellings = new Map();
for (const f of forms) for (const w of f.split(/\s+/)) {
  if (!w) continue;
  const key = bare(w);
  if (!spellings.has(key)) spellings.set(key, new Set());
  spellings.get(key).add(w.normalize('NFC').toLowerCase());
}
function checkMacrons(lesson, where, latin) {
  for (const [, dash, w] of String(latin).matchAll(/(-?)(\p{L}+)/gu)) {
    if (dash || w.length < 2 || /^[IVXLCDM]+$/.test(w)) continue;
    const written = w.normalize('NFC').toLowerCase();
    const known = spellings.get(bare(w));
    if (known && !known.has(written) && !AS_PRINTED.has(written)) problem(lesson, where, `"${w}": the vocabulary writes ${[...known].join(' or ')}`);
  }
}
// The Latin of a piece of lesson text: what its *…* marks.
const latinOf = text => [...String(text ?? '').replace(/\*\*/g, '').matchAll(/\*([^*]+)\*/g)].map(m => m[1]).join(' ');

// ---- Quotations ----
const squash = s => s.replace(/\s+/g, ' ').trim();
function checkQuote(lesson, where, latin, ref) {
  if (!paragraphs) return;
  const text = paragraphs.get(ref);
  if (!text) { problem(lesson, where, `no paragraph "${ref}"`); return; }
  const bare = squash(latin.replace(/[[\]{}]/g, ''));
  let from = 0;
  for (const piece of bare.split('…').map(squash).filter(Boolean)) {
    const at = squash(text).indexOf(piece, from);
    if (at < 0) { problem(lesson, where, `not in ${ref}: "${piece}"`); return; }
    from = at + piece.length;
  }
}

// ---- Markup ----
const ids = new Set(LESSONS.map(l => l.id));
function checkMarkup(lesson, where, text) {
  if (text == null) return;
  const s = String(text);
  const singles = s.replace(/\*\*/g, '').split('*').length - 1;
  if ((s.split('**').length - 1) % 2) problem(lesson, where, `unbalanced ** in "${s.slice(0, 60)}"`);
  if (singles % 2) problem(lesson, where, `unbalanced * in "${s.slice(0, 60)}"`);
  if ((s.match(/\[/g) || []).length !== (s.match(/\]/g) || []).length) problem(lesson, where, `unbalanced [ ] in "${s.slice(0, 60)}"`);
  for (const m of s.matchAll(/\{\{([a-z0-9-]+)\}\}/g)) if (!ids.has(m[1])) problem(lesson, where, `link to unknown lesson ${m[1]}`);
}

// ---- The lessons ----
const seen = new Set();
let examples = 0, quoted = 0, exercises = 0;
const byType = {};
for (const lesson of LESSONS) {
  if (seen.has(lesson.id)) problem(lesson, 'id', 'repeated');
  seen.add(lesson.id);
  for (const field of ['id', 'title', 'summary', 'sections', 'practice']) if (!lesson[field]) problem(lesson, 'lesson', `no ${field}`);
  [lesson.title, lesson.summary, lesson.intro].forEach(t => { checkMarkup(lesson, 'heading', t); checkMacrons(lesson, 'heading', latinOf(t)); });
  lesson.sections.forEach((section, si) => {
    const where = `section ${si + 1}`;
    checkMarkup(lesson, where, section.h);
    checkMacrons(lesson, where, latinOf(section.h));
    for (const block of section.blocks) {
      if (typeof block === 'string') { checkMarkup(lesson, where, block); checkMacrons(lesson, where, latinOf(block)); continue; }
      ['p', 'tip', 'ex', 'en', 'note', 'caption'].forEach(k => checkMarkup(lesson, where, block[k]));
      ['p', 'tip', 'en', 'note', 'caption'].forEach(k => checkMacrons(lesson, where, latinOf(block[k])));
      (block.ul || []).forEach(t => { checkMarkup(lesson, where, t); checkMacrons(lesson, where, latinOf(t)); });
      if (block.ex) {
        examples++;
        if (!block.en) problem(lesson, where, `example without English: ${block.ex.slice(0, 50)}`);
        if (block.ref) { quoted++; checkQuote(lesson, where, block.ex, block.ref); }
      }
      if (block.table) {
        const width = block.table[0].length;
        const latinColumns = new Set(block.latin ?? block.table[0].map((_, i) => i).slice(1));
        block.table.forEach((row, ri) => {
          if (typeof row === 'string') { checkMarkup(lesson, where, row); return; }
          if (row.length !== width) problem(lesson, where, `table row ${ri} has ${row.length} cells, not ${width}`);
          row.forEach((c, i) => {
            checkMarkup(lesson, where, c);
            checkMacrons(lesson, where, ri > 0 && latinColumns.has(i) ? cellWords(c).join(' ') : latinOf(c));
          });
        });
        if (block.forms) {
          const latinCols = new Set(block.latin ?? block.table[0].map((_, i) => i).slice(1));
          block.table.slice(1).forEach(row => {
            if (typeof row === 'string') return;
            row.forEach((c, i) => {
              if (!latinCols.has(i)) return;
              for (const w of cellWords(c)) if (!forms.has(w)) problem(lesson, where, `table form "${w}" is not one the engine makes`);
            });
          });
        }
      }
    }
  });
  lesson.practice.forEach((x, i) => {
    const where = `practice ${i + 1} (${x.type})`;
    exercises++;
    byType[x.type] = (byType[x.type] || 0) + 1;
    ['q', 'la', 'why', 'model'].forEach(k => checkMarkup(lesson, where, x[k]));
    ['q', 'why', 'model'].forEach(k => checkMacrons(lesson, where, latinOf(x[k])));
    (x.options || []).forEach(o => checkMacrons(lesson, where, latinOf(o)));
    (x.pairs || []).forEach(p => p.forEach(t => checkMacrons(lesson, where, latinOf(t))));
    if (x.type === 'typed' && !x.english) x.answers.forEach(a => checkMacrons(lesson, where, a));
    if (x.type !== 'translate' && !x.q) problem(lesson, where, 'no question');
    if (x.la && x.ref) checkQuote(lesson, where, x.la, x.ref);
    switch (x.type) {
      case 'choice':
        if (!Array.isArray(x.options) || x.options.length < 2) problem(lesson, where, 'needs two or more options');
        else {
          if (!(x.answer >= 0 && x.answer < x.options.length)) problem(lesson, where, 'answer is not an option');
          if (new Set(x.options).size !== x.options.length) problem(lesson, where, 'repeated option');
          x.options.forEach(o => checkMarkup(lesson, where, o));
        }
        if (!x.why) problem(lesson, where, 'no explanation');
        break;
      case 'typed':
        if (!x.answers || !x.answers.length) problem(lesson, where, 'no answers');
        break;
      case 'pick': {
        const targets = [...(x.la || '').matchAll(/\{([^}]+)\}/g)].map(m => m[1]);
        if (!targets.length) problem(lesson, where, 'no {words} to find');
        targets.forEach(t => { if (/[^\p{L}]/u.test(t)) problem(lesson, where, `{${t}} is not a single word`); });
        break;
      }
      case 'match':
        if (!x.pairs || x.pairs.length < 2) problem(lesson, where, 'needs two or more pairs');
        else {
          if (new Set(x.pairs.map(p => p[1])).size !== x.pairs.length) problem(lesson, where, 'two pairs share an answer');
          if (new Set(x.pairs.map(p => p[0])).size !== x.pairs.length) problem(lesson, where, 'two pairs share a left side');
          x.pairs.forEach(p => p.forEach(t => checkMarkup(lesson, where, t)));
        }
        break;
      case 'translate':
        if (!x.la || !x.model) problem(lesson, where, 'needs Latin and a model translation');
        break;
      default: problem(lesson, where, `unknown type ${x.type}`);
    }
  });
}

console.log(`${LESSONS.length} lessons, ${examples} examples (${quoted} quoted from the Summa), ${exercises} exercises: ${Object.entries(byType).map(([t, n]) => `${n} ${t}`).join(', ')}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n` + problems.map(p => `  ${p}`).join('\n'));
  process.exitCode = 1;
} else console.log('No problems found.');
