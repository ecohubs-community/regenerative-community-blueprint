**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Protocolo de Governança

- **Gerado em:** 2026-08-31
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-2/governance-protocol](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-2/governance-protocol)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 2 — Governança e Lógica de Decisão
- **Status:** Modelo — adapte para sua comunidade
- **Referência RCOS:** [§4.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [§4.6](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [§4.7](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Define o ciclo de vida completo de uma decisão coletiva — desde a submissão da proposta até a documentação e o recurso.

---

## Submissão de Propostas

*Cláusulas RCOS: [4.5.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Por que formalizar como as propostas entram no sistema?</summary>

Um processo de decisão que aceita propostas informalmente — uma mensagem, uma sugestão verbal, uma ideia de um fundador — não tem como saber com confiabilidade o que está realmente em pauta. Exigir um formato padrão de submissão, um local de arquivamento e campos de conteúdo obrigatórios significa que toda proposta chega com as mesmas informações, visível para todo mundo, rastreável desde o primeiro dia.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique quem pode propor, onde as propostas são submetidas, os campos de conteúdo obrigatórios e como o tipo de decisão é determinado e contestado.

</details>

- _<Decisões operacionais — tratadas pela pessoa responsável pelo papel correspondente, conforme o Registro de Papéis; não exigem proposta.>_
- _<Decisões estratégicas e constitucionais — quem pode submeter e em qual plataforma.>_
- _<Campos obrigatórios da proposta: resumo, camadas e artefatos afetados, tipo de decisão, justificativa, riscos e mitigações, plano de reversão, data efetiva proposta.>_
- _<O tipo de decisão é declarado pela pessoa proponente; em caso de dúvida, assume-se o tipo de maior impacto.>_
- _<Regras de retirada — quando uma proposta pode ser retirada e como.>_

## Análise e Deliberação

*Cláusulas RCOS: [4.5.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Por que impor um período mínimo de deliberação?</summary>

Votações apressadas favorecem quem já está prestando atenção e prejudicam todo mundo. Um período obrigatório de deliberação, proporcional ao peso da decisão, dá às pessoas membras tempo para ler, responder e levantar preocupações antes da abertura da votação — para que o voto reflita um juízo ponderado, não a velocidade de reação.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Nomeie os espaços de deliberação e os períodos mínimos para decisões estratégicas e constitucionais antes da abertura de uma votação.

</details>

- _<Onde a deliberação acontece (fórum, chat, reunião).>_
- _<Período mínimo de deliberação antes da abertura da votação — Estratégica.>_
- _<Período mínimo de deliberação antes da abertura da votação — Constitucional.>_
- _<Expectativa de que as pessoas membras levantem preocupações durante a deliberação para evitar a necessidade de nova votação.>_

## Execução da Decisão

*Cláusulas RCOS: [4.5.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Por que vincular a execução ao registro?</summary>

Uma proposta aprovada que nunca chega ao artefato afetado é uma decisão só no nome — as regras na prática continuam dizendo o que diziam antes. Vincular a execução a uma atualização concreta de artefato e a uma entrada no histórico de versões fecha a lacuna entre o que foi decidido e o que de fato está em vigor.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique o que acontece quando uma proposta é aprovada (atualizações de artefatos, histórico de versões) e quando é rejeitada (arquivamento). Defina um prazo limite para ambos os casos.

</details>

- _<Em caso de aprovação: como a proposta é arquivada; artefatos afetados atualizados; entrada no histórico de versões.>_
- _<Em caso de rejeição: onde a proposta é arquivada.>_
- _<Prazo limite para execução após o encerramento da votação.>_

## Documentação e Publicação

*Cláusulas RCOS: [4.5.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Por que documentar todos os resultados, incluindo rejeições?</summary>

Manter registro apenas das decisões aprovadas apaga o histórico de raciocínio — as pessoas membras perdem a noção do que já foi considerado e rejeitado, e os mesmos debates voltam à tona indefinidamente. Arquivar tanto propostas aprovadas quanto rejeitadas, com um prazo limite e um registro verificável de decisão, preserva a memória institucional e torna o sistema de governança auditável.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique as regras de retenção para propostas aprovadas e rejeitadas, o que conta como registro de decisão e a obrigação de atualização do histórico de versões.

</details>

- _<Todas as propostas aprovadas e rejeitadas são arquivadas em até X dias após o encerramento da votação.>_
- _<O artefato da votação (por exemplo, link do Snapshot) serve como registro de decisão.>_
- _<O histórico de versões (Camada 6) é atualizado a cada proposta aprovada.>_

## Recurso e Revisão

*Cláusulas RCOS: [4.5.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.6.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Por que permitir novas votações, mas com limites?</summary>

Um sistema de governança sem rota de recurso cristaliza erros em regras permanentes; um com rotas informais ilimitadas de recurso nunca decide nada de fato. Permitir que qualquer Membro Pleno acione uma nova votação — mas apenas com uma objeção escrita e fundamentada que traga algo ainda não tratado — mantém o sistema autocorretivo sem transformar toda decisão em um referendo permanente.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina as condições para acionar uma nova votação, o formato da objeção e o limiar/mecanismo da nova votação em si.

</details>

- _<Quem pode acionar uma nova votação e como.>_
- _<Exigência de objeção fundamentada — uma consideração não tratada na deliberação original.>_
- _<A nova votação usa o mesmo mecanismo e limiar da original.>_
- _<Tratamento de pedidos repetidos e frívolos de nova votação.>_

## Conflito Entre Decisões

*Cláusulas RCOS: [4.5.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>Por que predefinir a resolução de conflitos?</summary>

Quando duas decisões apontam em direções diferentes, alguém precisa escolher qual delas vale — e se essa escolha for feita caso a caso, ela se reduz a quem tem autoridade ou energia para impor sua leitura. Uma regra fixa de precedência (o tipo mais alto prevalece; em caso de empate de tipo, a mais recente prevalece) resolve conflitos de forma mecânica, sem julgamento subjetivo.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique a regra de precedência (tipicamente: o tipo de decisão mais alto prevalece; no mesmo tipo, a mais recente vence, salvo se travada explicitamente).

</details>

- _<Precedência: Constitucional > Estratégica > Operacional.>_
- _<Conflitos no mesmo tipo: a mais recente prevalece, salvo se a anterior travou explicitamente mudanças futuras.>_
- _<Onde os conflitos aparecem e como são resolvidos.>_

## Salvaguardas e Modos de Falha

*Cláusulas RCOS: [4.6.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>Por que planejar falhas de governança desde o início?</summary>

Todo sistema de governança falha em algum ponto — capturado por um subgrupo, congelado por vetos informais, desviado por uma pessoa responsável por um papel que silenciosamente expandiu seu escopo. Nomear os modos de falha específicos com antecedência, prever rotas de contestação que não possam sofrer retaliação e exigir uma revisão formal quando as falhas se acumulam é o que impede que a governança se esvazie lentamente sem ninguém perceber.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada modo de falha nomeado, indique a salvaguarda. Inclua um gatilho que force uma revisão constitucional caso as falhas se acumulem.

</details>

- **Concentração de poder:** _<como o protocolo impede autoridade unilateral acima do escopo operacional.>_
- **Vetos informais:** _<regra de que apenas objeções escritas e fundamentadas, submetidas pelo processo definido, têm peso.>_
- **Captura da decisão:** _<regra sobre quórum e abertura da votação.>_
- **Perpetuação de fundadores/papéis:** _<regra de que nenhum papel concede autoridade permanente; pessoas fundadoras não detêm autoridade especial de governança além de seu estado de membresia.>_
- **Contestação sem retaliação:** _<referência às disposições antirretaliação da Camada 4.>_
- **Gatilho de falha persistente:** _<por exemplo, três ou mais falhas de governança em X meses acionam uma revisão constitucional.>_

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Constitucional
- **Versão:** <versão>
- **Registro de decisão:** <link para o registro de decisão>
