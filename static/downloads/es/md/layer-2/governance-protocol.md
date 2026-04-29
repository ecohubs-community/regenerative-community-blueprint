**RCOS — Sistema Operativo de Comunidad Regenerativa**

# Protocolo de Gobernanza

- **Generado:** 2026-04-29
- **Fuente (versión más reciente):** [https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-2/governance-protocol](https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-2/governance-protocol)
- **Todas las plantillas RCOS:** [https://blueprint.ecohubs.community/es/articles/rcos-templates](https://blueprint.ecohubs.community/es/articles/rcos-templates)

---
- **Capa:** 2 — Gobernanza y Lógica de Decisión
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§4.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [§4.6](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [§4.7](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#47-artifacts)

> Define el ciclo de vida completo de una decisión colectiva — desde la presentación de la propuesta hasta la documentación y la apelación.

---

## Presentación de Propuestas

*Cláusulas RCOS: [4.5.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>¿Por qué formalizar cómo entran las propuestas al sistema?</summary>

Un proceso de decisión que acepta propuestas de manera informal — un mensaje, una sugerencia verbal, una idea del fundador — no tiene forma fiable de saber qué está realmente sobre la mesa. Exigir un formato de presentación estándar, una ubicación de archivo y campos de contenido obligatorios significa que cada propuesta llega con la misma información, visible para todos, rastreable desde el primer día.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Indica quién puede proponer, dónde se presentan las propuestas, los campos de contenido obligatorios y cómo se determina y se impugna el tipo de decisión.

</details>

- _<Decisiones operativas — gestionadas por el titular del rol correspondiente según el Registro de Roles; no se requiere propuesta.>_
- _<Decisiones estratégicas y constitucionales — quién puede presentarlas y en qué plataforma.>_
- _<Campos obligatorios de la propuesta: resumen, capas y artefactos afectados, tipo de decisión, justificación, riesgos y mitigaciones, plan de reversión, fecha de entrada en vigor propuesta.>_
- _<El tipo de decisión lo declara quien propone; por defecto se asigna el tipo de mayor impacto si no está claro.>_
- _<Reglas de retirada — cuándo se puede retirar una propuesta y cómo.>_

## Revisión y Deliberación

*Cláusulas RCOS: [4.5.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>¿Por qué exigir un período mínimo de deliberación?</summary>

Las votaciones apresuradas favorecen a quien ya está prestando atención y perjudican a todos los demás. Un período de deliberación obligatorio, proporcional al peso de la decisión, da a los miembros tiempo para leer, responder y plantear inquietudes antes de que se abra la votación — de modo que el voto refleje un juicio meditado, no velocidad de reacción.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Indica los espacios de deliberación y los períodos mínimos para decisiones Estratégicas y Constitucionales antes de que pueda abrirse una votación.

</details>

- _<Dónde se lleva a cabo la deliberación (foro, chat, reunión).>_
- _<Período mínimo de deliberación antes de abrir votación — Estratégica.>_
- _<Período mínimo de deliberación antes de abrir votación — Constitucional.>_
- _<Expectativa de que los miembros planteen inquietudes durante la deliberación para evitar la necesidad de revotaciones.>_

## Ejecución de la Decisión

*Cláusulas RCOS: [4.5.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.5.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>¿Por qué vincular la ejecución al registro?</summary>

Una propuesta aprobada que nunca llega al artefacto afectado es una decisión solo de nombre — las reglas vigentes siguen diciendo lo mismo que antes. Vincular la ejecución a una actualización concreta del artefacto y a una entrada en el historial de versiones cierra la brecha entre lo que se decidió y lo que está realmente en vigor.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Indica qué sucede cuando una propuesta se aprueba (actualización de artefactos, historial de versiones) y cuando se rechaza (archivo). Define un plazo para ambos casos.

</details>

- _<Al aprobarse: cómo se archiva la propuesta; artefactos afectados actualizados; entrada en el historial de versiones registrada.>_
- _<Al rechazarse: dónde se archiva la propuesta.>_
- _<Plazo para la ejecución después de que concluye una votación.>_

## Documentación y Publicación

*Cláusulas RCOS: [4.5.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>¿Por qué documentar cada resultado, incluidos los rechazos?</summary>

Mantener un registro solo de las decisiones aprobadas borra el historial de razonamiento — los miembros pierden la pista de lo que ya se consideró y rechazó, y los mismos debates se reabren indefinidamente. Archivar tanto las propuestas aprobadas como las rechazadas, con un plazo y un registro de decisión verificable, preserva la memoria institucional y hace que el sistema de gobernanza sea auditable.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Indica las reglas de retención para propuestas aprobadas y rechazadas, qué constituye el registro de decisión y la obligación de actualizar el historial de versiones.

</details>

- _<Todas las propuestas aprobadas y rechazadas se archivan dentro de los X días posteriores al cierre de la votación.>_
- _<El artefacto de votación (p. ej., enlace de Snapshot) sirve como registro de decisión.>_
- _<El historial de versiones (Capa 6) se actualiza con cada propuesta aprobada.>_

## Apelación y Revisión

*Cláusulas RCOS: [4.5.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol), [4.6.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>¿Por qué hacer posibles las revotaciones pero con límites?</summary>

Un sistema de gobernanza sin vía de apelación convierte los errores en reglas permanentes; uno con vías de apelación informales ilimitadas nunca resuelve nada. Permitir que cualquier Miembro Pleno solicite una revotación — pero solo con una objeción escrita y razonada que plantee algo no abordado previamente — mantiene el sistema autocorrectivo sin convertir cada decisión en un referéndum permanente.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Define las condiciones para solicitar una revotación, el formato de la objeción y el umbral/mecanismo para la revotación en sí.

</details>

- _<Quién puede solicitar una revotación y cómo.>_
- _<Requisito de objeción razonada — una consideración no abordada en la deliberación original.>_
- _<La revotación utiliza el mismo mecanismo y umbral que la original.>_
- _<Tratamiento de solicitudes de revotación reiteradas y frívolas.>_

## Conflicto entre Decisiones

*Cláusulas RCOS: [4.5.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#45-governance-protocol)*

<details data-kind="rationale">
<summary>¿Por qué predefinir la resolución de conflictos?</summary>

Cuando dos decisiones apuntan en direcciones opuestas, alguien tiene que elegir cuál prevalece — y si esa elección se hace de forma improvisada, se reduce a quien tenga la autoridad o la energía para imponer su interpretación. Una regla de precedencia fija (el tipo superior prevalece; la más reciente prevalece dentro del mismo tipo) resuelve conflictos de forma mecánica, sin necesidad de un juicio discrecional.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Indica la regla de precedencia (típicamente: el tipo de decisión superior prevalece; la más reciente prevalece dentro del mismo tipo, salvo bloqueo explícito).

</details>

- _<Precedencia: Constitucional > Estratégica > Operativa.>_
- _<Conflictos del mismo tipo: la más reciente prevalece, salvo que la anterior haya bloqueado explícitamente cambios futuros.>_
- _<Dónde se plantean los conflictos y cómo se resuelven.>_

## Salvaguardas y Modos de Fallo

*Cláusulas RCOS: [4.6.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes), [4.6.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-2-governance-decision-logic#46-safeguards-and-failure-modes)*

<details data-kind="rationale">
<summary>¿Por qué planificar de antemano los fallos de gobernanza?</summary>

Todo sistema de gobernanza falla en algún punto — capturado por un subgrupo, paralizado por vetos informales, desviado por un titular de rol que amplió silenciosamente su ámbito. Nombrar los modos de fallo específicos de antemano, establecer vías de impugnación que no puedan ser objeto de represalias, y exigir una revisión formal cuando los fallos se acumulan, es lo que evita que la gobernanza se vacíe lentamente mientras nadie observa.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Para cada modo de fallo nombrado, indica la salvaguarda. Incluye un disparador que fuerce una revisión Constitucional si los fallos se acumulan.

</details>

- **Concentración de poder:** _<cómo el protocolo previene la autoridad unilateral más allá del ámbito operativo.>_
- **Vetos informales:** _<regla de que solo las objeciones escritas y razonadas presentadas a través del proceso definido tienen peso.>_
- **Captura de decisiones:** _<regla sobre quórum y apertura de la votación.>_
- **Atrincheramiento de fundadores/roles:** _<regla de que ningún rol otorga autoridad permanente; los fundadores no tienen autoridad de gobernanza especial más allá de su estado de membresía.>_
- **Impugnación sin represalias:** _<referencia a las disposiciones anti-represalias de la Capa 4.>_
- **Disparador por fallos persistentes:** _<p. ej., tres o más fallos de gobernanza en X meses activan una revisión Constitucional.>_

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Constitucional
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
