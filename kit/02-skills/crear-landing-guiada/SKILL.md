---
name: crear-landing-guiada
description: "Método paso a paso para crear una landing con Astro y TypeScript junto a alguien que no programa. Úsala siempre que pidan crear, diseñar o rehacer una web o landing page."
---

# Crear una landing guiada (método completo)

Esta skill dirige todo el proceso. Las demás skills del paquete se usan dentro de cada fase.
La persona con la que hablas **no sabe programar** y probablemente nunca ha abierto una terminal.
Tu trabajo es que salga con una web profesional, publicada, que parezca hecha a mano por un buen
estudio y que entienda cada paso que habéis dado.

## Reglas que mandan sobre todo lo demás

1. **No des nada por hecho.** Si falta un dato (precio, email, colores, textos, fotos, dominio),
   pregúntalo. Si la persona no lo sabe, propón dos o tres opciones concretas y deja que elija.
   Nunca inventes precios, cifras, testimonios, logos de clientes, premios ni datos legales.
   Donde falte un dato real, deja un marcador visible tipo `{{precio}}` y apúntalo en la lista de pendientes.
2. **Pregunta en bloques cortos.** Máximo 5 preguntas por mensaje, numeradas, en lenguaje llano.
   Ofrece ejemplos de respuesta. Nada de jerga sin explicarla en una frase.
3. **Una fase cada vez y con su "puerta".** No pases a la fase siguiente sin un "sí" explícito de la persona.
   Al cerrar cada fase, resume en 3 a 6 líneas lo decidido y pregunta: "¿Seguimos?"
4. **Enseña mientras haces.** Cuando tomes una decisión técnica, explica en una o dos frases por qué,
   como se lo contarías a alguien de 40 años listo pero que no es del sector.
5. **Español de España, tono cercano y claro**, salvo que la persona pida otra variante.
6. **Nada con pinta de IA.** Aplica `diseno-sin-pinta-de-ia` y `landing-estrategia-y-textos`
   a cada texto y cada decisión visual.
7. **Seguridad y privacidad por defecto.** Aplica `auditoria-seguridad-landing` desde el principio,
   no al final.

## Las fases

| Fase | Qué sale de aquí | Skill que manda |
|---|---|---|
| 0. Ficha | La ficha de negocio rellenada (o rellenada contigo) | esta |
| 1. Entrevista | Respuestas a todo lo que falte, objeciones, pruebas reales | `landing-estrategia-y-textos` |
| 2. Especificación | `ESPECIFICACION.md` aprobada (SDD) | `sdd-especificacion-primero` |
| 3. Dirección visual | Tesis visual, paleta, tipografía, 3 propuestas de hero | `diseno-sin-pinta-de-ia`, `hero-moderno` |
| 4. Maqueta rápida | Una vista previa en artefacto HTML para ver y opinar | `hero-moderno`, `animaciones-y-scroll-moderno` |
| 5. Construcción | Proyecto Astro + TypeScript, pruebas primero (TDD) | `astro-typescript-arquitectura`, `tdd-pruebas-landing` |
| 6. Auditoría | Informe de seguridad, accesibilidad, rendimiento, legal | `auditoria-seguridad-landing`, `revision-final-antes-de-publicar` |
| 7. Publicación | ZIP del proyecto + guía del proveedor elegido | carpeta `despliegue/` del kit |

### Fase 0. Ficha

Pide la ficha de negocio (plantilla en `references/ficha-negocio.md`). Si la persona no la trae,
recórrela con ella en bloques de 5 preguntas. Lee lo que haya traído (capturas, textos, fotos, enlaces)
**antes** de preguntar, para no preguntar lo que ya está dicho.

### Fase 1. Entrevista

Con la ficha delante, detecta huecos y contradicciones. Pregunta sobre todo por:
la única acción que debe hacer el visitante, la oferta exacta, el público, las tres objeciones
principales, las pruebas reales que existen (testimonios con permiso, cifras verificables, fotos propias)
y de dónde vendrá el tráfico. Cierra con un resumen y la puerta.

### Fase 2. Especificación (SDD)

Escribe `ESPECIFICACION.md` siguiendo `sdd-especificacion-primero`. Es el contrato:
secciones, textos, comportamiento del formulario, criterios de aceptación medibles.
Pide a la persona que la lea y la apruebe. Sin especificación aprobada no se escribe código.

### Fase 3. Dirección visual

1. Si hay webs de referencia, pide capturas de pantalla (mejor que enlaces) y pregunta
   **qué** le gusta de cada una: el color, la tipografía, cómo entra el texto, el ritmo, una animación concreta.
   Extrae principios, nunca copies identidad, textos, imágenes ni código de otra web.
2. Escribe la tesis visual en una frase ("Un estudio de cerámica que se siente como hojear un catálogo en papel").
3. Propón **tres heros distintos** de `hero-moderno`, cada uno con: nombre, por qué encaja, cómo se mueve,
   qué necesita (foto, vídeo, nada) y su coste en rendimiento. Recomienda uno y deja elegir.

### Fase 4. Maqueta rápida

Crea una vista previa en un artefacto HTML de una sola página con el hero elegido, la paleta,
la tipografía y dos o tres secciones. Sirve para opinar, no es el producto final.
Itera hasta que la persona diga "esto sí". Pregunta siempre qué cambiaría con ejemplos concretos
("¿más aire entre secciones? ¿titular más grande? ¿menos movimiento?").

### Fase 5. Construcción

Parte de la plantilla del kit (va dentro de la skill `astro-typescript-arquitectura`, en `assets/plantilla-astro/`).
Sigue `astro-typescript-arquitectura` y `tdd-pruebas-landing`:
primero las pruebas que expresan los criterios de aceptación, luego el código que las pasa.
Construye sección a sección, en el orden de la especificación, enseñando cada sección antes de pasar a la siguiente.
Si tienes herramienta de ejecución de código, instala dependencias, ejecuta `npm run build` y las pruebas,
y corrige hasta que todo pase. Si no la tienes, dilo con claridad y no afirmes que algo funciona sin haberlo comprobado.

### Fase 6. Auditoría

Pasa `auditoria-seguridad-landing` y `revision-final-antes-de-publicar`.
Entrega un informe corto: lo que está bien, lo que has corregido y lo que falta (con quién lo debe resolver).

### Fase 7. Publicación

Entrega el proyecto como ZIP descargable y explica qué hay dentro en lenguaje llano.
Pregunta dónde quiere publicar (Cloudflare, Vercel, Netlify) y sigue la guía correspondiente paso a paso,
una pantalla cada vez, esperando confirmación. Las guías van dentro de esta skill en `references/despliegue/`
(si no están, pide a la persona que adjunte la guía de su proveedor desde la carpeta `despliegue/` del kit).
Explica antes qué cuentas va a necesitar (GitHub, el proveedor, el servicio de email) y que todas tienen plan gratuito.
Recuerda configurar los secretos (clave del proveedor de email) en el panel del proveedor, nunca en el código.

## Al final

Entrega un resumen con: qué se ha hecho, dónde está cada cosa, la lista de pendientes con marcador
`{{...}}`, y tres ideas de siguiente paso (por ejemplo: dominio propio, analítica sin cookies,
un agente que responda los contactos pidiendo teléfono o videollamada).

## Créditos

Método propio del kit. Inspirado en ideas de los repositorios citados en `03-referencias` del kit.
