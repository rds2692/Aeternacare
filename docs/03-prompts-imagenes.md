# Producción fotográfica de Aeterna Care

Este documento reúne los prompts, formatos y criterios de selección para las
fotografías del sitio. La dirección de arte busca una fotografía editorial
documental, cálida y sobria, no una imagen publicitaria de banco de fotos.

La clave para que el resultado sea convincente no es pedir un «rostro perfecto»,
sino conservar lo que hace humano a un retrato: textura de piel, líneas de
expresión, cabello fuera de lugar, ropa con pliegues, manos naturales, gestos
pequeños y una casa que parezca habitada.

## 1. Reglas de dirección de arte

- **Concepto:** vender tranquilidad y compañía, no enfermedad ni asistencia
  clínica.
- **Protagonista:** la persona mayor debe conservar dignidad y autonomía. No se
  representa como un cuerpo pasivo ni como una figura indefensa.
- **Lugar:** departamento o casa de clase media en Santiago de Chile. Muebles de
  madera clara, lino, algodón, cerámica, plantas discretas y objetos personales.
- **Personas:** adultos chilenos y latinoamericanos, con rasgos, edades, tonos de
  piel y cuerpos diversos. Lenguaje corporal cercano, sin poses teatrales.
- **Luz:** luz natural lateral o de ventana, suave y direccional. Nunca luz plana
  de estudio, azul médico ni iluminación de lujo invernadero.
- **Paleta:** blanco cálido, beige, madera clara, verde salvia, menta apagada y
  pequeños acentos lila. Sin dominante verde artificial.
- **Acabado:** fotografía real, no render. Piel sin retoque de belleza, rango
  dinámico natural, sombras abiertas y grano fino. Evitar HDR, saturación alta y
  contraste teal-and-orange.
- **Ausencias:** uniformes clínicos, batas, guantes, estetoscopios, camillas,
  pasillos de clínica, cruces médicas, sonrisas forzadas, texto, logos y marcas
  de agua.

### Bloque de consistencia visual

Este párrafo puede añadirse al final de cualquiera de los prompts si el modelo
admite instrucciones ampliadas:

```text
Photorealistic editorial documentary photography for a premium home-care brand in Santiago, Chile. Authentic Latin American people, natural body language, restrained emotion, dignified older adults. Warm-neutral palette of off-white, oatmeal, light oak, muted sage and pale mint with a subtle lilac accent. Soft directional daylight from a real window. Natural skin with pores, fine lines and realistic imperfections; real hair, wrinkled fabric, believable hands. Restrained, lived-in middle-class home, never a staged showroom. Full-frame camera look, shallow but readable depth of field, true-to-life color, gentle highlight roll-off and very subtle film grain. No synthetic skin, CGI, stock-photo posing, medical branding, text, logos or watermark.
```

## 2. Prioridad y formatos

| Prioridad | Archivo final | Uso | Proporción | Salida recomendada |
|---|---|---|---|---|
| 1 | `hero-cuidado.jpg` | Hero del inicio, reemplaza el archivo actual | 4:5 | 1600×2000, reducir a 1200×1500 |
| 1 | `confianza-familia.jpg` | Sección «Para tu familiar. Para tu tranquilidad.» | 3:2 | 2000×1333, reducir a 1500×1000 |
| 2 | `editorial-cuidado-cotidiano.jpg` | Relleno para servicios o proceso | 4:3 | 1600×1200 |
| 2 | `editorial-compania-lectura.jpg` | Relleno editorial o futuras páginas de servicio | 3:2 | 1800×1200 |
| 2 | `editorial-detalle-hogar.jpg` | Testimonios, blog o tarjetas editoriales | 1:1 | 1400×1400 |
| 3 | `editorial-conversacion-familiar.jpg` | Contacto, «Nosotros» o futura página de proceso | 3:2 | 1800×1200 |
| 3 | `editorial-paseo-barrio.jpg` | Futuras páginas de acompañamiento y blog | 4:3 | 1600×1200 |
| 3 | `blog-*.jpg` | Portadas horizontales del blog | 16:9 | 1600×900 |

### 2.1 Estado de entrega (octubre de 2026)

