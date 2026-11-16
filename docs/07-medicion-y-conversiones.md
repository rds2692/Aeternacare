# Medición y conversiones en Google Tag Manager

El sitio publica eventos en dataLayer; GTM decide qué etiquetas los envían a GA4 u otras plataformas. Consent Mode comienza con analítica y publicidad denegadas y se actualiza según la elección del visitante.

## Eventos del sitio

| Evento | Cuándo se emite | Parámetros |
|---|---|---|
| clic_whatsapp | La persona pulsa un enlace de WhatsApp marcado con data-analitica | origen |
| clic_telefono | Pulsa un enlace telefónico marcado con data-analitica | origen |
| clic_correo | Usa escribir/copiar correo | origen |
| clic_cta | Pulsa otro CTA marcado con data-analitica | origen |
| contacto_whatsapp_preparado | El formulario valida y prepara el mensaje que abrirá WhatsApp | origen, canal, etapa |

El evento del formulario no confirma que WhatsApp se haya abierto, que el usuario haya pulsado Enviar ni que Aeterna haya recibido o calificado el contacto. No lo informes como lead confirmado. Para leads reales, concilia el evento con los contactos recibidos en WhatsApp o CRM.

No se envían nombres, teléfonos, correos, textos libres, diagnósticos ni respuestas del formulario a dataLayer.

## Configuración recomendada en GTM

1. Crear un activador de Evento personalizado para cada evento de la tabla.
2. Enviar un evento GA4 homónimo con origen; para el formulario, añadir canal y etapa.
3. Mantener consentimiento de analítica/publicidad denegado hasta la elección del usuario; comprobarlo en Preview de GTM.
4. Probar aceptación/rechazo, enlaces WhatsApp en home, servicios, comunas y contacto, teléfono y formulario en Preview y GA4 Realtime.
5. No marcar contacto_whatsapp_preparado como lead confirmado. Si se usa como evento clave, reportarlo como inicio de contacto.
6. Retirar cualquier activador de generar_contacto que lo contabilice como lead; el sitio ya no emite ese evento.

La configuración del contenedor GTM es externa al repositorio y debe publicarse desde la cuenta autorizada.