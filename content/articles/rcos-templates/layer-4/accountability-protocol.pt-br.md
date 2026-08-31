---
id: d0c21119
title: Protocolo de Responsabilização
parentId: 608a89f6
order: 1
lang: pt-br
sourceHash: 114311d5
---

- **Camada:** 4 — Conflito, Reparação e Responsabilização
- **Status:** Modelo — adapte para a sua comunidade
- **Referência RCOS:** [§6.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [§6.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)

---

## Gatilhos

*Cláusulas RCOS: [6.4.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Por que enumerar o que inicia uma verificação de responsabilização?</summary>

Se verificações de responsabilização só acontecem quando alguém se sente forte o suficiente para insistir, elas se tornam políticas. Nomear os gatilhos exatos — inatividade, descumprimento, violação de invariante, encaminhamento — significa que o processo começa a partir de uma condição que qualquer pessoa pode verificar, e não de um julgamento sobre uma pessoa.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Liste os gatilhos específicos e verificáveis que iniciam uma verificação de responsabilização. Cada gatilho deve ser observável a partir de registros ou de um encaminhamento direto.

</details>

Uma verificação de responsabilização é iniciada quando:

1. _<Um membro não fez uma contribuição reconhecida por X meses consecutivos.>_
2. _<Um membro descumpriu uma obrigação do Acordo de Membresia.>_
3. _<Um membro violou uma restrição ou invariante de identidade da Camada 0.>_
4. _<É feito um encaminhamento a partir da Escada de Resolução de Conflitos (Etapa 3 ou superior).>_

## Investigação e Revisão

*Cláusulas RCOS: [6.4.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.6](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Por que graduar a resposta pela gravidade?</summary>

Tratar uma contribuição não realizada da mesma forma que uma violação de invariante ou esmaga casos menores com processos pesados ou deixa casos sérios escaparem por uma conversa privada. Caminhos graduados — verificação leve, notificação escrita média, escalonamento direto para descumprimentos sérios — combinam o peso da resposta com o peso do descumprimento e mantêm a reparação como padrão onde a reparação ainda é possível.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina caminhos leve (inatividade), médio (descumprimento de obrigação) e sério (violação de invariante, segurança). Indique quem inicia, a janela de resposta e a rota de escalonamento para cada um.

</details>

> **Orientação sobre a gravidade do descumprimento:** _<médio = descumprimento de uma obrigação do Acordo de Membresia que não ameaça a segurança dos membros ou a integridade da comunidade; sério = violação de invariante da Camada 0, preocupação crível com segurança, conduta persistente de má-fé.>_

- **Inatividade (descumprimento leve):** _<quem contata o membro; janela de resposta; caminhos de desfecho.>_
- **Descumprimento de obrigação (médio):** _<notificação escrita; janela de resposta; caminhos de resolução / escalonamento.>_
- **Descumprimento sério / violação de invariante:** _<escalonamento direto para a etapa apropriada da Escada de Resolução de Conflitos.>_

## Garantias de Devido Processo

*Cláusulas RCOS: [6.4.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Por que detalhar os direitos de notificação, resposta e recurso?</summary>

Responsabilização sem devido processo é apenas punição com papelada. Um membro diante de uma sanção precisa conhecer a preocupação, ter tempo real para responder e ter um lugar para recorrer — caso contrário, a palavra do órgão decisório é final por padrão, o que concentra poder exatamente onde ele não deveria se concentrar.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique o direito à notificação escrita, uma janela mínima de resposta e um caminho explícito de recurso aos Membros Plenos.

</details>

- **Direito à notificação:** _<o membro é notificado por escrito sobre a preocupação antes de qualquer revisão ou sanção ter início.>_
- **Direito à resposta:** _<janela mínima de resposta — por exemplo, 30 dias.>_
- **Direito a recurso:** _<qualquer decisão pode ser objeto de recurso por meio do processo de governança (voto Estratégico).>_

## Proteções Antirretaliação

*Cláusulas RCOS: [6.3.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards)*

<details data-kind="rationale">
<summary>Por que proteger explicitamente os participantes?</summary>

Se levantar uma preocupação ou prestar informação pode custar a um membro posição, relacionamentos ou acesso, as pessoas vão se calar e o sistema de responsabilização desmorona na prática. Nomear a retaliação como, ela própria, um gatilho torna o custo da supressão maior do que o custo do relato.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique que a retaliação contra qualquer membro que levante, participe ou preste informação a um processo de responsabilização é, ela própria, um gatilho de responsabilização.

</details>

_<A retaliação contra um membro por participar de qualquer parte deste processo é, ela própria, um gatilho de responsabilização.>_

## Opções de Sanção e Reparação

*Cláusulas RCOS: [6.4.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.6](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts), [6.6.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#66-layer-invariants)*

<details data-kind="rationale">
<summary>Por que pré-definir o menu de sanções?</summary>

Sanções inventadas no meio do processo refletem quem fala mais alto na sala, não o que o descumprimento merece. Um menu fixo — com pré-condições, órgão autorizado e caminho de recurso para cada uma — mantém as respostas proporcionais, evita que a exclusão informal vire a punição padrão e torna óbvio quando uma sanção está fora do escopo do órgão que a aplica.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada tipo de sanção, defina as pré-condições, o órgão autorizado e o caminho de recurso. Respostas orientadas à reparação devem ser o padrão; as punitivas reservadas para descumprimentos críticos à segurança ou não resolvidos.

</details>

> Respostas orientadas à reparação são preferidas em relação às punitivas, exceto em casos críticos à segurança.
> As sanções DEVEM ser proporcionais, com prazo definido quando aplicável, documentadas, e nunca aplicadas por meio de exclusão informal ou pressão social.

| Tipo | Pré-condições | Órgão autorizado | Recorrível? |
|---|---|---|---|
| _<Verificação privada / lembrete>_ | _<inatividade ou descumprimento menor>_ | _<papel>_ | _<sim>_ |
| _<Advertência escrita>_ | _<descumprimento de obrigação não resolvido após verificação>_ | _<papel>_ | _<sim>_ |
| _<Restrição temporária de acesso>_ | _<situação crítica à segurança; janela de revisão>_ | _<papel>_ | _<sim>_ |
| _<Saída forçada>_ | _<descumprimento sério ou não resolvido, ou decisão dos Membros Plenos>_ | _<Membros Plenos>_ | _<sim — nova votação>_ |

## Condições para Restauração de Direitos

*Cláusulas RCOS: [6.4.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation)*

<details data-kind="rationale">
<summary>Por que tornar explícitas as condições de restauração?</summary>

Se não há um caminho de volta definido, toda sanção se torna efetivamente permanente e toda saída se torna uma sentença vitalícia. Condições explícitas de restauração sinalizam que a responsabilização é sobre reparação onde a reparação é possível, e impedem o controle de acesso ad hoc sobre se alguém é "realmente" bem-vindo de volta.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada classe de sanção, indique o caminho para a restauração de direitos — nova candidatura após saída voluntária, bloqueio de nova candidatura após saída forçada, restauração após restrição temporária.

</details>

- **Após saída voluntária:** _<nova candidatura via Protocolo de Integração; sem restauração automática.>_
- **Após saída forçada:** _<bloqueio mínimo de nova candidatura; aplica-se o processo padrão de admissão.>_
- **Após restrição temporária de acesso:** _<direitos restaurados mediante confirmação de resolução dentro da janela de revisão.>_

## Coordenação com a Camada 1

*Cláusulas RCOS: [6.4.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation)*

<details data-kind="rationale">
<summary>Por que vincular isto ao Protocolo de Saída e Separação?</summary>

As regras de saída vivem na Camada 1 por um motivo — elas governam quem é e quem não é membro. Se ações de responsabilização criassem seu próprio caminho paralelo de saída, haveria dois conjuntos de regras, dois conjuntos de registros e uma brecha para pular o devido processo. Um único protocolo canônico de saída fecha essa brecha.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique que todas as saídas forçadas e restrições temporárias de acesso seguem o Protocolo de Saída e Separação (Camada 1), e esclareça que uma restrição temporária não constitui saída.

</details>

_<Todas as saídas forçadas e restrições temporárias de acesso seguem o Protocolo de Saída e Separação (Camada 1). Uma restrição temporária de acesso não constitui saída e não aciona o bloqueio de nova candidatura, a menos que uma saída forçada seja subsequentemente votada pelos Membros Plenos.>_

---

## Registro de Ratificação

- **Adotado em:** <AAAA-MM-DD>
- **Tipo de decisão:** Estratégica
- **Versão:** <versão>
- **Registro da decisão:** <link para o registro da decisão>
