# 04 · Publicar en Vercel (alternativa)

**Qué vas a conseguir:** la misma web, con el mismo formulario, publicada en Vercel. **No hay que tocar código**: la plantilla detecta que se está construyendo en Vercel y se adapta sola.

**Tiempo:** 20 minutos · **Coste:** gratis (plan Hobby) + dominio

**Necesitas:** tu repositorio de GitHub ([01](01-github.md)) y los valores de Resend ([02](02-email-resend.md)).

> ⚖️ **Antes de elegir Vercel para un negocio:** el plan gratuito (Hobby) está pensado para proyectos personales. Si tu web es de una empresa o la usas para vender, lee las condiciones actuales en **vercel.com/legal/terms** antes de empezar. Si tienes dudas, Cloudflare ([03](03-cloudflare.md)) no tiene esta limitación en su plan gratuito.

---

## Parte 1 · Crear la cuenta y conectar GitHub

1. Entra en **vercel.com** → **Sign Up** → **Continue with GitHub**. Así no tienes que crear otra contraseña y Vercel ya puede ver tus repositorios.
2. Autoriza a Vercel. Si te pregunta a qué repositorios dar acceso, elige **Only select repositories** y marca el tuyo.

## Parte 2 · Importar el proyecto

1. En el panel, **Add New…** → **Project**.
2. Junto a tu repositorio, pulsa **Import**.
3. En **Configure Project**:
   - **Framework Preset:** debe poner **Astro** (lo detecta solo).
   - **Root Directory:** `./`
   - **Build and Output Settings:** no toques nada.
4. Despliega la sección **Environment Variables** y añade:

| Key | Value |
|---|---|
| `RESEND_API_KEY` | `re_...` |
| `CONTACTO_EMAIL_DESTINO` | tu email |
| `CONTACTO_EMAIL_REMITENTE` | `Mi Web <onboarding@resend.dev>` |

   Si al añadirlas ves la opción **Sensitive**, márcala: así nadie podrá volver a leerlas desde el panel.

5. Pulsa **Deploy**. En 1–2 minutos verás confeti 🎉 y una dirección `https://tu-proyecto.vercel.app`.

> 📸 **Lo que verás:** una pantalla con los registros del build y, al terminar, una miniatura de tu web con el botón **Continue to Dashboard**.

## Parte 3 · Probar el formulario

Igual que en Cloudflare: rellénalo con calma, envíalo y comprueba tu email (y spam).

**Si cambias una variable de entorno más adelante**, Vercel **no** la aplica sola: ve a **Deployments** → los tres puntos `…` del último despliegue → **Redeploy**.

**Para ver errores:** tu proyecto → **Logs** (o **Deployments** → el despliegue → **Functions/Runtime Logs**). Busca líneas que empiecen por `contacto:`.

---

## Parte 4 · Dominio propio

1. Tu proyecto → **Settings** → **Domains** → **Add Domain**.
2. Escribe `www.tudominio.com`. Vercel te propondrá añadir también la versión sin `www` y redirigir una a la otra: **acepta**.
3. Vercel te muestra los registros DNS que necesita (normalmente un **A** para el dominio raíz y un **CNAME** para `www`). **Copia exactamente los valores que te muestre Vercel**: pueden cambiar con el tiempo.
4. Ve al panel donde gestionas el DNS de tu dominio (tu registrador, o Cloudflare si lo tienes allí) y crea esos registros.
   - **Si tu DNS está en Cloudflare:** pon la nube en **gris (DNS only)** en esos registros. Con la nube naranja, Vercel y Cloudflare se pisan el certificado.
5. Vuelve a Vercel: cuando los registros se propaguen (minutos u horas), cada dominio mostrará **Valid Configuration** y el certificado HTTPS se emite solo.

También puedes **comprar el dominio en Vercel** (Domains → Buy) y te lo configura automáticamente.

Después, actualiza `site` en `astro.config.mjs` y `url` en `src/config/sitio.ts` con tu dominio.

---

## Turnstile en Vercel

Turnstile es de Cloudflare, pero funciona en cualquier hosting. Crea una cuenta gratuita en Cloudflare solo para esto y sigue [03-cloudflare.md → Parte 5](03-cloudflare.md#parte-5-recomendada--turnstile-el-anti-bots-invisible). En **Hostnames** pon tu dominio y `tu-proyecto.vercel.app`. La Secret Key va en Vercel → **Settings → Environment Variables** como `TURNSTILE_SECRET_KEY`; después, **Redeploy**.

## Cabeceras de seguridad

En Vercel se aplican desde el archivo `vercel.json` de la plantilla. No tienes que hacer nada.

## Vistas previas (lo mejor de Vercel)

Si un día editas en GitHub y eliges **“Create a new branch for this commit and start a pull request”** en vez de guardar directamente, Vercel publica una **vista previa** con su propia dirección. Puedes enseñársela a alguien antes de que el cambio llegue a tu web real.

Siguiente: [07-checklist-produccion.md](07-checklist-produccion.md)
