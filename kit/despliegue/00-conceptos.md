# 00 · Las 10 palabras que necesitas entender

No hace falta memorizarlas. Vuelve aquí cuando una guía use una palabra que no te suene.

| Palabra | Qué es de verdad | Comparación |
|---|---|---|
| **Dominio** | El nombre de tu web: `tunegocio.com`. Se alquila por años. | La dirección postal de tu tienda. |
| **Registrador** | La empresa a la que le alquilas el dominio (Cloudflare, Namecheap, IONOS, DonDominio…). | El registro de la propiedad. |
| **DNS** | La lista que dice “cuando alguien pide `tunegocio.com`, mándalo a tal servidor” y “los emails de `tunegocio.com` van a tal sitio”. | La agenda de teléfonos de internet. |
| **Nameservers** | Quién gestiona esa agenda (DNS) de tu dominio. Si pones los de Cloudflare, gestionas todo desde Cloudflare. | Quién guarda la agenda. |
| **Hosting** | El ordenador (en realidad, miles) donde vive tu web y que la sirve a cada visitante. | El local de tu tienda. |
| **Repositorio (repo)** | Una carpeta en GitHub con todos los archivos de tu web y el historial de cada cambio. | Una carpeta de Google Drive con “control de versiones”. |
| **Build (construir)** | El proceso automático que convierte los archivos de la plantilla en la web final. Lo hace el hosting por ti. | Imprimir el folleto a partir del archivo de diseño. |
| **Deploy (desplegar)** | Publicar el resultado del build para que el mundo lo vea. | Colgar el folleto en el escaparate. |
| **Variable de entorno** | Un dato de configuración que se guarda en el panel del hosting, **fuera del código**. | Una nota pegada dentro de la caja fuerte, no en el escaparate. |
| **Secreto** | Una variable de entorno que, una vez guardada, nadie puede volver a leer (ni tú). Para claves y contraseñas. | La combinación de la caja fuerte. |

Y tres más que saldrán en Cloudflare:

- **Worker**: un programa pequeño que se ejecuta en los servidores de Cloudflare cuando alguien visita tu web. Tu landing entera es un Worker: sirve las páginas y, cuando alguien envía el formulario, ejecuta el código que te manda el email.
- **`workers.dev`**: la dirección gratuita que te da Cloudflare antes de tener dominio propio, tipo `mi-landing.tu-cuenta.workers.dev`.
- **Turnstile**: el “no soy un robot” de Cloudflare, pero normalmente invisible. Opcional.

---

## La regla de oro de la seguridad

> **Lo que está en GitHub es público (o puede llegar a serlo). Las claves NUNCA van en el código.**

Por eso la plantilla separa:

| Va en el código (GitHub) | Va en el panel del hosting (secretos) |
|---|---|
| Textos, colores, imágenes | La clave de Resend (`RESEND_API_KEY`) |
| La clave **pública** de Turnstile | La clave **secreta** de Turnstile |
| El nombre de tu marca | Tu email personal de destino |

Si alguna vez pegas por error una clave en GitHub: **bórrala en el servicio (Resend, Cloudflare…) y crea una nueva**. Borrarla del archivo no basta, porque queda en el historial.

---

## Cómo se conectan las piezas

1. **Tú** cambias un texto en GitHub (desde el navegador).
2. **GitHub** avisa a Cloudflare: “hay cambios”.
3. **Cloudflare** hace el *build* y el *deploy* solo, en 1–2 minutos.
4. **Tu web** ya muestra el cambio.

Esto se llama **despliegue continuo**: no subes archivos a mano nunca más. Cada cambio en GitHub se publica solo.