| Archivo | Estado |
|---|---|
| `hero-cuidado.jpg` | **Integrada** en el hero, en AVIF/WebP/JPG responsive |
| `confianza-familia.jpg` | **Integrada** en la sección de confianza |
| `editorial-cuidado-cotidiano.jpg` | Pendiente (opcional) para una futura sección |
| `editorial-compania-lectura.jpg` | **Integrada** en «Nosotros» |
| `editorial-detalle-hogar.jpg` | **Integrada** junto al bloque de testimonios |
| `editorial-conversacion-familiar.jpg` | **Integrada** en «Cómo funciona» |
| `editorial-paseo-barrio.jpg` | **Integrada** en la cabecera del blog |
| `blog-*.jpg` | Pendiente (opcional): portadas específicas por artículo |

Los originales están en `marca/fotografias-originales/` y las variantes
publicadas se regeneran con `node tools/optimizar-fotografias.mjs`. El detalle
de textos `alt`, `title` y pesos está en
[`06-imagenes-y-seo.md`](06-imagenes-y-seo.md).

## 3. Imágenes principales

### 1. Hero — cuidado cercano en casa

**Archivo:** `public/img/hero-cuidado.jpg`  
**Formato:** vertical 4:5, 1200×1500  
**Objetivo:** comunicar en un segundo que existe cuidado profesional, pero sobre
todo una relación humana segura.

```text
Use case: photorealistic-natural
Asset type: hero photograph for a premium home-care website
Primary request: one authentic, quietly reassuring moment of professional care at home.

Scene: a bright, lived-in living room in a middle-class apartment in Santiago, Chile. Large window with soft sheer curtains, light oak sideboard, cream linen sofa, one modest leafy plant, a ceramic cup and a small stack of books. The room should feel personal and cared for, not styled as a catalogue.

Subjects: a Chilean caregiver in her early 40s and a Chilean woman around 82 years old. The caregiver sits diagonally beside the older woman, listening attentively. Their faces are turned slightly toward each other; one of the caregiver's hands rests gently and naturally on the older woman's forearm. The older woman is upright and self-possessed, not frail or helpless. Both are visible from the waist up. Their shared expression suggests trust, familiarity and quiet relief, not performance.

Wardrobe: caregiver in an ivory cotton shirt and a soft muted-sage overshirt, simple personal jewelry, no uniform. Older woman in an oatmeal fine-knit cardigan over a clean white blouse, discreet earrings, hair naturally styled.

Composition: vertical 4:5 medium shot, eye level, 50mm lens, subjects placed slightly right of center with their faces in the upper-middle third. Keep faces and hands inside the central 80 percent. Leave some visual breathing room around them and keep the lower-left corner visually simple for an interface badge.

Lighting: real late-morning window light from the side, soft but directional, warm-neutral balance, gentle shadows and natural catchlights. No studio lighting.

Camera and finish: full-frame editorial documentary photograph, 50mm prime at f/2.2, accurate anatomy, natural depth of field. Real skin texture, visible pores, fine lines, sparse flyaway hair, slight fabric wrinkles and minor domestic imperfections. Photographic highlight roll-off, true-to-life color and very subtle fine grain. Expensive but restrained lifestyle photography, not an advertisement.

Constraints: one clear visual story, natural hands with five fingers, no text, no logos, no watermark, no medical props.
Avoid: white clinical uniform, scrubs, stethoscope, gloves, hospital or nursing-home setting, institutional blue lighting, frail caricature of old age, forced smile, direct camera gaze, overly retouched plastic skin, stock-photo pose, CGI look, excessive HDR.
```

### 2. Confianza — hija y madre

**Archivo:** `public/img/confianza-familia.jpg`  
**Formato:** horizontal 3:2, 1500×1000  
**Objetivo:** representar el alivio y la complicidad de una familia, sin
dramatismo.

