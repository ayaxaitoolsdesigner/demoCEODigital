# ESPECIFICACION.md · {{NOMBRE_NEGOCIO}}

Versión: 1 · Fecha: {{fecha}} · Estado: borrador / aprobada por {{nombre}} el {{fecha}}

## 1. Resumen
- Negocio: 
- Oferta: 
- Público: 
- Acción principal: 

## 2. Objetivo medible
- Ejemplo: recibir al menos 5 solicitudes de contacto a la semana durante el primer mes.

## 3. Fuera de alcance (esta versión no incluye)
- Pagos online
- Blog
- Varios idiomas
- Base de datos (los contactos llegan por email)

## 4. Mapa de secciones
| # | Sección | Para qué sirve | Contenido aprobado |
|---|---|---|---|
| 1 | Hero | Decir qué es, para quién y qué hacer | Titular: … / Subtítulo: … / Botón: … |
| 2 | … | … | … |

## 5. Dirección visual
- Tesis visual (una frase): 
- Paleta (tokens y códigos): 
- Tipografía: 
- Hero elegido (catálogo nº y nombre): 
- Guion de movimiento (qué se mueve, cuándo, por qué): 
- Referencias y qué se toma de cada una (solo principios): 

## 6. Comportamiento
### Formulario de contacto
- Campos y si son obligatorios: nombre (sí), email (sí), mensaje (sí), consentimiento (sí)
- Validaciones y mensajes de error:
- Al enviar con éxito: mensaje "…" y email al dueño en {{email_destino}}
- Protección contra bots: trampa oculta + (opcional) Cloudflare Turnstile + límite de envíos
- Qué pasa después (promesa al cliente): 

### Navegación y enlaces
- 

## 7. Requisitos no funcionales
- Rendimiento: LCP < 2,5 s en móvil, Lighthouse ≥ 90
- Accesibilidad: WCAG 2.2 AA
- SEO: indexar sí/no, título, descripción, imagen para compartir
- Privacidad: RGPD y LSSI (aviso legal, privacidad, cookies)
- Seguridad: cabeceras, secretos fuera del código, validación en servidor
- Navegadores: dos últimas versiones de Chrome, Safari, Firefox y Edge; iOS y Android

## 8. Criterios de aceptación
CA-01 …
Dado …
Cuando …
Entonces …

## 9. Pendientes y decisiones abiertas
- [PENDIENTE] … (quién lo da)

## 10. Registro de cambios
- v1 {{fecha}}: primera versión
