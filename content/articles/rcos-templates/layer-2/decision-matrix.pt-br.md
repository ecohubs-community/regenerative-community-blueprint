---
id: 4885248e
title: Matriz de Decisão
parentId: b7e62f01
order: 0
lang: pt-br
sourceHash: 626ae17f
---

- **Camada:** 2 — Governança e Lógica de Decisão
- **Status:** Modelo — adapte para sua comunidade
- **Referência RCOS:** [§4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [§4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [§4.7](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Mapeia cada tipo e domínio de decisão para um papel ou órgão autorizado, mecanismo, limiar e caminho de escalonamento. Decisões tomadas fora desta matriz são consideradas inválidas.

---

## Princípios de Votação

*Cláusulas RCOS: [4.2.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms)*

<details data-kind="rationale">
<summary>Por que fixar mecanismo, limiar e prazos?</summary>

Uma votação sem mecanismo, limiar e janela de deliberação predefinidos é um convite para fabricar resultados depois do fato — quem conta os votos ou define o relógio vence. Declarar esses parâmetros com antecedência torna cada decisão coletiva reproduzível e contestável nos mesmos termos, independentemente de quem está na sala.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique a plataforma de votação, o limiar para cada tipo de decisão, o período de deliberação, a regra de empate, a regra de nova votação e qualquer limite de gastos ou escopo da autoridade delegada.

</details>

- **Plataforma de votação:** _<ex.: Snapshot, Loomio, consenso presencial.>_
- **Limiar operacional:** _<ex.: nenhuma votação necessária — delegada ao detentor do papel operacional relevante conforme o Registro de Papéis.>_
- **Limiar estratégico:** _<ex.: maioria simples (>50%); deliberação mínima de X dias.>_
- **Limiar constitucional:** _<ex.: supermaioria (≥⅔); deliberação mínima de Y dias; período de ratificação de Z dias.>_
- **Empate:** _<ex.: a proposta falha; o status quo é mantido.>_
- **Nova votação:** _<ex.: qualquer Membro Pleno pode acionar nova votação com uma objeção escrita e fundamentada citando uma consideração não abordada durante a deliberação.>_
- **Objeção fundamentada:** _<defina o que qualifica como objeção fundamentada — citar uma consideração específica não levantada durante a deliberação; discordância geral não qualifica.>_
- **Limite de gastos da autoridade delegada:** _<ex.: R$ 0; ou defina um limiar abaixo do qual gastos delegados são permitidos.>_
- _<Outros princípios de votação que sua comunidade queira declarar.>_

---

## Matriz

*Cláusulas RCOS: [4.4.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix)*

<details data-kind="rationale">
<summary>Por que uma única matriz autoritativa?</summary>

Se as regras sobre quem decide o quê vivem na cabeça das pessoas, a autoridade vira o que a pessoa mais barulhenta ou mais sênior disser. Uma matriz pública que vincula cada decisão a um domínio, órgão, mecanismo e limiar torna ações fora de escopo visíveis no momento em que acontecem — e torna qualquer decisão tomada fora dela inválida por construção.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada domínio de decisão (admissão de membros, tesouraria, plataforma, parcerias, governança etc.), defina o tipo de decisão, o órgão autorizado, quem é elegível para participar, o mecanismo, o limiar, as condições de bloqueio e o caminho de escalonamento.

</details>

| Domínio da Decisão | Tipo de Decisão | Órgão Autorizado | Participantes Elegíveis | Mecanismo | Limiar | Condições de Bloqueio / Veto | Escalonamento |
|---|---|---|---|---|---|---|---|
| _<ex.: Admissão de membros>_ | _<Operacional / Estratégica / Constitucional>_ | _<papel ou órgão>_ | _<quem participa>_ | _<votação / delegada>_ | _<limiar>_ | _<condições de bloqueio>_ | _<caminho de escalonamento>_ |
| _<ex.: Gastos da tesouraria — pequenos>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<ex.: Gastos da tesouraria — grandes>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<ex.: Mudanças nas regras de governança>_ | _<Constitucional>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<ex.: Mudanças de propósito primário / invariantes>_ | _<Constitucional>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> **Detentores de papéis operacionais:** Cada decisão operacional é executada pelo detentor do papel nomeado responsável por aquele domínio, agindo dentro de seu escopo definido conforme o Registro de Papéis (Camada 5). Quando uma decisão abrange múltiplos domínios, cada detentor de papel age dentro de seu próprio escopo.

## Definições dos Tipos de Decisão

*Cláusulas RCOS: [4.1.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.5](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types)*

<details data-kind="rationale">
<summary>Por que classificar cada decisão?</summary>

Sem um tipo, cada decisão é tratada na velocidade e com o rigor que calhar no momento — mudanças rotineiras travam em debates, e mudanças constitucionais passam despercebidas. Tipos fixos vinculam o peso de uma decisão ao processo pelo qual ela precisa passar, e a regra do tipo-mais-alto-por-padrão fecha a brecha onde a ambiguidade seria explorada.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina cada tipo de decisão pelo que ele abrange, quem o executa, qual processo exige e como disputas sobre classificação são resolvidas.

</details>

- **Operacional** — _<funcionamento cotidiano dentro das regras existentes; executado pelo detentor do papel relevante sem votação.>_
- **Estratégica** — _<direção de longo prazo, alocação significativa de recursos, criação/remoção de estruturas importantes; requer votação dos Membros Plenos com um período de deliberação definido.>_
- **Constitucional** — _<mudanças na Camada 0 (propósito, escopo, invariantes) ou no próprio sistema de governança; requer votação dos Membros Plenos, supermaioria e um período de ratificação.>_

> Se uma decisão não puder ser claramente classificada, ela é tratada por padrão como o tipo de maior impacto.

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Constitucional
- **Versão:** <versão>
- **Registro de decisão:** <link para o registro de decisão>
