# Digitale Medienpädagogin

Eine Webapp für Fragen zu Cybermobbing, digitaler Gewalt, Desinformation und weiteren Medienthemen.

## Lokal starten

Node.js 22 oder neuer. Für die KI einen Hugging Face Token mit Inference-Berechtigung als `HF_TOKEN` in der lokalen Datei `.env.local` hinterlegen. Die Datei ist in Git ignoriert. Im Projektordner `node --env-file-if-exists=.env.local server.mjs` ausführen und http://127.0.0.1:8787 öffnen. `HF_MODEL` ist optional und überschreibt das aus der bisherigen App übernommene Modell.

## Auf GitHub und im Web

Die Dateien in ein eigenes Repository übernehmen. Für den Betrieb einen Node.js Host mit dem Repository verbinden und `node server.mjs` als Startbefehl verwenden. Auf dem Host `HOST=0.0.0.0` und `HF_TOKEN` als Servervariablen setzen. Der Server nutzt den vom Host gesetzten `PORT`. GitHub Pages hostet statische Dateien und führt den benötigten Node.js Server nicht aus.

## Quellen und Daten

Der Server durchsucht eine Startauswahl redaktionell hinterlegter Seiten von JUUUPORT, klicksafe und HateAid. Er lädt HTML direkt von diesen Seiten ohne Weiterleitungen. Gelesene Seiten werden bis zu 30 Minuten im Arbeitsspeicher gehalten. An das Sprachmodell gehen die Frage und passende Ausschnitte. Eine Antwort wird nur angezeigt, wenn jeder Abschnitt gültige IDs aus den übergebenen Ausschnitten enthält. Die App verlinkt die Originalseiten und prüft IDs technisch. Ob ein Beleg die jeweilige Aussage inhaltlich vollständig trägt, entscheidet das Modell.

Die App führt keine Gesprächsverläufe. Fragen werden an Hugging Face und den verwendeten Inferenzanbieter übermittelt. Vor einem öffentlichen Einsatz ein Anfragelimit am Hosting und passende Datenschutzhinweise für den eigenen Betrieb einrichten.

`npm test` prüft Quellenwahl und Quellenvalidierung ohne Zugangsdaten.
