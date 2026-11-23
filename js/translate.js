import { loadSentences, linkParam, updateLink } from './book.js';
import { parseChapterList, formatChapterList } from './util.js';
import { sentenceNumbers } from './sentence-numbers.js';
import { hasAnswers, isAcceptedAnswer } from './translation-match.js';

const SENTENCES = await loadSentences();
const NUMBERS = sentenceNumbers(SENTENCES);

const CASE_OPTIONS = [
  ['nom', 'Nominative'], ['gen', 'Genitive'], ['dat', 'Dative'],
  ['acc', 'Accusative'], ['abl', 'Ablative'], ['voc', 'Vocative'],
];
const NUM_OPTIONS = [['sg', 'Singular'], ['pl', 'Plural']];
const GENDER_OPTIONS = [['m', 'Masc.'], ['f', 'Fem.'], ['n', 'Neut.']];
const PERSON_OPTIONS = [['1', '1st'], ['2', '2nd'], ['3', '3rd']];
// Every sentence asks for the mood separately, so the tense list has no "Imperative" (an
// imperative is present tense, imperative mood).
const TENSE_OPTIONS_WITH_MOOD = [
  ['pres', 'Present'], ['impf', 'Imperfect'], ['fut', 'Future'],
  ['perf', 'Perfect'], ['plup', 'Pluperfect'], ['futperf', 'Future perfect'],
];
const MOOD_OPTIONS = [['ind', 'Indicative'], ['subj', 'Subjunctive'], ['imp', 'Imperative']];

// Infinitives, such as "esse" or the two-word "probari potest"'s probari: the tense and voice of the
// infinitive itself, and its use. A deponent's infinitive is passive in form, so both are offered.
const INFINITIVE_TENSE_OPTIONS = [['pres', 'Present'], ['perf', 'Perfect'], ['fut', 'Future']];
const VOICE_OPTIONS = [['act', 'Active'], ['pass', 'Passive'], ['dep', 'Deponent']];
const INFINITIVE_ROLE_OPTIONS = [
  ['complementary-infinitive', 'complementary infinitive'],
  ['indirect-statement', 'infinitive in indirect statement'],
  ['nominative-infinitive', 'nominative and infinitive'],
  ['subject-infinitive', 'infinitive as subject'],
  ['object-infinitive', 'infinitive as object'],
];
// (Where esse is plainly a noun, as in suum esse, ipsum esse, or esse divinum, it is tagged as one: a
// neuter noun, so the adjectives with it have something to agree with.)

const NOUN_ROLE_OPTIONS = [
  ['subject', 'subject'],
  ['direct-object', 'direct object'],
  ['subject-complement', 'subject complement'],
  ['appositive', 'apposition'],
  ['possessive', 'possessive'],
  ['partitive', 'partitive genitive'],
  ['objective-genitive', 'objective genitive'],
  ['indirect-object', 'indirect object'],
  ['dat-reference', 'dative of reference'],
  ['dat-adjective', 'dative with an adjective'],
  ['dat-possession', 'dative of possession'],
  ['dat-agent', 'dative of agent'],
  ['object-of-prep', 'object of a preposition'],
  ['abl-instrument', 'ablative of means'],
  ['abl-manner', 'ablative of manner'],
  ['abl-agent', 'ablative of agent'],
  ['abl-cause', 'ablative of cause'],
  ['abl-respect', 'ablative of respect'],
  ['abl-comparison', 'ablative of comparison'],
  ['abl-absolute', 'ablative absolute'],
  ['abl-place-where', 'ablative of place where'],
  ['abl-place-from-which', 'ablative of place from which'],
  ['abl-separation', 'ablative of separation'],
  ['abl-time', 'ablative of time'],
  ['vocative', 'vocative (direct address)'],
];

