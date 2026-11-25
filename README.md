# Summa Latin — Summa Theologiae I, Questions 1–10

A free, static practice site for reading the Latin of St. Thomas Aquinas's *Summa Theologiae*,
built from the first ten questions of the Prima Pars: sacred doctrine (q. 1), whether God exists
(q. 2), and God's simplicity (q. 3), perfection (q. 4), goodness (qq. 5–6), infinity (q. 7),
existence in things (q. 8), immutability (q. 9), and eternity (q. 10). It uses the same code as the
Latin for the New Millennium practice site (`latin-practice-static`), with the Summa's text,
vocabulary, and grammar in place of the textbook's. No backend, no build step for the pages: plain
HTML/CSS/JS, so it runs from any static host. Progress is kept only in each student's browser.

## Sections

- **Lessons** (`lessons.html`) — fifteen short lessons on the grammar the Summa needs beyond what a
  student brings from the noun declensions, adjective agreement, the indicative, and Latin for the
  New Millennium, Chapters 1–10: how an article is built; the personal, demonstrative, relative,
  interrogative, and indefinite pronouns; comparison; deponent and irregular verbs; participles and
  the ablative absolute; gerunds and gerundives (*dīcendum est*); infinitives, *esse* as a noun,
  and indirect statement; *quod* and *quia* clauses; the subjunctive (forms, indirect questions,
  *vidētur quod*, then *cum*, *ut*, *sī*, *licet*, *oportet quod*); impersonal verbs; and the
  connectives and set phrases of scholastic Latin. Each lesson explains with examples quoted from
  Qq. 1–10 (with references and original translations) and ends with practice: multiple choice,
  matching, typed forms, clicking words in a Summa sentence, and a translation to compare with a
  model. Eight answers per lesson are scored on the first try; the best score shows on the lesson
  list (kept in the browser only).
- **Vocabulary** (`flashcards.html`) — 676 words, each used at least three times in Qq. 1–10,
  grouped by question and, within each question, by article. A word belongs to the first question
  that uses it at least twice, so a word met once in passing is learned where it starts to matter;
  Question 1, the longest and the first, carries the general vocabulary of scholastic Latin (353
  words), and the later questions add their own (from 6 in Q. 6 to 92 in Q. 3). Within its question,
  a word belongs to one article by the same rule (the question's prologue, its list of articles,
  counts with Article 1), so the article sets share no word. They run from 112 words (Q. 1, Article
  1, where the common words start) down to a single word; Q. 6, Article 1 has none, since every word
  it uses belongs to an earlier question. Students choose a whole question, one or more of its
  articles, or several of either, and the page shows how many words that is. Flashcards show the
  dictionary form (a noun with its genitive, a verb with all its principal parts) and, on the back,
  the meaning, a usage note where the Summa has a set phrase (*dīcendum est quod*: it must be said
  that; *per sē nōtum*: self-evident), and how often the word occurs. Learning Mode and the 20-question Test work as on the LFNM site: typed
  questions for a fifth to a third of a round, missed questions asked again, and wrong choices of the
  same kind for verbs and adjectives. One difference: a typed word needs only its first form, the
  nominative of a noun, adjective, pronoun, or numeral (*ratio*, *bonus*) or the first principal
  part of a verb (*moveo*), though the full dictionary entry is accepted too. When the chosen
  articles have too few words for the choices (Q. 7, Article 2 has one), the rest of their
  questions' words fill in first, then the other questions'.
- **Grammar Charts** (`grammar.html`) — every noun, adjective, pronoun, and verb chart of the LFNM
  site, filled with the Summa's words: all five declensions (with i-stems and the participle nouns
  *ēns* and *accidēns*: *ente*, but *entia*, *entium*), adjectives (including the -īus adjectives and
  comparison, with the adjectives the Summa actually compares, such as *dignior*, *nōbilissimus*,
  *simplicius*), demonstrative, intensive, and relative pronouns, all conjugations in every tense,
  voice, and mood, deponents, the irregular verbs and the Summa's compounds of them (*differō*,
  *dēsum*, *adsum*, *exeō*, *trānseō*), the verb synopsis, present participles, and gerunds. A chart
  none of the Summa's words fit is left off the menu. Each word notes its question and how often the
  Summa uses it.
