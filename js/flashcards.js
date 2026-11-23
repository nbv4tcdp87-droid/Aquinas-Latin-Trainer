import { loadVocab, linkParam, updateLink } from './book.js';
import { shuffle, parseChapterList, formatChapterList, principalPartsOf, insertAtCursor } from './util.js';
import { typedAnswerOf, typedHintOf, typedMatchOf } from './typed-answer.js';

const VOCAB = await loadVocab();

// Each word's "chapter" is the question of the Summa (1-10) whose vocabulary it belongs to.
const CHAPTERS = [...new Set(VOCAB.map(v => v.chapter))].sort((a, b) => a - b);

const MODES = ['flashcards', 'learn', 'test'];
// A link can preselect the questions and mode: flashcards.html?ch=3-5&mode=test
const state = {
  chapters: parseChapterList(linkParam('ch'), CHAPTERS), // none selected by default
  mode: MODES.includes(linkParam('mode')) ? linkParam('mode') : 'flashcards',
};

function syncLink() {
  updateLink({
    ch: formatChapterList(state.chapters, CHAPTERS),
    mode: state.mode === 'flashcards' ? null : state.mode,
  });
}

const chapterPicker = document.getElementById('chapterPicker');
const studyArea = document.getElementById('studyArea');
const modeFlashcardsBtn = document.getElementById('modeFlashcards');
const modeLearnBtn = document.getElementById('modeLearn');
const modeTestBtn = document.getElementById('modeTest');

function renderChapterPicker() {
  chapterPicker.innerHTML = '';
  const allChip = document.createElement('div');
  allChip.className = 'chapter-chip' + (state.chapters.size === CHAPTERS.length ? ' selected' : '');
  allChip.textContent = 'All';
  allChip.onclick = () => {
    if (state.chapters.size === CHAPTERS.length) state.chapters = new Set();
    else state.chapters = new Set(CHAPTERS);
    renderChapterPicker();
    restart();
  };
  chapterPicker.appendChild(allChip);

  CHAPTERS.forEach(ch => {
    const chip = document.createElement('div');
    chip.className = 'chapter-chip' + (state.chapters.has(ch) ? ' selected' : '');
    chip.textContent = 'Q. ' + ch;
    chip.onclick = () => {
      if (state.chapters.has(ch)) state.chapters.delete(ch);
      else state.chapters.add(ch);
      renderChapterPicker();
      restart();
    };
    chapterPicker.appendChild(chip);
  });
}

function currentWords() {
  return VOCAB.filter(v => state.chapters.has(v.chapter));
}

// A noun with its genitive, a verb with its principal parts (every verb, from Question 1 on).
const PARTS_FROM_CHAPTER = 1;
function citationForm(entry) {
  if (entry.pos === 'Noun' && entry.genitive) return `${entry.latin}, ${entry.genitive}`;
  if (entry.pos === 'Verb' && entry.chapter >= PARTS_FROM_CHAPTER && entry.principal_parts) return `${entry.latin}, ${entry.principal_parts}`;
  return entry.latin;
}

// ---------------- Flashcards mode ----------------
const fcState = { deck: [], index: 0, flipped: false };

function startFlashcards() {
  fcState.deck = shuffle(currentWords());
  fcState.index = 0;
  fcState.flipped = false;
  renderFlashcards();
}

