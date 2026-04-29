**RCOS — Sistema Operativo de Comunidad Regenerativa**

# Protocolo de Economía Interna

- **Generado:** 2026-04-29
- **Fuente (versión más reciente):** [https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-3/internal-economy-protocol](https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-3/internal-economy-protocol)
- **Todas las plantillas RCOS:** [https://blueprint.ecohubs.community/es/articles/rcos-templates](https://blueprint.ecohubs.community/es/articles/rcos-templates)

---
- **Capa:** 3 — Sistema Económico y de Recursos
- **Estado:** Plantilla — adaptar para tu comunidad
- **Referencia RCOS:** [§5.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [§5.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [§5.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [§5.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#55-artifacts)

---

## Clasificación de Bienes Comunes vs. Privados

*Cláusulas RCOS: [5.1.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.1.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#51-commons-vs-private-resources), [5.6.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué clasificar cada recurso?</summary>

Los recursos sin clasificar son donde ocurre la privatización silenciosa: alguien empieza a tratar un bien compartido como personal, o un bien privado se absorbe silenciosamente en las obligaciones comunitarias, y para cuando alguien se da cuenta la norma ya cambió. La clasificación explícita, con custodios y reglas de transferencia nombrados desde el inicio, convierte cualquier cambio de ese estado en un acto de gobernanza visible en lugar de un hecho que se impone gradualmente.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Para cada recurso que posea la comunidad, declara la clasificación (Bienes Comunes / Privado), nombra un custodio, define reglas de acceso y establece restricciones de transferencia. Los recursos sin clasificar no DEBEN ser asignados, gravados, monetizados ni transferidos hasta que estén clasificados.

</details>

| Recurso | Clasificación | Custodio | Reglas de acceso | Restricciones de transferencia |
|---|---|---|---|---|
| _<p. ej. Especificación y artefactos RCOS>_ | _<Bienes Comunes / Privado>_ | _<rol de custodio>_ | _<quién lee / escribe>_ | _<restricciones de transferencia>_ |
| _<p. ej. Tesorería compartida>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ej. Sitio web / dominios de la comunidad>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ej. Marca y cuentas en redes sociales>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |
| _<p. ej. Terreno o infraestructura física>_ | _<...>_ | _<...>_ | _<...>_ | _<...>_ |

> Cualquier recurso sin clasificar no DEBE ser asignado, gravado, monetizado ni transferido hasta que se complete la clasificación.

## Categorías de Contribución Reconocidas

*Cláusulas RCOS: [5.2.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.2.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.6.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué nombrar los tipos de trabajo que cuentan?</summary>

Si la comunidad nunca dice en voz alta de qué tipos de trabajo depende, el trabajo invisible — cuidado, facilitación, moderación, custodia — permanece invisible, y las personas que lo realizan se agotan o se van. Enumerar las categorías convierte "alguien simplemente hace esto" en trabajo reconocido que el sistema tiene que tener en cuenta.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Enumera las categorías de contribución que tu comunidad reconoce. El cuidado, la facilitación, la custodia y la participación informal suelen estar insuficientemente reconocidos — nómbralos explícitamente si aplican.

</details>

| Categoría | Ejemplos |
|---|---|
| _<p. ej. Conocimiento e Investigación>_ | _<ejemplos>_ |
| _<p. ej. Desarrollo Técnico>_ | _<ejemplos>_ |
| _<p. ej. Gobernanza y Coordinación>_ | _<ejemplos>_ |
| _<p. ej. Construcción de Comunidad>_ | _<ejemplos>_ |
| _<p. ej. Cuidado y Apoyo>_ | _<ejemplos>_ |
| _<p. ej. Custodia>_ | _<ejemplos>_ |
| _<p. ej. Participación Informal>_ | _<ejemplos>_ |

## Mecanismo de Reconocimiento de Contribuciones

*Cláusulas RCOS: [5.2.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.2.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition)*

<details data-kind="rationale">
<summary>¿Por qué definir cómo funciona realmente el reconocimiento?</summary>

Sin un mecanismo definido, "quién obtiene crédito" se convierte en una cuestión de quién habla más fuerte o está más cerca de quien decide. Especificar qué califica, cómo se registra, quién valida y cómo se impugna convierte el reconocimiento en algo con lo que un miembro puede contar de verdad — y evita que el reconocimiento mute silenciosamente en influencia de gobernanza.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica qué califica, cómo se registran los reconocimientos, quién valida, qué desbloquean (o no desbloquean) y cómo los miembros impugnan un registro.

</details>

- **Qué califica:** _<qué actividades cuentan y a declaración de quién.>_
- **Cómo se registran las contribuciones:** _<canal estructurado; canal informal/auto-reportado.>_
- **Quién valida:** _<automático / titular de rol / proceso de nominación.>_
- **Efecto en acceso/privilegios:** _<el reconocimiento solo afecta el saldo de unidades internas; no otorga derechos de gobernanza adicionales más allá del estado de membresía.>_
- **Impugnación:** _<plazo y proceso para impugnar un registro.>_

## Unidades Internas

*Cláusulas RCOS: [5.2.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition), [5.2.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#52-contribution-recognition)*

<details data-kind="rationale">
<summary>¿Por qué definir las unidades internas con tanta precisión?</summary>

Las unidades internas tienden a adquirir poderes que nadie votó — decaimiento, topes, transferibilidad, peso en la gobernanza — a menos que cada propiedad quede fijada por escrito. Listar la emisión, reglas de transferencia, privacidad y su estatus explícito de no-gobernanza hace que las unidades sean herramientas de reconocimiento en lugar de monedas sombra silenciosas.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Si tu comunidad usa unidades internas (XP, ECO, créditos, etc.), define para cada unidad su propósito, emisión, transferibilidad, decaimiento, tope, prevención de fraude y privacidad. Indica explícitamente que las unidades no otorgan derechos de gobernanza más allá del estado de membresía.

</details>

| Propiedad | _<Unidad A>_ | _<Unidad B>_ |
|---|---|---|
| **Propósito** | _<...>_ | _<...>_ |
| **Emisión** | _<...>_ | _<...>_ |
| **Transferibilidad** | _<...>_ | _<...>_ |
| **Expiración / decaimiento** | _<...>_ | _<...>_ |
| **Tope máximo** | _<...>_ | _<...>_ |
| **Prevención de fraude** | _<...>_ | _<...>_ |
| **Privacidad** | _<...>_ | _<...>_ |

> Las unidades internas no otorgan derechos de gobernanza más allá de lo que define el estado de membresía.

## Restricciones de Acumulación

*Cláusulas RCOS: [5.4.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.4.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.4.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.4.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#54-accumulation-constraints), [5.6.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#56-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué restringir la acumulación?</summary>

Cualquier unidad interna que pueda acumularse sin límite eventualmente se convierte en apalancamiento — unos pocos miembros con saldos grandes obtienen influencia informal que el sistema de gobernanza nunca les otorgó. Establecer las reglas de acumulación explícitamente, incluso cuando la regla actual es "ninguna todavía", mantiene la cuestión abierta y obliga a tomar una decisión visible antes de que la concentración se convierta en un problema estructural.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica la regla de acumulación actual (tope, decaimiento, ninguna) y la regla de que ninguna unidad interna PUEDE convertirse en autoridad de gobernanza.

</details>

- _<Tope máximo de unidades internas, si lo hay.>_
- _<Regla de decaimiento, si la hay.>_
- _<Las unidades internas no PUEDEN convertirse en autoridad de gobernanza ni usarse para eludir la Matriz de Decisiones.>_

## Interfaces de Ingresos Externos

*Cláusulas RCOS: [5.3.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-3-economic-resource-system#53-treasury-management)*

<details data-kind="rationale">
<summary>¿Por qué requerir aprobación antes de que llegue el dinero?</summary>

Una vez que los fondos están en mano, la conversación pasa de "¿deberíamos aceptar esto?" a "¿qué hacemos con esto?" — y las condiciones vinculadas a los ingresos (términos de subvención, obligaciones de asociación, compromisos de servicio) a menudo ya están fijadas. Requerir una decisión Estratégica antes de abrir cualquier nuevo canal de ingresos mantiene a la comunidad en control de lo que asume.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Enumera los canales de ingresos actuales declarados, nombra posibles canales futuros y requiere aprobación Estratégica antes de abrir cualquier nuevo canal.

</details>

- _<Canales de ingresos actuales.>_
- _<Posibles canales de ingresos futuros.>_
- _<Regla: cualquier nueva interfaz de ingresos externos DEBE ser declarada y aprobada mediante una decisión Estratégica antes de que se reciban fondos o se asuman compromisos.>_

## Resolución de Disputas para Registros Económicos

<details data-kind="rationale">
<summary>¿Por qué acotar las disputas económicas en el tiempo?</summary>

Los registros de contribuciones y saldos se acumulan rápido; si las disputas pudieran plantearse indefinidamente, el libro mayor nunca se estabilizaría y cada crédito histórico quedaría eternamente impugnable. Un plazo definido con un resolutor designado y una vía de apelación da a los miembros una oportunidad real de corregir errores sin dejar toda la historia económica perpetuamente inestable.

</details>

<details data-kind="instructions">
<summary>Cómo rellenar esto</summary>

Indica el plazo de impugnación, el resolutor designado y la vía de apelación. Consulta el Mecanismo de Reconocimiento de Contribuciones para el proceso completo.

</details>

_<Plazo para impugnar un registro de contribución o saldo; resolutor designado; vía de apelación a los Miembros Plenos mediante el proceso de gobernanza.>_

---

## Registro de Ratificación

- **Adoptado:** <AAAA-MM-DD>
- **Tipo de decisión:** Estratégica
- **Versión:** <versión>
- **Registro de decisión:** <enlace al registro de decisión>
