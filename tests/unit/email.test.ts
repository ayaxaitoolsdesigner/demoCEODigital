import { describe, expect, it, vi } from 'vitest';
import { construirEmailAviso, escaparHtml } from '../../src/lib/email/plantilla';
import { crearEnviadorResend, URL_API_RESEND } from '../../src/lib/email/enviador';

const datos = {
  nombre: 'Eva <b>',
  email: 'eva@ejemplo.com',
  mensaje: '<script>alert(1)</script>\nSegunda línea',
  consentimiento: true as const,
};

describe('plantilla de email', () => {
  it('escapa HTML peligroso', () => {
    expect(escaparHtml(`<a href="x">'&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
  });

  it('no permite inyectar código en el email', () => {
    const email = construirEmailAviso(datos, 'Mi Web', new Date('2026-11-24T10:00:00Z'));
    expect(email.html).not.toContain('<script>');
    expect(email.html).toContain('&lt;script&gt;');
    expect(email.responderA).toBe('eva@ejemplo.com');
    expect(email.asunto).toBe('Nuevo contacto en Mi Web: Eva <b>');
    expect(email.texto).toContain('Fecha: 2026-11-24 10:00 UTC');
  });

  it('quita saltos de línea del asunto', () => {
    const email = construirEmailAviso({ ...datos, nombre: 'Eva\nBcc: x@y.z' }, 'W', new Date());
    expect(email.asunto).not.toMatch(/[\r\n]/);
  });
});

describe('enviador Resend', () => {
  const mensaje = { asunto: 'A', texto: 'T', html: '<p>T</p>', responderA: 'c@x.com', de: 'Web <web@x.com>', para: 'yo@x.com' };

  it('llama a la API con la clave y el reply_to', async () => {
    const fetchFn = vi.fn(async () => new Response('{}', { status: 200 }));
    const r = await crearEnviadorResend('re_123', fetchFn).enviar(mensaje);
    expect(r).toEqual({ ok: true });
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(URL_API_RESEND);
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer re_123');
    expect(JSON.parse(init.body as string)).toMatchObject({ to: ['yo@x.com'], reply_to: 'c@x.com' });
  });

  it('informa del error sin lanzar excepciones', async () => {
    const r1 = await crearEnviadorResend('k', async () => new Response('no', { status: 403 })).enviar(mensaje);
    expect(r1).toEqual({ ok: false, detalle: 'Resend respondió 403' });
    const r2 = await crearEnviadorResend('k', async () => { throw new Error('caído'); }).enviar(mensaje);
    expect(r2).toEqual({ ok: false, detalle: 'caído' });
  });
});
