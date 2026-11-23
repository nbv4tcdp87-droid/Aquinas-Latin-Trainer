// Lessons: short grammar lessons for reading the Summa, on what it needs beyond Latin for the New Millennium,
// Chapters 1-10. The lessons themselves are data (data/lessons/); this page draws the list, a lesson, and the
// practice at its end, and keeps each lesson's best practice score in this browser.
//
// Lesson text uses a small markup (see md below): *Latin* in italics, **bold**, [highlighted] words in
// examples, and {{lesson-id}} for a link to another lesson.
import { LESSONS } from '../data/lessons/index.js';
import { linkParam, updateLink } from './book.js';
import { normalizeLatin, insertAtCursor, shuffle } from './util.js';

const PROGRESS_KEY = 'summa-lessons-progress-v1';
const MACRONS = ['ā', 'ē', 'ī', 'ō', 'ū'];

const listCard = document.getElementById('lessonListCard');
const listEl = document.getElementById('lessonList');
const lessonCard = document.getElementById('lessonCard');
const area = document.getElementById('lessonArea');

const byId = new Map(LESSONS.map((lesson, i) => [lesson.id, { lesson, number: i + 1 }]));

// ---- Best scores, kept in this browser only ----
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function saveScore(id, score, total) {
  const progress = loadProgress();
  const old = progress[id];
  // A lesson whose practice has changed since the old score starts over.
  if (old && old.total === total && old.best >= score) return;
  progress[id] = { best: score, total };
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch (e) { /* private mode */ }
}

// ---- Markup ----
const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function lessonLink(id) {
  const target = byId.get(id);
  return target ? `<a href="lessons.html?lesson=${id}">Lesson ${target.number}</a>` : escapeHtml(id);
}

function md(text) {
  return escapeHtml(text ?? '')
    .replace(/\{\{([a-z0-9-]+)\}\}/g, (m, id) => lessonLink(id))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="latin">$1</em>')
    .replace(/\[(.+?)\]/g, '<mark>$1</mark>');
}

// The same text without its markup, for places that can't hold HTML (a select's options).
const plain = text => String(text ?? '').replace(/\{\{[a-z0-9-]+\}\}/g, '').replace(/\*\*|\*|\[|\]/g, '');

// ---- A lesson's explanation ----
function renderTable(block) {
  const [head, ...rows] = block.table;
  const latin = new Set(block.latin ?? head.map((_, i) => i).slice(1));
  const width = head.length;
  const cell = (text, i, tag) => `<${tag}${latin.has(i) && tag === 'td' ? ' class="latin"' : ''}>${md(text)}</${tag}>`;
  const body = rows.map(row => (typeof row === 'string'
    ? `<tr class="group-row"><th colspan="${width}">${md(row)}</th></tr>`
    : `<tr>${row.map((c, i) => (i === 0 && block.rowHeads !== false ? `<th scope="row">${md(c)}</th>` : cell(c, i, 'td'))).join('')}</tr>`)).join('');
  return `<div class="table-wrap"><table class="lesson-table">
    ${block.caption ? `<caption>${md(block.caption)}</caption>` : ''}
    <thead><tr>${head.map(h => `<th scope="col">${md(h)}</th>`).join('')}</tr></thead>
    <tbody>${body}</tbody></table></div>`;
}

function renderBlock(block) {
  if (typeof block === 'string') return `<p>${md(block)}</p>`;
  if (block.p) return `<p>${md(block.p)}</p>`;
  if (block.ul) return `<ul>${block.ul.map(item => `<li>${md(item)}</li>`).join('')}</ul>`;
  if (block.tip) return `<div class="lesson-tip">${md(block.tip)}</div>`;
  if (block.table) return renderTable(block);
  if (block.ex) {
    return `<div class="lesson-example">
      <div class="ex-la latin">${md(block.ex)}</div>
      <div class="ex-en">${md(block.en)}</div>
      ${block.note ? `<div class="ex-note">${md(block.note)}</div>` : ''}
      ${block.ref ? `<div class="ex-ref">${escapeHtml(block.ref)}</div>` : ''}
    </div>`;
  }
  return '';
}

