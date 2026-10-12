# Sistema de diseño

Concepto: **no vender «enfermeras», vender tranquilidad para la familia**.
Premium, cálido, sobrio y humano. Nada de estética hospitalaria, azul médico,
cruces ni apariencia de plantilla.

---

## 1. Color

| Token | Hex | Rol |
|---|---|---|
| `--mint` | `#EAF6F1` | Fondo principal del sitio |
| `--mint-deep` | `#DCECE5` | Fondo del bloque final |
| `--mint-soft` / `--surface` | `#F2FAF7` / `#F6FAF8` | Superficies alternas |
| `--ink` | `#243936` | Texto principal (verde carbón, no negro) |
| `--ink-muted` | `#4C625C` | Texto secundario |
| `--ink-soft` | `#5A706A` | Texto terciario y etiquetas |
| `--lilac` / `--lilac-deep` | `#9A8BD4` / `#7869B8` | Lila de marca |
| `--lilac-ink` | `#5F4FA6` | Lila accesible para texto y enlaces |
| `--green` / `--green-deep` | `#79BFAF` / `#367065` | Verde menta de apoyo |

La auditoría (`node tools/auditar.mjs`) recorre las 8 páginas en 3 anchos y
compara cada nodo de texto contra su fondo efectivo: **0 fallas**.

## 2. Botones

El degradado propuesto originalmente (lila claro hacia verde menta) daba entre
2,1 y 2,8:1 con texto blanco, muy por debajo del mínimo AA de 4,5:1. Se mantuvo
la idea —lila con brillo sutil— bajando los extremos del degradado:

```css
linear-gradient(135deg, #6C5CB0 0%, #7A6ABE 52%, #5F4FA6 100%)
```

Con texto blanco ese degradado entrega entre 4,5 y 6,7:1. El destello verde y
plateado se conserva como borde iluminado del botón, no como relleno.

- Radio 12–16px, `font-weight` 600, transición 280ms, hover con `translateY(-2px)`.
- Un solo CTA primario por bloque de decisión.

## 3. Tipografía

Ambas autoalojadas en `public/fonts/`, sin peticiones a terceros:

| Familia | Uso |
|---|---|
| **Manrope** (200–800) | Navegación, botones, párrafos, todo el texto funcional |
| **Instrument Serif** (400) | Solo frases emocionales y numeración de pasos |

Escala fluida con `clamp()`: H1 entre 34 y 62px, H2 entre 28 y 44px, cuerpo
17px. Ningún texto por debajo de 12px.

## 4. Espaciado y forma

- Contenedor máximo 1180px con márgenes laterales fluidos.
- Secciones con `padding-block` fluido (64–120px).
- Radios grandes en imágenes (32px), medios en tarjetas (22px), pequeños en
  controles (10px).
- Sombras muy suaves: nunca decorativas, solo para separar superficies.

## 5. Animación

- Apariciones: opacidad más `translateY(28px)`, 720ms, con retardo escalonado por
  tarjeta mediante la variable `--retardo`. Los títulos de sección se funden en
  su lugar, sin desplazamiento, para que no todo se mueva con el mismo gesto.
- Imagen del hero: revelado con `clip-path` en 1,1s.
- Todo se desactiva por completo con `prefers-reduced-motion: reduce`.
- Sin JavaScript, todo el contenido queda visible: las animaciones dependen de
  la clase `.js` que se agrega al `<html>`.

## 6. Qué se evitó a propósito

El sitio se revisó para sacar los recursos que hacen que una página parezca una
plantilla generada automáticamente:

- Sin etiquetas pequeñas en mayúsculas con una línea al lado, arriba de cada
  título de sección.
- Sin numeración decorativa con ceros a la izquierda en las tarjetas. El proceso
  conserva el número porque es una secuencia real, pero sin ceros y con una
  regla fina.
- Sin iconos dentro de cuadrados de color: los iconos son trazo simple, sin
  contenedor.
- Sin recuadros de borde punteado.
- Sin rejillas de seis tarjetas idénticas: los datos de contacto son una lista
  tipo ficha.
- Sin el mismo gesto de entrada repetido en todo: los títulos se funden en su
  lugar y solo las tarjetas y fotografías suben.

## 7. Accesibilidad verificada

La auditoría automática comprueba, en cada página y en cada ancho:

- Un solo `H1` y jerarquía de títulos sin saltos.
- Contraste de texto mayor o igual a 4,5:1 (3:1 en textos grandes).
- Zonas táctiles de al menos 24×24px.
- Todas las imágenes con `alt` descriptivo y todos los controles con etiqueta.
- Sin desborde horizontal entre 390px y 1440px.
- Foco visible en todos los elementos interactivos.
- El sitio indica llamar al 131 ante una urgencia y aclara que no reemplaza la
  atención de emergencia.

## 8. Uso del logo

El archivo original del cliente es un lockup: emblema arriba y, abajo, el nombre
con una bajada. Medido, el nombre ocupa solo el 12% de la altura del lockup, así
que a tamaño de header quedaría ilegible (7px). Por eso se usa así:

| Contexto | Versión | Motivo |
|---|---|---|
| Header | Emblema de 46px + nombre en Manrope | El nombre del lockup sería ilegible a esa altura |
| Pie | Lockup completo sobre un plato claro | Sus tonos oscuros no contrastan con el fondo verde carbón |
| Favicon e ícono de app | Emblema centrado sobre menta | Se lee bien a 32px |
| Imagen de Open Graph | Lockup a 150px de alto | Es el lugar donde el lockup completo se lee bien |

El recorte del emblema es determinista: `tools/generar-marca.mjs` mide la caja
real del contenido con el canal alfa y borra la franja del nombre antes de
recortar. No hay retoque manual, así que el script se puede volver a ejecutar
cuando el cliente entregue una versión nueva.
