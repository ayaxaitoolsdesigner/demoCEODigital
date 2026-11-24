# 02 · El servicio que envía los emails: Resend

**Qué vas a conseguir:** una “clave” (API key) que permite a tu web mandarte un email cada vez que alguien rellena el formulario.

**Tiempo:** 10 minutos · **Coste:** gratis (100 emails al día, 3.000 al mes)

---

## ¿Por qué hace falta un servicio de email?

Tu web no puede “enviar un email” por sí sola: para que un correo llegue a la bandeja de entrada y no a spam, tiene que salir de un servidor de correo con buena reputación y con tu dominio verificado. Resend es ese servidor.

### ¿Por qué Resend y no otro?

| | Resend ⭐ | Gmail / SMTP | Brevo, Mailgun, Postmark… | Email de Cloudflare |
|---|---|---|---|---|
| Plan gratis | 100/día, 3.000/mes | No sirve desde una web | Sí, con límites parecidos | Sí, pero solo a direcciones verificadas en tu dominio de Cloudflare |
| Empezar sin dominio | ✅ (te lo mandas a ti mismo) | — | Depende | ❌ Necesitas el dominio en Cloudflare |
| Funciona en Cloudflare, Vercel y Netlify | ✅ | ❌ | ✅ | Solo Cloudflare |
| Configuración | 1 clave | — | 1 clave + más pantallas | DNS de correo + configuración extra |

Resend es lo más sencillo para empezar **hoy, sin dominio**, y funciona igual en cualquier hosting. La plantilla está preparada para cambiar de proveedor sin tocar el resto del código (archivo `src/lib/email/enviador.ts`).

> **Para una landing que recibe contactos, 100 al día sobra.** Si un día recibes más, enhorabuena: el plan de pago es barato.

---

## Paso 1 · Crear la cuenta

1. Entra en **resend.com** → **Get started**.
2. Regístrate **con el mismo email donde quieres recibir los contactos**. Esto es importante (ahora verás por qué).
3. Confirma tu email.

## Paso 2 · Crear la API key

1. En el menú de la izquierda, entra en **API Keys** → **Create API key**.
2. **Name:** `landing-produccion`.
3. **Permission:** **Sending access** (solo enviar; si alguien la robara, no podría leer nada).
4. **Domain:** All domains (de momento).
5. Pulsa **Add**. Aparece una clave que empieza por `re_`.
6. **Cópiala ahora** y guárdala en tu gestor de contraseñas o en una nota segura. **Resend no te la volverá a enseñar.**

> 📸 **Lo que verás:** una ventana con la clave en un recuadro gris y un botón de copiar. Debajo, un aviso: “You can only see this key once”.

## Paso 3 · Ya tienes lo necesario para empezar

Apunta estos tres valores. Los pegarás en Cloudflare en la siguiente guía:

| Variable | Valor de momento |
|---|---|
| `RESEND_API_KEY` | `re_...` (la que acabas de copiar) |
| `CONTACTO_EMAIL_DESTINO` | El email con el que te registraste en Resend |
| `CONTACTO_EMAIL_REMITENTE` | `Mi Web <onboarding@resend.dev>` |

> ⚠️ **La limitación del modo prueba:** mientras uses `onboarding@resend.dev` como remitente, Resend **solo puede enviar emails al email de tu cuenta**. Para un formulario de contacto que te escribe a ti, ¡es justo lo que necesitas! Por eso te registraste con ese email.

---

## Paso 4 (cuando tengas dominio) · Enviar desde tu propio dominio

Con dominio propio los emails llegan como `Web Estudio Laura <web@estudiolaura.com>` y tienen mucha menos probabilidad de acabar en spam. Hazlo **después** de la guía de Cloudflare, cuando ya tengas el dominio.

1. En Resend: **Domains** → **Add domain**.
2. Escribe un **subdominio** para envíos, por ejemplo `envios.estudiolaura.com`. (Usar un subdominio protege la reputación de tu email principal.)
3. Región: **Ireland (eu-west-1)**, la más cercana si estás en Europa.
4. Resend te muestra 3–4 registros DNS (tipo **TXT** y **MX**).
5. **Si tu dominio está en Cloudflare:** Resend suele ofrecer un botón para **configurarlo automáticamente** en Cloudflare. Úsalo. Si no aparece, copia cada registro en Cloudflare → tu dominio → **DNS** → **Records** → **Add record**, con el mismo tipo, nombre y valor. En los registros que crees, la nube naranja (proxy) debe quedar **gris / DNS only**.
6. Vuelve a Resend y pulsa **Verify DNS records**. Puede tardar de minutos a unas horas.
7. Cuando ponga **Verified**, cambia en tu hosting:
   - `CONTACTO_EMAIL_REMITENTE` → `Web Estudio Laura <web@envios.estudiolaura.com>`
   - Ahora `CONTACTO_EMAIL_DESTINO` puede ser cualquier email.

---

## Buenas prácticas

- **Una API key por web.** Si cierras una web, borras su clave y las demás siguen funcionando.
- **Si crees que una clave se ha filtrado:** Resend → API Keys → borra esa clave → crea otra → cámbiala en tu hosting. Tarda 2 minutos.
- **Revisa de vez en cuando Resend → Emails:** ahí ves cada email enviado y si se entregó.

Siguiente paso: [03-cloudflare.md](03-cloudflare.md)
