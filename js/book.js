// What the activities are based on: Summa Theologiae, Prima Pars, Questions 1-10 (the Leonine text).
// The pages load their data through here, and keep their shareable links in step with what's chosen.
export const BOOK = { id: 1, name: 'Summa Theologiae I, Qq. 1–10', dir: '../data/' };

// How many articles each question has. The vocabulary page offers each article's words as a set.
export const ARTICLES_PER_QUESTION = { 1: 10, 2: 3, 3: 8, 4: 3, 5: 6, 6: 4, 7: 4, 8: 4, 9: 2, 10: 6 };

export async function loadVocab() {
  return (await import(`${BOOK.dir}vocabulary.js`)).VOCAB;
}

export async function loadSentences() {
  return (await import(`${BOOK.dir}sentences.js`)).SENTENCES;
}

// The grammar charts draw on the same vocabulary.
export const loadChartVocab = loadVocab;

// Each page keeps the address bar in step with its options (questions, chart, word, ...), so
// copying the link shares that exact setup.
export function linkParam(name) {
  return new URLSearchParams(location.search).get(name);
}

export function updateLink(params = {}) {
  const query = Object.entries(params)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%2C/g, ',')}`)
    .join('&');
  try { history.replaceState(null, '', query ? `${location.pathname}?${query}` : location.pathname); } catch (e) {}
}
