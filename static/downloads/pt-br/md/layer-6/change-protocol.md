**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Protocolo de Mudanças

- **Gerado em:** 2026-07-07
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-6/change-protocol](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-6/change-protocol)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 6 — Evolução e Adaptação
- **Status:** Modelo — adapte para a sua comunidade
- **Referência RCOS:** [§8.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [§8.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [§8.6](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

---

## Como as Mudanças São Propostas

*Cláusulas RCOS: [8.1.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.6.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.8.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#88-explicitness-rules)*

<details data-kind="rationale">
<summary>Por que exigir uma proposta estruturada?</summary>

Uma mudança que chega como uma ideia vaga no chat não pode ser avaliada, questionada ou revertida mais tarde. Forçar toda proposta a passar pelo mesmo formato mínimo — artefatos afetados, justificativa, riscos, reversão — transforma uma opinião em um artefato revisável e torna impossível passar uma mudança de regra pela comunidade por acidente.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Declare quem pode propor, onde as propostas são submetidas e os campos de conteúdo obrigatórios. Conecte isso ao Protocolo de Governança (Camada 2).

</details>

_<Qualquer Membro Pleno pode propor uma mudança em qualquer artefato RCOS. Declare o canal de submissão.>_ Toda proposta deve incluir:

- _<Resumo da mudança.>_
- _<Camadas e artefatos afetados (com links).>_
- _<Tipo de decisão (Operacional / Estratégica / Constitucional).>_
- _<Justificativa.>_
- _<Riscos e mitigações.>_
- _<Plano de reversão.>_
- _<Data de vigência proposta.>_

## Como as Propostas São Classificadas

*Cláusulas RCOS: [8.1.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms)*

<details data-kind="rationale">
<summary>Por que classificar por impacto?</summary>

Nem toda mudança merece a mesma fricção. Correções de erros de digitação não deveriam exigir uma supermaioria; mudanças constitucionais não deveriam passar silenciosamente. Mapear propostas para tipos de decisão — e elevar casos ambíguos por padrão — torna o custo de uma mudança proporcional ao seu raio de impacto e protege a Camada 0 de ser erodida por pequenos movimentos.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina o que se enquadra em cada tipo de decisão. Declare a regra de elevação padrão para casos ambíguos.

</details>

- **Operacional:** _<correções de redação, formatação, atualizações menores de conteúdo; não exige votação; executada pelo papel responsável dentro dos limites delegados.>_
- **Estratégica:** _<mudanças no conteúdo das Camadas 1–5 que afetam direitos, processos ou estruturas dos membros.>_
- **Constitucional:** _<mudanças na Camada 0 (propósito, escopo, invariantes) ou no próprio sistema de governança (Camada 2).>_

> Se a classificação não for clara, ela é elevada por padrão ao tipo de maior impacto.

## Revisão e Deliberação

*Cláusulas RCOS: [8.1.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.7.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Por que impor janelas mínimas de deliberação?</summary>

Sem um piso para o tempo de deliberação, qualquer mudança pode ser apressada em um dia tranquilo em que poucos membros estão prestando atenção. Mínimos obrigatórios — mais longos para mudanças de maior impacto — garantem que membros que estejam viajando, doentes ou simplesmente ocupados ainda tenham uma chance real de ler, objetar ou aparecer.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina períodos mínimos de deliberação para cada tipo de decisão e um período de ratificação para mudanças Constitucionais.

</details>

- **Operacional:** _<não exige deliberação.>_
- **Estratégica:** _<deliberação mínima de X dias; espaço de deliberação.>_
- **Constitucional:** _<deliberação mínima de Y dias; período de ratificação de Z dias após a aprovação da votação.>_

## Adoção e Publicação

*Cláusulas RCOS: [8.2.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Por que etapas de publicação fixas?</summary>

Uma votação que passa mas nunca é registrada é o mesmo que nenhuma votação — e pior, cria uma lacuna em que quem se lembra do resultado é quem o define. Etapas de publicação rígidas e ordenadas fecham essa lacuna e tornam "o que foi adotado" uma questão de registro, não de memória.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Declare as etapas ordenadas que devem ocorrer após a aprovação de uma proposta. Inclua limites de tempo e a obrigação de histórico de versões.

</details>

Quando uma proposta é aprovada:

1. _<Arquivo da proposta movido para o arquivo de propostas aprovadas em até X dias.>_
2. _<Artefatos afetados atualizados em até X dias.>_
3. _<Entrada de histórico de versão adicionada.>_
4. _<Campos de status atualizados nos artefatos afetados.>_

## Rejeição

*Cláusulas RCOS: [8.2.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority)*

<details data-kind="rationale">
<summary>Por que arquivar propostas rejeitadas?</summary>

Ideias rejeitadas carregam tanto sinal quanto as aceitas — elas mostram o que a comunidade considerou e recusou. Manter rejeições arquivadas e acessíveis impede que a mesma proposta reapareça com um novo nome a cada seis meses e dá aos futuros membros uma visão dos caminhos não trilhados.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Declare o local de arquivamento das propostas rejeitadas e as condições de nova votação para revisitar a questão.

</details>

Quando uma proposta é rejeitada:

1. _<Arquivo da proposta movido para o arquivo de propostas rejeitadas em até X dias.>_
2. _<Nenhuma alteração em artefatos é feita.>_
3. _<O mecanismo de nova votação se aplica se surgirem novas informações (conforme a Matriz de Decisão, Camada 2).>_

## Transição e Migração

*Cláusulas RCOS: [8.5.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [8.5.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Por que proteger direitos existentes durante transições?</summary>

Se novas regras pudessem silenciosamente reescrever acordos existentes, a participação como membro perderia o sentido — aquilo com o que você se comprometeu poderia ser mudado por baixo dos panos. Regras explícitas de transição garantem que direitos não sejam reduzidos retroativamente e que pessoas operando sob as regras antigas tenham tempo e aviso antes que o terreno mude.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Declare as regras que protegem os atuais ocupantes de papéis, membros e registros quando uma mudança de regra entra em vigor.

</details>

Quando uma mudança de regra afeta papéis, acordos ou registros existentes:

- _<Os atuais ocupantes de papéis são notificados antes da mudança entrar em vigor.>_
- _<Os direitos dos membros existentes não podem ser reduzidos sem consentimento ou uma votação Constitucional.>_
- _<Registros anteriores à mudança não são alterados retroativamente, a menos que isso faça parte explícita da proposta.>_
- _<Um período de transição pode ser definido na própria proposta.>_

## Reversão

*Cláusulas RCOS: [8.1.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.5.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Por que tornar a reversão simétrica à adoção?</summary>

Uma mudança que não pode ser desfeita pelo mesmo caminho que a criou é uma armadilha. Exigir que a reversão use o tipo de decisão original mantém a porta aberta para correção sem permitir que um único membro silenciosamente reverta uma decisão de nível comunitário chamando-a de "correção".

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Declare que a reversão usa o mesmo tipo de decisão e processo da adoção original.

</details>

_<Qualquer decisão aprovada pode ser revertida pelo mesmo processo que a original. Qualquer Membro Pleno pode acionar uma nova votação ao submeter uma objeção fundamentada por escrito que não foi considerada durante a deliberação original. A reversão usa o mesmo tipo de decisão da original.>_

## Mudanças de Emergência

*Cláusulas RCOS: [8.5.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>Por que permitir mudanças de emergência?</summary>

Alguns danos se desenrolam mais rápido do que uma votação pode ser convocada. Um caminho de emergência estreito e bem protegido permite que a comunidade responda a falhas genuínas de segurança ou de plataforma sem entregar a ninguém um mecanismo geral de override. O ciclo obrigatório de relato, revisão e ratificação-ou-reversão é o que impede que poderes emergenciais se tornem poderes ordinários.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina as condições sob as quais uma mudança de emergência pode ser feita, quem pode fazê-la e o ciclo obrigatório de relatar-revisar-ratificar-ou-reverter.

</details>

Uma mudança operacional de emergência pode ser feita por _<papel>_ apenas se todas as seguintes condições forem atendidas:

1. _<Ação imediata necessária para prevenir dano à segurança ou falha de plataforma.>_
2. _<Uma votação dos Membros Plenos não pode ser convocada a tempo.>_
3. _<A mudança não anula um invariante da Camada 0.>_

Mudanças de emergência devem ser:

- _<Relatadas a todos os Membros Plenos em até X horas.>_
- _<Revisadas na próxima reunião comunitária.>_
- _<Ratificadas por meio do tipo de decisão apropriado em até Y dias, ou revertidas automaticamente.>_

## Experimentos

*Cláusulas RCOS: [8.3.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Por que tratar experimentos como um mecanismo distinto?</summary>

A comunidade precisa de uma forma de testar coisas novas sem ter que adotá-las permanentemente para testá-las. Experimentos criam esse espaço — mas só se forem limitados no tempo, rotulados e com expiração automática. Sem essas salvaguardas, um "experimento" se torna a forma mais rápida de instalar uma regra permanente sem deliberação real.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina as regras que todo experimento deve satisfazer. Faça referência ao Modelo de Experimento para o formato completo de submissão.

</details>

_<Qualquer Membro Pleno pode propor um experimento com prazo definido por meio de decisão Estratégica. Veja o Modelo de Experimento para os campos obrigatórios.>_

- _<Experimentos expiram automaticamente ao final de sua duração definida, a menos que sejam explicitamente renovados por uma nova proposta.>_
- _<Todos os artefatos afetados por um experimento devem ser explicitamente rotulados como experimentais durante o período.>_
- _<Suspensão por segurança: se um experimento introduzir um risco credível de segurança, coerção ou dano contínuo, uma suspensão de emergência pode ser invocada conforme Mudanças de Emergência acima.>_
- _<Resultados e aprendizados são registrados no Registro de Aprendizado.>_

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Constitucional
- **Versão:** <versão>
- **Registro de decisão:** <link para o registro de decisão>