const VERB_ROLE_OPTIONS = [
  ['transitive-verb', 'transitive verb'],
  ['intransitive-verb', 'intransitive verb'],
  ['linking-verb', 'linking verb'],
  ['main-verb-complementary-infinitive', 'main verb + complementary infinitive'],
  ['passive-verb', 'passive verb'],
  ['deponent-verb', 'deponent verb'],
  ['impersonal-verb', 'impersonal verb (it seems, it is fitting…)'],
  ['head-verb', 'head verb (introduces a quod clause or indirect statement)'],
  ['passive-periphrastic', 'passive periphrastic (dicendum est)'],
  // why a verb in a dependent clause has its mood
  ['quod-clause', 'quod clause ("that…")'],
  ['indirect-question', 'indirect question (utrum…)'],
  ['purpose-clause', 'purpose clause'],
  ['result-clause', 'result clause'],
  ['cum-clause', 'cum clause'],
  ['causal-clause', 'causal clause (subjunctive)'],
  ['concessive-clause', 'concessive clause (subjunctive)'],
  ['conditional', 'conditional clause (subjunctive)'],
  ['volitive', 'volitive subjunctive (command, exhortation)'],
];

// Its own key: the LFNM site numbers its sentences s1, s2, … too, and the two could share a web address.
const PROGRESS_KEY = 'summa-translate-progress-v1';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}

const CHAPTERS = [...new Set(SENTENCES.map(s => s.chapter))].sort((a, b) => a - b);
// Each sentence's "chapter" is its question of the Summa. A link can preselect the questions and open a
// sentence: translate.html?ch=2&sentence=s12. No question is selected unless the link names some ("all"
// selects every question); a link to one sentence without questions selects that sentence's question,
// so the list behind it isn't empty.
const linkedSentence = SENTENCES.find(s => s.id === linkParam('sentence'));
const state = { chapters: parseChapterList(linkParam('ch'), CHAPTERS), activeSentence: null };
if (linkedSentence && linkParam('ch') == null) state.chapters.add(linkedSentence.chapter);

function syncLink() {
  updateLink({
    ch: formatChapterList(state.chapters, CHAPTERS),
    sentence: state.activeSentence ? state.activeSentence.id : null,
  });
}

const chapterPicker = document.getElementById('chapterPicker');
const sentenceListEl = document.getElementById('sentenceList');
const listCard = document.getElementById('listCard');
const analysisCard = document.getElementById('analysisCard');
const analysisArea = document.getElementById('analysisArea');
const backBtn = document.getElementById('backBtn');

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderChapterPicker() {
  chapterPicker.innerHTML = '';
  const allChip = document.createElement('div');
  allChip.className = 'chapter-chip' + (state.chapters.size === CHAPTERS.length ? ' selected' : '');
  allChip.textContent = 'All';
  allChip.onclick = () => {
    state.chapters = state.chapters.size === CHAPTERS.length ? new Set() : new Set(CHAPTERS);
    renderChapterPicker();
    renderSentenceList();
  };
  chapterPicker.appendChild(allChip);
  CHAPTERS.forEach(ch => {
    const chip = document.createElement('div');
    chip.className = 'chapter-chip' + (state.chapters.has(ch) ? ' selected' : '');
    chip.textContent = 'Q. ' + ch;
    chip.onclick = () => {
      if (state.chapters.has(ch)) state.chapters.delete(ch); else state.chapters.add(ch);
      renderChapterPicker();
      renderSentenceList();
    };
    chapterPicker.appendChild(chip);
  });
}

function renderSentenceList() {
  syncLink();
  const progress = loadProgress();
  const filtered = SENTENCES.filter(s => state.chapters.has(s.chapter));
  sentenceListEl.innerHTML = '';
  if (filtered.length === 0) {
    sentenceListEl.innerHTML = '<div class="empty-state">Select at least one question.</div>';
    return;
  }
  filtered.forEach(s => {
    const item = document.createElement('div');
    item.className = 'sentence-item';
    const done = progress[s.id];
    item.innerHTML = `
      <div>
        <span class="sentence-number">${NUMBERS.get(s.id)}.</span>
        <span class="pill">Q. ${s.chapter}</span>
        <span class="latin">&nbsp;${escapeHtml(s.latin)}</span>
      </div>
      <div class="status ${done ? 'done' : ''}">${done ? '✓ Done' : ''}</div>
    `;
    item.onclick = () => openSentence(s.id);
    sentenceListEl.appendChild(item);
  });
}

