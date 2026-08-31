**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Regulamento da Tesouraria

- **Gerado em:** 2026-08-31
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-3/treasury-ruleset](https://rcos.ecohubs.community/pt-br/articles/rcos-templates/layer-3/treasury-ruleset)
- **Todos os modelos RCOS:** [https://rcos.ecohubs.community/pt-br/articles/rcos-templates](https://rcos.ecohubs.community/pt-br/articles/rcos-templates)

---
- **Camada:** 3 — Sistema Econômico e de Recursos
- **Status:** Modelo — adapte para a sua comunidade
- **Referência RCOS:** [§5.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [§5.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)

---

## Escopo da Tesouraria

*Cláusulas RCOS: [5.3.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.5.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)*

<details data-kind="rationale">
<summary>Por que traçar um limite rígido em torno dos fundos da tesouraria?</summary>

Sem um limite explícito, qualquer dinheiro que circule perto da comunidade — o cartão pessoal de uma fundadora, uma conta paralela, um fundo informal de reembolsos — pode acabar sendo tratado como dinheiro comunitário, com todas as obrigações que isso implica. Nomear exatamente quais contas são da tesouraria e quais não são protege tanto a comunidade quanto as pessoas que pagam do próprio bolso.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Nomeie cada conta que faz parte da tesouraria (carteira, conta bancária, etc.) e declare explicitamente que fundos pessoais usados informalmente não são da tesouraria e não geram nenhuma obrigação para a comunidade.

</details>

_<Defina quais contas são a tesouraria da comunidade — endereços específicos de carteira, contas bancárias, etc. Declare que qualquer nova conta de tesouraria DEVE ser declarada e aprovada por uma decisão Estratégica antes de receber recursos. Declare que fundos pessoais usados para cobrir custos operacionais não são da tesouraria e não geram nenhum direito de reembolso pela comunidade.>_

## Fontes de Receita

*Cláusulas RCOS: [5.3.2](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>Por que canalizar toda receita por uma única lista declarada?</summary>

Toda fonte de receita carrega amarras — exigências de prestação de contas, expectativas, riscos de dependência. Se canais de receita podem se abrir informalmente, essas amarras se conectam antes que a comunidade tenha tido a chance de avaliá-las. Uma única lista declarada, alterada apenas por decisões Estratégicas, mantém as obrigações da comunidade sob seu próprio controle.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Nomeie cada fonte de receita que a comunidade tem atualmente e faça referência ao Protocolo de Economia Interna para a regra de que qualquer novo canal de receita requer uma decisão Estratégica.

</details>

_<Liste as fontes de receita atuais, ou declare que não há nenhuma. Faça referência à seção Interfaces de Receita Externa no Protocolo de Economia Interna.>_

## Autoridade de Gastos

*Cláusulas RCOS: [5.3.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.7.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#57-explicitness-rules)*

<details data-kind="rationale">
<summary>Por que detalhar os limites em uma tabela?</summary>

Quando a autoridade de gastos é vaga, surgem dois modos de falha: ou cada pequena decisão é escalada e nada anda, ou uma única pessoa responsável acumula silenciosamente uma discricionariedade que ninguém votou para conceder. Uma tabela com valores, tipos de decisão e órgãos autorizados elimina a ambiguidade e torna qualquer gasto não autorizado imediatamente visível.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Defina os escalões de gasto por valor e o tipo de decisão, órgão autorizado e mecanismo para cada um. Contratos plurianuais e dívidas DEVERIAM ficar em seu próprio escalão (Constitucional).

</details>

| Valor | Tipo de Decisão | Órgão Autorizado | Mecanismo |
|---:|---|---|---|
| _<Até o limite delegado (ex.: R$ X)>_ | _<Operacional>_ | _<Pessoa Responsável pelas Finanças>_ | _<Delegado>_ |
| _<Qualquer valor acima do limite delegado>_ | _<Estratégica>_ | _<Membros Plenos>_ | _<Votação>_ |
| _<Contratos plurianuais, dívidas ou obrigações financeiras estruturais>_ | _<Constitucional>_ | _<Membros Plenos>_ | _<Supermaioria + ratificação>_ |

## Transparência e Prestação de Contas

*Cláusulas RCOS: [5.3.4](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.3.5](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.6.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>Por que tornar a transparência o padrão, e não um recurso opcional?</summary>

A opacidade em uma tesouraria se acumula: uma divulgação ausente convida outra, e em pouco tempo os membros já não conseguem verificar se o dinheiro da comunidade está sendo gerido como acordaram. Tornar a visibilidade em tempo real a linha de base — e exigir que qualquer exceção seja nomeada, justificada e com prazo definido — mantém a auditoria ao alcance de cada membro, não só das pessoas responsáveis.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Declare o padrão de visibilidade para cada conta da tesouraria. Onde a visibilidade direta não for possível (ex.: algumas contas bancárias), defina uma cadência periódica de prestação de contas com um responsável nomeado.

</details>

- _<Tesouraria principal (ex.: multi-sig Safe): todos os Membros Plenos têm, no mínimo, acesso de leitura; visibilidade em tempo real.>_
- _<Outras contas declaradas: acesso direto de leitura para múltiplos usuários, se houver suporte; caso contrário, resumo periódico de saldo e transações.>_
- _<Todas as decisões de gasto fazem referência ao registro de governança vinculado (ID da votação ou registro de decisão delegada).>_

## Restrições de Reserva, Risco e Dívida

*Cláusulas RCOS: [5.3.6](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>Por que bloquear dívida e obrigações de longo prazo por padrão?</summary>

Dívida e compromissos recorrentes vinculam a comunidade para além das pessoas que estão nela hoje — futuros membros herdam as obrigações. Proibi-los a menos que uma votação Estratégica autorize explicitamente impede que restrições de longo prazo sejam assumidas de forma leviana e preserva a opção de manter a estrutura enxuta.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Declare as regras sobre dívida, obrigações recorrentes, reservas de contingência e instrumentos financeiros fora da tesouraria. Padrão para "não permitido sem votação Estratégica" para qualquer coisa que vincule o futuro.

</details>

- **Dívida:** _<permitida apenas via votação Estratégica.>_
- **Obrigações de longo prazo:** _<custos / contratos recorrentes permitidos apenas via votação Estratégica.>_
- **Reserva de contingência:** _<meta de reserva, ou declare que ainda não está definida.>_
- **Instrumentos fora da tesouraria:** _<empréstimos, investimentos, garantias apenas via votação Estratégica.>_

## Regras de Conflito de Interesses

*Cláusulas RCOS: [5.4.3](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints)*

<details data-kind="rationale">
<summary>Por que proibir a autoaprovação de forma direta?</summary>

Até mesmo pessoas bem-intencionadas inclinam, inconscientemente, decisões a favor dos próprios interesses; uma regra que exige divulgação e abstenção elimina o julgamento subjetivo e a pressão social para "confiar em alguém". A autoaprovação de gastos é, isoladamente, a forma mais comum pela qual pequenos sistemas de governança perdem integridade silenciosamente, por isso a regra é colocada de forma direta.

</details>

<details data-kind="instructions">
<summary>Como preencher esta seção</summary>

Declare a regra de não autoaprovação e a regra de divulgar-e-abster-se para qualquer membro com interesse financeiro direto em uma decisão de gasto.

</details>

- _<Quem solicita NÃO DEVE aprovar suas próprias solicitações de gasto.>_
- _<Membros com interesse financeiro direto em uma decisão de gasto DEVEM declará-lo e abster-se.>_
- _<Quem ocupa cargo na tesouraria NÃO DEVE autorizar gastos unilaterais acima do limite delegado.>_

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Estratégica
- **Versão:** <versão>
- **Registro de decisão:** <link para o registro de decisão>
