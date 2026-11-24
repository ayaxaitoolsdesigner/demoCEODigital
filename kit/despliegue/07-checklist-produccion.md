# 07 · Checklist antes de anunciar tu web

Imprime esta página o cópiala en una nota. No anuncies la web hasta tener todo en ✅.

---

## 1. Contenido (10 min)

- [ ] He cambiado **todos** los textos de ejemplo de `src/config/sitio.ts` (busca “Ejemplo” y “ejemplo.com”).
- [ ] El título de la pestaña y la descripción de Google (`seo.titulo`, `seo.descripcion`) hablan de **mi** negocio. La descripción tiene entre 120 y 160 caracteres.
- [ ] He leído la web entera **en el móvil**, en voz alta. Nada suena a plantilla ni a texto genérico.
- [ ] No hay faltas de ortografía (pega los textos en claude.ai y pide: *“Revisa ortografía y gramática. No cambies el estilo; dime solo qué corregir.”*).
- [ ] El favicon (`public/favicon.svg`) es mío o lo he cambiado.

## 2. Formulario (5 min)

- [ ] He enviado un mensaje de prueba **desde el móvil** y otro desde el ordenador. Los dos han llegado.
- [ ] El email **no** ha llegado a spam (si llega, verifica tu dominio en Resend: [02 → Paso 4](02-email-resend.md)).
- [ ] Al pulsar **Responder** en el email, la respuesta va a la persona que escribió.
- [ ] He probado a enviar el formulario vacío: aparecen errores en español junto a cada campo.
- [ ] (Si uso Turnstile) Aparece el recuadro de Cloudflare y el envío funciona.

## 3. Seguridad (5 min)

- [ ] **Ninguna clave** está en GitHub. Búscalo: en tu repositorio, pulsa la tecla `/` y busca `re_` y `0x4AAA`. Solo debe aparecer la Site Key **pública** de Turnstile en `sitio.ts`.
- [ ] Las variables del formulario están como **Secret** (Cloudflare) / **Sensitive** (Vercel) / **secret values** (Netlify).
- [ ] Tengo la **verificación en dos pasos** activa en GitHub, en el hosting, en Resend y en el registrador del dominio.
- [ ] La web carga con **https://** y el candado. La versión `http://` redirige sola a `https://`.
- [ ] He pasado mi dominio por **securityheaders.com**: debería salir **A** (la plantilla trae las cabeceras configuradas). Si sale peor, revisa que no hayas borrado `public/_headers` o `vercel.json`.

## 4. Legal en España (10 min) ⚖️

- [ ] **Aviso legal** (`/aviso-legal`) con titular, NIF, domicilio y email. Relleno en `sitio.ts` → `legal`. Es obligatorio si la web tiene fines comerciales (LSSI, art. 10).
- [ ] **Política de privacidad** (`/privacidad`) revisada. Menciona que los datos llegan por email y que usas un proveedor de hosting y uno de email.
- [ ] La casilla de consentimiento del formulario **no** viene marcada por defecto (en la plantilla no lo está; no lo cambies).
- [ ] No uso cookies de análisis ni publicidad. **Si añado Google Analytics, Meta Pixel o similares, necesito un banner de cookies** con opción de rechazar. (Alternativa sin cookies: Cloudflare Web Analytics.)
- [ ] Los textos legales de la plantilla son un punto de partida. **Si vendes o tratas datos sensibles (salud, menores…), que los revise un profesional.**

## 5. Google y redes (5 min)

- [ ] `site` en `astro.config.mjs` y `url` en `sitio.ts` tienen mi dominio final, con `https://`.
- [ ] Al compartir el enlace por WhatsApp sale el título y la descripción correctos.
- [ ] (Recomendado) He dado de alta el dominio en **Google Search Console** (search.google.com/search-console). Si el DNS está en Cloudflare, la verificación es casi automática.

## 6. Velocidad y accesibilidad (5 min)

- [ ] He pasado la web por **pagespeed.web.dev** en modo móvil. Objetivo: **90+** en las cuatro categorías. Si baja al añadir tu diseño, lo habitual es una imagen demasiado pesada o una fuente externa.
- [ ] Todas las imágenes que añadí tienen texto alternativo (`alt`) que describe lo que se ve.
- [ ] Se puede recorrer la web solo con el **teclado** (tecla Tab): se ve en todo momento dónde estás.

## 7. Plan B

- [ ] Sé dónde está el botón de **volver a la versión anterior** (Cloudflare: Deployments; Vercel: Deployments → Promote/Instant Rollback; Netlify: Deploys → Publish deploy).
- [ ] Tengo apuntado en mi gestor de contraseñas: cuenta de GitHub, hosting, Resend y registrador del dominio.
- [ ] He puesto un recordatorio en el calendario **un mes antes de que caduque el dominio** (o he activado la renovación automática).

---

### Para quien quiera ir un paso más allá (con terminal)

```bash
npm install
npm run verificar     # tipos + 36 tests + build
npm run test:e2e      # 12 pruebas en navegador (escritorio y móvil)
```
