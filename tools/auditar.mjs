/**
 * Auditoría técnica del sitio compilado, medida en un navegador real.
 *
 * Revisa, página por página y en tres anchos:
 *  - un solo H1 y jerarquía de títulos sin saltos
 *  - contraste de texto (WCAG 2.2 AA)
 *  - tamaño mínimo de texto y de zonas táctiles
 *  - etiquetas de formulario asociadas
 *  - atributos alt de las imágenes
 *  - desbordes horizontales por elemento
 *  - hero dentro del rango 70–80vh en escritorio
 *
 * Ejecutar: node tools/auditar.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const dist = join(aqui, '..', 'dist');

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
    res.writeHead(404);
    res.end('404');
  }
});

await new Promise((resolve) => servidor.listen(4398, resolve));

const paginas = [
  '/',
  '/contacto/',
  '/blog/',
  '/blog/elegir-cuidadora-adulto-mayor/',
  '/privacidad/',
  '/terminos/',
  '/gracias/',
  '/404.html',
];

const vistas = [
  { nombre: 'desktop', ancho: 1440, alto: 1000 },
  { nombre: 'tablet', ancho: 834, alto: 1112 },
  { nombre: 'movil', ancho: 390, alto: 844 },
];

/** Función que corre dentro de la página y devuelve los hallazgos. */
const auditar = () => {
  const hallazgos = [];
  const agregar = (tipo, detalle) => hallazgos.push({ tipo, detalle });

  const aRgb = (color) => {
    const m = color.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const partes = m[1].split(',').map((v) => Number.parseFloat(v));
    return { r: partes[0], g: partes[1], b: partes[2], a: partes.length > 3 ? partes[3] : 1 };
  };

  const luminancia = ({ r, g, b }) => {
    const canal = (v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
  };

  const contraste = (a, b) => {
    const la = luminancia(a);
    const lb = luminancia(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };

  const mezclar = (frente, fondo) => ({
    r: frente.r * frente.a + fondo.r * (1 - frente.a),
    g: frente.g * frente.a + fondo.g * (1 - frente.a),
    b: frente.b * frente.a + fondo.b * (1 - frente.a),
    a: 1,
  });

  const fondoEfectivo = (elemento) => {
    let actual = elemento;
    let acumulado = null;
    while (actual) {
      const estilo = getComputedStyle(actual);
      // Los botones usan degradado: se evalúa el peor extremo del degradado.
      const degradado = estilo.backgroundImage;
      if (degradado && degradado.includes('gradient')) {
        const colores = degradado.match(/(?:rgb|rgba)\([^)]+\)/g) ?? [];
        const opacos = colores
          .map(aRgb)
          .filter((c) => c && c.a === 1)
          // El stop más claro es el que menos contraste entrega con texto blanco.
          .sort((a, b) => luminancia(b) - luminancia(a));
        if (opacos.length > 0) return opacos[0];
      }
      const color = aRgb(estilo.backgroundColor);
      if (color && color.a > 0) {
        acumulado = acumulado ? mezclar(acumulado, color) : color;
        if (color.a === 1) return acumulado;
      }
      actual = actual.parentElement;
    }
    return acumulado ?? { r: 255, g: 255, b: 255, a: 1 };
  };

  // --- Títulos -------------------------------------------------------------
  const h1 = document.querySelectorAll('h1');
  if (h1.length !== 1) agregar('titulos', `hay ${h1.length} etiquetas H1 (debe haber exactamente 1)`);

  const titulos = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .filter((t) => t.offsetParent !== null)
    .map((t) => Number(t.tagName.slice(1)));
  for (let i = 1; i < titulos.length; i += 1) {
    if (titulos[i] - titulos[i - 1] > 1) {
      agregar('titulos', `salto de jerarquía: h${titulos[i - 1]} → h${titulos[i]}`);
      break;
    }
  }

  // --- Texto: contraste y tamaño ------------------------------------------
  const nodosTexto = [...document.querySelectorAll('p, li, a, span, h1, h2, h3, h4, label, button, td, th, strong, em, time, code')];
  const vistos = new Set();

  for (const nodo of nodosTexto) {
    const textoPropio = [...nodo.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (!textoPropio || textoPropio.length < 2) continue;
    if (nodo.closest('.sr-only') || nodo.classList.contains('sr-only')) continue;

    const estilo = getComputedStyle(nodo);
    if (estilo.visibility === 'hidden' || estilo.display === 'none' || Number(estilo.opacity) === 0) continue;

    const rect = nodo.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const clave = `${nodo.tagName}|${estilo.color}|${estilo.fontSize}|${estilo.fontWeight}|${textoPropio.slice(0, 24)}`;
    if (vistos.has(clave)) continue;
    vistos.add(clave);

    const color = aRgb(estilo.color);
    if (!color) continue;
    const fondo = fondoEfectivo(nodo);
    const razon = contraste(color.a < 1 ? mezclar(color, fondo) : color, fondo);
    const tamano = Number.parseFloat(estilo.fontSize);
    const peso = Number(estilo.fontWeight) || 400;
    const esGrande = tamano >= 24 || (tamano >= 18.66 && peso >= 700);
    const minimo = esGrande ? 3 : 4.5;

    if (razon < minimo) {
      agregar(
        'contraste',
        `${razon.toFixed(2)}:1 (mínimo ${minimo}) en <${nodo.tagName.toLowerCase()}> «${textoPropio.slice(0, 46)}» color ${estilo.color} sobre rgb(${Math.round(fondo.r)},${Math.round(fondo.g)},${Math.round(fondo.b)})`,
      );
    }

    if (tamano < 12) {
      agregar('tamano', `${tamano}px en «${textoPropio.slice(0, 40)}»`);
    }
  }

  // --- Zonas táctiles ------------------------------------------------------
  const interactivos = [...document.querySelectorAll('a[href], button, input[type="checkbox"], select')];
  for (const elemento of interactivos) {
    // Un control envuelto por su etiqueta tiene como zona real toda la etiqueta.
    const objetivo = elemento.closest('label') ?? elemento;
    // Los enlaces dentro de un párrafo quedan exentos (WCAG 2.5.8, excepción de texto).
    if (elemento.tagName === 'A' && elemento.parentElement?.tagName === 'P') continue;
    const rect = objetivo.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (elemento.closest('.sr-only')) continue;
    if (elemento.matches('a[href^="#"], .salto-a-contenido')) continue;
    if (rect.width < 24 || rect.height < 24) {
      agregar(
        'zona-tactil',
        `<${elemento.tagName.toLowerCase()}> de ${Math.round(rect.width)}x${Math.round(rect.height)}px («${(objetivo.textContent || elemento.getAttribute('aria-label') || '').trim().slice(0, 32)}»)`,
      );
    }
  }

  // --- Imágenes ------------------------------------------------------------
  for (const img of document.querySelectorAll('img')) {
    const src = img.getAttribute('src');
    if (!img.hasAttribute('alt')) {
      agregar('img', `imagen sin atributo alt: ${src}`);
      continue;
    }
    if (!img.getAttribute('alt').trim()) {
      // `alt=""` es correcto en imágenes decorativas: el nombre accesible lo
      // aporta el texto o el aria-label del enlace/botón que las contiene.
      const contenedor = img.closest('a, button');
      const nombreAccesible =
        contenedor?.getAttribute('aria-label')?.trim() ||
        contenedor?.textContent?.replace(/\s+/g, ' ').trim();
      if (!nombreAccesible) agregar('img', `alt vacío sin nombre accesible: ${src}`);
    }
  }

  // --- Formularios ---------------------------------------------------------
  for (const control of document.querySelectorAll('input:not([type="hidden"]), select, textarea')) {
    if (control.closest('.sr-only')) continue;
    const id = control.getAttribute('id');
    const tieneLabel = id && document.querySelector(`label[for="${id}"]`);
    const envuelto = control.closest('label');
    const aria = control.getAttribute('aria-label');
    if (!tieneLabel && !envuelto && !aria) {
      agregar('formulario', `control sin etiqueta: ${control.getAttribute('name') ?? control.getAttribute('id')}`);
    }
  }

  // --- Desbordes por elemento ---------------------------------------------
  const anchoVista = document.documentElement.clientWidth;
  for (const elemento of document.querySelectorAll('body *')) {
    if (elemento.closest('.consentimiento-banner')) continue;
    const rect = elemento.getBoundingClientRect();
    if (rect.width === 0) continue;
    if (rect.right > anchoVista + 1.5 || rect.left < -1.5) {
      const estilo = getComputedStyle(elemento);
      if (estilo.position === 'fixed' || estilo.position === 'absolute') continue;
      agregar(
        'desborde',
        `<${elemento.tagName.toLowerCase()} class="${(elemento.className || '').toString().slice(0, 40)}"> sale del ancho (left ${Math.round(rect.left)}, right ${Math.round(rect.right)} de ${anchoVista})`,
      );
      if (hallazgos.filter((h) => h.tipo === 'desborde').length > 6) break;
    }
  }

  // --- Hero ---------------------------------------------------------------
  const hero = document.querySelector('.hero');
  if (hero) {
    const altoHero = hero.getBoundingClientRect().height;
    const porcion = (altoHero / window.innerHeight) * 100;
    if (window.innerWidth >= 1024 && (porcion < 68 || porcion > 88)) {
      agregar('hero', `el hero ocupa ${porcion.toFixed(0)}% del viewport (objetivo 70–80%)`);
    }
  }

  // --- Header -------------------------------------------------------------
  const header = document.querySelector('.header');
  const primeraSeccion = document.querySelector('main > section, main > .hero');
  if (header && primeraSeccion) {
    const rectHeader = header.getBoundingClientRect();
    const rectSeccion = primeraSeccion.getBoundingClientRect();
    if (rectSeccion.top < rectHeader.bottom - 2) {
      agregar('header', 'el encabezado se superpone con la primera sección');
    }
  }

  return hallazgos;
};

const navegador = await chromium.launch({ channel: 'chrome', args: ['--hide-scrollbars'] });
const problemas = [];
let mediciones = 0;

for (const vista of vistas) {
  const contexto = await navegador.newContext({
    viewport: { width: vista.ancho, height: vista.alto },
    locale: 'es-CL',
  });
  for (const ruta of paginas) {
    const pestana = await contexto.newPage();
    await pestana.goto(`http://localhost:4398${ruta}`, { waitUntil: 'networkidle' });
    await pestana.evaluate(async () => {
      const alto = document.body.scrollHeight;
      for (let y = 0; y < alto; y += 800) {
        // `instant` evita que el scroll suave del sitio deforme las mediciones.
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await pestana.waitForTimeout(800);

    const hallazgos = await pestana.evaluate(auditar);
    mediciones += 1;
    hallazgos.forEach((h) => problemas.push({ vista: vista.nombre, ruta, ...h }));
    await pestana.close();
  }
  await contexto.close();
}

await navegador.close();
servidor.close();

console.log(`Páginas auditadas: ${mediciones}\n`);

if (problemas.length === 0) {
  console.log('Sin hallazgos.');
} else {
  const porTipo = problemas.reduce((acc, p) => {
    acc[p.tipo] = (acc[p.tipo] ?? 0) + 1;
    return acc;
  }, {});
  console.log('Resumen:', porTipo, '\n');

  const unicos = new Map();
  problemas.forEach((p) => {
    const clave = `${p.tipo}|${p.detalle}`;
    if (!unicos.has(clave)) unicos.set(clave, { ...p, veces: 1 });
    else unicos.get(clave).veces += 1;
  });

  [...unicos.values()]
    .sort((a, b) => b.veces - a.veces)
    .slice(0, 60)
    .forEach((p) => console.log(`[${p.tipo}] ${p.vistas ?? ''}${p.vista}${p.ruta} (x${p.veces}) ${p.detalle}`));
}
