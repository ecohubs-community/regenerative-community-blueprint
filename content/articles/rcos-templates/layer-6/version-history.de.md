---
id: 4c8e6d5b
title: Versionshistorie
parentId: e676f693
order: 1
lang: de
sourceHash: abe5a1e4
---

- **Schicht:** 6 — Evolution & Anpassung
- **Status:** Vorlage — an eure Gemeinschaft anpassen; wird bei jeder übernommenen Änderung aktualisiert
- **RCOS-Referenz:** [§8.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [§8.6](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Das maßgebliche, menschenlesbare Protokoll aller übernommenen Änderungen an der RCOS-Implementierung eurer Gemeinschaft. Die aktuell gültige Version ist der neueste Eintrag am Anfang dieser Datei. Abgelöste Regeln bleiben über die Versionskontrolle zugänglich.

---

## Eintragsformat

*RCOS-Klauseln: [8.2.1](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.3](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.4](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.2](/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Warum jede übernommene Änderung festhalten?</summary>

Governance, die nicht auf „was hat sich wann und warum geändert" verweisen kann, ist nicht von Governance durch diejenigen zu unterscheiden, die am lautesten reden. Ein einziges, nur fortschreibbares Protokoll übernommener Änderungen — wobei die abgelösten Versionen in der Versionskontrolle erhalten bleiben — macht den aktuellen Stand der Regeln eindeutig und gibt Mitgliedern, Prüfenden und zukünftigen Verantwortlichen die Möglichkeit, den Weg nachzuvollziehen, der uns hierhergeführt hat.

</details>

<details data-kind="instructions">
<summary>Wie ihr das ausfüllt</summary>

Nutzt die Eintragsvorlage unten für jede übernommene Änderung. Neue Einträge werden über dem jeweils neuesten eingefügt. Ändert keine historischen Einträge — Korrekturen werden als neue Einträge erfasst.

</details>

```markdown
## <Version> — <Kurztitel>

- **Gültig ab:** <JJJJ-MM-TT>
- **Entscheidungsprotokoll:** <Link zum Entscheidungsprotokoll>
- **Entscheidungstyp:** <Operativ / Strategisch / Konstitutionell>
- **Mechanismus:** <Abstimmungsverfahren / delegierte Befugnis>
- **Zusammenfassung:** <Ein bis drei Sätze, die beschreiben, was sich geändert hat.>
- **Betroffene Schichten:** <z. B. Schicht 2, Schicht 5>
- **Geänderte Artefakte:** <Liste der Artefakte>
- **Migrationshinweise:** <etwaige Übergangsregeln; „keine", wenn nicht zutreffend>
```

---

## Aktuelle Version: v0.0 — Repository initialisiert

- **Gültig ab:** <JJJJ-MM-TT>
- **Entscheidungsprotokoll:** Entfällt — initiales Grundgerüst
- **Entscheidungstyp:** Entfällt
- **Mechanismus:** Entfällt
- **Zusammenfassung:** Vorlagen initialisiert. Alle Artefakte sind Vorlagen — es wurden noch keine Regeln übernommen.
- **Betroffene Schichten:** Alle (nur Grundgerüst)
- **Geänderte Artefakte:** Alle Dateien als Vorlagen erstellt
- **Migrationshinweise:** Keine — Ausgangszustand

---

_Neue Einträge werden oberhalb dieser Zeile eingefügt._
