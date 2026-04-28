---
id: 4ffa600f
title: 8. Layer 6 — Evolution & Anpassung
parentId: e6de7a5d
order: 80
lang: de
sourceHash: 1329c3d9
---

Layer 6 definiert, wie sich das System weiterentwickelt, ohne zu kollabieren.  
Sein Zweck ist sicherzustellen, dass Veränderung bewusst, eingegrenzt, wo angemessen reversibel ist und Erkenntnisse statt versteckter Schäden hervorbringt. Evolution unter RCOS wird als gesteuerter Prozess behandelt, nicht als Improvisation.

## 8.1 Änderungsmechanismen

8.1.1 Die Gemeinschaft MUSS explizite Änderungsmechanismen für das Modifizieren, Hinzufügen, Aussetzen oder Entfernen von Regeln, Rollen, Artefakten oder Entscheidungsstrukturen definieren.

8.1.2 Änderungsmechanismen MUSS explizit unterscheiden zwischen:
- Dauerhaften Regeländerungen  
- Zeitlich begrenzten Experimenten gemäß Abschnitt 8.3  

8.1.3 Jede vorgeschlagene Änderung MUSS mindestens folgendes angeben:
- Die betroffenen Artefakte, Layer und Abschnitte  
- Den Entscheidungstyp und den autorisierten Entscheidungspfad gemäß Layer 2  
- Die beabsichtigte Wirkung, den Geltungsbereich und bekannte Risiken  
- Das Inkrafttretungsdatum und etwaige Übergangsfristen  
- Migrationsanforderungen für bestehende Rollen, Vereinbarungen oder Aufzeichnungen  

8.1.4 Änderungen, die den Zweck, den Geltungsbereich, die Invarianten oder die Identitätsbeschränkungen von Layer 0 betreffen, MUSS als konstitutionelle Änderungen klassifiziert werden und MUSS dem konstitutionellen Entscheidungsmechanismus folgen.

8.1.5 Die Gemeinschaft MUSS explizite Überprüfungsmechanismen für angenommene Änderungen definieren, einschließlich wie Änderungen bewertet, überarbeitet oder rückgängig gemacht werden, wenn sie Schaden, Instabilität oder unbeabsichtigte Machtkonzentration verursachen.

## 8.2 Versionierung und Autorität

8.2.1 Alle angenommenen Änderungen MUSS versioniert und nachvollziehbar sein.

8.2.2 Die Gemeinschaft MUSS eine **Versionshistorie** führen, die mindestens folgendes dokumentiert:
- Versionskennung  
- Annahmedatum und Inkrafttretungsdatum  
- Referenz zum Entscheidungsprotokoll (Autorität, Mechanismus, Schwellenwert)  
- Zusammenfassung der Änderungen  
- Migrationshinweise und Kompatibilitätsbeschränkungen (falls vorhanden)  

8.2.3 Zu jedem Zeitpunkt MUSS die Gemeinschaft eindeutig feststellen können:
- Welche Version derzeit in Kraft ist  
- Welche Artefakte für die Konformität maßgeblich sind  

8.2.4 Abgelöste Regeln MUSS zusammen mit den Zeiträumen, in denen sie galten, für Prüfbarkeit, Lernen und Streitbeilegung zugänglich bleiben.

8.2.5 Keine informellen, undokumentierten oder „stillschweigend verstandenen" Regeländerungen KANN als gültig betrachtet werden.

## 8.3 Experimente

8.3.1 Die Gemeinschaft KANN Experimente als ausdrücklich zeitlich begrenzte und reversible Abweichungen, Erweiterungen oder Pilotprojekte zum Zweck des Lernens einführen.

8.3.2 Jedes Experiment MUSS mindestens folgendes definieren:
- Geltungsbereich (was geändert wird und was ausdrücklich nicht geändert wird)  
- Dauer und Überprüfungszeitpunkte  
- Erfolgs- und Misserfolgskriterien  
- Rollback-Bedingungen und Rollback-Prozess  
- Autorisierter Entscheidungspfad für das Starten, Verlängern, Ändern oder Beenden des Experiments  

8.3.3 Experimente DARF NICHT die Invarianten von Layer 0 außer Kraft setzen und DARF NICHT die in Layer 2 definierten Governance-Beschränkungen umgehen.

8.3.4 Experimente MUSS in allen betroffenen Artefakten ausdrücklich als experimentell gekennzeichnet sein und MUSS ein nicht verlängerbares Ablaufdatum enthalten, sofern sie nicht durch eine autorisierte Entscheidung erneuert werden.

8.3.5 Wenn ein Experiment Sicherheitsrisiken, Zwang oder anhaltenden Schaden verursacht, MUSS die Gemeinschaft das Experiment unverzüglich durch eine Schutzmaßnahme aussetzen oder beenden, gefolgt von einer nachträglichen Überprüfung.

