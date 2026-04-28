---
id: 7d1b3f2a
title: Manual de Operaciones
parentId: 2bd4d877
order: 0
lang: es
sourceHash: cc62727f
---

- **Capa:** 5 — Operaciones y Coordinación
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§7.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [§7.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [§7.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [§7.5](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [§7.6](/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)

---

## Procesos Operativos Fundamentales

*Cláusulas RCOS: [7.3.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.6.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué documentar los procesos críticos?</summary>

Si un proceso solo existe en la cabeza de una persona, la comunidad depende de que esa persona aparezca — para siempre. Documentar los procesos críticos por escrito, con responsables nombrados, es lo que convierte el conocimiento privado en un activo comunitario que sobrevive a traspasos, ausencias y salidas.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Para cada proceso crítico recurrente (incorporación, salida, publicación de propuestas, registro de contribuciones, cadencia de reuniones, gestión de tesorería, revisión de accesos a plataformas), nombra un responsable y una breve descripción.

</details>

| Proceso | Quién | Detalle |
|---|---|---|
| _<Incorporación de miembros>_ | _<rol>_ | _<ver Protocolo de Incorporación (Capa 1)>_ |
| _<Salida de miembros>_ | _<rol>_ | _<ver Protocolo de Salida y Separación (Capa 1)>_ |
| _<Publicación de propuestas>_ | _<rol>_ | _<ver Protocolo de Gobernanza (Capa 2)>_ |
| _<Registro de contribuciones>_ | _<rol>_ | _<ver Protocolo de Economía Interna (Capa 3)>_ |
| _<Reunión recurrente>_ | _<facilitador/a>_ | _<publicación de agenda; actas; seguimiento de acciones>_ |
| _<Gestión de tesorería>_ | _<administrador/a de finanzas>_ | _<ver Reglamento de Tesorería (Capa 3)>_ |
| _<Revisión de accesos a plataformas>_ | _<administrador/a de infraestructura>_ | _<cadencia de revisión; revocación de accesos para miembros que han salido>_ |

## Responsabilidades Temporales y Ad-Hoc

*Cláusulas RCOS: [7.1.5](/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.1.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#71-roles-and-responsibilities), [7.7.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué limitar las responsabilidades temporales?</summary>

Las tareas ad-hoc se solidifican silenciosamente en trabajos permanentes no remunerados — generalmente sobre quien dijo que sí una vez. Un límite temporal estricto y una revisión obligatoria marcan la diferencia entre "cubrí durante una semana" y "aparentemente este es mi rol ahora."

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Establece que toda responsabilidad temporal DEBE estar acotada en el tiempo al asignarla, documentada, revisada antes del vencimiento, y formalizada o terminada.

</details>

Cuando una tarea o responsabilidad se asigna temporalmente, DEBE:

- _<Estar explícitamente acotada en el tiempo desde el inicio (fecha de fin específica o condición de finalización).>_
- _<Documentarse como temporal en el momento de la asignación.>_
- _<Revisarse antes de la fecha de fin; convertirse en un rol formal o terminarse.>_

_<Duración máxima de cualquier responsabilidad temporal antes de que DEBA asignarse formalmente o terminarse — p. ej. 90 días.>_ Si una responsabilidad temporal no tiene responsable después de su fecha de fin, caduca; no se transfiere implícitamente.

---

## Interfaces entre Roles y Dominios

*Cláusulas RCOS: [7.6.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#76-artifacts), [7.3.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>¿Por qué mapear los traspasos explícitamente?</summary>

La mayoría de los fallos operativos no ocurren dentro de un rol sino entre roles — en las fronteras donde el trabajo pasa de un responsable al siguiente. Nombrar los traspasos convierte dependencias invisibles en dependencias revisables, y previene los fallos de "yo pensaba que lo tenías tú".

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Para cada par de roles que se pasan trabajo entre sí, nombra el traspaso y el tipo de trabajo transferido.

</details>

| De | A | Traspaso |
|---|---|---|
| _<rol>_ | _<rol>_ | _<qué se traspasa>_ |
| _<rol>_ | _<rol>_ | _<...>_ |

## Límites de Carga de Trabajo

*Cláusulas RCOS: [7.4.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.4.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#74-workload-and-capacity-boundaries), [7.7.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué hacer explícitos los límites de carga de trabajo?</summary>

La carga de coordinación ilimitada es el modo de fallo predeterminado de las comunidades voluntarias — quema silenciosamente a los miembros más comprometidos hasta que se van. Límites explícitos y revisables hacen de la capacidad una preocupación compartida en lugar de una carga privada.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Establece límites para la carga de reuniones, carga de roles, expectativas de tiempo de respuesta, y el camino para renegociar responsabilidades.

</details>

- **Carga de reuniones:** _<cadencia de reuniones recurrentes y duración máxima; reglas para reuniones extraordinarias.>_
- **Carga de roles:** _<tope si lo hay; regla para señalar sobrecarga; plazo de resolución.>_
- **Expectativas de tiempo de respuesta:** _<asíncrono no urgente; operativo urgente; crítico para la seguridad.>_
- **Renegociación y alivio:** _<proceso para redistribuir responsabilidades; plazo de resolución.>_

## Continuidad Operativa

*Cláusulas RCOS: [7.5.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity), [7.5.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#75-operational-continuity)*

<details data-kind="rationale">
<summary>¿Por qué planificar la continuidad ahora?</summary>

Una comunidad que depende de una persona irremplazable está a una enfermedad, un conflicto o una salida de distancia del colapso. Nombrar los puntos únicos de fallo — con honestidad — e incorporar el traspaso en cada rol es lo que permite a la comunidad sobrevivir a sus fundadores.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Nombra honestamente los puntos únicos de fallo actuales. Establece el requisito de traspaso para cada rol y la cadencia de revisión de continuidad.

</details>

- **Estado actual:** _<lista honesta de puntos únicos de fallo; plan de reclutamiento para reducir la concentración.>_
- **Mecanismos de traspaso:** _<referencia a los requisitos de traspaso por rol en el Registro de Roles; el traspaso DEBE completarse antes de que un rol quede vacante.>_
- **Cadencia de revisión de continuidad:** _<trimestral; ad hoc ante cambio de rol.>_

## Flujo de Información y Anti-Monopolización

*Cláusulas RCOS: [7.3.5](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.7.4](/articles/rcos-core/v0-1/layer-5-operations-coordination#77-layer-invariants), [7.3.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>¿Por qué tratar el acceso a la información como un asunto de gobernanza?</summary>

Quien controla el acceso a la información controla la comunidad, lo pretenda o no. Hacer explícitas las reglas de acceso — y prohibir los puntos únicos de acceso — es lo que impide que los guardianes informales acumulen el tipo de poder que el sistema de gobernanza se supone que debe controlar.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica qué registros están abiertos a todos los Miembros Plenos, el plazo de respuesta para solicitudes de información, y la regla contra los puntos únicos de acceso para información relevante de gobernanza.

</details>

- _<Decisiones de gobernanza accesibles para todos los Miembros Plenos.>_
- _<Actas de reuniones publicadas en un plazo de X horas.>_
- _<Estado de membresía y asignaciones de roles accesibles.>_
- _<Registros de contribuciones accesibles.>_
- _<Plazo de respuesta a solicitudes de información.>_
- _<Retener el acceso a información a la que los miembros tienen derecho es un activador de rendición de cuentas según la Capa 4.>_
- _<Ningún rol o individuo PUEDE ser el único punto de acceso para información requerida por otros titulares de roles.>_

---

## Ubicaciones de Documentación y Procedimientos de Actualización

*Cláusulas RCOS: [7.3.1](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.2](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow), [7.3.3](/articles/rcos-core/v0-1/layer-5-operations-coordination#73-documentation-and-information-flow)*

<details data-kind="rationale">
<summary>¿Por qué nombrar dónde vive cada documento?</summary>

Si nadie puede decir dónde está la versión canónica de algo, no hay versión canónica. Nombrar la ubicación, el responsable y la cadencia de revisión de cada tipo de documento es lo que hace que la memoria de la comunidad sea auditable en lugar de folclórica.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Para cada tipo de documento, nombra la ubicación canónica, el responsable y la cadencia de revisión.

</details>

| Tipo de documento | Ubicación | Responsable | Cadencia de revisión |
|---|---|---|---|
| _<Artefactos RCOS>_ | _<ubicación>_ | _<responsable>_ | _<cadencia>_ |
| _<Registro de miembros>_ | _<ubicación>_ | _<responsable>_ | _<cadencia>_ |
| _<Actas de reuniones>_ | _<ubicación>_ | _<responsable>_ | _<cadencia>_ |
| _<Propuestas de gobernanza>_ | _<ubicación>_ | _<responsable>_ | _<cadencia>_ |
| _<Registros de contribuciones>_ | _<ubicación>_ | _<responsable>_ | _<cadencia>_ |

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
