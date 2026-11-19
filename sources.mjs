const juuuport = "https://www.juuuport.de/infos/ratgeber/";
export const sources = [
  ["JUUUPORT", juuuport + "cybermobbing", "mobbing beleidig ausgrenz klassenchat gruppenchat screenshot"],
  ["JUUUPORT", juuuport + "fake-news", "fake news desinformation falschmeldung quelle nachricht deepfake faktencheck"],
  ["JUUUPORT", juuuport + "kuenstliche-intelligenz", "ki chatgpt künstliche intelligenz deepfake chatbot"],
  ["JUUUPORT", juuuport + "hass-im-netz", "hass hate speech beleidig rassismus gegenrede"],
  ["JUUUPORT", juuuport + "cybergrooming", "grooming fremd kontakt erwachsen kind ansprach anschreib"],
  ["JUUUPORT", juuuport + "sexting", "sext erpress nackt intim foto bild"],
  ["JUUUPORT", juuuport + "sexuelle-belaestigung", "sexuell dickpic belästig erpress"],
  ["JUUUPORT", juuuport + "mediensucht", "sucht bildschirmzeit medienzeit abhängig handy nutzung"],
  ["JUUUPORT", juuuport + "games", "gaming spiele game roblox fortnite kostenfalle"],
  ["JUUUPORT", juuuport + "datenschutz", "datenschutz passwort konto gehackt privat phishing sicherheit daten"],
  ["JUUUPORT", juuuport + "schoenheitsideale", "schönheitsideal körperbild filter instagram"],
  ["JUUUPORT", "https://www.juuuport.de/hilfe", "hilfe berat meld scout"],
  ["klicksafe", "https://www.klicksafe.de/cybermobbing", "mobbing klassenchat schule lehrkraft eltern gruppenchat"],
  ["klicksafe", "https://www.klicksafe.de/cybermobbing/handlungsansatz-zur-praevention-und-intervention-von-cybermobbing", "mobbing schule klasse unterricht prävention intervention lehrkraft"],
  ["klicksafe", "https://www.klicksafe.de/desinformation-und-meinung", "desinformation deepfake fake news medienkompetenz faktencheck"],
  ["HateAid", "https://hateaid.org/ratgeber/", "gewalt bedroh hass beleidig screenshot beweis dokumentier meld lösch"],
  ["HateAid", "https://hateaid.org/betroffenenberatung/", "gewalt bedroh hass beleidig berat screenshot beweis meld erpress"]
];

export function words(text) {
  return [...new Set(text.toLowerCase().match(/[\p{L}]{3,}/gu) ?? [])];
}

function matches(text, terms) {
  const candidates = words(text);
  return terms.filter(term => candidates.some(word =>
    word === term || (term.length >= 4 && word.includes(term)) ||
    (word.length >= 5 && term.startsWith(word))
  )).length;
}

export function selectSources(question) {
  return sources.map(source => [source, matches(question, words(source[2]))])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([source]) => source);
}

const cache = new Map();
const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", shy: "",
  auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü", szlig: "ß",
  ndash: "–", mdash: "—", hellip: "…", ldquo: "“", rdquo: "”", bdquo: "„" };

function plainText(fragment) {
  return fragment.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "")
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (original, entity) => {
      if (entity[0] !== "#") return Object.hasOwn(entities, entity) ? entities[entity] : original;
      const hex = entity[1].toLowerCase() === "x";
      const point = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return point <= 0x10ffff ? String.fromCodePoint(point) : original;
    }).replace(/\s+/g, " ").trim();
}

export function pageText(html) {
  const cleaned = html.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|nav|footer|header|aside|form|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  const body = cleaned.match(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/i)?.[1] ??
    cleaned.match(/<article\b[^>]*>([\s\S]*?)<\/article\s*>/i)?.[1] ?? cleaned;
  const title = plainText(body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/i)?.[1] ??
    cleaned.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] ?? "");
  const paragraphs = [...new Set(Array.from(body.matchAll(/<(p|li)\b[^>]*>((?:(?!<(?:p|li)\b)[\s\S])*?)<\/\1\s*>/gi),
    match => plainText(match[2])).filter(text => text.length >= 45 && text.length <= 1000))];
  return { title, paragraphs };
}

async function readPage(source, fetcher) {
  const [publisher, url, tags] = source;
  if (cache.has(url) && cache.get(url).expires > Date.now()) return cache.get(url).page;
  const response = await fetcher(url, { redirect: "error", signal: AbortSignal.timeout(7500) });
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
    throw new Error("Quellseite nicht verfügbar");
  }
  const { title, paragraphs } = pageText(await response.text());
  if (!paragraphs.length) throw new Error("Quellseite ohne lesbaren Text");
  const page = { publisher, url, title: title || publisher, tags, paragraphs };
  cache.set(url, { page, expires: Date.now() + 30 * 60 * 1000 });
  return page;
}

export async function evidenceFor(question, fetcher = fetch) {
  const pages = await Promise.allSettled(selectSources(question).map(source => readPage(source, fetcher)));
  const terms = words(question).filter(word => !/^(dass|eine[nmrs]?|meine[nmrs]?|was|wie|kann|ich|mich|sich|mir|machen|tun|und|oder|der|die|das|den|bei|dem|habe|hat|wird|soll|gegen)$/.test(word));
  return pages.filter(result => result.status === "fulfilled").flatMap(({ value: page }) =>
    page.paragraphs.map(text => ({ text, score: matches(text, terms) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ text, score }) => ({ publisher: page.publisher, title: page.title, url: page.url, text, score }))
  ).sort((a, b) => b.score - a.score).slice(0, 18)
    .map(({ score, ...passage }, index) => ({ id: index + 1, ...passage }));
}
