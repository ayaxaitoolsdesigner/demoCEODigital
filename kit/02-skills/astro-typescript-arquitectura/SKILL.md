---
name: astro-typescript-arquitectura
description: "Arquitectura limpia para landings con Astro y TypeScript estricto, lista para Cloudflare Workers, Vercel o Netlify. Úsala al crear, organizar o ampliar el código de una web en Astro."
---

# Arquitectura Astro + TypeScript

Objetivo: una web **rápida, tipada y fácil de ampliar** mañana (blog, más idiomas, tienda, área privada)
sin tener que rehacerla. La persona no programa: explica cada decisión en una frase.

## Pila por defecto

- **Astro** (última versión estable; comprueba la versión en npm antes de empezar) con **TypeScript estricto** (`"extends": "astro/tsconfigs/strict"`).
- **Salida estática** por defecto. Solo la ruta del formulario se ejecuta en el servidor (`export const prerender = false`).
- **Adaptador** según el proveedor: `@astrojs/cloudflare` (Cloudflare Workers con assets estáticos),
  `@astrojs/vercel` o `@astrojs/netlify`. La guía de cada uno está en la carpeta `despliegue/` del kit.
- **CSS**: CSS moderno con variables (tokens) y estilos con ámbito de componente de Astro.
  Tailwind solo si la persona lo pide o el equipo ya lo usa.
- **Validación**: `zod` importado desde `astro/zod` (no hace falta instalar nada más).
- **Variables de entorno tipadas** con `astro:env` (los secretos nunca en el código).
- **Imágenes** con `astro:assets` (`<Image>` y `<Picture>`): WebP/AVIF, tamaños responsivos, sin saltos.
- **Fuentes** alojadas en el proyecto (Fontsource o la API de fuentes de Astro).
- **Pruebas**: Vitest (unidad) en `tests/unit` y Playwright (de extremo a extremo) en `tests/e2e`. Ver `tdd-pruebas-landing`.
- **Cero JavaScript por defecto.** Solo islas donde haga falta (`client:visible`, `client:idle`).

## Estructura de carpetas (la de la plantilla del kit)

**Parte siempre de la plantilla del kit**: ya compila, tiene el formulario seguro y sus pruebas en verde.
Viene dentro de esta skill, en `assets/plantilla-astro/`. Cópiala a tu espacio de trabajo y trabaja sobre la copia
(lee antes su `README.md`). Si no la encuentras, pide a la persona que adjunte `plantilla-astro.zip` del kit.

```
mi-landing/
├── ESPECIFICACION.md          ← el contrato (SDD); se actualiza antes que el código
├── astro.config.mjs           ← adaptador según el hosting, variables de entorno, CSP
├── wrangler.jsonc             ← nombre del proyecto en Cloudflare
├── vercel.json / netlify.toml ← cabeceras y build en Vercel / Netlify
├── public/                    ← favicon, robots.txt, _headers (cabeceras de seguridad)
├── src/
│   ├── config/sitio.ts        ← TODOS los textos y datos de la web, tipados
│   ├── styles/tokens.css      ← colores, tipografías, espaciado, curvas
│   ├── styles/global.css
│   ├── components/            ← Hero, Beneficios, FormularioContacto, Pie (+ las secciones nuevas)
│   ├── layouts/Base.astro     ← <head>, SEO, estructura común
│   ├── pages/
│   │   ├── index.astro, gracias.astro, privacidad.astro, aviso-legal.astro, 404.astro
│   │   └── api/contacto.ts    ← la ÚNICA parte de servidor
│   └── lib/                   ← lógica pura, sin Astro, probada
│       ├── contacto/validacion.ts, procesar.ts, cliente.ts
│       ├── seguridad/antispam.ts, turnstile.ts
│       └── email/plantilla.ts, enviador.ts
└── tests/
    ├── unit/                  ← Vitest
    └── e2e/                   ← Playwright
```

Al añadir secciones nuevas: un componente por sección en `src/components/` (o `src/components/secciones/`
si crecen), sus textos como nuevos campos tipados en `ConfigSitio` de `src/config/sitio.ts`, y sus pruebas.
La plantilla ya trae `aviso-legal.astro` (LSSI) y `privacidad.astro`; añade `cookies.astro` solo si hay cookies no necesarias.

### Ojo con la CSP de la plantilla

La plantilla activa `security.csp` de Astro: el navegador solo ejecuta los scripts y estilos que Astro ha generado.
Por eso:

- **No uses atributos `style="..."`** en el HTML (ni `style={...}` en Astro, ni `define:vars`). Usa clases,
  atributos `data-*` y selectores CSS. Ejemplo: retrasos escalonados con `:nth-child()` en vez de `style="--i:3"`.