function selectHTML(cls, options, placeholder) {
  const opts = options.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
  return `<select class="${cls}"><option value="">${placeholder}</option>${opts}</select>`;
}

function nounOptionsHTML(tokens) {
  return tokens
    .map((t, i) => ({ t, i }))
    .filter(x => x.t.p === 'n')
    .map(x => `<option value="${x.i}">${escapeHtml(x.t.t)}</option>`).join('');
}

function renderWordHTML(token, idx, tokens) {
  if (token.p === 'punct') return `<span class="punct-inline">${escapeHtml(token.t)}</span>`;
  // An infinitive is tagged as a whole, even when it is two words ("capta esse"): tense and voice above,
  // its use below. Each is asked only if the token carries it (a supine has no tense or voice).
  if (token.p === 'vinf' && (token.tense !== undefined || token.voice !== undefined || token.role !== undefined)) {
    const tenseSel = token.tense !== undefined ? selectHTML('f-tense', INFINITIVE_TENSE_OPTIONS, 'tense') : '';
    const voiceSel = token.voice !== undefined ? selectHTML('f-voice', VOICE_OPTIONS, 'voice') : '';
    const roleSel = token.role !== undefined ? selectHTML('f-role', INFINITIVE_ROLE_OPTIONS, 'usage…') : '';
    return `
      <span class="analysis-word" data-idx="${idx}" data-type="vinf">
        <span class="field-row">${tenseSel}${voiceSel}</span>
        <span class="word-text latin">${escapeHtml(token.t)}</span>
        ${roleSel}
      </span>`;
  }
  if (token.p === 'prep' || token.p === 'conj' || token.p === 'adv' || token.p === 'vinf') {
    return `<span class="plain-word latin">${escapeHtml(token.t)}</span>`;
  }
  if (token.p === 'adj') {
    const nounOpts = nounOptionsHTML(tokens);
    return `
      <span class="analysis-word" data-idx="${idx}" data-type="adj">
        <span class="word-text latin">${escapeHtml(token.t)}</span>
        <select class="f-agree">
          <option value="">agrees with…</option>
          <option value="none">(none — used alone)</option>
          ${nounOpts}
        </select>
      </span>`;
  }
  if (token.p === 'n' || token.p === 'pn') {
    const caseSel = selectHTML('f-case', CASE_OPTIONS, 'case');
    const numSel = selectHTML('f-num', NUM_OPTIONS, 'num.');
    const genderSel = token.p === 'n' ? selectHTML('f-gender', GENDER_OPTIONS, 'gender') : '';
    const roleSel = selectHTML('f-role', NOUN_ROLE_OPTIONS, 'usage…');
    // Relative pronouns also ask which noun is their antecedent.
    const antecedentSel = token.antecedent !== undefined
      ? `<select class="f-antecedent"><option value="">refers to…</option>${nounOptionsHTML(tokens)}</select>`
      : '';
    return `
      <span class="analysis-word" data-idx="${idx}" data-type="${token.p}">
        <span class="field-row">${caseSel}${numSel}${genderSel}</span>
        <span class="word-text latin">${escapeHtml(token.t)}</span>
        ${roleSel}${antecedentSel}
      </span>`;
  }
  if (token.p === 'v') {
    const personSel = selectHTML('f-person', PERSON_OPTIONS, 'person');
    const numSel = selectHTML('f-num', NUM_OPTIONS, 'num.');
    const tenseSel = token.tense !== undefined ? selectHTML('f-tense', TENSE_OPTIONS_WITH_MOOD, 'tense') : '';
    const moodSel = token.mood !== undefined ? selectHTML('f-mood', MOOD_OPTIONS, 'mood') : '';
    const roleSel = selectHTML('f-role', VERB_ROLE_OPTIONS, 'usage…');
    return `
      <span class="analysis-word" data-idx="${idx}" data-type="v">
        <span class="field-row">${personSel}${numSel}${tenseSel}${moodSel}</span>
        <span class="word-text latin">${escapeHtml(token.t)}</span>
        ${roleSel}
      </span>`;
  }
  return `<span class="plain-word latin">${escapeHtml(token.t)}</span>`;
}

