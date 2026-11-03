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

/** Publica una conversión para que Google Tag Manager la distribuya. */
export function registrarConversion(origen: string, detalle?: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: 'generar_contacto', origen, ...detalle });
}
