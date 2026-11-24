# Catálogo de patrones de diseño "en automático"

Es un inventario orientativo, no una lista negra. Marca cada punto como visto, ausente o desconocido.
Corrige solo cuando hay evidencia y el patrón causa algo genérico, incoherente, repetitivo o dañino.

## Filosofía

- **El gusto depende del contexto.** Un degradado morado puede ser perfecto para una marca y perezoso para otra.
  El fallo no es la técnica: es usarla sin motivo, repetirla hasta que todo pese igual o mezclarla con efectos que cuentan otra historia.
- **Empieza por un sistema, no por un prompt vacío.** Web existente, colores, logo, capturas elegidas por algo concreto, textos reales.
- **La coherencia gana a la decoración.** Una idea fuerte sostiene una página. Cinco ideas sueltas hacen ruido.
- **Resta antes de sustituir.**
- **Aprende el nombre de los problemas.** "Etiqueta superior", "medida de línea", "tarjetas anidadas", "salto de maquetación".
  Pedir "hazlo mejor" no sirve; pedir "quita la etiqueta superior, el titular ya marca la jerarquía" sí.

## 1. Producto y dirección
- La página no deja claro qué se vende, a quién ni para qué.
- La primera pantalla no explica qué hace el negocio.
- El estilo valdría para cualquier startup cambiando el texto.
- Mezcla varios estilos sin jerarquía.
- Copia literal de una referencia en lugar de traducirla.
- Aparecen colores, fuentes, radios o sombras fuera del sistema sin motivo.
- Varios focos y ninguno dominante.

## 2. Composición y espacio
- Solapes accidentales de texto, botones e imágenes al cambiar de tamaño.
- Alineación que cambia de sección a sección sin intención.
- Lo relacionado separado y lo que no, apretado.
- Titulares más cerca de la sección anterior que de su contenido.
- El mismo espaciado en todo: ritmo plano.
- Texto pegado al borde de la pantalla en móvil.
- Líneas de texto demasiado largas (más de 70 a 75 caracteres).
- Saltos de línea forzados que se rompen en móvil.
- Scroll horizontal accidental.
- Una frase larga ampliada hasta ocupar toda la primera pantalla.
- En móvil todo se apila sin repensar la prioridad.
- Barras fijas que tapan contenido o botones.

## 3. Contenedores, tarjetas y forma
- Todo metido en tarjetas. Tarjetas dentro de tarjetas.
- Cuadrícula "bento" porque está de moda, no porque el contenido tenga pesos distintos.
- Tarjetas idénticas icono + título + descripción repetidas hasta que nada destaca.
- Todo redondeado por defecto; radios extremos en piezas pequeñas.
- Píldoras para cosas que no son estado, etiqueta, filtro ni acción.
- Franja gruesa de color en un solo lado de una tarjeta redondeada.
- Borde fino y sombra difusa intentando marcar el mismo borde.
- Radios que cambian entre componentes de la misma familia.
- El plan destacado de precios solo se distingue por un brillo.

## 4. Tipografía y jerarquía
- Etiqueta en mayúsculas espaciadas encima de casi cada titular.
- Píldora en el hero que repite lo que dice el titular.
- Números pequeños (01, 02, 03) que imitan una revista sin ayudar a nada.
- Titular, subtítulo y cuerpo con tamaños casi iguales.
- Interletrado tan apretado que las letras chocan, o tan abierto que rompe las palabras.
- Párrafos largos centrados o justificados.
- Cursivas decorativas para "parecer editorial".
- Texto con degradado que se lee peor.
- Demasiadas familias tipográficas.
- Botones que se parten en dos líneas.
- Palabras huérfanas en titulares.

## 5. Color, luz y material
- Degradado morado a azul en textos, botones, fondos y adornos.
- Acentos cian sobre fondo oscuro imitando "futuro genérico".
- Varios colores de acento sin función.
- Luces radiales saturadas flotando detrás de las secciones.
- Brillo en cada hover, cada activo, cada destacado.
- Efecto cristal donde no hay capa delante y detrás.
- Desenfoque + brillo + degradado + borde + sombra + ruido en un solo componente.
- Fondo crema elegido solo porque "queda elegante".
- Texto gris sobre fondo de color, lavado y sin contraste.
- Modo oscuro = negro + neón.
- El color como única forma de indicar un estado.

