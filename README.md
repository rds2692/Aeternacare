# Aeterna Care — sitio web (Astro)

Sitio multipágina en español de Chile para **Aeterna Care**, empresa de cuidado y
acompañamiento de adultos mayores a domicilio en Santiago.

El objetivo del sitio es generar contactos de familias (hijos e hijas de 30 a 65
años) que necesitan apoyo profesional para cuidar a un familiar mayor.

---

## 1. Cómo verlo

Requisitos: Node.js 18 o superior.

```bash
npm install          # instala dependencias (Astro + sitemap)
npm run dev          # vista previa con recarga en http://localhost:4321
npm run build        # genera el sitio final en /dist
npm run preview      # sirve /dist tal como queda en producción
```

Comandos de verificación del proyecto:

```bash
node tools/servir.mjs             # vista previa sin dependencias (http://localhost:4321)
node tools/auditar.mjs            # auditoría técnica en Chrome headless
node tools/capturar.mjs           # capturas en desktop, tablet y móvil (/capturas)
node tools/generar-marca.mjs      # deriva el logo y los favicons desde marca/
node tools/generar-imagenes.mjs   # regenera OG y respaldos de foto (requiere el paso anterior)
node tools/descargar-fuentes.mjs  # vuelve a bajar las fuentes autoalojadas
```

Si no tienes npm instalado, `node tools/servir.mjs` es suficiente para ver y
mostrar el sitio: solo necesita Node.js.

---

## 2. Estructura

```
src/
├─ components/     Header, Hero, ContactSection, Philosophy, Services,
│                  Trust, Process, Testimonials, FinalCTA, Footer,
│                  FloatingWhatsApp, Icon, Pending
├─ content/blog/   3 artículos en Markdown (colección de contenido)
├─ data/           site.ts (datos de la empresa) y contenido.ts (textos)
├─ layouts/        Layout.astro (SEO, JSON-LD, medición, estructura)
├─ pages/          index, contacto, blog, privacidad, terminos, gracias, 404
├─ scripts/        reveal.ts (animaciones de entrada) y medicion.ts
└─ styles/         fonts.css (fuentes locales) y global.css (sistema de diseño)
public/
├─ fonts/          Manrope e Instrument Serif autoalojadas (woff2)
├─ img/            fotografías, logo y Open Graph
└─ favicon-*.png · apple-touch-icon.png · robots.txt · site.webmanifest
marca/             logo original del cliente (no se publica)
tools/             verificaciones y generación de recursos (no se publica)
docs/              documentación de entrega
```

---

## 3. Dónde se edita cada cosa

| Qué quieres cambiar | Archivo |
|---|---|
| Teléfono, WhatsApp, correo, dominio, horario, redes | `src/data/site.ts` |
| Textos de las secciones de la portada | `src/data/contenido.ts` |
| Endpoint del formulario y IDs de medición | `src/data/site.ts` |
| Colores, tipografía, espaciados | `src/styles/global.css` |
| Fotografías | `public/img/` (mismos nombres y proporciones) |
| Logo | `marca/Logo_Aeterna.png` y luego `node tools/generar-marca.mjs` |
| Artículos del blog | `src/content/blog/*.md` |

---

## 4. Estado del contenido

El sitio está terminado en diseño, estructura, código, SEO y accesibilidad. Lo
que falta son **datos que solo puede entregar el negocio**: correo corporativo,
dominio definitivo, razón social, RUT, dirección, horario, fotografías
definitivas y testimonios.

Cada dato pendiente se muestra en el sitio con una etiqueta ámbar
`[COMPLETAR: …]`. La lista completa, con la ubicación exacta de cada uno, está
en [`docs/01-datos-por-completar.md`](docs/01-datos-por-completar.md).

Antes de publicar:

1. Completar los datos de `src/data/site.ts`.
2. Cambiar `AVISO_PENDIENTES` a `false` en `src/data/site.ts`.
3. Reemplazar las fotografías de `public/img/` y actualizar los textos `alt` si
   la escena cambia.
4. Configurar el endpoint del formulario.
5. Revisar el aviso de privacidad y los términos con un abogado.
6. Ejecutar `npm run build` y `node tools/auditar.mjs`.

---

## 5. Decisiones que conviene conocer

- **Nada inventado.** No hay precios, cifras, certificaciones ni testimonios
  inventados. La sección de testimonios está preparada pero vacía a propósito.
- **Cuidado con lo que se promete.** El sitio declara que se trabaja con personal
  TENS y enfermería, y que el detalle del servicio se entrega por escrito, sin
  prometer procedimientos que el cliente no haya confirmado.
- **Contraste corregido.** El degradado del CTA se ajustó a tonos más profundos
  porque el lila claro original daba 2,1–2,8:1 con texto blanco (bajo el mínimo
  WCAG AA). Ver `docs/04-sistema-de-diseno.md`.
- **Animaciones sin librería.** Las apariciones usan transiciones CSS con
  `IntersectionObserver`. Se evaluó GSAP, pero aportaba 28 kB gzip sin cambiar
  el resultado percibido.
- **Medición con consentimiento.** Sin IDs configurados no se carga ningún
  script de terceros. Al configurarlos, aparece un aviso de consentimiento.
