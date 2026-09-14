import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const directory = process.argv[2] || 'dist';
const base = process.argv[3];
const html = readFileSync(join(directory, 'index.html'), 'utf8');
const robots = readFileSync(join(directory, 'robots.txt'), 'utf8');
const sitemap = readFileSync(join(directory, 'sitemap.xml'), 'utf8');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'A página deve conter um único H1');
assert.match(html, /<h1[^>]*>Vidros e esquadrias na Grande São Paulo\.<\/h1>/);
assert.match(html, /<title>Esquadrias e Vidros na Grande São Paulo \| Bernardo Tecnoglass<\/title>/);
const json = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
assert.ok(json, 'JSON-LD presente no HTML estático');
const graph = JSON.parse(json[1])['@graph'];
const organization = graph.find(item => item['@type'] === 'Organization');
assert.equal(organization.name, 'Bernardo Tecnoglass');
assert.equal(organization.areaServed.name, 'Grande São Paulo');
assert.equal(organization.hasOfferCatalog.itemListElement.length, 13);
assert.equal(organization.aggregateRating, undefined, 'Não incluir avaliações inventadas');
assert.match(robots, /Allow: \//);
if (base) {
  assert.ok(html.includes(`rel="canonical" href="${base}/"`));
  assert.match(html, /content="index, follow, max-image-preview:large"/);
  assert.ok(robots.includes(`Sitemap: ${base}/sitemap.xml`));
  assert.ok(sitemap.includes(`<loc>${base}/</loc>`));
  assert.equal(graph.find(item => item['@type'] === 'WebSite').url, `${base}/`);
} else {
  assert.match(html, /content="noindex, follow"/);
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!robots.includes('Sitemap:'));
  assert.ok(!sitemap.includes('<loc>'));
}
console.log(`SEO validado: ${base ? 'publicação simulada' : 'prévia'}, H1, metadados, 13 serviços, JSON-LD, robots e sitemap.`);
