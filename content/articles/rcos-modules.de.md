---
id: 2c71be9d
title: RCOS-Module
parentId: null
order: 0
lang: de
sourceHash: c0facbac
---

## Module

Module sind optionale, domänenspezifische Erweiterungen des RCOS-Kerns. Sie ermöglichen es Gemeinschaften, dort Struktur hinzuzufügen, wo sie gebraucht wird — ohne das Kernsystem zu überladen oder Einheitlichkeit über verschiedene Kontexte hinweg zu erzwingen.

RCOS ist in seinem Kern bewusst minimal gehalten. Module existieren, um Vielfalt in Zweck, Größe, Ökologie, Kultur und Praxis zu unterstützen und gleichzeitig ein gemeinsames strukturelles Fundament zu bewahren.

### Was Module sind

Module sind:
- Optionale Erweiterungen des RCOS-Kerns
- Explizit eingeführt und dokumentiert
- Auf bestimmte Domänen oder Praktiken begrenzt
- Kompatibel mit der RCOS-Konformität
- So gestaltet, dass sie kombinierbar und entfernbar sind

Ein Modul kann einführen:
- Zusätzliche Regeln oder Einschränkungen
- Neue Artefakte oder Register
- Spezialisierte Rollen oder Entscheidungsbereiche
- Zusätzliche Schutzmaßnahmen oder Invarianten innerhalb seines Geltungsbereichs

### Was Module nicht sind

Module sind nicht:
- Voraussetzung für RCOS-Core-Konformität
- Implizite Erwartungen oder Normen
- Versteckte Governance-Ebenen
- Universelle Best Practices
- Ersatz für die RCOS-Core-Schichten

Wenn ein Modul nicht explizit eingeführt wurde, MUST NOT davon ausgegangen werden, dass es gilt.

### Beziehung zum RCOS-Kern

Module:
- MUST NOT dem Zweck, Geltungsbereich oder den Invarianten von Schicht 0 widersprechen
- MUST die in Schicht 2 definierten Governance-Einschränkungen einhalten
- MUST sich in bestehende Artefakte und Entscheidungsmechanismen integrieren
- MAY Regeln in den Schichten 3–6 innerhalb ihres deklarierten Geltungsbereichs erweitern oder spezialisieren

Module können Kern-Invarianten nicht außer Kraft setzen. Wo ein Modul strengere Regeln einführt, gelten diese nur innerhalb der deklarierten Domäne des Moduls.

### Für wen Module gedacht sind

Module sind gedacht für:
- Gemeinschaften mit spezifischen operativen oder ökologischen Bedürfnissen
- Projekte, die in einem Bereich zusätzliche Struktur benötigen
- Gemeinschaften in unterschiedlichen Reifestadien
- Gruppen, die unter sicheren, abgegrenzten Bedingungen experimentieren

Module ermöglichen es:
- Kleinen Gemeinschaften, einfach zu bleiben
- Komplexen Gemeinschaften, schrittweise Struktur hinzuzufügen
- Vielfältigen Gemeinschaften, interoperabel zu bleiben

### Wann Module angewendet werden sollten

Ein Modul SHOULD in Betracht gezogen werden, wenn:
- Eine Domäne für das Überleben oder die Identität der Gemeinschaft entscheidend wird
- Informelle Praktiken beginnen, Mehrdeutigkeit oder Machtungleichgewicht zu erzeugen
- Wiederholt Konflikte in einem bestimmten Bereich auftreten
- Externe Systeme (rechtliche, ökologische, finanzielle) Risiken einführen
- Die Gemeinschaft genug Kapazität und Stabilität gewinnt, um mehr Struktur zu tragen

Ein Modul SHOULD NOT angewendet werden:
- Um ungelöste Kernprobleme der Governance zu kompensieren
- Um Werte ohne ausdrückliche Zustimmung durchzusetzen
- Als Ersatz für Konfliktlösung
- Wenn die Gemeinschaft nicht die Kapazität hat, es aufrechtzuerhalten

### Wie Module angewendet werden

Um ein Modul anzuwenden, MUST eine Gemeinschaft:
- Das Modul explizit durch eine autorisierte Entscheidung einführen
- Den Geltungsbereich und die Schnittstellen des Moduls deklarieren
- Erforderliche Artefakte erstellen oder übernehmen
- Verantwortung für Pflege und Wartung zuweisen
- Dokumentieren, wie das Modul mit bestehenden Regeln zusammenwirkt

Module MAY:
- Zeitlich begrenzt sein
- Experimentell sein
- Schrittweise eingeführt werden
- Teilweise implementiert sein, sofern dies explizit definiert ist

### Modullebenszyklus

Module folgen denselben Entwicklungsregeln wie der Kern:
- Einführung durch formale Governance
- Versionierung und Dokumentation
- Regelmäßige Überprüfung
- Änderung oder Entfernung durch definierte Änderungsprozesse

Ein Modul MAY entfernt werden, wenn:
- Seine Domäne nicht mehr relevant ist
- Es unverhältnismäßigen Aufwand verursacht
- Es im Widerspruch zu aktualisierten Kernregeln steht
- Die Gemeinschaft sich ausdrücklich für Vereinfachung entscheidet

### Gestaltungsprinzip

Module existieren, um eine Frage zu beantworten:

> „Wo brauchen wir mehr Struktur, als der Kern bietet — und warum?"

Sie ermöglichen es Gemeinschaften, **an Fähigkeit zu wachsen, ohne ins Chaos zu wachsen**, während der RCOS-Kern stabil, minimal und interoperabel bleibt.
