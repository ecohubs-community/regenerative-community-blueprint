**RCOS – Regenerative Community Operating System**

# RCOS-Kernspezifikation — v0.1

- **Generiert:** 2026-04-29
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1)

- Status: Entwurf
- Version: RCOS-Core v0.1
- Zielgruppe: Gemeinschaftsgründer\*innen, Praktiker\*innen, Prüfer\*innen, Umsetzer\*innen
- Normative Schlüsselwörter: `MUSS`, `DARF NICHT`, `SOLLTE`, `KANN` (RFC-Stil)

## Inhaltsverzeichnis

- [Über RCOS Core](#ber-rcos-core)
- [0. Einführung](#0-einfhrung)
- [1. RCOS-Konformitätsmodell](#1-rcos-konformittsmodell)
- [2. Schicht 0 — Identität & Geltungsbereich](#2-schicht-0-identitt-geltungsbereich)
- [3. Schicht 1 — Mitgliedschaftssystem](#3-schicht-1-mitgliedschaftssystem)
- [4. Schicht 2 — Governance & Entscheidungslogik](#4-schicht-2-governance-entscheidungslogik)
- [5. Schicht 3 — Wirtschafts- & Ressourcensystem](#5-schicht-3-wirtschafts--ressourcensystem)
- [6. Schicht 4 — Konflikt, Wiedergutmachung & Verantwortlichkeit](#6-schicht-4-konflikt-wiedergutmachung-verantwortlichkeit)
- [7. Schicht 5 — Betrieb & Koordination](#7-schicht-5-betrieb-koordination)
- [8. Schicht 6 — Evolution & Anpassung](#8-schicht-6-evolution-anpassung)
- [9. Nicht-normative Abschnitte](#9-nicht-normative-abschnitte)
- [10. Compliance & Auditing](#10-compliance-auditing)
- [11. Versionierung & Governance des Standards](#11-versionierung-governance-des-standards)
- [Anhang A — Glossar](#anhang-a-glossar)
- [Anhang B — Beispiel-Artefakte (nicht normativ)](#anhang-b-beispiel-artefakte-nicht-normativ)
- [Anhang C — Zusammenfassung der Referenzimplementierung](#anhang-c-zusammenfassung-der-referenzimplementierung)

---

# Über RCOS Core

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

Siehe [RCOS-Stresstests](https://blueprint.ecohubs.community/de/articles/rcos-stress-tests?id=6acbe9a7)

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

- [v0.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1?id=e6de7a5d) — Erste Version


---

# 0. Einführung

## 0.1 Zweck von RCOS

Definiert ein standardisiertes, modulares Betriebssystem für kleine, intentionale Gemeinschaften mit Fokus auf Resilienz, Fairness und Regeneration.

## 0.2 Geltungsbereich des Kerns

Diese Spezifikation legt die **verpflichtenden Kern-Ebenen** fest, die für RCOS-Konformität erforderlich sind. Domänenspezifische Praktiken sind ausgeschlossen und werden über optionale Module abgedeckt.

## 0.3 Designprinzipien

- Constraint-basiert, nicht werte-basiert
- Vorabfestlegung statt Improvisation
- Modular per Default
- Menschliche Größenordnung
- Fehlertolerant

## 0.4 Definitionen und Terminologie

- Gemeinschaft (Community)
- Mitglied (Member)
- Rolle (Role)
- Domäne (Domain)
- Commons
- Invariante (Invariant)
- Entscheidungstyp (Decision Type)
- Konformität (Compliance)


---

# 1. RCOS-Konformitätsmodell

## 1.1 Konformitätsstufen

- RCOS-Core-konform
- RCOS-Core + Module (nicht normativ)

## 1.2 Explizitheitspflicht

Jeder Mechanismus, der Macht, Ressourcen, Pflichten oder Austritt betrifft, `MUSS` explizit, dokumentiert und überprüfbar sein.

## 1.3 Meta-Invariante

Was nicht schriftlich festgehalten und angenommen wurde, existiert nicht.


---

# 2. Schicht 0 — Identität & Geltungsbereich

Schicht 0 definiert die konstitutionelle Identität der Gemeinschaft. Er legt fest, was die Gemeinschaft *ist*, was sie *nicht ist*, und die nicht verhandelbaren Einschränkungen, unter denen alle anderen Layer operieren. Keine Regel, Entscheidung oder Praxis in höheren Layern darf Schicht 0 widersprechen.

## 2.1 Zweckdefinition

2.1.1 Eine Gemeinschaft MUSS genau einen primären Zweck definieren.

2.1.2 Der primäre Zweck MUSS den dauerhaften Grund für die Existenz der Gemeinschaft beschreiben und DARF NICHT ein kurzfristiges Ziel, Projekt oder eine Strategie sein.

2.1.3 Der primäre Zweck MUSS über die Zeit stabil sein und MUSS nur durch eine konstitutionelle Entscheidung gemäß Schicht 2 und über den in Schicht 6 definierten Änderungsprozess geändert werden.

2.1.4 Sekundäre Zwecke KANN definiert werden, DARF NICHT jedoch dem primären Zweck widersprechen oder ihn außer Kraft setzen.

2.1.5 Keine Handlung, Entscheidung oder Ressourcenzuweisung KANN dem erklärten primären Zweck materiell widersprechen.

## 2.2 Geltungsbereichserklärung

2.2.1 Die Gemeinschaft MUSS den Geltungsbereich dessen, was sie regiert, explizit erklären.

2.2.2 Die Geltungsbereichserklärung MUSS mindestens Folgendes umfassen:
- Von der Gemeinschaft verwaltete Vermögenswerte
- Bereiche der Entscheidungsbefugnis
- Aktivitäten und Verantwortlichkeiten unter kollektiver Kontrolle

2.2.3 Die Geltungsbereichserklärung MUSS explizit auflisten, was außerhalb des Geltungsbereichs liegt.

2.2.4 Alles, was nicht explizit als innerhalb des Geltungsbereichs erklärt ist, MUSS als außerhalb des Geltungsbereichs behandelt werden.

2.2.5 Die Gemeinschaft DARF NICHT Autorität über Personen, Vermögenswerte oder Bereiche ausüben, die als außerhalb des Geltungsbereichs erklärt sind.

## 2.3 Invarianten

2.3.1 Invarianten sind Einschränkungen, die definieren, was DARF NICHT verletzt werden darf, solange sie in Kraft sind.

2.3.2 Invarianten MUSS explizit aufgelistet und dokumentiert sein.

2.3.3 Invarianten MUSS über alle Layer von RCOS hinweg gelten.

2.3.4 Keine Entscheidung, Rolle, kein Prozess und keine Notfallmaßnahme KANN eine Invariante außer Kraft setzen.

2.3.5 Wenn ein Konflikt zwischen einer Invariante und einer anderen Regel entsteht, MUSS die Invariante Vorrang haben.

2.3.6 Invarianten KANN nur durch einen konstitutionellen Änderungsprozess gemäß Schicht 2 und Schicht 6 geändert oder entfernt werden.

## 2.4 Identitätseinschränkungen

2.4.1 Die Gemeinschaft MUSS alle Einschränkungen auf Identitätsebene erklären, die Teilnahme, Verhalten oder Governance wesentlich beeinflussen.

2.4.2 Identitätseinschränkungen KANN unter anderem Folgendes umfassen:
- Ethische oder verhaltensbezogene Grenzen
- Teilnahmevoraussetzungen
- Nicht verhandelbare kulturelle oder ökologische Einschränkungen

2.4.3 Identitätseinschränkungen MUSS überprüfbar und durch definierte Prozesse durchsetzbar sein.

2.4.4 Identitätseinschränkungen DARF NICHT implizit oder informell durchgesetzt werden.

## 2.5 Artefakte

2.5.1 Die folgenden Artefakte sind für die Konformität mit Schicht 0 verpflichtend:
- Zweck-Charta
- Geltungsbereichserklärung
- Invarianten-Register
- Register der Identitätseinschränkungen

2.5.2 Artefakte von Schicht 0 MUSS:
- Für alle Mitglieder öffentlich zugänglich sein
- Versioniert sein
- Durch einen formalen Ratifizierungsprozess angenommen werden

2.5.3 Wenn Artefakte von Schicht 0 fehlen, mehrdeutig oder in sich widersprüchlich sind, MUSS die Gemeinschaft als nicht konform mit RCOS-Core betrachtet werden.


---

# 3. Schicht 1 — Mitgliedschaftssystem

Schicht 1 definiert, wie Einzelpersonen der Gemeinschaft beitreten, an ihr teilnehmen und sie verlassen. Er legt die explizite Beziehung zwischen dem Individuum und dem Kollektiv fest, einschließlich Rechte, Pflichten und ordnungsgemäße Verfahren. Keine Person darf als Mitglied behandelt werden, ohne die in diesem Layer definierten Mechanismen durchlaufen zu haben.

## 3.1 Mitgliedschaftsstatus

3.1.1 Die Gemeinschaft MUSS explizite Mitgliedschaftsstatus definieren.

3.1.2 Mindestens die folgenden Mitgliedschaftsstatus MUSS existieren:
- Bewerber:in
- Probe- / Übergangsmitglied
- Vollmitglied
- Ausgetretenes Mitglied

3.1.3 Jeder Mitgliedschaftsstatus MUSS klar definierte Rechte, Pflichten und Einschränkungen haben.

3.1.4 Keine Einzelperson KANN gleichzeitig mehrere Mitgliedschaftsstatus innehaben.

3.1.5 Keine Rechte oder Pflichten KANN außerhalb des aktuellen Mitgliedschaftsstatus der Einzelperson angenommen werden.

## 3.2 Beitritt und Onboarding

3.2.1 Der Beitritt zur Gemeinschaft MUSS einem expliziten Onboarding-Prozess folgen.

3.2.2 Der Onboarding-Prozess MUSS beinhalten:
- Prüfung aller RCOS-Core-Artefakte
- Explizite Zustimmung zu den Regeln von Schicht 0 und Schicht 1
- Festlegung des anfänglichen Mitgliedschaftsstatus

3.2.3 Aufnahmekriterien MUSS explizit und dokumentiert sein.

3.2.4 Informelle, implizite oder rückwirkende Mitgliedschaft DARF NICHT gestattet werden.

## 3.3 Probezeit und Bewertung

3.3.1 Die Gemeinschaft MUSS eine Probezeit für neue Mitglieder festlegen.

3.3.2 Die Probezeit MUSS folgendes beinhalten:
- Eine festgelegte Dauer
- Explizite Bewertungskriterien
- Einen klaren Entscheidungsprozess für den Übergang

3.3.3 Während der Probezeit KANN Rechte eingeschränkt werden, aber Pflichten MUSS explizit sein.

3.3.4 Ein Scheitern des Übergangs aus der Probezeit MUSS einen definierten Austritts- oder Verlängerungsprozess auslösen.

## 3.4 Rechte und Pflichten

3.4.1 Die Gemeinschaft MUSS Mitgliedsrechte explizit definieren.

3.4.2 Die Gemeinschaft MUSS Mitgliedspflichten explizit definieren.

3.4.3 Rechte und Pflichten MUSS symmetrisch und proportional zum Mitgliedschaftsstatus sein.

3.4.4 Keine Pflicht KANN ohne ein entsprechendes, dokumentiertes Recht durchgesetzt werden.

3.4.5 Pflichten DARF NICHT unbefristet oder undefiniert sein.

## 3.5 Teilnahme und Beitrag

3.5.1 Erwartungen an die Teilnahme MUSS explizit definiert werden.

3.5.2 Akzeptable Formen des Beitrags MUSS aufgelistet werden.

3.5.3 Stellvertretende Teilnahme (z. B. Auslagerung von Arbeit) MUSS explizit geregelt sein.

3.5.4 Anhaltende Nicht-Teilnahme MUSS einen Rechenschaftsprozess auslösen, wie in Schicht 4 definiert.

## 3.6 Austritt und Trennung

3.6.1 Freiwilliger Austritt MUSS jederzeit möglich sein.

3.6.2 Austrittsverfahren MUSS explizit, dokumentiert und nicht strafend sein.

3.6.3 Erzwungener Austritt MUSS einem ordnungsgemäßen Verfahren folgen und über die Mechanismen von Schicht 4 abgewickelt werden.

3.6.4 Ein Austritt DARF NICHT zum Verlust von Rechten führen, die über die explizit an die Mitgliedschaft gebundenen hinausgehen.

3.6.5 Die Trennung von Vermögenswerten, Rollen und Verantwortlichkeiten MUSS vor dem Austritt definiert werden.

## 3.7 Suspendierung und temporärer Status

3.7.1 Die Gemeinschaft KANN temporäre Suspendierungszustände definieren.

3.7.2 Suspendierungsbedingungen MUSS explizit, zeitlich begrenzt und überprüfbar sein.

3.7.3 Suspendierung DARF NICHT als unbefristeter oder strafender Ersatz für einen Austritt verwendet werden.

## 3.8 Artefakte

3.8.1 Die folgenden Artefakte sind für die Layer-1-Konformität verpflichtend:
- Mitgliedschaftsvereinbarung
- Onboarding-Protokoll
- Austritts- und Trennungsprotokoll
- Mitgliedschaftsstatus-Register

3.8.2 Layer-1-Artefakte MUSS:
- Explizit und eindeutig sein
- Versioniert sein
- Allen Mitgliedern zugänglich sein

3.8.3 Das Fehlen, die Mehrdeutigkeit oder die systematische Verletzung von Layer-1-Artefakten MUSS zum Verlust der RCOS-Core-Konformität führen.


---

# 4. Schicht 2 — Governance & Entscheidungslogik

Schicht 2 definiert, wie kollektive Entscheidungen getroffen werden, wer befugt ist, sie zu treffen, und wie Autorität begrenzt wird. Governance unter RCOS ist so gestaltet, dass Macht explizit, begrenzt, überprüfbar und reversibel ist.

## 4.1 Entscheidungstypen

4.1.1 Alle kollektiven Entscheidungen MUSS in genau einen der folgenden Entscheidungstypen eingeordnet werden:
- Operative Entscheidungen
- Strategische Entscheidungen
- Konstitutionelle Entscheidungen

4.1.2 Operative Entscheidungen betreffen den täglichen Betrieb und die Ausführung innerhalb bestehender Regeln.

4.1.3 Strategische Entscheidungen betreffen die langfristige Ausrichtung, die Zuweisung bedeutender Ressourcen oder die Schaffung/Abschaffung wesentlicher Strukturen.

4.1.4 Konstitutionelle Entscheidungen betreffen Änderungen an den Invarianten von Schicht 0, dem Zweck, dem Geltungsbereich oder dem Governance-System selbst.

4.1.5 Wenn eine Entscheidung nicht eindeutig zugeordnet werden kann, MUSS sie standardmäßig dem Entscheidungstyp mit höherer Auswirkung zugeordnet werden.

## 4.2 Entscheidungsmechanismen

4.2.1 Für jeden Entscheidungstyp MUSS ein explizit definierter Entscheidungsmechanismus festgelegt sein.

4.2.2 Entscheidungsmechanismen KANN unter anderem folgende umfassen:
- Konsent-basierte Entscheidungsfindung
- Mehrheitsentscheid
- Qualifizierte Mehrheit
- Delegierte Autorität
- Zufällige oder rotierende Zuweisung

4.2.3 Entscheidungsmechanismen MUSS festlegen:
- Teilnahmeberechtigte Personen
- Entscheidungsschwellen
- Blockade- oder Vetobedingungen, falls vorhanden
- Zeitliche Beschränkungen

4.2.4 Kein informeller oder ad-hoc-Entscheidungsmechanismus KANN für kollektive Entscheidungen verwendet werden.

## 4.3 Autoritätsgrenzen

4.3.1 Alle Autorität MUSS explizit definierten Rollen, Kreisen oder Gremien zugewiesen werden.

4.3.2 Autoritätszuweisungen MUSS beinhalten:
- Umfang der Autorität
- Grenzen der Autorität
- Dauer oder Amtszeit, falls zutreffend

4.3.3 Keine Person oder kein Gremium KANN Autorität außerhalb des explizit zugewiesenen Bereichs ausüben.

4.3.4 Autorität DARF NICHT aus Charisma, Dienstalter, Eigentum oder informellem Einfluss abgeleitet werden.

4.3.5 Temporäre oder Notfall-Autorität MUSS explizit definiert, zeitlich begrenzt und einer Überprüfung unterzogen werden.

## 4.4 Entscheidungsmatrix

4.4.1 Die Gemeinschaft MUSS eine Entscheidungsmatrix als zentrales Governance-Artefakt pflegen.

4.4.2 Die Entscheidungsmatrix MUSS mindestens folgendes abbilden:
- Entscheidungstyp
- Entscheidungsdomäne
- Autorisierte Rolle oder Gremium
- Entscheidungsmechanismus
- Zustimmungsschwelle
- Eskalationspfad

4.4.3 Die Entscheidungsmatrix MUSS für alle Mitglieder öffentlich zugänglich sein.

4.4.4 Entscheidungen, die außerhalb der Entscheidungsmatrix getroffen werden, MUSS als ungültig betrachtet werden.

## 4.5 Governance-Protokoll

4.5.1 Die Gemeinschaft MUSS ein Governance-Protokoll definieren, das den vollständigen Lebenszyklus einer Entscheidung beschreibt.

4.5.2 Das Governance-Protokoll MUSS beinhalten:
- Anforderungen an die Einreichung von Vorschlägen
- Prüfungs- und Beratungsprozess
- Umsetzung der Entscheidung
- Dokumentation und Veröffentlichung
- Einspruchs- und Überprüfungsmechanismen

4.5.3 Das Governance-Protokoll MUSS festlegen, wie Konflikte zwischen Entscheidungen gelöst werden.

4.5.4 Alle Governance-Handlungen MUSS gemäß den Dokumentationsregeln von Schicht 5 dokumentiert werden.

## 4.6 Sicherungsmechanismen und Fehlermodi

4.6.1 Das Governance-System MUSS Sicherungsmechanismen gegen folgendes enthalten:
- Konzentration von Entscheidungsmacht
- Informelle Vetos
- Vereinnahmung von Entscheidungen durch Untergruppen
- Verfestigung von Gründer- oder Rollenpositionen

4.6.2 Governance-Mechanismen MUSS Anfechtung und Überprüfung ohne Vergeltungsmaßnahmen ermöglichen.

4.6.3 Anhaltende Governance-Versagen MUSS eine formelle Überprüfung oder einen konstitutionellen Prozess auslösen.

## 4.7 Artefakte

4.7.1 Die folgenden Artefakte sind für die Layer-2-Konformität verpflichtend:
- Entscheidungsmatrix
- Governance-Protokoll
- Autoritätsregister

4.7.2 Layer-2-Artefakte MUSS:
- Explizit und eindeutig sein
- Versioniert sein
- Für alle Mitglieder zugänglich sein

4.7.3 Das Fehlen, die Mehrdeutigkeit oder die systematische Verletzung von Layer-2-Artefakten MUSS zum Verlust der RCOS-Core-Konformität führen.


---

# 5. Schicht 3 — Wirtschafts- & Ressourcensystem

Schicht 3 definiert, wie Wert, Ressourcen und Verpflichtungen innerhalb der Gemeinschaft fließen.  
Sein Zweck ist es, wirtschaftliche Macht explizit, begrenzt, überprüfbar und der Governance untergeordnet zu machen — um versteckte Anhäufung, Abhängigkeit oder Zwang zu verhindern.

## 5.1 Gemeingüter vs. Privatressourcen

5.1.1 Alle Ressourcen innerhalb des deklarierten Governance-Geltungsbereichs MÜSSEN explizit entweder als **Gemeingüter** oder als **privat** klassifiziert werden.

5.1.2 Die Gemeinschaft MUSS ein einziges, explizites und versioniertes Register der verwalteten Ressourcen führen, das mindestens Folgendes enthält:
- Ressourcenname oder eindeutiger Bezeichner  
- Klassifikation (Gemeingut oder privat)  
- Verwalter:in oder Eigentümer:in (je nach Zutreffendem)  
- Zugangs- und Nutzungsregeln  
- Übertragungs-, Verkaufs- oder Privatisierungsbeschränkungen (falls vorhanden)

5.1.3 Jede nicht explizit klassifizierte Ressource MUSS als **unklassifiziert** behandelt werden, und die Gemeinschaft DARF sie NICHT zuweisen, belasten, monetarisieren oder übertragen, bis die Klassifizierung durch eine autorisierte Entscheidung abgeschlossen ist.

5.1.4 Für Gemeingüter MUSS die Gemeinschaft explizit Folgendes definieren:
- Verwaltungspflichten  
- Das autorisierte Entscheidungsgremium oder die zuständige Rolle  
- Instandhaltungspflichten  
- Finanzierungs- oder Beitragsmechanismen (falls vorhanden)

5.1.5 Für Privatressourcen DARF die Gemeinschaft KEINE Autorität über das hinaus ausüben, was explizit im Geltungsbereich, in Mitgliedschaftsvereinbarungen oder anderen verwalteten Artefakten deklariert ist.

## 5.2 Beitragsanerkennung

5.2.1 Die Gemeinschaft MUSS explizit definieren, welche Beitragskategorien anerkannt werden. Diese KÖNNEN unter anderem umfassen:
- Arbeit  
- Fürsorge- und emotionale Arbeit  
- Wissen und Bildung  
- Verwaltung und Instandhaltung  
- Administrative oder koordinierende Arbeit  

5.2.2 Die Gemeinschaft MUSS einen Mechanismus zur Beitragsanerkennung definieren, der festlegt:
- Was als Beitrag gilt  
- Wie Beiträge erfasst oder anerkannt werden  
- Wer Beiträge erfassen, validieren oder anfechten darf  
- Ob und wie die Beitragsanerkennung den Zugang zu Ressourcen, Privilegien oder Verpflichtungen beeinflusst  

5.2.3 Die Gemeinschaft DARF NICHT strukturell auf unbezahlte, unsichtbare oder informelle Arbeit für das Überleben des Systems angewiesen sein, ohne entsprechende Verpflichtungen, Anerkennung oder Kompensationsmechanismen explizit zu definieren.

5.2.4 Falls interne Wirtschaftseinheiten verwendet werden (z. B. Zeitguthaben, Punkte, Token), MUSS das Interne Wirtschaftsprotokoll Folgendes definieren:
- Ausgaberegeln  
- Übertragbarkeitsregeln  
- Ablauf-, Verfall- oder Obergrenzen-Mechanismen (falls vorhanden)  
- Mechanismen zur Betrugsprävention, Streitbeilegung und Korrektur  
- Datenschutz- und Transparenzregeln für Kontostände und Transaktionen  

5.2.5 Beitragsanerkennung DARF KEINE implizite Entscheidungsbefugnis, kein Vetorecht oder keinen Governance-Einfluss schaffen, der über das in Schicht 2 Definierte hinausgeht.

## 5.3 Gemeinschaftskasse

5.3.1 Die Gemeinschaft MUSS explizit definieren, welche Ressourcen in der gemeinsamen Kasse gehalten werden und wie die Grenzen der Kasse mit Privatressourcen zusammenwirken.

5.3.2 Einkommensquellen und alle externen Einkommensschnittstellen MÜSSEN explizit definiert sein.

5.3.3 Ausgabenbefugnis MUSS explizit begrenzt werden durch:
- Klare Zuständigkeitszuweisungen  
- Schwellenwerte nach Betrag und/oder Kategorie  
- Genehmigungs- und Eskalationswege  
- Verpflichtende Aufzeichnungspflichten  

5.3.4 Transparenz MUSS der Standard sein für Kassenstände, Einnahmen, Ausgaben, Verpflichtungen und Zusagen.

5.3.5 Alle Ausnahmen von der Transparenz MÜSSEN explizit definiert, begründet und zeitlich begrenzt sein und DÜRFEN Mitglieder NICHT daran hindern, die Einhaltung der Regeln zu prüfen.

5.3.6 Die Gemeinschaft MUSS Richtlinien für Rücklagen, Risiken und Haftung definieren, einschließlich:
- Verschuldungsgrenzen  
- Langfristige Verpflichtungen  
- Notfallrücklagen (falls vorhanden)

## 5.4 Akkumulationsbeschränkungen

5.4.1 Interne Wirtschaftssysteme MÜSSEN eine unbegrenzte Konzentration von internem Einfluss oder Kontrolle durch Ressourcen, Guthaben oder finanzielle Verpflichtungen verhindern.

5.4.2 Falls interne Einheiten existieren, MUSS die Gemeinschaft einen oder mehrere akkumulationsbegrenzende Mechanismen definieren, die Folgendes umfassen KÖNNEN:
- Obergrenzen  
- Verfall oder Ablauf  
- Nicht-Übertragbarkeit  
- Umverteilungs- oder Besteuerungsmechanismen  
- Zeitlich begrenzte Gültigkeit  

5.4.3 Wirtschaftsmechanismen DÜRFEN es Mitgliedern NICHT ermöglichen, die in Schicht 2 definierten Governance-Befugnisgrenzen zu umgehen — auch nicht durch den Kauf von Einfluss, das Schaffen von Abhängigkeiten oder die Umwandlung von wirtschaftlicher Macht in informelle Entscheidungsbefugnis.

5.4.4 Die Gemeinschaft MUSS überprüfbare Indikatoren für das Risiko wirtschaftlicher Konzentration definieren sowie einen expliziten Mechanismus, um Beschränkungen anzupassen, wenn solche Risiken erkannt werden.

## 5.5 Artefakte

5.5.1 Die folgenden Artefakte sind für die Konformität mit Schicht 3 verpflichtend:
- Internes Wirtschaftsprotokoll  
- Kassenregelwerk  

5.5.2 Artefakte von Schicht 3 MÜSSEN:
- Explizit und eindeutig sein  
- Versioniert sein  
- Für alle Mitglieder zugänglich sein (mit expliziten, begrenzten Ausnahmen)  
- Durch einen autorisierten Governance-Prozess verabschiedet werden  

5.5.3 Das Interne Wirtschaftsprotokoll MUSS mindestens Folgendes definieren:
- Beitragskategorien und Anerkennungsmechanismen  
- Grenzen zwischen Gemeingütern und Privatbesitz sowie Zuweisungsregeln  
- Interne Einheiten (falls vorhanden) und Akkumulationsbeschränkungen  
- Externe Einkommensschnittstellen (falls vorhanden)  
- Streitbeilegungs- und Korrekturmechanismen für wirtschaftliche Aufzeichnungen  

5.5.4 Das Kassenregelwerk MUSS mindestens Folgendes definieren:
- Einkommensquellen  
- Schwellenwerte und Genehmigungswege für Ausgabenbefugnis  
- Transparenz- und Berichtspflichten (einschließlich etwaiger begrenzter Ausnahmen)  
- Rücklagen-, Risiko- und Verschuldungsbeschränkungen  
- Interessenkonfliktregeln für Ausgaben und Beschaffung  

## 5.6 Layer-Invarianten

5.6.1 Geteilte Ressourcen, Flüsse und Verpflichtungen MÜSSEN standardmäßig für die Gemeinschaft sichtbar sein, mit nur begrenzten und expliziten Ausnahmen.

5.6.2 Als Gemeingüter deklarierte Ressourcen DÜRFEN NICHT durch informelles, implizites oder einseitiges Handeln privatisiert werden.

5.6.3 Beitragsanerkennung MUSS explizit sein, sodass unbezahlte oder unsichtbare Arbeit nicht strukturell für das Überleben des Systems erforderlich ist.

5.6.4 Wirtschaftsmechanismen MÜSSEN eine unbegrenzte Konzentration von internem Einfluss verhindern.

## 5.7 Explizitätsregeln

5.7.1 Folgendes MUSS explizit sein:
- Klassifikation als Gemeingut oder privat  
- Zuweisungs- und Zugangsregeln für geteilte Ressourcen  
- Grenzen der Ausgabenbefugnis  
- Transparenzregeln  
- Externe Einkommensschnittstellen  

5.7.2 Folgendes KANN explizit sein:
- Modelle zur Beitragsbewertung  
- Interne Einheiten (Token, Stunden, Punkte)  
- Budgetkategorien und interne Buchhaltungsstrukturen  

5.7.3 Folgendes MUSS optional und außerhalb des Geltungsbereichs bleiben:
- Einstellungen gegenüber Wohlstand  
- Gleiche vs. differenzierte Ergebnisse  
- Persönliche finanzielle Entscheidungen


---

# 6. Schicht 4 — Konflikt, Wiedergutmachung & Verantwortlichkeit

Schicht 4 definiert, wie die Gemeinschaft reagiert, wenn Vertrauen, Koordination oder Sicherheit zusammenbrechen.
Sein Zweck ist es sicherzustellen, dass Konflikte explizit, fair und sicher behandelt werden, und gleichzeitig Machtmissbrauch, Normalisierung von Schaden oder stilles Ausschließen zu verhindern.

## 6.1 Konfliktklassifikation

6.1.1 Die Gemeinschaft MUSS ein explizites Konfliktklassifikationssystem definieren, das allen Mitgliedern bekannt, zugänglich und nutzbar ist.

6.1.2 Das Klassifikationssystem MUSS mindestens die folgenden Klassen umfassen:
- Zwischenmenschliche Konflikte (zwischen Einzelpersonen)
- Rollenbasierte Konflikte (Streitigkeiten um Autorität, Verantwortung oder Mandat)
- Strukturelle Konflikte (systemische Anreize, Regeln oder Fragen der Ressourcenverteilung)
- Ethische oder Grenzverletzungen (Verstöße gegen erklärte Normen, Geltungsbereich oder Sicherheitsgrenzen)

6.1.3 Jede Konfliktklasse MUSS explizit definieren:
- Eintrittskriterien (wie eine Situation in diese Klasse eingestuft wird)
- Erwartete Reaktionspriorität und Fristen (falls vorhanden)
- Zulässige und erforderliche Lösungswege
- Dokumentationsanforderungen und Datenschutzgrenzen

6.1.4 Konflikte, die glaubhafte Sicherheitsrisiken, Zwang, Missbrauch oder Drohungen beinhalten, MUSS als **sicherheitskritisch** klassifiziert werden und MUSS erhöhte Schutzmaßnahmen auslösen, wie in Abschnitt 6.3 definiert.

6.1.5 Fehlklassifikation oder Vermeidung der Klassifikation MUSS als Prozessversagen behandelt werden, das einer Überprüfung unterliegt.

## 6.2 Lösungswege

6.2.1 Die Gemeinschaft MUSS einen Mindest-Konfliktlösungsprozess definieren, der auf alle Konfliktklassen anwendbar ist.

6.2.2 Der Lösungsprozess MUSS eine klar definierte **Eskalationsleiter** mit expliziten Eskalationsschritten umfassen.

6.2.3 Die Eskalationsleiter MUSS mindestens definieren:
- Wie ein Konflikt eingebracht, protokolliert und bestätigt wird
- Wie beteiligte Parteien benachrichtigt und zur Teilnahme eingeladen werden
- Wie Verweigerung, Nichtreaktion oder Rückzug behandelt wird
- Wie Mediator\*innen oder Moderator\*innen ausgewählt, ersetzt oder abgelehnt werden
- Zeitlich begrenzte Erwartungen für jede Phase (wo zutreffend)
- Dokumentationsanforderungen und Zugriffsregeln
- Ein Verfahren zur Überprüfung von Prozessfehlern oder Blockaden

6.2.4 Der Lösungsprozess MUSS zugänglich sein, ohne dass sozialer Status, Dienstalter, Charisma oder informelle Nähe zu Entscheidungsträger\*innen erforderlich ist.

6.2.5 Ungelöste Konflikte MUSS über definierte Governance-Wege eskaliert werden, ohne die in Schicht 2 definierte Entscheidungsmatrix zu umgehen.

## 6.3 Schutzmaßnahmen

6.3.1 Die Gemeinschaft MUSS explizite Schutzmaßnahmen für Konflikte definieren, die Machtasymmetrien, Abhängigkeitsverhältnisse oder Sicherheitsrisiken beinhalten.

6.3.2 Schutzmaßnahmen MUSS Schutz vor Vergeltung umfassen für:
- Das Vorbringen eines Anliegens
- Das Anfordern von Mediation
- Das Abgeben von Aussagen oder Beweisen
- Die Teilnahme an einer Überprüfung oder Berufung

6.3.3 Wenn ein Machtgefälle zwischen den Parteien besteht, MUSS erhöhte Schutzmaßnahmen angewendet werden, die KANN umfassen:
- Unabhängige oder externe Moderation
- Getrennte Aufnahme-, Dokumentations- oder Kommunikationskanäle
- Vorübergehende Aussetzung oder Einschränkung der Rollenbefugnisse
- Zusätzliche Beweis- und Überprüfungsschwellen vor Sanktionen

6.3.4 Bei sicherheitskritischen Konflikten MUSS die Gemeinschaft sofortige Schutzmaßnahmen definieren, die vor Abschluss des vollständigen Verfahrens ergriffen werden können, die KANN umfassen:
- Vorübergehende Trennungsmaßnahmen
- Eingeschränkter Zugang zu gemeinsamen Räumen oder Ressourcen
- Vorübergehende Rollensuspendierung
- Notfall-Eskalationsfristen

6.3.5 Sicherheitsmaßnahmen MUSS Teilnahmerechte, Rollenkontinuität und betriebliche Zweckmäßigkeit übersteuern.

## 6.4 Sanktionen, Wiedergutmachung und Trennung

6.4.1 Die Gemeinschaft MUSS ein explizites Sanktions- und Wiedergutmachungsrahmenwerk definieren.

6.4.2 Sanktionen und Wiedergutmachungsmaßnahmen MUSS:
- Verhältnismäßig zum Verstoß sein
- Explizit dokumentiert sein
- Zeitlich begrenzt sein, wo zutreffend
- Überprüfbar und anfechtbar sein

6.4.3 Das Rahmenwerk MUSS mindestens definieren:
- Verfügbare Sanktions- und Wiedergutmachungsarten
- Voraussetzungen und Beweisstandards
- Autorisierte Rollen oder Gremien für die Anwendung
- Überprüfungs- und Berufungsmechanismen
- Bedingungen für die Wiederherstellung von Rechten, Rollen oder Teilnahme

6.4.4 Trennungs-, Suspendierungs- oder Ausschlussmaßnahmen MUSS einem ordnungsgemäßen Verfahren folgen und MUSS mit den in Schicht 1 definierten Austritts- und Trennungsregeln übereinstimmen.

6.4.5 Sanktionen DARF NICHT durch informellen Ausschluss, sozialen Druck, Schweigen oder stillschweigende Entziehung von Rechten verhängt werden.

6.4.6 Wiedergutmachungsorientierte Maßnahmen MUSS gegenüber strafenden Maßnahmen priorisiert werden, außer in sicherheitskritischen Fällen.

## 6.5 Artefakte

6.5.1 Die folgenden Artefakte sind für die Layer-4-Konformität verpflichtend:
- Konfliktlösungsleiter
- Verantwortlichkeitsprotokoll

6.5.2 Layer-4-Artefakte MUSS:
- Explizit und eindeutig sein
- Versioniert sein
- Allen Mitgliedern zugänglich sein, mit klar begrenztem Datenschutz
- Durch einen autorisierten Governance-Prozess verabschiedet sein

6.5.3 Die Konfliktlösungsleiter MUSS mindestens definieren:
- Konfliktklassifikations-Eingaben und Eskalationsschwellen
- Lösungsphasen und Regeln zur Auswahl von Moderator\*innen
- Dokumentations- und Informationszugangsgrenzen
- Sicherheitskritische Ausnahmen und sofortige Schutzmaßnahmen

6.5.4 Das Verantwortlichkeitsprotokoll MUSS mindestens definieren:
- Untersuchungs-, Überprüfungs- und Entscheidungsmechanismen
- Garantien für ordnungsgemäße Verfahren und Schutz vor Vergeltung
- Sanktions- und Wiedergutmachungsoptionen mit Verhältnismäßigkeitsregeln
- Berufungs-, Aufsichts- und Eskalationswege
- Koordination mit den Austritts- und Trennungsprozessen von Schicht 1

## 6.6 Layer-Invarianten

6.6.1 Konflikte MUSS als behandelte Bedingung mit definierten Wegen betrachtet werden; das Ignorieren, Unterdrücken oder Normalisieren ungelöster Konflikte MUSS als Systemverstoß gelten.

6.6.2 Konflikte mit Machtasymmetrien MUSS erhöhte Schutzmaßnahmen auslösen.

6.6.3 Wiedergutmachung und Wiederherstellung MUSS vor Bestrafung stehen, außer wenn unmittelbare Sicherheit gefährdet ist.

6.6.4 Physische, psychische und Kindersicherheit MUSS Teilnahmerechte, Rollenkontinuität und Reputationsbelange übersteuern.

## 6.7 Explizitheitsregeln

6.7.1 Folgendes MUSS explizit sein:
- Konfliktklassifikationssystem
- Mindest-Lösungs- und Eskalationsprozess
- Schutzmaßnahmen und Vergeltungsschutz
- Sanktions-, Wiedergutmachungs- und Trennungsschwellen

6.7.2 Folgendes KANN explizit sein:
- Mediationsstile oder -methoden
- Präferenzen bei der Auswahl von Moderator\*innen über die Mindestschutzmaßnahmen hinaus
- Restaurative oder reparative Praktiken

6.7.3 Folgendes MUSS optional und außerhalb des Geltungsbereichs bleiben:
- Normen für emotionalen Ausdruck
- Therapeutische, spirituelle oder ideologische Rahmung von Konflikten


---

# 7. Schicht 5 — Betrieb & Koordination

Schicht 5 definiert, wie tägliche Arbeit, Koordination und Informationsfluss in der Praxis funktionieren.  
Sein Zweck ist sicherzustellen, dass der Betrieb nachvollziehbar, nachhaltig und übertragbar bleibt und nicht in informelle Hierarchie, Abhängigkeit oder Burnout abgleitet.

## 7.1 Rollen und Verantwortlichkeiten

7.1.1 Alle laufenden Verantwortlichkeiten MUSS expliziten, benannten Rollen zugewiesen werden — nicht impliziten Erwartungen oder informellen Absprachen.

7.1.2 Die Gemeinschaft MUSS ein **Rollenregister** führen, das mindestens Folgendes enthält:
- Rollenname und Zweck  
- Umfang der Verantwortung und Entscheidungsbefugnis  
- Explizite Abgrenzungen und Schnittstellen zu anderen Rollen, Kreisen oder Bereichen  
- Eignungskriterien (falls vorhanden)  
- Amtszeit, Rotation oder Überprüfungsbedingungen (falls vorhanden)  
- Ernennungs-, Überprüfungs- und Abberufungsverfahren  

7.1.3 Jede Rolle MUSS einen expliziten Rechenschaftsmechanismus beinhalten, der Folgendes definiert:
- Wie die Rollenerfüllung überprüft wird  
- Wie mit mangelhafter Leistung, Überlastung oder Rollenversagen umgegangen wird  
- Wie Übergabe und Wissenstransfer erfolgen  

7.1.4 Keine laufende Verantwortlichkeit KANN ohne eine explizite Rolle bestehen, und keine Person KANN für Verantwortlichkeiten zur Rechenschaft gezogen werden, die nicht formal einer Rolle zugewiesen sind.

7.1.5 Temporäre oder Ad-hoc-Verantwortlichkeiten MUSS explizit zeitlich begrenzt sein und DARF NICHT ohne formale Rollendefinition dauerhaft werden.

## 7.2 Sitzungssystem

7.2.1 Die Gemeinschaft MUSS explizite Sitzungstypen definieren, die ausreichen, um Folgendes zu unterstützen:
- Betrieb  
- Governance  
- Koordination und Abstimmung  
- Reflexion und Lernen  
- Konfliktbearbeitung (wie von Schicht 4 gefordert)

7.2.2 Jeder Sitzungstyp MUSS mindestens Folgendes definieren:
- Zweck und Entscheidungsumfang  
- Erforderliche vs. optionale Teilnehmende  
- Kadenz und zeitliche Begrenzungen  
- Moderationsrolle und Auswahl- oder Rotationsverfahren  
- Tagesordnungsstruktur  
- Dokumentations- und Veröffentlichungsanforderungen  
- Anforderungen an die Entscheidungserfassung, wo Entscheidungen getroffen werden  

7.2.3 Sitzungen DARF NICHT ihren erklärten Entscheidungsumfang überschreiten oder die in Schicht 2 definierten Autoritätsgrenzen umgehen.

7.2.4 Die Sitzungsbelastung MUSS begrenzt, überwacht und überprüfbar sein, wie in Abschnitt 7.4 definiert.

## 7.3 Dokumentation und Informationsfluss

7.3.1 Die Gemeinschaft MUSS explizite Dokumentationsregeln für Entscheidungen, Rollen, Betriebsabläufe und gemeinsame Pflichten definieren.

7.3.2 Dokumentationsregeln MUSS mindestens Folgendes festlegen:
- Welche Informationen aufgezeichnet werden MUSS  
- Wo Aufzeichnungen gespeichert werden  
- Wer Zugang zu welchen Aufzeichnungen hat  
- Veröffentlichungs- oder Benachrichtigungsfristen (falls vorhanden)  
- Datenschutzgrenzen und Bedingungen für eingeschränkten Zugang  

7.3.3 Alle Entscheidungen MUSS rückverfolgbar sein auf:
- Entscheidungstyp und Bereich  
- Autorisierte Rolle oder Gremium  
- Entscheidungsmechanismus und Schwellenwert  
- Erfasstes Ergebnis und Inkrafttreten  

7.3.4 Kritische Betriebsprozesse MUSS so dokumentiert sein, dass die Kontinuität nicht von implizitem Wissen einzelner Personen abhängt.

7.3.5 Der Informationsfluss MUSS so gestaltet sein, dass Gatekeeping, Engpässe oder Abhängigkeit von informellen Vermittlern verhindert werden.

## 7.4 Arbeitsbelastung und Kapazitätsgrenzen

7.4.1 Zeit, Aufmerksamkeit, Koordinationskapazität und emotionale Arbeit MUSS als endliche und begrenzte Ressourcen behandelt werden.

7.4.2 Die Gemeinschaft MUSS explizite Belastungsgrenzen definieren, darunter:
- Begrenzungen der Sitzungsbelastung (Häufigkeit, Dauer oder Gesamtzeit)  
- Begrenzungen der Rollenbelastung (Anzahl der Rollen, Umfang oder erwartete Stunden)  
- Erwartungen an Reaktionszeiten und Verfügbarkeit (falls vorhanden)  
- Mechanismen für Neuverhandlung, Entlastung, Vertretung oder Umverteilung  

7.4.3 Belastungsgrenzen MUSS durch einen autorisierten Governance-Prozess überprüfbar und anpassbar sein.

7.4.4 Anhaltende Überlastung, Burnout-Risiko, chronische Nicht-Teilnahme oder Abhängigkeit von übermäßig engagierten Einzelpersonen MUSS Überprüfungs- oder Reparaturprozesse auslösen, wie in Schicht 4 definiert.

## 7.5 Betriebskontinuität

7.5.1 Die Gemeinschaft MUSS sicherstellen, dass keine einzelne Person ein kritischer Single Point of Failure für den Kernbetrieb ist.

7.5.2 Zentrale Betriebsrollen und -prozesse MUSS Folgendes beinhalten:
- Dokumentierte Verfahren  
- Klare Übergabemechanismen  
- Backup- oder Redundanzregelungen, wo machbar  

7.5.3 Die Planung der Betriebskontinuität MUSS regelmäßig überprüft werden.

## 7.6 Artefakte

7.6.1 Die folgenden Artefakte sind für die Konformität mit Schicht 5 verpflichtend:
- Betriebshandbuch  
- Rollenregister  
- Sitzungsvorlagen  

7.6.2 Artefakte von Schicht 5 MUSS:
- Explizit und eindeutig sein  
- Versioniert sein  
- Für alle Mitglieder zugänglich sein, mit klar begrenztem Datenschutz  
- Als lebende Dokumente mit definierter Zuständigkeit und Überprüfungszyklen gepflegt werden  

7.6.3 Das Betriebshandbuch MUSS mindestens Folgendes definieren:
- Zentrale Betriebsprozesse, auf die sich die Gemeinschaft stützt  
- Schnittstellen zwischen Rollen, Bereichen und Sitzungstypen  
- Dokumentationsstandorte und Aktualisierungsverfahren  

7.6.4 Sitzungsvorlagen MUSS mindestens Folgendes definieren:
- Tagesordnungsstruktur  
- Protokoll- und Aufzeichnungsformat  
- Entscheidungserfassungsformat, wo zutreffend  

## 7.7 Layer-Invarianten

7.7.1 Laufende Verantwortlichkeiten DARF NICHT ohne eine explizite Rolle bestehen.

7.7.2 Kritische Betriebsprozesse DARF NICHT ausschließlich auf individuellem Gedächtnis, gutem Willen oder informeller Weitergabe beruhen.

7.7.3 Sitzungsbelastung, Koordinationsaufwand und unbezahlte oder unsichtbare Arbeit MUSS begrenzt und überprüfbar sein.

7.7.4 Regeln für den Informationszugang MUSS explizit und durchsetzbar sein.

## 7.8 Explizierungsregeln

7.8.1 Folgendes MUSS explizit sein:
- Rollen und Verantwortlichkeiten  
- Betriebliche Autoritätsgrenzen und Schnittstellen  
- Sitzungstypen und -umfänge  
- Regeln zur Entscheidungsdokumentation  
- Informationszugang und Datenschutzgrenzen  

7.8.2 Folgendes KANN explizit sein:
- Detaillierte Sitzungskadenz über die Mindestanforderungen hinaus  
- Tooling-Entscheidungen für Dokumentation und Koordination  
- Rotations- oder Nachfolgepläne für Rollen  

7.8.3 Folgendes MUSS optional und außerhalb des Geltungsbereichs bleiben:
- Persönliche Arbeitsstile  
- Ästhetische oder kulturelle Präferenzen  
- Informelle soziale Koordination


---

# 8. Schicht 6 — Evolution & Anpassung

Schicht 6 definiert, wie sich das System weiterentwickelt, ohne zu kollabieren.  
Sein Zweck ist sicherzustellen, dass Veränderung bewusst, eingegrenzt, wo angemessen reversibel ist und Erkenntnisse statt versteckter Schäden hervorbringt. Evolution unter RCOS wird als gesteuerter Prozess behandelt, nicht als Improvisation.

## 8.1 Änderungsmechanismen

8.1.1 Die Gemeinschaft MUSS explizite Änderungsmechanismen für das Modifizieren, Hinzufügen, Aussetzen oder Entfernen von Regeln, Rollen, Artefakten oder Entscheidungsstrukturen definieren.

8.1.2 Änderungsmechanismen MUSS explizit unterscheiden zwischen:
- Dauerhaften Regeländerungen  
- Zeitlich begrenzten Experimenten gemäß Abschnitt 8.3  

8.1.3 Jede vorgeschlagene Änderung MUSS mindestens folgendes angeben:
- Die betroffenen Artefakte, Layer und Abschnitte  
- Den Entscheidungstyp und den autorisierten Entscheidungspfad gemäß Schicht 2  
- Die beabsichtigte Wirkung, den Geltungsbereich und bekannte Risiken  
- Das Inkrafttretungsdatum und etwaige Übergangsfristen  
- Migrationsanforderungen für bestehende Rollen, Vereinbarungen oder Aufzeichnungen  

8.1.4 Änderungen, die den Zweck, den Geltungsbereich, die Invarianten oder die Identitätsbeschränkungen von Schicht 0 betreffen, MUSS als konstitutionelle Änderungen klassifiziert werden und MUSS dem konstitutionellen Entscheidungsmechanismus folgen.

8.1.5 Die Gemeinschaft MUSS explizite Überprüfungsmechanismen für angenommene Änderungen definieren, einschließlich wie Änderungen bewertet, überarbeitet oder rückgängig gemacht werden, wenn sie Schaden, Instabilität oder unbeabsichtigte Machtkonzentration verursachen.

## 8.2 Versionierung und Autorität

8.2.1 Alle angenommenen Änderungen MUSS versioniert und nachvollziehbar sein.

8.2.2 Die Gemeinschaft MUSS eine **Versionshistorie** führen, die mindestens folgendes dokumentiert:
- Versionskennung  
- Annahmedatum und Inkrafttretungsdatum  
- Referenz zum Entscheidungsprotokoll (Autorität, Mechanismus, Schwellenwert)  
- Zusammenfassung der Änderungen  
- Migrationshinweise und Kompatibilitätsbeschränkungen (falls vorhanden)  

8.2.3 Zu jedem Zeitpunkt MUSS die Gemeinschaft eindeutig feststellen können:
- Welche Version derzeit in Kraft ist  
- Welche Artefakte für die Konformität maßgeblich sind  

8.2.4 Abgelöste Regeln MUSS zusammen mit den Zeiträumen, in denen sie galten, für Prüfbarkeit, Lernen und Streitbeilegung zugänglich bleiben.

8.2.5 Keine informellen, undokumentierten oder „stillschweigend verstandenen" Regeländerungen KANN als gültig betrachtet werden.

## 8.3 Experimente

8.3.1 Die Gemeinschaft KANN Experimente als ausdrücklich zeitlich begrenzte und reversible Abweichungen, Erweiterungen oder Pilotprojekte zum Zweck des Lernens einführen.

8.3.2 Jedes Experiment MUSS mindestens folgendes definieren:
- Geltungsbereich (was geändert wird und was ausdrücklich nicht geändert wird)  
- Dauer und Überprüfungszeitpunkte  
- Erfolgs- und Misserfolgskriterien  
- Rollback-Bedingungen und Rollback-Prozess  
- Autorisierter Entscheidungspfad für das Starten, Verlängern, Ändern oder Beenden des Experiments  

8.3.3 Experimente DARF NICHT die Invarianten von Schicht 0 außer Kraft setzen und DARF NICHT die in Schicht 2 definierten Governance-Beschränkungen umgehen.

8.3.4 Experimente MUSS in allen betroffenen Artefakten ausdrücklich als experimentell gekennzeichnet sein und MUSS ein nicht verlängerbares Ablaufdatum enthalten, sofern sie nicht durch eine autorisierte Entscheidung erneuert werden.

8.3.5 Wenn ein Experiment Sicherheitsrisiken, Zwang oder anhaltenden Schaden verursacht, MUSS die Gemeinschaft das Experiment unverzüglich durch eine Schutzmaßnahme aussetzen oder beenden, gefolgt von einer nachträglichen Überprüfung.

## 8.4 Lernen und Feedback-Erfassung

8.4.1 Größere Fehlschläge, Anpassungen, Rücknahmen und systemische Erkenntnisse MUSS dokumentiert werden.

8.4.2 Die Lernerfassung MUSS mindestens folgendes beinhalten:
- Was geschah und warum es relevant war  
- Welche Layer, Regeln oder Artefakte betroffen waren  
- Was geändert, versucht oder gestoppt wurde  
- Welche Signale, Nachweise oder Schwellenwerte eine Handlung ausgelöst haben  

8.4.3 Lernaufzeichnungen MUSS gemäß den Informationszugangsregeln von Schicht 5 zugänglich sein.

8.4.4 Wiederkehrende Fehlermuster MUSS eine strukturelle Überprüfung auslösen, keine individuelle Schuldzuweisung.

## 8.5 Änderungssicherheit und Reversibilität

8.5.1 Das System MUSS wo möglich reversible Änderungen gegenüber irreversiblen bevorzugen.

8.5.2 Irreversible oder folgenschwere Änderungen MUSS beinhalten:
- Verlängerte Beratungs- oder Überprüfungszeiträume  
- Höhere Entscheidungsschwellen, wo angemessen  
- Ausdrückliche Risikoanerkennung  

8.5.3 Notfalländerungen KANN nur dort zulässig sein, wo sie ausdrücklich definiert sind, MUSS zeitlich begrenzt sein, DARF NICHT die Invarianten von Schicht 0 außer Kraft setzen und MUSS einer verpflichtenden nachträglichen Überprüfung und Ratifizierung oder Rücknahme unterzogen werden.

## 8.6 Artefakte

8.6.1 Die folgenden Artefakte sind für die Konformität mit Schicht 6 verpflichtend:
- Änderungsprotokoll  
- Versionshistorie  
- Lernprotokoll  

8.6.2 Artefakte von Schicht 6 MUSS:
- Explizit und eindeutig sein  
- Versioniert sein  
- Für alle Mitglieder zugänglich sein, mit klar abgegrenztem Datenschutz  
- Durch einen autorisierten Governance-Prozess angenommen sein  

8.6.3 Das Änderungsprotokoll MUSS mindestens folgendes definieren:
- Wie Änderungen vorgeschlagen, überprüft, angenommen, veröffentlicht und abgelehnt werden  
- Wie Vorschläge nach Entscheidungstyp klassifiziert werden  
- Erforderliche Inhalte von Änderungsvorschlägen  
- Übergangs-, Migrations- und Abkündigungserwartungen  
- Überprüfungs-, Überarbeitungs- und Rollback-Mechanismen  
- Notfalländerungsbestimmungen, einschließlich strikter Zeitbegrenzung und verpflichtender Überprüfung  

8.6.4 Die Versionshistorie MUSS definieren:
- Die maßgebliche Struktur für Versionskennungen und Änderungsprotokolle  
- Wie abgelöste Versionen aufbewahrt und abgerufen werden  
- Wie die derzeit aktive Version bestimmt wird  

8.6.5 Das Lernprotokoll MUSS definieren:
- Was ein lernrelevantes Ereignis darstellt  
- Dokumentationsformat und Zuständigkeit  
- Überprüfungs- und Synthese-Rhythmus  

## 8.7 Layer-Invarianten

8.7.1 Veränderung MUSS möglich, aber eingegrenzt sein; keine Änderung KANN augenblicklich, implizit oder unüberprüfbar sein.

8.7.2 Alle angenommenen Änderungen MUSS versioniert, dokumentiert und nachvollziehbar sein.

8.7.3 Experimente MUSS zeitlich begrenzt, ausdrücklich gekennzeichnet und reversibel sein.

8.7.4 Größere Fehlschläge und Anpassungen MUSS als gemeinsames Lernen festgehalten werden, nicht ausradiert oder versteckt.

## 8.8 Explizitätsregeln

8.8.1 Folgendes MUSS explizit sein:
- Wie sich Regeln ändern und wer entscheidet  
- Versionierung, Autorität und Überprüfungsprozesse  
- Geltungsbereich, Dauer und Rollback-Bedingungen von Experimenten  
- Bedingungen und Grenzen für Notfalländerungen  

8.8.2 Folgendes KANN explizit sein:
- Überprüfungshäufigkeit und -rhythmus  
- Auslaufklauseln  
- Feedback- und Wahrnehmungsmethoden  

8.8.3 Folgendes MUSS optional und außerhalb des Geltungsbereichs bleiben:
- Innovationsgeschwindigkeit  
- Kulturelle Haltungen gegenüber Risiko innerhalb definierter Grenzen


---

# 9. Nicht-normative Abschnitte

Die Abschnitte in diesem Kapitel sind **informativ**, nicht normativ.
Sie definieren keine Compliance-Anforderungen, sondern bieten Orientierung, Kontext, Beispiele und Lernunterstützung für Gemeinschaften, Umsetzer, Prüfer und Standard-Hüter.

Nichts in diesem Abschnitt darf Anforderungen, die in den Schichten 0–6 definiert sind, außer Kraft setzen oder abschwächen.

## 9.1 Optionale Module

9.1.1 Optionale Module sind domänenspezifische Erweiterungen, die auf RCOS-Core aufbauen, ohne dessen verpflichtende Schichten zu verändern.

9.1.2 Optionale Module MUSS:
- Deklarieren, welche RCOS-Schichten sie erweitern oder von welchen sie abhängen
- Ausdrücklich angeben, welche zusätzlichen Rollen, Regeln oder Artefakte sie einführen
- Invarianten der Schicht 0 oder RCOS-Core-Anforderungen NOT überschreiben oder ihnen widersprechen

9.1.3 Optionale Module KANN definieren:
- Domänenspezifische Praktiken
- Zusätzliche Einschränkungen oder Standards
- Spezialisierte Governance- oder Betriebsmuster

9.1.4 Typische Domänen optionaler Module KANN umfassen, sind aber nicht beschränkt auf:
- Permakultur und regenerative Landschaftspflege
- Alternative oder gemeinschaftsbasierte Bildungssysteme
- Gesundheits-, Pflege- und Wohlbefindenspraktiken
- Kulturelle oder spirituelle Praktiken
- Wirtschaftliche Spezialisierungen (z. B. Genossenschaften, Land Trusts, Gegenseitigkeitskredit)

9.1.5 Die Einführung optionaler Module MUSS den in Schicht 6 definierten Änderungsmechanismen folgen.

9.1.6 Eine Gemeinschaft KANN RCOS-Core-konform sein, ohne optionale Module zu übernehmen.

## 9.2 Referenzimplementierungen

9.2.1 Eine Referenzimplementierung ist eine reale Gemeinschaft, die öffentlich dokumentiert, wie sie RCOS-Core anwendet.

9.2.2 Referenzimplementierungen sind **deskriptiv**, nicht präskriptiv.
Sie veranschaulichen, wie RCOS umgesetzt werden kann, nicht wie es umgesetzt werden muss.

9.2.3 Eine Gemeinschaft KANN sich nur dann als RCOS-Referenzimplementierung bezeichnen, wenn sie:
- RCOS-Core-konform ist
- Ihre Artefakte der Schichten 0–6 öffentlich dokumentiert
- Abweichungen, Experimente oder Erweiterungen klar kennzeichnet

9.2.4 Die Dokumentation von Referenzimplementierungen SOLLTE umfassen:
- Kontext und Umfang (Größe, Standort, Zweck)
- Welche optionalen Module übernommen wurden
- Bekannte Herausforderungen und Fehlschläge
- Entwicklungsgeschichte und wesentliche Anpassungen

9.2.5 Referenzimplementierungen DARF NICHT als autoritative Auslegungen des Standards behandelt werden.

## 9.3 Bekannte Fehlermuster

9.3.1 Bekannte Fehlermuster dokumentieren wiederkehrende Zusammenbruchsmuster, die in realen Gemeinschaften beobachtet wurden.

9.3.2 Fehlermuster sind **informative Signale**, keine Compliance-Kriterien.

9.3.3 Fehlermuster KANN umfassen, sind aber nicht beschränkt auf:
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

9.3.5 Die Dokumentation von Fehlermustern SOLLTE darauf verweisen, welche RCOS-Schichten dazu gedacht sind, das jeweilige Muster abzumildern.


---

# 10. Compliance & Auditing

Dieses Kapitel definiert, wie RCOS-Core-Compliance bewertet und aufrechterhalten wird.

## 10.1 Compliance-Checkliste

10.1.1 RCOS-Core-Compliance ist binär: Eine Gemeinschaft ist entweder compliant oder non-compliant.

10.1.2 Compliance MUSS pro Layer (Schicht 0–6) bewertet werden.

10.1.3 Für jeden Layer MUSS die Compliance-Checkliste überprüfen:
- Vorhandensein verbindlicher Artefakte  
- Explizitheit und Zugänglichkeit der erforderlichen Regeln  
- Verabschiedung durch autorisierte Governance-Prozesse  

10.1.4 Teilweise Compliance oder „Absicht zur Compliance" DARF NICHT als compliant betrachtet werden.

10.1.5 Optionale Module DARF NICHT in die RCOS-Core-Compliance-Bewertung einbezogen werden.

## 10.2 Testfälle

10.2.1 Testfälle sind strukturierte Szenarien, mit denen überprüft wird, ob RCOS-Mechanismen wie beabsichtigt funktionieren.

10.2.2 Testfälle KANN sein:
- Hypothetische Szenarien  
- Historische Gemeinschafts-Fehlschläge  
- Simulierte Stresstests  

10.2.3 Testfälle SOLLTE mindestens abdecken:
- Versuche der Machtkonzentration  
- Austritts- und Trennungsszenarien  
- Governance-Deadlock  
- Versuche wirtschaftlicher Vereinnahmung  
- Sicherheitskritische Konflikte  

10.2.4 Testfälle sind informativ, SOLLTE aber bei Audits, Onboarding und regelmäßigen Überprüfungen eingesetzt werden.

## 10.3 Non-Compliance

10.3.1 Eine Gemeinschaft MUSS als non-compliant betrachtet werden, wenn:
- Ein verbindliches Artefakt fehlt  
- Layer-0-Invarianten verletzt werden  
- Entscheidungen wiederholt außerhalb autorisierter Governance-Strukturen getroffen werden  
- Der Austritt blockiert oder informell eingeschränkt wird  

10.3.2 Non-Compliance MUSS nach Feststellung ausdrücklich anerkannt werden.

10.3.3 Eine Gemeinschaft KANN Compliance nur wiedererlangen durch:
- Korrekturmaßnahmen  
- Formale Verabschiedung fehlender oder korrigierter Artefakte  
- Dokumentation der Behebung  

10.3.4 Ansprüche auf RCOS-Compliance MUSS während Zeiträumen bekannter Non-Compliance zurückgezogen werden.


---

# 11. Versionierung & Governance des Standards

Dieses Kapitel definiert, wie sich RCOS selbst als Standard weiterentwickelt.

## 11.1 Standardverwaltung

11.1.1 RCOS MUSS über eine identifizierbare verwaltende Stelle oder einen verwaltenden Prozess verfügen.

11.1.2 Die Verantwortlichkeiten der Verwaltung MUSS umfassen:
- Pflege der kanonischen Spezifikation  
- Verwaltung von Versionsfreigaben  
- Kuratierung von Referenzmaterialien und Lernressourcen  
- Schutz der Layer-0-Invarianten des Standards selbst  

11.1.3 Die Verwaltung DARF NICHT als Durchsetzungsinstanz gegenüber Gemeinschaften agieren.

11.1.4 Die RCOS-Verwaltung MUSS Klarheit, Stabilität und Erkenntnisse aus der Praxis über ideologische Reinheit stellen.

## 11.2 Änderungsprozess

11.2.1 Änderungen an RCOS-Core MUSS einem definierten Änderungsprozess folgen.

11.2.2 Der Änderungsprozess MUSS umfassen:
- Einreichung von Vorschlägen  
- Öffentliche Prüfungs- und Feedbackphase  
- Entscheidungsmechanismus und -befugnis  
- Versionierung und Veröffentlichung  

11.2.3 Abwärtskompatibilität SOLLTE nach Möglichkeit gewahrt werden.

11.2.4 Nicht abwärtskompatible Änderungen MUSS klar gekennzeichnet und begründet werden.

11.2.5 Abgelöste Versionen von RCOS MUSS öffentlich zugänglich bleiben.

11.2.6 RCOS selbst MUSS dieselben Prinzipien vorleben, die es von Gemeinschaften verlangt: Explizitheit, begrenzte Befugnisse, Umkehrbarkeit und Lernbereitschaft.


---

# Anhang A — Glossar

Dieses Glossar bietet **informative Definitionen** für Schlüsselbegriffe, die in der gesamten RCOS-Spezifikation verwendet werden.  
Glossareinträge führen keine neuen Anforderungen ein und ersetzen keine normativen Abschnitte.

**Rechenschaftspflicht**  
Die Erwartung, dass Rollen und Mitglieder aufgefordert werden können, Handlungen, Ergebnisse und die Einhaltung vereinbarter Regeln zu erklären, mit definierten Überprüfungs- und Korrekturmechanismen.

**Rechenschaftsprotokoll**  
Ein Artefakt, das festlegt, wie Verstöße, Schäden oder wiederholte Fehler überprüft, dokumentiert und behandelt werden, einschließlich ordentlichem Verfahren, Schutzmaßnahmen und Eskalationspfaden.

**Artefakt**  
Ein dokumentiertes, versioniertes Objekt (z. B. Protokoll, Register, Satzung), das durch einen autorisierten Prozess beschlossen und zur Operationalisierung von RCOS-Schichten verwendet wird.

**Kompetenzgrenze**  
Die expliziten Grenzen, innerhalb derer eine Rolle, ein Kreis oder ein Gremium Entscheidungen treffen oder handeln darf.

**Änderungsprotokoll**  
Ein Artefakt, das festlegt, wie Änderungen vorgeschlagen, überprüft, beschlossen, veröffentlicht und zurückgerollt werden, einschließlich der Klassifizierung von Entscheidungstypen und Notfallregelungen.

**Gemeingüter**  
Ressourcen, die kollektiv unter expliziten Verwaltungs-, Zugangs- und Entscheidungsregeln geführt werden.

**Gemeinschaft**  
Eine Gruppe von Menschen, die sich freiwillig um einen gemeinsamen Zweck innerhalb eines definierten Geltungsbereichs und Governance-Systems koordinieren.

**Konformität**  
Der Zustand, alle Pflichtanforderungen von RCOS-Core über die Schichten 0–6 zu erfüllen.

**Konfliktlösungsleiter**  
Ein abgestufter Konfliktprozess, der Mindestlösungsschritte und Eskalationsschwellen definiert, von schwach ausgeprägter Wiedergutmachung bis zur Governance-Überprüfung und, falls nötig, Trennung.

**Konstitutionelle Entscheidung**  
Eine Entscheidung, die den Zweck, den Geltungsbereich, die Invarianten oder Identitätsbeschränkungen von Schicht 0 oder das Governance-System selbst verändert.

**Entscheidungsmatrix**  
Ein Governance-Artefakt, das Entscheidungstypen und -domänen autorisierten Rollen, Mechanismen, Schwellenwerten und Eskalationspfaden zuordnet.

**Entscheidungstyp**  
Eine Klassifizierung von Entscheidungen (Operativ, Strategisch, Konstitutionell), die zur Bestimmung von Zuständigkeit und Prozess verwendet wird.

**Ordentliches Verfahren**  
Die Mindestgarantien für Fairness, die erforderlich sind, bevor Rechte eingeschränkt, Sanktionen verhängt oder eine Trennung ausgelöst wird, einschließlich Benachrichtigung, Überprüfung und Rechtsmittelpfaden wie definiert.

**Notfalländerung**  
Eine zeitlich begrenzte Änderung, die unter explizit definierten Notfallbedingungen umgesetzt wird und eine nachträgliche Überprüfung und Ratifizierung oder Rücknahme erfordert.

**Explizit**  
Schriftlich festgelegt, beschlossen, zugänglich und überprüfbar.  
Alles, was nicht explizit ist, gilt unter RCOS als nicht existent.

**Explizitheitsprinzip**  
Das Prinzip, dass Mechanismen zur Zuweisung von Macht, Risiko, Verantwortung oder Austrittsbedingungen schriftlich festgelegt, beschlossen und überprüfbar sein müssen.

**Experiment**  
Eine zeitlich begrenzte, reversible Änderung, die zu Lern- und Auswertungszwecken beschlossen wird.

**Austritts- und Trennungsprotokoll**  
Ein Artefakt, das freiwilligen Austritt, ordentliches Verfahren bei erzwungenem Austritt sowie die Trennung von Ressourcen, Rollen, Zugängen und Verpflichtungen definiert.

**Governance-Protokoll**  
Ein Artefakt, das den Entscheidungslebenszyklus (Vorschlag, Beratung, Beschluss, Dokumentation, Überprüfung) und die Lösung von Governance-Konflikten definiert.

**Im Geltungsbereich / Außerhalb des Geltungsbereichs**  
Im Geltungsbereich bezeichnet Personen, Ressourcen, Domänen und Aktivitäten, die explizit von der Gemeinschaft geregelt werden. Außerhalb des Geltungsbereichs bezeichnet alles, was explizit ausgeschlossen oder nicht im Geltungsbereich deklariert wurde.

**Protokoll zur internen Wirtschaft**  
Ein Artefakt, das die Anerkennung von Beiträgen und etwaige interne Austauschmechanismen definiert, einschließlich Akkumulationsbeschränkungen und Streitkorrektur.

**Invariante**  
Eine nicht verhandelbare Bedingung, die nicht außer Kraft gesetzt werden kann, solange sie gilt.

**Schicht**  
Ein funktionaler Bereich von RCOS, der einen bestimmten Aspekt des Gemeinschaftsbetriebs definiert.

**Lernprotokoll**  
Ein Artefakt, das wesentliche Fehler, Anpassungen, Rücknahmen und gewonnene Erkenntnisse festhält, einschließlich Auslöser, betroffener Artefakte und Ergebnisse.

**Mitglied**  
Eine Person, die explizit durch den definierten Mitgliedschaftsprozess in die Gemeinschaft eingetreten ist.

**Optionales Modul**  
Eine domänenspezifische Erweiterung, die auf RCOS-Core aufbaut, ohne dessen Pflichtschichten zu verändern.

**Register**  
Ein Artefakt, das eine Menge autoritativer Einträge (z. B. Rollen, Ressourcen, Mitgliedschaftszustände) mit klarer Zuständigkeit, Aktualisierungsregeln und Versionshistorie erfasst.

**Referenzimplementierung**  
Eine reale Gemeinschaft, die ihre Anwendung von RCOS-Core öffentlich dokumentiert.

**Rolle**  
Ein explizit definiertes Bündel aus Verantwortlichkeiten, Befugnissen und Rechenschaftspflicht, unabhängig von der Person, die sie innehat.

**Sicherheitskritisch**  
Ein Zustand, in dem physische, psychische oder Kindersicherheit gefährdet ist, der erhöhte Schutzmaßnahmen und möglicherweise sofortige Schutzmaßnahmen erfordert.

**Sanktion**  
Eine definierte, dokumentierte Einschränkung oder Korrekturmaßnahme, die durch einen autorisierten Prozess verhängt wird, proportional zu einem Verstoß und einer Überprüfung unterliegt.

**Geltungsbereich**  
Die explizit deklarierten Domänen, Ressourcen und Aktivitäten, über die die Gemeinschaft Autorität ausübt.

**Verwaltungsverantwortung**  
Verantwortung für Pflege, Instandhaltung und Governance einer Ressource innerhalb definierter Grenzen.

**Gemeinschaftskasse**  
Die Gesamtheit der gemeinsamen Ressourcen, Salden, Verpflichtungen und Zusagen, die unter kollektiven Regeln gehalten werden.

**Kassenregelwerk**  
Ein Artefakt, das festlegt, wie Ressourcen der Gemeinschaftskasse gehalten, ausgegeben, berichtet, geprüft und eingeschränkt werden, einschließlich Schwellenwerte und Interessenkonfliktregeln.

**Transparenzausnahme**  
Eine explizit definierte, gerechtfertigte, zeitlich begrenzte Einschränkung des Informationszugangs, die dennoch eine Konformitätsprüfung ermöglicht.

**Versionshistorie**  
Ein Artefakt, das festhält, welche Version in Kraft ist, und beschlossene Änderungen, Inkrafttretensdaten und Entscheidungsreferenzen dokumentiert.


---

# Anhang B — Beispiel-Artefakte (nicht normativ)

Dieser Anhang bietet **illustrative Beispiele** für Artefakte, auf die in der Spezifikation verwiesen wird.  
Die Beispiele dienen nur zur Information und sollten nicht als vorgeschriebene Formate oder Implementierungen behandelt werden.

## B.1 Beispiel Zweck-Charta (Auszug)

- Primärer Zweck (einzeln): „Ein geteiltes, regeneratives Wohnprojekt pflegen und verwalten, das stabiles Wohnen und ökologische Wiederherstellung bietet."
- Sekundäre Zwecke (begrenzt):
  - „Ein kleines Bildungsprogramm zu regenerativen Praktiken betreiben."
  - „Eine mitgliedereigene Genossenschaft für lokale Lebensmittelproduktion führen."
- Nicht-Ziele / Ausschlüsse:
  - „Keine politische Partei."
  - „Kein kurzfristiges Projektkollektiv."
  - „Kein gewinnorientiertes Immobilienvehikel."
- Bedingungen für eine Zweckänderung:
  - „Zweckänderungen erfordern eine konstitutionelle Entscheidung und vollständige Neu-Ratifizierung."
- Ratifizierungsprotokoll:
  - Angenommen: 2026-01-01
  - Entscheidungstyp: Konstitutionell
  - Version: 0.3
  - Link zum Entscheidungsprotokoll: [Platzhalter]

## B.2 Beispiel Geltungsbereichserklärung (Auszug)

- Im Geltungsbereich liegende Vermögenswerte:
  - Grundstück „Nordfeld"
  - Gebäude: „Gemeinschaftshaus", „Werkstatt"
  - Gemeinsame Mittel: Betriebskasse, Rücklagenfonds
  - Gemeinsame Infrastruktur: Wassersystem, Solaranlage, geteilte Fahrzeuge
- Im Geltungsbereich liegende Autoritätsbereiche:
  - Governance-Regeln und Entscheidungsprozess (Schicht 2)
  - Mitgliedschaftsregeln und -zustände (Schicht 1)
  - Kasse und gemeinsame Ressourcenverteilung (Schicht 3)
  - Operative Koordination für gemeinsame Arbeit (Schicht 5)
- Außerhalb des Geltungsbereichs:
  - Persönliches Einkommen, private Schulden und private Bankkonten
  - Private Beziehungen und private Wohnräume (außer bei sicherheitskritischen Bedingungen)
  - Externe Unternehmen, die keine Gemeinschaftsressourcen nutzen

## B.3 Beispiel Entscheidungsmatrix (Auszug)

| Entscheidungsbereich | Entscheidungstyp | Autorisiertes Gremium | Mechanismus | Schwelle | Eskalation |
|----------------|--------------|-----------------|-----------|-----------|------------|
| Budgetfreigabe (jährlich) | Strategisch | Finanzkreis | Konsent | Keine Einwände | Allgemeiner Kreis |
| Notausgabe ≤ 500 | Operativ | Kassenwart:in | Delegierte Autorität | N/A | Finanzkreis |
| Ausgabe 501–5.000 | Strategisch | Finanzkreis | Abstimmung | Mehrheit | Allgemeiner Kreis |
| Kern-Invariante hinzufügen/entfernen | Konstitutionell | Allgemeiner Kreis | Abstimmung | Supermehrheit (80 %) | Konstitutionelle Prüfung |
| Rollenernennung | Operativ | Kreisleitung | Konsent | Keine Einwände | Governance-Kreis |

## B.4 Beispiel Internes Wirtschaftsprotokoll (Auszug)

- Anerkannte Beitragskategorien:
  - Arbeit (Instandhaltung, Bau, Lebensmittelproduktion)
  - Fürsorge (Kinderbetreuung, Altenpflege, Konfliktunterstützung)
  - Wissen (Schulung, Dokumentation, Moderation)
  - Verwaltung (Ressourcenpflege, Beschaffungsaufsicht)
- Erfassungsmechanismus:
  - Wöchentliches Beitragsprotokoll, eingereicht von den Mitgliedern
  - Monatliche Prüfung durch den Betriebskreis auf Konsistenz und Korrekturen
- Interne Einheiten (optional):
  - „Zeitguthaben", erfasst in Stunden für bestimmte gemeinsame Zuteilungen
- Akkumulationsbeschränkungen (falls interne Einheiten existieren):
  - Obergrenzen für Guthaben
  - Verfall nach 12 Monaten, sofern nicht durch Prüfung verlängert
- Einspruch und Korrektur:
  - Jedes Mitglied kann innerhalb von 30 Tagen eine Überprüfung eines Eintrags beantragen
  - Korrekturen erfordern eine dokumentierte Begründung und werden in einer Änderungshistorie protokolliert

## B.5 Beispiel Konfliktlösungsleiter (Auszug)

1. Direktes Gespräch (informelle Klärung)  
2. Begleitete Mediation (neutrale Moderation, ausgewählt aus einer genehmigten Liste)  
3. Verantwortlichkeits-Aufnahme (dokumentierte Aufnahme; Schutzmaßnahmen gegen Vergeltung aktiviert)  
4. Verantwortlichkeits-Prüfung (Ergebnisse, Reparaturplan und verhältnismäßige Maßnahmen)  
5. Governance-Entscheidung (falls Autorität, Zugang oder Rollen geändert werden müssen)  
6. Trennungsprozess (falls erforderlich; koordiniert mit Schicht 1 Austritts- und Trennungsprotokoll)

## B.6 Beispiel Änderungsvorschlag-Vorlage (Auszug)

- Änderungstitel:
- Zusammenfassung (1–3 Sätze):
- Betroffene Layer und Artefakte (Links):
- Änderungstyp:
  - Dauerhafte Änderung / Experiment
- Entscheidungstyp und autorisierter Entscheidungsweg (Verweis auf Entscheidungsmatrix):
- Begründung:
- Risiken und Gegenmaßnahmen:
- Übergangs- und Migrationsplan:
- Rollback-Plan und Rollback-Auslöser:
- Datum des Inkrafttretens und Überprüfungsdatum:

## B.7 Beispiel Mitgliedschaftsvereinbarung (Auszug)

- Mitgliedschaftsstatus bei Unterzeichnung: Probe / Voll
- Mitgliedsrechte (Beispiele):
  - Zugang zu den als transparent definierten Entscheidungsprotokollen
  - Teilnahmerechte gemäß Entscheidungstyp
  - Ein definierter Austrittspfad zu jeder Zeit
- Mitgliedspflichten (Beispiele):
  - Beitragserwartungen gemäß Rolle und Mitgliedschaftsstatus
  - Einhaltung der erklärten Invarianten und Sicherheitsregeln
  - Teilnahme an Mindest-Onboarding- und Überprüfungsprozessen
- Verweis auf ordnungsgemäßes Verfahren:
  - „Jeder erzwungene Austritt oder Zugangsbeschränkung folgt dem Schicht 4 ordnungsgemäßen Verfahren und dem Austrittsprotokoll."

## B.8 Beispiel Onboarding-Protokoll (Auszug)

1. Zugang zu RCOS-Artefakten (Schicht 0–6) und lokalen Modulen bereitstellen
2. Ausdrückliche Zustimmung zu Schicht 0 und Schicht 1 Artefakten bestätigen
3. Initialen Mitgliedschaftsstatus und Onboarding-Buddy zuweisen
4. Orientierung zu Sicherheits- und Konfliktprozessen abschließen
5. Geltungsbereichsgrenzen und was außerhalb des Geltungsbereichs liegt besprechen
6. Onboarding-Abschluss im Mitgliedschaftsregister dokumentieren

## B.9 Beispiel Rollenregister-Eintrag (Auszug)

- Rollenname: Kassenwart:in
- Zweck: Kassenunterlagen pflegen und autorisierte Zahlungen ausführen
- Autoritätsumfang:
  - Zahlungen ≤ 500 innerhalb genehmigter Kategorien ausführen
- Beschränkungen:
  - Keine Befugnis, Budgets zu genehmigen oder Transparenzregeln zu ändern
- Amtszeit:
  - 6 Monate, einmal ohne Prüfung verlängerbar
- Rechenschaftspflicht:
  - Monatlich veröffentlichter Kassenbericht; vierteljährliche Prüfung
- Ernennung/Abberufung:
  - Ernannt durch den Finanzkreis; abberufbar durch Prüfung des Governance-Kreises

## B.10 Beispiel Kassenregelwerk (Auszug)

- Transparenz:
  - Monatliche Bilanz und Cashflow-Zusammenfassung, veröffentlicht für alle Mitglieder
- Ausgabenschwellen:

| Betrag | Entscheidungstyp | Autorisiertes Gremium | Mechanismus |
|---:|---|---|---|
| ≤ 500 | Operativ | Kassenwart:in | Delegiert |
| 501–5.000 | Strategisch | Finanzkreis | Mehrheitsabstimmung |
| > 5.000 | Strategisch | Allgemeiner Kreis | Mehrheitsabstimmung |
| Schulden / langfristige Verpflichtung | Konstitutionell | Allgemeiner Kreis | Supermehrheit |

- Interessenkonflikt:
  - Ein:e Antragsteller:in darf den eigenen Ausgabenantrag nicht genehmigen

## B.11 Beispiel Besprechungsvorlage (Auszug)

- Besprechungstyp: Operativ
- Datum/Uhrzeit:
- Moderation:
- Teilnehmende:
- Tagesordnung:
  1. Check-in (zeitlich begrenzt)
  2. Letzte Aktionen überprüfen
  3. Operative Updates
  4. Entscheidungen (falls vorhanden)
  5. Nächste Aktionen und Verantwortliche
- Entscheidungsprotokoll (falls verwendet):
  - Entscheidungstyp:
  - Autorität:
  - Mechanismus/Schwelle:
  - Ergebnis:
  - Datum des Inkrafttretens:

## B.12 Beispiel Lernprotokoll-Eintrag (Auszug)

- Datum:
- Auslösendes Ereignis:
- Was ist passiert (kurze Beschreibung):
- Betroffene Layer/Artefakte:
- Signale, die zur Handlung geführt haben:
- Was wurde geändert (oder versucht):
- Ergebnis nach Überprüfung:
- Verantwortliche:r für Folgeaktion und Fälligkeitsdatum:


---

# Anhang C — Zusammenfassung der Referenzimplementierung

Dieser Anhang definiert eine **empfohlene Dokumentationsstruktur** für Gemeinschaften, die sich als RCOS-Referenzimplementierungen präsentieren möchten. Ziel ist es, die Übernahme überprüfbar, vergleichbar und lernbar zu machen, ohne eine Befürwortung zu implizieren.

## C.1 Gemeinschaftskontext

- Name und Standort
- Größe und Umfang (z. B. 12 Mitglieder; 3 Haushalte; 25 Hektar)
- Hauptzweck (Schicht 0)
- Gründungsdatum und Datum der RCOS-Übernahme (falls abweichend)
- Relevante Rechtsform(en) (falls vorhanden)
- Öffentliche Kontaktstelle

## C.2 Überblick zur RCOS-Übernahme

- Verwendete RCOS-Core-Version
- Referenz zum Übernahme-Entscheidungsprotokoll (Autorität, Mechanismus, Datum)
- Zusammenfassung der übernommenen optionalen Module (falls vorhanden), einschließlich:
  - Modulname und Geltungsbereich
  - Übernahmedatum
  - Link zur Modulspezifikation
  - Deklarierte Layer-Abhängigkeiten

## C.3 Layer-für-Layer-Zusammenfassung

Für jeden Layer (0–6):
- Implementierte Artefakte (mit Links)
- Abweichungen oder Anpassungen (mit Links)
- Bekannte Herausforderungen und aufgetretene Fehlermodi

Empfohlenes Format:

| Layer | Implementierte Pflichtartefakte | Öffentliche(r) Link(s) | Version/Datum | Anmerkungen |
|---:|---|---|---|---|
| 0 | Zweckcharta; Geltungsbereichserklärung; Invariantenregister | [Platzhalter] | v0.3 / 2026-01-01 | Zweck stabil; Invarianten werden vierteljährlich überprüft |
| 1 | Mitgliedschaftsvereinbarung; Onboarding-Protokoll; Austritts- & Trennungsprotokoll; Mitgliedschaftsstatus-Register | [Platzhalter] | v1.1 / 2026-02-15 | Probezeit beträgt 3 Monate |
| 2 | Entscheidungsmatrix; Governance-Protokoll; Autoritätenregister | [Platzhalter] | v0.8 / 2026-03-10 | Konsent für operative, Abstimmung für strategische Entscheidungen |
| 3 | Protokoll für die interne Wirtschaft; Kassensatzung | [Platzhalter] | v0.5 / 2026-03-20 | Monatliche Kassenberichte werden veröffentlicht |
| 4 | Konfliktlösungsleiter; Rechenschaftsprotokoll | [Platzhalter] | v0.6 / 2026-04-01 | Anti-Vergeltungsrichtlinie enthalten |
| 5 | Betriebshandbuch; Rollenverzeichnis; Sitzungsvorlagen | [Platzhalter] | v0.4 / 2026-04-15 | Sitzungsbelastung auf 4 Std./Woche begrenzt |
| 6 | Änderungsprotokoll; Versionshistorie; Lernprotokoll | [Platzhalter] | v0.2 / 2026-05-01 | Experimente verfallen, wenn nicht erneuert |

## C.4 Governance und Weiterentwicklung

- Verwendete Entscheidungsmechanismen (mit Auszug aus der Entscheidungsmatrix oder Link)
- Änderungs- und Experimentverlauf (mit Links zu Änderungsprotokollen)
- Wichtige Erkenntnisse und Fehlschläge (mit Links zu Learning-Log-Einträgen)
- Abweichungsregister (empfohlen):

| Gegenstand | Layer | Typ | Status | Beginn | Überprüfung/Ende | Link |
|---|---|---|---|---|---|---|
| Versuch mit rotierender Moderation | 5 | Experiment | Aktiv | 2026-06-01 | 2026-08-01 | [Platzhalter] |
| Ausnahme bei Kassentransparenz (Sicherheit) | 3/4 | Permanent | Aktiv | 2026-04-10 | Jährliche Überprüfung | [Platzhalter] |


## C.5 Compliance-Erklärung
- Aktueller Compliance-Status: Konform / Nicht konform / Unbekannt
- Datum des letzten Selbst-Audits oder externen Audits
- Audit-Methode (Selbst-Audit vs. extern)
- Bekannte Zeiträume der Nicht-Konformität (falls vorhanden) und Zusammenfassung der Abhilfemaßnahmen
- Nachweislinks (empfohlen):

| Nachweis | Datum | Link |
|---|---:|---|
| Layer-für-Layer-Checklisten-Ergebnis | 2026-07-01 | [Platzhalter] |
| Audit-Notizen / Feststellungen | 2026-07-01 | [Platzhalter] |
| Abhilfemaßnahmen-Protokoll | 2026-07-15 | [Platzhalter] |
- Bekannte Zeiträume der Nicht-Konformität (falls vorhanden)  

## C.6 Öffentliche Transparenz
- Öffentlicher Artefakt-Index (empfohlen):

| Artefakt | Layer | Öffentlicher Link | Version/Datum | Anmerkungen |
|---|---:|---|---:|---|
| Zweckcharta | 0 | [Platzhalter] | 2026-01-01 | |
| Entscheidungsmatrix | 2 | [Platzhalter] | 2026-03-10 | |
| Kassenberichte | 3 | [Platzhalter] | 2026-06-30 | monatlich |
| Lernprotokoll | 6 | [Platzhalter] | 2026-06-15 | Schwärzungen vermerkt |

- Kontakt- oder Anfragekanal
- Ausdrückliche Erklärung, was privat vs. öffentlich ist und warum
- Link zur aktuell verwendeten RCOS-Core-Version und zum Änderungsprotokoll
- Kontakt- oder Anfragekanal  

---

## Informationshinweis

Referenzimplementierungen sind Lerninstrumente, keine Befürwortungen.

