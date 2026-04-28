---
id: c2d42a76
title: Anhang C — Zusammenfassung der Referenzimplementierung
parentId: e6de7a5d
order: 140
lang: de
sourceHash: e8faac9d
---

Dieser Anhang definiert eine **empfohlene Dokumentationsstruktur** für Gemeinschaften, die sich als RCOS-Referenzimplementierungen präsentieren möchten. Ziel ist es, die Übernahme überprüfbar, vergleichbar und lernbar zu machen, ohne eine Befürwortung zu implizieren.

## C.1 Gemeinschaftskontext

- Name und Standort
- Größe und Umfang (z. B. 12 Mitglieder; 3 Haushalte; 25 Hektar)
- Hauptzweck (Layer 0)
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
| 0 | Purpose Charter; Scope Declaration; Invariants Register | [Platzhalter] | v0.3 / 2026-01-01 | Zweck stabil; Invarianten werden vierteljährlich überprüft |
| 1 | Membership Agreement; Onboarding Protocol; Exit & Separation Protocol; Membership State Registry | [Platzhalter] | v1.1 / 2026-02-15 | Probezeit beträgt 3 Monate |
| 2 | Decision Matrix; Governance Protocol; Authority Registry | [Platzhalter] | v0.8 / 2026-03-10 | Konsent für operative, Abstimmung für strategische Entscheidungen |
| 3 | Internal Economy Protocol; Treasury Ruleset | [Platzhalter] | v0.5 / 2026-03-20 | Monatliche Kassenberichte werden veröffentlicht |
| 4 | Conflict Resolution Ladder; Accountability Protocol | [Platzhalter] | v0.6 / 2026-04-01 | Anti-Vergeltungsrichtlinie enthalten |
| 5 | Operations Manual; Role Registry; Meeting Templates | [Platzhalter] | v0.4 / 2026-04-15 | Sitzungsbelastung auf 4 Std./Woche begrenzt |
| 6 | Change Protocol; Version History; Learning Log | [Platzhalter] | v0.2 / 2026-05-01 | Experimente verfallen, wenn nicht erneuert |

## C.4 Governance und Weiterentwicklung

- Verwendete Entscheidungsmechanismen (mit Auszug aus der Decision Matrix oder Link)
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
| Purpose Charter | 0 | [Platzhalter] | 2026-01-01 | |
| Decision Matrix | 2 | [Platzhalter] | 2026-03-10 | |
| Kassenberichte | 3 | [Platzhalter] | 2026-06-30 | monatlich |
| Learning Log | 6 | [Platzhalter] | 2026-06-15 | Schwärzungen vermerkt |

- Kontakt- oder Anfragekanal
- Ausdrückliche Erklärung, was privat vs. öffentlich ist und warum
- Link zur aktuell verwendeten RCOS-Core-Version und zum Änderungsprotokoll
- Kontakt- oder Anfragekanal  

---

## Informationshinweis

Referenzimplementierungen sind Lerninstrumente, keine Befürwortungen.
