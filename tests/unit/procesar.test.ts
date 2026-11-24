import { describe, expect, it, vi } from 'vitest';
import { procesarContacto, type Dependencias } from '../../src/lib/contacto/procesar';
import type { EnviadorEmail } from '../../src/lib/email/enviador';

const AHORA = 1_800_000_000_000;
const entradaValida = {
  nombre: 'Marta',
  email: 'marta@ejemplo.com',
  mensaje: 'Me gustaría pedir presupuesto.',
  consentimiento: 'on',
  web: '',
  iniciado: String(AHORA - 20_000),
};

function preparar(extra: Partial<Dependencias['config']> = {}, enviador?: EnviadorEmail | null) {
  const enviar = vi.fn<EnviadorEmail['enviar']>(async () => ({ ok: true }));
  const deps: Dependencias = {
    config: { nombreSitio: 'Web', emailDestino: 'yo@web.com', emailRemitente: 'Web <hola@web.com>', ...extra },
    enviador: enviador === undefined ? { enviar } : enviador,
    ahora: () => AHORA,
  };
  return { deps, enviar };
}

describe('procesarContacto', () => {
  it('envía el email al dueño con los datos correctos', async () => {
    const { deps, enviar } = preparar();
    const r = await procesarContacto(entradaValida, '1.2.3.4', deps);
    expect(r).toEqual({ estado: 200, cuerpo: { ok: true } });
    expect(enviar).toHaveBeenCalledOnce();
    expect(enviar.mock.calls[0]?.[0]).toMatchObject({ para: 'yo@web.com', de: 'Web <hola@web.com>', responderA: 'marta@ejemplo.com' });
  });

  it('finge éxito ante un bot y no envía nada', async () => {
    const { deps, enviar } = preparar();
    const r = await procesarContacto({ ...entradaValida, web: 'spam' }, null, deps);
    expect(r.estado).toBe(200);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('valida antes que el anti-spam: una persona rápida ve sus errores', async () => {
    const { deps } = preparar();
    const r = await procesarContacto({ iniciado: String(AHORA - 100) }, null, deps);
    expect(r.estado).toBe(422);
  });

  it('descarta en silencio un envío válido hecho en menos de 3 segundos', async () => {
    const { deps, enviar } = preparar();
    const r = await procesarContacto({ ...entradaValida, iniciado: String(AHORA - 100) }, null, deps);
    expect(r.estado).toBe(200);
    expect(enviar).not.toHaveBeenCalled();
  });

  it('devuelve 422 con errores por campo', async () => {
    const { deps, enviar } = preparar();
    const r = await procesarContacto({ ...entradaValida, email: 'mal' }, null, deps);
    expect(r.estado).toBe(422);
    if (!r.cuerpo.ok) expect(r.cuerpo.errores).toHaveProperty('email');
    expect(enviar).not.toHaveBeenCalled();
  });

  it('devuelve 500 si faltan variables de entorno, sin filtrar detalles', async () => {
    const registrar = vi.fn();
    const { deps } = preparar({ emailDestino: undefined });
    const r = await procesarContacto(entradaValida, null, { ...deps, registrar });
    expect(r.estado).toBe(500);
    expect(JSON.stringify(r.cuerpo)).not.toContain('RESEND');
    expect(registrar).toHaveBeenCalled();
  });

  it('devuelve 500 si no hay enviador (falta la API key)', async () => {
    const { deps } = preparar({}, null);
    expect((await procesarContacto(entradaValida, null, deps)).estado).toBe(500);
  });

  it('devuelve 502 si el proveedor de email falla', async () => {
    const { deps } = preparar({}, { enviar: async () => ({ ok: false, detalle: 'x' }) });
    expect((await procesarContacto(entradaValida, null, deps)).estado).toBe(502);
  });

  describe('con Turnstile activado', () => {
    it('rechaza si no hay token', async () => {
      const fetchFn = vi.fn();
      const { deps, enviar } = preparar({ turnstileSecreto: 's' });
      const r = await procesarContacto(entradaValida, null, { ...deps, fetchFn });
      expect(r.estado).toBe(400);
      expect(fetchFn).not.toHaveBeenCalled();
      expect(enviar).not.toHaveBeenCalled();
    });

    it('acepta si Cloudflare confirma que es humano', async () => {
      const fetchFn = vi.fn(async () => Response.json({ success: true }));
      const { deps, enviar } = preparar({ turnstileSecreto: 's' });
      const r = await procesarContacto({ ...entradaValida, 'cf-turnstile-response': 'tok' }, '1.1.1.1', { ...deps, fetchFn });
      expect(r.estado).toBe(200);
      expect(enviar).toHaveBeenCalledOnce();
    });

    it('rechaza si Cloudflare dice que no', async () => {
      const fetchFn = vi.fn(async () => Response.json({ success: false }));
      const { deps } = preparar({ turnstileSecreto: 's' });
      const r = await procesarContacto({ ...entradaValida, 'cf-turnstile-response': 'tok' }, null, { ...deps, fetchFn });
      expect(r.estado).toBe(400);
    });

    it('rechaza si Cloudflare no responde', async () => {
      const fetchFn = vi.fn(async () => { throw new Error('timeout'); });
      const { deps } = preparar({ turnstileSecreto: 's' });
      const r = await procesarContacto({ ...entradaValida, 'cf-turnstile-response': 'tok' }, null, { ...deps, fetchFn });
      expect(r.estado).toBe(400);
    });
  });
});
