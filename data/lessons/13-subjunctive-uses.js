// Lesson 13: the subjunctive after cum (since / although / when), ut (so that, that; as with the indicative),
// sī (the kinds of condition), licet and quamvis (although), oportet quod and necesse est quod, and the
// subjunctive in a main clause (inquīrātur, "let us inquire").
export default {
  id: 'subjunctive-uses',
  title: 'The Subjunctive: *cum, ut, sī, licet*',
  summary: '"Since" and "when" (*cum*), "so that" and "as" (*ut*), the kinds of "if" (*sī*), "although" (*licet*, *quamvīs*), *oportet quod*, and "let us…".',
  intro: 'The subjunctive also follows the small words that join clauses: *cum*, *ut*, *sī*, *licet*. Each can take either mood, and the mood tells you what the word means.',
  sections: [
    {
      h: 'Cum: since, although, when',
      blocks: [
        'With the subjunctive, *cum* usually means "since" in Thomas (*cum sit*, "since he is", comes seventeen times in Questions 1–10). It can also mean "although" (often with *tamen*, "still", in the main clause), and in a story, with the imperfect or pluperfect, "when". With the indicative, *cum* simply means "when".',
        { ex: '[Cum] enim gratia non [tollat] naturam, sed [perficiat], oportet quod naturalis ratio subserviat fidei; sicut et naturalis inclinatio voluntatis obsequitur caritati.', ref: 'I q. 1 a. 8 ad 2', en: 'For since grace does not destroy nature but perfects it, natural reason must serve faith, just as the natural inclination of the will obeys charity.' },
        { ex: 'Scimus enim quod haec propositio quam formamus de Deo, [cum dicimus] Deus est, vera est.', ref: 'I q. 3 a. 4 ad 2', en: 'For we know that this proposition which we form about God, when we say "God exists", is true.', note: '*Cum* with the indicative: "when".' },
        { tip: 'Don\'t confuse the conjunction *cum* with the preposition *cum* (+ ablative), "with": *vērum, quod cum ente convertitur*, "the true, which is convertible with being" (I q. 1 a. 1 arg. 2). The preposition has a noun after it, not a clause.' },
      ],
    },
    {
      h: 'Ut: so that, that, as',
      blocks: [
        {
          ul: [
            '**Purpose**, with the subjunctive: "so that, in order that". The negative is *nē*.',
            '**Result**, with the subjunctive, usually after *ita*, *sīc*, *tam*, *adeō* ("so") or *tantus*, *tālis*: "so … that". The negative is *ut nōn*. *Adeō omnipotēns et bonus, ut bene faceret etiam dē malō*: "so all-powerful and good that he would bring good even out of evil" (I q. 2 a. 3 ad 1).',
            '**"That"**, with the subjunctive, after expressions of possibility, power, asking or causing: *possibile est ut*, *in potentiā est ut*.',
            '**"As"**, with the indicative: *ut dictum est*, "as has been said"; *ut dīcit Augustīnus*, "as Augustine says". With a noun and no verb, *ut* means "as, for example": *ut ignis*, "such as fire".',
          ],
        },
        { ex: 'Et [ut] intentio nostra sub aliquibus certis limitibus [comprehendatur], necessarium est primo investigare de ipsa sacra doctrina…', ref: 'I q. 1 pr.', en: 'And so that our purpose may be kept within definite limits, we must first investigate sacred teaching itself…', note: 'Purpose.' },
        { ex: 'Sicut igitur in potentia creatoris fuit [ut res essent], antequam essent in seipsis, ita in potentia creatoris est, postquam sunt in seipsis, [ut non sint].', ref: 'I q. 9 a. 2 co.', en: 'Just as it was in the Creator\'s power that things should exist before they existed in themselves, so it is in the Creator\'s power, after they exist in themselves, that they should not exist.', note: '"That", after *in potentiā … fuit* and *est*.' },
      ],
    },
    {
      h: 'Sī: conditions',
      blocks: [
        'The mood and tense of a condition tell you how real it is:',
        {
          table: [
            ['Kind', 'Verbs', 'Example'],
            ['Simple fact', 'indicative', '*Sī hoc est vērum…*, "If this is true…"'],
            ['Future', 'future or future perfect indicative', '*Sī … fuerit īnfīnītum, … dēstruētur aliud*, "If … shall be infinite, the other will be destroyed"'],
            ['Supposed ("should")', 'present subjunctive', '*Sī autem dīcātur aliquid mūtābile…*, "But if something should be called changeable…"'],
            ['Contrary to fact, present', 'imperfect subjunctive', '*Sī Deus esset, nūllum malum invenīrētur*, "If God existed, no evil would be found"'],
            ['Contrary to fact, past', 'pluperfect subjunctive', '*sī nātus nōn fuisset*, "if he had not been born"'],
          ],
          latin: [],
        },
        { ex: 'Praeterea, si aliquod corpus [esset] infinitum, nullus locus [esset] extra ipsum.', ref: 'I q. 8 a. 4 arg. 4', en: 'Furthermore, if some body were infinite, there would be no place outside it.' },
        '*Nisi* means "unless, if not", and *nōn … nisi* means "only": *nihil scītur nisi vērum*, "nothing is known except the true", that is, "only the true is known" (I q. 1 a. 1 arg. 2).',
      ],
    },
    {
      h: 'Licet, quamvīs: although',
      blocks: [
        '*Licet* and *quamvīs* with the subjunctive mean "although". (*Licet* is also an impersonal verb, "it is permitted"; as "although" it starts a clause whose verb is subjunctive.) The main clause often has *tamen*, "still, yet".',
        { ex: 'Et sic ex effectibus Dei potest demonstrari Deum esse, [licet] per eos non perfecte [possimus] eum cognoscere secundum suam essentiam.', ref: 'I q. 2 a. 2 ad 3', en: 'And so from the effects of God it can be demonstrated that God exists, although through them we cannot know him perfectly according to his essence.' },
      ],
    },
    {
      h: 'Oportet quod, and "let us…"',
      blocks: [
        'After *oportet* ("it is necessary"), *necesse est*, *impossibile est*, *possibile est* and the like, a *quod* (or *ut*) clause has the subjunctive. *Oportet quod Deus sit…* is best translated "God must be…" ({{impersonal}}):',
        { ex: 'Et sic, cum Deus non sit compositus ex materia et forma, ut ostensum est, [oportet quod] Deus [sit] sua deitas, sua vita, et quidquid aliud sic de Deo praedicatur.', ref: 'I q. 3 a. 3 co.', en: 'And so, since God is not composed of matter and form, as has been shown, God must be his own deity, his own life, and whatever else is predicated of God in this way.' },
        'In a main clause, the present subjunctive means "let…" or "may…". Thomas uses the passive to announce a topic: *inquīrātur*, "let it be asked", that is, "let us ask". A prohibition is *nē* with the perfect subjunctive: *altiōra tē nē quaesieris*, "do not seek things higher than you" (Ecclesiasticus 3, quoted in I q. 1 a. 1 arg. 1).',
        { ex: 'Primo ergo [inquiratur] de simplicitate ipsius, per quam removetur ab eo compositio.', ref: 'I q. 3 pr.', en: 'First, then, let us inquire into his simplicity, by which composition is excluded from him.' },
        'Finally, a relative clause has the subjunctive when it describes a kind of thing rather than a particular one: *sī igitur aliqua rēs est quae nōn sit bona per suam essentiam*, "if, then, there is any thing that is not good through its own essence" (I q. 6 a. 3 arg. 3).',
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'What does the highlighted clause mean?',
      la: 'Sed effectus eius non sunt proportionati ei, [cum ipse sit infinitus], et effectus finiti…',
      ref: 'I q. 2 a. 2 arg. 3',
      options: ['since he is infinite', 'when he was infinite', 'with him being infinite', 'although he is not infinite'],
      answer: 0,
      why: '*Cum* with the subjunctive: "since". "But his effects are not proportionate to him, since he is infinite and the effects are finite."',
    },
    {
      type: 'choice',
      q: 'In this sentence, what does the first *ut* mean?',
      la: 'Et ideo contingit, [ut] dicit Boetius in libro de hebdomadibus, quod quaedam sunt communes animi conceptiones et per se notae, apud sapientes tantum, ut incorporalia in loco non esse.',
      ref: 'I q. 2 a. 1 co.',
      options: ['as', 'so that', 'in order that', 'although'],
      answer: 0,
      why: '*Ut* with the indicative (*dīcit*) means "as": "as Boethius says". The second *ut*, with a noun phrase and no finite verb, means "for example": "for example, that incorporeal things are not in a place".',
    },
    {
      type: 'match',
      q: 'Match each condition with its translation.',
      pairs: [
        ['*Sī Deus esset, nūllum malum invenīrētur.*', 'If God existed, no evil would be found.'],
        ['*Sī nātus nōn fuisset…*', 'If he had not been born…'],
        ['*Sī hoc est vērum…*', 'If this is true…'],
        ['*Sī … fuerit īnfīnītum, dēstruētur aliud.*', 'If … shall be infinite, the other will be destroyed.'],
      ],
      why: 'Imperfect subjunctive: contrary to fact in the present. Pluperfect subjunctive: contrary to fact in the past. Indicative: fact, or the future.',
    },
    {
      type: 'pick',
      q: 'Click the verb of the purpose clause. (The other subjunctives here are in indirect questions.)',
      la: 'Et ut intentio nostra sub aliquibus certis limitibus {comprehendatur}, necessarium est primo investigare de ipsa sacra doctrina, qualis sit, et ad quae se extendat.',
      ref: 'I q. 1 pr.',
      why: '*Ut … comprehendātur*, "so that (our purpose) may be kept (within definite limits)". *Quālis sit* and *ad quae sē extendat* are indirect questions depending on *investīgāre* ({{subjunctive-forms}}).',
    },
    {
      type: 'choice',
      q: 'What does *licet* mean here?',
      la: 'Ad primum ergo dicendum quod, [licet] bonum et ens sint idem secundum rem, quia tamen differunt secundum rationem, non eodem modo dicitur aliquid ens simpliciter, et bonum simpliciter.',
      ref: 'I q. 5 a. 1 ad 1',
      options: ['although', 'it is permitted', 'since', 'if'],
      answer: 0,
      why: '*Licet* with the subjunctive (*sint*), answered by *tamen*: "although the good and being are the same in reality, still, because they differ in concept, a thing is not called a being without qualification and good without qualification in the same way."',
    },
    {
      type: 'choice',
      q: 'What is the best translation of *oportet quod Deus sit sua deitās*?',
      options: ['God must be his own deity.', 'It is fitting that God be called a deity.', 'God ought to have a deity.', 'God, who is his deity, is necessary.'],
      answer: 0,
      why: '*Oportet quod* with the subjunctive, "it is necessary that God be…", is most naturally "God must be…".',
    },
    {
      type: 'choice',
      q: 'What does *inquīrātur* mean here?',
      la: 'Primo ergo [inquiratur] de simplicitate ipsius, per quam removetur ab eo compositio.',
      ref: 'I q. 3 pr.',
      options: ['let us inquire', 'it is inquired', 'it would be inquired', 'it was being inquired'],
      answer: 0,
      why: 'A present subjunctive in a main clause: "let it be inquired", that is, "let us inquire".',
    },
    {
      type: 'typed',
      q: 'Type the Latin word for "unless, if not", which Thomas uses 59 times in Questions 1–10.',
      answers: ['nisi'],
      why: '*Nōn … nisi* means "only": *nihil scītur nisi vērum*, "only the true is known".',
    },
    {
      type: 'translate',
      la: 'Ad primum ergo dicendum quod, sicut dicit Augustinus in Enchiridio, Deus, cum sit summe bonus, nullo modo sineret aliquid mali esse in operibus suis, nisi esset adeo omnipotens et bonus, ut bene faceret etiam de malo.',
      ref: 'I q. 2 a. 3 ad 1',
      model: 'To the first, then, it must be said that, as Augustine says in the Enchiridion, God, since he is supremely good, would in no way allow any evil to exist in his works, unless he were so all-powerful and good that he could bring good even out of evil.',
      why: '*Cum sit*, "since he is"; *sineret … nisi esset*, a contrary-to-fact condition; *adeō … ut … faceret*, a result clause; *aliquid malī*, "something of evil" ({{indefinite}}).',
    },
  ],
};