- **No cargues scripts ni estilos externos** sin añadir su origen a `security.csp` en `astro.config.mjs`.
- Escribe los scripts como `<script>` normales de Astro (se empaquetan), nunca `is:inline`.
- Las cabeceras que la CSP en `<meta>` no puede poner (como `frame-ancestors`) van en `public/_headers` y `vercel.json`.

## Principios (explicados para quien no programa)

1. **El contenido separado del diseño.** Todos los textos viven en `src/config/sitio.ts` con un tipo (`ConfigSitio`).
   Cambiar un titular no obliga a tocar el diseño, y TypeScript avisa si falta un texto.
2. **Un componente, una responsabilidad.** `Beneficios.astro` pinta beneficios; no sabe de formularios.
3. **Los datos entran por `Props` tipadas.** Cada componente declara `interface Props`. Nada de valores escritos a fuego.
4. **La lógica que importa, en `src/lib`, sin depender de Astro.** Así se puede probar sola (validación, envío de email).
5. **Dependencias hacia dentro.** Las páginas usan componentes; los componentes usan `lib`; `lib` no usa componentes.
6. **Puertos y adaptadores para servicios externos.** El envío de email se define como interfaz (`EnviadorEmail`)
   y Resend es solo una implementación. Cambiar de proveedor = cambiar un archivo.
7. **Tokens de diseño en un solo sitio** (`tokens.css`). Ningún color ni tamaño suelto en los componentes.
8. **Accesible y semántico desde el primer componente**, no al final.

## El formulario de contacto (contrato con la plantilla)

- Ruta: `POST /api/contacto` (`src/pages/api/contacto.ts`, `export const prerender = false`). Solo es el "enchufe":
  la lógica está en `src/lib/contacto/procesar.ts`.
- Acepta JSON y envío de formulario normal (funciona sin JavaScript).
- Campos: `nombre`, `email`, `mensaje`, `consentimiento` (casilla obligatoria), `web` (trampa para bots: vacía)
  y `cf-turnstile-response` si se usa Cloudflare Turnstile.
- Respuesta JSON `{ ok: true }` o `{ ok: false, errores: { campo: "mensaje" } }` con 400, 422, 429 o 500.
  Sin JavaScript redirige a `/gracias` o a `/?error=1`.
- Secretos en el panel del hosting (`astro:env`): `RESEND_API_KEY`, `CONTACTO_EMAIL_DESTINO`, `CONTACTO_EMAIL_REMITENTE`,
  `TURNSTILE_SECRET_KEY` (opcional). La clave **pública** de Turnstile va en `sitio.ts` (`turnstileSiteKey`).
- El email llega **al dueño**. Ni su teléfono ni su email aparecen en la página.
- Proveedor de email detrás de una interfaz (`EnviadorEmail`): cambiar Resend por otro = una función nueva.

## Ejemplo: añadir una sección con contenido tipado

```ts
// src/config/sitio.ts  (añadir al tipo y a los datos)
export interface ConfigSitio {
  // ...lo que ya hay
  preguntas: { titulo: string; lista: ReadonlyArray<{ pregunta: string; respuesta: string }> };
}

export const sitio: ConfigSitio = {
  // ...lo que ya hay
  preguntas: {
    titulo: "Lo que más me preguntan",
    lista: [{ pregunta: "{{pregunta_1}}", respuesta: "{{respuesta_1}}" }],
  },
};
```

```astro
---
// src/components/Preguntas.astro
import { sitio } from "../config/sitio";
const { titulo, lista } = sitio.preguntas;
---
<section id="preguntas" aria-labelledby="preguntas-titulo">
  <h2 id="preguntas-titulo">{titulo}</h2>
  {lista.map(({ pregunta, respuesta }) => (
    <details>
      <summary>{pregunta}</summary>
      <p>{respuesta}</p>
    </details>
  ))}
</section>
```

TypeScript avisará si falta un texto. `<details>` funciona sin JavaScript y es accesible.

## Cómo trabajar en claude.ai (sin terminal)

- Si tienes ejecución de código: crea el proyecto, instala dependencias, ejecuta `npm run check`, `npm run build`
  y `npm test`, corrige hasta que todo pase y entrega el proyecto en un **ZIP** (sin `node_modules` ni `dist`).
- Si no la tienes: dilo claramente, entrega los archivos y explica que la comprobación se hará en el despliegue.
- Nunca digas "funciona" sin haberlo comprobado.
- Explica la estructura del ZIP en 5 líneas: dónde se cambian los textos, las fotos y los colores.

## Ampliaciones futuras (menciónalas al final, no las hagas sin pedirlo)

Blog con colecciones de contenido, varios idiomas (i18n de Astro), analítica sin cookies, base de datos (Cloudflare D1),
un agente que responda a los contactos y proponga una llamada, pagos con Stripe.

## Créditos

Propia del kit. Alineada con la plantilla `plantilla-astro/` del kit.
