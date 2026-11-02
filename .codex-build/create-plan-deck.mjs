import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const workspaceDir = 'C:/Users/Admin/Documents/AeternaCare/aeterna-web';
const buildDir = path.join(workspaceDir, '.codex-build');
const outputDir = path.join(workspaceDir, 'entregables');
const runtimeNodeModules = 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const logoPath = path.join(workspaceDir, 'public/img/logo-aeterna-care.png');
const heroPath = path.join(workspaceDir, 'public/img/hero-cuidado.jpg');

const W = 1280, H = 720;
const C = {
  bg: '#F5F8F6',
  white: '#FFFFFF',
  ink: '#1F3935',
  body: '#536A66',
  mint: '#DCEFE9',
  mint2: '#BFDCD4',
  purple: '#6D5BB5',
  purpleDark: '#514493',
  peach: '#F4C6B5',
  line: '#C9DDD7',
  gold: '#E5B86C',
  dark: '#142724',
};
const FONT = 'Aptos';

async function bytes(p) {
  const b = await fs.readFile(p);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}
async function writeBlob(p, blob) {
  await fs.writeFile(p, new Uint8Array(await blob.arrayBuffer()));
}
function rect(slide, x, y, w, h, fill, radius = 'rounded-lg', lineFill = 'none', lineWidth = 0) {
  return slide.shapes.add({
    geometry: radius === 'none' ? 'rect' : 'roundRect',
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: 'solid', fill: lineFill, width: lineWidth },
    borderRadius: radius === 'none' ? undefined : radius,
  });
}
function line(slide, x, y, w, color = C.line, width = 1) {
  return slide.shapes.add({ geometry: 'rect', position: { left: x, top: y, width: w, height: width }, fill: color, line: { style: 'solid', fill: color, width: 0 } });
}
function text(slide, value, x, y, w, h, style = {}) {
  const s = slide.shapes.add({ geometry: 'textbox', position: { left: x, top: y, width: w, height: h }, fill: 'none', line: { style: 'solid', fill: 'none', width: 0 } });
  s.text = value;
  s.text.style = { fontFamily: FONT, fontSize: style.size ?? 20, color: style.color ?? C.body, bold: style.bold ?? false, italic: style.italic ?? false, align: style.align ?? 'left', verticalAlign: style.verticalAlign ?? 'top' };
  return s;
}
function title(slide, kicker, heading, sub = '') {
  text(slide, kicker.toUpperCase(), 72, 48, 500, 24, { size: 13, color: C.purple, bold: true });
  text(slide, heading, 72, 82, 980, 56, { size: 34, color: C.ink, bold: true });
  if (sub) text(slide, sub, 72, 148, 990, 42, { size: 18, color: C.body });
}
function footer(slide, n, source = '') {
  line(slide, 72, 680, 1136, C.line, 1);
  text(slide, 'Aeterna Care · Plan de captación digital · 26 oct 2026', 72, 690, 650, 18, { size: 10, color: '#81918D' });
  text(slide, String(n).padStart(2, '0'), 1160, 690, 48, 18, { size: 11, color: C.purple, bold: true, align: 'right' });
  if (source) text(slide, source, 760, 655, 400, 18, { size: 9, color: '#81918D', align: 'right' });
}
function bullet(slide, label, body, x, y, w, accent = C.purple) {
  rect(slide, x, y + 4, 9, 9, accent, 'rounded-full');
  text(slide, label, x + 24, y, w - 24, 26, { size: 18, color: C.ink, bold: true });
  if (body) text(slide, body, x + 24, y + 27, w - 24, 48, { size: 15, color: C.body });
}
function price(slide, amount, label, x, y, w, h, accent = C.purple) {
  rect(slide, x, y, w, h, C.white, 'rounded-xl', C.line, 1);
  rect(slide, x, y, 8, h, accent, 'rounded-xl');
  text(slide, amount, x + 28, y + 18, w - 48, 36, { size: 27, color: C.ink, bold: true });
  text(slide, label, x + 28, y + 60, w - 48, h - 72, { size: 15, color: C.body });
}

