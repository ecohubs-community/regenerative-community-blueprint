---
id: 4885248e
title: Entscheidungsmatrix
parentId: b7e62f01
order: 0
lang: de
sourceHash: c8735d68
---

- **Layer:** 2 — Governance & Entscheidungslogik
- **Status:** Vorlage — an deine Gemeinschaft anpassen
- **RCOS-Referenz:** [§4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [§4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [§4.7](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Ordnet jeden Entscheidungstyp und -bereich einer autorisierten Rolle oder einem Gremium, einem Mechanismus, einer Schwelle und einem Eskalationspfad zu. Entscheidungen, die außerhalb dieser Matrix getroffen werden, gelten als ungültig.

---

## Abstimmungsgrundsätze

*RCOS-Klauseln: [4.2.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms)*

<details data-kind="rationale">
<summary>Warum Mechanismus, Schwelle und Zeitrahmen vorab festlegen?</summary>

Eine Abstimmung ohne vordefinierten Mechanismus, Schwelle und Beratungszeitraum ist eine Einladung, Ergebnisse im Nachhinein zu manipulieren — wer die Stimmen zählt oder die Uhr stellt, gewinnt. Diese Parameter im Voraus festzulegen macht jede kollektive Entscheidung reproduzierbar und unter denselben Bedingungen anfechtbar, unabhängig davon, wer gerade im Raum ist.

</details>

<details data-kind="instructions">
<summary>Wie du diesen Abschnitt ausfüllst</summary>

Lege die Abstimmungsplattform, die Schwelle für jeden Entscheidungstyp, den Beratungszeitraum, die Patt-Regel, die Regel für erneute Abstimmungen sowie etwaige delegierte Ausgabenlimits oder Zuständigkeitsgrenzen fest.

</details>

- **Abstimmungsplattform:** _<z. B. Snapshot, Loomio, Konsens in Präsenz.>_
- **Operative Schwelle:** _<z. B. keine Abstimmung erforderlich — delegiert an die zuständige operative Rolleninhaberin laut Rollenregister.>_
- **Strategische Schwelle:** _<z. B. einfache Mehrheit (>50 %); mindestens X Tage Beratungszeit.>_
- **Konstitutionelle Schwelle:** _<z. B. Supermehrheit (≥⅔); mindestens Y Tage Beratungszeit; Z Tage Ratifizierungszeitraum.>_
- **Stimmengleichheit:** _<z. B. Vorschlag scheitert; Status quo bleibt bestehen.>_
- **Erneute Abstimmung:** _<z. B. jedes Vollmitglied kann mit einem schriftlich begründeten Einwand, der eine während der Beratung nicht behandelte Erwägung benennt, eine erneute Abstimmung auslösen.>_
- **Begründeter Einwand:** _<Definiere, was als begründeter Einwand gilt — nenne eine konkrete Erwägung, die während der Beratung nicht vorgebracht wurde; allgemeine Ablehnung genügt nicht.>_
- **Delegiertes Ausgabenlimit:** _<z. B. 0 €; oder definiere eine Schwelle, unterhalb derer delegierte Ausgaben zulässig sind.>_
- _<Weitere Abstimmungsgrundsätze, die deine Gemeinschaft festlegen möchte.>_

---

## Matrix

*RCOS-Klauseln: [4.4.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix)*

<details data-kind="rationale">
<summary>Warum eine einzige verbindliche Matrix?</summary>

Wenn die Regeln darüber, wer was entscheidet, nur in den Köpfen der Leute existieren, wird Autorität zu dem, was die lauteste oder ranghöchste Person sagt. Eine öffentliche Matrix, die jede Entscheidung an einen Bereich, ein Gremium, einen Mechanismus und eine Schwelle bindet, macht jede Kompetenzüberschreitung sofort sichtbar — und macht jede außerhalb der Matrix getroffene Entscheidung per Definition ungültig.

</details>

<details data-kind="instructions">
<summary>Wie du diesen Abschnitt ausfüllst</summary>

Lege für jeden Entscheidungsbereich (Mitgliedschaft, Finanzen, Plattform, Partnerschaften, Governance usw.) den Entscheidungstyp, das autorisierte Gremium, die teilnahmeberechtigten Personen, den Mechanismus, die Schwelle, Blockadebedingungen und den Eskalationspfad fest.

</details>

| Entscheidungsbereich | Entscheidungstyp | Autorisiertes Gremium | Teilnahmeberechtigte | Mechanismus | Schwelle | Blockade- / Vetobedingungen | Eskalation |
|---|---|---|---|---|---|---|---|
| _<z. B. Mitgliedsaufnahme>_ | _<Operativ / Strategisch / Konstitutionell>_ | _<Rolle oder Gremium>_ | _<wer teilnimmt>_ | _<Abstimmung / delegiert>_ | _<Schwelle>_ | _<Blockadebedingungen>_ | _<Eskalationspfad>_ |
| _<z. B. Finanzausgaben — klein>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<z. B. Finanzausgaben — groß>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<z. B. Änderungen an Governance-Regeln>_ | _<Konstitutionell>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<z. B. Änderungen am Hauptzweck / an Invarianten>_ | _<Konstitutionell>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> **Operative Rolleninhaber:** Jede operative Entscheidung wird von der benannten Rolleninhaberin ausgeführt, die für den jeweiligen Bereich zuständig ist, und zwar innerhalb ihres definierten Zuständigkeitsbereichs gemäß dem Rollenregister (Layer 5). Wenn eine Entscheidung mehrere Bereiche betrifft, handelt jede Rolleninhaberin innerhalb ihres eigenen Zuständigkeitsbereichs.

## Definitionen der Entscheidungstypen

*RCOS-Klauseln: [4.1.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.5](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types)*

<details data-kind="rationale">
<summary>Warum jede Entscheidung klassifizieren?</summary>

Ohne einen Typ wird jede Entscheidung mit der Geschwindigkeit und Sorgfalt behandelt, die gerade passt — Routineänderungen versanden in Debatten, und konstitutionelle Änderungen rutschen unbemerkt durch. Feste Typen binden das Gewicht einer Entscheidung an den Prozess, den sie durchlaufen muss, und die Regel „im Zweifel höher einstufen" schließt die Lücke, die sonst ausgenutzt werden könnte.

</details>

<details data-kind="instructions">
<summary>Wie du diesen Abschnitt ausfüllst</summary>

Definiere jeden Entscheidungstyp anhand seines Geltungsbereichs, wer ihn ausführt, welchen Prozess er erfordert und wie Streitigkeiten über die Klassifizierung gelöst werden.

</details>

- **Operativ** — _<Tagesgeschäft innerhalb bestehender Regeln; wird von der zuständigen Rolleninhaberin ohne Abstimmung ausgeführt.>_
- **Strategisch** — _<langfristige Ausrichtung, bedeutende Ressourcenzuweisung, Schaffung/Abschaffung wesentlicher Strukturen; erfordert eine Abstimmung der Vollmitglieder mit definiertem Beratungszeitraum.>_
- **Konstitutionell** — _<Änderungen an Layer 0 (Zweck, Geltungsbereich, Invarianten) oder am Governance-System selbst; erfordert eine Abstimmung der Vollmitglieder, Supermehrheit und einen Ratifizierungszeitraum.>_

> Wenn eine Entscheidung nicht eindeutig klassifiziert werden kann, wird standardmäßig der Typ mit höherer Auswirkung angewandt.

---

## Ratifizierungsprotokoll

- **Angenommen am:** <JJJJ-MM-TT>
- **Entscheidungstyp:** Konstitutionell
- **Version:** <Version>
- **Entscheidungsprotokoll:** <Link zum Entscheidungsprotokoll>
