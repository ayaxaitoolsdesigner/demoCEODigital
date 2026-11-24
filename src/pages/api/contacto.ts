/**
 * POST /api/contacto
 * Esta es la ÚNICA parte "de servidor" de la web. Todo lo demás es HTML estático.
 * En Cloudflare se ejecuta como Worker; en Vercel y Netlify, como función.
 */
import type { APIRoute } from 'astro';
import {
  RESEND_API_KEY,
  CONTACTO_EMAIL_DESTINO,
  CONTACTO_EMAIL_REMITENTE,
  TURNSTILE_SECRET_KEY,
} from 'astro:env/server';
import { sitio } from '../../config/sitio';
import { normalizarEntrada } from '../../lib/contacto/validacion';
import { procesarContacto } from '../../lib/contacto/procesar';
import { crearEnviadorResend } from '../../lib/email/enviador';

// Esta ruta se ejecuta en cada petición (no se genera como HTML fijo).
export const prerender = false;

/** 16 KB: de sobra para un mensaje de 2000 caracteres. Frena abusos. */
const TAMANO_MAXIMO = 16 * 1024;

const cabecerasJson = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

function json(estado: number, cuerpo: unknown): Response {
  return new Response(JSON.stringify(cuerpo), { status: estado, headers: cabecerasJson });
}

function obtenerIp(request: Request, clientAddress: () => string): string | null {
  const deCloudflare = request.headers.get('cf-connecting-ip');
  if (deCloudflare) return deCloudflare;
  try {
    return clientAddress();
  } catch {
    return null;
  }
}

export const POST: APIRoute = async (contexto) => {
  const { request } = contexto;
  const tipo = request.headers.get('content-type') ?? '';
  const esJson = tipo.includes('application/json');
  // Si el navegador no tiene JavaScript, el formulario llega "a la antigua"
  // y respondemos con una redirección a una página en vez de con JSON.
  const quiereJson = esJson || (request.headers.get('accept') ?? '').includes('application/json');

  const texto = await request.text();
  if (texto.length > TAMANO_MAXIMO) {
    return json(413, { ok: false, error: 'El mensaje es demasiado largo.' });
  }

  let entrada: Record<string, unknown>;
  try {
    entrada = esJson
      ? normalizarEntrada(JSON.parse(texto))
      : Object.fromEntries(new URLSearchParams(texto));
  } catch {
    return json(400, { ok: false, error: 'Formato de datos no válido.' });
  }

  const resultado = await procesarContacto(entrada, obtenerIp(request, () => contexto.clientAddress), {
    config: {
      nombreSitio: sitio.nombre,
      emailDestino: CONTACTO_EMAIL_DESTINO,
      emailRemitente: CONTACTO_EMAIL_REMITENTE,
      turnstileSecreto: TURNSTILE_SECRET_KEY,
    },
    enviador: RESEND_API_KEY ? crearEnviadorResend(RESEND_API_KEY) : null,
    // Los registros se ven en el panel del hosting (Cloudflare: Workers > tu web > Logs).
    registrar: (mensaje) => console.warn(mensaje),
  });

  if (quiereJson) return json(resultado.estado, resultado.cuerpo);
  return contexto.redirect(resultado.cuerpo.ok ? '/gracias' : '/?error=1#contacto', 303);
};
