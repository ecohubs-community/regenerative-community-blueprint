**RCOS — Sistema Operacional de Comunidade Regenerativa**

# Especificação do RCOS Core — v0.1

- **Gerado em:** 2026-07-07
- **Fonte (versão mais recente):** [https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1)

- Status: Rascunho
- Versão: RCOS-Core v0.1
- Público: fundadores de comunidades, praticantes, auditores, implementadores
- Palavras-chave normativas: `DEVE`, `NÃO DEVE`, `DEVERIA`, `PODE` (estilo RFC)

## Sumário

- [Sobre o RCOS Core](#sobre-o-rcos-core)
- [0. Introdução](#0-introduo)
- [1. Modelo de Conformidade do RCOS](#1-modelo-de-conformidade-do-rcos)
- [2. Camada 0 — Identidade e Escopo](#2-camada-0-identidade-e-escopo)
- [3. Camada 1 — Sistema de Filiação](#3-camada-1-sistema-de-filiao)
- [4. Camada 2 — Governança e Lógica de Decisão](#4-camada-2-governana-e-lgica-de-deciso)
- [5. Camada 3 — Sistema Econômico e de Recursos](#5-camada-3-sistema-econmico-e-de-recursos)
- [6. Camada 4 — Conflito, Reparação e Responsabilização](#6-camada-4-conflito-reparao-e-responsabilizao)
- [7. Camada 5 — Operações e Coordenação](#7-camada-5-operaes-e-coordenao)
- [8. Camada 6 — Evolução e Adaptação](#8-camada-6-evoluo-e-adaptao)
- [9. Seções Não Normativas](#9-sees-no-normativas)
- [10. Conformidade e Auditoria](#10-conformidade-e-auditoria)
- [11. Versionamento e Governança do Padrão](#11-versionamento-e-governana-do-padro)
- [Apêndice A — Glossário](#apndice-a-glossrio)
- [Apêndice B — Exemplos de Artefatos (Não Normativo)](#apndice-b-exemplos-de-artefatos-no-normativo)
- [Apêndice C — Resumo da Implementação de Referência](#apndice-c-resumo-da-implementao-de-referncia)

---

# Sobre o RCOS Core

## O que é o RCOS

O **Sistema Operacional de Comunidades Regenerativas (RCOS)** é uma especificação formal e em camadas para projetar, operar e evoluir comunidades intencionais sem depender de carisma, ideologia ou poder informal.

O RCOS trata uma comunidade como um **sistema governado**, não como um experimento social. Ele define os requisitos estruturais mínimos necessários para que uma comunidade permaneça:

- coerente sob estresse,
- justa diante de assimetrias de poder,
- adaptável sem colapsar,
- e regenerativa ao longo do tempo.

O RCOS não é um estilo de vida, sistema de crenças ou identidade cultural. Ele é um **sistema operacional**: um conjunto de regras explícitas, interfaces, invariantes e casos de teste que tornam a vida comunitária legível, auditável e sustentável.

---

## Qual problema o RCOS resolve

A maioria das comunidades não fracassa por causa de más intenções. Elas fracassam por causa de **estrutura implícita**.

Padrões comuns de fracasso incluem:

- líderes informais sobrepondo-se a processos formais,
- normas não declaradas aplicadas como regras,
- trabalho invisível levando ao esgotamento,
- riqueza ou carisma se transformando em poder,
- conflitos sendo evitados até se tornarem existenciais,
- decisões de emergência se tornando exceções permanentes.

O RCOS existe para tornar esses modos de falha **estruturalmente impossíveis ou explicitamente tratáveis**.

---

## O que o RCOS não é

O RCOS explicitamente **não** prescreve:

- uma cultura, crença ou espiritualidade específica,
- uma ideologia política ou econômica,
- um método de governança (por exemplo, consenso vs sociocracia),
- ou como as pessoas _deveriam_ viver juntas.

Em vez disso, o RCOS restringe _como as escolhas são feitas_, _como o poder é limitado_ e _como a mudança ocorre_, independentemente dos valores.

---

## Princípios de Design (Inegociáveis)

> **Nada essencial pode permanecer implícito.**

- **Baseado em restrições, não em valores** — Define regras e limites em vez de prescrever crenças. Valores variam; restrições mantêm os sistemas funcionais sob estresse.
- **Pré-compromisso em vez de improvisação** — Decisões críticas (conflito, poder, dinheiro) são acordadas antes que emoções, escassez ou disputas de poder surjam.
- **Modular por padrão** — O núcleo permanece estável enquanto módulos de domínio opcionais podem ser adicionados, substituídos ou removidos sem quebrar o sistema.
- **Escala humana (≈ 5–150 pessoas)** — Otimizado para grupos pequenos o suficiente para manter confiança, responsabilidade e contexto compartilhado sem burocracia.
- **Tolerante a falhas, não cego a falhas** — Pressupõe que conflitos, esgotamento e erros acontecerão e fornece caminhos explícitos de recuperação.

Qualquer coisa que afete o seguinte DEVE ser explicitamente declarada, versionada e revisável:

- autoridade
- pertencimento
- recursos
- conflito
- evolução do sistema

- Silêncio nunca é tratado como consentimento.
- Tradição nunca é tratada como autoridade.
- Urgência nunca é tratada como justificativa.

---

## Sobre o tamanho do grupo: por que ~150?

**150** ≈ Número de Dunbar: limite cognitivo para relações sociais estáveis.

- **Comunidade mínima viável (5–7 pessoas):**
  Abaixo disso, a separação de papéis e a resolução de conflitos entram em colapso.
- **Faixa horizontal ótima (8–40 pessoas):**
  Alta confiança, baixa burocracia, participação direta possível.
- **Tamanho máximo não segmentado (120–150 pessoas):**
  Acima disso, a governança informal falha.

O Núcleo do RCOS se aplica a qualquer tamanho, mas acima de ~150 pessoas, subestruturas obrigatórias (círculos, domínios, bairros) são necessárias.

---

## Por que a estrutura do Núcleo do RCOS importa

- Previne a dominação por fundadores
- Torna o poder explícito
- Reduz normas ocultas
- Sobrevive a conflitos
- Permite replicação
- Integra-se de forma limpa com ferramentas DAO, _sem depender delas_

---

## O que está deliberadamente fora do Núcleo do RCOS

Estas coisas pertencem a **módulos opcionais**, não ao núcleo:

- Design de permacultura
- Filosofia educacional
- Práticas espirituais ou culturais
- Ideologia política
- Escolhas estéticas ou de estilo de vida

O núcleo governa como as decisões são tomadas, não quais decisões devem ser tomadas.

---

## Invariantes (Aplicam-se a Todas as Camadas)

### Explícito Vence Implícito

Se não está escrito, acordado e versionado, **não existe**.

### Por que isso importa

As Invariantes de Camada garantem que nenhuma quantidade de boa vontade, carisma, urgência ou consenso possa silenciosamente erodir o sistema.

---

## A Regra de Explicitude do RCOS (Princípio Central)

**Qualquer coisa que aloque poder, risco, responsabilidade ou condições de saída DEVE ser explícita.**

Qualquer coisa que expresse preferência, estilo ou otimização local PODE ser opcional.

### Explícito vs Opcional por Camada

Usamos três categorias:

- **DEVE ser explícito** → exigido para conformidade com o RCOS
- **PODE ser explícito** → recomendado, mas depende do contexto
- **DEVE permanecer opcional** → nunca imposto pelo núcleo

### Invariante de Explicitude entre Camadas

**Se algo pode:**

- Remover os direitos de alguém
- Comprometer o tempo ou trabalho de alguém
- Controlar recursos compartilhados
- Silenciar discordância
- Impedir a saída

**Então DEVE ser explícito, documentado e revisável.**

Sem exceções.

Essa abordagem garante:

- O RCOS **não** se torna burocrático
- As comunidades mantêm liberdade cultural
- Apenas o _risco estrutural_ é regulado
- Módulos opcionais permanecem poderosos, não restritos

---

## Design Orientado por Testes de Estresse

O RCOS é validado não pela intenção, mas pela **resistência a falhas**.

A especificação inclui um conjunto crescente de **testes de estresse** derivados de colapsos reais de comunidades, tais como:

- dominação em reuniões
- poder de veto do fundador
- privatização dos bens comuns
- culturas de evitação de conflito
- autoridade espiritual carismática
- contornos de regras em emergências

Uma comunidade só é considerada alinhada ao RCOS se puder **resistir a esses cenários sem soluções informais**.

Quase todo fracasso acontece porque:

**Algo poderoso foi deixado implícito.**

O RCOS transforma:

- Poder implícito → papéis explícitos
- Valores implícitos → regras delimitadas
- Punição implícita → devido processo
- Propriedade implícita → direitos declarados

### Modos de Falha Conhecidos que o RCOS foi Projetado para Prevenir

Veja [Testes de Estresse do RCOS](https://rcos.ecohubs.community/pt-br/articles/rcos-stress-tests?id=6acbe9a7)

## Implementações de Referência

O RCOS incentiva pequenas **comunidades de referência** do mundo real que:

- implementem as camadas centrais explicitamente,
- documentem desvios e falhas,
- e publiquem os aprendizados de volta no padrão.

O objetivo não é a perfeição, mas a **evolução por meio da transparência**.

---

## Por que "Regenerativo"

O RCOS usa o termo _regenerativo_ deliberadamente.

Um sistema regenerativo:

- não depende de crescimento constante,
- não esgota seus membros,
- repara danos em vez de escondê-los,
- e se fortalece ao integrar falhas.

O RCOS é projetado para que **o estresse produza aprendizado**, não colapso.

---

## Para quem é o RCOS

O RCOS é destinado a:

- comunidades intencionais,
- ecovilas e projetos de cohousing,
- cooperativas e organizações baseadas em bens comuns,
- experimentos de vida coletiva de longo prazo,
- e qualquer grupo que queira sobreviver ao próprio sucesso.

O RCOS é especialmente útil para grupos que já compartilham valores fortes — e querem garantir que esses valores não se tornem ferramentas de coerção.

---

## Como usar o RCOS

O RCOS pode ser usado como:

- um **modelo de design** antes de fundar uma comunidade,
- um **framework de auditoria** para grupos existentes,
- uma **ferramenta de teste de estresse** durante conflitos,
- ou uma **linguagem compartilhada** para conversas estruturais difíceis.

A adoção pode ser incremental. A conformidade pode ser parcial. O que importa é a **explicitude, não a pureza**.

---

## A Afirmação Central

> Comunidades não fracassam porque as pessoas são falhas.  
> Elas fracassam porque os sistemas são vagos.

O RCOS existe para substituir a vagueza pela estrutura —  
para que cuidado, autonomia e regeneração tenham algo sólido sobre o qual se apoiar.

---

## Registro de Mudanças

- [v0.1](https://rcos.ecohubs.community/pt-br/articles/rcos-core/v0-1?id=e6de7a5d) — Versão inicial


---

# 0. Introdução

## 0.1 Propósito do RCOS

Define um sistema operacional padronizado e modular para comunidades pequenas e intencionais, focado em resiliência, justiça e regeneração.

## 0.2 Escopo do Core

Esta especificação define as **camadas centrais obrigatórias** necessárias para a conformidade com o RCOS. Práticas específicas de domínio são excluídas e tratadas por meio de módulos opcionais.

## 0.3 Princípios de Design

- Baseado em restrições, não em valores
- Pré-compromisso em vez de improvisação
- Modular por padrão
- Em escala humana
- Tolerante a falhas

## 0.4 Definições e Terminologia

- Comunidade
- Membro
- Papel
- Domínio
- Bens Comuns
- Invariante
- Tipo de Decisão
- Conformidade


---

# 1. Modelo de Conformidade do RCOS

## 1.1 Níveis de Conformidade

- Conforme com RCOS-Core
- RCOS-Core + módulos (não normativo)

## 1.2 Exigência de Explicitude

Qualquer mecanismo que afete poder, recursos, obrigações ou saída `DEVE` ser explícito, documentado e revisável.

## 1.3 Meta-Invariante

Se não estiver escrito e adotado, não existe.


---

# 2. Camada 0 — Identidade e Escopo

A Camada 0 define a identidade constitucional da comunidade. Ela estabelece o que a comunidade *é*, o que *não é* e as restrições inegociáveis sob as quais todas as outras camadas operam. Nenhuma regra, decisão ou prática nas camadas superiores pode contradizer a Camada 0.

## 2.1 Definição de Propósito

2.1.1 Uma comunidade DEVE definir exatamente um propósito primário.

2.1.2 O propósito primário DEVE descrever a razão duradoura da existência da comunidade e NÃO DEVE ser uma meta, projeto ou estratégia de curto prazo.

2.1.3 O propósito primário DEVE ser estável ao longo do tempo e só DEVE ser alterado por meio de uma decisão constitucional conforme definido na Camada 2 e executada pelo processo de mudança definido na Camada 6.

2.1.4 Propósitos secundários PODEM ser definidos, mas NÃO DEVEM conflitar com nem sobrepor-se ao propósito primário.

2.1.5 Nenhuma ação, decisão ou alocação de recursos PODE contradizer materialmente o propósito primário declarado.

## 2.2 Declaração de Escopo

2.2.1 A comunidade DEVE declarar explicitamente o escopo daquilo que governa.

2.2.2 A declaração de escopo DEVE incluir, no mínimo:
- Ativos governados pela comunidade
- Domínios de autoridade decisória
- Atividades e responsabilidades sob controle coletivo

2.2.3 A declaração de escopo DEVE listar explicitamente o que está fora do escopo.

2.2.4 Qualquer coisa que não seja explicitamente declarada como dentro do escopo DEVE ser tratada como fora do escopo.

2.2.5 A comunidade NÃO DEVE exercer autoridade sobre pessoas, ativos ou domínios declarados como fora do escopo.

## 2.3 Invariantes

2.3.1 Invariantes são restrições que definem o que NÃO DEVE ser violado enquanto estiverem em vigor.

2.3.2 Invariantes DEVEM ser listadas e documentadas explicitamente.

2.3.3 Invariantes DEVEM se aplicar a todas as camadas do RCOS.

2.3.4 Nenhuma decisão, papel, processo ou medida de emergência PODE sobrepor-se a uma invariante.

2.3.5 Se surgir um conflito entre uma invariante e qualquer outra regra, a invariante DEVE prevalecer.

2.3.6 Invariantes só PODEM ser alteradas ou removidas por meio de um processo de mudança constitucional conforme definido na Camada 2 e na Camada 6.

## 2.4 Restrições de Identidade

2.4.1 A comunidade DEVE declarar quaisquer restrições no nível da identidade que afetem materialmente a participação, o comportamento ou a governança.

2.4.2 Restrições de identidade PODEM incluir, entre outras:
- Limites éticos ou comportamentais
- Pré-requisitos para participação
- Restrições culturais ou ecológicas inegociáveis

2.4.3 Restrições de identidade DEVEM ser testáveis e aplicáveis por meio de processos definidos.

2.4.4 Restrições de identidade NÃO DEVEM ser aplicadas de forma implícita ou informal.

## 2.5 Artefatos

2.5.1 Os seguintes artefatos são obrigatórios para conformidade com a Camada 0:
- Carta de Propósito
- Declaração de Escopo
- Registro de Invariantes
- Registro de Restrições de Identidade

2.5.2 Os artefatos da Camada 0 DEVEM ser:
- Publicamente acessíveis a todos os membros
- Versionados
- Adotados por meio de um processo formal de ratificação

2.5.3 Se os artefatos da Camada 0 estiverem ausentes, ambíguos ou internamente contraditórios, a comunidade DEVE ser considerada não conforme com o RCOS-Core.


---

# 3. Camada 1 — Sistema de Filiação

A Camada 1 define como os indivíduos entram, participam e saem da comunidade. Ela estabelece a relação explícita entre o indivíduo e o coletivo, incluindo direitos, obrigações e devido processo. Nenhuma pessoa pode ser tratada como membro sem passar pelos mecanismos definidos nesta camada.

## 3.1 Estados de Filiação

3.1.1 A comunidade DEVE definir estados explícitos de filiação.

3.1.2 No mínimo, os seguintes estados de filiação DEVEM existir:
- Candidato
- Membro em Período de Experiência / Probatório
- Membro Pleno
- Membro Desligado

3.1.3 Cada estado de filiação DEVE ter direitos, obrigações e limitações claramente definidos.

3.1.4 Nenhum indivíduo PODE manter múltiplos estados de filiação simultaneamente.

3.1.5 Nenhum direito ou obrigação PODE ser presumido fora do estado de filiação atual do indivíduo.

## 3.2 Entrada e Integração

3.2.1 A entrada na comunidade DEVE seguir um processo explícito de integração.

3.2.2 O processo de integração DEVE incluir:
- Revisão de todos os artefatos do RCOS-Core
- Consentimento explícito às regras da Camada 0 e da Camada 1
- Declaração do estado inicial de filiação

3.2.3 Os critérios de admissão DEVEM ser explícitos e documentados.

3.2.4 Filiação informal, implícita ou retroativa NÃO DEVE ser permitida.

## 3.3 Período de Experiência e Avaliação

3.3.1 A comunidade DEVE definir um período probatório para novos membros.

3.3.2 O período probatório DEVE ter:
- Uma duração definida
- Critérios explícitos de avaliação
- Um processo claro de decisão sobre a transição

3.3.3 Durante o período probatório, os direitos PODEM ser limitados, mas as obrigações DEVEM ser explícitas.

3.3.4 A falha na transição do período probatório DEVE acionar um processo definido de saída ou extensão.

## 3.4 Direitos e Obrigações

3.4.1 A comunidade DEVE definir explicitamente os direitos dos membros.

3.4.2 A comunidade DEVE definir explicitamente as obrigações dos membros.

3.4.3 Direitos e obrigações DEVEM ser simétricos e proporcionais ao estado de filiação.

3.4.4 Nenhuma obrigação PODE ser aplicada sem um direito correspondente e documentado.

3.4.5 As obrigações NÃO DEVEM ser abertas ou indefinidas.

## 3.5 Participação e Contribuição

3.5.1 As expectativas de participação DEVEM ser explicitamente definidas.

3.5.2 As formas aceitáveis de contribuição DEVEM ser listadas.

3.5.3 A substituição da participação (por exemplo, terceirização de trabalho) DEVE ser explicitamente regulamentada.

3.5.4 A não-participação persistente DEVE acionar um processo de responsabilização conforme definido na Camada 4.

## 3.6 Saída e Separação

3.6.1 A saída voluntária DEVE ser possível a qualquer momento.

3.6.2 Os procedimentos de saída DEVEM ser explícitos, documentados e não punitivos.

3.6.3 A saída forçada DEVE seguir o devido processo e ser conduzida por meio dos mecanismos da Camada 4.

3.6.4 A saída NÃO DEVE resultar em perda de direitos além daqueles explicitamente vinculados à filiação.

3.6.5 A separação de bens, papéis e responsabilidades DEVE ser definida antes da saída.

## 3.7 Suspensão e Status Temporário

3.7.1 A comunidade PODE definir estados de suspensão temporária.

3.7.2 As condições de suspensão DEVEM ser explícitas, com prazo definido e revisáveis.

3.7.3 A suspensão NÃO DEVE ser usada como substituto indefinido ou punitivo para a saída.

## 3.8 Artefatos

3.8.1 Os seguintes artefatos são obrigatórios para a conformidade com a Camada 1:
- Acordo de Filiação
- Protocolo de Integração
- Protocolo de Saída e Separação
- Registro de Estados de Filiação

3.8.2 Os artefatos da Camada 1 DEVEM ser:
- Explícitos e inequívocos
- Versionados
- Acessíveis a todos os membros

3.8.3 A ausência, ambiguidade ou violação sistemática dos artefatos da Camada 1 DEVE resultar na perda de conformidade com o RCOS-Core.


---

# 4. Camada 2 — Governança e Lógica de Decisão

A Camada 2 define como as decisões coletivas são tomadas, quem está autorizado a tomá-las e como a autoridade é restringida. A governança no RCOS é projetada para tornar o poder explícito, delimitado, revisável e reversível.

## 4.1 Tipos de Decisão

4.1.1 Todas as decisões coletivas DEVEM ser classificadas em exatamente um dos seguintes tipos de decisão:
- Decisões Operacionais
- Decisões Estratégicas
- Decisões Constitucionais

4.1.2 Decisões Operacionais dizem respeito ao funcionamento e à execução do dia a dia dentro das regras existentes.

4.1.3 Decisões Estratégicas dizem respeito à direção de longo prazo, à alocação de recursos significativos ou à criação/remoção de grandes estruturas.

4.1.4 Decisões Constitucionais dizem respeito a mudanças nos invariantes da Camada 0, no propósito, no escopo ou no próprio sistema de governança.

4.1.5 Se uma decisão não puder ser classificada com clareza, ela DEVE recair, por padrão, no tipo de decisão de maior impacto.

## 4.2 Mecanismos de Decisão

4.2.1 Cada tipo de decisão DEVE ter um mecanismo de tomada de decisão explicitamente definido.

4.2.2 Os mecanismos de decisão PODEM incluir, entre outros:
- Tomada de decisão por consentimento
- Votação por maioria simples
- Votação por maioria qualificada
- Autoridade delegada
- Atribuição aleatória ou rotativa

4.2.3 Os mecanismos de decisão DEVEM especificar:
- Participantes elegíveis
- Limiares de decisão
- Condições de bloqueio ou veto, se houver
- Restrições de tempo

4.2.4 Nenhum mecanismo de decisão informal ou ad hoc PODE ser usado para decisões coletivas.

## 4.3 Limites de Autoridade

4.3.1 Toda autoridade DEVE ser atribuída a papéis, círculos ou órgãos explicitamente definidos.

4.3.2 As atribuições de autoridade DEVEM incluir:
- Escopo da autoridade
- Limites da autoridade
- Duração ou mandato, quando aplicável

4.3.3 Nenhum indivíduo ou órgão PODE exercer autoridade fora do seu escopo explicitamente atribuído.

4.3.4 A autoridade NÃO DEVE derivar de carisma, antiguidade, propriedade ou influência informal.

4.3.5 A autoridade temporária ou de emergência DEVE ser explicitamente definida, limitada no tempo e sujeita a revisão.

## 4.4 Matriz de Decisão

4.4.1 A comunidade DEVE manter uma Matriz de Decisão como artefato central de governança.

4.4.2 A Matriz de Decisão DEVE mapear, no mínimo:
- Tipo de decisão
- Domínio da decisão
- Papel ou órgão autorizado
- Mecanismo de decisão
- Limiar de aprovação
- Caminho de escalonamento

4.4.3 A Matriz de Decisão DEVE estar publicamente acessível a todos os membros.

4.4.4 Decisões tomadas fora da Matriz de Decisão DEVEM ser consideradas inválidas.

## 4.5 Protocolo de Governança

4.5.1 A comunidade DEVE definir um Protocolo de Governança que descreva o ciclo de vida completo de uma decisão.

4.5.2 O Protocolo de Governança DEVE incluir:
- Requisitos para submissão de propostas
- Processo de análise e deliberação
- Execução da decisão
- Documentação e publicação
- Mecanismos de recurso e revisão

4.5.3 O Protocolo de Governança DEVE definir como os conflitos entre decisões são resolvidos.

4.5.4 Todas as ações de governança DEVEM ser documentadas de acordo com as regras de documentação da Camada 5.

## 4.6 Salvaguardas e Modos de Falha

4.6.1 O sistema de governança DEVE incluir salvaguardas contra:
- Concentração de poder de decisão
- Vetos informais
- Captura de decisões por subgrupos
- Entrincheiramento de fundadores ou de papéis

4.6.2 Os mecanismos de governança DEVEM permitir contestação e revisão sem retaliação.

4.6.3 Falhas persistentes de governança DEVEM acionar uma revisão formal ou um processo constitucional.

## 4.7 Artefatos

4.7.1 Os seguintes artefatos são obrigatórios para conformidade com a Camada 2:
- Matriz de Decisão
- Protocolo de Governança
- Registro de Autoridade

4.7.2 Os artefatos da Camada 2 DEVEM ser:
- Explícitos e inequívocos
- Versionados
- Acessíveis a todos os membros

4.7.3 A ausência, ambiguidade ou violação sistemática dos artefatos da Camada 2 DEVE resultar na perda da conformidade com o RCOS-Core.


---

# 5. Camada 3 — Sistema Econômico e de Recursos

A Camada 3 define como valor, recursos e obrigações fluem dentro da comunidade.  
Seu propósito é tornar o poder econômico explícito, limitado, revisável e subordinado à governança, prevenindo acumulação oculta, dependência ou coerção.

## 5.1 Recursos Comuns vs Privados

5.1.1 Todos os recursos dentro do escopo governado declarado DEVEM ser explicitamente classificados como **comuns** ou **privados**.

5.1.2 A comunidade DEVE manter um registro único, explícito e versionado dos recursos governados, incluindo no mínimo:
- Nome do recurso ou identificador único  
- Classificação (comum ou privado)  
- Administrador ou proprietário (conforme aplicável)  
- Regras de acesso e uso  
- Restrições de transferência, venda ou privatização (se houver)

5.1.3 Qualquer recurso não classificado explicitamente DEVE ser tratado como **não classificado**, e a comunidade NÃO DEVE alocá-lo, onerá-lo, monetizá-lo ou transferi-lo até que a classificação seja concluída por meio de uma decisão autorizada.

5.1.4 Para recursos comuns, a comunidade DEVE definir explicitamente:
- Responsabilidades de administração  
- O órgão ou papel de tomada de decisão autorizado  
- Obrigações de manutenção  
- Mecanismos de financiamento ou contribuição (se houver)

5.1.5 Para recursos privados, a comunidade NÃO DEVE exercer autoridade além do que está explicitamente declarado no escopo, nos acordos de associação ou em outros artefatos governados.

## 5.2 Reconhecimento de Contribuições

5.2.1 A comunidade DEVE definir explicitamente quais categorias de contribuição são reconhecidas. Estas PODEM incluir, mas não se limitam a:
- Trabalho  
- Cuidado e trabalho emocional  
- Conhecimento e educação  
- Administração e manutenção  
- Trabalho administrativo ou de coordenação  

5.2.2 A comunidade DEVE definir um mecanismo de reconhecimento de contribuições especificando:
- O que se qualifica como contribuição  
- Como as contribuições são registradas ou reconhecidas  
- Quem PODE registrar, validar ou contestar contribuições  
- Se e como o reconhecimento de contribuições afeta o acesso a recursos, privilégios ou obrigações  

5.2.3 A comunidade NÃO DEVE depender estruturalmente de trabalho não pago, invisível ou informal para a sobrevivência do sistema sem definir explicitamente as obrigações correspondentes, o reconhecimento ou os mecanismos de compensação.

5.2.4 Se forem usadas unidades econômicas internas (ex.: créditos de tempo, pontos, tokens), o Protocolo de Economia Interna DEVE definir:
- Regras de emissão  
- Regras de transferibilidade  
- Mecanismos de expiração, decaimento ou limite máximo (se houver)  
- Prevenção de fraude, tratamento de disputas e mecanismos de correção  
- Regras de privacidade e transparência para saldos e transações  

5.2.5 O reconhecimento de contribuições NÃO DEVE criar autoridade decisória implícita, poder de veto ou influência sobre a governança além do que está definido na Camada 2.

## 5.3 Gestão da Tesouraria

5.3.1 A comunidade DEVE definir explicitamente quais recursos são mantidos na tesouraria compartilhada e como as fronteiras da tesouraria se conectam com os recursos privados.

5.3.2 As fontes de receita e quaisquer interfaces externas de receita DEVEM ser explicitamente definidas.

5.3.3 A autoridade de gastos DEVE ser explicitamente limitada por meio de:
- Atribuições claras de autoridade  
- Limites por valor e/ou categoria  
- Caminhos de aprovação e escalonamento  
- Requisitos obrigatórios de registro  

5.3.4 A transparência DEVE ser o padrão para saldos da tesouraria, entradas, saídas, obrigações e compromissos.

5.3.5 Quaisquer exceções à transparência DEVEM ser explicitamente definidas, justificadas, limitadas no tempo, e NÃO DEVEM impedir que membros auditem a conformidade.

5.3.6 A comunidade DEVE definir políticas de reserva, risco e responsabilidade, incluindo:
- Limites de endividamento  
- Obrigações de longo prazo  
- Reservas de contingência (se houver)

## 5.4 Restrições de Acumulação

5.4.1 Sistemas econômicos internos DEVEM impedir a concentração ilimitada de influência ou controle interno por meio de recursos, créditos ou obrigações financeiras.

5.4.2 Se existirem unidades internas, a comunidade DEVE definir um ou mais mecanismos limitadores de acumulação, que PODEM incluir:
- Limites máximos  
- Decaimento ou expiração  
- Não transferibilidade  
- Mecanismos de redistribuição ou taxação  
- Validade limitada no tempo  

5.4.3 Mecanismos econômicos NÃO DEVEM permitir que membros contornem as fronteiras de autoridade de governança definidas na Camada 2, inclusive por meio da compra de influência, da criação de dependência ou da conversão de poder econômico em autoridade decisória informal.

5.4.4 A comunidade DEVE definir indicadores revisáveis de risco de concentração econômica e um mecanismo explícito para ajustar as restrições quando tais riscos forem detectados.

## 5.5 Artefatos

5.5.1 Os seguintes artefatos são obrigatórios para a conformidade com a Camada 3:
- Protocolo de Economia Interna  
- Conjunto de Regras da Tesouraria  

5.5.2 Os artefatos da Camada 3 DEVEM ser:
- Explícitos e inequívocos  
- Versionados  
- Acessíveis a todos os membros (com exceções explícitas e limitadas)  
- Adotados por meio de um processo de governança autorizado  

5.5.3 O Protocolo de Economia Interna DEVE definir, no mínimo:
- Categorias de contribuição e mecanismos de reconhecimento  
- Fronteiras entre comuns e privados e regras de alocação  
- Unidades internas (se houver) e restrições de acumulação  
- Interfaces externas de receita (se houver)  
- Resolução de disputas e mecanismos de correção para registros econômicos  

5.5.4 O Conjunto de Regras da Tesouraria DEVE definir, no mínimo:
- Fontes de receita  
- Limites de autoridade de gastos e caminhos de aprovação  
- Requisitos de transparência e prestação de contas (incluindo quaisquer exceções limitadas)  
- Restrições de reserva, risco e endividamento  
- Regras de conflito de interesse para gastos e aquisições  

## 5.6 Invariantes da Camada

5.6.1 Recursos compartilhados, fluxos e obrigações DEVEM ser visíveis para a comunidade por padrão, com apenas exceções limitadas e explícitas.

5.6.2 Recursos declarados como comuns NÃO DEVEM ser privatizados por meio de ação informal, implícita ou unilateral.

5.6.3 O reconhecimento de contribuições DEVE ser explícito, de modo que o trabalho não pago ou invisível não seja estruturalmente exigido para a sobrevivência do sistema.

5.6.4 Mecanismos econômicos DEVEM impedir a concentração indefinida de influência interna.

## 5.7 Regras de Explicitude

5.7.1 O seguinte DEVE ser explícito:
- Classificações entre comuns e privados  
- Regras de alocação e acesso para recursos compartilhados  
- Limites de autoridade de gastos  
- Regras de transparência  
- Interfaces externas de receita  

5.7.2 O seguinte PODE ser explícito:
- Modelos de valoração de contribuições  
- Unidades internas (tokens, horas, pontos)  
- Categorias orçamentárias e estruturas internas de contabilidade  

5.7.3 O seguinte DEVE permanecer opcional e fora do escopo:
- Atitudes em relação à riqueza  
- Resultados iguais vs diferenciados  
- Escolhas financeiras pessoais


---

# 6. Camada 4 — Conflito, Reparação e Responsabilização

A Camada 4 define como a comunidade responde quando confiança, coordenação ou segurança se rompem.  
Seu propósito é garantir que conflitos sejam tratados de forma explícita, justa e segura, prevenindo abuso de poder, normalização de danos ou exclusão silenciosa.

## 6.1 Classificação de Conflitos

6.1.1 A comunidade DEVE definir um sistema explícito de classificação de conflitos que seja conhecido, acessível e utilizável por todos os membros.

6.1.2 No mínimo, o sistema de classificação DEVE incluir as seguintes classes:
- Conflitos interpessoais (entre indivíduos)
- Conflitos baseados em papéis (disputas de autoridade, responsabilidade ou mandato)
- Conflitos estruturais (incentivos sistêmicos, regras ou questões de alocação de recursos)
- Violações éticas ou de limites (violações de normas declaradas, escopo ou limites de segurança)

6.1.3 Cada classe de conflito DEVE definir explicitamente:
- Critérios de entrada (como uma situação é classificada nesta classe)
- Prioridade e prazos esperados de resposta (se houver)
- Caminhos de resolução permitidos e obrigatórios
- Requisitos de documentação e limites de privacidade

6.1.4 Conflitos que envolvam riscos credíveis à segurança, coerção, abuso ou ameaças DEVEM ser classificados como **críticos para a segurança** e DEVEM acionar salvaguardas elevadas conforme definido na Seção 6.3.

6.1.5 A classificação incorreta ou a evitação de classificação DEVE ser tratada como uma falha de processo sujeita a revisão.

## 6.2 Caminhos de Resolução

6.2.1 A comunidade DEVE definir um processo mínimo de resolução de conflitos aplicável a todas as classes de conflito.

6.2.2 O processo de resolução DEVE incluir uma **escada de resolução** claramente definida com etapas explícitas de escalonamento.

6.2.3 A escada de resolução DEVE definir, no mínimo:
- Como um conflito é levantado, registrado e reconhecido
- Como as partes envolvidas são notificadas e convidadas a participar
- Como recusa, não-resposta ou retirada é tratada
- Como mediadores ou facilitadores são selecionados, substituídos ou recusados
- Expectativas com prazo definido para cada estágio (quando aplicável)
- Requisitos de documentação e regras de acesso
- Um processo para revisar falhas processuais ou impasses

6.2.4 O processo de resolução DEVE ser acessível sem exigir status social, antiguidade, carisma ou proximidade informal com tomadores de decisão.

6.2.5 Conflitos não resolvidos DEVEM escalar por caminhos de governança definidos sem contornar a Matriz de Decisão definida na Camada 2.

## 6.3 Salvaguardas

6.3.1 A comunidade DEVE definir salvaguardas explícitas para conflitos que envolvam assimetrias de poder, relações de dependência ou riscos à segurança.

6.3.2 As salvaguardas DEVEM incluir proteções contra retaliação por:
- Levantar uma preocupação
- Solicitar mediação
- Fornecer testemunho ou evidência
- Participar de uma revisão ou apelação

6.3.3 Quando existir um diferencial de poder entre as partes, salvaguardas elevadas DEVEM ser aplicadas, que PODEM incluir:
- Facilitação independente ou externa
- Canais separados de acolhimento, documentação ou comunicação
- Suspensão ou limitação temporária da autoridade do papel
- Limiares adicionais de evidência e revisão antes de sanções

6.3.4 Para conflitos críticos para a segurança, a comunidade DEVE definir ações protetivas imediatas que podem ser tomadas antes da conclusão completa do processo, que PODEM incluir:
- Medidas temporárias de separação
- Acesso restrito a espaços ou recursos compartilhados
- Suspensão temporária de papel
- Prazos de escalonamento emergencial

6.3.5 As salvaguardas de segurança DEVEM prevalecer sobre direitos de participação, continuidade de papéis e conveniência operacional.

## 6.4 Sanções, Reparação e Separação

6.4.1 A comunidade DEVE definir uma estrutura explícita de sanções e reparação.

6.4.2 As ações de sanção e reparação DEVEM ser:
- Proporcionais à violação
- Explicitamente documentadas
- Com prazo definido quando aplicável
- Revisáveis e passíveis de apelação

6.4.3 A estrutura DEVE definir, no mínimo:
- Tipos de sanção e reparação disponíveis
- Pré-condições e padrões de evidência
- Papéis ou órgãos autorizados para aplicação
- Mecanismos de revisão e apelação
- Condições para restauração de direitos, papéis ou participação

6.4.4 Ações de separação, suspensão ou remoção DEVEM seguir o devido processo e DEVEM estar alinhadas com as regras de saída e separação definidas na Camada 1.

6.4.5 As sanções NÃO DEVEM ser aplicadas por meio de exclusão informal, pressão social, silêncio ou retirada implícita de direitos.

6.4.6 Ações orientadas à reparação DEVEM ser priorizadas sobre ações punitivas, exceto em casos críticos para a segurança.

## 6.5 Artefatos

6.5.1 Os seguintes artefatos são obrigatórios para conformidade com a Camada 4:
- Escada de Resolução de Conflitos
- Protocolo de Responsabilização

6.5.2 Os artefatos da Camada 4 DEVEM ser:
- Explícitos e inequívocos
- Versionados
- Acessíveis a todos os membros, com proteções de privacidade claramente delimitadas
- Adotados por meio de um processo de governança autorizado

6.5.3 A Escada de Resolução de Conflitos DEVE definir, no mínimo:
- Entradas de classificação de conflitos e limiares de escalonamento
- Estágios de resolução e regras de seleção de facilitadores
- Limites de documentação e acesso à informação
- Exceções críticas para a segurança e salvaguardas imediatas

6.5.4 O Protocolo de Responsabilização DEVE definir, no mínimo:
- Mecanismos de investigação, revisão e decisão
- Garantias de devido processo e proteções anti-retaliação
- Opções de sanção e reparação com regras de proporcionalidade
- Caminhos de apelação, supervisão e escalonamento
- Coordenação com os processos de saída e separação da Camada 1

## 6.6 Invariantes da Camada

6.6.1 O conflito DEVE ser tratado como uma condição gerenciada com caminhos definidos; ignorar, suprimir ou normalizar conflitos não resolvidos DEVE ser considerado uma violação do sistema.

6.6.2 Conflitos que envolvam assimetrias de poder DEVEM acionar salvaguardas elevadas.

6.6.3 Reparação e restauração DEVEM preceder a punição, exceto quando a segurança imediata estiver em risco.

6.6.4 A segurança física, psicológica e infantil DEVE prevalecer sobre direitos de participação, continuidade de papéis e preocupações reputacionais.

## 6.7 Regras de Explicitude

6.7.1 O seguinte DEVE ser explícito:
- Sistema de classificação de conflitos
- Processo mínimo de resolução e escalonamento
- Salvaguardas e proteções anti-retaliação
- Limiares de sanção, reparação e separação

6.7.2 O seguinte PODE ser explícito:
- Estilos ou metodologias de mediação
- Preferências de seleção de facilitadores além das salvaguardas mínimas
- Práticas restaurativas ou reparativas

6.7.3 O seguinte DEVE permanecer opcional e fora do escopo:
- Normas de expressão emocional
- Enquadramentos terapêuticos, espirituais ou ideológicos do conflito


---

# 7. Camada 5 — Operações e Coordenação

A Camada 5 define como o trabalho diário, a coordenação e o fluxo de informações funcionam na prática.  
Seu propósito é garantir que as operações permaneçam legíveis, sustentáveis e transferíveis, e não desmoronem em hierarquia informal, dependência ou esgotamento.

## 7.1 Papéis e Responsabilidades

7.1.1 Todas as responsabilidades contínuas DEVEM ser atribuídas a papéis explícitos e nomeados, em vez de expectativas implícitas ou acordos informais.

7.1.2 A comunidade DEVE manter um **Registro de Papéis** que inclua, no mínimo:
- Nome e propósito do papel  
- Escopo de responsabilidade e autoridade decisória  
- Limites explícitos e interfaces com outros papéis, círculos ou domínios  
- Critérios de elegibilidade (se houver)  
- Duração do mandato, rotação ou condições de revisão (se houver)  
- Processo de nomeação, revisão e remoção  

7.1.3 Cada papel DEVE incluir um mecanismo explícito de prestação de contas que defina:
- Como o desempenho no papel é avaliado  
- Como o baixo desempenho, sobrecarga ou falha no papel é tratado  
- Como ocorrem a transição e a transferência de conhecimento  

7.1.4 Nenhuma responsabilidade contínua PODE existir sem um papel explícito, e nenhuma pessoa PODE ser responsabilizada por responsabilidades que não foram formalmente atribuídas a um papel.

7.1.5 Responsabilidades temporárias ou pontuais DEVEM ter um prazo explícito e NÃO DEVEM se tornar contínuas sem a definição formal de um papel.

## 7.2 Sistema de Reuniões

7.2.1 A comunidade DEVE definir tipos de reunião explícitos, suficientes para apoiar:
- Operações  
- Governança  
- Coordenação e alinhamento  
- Reflexão e aprendizado  
- Tratamento de conflitos (conforme exigido pela Camada 4)

7.2.2 Cada tipo de reunião DEVE definir, no mínimo:
- Propósito e escopo decisório  
- Participantes obrigatórios versus opcionais  
- Limites de cadência e duração  
- Papel de facilitação e processo de seleção ou rotação  
- Estrutura da pauta  
- Requisitos de documentação e publicação  
- Requisitos de registro de decisões quando decisões são tomadas  

7.2.3 As reuniões NÃO DEVEM exceder seu escopo decisório declarado nem contornar os limites de autoridade definidos na Camada 2.

7.2.4 A carga de reuniões DEVE ser limitada, monitorada e revisável, conforme definido na Seção 7.4.

## 7.3 Documentação e Fluxo de Informação

7.3.1 A comunidade DEVE definir regras explícitas de documentação para decisões, papéis, operações e obrigações compartilhadas.

7.3.2 As regras de documentação DEVEM especificar, no mínimo:
- Quais informações DEVEM ser registradas  
- Onde os registros são armazenados  
- Quem tem acesso a quais registros  
- Prazos de publicação ou notificação (se houver)  
- Limites de privacidade e condições para acesso restrito  

7.3.3 Todas as decisões DEVEM ser rastreáveis quanto a:
- Tipo de decisão e domínio  
- Papel ou órgão autorizado  
- Mecanismo decisório e limiar (threshold)  
- Resultado registrado e data de vigência  

7.3.4 Processos operacionais críticos DEVEM ser documentados de tal forma que a continuidade não dependa de conhecimento tácito mantido por indivíduos específicos.

7.3.5 O fluxo de informação DEVE ser desenhado para evitar o controle de acesso (gatekeeping), gargalos ou dependência de intermediários informais.

## 7.4 Limites de Carga de Trabalho e Capacidade

7.4.1 Tempo, atenção, capacidade de coordenação e trabalho emocional DEVEM ser tratados como recursos finitos e limitados.

7.4.2 A comunidade DEVE definir limites explícitos de carga de trabalho, incluindo:
- Limites de carga de reuniões (frequência, duração ou tempo total)  
- Limites de carga de papéis (número de papéis, escopo ou horas esperadas)  
- Expectativas de tempo de resposta e disponibilidade (se houver)  
- Mecanismos de renegociação, alívio, substituição ou redistribuição  

7.4.3 Os limites de carga de trabalho DEVEM ser revisáveis e ajustáveis por meio de um processo de governança autorizado.

7.4.4 Sobrecarga persistente, risco de esgotamento, não participação crônica ou dependência de indivíduos que assumem funções em excesso DEVEM acionar processos de revisão ou reparo, conforme definido na Camada 4.

## 7.5 Continuidade Operacional

7.5.1 A comunidade DEVE garantir que nenhum indivíduo seja um ponto único de falha crítico para as operações centrais.

7.5.2 Papéis e processos operacionais centrais DEVEM incluir:
- Procedimentos documentados  
- Mecanismos claros de transição  
- Arranjos de backup ou redundância sempre que viável  

7.5.3 O planejamento de continuidade operacional DEVE ser revisado periodicamente.

## 7.6 Artefatos

7.6.1 Os seguintes artefatos são obrigatórios para a conformidade com a Camada 5:
- Manual de Operações  
- Registro de Papéis  
- Modelos de Reunião  

7.6.2 Os artefatos da Camada 5 DEVEM ser:
- Explícitos e inequívocos  
- Versionados  
- Acessíveis a todos os membros, com proteções de privacidade claramente delimitadas  
- Mantidos como documentos vivos, com responsabilidade e ciclos de revisão definidos  

7.6.3 O Manual de Operações DEVE definir, no mínimo:
- Os processos operacionais centrais dos quais a comunidade depende  
- Interfaces entre papéis, domínios e tipos de reunião  
- Locais de documentação e procedimentos de atualização  

7.6.4 Os Modelos de Reunião DEVEM definir, no mínimo:
- Estrutura da pauta  
- Formato das notas e dos registros  
- Formato de registro de decisões, quando aplicável  

## 7.7 Invariantes da Camada

7.7.1 Responsabilidades contínuas NÃO DEVEM existir sem um papel explícito.

7.7.2 Processos operacionais críticos NÃO DEVEM depender exclusivamente da memória individual, da boa vontade ou da transmissão informal.

7.7.3 A carga de reuniões, o ônus de coordenação e o trabalho não remunerado ou invisível DEVEM ser limitados e revisáveis.

7.7.4 As regras de acesso à informação DEVEM ser explícitas e exequíveis.

## 7.8 Regras de Explicitude

7.8.1 Os seguintes itens DEVEM ser explícitos:
- Papéis e responsabilidades  
- Limites e interfaces de autoridade operacional  
- Tipos de reunião e seus escopos  
- Regras de documentação de decisões  
- Limites de acesso à informação e de privacidade  

7.8.2 Os seguintes itens PODEM ser explícitos:
- Cadência detalhada de reuniões além das restrições mínimas  
- Escolhas de ferramentas para documentação e coordenação  
- Cronogramas de rotação ou sucessão de papéis  

7.8.3 Os seguintes itens DEVEM permanecer opcionais e fora do escopo:
- Estilos pessoais de trabalho  
- Preferências estéticas ou culturais  
- Coordenação social informal


---

# 8. Camada 6 — Evolução e Adaptação

A Camada 6 define como o sistema evolui sem entrar em colapso.  
Seu propósito é garantir que a mudança seja deliberada, restringida, reversível quando apropriado e produza aprendizados em vez de danos ocultos. A evolução sob o RCOS é tratada como um processo governado, não como improvisação.

## 8.1 Mecanismos de Mudança

8.1.1 A comunidade DEVE definir mecanismos explícitos de mudança para modificar, adicionar, suspender ou remover regras, papéis, artefatos ou estruturas de decisão.

8.1.2 Os mecanismos de mudança DEVEM distinguir explicitamente entre:
- Mudanças permanentes de regras  
- Experimentos com prazo definido, conforme descrito na Seção 8.3  

8.1.3 Toda mudança proposta DEVE especificar, no mínimo:
- O(s) artefato(s), camada(s) e seção(ões) afetados  
- O tipo de decisão e o caminho decisório autorizado, conforme definido na Camada 2  
- O efeito pretendido, o escopo e os riscos conhecidos  
- A data de vigência e qualquer período de transição  
- Os requisitos de migração para papéis, acordos ou registros existentes  

8.1.4 Mudanças que afetem o propósito, o escopo, os invariantes ou as restrições de identidade da Camada 0 DEVEM ser classificadas como mudanças constitucionais e DEVEM seguir o mecanismo de decisão constitucional.

8.1.5 A comunidade DEVE definir mecanismos explícitos de revisão para as mudanças adotadas, incluindo como as mudanças são avaliadas, revisadas ou revertidas quando produzem dano, instabilidade ou concentração não intencional de poder.

## 8.2 Versionamento e Autoridade

8.2.1 Todas as mudanças adotadas DEVEM ser versionadas e rastreáveis.

8.2.2 A comunidade DEVE manter um **Histórico de Versões** que registre, no mínimo:
- Identificador da versão  
- Data de adoção e data de vigência  
- Referência ao registro da decisão (autoridade, mecanismo, limiar)  
- Resumo das mudanças  
- Notas de migração e restrições de compatibilidade (se houver)  

8.2.3 A qualquer momento, a comunidade DEVE ser capaz de determinar inequivocamente:
- Qual versão está atualmente em vigor  
- Quais artefatos são autoritativos para fins de conformidade  

8.2.4 As regras substituídas DEVEM permanecer acessíveis para fins de auditabilidade, aprendizado e resolução de disputas, juntamente com as datas durante as quais estiveram em vigor.

8.2.5 Nenhuma mudança de regra informal, não documentada ou "subentendida" PODE ser considerada válida.

## 8.3 Experimentos

8.3.1 A comunidade PODE adotar experimentos como desvios, extensões ou pilotos explicitamente com prazo definido e reversíveis, destinados ao aprendizado.

8.3.2 Todo experimento DEVE definir, no mínimo:
- Escopo (o que é alterado e o que explicitamente não é alterado)  
- Duração e pontos de revisão  
- Critérios de sucesso e fracasso  
- Condições de reversão e processo de reversão  
- Caminho decisório autorizado para iniciar, estender, modificar ou encerrar o experimento  

8.3.3 Os experimentos NÃO DEVEM sobrepor-se aos invariantes da Camada 0 e NÃO DEVEM contornar as restrições de governança definidas na Camada 2.

8.3.4 Os experimentos DEVEM ser explicitamente rotulados como experimentais em todos os artefatos afetados e DEVEM incluir uma data de expiração não prorrogável, a menos que sejam renovados por meio de uma decisão autorizada.

8.3.5 Se um experimento introduzir risco de segurança, coerção ou dano sustentado, a comunidade DEVE suspender ou encerrar o experimento imediatamente por meio de uma ação protetiva, seguida de revisão posterior.

## 8.4 Captura de Aprendizado e Feedback

8.4.1 Falhas importantes, adaptações, reversões e aprendizados sistêmicos DEVEM ser documentados.

8.4.2 A captura de aprendizado DEVE incluir, no mínimo:
- O que ocorreu e por que isso importou  
- Quais camadas, regras ou artefatos estiveram envolvidos  
- O que foi alterado, tentado ou interrompido  
- Quais sinais, evidências ou limiares desencadearam a ação  

8.4.3 Os registros de aprendizado DEVEM ser acessíveis de acordo com as regras de acesso à informação da Camada 5.

8.4.4 Padrões repetidos de falha DEVEM acionar uma revisão estrutural em vez de culpabilização individual.

## 8.5 Segurança e Reversibilidade da Mudança

8.5.1 O sistema DEVE preferir mudanças reversíveis a mudanças irreversíveis, quando possível.

8.5.2 Mudanças irreversíveis ou de alto impacto DEVEM incluir:
- Períodos prolongados de deliberação ou revisão  
- Limiares de decisão mais elevados, quando apropriado  
- Reconhecimento explícito de risco  

8.5.3 Mudanças emergenciais PODEM ser permitidas apenas onde explicitamente definidas, DEVEM ter prazo definido, NÃO DEVEM sobrepor-se aos invariantes da Camada 0 e DEVEM passar por revisão posterior obrigatória e ratificação ou reversão.

## 8.6 Artefatos

8.6.1 Os seguintes artefatos são obrigatórios para a conformidade com a Camada 6:
- Protocolo de Mudança  
- Histórico de Versões  
- Registro de Aprendizados  

8.6.2 Os artefatos da Camada 6 DEVEM ser:
- Explícitos e inequívocos  
- Versionados  
- Acessíveis a todos os membros, com proteções de privacidade claramente delimitadas  
- Adotados por meio de um processo de governança autorizado  

8.6.3 O Protocolo de Mudança DEVE definir, no mínimo:
- Como as mudanças são propostas, revisadas, adotadas, publicadas e rejeitadas  
- Como as propostas são classificadas por tipo de decisão  
- O conteúdo obrigatório das propostas de mudança  
- As expectativas de transição, migração e descontinuação  
- Os mecanismos de revisão, alteração e reversão  
- As disposições para mudanças emergenciais, incluindo limites estritos de tempo e revisão obrigatória  

8.6.4 O Histórico de Versões DEVE definir:
- A estrutura autoritativa dos identificadores de versão e dos registros de mudanças  
- Como as versões substituídas são retidas e acessadas  
- Como a versão atualmente ativa é determinada  

8.6.5 O Registro de Aprendizados DEVE definir:
- O que constitui um evento passível de aprendizado  
- O formato de documentação e a responsabilidade pela documentação  
- A cadência de revisão e síntese  

## 8.7 Invariantes da Camada

8.7.1 A mudança DEVE ser possível, porém restringida; nenhuma mudança PODE ser instantânea, implícita ou não revisável.

8.7.2 Todas as mudanças adotadas DEVEM ser versionadas, documentadas e rastreáveis.

8.7.3 Os experimentos DEVEM ter prazo definido, ser explicitamente rotulados e reversíveis.

8.7.4 Falhas importantes e adaptações DEVEM ser capturadas como aprendizado compartilhado, e não apagadas ou ocultadas.

## 8.8 Regras de Explicitude

8.8.1 Os seguintes pontos DEVEM ser explícitos:
- Como as regras mudam e quem decide  
- Os processos de versionamento, autoridade e revisão  
- O escopo, a duração e as condições de reversão dos experimentos  
- As condições e os limites das mudanças emergenciais  

8.8.2 Os seguintes pontos PODEM ser explícitos:
- Frequência e cadência de revisão  
- Cláusulas de encerramento  
- Métodos de feedback e percepção  

8.8.3 Os seguintes pontos DEVEM permanecer opcionais e fora do escopo:
- Ritmo de inovação  
- Atitudes culturais em relação ao risco dentro dos limites definidos


---

# 9. Seções Não Normativas

As seções deste capítulo são **informativas**, não normativas.  
Elas não definem requisitos de conformidade, mas oferecem orientação, contexto, exemplos e apoio ao aprendizado para comunidades, implementadores, auditores e mantenedores do padrão.

Nada nesta seção pode anular ou enfraquecer requisitos definidos nas Camadas 0–6.

## 9.1 Módulos Opcionais

9.1.1 Módulos Opcionais são extensões específicas de domínio que se constroem sobre o RCOS-Core sem modificar suas camadas obrigatórias.

9.1.2 Módulos Opcionais DEVEM:
- Declarar quais camadas do RCOS eles estendem ou das quais dependem  
- Declarar explicitamente quaisquer papéis, regras ou artefatos adicionais que introduzem  
- NÃO DEVE anular ou contradizer invariantes da Camada 0 ou requisitos do RCOS-Core  

9.1.3 Módulos Opcionais PODEM definir:
- Práticas específicas de domínio  
- Restrições ou padrões adicionais  
- Padrões especializados de governança ou operacionais  

9.1.4 Domínios típicos de Módulos Opcionais PODEM incluir, mas não se limitam a:
- Permacultura e manejo regenerativo da terra  
- Sistemas educacionais alternativos ou baseados na comunidade  
- Práticas de saúde, cuidado e bem-estar  
- Práticas culturais ou espirituais  
- Especializações econômicas (por exemplo, cooperativas, fundos fundiários, crédito mútuo)  

9.1.5 A adoção de Módulos Opcionais DEVE seguir os mecanismos de mudança definidos na Camada 6.

9.1.6 Uma comunidade PODE estar em conformidade com o RCOS-Core sem adotar nenhum Módulo Opcional.

## 9.2 Implementações de Referência

9.2.1 Uma Implementação de Referência é uma comunidade do mundo real que documenta publicamente como aplica o RCOS-Core.

9.2.2 Implementações de Referência são **descritivas**, não prescritivas.  
Elas ilustram como o RCOS pode ser instanciado, não como deve ser instanciado.

9.2.3 Uma comunidade PODE se declarar uma Implementação de Referência do RCOS somente se ela:
- Está em conformidade com o RCOS-Core  
- Documenta publicamente seus artefatos das Camadas 0–6  
- Indica claramente desvios, experimentos ou extensões  

9.2.4 A documentação da Implementação de Referência DEVERIA incluir:
- Contexto e escala (tamanho, localização, propósito)  
- Quais Módulos Opcionais são adotados  
- Desafios e falhas conhecidos  
- Histórico de evolução e adaptações significativas  

9.2.5 Implementações de Referência NÃO DEVEM ser tratadas como interpretações oficiais do padrão.

## 9.3 Modos de Falha Conhecidos

9.3.1 Modos de Falha Conhecidos documentam padrões recorrentes de colapso observados em comunidades reais.

9.3.2 Modos de Falha são **sinais informativos**, não critérios de conformidade.

9.3.3 Modos de Falha PODEM incluir, mas não se limitam a:
- Acumulação informal de poder  
- Dominância de fundadores ou proprietários de terras  
- Dependência de trabalho invisível ou marcado por gênero  
- Paralisia de governança ou sobrecarga de reuniões  
- Bloqueio de saída ou coerção sutil  
- Captura econômica por meio de dívida ou controle de ativos  
- Evitação de conflitos levando à fragmentação silenciosa  

9.3.4 O propósito de documentar Modos de Falha é:
- Apoiar testes de estresse das estruturas do RCOS  
- Melhorar decisões de design  
- Permitir detecção precoce em comunidades ativas  

9.3.5 A documentação dos Modos de Falha DEVERIA referenciar quais camadas do RCOS pretendem mitigar o padrão.


---

# 10. Conformidade e Auditoria

Este capítulo define como a conformidade com o RCOS-Core é avaliada e mantida.

## 10.1 Lista de Verificação de Conformidade

10.1.1 A conformidade com o RCOS-Core é binária: uma comunidade está em conformidade ou em não conformidade.

10.1.2 A conformidade DEVE ser avaliada por camada (Camadas 0–6).

10.1.3 Para cada camada, a Lista de Verificação de Conformidade DEVE verificar:
- Presença de artefatos obrigatórios
- Explicitude e acessibilidade das regras requeridas
- Adoção por meio de processos de governança autorizados

10.1.4 Conformidade parcial ou "intenção de conformidade" NÃO DEVE ser considerada conformidade.

10.1.5 Módulos Opcionais NÃO DEVEM ser incluídos na avaliação de conformidade com o RCOS-Core.

## 10.2 Casos de Teste

10.2.1 Casos de Teste são cenários estruturados usados para validar se os mecanismos do RCOS se comportam conforme o pretendido.

10.2.2 Casos de Teste PODEM ser:
- Cenários hipotéticos
- Falhas históricas de comunidades
- Testes de estresse simulados

10.2.3 Casos de Teste DEVERIAM cobrir, no mínimo:
- Tentativas de concentração de poder
- Cenários de saída e separação
- Impasse de governança
- Tentativas de captura econômica
- Conflitos críticos para a segurança

10.2.4 Casos de Teste são informativos, mas DEVERIAM ser usados durante auditorias, integração de novos membros e revisões periódicas.

## 10.3 Não Conformidade

10.3.1 Uma comunidade DEVE ser considerada em não conformidade se:
- Qualquer artefato obrigatório estiver faltando
- As invariantes da Camada 0 forem violadas
- Decisões forem tomadas repetidamente fora das estruturas de governança autorizadas
- A saída estiver bloqueada ou restringida informalmente

10.3.2 A não conformidade DEVE ser explicitamente reconhecida assim que detectada.

10.3.3 Uma comunidade PODE recuperar a conformidade somente por meio de:
- Ação corretiva
- Adoção formal de artefatos faltantes ou corrigidos
- Documentação da remediação

10.3.4 Alegações de conformidade com o RCOS DEVEM ser retiradas durante períodos de não conformidade conhecida.


---

# 11. Versionamento e Governança do Padrão

Este capítulo define como o próprio RCOS evolui como padrão.

## 11.1 Curadoria do Padrão

11.1.1 O RCOS DEVE ter um órgão ou processo de curadoria identificável.

11.1.2 As responsabilidades do curador DEVEM incluir:
- Manter a especificação canônica
- Gerenciar lançamentos de versões
- Curar materiais de referência e aprendizagem
- Proteger os invariantes da Camada 0 do próprio padrão

11.1.3 O curador NÃO DEVE atuar como autoridade de fiscalização sobre as comunidades.

11.1.4 A curadoria do RCOS DEVE priorizar clareza, estabilidade e aprendizados do mundo real em vez de pureza ideológica.

## 11.2 Processo de Mudança

11.2.1 As mudanças no RCOS-Core DEVEM seguir um processo de mudança definido.

11.2.2 O processo de mudança DEVE incluir:
- Submissão de propostas
- Período público de revisão e feedback
- Mecanismo e autoridade de decisão
- Versionamento e publicação

11.2.3 A compatibilidade retroativa DEVERIA ser preservada sempre que possível.

11.2.4 Mudanças incompatíveis DEVEM ser claramente marcadas e justificadas.

11.2.5 Versões substituídas do RCOS DEVEM permanecer publicamente acessíveis.

11.2.6 O próprio RCOS DEVE modelar os mesmos princípios que exige das comunidades: explicitude, autoridade limitada, reversibilidade e aprendizagem.


---

# Apêndice A — Glossário

Este glossário fornece **definições informativas** para termos-chave usados ao longo da especificação RCOS.
As entradas do glossário não introduzem novos requisitos e não substituem seções normativas.

**Prestação de Contas (Accountability)**
A expectativa de que papéis e membros possam ser solicitados a explicar ações, resultados e a aderência às regras acordadas, com mecanismos definidos de revisão e correção.

**Protocolo de Prestação de Contas**
Um artefato que define como violações, danos ou falhas repetidas são revisados, documentados e tratados, incluindo devido processo, salvaguardas e caminhos de escalonamento.

**Artefato**
Um objeto documentado e versionado (ex.: protocolo, registro, carta) adotado por meio de um processo autorizado e usado para operacionalizar as Camadas do RCOS.

**Limite de Autoridade**
Os limites explícitos dentro dos quais um papel, círculo ou corpo pode tomar decisões ou agir.

**Protocolo de Mudança**
Um artefato que define como as mudanças são propostas, revisadas, adotadas, publicadas e revertidas, incluindo classificação do tipo de decisão e disposições para emergências.

**Bens Comuns (Commons)**
Recursos governados coletivamente sob regras explícitas de zeladoria, acesso e decisão.

**Comunidade**
Um grupo de pessoas que se coordenam voluntariamente em torno de um propósito compartilhado dentro de um escopo e sistema de governança definidos.

**Conformidade**
O estado de atender a todos os requisitos obrigatórios do RCOS-Core nas Camadas 0–6.

**Escada de Resolução de Conflitos**
Um processo escalonado de conflitos que define etapas mínimas de resolução e limiares de escalonamento, desde a reparação de baixa intensidade até a revisão pela governança e, se necessário, a separação.

**Decisão Constitucional**
Uma decisão que modifica o propósito, escopo, invariantes ou restrições de identidade da Camada 0, ou o próprio sistema de governança.

**Matriz de Decisões**
Um artefato de governança que mapeia tipos e domínios de decisão para papéis autorizados, mecanismos, limiares e caminhos de escalonamento.

**Tipo de Decisão**
Uma classificação de decisões (Operacionais, Estratégicas, Constitucionais) usada para determinar autoridade e processo.

**Devido Processo**
As garantias mínimas de justiça exigidas antes de restringir direitos, aplicar sanções ou acionar separação, incluindo notificação, revisão e caminhos de apelação conforme definido.

**Mudança de Emergência**
Uma mudança com prazo determinado, decretada sob condições de emergência explicitamente definidas, exigindo revisão posterior e ratificação ou reversão.

**Explícito**
Escrito, adotado, acessível e revisável.
Qualquer coisa que não seja explícita é tratada como inexistente sob o RCOS.

**Regra da Explicitude**
O princípio de que os mecanismos que alocam poder, risco, responsabilidade ou condições de saída devem ser escritos, adotados e revisáveis.

**Experimento**
Uma mudança com prazo determinado e reversível adotada para aprendizado e avaliação.

**Protocolo de Saída e Separação**
Um artefato que define saída voluntária, devido processo para saída forçada e separação de ativos, papéis, acessos e obrigações.

**Protocolo de Governança**
Um artefato que define o ciclo de vida das decisões (proposta, deliberação, adoção, documentação, revisão) e como os conflitos de governança são resolvidos.

**Dentro do Escopo / Fora do Escopo**
Dentro do escopo refere-se a pessoas, ativos, domínios e atividades explicitamente governados pela comunidade. Fora do escopo refere-se a tudo que é explicitamente excluído ou não declarado dentro do escopo.

**Protocolo de Economia Interna**
Um artefato que define o reconhecimento de contribuições e quaisquer mecanismos internos de troca, incluindo restrições de acumulação e correção de disputas.

**Invariante**
Uma restrição inegociável que não pode ser substituída enquanto estiver em vigor.

**Camada**
Um domínio funcional do RCOS que define um aspecto específico da operação da comunidade.

**Registro de Aprendizado (Learning Log)**
Um artefato que captura grandes falhas, adaptações, reversões e lições aprendidas, incluindo gatilhos, artefatos afetados e resultados.

**Membro**
Uma pessoa que entrou explicitamente na comunidade por meio do processo de associação definido.

**Módulo Opcional**
Uma extensão específica de domínio que se baseia no RCOS-Core sem alterar suas camadas obrigatórias.

**Registro (Registry)**
Um artefato que mantém um conjunto de entradas autoritativas (ex.: papéis, recursos, estados de associação) com clareza sobre propriedade, regras de atualização e histórico de versões.

**Implementação de Referência**
Uma comunidade do mundo real que documenta publicamente sua aplicação do RCOS-Core.

**Papel**
Um conjunto explicitamente definido de responsabilidades, autoridade e prestação de contas, independente da pessoa que o ocupa.

**Crítico para a Segurança (Safety-Critical)**
Uma condição em que a segurança física, psicológica ou infantil está em risco, exigindo salvaguardas elevadas e potencialmente ação protetiva imediata.

**Sanção**
Uma restrição ou ação corretiva definida e documentada, aplicada por meio de processo autorizado, proporcional a uma violação e sujeita a revisão.

**Escopo**
Os domínios, ativos e atividades explicitamente declarados sobre os quais a comunidade exerce autoridade.

**Zeladoria (Stewardship)**
Responsabilidade pelo cuidado, manutenção e governança de um recurso dentro de limites definidos.

**Tesouro (Treasury)**
O conjunto de recursos compartilhados, saldos, obrigações e compromissos mantidos sob regras coletivas.

**Conjunto de Regras do Tesouro**
Um artefato que define como os recursos do tesouro são mantidos, gastos, reportados, auditados e restringidos, incluindo limiares e regras de conflito de interesses.

**Exceção de Transparência**
Uma limitação ao acesso à informação, explicitamente definida, justificada e com prazo determinado, que ainda permite auditoria de conformidade.

**Histórico de Versões**
Um artefato que registra qual versão está em vigor e documenta mudanças adotadas, datas de vigência e referências de decisão.


---

# Apêndice B — Exemplos de Artefatos (Não Normativo)

Este apêndice fornece **exemplos ilustrativos** de artefatos referenciados na especificação.  
Os exemplos são apenas informativos e não devem ser tratados como formatos ou implementações obrigatórios.

## B.1 Exemplo de Carta de Propósito (Trecho)

- Propósito principal (singular): "Manter e cuidar de um lugar de vida compartilhado e regenerativo que ofereça moradia estável e restauração ecológica."
- Propósitos secundários (delimitados):
  - "Operar um pequeno programa educacional sobre práticas regenerativas."
  - "Administrar uma cooperativa de propriedade dos membros para produção local de alimentos."
- Não objetivos / exclusões:
  - "Não é um partido político."
  - "Não é um coletivo de projetos de curto prazo."
  - "Não é um veículo imobiliário com fins lucrativos."
- Condições para mudança de propósito:
  - "Mudanças de propósito exigem uma decisão constitucional e ratificação completa."
- Registro de ratificação:
  - Adotado em: 2026-01-01
  - Tipo de decisão: Constitucional
  - Versão: 0.3
  - Link do registro de decisão: [marcador de posição]

## B.2 Exemplo de Declaração de Escopo (Trecho)

- Ativos dentro do escopo:
  - Lote de terra "Campo Norte"
  - Edifícios: "Casa Comum", "Oficina"
  - Fundos compartilhados: tesouraria operacional, fundo de reserva
  - Infraestrutura compartilhada: sistema de água, painel solar, veículos compartilhados
- Domínios de autoridade dentro do escopo:
  - Regras de governança e processo de decisão (Camada 2)
  - Regras e estados de membresia (Camada 1)
  - Tesouraria e alocação de recursos compartilhados (Camada 3)
  - Coordenação operacional do trabalho compartilhado (Camada 5)
- Domínios fora do escopo:
  - Renda pessoal, dívidas privadas e contas bancárias privadas
  - Relacionamentos privados e espaços de vida privados (exceto em condições críticas de segurança)
  - Negócios externos que não utilizam ativos da comunidade

## B.3 Exemplo de Matriz de Decisão (Trecho)

| Domínio de Decisão | Tipo de Decisão | Órgão Autorizado | Mecanismo | Limiar | Escalonamento |
|----------------|--------------|-----------------|-----------|-----------|------------|
| Aprovação de orçamento (anual) | Estratégica | Círculo de Finanças | Consentimento | Sem objeções | Círculo Geral |
| Gasto emergencial ≤ 500 | Operacional | Tesoureiro | Autoridade delegada | N/A | Círculo de Finanças |
| Gasto entre 501–5.000 | Estratégica | Círculo de Finanças | Voto | Maioria | Círculo Geral |
| Adicionar/remover um invariante central | Constitucional | Círculo Geral | Voto | Supermaioria (80%) | Revisão constitucional |
| Designação de papel | Operacional | Líder do Círculo | Consentimento | Sem objeções | Círculo de Governança |

## B.4 Exemplo de Protocolo de Economia Interna (Trecho)

- Categorias reconhecidas de contribuição:
  - Trabalho (manutenção, construção, produção de alimentos)
  - Cuidado (cuidado infantil, cuidado de idosos, apoio em conflitos)
  - Conhecimento (treinamento, documentação, facilitação)
  - Zeladoria (manutenção de recursos, supervisão de compras)
- Mecanismo de registro:
  - Registro semanal de contribuição enviado pelos membros
  - Revisão mensal pelo Círculo de Operações para consistência e correções
- Unidades internas (opcional):
  - "Créditos de tempo" rastreados em horas para certas alocações compartilhadas
- Restrições de acumulação (se existirem unidades internas):
  - Limites no saldo
  - Expiração após 12 meses, salvo renovação por revisão
- Disputa e correção:
  - Qualquer membro pode solicitar revisão de um registro em até 30 dias
  - Correções exigem justificativa documentada e são registradas em um histórico de mudanças

## B.5 Exemplo de Escada de Resolução de Conflitos (Trecho)

1. Conversa direta (reparo informal)  
2. Mediação facilitada (facilitador neutro selecionado de uma lista aprovada)  
3. Recepção de responsabilização (recepção documentada; salvaguardas antirretaliação ativadas)  
4. Revisão de responsabilização (constatações, plano de reparo e respostas proporcionais)  
5. Decisão de governança (caso autoridade, acesso ou papéis precisem mudar)  
6. Processo de separação (se necessário; coordenado com o protocolo de saída e separação da Camada 1)

## B.6 Exemplo de Modelo de Proposta de Mudança (Trecho)

- Título da mudança:
- Resumo (1–3 frases):
- Camadas e artefatos afetados (links):
- Tipo de mudança:
  - Mudança permanente / Experimento
- Tipo de decisão e caminho de decisão autorizado (referência à Matriz de Decisão):
- Justificativa:
- Riscos e mitigações:
- Plano de transição e migração:
- Plano de reversão e gatilhos de reversão:
- Data de vigência e data de revisão:

## B.7 Exemplo de Acordo de Membresia (Trecho)

- Estado de membresia ao assinar: Experimental / Pleno
- Direitos do membro (exemplos):
  - Acesso aos registros de decisão definidos como transparentes
  - Direitos de participação conforme o tipo de decisão
  - Um caminho de saída definido a qualquer momento
- Obrigações do membro (exemplos):
  - Expectativas de contribuição conforme definido pelo papel e estado de membresia
  - Adesão aos invariantes declarados e regras de segurança
  - Participação nos processos mínimos de integração e revisão
- Referência ao devido processo:
  - "Qualquer saída forçada ou restrição de acesso segue o devido processo da Camada 4 e o protocolo de saída."

## B.8 Exemplo de Protocolo de Integração (Trecho)

1. Fornecer acesso aos artefatos RCOS (Camadas 0–6) e módulos locais
2. Confirmar consentimento explícito aos artefatos das Camadas 0 e 1
3. Atribuir estado inicial de membresia e um padrinho/madrinha de integração
4. Concluir orientação sobre segurança e processo de conflito
5. Revisar os limites do escopo e o que está fora do escopo
6. Registrar a conclusão da integração no registro de membresia

## B.9 Exemplo de Entrada no Registro de Papéis (Trecho)

- Nome do papel: Tesoureiro
- Propósito: Manter os registros da tesouraria e executar pagamentos autorizados
- Escopo de autoridade:
  - Executar pagamentos ≤ 500 dentro das categorias aprovadas
- Limites:
  - Sem autoridade para aprovar orçamentos ou alterar regras de transparência
- Mandato:
  - 6 meses, renovável uma vez sem revisão
- Responsabilização:
  - Relatório mensal de tesouraria publicado; verificação trimestral de auditoria
- Designação/remoção:
  - Designado pelo Círculo de Finanças; removível por revisão do Círculo de Governança

## B.10 Exemplo de Conjunto de Regras de Tesouraria (Trecho)

- Transparência:
  - Balanço mensal e resumo de fluxo de caixa publicados a todos os membros
- Limiares de gastos:

| Valor | Tipo de Decisão | Órgão Autorizado | Mecanismo |
|---:|---|---|---|
| ≤ 500 | Operacional | Tesoureiro | Delegado |
| 501–5.000 | Estratégica | Círculo de Finanças | Voto por maioria |
| > 5.000 | Estratégica | Círculo Geral | Voto por maioria |
| Dívida / obrigação de longo prazo | Constitucional | Círculo Geral | Supermaioria |

- Conflito de interesses:
  - Quem solicita um gasto não pode aprovar a própria solicitação

## B.11 Exemplo de Modelo de Reunião (Trecho)

- Tipo de reunião: Operações
- Data/hora:
- Facilitador:
- Participantes:
- Pauta:
  1. Check-ins (com tempo delimitado)
  2. Revisão das últimas ações
  3. Atualizações operacionais
  4. Decisões (se houver)
  5. Próximas ações e responsáveis
- Registro de decisão (se utilizado):
  - Tipo de decisão:
  - Autoridade:
  - Mecanismo/limiar:
  - Resultado:
  - Data de vigência:

## B.12 Exemplo de Entrada em Diário de Aprendizagem (Trecho)

- Data:
- Evento gatilho:
- O que aconteceu (narrativa curta):
- Camadas/artefatos envolvidos:
- Sinais que dispararam a ação:
- O que mudou (ou o que foi tentado):
- Resultado após revisão:
- Responsável pela ação de acompanhamento e prazo:


---

# Apêndice C — Resumo da Implementação de Referência

Este apêndice define uma **estrutura de documentação recomendada** para comunidades que desejam se apresentar como Implementações de Referência do RCOS. O objetivo é tornar a adoção auditável, comparável e passível de aprendizado, sem implicar endosso.

## C.1 Contexto da Comunidade

- Nome e localização
- Tamanho e escala (ex.: 12 membros; 3 domicílios; 25 hectares)
- Propósito principal (Camada 0)
- Data de fundação e data de adoção do RCOS (se diferente)
- Forma(s) jurídica(s) relevante(s) (se houver)
- Ponto de contato público

## C.2 Visão Geral da Adoção do RCOS

- Versão do RCOS-Core em uso
- Referência ao registro da decisão de adoção (autoridade, mecanismo, data)
- Resumo dos Módulos Opcionais adotados (se houver), incluindo:
  - Nome e escopo do módulo
  - Data de adoção
  - Link para a especificação do módulo
  - Dependências de camada declaradas

## C.3 Resumo Camada por Camada

Para cada camada (0–6):
- Artefatos implementados (com links)
- Desvios ou adaptações (com links)
- Desafios conhecidos e modos de falha encontrados

Formato recomendado:

| Camada | Artefatos obrigatórios implementados | Link(s) público(s) | Versão/data | Notas |
|---:|---|---|---|---|
| 0 | Carta de Propósito; Declaração de Escopo; Registro de Invariantes | [placeholder] | v0.3 / 2026-01-01 | Propósito estável; invariantes revisadas trimestralmente |
| 1 | Acordo de Associação; Protocolo de Integração; Protocolo de Saída e Separação; Registro de Estado de Associação | [placeholder] | v1.1 / 2026-02-15 | Período de experiência é de 3 meses |
| 2 | Matriz de Decisão; Protocolo de Governança; Registro de Autoridade | [placeholder] | v0.8 / 2026-03-10 | Consentimento para operações, votação para estratégico |
| 3 | Protocolo de Economia Interna; Regulamento da Tesouraria | [placeholder] | v0.5 / 2026-03-20 | Relatórios mensais de tesouraria publicados |
| 4 | Escada de Resolução de Conflitos; Protocolo de Responsabilização | [placeholder] | v0.6 / 2026-04-01 | Política antirretaliação incluída |
| 5 | Manual de Operações; Registro de Papéis; Modelos de Reunião | [placeholder] | v0.4 / 2026-04-15 | Carga de reuniões limitada a 4h/semana |
| 6 | Protocolo de Mudança; Histórico de Versões; Diário de Aprendizado | [placeholder] | v0.2 / 2026-05-01 | Experimentos expiram a menos que sejam renovados |

## C.4 Governança e Evolução

- Mecanismos de decisão em uso (com trecho da Matriz de Decisão ou link)
- Histórico de mudanças e experimentos (com links para registros de mudança)
- Principais aprendizados e falhas (com links para entradas do Diário de Aprendizado)
- Registro de desvios (recomendado):

| Item | Camada(s) | Tipo | Status | Início | Revisão/Fim | Link |
|---|---|---|---|---|---|---|
| Teste de facilitação rotativa | 5 | Experimento | Ativo | 2026-06-01 | 2026-08-01 | [placeholder] |
| Exceção de transparência da tesouraria (segurança) | 3/4 | Permanente | Ativo | 2026-04-10 | Revisão anual | [placeholder] |


## C.5 Declaração de Conformidade
- Status atual de conformidade: Em conformidade / Não conforme / Desconhecido
- Data da última autoauditoria ou auditoria externa
- Método de auditoria (autoauditoria vs externa)
- Períodos conhecidos de não conformidade (se houver) e resumo da correção
- Links de evidências (recomendado):

| Evidência | Data | Link |
|---|---:|---|
| Resultado da checklist camada por camada | 2026-07-01 | [placeholder] |
| Notas/achados da auditoria | 2026-07-01 | [placeholder] |
| Log de correções | 2026-07-15 | [placeholder] |
- Períodos conhecidos de não conformidade (se houver)  

## C.6 Transparência Pública
- Índice de artefatos públicos (recomendado):

| Artefato | Camada | Link público | Versão/data | Notas |
|---|---:|---|---:|---|
| Carta de Propósito | 0 | [placeholder] | 2026-01-01 | |
| Matriz de Decisão | 2 | [placeholder] | 2026-03-10 | |
| Relatórios de tesouraria | 3 | [placeholder] | 2026-06-30 | mensais |
| Diário de Aprendizado | 6 | [placeholder] | 2026-06-15 | redações sinalizadas |

- Canal de contato ou consulta
- Declaração explícita do que é privado vs público, e por quê
- Link para a versão atual do RCOS-Core utilizada e o changelog
- Canal de contato ou consulta  

---

## Nota Informativa

Implementações de Referência são instrumentos de aprendizado, não endossos.

