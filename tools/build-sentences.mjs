// Builds data/sentences.js from the annotated sentences in tools/sentences/q*.txt, and checks them:
// every sentence must be in the Leonine text word for word (in the paragraph its "@" line names), the
// tokens must spell out exactly its words, and each tagged noun, verb and adjective must have the form
// the morphology engine gives its dictionary word for that case, number, person, tense and mood.
//
//   node tools/build-sentences.mjs
//
// File format (one block per sentence, blocks separated by blank lines):
//   = Secundo, utrum sit scientia.          the Latin, as in the text (a final ; may be written .)
//   @ I q. 1 pr.                            the paragraph it comes from
//   > Second, whether it is a science.      the model translation
//   ! A note on the grammar (optional; shown with the model translation)
//   word | p | morphology | usage[,other accepted usages] | dictionary word | extra
// with p = n (noun), pn (pronoun), v (verb), vinf (infinitive), adj, adv, conj, prep, punct, and
//   n     case number gender     e.g. nom sg f           lemma = the lexicon headword
//   pn    case number            and, for a relative pronoun, extra = ant=word (its antecedent)
//   v     person number tense mood   e.g. 3 sg pres subj (a two-word form like "dictum est" is one token)
//   vinf  tense voice            e.g. pres pass
//   adj   →word (the noun it agrees with; →- if used alone)
// A target word that occurs twice is written word#2. A lemma starting with ~ is not checked
// (dicendum, with est understood).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readLexicon } from './build-vocab.mjs';
import { plainForm } from './lexicon.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const M = await import(path.join(ROOT, 'js', 'morphology.js'));
const { makeLexicon } = await import('./lexicon.mjs');
const { formsOf } = await makeLexicon(path.join(ROOT, 'js', 'morphology.js'));

const PARAGRAPHS = JSON.parse(fs.readFileSync(path.join(HERE, 'text', 'summa-1-10.json'), 'utf8'));
const LEXICON = readLexicon().map(x => ({ ...x.entry, forms: x.forms, notForms: x.notForms }));
const byHead = new Map();
for (const e of LEXICON) {
  const head = plainForm(e.latin.split(/[,+]/)[0].trim());
  if (!byHead.has(head)) byHead.set(head, []);
  byHead.get(head).push(e);
}

const PART_NAMES = { 'pr.': 'prologue', 'co.': 'corpus', 's. c.': 'sed contra', 's. c. 1': 'sed contra 1', 's. c. 2': 'sed contra 2', 'ad arg.': 'reply to the objections' };
function sourceOf(ref) {
  const m = /^I q\. (\d+)(?: a\. (\d+))? (.+)$/.exec(ref);
  const part = PART_NAMES[m[3]] || m[3].replace(/^arg\. (\d+)$/, 'objection $1').replace(/^ad (\d+)$/, 'reply to objection $1');
  return `I, q. ${m[1]}${m[2] ? `, a. ${m[2]}` : ''}, ${part}`;
}

const words = s => plainForm(s).match(/[a-z]+/g) || [];
const problems = [];
const warn = (where, msg) => problems.push(`${where}: ${msg}`);

function lemmaEntries(lemma, pos) {
  const found = byHead.get(plainForm(lemma)) || [];
  return pos ? found.filter(e => pos.includes(e.pos)) : found;
}

// The cells of a noun, adjective or pronoun table that hold this form: "acc sg m" style keys.
function nounCells(entry) {
  const cells = [];
  const push = (key, v) => [].concat(v).forEach(f => f && cells.push([key, plainForm(f)]));
  if (entry.pos === 'Noun') {
    const f = M.declineNoun(entry);
    if (!f) return null;
    const g = (entry.gender || '').replace(/\./g, '')[0];
    for (const n of ['sg', 'pl']) for (const c of Object.keys(f[n])) push(`${c} ${n} ${g}`, f[n][c]);
  } else {
    const table = entry.pos === 'Pronoun' ? M.declinePronoun(entry) : M.declineAdjective(entry);
    if (!table) return null;
    for (const G of ['M', 'F', 'N']) for (const n of ['sg', 'pl']) for (const c of Object.keys(table.forms[G][n])) push(`${c} ${n} ${G.toLowerCase()}`, table.forms[G][n][c]);
  }
  return cells;
}

