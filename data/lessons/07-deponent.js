// Lesson 7: deponent verbs (sequitur, ūtitur, loquitur…), and the irregular fīō, ferō (differō, referō),
// eō (exeō, trānseō) and volō.
export default {
  id: 'deponent',
  title: 'Deponent Verbs, and *fīō, ferō, eō, volō*',
  summary: 'Verbs with passive forms and active meanings (*sequitur*, "it follows"; *ūtitur*, "it uses"), and the irregular verbs behind *fit*, *differt* and *trānsit*.',
  intro: 'Some of the *Summa*\'s commonest verbs look passive but are not: *sequitur*, "it follows", *ūtitur*, "it uses", *loquitur*, "he speaks". These are deponent verbs. A few irregular verbs complete the picture: *fīō*, "become, be made"; *ferō* and its compounds (*differt*, "it differs"); *eō*, "go", and its compounds; and *volō*, "want".',
  sections: [
    {
      h: 'Passive forms, active meanings',
      blocks: [
        'A deponent verb is passive in form but active in meaning (only a few of its forms, such as the participles in *-ns* and *-ūrus*, look active). You can tell it from its dictionary entry: the first principal part ends in *-or*, the infinitive is passive in form, and the perfect is made with *sum*. These are the deponents in the *Summa*\'s vocabulary:',
        {
          table: [
            ['Dictionary entry', 'Meaning', 'In Questions 1–10'],
            ['sequor, sequī, secūtus sum', 'follow', '*sequitur*, "it follows"'],
            ['cōnsequor, cōnsequī, cōnsecūtus sum', 'follow upon, attain', '*cōnsequitur*, "follows upon"'],
            ['ūtor, ūtī, ūsus sum (+ abl.)', 'use', '*ūtitur*, "uses"'],
            ['loquor, loquī, locūtus sum', 'speak', '*loquitur*, "speaks"'],
            ['operor, operārī, operātus sum', 'work, act', '*operātur*, "acts"'],
            ['imitor, imitārī, imitātus sum', 'imitate', '*imitantur*, "they imitate"'],
            ['imāginor, imāginārī, imāginātus sum', 'imagine', '*imāginēmur*, "(if) we imagine"'],
            ['argūmentor, argūmentārī, argūmentātus sum', 'argue', '*argūmentātur*, "argues"'],
            ['compatior, compatī, compassus sum', 'be compatible with', '*compatitur*, "is compatible with"'],
          ],
          latin: [0],
        },
        'A deponent conjugates exactly like the passive of its conjugation, which you know from *Latin for the New Millennium*: *sequor, sequeris, sequitur, sequimur, sequiminī, sequuntur*, like *dūcor, dūceris, dūcitur…* Only the meaning is active. Thomas\'s *unde sequitur quod*, "whence it follows that", introduces a conclusion ({{quod}}):',
        { ex: 'Unde [sequitur] quod Deus vere sit subiectum huius scientiae.', ref: 'I q. 1 a. 7 co.', en: 'Hence it follows that God is truly the subject of this science.' },
        '*Ūtor*, "use", takes its object in the ablative:',
        { ex: 'Sed tamen sacra doctrina huiusmodi [auctoritatibus utitur] quasi extraneis argumentis, et probabilibus.', ref: 'I q. 1 a. 8 ad 2', en: 'But sacred teaching uses authorities of this kind as extrinsic and merely probable arguments.' },
      ],
    },
    {
      h: 'The rest of a deponent',
      blocks: [
        {
          ul: [
            'The present infinitive is passive in form: *sequī*, "to follow"; *ūtī*, "to use"; *operārī*, "to act". The first article list asks *utrum ūtī dēbeat metaphoricīs vel symbolicīs locūtiōnibus*, "whether it ought to use metaphorical or symbolic expressions" (I q. 1 pr.).',
            'The perfect is the participle with *sum*, and active: *locūtus est*, "he spoke"; *secūtī sunt*, "they followed".',
            'The perfect participle is active too, unlike any other verb\'s: *locūtus*, "having spoken".',
            'The present participle (*sequēns*, "following") and the future participle (*secūtūrus*) are active in form and meaning, as for any verb ({{participles}}).',
          ],
        },
      ],
    },
    {
      h: 'Fīō: become, be made, happen',
      blocks: [
        '*Fīō, fierī, factus sum* serves as the passive of *faciō*: *fit*, "it is made, it becomes, it happens"; *fierī*, "to be made, to become"; *factus est*, "it was made, it became". In the present system it has active endings, and only its infinitive, *fierī*, looks passive; its perfect, *factus sum*, is simply the perfect passive of *faciō*.',
        { ex: 'Forma vero finitur per materiam, inquantum forma, in se considerata, communis est ad multa, sed per hoc quod recipitur in materia, [fit] forma determinate huius rei.', ref: 'I q. 7 a. 1 co.', en: 'Form is limited by matter, inasmuch as form, considered in itself, is common to many things; but by being received in matter, it becomes the form of this particular thing.' },
      ],
    },
    {
      h: 'Ferō, eō, volō',
      blocks: [
        '*Ferō*, "carry", *eō*, "go", and *volō*, "want", are irregular only in the present system, and only in a few forms. Here they are beside *fīō*:',
        {
          table: [
            ['', 'fīō', 'ferō', 'eō', 'volō'],
            ['I', 'fīō', 'ferō', 'eō', 'volō'],
            ['you', 'fīs', 'fers', 'īs', 'vīs'],
            ['he, she, it', 'fit', 'fert', 'it', 'vult'],
            ['we', 'fīmus', 'ferimus', 'īmus', 'volumus'],
            ['you (pl.)', 'fītis', 'fertis', 'ītis', 'vultis'],
            ['they', 'fīunt', 'ferunt', 'eunt', 'volunt'],
            ['Infinitive', 'fierī', 'ferre', 'īre', 'velle'],
          ],
          forms: true,
        },
        'The passive of *ferō* is regular apart from *ferris*, *fertur* and the infinitive *ferrī*. Thomas uses *ferō* mostly in compounds: *differō*, "differ" (*differt*, *differunt*); *referō*, "refer, relate" (*refertur*, "is referred"); and *eō* in *exeō*, "go out", and *trānseō*, "pass over".',
        { ex: 'Respondeo dicendum quod bonum et ens sunt idem secundum rem, sed [differunt] secundum rationem tantum.', ref: 'I q. 5 a. 1 co.', en: 'I answer that it must be said that the good and being are the same in reality, but differ only in concept.' },
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'What does *sequitur* mean here?',
      la: '…quia quaestio quid est, [sequitur] ad quaestionem an est.',
      ref: 'I q. 2 a. 2 ad 2',
      options: ['follows', 'is followed', 'is said', 'was following'],
      answer: 0,
      why: '*Sequor* is deponent: passive forms, active meaning. "The question \'what is it?\' follows upon the question \'is it?\'"',
    },
    {
      type: 'typed',
      q: 'Give the present infinitive of *ūtor*, "to use".',
      answers: ['ūtī'],
      why: '*Ūtor* is a third-conjugation deponent, so its infinitive looks like *dūcī*: *utrum ūtī dēbeat metaphoricīs … locūtiōnibus* (I q. 1 pr.).',
    },
    {
      type: 'choice',
      q: 'What case are the highlighted words, and why?',
      la: 'Sed sacra doctrina utitur [metaphoris] propter necessitatem et utilitatem, ut dictum est.',
      ref: 'I q. 1 a. 9 ad 1',
      options: ['ablative, because *ūtor* takes the ablative', 'accusative, the direct object', 'dative, "for metaphors"', 'genitive, "of metaphors"'],
      answer: 0,
      why: 'The thing used goes in the ablative: "sacred teaching uses metaphors". (*Propter*, "because of", takes the accusative.)',
    },
    {
      type: 'pick',
      q: 'Click the verb that is passive in form but active in meaning. (The other passive verbs really are passive.)',
      la: '{Utitur} tamen sacra doctrina etiam ratione humana, non quidem ad probandum fidem, quia per hoc tolleretur meritum fidei; sed ad manifestandum aliqua alia quae traduntur in hac doctrina.',
      ref: 'I q. 1 a. 8 ad 2',
      why: '*Ūtitur*, "uses", is deponent. *Tollerētur*, "would be taken away", and *trāduntur*, "are handed down", are true passives. "Sacred teaching does use human reason, not to prove the faith (for that would take away the merit of faith), but to make clear other things that are handed down in this teaching."',
    },
    {
      type: 'typed',
      q: 'Give the third person singular present of *differō*: "it differs".',
      answers: ['differt'],
      why: 'Like *fert*: *differō, differs, differt*.',
    },
    {
      type: 'choice',
      q: 'What is *fierī*?',
      options: ['the infinitive of *fīō*, "to become, to be made"', 'the passive infinitive of *ferō*', 'the perfect infinitive of *faciō*', 'the present subjunctive of *fīō*'],
      answer: 0,
      why: '*Fīō, fierī, factus sum*. The passive infinitive of *ferō* is *ferrī*; the perfect infinitive of *faciō* is *fēcisse*.',
    },
    {
      type: 'match',
      q: 'Match each form with its meaning.',
      pairs: [
        ['*fit*', 'becomes, is made'],
        ['*fert*', 'carries'],
        ['*vult*', 'wants'],
        ['*trānsit*', 'passes over'],
        ['*loquitur*', 'speaks'],
      ],
      why: '*Trānsit* is *trāns* + *it*, from *eō*, "go". *Loquitur* is deponent.',
    },
    {
      type: 'choice',
      q: 'What does *locūtus est* mean?',
      options: ['he spoke', 'he was spoken', 'he is speaking', 'he will be spoken'],
      answer: 0,
      why: 'The perfect of a deponent is made with *sum*, like a perfect passive, but its meaning is active: "he spoke, he has spoken".',
    },
    {
      type: 'translate',
      la: 'Et ideo non accipit ab aliis scientiis tanquam a superioribus, sed utitur eis tanquam inferioribus et ancillis…',
      ref: 'I q. 1 a. 5 ad 2',
      model: 'And therefore it does not receive from the other sciences as from superiors, but uses them as inferiors and handmaids…',
      why: 'The subject is sacred teaching. *Ūtitur eīs*: *ūtor* takes the ablative. *Tamquam* (*tanquam* in the Leonine text) means "as, as if".',
    },
  ],
};
