/**
 * Verifica la protección del correo en el sitio compilado:
 * 1. La dirección no aparece en claro en el HTML.
 * 2. No se publica ningún enlace mailto: estático.
 * 3. El botón «Copiar» reconstruye la dirección correcta.
 *
 * Ejecutar después de `npm run build`: node tools/verificar-correo.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const raiz = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');
const puerto = 4332;
const esperado = 'aeternacara@gmail.com';

const require = createRequire(import.meta.url);
const { chromium } = require(
  'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
);

const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const servidor = createServer(async (req, res) => {
  const rutaUrl = decodeURIComponent((req.url ?? '/').split('?')[0]);
  const candidatos = [normalize(join(raiz, rutaUrl))];
  if (!extname(rutaUrl)) candidatos.push(join(candidatos[0], 'index.html'));

  for (const archivo of candidatos) {
    if (!archivo.startsWith(raiz)) continue;
    try {
      const contenido = await readFile(archivo);
      res.writeHead(200, { 'content-type': tipos[extname(archivo)] ?? 'application/octet-stream' });
      res.end(contenido);
      return;
    } catch {
      /* siguiente candidato */
    }
  }

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('No encontrado');
});

await new Promise((listo) => servidor.listen(puerto, '127.0.0.1', listo));

const navegador = await chromium.launch({ channel: 'chrome' });
const contexto = await navegador.newContext();
await contexto.grantPermissions(['clipboard-read', 'clipboard-write'], {
  origin: `http://127.0.0.1:${puerto}`,
});

const pagina = await contexto.newPage();
const errores = [];

try {
  await pagina.goto(`http://127.0.0.1:${puerto}/`, { waitUntil: 'networkidle' });

  const html = await pagina.content();
  if (html.includes(esperado)) errores.push('La dirección aparece en claro en el HTML.');

  const mailtoEstatico = await pagina.locator('a[href^="mailto:"]').count();
  if (mailtoEstatico > 0) errores.push(`Hay ${mailtoEstatico} enlace(s) mailto: estáticos.`);

  await pagina.getByRole('button', { name: /Copiar dirección de correo/i }).first().click();
  const estado = await pagina
    .locator('[data-correo-estado]')
    .first()
    .textContent();
  const copiado = await pagina.evaluate(() => navigator.clipboard.readText());

  if (!estado?.includes('copiado')) errores.push(`Estado inesperado al copiar: ${estado}`);
  if (copiado !== esperado) errores.push(`El portapapeles contiene "${copiado}" en vez del correo esperado.`);
} catch (error) {
  errores.push(`Error durante la prueba: ${error.message}`);
} finally {
  await contexto.close();
  await navegador.close();
  servidor.close();
}

if (errores.length) {
  console.error('Correo protegido: FALLA');
  errores.forEach((error) => console.error('  ✗', error));
  process.exit(1);
}

console.log('Correo protegido: OK');
console.log('  · no aparece en claro en el HTML');
console.log('  · no hay enlaces mailto: estáticos');
console.log('  · el botón Copiar reconstruye la dirección correcta');
