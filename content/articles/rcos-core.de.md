---
id: fdd280ae
title: RCOS-Kern
parentId: null
order: 0
lang: de
sourceHash: 0ab1303a
---

## Was RCOS ist

Das **Regenerative Community Operating System (RCOS)** ist eine formale, schichtenbasierte Spezifikation für das Entwerfen, Betreiben und Weiterentwickeln intentionaler Gemeinschaften – ohne auf Charisma, Ideologie oder informelle Macht angewiesen zu sein.

RCOS behandelt eine Gemeinschaft als ein **gesteuertes System**, nicht als soziales Experiment. Es definiert die minimalen strukturellen Anforderungen, damit eine Gemeinschaft:

- unter Belastung kohärent bleibt,
- bei Machtasymmetrien fair bleibt,
- sich anpassen kann, ohne zu kollabieren,
- und sich über die Zeit hinweg regeneriert.

RCOS ist kein Lebensstil, kein Glaubenssystem und keine kulturelle Identität. Es ist ein **Betriebssystem**: ein Satz expliziter Regeln, Schnittstellen, Invarianten und Testfälle, die das Gemeinschaftsleben lesbar, überprüfbar und überlebensfähig machen.

---

## Welches Problem RCOS löst

Die meisten Gemeinschaften scheitern nicht an schlechten Absichten. Sie scheitern an **impliziter Struktur**.

Häufige Fehlermuster sind:

- informelle Anführer:innen, die formale Prozesse aushebeln,
- unausgesprochene Normen, die wie Regeln durchgesetzt werden,
- unsichtbare Arbeit, die zu Burnout führt,
- Wohlstand oder Charisma, die sich in Macht verwandeln,
- Konflikte, die vermieden werden, bis sie existenziell werden,
- Notfallentscheidungen, die zu dauerhaften Ausnahmen werden.

RCOS existiert, um diese Fehlermodi **strukturell unmöglich oder explizit adressierbar** zu machen.

---

## Was RCOS nicht ist

RCOS schreibt ausdrücklich **nicht** vor:

- eine bestimmte Kultur, einen Glauben oder eine Spiritualität,
- eine politische oder wirtschaftliche Ideologie,
- eine Governance-Methode (z. B. Konsens vs. Soziokratie),
- oder wie Menschen zusammenleben _sollten_.

Stattdessen beschränkt RCOS, _wie Entscheidungen getroffen werden_, _wie Macht begrenzt wird_ und _wie Veränderung stattfindet_ – unabhängig von Werten.

---

## Designprinzipien (nicht verhandelbar)

> **Nichts Wesentliches darf implizit bleiben.**

- **Regelbasiert, nicht wertebasiert** — Definiert Regeln und Grenzen, statt Überzeugungen vorzuschreiben. Werte variieren; Beschränkungen halten Systeme unter Belastung funktionsfähig.
- **Vorab-Festlegung statt Improvisation** — Kritische Entscheidungen (Konflikt, Macht, Geld) werden vereinbart, bevor Emotionen, Knappheit oder Machtkämpfe entstehen.
- **Modular von Grund auf** — Der Kern bleibt stabil, während optionale Domänenmodule hinzugefügt, ersetzt oder entfernt werden können, ohne das System zu beschädigen.
- **Auf menschliche Größenordnung ausgelegt (≈ 5–150 Personen)** — Optimiert für Gruppen, die klein genug sind, um Vertrauen, Verantwortlichkeit und geteilten Kontext ohne Bürokratie aufrechtzuerhalten.
- **Fehlertolerant, nicht fehlerblind** — Geht davon aus, dass Konflikte, Burnout und Fehler passieren werden, und bietet explizite Wiederherstellungswege.

Alles, was Folgendes betrifft, muss explizit deklariert, versioniert und überprüfbar sein:

- Autorität
- Mitgliedschaft
- Ressourcen
- Konflikte
- Systemevolution

- Schweigen wird niemals als Zustimmung gewertet.
- Tradition wird niemals als Autorität gewertet.
- Dringlichkeit wird niemals als Rechtfertigung gewertet.

---

## Zur Gruppengröße: Warum ~150?

**150** ≈ Dunbar's Number: kognitive Obergrenze für stabile soziale Beziehungen.

- **Minimal lebensfähige Gemeinschaft (5–7 Personen):**
  Darunter brechen Rollentrennung und Konfliktlösung zusammen.
- **Optimaler horizontaler Bereich (8–40 Personen):**
  Hohes Vertrauen, wenig Bürokratie, direkte Beteiligung möglich.
- **Maximale unsegmentierte Größe (120–150 Personen):**
  Darüber hinaus versagt informelle Governance.

Der RCOS-Kern gilt für jede Größe, aber ab ~150 Personen sind obligatorische Unterstrukturen (Kreise, Domänen, Nachbarschaften) erforderlich.

---

## Warum die RCOS-Kernstruktur wichtig ist

- Verhindert Gründerdominanz
- Macht Macht explizit
- Reduziert versteckte Normen
- Übersteht Konflikte
- Ermöglicht Replikation
- Integriert sich nahtlos mit DAO-Tooling, _ohne davon abhängig zu sein_

---

## Was bewusst nicht im RCOS-Kern enthalten ist

Diese Themen gehören zu **optionalen Modulen**, nicht zum Kern:

- Permakulturdesign
- Bildungsphilosophie
- Spirituelle oder kulturelle Praktiken
- Politische Ideologie
- Ästhetische oder Lebensstil-Entscheidungen

