// Every inflected form a vocabulary entry can take, built with the site's own morphology engine,
// so the Summa's text can be matched to dictionary entries (and an entry's data checked: a word
// whose forms never turn up in the text usually has a wrong genitive or principal part).
//
// Forms are compared without macrons, in lower case, with j written as i (as the Leonine text has it).
import { pathToFileURL } from 'url';

export const plainForm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/j/g, 'i');

function leaves(value, out) {
  if (value == null) return out;
  if (typeof value === 'string') { value.split('/').forEach(v => v.trim() && out.add(plainForm(v.trim()))); return out; }
  if (Array.isArray(value)) { value.forEach(v => leaves(v, out)); return out; }
  if (typeof value === 'object') { Object.values(value).forEach(v => leaves(v, out)); return out; }
  return out;
}

const ENDINGS_12 = ['us', 'ī', 'ō', 'um', 'e', 'a', 'ae', 'am', 'ā', 'ōrum', 'īs', 'ōs', 'ārum', 'ās'];
const decline12 = stem => ENDINGS_12.map(e => plainForm(stem + e));
const LIMUS = new Set(['facilis', 'difficilis', 'similis', 'dissimilis', 'gracilis', 'humilis']);

export async function makeLexicon(morphologyPath) {
  const M = await import(pathToFileURL(morphologyPath).href);
  const TENSES = ['pres', 'impf', 'fut', 'perf', 'plup', 'futperf'];

  function verbForms(entry, out) {
    for (const mood of ['ind', 'subj']) for (const voice of ['act', 'pass']) for (const tense of TENSES) {
      if (mood === 'subj' && !M.SUBJUNCTIVE_TENSES.includes(tense)) continue;
      try { leaves(M.conjugateVerb(entry, tense, voice, mood), out); } catch (e) { /* not this verb */ }
    }
    try { leaves(M.declineParticiple(entry), out); } catch (e) {}
    try { leaves(M.gerundOf(entry), out); } catch (e) {}
    const parts = (entry.principal_parts || '').replace(/\s*\(.*?\)/g, '').split(' + ')[0].split(',').map(s => s.trim()).filter(p => p && !/^[—–-]+$/.test(p));
    const [inf, perf, supine] = parts;
    if (inf) {
      out.add(plainForm(inf));
      const conj = entry.conjugation;
      const plainInf = plainForm(inf);
      if (!entry.deponent && /(are|ere|ire)$/.test(plainInf)) {
        const base = plainInf.slice(0, -3);
        // present passive infinitive and gerundive. Imperatives are left out: the Summa has almost
        // none outside Scripture quotations, and 1st-conjugation ones (causā, figūrā) look like nouns.
        const pass = { '1st': base + 'ari', '2nd': base + 'eri', '3rd': base + 'i', '3rd (-iō)': base + 'i', '4th': base + 'iri' }[conj];
        if (pass) out.add(pass);
        const gerundive = { '1st': 'and', '2nd': 'end', '3rd': 'end', '3rd (-iō)': 'iend', '4th': 'iend' }[conj];
        if (gerundive) decline12(base + gerundive).forEach(f => out.add(f));
      } else if (entry.deponent) {
        // deponent: the gerundive and present participle are built on the stem too
        const base = plainInf.replace(/(ari|eri|iri|i)$/, '');
        const gerundive = { '1st': 'and', '2nd': 'end', '3rd': 'end', '3rd (-iō)': 'iend', '4th': 'iend' }[conj];
        if (gerundive) decline12(base + gerundive).forEach(f => out.add(f));
      }
    }
    if (perf) {
      const p = plainForm(perf);
      if (p.endsWith('i')) { out.add(p.slice(0, -1) + 'isse'); }
      // deponents give their participle as the third part: hortātus sum
      if (/us( sum)?$/.test(p)) { const stem = p.replace(/ sum$/, '').slice(0, -2); decline12(stem).forEach(f => out.add(f)); }
    }
    if (supine) {
      const s = plainForm(supine);
      if (s.endsWith('um')) {
        const stem = s.slice(0, -2);
        // perfect passive participle and the supine in -ū. The future active participle is left out
        // for the same reason as the imperatives (creātūra, scrīptūra would look like it).
        decline12(stem).forEach(f => out.add(f));
        out.add(stem + 'u');
      }
    }
  }

  // Comparative, superlative and adverbs of any adjective (the engine compares only the words its
  // charts use): dignior, dignius, dignissimus, dignē, dignissimē; simplicior; pulcherrimus; simillimus.
  function comparisonForms(entry, out) {
    const parts = entry.latin.split(',').map(s => s.trim());
    const head = parts[0];
    let base = null;
    if (entry.declension === '1st' && parts.length === 3) base = parts[1].slice(0, -1);
    else if (entry.declension === '3rd' && parts.length === 3) base = parts[1].slice(0, -2);
    else if (entry.declension === '3rd' && parts.length === 2) base = parts[0].endsWith('is') ? parts[0].slice(0, -2) : parts[1].slice(0, -2);
    if (!base) return;
    leaves(M.declineComparative(base + 'ior', base + 'ius'), out);
    const plainHead = plainForm(head);
    const superlative = plainHead.endsWith('er') ? plainHead + 'rim' : LIMUS.has(plainHead) ? plainForm(base) + 'lim' : plainForm(base) + 'issim';
    decline12(superlative).forEach(f => out.add(f));
    out.add(superlative + 'e');
    const b = plainForm(base);
    out.add(entry.declension === '1st' ? b + 'e' : b.endsWith('nt') ? b + 'er' : b + 'iter');
  }

  // "ā, ab + ablative" -> "ā", "ab"; "quam (with comparatives)" -> "quam"
  const bare = s => s.replace(/\s*\(.*?\)/g, '').replace(/\s*\+.*$/, '').trim().replace(/[?!]$/, '');

  function formsOf(entry) {
    const out = new Set();
    const head = bare(entry.latin.split(',')[0]);
    try {
      switch (entry.pos) {
        case 'Noun': {
          const f = M.declineNoun(entry);
          if (f) leaves(f, out); else out.add(plainForm(head));
          break;
        }
        case 'Adjective': {
          leaves(M.declineAdjective(entry), out);
          const irregular = M.comparisonOf(entry);
          if (irregular) {
            leaves(irregular, out);
            // melior, melius / optimus declined in full
            const [mf, n] = [].concat(irregular.comparative).map(c => [].concat(c)[0]);
            if (mf && n) leaves(M.declineComparative(mf, n), out);
            if (irregular.superlative) decline12(irregular.superlative.slice(0, -2)).forEach(f => out.add(f));
          } else comparisonForms(entry, out);
          break;
        }
        case 'Pronoun': {
          const f = M.declinePronoun(entry);
          if (f) leaves(f, out); else entry.latin.split(',').forEach(p => bare(p) && out.add(plainForm(bare(p))));
          break;
        }
        case 'Verb': verbForms(entry, out); out.add(plainForm(head)); break;
        default: entry.latin.split(/[,;]/).forEach(p => bare(p) && out.add(plainForm(bare(p))));
      }
    } catch (e) { /* a malformed entry yields only its headword */ }
    out.add(plainForm(head));
    for (const extra of entry.forms || []) out.add(plainForm(extra));
    // a form that belongs to another word in practice (sōl's genitive plural sōlum is the Summa's sōlum, "only")
    for (const not of entry.notForms || []) out.delete(plainForm(not));
    return out;
  }

  // form -> [entry ids]
  function indexOf(vocab) {
    const index = new Map();
    for (const entry of vocab) for (const form of formsOf(entry)) {
      if (!index.has(form)) index.set(form, []);
      index.get(form).push(entry.id);
    }
    return index;
  }
  return { formsOf, indexOf, M };
}

// The Summa's running words, with their question, from tools/text/summa-1-10.json.
// Roman numerals (book and chapter numbers in citations) are left out.
export function tokensOf(paragraphs) {
  const tokens = [];
  for (const p of paragraphs) {
    for (const m of p.text.matchAll(/[A-Za-z]+/g)) {
      const word = m[0];
      if (/^[IVXLCDM]+$/.test(word)) continue;
      tokens.push({ form: plainForm(word), raw: word, question: p.question, ref: p.ref });
    }
  }
  return tokens;
}
