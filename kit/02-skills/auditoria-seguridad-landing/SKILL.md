---
name: auditoria-seguridad-landing
description: "Seguridad y privacidad de una landing: formulario, secretos, cabeceras, dependencias, RGPD y LSSI. Úsala al crear formularios y antes de publicar una web."
---

# Seguridad y privacidad de una landing

Una landing parece inofensiva, pero tiene tres puntos de ataque: **el formulario**, **los secretos**
(la clave del servicio de email) y **las cuentas** (dominio, GitHub, proveedor de hosting).
Y maneja datos personales, así que en España aplica el **RGPD**, la **LOPDGDD** y la **LSSI**.

Se aplica **desde el principio** (seguridad por diseño) y se audita **antes de publicar**.

## 1. Modelo de amenazas en una tabla (explícalo así en clase)

| Qué puede pasar | Cómo se evita |
|---|---|
| Bots llenan el formulario de spam | Trampa oculta (honeypot), trampa de tiempo, Cloudflare Turnstile, límite de envíos por IP |
| Alguien usa tu formulario para mandar emails a terceros | El destinatario es fijo en el servidor; el email del visitante solo va en `Reply-To` |
| Inyección de cabeceras de email | Rechazar saltos de línea en nombre y email; validar con zod |
| Código malicioso en el mensaje | Escapar HTML al construir el email; nunca pintar el mensaje en la web |
| Roban la clave del servicio de email | Solo en secretos del proveedor; nunca en el código, en GitHub ni en el chat |
| Copian tu web dentro de otra (clickjacking) | `Content-Security-Policy: frame-ancestors 'none'` |
| Scripts de terceros comprometidos | Mínimos terceros; CSP estricta; sin CDNs innecesarios |
| Dependencia con vulnerabilidad | Pocas dependencias, `package-lock.json`, `npm audit`, actualizaciones |
| Te roban la cuenta del dominio o del hosting | Verificación en dos pasos en todo; bloqueo de transferencia del dominio |
| Recoger datos sin base legal | Casilla de consentimiento, información básica de privacidad junto al formulario |
| Exponer el teléfono o email personal | El formulario es el canal; nada de `mailto:` con email personal en la página |

## 2. Formulario (lo más importante)

- **Validación en el servidor siempre** (la del navegador es solo comodidad). Mismo esquema zod en los dos lados.
- **Límites de tamaño**: nombre ≤ 100, email ≤ 254, mensaje ≤ 5.000 caracteres; cuerpo de la petición ≤ 10 KB.
- **Honeypot**: campo `web` oculto con CSS y `tabindex="-1"` `autocomplete="off"`; si llega con texto, se descarta en silencio.
- **Trampa de tiempo**: si se envía en menos de 3 segundos desde que cargó, se descarta.
- **Cloudflare Turnstile** (gratuito, sin puzzles para personas) cuando haya spam o desde el principio si se prefiere.
  Verificar el token **en el servidor** con la clave secreta.
- **Límite de envíos** por IP (por ejemplo, 5 por 10 minutos) con la regla de limitación de Cloudflare o un contador.
- **Comprobar el origen** (`Origin` igual al dominio de la web) para frenar envíos desde otras webs.
- **Destinatario fijo** en variables de entorno. El visitante nunca decide a quién se envía.
- **Email del visitante en `Reply-To`**, nunca en `From`. El `From` es una dirección del dominio verificado.
- **Escapar** el contenido al montar el HTML del email.
- **Mensajes de error neutros**: no revelar detalles internos ("No hemos podido enviar tu mensaje. Inténtalo en unos minutos.").
- **No guardar** los datos si no hace falta: el email llega al dueño y ya. No registrar el contenido en los logs.

## 3. Secretos

