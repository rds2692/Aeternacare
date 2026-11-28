/**
 * Eventos del sitio para Google Tag Manager.
 *
 * Reglas:
 * Las etiquetas de GA4, Google Ads y Meta se administran exclusivamente dentro
 * de Google Tag Manager. Este módulo solo publica eventos en dataLayer.
 */

export interface ConfiguracionMedicion {
  ga4: string;
  metaPixel: string;
  googleAds: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function emitirEvento(evento: string, detalle: Record<string, string>): void {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: evento, ...detalle });
}

/** Primer foco o cambio en el formulario; indica intención de cotizar. */
export function registrarInicioCotizacion(origen: string, servicio = ''): void {
  emitirEvento('cotizacion_iniciada', {
    origen,
    servicio,
    etapa: 'formulario_iniciado',
  });
}

/**
 * El formulario fue validado y preparó una solicitud para WhatsApp.
 * No confirma que el mensaje se haya enviado ni que la cotización se haya recibido.
 */
export function registrarSolicitudCotizacionPreparada(origen: string, servicio = ''): void {
  emitirEvento('cotizacion_preparada', {
    origen,
    servicio,
    canal: 'whatsapp',
    etapa: 'solicitud_preparada',
  });
}
