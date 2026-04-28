---
id: b6d4e7f9
title: Mitgliedschaftsstatus-Register
parentId: 2c750c19
order: 3
lang: de
sourceHash: b23f1b91
---

- **Ebene:** 1 — Mitgliedschaftssystem
- **Status:** Vorlage — an eure Gemeinschaft anpassen
- **RCOS-Referenz:** [§3.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [§3.8](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Definierte Mitgliedschaftsstatus

*RCOS-Klauseln: [3.1.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>Warum eine einzige Statustabelle?</summary>

Rechte und Pflichten, die über verschiedene Dokumente verstreut sind, driften auseinander. Alle Status, ihre Rechte, Pflichten und Übergänge in einer Tabelle zu sammeln, macht das Mitgliedschaftssystem auf einen Blick überprüfbar — ihr seht jede Tür in die und aus der Gemeinschaft und was jede davon gewährt. Falls zwei Dokumente jemals widersprüchlich sind, ist dieses Register der Schiedsrichter.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Definiert jeden Mitgliedschaftsstatus, den eure Gemeinschaft anerkennt (z. B. Bewerber·in, Probemitglied, Vollmitglied, Ausgetretenes Mitglied). Listet für jeden Status Rechte, Pflichten, Eintrittsbedingung und Austrittsbedingung auf. Haltet die Status gegenseitig ausschließend — keine Person darf zwei Status gleichzeitig innehaben.

</details>

| Status | Rechte | Pflichten | Eintrittsbedingung | Austrittsbedingung |
|---|---|---|---|---|
| _<Status 1, z. B. Bewerber·in>_ | _<Rechte>_ | _<Pflichten>_ | _<Eintritt>_ | _<Austritt>_ |
| _<Status 2, z. B. Probemitglied>_ | _<Rechte>_ | _<Pflichten>_ | _<Eintritt>_ | _<Austritt>_ |
| _<Status 3, z. B. Vollmitglied>_ | _<Rechte>_ | _<Pflichten>_ | _<Eintritt>_ | _<Austritt>_ |
| _<Status 4, z. B. Ausgetretenes Mitglied>_ | _<Rechte>_ | _<Pflichten>_ | _<Eintritt>_ | _<Austritt>_ |

> Keine Person darf mehrere Mitgliedschaftsstatus gleichzeitig innehaben.
> Keine Rechte oder Pflichten dürfen außerhalb des aktuellen Mitgliedschaftsstatus der Person angenommen werden.

## Technische Hinweise

<details data-kind="rationale">
<summary>Warum Daten nach dem Austritt aufbewahren?</summary>

Die Geschichte der Gemeinschaft gehört der Gemeinschaft, nicht einem einzelnen Konto. Beitragsaufzeichnungen nach dem Austritt beizubehalten schützt die Integrität von Prüfpfaden, Governance-Historien und Anerkennungsbuchhaltung — während das Entziehen des Zugangs und das Entfernen der Person aus aktiven Auflistungen die Endgültigkeit ihres Ausscheidens respektiert.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Beschreibt, welche Aufzeichnungen nach dem Austritt erhalten bleiben, wo Statuszuweisungen operativ nachverfolgt werden und wie der Zugangsentzug mit den Plattform-Funktionen zusammenwirkt.

</details>

- _<Beitrags- und Governance-Historie wird nach dem Austritt aufbewahrt; beschreibt die Aufbewahrungsrichtlinie.>_
- _<Ausgetretene Mitglieder werden aus den aktiven Mitgliederlisten entfernt; beschreibt den Zugangsentzug pro Plattform.>_
- _<Operativer Speicherort der Statuszuweisungen — siehe „Aktuelle Mitgliederliste" unten.>_

## Aktuelle Mitgliederliste

*RCOS-Klauseln: [3.8.2](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>Warum Definition und Liste trennen?</summary>

Dieses Dokument definiert, was die Status bedeuten; das aktive Register verfolgt, wer sich heute in welchem Status befindet. Beides getrennt zu halten bedeutet, dass die Definitionen stabil und steuerbar bleiben, während die Zuweisungen aktuell sind — und niemand ein ratifiziertes Artefakt ändern muss, wenn ein Mitglied beitritt oder austritt.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Verlinkt auf das operative System oder Dokument, in dem die aktuellen Mitglied-zu-Status-Zuweisungen nachverfolgt werden. Dieses Artefakt sollte nicht jedes Mal geändert werden müssen, wenn ein Mitglied beitritt oder austritt.

</details>

> Die aktive Mitgliederliste wird in _<System / Speicherort>_ gepflegt. Dieses Dokument definiert die Status; das Register-Tool enthält die aktuellen Zuweisungen.

_<Link oder Speicherort des aktiven Mitgliederverzeichnisses.>_

---

## Ratifizierungsprotokoll

- **Angenommen:** <JJJJ-MM-TT>
- **Entscheidungstyp:** Strategisch
- **Version:** <Version>
- **Entscheidungsprotokoll:** <Link zum Entscheidungsprotokoll>
