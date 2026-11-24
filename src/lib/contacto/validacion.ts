import { z } from 'astro/zod';

/** Nombres de los campos del formulario. Una sola fuente de verdad. */
export const CAMPOS = {
  nombre: 'nombre',
  email: 'email',
  mensaje: 'mensaje',
  consentimiento: 'consentimiento',
  /** Honeypot: campo oculto que una persona nunca rellena. */
  trampa: 'web',
  /** Momento (ms) en que se cargó el formulario. Lo pone el JS del navegador. */
  inicio: 'iniciado',
  /** Nombre que usa el widget de Cloudflare Turnstile. */
  turnstile: 'cf-turnstile-response',
} as const;

export const LIMITES = {
  nombreMin: 2,
  nombreMax: 80,
  emailMax: 254,
  mensajeMin: 10,
  mensajeMax: 2000,
} as const;

const sinSaltosNiEtiquetas = /^[^\r\n<>]*$/;

const aceptado = z.preprocess(
  (v) => v === true || v === 'true' || v === 'on' || v === '1',
  z.literal(true, { error: 'Necesitamos tu permiso para responderte.' }),
);

export const esquemaContacto = z.object({
  nombre: z
    .string({ error: 'Escribe tu nombre.' })
    .trim()
    .min(LIMITES.nombreMin, 'Escribe tu nombre.')
    .max(LIMITES.nombreMax, `Máximo ${LIMITES.nombreMax} caracteres.`)
    .regex(sinSaltosNiEtiquetas, 'El nombre tiene caracteres no permitidos.'),
  email: z
    .string({ error: 'Escribe tu email.' })
    .trim()
    .toLowerCase()
    .max(LIMITES.emailMax, 'Ese email es demasiado largo.')
    .pipe(z.email('Escribe un email válido, por ejemplo nombre@dominio.com.')),
  mensaje: z
    .string({ error: 'Escribe un mensaje.' })
    .trim()
    .min(LIMITES.mensajeMin, `Cuéntame un poco más (mínimo ${LIMITES.mensajeMin} caracteres).`)
    .max(LIMITES.mensajeMax, `Máximo ${LIMITES.mensajeMax} caracteres.`),
  consentimiento: aceptado,
});

export type DatosContacto = z.infer<typeof esquemaContacto>;
export type ErroresContacto = Partial<Record<keyof DatosContacto, string>>;

export type ResultadoValidacion =
  | { ok: true; datos: DatosContacto }
  | { ok: false; errores: ErroresContacto };

/** Convierte FormData o un objeto JSON en un objeto plano de strings/booleanos. */
export function normalizarEntrada(fuente: FormData | unknown): Record<string, unknown> {
  if (typeof FormData !== 'undefined' && fuente instanceof FormData) {
    const salida: Record<string, unknown> = {};
    for (const [clave, valor] of fuente.entries()) {
      // Ignoramos archivos: este formulario no acepta adjuntos.
      if (typeof valor === 'string') salida[clave] = valor;
    }
    return salida;
  }
  if (fuente && typeof fuente === 'object' && !Array.isArray(fuente)) {
    return { ...(fuente as Record<string, unknown>) };
  }
  return {};
}

export function validarContacto(entrada: Record<string, unknown>): ResultadoValidacion {
  const resultado = esquemaContacto.safeParse(entrada);
  if (resultado.success) return { ok: true, datos: resultado.data };

  const errores: ErroresContacto = {};
  for (const problema of resultado.error.issues) {
    const campo = problema.path[0] as keyof DatosContacto | undefined;
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return { ok: false, errores };
}
