---
id: c2d42a76
title: Apéndice C — Resumen de implementación de referencia
parentId: e6de7a5d
order: 140
lang: es
sourceHash: e8faac9d
---

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