function openSentence(id) {
  const sentence = SENTENCES.find(s => s.id === id);
  state.activeSentence = sentence;
  syncLink();
  listCard.style.display = 'none';
  analysisCard.style.display = 'block';

  const wordsHTML = sentence.tokens.map((t, i) => renderWordHTML(t, i, sentence.tokens)).join('');
  const sourceLine = `<div class="legend">Summa Theologiae ${escapeHtml(sentence.source)}</div>`;
  // Level 1 (Chapters 1-21) has accepted translations to check the typed one against; every other
  // sentence is "check your own" with the model translation.
  const checkable = hasAnswers(sentence.id);

  analysisArea.innerHTML = `
    <p class="pill">Question ${sentence.chapter} · Sentence ${NUMBERS.get(sentence.id)}</p>
    <div class="analysis-sentence">${wordsHTML}</div>

    <div class="translation-box">
      <label for="translationInput"><strong>Your translation:</strong></label>
      <textarea id="translationInput" rows="2" placeholder="Type your English translation of the sentence…"></textarea>
      ${checkable ? '<button id="checkTranslationBtn" disabled>Check Translation</button>' : ''}
      <button class="secondary" id="revealTranslationBtn" disabled>Show Model Translation</button>
      ${checkable ? '<div id="translationVerdict" class="translation-verdict" aria-live="polite"></div>' : ''}
      <div id="modelTranslation" style="display:none;" class="model-translation"></div>
    </div>

    ${sourceLine}
    <div class="chart-toolbar">
      <button id="checkSentenceBtn">Check My Work</button>
      <button class="secondary" id="clearSentenceBtn">Clear</button>
    </div>
    <div id="scoreBanner"></div>
    <div class="legend">Adjectives and participles only need the agreement dropdown; relative pronouns also ask which noun they refer to. An infinitive, even a two-word one like “factum esse”, is tagged as a whole: its tense and voice above, its use below. Everything else (prepositions, conjunctions, adverbs) is shown for context and doesn't need to be tagged.</div>
  `;

  const translationInput = document.getElementById('translationInput');
  const revealBtn = document.getElementById('revealTranslationBtn');
  const modelTranslation = document.getElementById('modelTranslation');
  const checkBtn = document.getElementById('checkTranslationBtn');   // only where there are accepted translations
  const verdict = document.getElementById('translationVerdict');

  // The button shows the model translation, and then hides it again.
  const modelShown = () => modelTranslation.style.display === 'block';
  const showModel = () => {
    modelTranslation.style.display = 'block';
    // The note on the sentence's grammar (dicendum: est is understood) comes with the model, after the student has tried.
    const note = sentence.grammarNotes ? `<div class="model-note"><strong>Note:</strong> ${escapeHtml(sentence.grammarNotes)}</div>` : '';
    modelTranslation.innerHTML = `<strong>Model translation:</strong> ${escapeHtml(sentence.english)}${note}`;
    revealBtn.textContent = 'Hide Model Translation';
    revealBtn.disabled = false;
  };
  const hideModel = () => {
    modelTranslation.style.display = 'none';
    modelTranslation.innerHTML = '';
    revealBtn.textContent = 'Show Model Translation';
    revealBtn.disabled = !translationInput.value.trim();
  };
  const clearVerdict = () => {
    verdict.className = 'translation-verdict';
    verdict.textContent = '';
  };

  translationInput.addEventListener('input', () => {
    const empty = !translationInput.value.trim();
    if (!modelShown()) revealBtn.disabled = empty;   // Hide stays available while the model is showing
    if (checkBtn) { checkBtn.disabled = empty; clearVerdict(); }
  });
  revealBtn.onclick = () => (modelShown() ? hideModel() : showModel());
  if (checkBtn) {
    checkBtn.onclick = () => {
      if (isAcceptedAnswer(sentence.id, translationInput.value)) {
        verdict.className = 'translation-verdict matched';
        verdict.textContent = 'Optime!';
      } else {
        verdict.className = 'translation-verdict missed';
        verdict.textContent = 'Compare with model translation';
        showModel();
      }
    };
  }

  document.getElementById('checkSentenceBtn').onclick = () => checkSentence(sentence);
  document.getElementById('clearSentenceBtn').onclick = () => {
    analysisArea.querySelectorAll('select').forEach(sel => {
      sel.value = '';
      sel.classList.remove('field-good', 'field-bad');
    });
    document.getElementById('scoreBanner').innerHTML = '';
    translationInput.value = '';
    hideModel();
    if (checkBtn) { checkBtn.disabled = true; clearVerdict(); }
  };
}

