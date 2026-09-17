import { media } from './media';

// Ordem do carrossel definida pelo cliente: fachada, portões e pele de vidro.
export const heroSlides = [
  {
    ...media.facade, eyebrow: 'Vidros & esquadrias', title: 'Portas e janelas que conectam espaços.',
    description: 'Janelas, portas, guarda-corpos e soluções em vidro que conectam os espaços e valorizam a arquitetura.',
    cta: 'Conheça nossas soluções', href: '#servicos',
  },
  {
    ...media.gate, eyebrow: 'Portões & fachadas', title: 'Portões de alumínio, ACM e aço galvanizado.',
    description: 'Portões de alumínio, ACM e aço galvanizado. Diferentes soluções para compor a entrada do seu imóvel.',
    cta: 'Conheça os portões', href: '#servicos',
  },
  {
    ...media.glassBuilding, eyebrow: 'Bernardo Tecnoglass · Pele de vidro', title: 'Vidros e esquadrias na Grande São Paulo.',
    description: 'Pele de vidro, portas e janelas, portões, box para banheiro e envidraçamento de sacadas com a Bernardo Tecnoglass.',
    cta: 'Explore nossas soluções', href: '#servicos',
  },
];
export const highlights = [
  { title: 'Esquadrias', label: 'Portas e janelas', icon: 'window' },
  { title: 'Portões', label: 'Alumínio, ACM e aço', icon: 'gate' },
  { title: 'Vidros', label: 'Proteção e integração', icon: 'layers' },
  { title: 'Sacadas', label: 'Vidro e acústica', icon: 'building' },
] as const;
export const features = [
  { title: 'Da entrada aos ambientes internos', description: 'Portões, portas, janelas, divisões de ambientes e box para banheiro.', icon: 'window' },
  { title: 'Vidro na arquitetura', description: 'Guarda-corpos, coberturas e pele de vidro para diferentes aplicações.', icon: 'layers' },
  { title: 'Um olhar para as sacadas', description: 'Envidraçamento, manutenção de sacadas e soluções para sacadas e janelas acústicas.', icon: 'building' },
] as const;

// Lista completa fornecida pelo cliente; não inferir materiais da foto do portão.
export const serviceGroups = [
  {
    id: 'esquadrias', number: '01', title: 'Esquadrias, portas e janelas', icon: 'window',
    description: 'Janelas e janelas integradas, portas de correr e portas de alumínio e ACM para compor as aberturas do seu projeto.',
    items: ['Janelas e janelas integradas', 'Portas de alumínio e ACM', 'Portas de correr'],
    whatsappMessage: 'Olá! Vim pelo site e gostaria de um orçamento de esquadrias, portas e janelas.',
    ctaLabel: 'Orçamento de esquadrias',
  },
  {
    id: 'portoes', number: '02', title: 'Portões de alumínio, ACM e aço', icon: 'gate',
    description: 'A Bernardo Tecnoglass trabalha com portões de alumínio e ACM, além de portões de ferro em aço galvanizado.',
    items: ['Portões de alumínio e ACM', 'Portões de ferro (aço galvanizado)'],
    whatsappMessage: 'Olá! Vim pelo site e gostaria de um orçamento de portão em alumínio, ACM ou aço galvanizado.',
    ctaLabel: 'Orçamento de portões',
  },
  {
    id: 'vidros', number: '03', title: 'Pele de vidro, box e coberturas', icon: 'layers',
    description: 'Soluções em vidro para fachadas, banheiros e áreas externas: pele de vidro, box para banheiro, guarda-corpos, coberturas e divisões de ambientes.',
    items: ['Guarda-corpo', 'Coberturas', 'Divisão de ambientes', 'Box para banheiro', 'Pele de vidro'],
    whatsappMessage: 'Olá! Vim pelo site e gostaria de um orçamento em vidro: pele de vidro, box, guarda-corpo ou cobertura.',
    ctaLabel: 'Orçamento em vidro',
  },
  {
    id: 'sacadas', number: '04', title: 'Envidraçamento e manutenção de sacadas', icon: 'building',
    description: 'Envidraçamento e manutenção de sacadas, além de soluções para sacadas e janelas acústicas.',
    items: ['Envidraçamento de sacadas', 'Manutenção de sacadas', 'Sacadas e janelas acústicas'],
    whatsappMessage: 'Olá! Vim pelo site e gostaria de um orçamento de envidraçamento ou manutenção de sacada.',
    ctaLabel: 'Orçamento de sacadas',
  },
] as const;


// Mensagem do botão de WhatsApp no hero (data-servico="hero").
export const heroWhatsappMessage = 'Olá! Vim pelo site e gostaria de um orçamento de vidros e esquadrias.';
