import { loadVocab, loadSentences } from './book.js';

const [vocab, sentences] = await Promise.all([loadVocab(), loadSentences()]);
const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

set('vocabTileText', `Flashcards, a learning mode with multiple-choice and typed questions, and a 20-question test, organized by question and article. ${vocab.length} words, each used at least three times in Questions 1–10.`);
set('translateTileText', `Tag case, number, gender, person, tense, mood, agreement, and syntax in ${sentences.length} sentences from the Summa, then translate them.`);
