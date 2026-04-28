---
id: 9a3f7c1e
title: Lernprotokoll
parentId: e676f693
order: 2
lang: de
sourceHash: 620575c4
---

- **Schicht:** 6 — Evolution & Anpassung
- **Status:** Vorlage — an deine Gemeinschaft anpassen; wird aktualisiert, wenn lernrelevante Ereignisse eintreten
- **RCOS-Referenz:** [§8.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [§8.6](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Dokumentiert größere Fehler, Anpassungen, Rücknahmen und systemische Erkenntnisse. Wiederkehrende Fehlermuster müssen eine strukturelle Überprüfung auslösen, keine individuelle Schuldzuweisung. Einträge werden vorangestellt (neueste zuerst).

---

## Was ein lernrelevantes Ereignis ausmacht

*RCOS-Klauseln: [8.4.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Warum den Auslöser explizit definieren?</summary>

Wenn „daraus sollten wir lernen" dem individuellen Ermessen überlassen wird, sind die härtesten Lektionen — jene, die mit Konflikten, Scheitern oder Peinlichkeit verbunden sind — am ehesten diejenigen, die undokumentiert bleiben. Die konkreten Ereignisse zu benennen, die einen Eintrag erzeugen MÜSSEN, nimmt die Frage aus dem Moment heraus und stellt sicher, dass unbequeme Erkenntnisse festgehalten werden, anstatt stillschweigend unter den Tisch zu fallen.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Liste die konkreten Ereignisse auf, die einen Eintrag im Lernprotokoll verpflichtend machen. Benenne, wer das Protokoll pflegt, und den Rhythmus der Zusammenfassung.

</details>

Ein Eintrag MUSS erstellt werden, wenn eines der folgenden Ereignisse eintritt:

- _<Eine Governance-Entscheidung wird rückgängig gemacht, zurückgenommen oder steht im Widerspruch zu einer anderen verabschiedeten Regel.>_
- _<Ein Experiment wird abgeschlossen (Erfolg, Misserfolg oder vorzeitiger Abbruch).>_
- _<Ein Konflikt eskaliert bis zur Governance-Stufe der Konfliktlösungsleiter.>_
- _<Ein strukturelles oder systemisches Versagen wird identifiziert, das Schaden, Verwirrung oder wiederholten Prozesszusammenbruch verursacht hat.>_
- _<Eine wesentliche Anpassung der Gemeinschaftsabläufe wird verabschiedet, die die Funktionsweise einer Schicht erheblich verändert.>_
- _<Ein Beinahe-Vorfall: eine Situation, die erheblichen Schaden hätte verursachen können, aber rechtzeitig erkannt wurde.>_
- _<Jedes Ereignis, das die Gemeinschaft gemeinsam als lernwürdig einstuft.>_

_<Kleinere betriebliche Anpassungen, Routineentscheidungen und individuelle Probleme, die in den frühen Stufen der Konfliktlösungsleiter vollständig gelöst werden, erfordern keinen Eintrag im Lernprotokoll.>_

**Verantwortlichkeit:** _<Rolle, die dafür verantwortlich ist, dass Einträge erstellt und gepflegt werden.>_

**Zusammenfassungsrhythmus:** _<Das Lernprotokoll wird beim Reflexions- & Lerntreffen überprüft; die benannte Rolle bereitet eine kurze Zusammenfassung der Einträge seit der letzten Überprüfung vor und weist auf wiederkehrende Muster hin.>_

---

_Noch keine Einträge. Der erste Eintrag wird hinzugefügt, wenn das erste lernrelevante Ereignis eintritt._

---

## Eintragsformat

*RCOS-Klauseln: [8.4.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Warum eine feste Eintragsvorlage?</summary>

Freie Reflexion ist wertvoll, lässt sich aber nicht aggregieren. Ein einheitliches Schema — Auslöser, Signale, was sich geändert hat, Ergebnis, Verantwortliche*r für die Nachverfolgung — ermöglicht es, Einträge über Jahre hinweg nach wiederkehrenden Mustern zu durchsuchen und einzelne Vorfälle in strukturelle Erkenntnisse umzuwandeln. Es zwingt außerdem jeden Eintrag, eine verantwortliche Person zu benennen, damit Lernen nicht bei „wir haben es bemerkt" endet.

</details>

<details data-kind="instructions">
<summary>Wie du das ausfüllst</summary>

Verwende die unten stehende Vorlage für jeden Eintrag. Jedes Feld erzwingt einen anderen Blickwinkel auf das Ereignis; überspringe nicht die verantwortliche Person für die Nachverfolgung.

</details>

```markdown
## <JJJJ-MM-TT> — <Kurztitel>

- **Auslöser:** <Was ist passiert, das diesen Eintrag veranlasst hat>
- **Betroffene Schichten/Artefakte:** <z. B. Schicht 2 — Governance-Protokoll>
- **Was geschehen ist:** <Kurze Beschreibung>
- **Signale, die zum Handeln geführt haben:** <Woran das Problem sichtbar wurde>
- **Was geändert oder versucht wurde:** <Entscheidung, Experiment oder Regeländerung>
- **Ergebnis:** <Resultat nach Überprüfung, falls bekannt>
- **Verantwortliche*r für Nachverfolgung und Frist:** <Name / Rolle und Datum, oder „keine">
```
