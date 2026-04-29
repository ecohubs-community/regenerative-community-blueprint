**RCOS — Sistema Operativo de Comunidad Regenerativa**

# Plantilla de Experimento

- **Generado:** 2026-04-29
- **Fuente (versión más reciente):** [https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-6/experiment-template](https://blueprint.ecohubs.community/es/articles/rcos-templates/layer-6/experiment-template)
- **Todas las plantillas RCOS:** [https://blueprint.ecohubs.community/es/articles/rcos-templates](https://blueprint.ecohubs.community/es/articles/rcos-templates)

---
- **Capa:** 6 — Evolución y Adaptación
- **Estado:** Plantilla — úsala para proponer un experimento acotado en el tiempo
- **Referencia RCOS:** [§8.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [§8.7](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)

> Los experimentos permiten que la comunidad pruebe un cambio sin adoptarlo de forma permanente. Para mantener la seguridad, cada experimento DEBE estar acotado en el tiempo, etiquetado y con expiración automática — y DEBE registrar sus resultados en el Registro de Aprendizajes.

---

## Campos Requeridos

*Cláusulas RCOS: [8.3.1](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.2](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.4](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.3.5](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#83-experiments), [8.7.3](https://blueprint.ecohubs.community/es/articles/rcos-core/v0-1/layer-6-evolution-adaptation#87-layer-invariants)*

<details data-kind="rationale">
<summary>¿Por qué se requieren estos campos?</summary>

Sin alcance, duración, criterios de éxito y reversión, un "experimento" es simplemente un cambio permanente con un nombre más amigable. Obligar a cada propuesta a especificar qué cambia, cuándo termina, cómo se evaluará y cómo se revertirá mantiene la experimentación reversible — e impide que la etiqueta de experimento se use para eludir la deliberación.

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Completa cada campo. La duración máxima la establece tu Protocolo de Cambios. La autoridad de decisión DEBE provenir de la Matriz de Decisiones.

</details>

- **Título:** _<nombre breve del experimento.>_
- **Proponente:** _<nombre del miembro.>_
- **Tipo de decisión:** Estratégica
- **Alcance:** _<exactamente qué se está probando; qué artefactos y comportamientos se ven afectados.>_
- **Duración:** _<fecha de inicio — fecha de fin; duración máxima según lo establecido por el Protocolo de Cambios.>_
- **Puntos de revisión:** _<al menos una revisión intermedia; especifica fechas y qué se revisa.>_
- **Criterios de éxito:** _<condiciones observables que justificarían hacer el cambio permanente.>_
- **Criterios de fallo:** _<condiciones observables que terminarían el experimento anticipadamente.>_
- **Condiciones y proceso de reversión:** _<qué activa la reversión y cómo se ejecuta.>_
- **Ruta de decisión autorizada:** _<quién puede iniciar, extender, modificar o terminar el experimento, según la Matriz de Decisiones.>_
- **Etiquetado:** _<todos los artefactos afectados por el experimento DEBEN estar explícitamente etiquetados como experimentales durante toda su duración.>_
- **Suspensión de seguridad:** _<reconoce que se PUEDE invocar una suspensión de emergencia bajo el Protocolo de Cambios si surge un riesgo de seguridad creíble.>_

## Expiración y Renovación

<details data-kind="rationale">
<summary>¿Por qué los experimentos deben expirar?</summary>

La comunidad necesita la opción de revertir. La expiración automática obliga a tomar una decisión deliberada para hacer el cambio permanente — en lugar de una deriva lenta en la que nadie recuerda que alguna vez fue condicional.

</details>

<details data-kind="instructions">
<summary>Cómo completar esto</summary>

Indica la regla de expiración automática, el mecanismo de renovación y la obligación de registrar los resultados en el Registro de Aprendizajes.

</details>

- _<Los experimentos expiran automáticamente al final de su duración definida, a menos que se renueven explícitamente mediante una nueva propuesta. La renovación requiere una nueva votación Estratégica.>_
- _<Los resultados y aprendizajes se registran en el Registro de Aprendizajes.>_

---

## Registro de Resultado (se completa al finalizar el experimento)

- **Fecha de finalización:**
- **Resultado:** _<Adoptado permanentemente / Revertido / Modificado y ejecutado de nuevo / Terminado anticipadamente>_
- **Registro de decisión:** _<enlace a la votación o decisión>_
- **Entrada en el Registro de Aprendizajes:** _<enlace>_
- **Resumen:** _<dos a cuatro oraciones sobre qué se probó, qué se observó y qué se decidió.>_
