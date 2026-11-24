# Publicar tu landing en internet · Guías paso a paso

Estas guías te llevan desde “tengo la plantilla” hasta “mi web está en **www.midominio.com** y los mensajes del formulario me llegan al email”.
Están escritas para personas que **no han programado nunca**: todo se hace desde el navegador, sin terminal.

> Tiempo total la primera vez: **60–90 minutos** (la mitad es esperar a que se propague el dominio).
> Coste: **0 €** salvo el dominio (unos 10–15 € al año).

---

## El orden recomendado

| Paso | Guía | Qué consigues | Tiempo |
|---|---|---|---|
| 0 | [00-conceptos.md](00-conceptos.md) | Entender las 10 palabras que vas a oír (dominio, DNS, repositorio…) | 10 min |
| 1 | [01-github.md](01-github.md) | Tu web guardada en GitHub y editable desde el navegador | 15 min |
| 2 | [02-email-resend.md](02-email-resend.md) | La clave para que el formulario envíe emails | 10 min |
| 3 | [03-cloudflare.md](03-cloudflare.md) ⭐ | Tu web publicada, con dominio propio y formulario funcionando | 30 min |
| 4 | [07-checklist-produccion.md](07-checklist-produccion.md) | Revisar seguridad, SEO y legal antes de anunciarla | 15 min |

**¿Prefieres otro hosting?** Sustituye el paso 3 por:
- [04-vercel.md](04-vercel.md)
- [05-netlify.md](05-netlify.md)
- [06-anexo-github-pages-firebase.md](06-anexo-github-pages-firebase.md) (no recomendados para esta plantilla, te explicamos por qué)

**Si algo falla:** [08-problemas-frecuentes.md](08-problemas-frecuentes.md).
**El siguiente nivel:** [09-evolucion-agente-leads.md](09-evolucion-agente-leads.md), cómo hacer que un agente de IA conteste a cada contacto y le proponga una llamada, sin exponer tu teléfono.

---

## ¿Qué hosting elijo?

| | Cloudflare ⭐ | Vercel | Netlify |
|---|---|---|---|
| Precio para una landing | Gratis | Gratis (plan Hobby) | Gratis (300 créditos/mes) |
| Formulario de la plantilla | ✅ Funciona tal cual | ✅ Funciona tal cual | ✅ Funciona tal cual |
| Comprar el dominio en el mismo sitio | ✅ A precio de coste | ✅ | ❌ (lo compras fuera) |
| Anti-bots Turnstile | ✅ Mismo panel | ✅ (cuenta de Cloudflare aparte) | ✅ (cuenta de Cloudflare aparte) |
| Lo mejor | Todo en un sitio: hosting, dominio, DNS, anti-bots, logs | Panel muy sencillo, vistas previas de cada cambio | Panel claro, formularios propios si algún día los quieres |
| A tener en cuenta | El panel tiene muchas opciones (te decimos cuáles ignorar) | Revisa sus condiciones si la web es de un negocio | Plan gratis por créditos con límite estricto: si publicas muchas veces al mes puedes agotarlo |

**Nuestra recomendación: Cloudflare.** Es donde la plantilla está pensada para vivir, el plan gratuito es muy generoso, y tienes hosting, dominio y DNS en el mismo panel. Menos sitios = menos cosas que se rompen.

---

## Cómo está montado (para entenderlo, no para memorizarlo)

```
 Visitante ──► www.tudominio.com ──► Cloudflare
                                       │
                 páginas (HTML) ◄──────┤  99 % de las visitas: archivos estáticos, gratis y rapidísimos
                                       │
     formulario ─► /api/contacto ──────┤  1 función pequeña (Worker) que:
                                       │   1. comprueba los datos
                                       │   2. descarta bots
                                       │   3. pide a Resend que te mande un email
                                       ▼
                                 Tu bandeja de entrada  ◄── pulsas "Responder" y hablas con el cliente
```

**No hay base de datos.** Los datos del cliente no se guardan en ningún sitio: viajan de su navegador a tu email. Es lo más sencillo, lo más barato y lo más fácil de cumplir con la ley de protección de datos.

---

## Antes de empezar, ten a mano

- [ ] Un email que revises a diario (donde quieres recibir los contactos).
- [ ] Tu copia de la plantilla: pulsa **Use this template** en [github.com/ayaxaitoolsdesigner/demoCEODigital](https://github.com/ayaxaitoolsdesigner/demoCEODigital) (o el ZIP de la plantilla, descomprimido).
- [ ] 1 hora sin prisas.
- [ ] (Opcional) Una tarjeta, solo si vas a comprar el dominio.

Capturas de cómo se ve la plantilla recién publicada: [capturas/plantilla-escritorio.png](capturas/plantilla-escritorio.png) y [capturas/plantilla-movil.png](capturas/plantilla-movil.png).

> Las pantallas de Cloudflare, Vercel, Netlify y Resend cambian de vez en cuando. Si un botón no se llama exactamente igual, busca el más parecido: el orden de los pasos no cambia. Guías revisadas en noviembre de 2026.
