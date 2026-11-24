# Sistema visual mínimo (valores por defecto)

Estos valores son el punto de partida cuando la persona no tiene marca definida.
**Lo que diga la persona manda.** Presenta el sistema en una tabla y pide aprobación antes de construir.

## Tipografía

- **Una familia principal** (dos como máximo: una para titulares con carácter y otra de lectura).
- Elige por el negocio, no por costumbre. Propón 3 opciones con una línea de por qué:

| Carácter | Opciones gratuitas (Google Fonts o Fontsource) |
|---|---|
| Moderna y neutra | Geist, Manrope, Plus Jakarta Sans, Onest |
| Con oficio, cálida | Fraunces, Literata, Newsreader, Instrument Serif (solo titulares) |
| Técnica | Space Grotesk, IBM Plex Sans, JetBrains Mono (solo datos) |
| Con personalidad | Bricolage Grotesque, Syne, Unbounded (solo titulares) |
| Elegante | Cormorant Garamond, Playfair Display (titulares) + una sans de lectura |

- Evita usar Inter, Roboto, Arial u Open Sans **por reflejo**: son las que salen por defecto. Si encajan, que sea decisión.
- Carga las fuentes **alojadas en el propio proyecto** (Fontsource o la API de fuentes de Astro), no desde Google en tiempo real:
  es más rápido y evita enviar la IP del visitante a terceros (RGPD).
- Pesos: regular, medio, seminegrita. Evita el 900 salvo para un titular con intención.
- `text-wrap: balance` en titulares y `text-wrap: pretty` en párrafos para evitar huérfanas.
- Medida de línea: 55 a 75 caracteres (`max-width: 65ch`).

### Escala de tamaños (fluida con `clamp`)

| Rol | Móvil → escritorio |
|---|---|
| Titular hero (h1) | 40 px → 72 a 96 px |
| Titular de sección (h2) | 30 px → 48 px |
| Subtítulo (h3) | 22 px → 30 px |
| Cuerpo grande | 18 px → 20 px |
| Cuerpo | 16 px → 18 px |
| Pie de foto, ayuda | 14 px |

Nunca menos de 16 px en texto de lectura.

## Espaciado

Una sola escala basada en 4 px: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.
Ningún valor fuera de la escala. Secciones con respiración distinta según su contenido (no todas iguales).
Margen lateral en móvil: mínimo 16 a 20 px.

## Radios

Elige una familia y mantenla: recto (0 a 2 px), suave (6 a 8 px) o redondeado (12 a 16 px).
Radio interior = radio exterior − separación, cuando la separación es menor de 32 px.

## Color

Define funciones, no solo colores:

| Token | Función |
|---|---|
| `--color-fondo` | Fondo principal |
| `--color-superficie` | Fondos de bloques destacados |
| `--color-texto` | Texto principal (contraste ≥ 7:1 si se puede) |
| `--color-texto-suave` | Texto secundario (≥ 4,5:1) |
| `--color-acento` | Botón principal y enlaces. Uno solo |
| `--color-borde` | Separadores |
| `--color-exito`, `--color-error` | Estados |

- Un acento. Si la marca tiene dos colores, uno manda y el otro acompaña.
- Comprueba contraste con el acento sobre fondo y el texto sobre acento.
- Fondos planos por defecto. Un degradado solo si tiene motivo (luz real, marca).
- Si hay modo oscuro, es un sistema completo, no negro + neón.

## Sombras y bordes

Un solo modelo de elevación (2 o 3 niveles como mucho). O borde o sombra para marcar un borde, no los dos.
Bordes en todo el contorno o en ninguno.

## Movimiento (resumen)

- Curva base: `cubic-bezier(0.22, 1, 0.36, 1)`; 500 a 700 ms para entradas, 200 a 300 ms para hover.
- Solo `transform` y `opacity`.
- `prefers-reduced-motion`: estado final directo.
Detalle en `animaciones-y-scroll-moderno`.

## Imprescindibles de entrega

Enlace "saltar al contenido", foco visible, `alt` en cada imagen con significado, HTML semántico
(`header`, `nav`, `main`, `section`, `footer`), favicon, título y descripción, imagen para compartir (og:image),
página 404 propia, aviso legal, privacidad y cookies en el pie, comprobación a 390 px sin scroll horizontal.

Basado en la parte B de `landing-page-design` de elayadesign/ai-design-skills (MIT, © 2026 Elaya),
reescrito y ampliado para el kit.
