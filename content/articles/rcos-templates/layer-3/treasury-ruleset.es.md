---
id: 9ead12cf
title: Reglamento de Tesorería
parentId: 7fcb6634
order: 1
lang: es
sourceHash: 10d5e9b8
---

- **Capa:** 3 — Sistema Económico y de Recursos
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§5.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [§5.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)

---

## Alcance de la Tesorería

*Cláusulas RCOS: [5.3.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.5.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué trazar una línea firme alrededor de los fondos de tesorería?</summary>

Sin un límite explícito, cualquier dinero que fluya cerca de la comunidad — la tarjeta personal de un fundador, una cuenta paralela, un fondo informal de reembolsos — puede terminar siendo tratado como dinero comunitario, con todas las obligaciones que eso implica. Nombrar exactamente qué cuentas son tesorería y cuáles no protege tanto a la comunidad como a las personas que pagan de su propio bolsillo.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Nombra cada cuenta que es tesorería (billetera, cuenta bancaria, etc.) y establece explícitamente que los fondos personales que operan informalmente no son tesorería y no crean ninguna obligación comunitaria.

</details>

_<Define qué cuentas son tesorería comunitaria — direcciones de billetera explícitas, cuentas bancarias, etc. Establece que cualquier nueva cuenta de tesorería DEBE ser declarada y aprobada mediante una decisión Estratégica antes de que se reciban fondos en ella. Establece que los fondos personales que cubren costes operativos no son tesorería y no generan derecho de reembolso comunitario.>_

## Fuentes de Ingreso

*Cláusulas RCOS: [5.3.2](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>¿Por qué canalizar todos los ingresos a través de una lista declarada?</summary>

Cada fuente de ingreso trae condiciones — requisitos de reporte, expectativas, riesgos de dependencia. Si los canales de ingreso pueden abrirse informalmente, esas condiciones se adhieren antes de que la comunidad haya tenido oportunidad de evaluarlas. Una lista declarada, modificable solo mediante decisiones Estratégicas, mantiene las obligaciones de la comunidad bajo su propio control.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Nombra cada fuente de ingreso que la comunidad tiene actualmente y referencia el Protocolo de Economía Interna para la regla de que cualquier nuevo canal de ingreso requiere una decisión Estratégica.

</details>

_<Enumera las fuentes de ingreso actuales, o indica que no hay ninguna. Referencia la sección de Interfaces de Ingresos Externos en el Protocolo de Economía Interna.>_

## Autoridad de Gasto

*Cláusulas RCOS: [5.3.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.7.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#57-explicitness-rules)*

<details data-kind="rationale">
<summary>¿Por qué especificar los umbrales en una tabla?</summary>

Cuando la autoridad de gasto es vaga, aparecen dos modos de fallo: o cada pequeña decisión escala y nada se hace, o un solo administrador acumula silenciosamente discrecionalidad que nadie votó concederle. Una tabla con montos, tipos de decisión y órganos autorizados elimina la ambigüedad y hace que el gasto no autorizado sea inmediatamente visible.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Define niveles de gasto por monto y el tipo de decisión, órgano autorizado y mecanismo para cada uno. Los contratos plurianuales y la deuda DEBERÍAN tener su propio nivel (Constitucional).

</details>

| Monto | Tipo de Decisión | Órgano Autorizado | Mecanismo |
|---:|---|---|---|
| _<Hasta el límite delegado (p. ej. €X)>_ | _<Operacional>_ | _<Administrador/a de Finanzas>_ | _<Delegado>_ |
| _<Cualquier monto por encima del límite delegado>_ | _<Estratégico>_ | _<Miembros Plenos>_ | _<Votación>_ |
| _<Contratos plurianuales, deuda u obligaciones financieras estructurales>_ | _<Constitucional>_ | _<Miembros Plenos>_ | _<Supermayoría + ratificación>_ |

## Transparencia y Reportes

*Cláusulas RCOS: [5.3.4](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.3.5](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management), [5.6.1](/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué hacer de la transparencia el estándar, no una funcionalidad?</summary>

La opacidad en una tesorería se acumula: una divulgación faltante invita a otra, y antes de que te des cuenta los miembros ya no pueden verificar si el dinero de la comunidad se está gestionando como acordaron. Hacer de la visibilidad en tiempo real la línea base — y exigir que cualquier excepción sea nombrada, justificada y limitada en el tiempo — mantiene la auditoría al alcance de cada miembro, no solo de los administradores.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Establece la visibilidad por defecto para cada cuenta de tesorería. Donde la visibilidad directa no sea posible (p. ej. algunas cuentas bancarias), define una cadencia de reporte periódico con un responsable nombrado.

</details>

- _<Tesorería principal (p. ej. multi-firma Safe): todos los Miembros Plenos tienen como mínimo acceso de lectura; visibilidad en tiempo real.>_
- _<Otras cuentas declaradas: acceso directo de lectura multiusuario si es compatible; de lo contrario, resumen periódico de saldo y transacciones.>_
- _<Todas las decisiones de gasto referencian el registro de gobernanza vinculado (ID de votación o registro de decisiones delegadas).>_

## Reservas, Riesgos y Restricciones de Deuda

*Cláusulas RCOS: [5.3.6](/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>¿Por qué bloquear la deuda y las obligaciones a largo plazo por defecto?</summary>

La deuda y los compromisos recurrentes vinculan a la comunidad más allá de las personas que actualmente la integran — los futuros miembros heredan las obligaciones. Prohibirlas salvo que una votación Estratégica las autorice explícitamente evita que se contraigan restricciones a largo plazo de manera casual y preserva la opción de mantenerse ligeros.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Establece las reglas sobre deuda, obligaciones recurrentes, reservas de contingencia e instrumentos financieros fuera de tesorería. Por defecto: "no permitido sin votación Estratégica" para todo lo que comprometa el futuro.

</details>

- **Deuda:** _<permitida solo mediante votación Estratégica.>_
- **Obligaciones a largo plazo:** _<costes recurrentes / contratos permitidos solo mediante votación Estratégica.>_
- **Reserva de contingencia:** _<objetivo de reserva, o indicar que aún no se ha definido.>_
- **Instrumentos fuera de tesorería:** _<préstamos, inversiones, garantías solo mediante votación Estratégica.>_

## Reglas de Conflicto de Intereses

*Cláusulas RCOS: [5.4.3](/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints)*

<details data-kind="rationale">
<summary>¿Por qué prohibir la autoaprobación directamente?</summary>

Incluso las personas bienintencionadas inclinan inconscientemente las decisiones hacia sus propios intereses; una regla que exige divulgación y abstención elimina el juicio subjetivo y la presión social de "confiar en alguien". La autoaprobación de gastos es la forma más común en que los sistemas de gobernanza pequeños pierden silenciosamente su integridad, por eso la regla se enuncia sin rodeos.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Establece la regla de no autoaprobación y la regla de divulgar y abstenerse para cualquier miembro con un interés financiero directo en una decisión de gasto.

</details>

- _<Los solicitantes no PUEDEN aprobar sus propias solicitudes de gasto.>_
- _<Los miembros con un interés financiero directo en una decisión de gasto DEBEN declararlo y abstenerse.>_
- _<Los titulares de roles de tesorería no PUEDEN autorizar gastos unilaterales por encima del límite delegado.>_

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