function renderFlashcards() {
  if (fcState.deck.length === 0) {
    studyArea.innerHTML = '<div class="empty-state">Select at least one question to begin.</div>';
    return;
  }
  const entry = fcState.deck[fcState.index];
  const genderPill = entry.gender ? `<span class="pill">${entry.gender}</span>` : '';
  const isNounWithGenitive = entry.pos === 'Noun' && entry.genitive;
  const isVerbWithParts = entry.pos === 'Verb' && entry.chapter >= PARTS_FROM_CHAPTER && entry.principal_parts;
  const frontText = citationForm(entry);
  let frontClass = '';
  if (isNounWithGenitive) frontClass = ' compact';
  else if (isVerbWithParts) frontClass = frontText.length > 40 ? ' compact-sm' : ' compact';
  // The back adds the word's usage note (dīcendum est quod: it must be said that) and how often
  // the Summa uses it, so the most common words stand out.
  const noteHTML = entry.notes ? `<div class="card-note">${entry.notes}</div>` : '';
  const times = entry.count === 1 ? 'once' : `${entry.count} times`;
  studyArea.innerHTML = `
    <div class="flashcard-stage">
      <div class="progress-text">Card ${fcState.index + 1} of ${fcState.deck.length} &middot; Question ${entry.chapter}</div>
      <div class="flashcard ${fcState.flipped ? 'flipped' : ''}" id="fcCard">
        <div class="flashcard-inner">
          <div class="flashcard-face front">
            <div class="word latin${frontClass}">${frontText}</div>
            <div class="sub">${entry.pos}</div>
            <div class="hint">Click card to flip</div>
          </div>
          <div class="flashcard-face back">
            <div class="word">${entry.english}</div>
            <div class="sub">${genderPill}</div>
            ${noteHTML}
            <div class="card-count">Used ${times} in Qq. 1–10</div>
            <div class="hint">Click card to flip</div>
          </div>
        </div>
      </div>
      <div class="flashcard-controls">
        <button class="secondary" id="fcPrev">&larr; Prev</button>
        <button id="fcShuffle">Shuffle</button>
        <button class="secondary" id="fcNext">Next &rarr;</button>
      </div>
    </div>
  `;
  document.getElementById('fcCard').onclick = () => {
    fcState.flipped = !fcState.flipped;
    renderFlashcards();
  };
  document.getElementById('fcPrev').onclick = () => {
    fcState.index = (fcState.index - 1 + fcState.deck.length) % fcState.deck.length;
    fcState.flipped = false;
    renderFlashcards();
  };
  document.getElementById('fcNext').onclick = () => {
    fcState.index = (fcState.index + 1) % fcState.deck.length;
    fcState.flipped = false;
    renderFlashcards();
  };
  document.getElementById('fcShuffle').onclick = () => {
    fcState.deck = shuffle(fcState.deck);
    fcState.index = 0;
    fcState.flipped = false;
    renderFlashcards();
  };
}

// ---------------- Learning mode ----------------
// Every word is asked until it's answered right once. Between a fifth and a third of the words are
// typed: the English is shown and the student types the Latin (just the first form of a noun,
// adjective, pronoun, numeral, or verb: its nominative or first principal part). The rest are
// multiple choice, Latin to English or English to Latin. A missed word goes to the back of the
// queue and comes back as the same question: typed again, or the same choices in a new order.
const lmState = { queue: [], total: 0, mastered: new Set(), current: null, answered: false, round: 0 };

// How many of a round's words are typed.
function typedCount(total) {
  const fewest = Math.ceil(total / 5);
  const most = Math.max(fewest, Math.floor(total / 3));
  return Math.min(total, fewest + Math.floor(Math.random() * (most - fewest + 1)));
}

function startLearn() {
  const words = shuffle(currentWords());
  const typed = new Set(shuffle(words).slice(0, typedCount(words.length)).map(w => w.id));
  lmState.queue = words.map(entry => ({ entry, typed: typed.has(entry.id), direction: null, options: null }));
  lmState.total = words.length;
  lmState.mastered = new Set();
  lmState.round++;
  nextQuestion();
}

function nextQuestion() {
  lmState.answered = false;
  if (lmState.total === 0) {   // no chapter selected: renderLearn asks for one
    renderLearn();
    return;
  }
  if (lmState.queue.length === 0) {
    renderLearnComplete();
    return;
  }
  const question = lmState.queue[0];
  if (!question.typed) {
    if (question.options) {
      question.options = reshuffled(question.options, question.entry);
    } else {
      question.direction = Math.random() < 0.5 ? 'l2e' : 'e2l'; // latin-to-english or english-to-latin
      question.options = buildOptions(question.entry, question.direction);
    }
  }
  lmState.current = question;
  renderLearn();
}

