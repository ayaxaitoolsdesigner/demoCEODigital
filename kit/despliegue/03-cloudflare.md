# 03 · Publicar en Cloudflare con dominio propio ⭐

**Qué vas a conseguir:** tu web publicada en internet, primero en una dirección gratuita (`…workers.dev`) y después en **tu dominio**, con el formulario enviándote emails.

**Tiempo:** 30 minutos (+ espera del dominio) · **Coste:** gratis + el dominio

**Necesitas:** tu repositorio de GitHub ([01](01-github.md)) y los tres valores de Resend ([02](02-email-resend.md)).

---

## Parte 1 · Crear la cuenta

1. Entra en **dash.cloudflare.com** → **Sign up**.
2. Regístrate con tu email y verifica el correo.
3. Activa la verificación en dos pasos: icono de usuario (arriba a la derecha) → **Profile** → **Authentication**.

> 📸 **Lo que verás:** un panel con un menú lateral largo. Ignora casi todo. Solo vas a usar **Workers & Pages** (dentro de *Compute* o *Build*, según la versión del panel), **Domains**, **Turnstile** y, si compras dominio, **Domain Registration**.

---

## Parte 2 · Conectar tu repositorio y publicar

1. Menú lateral → **Workers & Pages** → botón **Create application**.
2. Elige **Import a repository** / **Continue with GitHub**.
3. Se abre una ventana de GitHub pidiendo permiso. Elige **Only select repositories**, marca tu repositorio (`web-estudio-laura`) y pulsa **Install & Authorize**.
4. De vuelta en Cloudflare, selecciona tu repositorio.
5. En **Configure your project** revisa estos campos:

| Campo | Qué poner |
|---|---|
| **Project name / Worker name** | **Exactamente** el mismo que pusiste en `wrangler.jsonc` → `"name"`. Ejemplo: `web-estudio-laura` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` (suele venir ya puesto) |
| **Root directory** | Vacío (o `/`) |
| **Branch** | `main` |

> ⚠️ **El error número 1:** si el nombre del Worker no coincide con el `"name"` de `wrangler.jsonc`, el build falla con *“The name in your Wrangler configuration file must match the name of your Worker”*. Solución: cambia uno de los dos para que sean idénticos.

6. Pulsa **Save and Deploy** / **Deploy**.
7. Verás los registros del build en directo (texto que va saliendo). Tarda 1–3 minutos. Al final aparece **Success** y una dirección tipo `https://web-estudio-laura.tu-cuenta.workers.dev`.
8. Ábrela. **¡Tu web ya está en internet!** 🎉

> 📸 **Lo que verás durante el build:** líneas como `Installing dependencies`, `astro build`, `prerendering static routes`, `Uploaded web-estudio-laura` y `Deployed`. Si alguna línea sale en rojo, ve a [08-problemas-frecuentes.md](08-problemas-frecuentes.md).

El formulario todavía no funciona: si lo pruebas, dirá *“El formulario aún no está configurado”*. Es lo esperado. Vamos a ello.

---

## Parte 3 · Configurar los secretos del formulario

1. **Workers & Pages** → tu Worker → pestaña **Settings** → **Variables and Secrets** → **Add**.
2. Añade estas cuatro variables. **En “Type” elige siempre `Secret`**, también para los emails:

| Variable name | Value |
|---|---|
| `RESEND_API_KEY` | `re_...` |
| `CONTACTO_EMAIL_DESTINO` | tu email (el de tu cuenta de Resend, de momento) |
| `CONTACTO_EMAIL_REMITENTE` | `Mi Web <onboarding@resend.dev>` |
| `TURNSTILE_SECRET_KEY` | (déjala para la parte 5) |

3. Pulsa **Deploy** / **Save**. Cloudflare publica una versión nueva con los secretos en unos segundos.

> 💡 **¿Por qué “Secret” y no “Text”?**
> 1. Un secreto no se puede volver a leer, ni siquiera desde el panel: si alguien entra en tu cuenta, no ve tu clave.
> 2. Las variables de tipo *Text* creadas en el panel **se borran en el siguiente despliegue desde GitHub**, porque `wrangler.jsonc` manda. Los secretos se mantienen.

> ⚠️ **No confundas** *Settings → Variables and Secrets* (las que usa la web cuando funciona, que son las que quieres) con *Settings → Build → Variables* (solo existen mientras se construye la web). Si pones la clave de Resend en las de Build, el formulario no la verá.

### Prueba el formulario

1. Abre tu web `…workers.dev`, rellena el formulario **con calma** (si lo envías en menos de 3 segundos, el sistema anti-bots lo descarta en silencio) y envíalo.
2. Debe aparecer *“¡Recibido! Te escribo muy pronto.”*
3. Revisa tu email (y la carpeta de spam la primera vez). Debe llegar *“Nuevo contacto en Estudio Ejemplo: [nombre]”*.
4. Pulsa **Responder** en tu correo: la respuesta va directamente a quien escribió.

**¿No llega?** Tu Worker → pestaña **Logs** (u **Observability**) → busca líneas que empiecen por `contacto:`. Te dirán qué falta. Más ayuda en [08](08-problemas-frecuentes.md).

---

## Parte 4 · Tu dominio propio

Elige tu caso:

### Caso A · Aún no tienes dominio → cómpralo en Cloudflare (recomendado)

Cloudflare vende dominios a precio de coste (sin subidas en la renovación) y lo deja todo configurado.

1. Menú → **Domain Registration** → **Register Domains**.
2. Busca el nombre. Consejos:
   - `.com` o `.es` son los más fiables. Evita extensiones raras si tu público es local.
   - Corto, fácil de dictar por teléfono, sin guiones si puedes.
