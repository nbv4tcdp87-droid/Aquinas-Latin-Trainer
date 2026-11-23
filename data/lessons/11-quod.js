// Lesson 11: quod and quia clauses (the medieval alternative to the accusative and infinitive), indicative vs.
// subjunctive in them, "the fact that" (ex hōc quod), nōn quod, quia, and how to tell the kinds of quod apart.
export default {
  id: 'quod',
  title: '*Quod* and *quia*: Reporting and Explaining',
  summary: 'The medieval way to report a statement (*dīcendum quod*, *manifēstum est quod*), *quia*, and how to tell the different kinds of *quod* apart.',
  intro: 'Classical Latin reports a statement with the accusative and infinitive. Medieval Latin more often uses *quod* or *quia*, "that", with an ordinary finite verb, just as English does. Thomas uses both ways. *Quod* is the second commonest word in Questions 1–10, after *est*: 956 times. This lesson sorts out what it can mean.',
  sections: [
    {
      h: 'Quod meaning "that"',
      blocks: [
        'After a verb of saying, knowing, showing or seeming, or an impersonal expression, *quod* introduces the statement, with its subject in the nominative and a finite verb. The formulas of every article work this way: *dīcendum quod*, "it must be said that"; *vidētur quod*, "it seems that". So do *dīcō quod*, *sciendum est quod*, *ostēnsum est quod*, *manifēstum est quod*, *patet quod* ("it is clear that") and *sequitur quod*.',
        { ex: 'Unde manifestum est [quod] Deus non est corpus.', ref: 'I q. 3 a. 1 co.', en: 'Hence it is clear that God is not a body.', note: 'Classical Latin would say *manifēstum est Deum nōn esse corpus*.' },
        'The verb of a *quod* clause is in the **indicative** when Thomas presents it as true, as above. It is in the **subjunctive** when the statement is not simply asserted: an opinion he is reporting (*vidētur quod Deus nōn sit*), or something necessary, possible or impossible (*oportet quod*, *necesse est quod*, *impossibile est quod*) ({{subjunctive-forms}}, {{impersonal}}).',
        'Thomas moves freely between the two constructions, sometimes within a few lines:',
        { ex: 'Certum est enim, et sensu constat, [aliqua moveri] in hoc mundo.', ref: 'I q. 2 a. 3 co.', en: 'For it is certain, and evident to the senses, that some things are moved in this world.', note: 'Accusative and infinitive.' },
        { ex: 'Impossibile est autem [quod esse sit causatum] tantum ex principiis essentialibus rei…', ref: 'I q. 3 a. 4 co.', en: 'But it is impossible that a thing\'s existence should be caused only by its essential principles…', note: '*Quod* with the subjunctive.' },
      ],
    },
    {
      h: 'Quod meaning "the fact that" and "because"',
      blocks: [
        'After a preposition and a pronoun, *quod* means "the fact that": *ex hōc quod* or *ex eō quod*, "from the fact that"; *per hoc quod*, "through the fact that, by"; *praeter hoc quod*, "besides the fact that". You met *per hoc quod sunt mōta*, "by the fact that they are moved", in the first way ({{participles}}).',
        { ex: 'Dicitur tamen mensura omnium, [ex eo quod] unumquodque tantum habet de esse, quantum ei appropinquat.', ref: 'I q. 3 a. 5 ad 2', en: 'Yet he is called the measure of all things, from the fact that each thing has as much of existence as it approaches him.' },
        'At the start of a sentence, a *quod* clause can be the subject, "the fact that…, as for the fact that…":',
        { ex: '[Quod] ergo dicitur deitas vel vita, vel aliquid huiusmodi, esse in Deo, referendum est ad diversitatem quae est in acceptione intellectus nostri; et non ad aliquam diversitatem rei.', ref: 'I q. 3 a. 3 ad 1', en: 'As for the fact, then, that deity or life or anything of the kind is said to be in God, this must be referred to a diversity in the way our intellect understands, and not to any diversity in the thing.' },
        '*Quod* can also mean "because", like *quia*, especially in *nōn quod*, "not because", which takes the subjunctive.',
      ],
    },
    {
      h: 'Quia: because, and that',
      blocks: [
        '*Quia* usually means "because" (227 times in Questions 1–10). But medieval writers also use it like *quod*, for "that", after verbs of saying and knowing. In logic the difference matters: a *dēmōnstrātiō propter quid*, "a demonstration on account of what", shows *why* something is so, from its cause; a *dēmōnstrātiō quia* shows *that* it is so, from its effects. Thomas proves that God exists in the second way.',
        { ex: 'Alia est per effectum, et dicitur demonstratio [quia], et haec est per ea quae sunt priora quoad nos…', ref: 'I q. 2 a. 2 co.', en: 'The other is through the effect, and is called a demonstration "that", and this proceeds through what is prior as regards us…' },
      ],
    },
    {
      h: 'Five kinds of quod',
      blocks: [
        {
          table: [
            ['Kind', 'Meaning', 'Example'],
            ['Relative pronoun', 'who, which, that, what', '*omne quod movētur*, "everything that is moved" ({{relative}})'],
            ['At the start of a sentence', 'this; as for the fact that', '*Quod quidem multipliciter ostendī potest*, "this can be shown in many ways"'],
            ['Conjunction', 'that (reporting)', '*dīcendum quod*, "it must be said that"'],
            ['After a preposition and pronoun', 'the fact that', '*ex hōc quod*, "from the fact that"'],
            ['Conjunction', 'because', '*nōn quod indigeat*, "not because it needs"'],
          ],
          latin: [],
        },
        'Ask three questions. Does its clause lack a subject or an object that *quod* could supply, with a neuter word before it (stated or understood) that it could refer to? Then it is the relative. Does it follow a verb or expression of saying, knowing, seeming or necessity? Then it means "that". Does it follow a preposition with a pronoun (*ex hōc*, *per hoc*)? Then it means "the fact that". In set phrases it has its own meaning: *secundum quod*, "insofar as" ({{idioms}}); *quod quid est*, "the essence" ({{indefinite}}).',
      ],
    },
  ],
  practice: [
    {
      type: 'match',
      q: 'Match each *quod* with its meaning.',
      pairs: [
        ['*omne quod movētur*', 'everything that (relative pronoun)'],
        ['*dīcendum quod*', 'it must be said that (reporting)'],
        ['*ex hōc quod*', 'from the fact that'],
        ['*nōn quod indigeat*', 'not because'],
        ['*Quod quidem … ostendī potest*', 'this (at the start of a sentence)'],
      ],
      why: 'The words around *quod* tell you which it is: a word it refers to, a verb of saying before it, or a preposition and pronoun before it.',
    },
    {
      type: 'pick',
      q: 'This sentence has two *quod*s. Click the one that means "the fact that".',
      la: 'Ad tertium dicendum quod, ex hoc ipso {quod} esse Dei est per se subsistens non receptum in aliquo, prout dicitur infinitum, distinguitur ab omnibus aliis, et alia removentur ab eo…',
      ref: 'I q. 7 a. 1 ad 3',
      why: '*Ex hōc ipsō quod*, "from the very fact that": "from the very fact that God\'s existence is subsistent through itself, not received in anything, as it is called infinite, it is distinguished from all others". The first *quod*, after *dīcendum*, means "that".',
    },
    {
      type: 'pick',
      q: 'This sentence has two *quod*s. Click the relative pronoun.',
      la: 'Ad secundum dicendum quod illud {quod} est vere aeternum, non solum est ens, sed vivens…',
      ref: 'I q. 10 a. 1 ad 2',
      why: '*Illud quod est vērē aeternum*, "that which is truly eternal": *quod* refers to *illud* and is the subject of *est*. The first *quod*, after *dīcendum*, means "that".',
    },
    {
      type: 'choice',
      q: 'Thomas writes *dīcendum quod Deus est idem quod sua essentia* with the indicative, but *vidētur quod Deus nōn sit* with the subjunctive. Why?',
      options: [
        'He asserts the first; the second only reports what seems so.',
        'Every *quod* clause after *vidētur* is negative.',
        'Negative clauses always take the subjunctive.',
        'The first is present tense, the second past.',
      ],
      answer: 0,
      why: 'The indicative presents the statement as true; the subjunctive marks one that is reported or not asserted, like the objections that open each article.',
    },
    {
      type: 'choice',
      q: 'What does *nōn quod* mean here?',
      la: 'Ad secundum dicendum quod haec scientia accipere potest aliquid a philosophicis disciplinis, [non quod] ex necessitate eis indigeat, sed ad maiorem manifestationem eorum quae in hac scientia traduntur.',
      ref: 'I q. 1 a. 5 ad 2',
      options: ['not because', 'not which', 'not what', 'not as'],
      answer: 0,
      why: '"This science can take something from the philosophical disciplines, not because it needs them of necessity, but for the greater clarification of what is handed down in this science." The rejected reason has the subjunctive (*indigeat*).',
    },
    {
      type: 'choice',
      q: 'Read carefully. What are *eō* and *quod* here?',
      la: 'Sed contra, genus est prius, secundum intellectum, [eo quod] in genere continetur.',
      ref: 'I q. 3 a. 5 s. c.',
      options: [
        '*eō*, "than that" (with *prius*), and *quod*, "which"',
        '*eō quod*, "because"',
        '*eō*, "there", and *quod*, "that"',
        '*eō*, "by it", and *quod*, "the fact that"',
      ],
      answer: 0,
      why: '*Prius* takes an ablative of comparison (*eō*, "than that"), and *quod* is the relative, subject of *continētur*: "the genus is prior, in understanding, to what is contained in the genus".',
    },
    {
      type: 'choice',
      q: 'Which is the classical way to say *manifēstum est quod Deus nōn est corpus*?',
      options: [
        '*manifēstum est Deum nōn esse corpus*',
        '*manifēstum est Deus nōn esse corpus*',
        '*manifēstum est Deum nōn est corpus*',
        '*manifēstum est Deō nōn esse corpus*',
      ],
      answer: 0,
      why: 'The accusative and infinitive: the subject goes into the accusative (*Deum*) and the verb into the infinitive (*esse*).',
    },
    {
      type: 'typed',
      q: 'Type the conjunction Thomas uses most for "because".',
      answers: ['quia'],
      why: '*Quia* comes 227 times in Questions 1–10. In *dēmōnstrātiō quia* it means "that".',
    },
    {
      type: 'translate',
      la: 'Et sic patet quod Deus non est in genere substantiae.',
      ref: 'I q. 3 a. 5 ad 1',
      model: 'And so it is clear that God is not in the genus of substance.',
      why: '*Patet quod*, "it is clear that", with the indicative: Thomas asserts it.',
    },
  ],
};
