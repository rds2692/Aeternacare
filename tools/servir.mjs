/**
 * Vista previa del sitio compilado, sin dependencias.
 * Sirve /dist en http://localhost:4321 con URLs limpias (como en producción).
 *
 * Ejecutar: node tools/servir.mjs
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const dist = join(aqui, '..', 'dist');
const puerto = Number(process.env.PUERTO ?? 4321);

const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

async function resolver(ruta) {
  const limpia = normalize(decodeURIComponent(ruta)).replace(/^(\.\.[/\\])+/, '');
  const candidatos = [join(dist, limpia)];
  if (limpia.endsWith('/') || extname(limpia) === '') {
    candidatos.push(join(dist, limpia, 'index.html'), join(dist, `${limpia}.html`));
  }

  for (const candidato of candidatos) {
    try {
      const info = await stat(candidato);
      if (info.isFile()) return candidato;
    } catch {
      /* siguiente candidato */
    }
  }
  return null;
}

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const archivo = await resolver(url.pathname);

  if (!archivo) {
    const personalizado = join(dist, '404.html');
    try {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(await readFile(personalizado));
    } catch {
      res.writeHead(404);
      res.end('404');
    }
    return;
  }

  res.writeHead(200, { 'Content-Type': tipos[extname(archivo)] ?? 'application/octet-stream' });
  res.end(await readFile(archivo));
});

servidor.listen(puerto, () => {
  console.log(`Aeterna Care disponible en http://localhost:${puerto}`);
  console.log('Detener con Ctrl+C.');
});
