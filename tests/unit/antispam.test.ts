import { describe, expect, it } from 'vitest';
import { detectarSpam, TIEMPO_MINIMO_MS } from '../../src/lib/seguridad/antispam';

describe('detectarSpam', () => {
  const ahora = 1_000_000;

  it('detecta el honeypot relleno', () => {
    expect(detectarSpam({ web: 'http://spam.example' }, ahora)).toBe('trampa');
  });

  it('detecta envíos demasiado rápidos', () => {
    expect(detectarSpam({ iniciado: String(ahora - 500) }, ahora)).toBe('demasiado-rapido');
  });

  it('deja pasar a una persona normal', () => {
    expect(detectarSpam({ web: '', iniciado: String(ahora - TIEMPO_MINIMO_MS - 1) }, ahora)).toBeNull();
  });

  it('no bloquea si el navegador no tiene JavaScript (sin marca de tiempo)', () => {
    expect(detectarSpam({ web: '' }, ahora)).toBeNull();
    expect(detectarSpam({ iniciado: '' }, ahora)).toBeNull();
  });
});
