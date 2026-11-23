// Lesson 8: participles (present active, perfect passive, future active), participles as nouns (ēns, agēns,
// movēns, mōtum, causātum), participles for clauses, ut ostēnsum est, and the ablative absolute.
export default {
  id: 'participles',
  title: 'Participles and the Ablative Absolute',
  summary: '*Movēns* and *mōtum*, *ēns* and *agēns*, *ut ostēnsum est*, and *positō effectū*: verbal adjectives, verbal nouns, and the ablative absolute.',
  intro: 'A participle is a verbal adjective: it has a tense and a voice like a verb, and it agrees with a noun like an adjective. Thomas\'s philosophy runs on participles: *movēns* and *mōtum* (mover and moved), *agēns* (agent), *ēns* (a being), *causātum* (what is caused). Questions 1–10 have well over five hundred of them.',
  sections: [
    {
      h: 'Three participles',
      blocks: [
        {
          table: [
            ['', 'Form', 'Meaning'],
            ['Present active', 'movēns, moventis', 'moving'],
            ['Perfect passive', 'mōtus, mōta, mōtum', 'moved, having been moved'],
            ['Future active', 'mōtūrus, mōtūra, mōtūrum', 'about to move, going to move'],
          ],
          latin: [1],
          forms: true,
        },
        {
          ul: [
            '**Present active**: the present stem with *-ns* (genitive *-ntis*): *amāns*, *movēns*, *agēns*, and *capiēns*, *audiēns* for the third *-iō* and fourth conjugations. It declines like the one-ending adjective *potēns*, *potentis*: ablative *-e* (or *-ī* when used as an adjective), neuter plural *-ia*, genitive plural *-ium*.',
            '**Perfect passive**: the fourth principal part with *-us, -a, -um*: *dictus*, *creātus*, *ostēnsus*. It declines like *bonus*.',
            '**Future active**: the same stem with *-ūrus, -a, -um*: *futūrus*, "going to be". Thomas rarely needs it, apart from *futūrum*, "the future".',
          ],
        },
        'A participle\'s tense is relative to the main verb: the present participle is happening at the same time, the perfect has already happened, and the future is still to come.',
        '*Ēns, entis*, the present participle of *sum*, is rare in classical Latin but is the medieval philosopher\'s word for "a being, that which is". Thomas pairs it with the infinitive *esse*: *ēns* is "a being", *esse* is "existence, the act of being" ({{infinitives}}).',
      ],
    },
    {
      h: 'Participles as nouns',
      blocks: [
        'With no noun to agree with, a participle becomes a noun: masculine for persons, neuter for things. These are some of Thomas\'s most important terms:',
        {
          table: [
            ['Participle', 'As a noun'],
            ['agēns', 'an agent, what acts'],
            ['movēns', 'a mover, what moves'],
            ['mōtum', 'what is moved'],
            ['causātum', 'what is caused, an effect'],
            ['creātum', 'what is created, a creature'],
            ['ēns', 'a being, what is'],
            ['dicta (ex dictīs)', 'what has been said ("from what has been said")'],
          ],
          latin: [0],
        },
        { ex: 'Ostensum est autem supra quod Deus est primum [ens].', ref: 'I q. 3 a. 1 co.', en: 'Now it was shown above that God is the first being.' },
        { ex: 'Non ergo omnia [entia] sunt possibilia, sed oportet aliquid esse necessarium in rebus.', ref: 'I q. 2 a. 3 co.', en: 'Therefore not all beings are (merely) possible, but there must be something necessary among things.' },
      ],
    },
    {
      h: 'Participles that do the work of clauses',
      blocks: [
        'A participle that agrees with a noun often does the work of a whole clause: "which is …", "when …", "since …", "although …". English usually needs the clause:',
        { ex: 'omnis Scriptura divinitus [inspirata] utilis est ad docendum…', ref: 'I q. 1 a. 1 s. c.', en: 'All Scripture, divinely inspired, is useful for teaching…' },
        'The perfect passive participle is also half of the perfect passive verb, which you know from the indicative: *ostēnsum est*, "it has been shown"; *dictum est*, "it has been said". Thomas points back to earlier proofs with *ut ostēnsum est* and *ut dictum est*, "as has been shown, as has been said"; *ostēnsum est* alone comes twenty-eight times in Questions 1–10.',
        { ex: 'Deus autem est primum agens, cum sit prima causa efficiens, ut [ostensum est].', ref: 'I q. 3 a. 2 co.', en: 'But God is the first agent, since he is the first efficient cause, as has been shown.' },
      ],
    },
    {
      h: 'The ablative absolute',
      blocks: [
        'A noun or pronoun and a participle, both in the ablative and not tied grammatically to the rest of the sentence, make an ablative absolute. It sets the circumstances of the main statement. Translate it with "when", "since", "once", "if" or "although", or with "with …":',
        { ex: '…quia, cum effectus dependeant a causa, [posito effectu] necesse est causam praeexistere.', ref: 'I q. 2 a. 2 co.', en: '…because, since effects depend on their cause, once the effect is posited, the cause must exist beforehand.', note: 'Literally "the effect having been posited". *Pōnō*, "put, posit", is Thomas\'s verb for asserting or supposing something.' },
        { ex: '[Hoc igitur habito], sciendum quod de substantiis spiritualibus duplex fuit opinio.', ref: 'I q. 10 a. 6 co.', en: 'With this established, then, one must know that there were two opinions about spiritual substances.', note: 'Literally "this having been had". *Sciendum*, with *est* understood, is a gerundive ({{gerunds}}).' },
        'The "noun" of an ablative absolute can even be a whole clause: *suppositō quod …*, "supposing that …"; *datō quod …*, "granted that …"; *intellēctō quid …*, "once it is understood what …":',
        { ex: 'Tertio, [supposito] quod ens sit prius, utrum omne ens sit bonum.', ref: 'I q. 5 pr.', en: 'Third, supposing that being is prior, whether every being is good.' },
        { ex: 'Sed [intellecto] quid significet hoc nomen Deus, statim habetur quod Deus est.', ref: 'I q. 2 a. 1 arg. 2', en: 'But once it is understood what this name "God" signifies, it is immediately grasped that God exists.' },
      ],
    },
  ],
  practice: [
    {
      type: 'typed',
      q: 'Give the present active participle of *agō*, nominative singular: "acting, an agent".',
      answers: ['agēns'],
      why: 'Third conjugation: present stem *age-* + *-ns*. Genitive *agentis*.',
    },
    {
      type: 'typed',
      q: 'Give the perfect passive participle of *dīcō*, neuter nominative singular, as in *ut ____ est*, "as has been said".',
      answers: ['dictum'],
      why: 'From the fourth principal part, *dictum*: *ut dictum est*.',
    },
    {
      type: 'choice',
      q: 'What does *movēns* mean when it is used as a noun?',
      options: ['a mover', 'a thing moved', 'a motion', 'something movable'],
      answer: 0,
      why: '*Movēns* is the present active participle: "(something) moving", a mover. The thing moved is *mōtum*, the perfect passive participle.',
    },
    {
      type: 'match',
      q: 'Match each participle with its meaning as a noun.',
      pairs: [
        ['*causātum*', 'what is caused, an effect'],
        ['*agēns*', 'an agent'],
        ['*ēns*', 'a being'],
        ['*mōtum*', 'what is moved'],
        ['*ex dictīs*', 'from what has been said'],
      ],
      why: 'Present participles are active ("doing"); perfect passive participles are passive ("done").',
    },
    {
      type: 'pick',
      q: 'Click the two words that make up the ablative absolute.',
      la: 'Ad tertium dicendum quod, licet, {quibusdam} {positis}, alia poni non sit eis oppositum; tamen infinita poni opponitur cuilibet speciei multitudinis.',
      ref: 'I q. 7 a. 4 ad 3',
      why: '*Quibusdam positīs*, "certain things having been posited": "although, when some things are posited, it is not opposed to them that others be posited, still for infinitely many to be posited is opposed to every kind of multitude."',
    },
    {
      type: 'choice',
      q: 'How is the highlighted phrase best translated?',
      la: 'Ad primum ergo dicendum quod, licet ea quae sunt altiora hominis cognitione, non sint ab homine per rationem inquirenda, sunt tamen, [a Deo revelata], suscipienda per fidem.',
      ref: 'I q. 1 a. 1 ad 1',
      options: ['once revealed by God', 'revealing God', 'about to reveal God', 'God, who has revealed'],
      answer: 0,
      why: '*Revēlāta* is a perfect passive participle agreeing with the subject (*ea*, "those things"): "although the things above human knowledge are not to be searched out by human reason, yet, once revealed by God, they must be accepted by faith."',
    },
    {
      type: 'choice',
      q: 'When does the action of a perfect participle happen?',
      options: ['before the action of the main verb', 'at the same time as the main verb', 'after the main verb', 'at no particular time'],
      answer: 0,
      why: 'A perfect participle has already happened (*positō effectū*: the effect is already posited); a present participle happens at the same time; a future participle is still to come.',
    },
    {
      type: 'choice',
      q: 'How is the highlighted phrase best translated?',
      la: '[Posito igitur quod sit tota], superflue additur quod sit perfecta.',
      ref: 'I q. 10 a. 1 arg. 5',
      options: ['Supposing, then, that it is whole', 'Since it was placed whole', 'What is posited as whole', 'Having placed the whole'],
      answer: 0,
      why: '*Positō* is an ablative absolute whose "noun" is the clause *quod sit tōta*: "it having been posited that it (eternity) is whole, it is superfluous to add that it is perfect."',
    },
    {
      type: 'translate',
      la: '…moventia secunda non movent nisi per hoc quod sunt mota a primo movente, sicut baculus non movet nisi per hoc quod est motus a manu.',
      ref: 'I q. 2 a. 3 co.',
      model: '…second movers do not move except by being moved by the first mover, as a staff does not move except by being moved by the hand.',
      why: '*Moventia secunda*, "second movers", is a neuter plural participle used as a noun; *ā prīmō movente*, "by the first mover", is its ablative. *Per hoc quod sunt mōta*, literally "through this, that they are moved" ({{quod}}).',
    },
  ],
};
