/**
 * Descarga Manrope e Instrument Serif desde Google Fonts y las guarda
 * autoalojadas en public/fonts (una sola vez).
 *
 * Autoalojar evita peticiones a terceros, mejora la privacidad y el LCP.
 * Ejecutar: node tools/descargar-fuentes.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const destino = join(aqui, '..', 'public', 'fonts');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const familias = [
  {
    css: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
    prefijo: 'manrope',
    variantes: { normal: '' },
  },
  {
    css: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',
    prefijo: 'instrument-serif',
    subconjuntos: ['latin'],
  },
];

/** Devuelve los bloques agrupados por subconjunto (latin, latin-ext, …). */
function bloquesPorSubconjunto(css) {
  const partes = css.split('/*');
  const resultado = [];
  for (const parte of partes) {
    const cierre = parte.indexOf('*/');
    if (cierre === -1) continue;
    const nombre = parte.slice(0, cierre).trim();
    const cuerpo = parte.slice(cierre + 2);
    const url = cuerpo.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    const esItalic = /font-style:\s*italic/.test(cuerpo);
    if (url) resultado.push({ nombre, url, esItalic });
  }
  return resultado;
}

async function traer(url, texto = false) {
  const respuesta = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!respuesta.ok) throw new Error(`${respuesta.status} al pedir ${url}`);
  return texto ? respuesta.text() : Buffer.from(await respuesta.arrayBuffer());
}

await mkdir(destino, { recursive: true });

for (const familia of familias) {
  const css = await traer(familia.css, true);
  const bloques = bloquesPorSubconjunto(css);

  for (const bloque of bloques) {
    const permitidos = familia.subconjuntos ?? ['latin', 'latin-ext'];
    if (!permitidos.includes(bloque.nombre)) continue;

    const estilo = bloque.esItalic ? 'italic' : 'normal';
    const nombreArchivo =
      estilo === 'italic'
        ? `${familia.prefijo}-italic-${bloque.nombre}.woff2`
        : `${familia.prefijo}-${bloque.nombre}.woff2`;

    await writeFile(join(destino, nombreArchivo), await traer(bloque.url));
    console.log('descargada', nombreArchivo);
  }
}
