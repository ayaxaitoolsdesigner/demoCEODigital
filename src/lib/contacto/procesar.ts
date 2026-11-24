import { CAMPOS, validarContacto, type ErroresContacto } from './validacion';
import { detectarSpam } from '../seguridad/antispam';
import { verificarTurnstile } from '../seguridad/turnstile';
import { construirEmailAviso } from '../email/plantilla';
import type { EnviadorEmail } from '../email/enviador';

export interface ConfigContacto {
  nombreSitio: string;
  emailDestino?: string | undefined;
  emailRemitente?: string | undefined;
  turnstileSecreto?: string | undefined;
}

export interface Dependencias {
  config: ConfigContacto;
  /** null si falta la clave del proveedor de email. */
  enviador: EnviadorEmail | null;
  ahora?: () => number;
  fetchFn?: typeof fetch;
  registrar?: (mensaje: string) => void;
}

export type RespuestaContacto =
  | { estado: 200; cuerpo: { ok: true } }
  | { estado: 400 | 422 | 500 | 502; cuerpo: { ok: false; error: string; errores?: ErroresContacto } };

/**
 * Toda la lógica del formulario, sin depender de Astro ni del hosting.
 * Por eso se puede probar con tests y reutilizar en Cloudflare, Vercel o Netlify.
 */
export async function procesarContacto(
  entrada: Record<string, unknown>,
  ip: string | null,
  deps: Dependencias,
): Promise<RespuestaContacto> {
  const ahora = deps.ahora ?? Date.now;
  const registrar = deps.registrar ?? (() => {});

  // 1. Validación de los datos (primero, para que una persona vea sus errores al momento).
  const validacion = validarContacto(entrada);
  if (!validacion.ok) {
    return { estado: 422, cuerpo: { ok: false, error: 'Revisa los campos marcados.', errores: validacion.errores } };
  }

  // 2. Bots baratos (trampa y tiempo): respondemos "ok" para no darles pistas, pero no enviamos nada.
  const spam = detectarSpam(entrada, ahora());
  if (spam) {
    registrar(`contacto descartado: ${spam}`);
    return { estado: 200, cuerpo: { ok: true } };
  }

  // 3. Turnstile (solo si está configurado).
  if (deps.config.turnstileSecreto) {
    const humano = await verificarTurnstile({
      token: entrada[CAMPOS.turnstile],
      secreto: deps.config.turnstileSecreto,
      ip,
      ...(deps.fetchFn ? { fetchFn: deps.fetchFn } : {}),
    });
    if (!humano) {
      return { estado: 400, cuerpo: { ok: false, error: 'No hemos podido comprobar que eres una persona. Recarga la página e inténtalo de nuevo.' } };
    }
  }

  // 4. Configuración del servidor completa.
  const { emailDestino, emailRemitente, nombreSitio } = deps.config;
  if (!deps.enviador || !emailDestino || !emailRemitente) {
    registrar('contacto: faltan variables de entorno (RESEND_API_KEY, CONTACTO_EMAIL_DESTINO o CONTACTO_EMAIL_REMITENTE)');
    return { estado: 500, cuerpo: { ok: false, error: 'El formulario aún no está configurado. Escríbenos por otra vía mientras tanto.' } };
  }

  // 5. Envío.
  const aviso = construirEmailAviso(validacion.datos, nombreSitio, new Date(ahora()));
  const envio = await deps.enviador.enviar({ ...aviso, de: emailRemitente, para: emailDestino });
  if (!envio.ok) {
    registrar(`contacto: fallo al enviar (${envio.detalle})`);
    return { estado: 502, cuerpo: { ok: false, error: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.' } };
  }

  return { estado: 200, cuerpo: { ok: true } };
}
