/**
 * Verificación visual del sitio compilado.
 * Levanta un servidor estático sobre /dist, abre Chrome y guarda capturas en
 * desktop, tablet y móvil. Además reporta errores de consola y de red.
 *
 * Ejecutar: node tools/capturar.mjs
 */
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..');
const dist = join(raiz, 'dist');
const salida = join(raiz, 'capturas');

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
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const servidor = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let ruta = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    if (ruta.endsWith('/')) ruta += 'index.html';
    if (extname(ruta) === '') ruta += '/index.html';

    const archivo = join(dist, ruta);
    const contenido = await readFile(archivo);
    res.writeHead(200, { 'Content-Type': tipos[extname(archivo)] ?? 'application/octet-stream' });
    res.end(contenido);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404');
  }
});

await new Promise((resolve) => servidor.listen(4399, resolve));
await mkdir(salida, { recursive: true });

const navegador = await chromium.launch({
  channel: 'chrome',
  args: ['--force-color-profile=srgb', '--hide-scrollbars'],
});

const vistas = [
  { nombre: 'desktop', ancho: 1440, alto: 1000, movil: false },
  { nombre: 'tablet', ancho: 834, alto: 1112, movil: false },
  { nombre: 'movil', ancho: 390, alto: 844, movil: true },
];

const paginas = [
  { nombre: 'inicio', ruta: '/' },
  { nombre: 'contacto', ruta: '/contacto/' },
  { nombre: 'blog', ruta: '/blog/' },
  { nombre: 'privacidad', ruta: '/privacidad/' },
];

const problemas = [];

for (const vista of vistas) {
  const contexto = await navegador.newContext({
    viewport: { width: vista.ancho, height: vista.alto },
    deviceScaleFactor: 1,
    isMobile: vista.movil,
    hasTouch: vista.movil,
    locale: 'es-CL',
  });

  for (const pagina of paginas) {
    const pestana = await contexto.newPage();
    pestana.on('console', (msg) => {
      if (msg.type() === 'error') problemas.push(`[${vista.nombre}${pagina.ruta}] consola: ${msg.text()}`);
    });
    pestana.on('pageerror', (error) => problemas.push(`[${vista.nombre}${pagina.ruta}] error JS: ${error.message}`));
    pestana.on('requestfailed', (peticion) =>
      problemas.push(`[${vista.nombre}${pagina.ruta}] falló la petición: ${peticion.url()}`),
    );

    await pestana.goto(`http://localhost:4399${pagina.ruta}`, { waitUntil: 'networkidle' });
    // Se recorre la página para activar las apariciones al hacer scroll.
    await pestana.evaluate(async () => {
      const alto = document.body.scrollHeight;
      for (let y = 0; y < alto; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
    await pestana.waitForTimeout(700);

    const ancho = await pestana.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      cliente: document.documentElement.clientWidth,
    }));
    if (ancho.scroll > ancho.cliente + 1) {
      problemas.push(
        `[${vista.nombre}${pagina.ruta}] desborde horizontal: ${ancho.scroll}px > ${ancho.cliente}px`,
      );
    }

    await pestana.screenshot({
      path: join(salida, `${pagina.nombre}-${vista.nombre}.png`),
      fullPage: true,
    });
    await pestana.close();
  }

  await contexto.close();
}

await navegador.close();
servidor.close();

if (problemas.length === 0) {
  console.log('Sin errores de consola, de red ni desbordes horizontales.');
} else {
  console.log(`Se encontraron ${problemas.length} problemas:`);
  problemas.forEach((problema) => console.log(' -', problema));
}
