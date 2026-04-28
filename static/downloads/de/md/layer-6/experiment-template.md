**RCOS – Regenerative Community Operating System**

# Experiment-Vorlage

- **Generiert:** 2026-04-28
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-6/experiment-template](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-6/experiment-template)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

---
- **Schicht:** 6 — Evolution & Anpassung
- **Status:** Vorlage — verwende sie, um ein zeitlich begrenztes Experiment vorzuschlagen
- **RCOS-Referenz:** [§8.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [§8.7](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)

> Experimente erlauben es der Gemeinschaft, eine Änderung auszuprobieren, ohne sie dauerhaft zu übernehmen. Damit das sicher bleibt, muss jedes Experiment zeitlich begrenzt, gekennzeichnet und automatisch ablaufend sein — und seine Ergebnisse im Lernprotokoll festhalten.

---

## Pflichtfelder

*RCOS-Klauseln: [8.3.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Warum sind diese Felder erforderlich?</summary>

Ohne Umfang, Dauer, Erfolgskriterien und Rollback ist ein „Experiment" nur eine dauerhafte Änderung mit freundlicherem Etikett. Indem jeder Vorschlag angeben muss, was er ändert, wann er endet, wie er überprüft wird und wie er rückgängig gemacht wird, bleibt Experimentieren umkehrbar — und das Experiment-Label kann nicht dazu verwendet werden, die Beratung zu umgehen.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Fülle jedes Feld aus. Die maximale Dauer wird durch dein Änderungsprotokoll festgelegt. Die Entscheidungsbefugnis muss aus der Entscheidungsmatrix stammen.

</details>

- **Titel:** _<kurzer Experimentname.>_
- **Vorschlagende Person:** _<Name des Mitglieds.>_
- **Entscheidungstyp:** Strategisch
- **Umfang:** _<was genau ausprobiert wird; welche Artefakte und Verhaltensweisen betroffen sind.>_
- **Dauer:** _<Startdatum — Enddatum; maximale Dauer gemäß Änderungsprotokoll.>_
- **Überprüfungszeitpunkte:** _<mindestens ein Zwischencheck; gib Termine und Prüfgegenstände an.>_
- **Erfolgskriterien:** _<beobachtbare Bedingungen, die eine dauerhafte Übernahme der Änderung rechtfertigen würden.>_
- **Abbruchkriterien:** _<beobachtbare Bedingungen, die das Experiment vorzeitig beenden würden.>_
- **Rollback-Bedingungen und -Prozess:** _<was ein Rollback auslöst und wie es durchgeführt wird.>_
- **Autorisierter Entscheidungspfad:** _<wer das Experiment gemäß der Entscheidungsmatrix starten, verlängern, ändern oder beenden darf.>_
- **Kennzeichnung:** _<alle vom Experiment betroffenen Artefakte müssen für die Dauer des Experiments ausdrücklich als experimentell gekennzeichnet werden.>_
- **Sicherheitsaussetzung:** _<bestätige, dass eine Notaussetzung gemäß Änderungsprotokoll eingeleitet werden kann, wenn ein glaubhaftes Sicherheitsrisiko entsteht.>_

## Ablauf und Verlängerung

<details data-kind="rationale">
<summary>Warum müssen Experimente ablaufen?</summary>

Die Gemeinschaft braucht die Möglichkeit, Änderungen rückgängig zu machen. Automatisches Ablaufen erzwingt eine bewusste Entscheidung, die Änderung dauerhaft zu übernehmen — statt eines schleichenden Drifts, bei dem sich niemand mehr erinnert, dass sie jemals vorläufig war.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Halte die Regel zum automatischen Ablauf, den Verlängerungsmechanismus und die Pflicht zur Ergebniserfassung im Lernprotokoll fest.

</details>

- _<Experimente laufen automatisch am Ende ihrer festgelegten Dauer ab, sofern sie nicht ausdrücklich durch einen neuen Vorschlag verlängert werden. Eine Verlängerung erfordert eine neue strategische Abstimmung.>_
- _<Ergebnisse und Erkenntnisse werden im Lernprotokoll festgehalten.>_

---

## Ergebnisprotokoll (wird am Ende des Experiments ausgefüllt)

- **Enddatum:**
- **Ergebnis:** _<Dauerhaft übernommen / Rückgängig gemacht / Angepasst und erneut durchgeführt / Vorzeitig beendet>_
- **Entscheidungsnachweis:** _<Link zur Abstimmung oder Entscheidung>_
- **Lernprotokoll-Eintrag:** _<Link>_
- **Zusammenfassung:** _<zwei bis vier Sätze darüber, was ausprobiert wurde, was beobachtet wurde und was entschieden wurde.>_