3. Añádelo al carrito, rellena tus datos de contacto (obligatorio por ley; Cloudflare los oculta en el WHOIS) y paga.
4. En unos minutos aparecerá en tu lista de dominios con estado **Active**. Salta a “Conectar el dominio a tu web”.

> Algunas extensiones (como `.es`) puede que no estén disponibles en Cloudflare. En ese caso, cómprala en otro registrador (DonDominio, IONOS, Namecheap…) y sigue el caso B.

### Caso B · Ya tienes el dominio en otro sitio (GoDaddy, IONOS, DonDominio, Hostinger…)

No hace falta moverlo de registrador. Solo vas a hacer que Cloudflare gestione su DNS.

1. Cloudflare → **Domains** (o **Websites**) → **Add a domain** / **Onboard a domain**.
2. Escribe `tudominio.com` → **Continue** → plan **Free**.
3. Cloudflare escanea los registros DNS actuales y te los enseña. **Revísalos con calma:**
   - ⚠️ **Si ya usas email con ese dominio** (Google Workspace, Microsoft 365, el email de tu proveedor), tienen que aparecer los registros **MX** y los **TXT** (SPF, DKIM). Si faltan, cópialos desde el panel de tu proveedor actual **antes de continuar**. Si te los saltas, **dejarás de recibir emails**.
4. Cloudflare te da **dos nameservers**, del tipo `ana.ns.cloudflare.com` y `bob.ns.cloudflare.com`.
5. Ve al panel de tu registrador actual → tu dominio → **DNS / Nameservers / Servidores DNS** → elige “personalizados” y pon los dos de Cloudflare (quita los anteriores).
   - Si existe la opción **DNSSEC** activada en tu registrador, **desactívala antes** del cambio; la podrás reactivar después desde Cloudflare.
6. Vuelve a Cloudflare y pulsa **Check nameservers**. Tarda de 10 minutos a 24 horas. Te llegará un email cuando el dominio esté **Active**.

### Conectar el dominio a tu web

1. **Workers & Pages** → tu Worker → **Settings** → **Domains & Routes** → **Add** → **Custom domain**.
2. Escribe `www.tudominio.com` → **Add domain**.
3. Repite y añade también `tudominio.com` (sin www).
4. Cloudflare crea los registros DNS y el certificado HTTPS automáticamente. En unos minutos, `https://www.tudominio.com` muestra tu web. 🔒

**Que todo el mundo acabe en la misma dirección** (bueno para Google). Elige una versión principal, por ejemplo con `www`, y redirige la otra:
- Tu dominio → **Rules** → **Redirect Rules** → **Create rule** → plantilla **“Redirect from root to WWW”** (o similar) → **Deploy**.
- Si redirigiste el dominio sin www, en el paso anterior basta con haber añadido `www.tudominio.com` como Custom domain; mantén igualmente un registro para el dominio raíz para que la regla funcione (Cloudflare te lo indica).

### Actualiza la dirección en tu web

En GitHub, edita:
- `astro.config.mjs` → `site: 'https://www.tudominio.com'`
- `src/config/sitio.ts` → `url: 'https://www.tudominio.com'`

Al guardar (commit), Cloudflare vuelve a publicar solo.

### Ahora sí: email con tu dominio

Vuelve a [02-email-resend.md → Paso 4](02-email-resend.md#paso-4-cuando-tengas-dominio--enviar-desde-tu-propio-dominio) y verifica tu dominio en Resend. Con el dominio en Cloudflare suele ser un clic.

---

## Parte 5 (recomendada) · Turnstile, el anti-bots invisible

La plantilla ya frena a los bots básicos con una trampa invisible y un control de tiempo. Si empiezas a recibir spam, activa Turnstile:

1. Cloudflare → menú **Turnstile** (o **Application security → Turnstile**) → **Add widget**.
2. **Widget name:** `Formulario web`.
3. **Hostnames:** añade `tudominio.com`, `www.tudominio.com` y tu dirección `…workers.dev`.
4. **Widget mode:** **Managed** (casi nadie verá nada; solo los sospechosos tendrán que marcar una casilla).
5. **Create**. Obtienes dos claves:
   - **Site Key** (pública) → en GitHub, `src/config/sitio.ts` → `turnstileSiteKey: '0x4AAAA…'`.
   - **Secret Key** (secreta) → en tu Worker → **Settings → Variables and Secrets** → `TURNSTILE_SECRET_KEY`, tipo **Secret**.
6. Guarda los dos cambios. Tras el despliegue, el formulario mostrará el recuadro de Cloudflare encima del botón.

> El orden importa poco, pero si pones la Secret Key y no la Site Key, el formulario rechazará los envíos (no hay token que comprobar). Pon las dos.

---

## Parte 6 · Ajustes recomendados (5 minutos)

- **Tu dominio → SSL/TLS → Edge Certificates → Always Use HTTPS:** activado.
- **Tu dominio → Speed / Optimization:** si ves *Auto Minify* o *Rocket Loader*, desactívalos. Astro ya optimiza tu web y estas opciones pueden romper el JavaScript del formulario.
- **Notificaciones:** **Notifications** → **Add** → “Workers Builds” (o similar) para recibir un email si un despliegue falla.

---

## Cómo trabajarás a partir de ahora

1. Cambias un texto en GitHub (o se lo pides a Claude y pegas el resultado).
2. Pulsas **Commit changes**.
3. En 1–2 minutos, el cambio está publicado. Puedes verlo en tu Worker → **Deployments**.
4. ¿Algo salió mal? En **Deployments**, cada versión anterior tiene un botón para **volver a ella** (rollback) al instante.

Siguiente: [07-checklist-produccion.md](07-checklist-produccion.md)
