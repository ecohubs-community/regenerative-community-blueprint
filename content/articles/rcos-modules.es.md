---
id: 2c71be9d
title: Módulos RCOS
parentId: null
order: 3
lang: es
sourceHash: a43538c6
---

## Módulos

Los módulos son extensiones opcionales y específicas de dominio al Núcleo RCOS. Permiten a las comunidades añadir estructura donde sea necesario sin sobrecargar el sistema central ni forzar uniformidad entre contextos diferentes.

RCOS es intencionalmente mínimo en su núcleo. Los módulos existen para apoyar la diversidad de propósito, escala, ecología, cultura y práctica, preservando al mismo tiempo una base estructural compartida.

### Qué son los módulos

Los módulos son:
- Extensiones opcionales al Núcleo RCOS
- Adoptados y documentados explícitamente
- Delimitados a dominios o prácticas específicas
- Compatibles con el cumplimiento de RCOS
- Diseñados para ser componibles y removibles

Un módulo puede introducir:
- Reglas o restricciones adicionales
- Nuevos artefactos o registros
- Roles especializados o dominios de decisión
- Salvaguardas o invariantes adicionales dentro de su alcance

### Qué no son los módulos

Los módulos no son:
- Requisitos para el cumplimiento del Núcleo RCOS
- Expectativas o normas implícitas
- Capas de gobernanza ocultas
- Mejores prácticas universales
- Sustitutos de las capas del Núcleo RCOS

Si un módulo no ha sido adoptado explícitamente, NO DEBE asumirse que aplica.

### Relación con el Núcleo RCOS

Los módulos:
- NO DEBEN contradecir el propósito, alcance o invariantes de la Capa 0
- DEBEN respetar las restricciones de gobernanza definidas en la Capa 2
- DEBEN integrarse con los artefactos y mecanismos de decisión existentes
- PUEDEN extender o especializar reglas en las Capas 3–6 dentro de su alcance declarado

Los módulos no pueden anular invariantes centrales. Cuando un módulo introduce reglas más estrictas, esas reglas aplican únicamente dentro del dominio declarado del módulo.

### Para quién son los módulos

Los módulos están destinados a:
- Comunidades con necesidades operativas o ecológicas específicas
- Proyectos que requieren estructura adicional en un dominio
- Comunidades en diferentes etapas de madurez
- Grupos que experimentan dentro de condiciones seguras y delimitadas

Los módulos permiten:
- A las comunidades pequeñas mantenerse simples
- A las comunidades complejas añadir estructura de forma incremental
- A las comunidades diversas mantener la interoperabilidad

### Cuándo aplicar módulos

Un módulo DEBERÍA considerarse cuando:
- Un dominio se vuelve crítico para la supervivencia o identidad de la comunidad
- Las prácticas informales comienzan a generar ambigüedad o desequilibrios de poder
- Surgen conflictos recurrentes en un área específica
- Sistemas externos (legales, ecológicos, financieros) introducen riesgo
- La comunidad adquiere la capacidad y estabilidad para soportar más estructura

Un módulo NO DEBERÍA aplicarse:
- Para compensar fallos de gobernanza central no resueltos
- Para imponer valores sin consentimiento explícito
- Como sustituto de la resolución de conflictos
- Cuando la comunidad carece de capacidad para mantenerlo

### Cómo se aplican los módulos

Para aplicar un módulo, una comunidad DEBE:
- Adoptar explícitamente el módulo mediante una decisión autorizada
- Declarar el alcance y las interfaces del módulo
- Crear o adoptar los artefactos requeridos
- Asignar responsabilidad de propiedad y mantenimiento
- Documentar cómo interactúa el módulo con las reglas existentes

Los módulos PUEDEN ser:
- De duración limitada
- Experimentales
- Adoptados gradualmente
- Implementados parcialmente, si se define explícitamente

### Ciclo de vida de los módulos

Los módulos siguen las mismas reglas de evolución que el núcleo:
- Adopción mediante gobernanza formal
- Versionado y documentación
- Revisión periódica
- Modificación o eliminación mediante procesos de cambio definidos

Un módulo PUEDE ser eliminado si:
- Su dominio ya no es relevante
- Introduce una carga desproporcionada
- Entra en conflicto con reglas centrales actualizadas
- La comunidad elige explícitamente simplificar

### Principio de diseño

Los módulos existen para responder una pregunta:

> "¿Dónde necesitamos más estructura de la que proporciona el núcleo — y por qué?"

Permiten a las comunidades crecer **en capacidad sin crecer en caos**, manteniendo el Núcleo RCOS estable, mínimo e interoperable.
