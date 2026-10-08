# Prompts para las fotografías

Las dos fotografías del sitio deben reemplazarse por imágenes definitivas. Si se
generan con IA, usar estos prompts y luego reemplazar los archivos manteniendo el
nombre y la proporción.

Dirección de arte común: fotografía editorial lifestyle, hogar real chileno, luz
natural, tonos verdes apagados, beige y blanco cálido. Nada de batas clínicas,
estetoscopios ni fondos de hospital.

---

## 1. Hero — `public/img/hero-cuidado.jpg` (4:5, 1200×1500)

```
Use case: photorealistic-natural
Asset type: fotografía principal (hero) de un sitio web de cuidado de adultos mayores
Primary request: una profesional de cuidado acompañando a una mujer mayor en su hogar
Scene/backdrop: living luminoso de una casa de clase media en Santiago de Chile, muebles de madera clara, plantas, ventana grande
Subject: mujer cuidadora de alrededor de 40 años, con ropa clara discreta, sentada junto a una mujer de unos 80 años; conversan tranquilamente, contacto visual cálido y natural, la cuidadora sostiene suavemente la mano de la mujer mayor
Style/medium: fotografía editorial lifestyle, realista, no publicitaria
Composition/framing: vertical 4:5, plano medio, sujetos ligeramente a la derecha, espacio negativo arriba a la izquierda para titulares
Lighting/mood: luz natural de ventana, suave, difusa y cálida; sensación de calma, respeto y confianza
Color palette: verdes menta apagados, beige, blanco cálido, madera clara
Materials/textures: telas de algodón, madera, piel con textura real y natural
Constraints: personas latinoamericanas; expresiones naturales, sin sonrisas forzadas; sin uniformes clínicos; sin texto ni logotipos; sin marcas de agua
Avoid: estetoscopios, batas blancas, guantes, entorno hospitalario, poses de banco de imágenes, iluminación de estudio plana, personas mirando a cámara
```

## 2. Confianza — `public/img/confianza-familia.jpg` (3:2, 1500×1000)

```
Use case: photorealistic-natural
Asset type: fotografía de sección emocional de un sitio web de cuidado de adultos mayores
Primary request: una hija adulta conversando con su madre mayor en el living de una casa
Scene/backdrop: living de casa chilena, sofá de tono neutro, mesa baja con una taza, luz de tarde
Subject: mujer de 50 años y su madre de unos 80, sentadas de lado, conversando con complicidad y serenidad; la hija escucha con atención
Style/medium: fotografía editorial lifestyle, realista, documental
Composition/framing: horizontal 3:2, plano general corto, sujetos a la izquierda de la imagen
Lighting/mood: luz natural lateral, cálida y suave; sensación íntima y tranquila
Color palette: verdes menta apagados, beige, blanco cálido
Constraints: personas latinoamericanas; ropa cotidiana; textura de piel real; sin texto ni logotipos ni marcas de agua
Avoid: clínica, bata, uniforme, dramatismo, llanto, personas mirando a cámara
```

## 3. Open Graph — `public/img/og-aeterna-care.jpg` (1200×630)

Puede generarse a partir de la fotografía del hero con un recorte horizontal y
una franja menta a la izquierda con el texto:

```
Aeterna Care
Cuidado de adultos mayores en casa
Atención profesional y cercana en Santiago
```

Tipografía del texto: Manrope (o una sans geométrica equivalente). Si no se
genera una nueva, la imagen actual funciona para compartir en WhatsApp y redes.

---

## Cómo reemplazar las imágenes

1. Guardar el archivo final con el mismo nombre en `public/img/`.
2. Mantener la proporción: 4:5 en el hero y 3:2 en la sección de confianza.
3. Exportar en JPEG calidad 80–85 (o WebP, ajustando el `src`).
4. Actualizar el atributo `alt` si la escena cambió: debe describir lo que
   realmente muestra la foto.
5. Recompilar con `npm run build`.
