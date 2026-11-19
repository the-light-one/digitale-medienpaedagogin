import { articles } from "./wissen.mjs?v=themen";
import { choose } from "./suche.mjs?v=themen";

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
    const embedding = await embed("passage: " + article.title + ". " + article.query + " " + article.text,
      { pooling: "mean", normalize: true });
    corpus.push(embedding.data);
    self.postMessage({ type: "indexing", value: 90 + Math.floor(9 * corpus.length / articles.length) });
  }
  return { embed, corpus };
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
    const { embed, corpus } = model;
    const query = await embed("query: " + data.question, { pooling: "mean", normalize: true });
    const similarities = corpus.map(vector => vector.reduce((sum, value, index) => sum + value * query.data[index], 0));
    self.postMessage({ type: "answer", articles: choose(data.question, similarities) });
  } catch {
    self.postMessage({ type: "answer-error" });
  }
};
