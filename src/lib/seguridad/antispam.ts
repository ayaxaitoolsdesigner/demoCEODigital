import { CAMPOS } from '../contacto/validacion';

/** Un humano tarda más que esto en leer y rellenar el formulario. */
export const TIEMPO_MINIMO_MS = 3000;

export type MotivoSpam = 'trampa' | 'demasiado-rapido';

/**
 * Detecta bots baratos sin molestar a las personas:
 *  1. Honeypot: un campo invisible ("web") que solo rellenan los bots.
 *  2. Tiempo: si el formulario se envía en menos de 3 segundos, no es humano.
 *     (Solo se comprueba si el navegador envió la marca de tiempo.)
 */
export function detectarSpam(entrada: Record<string, unknown>, ahora: number): MotivoSpam | null {
  const trampa = entrada[CAMPOS.trampa];
  if (typeof trampa === 'string' && trampa.trim() !== '') return 'trampa';

  const inicio = Number(entrada[CAMPOS.inicio]);
  if (Number.isFinite(inicio) && inicio > 0 && ahora - inicio < TIEMPO_MINIMO_MS) {
    return 'demasiado-rapido';
  }
  return null;
}
