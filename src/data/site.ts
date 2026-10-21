/**
 * Datos de la empresa.
 *
 * Regla del proyecto: NADA inventado. Cada valor vacío se muestra en el sitio
 * con una etiqueta ámbar [COMPLETAR: …] mientras `AVISO_PENDIENTES` sea true.
 * Antes de publicar: completar los campos, apagar el aviso y revisar
 * docs/01-datos-por-completar.md.
 */

/** Muestra en el sitio las etiquetas ámbar de datos faltantes. Poner en false antes de publicar. */
export const AVISO_PENDIENTES = true;

export const site = {
  nombre: 'Aeterna Care',
  nombreLegal: '', // PENDIENTE: razón social
  rut: '', // PENDIENTE
  dominio: 'https://www.aeternacare.cl', // PENDIENTE: confirmar dominio definitivo

  telefonoVisible: '+56 9 3206 1549',
  telefonoE164: '+56932061549',
  telefonoEsWhatsApp: true, // Confirmar que es una cuenta de WhatsApp Business
  /** Formato internacional, sin +, espacios ni guiones. */
  whatsapp: '56932061549',
  // El correo de contacto no se guarda aquí: vive ofuscado en src/data/correo.ts
  // para que no aparezca como texto plano en el HTML ni en el JavaScript.

  direccion: '', // PENDIENTE
  comuna: 'Santiago',
  region: 'Región Metropolitana',
  pais: 'CL',
  horario: '', // PENDIENTE

  areaServida: [
    'Santiago Centro',
    'Providencia',
    'Las Condes',
    'Vitacura',
    'La Reina',
    'Ñuñoa',
    'Peñalolén',
    'Maipú',
  ], // PENDIENTE: confirmar cobertura real

  redes: {
    instagram: '', // PENDIENTE
    facebook: '', // PENDIENTE
    linkedin: '', // PENDIENTE
  },

  /** Medición. Vacío = no se carga ningún script de terceros. */
  medicion: {
    ga4: '', // PENDIENTE: G-XXXXXXX
    metaPixel: '', // PENDIENTE
    googleAds: '', // PENDIENTE
  },

};

export const whatsappMensaje =
  'Hola, quisiera recibir orientación sobre los servicios de cuidado para un adulto mayor.';

/** Enlace de WhatsApp con mensaje predefinido. */
export function whatsappLink(mensaje: string = whatsappMensaje): string {
  if (!site.whatsapp || !/^\d{8,15}$/.test(site.whatsapp)) {
    throw new Error(
      'Falta el número de WhatsApp en src/data/site.ts (formato internacional, sin + ni espacios).',
    );
  }
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace tel: listo para usar en cualquier botón de llamada. */
export const telLink = `tel:${site.telefonoE164}`;

export const navPrincipal = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#valores', label: 'Valores' },
  { href: '/#cobertura', label: 'Cobertura' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contacto/', label: 'Contacto' },
];

/** Deliberadamente fuera del menú del cliente: solo en el pie. */
export const navLegal = [
  { href: '/privacidad/', label: 'Aviso de privacidad' },
  { href: '/terminos/', label: 'Términos y condiciones' },
];