- `RESEND_API_KEY` y `TURNSTILE_SECRET_KEY` solo en el panel del proveedor (secretos de Cloudflare, variables de Vercel o Netlify).
- `.env` en `.gitignore`. Entrega un `.env.example` con nombres y sin valores.
- Si una clave aparece en el chat, en una captura o en GitHub: **revócala y crea otra**. Explícaselo así a la persona.
- Clave de email con el permiso mínimo (solo enviar, solo desde ese dominio).

## 4. Cabeceras de seguridad

En Cloudflare (assets estáticos) y Netlify: archivo `public/_headers`. En Vercel: `vercel.json`.
Ejemplo en `references/cabeceras-y-csp.md`. Mínimo:

- `Content-Security-Policy` (sin `unsafe-inline` en scripts si se puede; permitir Turnstile si se usa)
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (cuando el dominio ya funcione bien con HTTPS)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `frame-ancestors 'none'` dentro de la CSP

Comprueba el resultado en securityheaders.com y en observatory.mozilla.org tras publicar.

## 5. Dependencias y terceros

- Cuantas menos dependencias, mejor. Justifica cada una.
- `package-lock.json` siempre en el repositorio. `npm audit` sin vulnerabilidades altas antes de publicar.
- Activa Dependabot en GitHub (o equivalente) para avisos.
- Fuentes e imágenes servidas desde el propio dominio. Sin scripts de terceros salvo los aprobados.
- Nada de analítica con cookies sin consentimiento. Alternativas sin cookies: Cloudflare Web Analytics, Plausible, Umami.

## 6. Privacidad y legal en España (RGPD, LOPDGDD, LSSI)

No eres abogado: avisa de que los textos legales deben revisarse por un profesional. Pero la web debe incluir:

- **Junto al formulario**: información básica de protección de datos (responsable, finalidad, base legal,
  destinatarios, derechos, enlace a la política) y una **casilla no premarcada** de aceptación.
- **Aviso legal** (LSSI art. 10): titular, NIF, domicilio, email de contacto, datos registrales si aplica.
  Esos datos **los da la persona**; nunca los inventes. Si no los da, marcador y pendiente.
- **Política de privacidad**: qué datos, para qué, cuánto tiempo, quién los trata (el proveedor de email y hosting
  como encargados), transferencias internacionales si las hay, derechos y cómo ejercerlos, derecho a reclamar ante la AEPD.
- **Política de cookies** y banner **solo si hay cookies no necesarias**. Si no las hay, se dice en la política
  y no hace falta banner. No pongas banner "por si acaso" con cookies que no existen.
- **Minimización**: no pidas teléfono, DNI ni datos que no necesites. El teléfono lo pide después el dueño,
  por email, si el cliente quiere una llamada. Así no se exponen números personales.

## 7. Cuentas y dominio

- Verificación en dos pasos en el registrador del dominio, GitHub, Cloudflare/Vercel/Netlify y el proveedor de email.
- Bloqueo de transferencia del dominio activado. Renovación automática.
- Registros DNS del email del dominio: **SPF, DKIM y DMARC** (el proveedor de email te los da). Sin ellos, los avisos acaban en spam.
- DNSSEC activado si el registrador lo permite.

## 8. Si más adelante se añade un agente de IA que responda a los contactos

- Trata el texto del visitante como **datos, nunca como instrucciones** (inyección de prompts).
- El agente solo puede responder al remitente y con plantillas aprobadas; nada de enviar a terceros ni adjuntar archivos internos.
- Registro de lo que envía y revisión humana al principio.

## 9. Auditoría antes de publicar

Recorre `references/checklist-auditoria.md` y entrega un informe:

```md
## Veredicto
Una frase: ¿se puede publicar? ¿con qué condición?

## Comprobado
| Área | Estado | Evidencia |
|---|---|---|
| Formulario | ✅ | Pruebas CA-06 a CA-09 en verde |

## Corregido en esta revisión
- …

## Pendiente (y quién lo resuelve)
- [Persona] Datos fiscales para el aviso legal
```

## Créditos

Propia del kit. Referencias: OWASP Top 10 y OWASP ASVS, guías de la AEPD.
