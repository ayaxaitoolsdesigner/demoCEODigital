# Recetas de movimiento

Compatibles con la CSP de la plantilla del kit: nada de `style=""` en el HTML ni scripts `is:inline`.

## 0. Tokens y movimiento reducido global

```css
:root {
  --ease-base: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-entrada: 700ms;
  --dur-hover: 250ms;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 1. Revelado de secciones solo con CSS

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .revelar {
      animation: revelar linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;
    }
  }
}
@keyframes revelar { from { opacity: 0; transform: translateY(32px); } }
```

Sin soporte: todo visible. No necesita JavaScript.

## 2. Revelado con IntersectionObserver (cuando quieres que ocurra una sola vez con curva propia)

`src/scripts/revelar.ts`

```ts
export function iniciarRevelados(selector = "[data-revelar]"): void {
  const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elementos = document.querySelectorAll<HTMLElement>(selector);
  if (reducir || !("IntersectionObserver" in window)) return; // todo queda visible

  document.documentElement.classList.add("js-revelar");
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target); // solo una vez
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
  );
  elementos.forEach((el) => observador.observe(el));
}
```

```css
.js-revelar [data-revelar] { opacity: 0; transform: translateY(32px);
  transition: opacity var(--dur-entrada) var(--ease-base), transform var(--dur-entrada) var(--ease-base); }
.js-revelar [data-revelar].visible { opacity: 1; transform: none; }
```

La clase `js-revelar` la pone el script: si el script no carga, nada queda oculto.

## 3. Frase de marca que se ilumina palabra a palabra

```astro
---
interface Props { frase: string }
const { frase } = Astro.props;
const palabras = frase.split(" ");
---
<section class="frase-marca">
  <p aria-label={frase}>
    {palabras.map((p) => <span aria-hidden="true">{p} </span>)}
  </p>
</section>

<style>
  .frase-marca p { font-size: clamp(2rem, 5vw, 4rem); line-height: 1.1; max-width: 22ch; text-wrap: balance; }
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .frase-marca span {
        color: color-mix(in srgb, currentColor 28%, transparent);
        animation: iluminar linear both;
        animation-timeline: view();
        animation-range: cover 20% cover 45%;
      }
    }
  }
  @keyframes iluminar { to { color: var(--color-texto); } }
</style>
```

Cada palabra tiene su propia línea de tiempo `view()`, así que se iluminan en orden de lectura según cruzan la pantalla.

## 4. Barra de progreso de lectura

```css
.progreso { position: fixed; inset: 0 0 auto 0; height: 3px; background: var(--color-acento);
  transform-origin: left; transform: scaleX(0); z-index: 50; }
@supports (animation-timeline: scroll()) {
  .progreso { animation: avanzar linear both; animation-timeline: scroll(root); }
}
@keyframes avanzar { to { transform: scaleX(1); } }
```

## 5. Línea de pasos "cómo funciona"

```css
.pasos { position: relative; }
.pasos::before { content: ""; position: absolute; left: 12px; top: 0; bottom: 0; width: 2px;
  background: var(--color-acento); transform-origin: top; }
@supports (animation-timeline: view()) {
  .pasos::before { animation: crecer linear both; animation-timeline: view(); animation-range: cover 10% cover 70%; }
}
@keyframes crecer { from { transform: scaleY(0); } }
```

## 6. Transiciones entre páginas (View Transitions entre documentos)

En el CSS global:

```css
@view-transition { navigation: auto; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 350ms; animation-timing-function: var(--ease-base); }
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }
```

Para que un elemento "viaje" entre páginas (el logo, una foto), dale el mismo `view-transition-name` en las dos
con una clase en el CSS (no con `style=""`, que la CSP de la plantilla bloquea):
`.logo { view-transition-name: logo; }`. Nombres únicos por página.

Dentro de la misma página (abrir una pregunta frecuente, cambiar de pestaña):

```ts
function cambiar(actualizar: () => void): void {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    actualizar();
    return;
  }
  document.startViewTransition(actualizar);
}
```

## 7. Contador de una cifra real

```ts
export function contar(el: HTMLElement, hasta: number, duracion = 1200): void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = hasta.toLocaleString("es-ES"); return; }
  const inicio = performance.now();
  const paso = (ahora: number) => {
    const t = Math.min((ahora - inicio) / duracion, 1);
    const suave = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(hasta * suave).toLocaleString("es-ES");
    if (t < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}
```

Pon el número final en el HTML desde el principio (para buscadores y lectores de pantalla) y anima solo si el script carga.

## 8. Botones con respuesta física

```css
.boton { transition: transform var(--dur-hover) var(--ease-base), background-color var(--dur-hover) var(--ease-base); }
.boton:hover { transform: translateY(-1px); }
.boton:active { transform: scale(0.98); }
.boton:focus-visible { outline: 3px solid var(--color-acento); outline-offset: 3px; }
```

## 9. GSAP + ScrollTrigger en una isla de Astro (solo si hace falta)

```astro
<section class="capitulos" data-capitulos>...</section>
<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "[data-capitulos]", start: "top top", end: "+=150%", pin: true, scrub: 0.6 },
      });
      tl.from(".capitulo-1", { autoAlpha: 0, y: 40 })
        .from(".capitulo-2", { autoAlpha: 0, y: 40 })
        .from(".capitulo-3", { autoAlpha: 0, y: 40 });
      return () => tl.scrollTrigger?.kill(); // limpieza
    });
  }
</script>
```

Los `<script>` de Astro se empaquetan y solo se cargan en las páginas que los usan.
Recalcula (`ScrollTrigger.refresh()`) cuando carguen fuentes o imágenes que cambien alturas.
