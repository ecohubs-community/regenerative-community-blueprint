---
id: b6d4e7f9
title: Registro de Estados de Membresía
parentId: 2c750c19
order: 3
lang: es
sourceHash: b23f1b91
---

- **Capa:** 1 — Sistema de Membresía
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§3.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [§3.8](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)

---

## Estados de Membresía Definidos

*Cláusulas RCOS: [3.1.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.2](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.3](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.4](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states), [3.1.5](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)*

<details data-kind="rationale">
<summary>¿Por qué una única tabla de estados?</summary>

Los derechos y obligaciones dispersos en distintos documentos terminan divergiendo. Reunir cada estado, sus derechos, sus obligaciones y sus transiciones en una sola tabla hace que el sistema de membresía sea auditable de un vistazo — puedes ver cada puerta de entrada y salida de la comunidad, y lo que cada una otorga. Si dos documentos alguna vez se contradicen, este registro es el que prevalece.

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Define cada estado de membresía que tu comunidad reconoce (p. ej., Solicitante, Miembro en Prueba, Miembro Pleno, Miembro Saliente). Para cada uno, enumera derechos, obligaciones, condición de entrada y condición de salida. Mantén los estados mutuamente excluyentes — ninguna persona puede tener dos estados simultáneamente.

</details>

| Estado | Derechos | Obligaciones | Condición de entrada | Condición de salida |
|---|---|---|---|---|
| _<Estado 1, p. ej. Solicitante>_ | _<derechos>_ | _<obligaciones>_ | _<entrada>_ | _<salida>_ |
| _<Estado 2, p. ej. Miembro en Prueba>_ | _<derechos>_ | _<obligaciones>_ | _<entrada>_ | _<salida>_ |
| _<Estado 3, p. ej. Miembro Pleno>_ | _<derechos>_ | _<obligaciones>_ | _<entrada>_ | _<salida>_ |
| _<Estado 4, p. ej. Miembro Saliente>_ | _<derechos>_ | _<obligaciones>_ | _<entrada>_ | _<salida>_ |

> Ninguna persona puede tener múltiples estados de membresía simultáneamente.
> No se pueden asumir derechos ni obligaciones fuera del estado de membresía actual de la persona.

## Notas Técnicas

<details data-kind="rationale">
<summary>¿Por qué conservar datos después de la salida?</summary>

La historia de la comunidad pertenece a la comunidad, no a ninguna cuenta individual. Conservar los registros de contribución después de la salida protege la integridad de las pistas de auditoría, el historial de gobernanza y la contabilidad de reconocimientos — mientras que revocar el acceso y eliminar a la persona de los listados activos respeta la finalidad de su partida.

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Describe qué registros se conservan después de la salida, dónde se gestionan operativamente las asignaciones de estado y cómo interactúa la revocación de acceso con las capacidades de la plataforma.

</details>

- _<Historial de contribuciones y gobernanza retenido después de la salida; describe la política de retención.>_
- _<Los miembros salientes se eliminan de los listados activos; describe la revocación de acceso por plataforma.>_
- _<Ubicación operativa de las asignaciones de estado — ver "Lista Actual de Miembros" más abajo.>_

## Lista Actual de Miembros

*Cláusulas RCOS: [3.8.2](/articles/rcos-core/v0-1/layer-1-membership-system#38-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué separar la definición de la lista?</summary>

Este documento define lo que significan los estados; el registro vivo rastrea quién está en qué estado hoy. Mantenerlos separados significa que las definiciones son estables y gobernables mientras que las asignaciones se mantienen actualizadas — y nadie tiene que modificar un artefacto ratificado cada vez que un miembro se incorpora o se va.

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Enlaza al sistema operativo o documento donde se rastrean las asignaciones actuales de miembro a estado. Este artefacto no debería tener que modificarse cada vez que un miembro se incorpora o se va.

</details>

> La lista viva de miembros se mantiene en _<sistema / ubicación>_. Este documento define los estados; la herramienta de registro contiene las asignaciones actuales.

_<Enlace o ubicación del directorio vivo de miembros.>_

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
