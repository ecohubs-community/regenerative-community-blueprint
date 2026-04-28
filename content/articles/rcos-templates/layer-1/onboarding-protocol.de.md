---
id: 8f3a5c21
title: Onboarding-Protokoll
parentId: 2c750c19
order: 1
lang: de
sourceHash: 26afe576
---

- **Schicht:** 1 — Mitgliedschaftssystem
- **Status:** Vorlage — an deine Gemeinschaft anpassen
- **RCOS-Referenz:** [§3.2](/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [§3.3](/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [§3.8](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Aufnahmekriterien

*RCOS-Klauseln: [3.2.3](/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [3.2.4](/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding)*

<details data-kind="rationale">
<summary>Warum festhalten, wer aufgenommen wird?</summary>

Die Aufnahme ist der Moment, in dem eine fremde Person an die Regeln der Gemeinschaft gebunden — und durch sie geschützt — wird. Wenn die Kriterien informell sind, hängt die Entscheidung davon ab, wer die bewerbende Person zufällig sympathisch findet. Schriftliche Kriterien machen die Aufnahme zu einem Governance-Akt statt zu einem sozialen Gefallen und machen eine Ablehnung mit Gründen vertretbar, auf die die Gemeinschaft verweisen kann.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Formuliere die expliziten Bedingungen, unter denen eine bewerbende Person aufgenommen werden kann. Jedes Kriterium sollte anhand der Bewerbung selbst oder einer externen Prüfung überprüfbar sein.

</details>

1. _<Kriterium 1, z. B. Übereinstimmung mit dem Hauptzweck und den Identitätsbeschränkungen aus Schicht 0.>_
2. _<Kriterium 2, z. B. Bereitschaft, in mindestens einer anerkannten Kategorie aktiv beizutragen.>_
3. _<Kriterium 3, z. B. kein erzwungener Austritt oder Ablehnung innerhalb der letzten X Monate.>_
4. _<Kriterium 4, z. B. Bewerbungsformular in gutem Glauben ausgefüllt — keine Falschangaben.>_

## Onboarding-Schritte

*RCOS-Klauseln: [3.2.1](/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding), [3.2.2](/articles/rcos-core/v0-1/layer-1-membership-system#32-entry-and-onboarding)*

<details data-kind="rationale">
<summary>Warum den Prozess als feste Abfolge gestalten?</summary>

Zustimmung zu Governance bedeutet nur dann etwas, wenn das Mitglied die Governance tatsächlich gesehen hat. Eine feste Abfolge — Prüfung, Zustimmung, technisches Setup — stellt sicher, dass jedes Vollmitglied die gleiche Schwelle in der gleichen Reihenfolge überschritten hat, sodass niemand volle Rechte erhält, ohne die damit verbundenen Einschränkungen kennengelernt zu haben.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Liste die geordneten Schritte auf, die jedes neue Mitglied durchlaufen muss, um von der bewerbenden zur vollwertigen Person zu werden. Füge explizite Zustimmungsschritte und alle erforderlichen Werkzeug-/Zugangsbereitstellungen hinzu.

</details>

1. _<Schritt 1, z. B. alle Artefakte der Schichten 0–6 und dieses Onboarding-Protokoll durchsehen.>_
2. _<Schritt 2, z. B. der Mitgliedschaftsvereinbarung und den Identitätsbeschränkungen aus Schicht 0 ausdrücklich zustimmen.>_
3. _<Schritt 3, z. B. erforderliche Werkzeuge einrichten (Wallet, Konten, Identität).>_
4. _<Schritt 4, z. B. den mitgliederexklusiven Kommunikationskanälen beitreten.>_
5. _<Schritt 5, z. B. erforderliche Berechtigungen für die Governance-Teilnahme erhalten.>_
6. _<Schritt 6, z. B. Onboarding-Abschluss dokumentiert — Mitgliedschaftsstatus wechselt zu Vollmitglied.>_

## Anfänglicher Mitgliedschaftsstatus

*RCOS-Klauseln: [3.1.2](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>Warum am Ende des Onboardings einen Status zuweisen?</summary>

Zwischen „Bewerbung genehmigt" und „vollständig integriert" gibt es eine echte Lücke — Berechtigungen, Zugang und Erwartungen ändern sich. Wenn du den genauen Status festlegst, den ein neues Mitglied in jedem Schritt innehat, beseitigst du Unklarheiten darüber, was es gerade tun darf, und verhinderst unbeabsichtigte Rechtevergaben, bevor das Onboarding abgeschlossen ist.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Gib die Mitgliedschaftsstatus an, die ein Mitglied während des Onboardings durchläuft, und was jeden Übergang auslöst. Verweise auf das Mitgliedschaftsstatus-Register.

</details>

- Bei Genehmigung: _<z. B. Probemitglied.>_
- Bei Onboarding-Abschluss: _<z. B. Vollmitglied (automatisch bei Abschluss).>_

## Probezeit und Bewertung

*RCOS-Klauseln: [3.3.1](/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.2](/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.3](/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation), [3.3.4](/articles/rcos-core/v0-1/layer-1-membership-system#33-trial-and-evaluation)*

<details data-kind="rationale">
<summary>Warum die Probezeit begrenzen?</summary>

Eine unbegrenzte Probezeit ist eine Mitgliedschaft zweiter Klasse, die nie endet — alle Pflichten, weniger Rechte. Dauer, Kriterien und den Pfad bei Nichtbestehen festzulegen erzwingt einen Entscheidungspunkt: Entweder geht das neue Mitglied in den vollen Status über, oder ein definierter Austrittsprozess wird ausgelöst. Das verhindert, dass die Probezeit zu einem dauerhaften Wartezustand wird.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Lege Dauer, Bewertungskriterien, Übergangsentscheidung, Nachfrist, Pfad bei Nichtbestehen und etwaige Verlängerungsregeln fest. Proberechte werden im Mitgliedschaftsstatus-Register definiert.

</details>

- **Dauer:** _<z. B. 30 Tage ab Genehmigung.>_
- **Bewertungskriterien:** _<z. B. alle Onboarding-Schritte abgeschlossen und dokumentiert.>_
- **Übergangsentscheidung:** _<z. B. automatisch bei Abschluss; oder abstimmungsbasiert.>_
- **Nachfrist:** _<z. B. zusätzliche X Tage, falls Onboarding nicht rechtzeitig abgeschlossen.>_
- **Nichtabschluss:** _<z. B. Austrittsprozess wird automatisch nach Ablauf der Gesamtfrist ausgelöst.>_
- **Verlängerung:** _<z. B. einmalige X-Tage-Verlängerung auf Anfrage.>_
- **Rechte während der Probezeit:** _<Verweis auf das Mitgliedschaftsstatus-Register.>_
- **Wiederbewerb-Sperre:** _<z. B. Mitglieder, die wegen unvollständigem Onboarding ausgetreten sind, dürfen sich X Monate lang nicht erneut bewerben.>_

## Abschlussnachweis

*RCOS-Klauseln: [3.8.2](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>Warum den Nachweis dauerhaft aufbewahren?</summary>

Der Abschlussnachweis ist der Beleg dafür, dass ein Mitglied einer bestimmten Version der Regeln an einem bestimmten Datum zugestimmt hat. Ihn zu verlieren oder zu bearbeiten würde es unmöglich machen, Monate oder Jahre später die Frage zu beantworten: „Was genau hat die Person zugestimmt?" — und das ist die einzige Frage, die zählt, wenn ein Streitfall eintritt.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Gib an, wo der Abschlussnachweis aufbewahrt wird, was er erfasst (Zeitstempel, Versionen der zugestimmten Artefakte) und welche Aufbewahrungsregel gilt.

</details>

_<Beschreibung des Onboarding-Abschlussnachweises — wo er gespeichert ist, was er erfasst und dass er auch nach einem Austritt dauerhaft aufbewahrt wird.>_

---

## Ratifizierungsnachweis

- **Verabschiedet:** <JJJJ-MM-TT>
- **Entscheidungstyp:** Strategisch
- **Version:** <Version>
- **Entscheidungsnachweis:** <Link zum Entscheidungsnachweis>
