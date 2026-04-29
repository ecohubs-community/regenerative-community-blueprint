---
id: 1afbg1a7
title: Privatización de los bienes comunes mediante la venta de terrenos
parentId: cbd2804b
order: 0
lang: es
sourceHash: 982f7873
---

**Modo de fallo**

La comunidad vende terrenos a sus miembros, socavando las reglas de salida y constitucionales.

**Capas involucradas**

Capa 0 (Alcance e invariantes), Capa 3 (Economía), Capa 1 (Membresía)

**Invariantes relevantes**

* 0.2 Alcance gobernado explícito  
* 3.2 Protección de los bienes comunes

* 1.2 La salida DEBE ser posible

**Condición de prueba**

* Los cambios en la propiedad de activos contradicen las invariantes declaradas.  
* Los miembros no pueden salir sin perder derechos o propiedad.

**Comportamiento esperado del RCOS**

* Las ventas DEBEN ser bloqueadas o regidas por reglas predeclaradas.  
* Las condiciones de salida y reventa DEBEN existir *antes* de la transferencia.

**Criterios de aprobación**

* El estatus de bienes comunes y los derechos de salida permanecen intactos.

**Criterios de fallo**

* La comunidad se vuelve estructuralmente imposible de abandonar.
