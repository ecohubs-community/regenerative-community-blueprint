---
id: 6e32b102
title: Capa 6 - Evolución & Adaptación
parentId: a7759be1
order: 0
lang: es
sourceHash: 9e7d7a30
---

**Cómo cambia el sistema sin colapsar.**

### **Mecanismos de cambio**

* Propuestas
* Experimentos
* Ciclos de revisión

### **Versionado**

* Versiones de protocolo
* Rutas de migración

### **Captura de aprendizaje**

* Retrospectivas
* Documentación de fallos

### **Artefactos**

* Protocolo de cambios
* Historial de versiones

### **Invariantes de la Capa**

* **Invariante 6.1: El cambio es posible pero restringido**
  Ningún componente del sistema está congelado para siempre, pero ningún cambio es instantáneo.
* **Invariante 6.2: Los cambios están versionados**
  Los cambios de reglas DEBEN estar documentados, fechados y ser trazables.
* **Invariante 6.3: Los experimentos son reversibles**
  Todos los experimentos DEBEN definir alcance, duración y condiciones de reversión.
* **Invariante 6.4: El aprendizaje se captura**
  Los fallos importantes y las adaptaciones DEBEN ser registrados y accesibles.

### **Reglas de explicitud**

#### **DEBE ser explícito**

* Cómo cambian las reglas
* Proceso de versionado y revisión
* Límites de los experimentos
* Mecanismos de reversión

**Por qué:** los sistemas que no pueden cambiar se pudren o explotan.

#### **PUEDE ser explícito**

* Frecuencia de revisión
* Cláusulas de caducidad
* Métodos de recolección de retroalimentación

#### **DEBE permanecer opcional**

* Ritmo de innovación
* Apetito de riesgo (dentro de los límites)
