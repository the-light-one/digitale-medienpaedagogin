import { articles } from "./wissen.mjs?v=dialog";

const stop = new Set("was wie wer kann ich mich mir du dir uns und oder der die das dem den des ein eine einen einer im in auf bei von für mit zum zur zu man ist sind war wird werde werden soll sollt sollte können könnten wir euch schaffen empfehlen empfehle machen tun jemand meinem mein meine meiner auch wo finde bekomme nach ohne gegen am an kind kinder sohn tochter hilfe problem fragen frage gut okay sie ihr ihm ihn ihnen sich anderen andere lassen lässt nie immer nur seinem seiner darin damit darauf".split(" "));
const indexed = articles.flatMap((article, index) => article.contextOnly ? [] : [{
  article, index, pattern: new RegExp(article.topic, "iu"), terms: words(article.title + " " + article.query)
}]);

function words(text) {
  return [...new Set(text.toLowerCase().match(/[\p{L}]{3,}/gu) ?? [])].filter(word => !stop.has(word));
}

function wordScore(questionTerms, articleTerms) {
  return questionTerms.reduce((score, term) => score + (articleTerms.includes(term) ? 1 :
    term.length >= 5 && articleTerms.some(word => word.startsWith(term) ||
      word.length >= 5 && term.startsWith(word)) ? 0.65 : 0), 0);
}

function articleResult(article) {
  return { article, followUp: article.followUp };
}

export function followUpAnswer(result, id) {
  if (!result.followUp?.options.some(option => option.id === id)) return null;
  const article = articles.find(entry => entry.id === id);
  return article ? articleResult(article) : null;
}

export function typedFollowUp(result, input) {
  const detail = input.trim().replace(/[.!?]+$/, "");
  const option = result?.followUp?.options.find(item =>
    item.match && new RegExp("^(?:" + item.match + ")$", "iu").test(detail));
  return option ? followUpAnswer(result, option.id) : null;
}

export function choose(question, similarities = [], { clarified = false, unrelated = 0 } = {}) {
  const normalized = question.normalize("NFC").replace(/\s+/g, " ").trim();
  const terms = words(normalized);
  const candidates = indexed.map(entry => {
    const explicit = entry.pattern.test(normalized);
    const similarity = Number.isFinite(similarities[entry.index]) ? similarities[entry.index] : 0;
    const lexical = Math.min(wordScore(terms, entry.terms), 5);
    return { ...entry, explicit, similarity, lexical, score: similarity + 0.025 * lexical };
  });
  let explicit = candidates.filter(candidate => candidate.explicit);
  // Ein Klassenchat kann der Schauplatz von Mobbing sein. In diesem Fall geht die Hilfe vor.
  if (explicit.some(candidate => candidate.article.id === "mobbing-eltern") &&
      explicit.some(candidate => candidate.article.id === "klassenchat")) {
    const incident = /gemobbt|fertig\s*gemacht|lächerlich\s*gemacht|anfeindung|auslach|ausgelach|ausgrenz|gehänsel|bloßstell|peinlich\w*.{0,25}(?:fotos?|bilder?)|(?:beleidig|ärgern).{0,45}(?:dauernd|täglich|wieder|ständig)|(?:dauernd|täglich|wieder|ständig).{0,45}(?:beleidig|ärgern)/iu.test(normalized);
    const choosingApp = /(?:welch|auswähl|alternativ|empfehl|einricht|such).{0,65}(?:app\b|messenger|klassenchat)|(?:app\b|messenger|klassenchat).{0,65}(?:welch|auswähl|alternativ|empfehl|einricht|such)/iu.test(normalized);
    if (incident) explicit = explicit.filter(candidate => candidate.article.group !== "klassenchat");
    else if (choosingApp) explicit = explicit.filter(candidate => candidate.article.group !== "mobbing");
  }
  if (explicit.length) {
    explicit.sort((a, b) => (b.lexical - a.lexical) + 3 * (b.similarity - a.similarity));
    return articleResult(explicit[0].article);
  }

  const ranked = candidates.sort((a, b) => b.score - a.score);
  const best = ranked[0];
  const other = ranked.find(candidate => candidate.article.group !== best.article.group);
  // Bei einem klaren semantischen Treffer können auch Umschreibungen ohne Themenwort passen.
  if (!best.article.verifyTopic && best.similarity >= 0.83 && best.score - other.score >= 0.025 &&
      best.similarity >= unrelated + 0.015) {
    return articleResult(best.article);
  }
  if (clarified) return {};

  const byTopic = new Map();
  for (const candidate of ranked) {
    if (!byTopic.has(candidate.article.group) &&
        (candidate.similarity >= Math.max(0.78, unrelated) || candidate.lexical >= 2)) {
      byTopic.set(candidate.article.group, candidate.article);
    }
  }
  const possible = [...byTopic.values()].slice(0, 3);
  return { needsContext: true, followUp: {
    question: possible.length ? "Was davon trifft deine Frage am ehesten? Du kannst auch kurz ergänzen, worum es geht." :
      "Kannst du kurz ergänzen, was passiert ist oder welche App, welches Gerät oder welches Spiel du meinst?",
    options: possible.map(article => ({ label: article.title, id: article.id }))
  } };
}