```text
Use case: photorealistic-natural
Asset type: emotional trust-section photograph for a home-care website
Primary request: an intimate, natural conversation between an adult daughter and her older mother at home.

Scene: horizontal living-room scene in a Chilean middle-class home in the late afternoon. Same visual world as the hero photograph: cream linen upholstery, light oak, soft curtains, a ceramic teacup and a modest plant, with one personal family object softly out of focus.

Subjects: a Chilean daughter around 48 years old and her Chilean mother around 80. They sit at a slight angle toward each other on the sofa. The daughter listens with focused warmth; the mother is mid-thought, relaxed but thoughtful. Their micro-expressions should feel candid and specific rather than sentimental. The older woman remains the emotional equal in the frame, not a dependent figure.

Wardrobe: daughter in a simple terracotta or warm-neutral blouse, natural everyday styling. Mother in a soft cream cardigan, comfortable trousers and modest jewelry. Minimal makeup, realistic hair.

Composition: horizontal 3:2, short medium-wide shot, 50mm lens, waist-up framing. Place mother and daughter just left of center so the more open side of the image can carry surrounding page content. Leave enough space above their heads. Do not crop hands awkwardly.

Lighting: warm late-afternoon daylight entering from camera left through a window, gentle falloff across the room, natural shadows and believable color temperature.

Camera and finish: photorealistic editorial documentary photography, full-frame, 50mm at f/2.4, eye level. Authentic skin texture, fine facial lines, real hair, lived-in clothing. True-to-life contrast, neutral-warm grade, subtle fine grain. Quiet, human and premium.

Constraints: Latin American people, natural anatomy, clear relationship, restrained emotion, no text, no logos, no watermark.
Avoid: crying, medical setting, clinical clothing, staged laughter, everyone looking at the camera, Instagram influencer styling, luxury showroom, overly polished interior, heavy beauty retouching, HDR, distorted fingers or eyes.
```

## 4. Imágenes de apoyo

### 3. Cuidado cotidiano — té en la cocina

**Archivo sugerido:** `public/img/editorial-cuidado-cotidiano.jpg`  
**Formato:** horizontal 4:3, 1600×1200  
**Uso:** sección de servicios, proceso o relleno entre bloques largos.

```text
Use case: photorealistic-natural
Asset type: supporting editorial photograph for a home-care website
Primary request: an ordinary, dignified moment of daily support in the kitchen.

Scene: compact but elegant kitchen in a Santiago home. Pale oak cabinets, white stone counter, simple kettle, two ceramic cups, a bowl of fruit and a folded cloth. Morning light through a window. Tidy but clearly used.

Subjects: a Chilean caregiver in her mid-30s stands beside a 78-year-old woman who is seated at the counter. The older woman is preparing tea at her own pace while the caregiver gives light, unobtrusive support. Neither is doing a clinical task. They share an easy conversation; the older woman has agency.

Wardrobe: caregiver in a soft blue-gray linen shirt, sleeves rolled; older woman in a warm cream shirt and practical apron. No uniform.

Composition: horizontal 4:3, medium-wide shot from eye level, 35mm lens. Show faces, hands and cups clearly. Subjects on the right third, with quiet negative space on the left. Avoid complex overlapping hands.

Lighting: crisp morning window light, soft shadows, realistic warm-neutral color.

Camera and finish: photorealistic editorial documentary photography, full-frame, 35mm at f/2.8, natural depth of field. Real skin and fabric texture, believable domestic clutter, subtle film grain. Calm, intimate and unforced.

Constraints: no medical action, both people reasonably mobile and independent, no text, logos or watermark.
Avoid: nurse imagery, medicine bottles, hospital equipment, perfect kitchen showroom, exaggerated smiles, staged pouring with distorted hands, CGI, HDR.
```

### 4. Compañía — lectura compartida

**Archivo sugerido:** `public/img/editorial-compania-lectura.jpg`  
**Formato:** horizontal 3:2, 1800×1200  
**Uso:** acompañamiento, filosofía o futuras páginas de servicio.

```text
Use case: photorealistic-natural
Asset type: supporting emotional photograph for a home-care website
Primary request: a calm moment of companionship while looking through a family photo album.

Scene: comfortable corner of a Chilean living room. A linen armchair, light oak side table, reading lamp switched off, a knitted throw and an open family photo album with unreadable, softly blurred photographs.

Subjects: an 80-year-old Chilean woman seated in the armchair and a caregiver in her early 40s seated on a low ottoman beside her, both looking down at the album. The caregiver listens as the older woman points to a photograph. Their posture is relaxed and close without being intrusive. The older woman is animated, recalling a memory; the caregiver has a subtle, genuine half-smile.

Composition: horizontal 3:2, medium shot at seated eye level, 50mm lens. Keep both faces visible and avoid a high-angle view that makes the older woman look vulnerable.

Lighting: soft late-afternoon window light from camera right, a gentle gradient into the room, warm neutral tones.

Camera and finish: full-frame photojournalistic lifestyle photograph, 50mm at f/2.2, accurate hands and album geometry. Real facial lines, hair and clothing texture. Natural color, soft grain, restrained contrast.

Constraints: respectful body language, the older adult has agency, no visible readable text in the album, no logos or watermark.
Avoid: posed stock photo, crying, somber mood, medical setting, high camera angle, overly young-looking older face, plastic skin, extra fingers.
```

