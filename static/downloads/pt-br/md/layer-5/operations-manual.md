**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Manual de Operações

- **Gerado em:** 2026-08-31
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-5/operations-manual](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-5/operations-manual)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 5 — Operações e Coordenação
- **Status:** Modelo — adapte para a sua comunidade
- **Referência RCOS:** [§7.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [§7.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [§7.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [§7.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [§7.6](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)

---

## Processos Operacionais Essenciais

*Cláusulas RCOS: [7.3.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.6.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)*

<details data-kind="rationale">
<summary>Por que documentar processos críticos?</summary>

Se um processo só existe na cabeça de uma pessoa, a comunidade depende dela aparecer — para sempre. Escrever os processos críticos, com pessoas responsáveis nomeadas, é o que transforma conhecimento privado em um ativo comunitário que sobrevive a transições, ausências e saídas.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada processo crítico recorrente (acolhimento, saída, publicação de propostas, registro de contribuições, cadência de reuniões, gestão de tesouraria, revisão de acesso a plataformas), nomeie uma pessoa responsável e uma breve descrição.

</details>

| Processo | Quem | Detalhe |
|---|---|---|
| _<Acolhimento de membros>_ | _<papel>_ | _<ver Protocolo de Acolhimento (Camada 1)>_ |
| _<Saída de membros>_ | _<papel>_ | _<ver Protocolo de Saída e Separação (Camada 1)>_ |
| _<Publicação de propostas>_ | _<papel>_ | _<ver Protocolo de Governança (Camada 2)>_ |
| _<Registro de contribuições>_ | _<papel>_ | _<ver Protocolo de Economia Interna (Camada 3)>_ |
| _<Reunião recorrente>_ | _<facilitador(a)>_ | _<publicação de pauta; notas; acompanhamento de ações>_ |
| _<Gestão de tesouraria>_ | _<responsável financeiro>_ | _<ver Regulamento de Tesouraria (Camada 3)>_ |
| _<Revisão de acesso a plataformas>_ | _<responsável por infraestrutura>_ | _<cadência de revisão; revogação de acesso de membros que saíram>_ |

## Responsabilidades Temporárias e Ad-Hoc

*Cláusulas RCOS: [7.1.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.1.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.7.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Por que limitar as responsabilidades temporárias?</summary>

Tarefas ad-hoc silenciosamente se cristalizam em trabalhos permanentes não remunerados — geralmente sobre quem disse sim uma vez. Um prazo rígido e uma revisão obrigatória fazem a diferença entre "cobri por uma semana" e "aparentemente esse é o meu papel agora".

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Estabeleça que qualquer responsabilidade temporária DEVE ter prazo definido na atribuição, ser documentada, revisada antes da expiração e formalizada ou encerrada.

</details>

Quando uma tarefa ou responsabilidade for atribuída temporariamente, ela DEVE ser:

- _<Explicitamente limitada no tempo desde o início (data final específica ou condição de conclusão).>_
- _<Documentada como temporária no momento da atribuição.>_
- _<Revisada antes da data final; convertida em papel formal ou encerrada.>_

_<Duração máxima de qualquer responsabilidade temporária antes que precise ser formalmente atribuída ou encerrada — por exemplo, 90 dias.>_ Se uma responsabilidade temporária não tiver responsável após sua data final, ela expira; não é transferida implicitamente.

---

## Interfaces entre Papéis e Domínios

*Cláusulas RCOS: [7.6.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts), [7.3.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Por que mapear as transições explicitamente?</summary>

A maioria das falhas operacionais não acontece dentro de um papel, mas entre papéis — nas fronteiras onde o trabalho passa de um responsável para outro. Nomear as transições transforma dependências invisíveis em revisáveis e evita falhas do tipo "achei que você tivesse cuidado disso".

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada par de papéis que passa trabalho entre si, nomeie a transição e o tipo de trabalho transferido.

</details>

| De | Para | Transição |
|---|---|---|
| _<papel>_ | _<papel>_ | _<o que é entregue>_ |
| _<papel>_ | _<papel>_ | _<...>_ |

## Limites de Carga de Trabalho

*Cláusulas RCOS: [7.4.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.7.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>Por que tornar os limites de carga explícitos?</summary>

Carga de coordenação sem limites é o modo padrão de falha de comunidades voluntárias — ela silenciosamente esgota as pessoas mais comprometidas até que elas saiam. Limites explícitos e revisáveis fazem da capacidade uma preocupação compartilhada em vez de um fardo privado.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina limites para carga de reuniões, carga de papéis, expectativas de tempo de resposta e o caminho para renegociar responsabilidades.

</details>

- **Carga de reuniões:** _<cadência das reuniões recorrentes e duração máxima; regras para reuniões extraordinárias.>_
- **Carga de papéis:** _<limite, se houver; regra para sinalizar sobrecarga; janela de resolução.>_
- **Expectativas de tempo de resposta:** _<assíncrono não urgente; operacional urgente; crítico para a segurança.>_
- **Renegociação e alívio:** _<processo para redistribuir responsabilidades; janela de resolução.>_
- **Sobrecarga persistente:** _<como a sobrecarga persistente, o risco de esgotamento, a não participação crônica ou a dependência de pessoas que assumem funções em excesso são detectados, e como são encaminhados ao processo de revisão ou reparação da Camada 4.>_

## Continuidade Operacional

*Cláusulas RCOS: [7.5.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity)*

<details data-kind="rationale">
<summary>Por que planejar a continuidade agora?</summary>

Uma comunidade que depende de uma pessoa insubstituível está a uma doença, um conflito ou uma saída do colapso. Nomear os pontos únicos de falha — honestamente — e incorporar a transição em cada papel é o que mantém a comunidade sobrevivendo aos seus fundadores.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Nomeie os atuais pontos únicos de falha honestamente. Estabeleça a exigência de transição para cada papel e a cadência de revisão da continuidade.

</details>

- **Estado atual:** _<lista honesta de pontos únicos de falha; plano de recrutamento para reduzir a concentração.>_
- **Mecanismos de transição:** _<consulte as exigências de transição por papel no Registro de Papéis; a transição DEVE ser concluída antes que um papel seja desocupado.>_
- **Cadência de revisão da continuidade:** _<trimestral; ad hoc em caso de mudança de papel.>_

## Fluxo de Informação e Antibloqueio de Acesso

*Cláusulas RCOS: [7.3.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.3.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>Por que tratar o acesso à informação como uma questão de governança?</summary>

Quem controla o acesso à informação controla a comunidade, querendo ou não. Tornar as regras de acesso explícitas — e proibir pontos únicos de acesso — é o que impede que guardiões informais acumulem o tipo de poder que o sistema de governança deveria conter.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Estabeleça quais registros são abertos a todos os Membros Plenos, a janela de resposta para solicitações de informação e a regra contra pontos únicos de acesso a informações relevantes para a governança.

</details>

- _<Decisões de governança acessíveis a todos os Membros Plenos.>_
- _<Notas de reuniões publicadas em até X horas.>_
- _<Estado de adesão e atribuições de papéis acessíveis.>_
- _<Registros de contribuições acessíveis.>_
- _<Janela de resposta para solicitações de informação.>_
- _<Negar acesso a informações às quais os membros têm direito é um gatilho de responsabilização sob a Camada 4.>_
- _<Nenhum papel ou indivíduo PODE ser o único ponto de acesso a informações requeridas por outros responsáveis por papéis.>_

---

## Localização da Documentação e Procedimentos de Atualização

*Cláusulas RCOS: [7.3.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.8.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-5-operations-coordination#78-explicitness-rules)*

<details data-kind="rationale">
<summary>Por que nomear onde cada documento vive?</summary>

Se ninguém consegue dizer onde mora a versão canônica de algo, não há versão canônica. Nomear a localização, a pessoa responsável e a cadência de revisão para cada tipo de documento é o que torna a memória da comunidade auditável em vez de folclórica.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada tipo de documento, nomeie a localização canônica, a pessoa responsável e a cadência de revisão.

</details>

| Tipo de documento | Localização | Responsável | Cadência de revisão |
|---|---|---|---|
| _<Artefatos RCOS>_ | _<localização>_ | _<responsável>_ | _<cadência>_ |
| _<Registro de membros>_ | _<localização>_ | _<responsável>_ | _<cadência>_ |
| _<Notas de reuniões>_ | _<localização>_ | _<responsável>_ | _<cadência>_ |
| _<Propostas de governança>_ | _<localização>_ | _<responsável>_ | _<cadência>_ |
| _<Registros de contribuições>_ | _<localização>_ | _<responsável>_ | _<cadência>_ |

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Estratégica
- **Versão:** <versão>
- **Registro da decisão:** <link para o registro da decisão>
