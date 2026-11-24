# Cabeceras de seguridad y CSP

## Si partes de la plantilla del kit (recomendado)

Ya viene resuelto así:

- **CSP generada por Astro** (`security.csp` en `astro.config.mjs`): Astro calcula los hashes de sus scripts y estilos
  y la pone en cada página. Si añades un servicio externo (vídeo, mapa, analítica), añade **solo** su origen ahí.
- **`security.checkOrigin: true`**: rechaza envíos del formulario desde otras webs.
- **`public/_headers`** (Cloudflare y Netlify) y **`vercel.json`** (Vercel) con `X-Content-Type-Options`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS, `Cross-Origin-Opener-Policy` y `frame-ancestors 'none'`
  (esta última no se puede poner desde una etiqueta `<meta>`, por eso va como cabecera).
- Consecuencia: **nada de `style=""` en el HTML ni scripts `is:inline`** en los componentes nuevos.

Tu trabajo en la auditoría: comprobar que siguen ahí, que no se han añadido orígenes de más y que la consola no muestra errores de CSP.

## Si empiezas sin plantilla

## Cloudflare Workers (assets estáticos) y Netlify: `public/_headers`

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Notas:
- Quita `https://challenges.cloudflare.com` si no usas Turnstile.
- `style-src 'unsafe-inline'`: Astro inserta estilos en línea en algunos casos; es un riesgo bajo comparado con scripts.
  Si tu versión de Astro ofrece la opción de CSP automática con hashes (`security.csp` en la configuración), úsala
  y podrás quitar `unsafe-inline`.
- Los scripts de Astro (`<script>` en componentes) se empaquetan como archivos propios, así que `script-src 'self'` funciona.
  Los `<script is:inline>` necesitan hash o no deben usarse.
- Añade HSTS cuando el dominio definitivo ya funcione con HTTPS. Las respuestas de la ruta `/api/contacto`
  las genera el servidor: añade allí las mismas cabeceras si el proveedor no las aplica a rutas dinámicas.
- Si usas vídeos o imágenes de otro dominio, añádelo a `img-src` o `media-src` de forma explícita.

## Vercel: `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

## Cómo comprobarlas

1. Publica en la URL de pruebas.
2. Abre securityheaders.com y developer.mozilla.org/es/observatory con esa URL.
3. Abre la web con las herramientas del navegador (F12 → Consola) y comprueba que no hay errores "Refused to load...".
   Si los hay, la CSP está bloqueando algo: añade **solo** ese origen concreto.