### 5. Detalle de hogar — manos, té y recuerdos

**Archivo sugerido:** `public/img/editorial-detalle-hogar.jpg`  
**Formato:** cuadrado 1:1, 1400×1400  
**Uso:** tarjetas editoriales, futuros testimonios sin retrato o portadas de blog.

```text
Use case: photorealistic-natural
Asset type: square editorial detail photograph for a home-care website
Primary request: a tactile, intimate still life with the hands of an adult daughter and her older mother.

Scene: top-down and slightly angled view of a light oak table beside a window. Two ceramic cups of tea, a simple linen napkin, reading glasses, a small family photo album and a soft knitted cardigan cuff.

Subjects: only their hands and forearms appear. The older woman's hand rests on the album; the adult daughter's hand gently covers it. Skin shows realistic age, veins, fine lines, short natural nails and subtle variations in tone. The gesture is affectionate but not theatrical.

Composition: square 1:1, close overhead detail, 50mm lens, hands in the central area, comfortable negative space near two corners for future interface elements.

Lighting: soft daylight from the upper left, translucent shadows, realistic ceramic highlights and fabric texture.

Camera and finish: photorealistic editorial still life, full-frame, 50mm at f/2.8. Natural color, real material texture, gentle grain, restrained contrast. Premium and human, not rustic-cliché.

Constraints: anatomically correct hands with five distinct fingers, no readable text, no faces, no medical objects, no logo or watermark.
Avoid: extra fingers, fused hands, jewelry overload, overly wrinkled hands, HDR, glossy catalogue lighting, artificial perfect symmetry.
```

### 6. Conversación familiar — orientación sin barreras

**Archivo sugerido:** `public/img/editorial-conversacion-familiar.jpg`  
**Formato:** horizontal 3:2, 1800×1200  
**Uso:** «Cómo funciona», contacto o futura página sobre el primer encuentro.

```text
Use case: photorealistic-natural
Asset type: supporting editorial photograph about the first family consultation
Primary request: a relaxed first conversation between an adult son, his mother and a home-care professional, without making it look like a sales meeting or a clinical consultation.

Scene: dining table in a warm Chilean home. Light oak table, simple chairs, daylight from a side window, a notebook and a glass of water. Papers may appear but must contain no readable text.

Subjects: a Chilean man in his mid-40s, his mother around 78 and a care coordinator around 38. They sit in a three-quarter triangle around the table. The son listens, the mother participates directly rather than being discussed as an object, and the coordinator speaks with calm attention. Everyone belongs in the conversation.

Wardrobe: everyday smart-casual clothing in warm neutrals and muted sage. No lab coat, badge or corporate uniform.

Composition: horizontal 3:2, medium-wide shot, 35mm lens, natural eye-level perspective. Keep faces open and unobstructed, with enough context to understand the home.

Lighting: soft daylight from camera left, balanced interior shadows, natural skin tones.

Camera and finish: photorealistic documentary lifestyle photography, full-frame, 35mm at f/2.8. Realistic proportions, authentic expressions, visible fabric and wood texture, subtle fine grain.

Constraints: older adult actively included in the decision, no readable documents, no text, logos or watermark.
Avoid: corporate boardroom, sales pitch, hospital consultation, patronizing body language, forced handshake, all subjects smiling at camera, stock-photo staging.
```

### 7. Acompañamiento al aire libre

**Archivo sugerido:** `public/img/editorial-paseo-barrio.jpg`  
**Formato:** horizontal 4:3, 1600×1200  
**Uso:** futuras páginas de acompañamiento, rutinas y bienestar.

