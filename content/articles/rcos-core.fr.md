---
id: fdd280ae
title: Noyau RCOS
parentId: null
order: 1
lang: fr
sourceHash: 0ab1303a
---

## Ce qu'est RCOS

Le **Regenerative Community Operating System (RCOS)** est une spécification formelle et stratifiée pour concevoir, exploiter et faire évoluer des communautés intentionnelles sans dépendre du charisme, de l'idéologie ou du pouvoir informel.

RCOS traite une communauté comme un **système gouverné**, et non comme une expérience sociale. Il définit les exigences structurelles minimales nécessaires pour qu'une communauté reste :

- cohérente sous tension,
- équitable face aux asymétries de pouvoir,
- adaptable sans s'effondrer,
- et régénérative dans le temps.

RCOS n'est ni un mode de vie, ni un système de croyances, ni une identité culturelle. C'est un **système d'exploitation** : un ensemble de règles explicites, d'interfaces, d'invariants et de cas de test qui rendent la vie communautaire lisible, auditable et viable.

---

## Quel problème RCOS résout

La plupart des communautés n'échouent pas à cause de mauvaises intentions. Elles échouent à cause d'une **structure implicite**.

Les schémas d'échec courants comprennent :

- des leaders informels qui contournent les processus formels,
- des normes tacites appliquées comme des règles,
- un travail invisible menant à l'épuisement,
- la richesse ou le charisme se transformant en pouvoir,
- les conflits évités jusqu'à ce qu'ils deviennent existentiels,
- les décisions d'urgence devenant des exceptions permanentes.

RCOS existe pour rendre ces modes d'échec **structurellement impossibles ou explicitement traitables**.

---

## Ce que RCOS n'est pas

RCOS ne prescrit explicitement **pas** :

- une culture, une croyance ou une spiritualité spécifique,
- une idéologie politique ou économique,
- une méthode de gouvernance (par ex. consensus vs sociocratie),
- ni la façon dont les gens _devraient_ vivre ensemble.

Au lieu de cela, RCOS contraint _la manière dont les choix sont faits_, _la manière dont le pouvoir est encadré_ et _la manière dont le changement se produit_, indépendamment des valeurs.

---

## Principes de conception (non négociables)

> **Rien d'essentiel ne PEUT rester implicite.**

- **Basé sur les contraintes, pas sur les valeurs** — Définit des règles et des limites au lieu de prescrire des croyances. Les valeurs varient ; les contraintes maintiennent les systèmes fonctionnels sous tension.
- **Pré-engagement plutôt qu'improvisation** — Les décisions critiques (conflit, pouvoir, argent) sont convenues avant que les émotions, la rareté ou les luttes de pouvoir ne surviennent.
- **Modulaire par défaut** — Le noyau reste stable tandis que des modules de domaine optionnels peuvent être ajoutés, remplacés ou supprimés sans casser le système.
- **À échelle humaine (≈ 5–150 personnes)** — Optimisé pour des groupes suffisamment petits pour maintenir la confiance, la responsabilité et un contexte partagé sans bureaucratie.
- **Tolérant aux défaillances, pas aveugle aux défaillances** — Suppose que les conflits, l'épuisement et les erreurs surviendront et fournit des chemins de récupération explicites.

Tout ce qui affecte les éléments suivants DOIT être explicitement déclaré, versionné et révisable :

- l'autorité
- l'adhésion
- les ressources
- les conflits
- l'évolution du système

- Le silence n'est jamais traité comme un consentement.
- La tradition n'est jamais traitée comme une autorité.
- L'urgence n'est jamais traitée comme une justification.

---

## Sur la taille du groupe : pourquoi ~150 ?

**150** ≈ Nombre de Dunbar : limite cognitive pour des relations sociales stables.

- **Communauté minimale viable (5–7 personnes) :**
  En dessous, la séparation des rôles et la résolution des conflits s'effondrent.
- **Plage horizontale optimale (8–40 personnes) :**
  Confiance élevée, faible bureaucratie, participation directe possible.
- **Taille maximale non segmentée (120–150 personnes) :**
  Au-delà, la gouvernance informelle échoue.

Le Noyau RCOS s'applique à toute taille, mais au-delà d'environ 150 personnes, des sous-structures obligatoires (cercles, domaines, quartiers) sont REQUISES.

---

## Pourquoi la structure du Noyau RCOS est importante

- Empêche la dominance des fondateurs
- Rend le pouvoir explicite
- Réduit les normes cachées
- Survit aux conflits
- Permet la réplication
- S'intègre proprement avec les outils DAO, _sans en dépendre_

---

## Ce qui n'est délibérément pas dans le Noyau RCOS

Ces éléments appartiennent à des **modules optionnels**, pas au noyau :

