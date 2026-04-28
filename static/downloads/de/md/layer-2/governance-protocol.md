**RCOS – Regenerative Community Operating System**

# Governance-Protokoll

- **Generiert:** 2026-04-28
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-2/governance-protocol](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-2/governance-protocol)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

---
- **Layer:** 2 — Governance & Entscheidungslogik
- **Status:** Vorlage — an deine Gemeinschaft anpassen
- **RCOS-Referenz:** [§4.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [§4.6](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [§4.7](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Definiert den vollständigen Lebenszyklus einer kollektiven Entscheidung — von der Antragseinreichung bis zur Dokumentation und zum Einspruch.

---

## Antragseinreichung

*RCOS-Klauseln: [4.5.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Warum formalisieren, wie Anträge ins System gelangen?</summary>

Ein Entscheidungsprozess, der Anträge informell annimmt — eine Nachricht, ein mündlicher Vorschlag, eine Idee der Gründer:innen — hat keine verlässliche Möglichkeit festzustellen, was tatsächlich zur Abstimmung steht. Ein standardisiertes Einreichungsformat, ein festgelegter Ablageort und verbindliche Inhaltsfelder bedeuten, dass jeder Antrag mit denselben Informationen eingeht, für alle sichtbar und von Tag eins an nachvollziehbar.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Lege fest, wer Anträge stellen darf, wo Anträge eingereicht werden, welche Inhaltsfelder verpflichtend sind und wie der Entscheidungstyp bestimmt und angefochten wird.

</details>

- _<Operative Entscheidungen — werden von der zuständigen Rolleninhaber:in gemäß dem Rollenregister bearbeitet; kein Antrag erforderlich.>_
- _<Strategische und Verfassungsentscheidungen — wer einreichen darf und auf welcher Plattform.>_
- _<Pflichtfelder im Antrag: Zusammenfassung, betroffene Layer und Artefakte, Entscheidungstyp, Begründung, Risiken und Gegenmaßnahmen, Rücknahmeplan, vorgeschlagenes Wirksamkeitsdatum.>_
- _<Der Entscheidungstyp wird von der antragstellenden Person angegeben; im Zweifelsfall gilt der höhere Wirkungstyp.>_
- _<Rücknahmeregeln — wann ein Antrag zurückgezogen werden kann und wie.>_

## Prüfung und Beratung

*RCOS-Klauseln: [4.5.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Warum eine Mindestberatungsfrist vorschreiben?</summary>

Überhastete Abstimmungen bevorzugen diejenigen, die ohnehin schon aufmerksam sind, und benachteiligen alle anderen. Eine verpflichtende Beratungsfrist, abgestimmt auf die Tragweite der Entscheidung, gibt den Mitgliedern Zeit zum Lesen, Reagieren und Einbringen von Bedenken, bevor die Abstimmung beginnt — sodass die Abstimmung eine durchdachte Beurteilung widerspiegelt, keine Reaktionsgeschwindigkeit.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Benenne die Beratungsorte und die Mindestfristen für strategische und Verfassungsentscheidungen, bevor eine Abstimmung eröffnet werden darf.

</details>

- _<Wo die Beratung stattfindet (Forum, Chat, Treffen).>_
- _<Mindestberatungsfrist vor Eröffnung einer Abstimmung — strategisch.>_
- _<Mindestberatungsfrist vor Eröffnung einer Abstimmung — Verfassung.>_
- _<Erwartung, dass Mitglieder Bedenken während der Beratung äußern, um erneute Abstimmungen zu vermeiden.>_

## Entscheidungsumsetzung

*RCOS-Klauseln: [4.5.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Warum die Umsetzung an die Dokumentation binden?</summary>

Ein angenommener Antrag, der nie im betroffenen Artefakt ankommt, ist eine Entscheidung nur dem Namen nach — die geltenden Regeln sagen immer noch dasselbe wie vorher. Die Umsetzung an eine konkrete Artefakt-Aktualisierung und einen Versionshistorie-Eintrag zu knüpfen, schließt die Lücke zwischen dem, was entschieden wurde, und dem, was tatsächlich gilt.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Lege fest, was passiert, wenn ein Antrag angenommen wird (Artefakt-Aktualisierungen, Versionshistorie) und wenn er abgelehnt wird (Archivierung). Definiere eine Frist für beides.

</details>

- _<Bei Annahme: wie der Antrag abgelegt wird; betroffene Artefakte aktualisiert werden; Eintrag in der Versionshistorie erstellt wird.>_
- _<Bei Ablehnung: wo der Antrag archiviert wird.>_
- _<Frist für die Umsetzung nach Abschluss einer Abstimmung.>_

## Dokumentation und Veröffentlichung

*RCOS-Klauseln: [4.5.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Warum jedes Ergebnis dokumentieren, einschließlich Ablehnungen?</summary>

Wenn nur die angenommenen Entscheidungen aufbewahrt werden, geht die Begründungsgeschichte verloren — Mitglieder verlieren den Überblick darüber, was bereits geprüft und abgelehnt wurde, und dieselben Debatten werden endlos wieder aufgerollt. Sowohl angenommene als auch abgelehnte Anträge zu archivieren, mit einer Frist und einem überprüfbaren Entscheidungsprotokoll, bewahrt das institutionelle Gedächtnis und macht das Governance-System prüfbar.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Lege Aufbewahrungsregeln für angenommene und abgelehnte Anträge fest, was als Entscheidungsprotokoll gilt und die Pflicht zur Aktualisierung der Versionshistorie.

</details>

- _<Alle angenommenen und abgelehnten Anträge werden innerhalb von X Tagen nach Abstimmungsende abgelegt.>_
- _<Das Abstimmungsartefakt (z. B. Snapshot-Link) dient als Entscheidungsprotokoll.>_
- _<Versionshistorie (Layer 6) wird bei jedem angenommenen Antrag aktualisiert.>_

## Einspruch und Überprüfung

*RCOS-Klauseln: [4.5.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.6.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Warum erneute Abstimmungen ermöglichen, aber begrenzen?</summary>

Ein Governance-System ohne Einspruchsmöglichkeit zementiert Fehler zu dauerhaften Regeln; eines mit unbegrenzten informellen Einspruchswegen bringt nichts zum Abschluss. Jedem Vollmitglied die Möglichkeit zu geben, eine erneute Abstimmung auszulösen — aber nur mit einem schriftlichen, begründeten Einwand, der etwas noch nicht Behandeltes aufwirft — hält das System selbstkorrigierend, ohne dass jede Entscheidung zu einem Dauerreferendum wird.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Definiere die Bedingungen für eine erneute Abstimmung, das Format des Einwands und den Schwellenwert/Mechanismus für die erneute Abstimmung selbst.

</details>

- _<Wer eine erneute Abstimmung auslösen darf und wie.>_
- _<Anforderung eines begründeten Einwands — ein Aspekt, der in der ursprünglichen Beratung nicht behandelt wurde.>_
- _<Die erneute Abstimmung verwendet denselben Mechanismus und Schwellenwert wie die ursprüngliche.>_
- _<Umgang mit wiederholten nichtigen Anträgen auf erneute Abstimmung.>_

## Konflikte zwischen Entscheidungen

*RCOS-Klauseln: [4.5.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Warum die Konfliktlösung vorab festlegen?</summary>

Wenn zwei Entscheidungen in unterschiedliche Richtungen weisen, muss jemand bestimmen, welche gilt — und wenn diese Wahl ad hoc getroffen wird, läuft es darauf hinaus, wer die Autorität oder Energie hat, seine Auslegung durchzusetzen. Eine feste Vorrangegel (höherer Typ gewinnt; neuere gewinnt bei gleichem Typ) löst Konflikte mechanisch, ohne eine Ermessensentscheidung.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Lege die Vorrangregel fest (typischerweise: höherer Entscheidungstyp hat Vorrang; neuere gewinnt bei gleichem Typ, sofern nicht ausdrücklich gesperrt).

</details>

- _<Vorrang: Verfassung > Strategisch > Operativ.>_
- _<Konflikte gleichen Typs: neuere hat Vorrang, es sei denn, die ältere hat zukünftige Änderungen ausdrücklich gesperrt.>_
- _<Wo Konflikte aufgedeckt werden und wie sie gelöst werden.>_

## Schutzmaßnahmen und Fehlermodi

*RCOS-Klauseln: [4.6.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Warum Governance-Versagen von Anfang an einplanen?</summary>

Jedes Governance-System versagt irgendwo — vereinnahmt von einer Untergruppe, blockiert durch informelle Vetos, verwässert von einer Rolleninhaber:in, die ihren Zuständigkeitsbereich still und leise ausgeweitet hat. Die spezifischen Fehlermodi im Voraus zu benennen, Anfechtungswege einzubauen, die nicht mit Vergeltung beantwortet werden können, und eine formale Überprüfung zu verlangen, wenn sich Fehler häufen — das ist es, was verhindert, dass Governance sich langsam aushöhlt, während niemand hinschaut.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Benenne für jeden Fehlermodus die entsprechende Schutzmaßnahme. Füge einen Auslöser hinzu, der eine Verfassungsüberprüfung erzwingt, wenn sich Fehler häufen.

</details>

- **Machtkonzentration:** _<wie das Protokoll einseitige Autorität über den operativen Rahmen hinaus verhindert.>_
- **Informelle Vetos:** _<Regel, dass nur schriftliche, begründete Einwände, die über den definierten Prozess eingereicht werden, Gewicht haben.>_
- **Entscheidungsvereinnahmung:** _<Regel zu Beschlussfähigkeit und Offenheit der Abstimmung.>_
- **Gründer-/Rollenverfestigung:** _<Regel, dass keine Rolle dauerhafte Autorität verleiht; Gründer:innen haben keine besondere Governance-Autorität über ihren Mitgliedschaftsstatus hinaus.>_
- **Anfechtung ohne Vergeltung:** _<Verweis auf die Anti-Vergeltungsbestimmungen in Layer 4.>_
- **Auslöser bei anhaltendem Versagen:** _<z. B. drei oder mehr Governance-Fehler innerhalb von X Monaten lösen eine Verfassungsüberprüfung aus.>_

---

## Ratifizierungsprotokoll

- **Angenommen:** <JJJJ-MM-TT>
- **Entscheidungstyp:** Verfassung
- **Version:** <Version>
- **Entscheidungsprotokoll:** <Link zum Entscheidungsprotokoll>
