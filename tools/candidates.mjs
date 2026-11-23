// Lists the Summa's shorter sentences, question by question, to pick practice sentences from.
//   node tools/candidates.mjs 1 [maxWords]
import fs from 'fs';
const [question, max = 18] = process.argv.slice(2).map(Number);
const paragraphs = JSON.parse(fs.readFileSync(new URL('./text/summa-1-10.json', import.meta.url), 'utf8'));
for (const p of paragraphs.filter(p => p.question === question)) {
  const sentences = p.text.match(/[^.;?]+[.;?]/g) || [];
  for (const s of sentences.map(s => s.trim())) {
    const words = s.split(/\s+/).length;
    if (words >= 4 && words <= max && !/\b[IVXL]+\b/.test(s)) console.log(`${p.ref.padEnd(20)} ${s}`);
  }
}
