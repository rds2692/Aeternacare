# Medición y conversiones en Google Tag Manager

El sitio publica eventos en dataLayer; GTM decide qué etiquetas los envían a GA4 u otras plataformas. Consent Mode comienza con analítica y publicidad denegadas y se actualiza según la elección del visitante.

## Eventos del sitio

| Evento | Cuándo se emite | Parámetros |
|---|---|---|
| clic_whatsapp | La persona pulsa un enlace de WhatsApp marcado con data-analitica | origen, servicio |
| clic_telefono | Pulsa un enlace telefónico marcado con data-analitica | origen |
| clic_correo | Usa escribir/copiar correo | origen |
| clic_cotizar | Pulsa un CTA marcado como cotizar | origen, servicio |
| clic_cta | Pulsa otro CTA marcado con data-analitica | origen |
| cotizacion_iniciada | La persona interactúa por primera vez con el formulario de cotización | origen, servicio, etapa |
| cotizacion_preparada | El formulario valida y prepara la solicitud que abrirá WhatsApp | origen, servicio, canal, etapa |

`cotizacion_preparada` no confirma que WhatsApp se haya abierto, que el usuario haya pulsado Enviar ni que Aeterna haya recibido o calificado la solicitud. No lo informes como cotización recibida ni como lead confirmado. Para convertir el canal web en una medición completa, concilia el evento con los mensajes recibidos en WhatsApp o CRM y registra allí la cotización recibida y la cotización cualificada.

No se envían nombres, teléfonos, correos, textos libres, diagnósticos ni respuestas del formulario a dataLayer.

## Configuración recomendada en GTM

1. Crear un activador de Evento personalizado para cada evento de la tabla.
2. Enviar un evento GA4 homónimo con origen y servicio; para los eventos del formulario, añadir canal y etapa.
3. Mantener consentimiento de analítica/publicidad denegado hasta la elección del usuario; comprobarlo en Preview de GTM.
4. Probar aceptación/rechazo, CTA de cotización en home, precios, servicios, comunas, artículos y contacto, además de teléfono y formulario.
5. No marcar cotizacion_preparada como lead confirmado. Usarlo como solicitud iniciada y conciliar los mensajes efectivamente recibidos.
6. Retirar cualquier activador de generar_contacto que lo contabilice como lead; el sitio ya no emite ese evento.

## Embudo mínimo para evaluar la estrategia transaccional

| Etapa | Fuente | Pregunta que responde |
|---|---|---|
| Impresión | Search Console | ¿Google muestra la página para una consulta relevante? |
| Clic orgánico | Search Console | ¿La página resulta atractiva en el resultado? |
| clic_cotizar | GTM / GA4 | ¿La página conduce hacia la cotización? |
| cotizacion_iniciada | GTM / GA4 | ¿El formulario genera intención suficiente para empezar? |
| cotizacion_preparada | GTM / GA4 | ¿La persona completó los datos esenciales? |
| Cotización recibida | WhatsApp / CRM | ¿Llegó una solicitud real y con datos suficientes? |
| Cotización cualificada | CRM / operación | ¿Existe una necesidad y disponibilidad comercial real? |

El KPI principal del SEO transaccional es la relación entre clics orgánicos y cotizaciones recibidas. Los clics e impresiones son indicadores de descubrimiento, no resultados comerciales por sí solos.

La configuración del contenedor GTM es externa al repositorio y debe publicarse desde la cuenta autorizada.
