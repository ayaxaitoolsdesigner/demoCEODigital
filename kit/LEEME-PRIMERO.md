# Kit: crea tu landing con Claude (sin saber programar)

Este kit te lleva desde "tengo un negocio" hasta "mi web está publicada en mi dominio",
hablando con Claude en claude.ai. No necesitas terminal ni saber programar.

## Qué hay en el kit

| Carpeta | Qué es | Cuándo se usa |
|---|---|---|
| `01-prompt-maestro/` | La ficha de tu negocio, el prompt maestro y frases de seguimiento | Antes de empezar y durante todo el proceso |
| `02-skills/` | 10 skills en español que enseñan a Claude a trabajar como un estudio web | Se suben una vez a claude.ai |
| `02-skills/zips/` | Las mismas skills, ya empaquetadas en ZIP para subirlas | Paso 2 de esta guía |
| `despliegue/` | Guías paso a paso para publicar en Cloudflare, Vercel o Netlify | Al final, para publicar |
| `plantilla-astro/` | Proyecto base en Astro + TypeScript con el formulario listo | Claude parte de aquí al construir |
| `03-referencias/` | Repositorios originales, licencias y fuentes para seguir aprendiendo | Para curiosos |

## Palabras que vas a oír (glosario en 1 minuto)

- **Landing page**: una página con un solo objetivo (que te escriban, que reserven, que compren).
- **Skill**: un "manual de instrucciones" que le das a Claude para que haga una tarea siempre de la misma forma, y bien.
- **Prompt**: el mensaje que le escribes a Claude.
- **Astro**: la herramienta con la que se construye la web. Hace webs muy rápidas.
- **TypeScript**: el lenguaje en el que se escribe. Avisa de errores antes de publicar.
- **Hero**: la primera pantalla de la web, lo primero que se ve.
- **Despliegue / publicar**: subir la web a internet.
- **Hosting**: el servicio donde vive tu web (Cloudflare, Vercel, Netlify). Para una landing, gratis.
- **Dominio**: tu dirección, como `tunegocio.com`. Se compra por unos 10 a 15 € al año.
- **SDD (especificación primero)**: antes de construir, se escribe qué tiene que hacer la web. Es el plano de la casa.
- **TDD (pruebas primero)**: antes de construir, se escriben las comprobaciones automáticas. Es la receta de cómo debe saber el plato.
- **Secreto**: una contraseña que usa la web (por ejemplo, la del servicio que envía los emails). Nunca va en el código.

## Paso 1. Prepara tu cuenta de claude.ai (5 minutos)

