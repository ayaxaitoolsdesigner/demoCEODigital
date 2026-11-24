# 08 · Problemas frecuentes (y cómo arreglarlos)

> **El truco universal:** copia el mensaje de error completo (las líneas en rojo del build o de los logs) y pégalo en claude.ai con esta frase:
> *“Estoy publicando una web Astro con la plantilla de la clase en [Cloudflare/Vercel/Netlify]. Este es el error. Explícamelo sin tecnicismos y dime qué tengo que cambiar y dónde, paso a paso. No supongas nada: pregúntame lo que necesites.”*

---

## Al publicar (build)

### “The name in your Wrangler configuration file must match the name of your Worker” (Cloudflare)
El nombre del Worker en el panel y el `"name"` de `wrangler.jsonc` no coinciden. Edita `wrangler.jsonc` en GitHub y pon exactamente el nombre que ves en Cloudflare (o al revés).

### “package.json and package-lock.json are out of sync” / falla `npm ci`
Falta `package-lock.json` o no corresponde al `package.json`. Vuelve a subir los dos archivos **del ZIP original** (no los edites a mano). La plantilla incluye `"packageManager": "npm@10.9.9"` para evitar este error en Cloudflare.

### “Node.js version … is not supported by Astro” / “requires Node >=22.12”
El hosting está usando una versión antigua de Node.
- **Cloudflare:** Worker → Settings → Build → **Build variables** → añade `NODE_VERSION` = `22`.
- **Vercel:** Settings → General → **Node.js Version** → 22.x o superior.
- **Netlify:** ya está fijado en `netlify.toml` (`NODE_VERSION = "22"`).

### “Missing entry-point” (Cloudflare)
Cloudflare no encuentra `wrangler.jsonc`. Comprueba que está en la raíz del repositorio (al mismo nivel que `package.json`) y que **Root directory** está vacío en Settings → Build. Pasa mucho si al subir el ZIP arrastraste la carpeta en vez de su contenido.

### “Expected …” / “Unexpected token” en `sitio.ts`
Has borrado una comilla, una coma o una llave al editar. Abre el archivo en GitHub → pestaña **History** → compara con la versión anterior. O pega el archivo en claude.ai: *“Arregla solo los errores de sintaxis de este archivo, sin cambiar los textos.”*

### El build termina bien pero la web sale en blanco o con error 404
- Espera 1 minuto y recarga con `Ctrl+F5` / `Cmd+Mayús+R`.
- Comprueba que estás abriendo la dirección correcta (la del último despliegue).
- Cloudflare: revisa que el **Deploy command** sea `npx wrangler deploy`.

---

## El formulario

### Dice “El formulario aún no está configurado”
Falta alguna de las tres variables (`RESEND_API_KEY`, `CONTACTO_EMAIL_DESTINO`, `CONTACTO_EMAIL_REMITENTE`) o tiene el nombre mal escrito (mayúsculas, guion bajo). Revísalas en el panel. En Vercel y Netlify, después de cambiarlas tienes que **volver a desplegar**. En Cloudflare, comprueba que las pusiste en **Variables and Secrets** y no en *Build variables*.

### Dice “No hemos podido enviar tu mensaje”
Resend ha rechazado el envío. Mira los logs del hosting (línea `contacto: fallo al enviar (Resend respondió XXX)`):
- **401 / 403:** la API key está mal copiada, se borró, o estás usando `onboarding@resend.dev` para enviar a un email que **no** es el de tu cuenta de Resend. Solución: usa el email de tu cuenta como destino, o verifica tu dominio.
- **422:** el remitente tiene mal formato. Debe ser `Nombre <email@dominio>` o solo `email@dominio`.
- **429:** has superado el límite diario (100) o mensual (3.000) del plan gratis. Se reinicia a medianoche (hora UTC).

### Dice “¡Recibido!” pero el email no llega
1. Mira en **spam**. Si está ahí, marca “No es spam” y verifica tu dominio en Resend.
2. Entra en **Resend → Emails**: si aparece como enviado, el problema está en tu bandeja; si no aparece, mira el punto siguiente.
3. **¿Lo enviaste muy rápido?** Si se envía en menos de 3 segundos desde que carga la página, el anti-bots lo descarta en silencio (a propósito: así los bots no se enteran). Prueba otra vez rellenándolo con calma.
4. **¿Usas un autorrellenado de contraseñas** que rellena campos ocultos? Algunos rellenan el campo trampa “web”. Prueba en una ventana de incógnito.

### “No hemos podido comprobar que eres una persona” (Turnstile)
- Pusiste la Secret Key en el hosting pero no la Site Key en `sitio.ts` (o al revés). Necesitas las dos.
- El dominio desde el que pruebas no está en la lista **Hostnames** del widget de Turnstile. Añádelo (incluida la dirección `workers.dev`, `vercel.app` o `netlify.app`).
- Tienes un bloqueador de anuncios muy agresivo. Prueba en incógnito.

### “Cross-site POST form submissions are forbidden”
Es una protección: el formulario solo acepta envíos desde tu propia web. Si lo ves al usar tu web normal, comprueba que no estás entrando por una dirección distinta (por ejemplo, un iframe o un dominio antiguo).

---

## El dominio

### El dominio no carga después de horas
- Comprueba en **dnschecker.org** que tu dominio ya apunta a Cloudflare (o a Vercel/Netlify).
- Si cambiaste nameservers: algunos registradores tardan hasta 24–48 h. Confirma que quitaste los antiguos.
- ¿Tenías **DNSSEC** activado en el registrador antiguo? Desactívalo; bloquea el cambio de nameservers.

### “Too many redirects” (demasiadas redirecciones)
Pasa cuando el DNS está en Cloudflare con la nube **naranja** y la web está en Vercel/Netlify. Pon esos registros en **gris (DNS only)**. Si la web está en Cloudflare, revisa que no tengas dos reglas de redirección contradictorias.

### He dejado de recibir los emails de mi dominio (Gmail/Outlook de empresa)
Al pasar el DNS a Cloudflare se quedaron fuera los registros **MX** de tu correo. Pide a tu proveedor de email (Google Workspace, Microsoft 365…) los registros MX, SPF (TXT) y DKIM, y añádelos en Cloudflare → DNS → Records, con la nube en **gris**.
