// Lesson 4: the relative pronoun quī, quae, quod: agreement, id quod / ea quae / omne quod, the connecting
// relative, id quō māius, and quisquis / quīcumque.
export default {
  id: 'relative',
  title: 'The Relative Pronoun *quī, quae, quod*',
  summary: 'Relative clauses, *id quod* and *ea quae*, the relative that begins a sentence, *id quō māius*, and *quidquid*.',
  intro: 'The relative pronoun ("who, which, that") is everywhere in the *Summa*: words spelled like its forms appear about 1,400 times in Questions 1–10, though several hundred of those are the conjunction *quod*, "that" or "because", which has a lesson of its own ({{quod}}).',
  sections: [
    {
      h: 'The forms',
      blocks: [
        {
          table: [
            ['', 'Masc.', 'Fem.', 'Neut.'],
            'Singular',
            ['Nom.', 'quī', 'quae', 'quod'],
            ['Gen.', 'cūius', 'cūius', 'cūius'],
            ['Dat.', 'cui', 'cui', 'cui'],
            ['Acc.', 'quem', 'quam', 'quod'],
            ['Abl.', 'quō', 'quā', 'quō'],
            'Plural',
            ['Nom.', 'quī', 'quae', 'quae'],
            ['Gen.', 'quōrum', 'quārum', 'quōrum'],
            ['Dat.', 'quibus', 'quibus', 'quibus'],
            ['Acc.', 'quōs', 'quās', 'quae'],
            ['Abl.', 'quibus', 'quibus', 'quibus'],
          ],
          forms: true,
        },
        { tip: '*Quae* can be four forms: feminine nominative singular, feminine nominative plural, and neuter nominative and accusative plural. *Quī* is masculine nominative, singular or plural. *Quam* can also be "than" or "how", and *quō* can be "where (to)".' },
      ],
    },
    {
      h: 'Gender and number from the antecedent, case from its own clause',
      blocks: [
        'A relative pronoun takes its gender and number from the word it refers to, its antecedent, but its case from the job it does in its own clause.',
        { ex: 'Respondeo dicendum quod necessarium fuit ad humanam salutem, esse doctrinam quandam secundum revelationem divinam, praeter philosophicas disciplinas, [quae] ratione humana investigantur.', ref: 'I q. 1 a. 1 co.', en: 'I answer that it must be said that it was necessary for human salvation that there be a teaching according to divine revelation, besides the philosophical disciplines, which are investigated by human reason.', note: '*Quae* is feminine plural like its antecedent *disciplīnās*, but nominative, because it is the subject of *investīgantur*.' },
        { ex: 'Ergo necesse est devenire ad aliquod primum movens, [quod] a nullo movetur, et hoc omnes intelligunt Deum.', ref: 'I q. 2 a. 3 co.', en: 'Therefore it is necessary to arrive at some first mover which is moved by nothing; and this all understand to be God.', note: '*Quod* is neuter singular, like *aliquod prīmum movēns*, and nominative, the subject of *movētur*.' },
        { ex: 'Illa enim nobis dicuntur per se nota, [quorum] cognitio nobis naturaliter inest, sicut patet de primis principiis.', ref: 'I q. 2 a. 1 arg. 1', en: 'For those things are called self-evident to us whose knowledge is in us by nature, as is clear in the case of first principles.', note: '*Quōrum* is neuter plural like *illa*, and genitive because it goes with *cognitiō*: "the knowledge of which".' },
        { ex: 'Ad primum ergo dicendum quod de rebus simplicibus loqui non possumus, nisi per modum compositorum, a [quibus] cognitionem accipimus.', ref: 'I q. 3 a. 3 ad 1', en: 'To the first, then, it must be said that we cannot speak of simple things except in the manner of composite things, from which we receive our knowledge.' },
        'A relative also takes the person of its antecedent. So God says in Exodus *ego sum quī sum*, "I am who am", with a first-person verb in the relative clause.',
      ],
    },
    {
      h: 'Id quod, ea quae, omne quod',
      blocks: [
        'Thomas often leaves the antecedent out, or makes it a pronoun: *quod est*, "what is"; *id quod* or *illud quod*, "that which"; *ea quae*, "the things which"; *omne quod*, "everything that"; *omnia quae*, "all the things that". The neuter is especially common, because so many of his subjects are "things" in general.',
        { ex: 'Omne autem [quod] movetur, ab alio movetur.', ref: 'I q. 2 a. 3 co.', en: 'Now everything that is moved is moved by another.' },
        { ex: 'Sed ea [quae] rationi subduntur, sufficienter traduntur in philosophicis disciplinis.', ref: 'I q. 1 a. 1 arg. 1', en: 'But the things that are subject to reason are adequately handed down in the philosophical disciplines.' },
        { ex: 'Oportet ergo quod illud [cuius] esse est aliud ab essentia sua, habeat esse causatum ab alio.', ref: 'I q. 3 a. 4 co.', en: 'It must be, then, that that whose existence is other than its essence has an existence caused by another.', note: 'The antecedent *illud* is the subject of *habeat*; the relative clause sits between them.' },
      ],
    },
    {
      h: 'A relative at the start of a sentence',
      blocks: [
        'A relative that begins a sentence usually points back to the sentence before, or to something in it. Translate it with a demonstrative: *quod*, "this"; *quae*, "these things"; *quī*, "he, they". The same relative after a comma often sums up the whole clause before it: *quod est impossibile*, "which is impossible"; *quod patet esse falsum*, "which is clearly false".',
        { ex: '[Quod] quidem multipliciter ostendi potest.', ref: 'I q. 3 a. 4 co.', en: 'This can be shown in many ways.' },
        { ex: 'Ad [cuius] intellectum sciendum est, quod in rebus compositis ex materia et forma, necesse est quod differant natura vel essentia et suppositum.', ref: 'I q. 3 a. 3 co.', en: 'To understand this, one must know that in things composed of matter and form, nature or essence and the subject necessarily differ.', note: 'Literally "toward the understanding of which". *Sciendum est*, "it must be known", is a gerundive ({{gerunds}}).' },
        { ex: 'Sed si procedatur in infinitum in causis efficientibus, non erit prima causa efficiens, et sic non erit nec effectus ultimus, nec causae efficientes mediae, [quod] patet esse falsum.', ref: 'I q. 2 a. 3 co.', en: 'But if one goes on to infinity in efficient causes, there will be no first efficient cause, and so there will be neither a last effect nor intermediate efficient causes; which is clearly false.' },
      ],
    },
    {
      h: 'Than which, and whatever',
      blocks: [
        'With a comparative, an ablative relative means "than which" ({{comparison}}). This is Anselm\'s description of God, which Thomas weighs in I q. 2 a. 1:',
        { ex: 'Significatur enim hoc nomine id [quo] maius significari non potest…', ref: 'I q. 2 a. 1 arg. 2', en: 'For by this name is signified that than which nothing greater can be signified…', note: 'Literally "that than which a greater (thing) cannot be signified".' },
        '"Whoever" and "whatever" are *quisquis*, *quidquid* and *quīcumque*, *quaecumque*, *quodcumque*. They need no antecedent:',
        { ex: 'Praeterea, [quidquid] habet virtutem infinitam, habet essentiam infinitam.', ref: 'I q. 7 a. 2 arg. 2', en: 'Furthermore, whatever has infinite power has an infinite essence.' },
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'Why is *quod* neuter singular in this sentence?',
      la: 'Ergo necesse est devenire ad aliquod primum movens, [quod] a nullo movetur, et hoc omnes intelligunt Deum.',
      ref: 'I q. 2 a. 3 co.',
      options: ['It agrees with its antecedent, *aliquod prīmum movēns*.', 'It is the subject of *movētur*.', 'A relative after *ad* is always neuter.', 'It is the conjunction "that".'],
      answer: 0,
      why: 'Gender and number come from the antecedent. Being the subject of *movētur* explains its case (nominative), not its gender.',
    },
    {
      type: 'pick',
      q: 'Click the relative pronoun. (Two of the three *quod*s belong to the phrase *secundum quod*, "insofar as".)',
      la: 'Nihil enim movetur, nisi secundum quod est in potentia ad illud ad {quod} movetur, movet autem aliquid secundum quod est actu.',
      ref: 'I q. 2 a. 3 co.',
      why: '*Ad illud ad quod movētur*: "toward that toward which it is moved". Its antecedent is *illud*. The whole sentence: "For nothing is moved except insofar as it is in potency toward that toward which it is moved, but a thing moves insofar as it is in act."',
    },
    {
      type: 'typed',
      q: 'Give the dative singular of *quī, quae, quod* (the same for all genders).',
      answers: ['cui'],
      why: '*Cui*, "to whom, to which".',
    },
    {
      type: 'typed',
      q: 'Give the genitive plural feminine of *quī, quae, quod*.',
      answers: ['quārum'],
      why: '*Quārum*, "of which": *aliae scientiae, dē quārum prīncipiīs dubitārī nōn potest*, "other sciences, about whose principles there can be no doubt" (I q. 1 a. 5 arg. 1).',
    },
    {
      type: 'choice',
      q: 'What does *id quō māius significārī nōn potest* mean?',
      options: [
        'that than which nothing greater can be signified',
        'that by which something greater cannot be signified',
        'that which cannot signify anything greater',
        'the greater thing, which cannot be signified',
      ],
      answer: 0,
      why: '*Quō* is an ablative of comparison with *māius*: "than which". Literally "that than which a greater (thing) cannot be signified".',
    },
    {
      type: 'choice',
      q: 'How is the *Quod* that begins this sentence best translated?',
      la: '[Quod] quidem multipliciter ostendi potest.',
      ref: 'I q. 3 a. 4 co.',
      options: ['This', 'Because', 'That (the conjunction)', 'What?'],
      answer: 0,
      why: 'A relative at the start of a sentence refers back to what was just said: "This can be shown in many ways."',
    },
    {
      type: 'match',
      q: 'Match each phrase with its meaning.',
      pairs: [
        ['*omne quod movētur*', 'everything that is moved'],
        ['*ea quae ratiōnī subduntur*', 'the things that are subject to reason'],
        ['*quidquid habet virtūtem īnfīnītam*', 'whatever has infinite power'],
        ['*illud cūius esse est aliud*', 'that whose existence is other'],
        ['*quod patet esse falsum*', 'which is clearly false'],
      ],
      why: 'Each relative takes its gender and number from what it refers to (stated or understood) and its case from its own clause.',
    },
    {
      type: 'choice',
      q: 'In *ego sum quī sum*, why is the verb of the relative clause *sum* and not *est*?',
      options: [
        'A relative takes the person of its antecedent, *ego*.',
        'Because *quī* is plural.',
        'Because the words are a quotation.',
        'Because *est* cannot follow *quī*.',
      ],
      answer: 0,
      why: 'The antecedent is *ego*, first person, so the relative clause has a first-person verb: "I am who am".',
    },
    {
      type: 'translate',
      la: 'Praeterea, omnia quae determinantur in aliqua scientia, comprehenduntur sub subiecto illius scientiae.',
      ref: 'I q. 1 a. 7 arg. 2',
      model: 'Furthermore, all the things that are determined in a science are included under the subject of that science.',
      why: '*Omnia quae*, "all the things that"; *illīus* is the genitive of *ille*, "of that".',
    },
  ],
};