- **Translation & Analysis** (`translate.html`) — 82 sentences taken word for word from the text
  (7–10 per question), chosen to cover the shape of an article and its grammar: the prologue's
  *utrum* questions, *Videtur quod…*, *Sed contra…*, *Respondeo dicendum quod…*, *Ad primum ergo
  dicendum quod…*, and key theses (the five ways, essence and *esse*, the good, eternity). Students
  tag case, number, and gender; person, number, tense, and mood; the tense and voice of
  infinitives; adjective and participle agreement; relative-pronoun antecedents; and how each word is
  used. The usage lists add the Summa's constructions to the LFNM ones: the quod clause, the
  impersonal verb (*videtur*, *oportet*, *convenit*, *proceditur*), the passive periphrastic
  (*dicendum est*), the ablative of respect and of cause, the dative of reference and with
  adjectives, apposition, and the infinitive as object. Where *esse* is plainly a noun (*suum esse*,
  *ipsum esse*, *esse divinum*) it is tagged as a neuter noun, so its adjectives have something to
  agree with. Each sentence shows its reference (e.g. *I, q. 2, a. 3, corpus*); the model
  translation (original) comes with a short note on the construction. There is no Check Translation
  list yet, so translations are check-your-own.

The LFNM site's Derivative Practice is not included.

## Sharing a link

As on the LFNM site, each page keeps its address bar in step with what is chosen:
`flashcards.html?ch=3-5&mode=test`, `grammar.html?chart=v-synopsis&word=moveo`,
`translate.html?ch=2&sentence=s15` (`ch` is the question number; `ch=all` selects every question),
`lessons.html?lesson=subjunctive-forms`. On the vocabulary page `ch` can also name articles:
`flashcards.html?ch=1.2-4,5&mode=learn` is Question 1, Articles 2–4, and all of Question 5.

## Where the content comes from

- **Text**: the Leonine edition (Rome, 1888) as published by the Corpus Thomisticum
  (corpusthomisticum.org, Enrique Alarcón), downloaded to `tools/source/` (`sth1001.html` q. 1,
  `sth1002.html` q. 2, `sth1003.html` qq. 3–14). `tools/parse-source.mjs` extracts Qq. 1–10
  paragraph by paragraph into `tools/text/summa-1-10.json` (416 paragraphs, 27,746 words).
  Neither the downloaded pages nor that file is in this repository, because the Corpus
  Thomisticum's edition is "© Fundación Tomás de Aquino, iura omnia asservantur" (all rights
  reserved); the site itself quotes only single sentences, with credit. To rebuild the data or check
  the lessons' quotations, save the three pages from corpusthomisticum.org into `tools/source/` and
  run `node tools/parse-source.mjs` first.
- **Vocabulary**: `tools/lexicon/*.txt`, one word per line (part of speech, dictionary form with
  macrons, genitive or principal parts, gender, declension or conjugation, meaning, note, flags),
  written for this site. `tools/build-vocab.mjs` generates every form of every word with the site's
  morphology engine, matches them to the text (the lexicon accounts for 97% of its words; the rest
  are words used once or twice), counts each word, assigns its question and article, and writes
  `data/vocabulary.js`, plus `tools/text/coverage.txt` (forms not yet accounted for, and forms shared
  by two words). Proper names and citation abbreviations are matched but never become vocabulary.
  The Summa itself is printed without macrons; the vocabulary has them, and every answer accepts
  either.
- **Sentences**: `tools/sentences/q01.txt`–`q10.txt`, one annotated word per line.
  `tools/build-sentences.mjs` writes `data/sentences.js` and checks each sentence: it must appear
  word for word in the paragraph it cites, the words must spell it out exactly, each tagged noun,
  pronoun, and verb must have the form the morphology engine gives its dictionary word for that
  case, number, person, tense, and mood, and each adjective or participle must agree with the noun
  it is tagged to. Analyses, notes, and translations are original.
- `tools/candidates.mjs` lists a question's shorter sentences, for choosing new ones.
- **Lessons**: `data/lessons/01-article.js` … `15-idioms.js`, one file per lesson (sections of
  paragraphs, tables, and examples, then the practice), listed in order in `data/lessons/index.js`
  and drawn by `js/lessons.js`. In the text, `*…*` marks Latin, `[…]` highlights a word in an
  example, `{…}` marks the words to click in a click-the-words exercise, and `{{lesson-id}}` links
  to another lesson. `tools/check-lessons.mjs` checks every lesson: each example and exercise that
  cites the Summa must quote its paragraph word for word, each paradigm table marked `forms: true`
  must hold only forms (macrons included) that the morphology engine makes, every word of the
  lessons' own Latin must have the vocabulary's macrons wherever the vocabulary has the word, and
  each exercise must be well formed (a choice's answer among its options, words to click, distinct
  matches).

To rebuild after editing the lexicon or the sentences, and to check the lessons after editing them
(Node 18 or later):

```
node tools/build-vocab.mjs
node tools/build-sentences.mjs
node tools/check-lessons.mjs
```

## Running it

Any static file server works, e.g. a small Node server serving this folder. Opening the HTML files
straight from disk doesn't work, because the pages are ES modules.
