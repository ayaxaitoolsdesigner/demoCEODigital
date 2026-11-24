---
name: diseno-sin-pinta-de-ia
description: "Dirección de arte y control de calidad visual para que una web no parezca hecha por IA. Úsala al elegir colores, tipografías, espaciados, imágenes, tarjetas o al revisar un diseño."
---

# Diseño sin pinta de IA

Lo que delata a una web hecha "en automático" no es un color, una fuente o un degradado.
Es una decisión tomada **por reflejo** en lugar de **para este negocio**.

Sospecha de una decisión cuando se cumplen varias de estas:

- se podría pegar tal cual en un negocio que no tiene nada que ver;
- repite un patrón típico de diseño generado (degradado morado, luces difusas, tarjetas con icono, cuadrícula "bento");
- choca con el resto del sistema de la página;
- no aporta información, estado, acción, jerarquía ni carácter de marca;
- compite con el contenido o resta confianza.

No juzgues si algo "lo hizo una IA". Juzga el resultado visible.

## 1. Empieza por el contexto, nunca por la plantilla

1. Lee todo lo que la persona haya traído: logo, colores, fotos, capturas de referencia, textos.
2. Escribe una **tesis visual** de una frase que salga del negocio:
   "Una panadería de barrio que huele a madrugada: papel kraft, tipografía con oficio, fotos con harina de verdad."
3. Si hay referencias, pregunta **qué** le gusta de cada una y extrae principios (jerarquía, ritmo, contraste,
   tratamiento de imagen, movimiento). **Nunca copies** identidad, textos, imágenes, logos ni código de otra web.
4. Define un sistema mínimo **antes** de pulir (ver `references/sistema-visual.md`):
   tipografía y sus roles, escala de tamaños, espaciado, paleta con funciones, radios, sombras, iconos, imagen y movimiento.
   Preséntalo a la persona en una tabla corta y pide aprobación.

## 2. Una idea fuerte, no cinco

- Cada pantalla tiene **un foco** y cada recorrido **una acción principal**.
- Tipografía, imagen, color y movimiento cuentan la misma historia.
- Mejor **un momento memorable** bien hecho que muchos efectos sueltos.
- El contraste y la asimetría se usan a propósito; no neutralices el carácter en nombre de la "limpieza".

## 3. Relaciones visibles

- **Proximidad antes que cajas.** Lo relacionado, junto; lo que no, separado. No metas todo en tarjetas.
- **Jerarquía antes que etiquetas.** Tamaño, peso, posición y contraste hacen el trabajo; no hace falta una etiqueta
  en mayúsculas espaciadas encima de cada titular.
- **Profundidad solo si hay capas reales** (un menú encima del contenido, un modal).

## 4. Hazlo específico de este negocio

- Secciones elegidas por el recorrido del cliente, no por la secuencia de siempre.
- **Fotos reales** del negocio, del producto, del equipo, del local. Si no hay, pregunta antes de usar fotos de banco
  y elige unas coherentes entre sí (misma luz, mismo tratamiento). Nunca dibujos SVG improvisados como ilustración.
- Avatares: fotos reales con permiso o nada. Nunca caras generadas haciéndose pasar por clientes.
- Iconos de una sola familia (Phosphor, Lucide, Solar o Tabler), mismo grosor. Nada de un icono en una baldosa sobre cada titular.
- Logos de clientes o medios solo si es verdad y hay permiso. Si no hay prueba honesta, no hay franja de logos.

## 5. El movimiento explica algo

El movimiento sirve para explicar estado, causa, jerarquía, continuidad o espacio.
No para demostrar que la página "se mueve". Todo debe verse completo sin JavaScript y con
`prefers-reduced-motion`. Detalle en `animaciones-y-scroll-moderno`.

## 6. Control de calidad mientras trabajas

Antes de quedarte con una decisión, repasa:

- **Sistema**: ¿usa la tipografía, color, espaciado, radio, iconos y movimiento acordados?
- **Jerarquía**: ¿se ve qué es lo más importante sin etiquetas decorativas?
- **Composición**: ¿alineación, aire y equilibrio a propósito en móvil, tablet y escritorio?
- **Tipografía**: ¿roles distintos y legibles? ¿Sin palabras huérfanas en titulares? (`text-wrap: balance`)
- **Color y material**: ¿cada degradado, brillo, borde y sombra tiene una función?
- **Verdad**: ¿fotos, textos, cifras y logos son reales?
- **Interacción**: ¿hover, foco visible, pulsado, cargando, error, éxito, desactivado?
- **Accesibilidad**: contraste AA (4,5:1 en texto normal), objetivos táctiles de al menos 44 px.

## 7. Prueba de la resta

Para cada elemento sospechoso:

1. Ponle nombre exacto: "etiqueta superior", "luz radial", "tarjeta dentro de tarjeta", "baldosa de icono", "cinta de logos".
2. Di qué trabajo hace.
3. Quítalo mentalmente. Si se entiende igual o mejor, **bórralo**.
4. Si se pierde algo real, corrige lo mínimo usando el sistema existente.
5. Solo añade algo nuevo si la página lo necesita. Nunca compenses con otro efecto.

## 8. Auditoría (cuando te pidan revisar un diseño)

No edites; diagnostica. Para cada hallazgo, cita dónde está, qué daño hace y si se quita o se corrige.
Prioridades: **P0** bloquea o engaña (prueba falsa, accesibilidad grave) · **P1** daña comprensión o confianza ·
**P2** relleno repetido o incoherencia · **P3** pulido menor. Devuelve los 5 a 8 hallazgos de más impacto
en una tabla y termina con la única corrección que más mejoraría la página.
Catálogo completo de patrones en `references/catalogo-de-patrones.md`.

## Límites

- No sustituyas una decisión con carácter por una plantilla neutra de moda.
- No impongas otra fuente, paleta o estilo si la persona ya los eligió.
- No inventes clientes, cifras, testimonios, premios, valoraciones ni pantallas de producto.
- Nunca digas que la web "ha ganado" o "es digna de Awwwards".

## Créditos

Adaptada y traducida de `no-ai-design-slop`, `audit-ai-design-slop` y `build-awwwards-quality-sites` de MengTo/Skills
(MIT, © 2026 Meng To) y de la parte visual de `landing-page-design` de elayadesign/ai-design-skills (MIT, © 2026 Elaya).
Licencias completas en `CREDITOS.md`.
