---
name: sdd-especificacion-primero
description: "Desarrollo guiado por especificación (SDD) para landings. Escribe y hace aprobar ESPECIFICACION.md antes de cualquier código. Úsala antes de construir o cambiar una web."
---

# Especificación primero (SDD)

**SDD** (Spec-Driven Development, desarrollo guiado por especificación) significa:
primero se escribe **qué** debe hacer la web y **cómo sabremos que lo hace**, la persona lo aprueba,
y solo entonces se escribe código. La especificación es el contrato entre la persona y Claude.

Cómo explicarlo en clase: "Es el plano de la casa. Nadie pone ladrillos sin plano.
Y si quieres mover una pared, primero se cambia el plano."

## Reglas

1. **Sin especificación aprobada no hay código.** Si piden "hazla ya", explica en una frase por qué compensa
   y escribe una versión corta en 2 minutos.
2. **Cada cambio pasa primero por la especificación.** "Quiero añadir precios" → se actualiza `ESPECIFICACION.md`,
   se aprueba y luego se construye.
3. **Criterios de aceptación verificables.** "Que sea bonita" no se puede comprobar.
   "El botón principal se ve sin hacer scroll en un móvil de 390 px" sí.
4. **Lo que no se sabe se marca**: `{{precio}}`, `[PENDIENTE: testimonio de Marta, falta permiso]`.
5. **Lenguaje llano.** La persona tiene que entenderla entera.

## Plantilla de ESPECIFICACION.md

Usa `references/plantilla-especificacion.md`. Secciones:

1. **Resumen**: negocio, oferta, público, acción principal (4 líneas).
2. **Objetivo medible**: qué cuenta como éxito (por ejemplo, contactos por semana).
3. **Fuera de alcance**: lo que esta versión **no** hace (pagos, blog, idiomas...).
4. **Mapa de secciones**: orden, propósito de cada una y su contenido aprobado.
5. **Dirección visual**: tesis, paleta, tipografía, hero elegido, guion de movimiento.
6. **Comportamiento**: formulario (campos, validaciones, mensajes, qué pasa al enviar), enlaces, navegación.
7. **Requisitos no funcionales**: rendimiento, accesibilidad, SEO, privacidad, seguridad, navegadores.
8. **Criterios de aceptación** en formato Dado / Cuando / Entonces, numerados (CA-01, CA-02...).
9. **Pendientes y decisiones abiertas**.
10. **Registro de cambios**: fecha y qué cambió.

## Criterios de aceptación: cómo se escriben

```
CA-07  Formulario con email incorrecto
Dado    que estoy en la sección de contacto
Cuando  escribo "maria@" en el email y pulso "Pedir mi cita"
Entonces veo junto al campo "Revisa el email, parece incompleto"
Y       el formulario no se envía
Y       el foco va al campo del email
```

Cada criterio se convertirá en una prueba (ver `tdd-pruebas-landing`). Numera para poder decir
"CA-07 pasa" o "CA-07 falla".

Criterios que toda landing del kit incluye siempre (adáptalos):

- CA: el `h1` es el titular aprobado y solo hay uno.
- CA: el botón principal es visible sin scroll a 390 × 844 y a 1440 × 900.
- CA: no hay scroll horizontal a 390 px.
- CA: formulario válido → mensaje de confirmación y el dueño recibe el email.
- CA: formulario con campos vacíos o email incorrecto → errores junto a cada campo, sin enviar.
- CA: formulario con la trampa para bots rellena → se rechaza sin enviar email.
- CA: sin consentimiento marcado → no se envía.
- CA: con movimiento reducido, todo el contenido es visible sin animaciones.
- CA: sin JavaScript, el contenido se lee y el formulario se puede enviar.
- CA: enlaces del pie a aviso legal, privacidad y cookies funcionan.
- CA: página 404 propia.
- CA: Lighthouse móvil ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.
- CA: las cabeceras de seguridad están presentes (ver `auditoria-seguridad-landing`).

## Flujo con la persona

1. Escribe la especificación a partir de la ficha y la entrevista.
2. Entrégala y di: "Léela con calma. Lo importante: secciones, textos y el apartado de criterios.
   ¿Cambiarías algo?"
3. Aplica cambios y vuelve a pedir el "sí".
4. Guarda la especificación dentro del proyecto (`ESPECIFICACION.md`). Al final, el informe de revisión
   dice qué criterios pasan.

## Créditos

Propia del kit.
