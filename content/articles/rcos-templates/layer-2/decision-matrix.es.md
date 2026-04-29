---
id: 4885248e
title: Matriz de Decisiones
parentId: b7e62f01
order: 0
lang: es
sourceHash: c8735d68
---

- **Capa:** 2 — Gobernanza y Lógica de Decisión
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [§4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [§4.7](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Asigna cada tipo de decisión y dominio a un rol o cuerpo autorizado, mecanismo, umbral y vía de escalamiento. Las decisiones tomadas fuera de esta matriz se consideran inválidas.

---

## Principios de Votación

*Cláusulas RCOS: [4.2.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms), [4.2.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#42-decision-mechanisms)*

<details data-kind="rationale">
<summary>¿Por qué fijar mecanismo, umbral y plazos?</summary>

Una votación sin un mecanismo, umbral y período de deliberación predefinidos es una invitación a fabricar resultados después del hecho — quien cuenta los votos o establece el plazo gana. Declarar estos parámetros de antemano hace que cada decisión colectiva sea reproducible y contestable en los mismos términos, independientemente de quién esté presente.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica la plataforma de votación, el umbral para cada tipo de decisión, el período de deliberación, la regla de empate, la regla de re-votación, y cualquier límite de gasto o alcance de autoridad delegada.

</details>

- **Plataforma de votación:** _<p. ej. Snapshot, Loomio, consenso presencial.>_
- **Umbral operativo:** _<p. ej. no se requiere votación — delegado al titular del rol operativo correspondiente según el Registro de Roles.>_
- **Umbral estratégico:** _<p. ej. mayoría simple (>50%); deliberación mínima de X días.>_
- **Umbral constitucional:** _<p. ej. supermayoría (≥⅔); deliberación mínima de Y días; período de ratificación de Z días.>_
- **Empate en la votación:** _<p. ej. la propuesta no se aprueba; se mantiene el statu quo.>_
- **Re-votación:** _<p. ej. cualquier Miembro Pleno puede solicitar una re-votación mediante una objeción razonada por escrito que cite una consideración no abordada durante la deliberación.>_
- **Objeción razonada:** _<definir qué constituye una objeción razonada — citar una consideración específica no planteada durante la deliberación; el desacuerdo general no califica.>_
- **Límite de gasto con autoridad delegada:** _<p. ej. 0 €; o definir un umbral por debajo del cual se permite el gasto delegado.>_
- _<Otros principios de votación que tu comunidad quiera declarar.>_

---

## Matriz

*Cláusulas RCOS: [4.4.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix), [4.4.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#44-decision-matrix)*

<details data-kind="rationale">
<summary>¿Por qué una única matriz autoritativa?</summary>

Si las reglas sobre quién decide qué viven en la cabeza de las personas, la autoridad se convierte en lo que diga la persona más ruidosa o con más antigüedad. Una matriz pública que vincule cada decisión a un dominio, cuerpo, mecanismo y umbral hace visible la acción fuera de alcance en el momento en que ocurre — y hace que cualquier decisión tomada fuera de ella sea inválida por construcción.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Para cada dominio de decisión (membresía, tesorería, plataforma, alianzas, gobernanza, etc.), establece el tipo de decisión, el cuerpo autorizado, quién puede participar, el mecanismo, el umbral, las condiciones de bloqueo y la vía de escalamiento.

</details>

| Dominio de Decisión | Tipo de Decisión | Cuerpo Autorizado | Participantes Elegibles | Mecanismo | Umbral | Condiciones de Bloqueo / Veto | Escalamiento |
|---|---|---|---|---|---|---|---|
| _<p. ej. Admisión de miembros>_ | _<Operativo / Estratégico / Constitucional>_ | _<rol o cuerpo>_ | _<quién participa>_ | _<votación / delegado>_ | _<umbral>_ | _<condiciones de bloqueo>_ | _<vía de escalamiento>_ |
| _<p. ej. Gasto de tesorería — menor>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ej. Gasto de tesorería — mayor>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ej. Cambios en reglas de gobernanza>_ | _<Constitucional>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ej. Cambios al propósito primario / invariantes>_ | _<Constitucional>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> **Titulares de roles operativos:** Cada decisión operativa es ejecutada por el titular del rol responsable de ese dominio, actuando dentro de su alcance definido según el Registro de Roles (Capa 5). Cuando una decisión abarca múltiples dominios, cada titular de rol actúa dentro de su propio alcance.

## Definiciones de Tipos de Decisión

*Cláusulas RCOS: [4.1.1](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.2](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.3](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.4](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types), [4.1.5](/articles/rcos-core/v0-1/layer-2-governance-decision-logic#41-decision-types)*

<details data-kind="rationale">
<summary>¿Por qué clasificar cada decisión?</summary>

Sin un tipo, cada decisión se maneja a la velocidad y con el escrutinio que convenga en el momento — los cambios rutinarios se estancan en debates, y los cambios constitucionales pasan desapercibidos. Los tipos fijos vinculan el peso de una decisión al proceso que DEBE superar, y la regla de tipo superior por defecto cierra la brecha donde la ambigüedad de otro modo sería explotada.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Define cada tipo de decisión según lo que abarca, quién la ejecuta, qué proceso requiere y cómo se resuelven las disputas sobre la clasificación.

</details>

- **Operativo** — _<funcionamiento diario dentro de las reglas existentes; ejecutado por el titular del rol correspondiente sin votación.>_
- **Estratégico** — _<dirección a largo plazo, asignación significativa de recursos, creación/eliminación de estructuras importantes; requiere votación de Miembros Plenos con un período de deliberación definido.>_
- **Constitucional** — _<cambios a la Capa 0 (propósito, alcance, invariantes) o al propio sistema de gobernanza; requiere votación de Miembros Plenos, supermayoría y un período de ratificación.>_

> Si una decisión no puede clasificarse claramente, se aplica por defecto el tipo de mayor impacto.

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Constitucional
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
