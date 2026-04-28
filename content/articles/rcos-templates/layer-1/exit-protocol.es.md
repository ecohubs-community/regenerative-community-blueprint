---
id: 0e61a813
title: Protocolo de Salida y Separación
parentId: 2c750c19
order: 2
lang: es
sourceHash: 953c49eb
---

- **Capa:** 1 — Sistema de Membresía
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§3.6](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [§3.7](/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [§3.8](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Salida Voluntaria

*Cláusulas RCOS: [3.6.1](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.2](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.4](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>¿Por qué facilitar la salida sin fricciones?</summary>

Una comunidad de la que es difícil salir no es una comunidad — es una trampa. La salida voluntaria DEBE estar disponible en todo momento, sin interrogatorios, períodos de preaviso ni castigos, porque el derecho a retirar el consentimiento es lo que hace real cada otro acto de consentimiento. Conservar el historial de contribuciones por separado garantiza que irse no borre el trabajo que la persona realizó.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Describe el canal para solicitar la salida, el tiempo hasta la revocación de acceso, qué registros se conservan y la transición de estado resultante.

</details>

- _<Cómo un miembro solicita una salida voluntaria; motivos opcionales.>_
- _<Período de preaviso o expectativa de traspaso, si corresponde.>_
- _<Tiempo hasta la revocación de acceso (p. ej., dentro de las 24 horas posteriores a la confirmación).>_
- _<Qué se conserva — historial de contribuciones, registros de reconocimiento — y qué se elimina.>_
- _<Transición de estado resultante (p. ej., a Miembro Salido).>_
- _<Dónde y cómo se registra la salida con marca temporal.>_

## Salida Forzada

*Cláusulas RCOS: [3.6.3](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation), [3.6.4](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>¿Por qué condicionar la expulsión a la Capa 4?</summary>

La expulsión es el poder más severo que la comunidad ejerce sobre una persona. Si puede ser ejercido por cualquiera con suficiente influencia social, la membresía no vale nada. Exigir una decisión concluida de rendición de cuentas en la Capa 4 — con motivos por escrito, una notificación y un período mínimo de bloqueo para re-solicitud — convierte la expulsión de un acto de poder en un acto de gobernanza que puede ser revisado e impugnado.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Indica que la salida forzada solo puede seguir a un proceso de rendición de cuentas concluido en la Capa 4. Define la notificación, la revocación de acceso, los registros conservados, el bloqueo de re-solicitud y la privacidad del registro de decisión.

</details>

- _<La salida forzada solo PUEDE resultar de un proceso de rendición de cuentas concluido en la Capa 4 con una decisión documentada.>_
- _<El miembro afectado DEBE ser notificado por escrito con el motivo y la referencia al registro de decisión antes de que se revoque el acceso.>_
- _<Tiempo hasta la revocación de acceso (p. ej., dentro de las 24 horas posteriores a la decisión).>_
- _<Qué se conserva, qué se elimina.>_
- _<Bloqueo de re-solicitud (duración mínima, establecida por la decisión de rendición de cuentas; referencia a la Capa 4).>_
- _<Privacidad del registro de decisión (referencia a las reglas de privacidad de la Escalera de Resolución de Conflictos).>_

## Suspensión

*Cláusulas RCOS: [3.7.1](/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [3.7.2](/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status), [3.7.3](/articles/rcos-core/v0-1/layer-1-membership-system#37-suspension-and-temporary-status)*

<details data-kind="rationale">
<summary>¿Por qué diseñar la suspensión con cuidado o no tenerla en absoluto?</summary>

Un estado de suspensión mal diseñado es peor que ninguno — se convierte en una salida encubierta sin debido proceso, o en un limbo indefinido utilizado para castigar sin la rendición de cuentas de una expulsión completa. Si la comunidad no puede comprometerse con condiciones explícitas, límites temporales y mecanismos de revisión, es más seguro no tener una suspensión formal que tener una laxa.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Define la suspensión explícitamente (condiciones de entrada, límites temporales, derechos durante la suspensión, mecanismo de revisión, salida) o indica que no existe una suspensión formal. No dejes esta sección ambigua.

</details>

_<O bien: define el estado de suspensión con condiciones de entrada, duración máxima, derechos durante la suspensión, mecanismo de revisión obligatorio y salida; o bien: indica que la suspensión formal no está definida actualmente.>_

## Separación de Activos, Roles y Responsabilidades

*Cláusulas RCOS: [3.6.5](/articles/rcos-core/v0-1/layer-1-membership-system#36-exit-and-separation)*

<details data-kind="rationale">
<summary>¿Por qué enumerar los pasos de separación?</summary>

Cuando alguien se va, cada hilo sin cerrar — un rol que nadie dejó vacante, una clave de billetera aún activa, una tarea aún asignada — se convierte en una superficie de ataque activa o una brecha operativa. Una lista de verificación obliga a cerrar estos hilos deliberadamente, en lugar de descubrirlos meses después cuando algo falla o alguien abusa de un acceso que ya no debería tener.

</details>

<details data-kind="instructions">
<summary>Cómo completar esta sección</summary>

Proporciona una lista de verificación que se aplique tanto a salidas voluntarias como forzadas. Incluye la desocupación de roles, la liberación de tareas, la eliminación de acceso a instrumentos financieros, la revocación de administración de plataformas y la resolución de obligaciones pendientes.

</details>

Los siguientes pasos de separación se aplican tanto a salidas voluntarias como forzadas:

- _<Los roles ocupados DEBEN ser desocupados y documentados en el Registro de Roles.>_
- _<Las tareas en curso DEBEN ser liberadas o traspasadas.>_
- _<El acceso a tesorería / billetera / firma DEBE ser eliminado.>_
- _<Todo acceso administrativo a plataformas DEBE ser revocado.>_
- _<Las obligaciones pendientes DEBEN ser resueltas o transferidas antes de que se finalice la salida, cuando sea posible.>_

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
