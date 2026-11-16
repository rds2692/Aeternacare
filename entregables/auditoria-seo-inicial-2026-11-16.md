# Auditoría SEO inicial — Aeterna Care

**Fecha:** 16 de noviembre de 2026  
**Dominio revisado:** [www.aeternacare.cl](https://www.aeternacare.cl/)  
**Objetivo:** aumentar consultas cualificadas de familias que buscan cuidado domiciliario para personas mayores en Santiago.

## Resumen ejecutivo

El sitio tiene una base técnica y on-page sólida: páginas renderizadas en HTML, títulos y descripciones específicos, canonicals, HTTPS, `robots.txt`, sitemap y cobertura clara de servicios y comunas. El sitemap declara **30 URLs** y las 30 respondieron al rastreo.

La prioridad inmediata es mejorar la calidad y la confianza de las páginas que deberían captar demanda local, y confirmar que el seguimiento registra contactos reales. La revisión encontró tres riesgos principales:

1. Las páginas de las ocho comunas tienen **92,3 % de similitud media** (Jaccard sobre trigramas del texto de `<main>`, después de normalizar el nombre de cada comuna). Varias parejas llegan a 100 %.
2. `aeternacare.cl` y `www.aeternacare.cl` responden ambos con 200 y contenido equivalente; el canonical apunta a `www`, pero el host alternativo no redirige.
3. Se ve el contenedor **GTM-5SDQ9M5Q** y Consent Mode comienza con analítica y publicidad denegadas. No se puede comprobar desde el HTML qué etiquetas GA4 contiene ese contenedor ni si un contacto se registra como conversión.

**Puntuación SEO preliminar: 68/100.** Es una estimación heurística de la revisión pública, no una puntuación de datos de campo. PageSpeed Insights respondió 429 (cuota limitada), por lo que rendimiento/CWV se dejó neutral en el cálculo; GEO e imágenes también son estimaciones. No se tuvo acceso a Search Console, Analytics ni al perfil de Google Business Profile.

| Categoría | Peso | Estimación | Base |
|---|---:|---:|---|
| SEO técnico | 22 % | 82 | Crawl, canonicals, sitemap y robots correctos; duplicidad de host pendiente |
| Calidad de contenido | 23 % | 58 | Buen abanico de temas, pero alta similitud local y autoría genérica en la muestra |
| SEO on-page | 20 % | 83 | Titles, descriptions, H1 y URLs claros en las páginas revisadas |
| Schema | 10 % | 54 | Tipos adecuados, pero dirección postal incompleta para elegibilidad local enriquecida |
| Rendimiento/CWV | 10 % | 50 | Valor neutral por falta de medición; PSI devolvió 429 |
| Preparación para búsqueda con IA | 10 % | 55 | Estructura y respuestas temáticas presentes; citabilidad/visibilidad no medidas |
| Imágenes | 5 % | 80 | La documentación interna declara optimización; falta verificar todos los assets publicados |

La media ponderada resulta en 67,9, redondeada a 68. Cambiará cuando se disponga de CWV, Search Console y una revisión de los recursos visuales publicados.

No encontré un bloqueo general de indexación en la configuración pública. El riesgo no es falta de páginas, sino convertir las páginas existentes en una mejor razón para elegir Aeterna y medirlo.

## Alcance y datos comprobados

- Revisados `robots.txt`, índice de sitemap y las 30 URLs declaradas.
- El sitemap incluye home, contacto, servicios, ocho páginas por comuna, blog, 11 artículos y páginas legales. No incluye `/gracias/`; `robots.txt` la excluye.
- Las páginas rastreadas responden y declaran canonical propio con `www`.
- La home, las páginas de servicio y los artículos examinados incluyen meta title, description, H1 y JSON-LD. Se detectaron `LocalBusiness`, `Service`, `BlogPosting`, `ContactPage` y `BreadcrumbList` según el tipo de página.
- Hay un contenedor GTM en el HTML; no se expone un ID `G-…` directamente. Eso no descarta que GA4 esté configurado dentro de GTM.
- Consulté el autocompletado público de Google con idioma español y país Chile. Es una fuente de **sugerencias**, no de volumen ni de dificultad de keyword.
- Consulté resultados públicos actuales para comparar páginas y mensajes de competidores; la muestra no es un estudio completo de posiciones.

## Hallazgos priorizados

### Alto — Consolidar o diferenciar las páginas de comuna

**Observación:** `/comunas/` y ocho landings locales están indexables. Las landings contienen aproximadamente 595–605 palabras en el HTML rastreado, pero comparten casi todo el texto: similitud media de trigramas 92,3 % después de sustituir las menciones del nombre de la comuna por una etiqueta común. La mayoría de las páginas comparadas fue idéntica con esta normalización.

**Acción:** mantener páginas individuales solo donde exista cobertura real y contenido útil propio. Para cada una, añadir datos verificables que cambien la decisión de la familia: disponibilidad real, tipos de turno, proceso de coordinación y ejemplos o preguntas locales que el equipo pueda sostener. Si no hay diferencias relevantes, consolidar la información en `/comunas/` y redirigir las páginas retiradas con 301 hacia su reemplazo más cercano. No borrar URLs sin revisar GSC, enlaces entrantes y tráfico primero.

**Dependencia:** confirmar cobertura, servicios y tiempos de atención por comuna; después revisar impresiones, clics y enlaces de cada URL en GSC.

**Cómo sabremos que falló:** tras volver a rastrear, las landings siguen teniendo texto intercambiable y no generan impresiones o contactos propios en 8–12 semanas.  
**Indicador temprano:** porcentaje de texto sustantivo único y consultas/clics por comuna en GSC.

### Alto — Validar la medición del contacto antes de escalar adquisición

**Observación:** producción carga GTM-5SDQ9M5Q y declara consentimiento por defecto denegado para analítica y publicidad. Los eventos de conversión no aparecen en el HTML estático consultado; el contenedor de GTM es externo y no se pudo inspeccionar su configuración privada.

**Acción:** validar en Preview de GTM y GA4 Realtime cada camino de contacto: envío del formulario, clic en WhatsApp desde la home, desde una página de servicio y desde una landing local. Asegurar un evento de lead único y deduplicado, marcado como evento clave, y distinguir canal/página de origen. No enviar texto libre ni datos de salud ingresados por una familia a GA4.

**Dependencia:** permisos sobre GTM y GA4; confirmar que el estado de consentimiento se transmite como se espera en aceptación y rechazo.

**Cómo sabremos que falló:** el contacto de prueba no aparece en Realtime, aparece duplicado o aparece al rechazar el consentimiento.  
**Indicador temprano:** proporción de contactos de prueba registrados correctamente y conversión por landing.

### Alto — Resolver la duplicidad del host

**Observación:** las variantes `https://aeternacare.cl/` y `https://www.aeternacare.cl/` responden con 200 y entregan la misma página; ambas declaran canonical a `www`.

**Acción:** configurar una redirección permanente del host sin `www` a `www` en Vercel/DNS o la capa de hosting y verificar también HTTP→HTTPS y la política de barra final. Mantener `www` como host único, dado que así está configurado el canonical y el sitemap.

**Dependencia:** acceso a la configuración del dominio/hosting. Revisar Search Console para ambas propiedades antes y después.

**Cómo sabremos que falló:** la variante sin `www` sigue respondiendo 200 o crea cadenas de redirección.  
**Indicador temprano:** respuestas 301/308 en las variantes y una sola URL canónica en GSC.

### Alto — Hacer más demostrable la experiencia y la confianza

**Observación:** el artículo de precio examinado expone `Equipo Aeterna Care` como autor y fecha de publicación/modificación del 4 de noviembre de 2026. No se observa una ficha de autor o revisor profesional enlazada en ese marcado. El cuidado domiciliario implica decisiones relacionadas con salud y seguridad.

**Acción:** publicar perfiles reales del equipo responsable, credenciales que se puedan verificar, criterios de asignación y alcance del servicio. Para los artículos de salud y cuidado, identificar autor y revisor cualificado cuando corresponda, fecha de revisión real y fuentes fiables. Añadir testimonios solo con autorización y sin presentarlos como resultados garantizados.

**Dependencia:** nombres, roles, credenciales y aprobaciones del negocio; ninguna credencial debe inferirse.

**Cómo sabremos que falló:** las páginas siguen sin identificar quién responde por los consejos y el servicio.  
**Indicador temprano:** porcentaje de páginas comerciales/editoriales con autoría, revisión y señales de confianza verificables.

### Medio — Completar el marcado local sin inventar una dirección

**Observación:** el JSON-LD usa `LocalBusiness` en la home y páginas rastreadas, con teléfono, zona de servicio y `PostalAddress` limitado a Santiago, Región Metropolitana y Chile; no incluye calle. También hay schema `Service` con comunas atendidas.

**Acción:** verificar la dirección real de la entidad y su política de atención al público. Si se publica una dirección apta y veraz, completar el marcado con los campos disponibles. Si es un negocio de área de servicio sin local abierto al público, no inventar una dirección: mantener información de `Organization`/`Service` y las áreas servidas, y alinear el sitio con el perfil de Google Business Profile. Google lista `address` como propiedad requerida para la elegibilidad del resultado enriquecido `LocalBusiness`; la forma actual no aporta una dirección postal completa. [Documentación de Google sobre datos estructurados LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)

**Dependencia:** razón social, dirección real y decisión sobre atención al público; confirmar el perfil GBP.

**Cómo sabremos que falló:** los datos del sitio, el marcado y GBP difieren o se añadió una dirección que no representa al negocio.  
**Indicador temprano:** cero discrepancias entre teléfono, nombre, dirección/área servida y horarios publicados.

### Medio — Mejorar la página de precio con información propia

**Observación:** el sitio ya tiene un artículo dedicado a “cuánto cuesta” y la meta description promete valores referenciales. En resultados públicos, competidores presentan precios o rangos concretos, por ejemplo Altavida muestra $38.000 por 8 horas y $42.000 por 12 horas, y Serestar indica un rango por turno. Esas cifras son de terceros y no deben trasladarse a Aeterna. [Altavida Senior](https://altavidasenior.cl/) · [Serestar: costos de cuidado](https://serestar.cl/cuanto-cuesta-el-cuidado-de-adultos-mayores/)

**Acción:** si el negocio lo autoriza, publicar valores reales o un rango actualizado con fecha, duración de turno, perfil, tareas incluidas, recargos y condiciones de cotización. Si todavía no hay tarifa estable, explicar de forma concreta qué variables definen el valor y ofrecer una cotización con respuesta y pasos claros. Mantener el CTA hacia una consulta.

**Dependencia:** tabla comercial aprobada y definición de servicios/turnos realmente disponibles.

**Cómo sabremos que falló:** el artículo atrae impresiones pero no resuelve la comparación ni genera clics a contacto.  
**Indicador temprano:** CTR del artículo, clics a WhatsApp/contacto y leads atribuidos a esa URL.

### Medio — Profundizar páginas comerciales y enlazado contextual

**Observación:** los cuatro servicios examinados cubren cuidadoras, TENS, enfermería y técnicos kinesiólogos. Las páginas individuales tienen aproximadamente 476–514 palabras. El sitio tiene 11 artículos con intenciones útiles (precio, turnos, demencia, vuelta del hospital, elección de cuidadora), pero el enlazado y el rendimiento no se pueden priorizar por posición sin GSC.

**Acción:** ampliar primero las páginas de cuidadoras, TENS y enfermería con alcance, límites, perfiles, coordinación, requisitos y preguntas reales. Enlazar desde el artículo de precio hacia cuidadoras/contacto; desde “cuidadora, TENS o enfermera” hacia las tres páginas de servicio; desde las guías sobre demencia, movilidad y vuelta del hospital hacia el servicio que corresponda. Añadir CTA contextual y breadcrumbs coherentes.

**Dependencia:** validar contenido del servicio y extraer de GSC las consultas y páginas con posiciones/impr. relevantes. No se debe tratar un mínimo de palabras como objetivo por sí solo.

**Cómo sabremos que falló:** mejora el tráfico informacional pero no crecen clics hacia servicios ni contactos orgánicos.  
**Indicador temprano:** clics internos desde cada artículo a páginas transaccionales y eventos de contacto por landing.

### Medio — Fortalecer presencia local y autoridad externa

**Observación:** el sitio declara ocho comunas y un teléfono de contacto; esta auditoría no pudo confirmar GBP, reseñas, citas locales ni backlinks.

**Acción:** revisar perfil GBP (verificación, categoría, áreas, teléfono, servicios y reseñas), solicitar reseñas honestas a clientes reales sin incentivos ni filtrado, y asegurar consistencia de nombre/teléfono/dirección o área servida en perfiles y directorios pertinentes. Priorizar alianzas y menciones locales verificables.

**Dependencia:** acceso a GBP y datos oficiales del negocio. No crear perfiles duplicados ni publicar una dirección residencial sin aprobación.

**Cómo sabremos que falló:** no hay más consultas de marca, clics de llamada/web ni reseñas auténticas durante el periodo.  
**Indicador temprano:** vistas e interacciones del perfil, reseñas nuevas y dominios locales que mencionan el negocio.

## Intenciones de búsqueda y arquitectura recomendada

Estas son consultas y temas observados en el autocompletado de Google; **no representan volúmenes**:

| Intención | Consultas sugeridas observadas | Página/acción |
|---|---|---|
| Contratar | “cuidadora adulto mayor Santiago”, “cuidadora adulto mayor Santiago Chile”, “busco cuidadora adulto mayor en Santiago” | Home y página de cuidadoras; explicar cobertura y solicitar evaluación |
| Contratar por servicio | “enfermera a domicilio Santiago”, “enfermera a domicilio Santiago Centro”, “TENS a domicilio Santiago” | Páginas individuales de enfermería y TENS, con alcance real |
| Comparar | “precio cuidadora adulto mayor”, “cuidado adulto mayor 24 horas”, “cuidadora adulto mayor turno noche” | Artículo de valores/turnos más página comercial específica si el negocio confirma esos turnos |
| Informarse | Cuidado en domicilio, Alzheimer/demencia, movilidad reducida, regreso tras hospitalización, diferencias entre cuidadora/TENS/enfermera | Artículos ya existentes; añadir enlaces y revisión experta |
| Búsqueda laboral | Varias sugerencias de “trabajo/empleo cuidadora adulto mayor” | No mezclar con captación de familias; vigilar estas consultas en GSC y crear sección laboral solo si es objetivo del negocio |

### Jerarquía de sitio observada

```text
Inicio
├── Servicios
│   ├── Cuidadoras
│   ├── TENS
│   ├── Enfermería
│   └── Técnicos kinesiólogos
├── Comunas
│   └── 8 páginas locales
├── Blog
│   └── 11 artículos
├── Contacto
└── Privacidad / Términos
```

La estructura es fácil de entender y las URLs son legibles. No recomiendo añadir más páginas por comuna hasta hacer únicas las actuales y verificar la cobertura. Para encontrar páginas huérfanas, oportunidades en posiciones 5–10 y posible canibalización de consultas se necesita el export de GSC Consulta + Página y, para validar enlaces existentes, un crawl con enlaces entrantes.

## Plan de trabajo de 90 días

| Fase | Trabajo | Resultado comprobable |
|---|---|---|
| Días 1–14 | Confirmar GA4/GTM y eventos; revisar GSC; arreglar redirección del host; confirmar áreas/servicios/precios | Medición de leads validada, host único y línea base de impresiones/clics/posiciones |
| Días 15–35 | Decidir destino de páginas comunales; reescribir las que permanezcan; reforzar perfiles, proceso y prueba social | Texto genuinamente diferenciado y evidencia de confianza verificable |
| Días 36–60 | Mejorar páginas de cuidadoras/TENS/enfermería; actualizar contenido de precio/turnos; enlazar artículos a servicios | Más clics internos a páginas de contratación y mejor CTR de consultas comerciales |
| Días 61–90 | GBP, reseñas auténticas, menciones locales; ajustar páginas con datos GSC | Crecimiento de clics orgánicos no de marca y contactos cualificados atribuibles |

**Seguimiento semanal:** clics e impresiones orgánicos no de marca, páginas de entrada, CTR, posición media por consulta, contactos de WhatsApp/formulario atribuidos a orgánico, tasa de conversión y comunas de origen cuando esté disponible. Comparar periodos equivalentes y anotar publicaciones/cambios. Enlazado: evaluar a las 4 y 8 semanas contra páginas comparables no intervenidas; si no se mueven tras 8 semanas, revisar intención y calidad antes de añadir más enlaces.

## Datos que faltan para convertir el plan en una priorización por impacto

Para acceder a consultas reales, posiciones 5–20, páginas que ya convierten y canales de contacto, hace falta cualquiera de estas opciones:

1. Export de Search Console de los últimos 3 meses con dimensiones **Consulta y Página** (clics, impresiones, CTR, posición), además de la pestaña Páginas.
2. Export de GA4 del mismo periodo por **fuente/medio + página de destino**, incluyendo eventos clave de contacto.
3. Acceso de solo lectura a esas propiedades o a un conector autorizado.

Con esos datos se puede construir el plan de enlazado desde URLs que ya tienen impresiones y separar consultas informativas de búsquedas con intención de contratar. El sitemap y el autocompletado no reemplazan esos datos.

## Cambios aplicados al repositorio

Se implementaron los cambios que no dependen de datos privados del negocio:

- Redirección Vercel permanente de aeternacare.cl a www.aeternacare.cl, conservando la ruta.
- Schema global Organization sin dirección ni precio inventados; las entidades Service declaran las ocho áreas ya configuradas en el sitio.
- El formulario emite contacto_whatsapp_preparado, que describe la preparación del mensaje sin presentarla como lead confirmado.
- Clics de WhatsApp en páginas de servicio y comuna quedan etiquetados; el formulario de comuna preselecciona la comuna solicitada.
- Enlaces contextuales entre artículos y servicios, y valores referenciales ya publicados añadidos al artículo de costos.
- Documentación de eventos y configuración pendiente de GTM actualizada.

No se publicaron estos cambios. Deben desplegarse desde el flujo habitual de Vercel. El contenedor GTM sigue requiriendo una actualización manual para reemplazar el disparador antiguo y revisar eventos clave. Las páginas por comuna continúan pendientes de datos únicos y consulta de GSC; no se consolidaron ni desindexaron sin esa evidencia.
## Limitaciones de esta auditoría

- PageSpeed Insights devolvió HTTP 429 en la consulta de prueba; Core Web Vitals de campo/laboratorio quedan pendientes.
- Sin acceso a GSC, GA4, GTM Preview o GBP no se verifican indexación declarada por Google, consultas, tráfico, conversiones, calidad de eventos, reseñas ni presencia local en Maps.
- La auditoría pública se completó antes de identificar el clon íntegro. El clon elegido ahora contiene el código fuente y coincide con las rutas principales revisadas; falta verificar el build y el comportamiento final en una vista previa de Vercel antes de publicar estos cambios.
- No se hizo análisis de backlinks con una base de datos de enlaces ni un análisis de ranking geográfico.

## Skills aplicadas

Se aplicaron las skills SEO pertinentes disponibles: auditoría SEO general, datos estructurados, sitemap, arquitectura de sitio, mapa de búsquedas/autocompletado y revisión de títulos/descripciones. El enlazado interno queda preparado a nivel estructural, pero el análisis de “striking distance” se reserva hasta disponer del export de GSC. Las skills de documentos, hojas de cálculo, presentaciones, mascotas y generación de imágenes no son necesarias para esta inspección web.

---

Creado por Palo Seco — Únete a la comunidad de Pedro SEO  
[Web → palos-seco.com](https://palos-seco.com)