```text
Use case: photorealistic-natural
Asset type: supporting lifestyle photograph for a home-care service website
Primary request: a safe, ordinary walk through a leafy Santiago residential neighborhood.

Scene: quiet residential street with mature trees, modest Chilean houses or low apartment buildings, a paved sidewalk and soft morning light. The setting must feel real and local rather than generically European.

Subjects: a Chilean caregiver in her early 40s walking beside an 82-year-old woman. The older woman uses a simple walking stick naturally on the outer side; the caregiver does not grip or hover over her. They are in gentle mid-conversation, seen in a three-quarter side view rather than looking at the camera.

Wardrobe: practical everyday layers in cream, denim, olive and muted sage. Comfortable walking shoes. No uniform.

Composition: horizontal 4:3, medium-wide shot at eye level, 50mm lens, subjects on the left with open streetscape to the right. Clear feet and walking stick, no awkward overlap.

Lighting: early-morning sunlight filtered by trees, natural dappled light with soft shadows.

Camera and finish: photorealistic candid editorial photography, full-frame, 50mm at f/2.8, accurate walking posture and anatomy. Real fabric, hair and skin texture, natural color and fine grain.

Constraints: older adult is steady and autonomous, no medical device besides a simple walking stick, no text, logos or watermark.
Avoid: running, exaggerated exercise clothing, caregiver holding the person up, traffic danger, staged pose, fantasy neighborhood, extra limbs or malformed walking stick.
```

## 5. Testimonios

La sección actual de testimonios está vacía a propósito y no debe llenarse con
citas inventadas. Una fotografía generada por IA junto a un testimonio ficticio
sería especialmente riesgosa para la confianza de la marca y podría interpretarse
como un cliente real de Aeterna Care.

Usa los siguientes retratos solo como referencias visuales, pruebas de maqueta o
guía de dirección para una sesión real. Para publicarlos como testimonios:

1. Obtén autorización escrita para usar el testimonio y la imagen.
2. Mantén el nombre y la relación con la persona cuidada solo si fueron
   autorizados.
3. Si la portada es una prueba de diseño, etiquétala visiblemente como «Imagen
   ilustrativa» y no la asocies a una cita presentada como real.
4. Si no hay retrato autorizado, usa el detalle de manos o una tarjeta sin
   fotografía.

### Retrato A — hija adulta

**Archivo sugerido:** `public/img/testimonio-hija.jpg`  
**Formato:** cuadrado 1:1, 1200×1200

```text
Use case: photorealistic-natural
Asset type: editorial portrait reference for an authorized family testimonial
Primary request: a believable, understated portrait of a Chilean woman in her mid-40s who has arranged care for her mother.

Subject: one woman only, face and shoulders visible, looking slightly off-camera as if listening during an honest conversation. Her expression carries quiet relief and resolve, with a barely perceptible natural smile. She should feel like a specific real person, not a model.

Appearance: authentic adult facial anatomy, visible pores, fine expression lines, natural asymmetry, realistic hairline and a few flyaway hairs. Simple everyday makeup. A cream or muted-sage knit top and one small personal earring.

Scene: softly out-of-focus living room in a Chilean home, warm window light behind camera left, no recognizable brand or medical context.

Composition: square 1:1 portrait, 85mm lens, eye level, generous headroom, face centered with safe margins for a circular crop.

Lighting and finish: photorealistic editorial portrait, soft directional window light, 85mm at f/2, real skin and fabric texture, neutral-warm color, gentle grain. Intimate, dignified and credible.

Constraints: one person, no direct stock-photo smile, no text, logos or watermark. This is an illustrative reference unless the person has signed a release.
Avoid: beauty-ad perfection, heavy contouring, synthetic skin, perfect symmetrical face, influencer styling, medical uniform, exaggerated emotion, distorted ears or eyes.
```

### Retrato B — hijo adulto

**Archivo sugerido:** `public/img/testimonio-hijo.jpg`  
**Formato:** cuadrado 1:1, 1200×1200

