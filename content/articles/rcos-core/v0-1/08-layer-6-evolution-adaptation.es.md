---
id: 4ffa600f
title: 8. Capa 6 — Evolución y Adaptación
parentId: e6de7a5d
order: 80
lang: es
sourceHash: 1329c3d9
---

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
