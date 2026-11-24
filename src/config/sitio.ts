/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN DE TU WEB
 *  Aquí cambias TEXTOS y DATOS. Los colores y la tipografía están en
 *  src/styles/tokens.css. Cambia solo lo que está entre comillas.
 *
 *  Lo que NO va aquí (porque es privado): tu email de destino y
 *  las claves de los servicios. Eso va en "variables de entorno"
 *  en el panel de tu hosting. Mira la guía 00-conceptos.md.
 * ─────────────────────────────────────────────────────────────
 */

export interface ConfigSitio {
  /** Nombre de la marca o persona. Sale en el título y el pie. */
  nombre: string;
  /** Dirección final de la web, con https://. Sirve para el SEO. */
  url: string;
  /** Idioma de la web (código de 2 letras). */
  idioma: string;
  seo: {
    titulo: string;
    /** Entre 120 y 160 caracteres. Es lo que sale en Google. */
    descripcion: string;
  };
  hero: {
    /** Línea pequeña sobre el título. Opcional: déjala vacía ('') y no se muestra. */
    antetitulo: string;
    titulo: string;
    subtitulo: string;
    botonPrincipal: { texto: string; enlace: string };
    botonSecundario?: { texto: string; enlace: string };
  };
  beneficios: {
    titulo: string;
    lista: ReadonlyArray<{ titulo: string; texto: string }>;
  };
  contacto: {
    titulo: string;
    texto: string;
    textoBoton: string;
    mensajeExito: string;
  };
  /**
   * Clave PÚBLICA de Cloudflare Turnstile (el "captcha" invisible).
   * Es pública: puede ir aquí sin problema. Déjala vacía ('') para
   * no usar Turnstile; el formulario seguirá protegido por la trampa
   * anti-bots (honeypot) y el control de tiempo.
   */
  turnstileSiteKey: string;
  legal: {
    /** Responsable del tratamiento (RGPD). Nombre o razón social. */
    responsable: string;
    /** NIF/CIF si eres empresa o autónomo. Puede quedar vacío al principio. */
    nif: string;
    /** Domicilio (obligatorio en el aviso legal si la web tiene fines comerciales, LSSI art. 10). */
    domicilio: string;
    /** Email PÚBLICO de contacto para temas legales y de privacidad. */
    emailPrivacidad: string;
    /** Datos registrales si eres sociedad (p. ej. Registro Mercantil). Vacío si eres autónomo. */
    datosRegistrales: string;
  };
}

export const sitio: ConfigSitio = {
  nombre: 'Estudio Ejemplo',
  url: 'https://www.ejemplo.com',
  idioma: 'es',
  seo: {
    titulo: 'Estudio Ejemplo · Webs que convierten visitas en clientes',
    descripcion:
      'Diseñamos y publicamos landing pages rápidas, seguras y fáciles de mantener para profesionales y pequeños negocios.',
  },
  hero: {
    antetitulo: '',
    titulo: 'Tu negocio merece una web que trabaje por ti',
    subtitulo:
      'Una página clara, rápida y segura que explica lo que haces y convierte visitas en conversaciones.',
    botonPrincipal: { texto: 'Hablemos', enlace: '#contacto' },
    botonSecundario: { texto: 'Qué incluye', enlace: '#beneficios' },
  },
  beneficios: {
    titulo: 'Qué consigues',
    lista: [
      {
        titulo: 'Carga en menos de un segundo',
        texto: 'HTML estático servido desde la red de Cloudflare, cerca de cada visitante.',
      },
      {
        titulo: 'Sin servidor que mantener',
        texto: 'El formulario funciona con una función pequeña que solo se ejecuta cuando alguien escribe.',
      },
      {
        titulo: 'Tus datos, protegidos',
        texto: 'Las claves viven en el panel del hosting, nunca en el código ni en GitHub.',
      },
    ],
  },
  contacto: {
    titulo: 'Cuéntame tu proyecto',
    texto: 'Respondo en menos de 24 horas laborables. Sin compromiso.',
    textoBoton: 'Enviar mensaje',
    mensajeExito: '¡Recibido! Te escribo muy pronto.',
  },
  turnstileSiteKey: '',
  legal: {
    responsable: 'Nombre Apellido',
    nif: '',
    domicilio: '',
    emailPrivacidad: 'privacidad@ejemplo.com',
    datosRegistrales: '',
  },
};