## 6. Imagen, ilustración e iconos
- Ilustración abstracta genérica en el hero porque no se eligió un concepto.
- Escenas o mascotas dibujadas en SVG que parecen sin terminar.
- Fotos de banco presentadas como prueba del negocio.
- Imágenes con luces, encuadres y estilos diferentes entre sí.
- Un panel de control, ventana de código o móvil decorativo que no muestra el producto real.
- Retratos de relleno o avatares falsos que sugieren clientes.
- Baldosas de icono enormes encima de cada beneficio.
- Iconos de varias familias mezclados.
- Recortes que cortan al sujeto en móvil.

## 7. Componentes, estados e interacción
- Varias acciones principales con el mismo peso.
- Navegación sin estado activo claro.
- Una píldora de estado con punto que parpadea sin datos reales detrás.
- Sin foco visible en enlaces, botones y campos.
- Información esencial que solo aparece al pasar el ratón.
- Faltan estados de carga, vacío, error, desactivado o éxito.
- Botones con alturas, rellenos o radios distintos.
- Zonas táctiles pequeñas o apretadas.
- Validación del formulario solo al enviar.

## 8. Movimiento y scroll
- Todos los elementos entran con la misma animación.
- Movimiento para que una composición estática "parezca cara".
- Varias animaciones infinitas compitiendo con la lectura.
- Cursor parpadeante falso en un titular.
- Cinta de logos en movimiento continuo.
- Rebotes y efectos elásticos en cambios normales de interfaz.
- Zoom o giro de imagen al pasar el ratón sin motivo.
- Animar ancho, alto, márgenes o rellenos (provoca tirones).
- Scroll suave añadido sin comprobar teclado, anclas ni movimiento reducido.
- Secciones fijadas que atrapan al usuario demasiado tiempo.
- Contenido que empieza oculto y se queda invisible si falla el JavaScript.
- Parallax que dificulta leer o marea.
- "Movimiento reducido" que solo acorta la animación en lugar de mostrar el estado final.

## 9. Textos, pruebas y estructura
- Titular que vale para cualquier producto.
- Palabras de moda en lugar de un verbo y un objeto concretos.
- Secuencia por defecto: hero, logos, cifras, bento, testimonios, preguntas, llamada final, venga o no a cuento.
- Secciones que existen solo para que la página "parezca completa".
- Cifras grandes sin respaldo.
- Testimonios, clientes, valoraciones, premios o alianzas inventados.
- Precios sin unidad, periodicidad o qué incluye.
- Botones con verbos vagos.
- Mensajes de error que no dicen cómo arreglarlo.

## 10. Calidad, accesibilidad y producción
- Errores en consola o interacciones rotas.
- Contenido importante con opacidad 0 porque la animación no arrancó.
- Contraste insuficiente.
- Niveles de titular que se saltan (de h1 a h4).
- Controles sin nombre accesible o sin teclado.
- Orden de lectura distinto del visual.
- Saltos de maquetación al cargar fuentes o imágenes.
- Componentes que solo funcionaban con textos cortos de ejemplo.
- Enlaces muertos, textos de relleno, imágenes rotas.
- Decir que algo funciona sin haberlo visto renderizado.

## Grupos que delatan una misma causa

- **SaaS de IA genérico:** etiqueta superior, titular enorme, degradado morado, luces radiales, tarjetas de cristal, baldosas de icono, bento, texto vago.
- **Apocalipsis de tarjetas:** sección en tarjeta, tarjetas anidadas, píldoras, bordes redundantes, sombras sueltas, radios extremos.
- **Teatro de movimiento:** contenido oculto en reposo, entradas idénticas, cinta de logos, puntos que laten, zoom al pasar, sin camino de movimiento reducido.
- **Sofisticación falsa:** etiquetas mono diminutas, cuadrícula decorativa, panel falso, cifras inventadas, marco de navegador.
- **Pulido antes que verdad:** efectos bonitos tapando un texto confuso, acciones débiles, estados ausentes, móvil roto, pruebas sin verificar.

Arregla la causa una vez, no cada síntoma por separado.

## Vocabulario para pedir cambios concretos

- "Quita la etiqueta superior; el titular ya marca la jerarquía."
- "Elimina las luces radiales y deja una sola imagen de producto como foco."
- "Aplana las tarjetas anidadas; agrupa con espacio y separadores."
- "Adapta la sección de precios a la tipografía, radios y paleta del resto de la página."
- "Mantén el solape, pero reserva una zona segura para el texto en móvil y tablet."
- "Sustituye las baldosas de icono por fotos del producto o iconos dentro del texto."
- "Haz el estado estático salvo que muestre datos que cambian."
- "Conserva la tesis visual y quita los efectos que repiten el mismo trabajo."

Traducido y adaptado de `ARTICLE.md` de la skill `no-ai-design-slop` de MengTo/Skills (MIT, © 2026 Meng To).
