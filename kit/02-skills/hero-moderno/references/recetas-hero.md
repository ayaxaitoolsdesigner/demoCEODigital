# Recetas de hero en Astro + TypeScript

Todas siguen el mismo patrón: **HTML completo y visible primero**, la animación se añade encima.

**Compatibles con la CSP de la plantilla del kit**: sin atributos `style=""` en el HTML (Astro los bloquearía).
Las variaciones se hacen con clases, `data-*` y `:nth-child()`. Cambiar estilos desde TypeScript con
`elemento.style.setProperty(...)` sí está permitido.
Los ejemplos usan variables CSS del sistema (`--color-acento`, `--ease-base`, etc.).
Define en tu CSS global:

```css
:root {
  --ease-base: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-entrada: 700ms;
}
```

---

## 1. Tipográfico editorial (entrada palabra a palabra con máscara)

`src/components/hero/HeroTipografico.astro`

```astro
---
interface Props {
  titular: string;
  subtitulo: string;
  textoBoton: string;
  hrefBoton: string;
}
const { titular, subtitulo, textoBoton, hrefBoton } = Astro.props;
const palabras = titular.split(" ");
---
<section class="hero" aria-labelledby="hero-titulo">
  <h1 id="hero-titulo" aria-label={titular}>
    {palabras.map((p) => (
      <span class="mascara" aria-hidden="true">
        <span class="palabra">{p}</span>
      </span>
    ))}
  </h1>
  <p class="subtitulo">{subtitulo}</p>
  <a class="boton" href={hrefBoton}>{textoBoton}</a>
</section>

<style>
  .hero { min-height: 90svh; display: grid; align-content: center; gap: 1.5rem; padding-inline: clamp(1.25rem, 5vw, 4rem); }
  h1 { font-size: clamp(2.5rem, 8vw, 6rem); line-height: 1; text-wrap: balance; max-width: 16ch; }
  .mascara { display: inline-block; overflow: clip; vertical-align: top; padding-bottom: 0.08em; margin-right: 0.25em; }
  .palabra { display: inline-block; }

  @media (prefers-reduced-motion: no-preference) {
    .palabra { animation: subir var(--dur-entrada) var(--ease-base) both; }
    .mascara:nth-child(2) .palabra { animation-delay: 60ms; }
    .mascara:nth-child(3) .palabra { animation-delay: 120ms; }
    .mascara:nth-child(4) .palabra { animation-delay: 180ms; }
    .mascara:nth-child(5) .palabra { animation-delay: 240ms; }
    .mascara:nth-child(6) .palabra { animation-delay: 300ms; }
    .mascara:nth-child(7) .palabra { animation-delay: 360ms; }
    .mascara:nth-child(n+8) .palabra { animation-delay: 420ms; }
    .subtitulo, .boton { animation: aparecer 600ms var(--ease-base) both 400ms; }
  }
  @keyframes subir { from { transform: translateY(105%); } }
  @keyframes aparecer { from { opacity: 0; transform: translateY(12px); } }
</style>
```

Por qué así: el `aria-label` del `h1` lee la frase entera; las palabras partidas se ocultan a lectores de pantalla.
Sin JavaScript y sin movimiento, el texto está ahí desde el principio.
Limita el retraso total a unos 500 ms aunque el titular sea largo.

---

## 2. Foto a sangre con zona segura

```astro
---
import { Image } from "astro:assets";
import fotoHero from "../../assets/hero.jpg";
---
<section class="hero-foto">
  <Image src={fotoHero} alt="Describe lo que se ve, no 'imagen hero'" class="fondo"
         widths={[640, 1024, 1600, 2400]} sizes="100vw" loading="eager" fetchpriority="high" />
  <div class="contenido">
    <slot />
  </div>
</section>

<style>
  .hero-foto { position: relative; min-height: 100svh; display: grid; align-items: end; isolation: isolate; }
  .fondo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
  .hero-foto::after { content: ""; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(to top, rgb(0 0 0 / .55), transparent 60%); } /* da contraste al texto */
  .contenido { padding: clamp(1.25rem, 5vw, 4rem); color: white; max-width: 40rem; }
  @media (prefers-reduced-motion: no-preference) {
    .fondo { animation: alejar 1600ms var(--ease-base) both; }
  }
  @keyframes alejar { from { transform: scale(1.08); } }
</style>
```

Para móvil usa `<Picture>` de `astro:assets` con una foto vertical distinta (`media="(max-width: 700px)"`).

---

## 3. Vídeo en bucle

```astro
<video class="fondo" autoplay muted loop playsinline preload="metadata"
       poster="/hero/poster.webp" aria-hidden="true">
  <source src="/hero/bucle.webm" type="video/webm" />
  <source src="/hero/bucle.mp4" type="video/mp4" />
</video>
<button class="pausa" type="button" aria-pressed="false">Pausar vídeo</button>

<script>
  const video = document.querySelector<HTMLVideoElement>(".fondo");
  const boton = document.querySelector<HTMLButtonElement>(".pausa");
  const reducir = matchMedia("(prefers-reduced-motion: reduce)");
  if (video && reducir.matches) video.pause();
  boton?.addEventListener("click", () => {
    if (!video) return;
    video.paused ? video.play() : video.pause();
    boton.setAttribute("aria-pressed", String(video.paused));
    boton.textContent = video.paused ? "Reproducir vídeo" : "Pausar vídeo";
  });
</script>
```

