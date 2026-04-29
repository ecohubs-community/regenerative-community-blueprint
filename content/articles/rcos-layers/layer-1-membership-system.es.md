---
id: ced3b433
title: Capa 1 - Sistema de Membresía
parentId: a7759be1
order: 0
lang: es
sourceHash: db0524cf
---

**¿Quién está dentro del sistema y bajo qué condiciones?**

### Ciclo de vida de la membresía

* Criterios de entrada  
* Prueba / período de prueba  
* Membresía plena  
* Salida (voluntaria y forzada)

### Derechos vs obligaciones

* Derechos de decisión  
* Acceso a recursos  
* Expectativas de contribución

### Artefactos

* Acuerdo de Membresía  
* Protocolo de Salida y Separación

### Invariantes de la Capa

* **Invariante 1.1: Sin membresía implícita**  
  El estado de membresía DEBE ser explícito, documentado y mutuamente reconocido.

* **Invariante 1.2: La entrada y la salida siempre son posibles**  
  Ningún miembro puede quedar atrapado indefinidamente; los caminos de salida DEBEN existir y estar definidos.

* **Invariante 1.3: Simetría entre derechos y obligaciones**  
  No hay derechos sin obligaciones, ni obligaciones sin derechos correspondientes.

* **Invariante 1.4: Proceso debido para la salida forzada**  
  La revocación de membresía requiere un proceso predefinido y documentado.

### Reglas de Explicitud

#### **DEBE ser explícito**

* Estados de membresía (prueba, plena, salida)  
* Procesos de entrada y salida  
* Derechos vs obligaciones  
* Proceso debido para salida forzada

**Por qué:** una membresía poco clara es la causa #1 de abuso y agotamiento.

#### **PUEDE ser explícito**

* Expectativas de contribución por rol  
* Compromisos de tiempo  
* Normas de comportamiento

#### **DEBE permanecer opcional**

* Criterios de compatibilidad de personalidad  
* Elecciones de estilo de vida  
* Alineación de creencias (salvo que sea legalmente requerido)