```text
Use case: photorealistic-natural
Asset type: editorial portrait reference for an authorized family testimonial
Primary request: a natural square portrait of a Chilean man in his late 40s who has experienced the relief of arranging trustworthy care for his father.

Subject: one man only, head and shoulders, body angled three-quarters toward the camera while his eyes look just past the lens. Calm, candid, thoughtful; a subtle expression of relief rather than a commercial smile.

Appearance: realistic mature skin with pores, a few forehead lines, natural stubble or short beard, imperfect hair, broad natural facial structure. Simple charcoal knit sweater over a white T-shirt, no corporate styling.

Scene: warm home interior dissolving into soft bokeh, a hint of light oak and cream fabric, no readable objects.

Composition: square 1:1 portrait, 85mm lens at eye level, face centered with room for a circular crop.

Lighting and finish: soft window light from camera right, natural shadow on the opposite side, true skin tones, editorial portrait finish with subtle grain.

Constraints: one person, realistic anatomy, no text, logos or watermark. This is an illustrative reference unless the person has signed a release.
Avoid: executive headshot, corporate office, plastic skin, unnaturally white teeth, over-smoothed beard, aggressive expression, direct advertising smile, extra ears.
```

### Retrato C — madre mayor

**Archivo sugerido:** `public/img/testimonio-madre.jpg`  
**Formato:** cuadrado 1:1, 1200×1200

```text
Use case: photorealistic-natural
Asset type: editorial portrait reference for an authorized older-adult testimonial
Primary request: a dignified natural portrait of a Chilean woman around 78 years old who receives at-home companionship.

Subject: one older woman, head and shoulders, seated near a window. She looks slightly off-camera with a thoughtful, quietly content expression. She appears mentally present, socially engaged and autonomous, not frail or helpless.

Appearance: believable age in the skin, neck and hands, fine lines and age spots, natural silver or salt-and-pepper hair with realistic volume and flyaways. Light, tasteful makeup. A soft cream cardigan over a muted dusty-blue blouse, one small heirloom necklace.

Scene: domestic living room softly blurred behind her, cream curtains and light wood, no medical objects.

Composition: square 1:1 portrait, 85mm lens at eye level, centered face with safe margins for a circular crop. Do not photograph from above.

Lighting and finish: gentle window light from camera left, luminous but natural highlights, open shadows, real texture, neutral-warm grade and fine grain.

Constraints: one person, no exaggerated aging or caricature, no text, logos or watermark. This is an illustrative reference unless the person has signed a release.
Avoid: waxy skin, perfectly uniform white hair, fragile stereotype, sad expression, hospital shawl, clinical background, glamour retouching, impossible eyes.
```

## 6. Portadas para el blog

Las portadas deben ser horizontales y dejar espacio para futuros títulos HTML. No
conviene pedirle al modelo que escriba texto dentro de la foto.

### Cuidados nocturnos

**Archivo sugerido:** `public/img/blog-cuidado-nocturno.jpg`  
**Formato:** horizontal 16:9, 1600×900

```text
Use case: photorealistic-natural
Asset type: editorial blog cover about overnight home care
Primary request: a calm, safe nighttime home scene that communicates attentive presence without fear or medical drama.

Scene: quiet Chilean apartment at night. A warm low lamp in the living room, soft window darkness, a book and glass of water on a side table, hallway light softly visible in the background. No clocks with readable time.

Subjects: an older adult woman is seated comfortably in an armchair in soft loungewear, reading; a caregiver in casual at-home clothing is nearby but not hovering. The atmosphere is restful, familiar and secure. The older woman is fully awake and self-possessed.

Composition: horizontal 16:9 wide editorial frame, 35mm lens, eye level, subjects toward the right, with calm space on the left for a future title overlay.

Lighting: warm practical lamp plus cool ambient evening window light, mixed but natural, no horror-movie shadows and no blue hospital tint.

Camera and finish: photorealistic documentary lifestyle photograph, full-frame, 35mm at f/2.8, realistic household light, fine grain, restrained shadows.

Constraints: no medical bed, no medicine bottles, no text, logos or watermark.
Avoid: eerie atmosphere, sleeping person watched from doorway, clinical lamp, night-vision look, staged silhouette, oversexualized clothing, CGI, excessive darkness.
```

### Elegir cuidadora

**Archivo sugerido:** `public/img/blog-elegir-cuidadora.jpg`  
**Formato:** horizontal 16:9, 1600×900

