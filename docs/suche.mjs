import { articles } from "./wissen.mjs?v=themen";

const topics = articles.map(article => new RegExp(article.topic, "iu"));

const stop = new Set("was wie wer kann ich mich mir du dir uns und oder der die das dem den des ein eine einen einer im in auf bei von für mit zum zur zu man ist sind war wird werde werden soll machen tun jemand meinem mein meine meiner auch wo finde bekomme nach ohne gegen am an".split(" "));

export function rankWords(question) {
  const words = text => [...new Set(text.toLowerCase().match(/[\p{L}]{3,}/gu) ?? [])].filter(word => !stop.has(word));
  const terms = words(question);
  return articles.map((article, index) => {
    const matches = words(article.title + " " + article.query);
    const score = terms.reduce((sum, term) => sum + (matches.some(word => word === term) ? 1 :
      term.length >= 5 && matches.some(word => word.includes(term) || word.length >= 5 && term.includes(word)) ? 0.65 : 0), 0);
    return { index, score };
  }).sort((first, second) => second.score - first.score);
}

export function choose(question, similarities = []) {
  const normalized = question.normalize('NFC').replace(/\s+/g, ' ');
  const words = rankWords(normalized).filter(({ index }) => topics[index].test(normalized));
  const ranked = words.map(({index, score}) => ({
    index, score, similarity: similarities[index] ?? 0,
    combined: (similarities[index] ?? 0) + Math.min(score, 4) * 0.035
  }))
    .sort((a, b) => b.combined - a.combined);
  const first = ranked[0];
  if (!first) return [];
  return ranked.filter(item => item.combined >= first.combined - 0.045 && (item === first ||
    item.score >= 2))
    .slice(0, 2).map(item => articles[item.index]);
}
