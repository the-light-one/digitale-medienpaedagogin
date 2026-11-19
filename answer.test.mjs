import test from "node:test";
import assert from "node:assert/strict";
import { readAnswer } from "./answer.mjs";
import { evidenceFor, selectSources } from "./sources.mjs";

const evidence = [{ id: 1, publisher: "JUUUPORT", title: "Hilfe", url: "https://www.juuuport.de/hilfe" }];

test("Quellenangaben stammen aus dem gelieferten Material", () => {
  assert.deepEqual(readAnswer('{"abschnitte":[{"text":"Hol dir Hilfe.","belege":[1]}]}', evidence),
    [{ text: "Hol dir Hilfe.", sources: [{ publisher: "JUUUPORT", title: "Hilfe", url: "https://www.juuuport.de/hilfe" }] }]);
  assert.throws(() => readAnswer('{"abschnitte":[{"text":"Ohne Beleg.","belege":[2]}]}', evidence));
  assert.throws(() => readAnswer('{"abschnitte":[{"text":"https://fremd.example","belege":[1]}]}', evidence));
  assert.deepEqual(readAnswer('{"abschnitte":[]}', evidence), []);
});

test("Cybermobbing führt zu den beiden passenden Ratgebern", () => {
  const urls = selectSources("Was kann ich gegen Cybermobbing im Klassenchat tun?").map(source => source[1]);
  assert.ok(urls.includes("https://www.klicksafe.de/cybermobbing"));
  assert.ok(urls.includes("https://www.juuuport.de/infos/ratgeber/cybermobbing"));
});

test("Abruf übergibt lesbare Artikelabsätze und bleibt bei den freigegebenen Hosts", async () => {
  const html = '<nav><p>Dieser Navigationsabsatz darf keinesfalls als Beleg verwendet werden.</p></nav>' +
    '<main><h1>Hilfe &amp; Beratung</h1><p>Bei Cybermobbing kannst du eine <b>vertrauliche Beratung</b> in Anspruch nehmen.</p></main>';
  const evidence = await evidenceFor("Cybermobbing im Klassenchat", async (url, options) => {
    assert.equal(options.redirect, "error");
    assert.match(new URL(url).hostname, /^(www\.juuuport\.de|www\.klicksafe\.de|hateaid\.org)$/);
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  });
  assert.equal(evidence.length, 5);
  assert.ok(evidence.every(passage => passage.title === "Hilfe & Beratung" &&
    passage.text.includes("vertrauliche Beratung") && !passage.text.includes("Navigationsabsatz")));
});
