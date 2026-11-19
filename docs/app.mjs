import { choose } from "./suche.mjs?v=themen";

const startup = document.querySelector("#startup");
const startupStatus = document.querySelector("#startup-status");
const progress = document.querySelector("#startup-progress");
const percent = document.querySelector("#startup-percent");
const actions = document.querySelector("#startup-actions");
const form = document.querySelector("#question-form");
const field = document.querySelector("#question");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const answer = document.querySelector("#answer");
const button = form.querySelector("button");

let worker;
let mode = "loading";
let activeQuestion = "";
let timer;

function setProgress(value) {
  progress.value = Math.max(progress.value, value);
  percent.textContent = progress.value + " %";
}

function render(articles, fallback = false) {
  clearTimeout(timer);
  for (const article of articles) {
    const paragraph = document.createElement("p");
    paragraph.textContent = article.text;
    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = article.publisher + " · " + article.title;
    answer.append(paragraph, link);
    for (const source of article.more ?? []) {
      const more = document.createElement("a");
      more.href = source.url;
      more.textContent = article.publisher + " · " + source.title;
      answer.append(document.createElement("br"), more);
    }
  }
  if (!articles.length) answer.textContent = "Zu deiner Frage habe ich in den hinterlegten Ratgebern keine passende Antwort gefunden.";
  status.textContent = fallback ? "Antwort per lokaler Stichwortsuche." : "";
  result.hidden = false;
  button.disabled = false;
  document.querySelector("#answer-title").focus();
}

function openForm(nextMode) {
  clearTimeout(timer);
  mode = nextMode;
  startup.hidden = true;
  form.hidden = false;
  status.textContent = mode === "keywords" ? "Die lokale Stichwortsuche ist bereit." : "";
}

function onWorkerError() {
  clearTimeout(timer);
  worker?.terminate();
  worker = undefined;
  if (mode === "loading") {
    mode = "failed";
    startupStatus.textContent = "Das KI-Modell konnte gerade nicht geladen werden.";
    progress.hidden = true;
    document.querySelector(".progress-label").hidden = true;
    actions.hidden = false;
  } else {
    openForm("keywords");
    if (button.disabled) render(choose(activeQuestion), true);
  }
}

function startModel() {
  mode = "loading";
  progress.removeAttribute("value");
  progress.hidden = false;
  document.querySelector(".progress-label").hidden = false;
  percent.textContent = "";
  actions.hidden = true;
  startupStatus.textContent = "Das KI-Modell wird geladen. Beim ersten Besuch kann das etwas dauern.";
  try {
    worker = new Worker(new URL("./worker.mjs?v=themen", import.meta.url), { type: "module" });
    worker.onerror = onWorkerError;
    worker.onmessage = ({ data }) => {
      switch (data.type) {
        case "progress": setProgress(data.value); break;
        case "indexing":
          setProgress(data.value);
          startupStatus.textContent = "Die KI bereitet die Ratgeber für deine Fragen vor …";
          break;
        case "ready": openForm("model"); break;
        case "answer": render(data.articles); break;
        case "startup-error":
        case "answer-error": onWorkerError(); break;
      }
    };
    timer = setTimeout(onWorkerError, 180000);
    worker.postMessage({ type: "prepare" });
  } catch {
    onWorkerError();
  }
}

document.querySelector("#retry").addEventListener("click", startModel);
document.querySelector("#skip").addEventListener("click", () => {
  openForm("keywords");
  field.focus();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (form.hidden || button.disabled) return;
  activeQuestion = field.value.trim();
  if (activeQuestion.length < 5) {
    status.textContent = "Bitte gib eine Frage mit mindestens fünf Zeichen ein.";
    return;
  }
  button.disabled = true;
  result.hidden = true;
  answer.replaceChildren();
  if (mode === "keywords") {
    render(choose(activeQuestion), true);
    return;
  }
  status.textContent = "Die KI sucht nach passenden Ratgebertexten …";
  timer = setTimeout(onWorkerError, 30000);
  worker.postMessage({ type: "question", question: activeQuestion });
});

startModel();
