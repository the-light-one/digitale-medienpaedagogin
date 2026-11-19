import { choose, followUpAnswer, typedFollowUp } from "./suche.mjs?v=dialog";

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
const fieldLabel = form.querySelector("label");
const defaultLabel = fieldLabel.textContent;
const defaultMinLength = field.minLength;

let worker;
let mode = "loading";
let activeQuestion = "";
let timer;
let detailContext = "";
let activeClarified = false;
let lastResponse;

function setProgress(value) {
  progress.value = Math.max(progress.value, value);
  percent.textContent = progress.value + " %";
}

function render(response, fallback = false) {
  clearTimeout(timer);
  answer.replaceChildren();
  lastResponse = response;
  detailContext = response.needsContext ? activeQuestion : "";
  fieldLabel.textContent = detailContext ? "Was möchtest du ergänzen?" : defaultLabel;
  field.minLength = response.followUp ? 2 : defaultMinLength;
  if (detailContext) field.value = "";
  if (response.article) {
    const article = response.article;
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
  if (response.followUp) {
    const followUp = document.createElement("div");
    followUp.className = "follow-up";
    const prompt = document.createElement("p");
    prompt.textContent = response.followUp.question;
    followUp.append(prompt);
    for (const option of response.followUp.options) {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = "secondary";
      optionButton.textContent = option.label;
      optionButton.addEventListener("click", () => {
        const next = followUpAnswer(response, option.id);
        if (next) render(next, fallback);
      });
      followUp.append(optionButton);
    }
    if (response.needsContext) {
      const reset = document.createElement("button");
      reset.type = "button";
      reset.className = "secondary";
      reset.textContent = "Neue Frage";
      reset.addEventListener("click", () => {
        detailContext = "";
        lastResponse = undefined;
        field.value = "";
        fieldLabel.textContent = defaultLabel;
        field.minLength = defaultMinLength;
        result.hidden = true;
        field.focus();
      });
      followUp.append(reset);
    }
    answer.append(followUp);
  } else if (!response.article) {
    answer.textContent = "Auch mit deiner Ergänzung finde ich in den hinterlegten Ratgebern keine ausreichend passende Antwort.";
  }
  status.textContent = fallback ? "Antwort per lokaler Stichwortsuche." : "";
  result.hidden = false;
  button.disabled = false;
  const heading = document.querySelector("#answer-title");
  heading.textContent = response.article ? "Antwort" : response.needsContext ? "Eine kurze Rückfrage" : "Kein passender Ratgeber";
  heading.focus();
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
    if (button.disabled) render(choose(activeQuestion, [], { clarified: activeClarified }), true);
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
    worker = new Worker(new URL("./worker.mjs?v=dialog", import.meta.url), { type: "module" });
    worker.onerror = onWorkerError;
    worker.onmessage = ({ data }) => {
      switch (data.type) {
        case "progress": setProgress(data.value); break;
        case "indexing":
          setProgress(data.value);
          startupStatus.textContent = "Die KI bereitet die Ratgeber für deine Fragen vor …";
          break;
        case "ready": openForm("model"); break;
        case "answer": render(data.response); break;
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
  const input = field.value.trim();
  const reply = typedFollowUp(lastResponse, input);
  if (reply) {
    render(reply, mode === "keywords");
    return;
  }
  const minimum = detailContext ? 2 : defaultMinLength;
  if (input.length < minimum) {
    status.textContent = detailContext ? "Bitte ergänze noch etwas." : "Bitte gib eine Frage mit mindestens fünf Zeichen ein.";
    return;
  }
  activeClarified = Boolean(detailContext);
  activeQuestion = activeClarified ? detailContext + "\nErgänzung: " + input : input;
  button.disabled = true;
  result.hidden = true;
  answer.replaceChildren();
  if (mode === "keywords") {
    render(choose(activeQuestion, [], { clarified: activeClarified }), true);
    return;
  }
  status.textContent = "Die KI sucht nach passenden Ratgebertexten …";
  timer = setTimeout(onWorkerError, 30000);
  worker.postMessage({ type: "question", question: activeQuestion, clarified: activeClarified });
});

startModel();
