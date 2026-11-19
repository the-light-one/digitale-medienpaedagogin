import { articles } from "./wissen.mjs?v=dialog";
import { choose } from "./suche.mjs?v=dialog";

let model;
async function prepare() {
  const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js");
  env.allowLocalModels = false;
  env.backends.onnx.wasm.numThreads = 1;
  const embed = await pipeline("feature-extraction", "Xenova/multilingual-e5-small", {
    device: "wasm",
    dtype: "q8",
    progress_callback: event => {
      if (!/\.onnx(?:_data)?$/.test(event.file ?? "")) return;
      if (event.status === "progress" && Number.isFinite(event.progress)) {
        self.postMessage({ type: "progress", value: Math.min(90, Math.floor(event.progress * 0.9)) });
      }
    }
  });
  self.postMessage({ type: "indexing", value: 90 });
  const corpus = [];
  for (const article of articles) {
    const embedding = article.contextOnly ? null : await embed("passage: " + article.title + ". " + article.query + " " + article.text,
      { pooling: "mean", normalize: true });
    corpus.push(embedding?.data ?? null);
    self.postMessage({ type: "indexing", value: 90 + Math.floor(9 * corpus.length / articles.length) });
  }
  const outOfScope = [];
  for (const example of [
    "Wie kann ich einen Kuchen backen oder ein Rezept zubereiten?",
    "Wann fährt der Bus und wie komme ich zur Schule oder zum Bahnhof?",
    "Ich habe eine Frage zur Schulanmeldung, zum Unterricht oder zu Hausaufgaben.",
    "Was hilft bei Sport, Haustieren und anderen Fragen zum Alltag?"
  ]) {
    const vector = await embed("passage: " + example, { pooling: "mean", normalize: true });
    outOfScope.push(vector.data);
  }
  return { embed, corpus, outOfScope };
}

self.onmessage = async ({ data }) => {
  if (data.type === "prepare") {
    try {
      model = await prepare();
      self.postMessage({ type: "ready" });
    } catch {
      self.postMessage({ type: "startup-error" });
    }
    return;
  }
  if (data.type !== "question" || !model) return;
  try {
    const { embed, corpus, outOfScope } = model;
    const query = await embed("query: " + data.question, { pooling: "mean", normalize: true });
    const similarity = vector => vector?.reduce((sum, value, index) => sum + value * query.data[index], 0) ?? 0;
    const similarities = corpus.map(similarity);
    const unrelated = Math.max(...outOfScope.map(similarity));
    self.postMessage({ type: "answer", response: choose(data.question, similarities, {
      clarified: data.clarified, unrelated
    }) });
  } catch {
    self.postMessage({ type: "answer-error" });
  }
};
