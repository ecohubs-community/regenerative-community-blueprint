**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Modelo de Experimento

- **Gerado em:** 2026-08-31
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-6/experiment-template](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-6/experiment-template)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 6 — Evolução e Adaptação
- **Status:** Modelo — use para propor um experimento com prazo definido
- **Referência RCOS:** [§8.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [§8.7](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)

> Experimentos permitem que a comunidade teste uma mudança sem adotá-la permanentemente. Para serem seguros, todos os experimentos devem ter prazo definido, estar rotulados e expirar automaticamente — e devem registrar seus resultados no Registro de Aprendizados (Learning Log).

---

## Campos Obrigatórios

*Cláusulas RCOS: [8.3.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Por que esses campos são obrigatórios?</summary>

Sem escopo, duração, critérios de sucesso e rollback, um "experimento" não passa de uma mudança permanente com uma roupagem mais simpática. Exigir que toda proposta especifique o que muda, quando termina, como será revisada e como será revertida mantém a experimentação reversível — e impede que o rótulo de "experimento" seja usado para contornar a deliberação.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Preencha cada campo. A duração máxima é definida pelo seu Protocolo de Mudança (Change Protocol). A autoridade de decisão deve vir da Matriz de Decisão (Decision Matrix).

</details>

- **Título:** _<nome curto do experimento.>_
- **Proponente:** _<nome do membro.>_
- **Tipo de decisão:** Estratégica
- **Escopo:** _<exatamente o que está sendo testado; quais artefatos e comportamentos são afetados.>_
- **Duração:** _<data de início — data de término; duração máxima conforme definida pelo Protocolo de Mudança.>_
- **Pontos de revisão (checkpoints):** _<no mínimo um check-in no meio do percurso; especifique as datas e o que será revisado.>_
- **Critérios de sucesso:** _<condições observáveis que justificariam tornar a mudança permanente.>_
- **Critérios de falha:** _<condições observáveis que encerrariam o experimento antes do prazo.>_
- **Condições e processo de rollback:** _<o que dispara o rollback e como ele é executado.>_
- **Caminho de decisão autorizado:** _<quem pode iniciar, estender, modificar ou encerrar o experimento, conforme a Matriz de Decisão.>_
- **Rotulagem:** _<todos os artefatos afetados pelo experimento DEVEM ser explicitamente rotulados como experimentais durante toda a duração.>_
- **Suspensão por segurança:** _<reconheça que uma suspensão de emergência PODE ser invocada nos termos do Protocolo de Mudança caso surja um risco de segurança crível.>_

## Expiração e Renovação

<details data-kind="rationale">
<summary>Por que os experimentos precisam expirar?</summary>

A comunidade precisa ter a opção de reverter. A expiração automática obriga uma decisão deliberada para tornar a mudança permanente — em vez de uma deriva lenta na qual ninguém lembra que ela já foi condicional.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Declare a regra de expiração automática, o mecanismo de renovação e a obrigação de registrar os resultados no Registro de Aprendizados.

</details>

- _<Os experimentos expiram automaticamente ao final da duração definida, a menos que sejam explicitamente renovados por meio de uma nova proposta. A renovação requer uma nova votação Estratégica.>_
- _<Os resultados e aprendizados são registrados no Registro de Aprendizados.>_

---

## Registro de Resultados (preenchido ao final do experimento)

- **Data de término:**
- **Resultado:** _<Adotado permanentemente / Revertido / Modificado e refeito / Encerrado antecipadamente>_
- **Registro da decisão:** _<link para a votação ou decisão>_
- **Entrada no Registro de Aprendizados:** _<link>_
- **Resumo:** _<duas a quatro frases sobre o que foi testado, o que foi observado e o que foi decidido.>_