Vídeo: 6 a 12 s, 1080p como máximo, sin audio, menos de 3 MB. Un botón de pausa visible es obligatorio
si el vídeo dura más de 5 s (WCAG 2.2.2).

---

## 4. Partido con revelado por recorte

```css
.imagen-revelada { clip-path: inset(0 0 0 0); }
@media (prefers-reduced-motion: no-preference) {
  .imagen-revelada { animation: revelar 1100ms var(--ease-base) both 150ms; }
}
@keyframes revelar { from { clip-path: inset(100% 0 0 0); } }
```

En móvil, la imagen va **debajo** del botón principal, no encima.

---

## 5 y 6. Ligado al scroll solo con CSS (animaciones guiadas por scroll)

Imagen que se encoge y se redondea al bajar:

```css
.hero-encoge { height: 180vh; view-timeline-name: --hero; }   /* el alto extra es el recorrido */
.hero-encoge .marco { position: sticky; top: 0; height: 100svh; display: grid; place-items: center; }
.hero-encoge img { width: 100%; height: 100%; object-fit: cover; }

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero-encoge img {
      animation: encoger linear both;
      animation-timeline: --hero;               /* la línea de tiempo es la sección, no la imagen fija */
      animation-range: contain 0% contain 100%; /* mientras la sección cubre la pantalla */
    }
  }
}
@keyframes encoger { to { transform: scale(0.72); border-radius: 24px; } }
```

Sin soporte, la imagen se queda a pantalla completa y todo funciona. El navegador mueve la animación
fuera del hilo principal: va fluido incluso en móviles modestos.

Producto que gira con el scroll: la misma técnica con `rotate` y `scale` sobre una imagen del producto sin fondo,
o cambiando entre 3 o 4 fotos con `opacity` en rangos distintos (`animation-range: cover 0% cover 33%`, etc.).

---

## 7. Collage en capas (parallax suave con CSS)

```css
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .capa { animation: flotar linear both; animation-timeline: scroll(root); animation-range: 0 100vh; }
    .capa.lenta { --d: -40px; } .capa.media { --d: -90px; } .capa.rapida { --d: -160px; }
  }
}
@keyframes flotar { to { transform: translateY(var(--d)); } }
```

Desplazamientos pequeños. Si marea, es demasiado.

---

## 8. Cinta tipográfica

```css
.cinta { overflow: clip; white-space: nowrap; }
.cinta__pista { display: inline-flex; gap: 4rem; }
@media (prefers-reduced-motion: no-preference) {
  .cinta__pista { animation: desplazar 40s linear infinite; }
  .cinta:hover .cinta__pista, .cinta:focus-within .cinta__pista { animation-play-state: paused; }
}
@keyframes desplazar { to { transform: translateX(-50%); } }
```

Duplica el contenido dentro de la pista (el segundo con `aria-hidden="true"`). Lenta. Una frase de marca, no logos inventados.

---

## 9. Secuencia de fotogramas (avanzado)

Canvas + fotogramas WebP numerados; el scroll elige el fotograma. Reglas:
pre-carga progresiva, `requestAnimationFrame`, máximo 150 fotogramas, 1280 px de ancho,
imagen fija con movimiento reducido. Pide confirmación: pesa varios MB y lleva trabajo.
Para un vídeo de "vuelo" generado por IA, ver el repositorio oso95/scroll-world (necesita herramientas de terminal).

---

## 10. Escena 3D (avanzado)

Three.js como isla de Astro (`client:visible`). Limita `devicePixelRatio` a 1,5, pausa el render fuera de pantalla
(`IntersectionObserver`) y con la pestaña oculta (`visibilitychange`), libera memoria al salir.
Siempre una imagen fija de reserva si no hay WebGL o hay movimiento reducido. Solo para negocios tecnológicos.

---

## 11. Foco con el cursor

```css
.foco { --x: 50%; --y: 50%; }
.foco .capa-oculta { mask-image: radial-gradient(circle 160px at var(--x) var(--y), #000 60%, transparent 100%); }
@media (hover: none), (prefers-reduced-motion: reduce) {
  .foco .capa-oculta { mask-image: none; opacity: 0; } /* en táctil se muestra la capa principal */
}
```

```ts
const foco = document.querySelector<HTMLElement>(".foco");
let pendiente = false;
foco?.addEventListener("pointermove", (e) => {
  if (pendiente) return;
  pendiente = true;
  requestAnimationFrame(() => {
    const r = foco.getBoundingClientRect();
    foco.style.setProperty("--x", `${e.clientX - r.left}px`);
    foco.style.setProperty("--y", `${e.clientY - r.top}px`);
    pendiente = false;
  });
});
```

---

## 12. Conversión directa

Titular + 2 o 3 campos (nombre, email, consentimiento) + botón. Usa el mismo endpoint `/api/contacto`
de la plantilla. Validación en el navegador y en el servidor. Mensaje de éxito en la misma pantalla.
