---
id: b6d4e7f9
title: Registro de Estados de Membresía
parentId: 2c750c19
order: 3
lang: es
sourceHash: c7a1c1df
---

- **Capa:** 1 — Sistema de Membresía
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§3.1](/articles/rcos-core/v0-1/layer-1-membership-system#31-membership-states)

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

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
