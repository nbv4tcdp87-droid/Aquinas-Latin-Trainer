// Typed vocabulary answers for Learning Mode: the English is shown and the student types the Latin.
// A noun, adjective, pronoun, numeral, or verb needs only its first form, the nominative or the first
// principal part (ratiō; bonus; moveō); anything else is typed as its dictionary entry. The full
// dictionary entry is always accepted too. Pure functions (no page), so they can be tested on their own.
import { normalizeLatin, principalPartsOf } from './util.js';

const FIRST_FORM_IS_ENOUGH = new Set(['Noun', 'Adjective', 'Pronoun', 'Numeral', 'Verb']);

// The first form of the entry alone (ratiō for ratiō, ratiōnis; bonus for bonus, bona, bonum; moveō
// for moveō, movēre, mōvī, mōtum), for the parts of speech that need no more; null for the rest.
export function firstFormOf(entry) {
  if (!FIRST_FORM_IS_ENOUGH.has(entry.pos)) return null;
  return entry.latin.replace(/\s*\(?\+.*$/, '').split(',')[0].trim();
}

// A word's full dictionary entry, shown after a typed answer and always accepted: a noun with its
// genitive, a verb with its principal parts, an adjective with the forms the vocabulary lists
// ("bonus, bona, bonum"), anything else as it is. The textbook's notes ("+ ablative", "+ dative + infinitive") are left out, and so are dashes for a
// part the word lacks (vīs, ——). `fromChapter` is the chapter principal parts start in (2 in Level 1).
export function typedAnswerOf(entry, fromChapter = 1) {
  const head = entry.latin.replace(/\s*\(?\+.*$/, '').trim();
  if (entry.pos === 'Noun' && entry.genitive && /\p{L}/u.test(entry.genitive)) return `${head}, ${entry.genitive}`;
  const parts = principalPartsOf(entry, fromChapter);
  return parts.length ? [head, ...parts].join(', ') : head;
}

// What the question asks for, beyond the word itself (nothing, where the first form is enough).
export function typedHintOf(entry, fromChapter = 1) {
  if (firstFormOf(entry)) return '';
  const answer = typedAnswerOf(entry, fromChapter);
  if (!answer.includes(',')) return '';
  return 'Give every form the vocabulary lists.';
}

const clean = text => normalizeLatin(text).replace(/[-?!.;:"“”]/g, '');

// An answer as slots, one per word, each with the spellings it accepts: "ā (ab)" and
// "altum/alitum" each fill one slot two ways, "passus sum" fills two.
function slotsOf(answer) {
  const slots = [];
  for (const word of clean(answer).replace(/,/g, ' ').split(/\s+/).filter(Boolean)) {
    const alt = /^\((.+)\)$/.exec(word);
    if (alt && slots.length) slots[slots.length - 1].push(...alt[1].split('/'));
    else slots.push(word.split('/'));
  }
  return slots;
}

// Whether `text` is this answer. Macrons are optional, commas and spaces between the parts are
// interchangeable, and a slot with two spellings takes either one, or both ("īvī (iī)" typed in
// full). A noun like cīvis, cīvis has the same word in two slots, so each reading is tried.
export function matchesTyped(answer, text) {
  const slots = slotsOf(answer);
  const words = clean(text).replace(/[,/()]/g, ' ').split(/\s+/).filter(Boolean);
  const from = (slot, i) => {
    if (slot === slots.length) return i === words.length;
    const spellings = slots[slot];
    if (!spellings.includes(words[i])) return false;
    if (from(slot + 1, i + 1)) return true;
    return spellings.length > 1 && words[i + 1] !== words[i] && spellings.includes(words[i + 1]) && from(slot + 1, i + 2);
  };
  return from(0, 0);
}

// Every answer accepted for a word: its full entry and, where the first form is enough, the entry's
// forms from the start to any point (moveō; moveō, movēre; moveō, movēre, mōvī).
function answersOf(entry, fromChapter) {
  const full = typedAnswerOf(entry, fromChapter);
  if (!firstFormOf(entry)) return [full];
  const forms = full.split(', ');
  return forms.map((_, i) => forms.slice(0, i + 1).join(', '));
}

// The word `text` answers the question for `entry` with, or null. Any word with exactly the same
// English counts too ("light" is lūmen or lūx).
export function typedMatchOf(entry, text, vocab, fromChapter = 1) {
  const candidates = [entry, ...vocab.filter(w => w !== entry && w.english === entry.english)];
  return candidates.find(w => answersOf(w, fromChapter).some(answer => matchesTyped(answer, text))) || null;
}

export function isAcceptedTyped(entry, text, vocab, fromChapter = 1) {
  return typedMatchOf(entry, text, vocab, fromChapter) !== null;
}
