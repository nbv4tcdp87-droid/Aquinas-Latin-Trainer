// What the activities are based on: Summa Theologiae, Prima Pars, Questions 1-10 (the Leonine text).
// The pages load their data through here, and keep their shareable links in step with what's chosen.
export const BOOK = { id: 1, name: 'Summa Theologiae I, Qq. 1–10', dir: '../data/' };

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
