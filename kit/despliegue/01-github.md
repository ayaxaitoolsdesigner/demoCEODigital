# 01 · Guardar tu web en GitHub (sin terminal)

**Qué vas a conseguir:** una copia de tu web en GitHub que se puede editar desde el navegador y que Cloudflare (o Vercel, o Netlify) publicará sola cada vez que cambies algo.

**Tiempo:** 15 minutos · **Coste:** gratis

---

## Paso 1 · Crear tu cuenta de GitHub

1. Entra en **github.com** y pulsa **Sign up**.
2. Escribe tu email, una contraseña y un nombre de usuario.
   - El nombre de usuario aparecerá en direcciones públicas. Usa algo profesional: `lauragarcia-estudio`, no `lauri1987`.
3. Verifica tu email con el código que te llega.
4. Activa la **verificación en dos pasos** (GitHub te lo pedirá). Usa una app tipo Google Authenticator o la de tu gestor de contraseñas. Es obligatorio y protege tu web.

> 📸 **Lo que verás:** una pantalla oscura con el logo del gato-pulpo y un formulario paso a paso. Al final, un “dashboard” casi vacío con un botón verde **Create repository** a la izquierda.

---

## Paso 2 · Crear el repositorio con la plantilla

Elige **una** de estas dos opciones.

### Opción A · Desde la plantilla en GitHub (la más fácil)

1. Abre [github.com/ayaxaitoolsdesigner/demoCEODigital](https://github.com/ayaxaitoolsdesigner/demoCEODigital).
2. Pulsa el botón verde **Use this template** → **Create a new repository**.
3. **Repository name:** el nombre de tu web, sin espacios ni tildes. Ejemplo: `web-estudio-laura`.
4. Elige **Private** (solo tú lo ves). Las plataformas de hosting pueden leer repos privados sin problema.
5. Pulsa **Create repository**. Listo, salta al paso 3.

### Opción B · Subiendo el ZIP

1. En GitHub, pulsa **+** (arriba a la derecha) → **New repository**.
2. **Repository name:** `web-estudio-laura` (el tuyo).
3. Marca **Private**.
4. **No** marques “Add a README”, ni .gitignore, ni licencia: la plantilla ya los trae.
5. Pulsa **Create repository**.
6. En la página que aparece, busca el enlace **uploading an existing file** y púlsalo.
7. Abre en tu ordenador la carpeta `plantilla-astro` (descomprimida) del ZIP de la plantilla. **Selecciona todo su contenido** (no la carpeta en sí, lo que hay dentro) y **arrástralo** a la zona de GitHub.
   - Tienen que verse arriba del todo archivos como `package.json`, `astro.config.mjs` y la carpeta `src`. Si ves una sola carpeta `plantilla-astro`, has arrastrado la carpeta y no su contenido: vuelve atrás.
   - **En Mac**, los archivos que empiezan por punto (como `.gitignore`) están ocultos. Pulsa `Cmd + Mayús + .` en el Finder para verlos y que se suban también.
   - **Imprescindible:** que se suba `package-lock.json`. Sin él, la publicación puede fallar.
8. Abajo, en **Commit changes**, escribe “Primera versión” y pulsa el botón verde **Commit changes**.
9. Espera a que termine. Verás la lista de archivos y, debajo, el contenido del `README.md`.

> 📸 **Lo que verás al terminar:** una lista con carpetas (`public`, `src`, `tests`) y archivos (`astro.config.mjs`, `package.json`, `wrangler.jsonc`…). Debajo, el texto “Plantilla de landing · Astro + TypeScript”.

---

## Paso 3 · Personalizar tu web desde el navegador

Todo lo que vas a cambiar está en **dos archivos**.

### Textos y datos: `src/config/sitio.ts`

1. En tu repositorio, entra en `src` → `config` → `sitio.ts`.
2. Pulsa el **lápiz** ✏️ (arriba a la derecha del archivo) para editar.
3. Cambia **solo lo que está entre comillas simples** `'así'`. No borres comillas, comas ni llaves.

```ts
nombre: 'Estudio Ejemplo',          // ← cambia "Estudio Ejemplo" por tu marca
titulo: 'Tu negocio merece una web que trabaje por ti',
```

4. Si un texto lleva un apóstrofo (por ejemplo, *L'Atelier*), escríbelo con barra: `'L\'Atelier'`. O usa comillas tipográficas: `'L’Atelier'`.
5. Pulsa **Commit changes…** → otra vez **Commit changes**.

> 💡 **Truco con Claude:** copia el contenido de `sitio.ts`, pégalo en claude.ai y escribe: *“Rellena este archivo para mi negocio: [describe tu negocio]. Mantén exactamente la estructura y no inventes datos que no te he dado; pregúntame lo que falte.”* Luego pega la respuesta en GitHub.

### Colores: `src/styles/tokens.css`

Mismo proceso. Cambia los códigos de color (`#1f4d3a`…). Comprueba que el texto se lee bien sobre el fondo en **webaim.org/resources/contrastchecker** (mínimo 4.5:1).

### Nombre del proyecto en Cloudflare: `wrangler.jsonc`

Cambia `"name": "mi-landing"` por el nombre de tu web, en minúsculas y con guiones: `"name": "web-estudio-laura"`. **Apúntalo**: en Cloudflare tendrás que usar exactamente el mismo.

---

## Qué NO debes hacer nunca en GitHub

- ❌ Pegar una clave (`re_…`, `0x4AAA…` secreta, contraseñas) en ningún archivo.
- ❌ Escribir tu email personal o tu teléfono en el código si el repositorio es público.
- ❌ Borrar `package-lock.json`, `astro.config.mjs` o `wrangler.jsonc`.

Siguiente paso: [02-email-resend.md](02-email-resend.md)