```text
Use case: photorealistic-natural
Asset type: editorial blog cover about choosing a caregiver
Primary request: a first meeting at home that communicates careful listening and human compatibility.

Scene: bright Chilean dining area with warm wood, cream walls and soft plants. A notebook and two glasses of water sit on the table, with no readable writing.

Subjects: a Chilean family member in her late 30s and a Chilean care professional in her early 40s sit across a corner of the table in honest conversation. The family member is explaining something; the professional listens with focused empathy and a slight nod. Natural gestures, no handshake and no salesperson pose.

Composition: horizontal 16:9, medium-wide shot, 35mm lens at eye level. Place subjects centrally but leave useful negative space on the right for a future title.

Lighting: bright diffused daylight from a large window, warm neutral palette, soft natural shadows.

Camera and finish: photorealistic editorial documentary photograph, 35mm at f/2.8, real skin and fabric texture, believable proportions, true-to-life color and fine grain.

Constraints: no uniforms, no clinical props, no visible text, logos or watermark.
Avoid: staged interview, corporate office, fake laughter, notepad with legible writing, overly formal business clothing, exaggerated empathy, distorted hands.
```

## 7. Prompt negativo universal

Si la herramienta tiene un campo independiente para excluir elementos, usa esta
lista:

```text
clinical uniform, scrubs, lab coat, stethoscope, gloves, hospital bed, hospital corridor, nursing-home signage, medical cross, institutional blue lighting, medicine bottles, sad helpless elderly stereotype, crying, forced smile, everyone looking at camera, stock-photo posing, luxury showroom, Instagram influencer styling, perfect symmetrical face, waxy skin, plastic skin, heavy beauty retouching, CGI, 3D render, illustration, painting, doll-like eyes, extra fingers, missing fingers, fused hands, extra limbs, distorted walking stick, mismatched eyes, malformed ears, illegible text, readable text, typography, logo, watermark, frame, border, collage, HDR, oversaturation, teal-and-orange grade, harsh flash, blown highlights, crushed shadows, excessive vignette, motion blur, low resolution
```

## 8. Flujo recomendado de generación

1. Genera **seis u ocho variantes del hero** antes de elegir. Revisa primero la
   escena y la relación entre las personas; la resolución no compensa una pose
   falsa.
2. Elige la variante con mejor lenguaje corporal, mirada y manos. No elijas
   todavía por la cara más «perfecta».
3. Usa la imagen aprobada como referencia de luz, color y composición para el
   resto del pack. No es necesario repetir las mismas personas en todas las
   escenas salvo que quieras contar una única historia familiar.
4. Genera cada apoyo con su proporción nativa. No generes todo cuadrado y luego
   recortes; el modelo perderá el encuadre que le pediste.
5. Revisa al 100 % rostros, manos, cuellos, cabello, gafas, tazas y bastón.
6. Haz una última corrección de color conjunta para evitar que una foto sea más
   verde, más magenta o más contrastada que las demás.
7. Exporta en JPEG calidad 80–85 o WebP. Conserva una versión maestra en PNG o
   TIFF fuera de `public/`.

## 9. Lista de control antes de publicar

- La imagen comunica confianza y compañía en menos de dos segundos.
- La persona mayor tiene expresión, postura y agencia propias.
- La escena parece una casa chilena real, no un hotel ni una clínica.
- Las manos y los ojos están anatómicamente correctos al 100 %.
- No hay texto, logos, marcas de agua ni objetos médicos accidentales.
- La cara importante permanece visible en el recorte móvil.
- La temperatura de color y el contraste coinciden con el resto del sitio.
- El `alt` describe la escena definitiva, no la escena imaginada.
- Si aparece una persona vinculada a un testimonio, existe autorización escrita.
- Si la imagen es una prueba de maqueta, está identificada como ilustrativa.

## 10. Integración en el sitio

Para las dos imágenes principales:

1. Mantener los nombres `hero-cuidado.jpg` y `confianza-familia.jpg` en
   `public/img/`.
2. Mantener las proporciones 4:5 y 3:2 para no alterar la composición.
3. Actualizar el atributo `alt` de `Hero.astro` y `Trust.astro` si la escena
   final cambia.
4. Revisar el recorte en 390 px, 768 px, 1024 px y 1440 px.
5. Ejecutar `npm run build` y `node tools/auditar.mjs`.

La imagen Open Graph no debería resolverse con texto generado por IA. Conviene
componerla con una fotografía aprobada y añadir la tipografía real del sitio
mediante código o una herramienta de diseño.