Der Kern regelt, wie Entscheidungen getroffen werden – nicht, welche Entscheidungen getroffen werden müssen.

---

## Invarianten (gelten für alle Schichten)

### Explizit schlägt Implizit

Wenn es nicht geschrieben, vereinbart und versioniert ist, **existiert es nicht**.

### Warum das wichtig ist

Die Schicht-Invarianten stellen sicher, dass kein noch so großer guter Wille, kein Charisma, keine Dringlichkeit und kein Konsens das System stillschweigend aushöhlen kann.

---

## Die RCOS-Explizitätsregel (Kernprinzip)

**Alles, was Macht, Risiko, Verantwortung oder Austrittskonditionen zuweist, muss explizit sein.**

Alles, was Präferenzen, Stil oder lokale Optimierung ausdrückt, kann optional sein.

### Explizit vs. Optional nach Schicht

Wir verwenden drei Kategorien:

- **MUSS be explicit** → erforderlich für RCOS-Konformität
- **KANN be explicit** → empfohlen, aber kontextabhängig
- **MUSS remain optional** → wird niemals vom Kern erzwungen

### Schichtübergreifende Invariante zur Explizitheit

**Wenn etwas:**

- Jemandem Rechte entziehen kann
- Jemandes Zeit oder Arbeitskraft binden kann
- Gemeinsame Ressourcen kontrollieren kann
- Widerspruch unterdrücken kann
- Einen Austritt verhindern kann

**Dann muss es explizit, dokumentiert und überprüfbar sein.**

Keine Ausnahmen.

Dieser Ansatz stellt sicher, dass:

- RCOS **nicht** bürokratisch wird
- Gemeinschaften kulturelle Freiheit behalten
- Nur _strukturelles Risiko_ reguliert wird
- Optionale Module leistungsfähig bleiben, nicht eingeschränkt werden

---

## Stresstest-getriebenes Design

RCOS wird nicht durch Absichten validiert, sondern durch **Widerstandsfähigkeit gegen Versagen**.

Die Spezifikation umfasst eine wachsende Sammlung von **Stresstests**, die aus realen Zusammenbrüchen von Gemeinschaften abgeleitet sind, wie etwa:

- Dominanz in Versammlungen
- Vetorecht der Gründer:innen
- Privatisierung von Gemeingütern
- Kulturen der Konfliktvermeidung
- Charismatische spirituelle Autorität
- Umgehung von Regeln im Notfall

Eine Gemeinschaft gilt nur dann als RCOS-konform, wenn sie **diesen Szenarien ohne informelle Behelfslösungen standhalten kann**.

Fast jedes Scheitern passiert, weil:

**Etwas Mächtiges implizit bleiben durfte.**

RCOS verwandelt:

- Implizite Macht → explizite Rollen
- Implizite Werte → begrenzte Regeln
- Implizite Bestrafung → ordentliches Verfahren
- Implizites Eigentum → deklarierte Rechte

### Bekannte Fehlermodi, die RCOS verhindern soll

Siehe [RCOS-Stresstests](/articles/rcos-stress-tests?id=6acbe9a7)

## Referenzimplementierungen

RCOS ermutigt kleine, reale **Referenzgemeinschaften**, die:

- die Kernschichten explizit umsetzen,
- Abweichungen und Fehler dokumentieren,
- und Erkenntnisse in den Standard zurückspeisen.

Das Ziel ist nicht Perfektion, sondern **Evolution durch Transparenz**.

---

## Warum „Regenerativ"

RCOS verwendet den Begriff _regenerativ_ bewusst.

Ein regeneratives System:

- ist nicht auf ständiges Wachstum angewiesen,
- brennt seine Mitglieder nicht aus,
- repariert Schäden, statt sie zu verstecken,
- und wird stärker, indem es Fehler integriert.

RCOS ist so gestaltet, dass **Belastung Lernen erzeugt**, nicht Zusammenbruch.

---

## Für wen RCOS gedacht ist

RCOS richtet sich an:

- intentionale Gemeinschaften,
- Ökodörfer und Wohnprojekte,
- Genossenschaften und Commons-basierte Organisationen,
- langfristige kollektive Wohnexperimente,
- und jede Gruppe, die ihren eigenen Erfolg überleben will.

RCOS ist besonders nützlich für Gruppen, die bereits starke Werte teilen – und sicherstellen wollen, dass diese Werte nicht zu Werkzeugen des Zwangs werden.

---

## Wie du RCOS nutzen kannst

RCOS kann genutzt werden als:

- ein **Entwurfsplan** vor der Gründung einer Gemeinschaft,
- ein **Audit-Rahmenwerk** für bestehende Gruppen,
- ein **Stresstest-Werkzeug** während Konflikten,
- oder eine **gemeinsame Sprache** für schwierige strukturelle Gespräche.

Die Einführung kann schrittweise erfolgen. Die Konformität kann partiell sein. Was zählt, ist **Explizitheit, nicht Reinheit**.

---

## Die Kernthese

> Gemeinschaften scheitern nicht, weil Menschen fehlerhaft sind.
> Sie scheitern, weil Systeme vage sind.

RCOS existiert, um Vagheit durch Struktur zu ersetzen –
damit Fürsorge, Autonomie und Regeneration etwas Solides haben, worauf sie stehen können.

---

## Änderungsprotokoll

- [v0.1](/articles/rcos-core/v0-1?id=e6de7a5d) — Erste Version