function checkToken(where, tagged, lemma) {
  if (!lemma || lemma.startsWith('~')) return;
  // where a tag accepts alternatives, check the form against the first
  const tok = Object.fromEntries(Object.entries(tagged).map(([k, v]) => [k, Array.isArray(v) && k !== 'role' ? v[0] : v]));
  const form = plainForm(tok.t);
  if (tok.p === 'n' || tok.p === 'pn') {
    const entries = lemmaEntries(lemma, ['Noun', 'Adjective', 'Pronoun']);
    if (!entries.length) return warn(where, `no lexicon word "${lemma}"`);
    const want = tok.p === 'n' ? `${tok.case} ${tok.num} ${tok.gender}` : `${tok.case} ${tok.num}`;
    const ok = entries.some(e => {
      const cells = nounCells(e);
      if (!cells) return formsOf(e).has(form);
      return cells.some(([key, f]) => f === form && key.startsWith(want));
    });
    if (!ok) warn(where, `${tok.t} is not ${want} of ${lemma}`);
  } else if (tok.p === 'v') {
    const entries = lemmaEntries(lemma, ['Verb']);
    if (!entries.length) return warn(where, `no lexicon verb "${lemma}"`);
    const key = (tok.num === 'sg' ? 'sg' : 'pl') + tok.person;
    const ok = entries.some(e => ['act', 'pass'].some(voice => {
      const forms = M.conjugateVerb(e, tok.tense, voice, tok.mood === 'imp' ? 'ind' : tok.mood);
      return forms && [].concat(forms[key]).some(f => plainForm(f) === form);
    }));
    if (!ok) warn(where, `${tok.t} is not ${tok.person} ${tok.num} ${tok.tense} ${tok.mood} of ${lemma}`);
  } else if (tok.p === 'vinf' || tok.p === 'adj') {
    const entries = lemmaEntries(lemma);
    if (!entries.length) return warn(where, `no lexicon word "${lemma}"`);
    const first = form.split(' ')[0];
    if (!entries.some(e => formsOf(e).has(first) || formsOf(e).has(form))) warn(where, `${tok.t} is not a form of ${lemma}`);
  }
}

// The form an adjective, pronoun or participle takes in a given gender, number and case, or null
// where that can't be worked out here (a comparative, an indeclinable numeral).
const ENDINGS_12 = {
  M: { sg: { nom: 'us', gen: 'i', dat: 'o', acc: 'um', abl: 'o' }, pl: { nom: 'i', gen: 'orum', dat: 'is', acc: 'os', abl: 'is' } },
  F: { sg: { nom: 'a', gen: 'ae', dat: 'ae', acc: 'am', abl: 'a' }, pl: { nom: 'ae', gen: 'arum', dat: 'is', acc: 'as', abl: 'is' } },
  N: { sg: { nom: 'um', gen: 'i', dat: 'o', acc: 'um', abl: 'o' }, pl: { nom: 'a', gen: 'orum', dat: 'is', acc: 'a', abl: 'is' } },
};
function agreeingForms(entry, G, num, c) {
  const cell = table => table && table.forms && table.forms[G] && table.forms[G][num] && table.forms[G][num][c];
  let found = null;
  if (entry.pos === 'Adjective') found = cell(M.declineAdjective(entry));
  else if (entry.pos === 'Pronoun') found = cell(M.declinePronoun(entry));
  else if (entry.pos === 'Verb') {
    const parts = (entry.principal_parts || '').split(',').map(s => s.trim());
    const supine = parts[2] && plainForm(parts[2]);
    found = [cell(M.declineParticiple(entry)), supine && supine.endsWith('um') ? supine.slice(0, -2) + ENDINGS_12[G][num][c] : null];
  }
  const forms = [].concat(found || []).flat().filter(Boolean).map(plainForm);
  return forms.length ? forms : null;
}

