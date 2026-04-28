---
id: f12d5320
title: 9. Nicht-normative Abschnitte
parentId: e6de7a5d
order: 90
lang: de
sourceHash: f8f55d53
---

Die Abschnitte in diesem Kapitel sind **informativ**, nicht normativ.
Sie definieren keine Compliance-Anforderungen, sondern bieten Orientierung, Kontext, Beispiele und Lernunterstützung für Gemeinschaften, Umsetzer, Prüfer und Standard-Hüter.

Nichts in diesem Abschnitt darf Anforderungen, die in den Schichten 0–6 definiert sind, außer Kraft setzen oder abschwächen.

## 9.1 Optionale Module

9.1.1 Optionale Module sind domänenspezifische Erweiterungen, die auf RCOS-Core aufbauen, ohne dessen verpflichtende Schichten zu verändern.

9.1.2 Optionale Module MUST:
- Deklarieren, welche RCOS-Schichten sie erweitern oder von welchen sie abhängen
- Ausdrücklich angeben, welche zusätzlichen Rollen, Regeln oder Artefakte sie einführen
- Invarianten der Schicht 0 oder RCOS-Core-Anforderungen NOT überschreiben oder ihnen widersprechen

9.1.3 Optionale Module MAY definieren:
- Domänenspezifische Praktiken
- Zusätzliche Einschränkungen oder Standards
- Spezialisierte Governance- oder Betriebsmuster

9.1.4 Typische Domänen optionaler Module MAY umfassen, sind aber nicht beschränkt auf:
- Permakultur und regenerative Landschaftspflege
- Alternative oder gemeinschaftsbasierte Bildungssysteme
- Gesundheits-, Pflege- und Wohlbefindenspraktiken
- Kulturelle oder spirituelle Praktiken
- Wirtschaftliche Spezialisierungen (z. B. Genossenschaften, Land Trusts, Gegenseitigkeitskredit)

9.1.5 Die Einführung optionaler Module MUST den in Schicht 6 definierten Änderungsmechanismen folgen.

9.1.6 Eine Gemeinschaft MAY RCOS-Core-konform sein, ohne optionale Module zu übernehmen.

## 9.2 Referenzimplementierungen

9.2.1 Eine Referenzimplementierung ist eine reale Gemeinschaft, die öffentlich dokumentiert, wie sie RCOS-Core anwendet.

9.2.2 Referenzimplementierungen sind **deskriptiv**, nicht präskriptiv.
Sie veranschaulichen, wie RCOS umgesetzt werden kann, nicht wie es umgesetzt werden muss.

9.2.3 Eine Gemeinschaft MAY sich nur dann als RCOS-Referenzimplementierung bezeichnen, wenn sie:
- RCOS-Core-konform ist
- Ihre Artefakte der Schichten 0–6 öffentlich dokumentiert
- Abweichungen, Experimente oder Erweiterungen klar kennzeichnet

9.2.4 Die Dokumentation von Referenzimplementierungen SHOULD umfassen:
- Kontext und Umfang (Größe, Standort, Zweck)
- Welche optionalen Module übernommen wurden
- Bekannte Herausforderungen und Fehlschläge
- Entwicklungsgeschichte und wesentliche Anpassungen

9.2.5 Referenzimplementierungen MUST NOT als autoritative Auslegungen des Standards behandelt werden.

## 9.3 Bekannte Fehlermuster

9.3.1 Bekannte Fehlermuster dokumentieren wiederkehrende Zusammenbruchsmuster, die in realen Gemeinschaften beobachtet wurden.

9.3.2 Fehlermuster sind **informative Signale**, keine Compliance-Kriterien.

9.3.3 Fehlermuster MAY umfassen, sind aber nicht beschränkt auf:
- Informelle Machtakkumulation
- Dominanz von Gründern oder Grundeigentümern
- Unsichtbare oder geschlechtsspezifische Arbeitsabhängigkeit
- Governance-Lähmung oder Sitzungsüberlastung
- Austrittsblockade oder sanfter Zwang
- Wirtschaftliche Vereinnahmung durch Verschuldung oder Vermögenskontrolle
- Konfliktvermeidung, die zu stiller Fragmentierung führt

9.3.4 Der Zweck der Dokumentation von Fehlermustern ist:
- Stresstests von RCOS-Strukturen zu unterstützen
- Designentscheidungen zu verbessern
- Früherkennung in aktiven Gemeinschaften zu ermöglichen

9.3.5 Die Dokumentation von Fehlermustern SHOULD darauf verweisen, welche RCOS-Schichten dazu gedacht sind, das jeweilige Muster abzumildern.
