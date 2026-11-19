# Digitale Medienpädagogin

Statische Webapp für GitHub Pages. Als Veröffentlichungsquelle dient `main`, Ordner `/docs`. Lokal lässt sich `docs` mit jedem statischen HTTP-Server öffnen.

Beim ersten Absenden lädt der Browser Transformers.js und das mehrsprachige E5-Modell. Ein Web Worker wertet die Frage lokal in WebAssembly aus und sucht in den hinterlegten Ratgebertexten. Die Frage bleibt im Browser. Modell und Bibliothek werden für die Ausführung heruntergeladen. Falls das Modell nicht verfügbar ist, bietet die App eine lokale Stichwortsuche.

Die App zeigt redaktionell formulierte Antworten mit Links zu JUUUPORT, klicksafe oder HateAid. Die Wissensbasis ist eine kuratierte Startauswahl in `docs/wissen.mjs` und enthält keine Live-Suche. Neben Einträgen lassen sich dort Beispielanfragen ergänzen. Das Modell ordnet Fragen den Einträgen zu. Die angezeigten Aussagen stammen unverändert aus der Wissensbasis.
