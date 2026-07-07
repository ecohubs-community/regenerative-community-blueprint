**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Registro de Estados de Associação

- **Gerado em:** 2026-07-07
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-1/membership-state-registry](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-1/membership-state-registry)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 1 — Sistema de Associação
- **Status:** Modelo — adapte para sua comunidade
- **Referência RCOS:** [§3.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [§3.8](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Estados de Associação Definidos

*Cláusulas RCOS: [3.1.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

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

## Notas Técnicas

<details data-kind="rationale">
<summary>Por que preservar dados após a saída?</summary>

A história da comunidade pertence à comunidade, não a qualquer conta individual. Manter registros de contribuição após a saída protege a integridade das trilhas de auditoria, do histórico de governança e da contabilidade de reconhecimento — ao mesmo tempo em que revogar o acesso e remover a pessoa das listagens ativas respeita o caráter definitivo da sua partida.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Descreva quais registros persistem após a saída, onde as atribuições de estado são acompanhadas operacionalmente, e como a revogação de acesso interage com os recursos das plataformas utilizadas.

</details>

- _<Histórico de contribuição e governança mantido após a saída; descreva a política de retenção.>_
- _<Membros egressos são removidos das listagens ativas de membros; descreva a revogação de acesso por plataforma.>_
- _<Local operacional das atribuições de estado — veja "Lista Atual de Membros" abaixo.>_

## Lista Atual de Membros

*Cláusulas RCOS: [3.8.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>Por que separar a definição da lista?</summary>

Este documento define o que os estados significam; o registro vivo acompanha quem está em qual estado hoje. Mantê-los separados significa que as definições permanecem estáveis e governáveis enquanto as atribuições permanecem atualizadas — e ninguém precisa alterar um artefato ratificado toda vez que alguém entra ou sai.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Aponte para o sistema operacional ou documento onde as atribuições atuais de membro-para-estado são acompanhadas. Este artefato não deve precisar ser alterado toda vez que um membro entra ou sai.

</details>

> A lista viva de membros é mantida em _<sistema / local>_. Este documento define os estados; a ferramenta de registro mantém as atribuições atuais.

_<Link ou local do diretório vivo de membros.>_

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Estratégica
- **Versão:** <versão>
- **Registro da decisão:** <link para o registro da decisão>