- Design en permaculture
- Philosophie éducative
- Pratiques spirituelles ou culturelles
- Idéologie politique
- Choix esthétiques ou de mode de vie

Le noyau gouverne la manière dont les décisions sont prises, pas quelles décisions doivent être prises.

---

## Invariants (s'appliquent à toutes les Couches)

### L'explicite l'emporte sur l'implicite

Si ce n'est pas écrit, convenu et versionné, **cela n'existe pas**.

### Pourquoi c'est important

Les invariants de Couche garantissent qu'aucune dose de bonne volonté, de charisme, d'urgence ou de consensus ne peut silencieusement éroder le système.

---

## La règle d'explicité RCOS (principe fondamental)

**Tout ce qui alloue du pouvoir, du risque, de la responsabilité ou des conditions de sortie DOIT être explicite.**

Tout ce qui exprime une préférence, un style ou une optimisation locale PEUT être optionnel.

### Explicite vs Optionnel par Couche

Nous utilisons trois catégories :

- **DOIT être explicite** → requis pour la conformité RCOS
- **PEUT être explicite** → recommandé mais dépendant du contexte
- **DOIT rester optionnel** → jamais imposé par le noyau

### Invariant inter-couches sur l'explicité

**Si quelque chose peut :**

- Retirer les droits de quelqu'un
- Engager le temps ou le travail de quelqu'un
- Contrôler des ressources partagées
- Réduire au silence la dissidence
- Empêcher la sortie

**Alors cela DOIT être explicite, documenté et révisable.**

Aucune exception.

Cette approche garantit que :

- RCOS ne **devient pas** bureaucratique
- Les communautés conservent leur liberté culturelle
- Seul le _risque structurel_ est régulé
- Les modules optionnels restent puissants, pas contraints

---

## Conception pilotée par les tests de résistance

RCOS est validé non par l'intention mais par la **résistance aux défaillances**.

La spécification inclut une suite croissante de **tests de résistance** dérivés d'effondrements communautaires réels, tels que :

- la domination en réunion
- le droit de veto du fondateur
- la privatisation des biens communs
- les cultures d'évitement des conflits
- l'autorité spirituelle charismatique
- les contournements de règles d'urgence

Une communauté est considérée alignée RCOS uniquement si elle peut **résister à ces scénarios sans recours à des solutions informelles**.

Presque chaque échec survient parce que :

**Quelque chose de puissant a été autorisé à rester implicite.**

RCOS transforme :

- Le pouvoir implicite → des rôles explicites
- Les valeurs implicites → des règles délimitées
- La punition implicite → une procédure régulière
- La propriété implicite → des droits déclarés

### Modes d'échec connus que RCOS est conçu pour prévenir

Voir [Tests de résistance RCOS](/articles/rcos-stress-tests?id=6acbe9a7)

## Implémentations de référence

RCOS encourage de petites **communautés de référence** concrètes qui :

- implémentent explicitement les couches fondamentales,
- documentent les écarts et les échecs,
- et publient les enseignements pour enrichir le standard.

L'objectif n'est pas la perfection, mais l'**évolution par la transparence**.

---

## Pourquoi « Régénératif »

RCOS utilise le terme _régénératif_ délibérément.

Un système régénératif :

- ne repose pas sur une croissance constante,
- n'épuise pas ses membres,
- répare les dommages au lieu de les dissimuler,
- et se renforce en intégrant les échecs.

RCOS est conçu pour que **la tension produise de l'apprentissage**, pas de l'effondrement.

---

## À qui RCOS s'adresse

RCOS est destiné aux :

- communautés intentionnelles,
- écovillages et projets d'habitat partagé,
- coopératives et organisations basées sur les communs,
- expériences de vie collective à long terme,
- et tout groupe qui veut survivre à son propre succès.

RCOS est particulièrement utile pour les groupes qui partagent déjà des valeurs fortes — et veulent s'assurer que ces valeurs ne deviennent pas des outils de coercition.

---

## Comment utiliser RCOS

RCOS peut être utilisé comme :

- un **plan de conception** avant de fonder une communauté,
- un **cadre d'audit** pour les groupes existants,
- un **outil de test de résistance** en cas de conflit,
- ou un **langage commun** pour les conversations structurelles difficiles.

L'adoption peut être progressive. La conformité peut être partielle. Ce qui compte, c'est l'**explicité, pas la pureté**.

---

## L'affirmation fondamentale

> Les communautés n'échouent pas parce que les gens sont imparfaits.
> Elles échouent parce que les systèmes sont vagues.

RCOS existe pour remplacer le vague par la structure —
afin que le soin, l'autonomie et la régénération aient quelque chose de solide sur quoi s'appuyer.

---

## Journal des modifications

- [v0.1](/articles/rcos-core/v0-1?id=e6de7a5d) — Version initiale
