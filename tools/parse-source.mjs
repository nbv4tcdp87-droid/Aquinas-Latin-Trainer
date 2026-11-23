// Pulls the Latin of Summa Theologiae I, qq. 1-10 out of the Corpus Thomisticum pages in
// tools/source/ (the Leonine text) into tools/text/summa-1-10.json: one entry per paragraph, with
// its reference ("I q. 2 a. 3 co."), question, article, part and plain text. Quotations the page
// sets in italics (Scripture and other authorities) are kept as a separate list too.
//
//   node tools/parse-source.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAST_QUESTION = 10;
const FILES = ['sth1001.html', 'sth1002.html', 'sth1003.html'];

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', ordf: 'ª', oacute: 'ó', eacute: 'é', aacute: 'á' };
const decode = s => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
const plain = html => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const paragraphs = [];
for (const file of FILES) {
  const html = fs.readFileSync(path.join(HERE, 'source', file), 'latin1').replace(/\r\n?/g, '\n');
  for (const m of html.matchAll(/<P TITLE="I q\. (\d+) (?:a\. (\d+) )?([^"]+)">([\s\S]*?)(?=<P TITLE=|<BR>|<DIV|<\/BODY)/g)) {
    const question = Number(m[1]);
    if (question > LAST_QUESTION) continue;
    const body = m[4].replace(/<SPAN CLASS="ref">[\s\S]*?<\/SPAN>/, '').replace(/<\/P>\s*$/, '');
    paragraphs.push({
      ref: `I q. ${question}${m[2] ? ` a. ${m[2]}` : ''} ${m[3]}`,
      question,
      article: m[2] ? Number(m[2]) : null,
      part: m[3],
      text: plain(body),
      quotes: [...body.matchAll(/<I>([\s\S]*?)<\/I>/g)].map(q => plain(q[1])),
    });
  }
}

const out = path.join(HERE, 'text', 'summa-1-10.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(paragraphs, null, 1) + '\n');

const perQuestion = {};
for (const p of paragraphs) {
  const q = (perQuestion[p.question] ||= { paragraphs: 0, articles: new Set(), words: 0 });
  q.paragraphs++;
  if (p.article) q.articles.add(p.article);
  q.words += p.text.split(/\s+/).length;
}
for (const [q, s] of Object.entries(perQuestion)) console.log(`q. ${q}: ${s.articles.size} articles, ${s.paragraphs} paragraphs, ${s.words} words`);
console.log(`${paragraphs.length} paragraphs, ${paragraphs.reduce((n, p) => n + p.text.split(/\s+/).length, 0)} words -> ${path.relative(process.cwd(), out)}`);