const sentences = [];
const files = fs.readdirSync(path.join(HERE, 'sentences')).filter(f => /^q\d+\.txt$/.test(f)).sort();
for (const file of files) {
  const question = Number(file.match(/\d+/)[0]);
  const blocks = fs.readFileSync(path.join(HERE, 'sentences', file), 'utf8').split(/\n\s*\n/);
  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
    if (!lines.length) continue;
    const get = mark => lines.filter(l => l.startsWith(mark + ' ')).map(l => l.slice(2).trim());
    const [latin] = get('='), [ref] = get('@'), [english] = get('>');
    const note = get('!').join(' ') || null;
    const id = `s${sentences.length + 1}`;
    const where = `${file} ${id} "${(latin || '').slice(0, 40)}"`;
    if (!latin || !ref || !english) { warn(where, 'needs =, @ and > lines'); continue; }
    const paragraph = PARAGRAPHS.find(p => p.ref === ref);
    if (!paragraph) warn(where, `no paragraph ${ref}`);
    else if (paragraph.question !== question) warn(where, `${ref} is not in question ${question}`);
    else if (!words(paragraph.text).join(' ').includes(words(latin).join(' '))) warn(where, `not found word for word in ${ref}`);
    else if (!plainForm(paragraph.text).replace(/\s+/g, ' ').includes(plainForm(latin).replace(/[.;]$/, '').replace(/\s+/g, ' '))) warn(where, `words match but punctuation differs from ${ref}`);

    const tokenLines = lines.filter(l => !/^[=@>!] /.test(l));
    const tokens = [], lemmas = [], targets = [];
    for (const line of tokenLines) {
      const [t, p, morph = '', role = '', lemma = '', extra = ''] = line.split('|').map(s => s.trim());
      const tok = { t, p };
      // "sg/pl" accepts either (se, whose number is its antecedent's)
      const m = morph.split(/\s+/).filter(Boolean).map(v => (v.includes('/') && !v.startsWith('→') ? v.split('/') : v));
      const roles = role ? role.split(',').map(s => s.trim()) : [];
      const roleValue = roles.length > 1 ? roles : roles[0];
      switch (p) {
        case 'n': [tok.case, tok.num, tok.gender] = m; tok.role = roleValue; break;
        case 'pn': [tok.case, tok.num] = m; tok.role = roleValue; break;
        case 'v': tok.person = Number(m[0]); [, tok.num, tok.tense, tok.mood] = m; tok.role = roleValue; break;
        case 'vinf': [tok.tense, tok.voice] = m; tok.role = roleValue; break;
        case 'adj': targets.push([tokens.length, 'agrees', morph.replace(/^→/, '')]); break;
        case 'adv': case 'conj': case 'prep': case 'punct': break;
        default: warn(where, `unknown part of speech ${p} on "${t}"`);
      }
      if (p === 'pn' && extra.startsWith('ant=')) targets.push([tokens.length, 'antecedent', extra.slice(4)]);
      for (const [k, v] of Object.entries(tok)) if (v === undefined || (typeof v === 'number' && Number.isNaN(v))) warn(where, `"${t}" is missing its ${k}`);
      tokens.push(tok);
      lemmas.push(p === 'adj' ? role : lemma);
    }
    for (const [i, key, target] of targets) {
      if (target === '-') { tokens[i][key] = null; continue; }
      const [word, nth = '1'] = target.split('#');
      const hits = tokens.map((tk, j) => [tk, j]).filter(([tk]) => tk.t === word);
      const hit = hits[Number(nth) - 1];
      if (!hit) { warn(where, `${tokens[i].t}: no token "${target}"`); continue; }
      if (hit[0].p !== 'n') warn(where, `${tokens[i].t}: "${target}" is not tagged as a noun`);
      tokens[i][key] = hit[1];
    }
    if (words(tokens.map(tk => tk.t).join(' ')).join(' ') !== words(latin).join(' ')) warn(where, 'the tokens do not spell out the sentence');
    tokens.forEach((tok, i) => checkToken(`${where} [${tok.t}]`, tok, lemmas[i]));
    // An adjective or participle must have the form its word takes in its noun's case, number and gender.
    tokens.forEach((tok, i) => {
      if (tok.p !== 'adj' || tok.agrees == null || !lemmas[i] || lemmas[i].startsWith('~')) return;
      const noun = tokens[tok.agrees];
      const first = v => (Array.isArray(v) ? v[0] : v);
      const [c, num, G] = [first(noun.case), first(noun.num), String(first(noun.gender) || '').toUpperCase()];
      const expected = lemmaEntries(lemmas[i]).map(e => agreeingForms(e, G, num, c)).filter(Boolean).flat();
      const form = plainForm(tok.t);
      if (expected.length && !expected.includes(form)) {
        // an adjective's comparative or superlative isn't in the positive's table; accept it if it is a
        // form of the word at all (participles and pronouns have no such forms)
        const adjectives = lemmaEntries(lemmas[i], ['Adjective']);
        const comparison = adjectives.some(e => formsOf(e).has(form)) && !adjectives.some(e => nounCells(e)?.some(([, f]) => f === form));
        if (!comparison) warn(`${where} [${tok.t}]`, `does not agree with ${noun.t} (${c} ${num} ${G}); expected ${[...new Set(expected)].join('/')}`);
      }
    });
    sentences.push({ id, chapter: question, type: 'Summa', latin, english, source: sourceOf(ref), ref, grammarNotes: note, tokens });
  }
}

const header = `// Practice sentences from Summa Theologiae I, qq. 1-10 (the Leonine text), generated by
// tools/build-sentences.mjs from tools/sentences/q*.txt -- edit those and rebuild rather than this file.
`;
fs.writeFileSync(path.join(ROOT, 'data', 'sentences.js'), `${header}export const SENTENCES = ${JSON.stringify(sentences, null, 1)};\n`);
const perQuestion = {};
sentences.forEach(s => { perQuestion[s.chapter] = (perQuestion[s.chapter] || 0) + 1; });
console.log(`${sentences.length} sentences (${Object.entries(perQuestion).map(([q, n]) => `Q${q} ${n}`).join(', ')}), ${sentences.reduce((n, s) => n + s.tokens.filter(t => t.p !== 'punct').length, 0)} words`);
console.log(problems.length ? `${problems.length} problems:\n  ${problems.join('\n  ')}` : 'no problems');
process.exitCode = problems.length ? 1 : 0;