// The same choices in a new order, with the right answer in a new place when it can be.
function reshuffled(options, entry) {
  const was = options.indexOf(entry);
  let next = shuffle(options);
  for (let tries = 0; tries < 10 && options.length > 1 && next.indexOf(entry) === was; tries++) next = shuffle(options);
  return next;
}

// Moves on after a pause, unless the student has restarted or changed modes in the meantime.
function afterLearnPause(ms) {
  const round = lmState.round;
  setTimeout(() => {
    if (state.mode === 'learn' && lmState.round === round) nextQuestion();
  }, ms);
}

// How many answers a question offers. The Test is the harder one: a blind guess
// is right one time in six instead of one in four.
const LEARN_CHOICES = 4;
const TEST_CHOICES = 6;

// The correct answer plus up to `count - 1` distractors. A distractor is skipped if it
// shares the prompt with the correct word (e.g. "light" = lūx / lūmen), since it would
// also be a right answer, or if it would display the same text as another option. When
// the choices are Latin and the answer is a verb, the wrong choices are verbs (so the
// principal parts don't give it away); an adjective's are adjectives, so its other forms
// don't either. Words from the other questions fill in when the chosen questions run
// short (Question 6 has only six words).
function buildOptions(entry, direction, count = LEARN_CHOICES) {
  const prompt = displayFront(entry, direction);
  const seen = new Set([displayOption(entry, direction)]);
  const distractors = [];
  const add = words => {
    for (const w of shuffle(words)) {
      if (distractors.length === count - 1) return;
      const text = displayOption(w, direction);
      if (w.id === entry.id || seen.has(text) || displayFront(w, direction) === prompt) continue;
      seen.add(text);
      distractors.push(w);
    }
  };
  if (direction === 'e2l' && (entry.pos === 'Verb' || entry.pos === 'Adjective')) {
    const hasParts = w => principalPartsOf(w, PARTS_FROM_CHAPTER).length > 0;
    const shownLikeIt = w => w.pos === entry.pos && hasParts(w) === hasParts(entry);
    add(currentWords().filter(shownLikeIt));
    add(VOCAB.filter(shownLikeIt));
  }
  add(currentWords());
  add(VOCAB);
  return shuffle([entry, ...distractors]);
}

// The Latin side of a question: a verb comes with every principal part the textbook lists for it.
function latinForm(entry) {
  const parts = principalPartsOf(entry, PARTS_FROM_CHAPTER);
  return parts.length ? [entry.latin, ...parts].join(', ') : entry.latin;
}
function displayFront(entry, direction) {
  return direction === 'l2e' ? latinForm(entry) : entry.english;
}
function displayOption(entry, direction) {
  if (direction === 'l2e') {
    return entry.english + (entry.gender ? ` (${entry.gender})` : '');
  }
  return latinForm(entry);
}

