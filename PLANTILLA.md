# Plantilla de landing · Astro + TypeScript

Una landing page lista para publicar, con formulario de contacto que te llega por email.
Sin base de datos, sin servidor que mantener y sin pagar nada para empezar.

- **Astro 7** + **TypeScript estricto**: la web es HTML estático (rapidísima); solo el formulario se ejecuta en el servidor.
- **Funciona en Cloudflare, Vercel y Netlify sin tocar código.** La plantilla detecta dónde se está publicando.
- **Formulario seguro**: validación en el servidor, trampa anti-bots, control de tiempo, Cloudflare Turnstile opcional, protección contra envíos desde otras webs y Content Security Policy.
- **Probado**: 36 tests unitarios (Vitest) y 12 tests en navegador (Playwright, escritorio y móvil).

> ¿No has programado nunca? No pasa nada. Empieza por [`kit/despliegue/README.md`](kit/despliegue/README.md). Todo se hace desde el navegador.

---

## Qué tienes que cambiar (y dónde)

| Quiero cambiar… | Archivo |
|---|---|
| Textos, nombre, botones, datos legales (titular, NIF, domicilio) | `src/config/sitio.ts` |
| Colores y tipografías | `src/styles/tokens.css` |
| El nombre del proyecto en Cloudflare | `wrangler.jsonc` → `"name"` |
| Tu dominio (para SEO) | `astro.config.mjs` → `site` y `src/config/sitio.ts` → `url` |
| Diseño de una sección | `src/components/*.astro` |

**Lo que NUNCA va en el código** (va en el panel del hosting, como “variable de entorno” o “secreto”):

| Variable | Qué es | Ejemplo |
|---|---|---|
| `RESEND_API_KEY` | Clave de Resend para enviar emails | `re_AbC123…` |
| `CONTACTO_EMAIL_DESTINO` | Dónde quieres recibir los mensajes | `tu-email@gmail.com` |
| `CONTACTO_EMAIL_REMITENTE` | Quién “firma” el email | `Mi Web <onboarding@resend.dev>` |
| `TURNSTILE_SECRET_KEY` | (Opcional) clave secreta de Turnstile | `0x4AAAA…` |

La clave **pública** de Turnstile sí va en el código: `src/config/sitio.ts` → `turnstileSiteKey`.

---

## Cómo está organizado

```
src/
├── config/sitio.ts            ← TUS textos y datos
├── styles/tokens.css          ← TUS colores
├── components/                ← Hero, Beneficios, Formulario, Pie
├── layouts/Base.astro         ← <head>, SEO, estructura común
├── pages/
│   ├── index.astro            ← la landing
│   ├── gracias.astro          ← tras enviar (si el navegador no tiene JS)
│   ├── privacidad.astro       ← política de privacidad (RGPD)
│   ├── aviso-legal.astro      ← aviso legal (LSSI art. 10)
│   ├── 404.astro
│   └── api/contacto.ts        ← la ÚNICA parte de servidor
└── lib/                       ← lógica pura, sin Astro, 100% testeada
    ├── contacto/validacion.ts ← reglas de cada campo (zod)
    ├── contacto/procesar.ts   ← el flujo completo del formulario
    ├── contacto/cliente.ts    ← envío sin recargar (navegador)
    ├── seguridad/antispam.ts  ← honeypot + tiempo mínimo
    ├── seguridad/turnstile.ts ← verificación de Cloudflare Turnstile
    └── email/                 ← plantilla del email + envío con Resend
tests/
├── unit/                      ← Vitest
└── e2e/                       ← Playwright
```

### Por qué así (arquitectura en una frase)

La lógica del formulario (`src/lib`) no sabe nada de Astro ni del hosting: recibe datos y devuelve una respuesta.
`api/contacto.ts` es solo el “enchufe”. Por eso se puede probar sin internet, cambiar de hosting sin reescribir nada
y cambiar Resend por otro proveedor escribiendo una sola función (`EnviadorEmail`).

### Qué pasa cuando alguien envía el formulario

1. **Validación** de nombre, email, mensaje y consentimiento (los errores salen al lado de cada campo).
2. **Anti-bots**: si el campo invisible “web” viene relleno o se envió en menos de 3 segundos, respondemos “ok” pero no enviamos nada.
3. **Turnstile** (si lo activaste): Cloudflare confirma que es una persona.
4. **Configuración**: si falta alguna variable de entorno, se avisa con un mensaje amable y se registra en los logs.
5. **Envío** a tu email con Resend. Al pulsar “Responder” contestas directamente al cliente.

---

## Comandos (solo si usas terminal; los alumnos no los necesitan)

```bash
npm install
npm run dev         # web en local: http://localhost:4321
npm run check       # comprueba los tipos de TypeScript
npm test            # tests unitarios
npm run test:e2e    # tests en navegador (construye y arranca la web)
npm run verificar   # tipos + tests + build: pásalo antes de publicar
npm run deploy      # publica en Cloudflare desde tu ordenador
```

Requisitos: Node.js 22.12 o superior. Para trabajar en local con el formulario, copia `.dev.vars.example` como `.dev.vars` y rellénalo.

---

## Seguridad incluida

- Validación en servidor con límites de longitud y sin saltos de línea en cabeceras (evita inyección de emails).
- HTML del email escapado (nadie puede colar código en tu bandeja).
- `checkOrigin` de Astro: rechaza envíos desde otras webs (CSRF).
- Content Security Policy con hashes generados por Astro + cabeceras de seguridad (`public/_headers`, `vercel.json`).
- Límite de 16 KB por petición.
- Secretos tipados con `astro:env` y fuera del repositorio (`.gitignore` cubre `.env` y `.dev.vars`).
- Errores genéricos para el visitante; el detalle va a los logs del hosting.

### Auditoría de dependencias (noviembre 2026)

`npm audit` muestra avisos (3 altos, 10 moderados) en herramientas **de construcción** de los adaptadores de Vercel y Netlify
(`path-to-regexp`, `glob`, `minimatch`…). Se ejecutan solo durante el build, con datos de la propia plantilla, y **no llegan a la web publicada**.
El adaptador de Cloudflare no tiene avisos. No uses `npm audit fix --force`: bajaría el adaptador de Vercel a una versión incompatible.
Vuelve a mirarlo de vez en cuando y actualiza cuando Astro publique versiones corregidas.

Licencia: MIT (ver [`LICENSE`](LICENSE)). Úsala como quieras para tus proyectos.
