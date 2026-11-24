# Crea tu landing con Claude · Kit de la clase

Todo lo que necesitas para pasar de **"tengo un negocio"** a **"mi web está publicada en mi dominio"**,
hablando con Claude en [claude.ai](https://claude.ai). **No hace falta saber programar ni usar la terminal.**

En este repositorio hay dos cosas:

1. **La plantilla de la web** (Astro + TypeScript, con formulario que te llega por email). Está en la raíz: `src/`, `package.json`…
2. **El kit de la clase** (prompt maestro, 10 skills en español y guías para publicar). Está en la carpeta [`kit/`](kit/).

---

## ¿Por dónde empiezo?

### Si solo quieres el kit (skills, prompt y guías)

1. Arriba en esta página, pulsa el botón verde **Code** → **Download ZIP**.
2. Descomprime el ZIP en tu ordenador.
3. Abre [`kit/LEEME-PRIMERO.md`](kit/LEEME-PRIMERO.md) y sigue los pasos. Ahí se explica cómo subir las skills a claude.ai.

### Si quieres tu propia copia de la web para publicarla

1. Crea una cuenta gratis en [github.com](https://github.com) (si no la tienes).
2. Arriba en esta página, pulsa el botón verde **Use this template** → **Create a new repository**.
3. Ponle el nombre de tu web, sin espacios ni tildes (por ejemplo `web-estudio-laura`), marca **Private** y pulsa **Create repository**.
4. Sigue las guías de publicación, en este orden:
   [`kit/despliegue/README.md`](kit/despliegue/README.md) → GitHub → email → Cloudflare (o Vercel, o Netlify).

> La carpeta `kit/` también se copia en tu repositorio. No molesta: la web no la usa. Si quieres, puedes borrarla.

---

## Qué hay en cada carpeta

| Carpeta o archivo | Qué es |
|---|---|
| [`kit/LEEME-PRIMERO.md`](kit/LEEME-PRIMERO.md) | **Empieza aquí.** Guía de la clase paso a paso y glosario |
| [`kit/01-prompt-maestro/`](kit/01-prompt-maestro/) | La ficha de tu negocio, el prompt maestro y frases de seguimiento |
| [`kit/02-skills/`](kit/02-skills/) | Las 10 skills en español. Para subirlas a claude.ai usa los ZIP de [`kit/02-skills/zips/`](kit/02-skills/zips/) |
| [`kit/despliegue/`](kit/despliegue/) | Guías para publicar en Cloudflare, Vercel o Netlify con tu dominio |
| [`kit/03-referencias/`](kit/03-referencias/) | Repositorios originales, licencias y fuentes para seguir aprendiendo |
| [`PLANTILLA.md`](PLANTILLA.md) | Cómo está hecha la plantilla y qué archivos cambiar |
| `src/`, `public/`, `tests/`… | El código de la web. Claude trabaja sobre esto |

### Descargar una sola skill en ZIP

Entra en [`kit/02-skills/zips/`](kit/02-skills/zips/), pulsa en el ZIP que quieras y luego en el icono de **descargar** (flecha hacia abajo, a la derecha).
Súbelo a claude.ai **tal cual, sin descomprimir**.

---

## Lo que tienes que cambiar para que la web sea tuya

| Quiero cambiar… | Archivo |
|---|---|
| Textos, nombre, botones y datos legales | `src/config/sitio.ts` |
| Colores y tipografías | `src/styles/tokens.css` |
| El nombre del proyecto en Cloudflare | `wrangler.jsonc` → `"name"` |

Puedes editarlos desde GitHub con el lápiz ✏️, o pedirle a Claude que lo haga por ti.
Más detalle en [`PLANTILLA.md`](PLANTILLA.md).

## Lo que NUNCA va en este repositorio

Las **claves** (la de Resend, que empieza por `re_`, o la secreta de Turnstile) y tu **email o teléfono personal**.
Esas cosas se ponen en el panel del hosting como "secreto". Las guías te dicen dónde.
Si el repositorio es público, cualquiera puede leer lo que subas.

---

## Créditos y licencias

- La plantilla y el material propio del kit tienen licencia **MIT** (ver [`LICENSE`](LICENSE)): puedes usarlos, copiarlos y modificarlos.
- Algunas skills traducen y adaptan material con licencia MIT de
  [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills),
  [MengTo/Skills](https://github.com/MengTo/Skills) y
  [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill).
  Cada una lleva su aviso de copyright original en su archivo `CREDITOS.md`, que debe conservarse.
- El resto de repositorios de referencia **solo se enlazan**, no se copian. Detalle en
  [`kit/03-referencias/REPOS-Y-LICENCIAS.md`](kit/03-referencias/REPOS-Y-LICENCIAS.md).
