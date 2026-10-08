/**
 * Medición del sitio (Google Analytics 4, Meta Pixel y Google Ads).
 *
 * Reglas:
 * - Sin IDs configurados no se carga ningún script de terceros.
 * - Los scripts solo se cargan después de que la persona acepta.
 * - El evento `generar_contacto` se usa como conversión en los tres sistemas.
 */

export interface ConfiguracionMedicion {
  ga4: string;
  metaPixel: string;
  googleAds: string;
}

export function hayMedicion(medicion: ConfiguracionMedicion): boolean {
  return Boolean(medicion.ga4 || medicion.metaPixel || medicion.googleAds);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function inyectarScript(src: string, async = true): void {
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
}

export function iniciarMedicion(medicion: ConfiguracionMedicion): void {
  const idsGoogle = [medicion.ga4, medicion.googleAds].filter(Boolean);

  if (idsGoogle.length > 0) {
    inyectarScript(`https://www.googletagmanager.com/gtag/js?id=${idsGoogle[0]}`);
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    idsGoogle.forEach((id) => window.gtag!('config', id));
  }

  if (medicion.metaPixel) {
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq?.('init', medicion.metaPixel);
    window.fbq?.('track', 'PageView');
  }
}

/** Envía el evento de conversión a todos los sistemas activos. */
export function registrarConversion(origen: string, detalle?: Record<string, unknown>): void {
  window.gtag?.('event', 'generar_contacto', { origen, ...detalle });
  window.fbq?.('track', 'Lead', { origen, ...detalle });
}
