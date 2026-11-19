const form = document.querySelector("#question-form");
const question = document.querySelector("#question");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const answer = document.querySelector("#answer");
const button = form.querySelector("button");

form.addEventListener("submit", async event => {
  event.preventDefault();
  if (button.disabled) return;
  button.disabled = true;
  result.hidden = true;
  answer.replaceChildren();
  status.textContent = "Die App sucht nach passenden Quellen …";
  try {
    const response = await fetch("./api/frage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question.value }),
      signal: AbortSignal.timeout(50000)
    });
    const data = await response.json();
    if (!response.ok) {
      status.textContent = data.error;
      return;
    }
    for (const section of data.sections) {
      const paragraph = document.createElement("p");
      paragraph.textContent = section.text;
      const sources = document.createElement("ul");
      for (const source of section.sources) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = source.url;
        link.textContent = source.publisher + " · " + source.title;
        item.append(link);
        sources.append(item);
      }
      answer.append(paragraph, sources);
    }
    if (!data.sections.length) answer.textContent = data.message;
    status.textContent = "";
    result.hidden = false;
    document.querySelector("#answer-title").focus();
  } catch {
    status.textContent = "Die Verbindung ist fehlgeschlagen. Versuch es bitte erneut.";
  } finally {
    button.disabled = false;
  }
});
