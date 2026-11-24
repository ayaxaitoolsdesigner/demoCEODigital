import type { EmailAviso } from './plantilla';

/**
 * Contrato de cualquier servicio de email.
 * Si mañana cambias Resend por otro (Brevo, Postmark, el de Cloudflare…),
 * solo escribes otra función que cumpla esta interfaz. El resto no cambia.
 */
export interface EnviadorEmail {
  enviar(mensaje: EmailAviso & { de: string; para: string }): Promise<{ ok: true } | { ok: false; detalle: string }>;
}

export const URL_API_RESEND = 'https://api.resend.com/emails';

/** Envío con Resend usando su API HTTP directamente (sin SDK, funciona en cualquier hosting). */
export function crearEnviadorResend(apiKey: string, fetchFn: typeof fetch = fetch): EnviadorEmail {
  return {
    async enviar({ de, para, asunto, texto, html, responderA }) {
      try {
        const respuesta = await fetchFn(URL_API_RESEND, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: de,
            to: [para],
            subject: asunto,
            text: texto,
            html,
            reply_to: responderA,
          }),
        });
        if (respuesta.ok) return { ok: true };
        // No devolvemos el cuerpo completo: podría contener datos sensibles.
        return { ok: false, detalle: `Resend respondió ${respuesta.status}` };
      } catch (error) {
        return { ok: false, detalle: error instanceof Error ? error.message : 'error de red' };
      }
    },
  };
}
