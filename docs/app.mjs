import { choose } from "./suche.mjs";

const form = document.querySelector("#question-form");
const field = document.querySelector("#question");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const answer = document.querySelector("#answer");
const button = form.querySelector("button");
let worker;
let activeQuestion = "";
let ready = false;
let timeout;

function render(articles, fallback = false) {
  clearTimeout(timeout);
  for (const article of articles) {
    const paragraph = document.createElement("p");
    paragraph.textContent = article.text;
    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = article.publisher + " · " + article.title;
    answer.append(paragraph, link);
  }
  if (!articles.length) answer.textContent = "Zu deiner Frage habe ich in den hinterlegten Ratgebern keine passende Antwort gefunden.";
  status.textContent = fallback ? "Lokale Stichwortsuche verwendet, weil das KI Modell nicht geladen werden konnte." : "";
  result.hidden = false;
  button.disabled = false;
  document.querySelector("#answer-title").focus();
}

function fallback() {
  worker?.terminate();
  worker = undefined;
  ready = false;
  render(choose(activeQuestion), true);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  if (button.disabled) return;
  activeQuestion = field.value.trim();
  if (activeQuestion.length < 5) {
    status.textContent = "Bitte gib eine Frage mit mindestens fünf Zeichen ein.";
    return;
  }
  button.disabled = true;
  result.hidden = true;
  answer.replaceChildren();
  status.textContent = ready ? "Die KI sucht nach passenden Ratgebertexten …" : "Das KI Modell wird im Browser geladen …";
  try {
    if (!worker) {
      worker = new Worker(new URL("./worker.mjs", import.meta.url), { type: "module" });
      worker.onmessage = ({ data }) => {
        if (data.status) {
          status.textContent = data.status;
          return;
        }
        ready = !data.fallback;
        render(data.articles, data.fallback);
      };
      worker.onerror = fallback;
    }
    timeout = setTimeout(fallback, 180000);
    worker.postMessage(activeQuestion);
  } catch {
    fallback();
  }
});
