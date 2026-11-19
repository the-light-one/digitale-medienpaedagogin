import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { answerQuestion, noEvidence } from "./answer.mjs";

const port = Number(process.env.PORT || 8787);
let pending = 0;
const assets = new Map([
  ["/", ["index.html", "text/html"]],
  ["/app.js", ["app.js", "text/javascript"]],
  ["/style.css", ["style.css", "text/css"]]
]);

function json(res, code, body) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}

async function readQuestion(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > 12000) {
      req.resume();
      throw new Error("Anfrage zu groß");
    }
    chunks.push(chunk);
  }
  const question = JSON.parse(Buffer.concat(chunks).toString("utf8"))?.question;
  if (typeof question !== "string" || question.trim().length < 5 || question.trim().length > 1600) {
    throw new Error("Ungültige Frage");
  }
  return question.trim();
}

createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  const path = req.url?.split("?")[0];
  if (req.method === "GET" && assets.has(path)) {
    const [file, type] = assets.get(path);
    try {
      const body = await readFile(new URL("./public/" + file, import.meta.url));
      res.writeHead(200, { "Content-Type": type + "; charset=utf-8" });
      res.end(body);
    } catch {
      json(res, 500, { error: "Die Seite ist momentan nicht verfügbar." });
    }
    return;
  }

  if (req.method !== "POST" || path !== "/api/frage") return json(res, 404, { error: "Seite nicht gefunden." });
  if (!/^application\/json(?:\s*;|$)/i.test(req.headers["content-type"] ?? "")) {
    return json(res, 415, { error: "Bitte nutze das Fragefeld der App." });
  }
  let question;
  try {
    question = await readQuestion(req);
  } catch {
    return json(res, 400, { error: "Bitte gib eine Frage mit 5 bis 1.600 Zeichen ein." });
  }
  if (!process.env.HF_TOKEN) return json(res, 503, { error: "Die KI ist auf diesem Server noch nicht eingerichtet." });
  if (pending >= 3) return json(res, 429, { error: "Gerade laufen mehrere Anfragen. Versuch es gleich noch einmal." });
  pending++;
  try {
    const sections = await answerQuestion(question);
    return json(res, 200, { sections, message: sections.length ? "" : noEvidence });
  } catch {
    return json(res, 502, { error: "Die Antwort konnte gerade nicht erstellt werden. Versuch es später noch einmal." });
  } finally {
    pending--;
  }
}).listen(port, process.env.HOST || "127.0.0.1", () => console.log("App läuft auf Port " + port));