// ---- The list ----
function showList() {
  updateLink({});
  lessonCard.style.display = 'none';
  listCard.style.display = '';
  const progress = loadProgress();
  listEl.innerHTML = LESSONS.map((lesson, i) => {
    const p = progress[lesson.id];
    const status = !p ? ''
      : p.best === p.total ? `<span class="lesson-status done">✓ ${p.best}/${p.total}</span>`
      : `<span class="lesson-status">Best ${p.best}/${p.total}</span>`;
    return `<button class="lesson-item" data-id="${lesson.id}">
      <span class="lesson-num">${i + 1}</span>
      <span class="lesson-text">
        <span class="lesson-title">${md(lesson.title)}</span>
        <span class="lesson-summary">${md(lesson.summary)}</span>
      </span>
      ${status}
    </button>`;
  }).join('');
  listEl.querySelectorAll('.lesson-item').forEach(btn => { btn.onclick = () => showLesson(btn.dataset.id); });
}

// ---- A lesson ----
function showLesson(id) {
  const entry = byId.get(id);
  if (!entry) { showList(); return; }
  const { lesson, number } = entry;
  updateLink({ lesson: id });
  listCard.style.display = 'none';
  lessonCard.style.display = '';
  const prev = LESSONS[number - 2];
  const next = LESSONS[number];
  const scored = lesson.practice.filter(x => x.type !== 'translate').length;
  area.innerHTML = `
    <div class="lesson-top">
      <button class="secondary" id="backToList">&larr; All lessons</button>
      <a class="lesson-jump" href="#practice">Skip to practice &darr;</a>
    </div>
    <p class="pill">Lesson ${number} of ${LESSONS.length}</p>
    <h2 class="lesson-heading">${md(lesson.title)}</h2>
    <div class="lesson-body">
      ${lesson.intro ? `<p class="lesson-intro">${md(lesson.intro)}</p>` : ''}
      ${lesson.sections.map(s => `<h3>${md(s.h)}</h3>${s.blocks.map(renderBlock).join('')}`).join('')}
    </div>
    <h3 class="practice-heading" id="practice">Practice</h3>
    <p class="legend">${scored} questions are scored on your first answer${scored < lesson.practice.length ? '; a translation at the end is yours to compare with the model' : ''}. Macrons are optional when you type.</p>
    <div id="exercises"></div>
    <div id="lessonScore" aria-live="polite"></div>
    <div class="lesson-nav">
      ${prev ? `<button class="secondary" data-go="${prev.id}">&larr; Lesson ${number - 1}</button>` : '<span></span>'}
      <button class="secondary" data-go="">All lessons</button>
      ${next ? `<button data-go="${next.id}">Lesson ${number + 1}: ${md(next.title)} &rarr;</button>` : '<span></span>'}
    </div>
  `;
  document.getElementById('backToList').onclick = showList;
  area.querySelectorAll('[data-go]').forEach(btn => {
    btn.onclick = () => (btn.dataset.go ? showLesson(btn.dataset.go) : showList());
  });
  renderPractice(lesson);
  window.scrollTo(0, 0);
}

// ---- Practice ----
function head(x, n) {
  return `<div class="exercise-q"><span class="exercise-num">${n}.</span> ${md(x.q)}</div>
    ${x.la ? `<div class="exercise-la latin">${md(x.la)}</div>` : ''}
    ${x.ref ? `<div class="ex-ref">${escapeHtml(x.ref)}</div>` : ''}`;
}

function showWhy(el, ok, text) {
  const why = el.querySelector('.exercise-why');
  why.innerHTML = `<strong>${ok ? 'Correct.' : 'Not quite.'}</strong> ${md(text)}`;
  why.hidden = false;
}

function renderChoice(el, x, n, done) {
  const order = shuffle(x.options.map((_, i) => i));
  el.innerHTML = `${head(x, n)}
    <div class="mc-options">${order.map(i => `<button class="mc-option" data-i="${i}">${md(x.options[i])}</button>`).join('')}</div>
    <div class="exercise-why" hidden></div>`;
  const buttons = [...el.querySelectorAll('.mc-option')];
  buttons.forEach(btn => {
    btn.onclick = () => {
      const ok = Number(btn.dataset.i) === x.answer;
      buttons.forEach(b => {
        b.disabled = true;
        if (Number(b.dataset.i) === x.answer) b.classList.add('correct');
      });
      if (!ok) btn.classList.add('incorrect');
      showWhy(el, ok, x.why);
      done(ok);
    };
  });
}