function renderLearn() {
  if (lmState.total === 0) {
    studyArea.innerHTML = '<div class="empty-state">Select at least one question to begin.</div>';
    return;
  }
  const question = lmState.current;
  const stats = `
    <div class="stat-row">
      <div class="stat"><div class="num">${lmState.mastered.size}/${lmState.total}</div><div class="label">Mastered</div></div>
      <div class="stat"><div class="num">${lmState.queue.length}</div><div class="label">Remaining in queue</div></div>
    </div>`;
  if (question.typed) {
    renderTypedQuestion(question.entry, stats);
    return;
  }
  const { entry, direction, options } = question;
  const promptLabel = direction === 'l2e' ? 'What does this word mean?' : 'Which Latin word matches?';
  studyArea.innerHTML = `
    ${stats}
    <div class="mc-sub">${promptLabel}</div>
    <div class="mc-prompt latin">${displayFront(entry, direction)}</div>
    <div class="mc-options" id="mcOptions"></div>
  `;
  const optionsDiv = document.getElementById('mcOptions');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'mc-option latin';
    btn.textContent = displayOption(opt, direction);
    btn.onclick = () => handleAnswer(opt, btn, optionsDiv);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(selected, btnEl, optionsDiv) {
  if (lmState.answered) return;
  lmState.answered = true;
  const question = lmState.current;
  const correct = selected.id === question.entry.id;
  const buttons = [...optionsDiv.children];
  buttons.forEach(b => (b.disabled = true));
  if (correct) {
    btnEl.classList.add('correct');
  } else {
    btnEl.classList.add('incorrect');
    const correctBtn = buttons.find(b => b.textContent === displayOption(question.entry, question.direction));
    if (correctBtn) correctBtn.classList.add('correct');
  }

  lmState.queue.shift();
  if (correct) lmState.mastered.add(question.entry.id);
  else lmState.queue.push(question);   // back later, its choices in a new order

  afterLearnPause(900);
}

const MACRONS = ['ā', 'ē', 'ī', 'ō', 'ū'];

// A typed question: the English, and a box for the Latin.
function renderTypedQuestion(entry, stats) {
  const hint = typedHintOf(entry, PARTS_FROM_CHAPTER);
  studyArea.innerHTML = `
    ${stats}
    <div class="mc-sub">Type the Latin for this word.${hint ? ` ${hint}` : ''}</div>
    <div class="mc-prompt">${entry.english}</div>
    <div class="typed-pos">${entry.pos.toLowerCase()}</div>
    <form class="typed-answer" id="typedForm" autocomplete="off">
      <input type="text" id="typedInput" class="latin" aria-label="The Latin" spellcheck="false" autocapitalize="off" autocorrect="off">
      <button type="submit" id="typedCheck">Check</button>
    </form>
    <div class="typed-macrons" id="typedMacrons"><span class="legend" style="margin:0;">Macrons are optional:</span></div>
    <div class="typed-feedback" id="typedFeedback" aria-live="polite"></div>
  `;
  const input = document.getElementById('typedInput');
  const macrons = document.getElementById('typedMacrons');
  MACRONS.forEach(ch => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'secondary latin';
    btn.textContent = ch;
    btn.onclick = () => insertAtCursor(input, ch);
    macrons.appendChild(btn);
  });
  document.getElementById('typedForm').onsubmit = e => {
    e.preventDefault();
    checkTypedAnswer(input);
  };
  input.focus();
}

function checkTypedAnswer(input) {
  if (lmState.answered || !input.value.trim()) return;
  lmState.answered = true;
  const question = lmState.current;
  const match = typedMatchOf(question.entry, input.value, VOCAB, PARTS_FROM_CHAPTER);
  input.disabled = true;
  input.classList.add(match ? 'correct' : 'incorrect');
  document.getElementById('typedCheck').disabled = true;
  document.querySelectorAll('#typedMacrons button').forEach(b => (b.disabled = true));
  const feedback = document.getElementById('typedFeedback');

  lmState.queue.shift();
  if (match) {
    lmState.mastered.add(question.entry.id);
    feedback.className = 'typed-feedback correct';
    feedback.innerHTML = `✓ <span class="latin">${typedAnswerOf(match, PARTS_FROM_CHAPTER)}</span>`;
    afterLearnPause(900);
    return;
  }
  lmState.queue.push(question);   // back later, typed again
  feedback.className = 'typed-feedback incorrect';
  feedback.innerHTML = `The answer is <span class="latin">${typedAnswerOf(question.entry, PARTS_FROM_CHAPTER)}</span>
    <button type="button" id="typedNext">Next</button>`;
  const next = document.getElementById('typedNext');
  next.onclick = nextQuestion;
  next.focus();
}

function renderLearnComplete() {
  studyArea.innerHTML = `
    <div class="empty-state">
      <div style="font-size:2.4rem;">🎉</div>
      <h2 style="color:var(--maroon-dark);">Activity complete!</h2>
      <p>You answered all ${lmState.total} words correctly.</p>
      <button id="lmRestart">Study again</button>
    </div>
  `;
  document.getElementById('lmRestart').onclick = startLearn;
}

