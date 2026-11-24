# 05 · Publicar en Netlify (alternativa)

**Qué vas a conseguir:** la misma web y el mismo formulario, publicados en Netlify. **Sin tocar código**: la plantilla detecta Netlify y usa su adaptador. El archivo `netlify.toml` ya trae la configuración.

**Tiempo:** 20 minutos · **Coste:** gratis (300 créditos al mes) + dominio

**Necesitas:** tu repositorio de GitHub ([01](01-github.md)) y los valores de Resend ([02](02-email-resend.md)).

> 💳 **Cómo funciona el plan gratis de Netlify:** tienes 300 créditos al mes. Cada publicación a producción gasta 15 créditos, y las visitas y las funciones también consumen. Para una landing normal sobra, pero **si haces muchos cambios seguidos** (20 publicaciones = 300 créditos) puedes agotarlos. El plan gratis tiene un límite estricto: no te cobran de más, pero al agotarlo Netlify puede dejar de publicar o servir tus proyectos hasta el mes siguiente (consulta el detalle actual en netlify.com/pricing). Consejo: agrupa varios cambios en una sola publicación.

---

## Parte 1 · Crear la cuenta

1. Entra en **netlify.com** → **Sign up** → **Sign up with GitHub**.
2. Autoriza a Netlify.

## Parte 2 · Importar el proyecto

1. En el panel, **Add new project** (o **Add new site**) → **Import an existing project**.
2. Elige **GitHub**. Si te pregunta, da acceso **solo** a tu repositorio.
3. Selecciona tu repositorio.
4. En la configuración verás que los campos ya vienen rellenos desde `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Pulsa **Add environment variables** (o **Show advanced** → **New variable**) y añade:

| Key | Value |
|---|---|
| `RESEND_API_KEY` | `re_...` |
| `CONTACTO_EMAIL_DESTINO` | tu email |
| `CONTACTO_EMAIL_REMITENTE` | `Mi Web <onboarding@resend.dev>` |

   Si ves la casilla **Contains secret values**, márcala.

6. Pulsa **Deploy**. En 1–3 minutos tendrás una dirección `https://nombre-aleatorio.netlify.app`.
7. Cámbiale el nombre: **Project configuration** (o **Site configuration**) → **Change project name** → `web-estudio-laura`.

> 📸 **Lo que verás:** una pantalla con el estado “Building” y después “Published”, con la dirección en verde arriba.

## Parte 3 · Probar el formulario

Rellénalo con calma, envíalo y revisa tu email.

**Si cambias una variable de entorno más adelante:** **Deploys** → **Trigger deploy** → **Deploy project/site** para que se aplique.

**Para ver errores:** **Logs** → **Functions** → elige la función del servidor y busca líneas que empiecen por `contacto:`.

---

## Parte 4 · Dominio propio

1. **Domain management** → **Add a domain** → escribe `tudominio.com`.
2. Netlify te da a elegir:
   - **Usar Netlify DNS**: te da unos nameservers para poner en tu registrador. Más automático.
   - **Configuración externa**: te dice qué registros crear (normalmente un **CNAME** para `www` apuntando a tu `….netlify.app`, y un registro para el dominio raíz). **Copia los valores exactos que te muestre Netlify.**
3. Si tu DNS está en Cloudflare, pon esos registros con la nube en **gris (DNS only)**.
4. Netlify emite el certificado HTTPS automáticamente cuando el DNS se propaga (**HTTPS** → *Verify DNS configuration* si tarda).

Después, actualiza `site` en `astro.config.mjs` y `url` en `src/config/sitio.ts`.

---

## Turnstile en Netlify

Igual que en Vercel: crea el widget en una cuenta gratuita de Cloudflare ([03 → Parte 5](03-cloudflare.md#parte-5-recomendada--turnstile-el-anti-bots-invisible)), añade tu dominio y tu `….netlify.app` como hostnames, pon la Site Key en `sitio.ts` y la Secret Key como variable `TURNSTILE_SECRET_KEY`. Luego, **Trigger deploy**.

## Cabeceras de seguridad

Netlify lee el archivo `public/_headers` de la plantilla. Nada que hacer.

## ¿Y los “Netlify Forms”?

Netlify tiene su propio sistema de formularios, que guarda los envíos en su panel. **No lo necesitas**: la plantilla ya envía los mensajes a tu email y funciona igual en los tres hostings. Si algún día quieres usarlo, tendrías que cambiar el formulario; pídeselo a Claude explicando que usas Netlify Forms.

Siguiente: [07-checklist-produccion.md](07-checklist-produccion.md)
