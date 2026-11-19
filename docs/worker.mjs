import { articles } from "./wissen.mjs";
import { choose } from "./suche.mjs";

let setup;
async function prepare() {
  const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js");
  env.allowLocalModels = false;
  env.backends.onnx.wasm.numThreads = 1;
  const embed = await pipeline("feature-extraction", "Xenova/multilingual-e5-small", { device: "wasm", dtype: "q8" });
  const corpus = [];
  for (const article of articles) {
    const embedding = await embed("passage: " + article.title + ". " + article.query + " " + article.text,
      { pooling: "mean", normalize: true });
    corpus.push(embedding.data);
  }
  return { embed, corpus };
}

self.onmessage = async ({ data: question }) => {
  try {
    setup ??= prepare().catch(error => { setup = undefined; throw error; });
    const { embed, corpus } = await setup;
    self.postMessage({ status: "Die KI sucht nach passenden Ratgebertexten …" });
    const query = await embed("query: " + question, { pooling: "mean", normalize: true });
    const similarities = corpus.map(vector => vector.reduce((sum, value, index) => sum + value * query.data[index], 0));
    self.postMessage({ articles: choose(question, similarities) });
  } catch {
    self.postMessage({ articles: choose(question), fallback: true });
  }
};
