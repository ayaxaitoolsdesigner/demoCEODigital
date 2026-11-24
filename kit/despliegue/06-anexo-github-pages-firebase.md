# 06 · Anexo: GitHub Pages y Firebase Hosting

Te preguntarán por ellos, así que aquí va la respuesta corta: **funcionan para webs sin formulario, pero para esta plantilla no los recomendamos.**

| | GitHub Pages | Firebase Hosting |
|---|---|---|
| Sirve páginas estáticas | ✅ Gratis | ✅ Gratis |
| Puede ejecutar el código del formulario | ❌ No ejecuta nada de servidor | ⚠️ Solo con Cloud Functions, que exigen el plan de pago por uso (tarjeta) |
| Dominio propio + HTTPS | ✅ | ✅ |
| Dificultad para alguien que no programa | Media (configurar GitHub Actions) | Alta (necesita terminal y la CLI de Firebase) |

---

## GitHub Pages

GitHub Pages solo publica archivos: no puede ejecutar `/api/contacto`. Para usarlo tendrías que:

1. **Quitar el formulario de servidor**, o hacer que envíe a otro sitio:
   - **Opción “todo tuyo”:** publicar solo `/api/contacto` como un Worker de Cloudflare aparte y que el formulario de GitHub Pages le envíe los datos. Funciona, pero ya estás usando Cloudflare… así que es más fácil publicarlo todo en Cloudflare.
   - **Opción “servicio externo”:** un servicio de formularios (Formspree, Web3Forms, Basin…). Es cómodo, pero los datos de tus clientes pasan por un tercero más: tendrías que mencionarlo en tu política de privacidad, y casi todos tienen límites en su plan gratis.
2. **Configurar Astro para salida estática sin adaptador** y con la ruta del repositorio (`base: '/nombre-del-repo'`) si no usas dominio propio.
3. **Activar GitHub Actions:** repositorio → **Settings** → **Pages** → **Source: GitHub Actions**, y añadir el flujo oficial de Astro (`withastro/action`).

Además, en el plan gratuito de GitHub, Pages solo funciona con **repositorios públicos**.

**Cuándo sí tiene sentido:** una web personal, un portfolio o la documentación de un proyecto, sin formulario.

## Firebase Hosting

Firebase (de Google) sirve páginas estáticas rapidísimo, pero:

- Para ejecutar código de servidor necesitas **Cloud Functions**, que requieren el **plan Blaze** (pago por uso con tarjeta). Hay un nivel gratuito generoso, pero tienes que poner la tarjeta y vigilar el gasto.
- Se trabaja con la **terminal** (`firebase init`, `firebase deploy`) o con GitHub Actions que también se configuran desde la terminal.
- Astro no tiene adaptador oficial para Firebase.

**Cuándo sí tiene sentido:** si ya usas Firebase para una app (base de datos, usuarios…) y quieres la web en el mismo proyecto. En ese caso, pídele ayuda a alguien técnico.

---

## Resumen para la clase

> “Puedes publicar en GitHub Pages o Firebase, pero perderías el formulario o tendrías que pagar/usar la terminal. Cloudflare te da lo mismo, gratis, con formulario y sin terminal. Por eso es la opción principal.”
