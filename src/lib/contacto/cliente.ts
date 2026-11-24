/**
 * Mejora progresiva del formulario (se ejecuta en el navegador).
 * Sin JavaScript, el formulario sigue funcionando: se envía y redirige a /gracias.
 * Con JavaScript, se envía sin recargar y los errores aparecen junto a cada campo.
 * La validación "de verdad" la hace siempre el servidor (nunca te fíes del navegador).
 */
type RespuestaApi = { ok: true } | { ok: false; error: string; errores?: Record<string, string> };

export function enviarFormulario(formulario: HTMLFormElement): void {
  const marca = formulario.querySelector<HTMLInputElement>('[data-marca-tiempo]');
  if (marca) marca.value = String(Date.now());

  const estado = formulario.querySelector<HTMLElement>('[data-estado]');
  const boton = formulario.querySelector<HTMLButtonElement>('button[type="submit"]');
  const mensajeExito = formulario.dataset.mensajeExito ?? 'Mensaje enviado.';

  const pintarEstado = (texto: string, tipo: 'exito' | 'error' | '') => {
    if (!estado) return;
    estado.textContent = texto;
    estado.dataset.tipo = tipo;
  };

  const limpiarErrores = () => {
    formulario.querySelectorAll<HTMLElement>('[data-error-de]').forEach((p) => (p.textContent = ''));
    formulario.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  };

  const pintarErrores = (errores: Record<string, string>) => {
    let primero: HTMLElement | null = null;
    for (const [campo, mensaje] of Object.entries(errores)) {
      const destino = formulario.querySelector<HTMLElement>(`[data-error-de="${CSS.escape(campo)}"]`);
      const control = formulario.elements.namedItem(campo);
      if (destino) destino.textContent = mensaje;
      if (control instanceof HTMLElement) {
        control.setAttribute('aria-invalid', 'true');
        primero ??= control;
      }
    }
    primero?.focus();
  };

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    limpiarErrores();
    pintarEstado('', '');

    const datos = Object.fromEntries(new FormData(formulario).entries());
    if (boton) boton.disabled = true;
    pintarEstado('Enviando…', '');

    try {
      const respuesta = await fetch(formulario.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(datos),
      });
      const cuerpo = (await respuesta.json()) as RespuestaApi;

      if (cuerpo.ok) {
        formulario.reset();
        if (marca) marca.value = String(Date.now());
        pintarEstado(mensajeExito, 'exito');
      } else {
        if (cuerpo.errores) pintarErrores(cuerpo.errores);
        pintarEstado(cuerpo.error, 'error');
      }
    } catch {
      pintarEstado('Sin conexión. Comprueba tu internet e inténtalo de nuevo.', 'error');
    } finally {
      if (boton) boton.disabled = false;
      // Turnstile da un token de un solo uso: pedimos uno nuevo tras cada intento.
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    }
  });
}
