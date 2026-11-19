import assert from "node:assert/strict";
import { test } from "node:test";
import { articles } from "../docs/wissen.mjs";
import { choose, followUpAnswer, typedFollowUp } from "../docs/suche.mjs";

test("Gemeldete Fragen führen zu Ratgeber und Rückfrage", () => {
  for (const [question, id, detail, next] of [
    ["Mein Kind wird gemobbt, was soll ich tun?", "mobbing-eltern", "In der Schule", "mobbing-schule"],
    ["mein Kind ist 6. klasse und will einen klassenchat, empfehle mir eine app", "klassenchat", "privat", "klassenchat-privat"],
    ["mein kind ist 12 und spielt spiele ab 18. was soll ich tun?", "spiele-alter", "Bei Freunden.", "spiele-absprache"]
  ]) {
    const result = choose(question);
    assert.equal(result.article?.id, id);
    assert.equal(typedFollowUp(result, detail)?.article.id, next);
    assert.equal(followUpAnswer(result, next)?.article.id, next);
    assert.equal(followUpAnswer(result, "grooming-signale"), null);
  }
});

test("Ein Vorfall im Klassenchat und die Wahl einer App bleiben unterscheidbar", () => {
  assert.equal(choose("Die anderen posten ständig peinliche Fotos von ihr im Klassenchat").article?.id, "mobbing-eltern");
  assert.equal(choose("Unsere Tochter will einen Klassenchat. Was sollen wir gegen die täglichen Anfeindungen dort tun?").article?.id, "mobbing-eltern");
  assert.equal(choose("Ich mag Mobbing nicht, aber welche App soll ich für einen Klassenchat nehmen?").article?.id, "klassenchat");
  assert.equal(choose("Wie kann ich mein Kind in der Schule anmelden?").needsContext, true);
  assert.equal(choose("Was können wir tun?").followUp.options.length, 0);
  assert.equal(choose("Mein Kind spielt GTA. Ist das altersgerecht?").article?.id, "spiele-alter");
});

test("Semantische Signale helfen bei Umschreibungen mit hinreichendem Abstand", () => {
  const scores = articles.map(item => item.id === "mobbing-eltern" ? 0.88 : 0.74);
  const paraphrase = "Die anderen lassen sie nie zu sich an den Tisch.";
  assert.equal(choose(paraphrase, scores).article?.id, "mobbing-eltern");
  assert.equal(choose(paraphrase, scores, { unrelated: 0.88 }).needsContext, true);
  scores[articles.findIndex(item => item.id === "klassenchat")] = 0.87;
  assert.equal(choose(paraphrase, scores).needsContext, true);
  assert.deepEqual(choose("Wie backe ich Kuchen?", [], { clarified: true }), {});
});

test("Ein falscher Modelltreffer verdrängt keinen thematisch passenden Beleg", () => {
  const scores = articles.map(item => item.id === "grooming-signale" ? 0.99 : 0);
  const original = "Mein sohn ist in der dritten klasse und will ein eigenes handy? Ist das okqy?";
  assert.equal(choose(original, scores).article?.id, "erstes-handy");
  assert.equal(choose("Wie sichere ich einen Screenshot als Beweis?", scores).article?.id, "beweise");
  assert.equal(choose("Wann geht der Bus zur Schule?", scores).article, undefined);
});
