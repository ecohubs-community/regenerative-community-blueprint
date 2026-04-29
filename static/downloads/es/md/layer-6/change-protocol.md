**RCOS — Sistema Operativo de Comunidad Regenerativa**

# Protocolo de Cambios

- **Generado:** 2026-04-29
- **Fuente (versión más reciente):** [https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-6/change-protocol](https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-6/change-protocol)
- **Todas las plantillas RCOS:** [https://blueprint.ecohubs.community/es/articles/rcos-templates](https://blueprint.ecohubs.community/es/articles/rcos-templates)

---
- **Capa:** 6 — Evolución y Adaptación
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§8.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [§8.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [§8.6](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

---

## Cómo se proponen los cambios

*Cláusulas RCOS: [8.1.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.6.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.8.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#88-explicitness-rules)*

<details data-kind="rationale">
<summary>¿Por qué exigir una propuesta estructurada?</summary>

Un cambio que llega como una idea vaga en un chat no puede ser evaluado, cuestionado ni revertido después. Obligar a que cada propuesta pase por una forma mínima común —artefactos afectados, justificación, riesgos, plan de reversión— convierte una opinión en un artefacto revisable y hace imposible colar un cambio de reglas sin que la comunidad se dé cuenta.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica quién puede proponer, dónde se envían las propuestas y los campos de contenido obligatorios. Vincúlalo con el Protocolo de Gobernanza (Capa 2).

</details>

_<Cualquier Miembro Pleno puede proponer un cambio a cualquier artefacto RCOS. Indica el canal de envío.>_ Cada propuesta DEBE incluir:

- _<Resumen del cambio.>_
- _<Capas y artefactos afectados (con enlaces).>_
- _<Tipo de decisión (Operativa / Estratégica / Constitucional).>_
- _<Justificación.>_
- _<Riesgos y mitigaciones.>_
- _<Plan de reversión.>_
- _<Fecha de entrada en vigor propuesta.>_

## Cómo se clasifican las propuestas

*Cláusulas RCOS: [8.1.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.1.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms)*

<details data-kind="rationale">
<summary>¿Por qué clasificar por impacto?</summary>

No todos los cambios merecen la misma fricción. Las correcciones de erratas no deberían necesitar una supermayoría; los cambios constitucionales no deberían aprobarse en silencio. Asignar las propuestas a tipos de decisión —y elevar por defecto los casos ambiguos— hace que el coste de un cambio sea proporcional a su radio de impacto y protege la Capa 0 de ser erosionada mediante movimientos pequeños.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Define qué entra en cada tipo de decisión. Indica la regla de elevación por defecto para casos ambiguos.

</details>

- **Operativa:** _<correcciones de redacción, formato, actualizaciones menores de contenido; sin votación requerida; ejecutada por el rol responsable dentro de los límites delegados.>_
- **Estratégica:** _<cambios en el contenido de las Capas 1–5 que afectan derechos de miembros, procesos o estructuras.>_
- **Constitucional:** _<cambios en la Capa 0 (propósito, alcance, invariantes) o en el propio sistema de gobernanza (Capa 2).>_

> Si la clasificación no está clara, se aplica por defecto el tipo de mayor impacto.

## Revisión y deliberación

*Cláusulas RCOS: [8.1.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.7.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué imponer periodos mínimos de deliberación?</summary>

Sin un mínimo de tiempo de deliberación, cualquier cambio puede aprobarse de forma apresurada en un día tranquilo cuando pocos miembros están prestando atención. Los mínimos obligatorios —más largos para cambios de mayor impacto— garantizan que los miembros que están viajando, enfermos o simplemente ocupados tengan una oportunidad real de leer, objetar o participar.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Establece periodos mínimos de deliberación para cada tipo de decisión y un periodo de ratificación para los cambios Constitucionales.

</details>

- **Operativa:** _<sin deliberación requerida.>_
- **Estratégica:** _<mínimo X días de deliberación; lugar de deliberación.>_
- **Constitucional:** _<mínimo Y días de deliberación; Z días de periodo de ratificación tras la aprobación de la votación.>_

## Adopción y publicación

*Cláusulas RCOS: [8.2.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.6.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué pasos de publicación fijos?</summary>

Una votación que se aprueba pero nunca se registra por escrito es lo mismo que ninguna votación — y peor, crea un vacío donde quien recuerde el resultado puede definirlo a su manera. Unos pasos de publicación estrictos y ordenados cierran ese vacío y convierten el "qué se adoptó" en una cuestión de registro, no de memoria.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica los pasos ordenados que DEBEN ejecutarse después de que una propuesta sea aprobada. Incluye plazos y la obligación de historial de versiones.

</details>

Cuando una propuesta se aprueba:

1. _<El archivo de la propuesta se mueve al archivo de propuestas aprobadas en un plazo de X días.>_
2. _<Los artefactos afectados se actualizan en un plazo de X días.>_
3. _<Se añade una entrada en el historial de versiones.>_
4. _<Se actualizan los campos de estado en los artefactos afectados.>_

## Rechazo

*Cláusulas RCOS: [8.2.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority), [8.2.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#82-versioning-and-authority)*

<details data-kind="rationale">
<summary>¿Por qué archivar las propuestas rechazadas?</summary>

Las ideas rechazadas aportan tanta información como las aceptadas — muestran lo que la comunidad consideró y declinó. Mantener los rechazos archivados y accesibles evita que la misma propuesta reaparezca con un nombre nuevo cada seis meses y da a los futuros miembros una visión de los caminos no tomados.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica la ubicación del archivo de propuestas rechazadas y las condiciones de re-votación para revisitar la cuestión.

</details>

Cuando una propuesta es rechazada:

1. _<El archivo de la propuesta se mueve al archivo de propuestas rechazadas en un plazo de X días.>_
2. _<No se realizan cambios en los artefactos.>_
3. _<Se aplica el mecanismo de re-votación si surge nueva información (según la Matriz de Decisión, Capa 2).>_

## Transición y migración

*Cláusulas RCOS: [8.5.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility), [8.5.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>¿Por qué proteger los derechos existentes durante las transiciones?</summary>

Si las nuevas reglas pudieran reescribir silenciosamente los acuerdos existentes, la membresía no tendría sentido — lo que firmaste podría cambiar sin que te enteres. Las reglas de transición explícitas garantizan que los derechos no se reduzcan retroactivamente y que las personas que operan bajo las reglas antiguas reciban tiempo y aviso antes de que el terreno cambie.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica las reglas que protegen a los titulares de roles existentes, miembros y registros cuando un cambio de regla entra en vigor.

</details>

Cuando un cambio de regla afecta roles, acuerdos o registros existentes:

- _<Los titulares de roles existentes son notificados antes de que el cambio entre en vigor.>_
- _<Los derechos de los miembros existentes no pueden reducirse sin consentimiento o una votación Constitucional.>_
- _<Los registros anteriores al cambio no se alteran retroactivamente a menos que sea parte explícita de la propuesta.>_
- _<Se puede definir un periodo de transición en la propia propuesta.>_

## Reversión

*Cláusulas RCOS: [8.1.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#81-change-mechanisms), [8.5.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>¿Por qué hacer la reversión simétrica con la adopción?</summary>

Un cambio que no puede deshacerse por el mismo camino que lo creó es una trampa. Exigir que la reversión use el mismo tipo de decisión original mantiene la puerta abierta a la corrección sin permitir que un solo miembro revierta en silencio una decisión comunitaria llamándola una "corrección."

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica que la reversión utiliza el mismo tipo de decisión y proceso que la adopción original.

</details>

_<Cualquier decisión aprobada puede revertirse mediante el mismo proceso que la original. Cualquier Miembro Pleno puede activar una re-votación presentando una objeción razonada por escrito que no fue considerada durante la deliberación original. La reversión utiliza el mismo tipo de decisión que la original.>_

## Cambios de emergencia

*Cláusulas RCOS: [8.5.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#85-change-safety-and-reversibility)*

<details data-kind="rationale">
<summary>¿Por qué permitir cambios de emergencia?</summary>

Algunos daños se producen más rápido de lo que se puede convocar una votación. Una vía de emergencia estrecha y bien protegida permite a la comunidad responder ante fallos genuinos de seguridad o plataforma sin otorgar a nadie un poder de anulación general. El ciclo obligatorio de informe, revisión y ratificación-o-reversión es lo que evita que los poderes de emergencia se conviertan en poderes ordinarios.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Define las condiciones bajo las cuales se puede realizar un cambio de emergencia, quién puede hacerlo y el ciclo obligatorio de informe-revisión-ratificación-o-reversión.

</details>

Un cambio operativo de emergencia puede ser realizado por _<rol>_ solo si se cumplen todas las condiciones siguientes:

1. _<Se requiere acción inmediata para prevenir un daño a la seguridad o un fallo de plataforma.>_
2. _<No se puede convocar una votación de Miembros Plenos a tiempo.>_
3. _<El cambio no anula un invariante de la Capa 0.>_

Los cambios de emergencia DEBEN:

- _<Ser comunicados a todos los Miembros Plenos en un plazo de X horas.>_
- _<Ser revisados en la siguiente reunión comunitaria.>_
- _<Ser ratificados mediante el tipo de decisión correspondiente en un plazo de Y días, o revertidos automáticamente.>_

## Experimentos

*Cláusulas RCOS: [8.3.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué tratar los experimentos como un mecanismo diferenciado?</summary>

La comunidad necesita una forma de probar cosas nuevas sin tener que adoptarlas permanentemente para poder evaluarlas. Los experimentos crean ese espacio — pero solo si tienen una duración limitada, están etiquetados y expiran automáticamente. Sin esas salvaguardas, un "experimento" se convierte en la forma más rápida de instalar una regla permanente sin deliberación real.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Define las reglas que cada experimento DEBE cumplir. Haz referencia a la Plantilla de Experimento para la estructura completa de envío.

</details>

_<Cualquier Miembro Pleno puede proponer un experimento con duración limitada mediante decisión Estratégica. Consulta la Plantilla de Experimento para los campos requeridos.>_

- _<Los experimentos expiran automáticamente al final de su duración definida a menos que se renueven explícitamente mediante una nueva propuesta.>_
- _<Todos los artefactos afectados por un experimento DEBEN estar explícitamente etiquetados como experimentales durante su vigencia.>_
- _<Suspensión de seguridad: si un experimento introduce un riesgo de seguridad creíble, coerción o daño sostenido, se puede invocar una suspensión de emergencia conforme a los Cambios de emergencia descritos arriba.>_
- _<Los resultados y aprendizajes se registran en el Registro de Aprendizajes.>_

---

## Registro de ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Constitucional
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
