---
id: 1afbg1a7
title: Privatisierung von Gemeingütern durch Landverkäufe
parentId: cbd2804b
order: 0
lang: de
sourceHash: 982f7873
---

**Fehlermodus**

Die Gemeinschaft verkauft Land an Mitglieder und untergräbt damit Austritts- und Verfassungsregeln.

**Betroffene Ebenen**

Schicht 0 (Geltungsbereich & Invarianten), Schicht 3 (Wirtschaft), Schicht 1 (Mitgliedschaft)

**Relevante Invarianten**

* 0.2 Explizit geregelter Geltungsbereich  
* 3.2 Schutz der Gemeingüter

* 1.2 Austritt muss möglich sein

**Testbedingung**

* Änderungen der Eigentumsverhältnisse widersprechen den deklarierten Invarianten.  
* Mitglieder können nicht austreten, ohne Rechte oder Eigentum zu verlieren.

**Erwartetes RCOS-Verhalten**

* Verkäufe müssen blockiert oder durch vorab festgelegte Regeln geregelt werden.  
* Austritts- und Weiterverkaufsbedingungen müssen *vor* der Übertragung existieren.

**Bestanden-Kriterien**

* Der Gemeingut-Status und die Austrittsrechte bleiben intakt.

**Nicht-bestanden-Kriterien**

* Die Gemeinschaft wird strukturell unverlassbar.