// ---------------- Mode switching ----------------
// ---------------- Test mode (fixed 20 questions, six choices each, no requeue) ----------------
const testState = { questions: [], index: 0, correct: 0, current: null, direction: null, options: [], answered: false };

function startTest() {
  const words = currentWords();
  testState.questions = shuffle(words).slice(0, Math.min(20, words.length));
  testState.index = 0;
  testState.correct = 0;
  nextTestQuestion();
}

function nextTestQuestion() {
  testState.answered = false;
  if (testState.questions.length === 0) {
    renderTest(); // "Select at least one question", not "Test complete! 0/0"
    return;
  }
  if (testState.index >= testState.questions.length) {
    renderTestComplete();
    return;
  }
  const entry = testState.questions[testState.index];
  const direction = Math.random() < 0.5 ? 'l2e' : 'e2l';
  const options = buildOptions(entry, direction, TEST_CHOICES);
  testState.current = entry;
  testState.direction = direction;
  testState.options = options;
  renderTest();
}

function renderTest() {
  if (testState.questions.length === 0) {
    studyArea.innerHTML = '<div class="empty-state">Select at least one question to begin.</div>';
    return;
  }
  const { current, direction, options, index, questions, correct } = testState;
  const promptLabel = direction === 'l2e' ? 'What does this word mean?' : 'Which Latin word matches?';
  studyArea.innerHTML = `
    <div class="stat-row">
      <div class="stat"><div class="num">${index + 1}/${questions.length}</div><div class="label">Question</div></div>
      <div class="stat"><div class="num">${correct}</div><div class="label">Correct so far</div></div>
    </div>
    <div class="mc-sub">${promptLabel}</div>
    <div class="mc-prompt latin">${displayFront(current, direction)}</div>
    <div class="mc-options" id="mcOptions"></div>
  `;
  const optionsDiv = document.getElementById('mcOptions');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'mc-option latin';
    btn.textContent = displayOption(opt, direction);
    btn.onclick = () => handleTestAnswer(opt, btn, optionsDiv);
    optionsDiv.appendChild(btn);
  });
}

function handleTestAnswer(selected, btnEl, optionsDiv) {
  if (testState.answered) return;
  testState.answered = true;
  const correct = selected.id === testState.current.id;
  const buttons = [...optionsDiv.children];
  buttons.forEach(b => (b.disabled = true));
  if (correct) {
    btnEl.classList.add('correct');
    testState.correct++;
  } else {
    btnEl.classList.add('incorrect');
    const correctBtn = buttons.find(b => b.textContent === displayOption(testState.current, testState.direction));
    if (correctBtn) correctBtn.classList.add('correct');
  }
  testState.index++;
  setTimeout(nextTestQuestion, 900);
}

function renderTestComplete() {
  const total = testState.questions.length;
  const score = `${testState.correct}/${total}`;
  studyArea.innerHTML = `
    <div class="empty-state">
      <div style="font-size:2.4rem;">📝</div>
      <h2 style="color:var(--maroon-dark);">Test complete!</h2>
      <p>You got <strong>${score}</strong> correct.</p>
      <button id="testRestart">Try again</button>
    </div>
  `;
  document.getElementById('testRestart').onclick = startTest;
}

function restart() {
  syncLink();
  if (state.mode === 'flashcards') startFlashcards();
  else if (state.mode === 'learn') startLearn();
  else startTest();
}

const modeButtons = [
  [modeFlashcardsBtn, 'flashcards'],
  [modeLearnBtn, 'learn'],
  [modeTestBtn, 'test'],
];
function setMode(mode) {
  state.mode = mode;
  modeButtons.forEach(([b, m]) => b.classList.toggle('active', m === mode));
  restart();
}
modeButtons.forEach(([btn, mode]) => { btn.onclick = () => setMode(mode); });

renderChapterPicker();
setMode(state.mode);
