**RCOS — Sistema Operativo de Comunidad Regenerativa**

# Registro de Aprendizajes

- **Generado:** 2026-04-29
- **Fuente (versión más reciente):** [https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-6/learning-log](https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-6/learning-log)
- **Todas las plantillas RCOS:** [https://blueprint.ecohubs.community/es/articles/rcos-templates](https://blueprint.ecohubs.community/es/articles/rcos-templates)

---
- **Capa:** 6 — Evolución y Adaptación
- **Estado:** Plantilla — adapta para tu comunidad; se actualiza cuando ocurren eventos de aprendizaje
- **Referencia RCOS:** [§8.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [§8.6](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)

> Registra fallos importantes, adaptaciones, reversiones y aprendizajes sistémicos. Los patrones de fallo recurrentes DEBEN activar una revisión estructural, no culpa individual. Las entradas se añaden al inicio (las más recientes primero).

---

## Qué constituye un evento de aprendizaje

*Cláusulas RCOS: [8.4.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts), [8.7.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué definir el detonante explícitamente?</summary>

Si "deberíamos aprender de esto" queda a criterio individual, las lecciones más difíciles — las que implican conflicto, fracaso o vergüenza — son las que más probablemente quedarán sin registrar. Nombrar los eventos específicos que DEBEN producir una entrada elimina la pregunta del momento, y asegura que los aprendizajes incómodos se capturen en lugar de dejarse pasar en silencio.

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Enumera los eventos específicos que obligan a crear una entrada en el Registro de Aprendizajes. Indica quién es responsable del registro y la cadencia de síntesis.

</details>

Se DEBE añadir una entrada cuando ocurra cualquiera de los siguientes eventos:

- _<Una decisión de gobernanza se revierte, se deshace, o se descubre que contradice otra regla adoptada.>_
- _<Un experimento concluye (éxito, fracaso o terminación anticipada).>_
- _<Un conflicto escala al paso de gobernanza de la Escalera de Resolución de Conflictos.>_
- _<Se identifica un fallo estructural o sistémico que causó daño, confusión o quiebres repetidos del proceso.>_
- _<Se adopta una adaptación importante de las operaciones comunitarias que cambia significativamente el funcionamiento de una capa.>_
- _<Un cuasi-incidente: una situación que podría haber causado daño significativo pero fue detectada antes de que ocurriera.>_
- _<Cualquier evento que la comunidad identifique colectivamente como digno de aprendizaje.>_

_<Los ajustes operativos menores, las decisiones rutinarias y los asuntos individuales resueltos completamente en los primeros pasos de la Escalera de Resolución de Conflictos no requieren una entrada en el Registro de Aprendizajes.>_

**Responsable:** _<rol encargado de asegurar que las entradas se creen y mantengan.>_

**Cadencia de síntesis:** _<el Registro de Aprendizajes se revisa en la reunión de Reflexión y Aprendizaje; el rol designado prepara una síntesis breve de las entradas desde la última revisión, señalando patrones recurrentes.>_

---

_Aún no hay entradas. La primera entrada se añadirá cuando ocurra el primer evento de aprendizaje._

---

## Formato de entrada

*Cláusulas RCOS: [8.4.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.4.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#84-learning-and-feedback-capture), [8.6.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#86-artifacts)*

<details data-kind="rationale">
<summary>¿Por qué una plantilla fija de entrada?</summary>

La reflexión libre es valiosa, pero no se agrega. Un esquema consistente — detonante, señales, qué cambió, resultado, responsable de seguimiento — permite recorrer años de entradas buscando patrones recurrentes y convertir incidentes aislados en evidencia estructural. También obliga a cada entrada a nombrar un responsable, para que el aprendizaje no se detenga en "lo notamos".

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Usa la plantilla de abajo para cada entrada. Cada campo impone una perspectiva distinta sobre el evento; no omitas el responsable de seguimiento.

</details>

```markdown
## <AAAA-MM-DD> — <Título breve>

- **Detonante:** <Qué ocurrió que motivó esta entrada>
- **Capas/artefactos implicados:** <p. ej. Capa 2 — Protocolo de Gobernanza>
- **Qué ocurrió:** <Narrativa breve>
- **Señales que activaron la acción:** <Qué hizo visible el problema>
- **Qué se cambió o intentó:** <Decisión, experimento o cambio de regla>
- **Resultado:** <Resultado tras la revisión, si se conoce>
- **Responsable de seguimiento y fecha límite:** <Nombre / rol y fecha, o "ninguno">
```
