import { describe, expect, it } from 'vitest';
import { normalizarEntrada, validarContacto } from '../../src/lib/contacto/validacion';

const valido = {
  nombre: 'Lucía Pérez',
  email: 'Lucia@Ejemplo.com ',
  mensaje: 'Quiero una web para mi clínica dental.',
  consentimiento: 'on',
};

describe('validarContacto', () => {
  it('acepta un mensaje correcto y normaliza el email', () => {
    const r = validarContacto(valido);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.datos.email).toBe('lucia@ejemplo.com');
      expect(r.datos.consentimiento).toBe(true);
    }
  });

  it('acepta el consentimiento enviado como booleano (JSON)', () => {
    expect(validarContacto({ ...valido, consentimiento: true }).ok).toBe(true);
  });

  it.each([
    ['nombre', { ...valido, nombre: 'A' }],
    ['nombre', { ...valido, nombre: 'Ana\r\nBcc: spam@x.com' }],
    ['nombre', { ...valido, nombre: '<script>' }],
    ['email', { ...valido, email: 'no-es-un-email' }],
    ['email', { ...valido, email: `${'a'.repeat(250)}@x.com` }],
    ['mensaje', { ...valido, mensaje: 'hola' }],
    ['mensaje', { ...valido, mensaje: 'x'.repeat(2001) }],
    ['consentimiento', { ...valido, consentimiento: undefined }],
    ['consentimiento', { ...valido, consentimiento: 'false' }],
  ])('rechaza un %s no válido', (campo, entrada) => {
    const r = validarContacto(entrada);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errores).toHaveProperty(campo);
  });

  it('devuelve los mensajes de error en español', () => {
    const r = validarContacto({});
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errores.nombre).toBe('Escribe tu nombre.');
      expect(r.errores.email).toBe('Escribe tu email.');
      expect(r.errores.consentimiento).toBe('Necesitamos tu permiso para responderte.');
    }
  });

  it('rechaza tipos raros sin romperse', () => {
    expect(validarContacto({ ...valido, nombre: 42 }).ok).toBe(false);
    expect(validarContacto({ ...valido, email: ['a@b.com'] }).ok).toBe(false);
  });
});

describe('normalizarEntrada', () => {
  it('convierte FormData en objeto e ignora archivos', () => {
    const fd = new FormData();
    fd.append('nombre', 'Ana');
    fd.append('adjunto', new Blob(['x']), 'x.txt');
    expect(normalizarEntrada(fd)).toEqual({ nombre: 'Ana' });
  });

  it('devuelve un objeto vacío para entradas no válidas', () => {
    expect(normalizarEntrada(null)).toEqual({});
    expect(normalizarEntrada([1, 2])).toEqual({});
    expect(normalizarEntrada('texto')).toEqual({});
  });
});
