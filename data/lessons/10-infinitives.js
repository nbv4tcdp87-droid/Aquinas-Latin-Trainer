// Lesson 10: the infinitive as a noun (movēre, esse: existence), the accusative and infinitive (Deum esse), the
// perfect and future infinitives, and the nominative with dīcitur / vidētur esse.
export default {
  id: 'infinitives',
  title: 'Infinitives: *esse* and Indirect Statement',
  summary: '*Esse* as a noun ("existence"), *Deum esse* ("that God exists"), the perfect and future infinitives, and *dīcitur esse*.',
  intro: '*Esse* appears more than five hundred times in Questions 1–10. Sometimes it is simply "to be"; often it is a noun, "existence"; and often it reports a fact, as in *Deum esse*, "that God exists". This lesson builds on the infinitives and the indirect statement you learned in *Latin for the New Millennium*, Chapters 5–7.',
  sections: [
    {
      h: 'The infinitive as a noun',
      blocks: [
        'An infinitive can be used as a neuter noun: as the subject of a verb, its object, or its complement. In English, "to move" or "moving":',
        { ex: '[Movere] enim nihil aliud est quam [educere] aliquid de potentia in actum…', ref: 'I q. 2 a. 3 co.', en: 'For to move is nothing other than to bring something out of potency into act…' },
        'Thomas goes further with *esse*: it takes adjectives (always neuter), a genitive, and pronouns, just like a noun, and means "existence, the act of being". *Esse Deī* is "God\'s existence"; *suum esse*, "his own existence"; *esse dīvīnum*, "the divine existence"; *ipsum esse*, "existence itself".',
        { ex: 'Cum igitur [esse] divinum non sit [esse] receptum in aliquo, sed ipse sit suum [esse] subsistens, ut supra ostensum est; manifestum est quod ipse Deus sit infinitus et perfectus.', ref: 'I q. 7 a. 1 co.', en: 'Since, then, the divine existence is not an existence received in something, but he is his own subsistent existence, as was shown above, it is clear that God himself is infinite and perfect.' },
        { tip: 'Keep three words apart: *ēns*, "a being", what is (a participle, {{participles}}); *esse*, "existence", the act by which it is; *essentia*, "essence", what it is. Thomas argues that in God alone *esse* and *essentia* are the same.' },
      ],
    },
    {
      h: 'The accusative and infinitive',
      blocks: [
        'You know the pattern from Chapter 7: after a verb of saying, knowing or perceiving, a statement turns its subject into the accusative and its verb into an infinitive. *Quīdam crēdidērunt Deum esse corpus*: "some believed God to be a body", that is, "that God is a body".',
        'The same phrase can serve as the subject of a sentence. This is the topic of all of Question 2: *Deum esse*, literally "God to be", that is, "that God exists" or "God\'s existence":',
        { ex: 'Ergo [Deum esse] est per se notum.', ref: 'I q. 2 a. 1 arg. 1', en: 'Therefore that God exists is self-evident.' },
        'Impersonal expressions take an accusative and infinitive too: *oportet* ("it is necessary"), *necesse est*, *possibile est*, *manifēstum est* ({{impersonal}}):',
        { ex: '…posito effectu necesse est [causam praeexistere].', ref: 'I q. 2 a. 2 co.', en: '…once the effect is posited, it is necessary that the cause exist beforehand.' },
      ],
    },
    {
      h: 'The tenses of the infinitive',
      blocks: [
        {
          table: [
            ['', 'Active', 'Passive'],
            ['Present', 'movēre', 'movērī'],
            ['Perfect', 'mōvisse', 'mōtus esse'],
            ['Future', 'mōtūrus esse', '—'],
          ],
          forms: true,
        },
        {
          ul: [
            '*movēre*, "to move"; *movērī*, "to be moved" (you know these).',
            '*mōvisse*, "to have moved": the perfect stem with *-isse*. For *sum*, *fuisse*, "to have been".',
            '*mōtus esse*, "to have been moved": the perfect passive participle with *esse*, agreeing with its subject.',
            '*mōtūrus esse*, "to be going to move": the future active participle with *esse*. For *sum*, *futūrus esse*, "to be going to be".',
          ],
        },
        'The tense of an infinitive is relative to the main verb: the present is at the same time, the perfect before, the future after. *Dīcit Deum esse*, "he says that God exists"; *dīcit Deum fuisse*, "he says that God existed"; *dīxit Deum esse*, "he said that God existed".',
        { ex: 'Cum igitur sit impossibile aeviterna non [fuisse], sequitur quod impossibile sit ea non [futura esse].', ref: 'I q. 10 a. 5 arg. 3', en: 'Since, then, it is impossible that eviternal things should not have existed, it follows that it is impossible that they should not be going to exist.', note: '*Futūra esse* agrees with *ea*, neuter plural.' },
      ],
    },
    {
      h: 'Nominative and infinitive: dīcitur esse, vidētur esse',
      blocks: [
        'With the passive verbs *dīcitur*, "is said", and *vidētur*, "seems", Latin keeps the subject in the nominative and adds an infinitive: "X is said to be…", "X seems to be…". Any adjective with the infinitive is nominative too.',
        { ex: 'Ad secundum dicendum quod homo [dicitur esse] ad imaginem Dei, non secundum corpus…', ref: 'I q. 3 a. 1 ad 2', en: 'To the second it must be said that man is said to be in the image of God, not according to the body…' },
        { ex: 'Et haec [dicitur fuisse] opinio Almarianorum.', ref: 'I q. 3 a. 8 co.', en: 'And this is said to have been the opinion of the followers of Amalric.' },
        { ex: 'Sed Deus [videtur esse] individuum, non enim de multis praedicatur.', ref: 'I q. 3 a. 2 arg. 3', en: 'But God seems to be an individual, for he is not predicated of many.' },
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'What does *Deum esse* mean here?',
      la: 'Primo, utrum [Deum esse] sit per se notum.',
      ref: 'I q. 2 pr.',
      options: ['that God exists', 'to be God', 'God is', 'God\'s being (a participle)'],
      answer: 0,
      why: 'An accusative and infinitive used as the subject of *sit*: "First, whether (the proposition) that God exists is self-evident."',
    },
    {
      type: 'typed',
      q: 'Give the perfect active infinitive of *sum*: "to have been".',
      answers: ['fuisse'],
      why: 'Perfect stem *fu-* + *-isse*: *haec dīcitur fuisse opīniō*, "this is said to have been the opinion" (I q. 3 a. 8 co.).',
    },
    {
      type: 'choice',
      q: 'What are the three highlighted infinitives?',
      la: 'Praeterea, si in aevo non est prius et posterius, sequitur quod in aeviternis non differat [esse] vel [fuisse] vel [futurum esse].',
      ref: 'I q. 10 a. 5 arg. 3',
      options: [
        'the present, perfect and future of *sum*, used as nouns',
        'three present infinitives',
        'present active, present passive and future passive',
        'three forms of the subjunctive',
      ],
      answer: 0,
      why: '"…it follows that in eviternal things there is no difference between being, having been, and going to be."',
    },
    {
      type: 'pick',
      q: 'Click the accusative that is the subject of *esse*.',
      la: '{Finem} autem oportet esse praecognitum hominibus, qui suas intentiones et actiones debent ordinare in finem.',
      ref: 'I q. 1 a. 1 co.',
      why: '*Oportet* takes an accusative and infinitive: *fīnem … esse praecognitum*, "that the end be known beforehand". "But the end must be known beforehand by men, who must direct their intentions and actions to the end." (The second *fīnem* is the object of *in*.)',
    },
    {
      type: 'choice',
      q: 'What does the highlighted *esse* mean?',
      la: 'Deus enim est suum [esse], ut infra patebit.',
      ref: 'I q. 2 a. 1 co.',
      options: ['existence (used as a noun)', 'to be (with *est*)', 'essence', 'a being'],
      answer: 0,
      why: 'With the possessive *suum*, *esse* is a noun: "God is his own existence". "Essence" is *essentia*, and "a being" is *ēns*.',
    },
    {
      type: 'typed',
      q: 'Give the present passive infinitive of *moveō*: "to be moved".',
      answers: ['movērī'],
      why: 'Second conjugation: *movēre* becomes *movērī*. *Omne quod movētur, oportet ab aliō movērī* (I q. 2 a. 3 co.).',
    },
    {
      type: 'choice',
      q: 'How does this sentence begin?',
      la: 'Sed [Deus videtur esse figuratus], cum scriptum sit Gen. I…',
      ref: 'I q. 3 a. 1 arg. 2',
      options: ['But God seems to have a shape', 'But it seems that God made shapes', 'But God is seen shaping', 'But God has been seen as a figure'],
      answer: 0,
      why: 'Nominative and infinitive with *vidētur*: *Deus vidētur esse figūrātus*, "God seems to be shaped".',
    },
    {
      type: 'match',
      q: 'Match each infinitive with its meaning.',
      pairs: [
        ['*movēre*', 'to move'],
        ['*movērī*', 'to be moved'],
        ['*mōvisse*', 'to have moved'],
        ['*mōtus esse*', 'to have been moved'],
        ['*mōtūrus esse*', 'to be going to move'],
      ],
      why: 'Present, perfect and future infinitives, active and passive.',
    },
    {
      type: 'translate',
      la: 'Omne ergo quod movetur, oportet ab alio moveri.',
      ref: 'I q. 2 a. 3 co.',
      model: 'Therefore everything that is moved must be moved by another.',
      why: '*Oportet* with an infinitive whose subject (*omne quod movētur*) comes first: literally "everything that is moved, it is necessary (for it) to be moved by another".',
    },
  ],
};
