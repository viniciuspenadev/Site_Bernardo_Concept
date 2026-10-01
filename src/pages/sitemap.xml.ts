import type { APIRoute } from 'astro';
import { seo } from '../data/seo';
import { sacadasPath } from '../data/sacadas';

// Páginas públicas indexáveis. Acrescentar aqui cada nova página de serviço.
const paginas = ['/', sacadasPath];

export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${seo.indexable ? paginas.map(pagina => `<url><loc>${seo.baseUrl}${pagina}</loc></url>`).join('') : ''}</urlset>`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
