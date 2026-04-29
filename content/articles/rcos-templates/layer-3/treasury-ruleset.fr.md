---
id: 9ead12cf
title: Règles de trésorerie
parentId: 7fcb6634
order: 1
lang: fr
sourceHash: 10d5e9b8
---

- **Couche :** 3 — Système économique et des ressources
- **Statut :** Modèle — à adapter pour ta communauté
- **Référence RCOS :** [§5.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [§5.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)

---

## Périmètre de la trésorerie

*Clauses RCOS : [5.3.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.5.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)*

<details data-kind="rationale">
<summary>Pourquoi tracer une frontière nette autour des fonds de trésorerie ?</summary>

Sans limite explicite, tout argent circulant près de la communauté — la carte personnelle d'un fondateur, un compte parallèle, une cagnotte informelle de remboursement — peut progressivement être traité comme de l'argent communautaire, avec toutes les obligations que cela implique. Nommer précisément quels comptes relèvent de la trésorerie et lesquels n'en relèvent pas protège à la fois la communauté et les individus qui paient de leur poche.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Nomme chaque compte qui fait partie de la trésorerie (portefeuille, compte bancaire, etc.) et indique explicitement que les fonds personnels utilisés de manière informelle ne sont pas de la trésorerie et ne créent aucune obligation communautaire.

</details>

_<Définis quels comptes constituent la trésorerie communautaire — adresses de portefeuille explicites, comptes bancaires, etc. Indique que tout nouveau compte de trésorerie DOIT être déclaré et approuvé par une décision Stratégique avant que des fonds y soient reçus. Indique que les fonds personnels couvrant des coûts opérationnels ne sont pas de la trésorerie et n'ouvrent aucun droit à remboursement communautaire.>_

## Sources de revenus

*Clauses RCOS : [5.3.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>Pourquoi faire transiter tous les revenus par une liste unique et déclarée ?</summary>

Chaque source de revenus comporte des contreparties — obligations de déclaration, attentes, risques de dépendance. Si des canaux de revenus peuvent s'ouvrir de manière informelle, ces contreparties s'attachent avant que la communauté ait eu l'occasion de les évaluer. Une liste unique et déclarée, modifiable uniquement par décision Stratégique, maintient les obligations de la communauté sous son propre contrôle.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Nomme chaque source de revenus actuelle de la communauté, et renvoie au Protocole d'économie interne pour la règle selon laquelle tout nouveau canal de revenus nécessite une décision Stratégique.

</details>

_<Liste les sources de revenus actuelles, ou indique qu'il n'y en a aucune. Renvoie à la section Interfaces de revenus externes du Protocole d'économie interne.>_

## Autorité de dépense

*Clauses RCOS : [5.3.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.7.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#57-explicitness-rules)*

<details data-kind="rationale">
<summary>Pourquoi détailler les seuils dans un tableau ?</summary>

Quand l'autorité de dépense est floue, deux modes de défaillance apparaissent : soit chaque petite décision est escaladée et rien n'avance, soit un·e intendant·e accumule discrètement un pouvoir discrétionnaire que personne n'a jamais voté. Un tableau indiquant les montants, les types de décision et les organes autorisés supprime l'ambiguïté et rend immédiatement visible toute dépense non autorisée.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Définis des paliers de dépense par montant avec le type de décision, l'organe autorisé et le mécanisme pour chacun. Les contrats pluriannuels et la dette DEVRAIENT avoir leur propre palier (Constitutionnel).

</details>

| Montant | Type de décision | Organe autorisé | Mécanisme |
|---:|---|---|---|
| _<Jusqu'à la limite déléguée (p. ex. X €)>_ | _<Opérationnel>_ | _<Intendant·e des finances>_ | _<Délégué>_ |
| _<Tout montant au-delà de la limite déléguée>_ | _<Stratégique>_ | _<Membres à part entière>_ | _<Vote>_ |
| _<Contrats pluriannuels, dette ou obligations financières structurelles>_ | _<Constitutionnel>_ | _<Membres à part entière>_ | _<Supermajorité + ratification>_ |

## Transparence et rapports

*Clauses RCOS : [5.3.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.3.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.6.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>Pourquoi faire de la transparence le défaut, et non une fonctionnalité ?</summary>

L'opacité dans une trésorerie s'accumule : une divulgation manquante en invite une autre, et bientôt les membres ne peuvent plus vérifier si l'argent de la communauté est géré comme ils l'avaient convenu. Faire de la visibilité en temps réel la référence — et exiger que toute exception soit nommée, justifiée et limitée dans le temps — maintient l'audit à la portée de chaque membre, pas seulement des intendant·e·s.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique le niveau de visibilité par défaut pour chaque compte de trésorerie. Lorsque la visibilité directe n'est pas possible (p. ex. certains comptes bancaires), définis une cadence de reporting périodique avec un·e responsable nommé·e.

</details>

- _<Trésorerie principale (p. ex. multi-sig Safe) : tous les Membres à part entière disposent au minimum d'un accès en lecture ; visibilité en temps réel.>_
- _<Autres comptes déclarés : accès en lecture multi-utilisateur direct si possible ; sinon, résumé périodique des soldes et transactions.>_
- _<Toutes les décisions de dépense font référence à l'enregistrement de gouvernance associé (identifiant de vote ou journal des décisions déléguées).>_

## Réserve, risque et contraintes d'endettement

*Clauses RCOS : [5.3.6](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>Pourquoi bloquer la dette et les engagements à long terme par défaut ?</summary>

La dette et les engagements récurrents lient la communauté au-delà des personnes qui en font actuellement partie — les futurs membres héritent des obligations. Les interdire sauf autorisation explicite par vote Stratégique empêche que des contraintes à long terme soient contractées à la légère, et préserve la possibilité de rester léger.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Indique les règles concernant la dette, les engagements récurrents, les réserves de contingence et les instruments financiers hors trésorerie. Par défaut, « non autorisé sans vote Stratégique » pour tout ce qui engage l'avenir.

</details>

- **Dette :** _<autorisée uniquement par vote Stratégique.>_
- **Engagements à long terme :** _<coûts récurrents / contrats autorisés uniquement par vote Stratégique.>_
- **Réserve de contingence :** _<objectif de réserve, ou indiquer qu'il n'est pas encore défini.>_
- **Instruments hors trésorerie :** _<prêts, investissements, garanties uniquement par vote Stratégique.>_

## Règles relatives aux conflits d'intérêts

*Clauses RCOS : [5.4.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints)*

<details data-kind="rationale">
<summary>Pourquoi interdire purement et simplement l'auto-approbation ?</summary>

Même des personnes bien intentionnées orientent inconsciemment les décisions vers leurs propres intérêts ; une règle exigeant la divulgation et l'abstention supprime le jugement subjectif et la pression sociale de « faire confiance à quelqu'un ». L'auto-approbation des dépenses est le moyen le plus courant par lequel les petits systèmes de gouvernance perdent silencieusement leur intégrité, c'est pourquoi la règle est énoncée sans détour.

</details>

<details data-kind="instructions">
<summary>Comment remplir cette section</summary>

Énonce la règle de non-auto-approbation et la règle de divulgation-et-abstention pour tout membre ayant un intérêt financier direct dans une décision de dépense.

</details>

- _<Les demandeur·euse·s NE DOIVENT PAS approuver leurs propres demandes de dépense.>_
- _<Les membres ayant un intérêt financier direct dans une décision de dépense DOIVENT le déclarer et s'abstenir.>_
- _<Les titulaires de rôles de trésorerie NE DOIVENT PAS autoriser de dépense unilatérale au-delà de la limite déléguée.>_

---

## Procès-verbal de ratification

- **Adopté le :** <AAAA-MM-JJ>
- **Type de décision :** Stratégique
- **Version :** <version>
- **Registre de décision :** <lien vers le registre de décision>
