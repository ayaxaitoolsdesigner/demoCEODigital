---
name: revision-final-antes-de-publicar
description: "Revisión final de una landing antes de publicarla: textos, diseño, móvil, accesibilidad, rendimiento, SEO, legal y formulario. Úsala cuando la web esté casi lista."
---

# Revisión final antes de publicar

Una web "casi terminada" suele fallar en lo mismo: un enlace muerto, un texto de ejemplo olvidado,
el móvil roto, el formulario que manda los avisos a spam. Esta revisión lo caza.

## Cómo hacerla

1. Repasa cada bloque. Comprueba de verdad (renderizando, ejecutando pruebas, leyendo el código), no de memoria.
2. Corrige lo que puedas en el momento y apúntalo.
3. Lo que dependa de la persona, pregúntalo en un bloque al final.
4. Entrega el informe con el formato de abajo.

## 1. Textos
- [ ] No queda ningún `{{marcador}}`, "lorem ipsum", "[Nombre]" ni texto de ejemplo.
- [ ] Ninguna palabra de la lista de `landing-estrategia-y-textos` (potenciar, revolucionar...).
- [ ] Ninguna cifra, testimonio, logo o premio que la persona no haya dado.
- [ ] Ortografía revisada: tildes, signos de apertura (¿ ¡), mayúscula solo al principio de titulares.
- [ ] Cada botón dice qué pasa al pulsarlo.

## 2. Diseño
- [ ] Pasa la prueba de la resta de `diseno-sin-pinta-de-ia` (nada decorativo sin función).
- [ ] Un solo botón principal por pantalla.
- [ ] Tipografía, colores y espaciado del sistema acordado; nada suelto.
- [ ] Sin palabras huérfanas en titulares.
- [ ] Fotos coherentes entre sí y bien recortadas en móvil.

## 3. Móvil y tamaños
- [ ] 390 px, 768 px, 1024 px y 1440 px: sin scroll horizontal, sin textos cortados, sin solapes.
- [ ] Botón principal visible sin scroll en móvil.
- [ ] Zonas táctiles de al menos 44 × 44 px.
- [ ] Menú móvil se abre, se cierra con Escape y no deja el scroll bloqueado.

## 4. Accesibilidad (WCAG 2.2 AA)
- [ ] Contraste suficiente (4,5:1 texto normal; 3:1 texto grande y elementos de interfaz).
- [ ] Se puede usar todo con el teclado; foco siempre visible; enlace "saltar al contenido".
- [ ] Un `h1`; titulares en orden.
- [ ] `alt` útil en imágenes con significado; `alt=""` en las decorativas.
- [ ] Campos del formulario con `label`; errores anunciados y junto al campo.
- [ ] Con movimiento reducido no hay animaciones y todo se ve.
- [ ] `lang="es"` en el HTML.

## 5. Rendimiento
- [ ] Lighthouse móvil ≥ 90 (rendimiento, accesibilidad, buenas prácticas, SEO).
- [ ] Imagen del hero sin `lazy`, con `fetchpriority="high"`; el resto con `lazy`.
- [ ] Imágenes en WebP/AVIF con tamaños responsivos; ninguna de más de 300 KB salvo el hero.
- [ ] Fuentes propias, con `font-display: swap`, solo los pesos usados.
- [ ] JavaScript solo donde hace falta.

## 6. SEO y compartir
- [ ] `<title>` (< 60 caracteres) y meta descripción (< 155).
- [ ] Imagen para compartir (1200 × 630) que existe de verdad.
- [ ] `robots.txt` y `sitemap` (o `noindex` si es campaña temporal).
- [ ] URL canónica con el dominio definitivo.
- [ ] Datos estructurados solo con información real.
- [ ] Favicon.

## 7. Legal
- [ ] Aviso legal, privacidad y cookies enlazados en el pie y con datos reales (o pendientes marcados).
- [ ] Información básica de privacidad y casilla en el formulario.
- [ ] Recomendado: revisión por un profesional.

## 8. Formulario y avisos
- [ ] Envío real de prueba recibido por el dueño, no en spam.
- [ ] Mensaje de éxito claro con lo que pasará después.
- [ ] Errores claros; probado sin JavaScript.
- [ ] Auditoría de `auditoria-seguridad-landing` hecha.

## 9. Técnico
- [ ] `npm run check`, `npm run build`, `npm test` y `npm run test:e2e` en verde (o dicho claramente si no se pudo ejecutar).
- [ ] Sin errores en la consola del navegador.
- [ ] Página 404 propia; ningún enlace muerto (`href="#"` incluido).
- [ ] Criterios de aceptación de `ESPECIFICACION.md`: todos cumplidos o explicados.

## Formato del informe

```md
## ¿Se puede publicar?
Sí / Sí, cuando se resuelva X / Todavía no, por Y.

## Lo que está bien
- 3 a 5 líneas

## Lo que he corregido ahora
- …

## Lo que falta y quién lo resuelve
| Qué | Quién | Cómo |
|---|---|---|

## Criterios de aceptación
| CA | Estado |
|---|---|
```

Termina con el siguiente paso concreto: "Cuando me des los datos fiscales, pasamos a publicar con la guía de Cloudflare."

## Créditos

Propia del kit. Recoge requisitos de entrega de `landing-page-design` (elayadesign/ai-design-skills, MIT)
y la verificación final de `build-awwwards-quality-sites` (MengTo/Skills, MIT).
