// Lesson 1: the fixed formulas of an article, and the number words that put a question in order.
export default {
  id: 'article',
  title: 'How an Article Is Built',
  summary: 'The fixed formulas that open each part of an article, and the number words that put a question in order.',
  intro: 'The *Summa* is divided into questions (*quaestiōnēs*), and each question into articles (*articulī*). Every article is built the same way, out of a handful of fixed formulas. Learn them once and you will always know where you are in an argument, and which side Thomas is on.',
  sections: [
    {
      h: 'A question and its articles',
      blocks: [
        'Each question begins with a short prologue that lists its articles. The list uses the adverbs *prīmō*, *secundō*, *tertiō* ("first, second, third") and questions introduced by *utrum* or *an*, both meaning "whether":',
        {
          ex: 'Circa primum quaeruntur tria. Primo, utrum Deum esse sit per se notum. Secundo, utrum sit demonstrabile. Tertio, an Deus sit.',
          ref: 'I q. 2 pr.',
          en: 'About the first (topic), three things are asked. First, whether God\'s existence is self-evident. Second, whether it can be demonstrated. Third, whether God exists.',
          note: 'Each question depends on *quaeruntur*, "are asked", so its verb, *sit*, is subjunctive ({{subjunctive-forms}}).',
        },
        'Each article then opens with the same sentence: *Ad prīmum sīc prōcēditur*, literally "To the first (article) it is proceeded thus", that is, "We proceed thus to the first article." The second article opens *Ad secundum sīc prōcēditur*, and so on. All fifty articles of Questions 1–10 begin this way.',
      ],
    },
    {
      h: 'The parts of an article',
      blocks: [
        {
          table: [
            ['Part', 'It opens with', 'Meaning'],
            ['Objections', '*Vidētur quod…*', '"It seems that…" (the first objection)'],
            ['', '*Praetereā…*', '"Furthermore…" (each objection after the first)'],
            ['On the contrary', '*Sed contrā est quod…*', '"But on the contrary is what…": usually an authority'],
            ['The answer', '*Respondeō dīcendum quod…*', '"I answer that it must be said that…"'],
            ['Replies', '*Ad prīmum ergō dīcendum quod…*', '"To the first, then, it must be said that…"'],
            ['', '*Ad secundum dīcendum quod…*', '"To the second it must be said that…"'],
          ],
          latin: [1],
        },
        '**The objections** argue for the position Thomas is going to reject. *Vidētur quod Deus nōn sit*, "It seems that God does not exist", does not mean that Thomas doubts it: the article answers that God does exist. Read each objection as "Someone might argue that…". An objection usually ends with its conclusion, introduced by *ergō* or *igitur*, "therefore".',
        '**Sed contrā** brings in an authority that points the other way: Scripture, a Father of the Church such as Augustine, or Aristotle, whom Thomas calls simply *philosophus*, "the Philosopher".',
        '**Respondeō dīcendum quod** begins Thomas\'s own answer, the body (*corpus*) of the article. Here he speaks in the first person: *respondeō*, "I answer"; *dīcō*, "I say".',
        '**The replies** answer the objections one by one: *ad prīmum*, "to the first", *ad secundum*, *ad tertium*, and so on. Only the first reply has *ergō*.',
        'Here are the four parts of the article that asks whether God exists:',
        { ex: 'Ad tertium sic proceditur. Videtur quod Deus non sit.', ref: 'I q. 2 a. 3 arg. 1', en: 'We proceed thus to the third article. It seems that God does not exist.' },
        { ex: 'Sed contra est quod dicitur Exodi III, ex persona Dei, ego sum qui sum.', ref: 'I q. 2 a. 3 s. c.', en: 'But on the contrary is what is said in Exodus 3, in the person of God: "I am who am."' },
        { ex: 'Respondeo dicendum quod Deum esse quinque viis probari potest.', ref: 'I q. 2 a. 3 co.', en: 'I answer that it must be said that God\'s existence can be proved in five ways.' },
        {
          ex: 'Ad primum ergo dicendum quod, sicut dicit Augustinus in Enchiridio, Deus, cum sit summe bonus, nullo modo sineret aliquid mali esse in operibus suis…',
          ref: 'I q. 2 a. 3 ad 1',
          en: 'To the first, then, it must be said that, as Augustine says in the Enchiridion, God, since he is supremely good, would in no way allow anything evil to exist in his works…',
        },
      ],
    },
    {
      h: 'The grammar inside the formulas',
      blocks: [
        'The formulas are worth memorizing as they are, but each one also shows grammar that later lessons teach:',
        {
          ul: [
            '*prōcēditur*: a passive verb with no subject, "it is proceeded", that is, "one proceeds" ({{impersonal}}).',
            '*vidētur*: the passive of *videō*, "it is seen", that is, "it seems" ({{impersonal}}).',
            '*nōn sit*: the subjunctive of *sum*, because the clause reports an opinion that Thomas does not hold ({{subjunctive-forms}}).',
            '*dīcendum*: a gerundive, "to be said"; with *est* understood, "it must be said" ({{gerunds}}).',
            '*quod*: here "that", introducing what is said or what seems so ({{quod}}).',
          ],
        },
      ],
    },
    {
      h: 'References',
      blocks: [
        'This site cites the *Summa* the way scholars do. *I q. 2 a. 3 co.* means the First Part (*Prīma Pars*), question 2, article 3, the body (*corpus*). The other parts of an article are *arg. 1*, *arg. 2*… (the objections, from *argūmentum*), *s. c.* (*sed contrā*), and *ad 1*, *ad 2*… (the replies). A question\'s prologue is *pr.*',
        'Thomas\'s own references name a book of Scripture, with the chapter in Roman numerals, or a work of Aristotle, with the book: *Exodī III* is Exodus 3, *Rom. I* is Romans 1, and *in VI Metaphys.* is the sixth book of Aristotle\'s *Metaphysics*.',
      ],
    },
    {
      h: 'Counting',
      blocks: [
        'Thomas numbers nearly everything: the articles of a question, the objections and replies, the ways of proving a point. These are the number words he uses:',
        {
          table: [
            ['', 'How many', 'Which one', 'In a list'],
            ['1', 'ūnus, ūna, ūnum', 'prīmus', 'prīmō'],
            ['2', 'duo, duae, duo', 'secundus', 'secundō'],
            ['3', 'trēs, tria', 'tertius', 'tertiō'],
            ['4', 'quattuor (the Leonine text spells it *quatuor*)', 'quārtus', 'quārtō'],
            ['5', 'quīnque', 'quīntus', 'quīntō'],
            ['6', 'sex', 'sextus', 'sextō'],
            ['7', 'septem', 'septimus', 'septimō'],
            ['8', 'octō', 'octāvus', 'octāvō'],
            ['9', 'novem', 'nōnus', 'nōnō'],
            ['10', 'decem', 'decimus', 'decimō'],
          ],
        },
        'Of these, only *ūnus*, *duo* and *trēs* decline; the other cardinals never change. The ordinals (*prīmus*, *secundus*…) are -us, -a, -um adjectives that agree with a noun, stated or understood: *prīma via*, "the first way"; *ad secundum*, "to the second (objection)". The adverbs in -ō (*prīmō*, *secundō*…) number the points of a list. Adverbs in -pliciter count the ways something is so: *dupliciter*, "in two ways"; *tripliciter*, "in three ways"; *multipliciter*, "in many ways".',
        { ex: 'Quinta via sumitur ex gubernatione rerum.', ref: 'I q. 2 a. 3 co.', en: 'The fifth way is taken from the governance of things.' },
        { ex: 'Quod tripliciter ostendi potest.', ref: 'I q. 3 a. 1 co.', en: 'This can be shown in three ways.', note: '*Quod* at the start of a sentence points back to what was just said: "this" ({{relative}}).' },
      ],
    },
  ],
  practice: [
    {
      type: 'choice',
      q: 'An article\'s first objection reads *Vidētur quod Deus nōn sit*. What does Thomas himself conclude in that article?',
      options: [
        'That God exists.',
        'That God does not exist.',
        'That the question cannot be settled.',
        'That God\'s existence cannot be proved.',
      ],
      answer: 0,
      why: 'The objections (*Vidētur quod…*, *Praetereā…*) argue for the position Thomas rejects. His own answer begins with *Respondeō dīcendum quod*; in this article (I q. 2 a. 3) it is that God\'s existence can be proved in five ways.',
    },
    {
      type: 'match',
      q: 'Match each formula with the part of the article it begins.',
      pairs: [
        ['*Vidētur quod…*', 'the first objection'],
        ['*Praetereā…*', 'a further objection'],
        ['*Sed contrā est quod…*', 'an authority on the other side'],
        ['*Respondeō dīcendum quod…*', 'Thomas\'s own answer'],
        ['*Ad secundum dīcendum quod…*', 'the reply to the second objection'],
      ],
      why: 'An article runs: objections, the *sed contrā*, Thomas\'s answer (the body), and the replies to the objections in order.',
    },
    {
      type: 'choice',
      q: 'Which part of the *Summa* does *Ad tertium sīc prōcēditur* begin?',
      options: ['the third article of a question', 'the reply to the third objection', 'the third objection', 'the third way of proving God\'s existence'],
      answer: 0,
      why: 'Each article opens with *Ad prīmum* (*secundum*, *tertium*…) *sīc prōcēditur*, "We proceed thus to the first (second, third…) article." The reply to the third objection begins *Ad tertium dīcendum quod*.',
    },
    {
      type: 'pick',
      q: 'Click the two words that tell you which objection Thomas is answering.',
      la: '{Ad} {quintum} dicendum quod ad Deum non acceditur passibus corporalibus, cum ubique sit, sed affectibus mentis…',
      ref: 'I q. 3 a. 1 ad 5',
      why: '*Ad quīntum*, "to the fifth": this is the reply to the fifth objection. The second *ad*, in *ad Deum*, means "to God": "one does not draw near to God by bodily steps, since he is everywhere, but by the affections of the mind."',
    },
    {
      type: 'typed',
      q: 'Type the adverb Thomas uses for "fourth" when he lists the articles or topics of a question.',
      answers: ['quārtō'],
      why: '*Quārtō*, from the ordinal *quārtus*, "fourth": *quārtō, dē immūtābilitāte*, "fourth, about (God\'s) immutability" (I q. 3 pr.).',
    },
    {
      type: 'choice',
      q: 'What does *quīnque viīs* mean in this sentence?',
      la: 'Respondeo dicendum quod Deum esse [quinque viis] probari potest.',
      ref: 'I q. 2 a. 3 co.',
      options: ['in five ways', 'the five ways (the subject)', 'of the five ways', 'the fifth way'],
      answer: 0,
      why: '*Viīs* is the ablative plural of *via*: an ablative of means, "by five ways", that is, "in five ways". *Quīnque* does not decline.',
    },
    {
      type: 'choice',
      q: 'On this site a reference like *I q. 2 a. 3 co.* ends in *co.* What part of the article is that?',
      options: [
        'the body: Thomas\'s answer, after *Respondeō dīcendum quod*',
        'the conclusion of the whole question',
        'a commentary on the article',
        'the first objection',
      ],
      answer: 0,
      why: '*co.* stands for *corpus*, the body. The first objection is *arg. 1*, the *sed contrā* is *s. c.*, and the reply to the first objection is *ad 1*.',
    },
    {
      type: 'typed',
      q: 'Complete the formula that opens the list of articles: *Circā prīmum quaeruntur …*, "About the first (topic), three things are asked."',
      answers: ['tria'],
      why: '*Tria* is the neuter plural of *trēs*: "three things". The verb *quaeruntur* is plural to agree with it.',
    },
    {
      type: 'translate',
      la: 'Circa primum quaeruntur octo. Primo, utrum Deus sit corpus.',
      ref: 'I q. 3 pr.',
      model: 'About the first (topic), eight things are asked. First, whether God is a body.',
      why: '*Octō*, "eight", does not decline. *Sit* is the subjunctive of *sum* in a question that depends on *quaeruntur*.',
    },
  ],
};
