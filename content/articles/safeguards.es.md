---
id: aac2e91b
title: Salvaguardas
parentId: null
order: 6
lang: es
sourceHash: '80540912'
---

## Salvaguardas

Las salvaguardas son módulos opcionales y no normativos diseñados para proteger a las comunidades contra **modos de fallo de alto riesgo conocidos** que repetidamente causan colapso, captura o daño irreversible.

A diferencia de las capas centrales de RCOS, las salvaguardas **no son requeridas para el cumplimiento**. Se adoptan intencionalmente cuando una comunidad reconoce que un dominio de riesgo específico aplica a su contexto.

Las salvaguardas existen porque algunos fallos:
- ocurren con poca frecuencia pero de forma catastrófica,
- atraviesan múltiples capas del sistema,
- no pueden repararse una vez activados,
- a menudo se subestiman hasta que es demasiado tarde.

### Qué son las salvaguardas

Las salvaguardas son:
- Complementos opcionales al Núcleo RCOS
- Explícitas y documentadas
- Defensivas por diseño
- Enfocadas en restricción, no en optimización
- Activadas mediante adopción formal

Las salvaguardas típicamente:
- Introducen restricciones adicionales
- Requieren artefactos nuevos o modificados
- Endurecen las reglas de salida, transferencia o autoridad
- Reducen flexibilidad a cambio de resiliencia

### Qué no son las salvaguardas

Las salvaguardas no son:
- Posiciones morales obligatorias
- Prescripciones culturales o ideológicas
- Sustitutos de procesos de gobernanza o conflicto
- Normas informales o "reglas sobreentendidas"

Si una salvaguarda no ha sido adoptada explícitamente, NO DEBE asumirse que aplica.

### Cuándo son apropiadas las salvaguardas

Una salvaguarda es apropiada cuando:
- Un fallo sería irreversible (p. ej., pérdida de tierra, captura legal)
- El impacto abarca múltiples capas (gobernanza, economía, membresía)
- La salida se volvería imposible o punitiva
- El poder o los activos podrían concentrarse silenciosamente
- Sistemas legales o financieros externos interactúan con la comunidad

### Ejemplos de dominios de salvaguarda

Los dominios comunes de salvaguarda incluyen:
- Tierra y anti-privatización de los comunes
- Restricciones al poder de fundadores o inversores
- Limitaciones de capital externo y deuda
- Seguridad y protección infantil
- Contención de poderes de emergencia
- Protección de sucesión y disolución

### Relación con los artefactos

Las salvaguardas **no son artefactos en sí mismas**.

Sin embargo, cuando se adoptan, una salvaguarda PUEDE:
- Requerir nuevos artefactos
- Modificar artefactos existentes
- Añadir restricciones a los invariantes de la Capa 0
- Introducir casos de prueba adicionales para el cumplimiento

Estos artefactos derivados solo son requeridos **mientras la salvaguarda esté activa**.

### Principio de diseño

Las salvaguardas existen para responder una pregunta con claridad:

> "¿Qué es tan peligroso aquí que debemos limitarnos de antemano?"

Intercambian opcionalidad por capacidad de supervivencia.

Se alienta a las comunidades a adoptar salvaguardas de forma temprana en lugar de retroactiva, ya que la mayoría de las salvaguardas pierden efectividad una vez que un modo de fallo ya ha comenzado.
