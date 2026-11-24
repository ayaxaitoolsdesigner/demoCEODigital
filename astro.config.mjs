// @ts-check
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import vercel from '@astrojs/vercel';
import netlify from '@astrojs/netlify';

/**
 * Elige el "adaptador" según dónde se esté construyendo la web.
 * Vercel y Netlify ponen sus propias variables durante el build,
 * así que la misma plantilla sirve para los tres sin tocar nada.
 * Puedes forzarlo con la variable DESPLIEGUE=cloudflare|vercel|netlify.
 */
function elegirAdaptador() {
  const destino =
    process.env.DESPLIEGUE ??
    (process.env.VERCEL ? 'vercel' : process.env.NETLIFY ? 'netlify' : 'cloudflare');

  if (destino === 'vercel') return vercel();
  if (destino === 'netlify') return netlify();
  // Cloudflare: imágenes optimizadas al construir (sin servicios extra de pago).
  return cloudflare({ imageService: 'compile' });
}

export default defineConfig({
  // Cámbialo por tu dominio cuando lo tengas (también en src/config/sitio.ts).
  site: 'https://www.ejemplo.com',
  // Por defecto todo es HTML estático. Solo /api/contacto se ejecuta en el servidor.
  output: 'static',
  adapter: elegirAdaptador(),
  // No usamos sesiones: así Cloudflare no crea una base de datos KV que no necesitas.
  session: false,

  // Variables de entorno tipadas. Se rellenan en el panel del hosting, NUNCA en el código.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACTO_EMAIL_DESTINO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACTO_EMAIL_REMITENTE: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  security: {
    // Rechaza envíos del formulario que vengan desde otras webs (protección CSRF).
    checkOrigin: true,
    // Content Security Policy: el navegador solo ejecuta los scripts que Astro ha generado.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        'frame-src https://challenges.cloudflare.com',
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://challenges.cloudflare.com'],
      },
    },
  },
});
