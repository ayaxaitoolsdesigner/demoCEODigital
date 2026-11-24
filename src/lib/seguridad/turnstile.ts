/**
 * Verificación de Cloudflare Turnstile en el servidor.
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export const URL_VERIFICACION_TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verificarTurnstile(opciones: {
  token: unknown;
  secreto: string;
  ip?: string | null;
  fetchFn?: typeof fetch;
}): Promise<boolean> {
  const { token, secreto, ip, fetchFn = fetch } = opciones;
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048) return false;

  const cuerpo = new FormData();
  cuerpo.append('secret', secreto);
  cuerpo.append('response', token);
  if (ip) cuerpo.append('remoteip', ip);

  try {
    const respuesta = await fetchFn(URL_VERIFICACION_TURNSTILE, { method: 'POST', body: cuerpo });
    if (!respuesta.ok) return false;
    const datos = (await respuesta.json()) as { success?: unknown };
    return datos.success === true;
  } catch {
    return false;
  }
}
