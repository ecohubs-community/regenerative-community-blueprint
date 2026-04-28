---
id: 6e32b102
title: Schicht 6 – Evolution & Anpassung
parentId: a7759be1
order: 0
lang: de
sourceHash: 9e7d7a30
---

**Wie sich das System verändert, ohne zusammenzubrechen.**

### **Veränderungsmechanismen**

* Vorschläge
* Experimente
* Überprüfungszyklen

### **Versionierung**

* Protokollversionen
* Migrationspfade

### **Lernerfassung**

* Retrospektiven
* Fehlerdokumentation

### **Artefakte**

* Change Protocol
* Version History

### **Layer-Invarianten**

* **Invariante 6.1: Veränderung ist möglich, aber eingehegt**
  Keine Systemkomponente ist für immer eingefroren, aber keine Änderung geschieht sofort.
* **Invariante 6.2: Änderungen sind versioniert**
  Regeländerungen müssen dokumentiert, datiert und nachvollziehbar sein.
* **Invariante 6.3: Experimente sind umkehrbar**
  Alle Experimente müssen Umfang, Dauer und Rollback-Bedingungen definieren.
* **Invariante 6.4: Lernen wird festgehalten**
  Größere Fehlschläge und Anpassungen müssen aufgezeichnet und zugänglich sein.

### **Explizitheit-Regeln**

#### **MUSS – muss explizit sein**

* Wie sich Regeln ändern
* Versionierung und Überprüfungsprozess
* Experimentgrenzen
* Rollback-Mechanismen

**Warum:** Systeme, die sich nicht verändern können, verrotten oder explodieren.

#### **KANN – kann explizit sein**

* Überprüfungsfrequenz
* Sunset-Klauseln
* Methoden zur Feedback-Erhebung

#### **MUSS – muss optional bleiben**

* Innovationstempo
* Risikobereitschaft (innerhalb der Grenzen)
