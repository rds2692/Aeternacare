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

/**
 * Registra que el formulario validó y preparó un mensaje para WhatsApp.
 * No confirma que la persona lo haya enviado ni que exista un lead.
 */
export function registrarContactoWhatsAppPreparado(origen: string): void {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'contacto_whatsapp_preparado',
    origen,
    canal: 'whatsapp',
    etapa: 'mensaje_preparado',
  });
}
