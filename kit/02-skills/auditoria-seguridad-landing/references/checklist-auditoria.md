# Checklist de auditoría de seguridad y privacidad

Marca ✅ comprobado · ⚠️ con reservas · ❌ falla · ❓ no se pudo comprobar (y por qué).

## Formulario
- [ ] Validación en servidor con el mismo esquema que en el navegador
- [ ] Límites de longitud en todos los campos y en el cuerpo de la petición
- [ ] Honeypot presente, oculto y descartado en servidor
- [ ] Trampa de tiempo
- [ ] Turnstile verificado en servidor (si se usa)
- [ ] Límite de envíos por IP
- [ ] Comprobación de `Origin`
- [ ] Destinatario fijo en variables de entorno
- [ ] Email del visitante solo en `Reply-To`
- [ ] Saltos de línea rechazados en nombre y email
- [ ] HTML escapado en el email
- [ ] Mensajes de error neutros
- [ ] No se registran datos personales en logs
- [ ] Funciona sin JavaScript

## Secretos
- [ ] Ninguna clave en el código, en el historial de Git ni en archivos públicos (busca "re_", "sk_", "key", "secret")
- [ ] `.env` ignorado por Git; `.env.example` sin valores
- [ ] Secretos configurados en el panel del proveedor
- [ ] Claves con permisos mínimos

## Cabeceras
- [ ] CSP sin `unsafe-eval` y con `frame-ancestors 'none'`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy`
- [ ] `Permissions-Policy`
- [ ] HSTS (con dominio definitivo)
- [ ] Sin errores de CSP en la consola

## Dependencias
- [ ] `package-lock.json` en el repositorio
- [ ] `npm audit` sin altas ni críticas
- [ ] Cada dependencia justificada
- [ ] Sin scripts de terceros no aprobados

## Privacidad y legal
- [ ] Información básica de protección de datos junto al formulario
- [ ] Casilla de consentimiento no premarcada y obligatoria
- [ ] Aviso legal con datos reales del titular (o pendiente marcado)
- [ ] Política de privacidad con encargados (hosting, email) y derechos
- [ ] Cookies: inventario real; banner solo si hay cookies no necesarias
- [ ] Fuentes alojadas en el propio dominio
- [ ] Sin teléfono ni email personal expuestos
- [ ] Se piden solo los datos necesarios

## Cuentas y dominio
- [ ] Doble factor en registrador, GitHub, hosting y email
- [ ] Bloqueo de transferencia del dominio
- [ ] SPF, DKIM y DMARC del dominio que envía
- [ ] DNSSEC (si es posible)

## Prueba final
- [ ] Envío real de prueba recibido en la bandeja del dueño (no en spam)
- [ ] securityheaders.com: nota A o superior
- [ ] Pruebas automáticas en verde
