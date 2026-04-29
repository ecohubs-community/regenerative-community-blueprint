---
id: f12d5320
title: 9. Secciones no normativas
parentId: e6de7a5d
order: 90
lang: es
sourceHash: f8f55d53
---

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
