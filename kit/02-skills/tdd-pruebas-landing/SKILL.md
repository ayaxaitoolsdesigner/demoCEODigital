---
name: tdd-pruebas-landing
description: "Pruebas primero (TDD) para landings en Astro con Vitest y Playwright, partiendo de los criterios de aceptación. Úsala al construir o cambiar código de una web."
---

# Pruebas primero (TDD) para una landing

**TDD** (Test-Driven Development, desarrollo guiado por pruebas): antes de escribir el código,
se escribe la prueba que comprueba que funciona. El ciclo es:

1. **Rojo**: escribe una prueba para un criterio de aceptación. Falla, porque aún no hay código.
2. **Verde**: escribe el código mínimo para que pase.
3. **Refactorizar**: limpia el código sin romper la prueba.

Cómo explicarlo en clase: "Antes de cocinar, escribimos cómo tiene que saber el plato.
Luego cocinamos hasta que sepa así. Y si mañana cambiamos la receta, sabremos al instante si algo se ha estropeado."

## Qué se prueba en una landing (y qué no)

| Nivel | Herramienta | Qué | Ejemplos |
|---|---|---|---|
| Unidad | Vitest | Lógica pura en `src/lib` | Validación del formulario, construcción del email, limpieza de textos |
| Ruta de servidor | Vitest | `api/contacto` con el envío de email simulado | Honeypot relleno → 400 sin enviar; datos válidos → `{ ok: true }` |
| Extremo a extremo | Playwright | La página real en un navegador | Botón visible en móvil, errores del formulario, sin scroll horizontal, 404 |
| Accesibilidad | Playwright + axe-core | Reglas WCAG automáticas | Cero infracciones graves |
| Calidad | Lighthouse (manual o CI) | Rendimiento, SEO, buenas prácticas | ≥ 90 en móvil |

No pruebes detalles de estilo (colores exactos, píxeles). Prueba **comportamiento** y **criterios de aceptación**.

## Reglas

- **Cada criterio de aceptación (CA-xx) tiene al menos una prueba** y su nombre lo cita: `test("CA-07 email incorrecto muestra error")`.
- **Las pruebas se escriben antes** que el código de esa parte. Enseña a la persona la prueba en rojo y luego en verde
  (si tienes ejecución de código, ejecútalas de verdad y muestra el resultado).
- **Nada de servicios reales en las pruebas.** El envío de email se sustituye por un doble (`EnviadorEmail` falso).
- **Sin datos personales reales** en las pruebas. Usa `ana@example.com`.
- **Nunca** desactives, borres o saltes una prueba para que "salga verde". Si una prueba está mal, explica por qué y corrígela.
- Antes de entregar: `npm run check` (tipos), `npm test` (unidad) y `npm run test:e2e` (extremo a extremo) en verde.
  Si no puedes ejecutarlas, dilo.

## Scripts de package.json (los de la plantilla del kit)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "check": "astro check",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "verificar": "astro check && vitest run && astro build"
  }
}
```

Ejemplos completos en `references/ejemplos-pruebas.md`.

## Cómo enseñar el resultado a quien no programa

Tabla final:

| Criterio | Prueba | Resultado |
|---|---|---|
| CA-01 Un solo titular | e2e/estructura.spec.ts | ✅ |
| CA-07 Email incorrecto | unit/validacion.test.ts y e2e/formulario.spec.ts | ✅ |

Y una frase: "Hay 24 comprobaciones automáticas. Si mañana alguien cambia algo y rompe el formulario, lo sabremos antes de publicar."

## Créditos

Propia del kit.