1. Entra en [claude.ai](https://claude.ai) con tu cuenta. Las skills están disponibles en los planes Free, Pro, Max, Team y Enterprise,
   pero para un proyecto completo como este se recomienda Pro o superior (más uso y conversaciones más largas).
2. Activa la **ejecución de código y creación de archivos**: en la configuración, apartado de capacidades
   (el nombre exacto puede cambiar: busca "ejecución de código", "crear y editar archivos" o "Code execution").
   Sin esto, las skills no funcionan.
3. Si tu cuenta es de empresa (Team o Enterprise), puede que un administrador tenga que permitir las skills.

## Paso 2. Sube las skills (10 minutos, solo una vez)

1. Descarga y descomprime el kit en tu ordenador.
2. Ve a **Personalizar → Skills** (dirección directa: [claude.ai/customize/skills](https://claude.ai/customize/skills)).
3. Pulsa el botón para **añadir o subir una skill** y elige un ZIP de la carpeta `02-skills/zips/`.
   **Sube los ZIP tal cual, sin descomprimirlos.** Uno por skill.
4. Repite con los 10 ZIP.
5. Comprueba que las 10 aparecen **activadas** en la lista.

Las 10 skills y para qué sirve cada una:

| Skill | Para qué |
|---|---|
| `crear-landing-guiada` | El método completo por fases. La que dirige todo |
| `landing-estrategia-y-textos` | Estructura que convierte y textos que no suenan a IA |
| `diseno-sin-pinta-de-ia` | Dirección de arte y control de calidad visual |
| `hero-moderno` | 12 tipos de primera pantalla con cuándo usar cada uno |
| `animaciones-y-scroll-moderno` | Animaciones, transiciones y efectos de scroll rápidos y accesibles |
| `astro-typescript-arquitectura` | Cómo se organiza el código para que se pueda ampliar |
| `sdd-especificacion-primero` | Escribir y aprobar el plano antes de construir |
| `tdd-pruebas-landing` | Comprobaciones automáticas antes del código |
| `auditoria-seguridad-landing` | Formulario seguro, secretos, cabeceras, RGPD y LSSI |
| `revision-final-antes-de-publicar` | La lista de todo lo que se revisa antes de salir |

**¿No te deja subir skills?** Plan B: crea un **Proyecto** en claude.ai, y en su conocimiento sube los archivos `SKILL.md`
y las carpetas `references` de `02-skills/`. Funciona peor que las skills, pero funciona.

## Paso 3. Rellena tu ficha (15 minutos)

Abre `01-prompt-maestro/FICHA-DE-MI-NEGOCIO.md` y rellénala con tus palabras.
Prepara también una carpeta con: tu logo, 5 a 15 fotos tuyas y 2 o 3 capturas de webs que te gusten
(y piensa **qué** te gusta de cada una).

## Paso 4. Empieza (la parte divertida)

1. En claude.ai, crea un **Proyecto** llamado como tu negocio (así todo queda junto y puedes volver otro día).
2. Abre una conversación nueva dentro del proyecto.
3. Adjunta tus fotos, logo y capturas.
4. Copia el **prompt maestro** de `01-prompt-maestro/PROMPT-MAESTRO.md`, pega tu ficha donde se indica y envía.
5. Responde a sus preguntas. Claude no avanzará de fase sin tu "sí".

Lo que vas a ver, en orden:

1. Claude te dice qué ha entendido y qué falta.
2. Te pregunta lo que falte (en bloques cortos).
3. Te entrega la **especificación** para que la apruebes.
4. Te propone **3 heros** y una dirección visual.
5. Te enseña una **maqueta** para opinar.
6. Construye la web con sus **pruebas**.
7. Pasa la **auditoría** de seguridad y la **revisión final**.
8. Te da el proyecto en **ZIP** y te guía para **publicarlo**.

Si te pierdes o algo no te gusta, usa las frases de `01-prompt-maestro/PROMPTS-DE-SEGUIMIENTO.md`.

## Paso 5. Publica

Sigue la guía de tu proveedor en la carpeta `despliegue/`. Claude te acompaña pantalla a pantalla.
Necesitarás:

- Una cuenta en GitHub (gratis) para guardar el proyecto.
- Una cuenta en el proveedor elegido (gratis para una landing).
- Una cuenta en el servicio de envío de emails (la guía lo explica; tiene plan gratuito).
- Tu dominio (opcional al principio: puedes publicar primero en una dirección gratuita del proveedor).

## Cómo funciona el formulario (y por qué así)

Cuando alguien rellena el formulario, **te llega un email a ti**. No hay base de datos ni aplicaciones de terceros.
Tu email y tu teléfono **no aparecen en la web**: nadie los puede copiar.
Es lo más sencillo para empezar. Más adelante se puede añadir un agente que conteste a cada contacto,
le dé las gracias y le proponga una llamada o videollamada, para que tú solo hables con quien de verdad está interesado.

## Si algo falla

- **Claude no parece usar las skills**: comprueba que están activadas y que la ejecución de código está encendida.
  Puedes decirle: "Usa la skill crear-landing-guiada".
- **La conversación se hace muy larga**: pídele "Resume todo lo decidido y los archivos actuales para seguir en otra conversación",
  y pega ese resumen en una conversación nueva del mismo proyecto.
- **No entiendes algo**: "Explícamelo como si tuviera 12 años y dime exactamente qué tengo que hacer".
- **Te ha inventado algo**: "Eso no es verdad, quítalo y ponlo como pendiente". Las skills se lo prohíben, pero revisa siempre.

## Créditos

Kit creado para la clase "Crea tu landing con Claude". Las skills traducen y adaptan material con licencia MIT de
elayadesign/ai-design-skills, MengTo/Skills y leonxlnx/taste-skill (licencias completas dentro de cada skill).
Ver `03-referencias/REPOS-Y-LICENCIAS.md`.