async function main() {
  await fs.mkdir(buildDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  const logo = await bytes(logoPath);
  const hero = await bytes(heroPath);

  // 1 cover
  {
    const s = presentation.slides.add(); s.background.fill = C.bg;
    rect(s, 0, 0, 720, H, C.bg, 'none'); rect(s, 720, 0, 560, H, C.mint, 'none');
    s.images.add({ blob: hero, contentType: 'image/jpeg', alt: 'Cuidado de una persona mayor en casa', fit: 'cover', position: { left: 760, top: 72, width: 448, height: 500 }, geometry: 'roundRect', borderRadius: 'rounded-2xl' });
    s.images.add({ blob: logo, contentType: 'image/png', alt: 'Aeterna Care', fit: 'contain', position: { left: 72, top: 54, width: 220, height: 68 } });
    text(s, 'Plan de captación\ndigital', 72, 178, 550, 150, { size: 46, color: C.ink, bold: true });
    text(s, 'Una estrategia para que más familias encuentren el cuidado que necesitan', 72, 350, 500, 64, { size: 21, color: C.body });
    rect(s, 72, 468, 258, 44, C.purple, 'rounded-full');
    text(s, 'Google · SEO local · contenido', 92, 480, 220, 20, { size: 14, color: C.white, bold: true });
    text(s, 'Propuesta para Aeterna Care · 26 de octubre de 2026', 72, 622, 450, 24, { size: 14, color: '#81918D' });
    s.speakerNotes.text = 'Presentar dos alternativas para aumentar la visibilidad de Aeterna Care y facilitar que las familias consulten por sus servicios.';
  }

  // 2 executive summary
  {
    const s = presentation.slides.add(); s.background.fill = C.bg; title(s, 'Objetivo', 'Ayudar a más familias a encontrar y contactar Aeterna Care', 'La propuesta prioriza búsquedas de cuidado a domicilio y fortalece la confianza en la marca.');
    rect(s, 72, 230, 520, 330, C.ink, 'rounded-2xl');
    text(s, 'CAMINO RECOMENDADO', 110, 264, 260, 22, { size: 13, color: C.mint2, bold: true });
    text(s, 'Piloto de 90 días\ncon Google Search + SEO local', 110, 306, 420, 94, { size: 31, color: C.white, bold: true });
    text(s, 'Meta queda como apoyo orgánico y, más adelante, como retargeting o prueba controlada para servicios planificados.', 110, 428, 390, 84, { size: 18, color: '#D7E5E0' });
    rect(s, 642, 230, 566, 92, C.mint, 'rounded-xl');
    text(s, 'Por qué', 674, 252, 100, 24, { size: 18, color: C.ink, bold: true });
    text(s, 'Cuando una familia busca apoyo en su comuna, Google permite mostrar servicios relacionados con esa búsqueda.', 674, 282, 490, 42, { size: 15, color: C.body });
    bullet(s, 'Empezar por quienes ya están buscando', 'Campañas de búsqueda vinculadas a servicios y comunas donde Aeterna Care tiene cobertura.', 642, 356, 566, C.purple);
    bullet(s, 'Medir consultas y oportunidades', 'Cada mes se revisan los contactos recibidos y los servicios que generan más interés.', 642, 448, 566, C.gold);
    footer(s, 2);
    s.speakerNotes.text = 'Explicar el objetivo desde la perspectiva de la empresa: hacer más visible su oferta local y convertir esa visibilidad en consultas que pueda atender.';
  }

  // 3 channel comparison
  {
    const s = presentation.slides.add(); s.background.fill = C.white; title(s, 'Canales', 'Cada canal acompaña un momento distinto', 'Google ayuda a responder búsquedas activas. Las redes sociales ayudan a explicar el servicio y generar confianza.');
    line(s, 640, 220, 1, C.line, 300);
    text(s, 'GOOGLE SEARCH / MAPS', 92, 228, 420, 28, { size: 15, color: C.purple, bold: true });
    text(s, 'Google Search y Maps', 92, 272, 440, 48, { size: 30, color: C.ink, bold: true });
    bullet(s, 'Para consultas con necesidad concreta', 'Ejemplos: “cuidadora adulto mayor Providencia” o “enfermera a domicilio”.', 92, 350, 470, C.purple);
    bullet(s, 'Qué lo hace funcionar', 'Servicios y comunas bien definidos, una ficha local completa y respuesta oportuna.', 92, 448, 470, C.gold);
    text(s, 'META / INSTAGRAM', 700, 228, 420, 28, { size: 15, color: '#C77956', bold: true });
    text(s, 'Instagram y Facebook', 700, 272, 470, 48, { size: 30, color: C.ink, bold: true });
    bullet(s, 'Para explicar y generar confianza', 'Consejos para familias, presentación del equipo y orientación sobre los servicios.', 700, 350, 470, '#C77956');
    bullet(s, 'Cuándo sumar anuncios', 'Cuando haya contenido claro, capacidad de responder y una campaña con objetivo definido.', 700, 448, 470, C.gold);
    footer(s, 3, 'Fuentes: Google Ads Help · Meta for Business');
    s.speakerNotes.text = 'Fuentes:\nGoogle Ads Help: https://support.google.com/google-ads/answer/2567043?hl=es\nMeta for Business: https://www.facebook.com/business/ads/facebook-instagram-reels-ads\nLa recomendación depende del tipo de consulta que se quiera atraer y de la capacidad de atención disponible.';
  }

  // 4 current readiness
  {
    const s = presentation.slides.add(); s.background.fill = C.bg; title(s, 'Punto de partida', 'Aeterna Care ya cuenta con una base digital para crecer', 'El sitio organiza la oferta por servicios y comunas. La siguiente etapa conecta esa información con medición y captación.');
    text(s, 'LO QUE YA ESTÁ DISPONIBLE', 72, 220, 330, 24, { size: 14, color: C.purple, bold: true });
    bullet(s, 'Información local', 'Páginas dedicadas a servicios y comunas de atención.', 72, 262, 520, C.purple);
    bullet(s, 'Canales de contacto', 'WhatsApp y formulario para solicitar orientación o cotización.', 72, 354, 520, C.purple);
    bullet(s, 'Sitio preparado para buscadores', 'Sitemap, páginas indexables y datos del negocio en el sitio.', 72, 446, 520, C.purple);
    text(s, 'PRÓXIMOS PASOS', 672, 220, 360, 24, { size: 14, color: '#C77956', bold: true });
    price(s, '1', 'Conectar GA4, Search Console y Google Ads; medir clics y formularios', 672, 262, 480, 74, '#C77956');
    price(s, '2', 'Completar la ficha de Google Business Profile con zonas y horarios reales', 672, 354, 480, 74, '#C77956');
    price(s, '3', 'Definir servicios y comunas prioritarios según disponibilidad', 672, 446, 480, 74, '#C77956');
    text(s, 'Con esta base, Aeterna Care podrá revisar qué canal genera consultas y cuáles son relevantes para su operación.', 672, 552, 480, 52, { size: 16, color: C.ink, bold: true });
    footer(s, 4, 'Fuentes: Google Search Central · Google Analytics Help');
    s.speakerNotes.text = 'Fuentes:\nhttps://developers.google.com/search/docs/monitor-debug/search-console-start\nhttps://support.google.com/analytics/answer/9356034?hl=es\nhttps://support.google.com/business/answer/9157481?hl=es-419';
  }

  // 5 proposal one
  {
    const s = presentation.slides.add(); s.background.fill = C.white; title(s, 'Opción 1 · Recomendada', 'Atraer consultas desde Google', 'Campañas de búsqueda para servicios y comunas prioritarias, con medición para entender su rendimiento.');
    rect(s, 72, 232, 470, 326, C.ink, 'rounded-2xl');
    text(s, 'PILOTO 90 DÍAS', 108, 264, 240, 24, { size: 14, color: C.mint2, bold: true });
    text(s, 'Para familias que\nya están buscando apoyo', 108, 308, 390, 82, { size: 29, color: C.white, bold: true });
    text(s, 'Anuncios vinculados a páginas de servicio, comunas atendidas y contacto por WhatsApp.', 108, 428, 360, 66, { size: 17, color: '#D7E5E0' });
    text(s, 'Primer objetivo: identificar qué consultas son relevantes para Aeterna Care.', 108, 505, 380, 38, { size: 14, color: C.mint2, bold: true });
    text(s, 'Inversión', 606, 232, 200, 28, { size: 20, color: C.ink, bold: true });
    bullet(s, 'Puesta en marcha · $180.000 una vez', 'Configuración de medición, campaña, anuncios y segmentación inicial.', 606, 278, 560, C.purple);
    bullet(s, 'Gestión · $180.000 al mes', 'Una campaña de búsqueda, hasta 3 grupos de anuncios, ajustes semanales y reporte mensual.', 606, 374, 560, C.purple);
    bullet(s, 'Presupuesto de Google · $250.000 a $400.000 al mes', 'Aeterna Care paga este monto directamente a Google. Se acuerda un tope mensual.', 606, 470, 560, C.gold);
    footer(s, 5, 'Valores en pesos chilenos · inversión publicitaria aparte');
    s.speakerNotes.text = 'Google describe las campañas de búsqueda como anuncios para personas que están buscando activamente los servicios ofrecidos. Fuente: https://support.google.com/google-ads/answer/2567043?hl=es';
  }

  // 6 proposal two
  {
    const s = presentation.slides.add(); s.background.fill = C.bg; title(s, 'Opción 2 · Alternativa', 'Fortalecer contenido y presencia local', 'Una ruta gradual para informar a las familias y mejorar la visibilidad orgánica de los servicios.');
    rect(s, 72, 236, 350, 300, C.mint, 'rounded-2xl');
    text(s, 'CUÁNDO ELEGIR ESTA OPCIÓN', 108, 270, 250, 24, { size: 14, color: C.purple, bold: true });
    text(s, 'Si prefieren crecer\nde forma gradual y\ncon menor gasto en anuncios', 108, 316, 270, 112, { size: 25, color: C.ink, bold: true });
    text(s, 'Los resultados orgánicos se construyen con continuidad.', 108, 468, 260, 42, { size: 16, color: C.body });
    text(s, 'Plan mensual · $220.000', 492, 236, 500, 34, { size: 24, color: C.ink, bold: true });
    bullet(s, '2 artículos para el blog', 'Respuestas sobre servicios, turnos, precios referenciales y comunas atendidas.', 492, 294, 630, C.purple);
    bullet(s, 'Mejora de páginas locales', 'Enlaces entre páginas, títulos, preguntas frecuentes y textos de servicios prioritarios.', 492, 392, 630, C.purple);
    bullet(s, '8 publicaciones para redes', 'Calendario mensual con llamados a conocer los servicios y conversar por WhatsApp.', 492, 490, 630, C.gold);
    text(s, 'Los anuncios de Meta pueden sumarse después: gestión $120.000 al mes, más presupuesto publicitario desde $150.000 al mes.', 492, 592, 620, 34, { size: 14, color: C.body, italic: true });
    footer(s, 6, 'Valores en pesos chilenos · producción fotográfica no incluida');
    s.speakerNotes.text = 'Esta alternativa construye contenido y presencia local con una expectativa de crecimiento gradual. La gestión de anuncios de Meta queda como complemento opcional.';
  }

  // 7 pricing comparison
  {
    const s = presentation.slides.add(); s.background.fill = C.white; title(s, 'Inversión', 'Resumen de las alternativas', 'Cada opción combina un alcance mensual definido con una inversión separada en anuncios cuando corresponde.');
    text(s, 'CONCEPTO', 72, 226, 310, 24, { size: 13, color: C.body, bold: true });
    text(s, 'GOOGLE SEARCH', 430, 226, 300, 24, { size: 13, color: C.purple, bold: true });
    text(s, 'SEO + CONTENIDO', 810, 226, 300, 24, { size: 13, color: '#C77956', bold: true });
    line(s, 72, 258, 1136, C.line, 1);
    const rows = [
      ['Puesta en marcha', '$180.000 una vez', '$120.000 una vez'],
      ['Honorario mensual', '$180.000', '$220.000'],
      ['Publicidad mensual', '$250.000–$400.000', '$0 al inicio'],
      ['Enfoque', 'Consultas desde búsquedas activas', 'Contenido y visibilidad orgánica'],
      ['Meta Ads', 'Se evalúa después del piloto', 'Opcional: $120.000 + medios'],
      ['Total estimado primeros 90 días', '$1.470.000–$1.920.000, incluye Google', '$780.000, sin anuncios'],
    ];
    rows.forEach((r, i) => {
      const y = 274 + i * 54;
      if (i % 2 === 0) rect(s, 72, y - 4, 1136, 48, '#F7FAF8', 'none');
      text(s, r[0], 88, y + 6, 310, 34, { size: 14, color: C.ink, bold: true });
      text(s, r[1], 430, y + 6, 340, 34, { size: 14, color: C.body });
      text(s, r[2], 810, y + 6, 360, 34, { size: 14, color: C.body });
    });
    rect(s, 72, 612, 1136, 44, C.mint, 'rounded-lg');
    text(s, 'Los montos incluyen honorarios y medios del piloto. La inversión de anuncios se paga directamente a la plataforma.', 94, 625, 1080, 18, { size: 15, color: C.ink, bold: true });
    footer(s, 7, 'Montos en CLP · valores antes de impuestos, si corresponde');
    s.speakerNotes.text = 'Presentar ambos caminos y confirmar cuál se ajusta al presupuesto y capacidad de atención de Aeterna Care.';
  }

  // 8 90-day plan
  {
    const s = presentation.slides.add(); s.background.fill = C.bg; title(s, 'Primeros 90 días', 'Un plan gradual para revisar qué funciona', 'Aeterna Care recibirá un resumen mensual de consultas, rendimiento y próximos ajustes.');
    const cols = [
      { x: 72, k: 'DÍAS 1–15', h: 'Preparación', c: C.purple, b: 'Configurar medición, revisar ficha local, acordar comunas y publicar anuncios.' },
      { x: 430, k: 'DÍAS 16–45', h: 'Seguimiento', c: '#C77956', b: 'Revisar búsquedas, consultas recibidas y capacidad de respuesta por WhatsApp.' },
      { x: 788, k: 'DÍAS 46–90', h: 'Evaluación', c: C.gold, b: 'Ajustar campaña y decidir juntos si mantenerla, modificarla o sumar otro canal.' },
    ];
    cols.forEach((col) => {
      rect(s, col.x, 250, 310, 300, C.white, 'rounded-2xl', C.line, 1);
      rect(s, col.x, 250, 310, 10, col.c, 'rounded-2xl');
      text(s, col.k, col.x + 28, 286, 240, 24, { size: 14, color: col.c, bold: true });
      text(s, col.h, col.x + 28, 326, 240, 42, { size: 29, color: C.ink, bold: true });
      text(s, col.b, col.x + 28, 394, 248, 92, { size: 17, color: C.body });
      text(s, 'Resultado', col.x + 28, 506, 80, 20, { size: 13, color: C.ink, bold: true });
      text(s, col.h === 'Preparación' ? 'Campaña lista' : col.h === 'Seguimiento' ? 'Ajustes con datos' : 'Próximos pasos acordados', col.x + 88, 506, 190, 20, { size: 13, color: C.body });
    });
    footer(s, 8);
    s.speakerNotes.text = 'Explicar cómo se organizará el trabajo con Aeterna Care: preparación, seguimiento de consultas y evaluación conjunta.';
  }

  // 9 SEO and link building
  {
    const s = presentation.slides.add(); s.background.fill = C.white; title(s, 'Contenido y posicionamiento', 'Información útil para las familias también mejora la visibilidad', 'El blog responderá preguntas frecuentes y conectará cada tema con los servicios de Aeterna Care.');
    text(s, 'TEMAS PRIORITARIOS', 72, 226, 300, 24, { size: 14, color: C.purple, bold: true });
    bullet(s, 'Cuidadoras por comuna', '“Cuidadoras en Providencia”, “cuidados de adulto mayor en Maipú”, con información real de cobertura.', 72, 270, 540, C.purple);
    bullet(s, 'Cómo elegir apoyo', 'Diferencias entre cuidadora, TENS, enfermera y kinesiólogo a domicilio.', 72, 370, 540, C.purple);
    bullet(s, 'Costos y turnos', 'Qué influye en el precio, turnos diurnos/nocturnos, 12 y 24 horas, y cómo pedir una cotización.', 72, 470, 540, C.purple);
    text(s, 'PRESENCIA Y RECOMENDACIONES', 700, 226, 400, 24, { size: 14, color: '#C77956', bold: true });
    bullet(s, 'Ficha local completa', 'Mantener actualizados horarios, servicios, teléfono, zonas de atención y fotografías.', 700, 270, 470, '#C77956');
    bullet(s, 'Alianzas de la comunidad', 'Explorar vínculos con profesionales y organizaciones que atienden a personas mayores.', 700, 382, 470, '#C77956');
    bullet(s, 'Enlaces relevantes', 'Priorizar menciones reales en sitios confiables relacionados con la comunidad y el cuidado.', 700, 494, 470, C.gold);
    footer(s, 9, 'Fuente: Google Search Central · LocalBusiness y Search Console');
    s.speakerNotes.text = 'Fuentes:\nGoogle Search Central, LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business\nGoogle Search Console: https://developers.google.com/search/docs/monitor-debug/search-console-start\nGoogle Business Profile, service areas: https://support.google.com/business/answer/9157481?hl=es-419';
  }

  // 10 measurement and boundaries
  {
    const s = presentation.slides.add(); s.background.fill = C.bg; title(s, 'Seguimiento', 'Revisaremos consultas, inversión y capacidad de atención', 'Los resultados dependen también de disponibilidad, cobertura y rapidez para responder a las familias.');
    rect(s, 72, 236, 500, 306, C.ink, 'rounded-2xl');
    text(s, 'INDICADORES A REVISAR', 108, 270, 300, 24, { size: 14, color: C.mint2, bold: true });
    bullet(s, 'Consultas recibidas', 'Cantidad y canal por el que llegaron.', 108, 316, 410, C.mint2);
    bullet(s, 'Consultas relevantes', 'Servicio solicitado, comuna y disponibilidad.', 108, 408, 410, C.mint2);
    bullet(s, 'Costo y respuesta', 'Inversión asociada y tiempo de respuesta de Aeterna Care.', 108, 500, 410, C.mint2);
    text(s, 'EXPECTATIVAS REALISTAS', 660, 236, 300, 24, { size: 14, color: '#C77956', bold: true });
    bullet(s, 'El posicionamiento toma tiempo', 'Google no garantiza una ubicación específica ni una fecha de indexación.', 660, 282, 470, '#C77956');
    bullet(s, 'Los anuncios no garantizan clientes', 'El volumen depende de demanda, presupuesto y disponibilidad del servicio.', 660, 374, 470, '#C77956');
    bullet(s, 'Cada mes entrega aprendizajes', 'La campaña se ajusta según los contactos y resultados observados.', 660, 466, 470, '#C77956');
    footer(s, 10, 'Fuente: Google Search Central · Google Analytics Help');
    s.speakerNotes.text = 'Fuentes:\nhttps://support.google.com/analytics/answer/9356034?hl=es\nhttps://developers.google.com/search/docs/monitor-debug/search-console-start\nLas métricas combinan datos de plataforma con indicadores operativos de atención.';
  }

  // 11 next steps
  {
    const s = presentation.slides.add(); s.background.fill = C.ink;
    text(s, 'Propuesta para Aeterna Care', 72, 64, 400, 24, { size: 14, color: C.mint2, bold: true });
    text(s, 'Más familias pueden\nencontrar sus servicios', 72, 112, 660, 116, { size: 44, color: C.white, bold: true });
    text(s, 'Recomendamos comenzar con Google Search durante 90 días y revisar en conjunto las consultas, las comunas y los servicios que despiertan interés.', 72, 278, 620, 80, { size: 20, color: '#D7E5E0' });
    rect(s, 72, 430, 530, 86, C.purple, 'rounded-xl');
    text(s, 'Puesta en marcha $180.000 · Gestión $180.000/mes · Google aparte', 100, 451, 480, 42, { size: 18, color: C.white, bold: true });
    text(s, 'Para iniciar: escoger comunas prioritarias, confirmar servicios disponibles y acordar el presupuesto mensual.', 72, 590, 710, 44, { size: 16, color: C.mint2 });
    rect(s, 840, 100, 330, 390, C.mint, 'rounded-2xl');
    text(s, 'Prioridades', 878, 144, 240, 24, { size: 15, color: C.purple, bold: true });
    text(s, '1', 878, 190, 90, 88, { size: 70, color: C.ink, bold: true });
    text(s, 'Google Search\n+ medición', 970, 202, 150, 60, { size: 23, color: C.ink, bold: true });
    line(s, 878, 302, 250, C.mint2, 1);
    text(s, '2', 878, 334, 90, 88, { size: 70, color: C.ink, bold: true });
    text(s, 'Contenido\nque responde dudas', 970, 346, 160, 60, { size: 23, color: C.ink, bold: true });
    footer(s, 11);
    s.speakerNotes.text = 'Cierre: presentar la recomendación como un experimento comercial medible, no como una garantía de ventas.';
  }

  const pngDir = path.join(buildDir, 'renders'); await fs.mkdir(pngDir, { recursive: true });
  for (const [i, slide] of presentation.slides.items.entries()) {
    await writeBlob(path.join(pngDir, `slide-${String(i + 1).padStart(2, '0')}.png`), await presentation.export({ slide, format: 'png', scale: 1 }));
  }
  await writeBlob(path.join(buildDir, 'deck-montage.webp'), await presentation.export({ format: 'webp', montage: true }));
  const draft = path.join(buildDir, 'aeterna-plan-captacion-draft.pptx');
  const pptx = await PresentationFile.exportPptx(presentation); await pptx.save(draft);
  console.log(JSON.stringify({ draft, pngDir }, null, 2));
}
main().catch(err => { console.error(err); process.exitCode = 1; });
