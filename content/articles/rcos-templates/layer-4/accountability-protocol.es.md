---
id: d0c21119
title: Protocolo de Rendición de Cuentas
parentId: 608a89f6
order: 1
lang: es
sourceHash: 464312ca
---

- **Capa:** 4 — Conflicto, Reparación y Rendición de Cuentas
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§6.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [§6.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)

---

## Desencadenantes

*Cláusulas RCOS: [6.4.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué enumerar qué inicia una revisión de rendición de cuentas?</summary>

Si las revisiones de rendición de cuentas solo ocurren cuando alguien se siente lo suficientemente fuerte como para presionar, se vuelven políticas. Nombrar los desencadenantes exactos — inactividad, incumplimiento, violación de invariantes, derivación — significa que el proceso se inicia a partir de una condición que cualquiera puede verificar, no a partir de un juicio sobre una persona.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Enumera los desencadenantes específicos y verificables que inician una revisión de rendición de cuentas. Cada desencadenante debe ser observable a partir de registros o una derivación directa.

</details>

Se inicia una revisión de rendición de cuentas cuando:

1. _<Un miembro no ha realizado una contribución reconocida en X meses consecutivos.>_
2. _<Un miembro ha incumplido una obligación del Acuerdo de Membresía.>_
3. _<Un miembro ha violado una restricción de identidad o invariante de la Capa 0.>_
4. _<Se recibe una derivación de la Escalera de Resolución de Conflictos (Paso 3 o superior).>_

## Investigación y Revisión

*Cláusulas RCOS: [6.4.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.6](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué graduar la respuesta según la gravedad?</summary>

Tratar una contribución omitida igual que una violación de invariante aplasta los casos menores con un proceso pesado o deja que los graves se resuelvan con una conversación privada. Vías graduadas — verificación suave, notificación escrita intermedia, escalamiento directo para incumplimientos graves — ajustan el peso de la respuesta al peso del incumplimiento y mantienen la reparación como opción predeterminada donde la reparación aún es posible.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Define las vías suave (inactividad), intermedia (incumplimiento de obligación) y grave (violación de invariantes, seguridad). Indica quién inicia, el plazo de respuesta y la ruta de escalamiento para cada una.

</details>

> **Guía de gravedad del incumplimiento:** _<intermedio = incumplimiento de una obligación del Acuerdo de Membresía que no amenaza la seguridad de los miembros ni la integridad de la comunidad; grave = violación de invariante de la Capa 0, preocupación creíble de seguridad, conducta persistente de mala fe.>_

- **Inactividad (incumplimiento suave):** _<quién contacta al miembro; plazo de respuesta; posibles resultados.>_
- **Incumplimiento de obligación (intermedio):** _<notificación escrita; plazo de respuesta; vías de resolución / escalamiento.>_
- **Incumplimiento grave / violación de invariante:** _<escalamiento directo al paso correspondiente de la Escalera de Resolución de Conflictos.>_

## Garantías de Debido Proceso

*Cláusulas RCOS: [6.4.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué detallar los derechos de notificación, respuesta y apelación?</summary>

La rendición de cuentas sin debido proceso es solo castigo con papeleo. Un miembro que enfrenta una sanción necesita conocer la preocupación, tener tiempo real para responder y tener un lugar al que apelar — de lo contrario, la palabra del órgano decisor es definitiva por defecto, lo cual concentra el poder exactamente donde no debería concentrarse.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Establece el derecho a notificación por escrito, un plazo mínimo de respuesta y una vía de apelación explícita ante los Miembros Plenos.

</details>

- **Derecho a notificación:** _<el miembro es notificado por escrito sobre la preocupación antes de que comience cualquier revisión o sanción.>_
- **Derecho a responder:** _<plazo mínimo de respuesta — p. ej. 30 días.>_
- **Derecho a apelar:** _<cualquier decisión puede apelarse a través del proceso de gobernanza (voto Estratégico).>_

## Protecciones contra Represalias

*Cláusulas RCOS: [6.3.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#63-safeguards)*

<details data-kind="rationale">
<summary>¿Por qué proteger explícitamente a los participantes?</summary>

Si plantear una preocupación o dar información puede costarle a un miembro su posición, relaciones o acceso, la gente guardará silencio y el sistema de rendición de cuentas colapsará en la práctica. Nombrar las represalias como un desencadenante en sí mismo hace que el costo de la supresión sea mayor que el costo de denunciar.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Establece que las represalias contra cualquier miembro que plantee, participe en o proporcione información a un proceso de rendición de cuentas son en sí mismas un desencadenante de rendición de cuentas.

</details>

_<Las represalias contra un miembro por participar en cualquier parte de este proceso son en sí mismas un desencadenante de rendición de cuentas.>_

## Opciones de Sanción y Reparación

*Cláusulas RCOS: [6.4.1](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.2](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.3](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.5](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.4.6](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation), [6.5.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#65-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué predefinir el menú de sanciones?</summary>

Las sanciones ad hoc inventadas en medio del proceso reflejan a quien más fuerte habla en la sala, no lo que el incumplimiento amerita. Un menú fijo — con precondiciones, órgano autorizado y vía de apelación para cada una — mantiene las respuestas proporcionales, evita que la exclusión informal se convierta en el castigo predeterminado y hace evidente cuándo una sanción está fuera del alcance del órgano que la aplica.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Para cada tipo de sanción, define las precondiciones, el órgano autorizado y la vía de apelación. Las respuestas orientadas a la reparación deben ser la opción predeterminada; las punitivas se reservan para incumplimientos críticos para la seguridad o no resueltos.

</details>

> Se prefieren las respuestas orientadas a la reparación sobre las punitivas, excepto en casos críticos para la seguridad.
> Las sanciones DEBEN ser proporcionales, con límite temporal cuando corresponda, documentadas y nunca aplicadas mediante exclusión informal o presión social.

| Tipo | Precondiciones | Órgano autorizado | ¿Apelable? |
|---|---|---|---|
| _<Verificación privada / recordatorio>_ | _<inactividad o incumplimiento menor>_ | _<rol>_ | _<sí>_ |
| _<Advertencia escrita>_ | _<incumplimiento de obligación no resuelto tras verificación>_ | _<rol>_ | _<sí>_ |
| _<Restricción temporal de acceso>_ | _<situación crítica para la seguridad; plazo de revisión>_ | _<rol>_ | _<sí>_ |
| _<Salida forzada>_ | _<incumplimiento grave o no resuelto, o decisión de los Miembros Plenos>_ | _<Miembros Plenos>_ | _<sí — nueva votación>_ |

## Condiciones para la Restitución de Derechos

*Cláusulas RCOS: [6.4.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation)*

<details data-kind="rationale">
<summary>¿Por qué hacer explícitas las condiciones de restitución?</summary>

Si no hay un camino definido de regreso, toda sanción se vuelve efectivamente permanente y toda salida se convierte en una sentencia de por vida. Las condiciones de restitución explícitas señalan que la rendición de cuentas busca la reparación donde la reparación es posible, y evitan el control de acceso posterior sobre si alguien es "realmente" bienvenido de vuelta.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Para cada clase de sanción, establece el camino hacia la restitución de derechos — re-solicitud tras salida voluntaria, bloqueo de re-solicitud tras salida forzada, restitución tras restricción temporal.

</details>

- **Tras salida voluntaria:** _<re-solicitud a través del Protocolo de Incorporación; sin restitución automática.>_
- **Tras salida forzada:** _<bloqueo mínimo de re-solicitud; se aplica el proceso estándar de admisión.>_
- **Tras restricción temporal de acceso:** _<los derechos se restituyen tras la confirmación de resolución dentro del plazo de revisión.>_

## Coordinación con la Capa 1

*Cláusulas RCOS: [6.4.4](/articles/rcos-core/v0-1/layer-4-conflict-repair-accountability#64-sanctions-repair-and-separation)*

<details data-kind="rationale">
<summary>¿Por qué vincular esto al Protocolo de Salida y Separación?</summary>

Las reglas de salida están en la Capa 1 por una razón — gobiernan quién es y quién no es miembro. Si las acciones de rendición de cuentas crearan su propia vía de salida paralela, habría dos conjuntos de reglas, dos conjuntos de registros y una laguna para eludir el debido proceso. Un único protocolo de salida canónico cierra esa brecha.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Establece que todas las salidas forzadas y restricciones temporales de acceso siguen el Protocolo de Salida y Separación (Capa 1), y aclara que una restricción temporal no constituye una salida.

</details>

_<Todas las salidas forzadas y restricciones temporales de acceso siguen el Protocolo de Salida y Separación (Capa 1). Una restricción temporal de acceso no constituye una salida y no activa el bloqueo de re-solicitud a menos que los Miembros Plenos voten posteriormente una salida forzada.>_

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
