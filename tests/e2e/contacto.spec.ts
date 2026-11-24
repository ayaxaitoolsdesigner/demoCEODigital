import { expect, test } from '@playwright/test';

test.describe('landing', () => {
  test('carga sin errores de consola ni de CSP', async ({ page }) => {
    const errores: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    page.on('pageerror', (e) => errores.push(e.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/.+/);
    expect(errores).toEqual([]);
  });

  test('la trampa anti-bots no se ve', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#f-web')).not.toBeInViewport();
  });

  test('no hay scroll horizontal', async ({ page }) => {
    await page.goto('/');
    const desborda = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(desborda).toBe(false);
  });
});

test.describe('formulario de contacto', () => {
  test('muestra los errores del servidor junto a cada campo', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.locator('[data-error-de="nombre"]')).toHaveText('Escribe tu nombre.');
    await expect(page.locator('[data-error-de="consentimiento"]')).toHaveText('Necesitamos tu permiso para responderte.');
    await expect(page.getByLabel('Nombre')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Nombre')).toBeFocused();
  });

  test('confirma el envío cuando todo va bien', async ({ page }) => {
    // Simulamos la respuesta del servidor para no enviar emails reales en los tests.
    await page.route('**/api/contacto', (ruta) => ruta.fulfill({ json: { ok: true } }));
    await page.goto('/');
    await page.getByLabel('Nombre').fill('Lucía Pérez');
    await page.getByLabel('Email').fill('lucia@ejemplo.com');
    await page.getByLabel('¿En qué puedo ayudarte?').fill('Quiero una web para mi estudio de yoga.');
    await page.getByLabel(/política de privacidad/).check();
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByRole('status')).toHaveText('¡Recibido! Te escribo muy pronto.');
    await expect(page.getByLabel('Nombre')).toHaveValue('');
  });

  test('avisa si no hay conexión', async ({ page }) => {
    await page.route('**/api/contacto', (ruta) => ruta.abort());
    await page.goto('/');
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByRole('status')).toContainText('Sin conexión');
  });
});
