/**
 * Genera los recursos gráficos base del sitio:
 *  - Sustituciones temporal de las fotografías (marcadas como pendientes).
 *  - Imagen Open Graph 1200x630.
 *  - apple-touch-icon 180x180.
 *
 * Usa `sharp` del runtime local. No forma parte del build de Astro.
 * Ejecutar: node tools/generar-imagenes.mjs
 */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const salida = join(raiz, 'public', 'img');

const require = createRequire(import.meta.url);
const rutasSharp = [
  'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
];

let sharp;
for (const ruta of rutasSharp) {
  try {
    sharp = require(ruta);
    break;
  } catch {
    /* siguiente */
  }
}

if (!sharp) {
  console.error('No se encontró sharp. Los recursos permanecen como SVG.');
  process.exit(1);
}

const etiqueta = (texto, ancho) => `
  <g>
    <rect x="${ancho / 2 - 118}" y="24" width="236" height="38" rx="19" fill="#FBF0DA" stroke="#E8C98A" />
    <text x="${ancho / 2}" y="49" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
      font-size="16" font-weight="600" fill="#8A5A08">${texto}</text>
  </g>`;

const escenaHero = (ancho, alto) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">
  <defs>
    <linearGradient id="fondo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EAF6F1" />
      <stop offset="55%" stop-color="#DCEAE8" />
      <stop offset="100%" stop-color="#D8E4EC" />
    </linearGradient>
    <radialGradient id="lila" cx="0.72" cy="0.24" r="0.55">
      <stop offset="0%" stop-color="#9A8BD4" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#9A8BD4" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="verde" cx="0.2" cy="0.82" r="0.6">
      <stop offset="0%" stop-color="#79BFAF" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#79BFAF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${ancho}" height="${alto}" fill="url(#fondo)" />
  <rect width="${ancho}" height="${alto}" fill="url(#lila)" />
  <rect width="${ancho}" height="${alto}" fill="url(#verde)" />
  <path d="M0 ${alto * 0.72} C ${ancho * 0.3} ${alto * 0.6}, ${ancho * 0.62} ${alto * 0.86}, ${ancho} ${alto * 0.68} L ${ancho} ${alto} L 0 ${alto} Z"
    fill="#FFFFFF" opacity="0.42" />
  <path d="M0 ${alto * 0.8} C ${ancho * 0.36} ${alto * 0.68}, ${ancho * 0.7} ${alto * 0.92}, ${ancho} ${alto * 0.78} L ${ancho} ${alto} L 0 ${alto} Z"
    fill="#FFFFFF" opacity="0.5" />
  <circle cx="${ancho * 0.74}" cy="${alto * 0.3}" r="${ancho * 0.2}" fill="#7869B8" opacity="0.12" />
  <circle cx="${ancho * 0.26}" cy="${alto * 0.36}" r="${ancho * 0.13}" fill="#79BFAF" opacity="0.16" />
  ${etiqueta('FOTO PENDIENTE', ancho)}
</svg>`;

const escenaConfianza = (ancho, alto) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">
  <defs>
    <linearGradient id="fondo2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F2FAF7" />
      <stop offset="60%" stop-color="#DCEAE5" />
      <stop offset="100%" stop-color="#E3E1F1" />
    </linearGradient>
    <radialGradient id="lila2" cx="0.24" cy="0.28" r="0.6">
      <stop offset="0%" stop-color="#9A8BD4" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#9A8BD4" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="verde2" cx="0.82" cy="0.76" r="0.62">
      <stop offset="0%" stop-color="#79BFAF" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#79BFAF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${ancho}" height="${alto}" fill="url(#fondo2)" />
  <rect width="${ancho}" height="${alto}" fill="url(#lila2)" />
  <rect width="${ancho}" height="${alto}" fill="url(#verde2)" />
  <path d="M ${ancho * 0.1} ${alto * 0.9} C ${ancho * 0.32} ${alto * 0.6}, ${ancho * 0.55} ${alto * 0.95}, ${ancho * 0.9} ${alto * 0.62}"
    fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.7" />
  ${etiqueta('FOTO PENDIENTE', ancho)}
</svg>`;

const tarjetaOg = (ancho, alto) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EAF6F1" />
      <stop offset="100%" stop-color="#DCEAE5" />
    </linearGradient>
    <radialGradient id="ogl" cx="0.86" cy="0.16" r="0.5">
      <stop offset="0%" stop-color="#9A8BD4" stop-opacity="0.42" />
      <stop offset="100%" stop-color="#9A8BD4" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="ogv" cx="0.1" cy="0.9" r="0.55">
      <stop offset="0%" stop-color="#79BFAF" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#79BFAF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${ancho}" height="${alto}" fill="url(#og)" />
  <rect width="${ancho}" height="${alto}" fill="url(#ogl)" />
  <rect width="${ancho}" height="${alto}" fill="url(#ogv)" />
  <text x="80" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="74" font-weight="700"
    fill="#243936">Aeterna Care</text>
  <text x="80" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="38" fill="#4C625C">
    Cuidado de adultos mayores en casa
  </text>
  <text x="80" y="392" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#4C625C">
    Atención profesional y cercana en Santiago
  </text>
  <rect x="80" y="440" width="330" height="72" rx="16" fill="#6C5CB0" />
  <text x="245" y="486" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28"
    font-weight="600" fill="#FFFFFF">Solicitar orientación</text>
  <circle cx="1120" cy="150" r="130" fill="#FFFFFF" opacity="0.45" />
</svg>`;

const iconoApple = (lado) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#EAF6F1" />
  <circle cx="90" cy="90" r="58" fill="none" stroke="#79BFAF" stroke-width="5" opacity="0.6" />
  <path d="M90 132S50 108 50 82 A24 24 0 0 1 90 66 A24 24 0 0 1 130 82 C130 108 90 132 90 132Z"
    fill="none" stroke="#7869B8" stroke-width="8" stroke-linejoin="round" />
</svg>`;

await mkdir(salida, { recursive: true });

const trabajos = [
  ['hero-cuidado.jpg', escenaHero(1200, 1500), 1200],
  ['confianza-familia.jpg', escenaConfianza(1500, 1000), 1500],
];

for (const [nombre, svg, ancho] of trabajos) {
  const buffer = await sharp(Buffer.from(svg), { density: 144 })
    .resize({ width: ancho })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(join(salida, nombre), buffer);
  console.log('escrito', nombre);
}

await writeFile(
  join(salida, 'og-aeterna-care.jpg'),
  await sharp(Buffer.from(tarjetaOg(1200, 630)), { density: 144 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer(),
);
console.log('escrito og-aeterna-care.jpg');

await writeFile(
  join(raiz, 'public', 'apple-touch-icon.png'),
  await sharp(Buffer.from(iconoApple(180)), { density: 144 }).png().toBuffer(),
);
console.log('escrito apple-touch-icon.png');