## 8.4 Lernen und Feedback-Erfassung

8.4.1 Größere Fehlschläge, Anpassungen, Rücknahmen und systemische Erkenntnisse MUSS dokumentiert werden.

8.4.2 Die Lernerfassung MUSS mindestens folgendes beinhalten:
- Was geschah und warum es relevant war  
- Welche Layer, Regeln oder Artefakte betroffen waren  
- Was geändert, versucht oder gestoppt wurde  
- Welche Signale, Nachweise oder Schwellenwerte eine Handlung ausgelöst haben  

8.4.3 Lernaufzeichnungen MUSS gemäß den Informationszugangsregeln von Layer 5 zugänglich sein.

8.4.4 Wiederkehrende Fehlermuster MUSS eine strukturelle Überprüfung auslösen, keine individuelle Schuldzuweisung.

## 8.5 Änderungssicherheit und Reversibilität

8.5.1 Das System MUSS wo möglich reversible Änderungen gegenüber irreversiblen bevorzugen.

8.5.2 Irreversible oder folgenschwere Änderungen MUSS beinhalten:
- Verlängerte Beratungs- oder Überprüfungszeiträume  
- Höhere Entscheidungsschwellen, wo angemessen  
- Ausdrückliche Risikoanerkennung  

8.5.3 Notfalländerungen KANN nur dort zulässig sein, wo sie ausdrücklich definiert sind, MUSS zeitlich begrenzt sein, DARF NICHT die Invarianten von Layer 0 außer Kraft setzen und MUSS einer verpflichtenden nachträglichen Überprüfung und Ratifizierung oder Rücknahme unterzogen werden.

## 8.6 Artefakte

8.6.1 Die folgenden Artefakte sind für die Konformität mit Layer 6 verpflichtend:
- Änderungsprotokoll  
- Versionshistorie  
- Lernprotokoll  

8.6.2 Artefakte von Layer 6 MUSS:
- Explizit und eindeutig sein  
- Versioniert sein  
- Für alle Mitglieder zugänglich sein, mit klar abgegrenztem Datenschutz  
- Durch einen autorisierten Governance-Prozess angenommen sein  

8.6.3 Das Änderungsprotokoll MUSS mindestens folgendes definieren:
- Wie Änderungen vorgeschlagen, überprüft, angenommen, veröffentlicht und abgelehnt werden  
- Wie Vorschläge nach Entscheidungstyp klassifiziert werden  
- Erforderliche Inhalte von Änderungsvorschlägen  
- Übergangs-, Migrations- und Abkündigungserwartungen  
- Überprüfungs-, Überarbeitungs- und Rollback-Mechanismen  
- Notfalländerungsbestimmungen, einschließlich strikter Zeitbegrenzung und verpflichtender Überprüfung  

8.6.4 Die Versionshistorie MUSS definieren:
- Die maßgebliche Struktur für Versionskennungen und Änderungsprotokolle  
- Wie abgelöste Versionen aufbewahrt und abgerufen werden  
- Wie die derzeit aktive Version bestimmt wird  

8.6.5 Das Lernprotokoll MUSS definieren:
- Was ein lernrelevantes Ereignis darstellt  
- Dokumentationsformat und Zuständigkeit  
- Überprüfungs- und Synthese-Rhythmus  

## 8.7 Layer-Invarianten

8.7.1 Veränderung MUSS möglich, aber eingegrenzt sein; keine Änderung KANN augenblicklich, implizit oder unüberprüfbar sein.

8.7.2 Alle angenommenen Änderungen MUSS versioniert, dokumentiert und nachvollziehbar sein.

8.7.3 Experimente MUSS zeitlich begrenzt, ausdrücklich gekennzeichnet und reversibel sein.

8.7.4 Größere Fehlschläge und Anpassungen MUSS als gemeinsames Lernen festgehalten werden, nicht ausradiert oder versteckt.

## 8.8 Explizitätsregeln

8.8.1 Folgendes MUSS explizit sein:
- Wie sich Regeln ändern und wer entscheidet  
- Versionierung, Autorität und Überprüfungsprozesse  
- Geltungsbereich, Dauer und Rollback-Bedingungen von Experimenten  
- Bedingungen und Grenzen für Notfalländerungen  

8.8.2 Folgendes KANN explizit sein:
- Überprüfungshäufigkeit und -rhythmus  
- Auslaufklauseln  
- Feedback- und Wahrnehmungsmethoden  

8.8.3 Folgendes MUSS optional und außerhalb des Geltungsbereichs bleiben:
- Innovationsgeschwindigkeit  
- Kulturelle Haltungen gegenüber Risiko innerhalb definierter Grenzen
