import { site } from './site';
import { serviceGroups } from './content';

// Configure o domínio oficial e a liberação de indexação no build de publicação.
const configuredUrl = import.meta.env.PUBLIC_SITE_URL?.trim();
let baseUrl: string | undefined;
if (configuredUrl) {
  const parsed = new URL(configuredUrl);
  if (parsed.protocol !== 'https:' || parsed.hostname === 'localhost' || /^[\d.]+$/.test(parsed.hostname) || parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error('PUBLIC_SITE_URL deve ser a origem HTTPS do domínio oficial, sem caminho ou credenciais.');
  }
  baseUrl = parsed.origin;
}
const indexRequested = import.meta.env.PUBLIC_ALLOW_INDEXING === 'true';
if (indexRequested && !baseUrl) throw new Error('Configure PUBLIC_SITE_URL antes de liberar a indexação.');

export const seo = {
  baseUrl,
  indexable: indexRequested && Boolean(baseUrl),
  robots: indexRequested && baseUrl ? 'index, follow, max-image-preview:large' : 'noindex, follow',
};

// Apenas serviços confirmados e presentes no HTML; sem avaliações ou endereço fictícios.
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      ...(baseUrl ? { '@id': `${baseUrl}/#organization`, url: `${baseUrl}/` } : {}),
      name: site.name,
      description: site.description,
      areaServed: { '@type': 'AdministrativeArea', name: site.serviceArea },
      ...(site.email ? { email: site.email } : {}),
      ...(site.whatsapp ? { telephone: `+${site.whatsapp.replace(/\D/g, '')}` } : {}),
      ...(site.socialLinks.length ? { sameAs: site.socialLinks.map(link => link.href) } : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços da Bernardo Tecnoglass',
        itemListElement: serviceGroups.flatMap(group => group.items.map(name => ({
          '@type': 'Offer', itemOffered: { '@type': 'Service', name, areaServed: { '@type': 'AdministrativeArea', name: site.serviceArea } },
        }))),
      },
    },
    ...(baseUrl ? [{ '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: `${baseUrl}/`, name: site.name, inLanguage: 'pt-BR', publisher: { '@id': `${baseUrl}/#organization` } }] : []),
  ],
};

