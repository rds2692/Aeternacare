import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio definitivo del sitio.
// Afecta a canonical, sitemap, Open Graph y JSON-LD.
export default defineConfig({
  site: 'https://www.aeternacare.cl',
  integrations: [
    sitemap({
      // Las páginas de confirmación no se indexan ni se anuncian en el sitemap.
      filter: (pagina) => !pagina.includes('/gracias/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
