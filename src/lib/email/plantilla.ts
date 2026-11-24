import type { DatosContacto } from '../contacto/validacion';

/** Escapa texto para meterlo en HTML sin que nadie pueda inyectar código. */
export function escaparHtml(texto: string): string {
  return texto
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export interface EmailAviso {
  asunto: string;
  texto: string;
  html: string;
  /** Al darle a "Responder" en tu correo, contestas directamente al cliente. */
  responderA: string;
}

/** Construye el email que recibe el dueño de la web cuando alguien escribe. */
export function construirEmailAviso(datos: DatosContacto, nombreSitio: string, fecha: Date): EmailAviso {
  // El asunto no puede llevar saltos de línea (evita inyección de cabeceras).
  const nombreSeguro = datos.nombre.replace(/[\r\n]+/g, ' ').slice(0, 80);
  const asunto = `Nuevo contacto en ${nombreSitio}: ${nombreSeguro}`;
  const fechaLegible = fecha.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

  const texto = [
    `Nombre: ${datos.nombre}`,
    `Email: ${datos.email}`,
    `Fecha: ${fechaLegible}`,
    '',
    datos.mensaje,
    '',
    '— Pulsa "Responder" para contestar directamente a esta persona.',
  ].join('\n');

  const html = `<!doctype html>
<html lang="es"><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1d1b18">
<h2 style="margin:0 0 12px">Nuevo mensaje desde ${escaparHtml(nombreSitio)}</h2>
<p><strong>Nombre:</strong> ${escaparHtml(datos.nombre)}<br>
<strong>Email:</strong> ${escaparHtml(datos.email)}<br>
<strong>Fecha:</strong> ${escaparHtml(fechaLegible)}</p>
<blockquote style="margin:16px 0;padding:12px 16px;border-left:4px solid #1f4d3a;background:#f7f5f0;white-space:pre-wrap">${escaparHtml(datos.mensaje)}</blockquote>
<p style="color:#6b675f;font-size:14px">Pulsa «Responder» para contestar directamente a esta persona.</p>
</body></html>`;

  return { asunto, texto, html, responderA: datos.email };
}
