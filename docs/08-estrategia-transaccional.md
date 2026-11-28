# Estrategia SEO transaccional

**Objetivo:** convertir la visibilidad informativa de Search Console en solicitudes
de cotización de cuidado domiciliario en Santiago.

## Principio

Las consultas informativas sobre cuidadora, TENS y enfermería no se eliminan: se
convierten en la entrada al embudo. Cada página debe permitir que la familia
identifique el servicio adecuado y solicite una cotización sin volver a buscar.

## Arquitectura comercial

| Necesidad de búsqueda | Página principal | Acción |
|---|---|---|
| Cuidado general en Santiago | Inicio | Cotizar a domicilio |
| Comprar por precio o comparar | `/precios/` | Cotizar el servicio elegido |
| Comparar perfiles profesionales | Guía cuidadora, TENS o enfermera | Selector con preselección de servicio |
| Contratar una cuidadora | `/servicios/cuidadoras-adulto-mayor/` | Cotizar cuidadora |
| Contratar TENS | `/servicios/tens-a-domicilio/` | Cotizar TENS |
| Contratar enfermería | `/servicios/enfermeria-a-domicilio/` | Cotizar enfermería |
| Buscar atención en una comuna | `/comunas/<comuna>/` | Cotizar con la comuna preseleccionada |

## Embudo implementado

1. La landing o el artículo explica la necesidad y presenta una acción de
   cotización.
2. Los CTA de servicio abren `/contacto/` con `servicio` y `origen` en la URL.
3. El formulario preselecciona el profesional y la comuna cuando llegan por
   parámetros.
4. La persona completa solo nombre, WhatsApp, profesional, comuna, turno y horas.
5. Los datos complementarios quedan en un bloque opcional.
6. El formulario prepara un mensaje de WhatsApp y registra eventos sin enviar
   datos personales al dataLayer.

## Consultas objetivo iniciales

Estas consultas son hipótesis de trabajo basadas en los servicios publicados.
No representan volúmenes de búsqueda:

- Cuidadora adulto mayor Santiago.
- Cuidadora por horas, nocturna o de 24 horas.
- TENS a domicilio Santiago y turno TENS de 8 horas.
- Enfermera o enfermería a domicilio Santiago.
- Control de signos vitales, curaciones e hidratación EV a domicilio.
- Precio o cotización de cuidadora, TENS o enfermería a domicilio.

Las búsquedas locales deben validarse con datos de Search Console antes de crear
nuevas páginas por comuna. Las ocho páginas existentes se mantienen y se revisan
con clics, impresiones y cotizaciones atribuidas.

## Medición

El evento `cotizacion_preparada` no confirma que una cotización haya llegado. El
indicador principal se calcula conciliando la web con los mensajes recibidos en
WhatsApp o CRM:

```text
clic orgánico → clic_cotizar → cotizacion_iniciada
→ cotizacion_preparada → cotización recibida → cotización cualificada
```

## Revisión

- Semanal durante el primer mes: errores de formulario, CTA más usado, servicio
  preseleccionado y solicitudes recibidas.
- Cada 28 días: consultas y páginas con impresiones, CTR, posición y clics hacia
  cotización.
- A las 8 semanas: evaluar qué páginas de servicio ganan visibilidad y cuáles
  necesitan contenido, pruebas, precios o enlaces internos adicionales.
