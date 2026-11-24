# Ejemplos de pruebas

**Si partes de la plantilla del kit**, ya tiene Vitest y Playwright configurados y pruebas en verde
(`tests/unit/validacion.test.ts`, `antispam.test.ts`, `email.test.ts`, `procesar.test.ts` y `tests/e2e/contacto.spec.ts`).
No las rehagas: **añade** las de cada criterio nuevo siguiendo su estilo. Funciones reales de la plantilla:
`validarContacto(entrada)`, `detectarSpam(entrada, ahora)`, `construirEmailAviso(datos, nombreSitio, fecha)`,
`escaparHtml(texto)` y `procesarContacto(entrada, dependencias)` (las dependencias incluyen el `EnviadorEmail`,
así que se prueba con uno falso). Lee sus firmas antes de escribir pruebas nuevas.

Los ejemplos de abajo sirven de modelo si empiezas sin plantilla.

## Configuración

`vitest.config.ts`

```ts
/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: { include: ["tests/unit/**/*.test.ts"], environment: "node" },
});
```

`playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: "http://localhost:4321", trace: "off" },
  webServer: { command: "npm run build && npm run preview", url: "http://localhost:4321", reuseExistingServer: true },
  projects: [
    { name: "movil", use: { ...devices["iPhone 13"] } },
    { name: "escritorio", use: { viewport: { width: 1440, height: 900 } } },
  ],
});
```

## 1. Unidad: validación del formulario (escrita ANTES que la validación)

`tests/unit/validacion.test.ts`

```ts
import { describe, expect, test } from "vitest";
import { validarContacto } from "../../src/lib/contacto/validacion";

const valido = { nombre: "Ana Ruiz", email: "ana@example.com", mensaje: "Quiero información del taller de enero.", consentimiento: "on", web: "" };

describe("validarContacto", () => {
  test("CA-05 datos válidos pasan", () => {
    expect(validarContacto(valido).ok).toBe(true);
  });

  test("CA-07 email incorrecto devuelve error en el campo email", () => {
    const r = validarContacto({ ...valido, email: "ana@" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errores.email).toBeDefined();
  });

  test("CA-06 campos obligatorios vacíos", () => {
    const r = validarContacto({ ...valido, nombre: "", mensaje: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errores)).toEqual(expect.arrayContaining(["nombre", "mensaje"]));
  });

  test("CA-09 sin consentimiento no pasa", () => {
    expect(validarContacto({ ...valido, consentimiento: undefined }).ok).toBe(false);
  });

  test("CA-08 la trampa para bots rellena se rechaza", () => {
    expect(validarContacto({ ...valido, web: "http://spam.example" }).ok).toBe(false);
  });

  test("limita la longitud del mensaje", () => {
    expect(validarContacto({ ...valido, mensaje: "a".repeat(5001) }).ok).toBe(false);
  });

  test("no acepta saltos de línea en el nombre (evita inyección de cabeceras de email)", () => {
    expect(validarContacto({ ...valido, nombre: "Ana\r\nBcc: x@example.com" }).ok).toBe(false);
  });
});
```

## 2. Unidad: el email se construye sin HTML peligroso

```ts
import { expect, test } from "vitest";
import { construirEmailAviso } from "../../src/lib/email/plantilla";

import type { DatosContacto } from "../../src/lib/contacto/validacion";

const datos = { nombre: "Ana", email: "ana@example.com", mensaje: "<script>alert(1)</script>", consentimiento: true } as DatosContacto;

test("escapa HTML del mensaje del visitante", () => {
  const email = construirEmailAviso(datos, "Mi Web", new Date());
  expect(email.html).not.toContain("<script>");
  expect(email.html).toContain("&lt;script&gt;");
});

test("reply-to es el email del visitante, nunca el remitente", () => {
  const email = construirEmailAviso(datos, "Mi Web", new Date());
  expect(email.responderA).toBe("ana@example.com");
});
```

## 3. Ruta de servidor con un enviador falso

```ts
import { expect, test, vi } from "vitest";
import { procesarContacto } from "../../src/lib/contacto/procesar";

test("datos válidos envían un email y responden ok", async () => {
  const enviador = { enviar: vi.fn().mockResolvedValue(undefined) };
  const r = await procesarContacto({ nombre: "Ana", email: "ana@example.com", mensaje: "Hola, quiero cita", consentimiento: "on", web: "" }, enviador);
  expect(r.estado).toBe(200);
  expect(enviador.enviar).toHaveBeenCalledOnce();
});

test("honeypot relleno no envía nada", async () => {
  const enviador = { enviar: vi.fn() };
  const r = await procesarContacto({ nombre: "Bot", email: "b@example.com", mensaje: "x", consentimiento: "on", web: "spam" }, enviador);
  expect(r.estado).toBeGreaterThanOrEqual(400);
  expect(enviador.enviar).not.toHaveBeenCalled();
});
```

Truco de arquitectura: si `procesarContacto` recibe el enviador como parámetro, se puede probar sin internet.
`api/contacto.ts` solo lee la petición, crea el enviador real con las variables de entorno y llama a `procesarContacto`.

## 4. Extremo a extremo con Playwright

`tests/e2e/landing.spec.ts`

```ts
import { expect, test } from "@playwright/test";

test("CA-01 hay un solo h1 y es el titular", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
});

test("CA-02 el botón principal se ve sin hacer scroll", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /{{texto_boton}}/i }).first()).toBeInViewport();
});

test("CA-03 no hay scroll horizontal", async ({ page }) => {
  await page.goto("/");
  const desborda = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(desborda).toBe(false);
});

test("CA-07 email incorrecto muestra el error junto al campo", async ({ page }) => {
  await page.goto("/#contacto");
  await page.getByLabel("Nombre").fill("Ana Ruiz");
  await page.getByLabel("Email").fill("ana@");
  await page.getByLabel("Mensaje").fill("Hola");
  await page.getByLabel(/acepto/i).check();
  await page.getByRole("button", { name: /enviar|pedir|reservar/i }).click();
  await expect(page.getByText(/revisa el email/i)).toBeVisible();
});

test("CA-10 con movimiento reducido todo el contenido es visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const ocultos = await page.locator("main *:visible").evaluateAll((els) =>
    els.filter((e) => getComputedStyle(e).opacity === "0").length);
  expect(ocultos).toBe(0);
});

test("CA-12 la 404 es propia", async ({ page }) => {
  const r = await page.goto("/no-existe");
  expect(r?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /inicio|volver/i })).toBeVisible();
});
```

## 5. Accesibilidad automática

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("sin infracciones de accesibilidad graves", async ({ page }) => {
  await page.goto("/");
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(r.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual([]);
});
```

## 6. Cabeceras de seguridad (contra la web publicada o el preview)

```ts
test("cabeceras de seguridad presentes", async ({ request }) => {
  const r = await request.get("/");
  const h = r.headers();
  expect(h["content-security-policy"]).toBeTruthy();
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBeTruthy();
});
```

(En el servidor de desarrollo puede no haber cabeceras; esta prueba se pasa contra el despliegue de prueba.)
