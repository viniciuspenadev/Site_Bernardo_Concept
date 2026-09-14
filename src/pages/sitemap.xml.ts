import type { APIRoute } from 'astro';
import { seo } from '../data/seo';

// A home é a única página pública atual. Acrescentar novas URLs ao criar páginas de serviços.
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${seo.indexable ? `<url><loc>${seo.baseUrl}/</loc></url>` : ''}</urlset>`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
