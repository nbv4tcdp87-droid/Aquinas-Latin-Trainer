// Lesson 9: the gerundive and the passive periphrastic (dīcendum est, cōnsīderandum est, quaerenda sunt), the
// formula Respondeō dīcendum quod, the gerund (ad docendum, modus iūdicandī, indūcendō), and gerund vs. gerundive.
export default {
  id: 'gerunds',
  title: 'Gerunds and Gerundives: *dīcendum est*',
  summary: '*Respondeō dīcendum quod*, *cōnsīderandum est*, *ad docendum*, *modus iūdicandī*: the verbal adjective of obligation, the verbal noun, and the formula in every article.',
  intro: 'The commonest verb form in the *Summa* may be *dīcendum*: it comes in every article, about two hundred times in Questions 1–10. It is a gerundive, a verbal adjective meaning "to be ___ed". Its look-alike, the gerund, is a verbal noun meaning "___ing".',
  sections: [
    {
      h: 'The gerundive: "to be ___ed"',
      blocks: [
        'The gerundive is the present stem with *-ndus, -nda, -ndum*, declined like *bonus*: first conjugation *-andus*, second and third *-endus*, third *-iō* and fourth *-iendus*.',
        {
          table: [
            ['Verb', 'Gerundive', 'Meaning'],
            ['probō', 'probandus, probanda, probandum', 'to be proved'],
            ['cōnsīderō', 'cōnsīderandus, cōnsīderanda, cōnsīderandum', 'to be considered'],
            ['dīcō', 'dīcendus, dīcenda, dīcendum', 'to be said'],
            ['quaerō', 'quaerendus, quaerenda, quaerendum', 'to be asked, sought'],
            ['suscipiō', 'suscipiendus, suscipienda, suscipiendum', 'to be accepted'],
            ['sciō', 'sciendus, scienda, sciendum', 'to be known'],
          ],
          latin: [0, 1],
          rowHeads: false,
          forms: true,
        },
        'With a form of *sum*, the gerundive says what must be done (the "passive periphrastic"): *probandum est*, "it is to be proved, it must be proved". With no subject it is neuter and impersonal: *cōnsīderandum est*, "it must be considered", that is, "we must consider"; *sciendum est*, "it must be known", that is, "one should know".',
        { ex: 'Circa quae [quaerenda sunt] decem.', ref: 'I q. 1 pr.', en: 'About these, ten things must be asked.', note: '*Quaerenda* is neuter plural, agreeing with *decem* (things).' },
        { ex: 'Primo ergo [considerandum est] quomodo non sit; secundo, quomodo a nobis cognoscatur; tertio, quomodo nominetur.', ref: 'I q. 3 pr.', en: 'First, then, we must consider how he is not; second, how he is known by us; third, how he is named.' },
        'The person who must do it goes in the dative in classical Latin (*nōbīs cōnsīderandum est*, "we must consider"), but Thomas often uses *ā*/*ab* with the ablative, as for any passive:',
        { ex: '…licet ea quae sunt altiora hominis cognitione, non sint ab homine per rationem [inquirenda], sunt tamen, a Deo revelata, [suscipienda] per fidem.', ref: 'I q. 1 a. 1 ad 1', en: '…although the things that are above human knowledge are not to be searched out by man through reason, yet, once revealed by God, they are to be accepted by faith.', note: 'Both gerundives agree with *ea*, "those things", neuter plural.' },
      ],
    },
    {
      h: 'Respondeō dīcendum quod',
      blocks: [
        'In the formulas of an article, *dīcendum* has its verb understood. *Ad prīmum ergō dīcendum quod…* is "To the first, then, (it is) to be said that…", that is, "it must be said that…". *Respondeō dīcendum quod…* is "I answer (that it is) to be said that…", with *esse* understood after *respondeō*: "I answer that it must be said that…", or simply "I answer that…". The same happens with *sciendum* and *cōnsīderandum*: *hōc habitō, sciendum quod…*, "with this established, one must know that…".',
        { tip: 'When a sentence begins with a gerundive and has no verb, supply *est*: *Ad tertium dīcendum quod…* = *Ad tertium dīcendum (est) quod…*' },
      ],
    },
    {
      h: 'The gerund: "___ing"',
      blocks: [
        'The gerund is a verbal noun, "___ing". It has the same stem as the gerundive but only four forms, neuter singular. There is no nominative: for "___ing" as a subject, Latin uses the infinitive ({{infinitives}}).',
        {
          table: [
            ['', 'docēre (teach)', 'iūdicāre (judge)'],
            ['Gen.', 'docendī', 'iūdicandī'],
            ['Dat.', 'docendō', 'iūdicandō'],
            ['Acc.', 'docendum', 'iūdicandum'],
            ['Abl.', 'docendō', 'iūdicandō'],
          ],
          forms: true,
        },
        {
          ul: [
            '**Genitive**, with a noun: *modus iūdicandī*, "the way of judging"; *causa essendī*, "the cause of being".',
            '**Accusative** with *ad*, purpose: *ad docendum*, "for teaching"; *ad probandum*, "for proving, to prove".',
            '**Ablative**, means or manner: *argūmentandō*, "by arguing"; *removendō*, "by removing"; *indūcendō*, "by induction" (by going through the cases).',
          ],
        },
        { ex: 'Ad tertium dicendum quod, cum iudicium ad sapientem pertineat, secundum duplicem modum [iudicandi], dupliciter sapientia accipitur.', ref: 'I q. 1 a. 6 ad 3', en: 'To the third it must be said that, since judgment belongs to the wise man, wisdom is understood in two ways, according to the two ways of judging.' },
        { ex: 'Primo quidem, quia nullum corpus movet non motum, ut patet [inducendo] per singula.', ref: 'I q. 3 a. 1 co.', en: 'First, because no body moves without being moved, as is clear by going through the particular cases.' },
      ],
    },
    {
      h: 'Gerund or gerundive?',
      blocks: [
        'When "___ing" has an object, classical Latin prefers the gerundive agreeing with the object: not *ad probandum fidem*, "for proving the faith", but *ad fidem probandam*, "for the faith to-be-proved". Thomas uses both, sometimes in one sentence:',
        { ex: 'Respondeo dicendum quod, sicut aliae scientiae non argumentantur ad sua principia [probanda], sed ex principiis argumentantur ad [ostendendum] alia in ipsis scientiis; ita haec doctrina non argumentatur ad sua principia [probanda], quae sunt articuli fidei; sed ex eis procedit ad aliquid aliud [ostendendum]…', ref: 'I q. 1 a. 8 co.', en: 'I answer that it must be said that, just as the other sciences do not argue in order to prove their principles, but argue from their principles to show other things within those sciences, so this teaching does not argue in order to prove its principles, which are the articles of faith, but proceeds from them to show something else…', note: '*Ad sua prīncipia probanda* is a gerundive (it agrees with *prīncipia*); *ad ostendendum alia* is a gerund with an object; and *ad aliquid aliud ostendendum* could be either, since a gerundive agreeing with a neuter singular looks just like a gerund. All of them mean "in order to prove, to show".' },
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'What does *Respondeō dīcendum quod* mean?',
      options: ['I answer that it must be said that', 'I answer by saying because', 'I, about to speak, answer which', 'I answered what had been said'],
      answer: 0,
      why: '*Dīcendum* is a gerundive, "to be said", with *esse* understood: "I answer (that it is) to be said that…".',
    },
    {
      type: 'typed',
      q: 'Give the gerundive of *cōnsīderō* that completes *____ est*, "we must consider".',
      answers: ['cōnsīderandum'],
      why: 'First conjugation: *cōnsīderā-* + *-ndum*. Neuter and impersonal: "it must be considered".',
    },
    {
      type: 'choice',
      q: 'What does the highlighted phrase mean?',
      la: 'Sed [sciendum est] quod duplex est scientiarum genus.',
      ref: 'I q. 1 a. 2 co.',
      options: ['one must know', 'it is known', 'knowing is', 'he will know'],
      answer: 0,
      why: '*Sciendum est*, "it is to be known": "But one must know that there are two kinds of sciences."',
    },
    {
      type: 'pick',
      q: 'Click every gerund (there are four).',
      la: 'omnis Scriptura divinitus inspirata utilis est ad {docendum}, ad {arguendum}, ad {corripiendum}, ad {erudiendum} ad iustitiam.',
      ref: 'I q. 1 a. 1 s. c.',
      why: 'Four accusative gerunds with *ad*, "for teaching, for reproving, for correcting, for instructing in justice". *Īnspīrāta*, "inspired", is a perfect passive participle.',
    },
    {
      type: 'typed',
      q: 'Give the genitive of the gerund of *iūdicō*, as in *modus ____*, "the way of judging".',
      answers: ['iūdicandī'],
      why: '*Iūdicā-* + *-ndī*.',
    },
    {
      type: 'choice',
      q: 'Which of these is a gerundive, not a gerund?',
      options: ['*ad resurrēctiōnem commūnem probandam*', '*ad probandum fidem*', '*modus iūdicandī*', '*indūcendō per singula*'],
      answer: 0,
      why: '*Probandam* agrees with *resurrēctiōnem* (feminine accusative), so it is a gerundive: "to prove the general resurrection" (I q. 1 a. 8 co.). *Ad probandum fidem* is a gerund with an object; the other two are plain gerunds.',
    },
    {
      type: 'match',
      q: 'Match each phrase with its meaning.',
      pairs: [
        ['*cōnsīderandum est*', 'we must consider'],
        ['*quaerenda sunt*', '(things) must be asked'],
        ['*ad docendum*', 'for teaching'],
        ['*causa essendī*', 'the cause of being'],
        ['*removendō*', 'by removing'],
      ],
      why: 'Gerundives with *sum* express obligation; gerunds are verbal nouns in the genitive, accusative (with *ad*) or ablative.',
    },
    {
      type: 'choice',
      q: 'In this sentence, who is to do the "searching out"?',
      la: '…licet ea quae sunt altiora hominis cognitione, non sint [ab homine] per rationem inquirenda…',
      ref: 'I q. 1 a. 1 ad 1',
      options: ['man (*ab homine* gives the agent)', 'God', 'the things above human knowledge', 'no one; *ab homine* means "away from man"'],
      answer: 0,
      why: 'Classical Latin puts the agent of a gerundive in the dative (*hominī*); Thomas often uses *ā*/*ab* with the ablative instead: "are not to be searched out by man through reason".',
    },
    {
      type: 'translate',
      la: 'Considerandum est igitur quod infinitum dicitur aliquid ex eo quod non est finitum.',
      ref: 'I q. 7 a. 1 co.',
      model: 'We must consider, then, that something is called infinite from the fact that it is not finite.',
      why: '*Ex eō quod*, "from the fact that" ({{quod}}).',
    },
  ],
};
