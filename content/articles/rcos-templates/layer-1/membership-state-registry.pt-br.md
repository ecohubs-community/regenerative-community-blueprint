---
id: b6d4e7f9
title: Registro de Estados de Associação
parentId: 2c750c19
order: 3
lang: pt-br
sourceHash: c7a1c1df
---

- **Camada:** 1 — Sistema de Associação
- **Status:** Modelo — adapte para sua comunidade
- **Referência RCOS:** [§3.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)

---

## Estados de Associação Definidos

*Cláusulas RCOS: [3.1.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>Por que uma única tabela de estados?</summary>

Direitos e obrigações espalhados por vários documentos acabam divergindo. Reunir cada estado, seus direitos, suas obrigações e suas transições em uma única tabela torna o sistema de associação auditável de relance — você consegue ver cada porta de entrada e de saída da comunidade, e o que cada uma concede. Se dois documentos algum dia discordarem, este registro é o desempate.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina cada estado de associação que sua comunidade reconhece (por exemplo, Candidato, Membro em Período de Experiência, Membro Pleno, Membro Egresso). Para cada um, liste direitos, obrigações, condição de entrada e condição de saída. Mantenha os estados mutuamente exclusivos — nenhuma pessoa pode estar em dois estados ao mesmo tempo.

</details>

| Estado | Direitos | Obrigações | Condição de entrada | Condição de saída |
|---|---|---|---|---|
| _<Estado 1, por exemplo, Candidato>_ | _<direitos>_ | _<obrigações>_ | _<entrada>_ | _<saída>_ |
| _<Estado 2, por exemplo, Membro em Período de Experiência>_ | _<direitos>_ | _<obrigações>_ | _<entrada>_ | _<saída>_ |
| _<Estado 3, por exemplo, Membro Pleno>_ | _<direitos>_ | _<obrigações>_ | _<entrada>_ | _<saída>_ |
| _<Estado 4, por exemplo, Membro Egresso>_ | _<direitos>_ | _<obrigações>_ | _<entrada>_ | _<saída>_ |

> Nenhuma pessoa pode estar em múltiplos estados de associação ao mesmo tempo.
> Nenhum direito ou obrigação pode ser assumido fora do estado de associação atual da pessoa.

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Estratégica
- **Versão:** <versão>
- **Registro da decisão:** <link para o registro da decisão>
