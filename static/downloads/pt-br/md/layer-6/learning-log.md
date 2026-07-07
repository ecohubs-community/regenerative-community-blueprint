**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Registro de Aprendizado

- **Gerado em:** 2026-07-07
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-6/learning-log](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-6/learning-log)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 6 — Evolução e Adaptação
- **Status:** Modelo — adapte para a sua comunidade; atualizado quando ocorrerem eventos que gerem aprendizado
- **Referência RCOS:** [§8.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [§8.6](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Registra falhas importantes, adaptações, reversões e aprendizados sistêmicos. Padrões recorrentes de falha devem desencadear uma revisão estrutural, não a culpabilização individual. As entradas são adicionadas no topo (mais recentes primeiro).

---

## O Que Constitui um Evento Passível de Aprendizado

*Cláusulas RCOS: [8.4.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>Por que definir o gatilho explicitamente?</summary>

Se "deveríamos aprender com isso" for deixado ao critério individual, as lições mais difíceis — aquelas que envolvem conflito, fracasso ou constrangimento — são justamente as que têm maior probabilidade de não serem registradas. Nomear os eventos específicos que DEVEM gerar uma entrada tira essa decisão do calor do momento e garante que aprendizados desconfortáveis sejam capturados, em vez de silenciosamente descartados.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Liste os eventos específicos que obrigam uma entrada no Registro de Aprendizado. Indique quem é responsável pelo registro e a cadência de síntese.

</details>

Uma entrada DEVE ser adicionada quando ocorrer qualquer um dos seguintes eventos:

- _<Uma decisão de governança é revertida, desfeita ou identificada como contraditória a outra regra adotada.>_
- _<Um experimento é concluído (sucesso, fracasso ou encerramento antecipado).>_
- _<Um conflito escala para a etapa de governança da Escada de Resolução de Conflitos.>_
- _<Uma falha estrutural ou sistêmica é identificada e causou dano, confusão ou quebras repetidas de processo.>_
- _<Uma adaptação importante das operações da comunidade é adotada e altera significativamente o funcionamento de uma camada.>_
- _<Um quase acidente: uma situação que poderia ter causado dano significativo, mas foi detectada antes que isso acontecesse.>_
- _<Qualquer evento que a comunidade identifique coletivamente como digno de aprendizado.>_

_<Ajustes operacionais menores, decisões rotineiras e questões individuais totalmente resolvidas nas etapas iniciais da Escada de Resolução de Conflitos não exigem uma entrada no Registro de Aprendizado.>_

**Responsabilidade:** _<papel responsável por garantir que as entradas sejam criadas e mantidas.>_

**Cadência de síntese:** _<o Registro de Aprendizado é revisado na reunião de Reflexão e Aprendizado; o papel nomeado prepara uma breve síntese das entradas desde a última revisão, destacando padrões recorrentes.>_

---

_Nenhuma entrada ainda. A primeira entrada será adicionada quando ocorrer o primeiro evento passível de aprendizado._

---

## Formato da Entrada

*Cláusulas RCOS: [8.4.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>Por que um modelo fixo de entrada?</summary>

A reflexão em formato livre é valiosa, mas não se agrega. Um esquema consistente — gatilho, sinais, o que mudou, resultado, responsável pelo acompanhamento — permite revisar anos de entradas em busca de padrões recorrentes e transformar incidentes isolados em evidência estrutural. Também obriga cada entrada a nomear um responsável, para que o aprendizado não pare em "nós percebemos".

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Use o modelo abaixo para cada entrada. Cada campo impõe uma lente diferente sobre o evento; não pule o responsável pelo acompanhamento.

</details>

```markdown
## <AAAA-MM-DD> — <Título curto>

- **Gatilho:** <O que aconteceu que motivou esta entrada>
- **Camadas/artefatos envolvidos:** <ex.: Camada 2 — Protocolo de Governança>
- **O que ocorreu:** <Breve narrativa>
- **Sinais que motivaram a ação:** <O que tornou isso visível como um problema>
- **O que mudou ou foi tentado:** <Decisão, experimento ou alteração de regra>
- **Resultado:** <Resultado após a revisão, se conhecido>
- **Responsável pelo acompanhamento e prazo:** <Nome / papel e data, ou "nenhum">
```
