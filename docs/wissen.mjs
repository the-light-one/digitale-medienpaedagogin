export const articles = [
  {
    "title": "Cybermobbing erkennen",
    "query": "Warum ist es Cybermobbing, wenn jemand im Klassenchat ständig beleidigt oder ausgegrenzt wird?",
    "text": "Wiederholte Angriffe oder Ausgrenzung über digitale Medien können Cybermobbing sein. Das kann etwa in einem Klassenchat, in sozialen Netzwerken oder in einem Spiel passieren.",
    "publisher": "klicksafe",
    "url": "https://www.klicksafe.de/cybermobbing",
    "topic": "(?:was ist|was bedeutet|definition|woran|erkenn).{0,65}(?:mobb|ausgrenz)|(?:mobb|ausgrenz).{0,45}(?:definition|bedeutet|erkenn)",
    "id": "mobbing-definition",
    "group": "mobbing"
  },
  {
    "title": "Hilfe bei Cybermobbing",
    "query": "Was kann ich tun, wenn ich im Klassenchat fertiggemacht werde? Wer hilft mir bei Cybermobbing?",
    "text": "Du kannst dich an die Scouts von JUUUPORT wenden. Die Beratung ist kostenlos und vertraulich. Über das Angebot kannst du auch problematische Inhalte melden.",
    "publisher": "JUUUPORT",
    "url": "https://www.juuuport.de/hilfe",
    "topic": "(?:mobb|fertiggemacht).{0,55}(?:juuuport|scout|beratungsstelle)|(?:juuuport|scout|beratungsstelle).{0,55}(?:mobb|fertiggemacht)",
    "id": "mobbing-scouts",
    "group": "mobbing"
  },
  {
    "title": "Cybergrooming erkennen",
    "query": "Ein Fremder schreibt meinem Kind, will in einen privaten Chat wechseln und fragt nach Fotos oder einem Treffen.",
    "text": "Wenn jemand schnell allein mit dir chatten, Bilder bekommen oder dich persönlich treffen möchte, darfst du den Kontakt beenden. Bleib bei öffentlichen Chats und verschicke auf Aufforderung keine Fotos oder Videos.",
    "publisher": "JUUUPORT",
    "url": "https://www.juuuport.de/infos/ratgeber/cybergrooming",
    "topic": "grooming|(?:fremd\\w*|erwachsen\\w*).{0,70}(?:foto|nackt|treffen|privat\\w* chat)|(?:foto|nackt|treffen|privat\\w* chat).{0,70}(?:fremd\\w*|erwachsen\\w*)",
    "id": "grooming-signale",
    "group": "grooming",
    "verifyTopic": true
  },
  {
    "title": "Hilfe bei Cybergrooming",
    "query": "Was soll ich nach sexueller Belästigung durch fremde Erwachsene im Chat machen? Cybergrooming melden und blockieren.",
    "text": "Sprich mit einer Vertrauensperson. Sichere den Chatverlauf, melde den Kontakt und blockiere ihn gegebenenfalls. Die JUUUPORT Scouts bieten vertrauliche Unterstützung an.",
    "publisher": "JUUUPORT",
    "url": "https://www.juuuport.de/infos/ratgeber/cybergrooming",
    "topic": "grooming|sexuell\\w* belästig|(?:fremd\\w*|erwachsen\\w*).{0,70}(?:foto|nackt|treffen|privat\\w* chat)|(?:foto|nackt|treffen|privat\\w* chat).{0,70}(?:fremd\\w*|erwachsen\\w*)",
    "id": "grooming-hilfe",
    "group": "grooming",
    "verifyTopic": true
  },
  {
    "title": "Angriffe dokumentieren",
    "query": "Wie sichere ich einen Screenshot als Beweis für eine Drohung, Beleidigung oder Hass im Internet?",
    "text": "Sichere den Screenshot möglichst bald. Er sollte den Beitrag, das vollständige Datum, die Uhrzeit, den Nutzernamen und den Kontext zeigen. HateAid erklärt, wie du dabei vorgehen kannst.",
    "publisher": "HateAid",
    "url": "https://hateaid.org/ratgeber/",
    "topic": "beweis\\w* sicher|(?:screenshot|dokumentier).{0,65}(?:beweis|droh|hass|beleidig|kommentar|angriff|mobb|nachweis|übergriff)|(?:beweis|droh|hass|beleidig|kommentar|angriff|mobb|nachweis|übergriff).{0,65}(?:screenshot|dokumentier)",
    "id": "beweise",
    "group": "beweise"
  },
  {
    "title": "Angriffe melden",
    "query": "Wie melde ich Hasskommentare, Beleidigungen oder einen übergriffigen Beitrag auf Social Media?",
    "text": "Du kannst Beiträge bei der jeweiligen Plattform melden. HateAid sammelt Meldewege und erklärt, wie das auf verschiedenen Plattformen geht.",
    "publisher": "HateAid",
    "url": "https://hateaid.org/ratgeber/",
    "topic": "\\b(?:melde[tn]?|meldung|reporten|beschwerde)\\b.{0,65}(?:hass|droh|beleidig|beitrag|plattform|inhalt|kommentar|konto|mobb|chat)|(?:hass|droh|beleidig|beitrag|plattform|inhalt|kommentar|konto|mobb|chat).{0,65}\\b(?:melde[tn]?|meldung|reporten|beschwerde)\\b",
    "id": "melden",
    "group": "melden"
  },
  {
    "title": "Beratung bei digitaler Gewalt",
    "query": "Wer hilft mir bei digitaler Gewalt, Online Bedrohungen oder Hass im Netz? Ich werde online angegriffen.",
    "text": "HateAid berät Betroffene digitaler Gewalt. Auf der Beratungsseite findest du mit dem HateAid-Buddy einen Einstieg, der dich anhand deiner Situation zur passenden Unterstützung führt.",
    "publisher": "HateAid",
    "url": "https://hateaid.org/betroffenenberatung/",
    "topic": "digitale gewalt|bedroh|hasskommentar|hass im netz|online angegriffen|online erpress",
    "id": "digitale-gewalt",
    "group": "digitale-gewalt"
  },
  {
    "title": "Falschmeldungen prüfen",
    "query": "Wie erkenne ich Fake News, Desinformation, einen Deepfake oder eine falsche Nachricht?",
    "text": "JUUUPORT erklärt, woran man Falschmeldungen erkennen kann und wie sie verbreitet werden. Der Ratgeber hilft dir dabei, eine verdächtige Nachricht zu prüfen.",
    "publisher": "JUUUPORT",
    "url": "https://www.juuuport.de/infos/ratgeber/fake-news",
    "topic": "fake[ -]?news|desinformation|falschmeldung|deepfake|falsch\\w* nachricht|nachricht.{0,25}(?:echt|gefälscht)",
    "id": "falschmeldungen",
    "group": "desinformation"
  },
  {
    "title": "Desinformation vermitteln",
    "query": "Wie kann ich in der Schule Desinformation, Fake News oder Deepfakes im Unterricht behandeln? Unterrichtsmaterial Medienkompetenz.",
    "text": "klicksafe bündelt Informationen und Materialien zum Umgang mit Falschmeldungen, Desinformation und Deepfakes auf seiner Themenseite.",
    "publisher": "klicksafe",
    "url": "https://www.klicksafe.de/desinformation-und-meinung",
    "topic": "fake[ -]?news|desinformation|falschmeldung|deepfake|falsch\\w* nachricht",
    "id": "desinformation-unterricht",
    "group": "desinformation"
  },
  {
    "title": "Mediennutzung einschätzen",
    "query": "Wo bekomme ich Hinweise zu Mediensucht, Gaming, langer Bildschirmzeit und ständig am Handy sein?",
    "text": "JUUUPORT erklärt, ab wann die Nutzung von Social Media, Messengern oder Spielen zum Problem werden kann. Im Ratgeber findest du Hinweise, wie du die Nutzung einschätzen und Hilfe finden kannst.",
    "publisher": "JUUUPORT",
    "url": "https://www.juuuport.de/infos/ratgeber/mediensucht",
    "topic": "mediensucht|bildschirmzeit|medienzeit|handyzeit|spielzeit|ständig.{0,20}(?:handy|smartphone|zock|spiel)|(?:zu viel|dauernd|ständig|süchtig).{0,30}(?:gaming|zock|spiel|handy|smartphone)",
    "id": "medienzeit",
    "group": "medienzeit"
  },
  {
    "title": "Daten im Netz schützen",
    "query": "Wie schütze ich meine Privatsphäre, meine Daten und mein Passwort im Internet? Datenschutz.",
    "text": "Der Datenschutzratgeber von JUUUPORT bietet Informationen und Tipps zum Schutz persönlicher Daten im Netz.",
    "publisher": "JUUUPORT",
    "url": "https://www.juuuport.de/infos/ratgeber/datenschutz",
    "topic": "datenschutz|privatsphäre|passw(?:ort|ört)|persönlich\\w* daten",
    "id": "datenschutz",
    "group": "datenschutz"
  },
  {
    "title": "Erstes Handy oder Smartphone in der Grundschule",
    "query": "Mein Sohn ist in der dritten Klasse und will ein eigenes Handy. Ab wann ist ein erstes Smartphone für mein Kind sinnvoll? Soll meine Tochter mit acht oder neun Jahren ein Handy bekommen?",
    "text": "Ob ein eigenes Smartphone schon sinnvoll ist, hängt davon ab, was dein Kind im Umgang damit schon kann. klicksafe empfiehlt, zuerst gemeinsam an einem Familiengerät zu üben. Mit der Checkliste könnt ihr schauen, was schon klappt und was ihr noch besprechen solltet. Geht es vor allem darum, auf dem Schulweg erreichbar zu sein, kann ein einfaches Handy ohne Internet ausreichen.",
    "publisher": "klicksafe",
    "url": "https://www.klicksafe.de/materialien/ist-mein-kind-fit-fuer-ein-eigenes-smartphone",
    "more": [
      {
        "title": "Mediennutzung in der Grundschule",
        "url": "https://www.klicksafe.de/fileadmin/cms/download/Material/Mediensicher-in-die-Schule_Flyer_klicksafe.pdf"
      }
    ],
    "topic": "(?:eigen\\w*|erst\\w*)\\s+(?:handy|smartphone|mobiltelefon)|(?:handy|smartphone|mobiltelefon).{0,25}(?:kauf|bekomm|schenk|anschaff|für (?:mein|ein|grundschul))|(?:kauf|bekomm|schenk|anschaff|ab wann|ab welchem alter|zu früh).{0,45}(?:handy|smartphone|mobiltelefon)|(?:grundschul\\w*|\\b(?:dritt\\w*|3\\.)\\s+klasse).{0,45}(?:handy|smartphone|mobiltelefon)",
    "id": "erstes-handy",
    "group": "erstes-handy"
  },
  {
    "publisher": "klicksafe",
    "id": "mobbing-eltern",
    "group": "mobbing",
    "title": "Erste Schritte, wenn dein Kind gemobbt wird",
    "query": "Mein Kind wird gemobbt. Was soll ich tun? Andere machen meinen Sohn dauernd fertig. Die Mitschülerinnen lachen ständig über meine Tochter und lassen sie nie mitmachen. In der Schule wird mein Kind wiederholt ausgegrenzt. Im Klassenchat teilen sie immer wieder peinliche Fotos von ihr. In der Klassengruppe gibt es täglich Anfeindungen.",
    "topic": "(?:cyber[ -]?)?mobb(?:ing|t|en)|gemobbt|(?:fertig|lächerlich)\\s*gemacht|ausgegrenz|auslach|ausgelach|gehänsel|hänsel|(?:ärgern|beleidigen).{0,45}(?:jeden tag|ständig|immer wieder)|(?:jeden tag|ständig|immer wieder).{0,45}(?:ärgern|beleidigen|auslach)|anfeindung|(?:peinlich|bloßstell)\\w*.{0,25}(?:foto|bild)|(?:foto|bild).{0,25}(?:peinlich|bloßstell)",
    "text": "Hör deinem Kind in Ruhe zu und zeig ihm, dass du auf seiner Seite bist. Überlegt gemeinsam, was ihm jetzt helfen würde. Wenn das Mobbing mit der Schule zu tun hat, könnt ihr gemeinsam mit der Klassenleitung, einer Vertrauenslehrkraft oder der Schulleitung die nächsten Schritte besprechen. Wenn auch Nachrichten oder Beiträge im Spiel sind, könnt ihr diese sichern.",
    "url": "https://www.klicksafe.de/cybermobbing",
    "followUp": {
      "question": "Wo passiert es vor allem?",
      "options": [
        {
          "label": "In der Schule",
          "id": "mobbing-schule",
          "match": "(?:in der )?schule|schulhof|im unterricht|auf dem schulhof"
        },
        {
          "label": "Im Chat oder online",
          "id": "mobbing-online",
          "match": "online|(?:im )?(?:klassen)?chat|im internet|bei whatsapp|an beiden orten|beides"
        },
        {
          "label": "An beiden Orten",
          "id": "mobbing-online",
          "match": "an beiden orten|beides"
        }
      ]
    }
  },
  {
    "publisher": "klicksafe",
    "id": "mobbing-schule",
    "group": "mobbing",
    "title": "Mobbing im Schulumfeld ansprechen",
    "query": "Mobbing in der Schule, Klassenleitung informieren",
    "contextOnly": true,
    "text": "Besprich mit deinem Kind, welche erwachsene Person an der Schule es als Unterstützung möchte. Wendet euch an die Klassenleitung, eine Vertrauenslehrkraft oder die Schulleitung. klicksafe empfiehlt, die nächsten Schritte mit der Schule zu planen und Kontakt zu den Eltern der beteiligten Kinder nicht vorschnell aufzunehmen.",
    "url": "https://www.klicksafe.de/cybermobbing"
  },
  {
    "publisher": "klicksafe",
    "id": "mobbing-online",
    "group": "mobbing",
    "title": "Cybermobbing dokumentieren und melden",
    "query": "Cybermobbing im Chat, online, Beweise",
    "contextOnly": true,
    "text": "Sichert Nachrichten oder öffentlich sichtbare Beiträge, etwa als Screenshot. Ihr könnt die betreffenden Konten oder Inhalte im Dienst melden und Kontakte blockieren. Wenn die Angriffe auch mit der Schule zu tun haben, bezieht sie nach Rücksprache mit deinem Kind ein.",
    "url": "https://www.klicksafe.de/cybermobbing"
  },
  {
    "publisher": "klicksafe",
    "id": "klassenchat",
    "group": "klassenchat",
    "title": "Eine App für den Klassenchat auswählen",
    "query": "Mein Kind will in der sechsten Klasse einen Klassenchat. Welchen Messenger können wir nutzen? Welche Plattform zum Schreiben mit der Klasse? Die Mitschüler möchten sich über eine gemeinsame Gruppe am Handy austauschen. Klassengruppe ohne WhatsApp einrichten.",
    "topic": "klass(en|engruppen)[ -]?(?:chat|gruppe)|(?:messenger|chat[ -]?app|whatsapp|signal).{0,65}(?:klasse|schule|mitschül|mitschül)|(?:klasse|schule|mitschül).{0,65}(?:messenger|chat[ -]?app|whatsapp|signal|chatgruppe)",
    "text": "Für einen Klassenchat würde ich zuerst bei der Schule nach einer eigenen Plattform fragen, etwa Moodle oder itslearning, falls sie dort schon genutzt wird. So können Kinder mit Schulzugang auch am Computer teilnehmen. Für einen privaten Messenger nennt klicksafe Signal als mögliche Alternative. Prüft das Mindestalter und die Nutzungsbedingungen der App sowie die Frage, wie Kinder ohne Smartphone teilnehmen können. Legt gemeinsam Regeln fest, was in die Gruppe gehört und wer bei Problemen hilft.",
    "url": "https://www.klicksafe.de/paedagogen/medien-materialien/unsere-regeln-fuer-den-klassenchat-unterrichtseinheit",
    "more": [
      {
        "title": "Welcher Messenger eignet sich? Unterrichtsmaterial (PDF)",
        "url": "https://www.klicksafe.de/fileadmin/cms/download/Material/P%C3%A4d._Praxis/UE-Klassenchat_Material-paed-Praxis_klicksafe.pdf"
      }
    ],
    "followUp": {
      "question": "Geht es vor allem um Infos aus der Schule oder ums private Schreiben in der Klasse?",
      "options": [
        {
          "label": "Infos aus der Schule",
          "id": "klassenchat-schule",
          "match": "(?:infos? aus der )?schule|nur schulinfos|hausaufgaben|schulinfos"
        },
        {
          "label": "Privat miteinander schreiben",
          "id": "klassenchat-privat",
          "match": "privat(?: miteinander schreiben)?|privater austausch|mit freunden schreiben"
        }
      ]
    }
  },
  {
    "publisher": "klicksafe",
    "id": "klassenchat-schule",
    "group": "klassenchat",
    "title": "Schulinfos für alle zugänglich machen",
    "query": "Hausaufgaben und Termine ohne Messenger und Smartphone",
    "contextOnly": true,
    "text": "Frag die Schule, welche Plattform alle Kinder mit ihrem Schulzugang nutzen können. klicksafe nennt neben dem Schulportal auch einen Aushang im Klassenzimmer oder eine feste Person aus der Klasse, die wichtige Infos persönlich weitergibt.",
    "url": "https://www.klicksafe.de/fileadmin/cms/download/Material/P%C3%A4d._Praxis/UE-Klassenchat_Material-paed-Praxis_klicksafe.pdf"
  },
  {
    "publisher": "klicksafe",
    "id": "klassenchat-privat",
    "group": "klassenchat",
    "title": "Privaten Klassenchat gemeinsam vereinbaren",
    "query": "Privater Messenger unter Mitschülerinnen, Klassenregeln und Mindestalter",
    "contextOnly": true,
    "text": "Wenn es um privaten Austausch geht, nennt klicksafe Signal als mögliche Alternative zu WhatsApp. Prüft vor der Wahl die Altersvorgaben und besprecht, wie alle Kinder einbezogen werden können. Vereinbart für die Gruppe, wann und worüber geschrieben wird und wer bei Problemen ansprechbar ist.",
    "url": "https://www.klicksafe.de/fileadmin/cms/download/Material/P%C3%A4d._Praxis/UE-Klassenchat_Material-paed-Praxis_klicksafe.pdf"
  },
  {
    "publisher": "klicksafe",
    "id": "spiele-alter",
    "group": "spiele-alter",
    "title": "Altersfreigaben bei Spielen beachten",
    "query": "Mein Kind ist zwölf und spielt Spiele ab 18. Was kann ich tun? Mein Sohn zockt Games für Erwachsene auf der Konsole. Ein Zwölfjähriger hat ein Videospiel mit USK 18. Mein Kind spielt GTA oder ein anderes Spiel und ich möchte wissen, ob es altersgerecht ist. Wie verhindere ich den Zugriff auf Spiele, die für sein Alter nicht freigegeben sind?",
    "topic": "(?:spiel|zock|gam|konsole|playstation|xbox|switch).{0,80}(?:ab\\s*(?:16|18)|usk|altersfreigab|alterskennzeich|jugendfreigab|altersgerecht|für erwachsene)|(?:ab\\s*(?:16|18)|usk|altersfreigab|alterskennzeich|jugendfreigab|altersgerecht|für erwachsene).{0,80}(?:spiel|zock|gam|konsole|playstation|xbox|switch)|\\busk\\s*(?:16|18)\\b",
    "text": "Wenn dein Kind jünger ist als die Altersfreigabe des Spiels, würde ich den Zugriff darauf erst einmal begrenzen. Schau mit ihm nach, um welches Spiel und welche Alterskennzeichnung es geht, und erkläre ihm deine Entscheidung. Sucht gemeinsam ein altersgerechtes Spiel. Wenn es am eigenen Gerät spielt, kannst du ein Kinderkonto mit dem richtigen Alter einrichten und die Altersgrenze im Jugendschutz einstellen.",
    "url": "https://www.klicksafe.de/fileadmin/cms/download/Material/Infobroschuere_DigiSpiele-TippsEltern_klicksafe.pdf",
    "more": [
      {
        "title": "Sicherheitseinstellungen und Regeln für Eltern",
        "url": "https://www.klicksafe.de/news/was-spielt-mein-kind-da-eigentlich-tipps-fuer-eltern-rund-ums-gaming"
      }
    ],
    "followUp": {
      "question": "Wo spielt dein Kind das Spiel?",
      "options": [
        {
          "label": "Zu Hause oder am eigenen Gerät",
          "id": "spiele-geraet",
          "match": "(?:zu )?hause|zu hause oder am eigenen gerät|am eigenen gerät|auf der eigenen konsole"
        },
        {
          "label": "Bei anderen",
          "id": "spiele-absprache",
          "match": "bei (?:anderen|freunden|freundinnen)|unterwegs"
        }
      ]
    }
  },
  {
    "publisher": "klicksafe",
    "id": "spiele-geraet",
    "group": "spiele-alter",
    "title": "Jugendschutz am Spielgerät einstellen",
    "query": "Kinderkonto auf Computer, Smartphone oder Konsole einrichten",
    "contextOnly": true,
    "text": "Richte für dein Kind ein eigenes Konto mit dem richtigen Alter ein. Begrenze in den Jugendschutzeinstellungen, welche Spiele es öffnen kann. Je nach Gerät kannst du dort auch Kontakte, Käufe und Spielzeiten einstellen.",
    "url": "https://www.klicksafe.de/news/was-spielt-mein-kind-da-eigentlich-tipps-fuer-eltern-rund-ums-gaming"
  },
  {
    "publisher": "klicksafe",
    "id": "spiele-absprache",
    "group": "spiele-alter",
    "title": "Spielregeln für unterwegs besprechen",
    "query": "Spiele ab 18 bei Freunden, Regeln außerhalb von zu Hause",
    "contextOnly": true,
    "text": "Besprich mit deinem Kind, welche Spiele für sein Alter infrage kommen und warum eure Absprachen auch unterwegs gelten. klicksafe empfiehlt klare, nachvollziehbare Regeln und den Austausch darüber, was dein Kind spielt.",
    "url": "https://www.klicksafe.de/fileadmin/cms/download/Material/Infobroschuere_DigiSpiele-TippsEltern_klicksafe.pdf"
  }
];
