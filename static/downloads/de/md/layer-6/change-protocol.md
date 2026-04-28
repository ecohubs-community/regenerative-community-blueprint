**RCOS – Regenerative Community Operating System**

# Änderungsprotokoll

- **Generiert:** 2026-04-28
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-6/change-protocol](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-6/change-protocol)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

---
- **Schicht:** 6 — Evolution & Anpassung
- **Status:** Vorlage — an eure Gemeinschaft anpassen
- **RCOS-Referenz:** [§8.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [§8.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [§8.6](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

---

## Wie Änderungen vorgeschlagen werden

*RCOS-Klauseln: [8.1.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.6.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.8.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#88-explicitness-rules)*

<details data-kind="rationale">
<summary>Warum ein strukturierter Vorschlag?</summary>

Eine Änderung, die als vage Idee im Chat auftaucht, kann nicht bewertet, angefochten oder später zurückgenommen werden. Indem jeder Vorschlag durch dieselbe Mindestform geleitet wird — betroffene Artefakte, Begründung, Risiken, Rücknahmeplan — wird eine Meinung zu einem überprüfbaren Artefakt, und es wird unmöglich, eine Regeländerung versehentlich an der Gemeinschaft vorbeizuschleusen.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Legt fest, wer vorschlagen darf, wo Vorschläge eingereicht werden und welche Pflichtfelder sie enthalten müssen. Verknüpft dies mit dem Governance-Protokoll (Schicht 2).

</details>

_<Jedes Vollmitglied darf eine Änderung an jedem RCOS-Artefakt vorschlagen. Gebt den Einreichungskanal an.>_ Jeder Vorschlag muss enthalten:

- _<Zusammenfassung der Änderung.>_
- _<Betroffene Schichten und Artefakte (mit Links).>_
- _<Entscheidungstyp (Operativ / Strategisch / Konstitutionell).>_
- _<Begründung.>_
- _<Risiken und Gegenmaßnahmen.>_
- _<Rücknahmeplan.>_
- _<Vorgeschlagenes Inkrafttreten.>_

## Wie Vorschläge klassifiziert werden

*RCOS-Klauseln: [8.1.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms)*

<details data-kind="rationale">
<summary>Warum nach Auswirkung klassifizieren?</summary>

Nicht jede Änderung verdient denselben Aufwand. Tippfehlerkorrekturen sollten keine Supermehrheit erfordern; verfassungsändernde Eingriffe sollten nicht still und leise durchgehen. Indem Vorschläge Entscheidungstypen zugeordnet werden — und unklare Fälle standardmäßig nach oben gestuft werden — wird der Aufwand einer Änderung proportional zu ihrem Wirkungsradius, und Schicht 0 wird davor geschützt, durch kleine Schritte ausgehöhlt zu werden.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Definiert, was unter jeden Entscheidungstyp fällt. Legt die Regel fest, dass unklare Fälle in die höhere Kategorie eingestuft werden.

</details>

- **Operativ:** _<Formulierungskorrekturen, Formatierung, kleinere inhaltliche Aktualisierungen; keine Abstimmung erforderlich; wird von der zuständigen Rolle im Rahmen delegierter Befugnisse umgesetzt.>_
- **Strategisch:** _<Änderungen an Inhalten der Schichten 1–5, die Mitgliedsrechte, Prozesse oder Strukturen betreffen.>_
- **Konstitutionell:** _<Änderungen an Schicht 0 (Zweck, Geltungsbereich, Invarianten) oder am Governance-System selbst (Schicht 2).>_

> Wenn die Klassifikation unklar ist, wird standardmäßig der höhere Auswirkungstyp angenommen.

## Prüfung und Beratung

*RCOS-Klauseln: [8.1.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.7.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Warum Mindestberatungsfristen vorschreiben?</summary>

Ohne eine Mindestberatungszeit kann jede Änderung an einem ruhigen Tag durchgepeitscht werden, wenn nur wenige Mitglieder aufpassen. Verbindliche Mindestfristen — länger bei größerer Tragweite — garantieren, dass Mitglieder, die verreist, krank oder einfach beschäftigt sind, eine echte Chance bekommen, zu lesen, Einwände zu erheben oder teilzunehmen.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Legt Mindestberatungsfristen für jeden Entscheidungstyp fest sowie eine Ratifizierungsfrist für konstitutionelle Änderungen.

</details>

- **Operativ:** _<Keine Beratung erforderlich.>_
- **Strategisch:** _<Mindestens X Tage Beratung; Beratungsort.>_
- **Konstitutionell:** _<Mindestens Y Tage Beratung; Z Tage Ratifizierungsfrist nach erfolgreicher Abstimmung.>_

## Annahme und Veröffentlichung

*RCOS-Klauseln: [8.2.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Warum feste Veröffentlichungsschritte?</summary>

Eine Abstimmung, die bestanden wird, aber nie schriftlich festgehalten wird, ist so gut wie keine Abstimmung — und schlimmer noch, sie schafft eine Lücke, in der derjenige, der sich an das Ergebnis erinnert, es definieren darf. Strikte, geordnete Veröffentlichungsschritte schließen diese Lücke und machen „was wurde beschlossen" zu einer Frage der Akten, nicht des Gedächtnisses.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Legt die geordneten Schritte fest, die nach Annahme eines Vorschlags durchlaufen werden müssen. Gebt Fristen und die Versionsverlaufspflicht an.

</details>

Wenn ein Vorschlag angenommen wird:

1. _<Vorschlagsdatei wird innerhalb von X Tagen ins Archiv für angenommene Vorschläge verschoben.>_
2. _<Betroffene Artefakte werden innerhalb von X Tagen aktualisiert.>_
3. _<Eintrag im Versionsverlauf wird hinzugefügt.>_
4. _<Statusfelder der betroffenen Artefakte werden aktualisiert.>_

## Ablehnung

*RCOS-Klauseln: [8.2.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority)*

<details data-kind="rationale">
<summary>Warum abgelehnte Vorschläge archivieren?</summary>

Abgelehnte Ideen sind ebenso aufschlussreich wie angenommene — sie zeigen, was die Gemeinschaft in Betracht gezogen und verworfen hat. Das Aufbewahren und Zugänglichmachen von Ablehnungen verhindert, dass derselbe Vorschlag alle sechs Monate unter neuem Namen wieder auftaucht, und gibt zukünftigen Mitgliedern einen Blick auf die nicht eingeschlagenen Wege.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Gebt den Archivort für abgelehnte Vorschläge und die Bedingungen für eine erneute Abstimmung an.

</details>

Wenn ein Vorschlag abgelehnt wird:

1. _<Vorschlagsdatei wird innerhalb von X Tagen ins Archiv für abgelehnte Vorschläge verschoben.>_
2. _<Keine Artefaktänderungen werden vorgenommen.>_
3. _<Mechanismus zur erneuten Abstimmung greift, wenn neue Informationen vorliegen (gemäß der Entscheidungsmatrix, Schicht 2).>_

## Übergang und Migration

*RCOS-Klauseln: [8.5.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [8.5.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Warum bestehende Rechte während Übergängen schützen?</summary>

Wenn neue Regeln bestehende Vereinbarungen stillschweigend umschreiben könnten, wäre die Mitgliedschaft bedeutungslos — das, wofür ihr euch angemeldet habt, könnte unter euren Füßen geändert werden. Explizite Übergangsregeln garantieren, dass Rechte nicht rückwirkend eingeschränkt werden und dass Personen, die unter den alten Regeln arbeiten, Zeit und Vorankündigung erhalten, bevor sich die Grundlage ändert.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Legt die Regeln fest, die bestehende Rolleninhaber, Mitglieder und Aufzeichnungen schützen, wenn eine Regeländerung in Kraft tritt.

</details>

Wenn eine Regeländerung bestehende Rollen, Vereinbarungen oder Aufzeichnungen betrifft:

- _<Bestehende Rolleninhaber werden vor Inkrafttreten der Änderung benachrichtigt.>_
- _<Bestehende Mitgliedsrechte dürfen nicht ohne Zustimmung oder eine konstitutionelle Abstimmung eingeschränkt werden.>_
- _<Aufzeichnungen, die vor der Änderung entstanden sind, werden nicht rückwirkend geändert, es sei denn, dies ist ausdrücklich Teil des Vorschlags.>_
- _<Eine Übergangsfrist kann im Vorschlag selbst festgelegt werden.>_

## Rücknahme

*RCOS-Klauseln: [8.1.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.5.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Warum soll die Rücknahme symmetrisch zur Annahme sein?</summary>

Eine Änderung, die nicht auf demselben Weg rückgängig gemacht werden kann, auf dem sie entstanden ist, ist eine Falle. Indem die Rücknahme denselben Entscheidungstyp verwenden muss, bleibt die Tür für Korrekturen offen, ohne dass ein einzelnes Mitglied eine Entscheidung auf Gemeinschaftsebene stillschweigend rückgängig machen kann, indem es sie als „Korrektur" bezeichnet.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Legt fest, dass die Rücknahme denselben Entscheidungstyp und denselben Prozess wie die ursprüngliche Annahme verwendet.

</details>

_<Jede angenommene Entscheidung kann über denselben Prozess wie die ursprüngliche rückgängig gemacht werden. Jedes Vollmitglied kann eine erneute Abstimmung auslösen, indem es einen schriftlichen begründeten Einwand einreicht, der in der ursprünglichen Beratung nicht berücksichtigt wurde. Die Rücknahme verwendet denselben Entscheidungstyp wie das Original.>_

## Notfalländerungen

*RCOS-Klauseln: [8.5.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Warum überhaupt Notfalländerungen zulassen?</summary>

Manche Schäden entfalten sich schneller, als eine Abstimmung einberufen werden kann. Ein enger, gut abgesicherter Notfallpfad ermöglicht es der Gemeinschaft, auf echte Sicherheitsrisiken oder Plattformausfälle zu reagieren, ohne jemandem einen allgemeinen Überstimmungsmechanismus in die Hand zu geben. Der verpflichtende Zyklus aus Bericht, Prüfung und Ratifizierung-oder-Rücknahme verhindert, dass Notfallbefugnisse zu gewöhnlichen Befugnissen werden.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Definiert die Bedingungen, unter denen eine Notfalländerung vorgenommen werden darf, wer sie durchführen darf, und den verpflichtenden Zyklus aus Bericht-Prüfung-Ratifizierung-oder-Rücknahme.

</details>

Eine operative Notfalländerung darf von _<Rolle>_ nur vorgenommen werden, wenn alle folgenden Bedingungen erfüllt sind:

1. _<Sofortiges Handeln ist erforderlich, um Sicherheitsschäden oder Plattformausfälle zu verhindern.>_
2. _<Eine Abstimmung der Vollmitglieder kann nicht rechtzeitig einberufen werden.>_
3. _<Die Änderung setzt keine Invariante der Schicht 0 außer Kraft.>_

Notfalländerungen müssen:

- _<Allen Vollmitgliedern innerhalb von X Stunden gemeldet werden.>_
- _<Beim nächsten Gemeinschaftstreffen geprüft werden.>_
- _<Über den entsprechenden Entscheidungstyp innerhalb von Y Tagen ratifiziert werden, oder sie werden automatisch zurückgenommen.>_

## Experimente

*RCOS-Klauseln: [8.3.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Warum Experimente als eigenständigen Mechanismus behandeln?</summary>

Die Gemeinschaft braucht eine Möglichkeit, Neues auszuprobieren, ohne es dauerhaft übernehmen zu müssen, um es zu testen. Experimente schaffen diesen Raum — aber nur, wenn sie zeitlich begrenzt, gekennzeichnet und automatisch ablaufend sind. Ohne diese Leitplanken wird ein „Experiment" zum schnellsten Weg, eine dauerhafte Regel ohne echte Beratung einzuführen.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Definiert die Regeln, die jedes Experiment erfüllen muss. Verweist auf die Experimentvorlage für die vollständige Einreichungsform.

</details>

_<Jedes Vollmitglied darf ein zeitlich begrenztes Experiment per strategischer Entscheidung vorschlagen. Siehe die Experimentvorlage für die erforderlichen Felder.>_

- _<Experimente laufen automatisch am Ende ihrer festgelegten Dauer ab, sofern sie nicht ausdrücklich durch einen neuen Vorschlag verlängert werden.>_
- _<Alle von einem Experiment betroffenen Artefakte müssen für die Dauer ausdrücklich als experimentell gekennzeichnet sein.>_
- _<Sicherheitsaussetzung: Wenn ein Experiment ein glaubhaftes Sicherheitsrisiko, Zwang oder anhaltenden Schaden verursacht, kann eine Notfallaussetzung gemäß den obigen Notfalländerungen eingeleitet werden.>_
- _<Ergebnisse und Erkenntnisse werden im Lernprotokoll festgehalten.>_

---

## Ratifizierungsprotokoll

- **Angenommen:** <JJJJ-MM-TT>
- **Entscheidungstyp:** Konstitutionell
- **Version:** <Version>
- **Entscheidungsprotokoll:** <Link zum Entscheidungsprotokoll>
