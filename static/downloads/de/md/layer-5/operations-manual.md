**RCOS – Regenerative Community Operating System**

# Betriebshandbuch

- **Generiert:** 2026-04-29
- **Quelle (aktuelle Version):** [https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-5/operations-manual](https://blueprint.ecohubs.community/de/articles/rcos-templates/layer-5/operations-manual)
- **Alle RCOS-Vorlagen:** [https://blueprint.ecohubs.community/de/articles/rcos-templates](https://blueprint.ecohubs.community/de/articles/rcos-templates)

---
- **Ebene:** 5 — Betrieb & Koordination
- **Status:** Vorlage — für eure Gemeinschaft anpassen
- **RCOS-Referenz:** [§7.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [§7.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [§7.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [§7.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [§7.6](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)

---

## Zentrale Betriebsprozesse

*RCOS-Klauseln: [7.3.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.6.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)*

<details data-kind="rationale">
<summary>Warum kritische Prozesse dokumentieren?</summary>

Wenn ein Prozess nur im Kopf einer einzigen Person existiert, hängt die Gemeinschaft davon ab, dass diese Person immer verfügbar ist — für immer. Kritische Prozesse schriftlich festzuhalten, mit benannten Verantwortlichen, verwandelt privates Wissen in ein Gemeinschaftsgut, das Übergaben, Abwesenheiten und Austritte übersteht.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Benennt für jeden wiederkehrenden kritischen Prozess (Onboarding, Austritt, Antragsveröffentlichung, Beitragserfassung, Sitzungsrhythmus, Kassenverwaltung, Überprüfung von Plattformzugängen) eine verantwortliche Person und eine kurze Beschreibung.

</details>

| Prozess | Wer | Detail |
|---|---|---|
| _<Mitglieder-Onboarding>_ | _<Rolle>_ | _<siehe Onboarding-Protokoll (Schicht 1)>_ |
| _<Mitgliederaustritt>_ | _<Rolle>_ | _<siehe Austritts- & Trennungsprotokoll (Schicht 1)>_ |
| _<Antragsveröffentlichung>_ | _<Rolle>_ | _<siehe Governance-Protokoll (Schicht 2)>_ |
| _<Beitragserfassung>_ | _<Rolle>_ | _<siehe Binnenwirtschaftsprotokoll (Schicht 3)>_ |
| _<Regelmäßige Sitzung>_ | _<Moderation>_ | _<Agenda-Veröffentlichung; Protokoll; Aufgabennachverfolgung>_ |
| _<Kassenverwaltung>_ | _<Finanzverantwortliche:r>_ | _<siehe Kassenordnung (Schicht 3)>_ |
| _<Überprüfung der Plattformzugänge>_ | _<Infrastrukturverantwortliche:r>_ | _<Prüfrhythmus; Zugangsentzug für ausgetretene Mitglieder>_ |

## Temporäre und Ad-hoc-Verantwortlichkeiten

*RCOS-Klauseln: [7.1.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.1.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.7.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Warum temporäre Verantwortlichkeiten begrenzen?</summary>

Ad-hoc-Aufgaben verfestigen sich still und leise zu dauerhaften, unbezahlten Jobs — meist bei der Person, die einmal Ja gesagt hat. Eine feste Zeitbegrenzung und eine erzwungene Überprüfung machen den Unterschied zwischen „Ich bin eine Woche eingesprungen" und „Anscheinend ist das jetzt meine Aufgabe."

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Haltet fest, dass jede temporäre Verantwortlichkeit bei der Zuweisung zeitlich begrenzt, dokumentiert und vor Ablauf überprüft werden muss — und dann entweder formalisiert oder beendet wird.

</details>

Wenn eine Aufgabe oder Verantwortlichkeit temporär zugewiesen wird, muss sie:

- _<Von Anfang an ausdrücklich zeitlich begrenzt sein (konkretes Enddatum oder Abschlussbedingung).>_
- _<Zum Zeitpunkt der Zuweisung als temporär dokumentiert werden.>_
- _<Vor dem Enddatum überprüft und entweder in eine formale Rolle überführt oder beendet werden.>_

_<Maximale Dauer einer temporären Verantwortlichkeit, bevor sie formal zugewiesen oder beendet werden muss — z. B. 90 Tage.>_ Wenn eine temporäre Verantwortlichkeit nach ihrem Enddatum keine verantwortliche Person hat, erlischt sie; sie geht nicht stillschweigend auf jemand anderen über.

---

## Rollen- und Zuständigkeitsschnittstellen

*RCOS-Klauseln: [7.6.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts), [7.3.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Warum Übergaben explizit abbilden?</summary>

Die meisten Betriebsfehler passieren nicht innerhalb einer Rolle, sondern zwischen Rollen — an den Schnittstellen, wo Arbeit von einer verantwortlichen Person zur nächsten wandert. Die Übergaben zu benennen macht unsichtbare Abhängigkeiten überprüfbar und verhindert „Ich dachte, du hättest dich drum gekümmert"-Situationen.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Benennt für jedes Rollenpaar, das Arbeit weitergibt, die Übergabe und die Art der übertragenen Arbeit.

</details>

| Von | An | Übergabe |
|---|---|---|
| _<Rolle>_ | _<Rolle>_ | _<was übergeben wird>_ |
| _<Rolle>_ | _<Rolle>_ | _<...>_ |

## Belastungsgrenzen

*RCOS-Klauseln: [7.4.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.7.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Warum Belastungsgrenzen explizit machen?</summary>

Unbegrenzte Koordinationslast ist der Standard-Fehlermodus von Freiwilligengemeinschaften — sie brennt still die engagiertesten Mitglieder aus, bis sie gehen. Explizite, überprüfbare Grenzen machen Kapazität zu einer gemeinsamen Angelegenheit statt zu einer privaten Last.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Legt Grenzen für Sitzungsbelastung, Rollenbelastung, Reaktionszeit-Erwartungen und den Weg zur Neuverhandlung von Verantwortlichkeiten fest.

</details>

- **Sitzungsbelastung:** _<Wiederkehrender Sitzungsrhythmus und maximale Dauer; Regeln für außerordentliche Sitzungen.>_
- **Rollenbelastung:** _<Obergrenze falls vorhanden; Regel zur Überlastungsmeldung; Lösungsfrist.>_
- **Reaktionszeit-Erwartungen:** _<Nicht-dringend asynchron; dringend betrieblich; sicherheitskritisch.>_
- **Neuverhandlung und Entlastung:** _<Verfahren zur Umverteilung von Verantwortlichkeiten; Lösungsfrist.>_

## Betriebliche Kontinuität

*RCOS-Klauseln: [7.5.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity)*

<details data-kind="rationale">
<summary>Warum jetzt schon Kontinuität planen?</summary>

Eine Gemeinschaft, die von einer einzigen unersetzlichen Person abhängt, ist nur eine Krankheit, einen Konflikt oder einen Austritt vom Zusammenbruch entfernt. Die Single Points of Failure ehrlich zu benennen — und Übergaben in jede Rolle einzubauen — ist das, was die Gemeinschaft ihre Gründer:innen überleben lässt.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Benennt die aktuellen Single Points of Failure ehrlich. Haltet die Übergabe-Anforderungen pro Rolle und den Rhythmus der Kontinuitätsüberprüfung fest.

</details>

- **Aktueller Stand:** _<Ehrliche Auflistung der Single Points of Failure; Rekrutierungsplan zur Verringerung der Konzentration.>_
- **Übergabe-Mechanismen:** _<Verweis auf die Übergabe-Anforderungen pro Rolle im Rollenregister; Übergabe muss abgeschlossen sein, bevor eine Rolle aufgegeben wird.>_
- **Rhythmus der Kontinuitätsüberprüfung:** _<Vierteljährlich; ad hoc bei Rollenwechsel.>_

## Informationsfluss und Anti-Gatekeeping

*RCOS-Klauseln: [7.3.5](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.4](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.3.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Warum Informationszugang als Governance-Thema behandeln?</summary>

Wer den Zugang zu Informationen kontrolliert, kontrolliert die Gemeinschaft — ob beabsichtigt oder nicht. Zugriffsregeln explizit zu machen — und alleinige Zugangspunkte zu untersagen — verhindert, dass informelle Gatekeeper die Art von Macht ansammeln, die das Governance-System eigentlich kontrollieren soll.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Haltet fest, welche Unterlagen allen Vollmitgliedern zugänglich sind, wie lang die Antwortfrist für Informationsanfragen ist und welche Regel gegen alleinige Zugangspunkte für governance-relevante Informationen gilt.

</details>

- _<Governance-Entscheidungen sind für alle Vollmitglieder zugänglich.>_
- _<Sitzungsprotokolle werden innerhalb von X Stunden veröffentlicht.>_
- _<Mitgliedschaftsstatus und Rollenzuweisungen sind einsehbar.>_
- _<Beitragsnachweise sind einsehbar.>_
- _<Antwortfrist für Informationsanfragen.>_
- _<Das Zurückhalten von Informationen, auf die Mitglieder Anspruch haben, ist ein Rechenschaftsauslöser gemäß Schicht 4.>_
- _<Keine Rolle und keine Einzelperson darf der alleinige Zugangspunkt für Informationen sein, die andere Rolleninhaber:innen benötigen.>_

---

## Dokumentationsstandorte und Aktualisierungsverfahren

*RCOS-Klauseln: [7.3.1](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.2](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.3](https://blueprint.ecohubs.community/de/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Warum festhalten, wo jedes Dokument lebt?</summary>

Wenn niemand sagen kann, wo die kanonische Version von etwas liegt, gibt es keine kanonische Version. Für jeden Dokumenttyp den Ablageort, die verantwortliche Person und den Überprüfungsrhythmus zu benennen, macht das Gedächtnis der Gemeinschaft auditierbar statt folkloristisch.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Benennt für jeden Dokumenttyp den kanonischen Ablageort, die verantwortliche Person und den Überprüfungsrhythmus.

</details>

| Dokumenttyp | Ablageort | Verantwortlich | Überprüfungsrhythmus |
|---|---|---|---|
| _<RCOS-Artefakte>_ | _<Ablageort>_ | _<Verantwortlich>_ | _<Rhythmus>_ |
| _<Mitgliederregister>_ | _<Ablageort>_ | _<Verantwortlich>_ | _<Rhythmus>_ |
| _<Sitzungsprotokolle>_ | _<Ablageort>_ | _<Verantwortlich>_ | _<Rhythmus>_ |
| _<Governance-Anträge>_ | _<Ablageort>_ | _<Verantwortlich>_ | _<Rhythmus>_ |
| _<Beitragsnachweise>_ | _<Ablageort>_ | _<Verantwortlich>_ | _<Rhythmus>_ |

---

## Ratifizierungsnachweis

- **Angenommen:** <JJJJ-MM-TT>
- **Entscheidungstyp:** Strategisch
- **Version:** <Version>
- **Entscheidungsnachweis:** <Link zum Entscheidungsnachweis>