function checkSentence(sentence) {
  let total = 0, correct = 0, filled = 0;
  const words = analysisArea.querySelectorAll('.analysis-word');
  words.forEach(wordEl => {
    const idx = Number(wordEl.dataset.idx);
    const type = wordEl.dataset.type;
    const token = sentence.tokens[idx];

    const checkField = (selector, expected) => {
      const sel = wordEl.querySelector(selector);
      if (!sel) return;
      total++;
      sel.classList.remove('field-good', 'field-bad');
      if (!sel.value) return;
      filled++;
      // `expected` may list several acceptable answers (e.g. "ex urbe" is
      // both an object of a preposition and an ablative of place from which).
      const accepted = Array.isArray(expected) ? expected.map(String) : [String(expected)];
      if (accepted.includes(sel.value)) {
        sel.classList.add('field-good');
        correct++;
      } else {
        sel.classList.add('field-bad');
      }
    };

    if (type === 'n' || type === 'pn') {
      checkField('.f-case', token.case);
      checkField('.f-num', token.num);
      if (type === 'n') checkField('.f-gender', token.gender);
      checkField('.f-role', token.role);
      if (token.antecedent !== undefined) checkField('.f-antecedent', token.antecedent);
    } else if (type === 'v') {
      checkField('.f-person', token.person);
      checkField('.f-num', token.num);
      if (token.tense !== undefined) checkField('.f-tense', token.tense);
      if (token.mood !== undefined) checkField('.f-mood', token.mood);
      checkField('.f-role', token.role);
    } else if (type === 'vinf') {
      if (token.tense !== undefined) checkField('.f-tense', token.tense);
      if (token.voice !== undefined) checkField('.f-voice', token.voice);
      if (token.role !== undefined) checkField('.f-role', token.role);
    } else if (type === 'adj') {
      const expected = (token.agrees === null || token.agrees === undefined) ? 'none' : token.agrees;
      checkField('.f-agree', expected);
    }
  });

  const banner = document.getElementById('scoreBanner');
  const allCorrect = total > 0 && correct === total && filled === total;
  banner.innerHTML = `<div class="score-banner ${allCorrect ? 'all-correct' : ''}">
    <span>${correct} of ${total} fields correct${filled < total ? ` (${total - filled} left blank)` : ''}</span>
    <span>${allCorrect ? '✓ All correct!' : ''}</span>
  </div>`;

  const progress = loadProgress();
  progress[sentence.id] = allCorrect;
  saveProgress(progress);
}

backBtn.onclick = () => {
  state.activeSentence = null;
  listCard.style.display = 'block';
  analysisCard.style.display = 'none';
  renderSentenceList();
};

renderChapterPicker();
renderSentenceList();
if (linkedSentence) openSentence(linkedSentence.id);
