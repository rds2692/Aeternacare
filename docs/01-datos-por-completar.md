# Datos por completar antes de publicar

El sitio está terminado en diseño, código, SEO y accesibilidad. Lo que falta son
datos que solo puede entregar el cliente. En el sitio, cada uno se ve como una
etiqueta ámbar `[COMPLETAR: …]` mientras `AVISO_PENDIENTES` sea `true`
(`src/data/site.ts`).

---

## A. Bloqueantes

| Dato | Dónde se edita | Estado |
|---|---|---|
| Teléfono principal | `src/data/site.ts` → `telefonoVisible`, `telefonoE164` | Listo: +56 9 3206 1549 |
| WhatsApp de contacto | `src/data/site.ts` → `whatsapp` | Mismo número. Confirmar que es WhatsApp Business |
| Correo corporativo | `src/data/site.ts` → `correo` | Pendiente |
| Dominio definitivo | `src/data/site.ts` → `dominio` y `astro.config.mjs` → `site` | Pendiente (hoy `https://www.aeternacare.cl` como supuesto) |
| Endpoint del formulario | `src/data/site.ts` → `formularioEndpoint` | Pendiente (hoy usa respaldo por WhatsApp) |
| Razón social y RUT | `src/data/site.ts` → `nombreLegal`, `rut` | Pendiente, obligatorio en el pie y en el JSON-LD |
| Dirección | `src/data/site.ts` → `direccion` | Pendiente |
| Horario de atención | `src/data/site.ts` → `horario` | Pendiente |
| Apagar el aviso de pendientes | `src/data/site.ts` → `AVISO_PENDIENTES = false` | Solo cuando todo lo anterior esté listo |

---

## B. Servicios y alcance clínico

| Dato | Dónde se edita |
|---|---|
| Lista real de servicios ofrecidos | `src/data/contenido.ts` → `servicios.tarjetas` |
| Confirmar si se administran medicamentos y bajo qué condiciones | `src/data/contenido.ts` → `servicios.alcance` y `src/pages/terminos.astro` |
| Si se realizan turnos nocturnos o planes de 24 horas | `src/data/contenido.ts` → `servicios.tarjetas` y formulario |
| Perfiles con los que trabajan | Ya declarado: personal TENS y enfermería. Confirmar redacción final |
| Comunas con cobertura real | `src/data/site.ts` → `areaServida` (hoy 8 comunas como supuesto razonable) |

Regla del proyecto: no se promete ningún procedimiento clínico que el cliente no
haya confirmado por escrito.

---

## C. Prueba social

| Dato | Dónde se edita |
|---|---|
| Testimonios reales (2–4) | `src/components/Testimonials.astro` |
| Nombre, relación con la persona cuidada y autorización escrita | junto al testimonio |
| Fotografías de las familias (opcional) | `public/img/` |

Sin testimonios reales, la sección muestra un bloque de confianza sin citas
inventadas. Es preferible así.

---

## D. Fotografías

| Archivo | Escena | Proporción |
|---|---|---|
| `public/img/hero-cuidado.jpg` | Cuidadora acompañando a una mujer mayor en su casa, luz natural | 4:5 (1200×1500) |
| `public/img/confianza-familia.jpg` | Hija adulta conversando con su madre mayor | 3:2 (1500×1000) |
| `public/img/og-aeterna-care.jpg` | Imagen para compartir en redes (Open Graph) | 1200×630 |
| `public/img/apple-touch-icon.png` | Ícono para móviles | 180×180 |

Los prompts sugeridos están en `docs/03-prompts-imagenes.md`. Las dos
fotografías actuales son respaldos generados por código, con la etiqueta
«FOTO PENDIENTE» visible, para que no se publiquen por descuido.

**Logo:** el cliente no tiene versión vectorial. El sitio usa un logotipo
tipográfico provisorio (marca + nombre). Si se consigue el original, reemplazar
en `src/components/Header.astro`, `src/components/Footer.astro` y
`public/favicon.svg`.

---

## E. Medición

| Dato | Dónde se edita |
|---|---|
| ID de GA4 (`G-XXXXXXX`) | `src/data/site.ts` → `medicion.ga4` |
| ID de Meta Pixel | `src/data/site.ts` → `medicion.metaPixel` |
| ID de Google Ads (`AW-XXXXXXX`) | `src/data/site.ts` → `medicion.googleAds` |

Sin IDs, no se carga ningún script de terceros. Al configurarlos, el sitio
muestra un aviso de consentimiento y solo carga la medición si el visitante
acepta. El evento de conversión se llama `generar_contacto` (y `Lead` en Meta).

---

## F. Legal

| Dato | Dónde se edita |
|---|---|
| Revisión legal del aviso de privacidad | `src/pages/privacidad.astro` |
| Revisión legal de los términos y condiciones | `src/pages/terminos.astro` |
| Correo de privacidad | `src/data/site.ts` → `correoPrivacidad` |
| Plazo de conservación de datos | `src/pages/privacidad.astro` |
| Proveedores (hosting, formularios, mensajería) | `src/pages/privacidad.astro` |
| Condiciones comerciales y de pago | `src/pages/terminos.astro` |
| Garantía de reemplazo y plazos de aviso | `src/pages/terminos.astro` |
| Fecha de última actualización | ambos documentos |

Ambos documentos están marcados como borrador pendiente de revisión legal.
Deben pasar por un abogado antes de publicar.

---

## G. Contenido editorial

| Dato | Dónde se edita |
|---|---|
| Autoría real de los artículos | `src/content/blog/*.md` → `autor` |
| Fechas definitivas de publicación | `src/content/blog/*.md` → `fecha` |
| Nuevos artículos | crear un archivo `.md` en `src/content/blog/` |