const typedClean = s => normalizeLatin(s).replace(/[.,;:!?"“”]/g, '').replace(/\s+/g, ' ').trim();

function renderTyped(el, x, n, done) {
  el.innerHTML = `${head(x, n)}
    <form class="typed-answer" autocomplete="off">
      <input type="text" class="${x.english ? '' : 'latin'}" aria-label="Your answer" spellcheck="false" autocapitalize="off" autocorrect="off">
      <button type="submit">Check</button>
    </form>
    ${x.english ? '' : '<div class="typed-macrons"><span class="legend" style="margin:0;">Macrons are optional:</span></div>'}
    <div class="exercise-why" hidden></div>`;
  const input = el.querySelector('input');
  const form = el.querySelector('form');
  const macrons = el.querySelector('.typed-macrons');
  if (macrons) {
    MACRONS.forEach(ch => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'secondary latin';
      btn.textContent = ch;
      btn.onclick = () => insertAtCursor(input, ch);
      macrons.appendChild(btn);
    });
  }
  form.onsubmit = e => {
    e.preventDefault();
    if (!input.value.trim()) return;
    const ok = x.answers.some(a => typedClean(a) === typedClean(input.value));
    input.disabled = true;
    form.querySelector('button').disabled = true;
    input.classList.add(ok ? 'correct' : 'incorrect');
    if (macrons) macrons.hidden = true;
    const answer = x.english ? x.answers[0] : `*${x.answers[0]}*`;
    showWhy(el, ok, `${ok ? '' : `The answer: ${answer}. `}${x.why ?? ''}`);
    done(ok);
  };
}

// A sentence whose words are buttons; {braces} in the data mark the words to find.
function renderPick(el, x, n, done) {
  const tokens = [];
  for (const m of x.la.matchAll(/\{([^}]+)\}|(\p{L}+)|([^\p{L}{}]+)/gu)) {
    if (m[1] !== undefined) tokens.push({ word: m[1], target: true });
    else if (m[2] !== undefined) tokens.push({ word: m[2], target: false });
    else tokens.push({ text: m[3] });
  }
  el.innerHTML = `${head({ ...x, la: null, ref: null }, n)}
    <div class="pick-sentence latin">${tokens.map((t, i) => (t.word
      ? `<button type="button" class="pick-word" data-i="${i}" aria-pressed="false">${escapeHtml(t.word)}</button>`
      : `<span class="pick-gap">${escapeHtml(t.text)}</span>`)).join('')}</div>
    ${x.ref ? `<div class="ex-ref">${escapeHtml(x.ref)}</div>` : ''}
    <div class="exercise-actions"><button type="button" class="pick-check" disabled>Check</button></div>
    <div class="exercise-why" hidden></div>`;
  const words = [...el.querySelectorAll('.pick-word')];
  const check = el.querySelector('.pick-check');
  words.forEach(btn => {
    btn.onclick = () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      btn.classList.toggle('selected', on);
      check.disabled = !words.some(w => w.classList.contains('selected'));
    };
  });
  check.onclick = () => {
    let ok = true;
    for (const btn of words) {
      const target = tokens[Number(btn.dataset.i)].target;
      const chosen = btn.classList.contains('selected');
      btn.disabled = true;
      btn.classList.remove('selected');
      if (target && chosen) btn.classList.add('hit');
      else if (target) { btn.classList.add('missed'); ok = false; }
      else if (chosen) { btn.classList.add('wrong'); ok = false; }
    }
    check.disabled = true;
    showWhy(el, ok, `${ok ? '' : 'The right words are outlined in green. '}${x.why ?? ''}`);
    done(ok);
  };
}

