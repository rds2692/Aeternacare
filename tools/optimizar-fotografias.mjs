/**
 * Optimiza las fotografías del sitio y genera versiones responsive.
 *
 * - Lee los originales desde marca/fotografias-originales/ (si existen) o,
 *   si no, desde public/img/.
 * - Escribe en public/img/: un JPG maestro con el nombre estable que usa el
 *   sitio (hero-cuidado.jpg, confianza-familia.jpg, etc.) + variantes
 *   JPG/WebP/AVIF por ancho para srcset.
 * - Elimina metadatos (EXIF/XMP) y corrige la orientación.
 *
 * Ejecutar: node tools/optimizar-fotografias.mjs
 * Requiere sharp (ya viene con Astro). No forma parte del build.
 */
import { createRequire } from 'node:module';
import { access, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const salida = join(raiz, 'public', 'img');
const originales = join(raiz, 'marca', 'fotografias-originales');

const require = createRequire(import.meta.url);
const rutasSharp = [
  join(raiz, 'node_modules', '.pnpm', 'sharp@0.34.5', 'node_modules', 'sharp'),
  'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
];

let sharp;
for (const ruta of rutasSharp) {
  try {
    sharp = require(ruta);
    break;
  } catch {
    /* siguiente ruta */
  }
}

if (!sharp) {
  console.error('No se encontró sharp. Instala dependencias con npm install.');
  process.exit(1);
}

/**
 * Cada entrada define el nombre estable que se usa en el HTML, el ancho del
 * JPG maestro y los anchos incluidos en el srcset.
 * Las proporciones coinciden con el encuadre de las secciones del sitio.
 */
const FOTOGRAFIAS = [
  {
    base: 'hero-cuidado',
    proporcion: 4 / 5,
    maestro: 928,
    anchos: [464, 696, 928],
  },
  {
    base: 'confianza-familia',
    proporcion: 3 / 2,
    maestro: 1500,
    anchos: [750, 1125, 1500],
  },
  {
    base: 'editorial-compania-lectura',
    proporcion: 3 / 2,
    maestro: 1800,
    anchos: [800, 1200, 1800],
  },
  {
    base: 'editorial-conversacion-familiar',
    proporcion: 3 / 2,
    maestro: 1800,
    anchos: [800, 1200, 1800],
  },
  {
    base: 'editorial-detalle-hogar',
    proporcion: 1,
    maestro: 1400,
    anchos: [560, 840, 1400],
  },
  {
    base: 'editorial-paseo-barrio',
    proporcion: 4 / 3,
    maestro: 1600,
    anchos: [800, 1200, 1600],
  },
];

const existe = async (ruta) => {
  try {
    await access(ruta);
    return true;
  } catch {
    return false;
  }
};

const kb = (bytes) => `${Math.round(bytes / 1024)} kB`;

await mkdir(salida, { recursive: true });
await mkdir(originales, { recursive: true });

const filas = [];

for (const foto of FOTOGRAFIAS) {
  const candidatos = [
    join(originales, `${foto.base}.jpg`),
    join(originales, `${foto.base}.png`),
    join(salida, `${foto.base}.jpg`),
    join(salida, `${foto.base}.png`),
  ];

  let origen;
  for (const candidato of candidatos) {
    if (await existe(candidato)) {
      origen = candidato;
      break;
    }
  }

  if (!origen) {
    console.warn(`· Falta ${foto.base}.jpg: se omite.`);
    continue;
  }

  const originalBytes = (await stat(origen)).size;
  const maestroAlto = Math.round(foto.maestro / foto.proporcion);
  const anchos = [...new Set([...foto.anchos, foto.maestro])].sort((a, b) => a - b);
  const tamanos = {};

  for (const ancho of anchos) {
    const alto = Math.round(ancho / foto.proporcion);
    const base = sharp(origen)
      .rotate()
      .resize({ width: ancho, height: alto, fit: 'cover', position: 'centre' });

    const jpg = await base
      .clone()
      .jpeg({ quality: 82, progressive: true, chromaSubsampling: '4:2:0' })
      .toBuffer();
    const webp = await base.clone().webp({ quality: 80, effort: 5 }).toBuffer();
    const avif = await base.clone().avif({ quality: 55, effort: 4 }).toBuffer();

    await sharp(jpg).toFile(join(salida, `${foto.base}-${ancho}.jpg`));
    await sharp(webp).toFile(join(salida, `${foto.base}-${ancho}.webp`));
    await sharp(avif).toFile(join(salida, `${foto.base}-${ancho}.avif`));

    if (ancho === foto.maestro) {
      await sharp(jpg).toFile(join(salida, `${foto.base}.jpg`));
      await sharp(webp).toFile(join(salida, `${foto.base}.webp`));
      tamanos.maestroJpg = jpg.length;
      tamanos.maestroWebp = webp.length;
      tamanos.maestroAvif = avif.length;
    }
  }

  filas.push({
    archivo: foto.base,
    dimensiones: `${foto.maestro}×${maestroAlto}`,
    original: kb(originalBytes),
    jpg: kb(tamanos.maestroJpg),
    webp: kb(tamanos.maestroWebp),
    avif: kb(tamanos.maestroAvif),
    ahorro: `${Math.round((1 - tamanos.maestroWebp / originalBytes) * 100)}%`,
  });
}

console.table(filas);
console.log('\nVariantes generadas en public/img (JPG + WebP + AVIF por ancho).');
