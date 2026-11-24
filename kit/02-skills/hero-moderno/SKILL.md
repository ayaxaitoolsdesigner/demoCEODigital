---
name: hero-moderno
description: "Catálogo de 12 tipos de hero (primera pantalla) modernos con cuándo usar cada uno, qué necesitan y cómo construirlos en Astro. Úsala al diseñar o cambiar la primera pantalla de una web."
---

# Hero moderno

El hero es la primera pantalla. En 3 segundos tiene que decir **qué es, para quién y qué hago ahora**,
y a la vez ser el momento más cuidado de toda la web.

## Cómo trabajar con la persona

1. Antes de proponer, confirma: titular aprobado, acción principal, qué material visual existe
   (fotos propias, vídeo, producto, nada) y cuánto movimiento quiere (nada, sutil, con personalidad, espectacular).
2. Propón **tres opciones del catálogo** que encajen, distintas entre sí. Para cada una:
   nombre, por qué encaja con este negocio, cómo se mueve, qué necesita y su coste (rendimiento y trabajo).
3. Recomienda una y explica por qué en una frase. Deja elegir.
4. Haz una maqueta rápida en un artefacto HTML para que la vea antes de construirla en Astro.

## Reglas de cualquier hero

- Titular, subtítulo y botón **legibles y usables desde el primer fotograma**, aunque la animación no haya terminado
  o el JavaScript falle. Nada empieza con `opacity: 0` sin un plan B.
- Un foco. Un botón principal (como mucho un enlace secundario discreto).
- Funciona a 390 px de ancho: el botón principal visible sin hacer scroll.
- La imagen principal **no** lleva `loading="lazy"`; lleva `fetchpriority="high"` y dimensiones fijas para evitar saltos.
- Con `prefers-reduced-motion: reduce` se ve el estado final, sin movimiento.
- Animaciones solo con `transform`, `opacity`, `clip-path` o `filter` ligero.

## El catálogo

| # | Hero | Encaja con | Necesita | Movimiento | Coste |
|---|---|---|---|---|---|
| 1 | **Tipográfico editorial**: titular enorme que entra palabra a palabra tras una máscara | Marcas personales, consultoras, estudios creativos | Un buen titular, nada más | Entrada única al cargar | Bajo |
| 2 | **Foto a sangre**: una foto real a pantalla completa con el texto en zona segura | Locales, hostelería, turismo, inmobiliaria | Una foto excelente horizontal y otra vertical para móvil | Ligero zoom de salida al cargar | Bajo |
| 3 | **Vídeo en bucle**: vídeo corto, mudo, de fondo | Eventos, gimnasios, experiencias, oficios | Vídeo de 6 a 12 s, menos de 3 MB, y su póster | Vídeo; se pausa con movimiento reducido | Medio |
| 4 | **Partido**: texto a un lado, imagen al otro que se revela con un recorte | Servicios profesionales, salud, formación | Una foto vertical buena | Revelado con `clip-path` | Bajo |
| 5 | **Producto protagonista**: el producto gira, escala o cambia de ángulo al hacer scroll | Producto físico, ecommerce de un solo producto | Fotos del producto sin fondo o varios ángulos | Ligado al scroll | Medio |
| 6 | **Imagen que se encoge**: empieza a pantalla completa y al bajar se convierte en tarjeta | Arquitectura, moda, portfolios, hoteles | Una foto o vídeo muy potente | Ligado al scroll (CSS) | Bajo |
| 7 | **Collage en capas**: 3 a 5 fotos que se mueven a velocidades distintas | Comercio local, eventos, comunidades | 4 o 5 fotos coherentes | Parallax suave | Medio |
| 8 | **Cinta tipográfica**: una frase de marca enorme que se desplaza lentamente | Marcas con frase propia, moda, música | Una frase con carácter (no una lista de logos) | Desplazamiento continuo, pausable | Bajo |
| 9 | **Secuencia de fotogramas**: el scroll "reproduce" un vídeo, como en las webs de Apple | Producto premium, lanzamientos | 60 a 150 fotogramas optimizados | Ligado al scroll (canvas) | Alto |
| 10 | **Escena 3D**: objeto o espacio en WebGL que responde al ratón | Solo tecnología, videojuegos, hardware | Modelo 3D o diseño de escena; imagen de reserva | Continuo, se pausa fuera de pantalla | Alto |
| 11 | **Foco con el cursor**: una luz o lupa que revela una segunda capa al mover el ratón | Creativos, fotógrafos, marcas con un "antes y después" | Dos capas de imagen | Sigue al puntero; en móvil, estático | Medio |
| 12 | **Conversión directa**: titular + formulario corto en la misma pantalla | Campañas, lista de espera, descargas, reservas | Oferta muy clara | Casi nada | Muy bajo |

Recomendación para principiantes: 1, 2, 4, 6 o 12. Son vistosos, rápidos y difíciles de estropear.
Los 9 y 10 solo si la persona lo pide y entiende el coste.

Recetas de código en `references/recetas-hero.md`.

## Variantes que dan carácter sin coste

- Titular con una palabra destacada en el color de acento o en la tipografía de titulares.
- Contador o dato real junto al botón ("Agenda abierta para enero").
- Foto con un recorte con intención (arco, círculo, esquina) que se repite luego en la web.
- Navegación flotante, compacta y centrada, con fondo translúcido y desenfoque.

## Lo que no se hace

- Degradado morado con luces difusas y una píldora "✨ Nuevo".
- Panel de control falso o maqueta de móvil vacía.
- Titular que entra letra a letra durante 3 segundos mientras el botón espera.
- Cursor personalizado que esconde el cursor real.
- Carrusel automático en el hero.

## Créditos

Catálogo propio del kit. Ideas de composición y movimiento inspiradas en las skills de web-design de
MengTo/Skills (MIT, © 2026 Meng To) y en la colección de referencia Z4YT0N/awwwards-collection (solo inspiración;
ese repositorio no declara licencia, por eso no se copia nada de él).