function renderMatch(el, x, n, done) {
  const order = shuffle(x.pairs.map((_, i) => i));
  el.innerHTML = `${head(x, n)}
    <div class="match-list">${x.pairs.map((pair, i) => `
      <div class="match-row" data-i="${i}">
        <div class="match-left">${md(pair[0])}</div>
        <select aria-label="Match for ${escapeHtml(plain(pair[0]))}">
          <option value="">Choose…</option>
          ${order.map(j => `<option value="${j}">${escapeHtml(plain(x.pairs[j][1]))}</option>`).join('')}
        </select>
        <div class="match-fix" hidden></div>
      </div>`).join('')}</div>
    <div class="exercise-actions"><button type="button" class="match-check" disabled>Check</button></div>
    <div class="exercise-why" hidden></div>`;
  const rows = [...el.querySelectorAll('.match-row')];
  const selects = rows.map(r => r.querySelector('select'));
  const check = el.querySelector('.match-check');
  selects.forEach(s => { s.onchange = () => { check.disabled = selects.some(t => !t.value); }; });
  check.onclick = () => {
    let ok = true;
    rows.forEach((row, i) => {
      const right = selects[i].value === String(i);
      selects[i].disabled = true;
      row.classList.add(right ? 'correct' : 'incorrect');
      if (!right) {
        ok = false;
        const fix = row.querySelector('.match-fix');
        fix.innerHTML = `&rarr; ${md(x.pairs[i][1])}`;
        fix.hidden = false;
      }
    });
    check.disabled = true;
    showWhy(el, ok, x.why ?? '');
    done(ok);
  };
}

// Not scored: the student's own translation, then the model.
function renderTranslate(el, x, n) {
  el.innerHTML = `${head({ q: x.q ?? 'Translate, then compare your version with the model translation.', la: x.la, ref: x.ref }, n)}
    <div class="translation-box">
      <textarea rows="2" placeholder="Type your English translation…" aria-label="Your translation"></textarea>
      <button type="button" class="secondary" disabled>Show Model Translation</button>
      <div class="model-translation" style="display:none;"></div>
    </div>`;
  const box = el.querySelector('textarea');
  const btn = el.querySelector('button');
  const model = el.querySelector('.model-translation');
  const shown = () => model.style.display === 'block';
  box.addEventListener('input', () => { if (!shown()) btn.disabled = !box.value.trim(); });
  btn.onclick = () => {
    if (shown()) {
      model.style.display = 'none';
      btn.textContent = 'Show Model Translation';
      btn.disabled = !box.value.trim();
      return;
    }
    model.innerHTML = `<strong>Model translation:</strong> ${md(x.model)}${x.why ? `<div class="model-note"><strong>Note:</strong> ${md(x.why)}</div>` : ''}`;
    model.style.display = 'block';
    btn.textContent = 'Hide Model Translation';
  };
}

const RENDER = { choice: renderChoice, typed: renderTyped, pick: renderPick, match: renderMatch, translate: renderTranslate };

function renderPractice(lesson) {
  const box = document.getElementById('exercises');
  const scoreEl = document.getElementById('lessonScore');
  box.innerHTML = '';
  scoreEl.innerHTML = '';
  const total = lesson.practice.filter(x => x.type !== 'translate').length;
  const results = new Map();
  lesson.practice.forEach((x, i) => {
    const el = document.createElement('div');
    el.className = `exercise exercise-${x.type}`;
    box.appendChild(el);
    RENDER[x.type](el, x, i + 1, ok => {
      results.set(i, ok);
      el.classList.add(ok ? 'right' : 'wrong');
      if (results.size === total) finish();
    });
  });

  function finish() {
    const score = [...results.values()].filter(Boolean).length;
    saveScore(lesson.id, score, total);
    scoreEl.innerHTML = `<div class="score-banner${score === total ? ' all-correct' : ''}">
      <span><strong>${score} of ${total}</strong> right on the first try.${score === total ? ' Optimē!' : ''}</span>
      <button type="button" class="secondary" id="retryPractice">Try the practice again</button>
    </div>`;
    document.getElementById('retryPractice').onclick = () => {
      renderPractice(lesson);
      document.getElementById('practice').scrollIntoView({ behavior: 'smooth' });
    };
  }
}

// ---- Start ----
const start = linkParam('lesson');
if (start && byId.has(start)) showLesson(start);
else showList();
