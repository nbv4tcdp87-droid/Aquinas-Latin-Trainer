// Lesson 12: the subjunctive's forms (present, imperfect, perfect, pluperfect), questions that depend on a verb
// (utrum Deus sit, quid sit, quōmodo sit), the sequence of tenses, and the subjunctive of a reported opinion
// (Vidētur quod … sit).
export default {
  id: 'subjunctive-forms',
  title: 'The Subjunctive: Forms, Questions, and *Vidētur quod*',
  summary: 'The four tenses of the subjunctive (*sit*, *esset*, *fuerit*, *fuisset*), questions that depend on a verb (*utrum Deus sit*), and the subjunctive of a reported opinion.',
  intro: 'The subjunctive is the mood of things not simply stated as fact. Thomas uses it in a great many of the clauses that depend on another: there are about 620 unmistakable subjunctives in Questions 1–10, *sit* alone more than three hundred times. This lesson teaches the forms, and the two uses that appear in every article. The next lesson teaches the rest ({{subjunctive-uses}}).',
  sections: [
    {
      h: 'The present subjunctive',
      blocks: [
        'The present subjunctive changes the vowel before the ending. The first conjugation changes *ā* to *e* (*probat* → *probet*); every other conjugation puts *a* before the ending (*habet* → *habeat*, *dīcit* → *dīcat*, *capit* → *capiat*, *scit* → *sciat*). The personal endings are the ones you know, active and passive.',
        {
          table: [
            ['', 'Active (3rd sg. / pl.)', 'Passive (3rd sg. / pl.)'],
            ['probō', 'probet / probent', 'probētur / probentur'],
            ['habeō', 'habeat / habeant', 'habeātur / habeantur'],
            ['dīcō', 'dīcat / dīcant', 'dīcātur / dīcantur'],
            ['capiō', 'capiat / capiant', 'capiātur / capiantur'],
            ['sciō', 'sciat / sciant', 'sciātur / sciantur'],
          ],
          forms: true,
        },
        '*Sum* and *possum* are irregular, with *-i-*: they are the ones you will meet most.',
        {
          table: [
            ['', 'sum', 'possum'],
            ['I', 'sim', 'possim'],
            ['you', 'sīs', 'possīs'],
            ['he, she, it', 'sit', 'possit'],
            ['we', 'sīmus', 'possīmus'],
            ['you (pl.)', 'sītis', 'possītis'],
            ['they', 'sint', 'possint'],
          ],
          forms: true,
        },
        'Deponents follow their conjugation: *sequātur*, *ūtātur*, *operētur*. *Fīō* has *fīat*, *fīant*.',
      ],
    },
    {
      h: 'The imperfect subjunctive',
      blocks: [
        'The imperfect subjunctive is the easiest of all: the present active infinitive plus the personal endings. *Esse* gives *esset*; *posse*, *posset*; *habēre*, *habēret* (passive *habērētur*); *fīō* has *fieret*. Deponents, which have no active infinitive, build it as if they had one: *operārī* gives *operārētur*.',
        {
          table: [
            ['', 'sum', 'possum'],
            ['I', 'essem', 'possem'],
            ['you', 'essēs', 'possēs'],
            ['he, she, it', 'esset', 'posset'],
            ['we', 'essēmus', 'possēmus'],
            ['you (pl.)', 'essētis', 'possētis'],
            ['they', 'essent', 'possent'],
          ],
          forms: true,
        },
        {
          table: [
            ['', 'habeō', 'habeō (passive)'],
            ['I', 'habērem', 'habērer'],
            ['you', 'habērēs', 'habērēris'],
            ['he, she, it', 'habēret', 'habērētur'],
            ['we', 'habērēmus', 'habērēmur'],
            ['you (pl.)', 'habērētis', 'habērēminī'],
            ['they', 'habērent', 'habērentur'],
          ],
          forms: true,
        },
      ],
    },
    {
      h: 'The perfect and pluperfect subjunctive',
      blocks: [
        {
          ul: [
            '**Perfect**: the perfect stem with *-erim, -eris, -erit, -erimus, -eritis, -erint*: *fuerit*, *crēdiderint*. Passive: the participle with *sit*: *creātum sit*.',
            '**Pluperfect**: the perfect active infinitive plus the personal endings: *fuisset*, *fuissent*. Passive: the participle with *esset*: *factum esset*.',
          ],
        },
        { tip: '*Fuerit*, *fuerint* and the like are also future perfect indicatives ("will have been"). Thomas uses that tense in conditions, *sī … fuerit*, "if … shall have been"; let the rest of the sentence decide.' },
      ],
    },
    {
      h: 'Questions that depend on a verb',
      blocks: [
        'A question that depends on a verb of asking, knowing or considering (an indirect question) has its verb in the subjunctive. Every article title is one: the verb it depends on, *quaeritur*, "it is asked", is understood. The question words are *utrum* or *an*, "whether" (*utrum … an* or *utrum … vel*, "whether … or"), *quid*, "what", *quōmodo*, "how", *quālis*, "of what kind":',
        { ex: 'Cognito de aliquo [an sit], inquirendum restat [quomodo sit], ut sciatur de eo [quid sit].', ref: 'I q. 3 pr.', en: 'Once we know of something whether it exists, it remains to ask how it exists, so that we may know what it is.', note: '*Cognitō* is an ablative absolute ({{participles}}); *ut sciātur* is a purpose clause ({{subjunctive-uses}}).' },
        'Translate the subjunctive of an indirect question as an ordinary English verb: *utrum Deus sit*, "whether God exists".',
        'Its tense follows the main verb (the sequence of tenses). After a present or future main verb, the present subjunctive means the same time and the perfect subjunctive an earlier time; after a past main verb, the imperfect means the same time and the pluperfect an earlier time. *Quaeritur utrum Deus sit*, "it is asked whether God exists"; *quaerēbātur utrum Deus esset*, "it was asked whether God existed".',
        { tip: 'Medieval writers sometimes keep the indicative in these questions: *nōn scīmus dē Deō quid est*, "we do not know of God what he is" (I q. 2 a. 1 co.). Read it the same way.' },
      ],
    },
    {
      h: 'Vidētur quod … sit: a reported opinion',
      blocks: [
        'The first objection of every article puts its claim in the subjunctive: *Vidētur quod Deus nōn sit*. The subjunctive marks the claim as one Thomas reports but does not make. English uses the ordinary indicative: "It seems that God does not exist."',
        { ex: 'Videtur quod non [sit] necessarium, praeter philosophicas disciplinas, aliam doctrinam haberi.', ref: 'I q. 1 a. 1 arg. 1', en: 'It seems that it is not necessary to have another teaching besides the philosophical disciplines.' },
        'The same subjunctive appears in conclusions drawn with *sequitur quod*, "it follows that", even in Thomas\'s own arguments: *Unde sequitur quod Deus vērē sit subiectum hūius scientiae* (I q. 1 a. 7 co.). In medieval Latin the mood of a *quod* clause is less strict than in classical Latin. A good rule for reading: the indicative states a fact; the subjunctive reports, infers, requires or supposes one ({{quod}}).',
      ],
    },
  ],
  practice: [
    {
      type: 'typed',
      q: 'Give the present subjunctive of *sum*, third person singular.',
      answers: ['sit'],
      why: '*Sim, sīs, sit, sīmus, sītis, sint*.',
    },
    {
      type: 'typed',
      q: 'Give the imperfect subjunctive of *possum*, third person singular.',
      answers: ['posset'],
      why: 'The infinitive *posse* with the ending *-t*.',
    },
    {
      type: 'match',
      q: 'Match each form with its tense and mood.',
      pairs: [
        ['*sit*', 'present subjunctive'],
        ['*esset*', 'imperfect subjunctive'],
        ['*fuisset*', 'pluperfect subjunctive'],
        ['*creātum sit*', 'perfect passive subjunctive'],
        ['*est*', 'present indicative'],
      ],
      why: '*Fuerit* would be harder: it can be the perfect subjunctive or the future perfect indicative.',
    },
    {
      type: 'pick',
      q: 'Click every subjunctive verb (there are four).',
      la: 'Videtur quod Deus non {sit}. Quia si unum contrariorum fuerit infinitum, totaliter destruetur aliud. Sed hoc intelligitur in hoc nomine Deus, scilicet quod {sit} quoddam bonum infinitum. Si ergo Deus {esset}, nullum malum {inveniretur}. Invenitur autem malum in mundo. Ergo Deus non est.',
      ref: 'I q. 2 a. 3 arg. 1',
      why: '*Sit* (twice), *esset*, and *invenīrētur*, the imperfect subjunctive passive of *inveniō*. *Fuerit* is the future perfect indicative here, paired with the future *dēstruētur*: "if one of two contraries shall be infinite, the other will be destroyed entirely."',
    },
    {
      type: 'choice',
      q: 'What does *utrum Deus sit* mean?',
      options: ['whether God exists', 'where God is', 'God, who exists', 'so that God may exist'],
      answer: 0,
      why: 'An indirect question with *utrum*, "whether"; the subjunctive *sit* is translated as an ordinary verb.',
    },
    {
      type: 'choice',
      q: 'After a past main verb, which subjunctive tense shows the same time as the main verb?',
      options: ['the imperfect', 'the present', 'the perfect', 'the pluperfect'],
      answer: 0,
      why: '*Quaerēbātur utrum Deus esset*, "it was asked whether God existed". The pluperfect would mean an earlier time ("whether he had existed").',
    },
    {
      type: 'choice',
      q: 'How should *sit* be translated in *Vidētur quod Deus nōn sit*?',
      options: ['does not exist', 'may not exist', 'let God not exist', 'would not exist'],
      answer: 0,
      why: 'The subjunctive marks the claim as the objector\'s, not Thomas\'s. English says simply "It seems that God does not exist."',
    },
    {
      type: 'typed',
      q: 'Give the present subjunctive passive of *habeō*, third person singular.',
      answers: ['habeātur'],
      why: 'Second conjugation: *habe-* + *a* + *-tur*. Thomas: *iūdicium … per altiōrem causam dē īnferiōribus habeātur*, "judgment about lower things is had through a higher cause" (I q. 1 a. 6 co.).',
    },
    {
      type: 'translate',
      la: 'Sed quia de Deo scire non possumus quid sit, sed quid non sit, non possumus considerare de Deo quomodo sit, sed potius quomodo non sit.',
      ref: 'I q. 3 pr.',
      model: 'But because we cannot know of God what he is, but only what he is not, we cannot consider how God is, but rather how he is not.',
      why: 'Four indirect questions, all depending on *scīre* or *cōnsīderāre*, all with the subjunctive *sit*.',
    },
  ],
};
