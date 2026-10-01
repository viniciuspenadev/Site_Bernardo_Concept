import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { quoteDetails, quoteMessage } from '../src/scripts/quote-message.ts';

// Uso: node scripts/verify-sacadas.mjs [dist] [https://dominio-oficial]
const directory = process.argv[2] || 'dist';
const base = process.argv[3];
const path = '/envidracamento-de-sacadas/';
const html = readFileSync(join(directory, 'envidracamento-de-sacadas', 'index.html'), 'utf8');
const home = readFileSync(join(directory, 'index.html'), 'utf8');
const sitemap = readFileSync(join(directory, 'sitemap.xml'), 'utf8');
const decode = text => text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const visibleText = decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '));

// Título, descrição e H1 com serviço + região: o que o anúncio e a busca prometem.
const h1 = html.match(/<h1\b[\s\S]*?<\/h1>/g) || [];
assert.equal(h1.length, 1, 'A página deve conter um único H1');
assert.equal(decode(h1[0].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim(), 'Envidraçamento de sacadas na Grande São Paulo.');
assert.match(html, /<title>Envidraçamento de Sacadas na Grande São Paulo \| Bernardo Tecnoglass<\/title>/);
assert.match(html, /<meta name="description" content="Envidraçamento e manutenção de sacadas na Grande São Paulo\./);

// JSON-LD: empresa (do Layout) + serviço + FAQ idêntico ao visível.
const nodes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap(match => JSON.parse(match[1])['@graph'] ?? []);
const service = nodes.find(node => node['@type'] === 'Service');
assert.equal(service?.name, 'Envidraçamento de sacadas');
assert.equal(service.areaServed.name, 'Grande São Paulo');
assert.ok(nodes.some(node => node['@type'] === 'LocalBusiness'), 'Grafo da empresa presente');
const faq = nodes.find(node => node['@type'] === 'FAQPage');
const questions = [...html.matchAll(/<details[^>]*data-faq-item[^>]*>\s*<summary>([^<]+)</g)].map(match => decode(match[1]).trim());
assert.ok(questions.length >= 6, 'Dúvidas visíveis na página');
assert.deepEqual(faq.mainEntity.map(item => item.name), questions, 'FAQPage deve repetir as perguntas visíveis');
assert.ok(!nodes.some(node => node.aggregateRating || node.review), 'Não incluir avaliações inventadas');

// Conversão: todo link de WhatsApp identifica o ponto de contato; flutuante desligado.
const whatsappTags = [...html.matchAll(/<a\b[^>]*href="https:\/\/wa\.me\/5511918770752[^"]*"[^>]*>/g)].map(match => match[0]);
assert.ok(whatsappTags.length >= 10, `Links de WhatsApp: ${whatsappTags.length}`);
for (const tag of whatsappTags) assert.match(tag, /data-servico="[a-z-]+"/, `Link sem data-servico: ${tag.slice(0, 120)}`);
assert.ok(!html.includes('class="wa-float"'), 'Botão flutuante substituído pela barra fixa');
assert.ok(html.includes('data-sticky-trigger') && html.includes('data-sticky-stop'), 'Gatilhos da barra fixa');
assert.match(html, /<option value="Envidraçamento de sacada" selected>/, 'Formulário com o serviço já marcado');
assert.ok(html.includes('id="form-orcamento"'), 'Formulário de orçamento presente');

// Portfólio: um cartão por arquivo da pasta de obras, cada um com alt e versão grande na build.
// As cópias do carrossel infinito são criadas no navegador e não aparecem no HTML estático.
const pastaObras = join('src', 'assets', 'tecnoglass', 'sacadas', 'obras');
const arquivosObras = readdirSync(pastaObras).filter(nome => /\.(jpe?g|png|webp)$/i.test(nome));
const obras = [...html.matchAll(/<a\b[^>]*class="lp-obra-card"[^>]*>[\s\S]*?<\/a>/g)].map(match => match[0]);
assert.equal(obras.length, arquivosObras.length, `Obras na página (${obras.length}) ≠ fotos na pasta (${arquivosObras.length})`);
for (const obra of obras) {
  const grande = obra.match(/href="([^"]+)"/)?.[1];
  assert.ok(grande && existsSync(join(directory, grande)), `Foto grande ausente na build: ${grande}`);
  assert.match(obra, /<img[^>]*alt="[^"]{10,}"/, 'Toda foto de obra precisa de alt descritivo');
  assert.match(obra, /data-whatsapp="https:\/\/wa\.me\/5511918770752\?text=[^"]+"/, 'Toda obra leva a mensagem própria do WhatsApp');
}
assert.ok(html.includes('data-lightbox'), 'Galeria ampliada presente');
assert.ok(html.includes('data-carrossel') && html.includes('data-carrossel-anterior') && html.includes('data-carrossel-proxima'), 'Carrossel contínuo com as setas das pontas');
assert.equal((html.match(/<div\b[^>]*\sdata-carrossel-slide\b[^>]*>/g) || []).length, arquivosObras.length, 'Um cartão do carrossel por obra');
assert.ok(home.includes('data-carrossel-slide') && /data-filtros="sacadas"/.test(home), 'Carrossel da home com as obras de sacada');
assert.ok(html.includes('data-servico="sacadas-obras"') && html.includes('data-servico="sacadas-obra"'), 'CTAs do portfólio rastreados');

// Demonstração: vídeo e poster existem na build.
const film = html.match(/data-src="([^"]+\.mp4)"/)?.[1];
const poster = html.match(/poster="([^"]+)"/)?.[1];
assert.ok(film && existsSync(join(directory, film)), 'Vídeo da demonstração');
assert.ok(poster && existsSync(join(directory, poster)), 'Poster da demonstração');

