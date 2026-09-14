import type { APIRoute } from 'astro';
import { seo } from '../data/seo';

export const GET: APIRoute = () => new Response(
  `User-agent: *\nAllow: /\n${seo.indexable ? `\nSitemap: ${seo.baseUrl}/sitemap.xml\n` : ''}`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
