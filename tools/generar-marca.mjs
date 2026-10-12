/**
 * Deriva los recursos de marca a partir del logo original del cliente.
 *
 * Entrada:  marca/Logo_Aeterna.png     (original, no se publica)
 * Salidas:  public/img/logo-aeterna-care.png   lockup completo optimizado
 *           public/img/logo-aeterna-emblema.png emblema recortado (favicons)
 *           public/favicon-32.png · favicon-192.png · apple-touch-icon.png
 *
 * El recorte del emblema se calcula midiendo el canal alfa, no a ojo.
 * Ejecutar: node tools/generar-marca.mjs
 */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const original = join(raiz, 'marca', 'Logo_Aeterna.png');
const img = join(raiz, 'public', 'img');
const publico = join(raiz, 'public');

const require = createRequire(import.meta.url);
const sharp = require(
  'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
);

const MENTA = '#EAF6F1';

/** Zonas del lockup que corresponden al nombre, las líneas y la bajada. */
const ZONA_ERASE = [
  { x0: 320, y0: 1085 }, // nombre "Aeterna Care"
  { x0: 0, y0: 1320 }, // líneas decorativas y bajada inferior
];

/** Caja del contenido con alfa, dentro de una región. */
async function cajaAlfa(entrada, region) {
  const { data, info } = await sharp(entrada)
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * 4 + 3] > 24) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  return {
    left: region.left + minX,
    top: region.top + minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

await mkdir(img, { recursive: true });

// 1. Recorte de márgenes transparentes del original.
const base = await sharp(original).trim({ threshold: 8 }).png().toBuffer({ resolveWithObject: true });
const { width: anchoBase, height: altoBase } = base.info;
console.log(`original recortado: ${anchoBase}x${altoBase}`);

// 2. Lockup completo optimizado, para el pie y para compartir en redes.
const altoLockup = Math.round((anchoBase / altoBase) * 240);
const lockup = await sharp(base.data).resize({ height: 240 }).png({ compressionLevel: 9 });
await writeFile(join(img, 'logo-aeterna-care.png'), await lockup.toBuffer());
await writeFile(
  join(img, 'logo-aeterna-care.webp'),
  await sharp(base.data).resize({ height: 240 }).webp({ quality: 92, alphaQuality: 100 }).toBuffer(),
);

// 3. Emblema: se borra la zona del nombre y de las líneas, y se recorta a su caja.
const { data: pixeles, info: infoBase } = await sharp(base.data)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let y = 0; y < infoBase.height; y += 1) {
  for (let x = 0; x < infoBase.width; x += 1) {
    const borrar = ZONA_ERASE.some((zona) => x >= zona.x0 && y >= zona.y0);
    if (borrar) pixeles[(y * infoBase.width + x) * 4 + 3] = 0;
  }
}

const emblemaBase = await sharp(pixeles, {
  raw: { width: infoBase.width, height: infoBase.height, channels: 4 },
})
  .png()
  .toBuffer();

const cajaEmblema = await cajaAlfa(emblemaBase, {
  left: 0,
  top: 0,
  width: infoBase.width,
  height: infoBase.height,
});
console.log(
  `emblema recortado: ${cajaEmblema.width}x${cajaEmblema.height} en (${cajaEmblema.left}, ${cajaEmblema.top})`,
);

const lado = Math.max(cajaEmblema.width, cajaEmblema.height);
const emblema = await sharp(emblemaBase)
  .extract({ left: cajaEmblema.left, top: cajaEmblema.top, width: lado, height: lado })
  .resize(240, 240, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
await writeFile(join(img, 'logo-aeterna-emblema.png'), emblema);
await writeFile(
  join(img, 'logo-aeterna-emblema.webp'),
  await sharp(emblema).webp({ quality: 92, alphaQuality: 100 }).toBuffer(),
);

// 4. Favicons e ícono de app: emblema centrado sobre fondo menta redondeado.
async function icono(pixels, proporcion) {
  const lienzo = Math.round(pixels * proporcion);
  const fondo = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${pixels}" height="${pixels}">
       <rect width="${pixels}" height="${pixels}" rx="${Math.round(pixels * 0.22)}" fill="${MENTA}"/>
     </svg>`,
  );
  const marca = await sharp(emblema).resize(lienzo, lienzo, { fit: 'contain' }).toBuffer();
  const margen = Math.round((pixels - lienzo) / 2);
  return sharp(fondo)
    .composite([{ input: marca, top: margen, left: margen }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await writeFile(join(publico, 'favicon-32.png'), await icono(32, 0.82));
await writeFile(join(publico, 'favicon-192.png'), await icono(192, 0.82));
await writeFile(join(publico, 'apple-touch-icon.png'), await icono(180, 0.74));

console.log(
  'generados: logo-aeterna-care (png/webp), logo-aeterna-emblema (png/webp), favicon-32.png, favicon-192.png, apple-touch-icon.png',
);
console.log(`lockup 240px de alto, ${altoLockup}px de ancho`);