// Conteúdo: nada de preço, garantia ou números não confirmados; nada de dado vazado.
assert.ok(!/R\$\s?\d/.test(visibleText), 'Sem preço publicado');
assert.ok(!/garantia de \d|\d+\s*anos? de garantia/i.test(visibleText), 'Sem garantia não confirmada');
assert.ok(!/\d+\s*(obras|clientes|sacadas|instalações)\s+(entregues|atendid|realizad)/i.test(visibleText), 'Sem números de obras');
assert.ok(!/undefined|\[object Object\]|NaN/.test(visibleText), 'Sem valores vazados no HTML');

// Mensagem do orçamento guiado.
const answers = { pedido: 'gostaria de um orçamento de envidraçamento de sacada', rotulo: 'Largura aproximada', detalhe: 'De 3 a 5 m', local: '  Santo André ' };
assert.equal(quoteMessage(answers), 'Olá! Vim pela página de sacadas e gostaria de um orçamento de envidraçamento de sacada.\n• Largura aproximada: De 3 a 5 m\n• Local: Santo André');
assert.ok(quoteMessage({ ...answers, local: ' ' }).endsWith('• Local: Não informado'));
assert.equal(quoteDetails(answers), 'Orçamento guiado:\nLargura aproximada: De 3 a 5 m\nLocal: Santo André');

// Integração com a home: links para a página nova.
assert.ok(home.includes(`href="${path}"`), 'A home deve linkar a página de sacadas');

// Indexação: segue a mesma regra do resto do site (seo.ts).
if (base) {
  assert.ok(html.includes(`rel="canonical" href="${base}${path}"`));
  assert.ok(sitemap.includes(`<loc>${base}${path}</loc>`), 'Sitemap com a página de sacadas');
  assert.equal(service.url, `${base}${path}`);
  assert.match(html, /content="index, follow, max-image-preview:large"/);
} else {
  assert.match(html, /content="noindex, follow"/);
  assert.ok(!sitemap.includes('<loc>'));
}

console.log(`Sacadas validada: ${base ? 'publicação simulada' : 'prévia'}, H1, metadados, ${obras.length} obras no portfólio, ${questions.length} dúvidas no FAQPage, ${whatsappTags.length} links de WhatsApp rastreados, formulário, demonstração e links da home.`);
