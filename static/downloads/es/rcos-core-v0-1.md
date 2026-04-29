**RCOS — Sistema Operativo de Comunidad Regenerativa**

# Especificación RCOS Core — v0.1

- **Generado:** 2026-04-29
- **Fuente (versión más reciente):** [https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1)

- Estado: Borrador
- Versión: RCOS-Core v0.1
- Audiencia: Fundadores de comunidades, profesionales, auditores, implementadores
- Palabras clave normativas: `DEBE`, `NO DEBE`, `DEBERÍA`, `PUEDE` (estilo RFC)

## Índice

- [Acerca de RCOS Core](#acerca-de-rcos-core)
- [0. Introducción](#0-introduccin)
- [1. Modelo de Conformidad RCOS](#1-modelo-de-conformidad-rcos)
- [2. Capa 0 — Identidad y Alcance](#2-capa-0-identidad-y-alcance)
- [3. Capa 1 — Sistema de Membresía](#3-capa-1-sistema-de-membresa)
- [4. Capa 2 — Gobernanza y lógica de decisión](#4-capa-2-gobernanza-y-lgica-de-decisin)
- [5. Capa 3 — Sistema Económico y de Recursos](#5-capa-3-sistema-econmico-y-de-recursos)
- [6. Capa 4 — Conflicto, Reparación y Rendición de Cuentas](#6-capa-4-conflicto-reparacin-y-rendicin-de-cuentas)
- [7. Capa 5 — Operaciones y Coordinación](#7-capa-5-operaciones-y-coordinacin)
- [8. Capa 6 — Evolución y Adaptación](#8-capa-6-evolucin-y-adaptacin)
- [9. Secciones no normativas](#9-secciones-no-normativas)
- [10. Cumplimiento y Auditoría](#10-cumplimiento-y-auditora)
- [11. Versionado y gobernanza del estándar](#11-versionado-y-gobernanza-del-estndar)
- [Apéndice A — Glosario](#apndice-a-glosario)
- [Apéndice B — Artefactos de Ejemplo (No Normativo)](#apndice-b-artefactos-de-ejemplo-no-normativo)
- [Apéndice C — Resumen de implementación de referencia](#apndice-c-resumen-de-implementacin-de-referencia)

---

# Acerca de RCOS Core

## Qué es RCOS

El **Sistema Operativo Comunitario Regenerativo (RCOS)** es una especificación formal y por capas para diseñar, operar y evolucionar comunidades intencionales sin depender del carisma, la ideología o el poder informal.

RCOS trata a una comunidad como un **sistema gobernado**, no como un experimento social. Define los requisitos estructurales mínimos necesarios para que una comunidad se mantenga:

- coherente bajo estrés,
- justa ante asimetrías de poder,
- adaptable sin colapsar,
- y regenerativa a lo largo del tiempo.

RCOS no es un estilo de vida, un sistema de creencias ni una identidad cultural. Es un **sistema operativo**: un conjunto de reglas explícitas, interfaces, invariantes y casos de prueba que hacen la vida comunitaria legible, auditable y sostenible.

---

## Qué problema resuelve RCOS

La mayoría de las comunidades no fracasan por malas intenciones. Fracasan por **estructura implícita**.

Los patrones de fracaso más comunes incluyen:

- líderes informales que anulan los procesos formales,
- normas tácitas aplicadas como reglas,
- trabajo invisible que lleva al agotamiento,
- riqueza o carisma convertidos en poder,
- conflictos evitados hasta volverse existenciales,
- decisiones de emergencia que se convierten en excepciones permanentes.

RCOS existe para hacer que estos modos de fallo sean **estructuralmente imposibles o explícitamente abordables**.

---

## Qué NO es RCOS

RCOS explícitamente **no** prescribe:

- una cultura, creencia o espiritualidad específica,
- una ideología política o económica,
- un método de gobernanza (p. ej., consenso vs sociocracia),
- ni cómo las personas _deberían_ vivir juntas.

En su lugar, RCOS restringe _cómo se toman las decisiones_, _cómo se limita el poder_ y _cómo ocurre el cambio_, independientemente de los valores.

---

## Principios de diseño (no negociables)

> **Nada esencial puede permanecer implícito.**

- **Basado en restricciones, no en valores** — Define reglas y límites en lugar de prescribir creencias. Los valores varían; las restricciones mantienen los sistemas funcionales bajo estrés.
- **Pre-compromiso sobre improvisación** — Las decisiones críticas (conflicto, poder, dinero) se acuerdan antes de que surjan emociones, escasez o luchas de poder.
- **Modular por defecto** — El núcleo permanece estable mientras los módulos de dominio opcionales pueden añadirse, reemplazarse o eliminarse sin romper el sistema.
- **Escala humana (≈ 5–150 personas)** — Optimizado para grupos lo suficientemente pequeños como para mantener confianza, rendición de cuentas y contexto compartido sin burocracia.
- **Tolerante al fallo, no ciego al fallo** — Asume que el conflicto, el agotamiento y los errores ocurrirán, y proporciona caminos de recuperación explícitos.

Todo lo que afecte a lo siguiente DEBE ser explícitamente declarado, versionado y revisable:

- autoridad
- membresía
- recursos
- conflicto
- evolución del sistema

- El silencio nunca se trata como consentimiento.
- La tradición nunca se trata como autoridad.
- La urgencia nunca se trata como justificación.

---

## Sobre el tamaño del grupo: ¿por qué ~150?

**150** ≈ Número de Dunbar: límite cognitivo para relaciones sociales estables.

- **Comunidad mínima viable (5–7 personas):**
  Por debajo de esto, la separación de roles y la resolución de conflictos colapsan.
- **Rango horizontal óptimo (8–40 personas):**
  Alta confianza, baja burocracia, participación directa posible.
- **Tamaño máximo no segmentado (120–150 personas):**
  Más allá de esto, la gobernanza informal falla.

El Núcleo RCOS se aplica a cualquier tamaño, pero por encima de ~150 personas, se REQUIEREN subestructuras obligatorias (círculos, dominios, vecindarios).

---

## Por qué importa la estructura del Núcleo RCOS

- Previene la dominancia del fundador
- Hace explícito el poder
- Reduce las normas ocultas
- Sobrevive al conflicto
- Permite la replicación
- Se integra limpiamente con herramientas DAO, _sin depender de ellas_

---

## Qué deliberadamente NO está en el Núcleo RCOS

Estos pertenecen a **módulos opcionales**, no al núcleo:

- Diseño de permacultura
- Filosofía educativa
- Prácticas espirituales o culturales
- Ideología política
- Elecciones estéticas o de estilo de vida

El núcleo gobierna cómo se toman las decisiones, no qué decisiones deben tomarse.

---

## Invariantes (se aplican a todas las Capas)

### Lo explícito supera a lo implícito

Si no está escrito, acordado y versionado, **no existe**.

### Por qué esto importa

Las invariantes de Capa aseguran que ninguna cantidad de buena voluntad, carisma, urgencia o consenso pueda erosionar silenciosamente el sistema.

---

## La regla de explicitud de RCOS (principio fundamental)

**Todo lo que asigne poder, riesgo, responsabilidad o condiciones de salida DEBE ser explícito.**

Todo lo que exprese preferencia, estilo u optimización local PUEDE ser opcional.

### Explícito vs opcional por Capa

Usamos tres categorías:

- **DEBE ser explícito** → requerido para el cumplimiento de RCOS
- **PUEDE ser explícito** → recomendado pero dependiente del contexto
- **DEBE permanecer opcional** → nunca impuesto por el núcleo

### Invariante transversal sobre la explicitud

**Si algo puede:**

- Eliminar los derechos de alguien
- Vincular el tiempo o trabajo de alguien
- Controlar recursos compartidos
- Silenciar la disidencia
- Impedir la salida

**Entonces DEBE ser explícito, documentado y revisable.**

Sin excepciones.

Este enfoque asegura que:

- RCOS **no** se vuelva burocrático
- Las comunidades conserven su libertad cultural
- Solo el _riesgo estructural_ sea regulado
- Los módulos opcionales sigan siendo poderosos, no restringidos

---

## Diseño dirigido por pruebas de estrés

RCOS se valida no por intención sino por **resistencia al fallo**.

La especificación incluye un conjunto creciente de **pruebas de estrés** derivadas de colapsos reales de comunidades, tales como:

- dominancia en reuniones
- poder de veto del fundador
- privatización de los comunes
- culturas de evitación del conflicto
- autoridad espiritual carismática
- elusión de reglas en emergencias

Una comunidad se considera alineada con RCOS solo si puede **resistir estos escenarios sin soluciones informales**.

Casi todos los fracasos ocurren porque:

**Se permitió que algo poderoso permaneciera implícito.**

RCOS transforma:

- Poder implícito → roles explícitos
- Valores implícitos → reglas acotadas
- Castigo implícito → debido proceso
- Propiedad implícita → derechos declarados

### Modos de fallo conocidos que RCOS está diseñado para prevenir

Ver [Pruebas de estrés de RCOS](https://blueprint.ecohubs.community/es/articles/rcos-stress-tests?id=6acbe9a7)

## Implementaciones de referencia

RCOS fomenta pequeñas **comunidades de referencia** del mundo real que:

- implementan las capas del núcleo explícitamente,
- documentan desviaciones y fracasos,
- y publican los aprendizajes de vuelta al estándar.

El objetivo no es la perfección, sino la **evolución a través de la transparencia**.

---

## Por qué "Regenerativo"

RCOS usa el término _regenerativo_ deliberadamente.

Un sistema regenerativo:

- no depende del crecimiento constante,
- no agota a sus miembros,
- repara el daño en lugar de ocultarlo,
- y se fortalece al integrar el fracaso.

RCOS está diseñado para que **el estrés produzca aprendizaje**, no colapso.

---

## Para quién es RCOS

RCOS está dirigido a:

- comunidades intencionales,
- ecoaldeas y proyectos de covivienda,
- cooperativas y organizaciones basadas en los comunes,
- experimentos de vida colectiva a largo plazo,
- y cualquier grupo que quiera sobrevivir a su propio éxito.

RCOS es especialmente útil para grupos que ya comparten valores fuertes — y quieren asegurarse de que esos valores no se conviertan en herramientas de coerción.

---

## Cómo usar RCOS

RCOS puede usarse como:

- un **plano de diseño** antes de fundar una comunidad,
- un **marco de auditoría** para grupos existentes,
- una **herramienta de prueba de estrés** durante conflictos,
- o un **lenguaje compartido** para conversaciones estructurales difíciles.

La adopción puede ser incremental. El cumplimiento puede ser parcial. Lo que importa es **la explicitud, no la pureza**.

---

## La afirmación central

> Las comunidades no fracasan porque las personas sean imperfectas.
> Fracasan porque los sistemas son vagos.

RCOS existe para reemplazar la vaguedad con estructura —
para que el cuidado, la autonomía y la regeneración tengan algo sólido sobre lo cual sostenerse.

---

## Registro de cambios

- [v0.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1?id=e6de7a5d) — Versión inicial


---

# 0. Introducción

## 0.1 Propósito de RCOS

Define un sistema operativo estandarizado y modular para comunidades pequeñas e intencionales, centrado en la resiliencia, la equidad y la regeneración.

## 0.2 Alcance del núcleo

Esta especificación define las **capas centrales obligatorias** requeridas para el cumplimiento de RCOS. Las prácticas específicas de dominio quedan excluidas y se abordan mediante módulos opcionales.

## 0.3 Principios de diseño

- Basado en restricciones, no en valores
- Precompromiso por encima de la improvisación
- Modular por defecto
- A escala humana
- Tolerante a fallos

## 0.4 Definiciones y terminología

- Comunidad
- Miembro
- Rol
- Dominio
- Bienes comunes
- Invariante
- Tipo de decisión
- Cumplimiento


---

# 1. Modelo de Conformidad RCOS

## 1.1 Niveles de conformidad

- Conforme con RCOS-Core
- RCOS-Core + módulos (no normativo)

## 1.2 Requisito de explicitud

Cualquier mecanismo que afecte al poder, los recursos, las obligaciones o la salida `DEBE` ser explícito, estar documentado y ser verificable.

## 1.3 Meta-invariante

Si no está escrito y adoptado, no existe.


---

# 2. Capa 0 — Identidad y Alcance

La Capa 0 define la identidad constitucional de la comunidad. Establece lo que la comunidad *es*, lo que *no es*, y las restricciones innegociables bajo las cuales operan todas las demás capas. Ninguna regla, decisión o práctica en capas superiores puede contradecir la Capa 0.

## 2.1 Definición de Propósito

2.1.1 Una comunidad DEBE definir exactamente un propósito primario.

2.1.2 El propósito primario DEBE describir la razón perdurable de la existencia de la comunidad y NO DEBE ser un objetivo, proyecto o estrategia a corto plazo.

2.1.3 El propósito primario DEBE ser estable a lo largo del tiempo y solo DEBE ser modificado mediante una decisión constitucional tal como se define en la Capa 2 y ejecutada a través del proceso de cambio definido en la Capa 6.

2.1.4 Se PUEDEN definir propósitos secundarios, pero NO DEBEN entrar en conflicto con el propósito primario ni anularlo.

2.1.5 Ninguna acción, decisión o asignación de recursos PUEDE contradecir materialmente el propósito primario declarado.

## 2.2 Declaración de Alcance

2.2.1 La comunidad DEBE declarar explícitamente el alcance de lo que gobierna.

2.2.2 La declaración de alcance DEBE incluir, como mínimo:
- Activos gobernados por la comunidad
- Dominios de autoridad en la toma de decisiones
- Actividades y responsabilidades bajo control colectivo

2.2.3 La declaración de alcance DEBE listar explícitamente lo que queda fuera de alcance.

2.2.4 Todo lo que no esté explícitamente declarado como dentro del alcance DEBE tratarse como fuera de alcance.

2.2.5 La comunidad NO DEBE ejercer autoridad sobre personas, activos o dominios que estén declarados fuera de alcance.

## 2.3 Invariantes

2.3.1 Las invariantes son restricciones que definen lo que NO DEBE ser violado mientras estén vigentes.

2.3.2 Las invariantes DEBEN estar explícitamente listadas y documentadas.

2.3.3 Las invariantes DEBEN aplicarse a todas las capas de RCOS.

2.3.4 Ninguna decisión, rol, proceso o medida de emergencia PUEDE anular una invariante.

2.3.5 Si surge un conflicto entre una invariante y cualquier otra regla, la invariante DEBE prevalecer.

2.3.6 Las invariantes solo PUEDEN ser modificadas o eliminadas mediante un proceso de cambio constitucional tal como se define en la Capa 2 y la Capa 6.

## 2.4 Restricciones de Identidad

2.4.1 La comunidad DEBE declarar cualquier restricción a nivel de identidad que afecte materialmente la participación, el comportamiento o la gobernanza.

2.4.2 Las restricciones de identidad PUEDEN incluir, entre otras:
- Límites éticos o de comportamiento
- Requisitos previos de participación
- Restricciones culturales o ecológicas innegociables

2.4.3 Las restricciones de identidad DEBEN ser verificables y aplicables mediante procesos definidos.

2.4.4 Las restricciones de identidad NO DEBEN aplicarse de manera implícita o informal.

## 2.5 Artefactos

2.5.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 0:
- Carta de Propósito
- Declaración de Alcance
- Registro de Invariantes
- Registro de Restricciones de Identidad

2.5.2 Los artefactos de la Capa 0 DEBEN:
- Ser accesibles públicamente para todos los miembros
- Estar versionados
- Ser adoptados mediante un proceso formal de ratificación

2.5.3 Si los artefactos de la Capa 0 están ausentes, son ambiguos o internamente contradictorios, la comunidad DEBE considerarse no conforme con RCOS-Core.


---

# 3. Capa 1 — Sistema de Membresía

La Capa 1 define cómo las personas ingresan, participan y salen de la comunidad. Establece la relación explícita entre el individuo y el colectivo, incluyendo derechos, obligaciones y el debido proceso. Ninguna persona puede ser tratada como miembro sin haber pasado por los mecanismos definidos en esta capa.

## 3.1 Estados de Membresía

3.1.1 La comunidad DEBE definir estados de membresía explícitos.

3.1.2 Como mínimo, DEBEN existir los siguientes estados de membresía:
- Solicitante
- Miembro en Prueba / Periodo Probatorio
- Miembro Pleno
- Miembro Retirado

3.1.3 Cada estado de membresía DEBE tener derechos, obligaciones y limitaciones claramente definidos.

3.1.4 Ningún individuo PUEDE ostentar múltiples estados de membresía simultáneamente.

3.1.5 No se PUEDE asumir ningún derecho u obligación fuera del estado de membresía actual del individuo.

## 3.2 Ingreso e Incorporación

3.2.1 El ingreso a la comunidad DEBE seguir un proceso de incorporación explícito.

3.2.2 El proceso de incorporación DEBE incluir:
- Revisión de todos los artefactos de RCOS-Core
- Consentimiento explícito a las reglas de la Capa 0 y la Capa 1
- Declaración del estado de membresía inicial

3.2.3 Los criterios de admisión DEBEN ser explícitos y estar documentados.

3.2.4 La membresía informal, implícita o retroactiva NO DEBE ser permitida.

## 3.3 Periodo de Prueba y Evaluación

3.3.1 La comunidad DEBE definir un periodo probatorio para los nuevos miembros.

3.3.2 El periodo probatorio DEBE tener:
- Una duración definida
- Criterios de evaluación explícitos
- Un proceso de decisión de transición claro

3.3.3 Durante el periodo de prueba, los derechos PUEDEN ser limitados, pero las obligaciones DEBEN ser explícitas.

3.3.4 La falta de transición desde el periodo de prueba DEBE activar un proceso definido de salida o extensión.

## 3.4 Derechos y Obligaciones

3.4.1 La comunidad DEBE definir explícitamente los derechos de los miembros.

3.4.2 La comunidad DEBE definir explícitamente las obligaciones de los miembros.

3.4.3 Los derechos y obligaciones DEBEN ser simétricos y proporcionales al estado de membresía.

3.4.4 Ninguna obligación PUEDE ser exigida sin un derecho correspondiente y documentado.

3.4.5 Las obligaciones NO DEBEN ser indefinidas o carecer de definición.

## 3.5 Participación y Contribución

3.5.1 Las expectativas de participación DEBEN estar definidas explícitamente.

3.5.2 Las formas aceptables de contribución DEBEN estar enumeradas.

3.5.3 La sustitución de participación (p. ej., externalización de trabajo) DEBE estar gobernada explícitamente.

3.5.4 La falta persistente de participación DEBE activar un proceso de rendición de cuentas según lo definido en la Capa 4.

## 3.6 Salida y Separación

3.6.1 La salida voluntaria DEBE ser posible en todo momento.

3.6.2 Los procedimientos de salida DEBEN ser explícitos, documentados y no punitivos.

3.6.3 La salida forzosa DEBE seguir el debido proceso y gestionarse a través de los mecanismos de la Capa 4.

3.6.4 La salida NO DEBE resultar en la pérdida de derechos más allá de aquellos explícitamente vinculados a la membresía.

3.6.5 La separación de activos, roles y responsabilidades DEBE estar definida antes de la salida.

## 3.7 Suspensión y Estado Temporal

3.7.1 La comunidad PUEDE definir estados de suspensión temporal.

3.7.2 Las condiciones de suspensión DEBEN ser explícitas, limitadas en el tiempo y revisables.

3.7.3 La suspensión NO DEBE utilizarse como sustituto indefinido o punitivo de la salida.

## 3.8 Artefactos

3.8.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 1:
- Acuerdo de Membresía
- Protocolo de Incorporación
- Protocolo de Salida y Separación
- Registro de Estados de Membresía

3.8.2 Los artefactos de la Capa 1 DEBEN ser:
- Explícitos e inequívocos
- Versionados
- Accesibles para todos los miembros

3.8.3 La ausencia, ambigüedad o violación sistemática de los artefactos de la Capa 1 DEBE resultar en la pérdida del cumplimiento con RCOS-Core.


---

# 4. Capa 2 — Gobernanza y lógica de decisión

La Capa 2 define cómo se toman las decisiones colectivas, quién está autorizado para tomarlas y cómo se limita la autoridad. La gobernanza bajo RCOS está diseñada para hacer que el poder sea explícito, acotado, revisable y reversible.

## 4.1 Tipos de decisión

4.1.1 Todas las decisiones colectivas DEBEN clasificarse en exactamente uno de los siguientes tipos de decisión:
- Decisiones operativas
- Decisiones estratégicas
- Decisiones constitucionales

4.1.2 Las decisiones operativas se refieren al funcionamiento y la ejecución del día a día dentro de las reglas existentes.

4.1.3 Las decisiones estratégicas se refieren a la dirección a largo plazo, la asignación de recursos significativos o la creación/eliminación de estructuras importantes.

4.1.4 Las decisiones constitucionales se refieren a cambios en los invariantes de la Capa 0, el propósito, el alcance o el propio sistema de gobernanza.

4.1.5 Si una decisión no puede clasificarse claramente, DEBE tratarse por defecto como el tipo de decisión de mayor impacto.

## 4.2 Mecanismos de decisión

4.2.1 Cada tipo de decisión DEBE tener un mecanismo de toma de decisiones definido de forma explícita.

4.2.2 Los mecanismos de decisión PUEDEN incluir, entre otros:
- Toma de decisiones basada en consentimiento
- Votación por mayoría
- Votación por supermayoría
- Autoridad delegada
- Asignación aleatoria o rotativa

4.2.3 Los mecanismos de decisión DEBEN especificar:
- Participantes elegibles
- Umbrales de decisión
- Condiciones de bloqueo o veto, si las hubiera
- Restricciones de tiempo

4.2.4 Ningún mecanismo de decisión informal o ad hoc PUEDE utilizarse para decisiones colectivas.

## 4.3 Límites de autoridad

4.3.1 Toda autoridad DEBE asignarse a roles, círculos u órganos definidos de forma explícita.

4.3.2 Las asignaciones de autoridad DEBEN incluir:
- Alcance de la autoridad
- Límites de la autoridad
- Duración o mandato, si corresponde

4.3.3 Ningún individuo u órgano PUEDE ejercer autoridad fuera del alcance que le fue asignado de forma explícita.

4.3.4 La autoridad NO DEBE derivarse del carisma, la antigüedad, la propiedad o la influencia informal.

4.3.5 La autoridad temporal o de emergencia DEBE estar definida de forma explícita, acotada en el tiempo y sujeta a revisión.

## 4.4 Matriz de decisión

4.4.1 La comunidad DEBE mantener una Matriz de decisión como artefacto central de gobernanza.

4.4.2 La Matriz de decisión DEBE mapear, como mínimo:
- Tipo de decisión
- Dominio de decisión
- Rol u órgano autorizado
- Mecanismo de decisión
- Umbral de aprobación
- Vía de escalamiento

4.4.3 La Matriz de decisión DEBE ser accesible públicamente para todos los miembros.

4.4.4 Las decisiones tomadas fuera de la Matriz de decisión DEBEN considerarse inválidas.

## 4.5 Protocolo de gobernanza

4.5.1 La comunidad DEBE definir un Protocolo de gobernanza que describa el ciclo de vida completo de una decisión.

4.5.2 El Protocolo de gobernanza DEBE incluir:
- Requisitos de presentación de propuestas
- Proceso de revisión y deliberación
- Ejecución de la decisión
- Documentación y publicación
- Mecanismos de apelación y revisión

4.5.3 El Protocolo de gobernanza DEBE definir cómo se resuelven los conflictos entre decisiones.

4.5.4 Todas las acciones de gobernanza DEBEN documentarse de acuerdo con las reglas de documentación de la Capa 5.

## 4.6 Salvaguardas y modos de fallo

4.6.1 El sistema de gobernanza DEBE incluir salvaguardas contra:
- Concentración del poder de decisión
- Vetos informales
- Captura de decisiones por subgrupos
- Atrincheramiento de fundadores o roles

4.6.2 Los mecanismos de gobernanza DEBEN permitir la impugnación y revisión sin represalias.

4.6.3 Los fallos persistentes en la gobernanza DEBEN activar un proceso formal de revisión o un proceso constitucional.

## 4.7 Artefactos

4.7.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 2:
- Matriz de decisión
- Protocolo de gobernanza
- Registro de autoridad

4.7.2 Los artefactos de la Capa 2 DEBEN ser:
- Explícitos e inequívocos
- Versionados
- Accesibles para todos los miembros

4.7.3 La ausencia, ambigüedad o violación sistemática de los artefactos de la Capa 2 DEBE resultar en la pérdida de conformidad con RCOS-Core.


---

# 5. Capa 3 — Sistema Económico y de Recursos

La Capa 3 define cómo fluyen el valor, los recursos y las obligaciones dentro de la comunidad.
Su propósito es hacer que el poder económico sea explícito, acotado, auditable y subordinado a la gobernanza, previniendo la acumulación oculta, la dependencia o la coerción.

## 5.1 Recursos comunes vs privados

5.1.1 Todos los recursos dentro del ámbito gobernado declarado DEBEN clasificarse explícitamente como **comunes** o **privados**.

5.1.2 La comunidad DEBE mantener un registro único, explícito y versionado de los recursos gobernados, que incluya como mínimo:
- Nombre o identificador único del recurso
- Clasificación (comunes o privados)
- Administrador/a o propietario/a (según corresponda)
- Reglas de acceso y uso
- Restricciones de transferencia, venta o privatización (si las hay)

5.1.3 Cualquier recurso no clasificado explícitamente DEBE tratarse como **sin clasificar**, y la comunidad NO DEBE asignarlo, gravarlo, monetizarlo ni transferirlo hasta que la clasificación se complete mediante una decisión autorizada.

5.1.4 Para los recursos comunes, la comunidad DEBE definir explícitamente:
- Responsabilidades de administración
- El órgano o rol autorizado para la toma de decisiones
- Obligaciones de mantenimiento
- Mecanismos de financiación o contribución (si los hay)

5.1.5 Para los recursos privados, la comunidad NO DEBE ejercer autoridad más allá de lo explícitamente declarado en el ámbito, los acuerdos de membresía u otros artefactos gobernados.

## 5.2 Reconocimiento de contribuciones

5.2.1 La comunidad DEBE definir explícitamente qué categorías de contribución se reconocen. Estas PUEDEN incluir, entre otras:
- Trabajo
- Cuidados y trabajo emocional
- Conocimiento y educación
- Administración y mantenimiento
- Trabajo administrativo o de coordinación

5.2.2 La comunidad DEBE definir un mecanismo de reconocimiento de contribuciones que especifique:
- Qué califica como contribución
- Cómo se registran o reconocen las contribuciones
- Quién puede registrar, validar o impugnar contribuciones
- Si el reconocimiento de contribuciones afecta al acceso a recursos, privilegios u obligaciones, y de qué manera

5.2.3 La comunidad NO DEBE depender estructuralmente de trabajo no remunerado, invisible o informal para la supervivencia del sistema sin definir explícitamente las obligaciones, el reconocimiento o los mecanismos de compensación correspondientes.

5.2.4 Si se utilizan unidades económicas internas (p. ej., créditos de tiempo, puntos, tokens), el Protocolo de Economía Interna DEBE definir:
- Reglas de emisión
- Reglas de transferibilidad
- Mecanismos de expiración, decaimiento o límite máximo (si los hay)
- Mecanismos de prevención de fraude, resolución de disputas y corrección
- Reglas de privacidad y transparencia para saldos y transacciones

5.2.5 El reconocimiento de contribuciones NO DEBE crear autoridad implícita de decisión, poder de veto o influencia en la gobernanza más allá de lo definido en la Capa 2.

## 5.3 Gestión de tesorería

5.3.1 La comunidad DEBE definir explícitamente qué recursos se mantienen en la tesorería compartida y cómo se articulan los límites de la tesorería con los recursos privados.

5.3.2 Las fuentes de ingresos y cualquier interfaz de ingresos externos DEBEN definirse explícitamente.

5.3.3 La autoridad de gasto DEBE estar explícitamente acotada mediante:
- Asignaciones claras de autoridad
- Umbrales por monto y/o categoría
- Vías de aprobación y escalamiento
- Requisitos obligatorios de registro

5.3.4 La transparencia DEBE ser la norma por defecto para los saldos de tesorería, los ingresos, los egresos, las obligaciones y los compromisos.

5.3.5 Cualquier excepción a la transparencia DEBE estar explícitamente definida, justificada, acotada en el tiempo y NO DEBE impedir que los miembros auditen el cumplimiento.

5.3.6 La comunidad DEBE definir políticas de reservas, riesgos y responsabilidades, que incluyan:
- Límites de endeudamiento
- Obligaciones a largo plazo
- Reservas de contingencia (si las hay)

## 5.4 Restricciones de acumulación

5.4.1 Los sistemas económicos internos DEBEN prevenir la concentración ilimitada de influencia o control interno a través de recursos, créditos u obligaciones financieras.

5.4.2 Si existen unidades internas, la comunidad DEBE definir uno o más mecanismos de limitación de acumulación, que PUEDEN incluir:
- Límites máximos
- Decaimiento o expiración
- No transferibilidad
- Mecanismos de redistribución o tributación
- Validez acotada en el tiempo

5.4.3 Los mecanismos económicos NO DEBEN permitir que los miembros eludan los límites de autoridad de gobernanza definidos en la Capa 2, incluyendo mediante la compra de influencia, la creación de dependencia o la conversión de poder económico en autoridad informal de decisión.

5.4.4 La comunidad DEBE definir indicadores auditables de riesgo de concentración económica y un mecanismo explícito para ajustar las restricciones cuando se detecten dichos riesgos.

## 5.5 Artefactos

5.5.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 3:
- Protocolo de Economía Interna
- Reglamento de Tesorería

5.5.2 Los artefactos de la Capa 3 DEBEN ser:
- Explícitos e inequívocos
- Versionados
- Accesibles para todos los miembros (con excepciones explícitas y acotadas)
- Adoptados mediante un proceso de gobernanza autorizado

5.5.3 El Protocolo de Economía Interna DEBE definir, como mínimo:
- Categorías de contribución y mecanismos de reconocimiento
- Límites y reglas de asignación entre recursos comunes y privados
- Unidades internas (si las hay) y restricciones de acumulación
- Interfaces de ingresos externos (si las hay)
- Mecanismos de resolución de disputas y corrección de registros económicos

5.5.4 El Reglamento de Tesorería DEBE definir, como mínimo:
- Fuentes de ingresos
- Umbrales de autoridad de gasto y vías de aprobación
- Requisitos de transparencia y rendición de cuentas (incluyendo excepciones acotadas)
- Restricciones de reservas, riesgos y endeudamiento
- Reglas de conflicto de intereses para gastos y adquisiciones

## 5.6 Invariantes de capa

5.6.1 Los recursos compartidos, los flujos y las obligaciones DEBEN ser visibles para la comunidad por defecto, con excepciones únicamente limitadas y explícitas.

5.6.2 Los recursos declarados como comunes NO DEBEN privatizarse mediante acciones informales, implícitas o unilaterales.

5.6.3 El reconocimiento de contribuciones DEBE ser explícito, de modo que el trabajo no remunerado o invisible no sea estructuralmente necesario para la supervivencia del sistema.

5.6.4 Los mecanismos económicos DEBEN prevenir la concentración indefinida de influencia interna.

## 5.7 Reglas de explicitud

5.7.1 Lo siguiente DEBE ser explícito:
- Clasificaciones de recursos comunes vs privados
- Reglas de asignación y acceso para recursos compartidos
- Límites de autoridad de gasto
- Reglas de transparencia
- Interfaces de ingresos externos

5.7.2 Lo siguiente PUEDE ser explícito:
- Modelos de valoración de contribuciones
- Unidades internas (tokens, horas, puntos)
- Categorías presupuestarias y estructuras de contabilidad interna

5.7.3 Lo siguiente DEBE permanecer opcional y fuera del ámbito:
- Actitudes hacia la riqueza
- Resultados igualitarios vs diferenciados
- Decisiones financieras personales


---

# 6. Capa 4 — Conflicto, Reparación y Rendición de Cuentas

La Capa 4 define cómo responde la comunidad cuando la confianza, la coordinación o la seguridad se quiebran.  
Su propósito es garantizar que los conflictos se manejen de forma explícita, justa y segura, al tiempo que se previene el abuso de poder, la normalización del daño o la exclusión silenciosa.

## 6.1 Clasificación de conflictos

6.1.1 La comunidad DEBE definir un sistema explícito de clasificación de conflictos que sea conocido, accesible y utilizable por todos los miembros.

6.1.2 Como mínimo, el sistema de clasificación DEBE incluir las siguientes clases:
- Conflictos interpersonales (entre individuos)
- Conflictos de rol (disputas de autoridad, responsabilidad o mandato)
- Conflictos estructurales (incentivos sistémicos, reglas o problemas de asignación de recursos)
- Violaciones éticas o de límites (violaciones de normas declaradas, alcance o límites de seguridad)

6.1.3 Cada clase de conflicto DEBE definir explícitamente:
- Criterios de entrada (cómo se clasifica una situación en esta clase)
- Prioridad de respuesta esperada y plazos (si los hay)
- Vías de resolución permitidas y requeridas
- Requisitos de documentación y límites de privacidad

6.1.4 Los conflictos que impliquen riesgos creíbles para la seguridad, coerción, abuso o amenazas DEBEN clasificarse como **críticos para la seguridad** y DEBEN activar salvaguardas elevadas según lo definido en la Sección 6.3.

6.1.5 La clasificación errónea o la evasión de la clasificación DEBE tratarse como un fallo de proceso sujeto a revisión.

## 6.2 Vías de resolución

6.2.1 La comunidad DEBE definir un proceso mínimo de resolución de conflictos aplicable a todas las clases de conflicto.

6.2.2 El proceso de resolución DEBE incluir una **escalera de resolución** claramente definida con pasos de escalamiento explícitos.

6.2.3 La escalera de resolución DEBE definir, como mínimo:
- Cómo se plantea, registra y reconoce un conflicto
- Cómo se notifica a las partes involucradas y se las invita a participar
- Cómo se manejan la negativa, la falta de respuesta o la retirada
- Cómo se seleccionan, reemplazan o recusan los mediadores o facilitadores
- Expectativas con plazos definidos para cada etapa (cuando corresponda)
- Requisitos de documentación y reglas de acceso
- Un proceso para revisar fallos procedimentales o puntos muertos

6.2.4 El proceso de resolución DEBE ser accesible sin requerir estatus social, antigüedad, carisma o proximidad informal a los tomadores de decisiones.

6.2.5 Los conflictos no resueltos DEBEN escalar a través de las vías de gobernanza definidas sin eludir la Matriz de Decisión definida en la Capa 2.

## 6.3 Salvaguardas

6.3.1 La comunidad DEBE definir salvaguardas explícitas para conflictos que involucren asimetrías de poder, relaciones de dependencia o riesgos de seguridad.

6.3.2 Las salvaguardas DEBEN incluir protecciones contra represalias por:
- Plantear una preocupación
- Solicitar mediación
- Proporcionar testimonio o evidencia
- Participar en una revisión o apelación

6.3.3 Cuando exista un diferencial de poder entre las partes, DEBEN aplicarse salvaguardas elevadas, que PUEDEN incluir:
- Facilitación independiente o externa
- Canales separados de recepción, documentación o comunicación
- Suspensión o limitación temporal de la autoridad del rol
- Umbrales adicionales de evidencia y revisión previos a las sanciones

6.3.4 Para conflictos críticos para la seguridad, la comunidad DEBE definir acciones protectoras inmediatas que puedan tomarse antes de completar el proceso completo, que PUEDEN incluir:
- Medidas de separación temporal
- Acceso restringido a espacios o recursos compartidos
- Suspensión temporal del rol
- Plazos de escalamiento de emergencia

6.3.5 Las salvaguardas de seguridad DEBEN prevalecer sobre los derechos de participación, la continuidad del rol y la conveniencia operativa.

## 6.4 Sanciones, reparación y separación

6.4.1 La comunidad DEBE definir un marco explícito de sanciones y reparación.

6.4.2 Las sanciones y acciones de reparación DEBEN ser:
- Proporcionales a la infracción
- Explícitamente documentadas
- Con plazo definido cuando corresponda
- Revisables y apelables

6.4.3 El marco DEBE definir, como mínimo:
- Tipos de sanciones y reparaciones disponibles
- Precondiciones y estándares de evidencia
- Roles u órganos autorizados para su aplicación
- Mecanismos de revisión y apelación
- Condiciones para la restauración de derechos, roles o participación

6.4.4 Las acciones de separación, suspensión o remoción DEBEN seguir el debido proceso y DEBEN estar alineadas con las reglas de salida y separación definidas en la Capa 1.

6.4.5 Las sanciones NO DEBEN aplicarse mediante exclusión informal, presión social, silencio o retiro implícito de derechos.

6.4.6 Las acciones orientadas a la reparación DEBEN priorizarse sobre las acciones punitivas, excepto en casos críticos para la seguridad.

## 6.5 Artefactos

6.5.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 4:
- Escalera de Resolución de Conflictos
- Protocolo de Rendición de Cuentas

6.5.2 Los artefactos de la Capa 4 DEBEN ser:
- Explícitos e inequívocos
- Versionados
- Accesibles para todos los miembros, con protecciones de privacidad claramente delimitadas
- Adoptados mediante un proceso de gobernanza autorizado

6.5.3 La Escalera de Resolución de Conflictos DEBE definir, como mínimo:
- Entradas de clasificación de conflictos y umbrales de escalamiento
- Etapas de resolución y reglas de selección de facilitadores
- Límites de documentación y acceso a la información
- Excepciones críticas para la seguridad y salvaguardas inmediatas

6.5.4 El Protocolo de Rendición de Cuentas DEBE definir, como mínimo:
- Mecanismos de investigación, revisión y decisión
- Garantías de debido proceso y protecciones contra represalias
- Opciones de sanción y reparación con reglas de proporcionalidad
- Apelaciones, supervisión y vías de escalamiento
- Coordinación con los procesos de salida y separación de la Capa 1

## 6.6 Invariantes de la capa

6.6.1 El conflicto DEBE tratarse como una condición gestionada con vías definidas; ignorar, suprimir o normalizar un conflicto no resuelto DEBE considerarse una violación del sistema.

6.6.2 Los conflictos que involucren asimetrías de poder DEBEN activar salvaguardas elevadas.

6.6.3 La reparación y la restauración DEBEN preceder al castigo, excepto cuando la seguridad inmediata esté en riesgo.

6.6.4 La seguridad física, psicológica y de menores DEBE prevalecer sobre los derechos de participación, la continuidad del rol y las consideraciones de reputación.

## 6.7 Reglas de explicitud

6.7.1 Lo siguiente DEBE ser explícito:
- Sistema de clasificación de conflictos
- Proceso mínimo de resolución y escalamiento
- Salvaguardas y protecciones contra represalias
- Umbrales de sanción, reparación y separación

6.7.2 Lo siguiente PUEDE ser explícito:
- Estilos o metodologías de mediación
- Preferencias de selección de facilitadores más allá de las salvaguardas mínimas
- Prácticas restaurativas o reparativas

6.7.3 Lo siguiente DEBE permanecer opcional y fuera de alcance:
- Normas de expresión emocional
- Encuadre terapéutico, espiritual o ideológico del conflicto


---

# 7. Capa 5 — Operaciones y Coordinación

La Capa 5 define cómo funcionan en la práctica el trabajo diario, la coordinación y el flujo de información.
Su propósito es asegurar que las operaciones se mantengan legibles, sostenibles y transferibles, y que no colapsen en jerarquías informales, dependencia o agotamiento.

## 7.1 Roles y Responsabilidades

7.1.1 Todas las responsabilidades continuas DEBEN asignarse a roles explícitos y con nombre, en lugar de expectativas implícitas o acuerdos informales.

7.1.2 La comunidad DEBE mantener un **Registro de Roles** que incluya, como mínimo:
- Nombre y propósito del rol
- Alcance de la responsabilidad y autoridad de decisión
- Límites explícitos e interfaces con otros roles, círculos o dominios
- Criterios de elegibilidad (si los hay)
- Duración del mandato, rotación o condiciones de revisión (si las hay)
- Proceso de designación, revisión y remoción

7.1.3 Cada rol DEBE incluir un mecanismo explícito de rendición de cuentas que defina:
- Cómo se revisa el desempeño del rol
- Cómo se gestiona el bajo rendimiento, la sobrecarga o el fallo del rol
- Cómo se realizan los traspasos y la transferencia de conocimiento

7.1.4 Ninguna responsabilidad continua PUEDE existir sin un rol explícito, y ninguna persona PUEDE ser responsabilizada por obligaciones que no estén formalmente asignadas a un rol.

7.1.5 Las responsabilidades temporales o ad-hoc DEBEN estar explícitamente acotadas en el tiempo y NO DEBEN convertirse en continuas sin una definición formal de rol.

## 7.2 Sistema de Reuniones

7.2.1 La comunidad DEBE definir tipos de reuniones explícitos suficientes para dar soporte a:
- Operaciones
- Gobernanza
- Coordinación y alineación
- Reflexión y aprendizaje
- Gestión de conflictos (según lo requerido por la Capa 4)

7.2.2 Cada tipo de reunión DEBE definir, como mínimo:
- Propósito y alcance de decisión
- Participantes obligatorios vs opcionales
- Cadencia y límites de duración
- Rol de facilitación y proceso de selección o rotación
- Estructura de la agenda
- Requisitos de documentación y publicación
- Requisitos de captura de decisiones cuando se toman decisiones

7.2.3 Las reuniones NO DEBEN exceder su alcance de decisión declarado ni eludir los límites de autoridad definidos en la Capa 2.

7.2.4 La carga de reuniones DEBE estar acotada, monitoreada y ser revisable según lo definido en la Sección 7.4.

## 7.3 Documentación y Flujo de Información

7.3.1 La comunidad DEBE definir reglas explícitas de documentación para decisiones, roles, operaciones y obligaciones compartidas.

7.3.2 Las reglas de documentación DEBEN especificar, como mínimo:
- Qué información DEBE registrarse
- Dónde se almacenan los registros
- Quién tiene acceso a qué registros
- Plazos de publicación o notificación (si los hay)
- Límites de privacidad y condiciones para el acceso restringido

7.3.3 Todas las decisiones DEBEN ser trazables hasta:
- Tipo y dominio de la decisión
- Rol o cuerpo autorizado
- Mecanismo de decisión y umbral
- Resultado registrado y fecha de entrada en vigor

7.3.4 Los procesos operativos críticos DEBEN estar documentados de modo que la continuidad no dependa de conocimiento tácito de personas específicas.

7.3.5 El flujo de información DEBE diseñarse para prevenir el control de acceso indebido, los cuellos de botella o la dependencia de intermediarios informales.

## 7.4 Límites de Carga de Trabajo y Capacidad

7.4.1 El tiempo, la atención, la capacidad de coordinación y el trabajo emocional DEBEN tratarse como recursos finitos y limitados.

7.4.2 La comunidad DEBE definir límites explícitos de carga de trabajo, incluyendo:
- Límites a la carga de reuniones (frecuencia, duración o tiempo total)
- Límites a la carga de roles (número de roles, alcance u horas esperadas)
- Expectativas de tiempos de respuesta y disponibilidad (si las hay)
- Mecanismos de renegociación, alivio, sustitución o redistribución

7.4.3 Los límites de carga de trabajo DEBEN ser revisables y ajustables mediante un proceso de gobernanza autorizado.

7.4.4 La sobrecarga persistente, el riesgo de agotamiento, la no-participación crónica o la dependencia de personas que funcionan en exceso DEBEN activar procesos de revisión o reparación según lo definido en la Capa 4.

## 7.5 Continuidad Operativa

7.5.1 La comunidad DEBE asegurar que ningún individuo sea un punto único de fallo crítico para las operaciones esenciales.

7.5.2 Los roles y procesos operativos esenciales DEBEN incluir:
- Procedimientos documentados
- Mecanismos claros de traspaso
- Acuerdos de respaldo o redundancia cuando sea factible

7.5.3 La planificación de continuidad operativa DEBE revisarse periódicamente.

## 7.6 Artefactos

7.6.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 5:
- Manual de Operaciones
- Registro de Roles
- Plantillas de Reuniones

7.6.2 Los artefactos de la Capa 5 DEBEN ser:
- Explícitos e inequívocos
- Versionados
- Accesibles para todos los miembros, con protecciones de privacidad claramente delimitadas
- Mantenidos como documentos vivos con propiedad definida y ciclos de revisión

7.6.3 El Manual de Operaciones DEBE definir, como mínimo:
- Procesos operativos esenciales de los que depende la comunidad
- Interfaces entre roles, dominios y tipos de reuniones
- Ubicaciones de la documentación y procedimientos de actualización

7.6.4 Las Plantillas de Reuniones DEBEN definir, como mínimo:
- Estructura de la agenda
- Formato de notas y actas
- Formato de captura de decisiones cuando corresponda

## 7.7 Invariantes de Capa

7.7.1 Las responsabilidades continuas NO DEBEN existir sin un rol explícito.

7.7.2 Los procesos operativos críticos NO DEBEN depender exclusivamente de la memoria individual, la buena voluntad o la transmisión informal.

7.7.3 La carga de reuniones, la carga de coordinación y el trabajo no remunerado o invisible DEBEN estar acotados y ser revisables.

7.7.4 Las reglas de acceso a la información DEBEN ser explícitas y aplicables.

## 7.8 Reglas de Explicitud

7.8.1 Lo siguiente DEBE ser explícito:
- Roles y responsabilidades
- Límites e interfaces de autoridad operativa
- Tipos y alcances de reuniones
- Reglas de documentación de decisiones
- Límites de acceso a la información y privacidad

7.8.2 Lo siguiente PUEDE ser explícito:
- Cadencia detallada de reuniones más allá de las restricciones mínimas
- Elección de herramientas para documentación y coordinación
- Calendarios de rotación o sucesión de roles

7.8.3 Lo siguiente DEBE permanecer opcional y fuera de alcance:
- Estilos de trabajo personales
- Preferencias estéticas o culturales
- Coordinación social informal


---

# 8. Capa 6 — Evolución y Adaptación

La Capa 6 define cómo evoluciona el sistema sin colapsar.  
Su propósito es asegurar que el cambio sea deliberado, acotado, reversible cuando corresponda, y que produzca aprendizajes en lugar de daños ocultos. La evolución bajo RCOS se trata como un proceso gobernado, no como improvisación.

## 8.1 Mecanismos de cambio

8.1.1 La comunidad DEBE definir mecanismos de cambio explícitos para modificar, agregar, suspender o eliminar reglas, roles, artefactos o estructuras de decisión.

8.1.2 Los mecanismos de cambio DEBEN distinguir explícitamente entre:
- Cambios permanentes de reglas  
- Experimentos con duración acotada según lo definido en la Sección 8.3  

8.1.3 Cada cambio propuesto DEBE especificar, como mínimo:
- El/los artefacto(s), capa(s) y sección(es) afectados  
- El tipo de decisión y la vía de decisión autorizada según lo definido en la Capa 2  
- El efecto previsto, el alcance y los riesgos conocidos  
- La fecha de entrada en vigor y cualquier período de transición  
- Los requisitos de migración para roles, acuerdos o registros existentes  

8.1.4 Los cambios que afecten el propósito, alcance, invariantes o restricciones de identidad de la Capa 0 DEBEN clasificarse como cambios constitucionales y DEBEN seguir el mecanismo de decisión constitucional.

8.1.5 La comunidad DEBE definir mecanismos de revisión explícitos para los cambios adoptados, incluyendo cómo se evalúan, revisan o revierten los cambios cuando producen daño, inestabilidad o concentración no intencionada de poder.

## 8.2 Versionado y autoridad

8.2.1 Todos los cambios adoptados DEBEN ser versionados y trazables.

8.2.2 La comunidad DEBE mantener un **Historial de Versiones** que registre, como mínimo:
- Identificador de versión  
- Fecha de adopción y fecha de entrada en vigor  
- Referencia al registro de decisión (autoridad, mecanismo, umbral)  
- Resumen de los cambios  
- Notas de migración y restricciones de compatibilidad (si las hay)  

8.2.3 En cualquier momento, la comunidad DEBE poder determinar sin ambigüedad:
- Qué versión está actualmente en vigor  
- Qué artefactos son los autoritativos para el cumplimiento  

8.2.4 Las reglas reemplazadas DEBEN permanecer accesibles para auditoría, aprendizaje y resolución de disputas, junto con las fechas durante las cuales estuvieron en vigor.

8.2.5 Ningún cambio de reglas informal, no documentado o "sobreentendido" PUEDE considerarse válido.

## 8.3 Experimentos

8.3.1 La comunidad PUEDE adoptar experimentos como desviaciones, extensiones o pilotos explícitamente acotados en el tiempo y reversibles, destinados al aprendizaje.

8.3.2 Cada experimento DEBE definir, como mínimo:
- Alcance (qué se cambia y qué explícitamente no se cambia)  
- Duración y puntos de revisión  
- Criterios de éxito y fracaso  
- Condiciones de reversión y proceso de reversión  
- Vía de decisión autorizada para iniciar, extender, modificar o terminar el experimento  

8.3.3 Los experimentos NO DEBEN anular las invariantes de la Capa 0 y NO DEBEN eludir las restricciones de gobernanza definidas en la Capa 2.

8.3.4 Los experimentos DEBEN estar explícitamente etiquetados como experimentales en todos los artefactos afectados y DEBEN incluir una fecha de expiración no prorrogable, a menos que se renueven mediante una decisión autorizada.

8.3.5 Si un experimento introduce riesgo para la seguridad, coerción o daño sostenido, la comunidad DEBE suspender o terminar el experimento inmediatamente mediante una acción protectora, seguida de una revisión posterior.

## 8.4 Captura de aprendizajes y retroalimentación

8.4.1 Los fallos importantes, las adaptaciones, las reversiones y los aprendizajes sistémicos DEBEN ser documentados.

8.4.2 La captura de aprendizajes DEBE incluir, como mínimo:
- Qué ocurrió y por qué fue relevante  
- Qué capas, reglas o artefactos estuvieron implicados  
- Qué se cambió, intentó o detuvo  
- Qué señales, evidencias o umbrales desencadenaron la acción  

8.4.3 Los registros de aprendizaje DEBEN ser accesibles según las reglas de acceso a la información de la Capa 5.

8.4.4 Los patrones de fallo recurrentes DEBEN desencadenar una revisión estructural en lugar de culpa individual.

## 8.5 Seguridad del cambio y reversibilidad

8.5.1 El sistema DEBE preferir cambios reversibles sobre los irreversibles cuando sea posible.

8.5.2 Los cambios irreversibles o de alto impacto DEBEN incluir:
- Períodos extendidos de deliberación o revisión  
- Umbrales de decisión más altos cuando sea apropiado  
- Reconocimiento explícito del riesgo  

8.5.3 Los cambios de emergencia PUEDEN permitirse solo cuando estén explícitamente definidos, DEBEN estar acotados en el tiempo, NO DEBEN anular las invariantes de la Capa 0 y DEBEN someterse a una revisión posterior obligatoria y a ratificación o reversión.

## 8.6 Artefactos

8.6.1 Los siguientes artefactos son obligatorios para el cumplimiento de la Capa 6:
- Protocolo de Cambios  
- Historial de Versiones  
- Registro de Aprendizajes  

8.6.2 Los artefactos de la Capa 6 DEBEN ser:
- Explícitos e inequívocos  
- Versionados  
- Accesibles para todos los miembros, con protecciones de privacidad claramente delimitadas  
- Adoptados mediante un proceso de gobernanza autorizado  

8.6.3 El Protocolo de Cambios DEBE definir, como mínimo:
- Cómo se proponen, revisan, adoptan, publican y rechazan los cambios  
- Cómo se clasifican las propuestas por tipo de decisión  
- El contenido requerido de las propuestas de cambio  
- Las expectativas de transición, migración y deprecación  
- Los mecanismos de revisión, corrección y reversión  
- Las disposiciones para cambios de emergencia, incluyendo límites temporales estrictos y revisión obligatoria  

8.6.4 El Historial de Versiones DEBE definir:
- La estructura autoritativa para los identificadores de versión y los registros de cambios  
- Cómo se retienen y acceden las versiones reemplazadas  
- Cómo se determina la versión actualmente activa  

8.6.5 El Registro de Aprendizajes DEBE definir:
- Qué constituye un evento del que se puede aprender  
- El formato de documentación y la responsabilidad  
- La cadencia de revisión y síntesis  

## 8.7 Invariantes de la capa

8.7.1 El cambio DEBE ser posible pero acotado; ningún cambio PUEDE ser instantáneo, implícito o imposible de revisar.

8.7.2 Todos los cambios adoptados DEBEN ser versionados, documentados y trazables.

8.7.3 Los experimentos DEBEN estar acotados en el tiempo, explícitamente etiquetados y ser reversibles.

8.7.4 Los fallos importantes y las adaptaciones DEBEN capturarse como aprendizaje compartido, no borrarse ni ocultarse.

## 8.8 Reglas de explicitud

8.8.1 Lo siguiente DEBE ser explícito:
- Cómo cambian las reglas y quién decide  
- Los procesos de versionado, autoridad y revisión  
- El alcance, la duración y las condiciones de reversión de los experimentos  
- Las condiciones y límites de los cambios de emergencia  

8.8.2 Lo siguiente PUEDE ser explícito:
- La frecuencia y cadencia de revisión  
- Las cláusulas de caducidad  
- Los métodos de retroalimentación y detección  

8.8.3 Lo siguiente DEBE permanecer opcional y fuera de alcance:
- El ritmo de innovación  
- Las actitudes culturales hacia el riesgo dentro de los límites definidos


---

# 9. Secciones no normativas

Las secciones de este capítulo son **informativas**, no normativas.  
No definen requisitos de cumplimiento, sino que proporcionan orientación, contexto, ejemplos y apoyo al aprendizaje para comunidades, implementadores, auditores y administradores del estándar.

Nada en esta sección puede anular o debilitar los requisitos definidos en las Capas 0–6.

## 9.1 Módulos opcionales

9.1.1 Los Módulos Opcionales son extensiones específicas de dominio que se construyen sobre RCOS-Core sin modificar sus capas obligatorias.

9.1.2 Los Módulos Opcionales DEBEN:
- Declarar qué capas de RCOS extienden o de cuáles dependen  
- Indicar explícitamente cualquier rol, regla o artefacto adicional que introduzcan  
- NO anular ni contradecir los invariantes de la Capa 0 ni los requisitos de RCOS-Core  

9.1.3 Los Módulos Opcionales PUEDEN definir:
- Prácticas específicas de dominio  
- Restricciones o estándares adicionales  
- Patrones especializados de gobernanza u operación  

9.1.4 Los dominios típicos de los Módulos Opcionales PUEDEN incluir, entre otros:
- Permacultura y gestión regenerativa del territorio  
- Sistemas educativos alternativos o comunitarios  
- Prácticas de salud, cuidados y bienestar  
- Prácticas culturales o espirituales  
- Especializaciones económicas (p. ej., cooperativas, fideicomisos de tierras, crédito mutuo)  

9.1.5 La adopción de Módulos Opcionales DEBE seguir los mecanismos de cambio definidos en la Capa 6.

9.1.6 Una comunidad PUEDE ser conforme con RCOS-Core sin adoptar ningún Módulo Opcional.

## 9.2 Implementaciones de referencia

9.2.1 Una Implementación de Referencia es una comunidad real que documenta públicamente cómo aplica RCOS-Core.

9.2.2 Las Implementaciones de Referencia son **descriptivas**, no prescriptivas.  
Ilustran cómo se puede instanciar RCOS, no cómo se debe instanciar.

9.2.3 Una comunidad PUEDE declararse Implementación de Referencia de RCOS solo si:
- Es conforme con RCOS-Core  
- Documenta públicamente sus artefactos de las Capas 0–6  
- Indica claramente las desviaciones, experimentos o extensiones  

9.2.4 La documentación de una Implementación de Referencia DEBERÍA incluir:
- Contexto y escala (tamaño, ubicación, propósito)  
- Qué Módulos Opcionales se han adoptado  
- Desafíos y fracasos conocidos  
- Historial de evolución y adaptaciones principales  

9.2.5 Las Implementaciones de Referencia NO DEBEN ser tratadas como interpretaciones autoritativas del estándar.

## 9.3 Modos de fallo conocidos

9.3.1 Los Modos de Fallo Conocidos documentan patrones de ruptura recurrentes observados en comunidades reales.

9.3.2 Los Modos de Fallo son **señales informativas**, no criterios de cumplimiento.

9.3.3 Los Modos de Fallo PUEDEN incluir, entre otros:
- Acumulación informal de poder  
- Dominación por parte de fundadores o propietarios del terreno  
- Dependencia de trabajo invisible o con sesgo de género  
- Parálisis de gobernanza o sobrecarga de reuniones  
- Bloqueo de salida o coerción sutil  
- Captura económica mediante deuda o control de activos  
- Evasión de conflictos que conduce a la fragmentación silenciosa  

9.3.4 El propósito de documentar los Modos de Fallo es:
- Apoyar las pruebas de estrés de las estructuras RCOS  
- Mejorar las decisiones de diseño  
- Permitir la detección temprana en comunidades activas  

9.3.5 La documentación de Modos de Fallo DEBERÍA hacer referencia a qué capas de RCOS están diseñadas para mitigar el patrón.


---

# 10. Cumplimiento y Auditoría

Este capítulo define cómo se evalúa y mantiene el cumplimiento de RCOS-Core.

## 10.1 Lista de Verificación de Cumplimiento

10.1.1 El cumplimiento de RCOS-Core es binario: una comunidad es conforme o no conforme.

10.1.2 El cumplimiento DEBE evaluarse por capa (Capas 0–6).

10.1.3 Para cada capa, la Lista de Verificación de Cumplimiento DEBE comprobar:
- Presencia de artefactos obligatorios  
- Explicitud y accesibilidad de las reglas requeridas  
- Adopción a través de procesos de gobernanza autorizados  

10.1.4 El cumplimiento parcial o la "intención de cumplir" NO DEBE considerarse conforme.

10.1.5 Los Módulos Opcionales NO DEBEN incluirse en la evaluación de cumplimiento de RCOS-Core.

## 10.2 Casos de Prueba

10.2.1 Los Casos de Prueba son escenarios estructurados que se utilizan para validar si los mecanismos de RCOS funcionan según lo previsto.

10.2.2 Los Casos de Prueba PUEDEN ser:
- Escenarios hipotéticos  
- Fracasos históricos de comunidades  
- Pruebas de estrés simuladas  

10.2.3 Los Casos de Prueba DEBERÍAN cubrir, como mínimo:
- Intentos de concentración de poder  
- Escenarios de salida y separación  
- Bloqueo de gobernanza  
- Intentos de captura económica  
- Conflictos críticos para la seguridad  

10.2.4 Los Casos de Prueba son informativos, pero DEBERÍAN utilizarse durante auditorías, procesos de incorporación y revisiones periódicas.

## 10.3 Incumplimiento

10.3.1 Una comunidad DEBE considerarse no conforme si:
- Falta algún artefacto obligatorio  
- Se violan los invariantes de la Capa 0  
- Las decisiones se toman repetidamente fuera de las estructuras de gobernanza autorizadas  
- La salida está bloqueada o restringida de manera informal  

10.3.2 El incumplimiento DEBE reconocerse explícitamente una vez detectado.

10.3.3 Una comunidad PUEDE recuperar el cumplimiento únicamente mediante:
- Acción correctiva  
- Adopción formal de los artefactos faltantes o corregidos  
- Documentación de la remediación  

10.3.4 Las declaraciones de cumplimiento de RCOS DEBEN retirarse durante los períodos de incumplimiento conocido.


---

# 11. Versionado y gobernanza del estándar

Este capítulo define cómo RCOS evoluciona como estándar.

## 11.1 Custodia del estándar

11.1.1 RCOS DEBE tener un órgano o proceso de custodia identificable.

11.1.2 Las responsabilidades del custodio DEBEN incluir:
- Mantener la especificación canónica  
- Gestionar las publicaciones de versiones  
- Curar materiales de referencia y aprendizaje  
- Proteger los invariantes de Capa 0 del propio estándar  

11.1.3 El custodio NO DEBE actuar como autoridad de cumplimiento sobre las comunidades.

11.1.4 La custodia de RCOS DEBE priorizar la claridad, la estabilidad y los aprendizajes del mundo real por encima de la pureza ideológica.

## 11.2 Proceso de cambio

11.2.1 Los cambios a RCOS-Core DEBEN seguir un proceso de cambio definido.

11.2.2 El proceso de cambio DEBE incluir:
- Presentación de propuestas  
- Período público de revisión y comentarios  
- Mecanismo y autoridad de decisión  
- Versionado y publicación  

11.2.3 La compatibilidad hacia atrás DEBERÍA preservarse cuando sea posible.

11.2.4 Los cambios incompatibles DEBEN estar claramente señalados y justificados.

11.2.5 Las versiones reemplazadas de RCOS DEBEN permanecer accesibles públicamente.

11.2.6 RCOS DEBE modelar los mismos principios que exige a las comunidades: explicitud, autoridad acotada, reversibilidad y aprendizaje.


---

# Apéndice A — Glosario

Este glosario proporciona **definiciones informativas** para los términos clave utilizados a lo largo de la especificación RCOS.  
Las entradas del glosario no introducen nuevos requisitos y no prevalecen sobre las secciones normativas.

**Rendición de cuentas (Accountability)**  
La expectativa de que los roles y los miembros puedan ser llamados a explicar acciones, resultados y cumplimiento de las reglas acordadas, con mecanismos definidos de revisión y corrección.

**Protocolo de rendición de cuentas (Accountability Protocol)**  
Un artefacto que define cómo se revisan, documentan y abordan las violaciones, daños o fallos reiterados, incluyendo el debido proceso, salvaguardas y vías de escalamiento.

**Artefacto**  
Un objeto documentado y versionado (p. ej., protocolo, registro, carta fundacional) adoptado mediante un proceso autorizado y utilizado para operativizar las capas de RCOS.

**Límite de autoridad (Authority Boundary)**  
Los límites explícitos dentro de los cuales un rol, círculo u órgano puede tomar decisiones o actuar.

**Protocolo de cambios (Change Protocol)**  
Un artefacto que define cómo se proponen, revisan, adoptan, publican y revierten los cambios, incluyendo la clasificación del tipo de decisión y las disposiciones de emergencia.

**Bienes comunes (Commons)**  
Recursos gobernados colectivamente bajo reglas explícitas de custodia, acceso y toma de decisiones.

**Comunidad**  
Un grupo de personas que se coordinan voluntariamente en torno a un propósito compartido dentro de un ámbito y sistema de gobernanza definidos.

**Cumplimiento (Compliance)**  
El estado de satisfacer todos los requisitos obligatorios de RCOS-Core a lo largo de las Capas 0–6.

**Escalera de resolución de conflictos (Conflict Resolution Ladder)**  
Un proceso de conflicto por etapas que define los pasos mínimos de resolución y los umbrales de escalamiento, desde la reparación de baja intensidad hasta la revisión de gobernanza y, si es necesario, la separación.

**Decisión constitucional**  
Una decisión que modifica el propósito, ámbito, invariantes o restricciones de identidad de la Capa 0, o el propio sistema de gobernanza.

**Matriz de decisiones (Decision Matrix)**  
Un artefacto de gobernanza que asocia tipos de decisiones y dominios con roles autorizados, mecanismos, umbrales y vías de escalamiento.

**Tipo de decisión**  
Una clasificación de decisiones (Operativa, Estratégica, Constitucional) utilizada para determinar la autoridad y el proceso.

**Debido proceso (Due Process)**  
Las garantías mínimas de equidad requeridas antes de restringir derechos, aplicar sanciones o iniciar una separación, incluyendo notificación, revisión y vías de apelación según lo definido.

**Cambio de emergencia**  
Un cambio con duración limitada promulgado bajo condiciones de emergencia explícitamente definidas, que requiere revisión posterior y ratificación o reversión.

**Explícito**  
Escrito, adoptado, accesible y revisable.  
Todo lo que no sea explícito se considera inexistente bajo RCOS.

**Regla de explicitud (Explicitness Rule)**  
El principio de que los mecanismos que asignan poder, riesgo, responsabilidad o condiciones de salida DEBEN estar escritos, adoptados y ser revisables.

**Experimento**  
Un cambio con duración limitada y reversible, adoptado con fines de aprendizaje y evaluación.

**Protocolo de salida y separación (Exit & Separation Protocol)**  
Un artefacto que define la salida voluntaria, el debido proceso para la salida forzosa, y la separación de activos, roles, acceso y obligaciones.

**Protocolo de gobernanza (Governance Protocol)**  
Un artefacto que define el ciclo de vida de las decisiones (propuesta, deliberación, adopción, documentación, revisión) y cómo se resuelven los conflictos de gobernanza.

**Dentro del ámbito / Fuera del ámbito (In-Scope / Out-of-Scope)**  
Dentro del ámbito se refiere a las personas, activos, dominios y actividades explícitamente gobernados por la comunidad. Fuera del ámbito se refiere a todo lo explícitamente excluido o no declarado dentro del ámbito.

**Protocolo de economía interna (Internal Economy Protocol)**  
Un artefacto que define el reconocimiento de contribuciones y cualquier mecanismo de intercambio interno, incluyendo restricciones de acumulación y corrección de disputas.

**Invariante**  
Una restricción no negociable que no puede ser anulada mientras esté en vigor.

**Capa (Layer)**  
Un dominio funcional de RCOS que define un aspecto específico del funcionamiento de la comunidad.

**Registro de aprendizaje (Learning Log)**  
Un artefacto que captura los fallos importantes, adaptaciones, reversiones y lecciones aprendidas, incluyendo desencadenantes, artefactos afectados y resultados.

**Miembro**  
Una persona que ha ingresado explícitamente a la comunidad a través del proceso de membresía definido.

**Módulo opcional**  
Una extensión específica de dominio que se basa en RCOS-Core sin alterar sus capas obligatorias.

**Registro (Registry)**  
Un artefacto que registra un conjunto de entradas autoritativas (p. ej., roles, recursos, estados de membresía) con titularidad clara, reglas de actualización e historial de versiones.

**Implementación de referencia**  
Una comunidad del mundo real que documenta públicamente su aplicación de RCOS-Core.

**Rol**  
Un conjunto explícitamente definido de responsabilidades, autoridad y rendición de cuentas, independiente de la persona que lo ocupa.

**Crítico para la seguridad (Safety-Critical)**  
Una condición en la que la seguridad física, psicológica o de menores está en riesgo, que requiere salvaguardas reforzadas y, potencialmente, acción protectora inmediata.

**Sanción**  
Una restricción o acción correctiva definida y documentada, aplicada a través de un proceso autorizado, proporcional a la infracción y sujeta a revisión.

**Ámbito (Scope)**  
Los dominios, activos y actividades explícitamente declarados sobre los cuales la comunidad ejerce autoridad.

**Custodia (Stewardship)**  
La responsabilidad del cuidado, mantenimiento y gobernanza de un recurso dentro de límites definidos.

**Tesorería (Treasury)**  
El conjunto de recursos compartidos, saldos, obligaciones y compromisos gestionados bajo reglas colectivas.

**Conjunto de reglas de tesorería (Treasury Ruleset)**  
Un artefacto que define cómo se mantienen, gastan, reportan, auditan y limitan los recursos de la tesorería, incluyendo umbrales y reglas de conflicto de intereses.

**Excepción de transparencia (Transparency Exception)**  
Una limitación explícitamente definida, justificada y con duración limitada al acceso a la información, que aún permite la auditoría de cumplimiento.

**Historial de versiones (Version History)**  
Un artefacto que registra qué versión está en vigor y documenta los cambios adoptados, las fechas de entrada en vigencia y las referencias a las decisiones.


---

# Apéndice B — Artefactos de Ejemplo (No Normativo)

Este apéndice proporciona **ejemplos ilustrativos** de artefactos referenciados en la especificación.  
Los ejemplos son solo informativos y no deben tratarse como formatos o implementaciones obligatorios.

## B.1 Ejemplo de Carta de Propósito (Extracto)

- Propósito principal (singular): "Mantener y cuidar un lugar de vida compartido y regenerativo que proporcione vivienda estable y restauración ecológica."
- Propósitos secundarios (delimitados):
  - "Operar un pequeño programa educativo sobre prácticas regenerativas."
  - "Gestionar una cooperativa propiedad de los miembros para la producción local de alimentos."
- No-objetivos / exclusiones:
  - "No es un partido político."
  - "No es un colectivo de proyecto a corto plazo."
  - "No es un vehículo inmobiliario con fines de lucro."
- Condiciones para el cambio de propósito:
  - "Los cambios de propósito requieren una decisión constitucional y una re-ratificación completa."
- Registro de ratificación:
  - Adoptado: 2026-01-01
  - Tipo de decisión: Constitucional
  - Versión: 0.3
  - Enlace al registro de decisión: [marcador de posición]

## B.2 Ejemplo de Declaración de Alcance (Extracto)

- Activos dentro del alcance:
  - Parcela de terreno "North Field"
  - Edificios: "Common House", "Workshop"
  - Fondos compartidos: tesorería operativa, fondo de reserva
  - Infraestructura compartida: sistema de agua, instalación solar, vehículos compartidos
- Dominios de autoridad dentro del alcance:
  - Reglas de gobernanza y proceso de decisión (Capa 2)
  - Reglas y estados de membresía (Capa 1)
  - Tesorería y asignación de recursos compartidos (Capa 3)
  - Coordinación operativa para el trabajo compartido (Capa 5)
- Dominios fuera del alcance:
  - Ingresos personales, deudas privadas y cuentas bancarias privadas
  - Relaciones privadas y espacios de vida privados (excepto condiciones críticas de seguridad)
  - Negocios fuera del sitio que no utilicen activos comunitarios

## B.3 Ejemplo de Matriz de Decisiones (Extracto)

| Dominio de Decisión | Tipo de Decisión | Órgano Autorizado | Mecanismo | Umbral | Escalamiento |
|----------------|--------------|-----------------|-----------|-----------|------------|
| Aprobación de presupuesto (anual) | Estratégica | Círculo de Finanzas | Consentimiento | Sin objeciones | Círculo General |
| Gasto de emergencia ≤ 500 | Operacional | Tesorero/a | Autoridad delegada | N/A | Círculo de Finanzas |
| Gasto 501–5.000 | Estratégica | Círculo de Finanzas | Votación | Mayoría | Círculo General |
| Agregar/eliminar un invariante central | Constitucional | Círculo General | Votación | Supermayoría (80%) | Revisión constitucional |
| Nombramiento de rol | Operacional | Líder de Círculo | Consentimiento | Sin objeciones | Círculo de Gobernanza |

## B.4 Ejemplo de Protocolo de Economía Interna (Extracto)

- Categorías de contribución reconocidas:
  - Trabajo (mantenimiento, construcción, producción de alimentos)
  - Cuidado (cuidado de infancias, cuidado de personas mayores, apoyo en conflictos)
  - Conocimiento (formación, documentación, facilitación)
  - Custodia (mantenimiento de recursos, supervisión de adquisiciones)
- Mecanismo de registro:
  - Registro semanal de contribuciones enviado por los miembros
  - Revisión mensual por el Círculo de Operaciones para consistencia y correcciones
- Unidades internas (opcional):
  - "Créditos de tiempo" registrados en horas para ciertas asignaciones compartidas
- Restricciones de acumulación (si existen unidades internas):
  - Topes de saldo
  - Caducidad después de 12 meses salvo renovación por revisión
- Disputa y corrección:
  - Cualquier miembro puede solicitar la revisión de un registro dentro de los 30 días
  - Las correcciones requieren justificación documentada y se registran en un historial de cambios

## B.5 Ejemplo de Escalera de Resolución de Conflictos (Extracto)

1. Conversación directa (reparación informal)  
2. Mediación facilitada (facilitador/a neutral seleccionado/a de una lista aprobada)  
3. Recepción de rendición de cuentas (recepción documentada; salvaguardas contra represalias activadas)  
4. Revisión de rendición de cuentas (hallazgos, plan de reparación y respuestas proporcionales)  
5. Decisión de gobernanza (si deben cambiar autoridad, acceso o roles)  
6. Proceso de separación (si es necesario; coordinado con el protocolo de salida y separación de la Capa 1)

## B.6 Ejemplo de Plantilla de Propuesta de Cambio (Extracto)

- Título del cambio:
- Resumen (1–3 oraciones):
- Capas y artefactos afectados (enlaces):
- Tipo de cambio:
  - Cambio permanente / Experimento
- Tipo de decisión y ruta de decisión autorizada (referencia a la Matriz de Decisiones):
- Justificación:
- Riesgos y mitigaciones:
- Plan de transición y migración:
- Plan de reversión y disparadores de reversión:
- Fecha de vigencia y fecha de revisión:

## B.7 Ejemplo de Acuerdo de Membresía (Extracto)

- Estado de membresía al firmar: Prueba / Plena
- Derechos de los miembros (ejemplos):
  - Acceso a los registros de decisiones definidos como transparentes
  - Derechos de participación según el tipo de decisión
  - Una ruta de salida definida en todo momento
- Obligaciones de los miembros (ejemplos):
  - Expectativas de contribución según el rol y el estado de membresía
  - Adhesión a los invariantes declarados y las reglas de seguridad
  - Participación en los procesos mínimos de incorporación y revisión
- Referencia al debido proceso:
  - "Cualquier salida forzada o restricción de acceso sigue el debido proceso de la Capa 4 y el protocolo de salida."

## B.8 Ejemplo de Protocolo de Incorporación (Extracto)

1. Proporcionar acceso a los artefactos RCOS (Capas 0–6) y módulos locales
2. Confirmar consentimiento explícito a los artefactos de la Capa 0 y la Capa 1
3. Asignar estado de membresía inicial y compañero/a de incorporación
4. Completar la orientación sobre seguridad y procesos de conflicto
5. Revisar los límites de alcance y lo que está fuera del alcance
6. Registrar la finalización de la incorporación en el registro de membresía

## B.9 Ejemplo de Entrada en el Registro de Roles (Extracto)

- Nombre del rol: Tesorero/a
- Propósito: Mantener los registros de tesorería y ejecutar pagos autorizados
- Alcance de autoridad:
  - Ejecutar pagos ≤ 500 dentro de categorías aprobadas
- Límites:
  - Sin autoridad para aprobar presupuestos ni alterar reglas de transparencia
- Mandato:
  - 6 meses, renovable una vez sin revisión
- Rendición de cuentas:
  - Informe de tesorería publicado mensualmente; verificación de auditoría trimestral
- Nombramiento/remoción:
  - Nombrado/a por el Círculo de Finanzas; removible mediante revisión del Círculo de Gobernanza

## B.10 Ejemplo de Conjunto de Reglas de Tesorería (Extracto)

- Transparencia:
  - Balance mensual y resumen de flujo de caja publicados para todos los miembros
- Umbrales de gasto:

| Monto | Tipo de Decisión | Órgano Autorizado | Mecanismo |
|---:|---|---|---|
| ≤ 500 | Operacional | Tesorero/a | Delegado |
| 501–5.000 | Estratégica | Círculo de Finanzas | Votación por mayoría |
| > 5.000 | Estratégica | Círculo General | Votación por mayoría |
| Deuda / obligación a largo plazo | Constitucional | Círculo General | Supermayoría |

- Conflicto de intereses:
  - Un solicitante no puede aprobar su propia solicitud de gasto

## B.11 Ejemplo de Plantilla de Reunión (Extracto)

- Tipo de reunión: Operaciones
- Fecha/hora:
- Facilitador/a:
- Asistentes:
- Agenda:
  1. Ronda de apertura (con tiempo limitado)
  2. Revisión de acciones anteriores
  3. Actualizaciones operativas
  4. Decisiones (si las hay)
  5. Próximas acciones y responsables
- Registro de decisión (si se usa):
  - Tipo de decisión:
  - Autoridad:
  - Mecanismo/umbral:
  - Resultado:
  - Fecha de vigencia:

## B.12 Ejemplo de Entrada en el Registro de Aprendizaje (Extracto)

- Fecha:
- Evento desencadenante:
- Qué sucedió (narrativa breve):
- Capas/artefactos implicados:
- Señales que desencadenaron la acción:
- Qué cambió (o qué se intentó):
- Resultado después de la revisión:
- Responsable de la acción de seguimiento y fecha límite:


---

# Apéndice C — Resumen de implementación de referencia

Este apéndice define una **estructura de documentación recomendada** para comunidades que deseen presentarse como Implementaciones de Referencia de RCOS. El objetivo es hacer que la adopción sea auditable, comparable y útil para el aprendizaje, sin implicar un respaldo.

## C.1 Contexto de la comunidad

- Nombre y ubicación
- Tamaño y escala (p. ej., 12 miembros; 3 hogares; 25 hectáreas)
- Propósito principal (Capa 0)
- Fecha de fundación y fecha de adopción de RCOS (si difiere)
- Forma(s) jurídica(s) relevante(s) (si las hay)
- Punto de contacto público

## C.2 Resumen de adopción de RCOS

- Versión de RCOS-Core en uso
- Referencia del registro de decisión de adopción (autoridad, mecanismo, fecha)
- Resumen de Módulos Opcionales adoptados (si los hay), incluyendo:
  - Nombre y alcance del módulo
  - Fecha de adopción
  - Enlace a la especificación del módulo
  - Dependencias de capa declaradas

## C.3 Resumen capa por capa

Para cada capa (0–6):
- Artefactos implementados (con enlaces)
- Desviaciones o adaptaciones (con enlaces)
- Desafíos conocidos y modos de fallo encontrados

Formato recomendado:

| Capa | Artefactos requeridos implementados | Enlace(s) público(s) | Versión/fecha | Notas |
|---:|---|---|---|---|
| 0 | Carta de Propósito; Declaración de Alcance; Registro de Invariantes | [placeholder] | v0.3 / 2026-01-01 | Propósito estable; invariantes revisadas trimestralmente |
| 1 | Acuerdo de Membresía; Protocolo de Incorporación; Protocolo de Salida y Separación; Registro de Estado de Membresía | [placeholder] | v1.1 / 2026-02-15 | Período de prueba de 3 meses |
| 2 | Matriz de Decisiones; Protocolo de Gobernanza; Registro de Autoridad | [placeholder] | v0.8 / 2026-03-10 | Consentimiento para operaciones, votación para estrategia |
| 3 | Protocolo de Economía Interna; Reglamento de Tesorería | [placeholder] | v0.5 / 2026-03-20 | Informes mensuales de tesorería publicados |
| 4 | Escalera de Resolución de Conflictos; Protocolo de Rendición de Cuentas | [placeholder] | v0.6 / 2026-04-01 | Política anti-represalias incluida |
| 5 | Manual de Operaciones; Registro de Roles; Plantillas de Reuniones | [placeholder] | v0.4 / 2026-04-15 | Carga de reuniones limitada a 4h/semana |
| 6 | Protocolo de Cambios; Historial de Versiones; Registro de Aprendizajes | [placeholder] | v0.2 / 2026-05-01 | Los experimentos expiran si no se renuevan |

## C.4 Gobernanza y evolución

- Mecanismos de decisión en uso (con extracto de la Matriz de Decisiones o enlace)
- Historial de cambios y experimentos (con enlaces a registros de cambios)
- Aprendizajes principales y fallos (con enlaces a entradas del Registro de Aprendizajes)
- Registro de desviaciones (recomendado):

| Elemento | Capa(s) | Tipo | Estado | Inicio | Revisión/Fin | Enlace |
|---|---|---|---|---|---|---|
| Prueba de facilitación rotativa | 5 | Experimento | Activo | 2026-06-01 | 2026-08-01 | [placeholder] |
| Excepción de transparencia de tesorería (seguridad) | 3/4 | Permanente | Activo | 2026-04-10 | Revisión anual | [placeholder] |


## C.5 Declaración de cumplimiento
- Estado de cumplimiento actual: Cumple / No cumple / Desconocido
- Fecha de la última autoauditoría o auditoría externa
- Método de auditoría (autoauditoría vs. externa)
- Períodos conocidos de incumplimiento (si los hay) y resumen de remediación
- Enlaces de evidencia (recomendado):

| Evidencia | Fecha | Enlace |
|---|---:|---|
| Resultado de la lista de verificación capa por capa | 2026-07-01 | [placeholder] |
| Notas / hallazgos de auditoría | 2026-07-01 | [placeholder] |
| Registro de remediación | 2026-07-15 | [placeholder] |
- Períodos conocidos de incumplimiento (si los hay)  

## C.6 Transparencia pública
- Índice de artefactos públicos (recomendado):

| Artefacto | Capa | Enlace público | Versión/fecha | Notas |
|---|---:|---|---:|---|
| Carta de Propósito | 0 | [placeholder] | 2026-01-01 | |
| Matriz de Decisiones | 2 | [placeholder] | 2026-03-10 | |
| Informes de tesorería | 3 | [placeholder] | 2026-06-30 | mensual |
| Registro de Aprendizajes | 6 | [placeholder] | 2026-06-15 | redacciones indicadas |

- Canal de contacto o consultas
- Declaración explícita de qué es privado y qué es público, y por qué
- Enlace a la versión actual de RCOS-Core utilizada y registro de cambios
- Canal de contacto o consultas  

---

## Nota informativa

Las Implementaciones de Referencia son instrumentos de aprendizaje, no respaldos.

