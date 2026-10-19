# Fotografías integradas y textos SEO

Actualizado: octubre de 2026.

Las seis fotografías del sitio están integradas y optimizadas. Cada una se
sirve en **AVIF, WebP y JPG** con `srcset`, tiene dimensiones explícitas para
evitar saltos de maquetación, un `alt` que describe la escena y un `title`
contextual.

---

## 1. Dónde quedó cada imagen

| Archivo maestro | Sección | Proporción | Dimensiones publicadas |
|---|---|---|---|
| `hero-cuidado.jpg` | Hero de inicio | 4:5 | 928×1160 |
| `confianza-familia.jpg` | «Para tu familiar. Para tu tranquilidad.» | 3:2 | 1500×1000 |
| `editorial-compania-lectura.jpg` | «El cuidado comienza escuchando» (`#nosotros`) | 3:2 | 1800×1200 |
| `editorial-conversacion-familiar.jpg` | «Así comienza el cuidado» (`#como-funciona`) | 3:2 | 1800×1200 |
| `editorial-detalle-hogar.jpg` | Bloque de testimonios / confianza | 1:1 | 1400×1400 |
| `editorial-paseo-barrio.jpg` | Cabecera del blog | 4:3 | 1600×1200 |

Los originales se conservan fuera de la carpeta publicada, en
`marca/fotografias-originales/`.

---

## 2. Textos alternativos y títulos

| Imagen | `alt` | `title` | Pie visible |
|---|---|---|---|
| Hero | Una cuidadora acompaña con calma a una mujer mayor en el living de su casa, sentadas junto a una ventana con luz natural. | Cuidado cercano en el hogar | — |
| Confianza | Una hija adulta conversa con su madre mayor en el living de una casa, con luz natural de la tarde. | Confianza y tranquilidad para la familia | — |
| Compañía / lectura | Una persona cuidadora acompaña a una mujer mayor a revisar un álbum de fotos familiares en el living de su casa. | Acompañar también es compartir la memoria | El cuidado empieza por escuchar y conocer la historia de cada persona. |
| Conversación familiar | Una coordinadora de cuidado conversa con una madre y su hijo en la mesa del comedor de su casa. | La primera conversación, sin prisa | — |
| Detalle de hogar | Manos de una hija y su madre mayor sobre un álbum familiar, junto a dos tazas de té en una mesa de madera. | Detalles que construyen confianza | — |
| Paseo por el barrio | Una cuidadora camina junto a una mujer mayor con bastón por un barrio residencial de Santiago. | Acompañamiento y vida cotidiana | — |

### Criterio usado en los textos

- **El `alt` describe lo que se ve**, no acumula palabras clave. Sirve primero a
  personas que usan lectores de pantalla y, de paso, da contexto a Google
  Imágenes.
- **El `title` aporta contexto de marca o de intención**, sin repetir el `alt`.
  No es un factor de posicionamiento relevante: se agregó como refuerzo
  editorial y para el tooltip.
- Los nombres de archivo son descriptivos y estables
  (`editorial-compania-lectura.jpg`), lo que ayuda a la indexación de imágenes.
- El pie de foto visible solo se usa en «Nosotros», donde aporta una idea y no
  satura la interfaz.
- No se usan imágenes para comunicar texto esencial: todo el contenido está en
  HTML.

---

## 3. Optimización aplicada

| Archivo | Antes | JPG maestro | WebP maestro | AVIF | Reducción (WebP) |
|---|---|---|---|---|---|
| `hero-cuidado` | 142 kB | 117 kB | 53 kB | 29 kB | 59 % |
| `confianza-familia` | 4.302 kB | 209 kB | 102 kB | 56 kB | 97 % |
| `editorial-compania-lectura` | 4.167 kB | 293 kB | 136 kB | 77 kB | 96 % |
| `editorial-conversacion-familiar` | 3.941 kB | 246 kB | 93 kB | 47 kB | 97 % |
| `editorial-detalle-hogar` | 4.453 kB | 234 kB | 113 kB | 71 kB | 97 % |
| `editorial-paseo-barrio` | 4.225 kB | 271 kB | 131 kB | 71 kB | 96 % |

Detalles técnicos:

- Las cinco fotos nuevas eran **PNG de ~4 MB con extensión `.jpg`**. Ahora son
  JPG, WebP y AVIF reales, sin metadatos.
- Cada imagen tiene tres anchos en `srcset` (por ejemplo 750, 1125 y 1500 px en
  la foto de confianza) y un atributo `sizes` ajustado a su columna.
- El navegador descarga **una sola** variante por imagen, según el ancho del
  viewport y la densidad de pantalla.
- El hero usa `loading="eager"` y `fetchpriority="high"`; el resto carga con
  `loading="lazy"`.
- Todas las etiquetas `<img>` llevan `width` y `height` explícitos para evitar
  Cumulative Layout Shift (CLS).
- El peso total del conjunto completo (todos los formatos y tamaños) es de
  **6,3 MB**; antes solo las seis imágenes originales pesaban ~25 MB.

---

## 4. Cómo reemplazar una foto

1. Reemplaza el archivo en `marca/fotografias-originales/` conservando el
   nombre base (`hero-cuidado.jpg`, `confianza-familia.jpg`, etc.).
2. Si la escena cambia, actualiza el `alt` y el `title` en el componente
   correspondiente (`Hero.astro`, `Trust.astro`, `Philosophy.astro`,
   `Process.astro`, `Testimonials.astro` o `blog/index.astro`).
3. Ejecuta:

   ```bash
   node tools/optimizar-fotografias.mjs
   npm run build          # o: node node_modules/astro/astro.js build
   node tools/auditar.mjs
   ```

El script genera los tres formatos y todos los anchos de `srcset` en una sola
pasada. No sobrescribe los originales.

> `tools/generar-imagenes.mjs` ya no reemplaza las fotos existentes: solo crea
> respaldos si el archivo no existe. Para forzarlo, usa `--forzar`.
