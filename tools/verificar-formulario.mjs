/**
 * Verifica que el formulario envíe directamente a WhatsApp:
 * - no muestra el aviso de «modo demostración»;
 * - valida los campos obligatorios;
 * - abre wa.me con el número configurado;
 * - incluye los datos escritos y la autorización en el mensaje.
 *
 * Ejecutar después de `npm run build`: node tools/verificar-formulario.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const raiz = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');
const puerto = 4333;
const numeroEsperado = '56932061549';

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
const contexto = await navegador.newContext({ locale: 'es-CL' });
const pagina = await contexto.newPage();
const errores = [];

try {
  await pagina.addInitScript(() => {
    window.__whatsappAbierto = null;
    window.open = (url) => {
      window.__whatsappAbierto = String(url);
      return { opener: null, closed: false };
    };
  });

  await pagina.goto(`http://127.0.0.1:${puerto}/`, { waitUntil: 'networkidle' });

  const html = await pagina.content();
  if (/modo demostración/i.test(html)) errores.push('Sigue apareciendo el aviso de modo demostración.');
  if (!/Enviar por WhatsApp/i.test(html)) errores.push('El botón no dice «Enviar por WhatsApp».');

  const boton = pagina.getByRole('button', { name: /Enviar por WhatsApp/i });
  await boton.click();
  const erroresVisibles = await pagina.locator('.campo__error').evaluateAll((nodos) =>
    nodos.filter((nodo) => (nodo.textContent ?? '').trim()).length,
  );
  if (erroresVisibles === 0) errores.push('La validación no mostró errores con el formulario vacío.');

  await pagina.fill('#nombre', 'Prueba QA');
  await pagina.fill('#telefono', '+56 9 1111 2222');
  await pagina.selectOption('#ayuda', 'Acompañamiento y compañía');
  await pagina.selectOption('#paraquien', 'Para mi madre');
  await pagina.fill('#mensaje', 'Mensaje de prueba automatizada');
  await pagina.check('#consentimiento-datos');
  await boton.click();

  const url = await pagina.evaluate(() => window.__whatsappAbierto);
  const estado = await pagina.locator('#formulario-estado').textContent();

  if (!url) {
    errores.push('No se abrió WhatsApp al enviar el formulario.');
  } else {
    const destino = new URL(url);
    const mensaje = destino.searchParams.get('text') ?? '';
    if (destino.host !== 'wa.me') errores.push(`Destino inesperado: ${destino.host}`);
    if (destino.pathname !== `/${numeroEsperado}`) {
      errores.push(`Número inesperado en la URL: ${destino.pathname}`);
    }
    for (const fragmento of [
      'Nombre: Prueba QA',
      'Teléfono: +56 9 1111 2222',
      'Tipo de ayuda: Acompañamiento y compañía',
      'Para quién: Para mi madre',
      'Mensaje de prueba automatizada',
      'Autorizo el contacto',
    ]) {
      if (!mensaje.includes(fragmento)) errores.push(`Falta en el mensaje: ${fragmento}`);
    }
  }

  if (!estado?.includes('Abrimos WhatsApp')) {
    errores.push(`Estado inesperado: ${estado}`);
  }
} catch (error) {
  errores.push(`Error durante la prueba: ${error.message}`);
} finally {
  await contexto.close();
  await navegador.close();
  servidor.close();
}

if (errores.length) {
  console.error('Formulario WhatsApp: FALLA');
  errores.forEach((error) => console.error('  ✗', error));
  process.exit(1);
}

console.log('Formulario WhatsApp: OK');
console.log('  · sin aviso de modo demostración');
console.log('  · validación de campos activa');
console.log('  · abre wa.me con el número configurado');
console.log('  · incluye datos y autorización en el mensaje');
