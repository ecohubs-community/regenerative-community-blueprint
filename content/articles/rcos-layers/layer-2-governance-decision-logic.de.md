---
id: a145ff34
title: Schicht 2 – Governance & Entscheidungslogik
parentId: a7759be1
order: 0
lang: de
sourceHash: d525d69f
---

**Wie Entscheidungen getroffen, geändert und durchgesetzt werden.**

### **Entscheidungstypen**

* **Operativ**
  Alltagsentscheidungen; umkehrbar; geringes Risiko.
* **Strategisch**
  Mittelfristige Ausrichtung; Ressourcenverteilung; teilweise umkehrbar.
* **Konstitutionell**
  Änderungen an Kernregeln, Zweck oder Invarianten; hohe Schwelle.

### **Mechanismen**

Wie eine Entscheidung getroffen wird.
**Zweck:** Entscheidungsrisiko und Entscheidungsmethode aufeinander abstimmen.

* Konsent (kein begründeter Einwand)
* Abstimmung (Mehrheit / qualifizierte Mehrheit)
* Delegation (rollenbasierte Befugnis)
* Vorschlag + Prüfung + Annahme

### **Befugnisgrenzen**

Wer entscheiden darf.
**Zweck:** Entscheidungslähmung und Machtdiffusion vermeiden.

* **Einzelperson** – Autonomie innerhalb der Rolle
* **Rolle** – definierte Verantwortlichkeiten
* **Kreis / Domäne** – abgegrenzte Befugnis
* **Gesamte Gemeinschaft** – konstitutionelle Angelegenheiten

### **Artefakte**

* Entscheidungsmatrix
  * Verhindert Streit darüber, *wie* entschieden wird
  * Macht Befugnisse explizit
  * Reduziert emotionale Eskalation
* Governance-Protokoll (kurzes Regelwerk)
  * Entscheidungstypen & Schwellenwerte
  * Rollen und Domänen
  * Lebenszyklus eines Vorschlags
  * Eskalations- und Einspruchswege
  * Notfallbefugnisse (falls vorhanden)

### **Schicht-Invarianten**

* **Invariante 2.1: Entscheidungstyp geht vor Entscheidungsinhalt**
  Wie eine Entscheidung getroffen wird, muss vereinbart sein, *bevor* festgelegt wird, was entschieden wird.
* **Invariante 2.2: Befugnisse müssen explizit sein**
  Niemand darf Entscheidungsmacht ausüben ohne eine definierte Rolle, ein Mandat oder Konsent.
* **Invariante 2.3: Konstitutionelle Regeln stehen über allen anderen**
  Operative oder strategische Entscheidungen können konstitutionelle Vereinbarungen nicht außer Kraft setzen.
* **Invariante 2.4: Entscheidungen sind überprüfbar**
  Alle Entscheidungen müssen auf ihre Befugnis, Methode und Dokumentation zurückführbar sein.

### **Explizierungsregeln**

#### **MUST explizit sein**

* Entscheidungstypen (operativ / strategisch / konstitutionell)
* Wer was entscheidet (Befugnisgrenzen)
* Entscheidungsmechanismen und Schwellenwerte
* Eskalationswege

**Warum:** Unklarheit in der Governance bedeutet informelle Hierarchie.

#### **MAY explizit sein**

* Moderationsstil bei Treffen
* Vorlagen für Vorschläge
* Notfallverfahren

#### **MUST optional bleiben**

* Governance-Philosophie (Konsens vs. Soziokratie usw.)
* Emotionaler Ton bei Treffen
