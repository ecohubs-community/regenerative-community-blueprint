---
id: a1de3ac3
title: Escada de Resolução de Conflitos
parentId: 608a89f6
order: 0
lang: pt-br
sourceHash: c9922bf2
---

- **Camada:** 4 — Conflito, Reparação e Responsabilização
- **Status:** Modelo — adapte para sua comunidade
- **Referência RCOS:** [§6.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification), [§6.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [§6.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [§6.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)

---

## Classificação de Conflitos

*Cláusulas RCOS: [6.1.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification), [6.1.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification), [6.1.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification), [6.1.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification), [6.1.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification), [6.5.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts), [6.6.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#66-layer-invariants), [6.7.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#67-explicitness-rules)*

<details data-kind="rationale">
<summary>Por que classificar conflitos?</summary>

Sem classes nomeadas, toda disputa acaba tratada da mesma forma — ou, pior, tratada de forma diferente dependendo de quem está envolvido. Classes explícitas definem o ponto de entrada, o prazo de resposta e o ônus de documentação desde o início, de modo que questões críticas de segurança não possam ser silenciosamente encaminhadas por meio de uma conversa amigável e atritos menores não possam ser instrumentalizados em uma revisão formal.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada classe, defina os critérios de entrada, o passo inicial na escada, o prazo de resposta inicial e o ônus de documentação.

</details>

| Classe | Critérios de entrada | Ponto de entrada | Prazo de resposta inicial | Documentação |
|---|---|---|---|---|
| _<Interpessoal>_ | _<atrito entre membros>_ | _<Passo 1>_ | _<prazo>_ | _<a partir de qual passo>_ |
| _<Baseado em papéis>_ | _<disputa sobre desempenho de papel>_ | _<...>_ | _<...>_ | _<...>_ |
| _<Estrutural>_ | _<disputa sobre processo de governança>_ | _<...>_ | _<...>_ | _<...>_ |
| _<Ética / violação de obrigação>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<Crítico de segurança>_ | _<risco de segurança crível, coerção, abuso ou ameaças>_ | _<contorna passos anteriores>_ | _<prazo curto>_ | _<desde a abertura; ação imediata permitida>_ |

> Conflitos críticos de segurança prevalecem sobre direitos de participação, continuidade de papéis e conveniência operacional.

## Passos da Escada de Resolução

*Cláusulas RCOS: [6.2.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [6.2.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [6.2.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [6.2.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [6.2.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [6.5.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts), [6.6.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#66-layer-invariants)*

<details data-kind="rationale">
<summary>Por que uma escada em etapas em vez de um único processo?</summary>

A maior parte dos conflitos é de baixo impacto e é melhor resolvida entre as pessoas envolvidas; forçar tudo para uma revisão formal destruiria a confiança e sobrecarregaria o sistema de governança. Uma escada ajusta o peso do processo ao peso da disputa — conversa privada primeiro, diálogo facilitado em seguida, registro escrito apenas quando necessário, votação de governança somente quando tudo mais falhar. Isso também torna a escalada um direito estrutural, e não um favor concedido por quem detém poder social.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina cada passo da escada: quem está envolvido, o que acontece, o prazo e a regra de escalada. Mantenha os primeiros passos leves e confidenciais; reserve a revisão formal para passos posteriores.

</details>

1. **Conversa direta** — _<as partes tentam resolver em privado; prazo; regras de resultado.>_
2. **Diálogo facilitado** — _<facilitador conduz a conversa; confidencialidade; prazo; regras de resultado.>_
3. **Abertura de responsabilização** — _<registro formal escrito aberto; submissões; prazo; regras de resultado.>_
4. **Revisão de responsabilização** — _<revisão estruturada; ambas as partes presentes; recomendação escrita; prazo; regras de resultado.>_
5. **Decisão de governança** — _<divulgação mínima necessária aos Membros Plenos; período de deliberação; mecanismo de votação e limiar.>_
6. **Processo de separação** — _<coordenado com o Protocolo de Saída e Separação; bloqueio mínimo para reaplicação.>_

## Não-Resposta, Retirada e Impasse

*Cláusulas RCOS: [6.2.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#62-resolution-pathways), [6.1.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#61-conflict-classification)*

<details data-kind="rationale">
<summary>O que impede que um processo seja morto pelo silêncio?</summary>

A maneira mais fácil de derrotar qualquer processo de responsabilização é ignorá-lo. Se a não-resposta, a retirada ou o impasse deixam o assunto congelado, é a parte que sofre o dano que arca com o custo da inação. Regras explícitas para cada modo de falha convertem o silêncio em um gatilho documentado de escalada, em vez de um veto.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Defina como a não-resposta, a retirada no meio do processo, o impasse e a falha procedimental são tratados. Cada um deve ter um caminho de escalada documentado.

</details>

**Se uma parte não responder dentro do prazo definido:**
- _<Aviso de acompanhamento; período de tolerância adicional; tratamento do silêncio continuado como não-resolução; regra de escalada.>_

**Se uma parte se retirar no meio do processo:**
- _<Notificação da retirada; opção para a outra parte encerrar ou solicitar um resumo escrito; regra de escalada para questões de responsabilização pendentes.>_

**Impasse (todas as tentativas de resolução esgotadas):**
- _<Documentação do impasse; escalada para decisão de governança.>_

**Revisão de falha procedimental:**
- _<Como objeções procedimentais são levantadas; onde são registradas; gatilho para revisão deste artefato sob o Protocolo de Mudança.>_

---

## Seleção e Substituição de Facilitador

*Cláusulas RCOS: [6.3.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [6.3.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards)*

<details data-kind="rationale">
<summary>Por que definir como o Facilitador é escolhido ou substituído?</summary>

Um facilitador implicado no conflito — ou socialmente alinhado a uma das partes — não consegue conduzir o processo de forma justa, por melhores que sejam suas intenções. Definir regras de seleção e substituição com antecedência significa que a parte afetada não precisa lutar por uma escuta neutra enquanto já está sob estresse.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique o papel padrão do facilitador, a regra quando o facilitador é uma das partes, o direito de recusa e qualquer previsão de facilitação externa.

</details>

- _<Papel padrão do facilitador conforme o Registro de Papéis.>_
- _<Regra quando o facilitador é uma das partes — seleção de um substituto neutro.>_
- _<Direito de qualquer das partes de recusar um facilitador com conflito de interesse declarado.>_
- _<Facilitação externa opcional mediante acordo mútuo.>_

## Limites de Privacidade e Acesso à Informação

*Cláusulas RCOS: [6.5.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>Por que delimitar o fluxo de informação de forma tão estrita?</summary>

Os registros de conflito contêm o material mais sensível que a comunidade guarda. Vazamentos, fofocas ou divulgações casuais causam danos de segunda ordem e desencorajam relatos futuros. Limites explícitos — o que permanece com as partes, o que chega aos Membros Plenos e quando os registros são destruídos — tornam a confidencialidade exigível, e não meramente aspiracional.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Indique quais passos são totalmente confidenciais, qual a informação mínima que pode ser divulgada na etapa de governança, o período de retenção e a obrigação de não divulgação.

</details>

- _<Passos 1–4: totalmente confidenciais; apenas as partes e o Facilitador podem acessar os registros.>_
- _<Passos 5–6: informação mínima necessária divulgada aos Membros Plenos; partes notificadas antes da divulgação. Defina o que significa "mínima necessária".>_
- _<Retenção de registros: quem guarda os registros, por quanto tempo, e quando são destruídos.>_
- _<Não divulgação: nenhum participante pode compartilhar informações sobre o processo fora dos participantes definidos sem o consentimento escrito de todas as partes.>_

## Salvaguardas

*Cláusulas RCOS: [6.3.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [6.3.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [6.3.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [6.3.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [6.3.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards), [6.6.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#66-layer-invariants)*

<details data-kind="rationale">
<summary>Por que existem salvaguardas além da escada?</summary>

Processo, por si só, não protege a parte com menos poder. Retaliação, denúncias de má-fé, facilitadores em conflito de interesse e riscos de segurança não revisados podem neutralizar até mesmo um bom procedimento. As salvaguardas são as redes de proteção que mantêm a escada funcional quando os incentivos atuam contra o relato honesto.

</details>

<details data-kind="instructions">
<summary>Como preencher</summary>

Para cada salvaguarda, indique a regra e a consequência quando ela é violada. Casos com diferencial de poder precisam de seu próprio canal de abertura.

</details>

- **Antirretaliação:** _<retaliação contra um membro que levanta um conflito de boa-fé é, em si, motivo para um processo de responsabilização.>_
- **Denúncias de má-fé:** _<denúncias deliberadamente falsas podem desencadear um processo de responsabilização contra o denunciante.>_
- **Conflito de interesse do facilitador:** _<ver Seleção e Substituição de Facilitador.>_
- **Pausa do processo:** _<qualquer das partes pode pausar uma vez por até X dias mediante aviso escrito.>_
- **Ação imediata em caso crítico de segurança:** _<o facilitador pode recomendar uma restrição temporária de acesso aguardando revisão; prazo de revisão.>_
- **Diferencial de poder — canal de abertura separado:** _<quando há um diferencial de poder, o membro afetado pode submeter a abertura diretamente a um órgão diferente do Facilitador padrão.>_
- **Suspensão de papel durante a revisão:** _<os Membros Plenos podem suspender temporariamente a autoridade delegada de um detentor de papel durante a revisão, sem que isso constitua saída forçada.>_

---

## Registro de Ratificação

- **Adotado:** <AAAA-MM-DD>
- **Tipo de decisão:** Estratégica
- **Versão:** <versão>
- **Registro de decisão:** <link para o registro de decisão>
