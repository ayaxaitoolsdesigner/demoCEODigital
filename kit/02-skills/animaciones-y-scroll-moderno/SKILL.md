---
name: animaciones-y-scroll-moderno
description: "Animaciones, transiciones y scroll modernos (CSS scroll-driven, View Transitions, GSAP opcional), accesibles y rápidos. Úsala al añadir movimiento a una web."
---

# Animaciones y scroll modernos

El movimiento tiene que **explicar algo**: qué ha cambiado, qué va después, qué es más importante,
dónde estamos. Si solo está para "parecer caro", sobra.

## Antes de animar, pregunta

1. ¿Cuánto movimiento quiere la persona? (nada, sutil, con personalidad, espectacular)
2. ¿Hay algún efecto concreto que le guste de una web de referencia? Pide captura o vídeo corto y que diga **cuál**.
3. ¿Su público usa sobre todo el móvil? (casi siempre sí: entonces menos efectos y más ligeros)

Propón un **guion de movimiento** de 4 a 8 líneas (qué se mueve, cuándo y por qué) y pide aprobación.

## Orden de preferencia de herramientas

Usa la más sencilla que consiga el efecto:

1. **CSS puro**: transiciones de hover y foco, `@keyframes` de entrada.
2. **Animaciones guiadas por scroll en CSS** (`animation-timeline: view()` y `scroll()`):
   revelados, parallax, barras de progreso, imágenes que se encogen. Sin JavaScript y fuera del hilo principal.
   Envuélvelas siempre en `@supports (animation-timeline: scroll())`: donde no haya soporte, se ve el estado final.
3. **View Transitions**: transiciones entre páginas o estados. Entre páginas de Astro basta con CSS:
   `@view-transition { navigation: auto; }`. Para transiciones dentro de la misma página, `document.startViewTransition()`.
   Opcional: el `<ClientRouter />` de Astro si se quiere navegación tipo aplicación.
4. **`IntersectionObserver`** (unas líneas de TypeScript) para disparar clases al entrar en pantalla
   cuando haga falta más control que el CSS.
5. **GSAP + ScrollTrigger** solo para coreografías complejas (secciones fijadas con varias fases,
   líneas de tiempo largas). GSAP es gratuito, incluidos sus plugins, pero su licencia no es MIT: revisa sus condiciones.
6. **Scroll suave (Lenis)** solo si la persona lo pide expresamente. Uno solo, nunca dos motores de scroll.
   Comprueba teclado, anclas y movimiento reducido.
7. **WebGL / Three.js** solo para negocios tecnológicos y con imagen de reserva.

Comprueba la compatibilidad actual en caniuse.com o en el estado "Baseline" de MDN antes de prometer un efecto.

## Reglas que no se negocian

- **Todo se ve completo sin animación.** El contenido nunca depende de que un script arranque.
  Si algo empieza oculto, que lo oculte una clase que pone el propio script (`.js-listo .revelar { opacity: 0 }`).
- **`prefers-reduced-motion: reduce`** = estado final directo, no una animación más corta.
- **Solo `transform`, `opacity`** (y `clip-path`, `filter` ligero). Nunca animar `width`, `height`, `top`, `margin`.
- **Nunca** `window.addEventListener("scroll", ...)` sin `requestAnimationFrame` o `passive: true`.
  Mejor aún: CSS guiado por scroll o `IntersectionObserver`.
- **Curva base** `cubic-bezier(0.22, 1, 0.36, 1)`. Nada de `linear` en entradas ni rebotes en interfaz.
  Entradas de 500 a 800 ms, hover de 200 a 300 ms.
- **Cada cosa se revela una vez.** No repetir al volver a subir.
- **Escalonado contenido**: 40 a 80 ms entre elementos, máximo unos 500 ms en total.
- **Nada que bloquee**: el botón se puede pulsar desde el primer momento.
- **Vídeos y bucles de más de 5 s** con botón de pausa.
- **Secciones fijadas (sticky)** cortas: que no atrapen al usuario más de 1 a 2 pantallas de scroll.

## Momentos recomendados para una landing

Elige 2 o 3, no todos:

| Momento | Dónde | Técnica |
|---|---|---|
| Entrada del hero | Primera pantalla | `@keyframes` al cargar, palabras con máscara |
| Frase de marca que se ilumina palabra a palabra | Mitad de la página | CSS `view()` o `IntersectionObserver` por palabra |
| Revelado suave de secciones | Todas | CSS `view()` con `animation-range: entry` |
| Imagen que se encoge o se expande | Tras el hero | CSS `view()` + `position: sticky` |
| Pasos "cómo funciona" con línea de progreso | Sección de pasos | `scroll()` o `view()` sobre una línea |
| Contadores de cifras reales | Prueba social | `IntersectionObserver` + `requestAnimationFrame` |
| Transición entre páginas | Aviso legal, gracias | `@view-transition { navigation: auto; }` |
| Botones con respuesta física | Toda la web | `:hover` y `:active { transform: scale(.98) }` |

Recetas listas en `references/recetas-movimiento.md`.

## Rendimiento

- Objetivo en móvil: LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- Nada animándose fuera de pantalla. Pausa bucles y canvas con `IntersectionObserver` y `visibilitychange`.
- `will-change` solo durante la animación y en pocos elementos.
- Librerías cargadas solo donde se usan (islas de Astro con `client:visible`).

## Créditos

Basada en `animation-systems`, `animation-on-scroll`, `masked-reveal`, `cinematic-gsap-lenis-motion-system`
y `scroll-progress-timeline` de MengTo/Skills (MIT, © 2026 Meng To) y en la sección de movimiento de
`landing-page-design` de elayadesign/ai-design-skills (MIT, © 2026 Elaya). Reescrita para CSS moderno y Astro.
Licencias completas en `CREDITOS.md`.
