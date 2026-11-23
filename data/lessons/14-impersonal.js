// Lesson 14: impersonal verbs (vidētur, oportet, convenit, patet, sequitur, contingit, accidit, licet) and
// expressions (necesse est, manifestum est…), what follows them, convenit with the dative, the impersonal passive
// (prōcēditur, tractātur, accēditur), and nōn est prōcēdere.
export default {
  id: 'impersonal',
  title: 'Impersonal Verbs: *vidētur, oportet, convenit*',
  summary: 'Verbs with no personal subject (*oportet*, *convenit*, *patet*, *contingit*), the impersonal passive (*prōcēditur*), and what follows them: an infinitive, *quod*, or a dative.',
  intro: 'Many of Thomas\'s favorite verbs have no person as their subject: "it seems", "it is necessary", "it belongs", "it is clear", "it follows". Together they come about 450 times in Questions 1–10, and they are the hinges of his arguments.',
  sections: [
    {
      h: 'The common impersonal verbs',
      blocks: [
        {
          table: [
            ['Verb', 'Meaning', 'What follows'],
            ['*vidētur*', 'it seems', '*quod* + subjunctive; or a personal subject + infinitive'],
            ['*oportet*', 'it is necessary, must', 'an infinitive; an accusative and infinitive; or *quod* + subjunctive'],
            ['*convenit*', 'it belongs to, befits, suits', 'a dative (to whom), and a subject or infinitive'],
            ['*patet*', 'it is clear', '*quod* + indicative; *ut patet*, "as is clear"'],
            ['*sequitur*', 'it follows', '*quod* + subjunctive (deponent, {{deponent}})'],
            ['*contingit*', 'it happens; it is possible', 'an accusative and infinitive, or *quod*/*ut*'],
            ['*accidit*', 'it happens; it is incidental to', 'a dative'],
            ['*licet*', 'it is permitted', 'a dative and infinitive (and *licet* + subjunctive is "although", {{subjunctive-uses}})'],
          ],
          latin: [],
        },
        'Expressions with *est* work the same way: *necesse est* ("it is necessary"), *impossibile est*, *possibile est*, *manifēstum est* ("it is clear"), *certum est*, *vērum est*. They take an accusative and infinitive, or a *quod* clause: with the subjunctive after "necessary", "possible" and "impossible", and with the indicative after "clear" and "certain" ({{quod}}).',
      ],
    },
    {
      h: 'Oportet: three ways to say "must"',
      blocks: [
        'All three constructions after *oportet* are best translated with "must":',
        { ex: 'In qualibet enim scientia [oportet supponere] de subiecto quid est…', ref: 'I q. 1 a. 7 arg. 1', en: 'For in any science one must presuppose about the subject what it is…', note: 'An infinitive alone: "it is necessary to presuppose".' },
        { ex: 'Non ergo omnia entia sunt possibilia, sed [oportet aliquid esse] necessarium in rebus.', ref: 'I q. 2 a. 3 co.', en: 'Therefore not all beings are (merely) possible, but something must be necessary among things.', note: 'An accusative and infinitive: "it is necessary that something be".' },
        { ex: '[Oportet] igitur [quod] ipsum esse [comparetur] ad essentiam quae est aliud ab ipso, sicut actus ad potentiam.', ref: 'I q. 3 a. 4 co.', en: 'Existence itself, then, must be related to an essence that is other than it as act is related to potency.', note: '*Quod* with the subjunctive: "it is necessary that existence itself be related".' },
      ],
    },
    {
      h: 'Convenit and the dative',
      blocks: [
        '*Convenit* means "it belongs to, it is fitting for, it applies to", and the one it belongs to is in the dative. Its partner *competit* means the same. Thomas uses them to say what can and cannot be said of God:',
        { ex: 'Hoc autem maxime [convenit Deo].', ref: 'I q. 3 a. 5 arg. 1', en: 'But this belongs to God most of all.' },
        { ex: 'Sic igitur esse ubique primo et per se [convenit Deo], et est proprium eius…', ref: 'I q. 8 a. 4 co.', en: 'Thus, then, to be everywhere belongs to God primarily and essentially (*per sē*), and is proper to him…', note: 'The subject of *convenit* is the infinitive phrase *esse ubīque*.' },
      ],
    },
    {
      h: 'The impersonal passive: prōcēditur',
      blocks: [
        'A verb with no object can still be passive, in the third person singular, with no subject at all: "it is proceeded", that is, "one proceeds". English uses "one", "we", "there is", or turns the sentence around. You have seen *Ad prīmum sīc prōcēditur*. Others:',
        {
          ul: [
            '*ad Deum nōn accēditur passibus corporālibus*, "one does not draw near to God by bodily steps" (I q. 3 a. 1 ad 5);',
            '*dē quibus … tractātur*, "about which there is discussion", that is, "which are treated";',
            '*dē quārum prīncipiīs dubitārī nōn potest*, "about whose principles there can be no doubt" (I q. 1 a. 5 arg. 1);',
            '*sī prōcēdātur in īnfīnītum*, "if one goes on to infinity" (I q. 2 a. 3 co.).',
          ],
        },
        { ex: 'Sed de omnibus entibus [tractatur] in philosophicis disciplinis, et etiam de Deo…', ref: 'I q. 1 a. 1 arg. 2', en: 'But all beings are treated in the philosophical disciplines, and God too…' },
        { tip: '*Est* with an infinitive can mean "it is possible to": *Hīc autem nōn est prōcēdere in īnfīnītum*, "But here one cannot go on to infinity" (I q. 2 a. 3 co.). The idiom comes from Greek and is common in scholastic Latin.' },
      ],
    },
    {
      h: 'Vidētur and dīcitur: personal or impersonal',
      blocks: [
        '*Vidētur* and *dīcitur* can be impersonal, "it seems that", "it is said that", with a *quod* clause. Or they can have a personal subject with an infinitive: *Deus vidētur esse corpus*, "God seems to be a body"; *homō dīcitur esse ad imāginem Deī*, "man is said to be in the image of God" ({{infinitives}}). With an adjective, *vidētur* can also have an infinitive phrase as its subject:',
        { ex: 'Superfluum igitur [videtur], praeter philosophicas disciplinas, aliam doctrinam haberi.', ref: 'I q. 1 a. 1 arg. 1', en: 'It seems superfluous, then, to have another teaching besides the philosophical disciplines.', note: 'Literally "another teaching to be had seems superfluous".' },
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'What does this sentence mean?',
      la: 'Praeterea, situs non [convenit] nisi corpori.',
      ref: 'I q. 3 a. 1 arg. 4',
      options: ['Furthermore, position belongs only to a body.', 'Furthermore, position does not come together with a body.', 'Furthermore, a body does not agree with its position.', 'Furthermore, position is not fitting unless it is a body.'],
      answer: 0,
      why: '*Convenit* with the dative (*corporī*), "belongs to"; *nōn … nisi*, "only".',
    },
    {
      type: 'pick',
      q: 'Click the impersonal verb.',
      la: 'Si autem est aliquid verum, {oportet} quod veritas sit.',
      ref: 'I q. 2 a. 1 arg. 3',
      why: '*Oportet* has no personal subject; the *quod* clause is what "is necessary". (*Est* has the subject *aliquid*, and *sit* has the subject *vēritās*.)',
    },
    {
      type: 'typed',
      q: 'Type the impersonal verb for "it is necessary" that Thomas uses sixty times in Questions 1–10.',
      answers: ['oportet'],
      why: '*Oportet* (*oportēret*, *oportēbit*): "it is necessary", best translated "must".',
    },
    {
      type: 'choice',
      q: 'What is the best translation?',
      la: 'Si autem est aliquid verum, oportet quod veritas sit.',
      ref: 'I q. 2 a. 1 arg. 3',
      options: ['But if anything is true, there must be truth.', 'But if something is true, truth is fitting.', 'But if there is truth, something must be true.', 'But if anything is true, truth ought to be sought.'],
      answer: 0,
      why: '*Oportet quod vēritās sit*, "it is necessary that truth exist": "there must be truth".',
    },
    {
      type: 'choice',
      q: 'What does the highlighted verb mean here?',
      la: 'Ad quintum dicendum quod ad Deum non [acceditur] passibus corporalibus, cum ubique sit, sed affectibus mentis…',
      ref: 'I q. 3 a. 1 ad 5',
      options: ['one draws near', 'God draws near', 'it is added', 'it happens'],
      answer: 0,
      why: 'An impersonal passive: "it is approached", that is, "one draws near". "One does not draw near to God by bodily steps, since he is everywhere, but by the affections of the mind."',
    },
    {
      type: 'match',
      q: 'Match each impersonal verb with its meaning.',
      pairs: [
        ['*patet*', 'it is clear'],
        ['*oportet*', 'it is necessary'],
        ['*convenit*', 'it belongs to'],
        ['*contingit*', 'it happens, it is possible'],
        ['*sequitur*', 'it follows'],
        ['*vidētur*', 'it seems'],
      ],
      why: 'All six take no personal subject: what "is clear", "follows" or "seems" is a clause or an infinitive.',
    },
    {
      type: 'choice',
      q: 'What is the subject of *vidētur* here?',
      la: 'Superfluum igitur videtur, praeter philosophicas disciplinas, [aliam doctrinam haberi].',
      ref: 'I q. 1 a. 1 arg. 1',
      options: ['the highlighted accusative and infinitive', '*superfluum*', '*disciplīnās*', 'Thomas'],
      answer: 0,
      why: '"For another teaching to be had seems superfluous." *Superfluum* is neuter because it describes the infinitive phrase.',
    },
    {
      type: 'choice',
      q: 'What does this sentence mean?',
      la: 'Hic autem non est procedere in infinitum…',
      ref: 'I q. 2 a. 3 co.',
      options: ['But here one cannot go on to infinity.', 'But this is not going on to infinity.', 'But here it does not proceed to infinity.', 'But he is not proceeding to infinity.'],
      answer: 0,
      why: '*Est* with an infinitive means "it is possible to"; *hīc* is the adverb "here" (in a series of movers).',
    },
    {
      type: 'translate',
      la: 'Creator autem et creatura, de quibus in sacra doctrina tractatur, non continentur sub uno genere subiecti.',
      ref: 'I q. 1 a. 3 arg. 1',
      model: 'But the Creator and the creature, which are treated in sacred teaching, are not contained under one genus of subject.',
      why: '*Dē quibus … tractātur*, literally "about which it is treated": an impersonal passive. *Continentur* is an ordinary passive with a subject.',
    },
  ],
};
