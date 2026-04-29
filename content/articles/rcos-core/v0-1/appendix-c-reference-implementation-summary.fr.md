---
id: c2d42a76
title: Annexe C — Résumé de l'implémentation de référence
parentId: e6de7a5d
order: 140
lang: fr
sourceHash: e8faac9d
---

Cette annexe définit une **structure de documentation recommandée** pour les communautés qui souhaitent se présenter comme des implémentations de référence RCOS. L'objectif est de rendre l'adoption auditable, comparable et instructive sans impliquer une approbation.

## C.1 Contexte de la communauté

- Nom et localisation
- Taille et échelle (par ex., 12 membres ; 3 foyers ; 25 hectares)
- Objectif principal (Couche 0)
- Date de fondation et date d'adoption du RCOS (si différente)
- Forme(s) juridique(s) pertinente(s) (le cas échéant)
- Point de contact public

## C.2 Aperçu de l'adoption du RCOS

- Version de RCOS-Core utilisée
- Référence du procès-verbal de décision d'adoption (autorité, mécanisme, date)
- Résumé des modules optionnels adoptés (le cas échéant), incluant :
  - Nom et périmètre du module
  - Date d'adoption
  - Lien vers la spécification du module
  - Dépendances de couches déclarées

## C.3 Résumé couche par couche

Pour chaque couche (0–6) :
- Artefacts implémentés (avec liens)
- Écarts ou adaptations (avec liens)
- Défis connus et modes de défaillance rencontrés

Format recommandé :

| Couche | Artefacts requis implémentés | Lien(s) public(s) | Version/date | Notes |
|---:|---|---|---|---|
| 0 | Charte de raison d'être ; Déclaration de périmètre ; Registre des invariants | [placeholder] | v0.3 / 2026-01-01 | Raison d'être stable ; invariants révisés trimestriellement |
| 1 | Accord d'adhésion ; Protocole d'intégration ; Protocole de sortie et de séparation ; Registre des statuts d'adhésion | [placeholder] | v1.1 / 2026-02-15 | La période d'essai est de 3 mois |
| 2 | Matrice de décision ; Protocole de gouvernance ; Registre des autorités | [placeholder] | v0.8 / 2026-03-10 | Consentement pour les opérations, vote pour le stratégique |
| 3 | Protocole d'économie interne ; Règlement de trésorerie | [placeholder] | v0.5 / 2026-03-20 | Rapports de trésorerie mensuels publiés |
| 4 | Échelle de résolution des conflits ; Protocole de redevabilité | [placeholder] | v0.6 / 2026-04-01 | Politique anti-représailles incluse |
| 5 | Manuel opérationnel ; Registre des rôles ; Modèles de réunion | [placeholder] | v0.4 / 2026-04-15 | Charge de réunion plafonnée à 4h/semaine |
| 6 | Protocole de changement ; Historique des versions ; Journal d'apprentissage | [placeholder] | v0.2 / 2026-05-01 | Les expérimentations expirent si elles ne sont pas renouvelées |

## C.4 Gouvernance et évolution

- Mécanismes de décision en usage (avec extrait de la matrice de décision ou lien)
- Historique des changements et expérimentations (avec liens vers les procès-verbaux de changement)
- Principaux apprentissages et échecs (avec liens vers les entrées du journal d'apprentissage)
- Registre des écarts (recommandé) :

| Élément | Couche(s) | Type | Statut | Début | Révision/Fin | Lien |
|---|---|---|---|---|---|---|
| Essai de facilitation tournante | 5 | Expérimentation | Actif | 2026-06-01 | 2026-08-01 | [placeholder] |
| Exception de transparence de trésorerie (sécurité) | 3/4 | Permanent | Actif | 2026-04-10 | Révision annuelle | [placeholder] |


## C.5 Déclaration de conformité
- Statut de conformité actuel : Conforme / Non conforme / Inconnu
- Date du dernier auto-audit ou audit externe
- Méthode d'audit (auto-audit vs externe)
- Périodes de non-conformité connues (le cas échéant) et résumé des mesures correctives
- Liens de preuves (recommandé) :

| Preuve | Date | Lien |
|---|---:|---|
| Résultat de la checklist couche par couche | 2026-07-01 | [placeholder] |
| Notes / conclusions d'audit | 2026-07-01 | [placeholder] |
| Journal des mesures correctives | 2026-07-15 | [placeholder] |
- Périodes de non-conformité connues (le cas échéant)  

## C.6 Transparence publique
- Index des artefacts publics (recommandé) :

| Artefact | Couche | Lien public | Version/date | Notes |
|---|---:|---|---:|---|
| Charte de raison d'être | 0 | [placeholder] | 2026-01-01 | |
| Matrice de décision | 2 | [placeholder] | 2026-03-10 | |
| Rapports de trésorerie | 3 | [placeholder] | 2026-06-30 | mensuel |
| Journal d'apprentissage | 6 | [placeholder] | 2026-06-15 | caviardages signalés |

- Canal de contact ou de demande de renseignements
- Déclaration explicite de ce qui est privé et public, et pourquoi
- Lien vers la version actuelle de RCOS-Core utilisée et le journal des modifications
- Canal de contact ou de demande de renseignements  

---

## Note informative

Les implémentations de référence sont des instruments d'apprentissage, pas des approbations.
