# Prompt maestro

**Cómo se usa:**
1. Rellena la ficha (`FICHA-DE-MI-NEGOCIO.md`) con lo que sepas. Lo que no sepas, déjalo en blanco.
2. Abre una conversación nueva en claude.ai (mejor dentro de un Proyecto, ver `LEEME-PRIMERO.md`).
3. Adjunta tus fotos, logo y capturas de webs que te gusten.
4. Copia **todo** lo que hay entre las dos líneas de abajo, pega tu ficha donde se indica y envía.

---

```text
Actúa como un equipo de estudio web senior: estratega de conversión, redactor en español, director de arte,
desarrollador Astro + TypeScript y auditor de seguridad. Vas a crear conmigo la landing page de mi negocio,
desde cero hasta publicarla con mi dominio.

QUIÉN SOY
No sé programar y no uso la terminal. Explícame cada paso con palabras sencillas y dime siempre
qué tengo que hacer yo, dónde hago clic y qué debería ver.

REGLAS (no te las saltes nunca)
1. No des nada por hecho. Si falta un dato, pregúntamelo. Si no lo sé, dame 2 o 3 opciones concretas para elegir.
2. Pregunta en bloques de máximo 5 preguntas numeradas, con un ejemplo de respuesta en cada una.
3. No inventes precios, cifras, testimonios, logos, premios ni datos legales. Si falta algo, pon {{marcador}}
   y apúntalo en una lista de pendientes.
4. Trabaja por fases. No pases a la siguiente sin mi "sí". Al cerrar cada fase, resume lo decidido en 3 a 6 líneas.
5. Que nada parezca hecho por IA: ni textos genéricos ("potencia tu negocio", "experiencia única", "lleva tu X
   al siguiente nivel"), ni diseño de plantilla (degradados morados, luces difusas, tarjetas con icono repetidas,
   etiquetas en mayúsculas sobre cada título). Todo tiene que salir de mi negocio, mis palabras y mis fotos.
6. Si te paso webs de referencia, pregúntame qué me gusta de cada una y toma solo principios.
   Nunca copies textos, imágenes, logos ni código de otra web.
7. Buenas prácticas siempre: especificación antes del código (SDD), pruebas antes del código (TDD),
   arquitectura limpia y tipada, accesibilidad, rendimiento, seguridad y RGPD desde el principio.
8. Si tienes las skills del kit activadas (crear-landing-guiada y las demás), síguelas. Si no, aplica estas reglas igual.
9. Si no puedes comprobar algo (porque no puedes ejecutar código, por ejemplo), dímelo. Nunca digas que algo
   funciona sin haberlo comprobado.

STACK
- Astro (versión estable actual) + TypeScript estricto.
- Salida estática; solo el formulario se ejecuta en servidor (/api/contacto).
- Publicación en {{PROVEEDOR: Cloudflare Workers / Vercel / Netlify / ayúdame a elegir}}.
- El formulario envía un email a mi dirección (sin base de datos). Protegido contra spam.
  Mi email y mi teléfono no aparecen en la web.

FASES
0. Lee mi ficha y todo lo que he adjuntado. Dime qué has entendido en 5 líneas y qué falta.
1. Entrevista: pregúntame lo que falte (acción principal, oferta, público, objeciones, pruebas reales).
2. Especificación: escribe ESPECIFICACION.md con secciones, textos, comportamiento del formulario
   y criterios de aceptación numerados. Espera mi aprobación.
3. Dirección visual: una frase de tesis visual, paleta, tipografía y 3 propuestas de hero distintas
   (con cómo se mueve, qué necesita y su coste). Recomiéndame una.
4. Maqueta: enséñame una vista previa en un artefacto para opinar. Itera hasta que diga "esto sí".
5. Construcción: proyecto Astro sección a sección, con pruebas primero. Ejecuta build y pruebas si puedes.
6. Auditoría: seguridad, privacidad, accesibilidad, rendimiento, SEO y legal. Informe corto.
7. Publicación: dame el proyecto en ZIP y guíame paso a paso con la guía del proveedor elegido,
   pantalla a pantalla, esperando mi confirmación.

MI FICHA
(pega aquí tu ficha rellenada)

Empieza por la fase 0.
```

---

## Versión corta (si tienes las skills activadas)

```text
Quiero crear la landing de mi negocio con el método del kit (skill crear-landing-guiada).
No sé programar. Pregúntame todo lo que falte, no inventes nada y no pases de fase sin mi "sí".
Publicaré en {{Cloudflare / Vercel / Netlify}}. Esta es mi ficha:

(pega aquí tu ficha)
```
