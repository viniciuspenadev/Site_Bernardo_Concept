import type { ImageMetadata } from 'astro';

// Portfólio da página de sacadas: fotos reais de obras entregues, recebidas em 01/10/2026.
// Algumas foram tiradas no dia da instalação, ainda com os adesivos nos vidros.
//
// PARA INCLUIR UMA OBRA: salve a foto em src/assets/tecnoglass/sacadas/obras/ e acrescente
// a legenda abaixo, na posição desejada: o carrossel segue esta ordem. Foto sem legenda entra
// no fim com um texto genérico, para nada sumir por engano. A primeira etiqueta de cada obra
// aparece no cartão; as etiquetas também definem em quais filtros ela entra.
//
// As legendas descrevem só o que aparece na foto: sem endereço, bairro ou nome de prédio,
// que não foram informados.

export interface ObraSacada {
  /** Nome do arquivo sem extensão. Vai para o GA4 quando a foto é aberta. */
  slug: string;
  src: ImageMetadata;
  titulo: string;
  texto: string;
  tags: string[];
  alt: string;
  /** object-position do recorte vertical (3:4) do cartão. A galeria mostra a foto inteira. */
  posicao: string;
  /** false = só na página de sacadas (ex.: outro ângulo de uma obra que já aparece na home). */
  home?: boolean;
}

type Legenda = Omit<ObraSacada, 'src' | 'slug'> & { arquivo: string };

const legendas: Legenda[] = [
  {
    arquivo: 'sacada-gourmet-perfil-preto.jpg',
    titulo: 'Sacada gourmet com perfis pretos',
    texto: 'Folhas de vidro do piso ao teto, com trava, entre a bancada e a pia.',
    tags: ['Perfil preto', 'Sacada gourmet'],
    alt: 'Sacada envidraçada com perfis pretos, bancada à esquerda e pia à direita, com vista para prédios e árvores',
    posicao: '50% 50%',
  },
  {
    arquivo: 'sacada-em-l-bandeira-fixa.jpg',
    titulo: 'Sacada em L com bandeira fixa',
    texto: 'Duas faces envidraçadas e uma faixa de vidro fixo no alto, em perfis pretos.',
    tags: ['Perfil preto', 'Em L', 'Bandeira fixa'],
    alt: 'Sacada de canto envidraçada nas duas faces, com faixa superior de vidro fixo em perfis pretos e vista para a cidade',
    posicao: '40% 50%',
  },
  {
    arquivo: 'sacada-em-l-guarda-corpo-preto.jpg',
    titulo: 'Em L, junto ao guarda-corpo',
    texto: 'O vidro acompanha o guarda-corpo preto do prédio nas duas faces da sacada.',
    tags: ['Perfil preto', 'Em L'],
    alt: 'Sacada com guarda-corpo preto de barras verticais e envidraçamento nas duas faces, mesa redonda em primeiro plano',
    posicao: '62% 50%',
  },
  {
    arquivo: 'fechamento-terraco.jpg',
    titulo: 'Ambiente fechado para o terraço',
    texto: 'Folhas de vidro separam o ambiente interno do terraço descoberto.',
    tags: ['Perfil escuro', 'Terraço'],
    alt: 'Ambiente interno com fechamento em folhas de vidro e perfil escuro, voltado para um terraço descoberto',
    posicao: '50% 50%',
  },
  {
    arquivo: 'varanda-gourmet-vao-amplo.jpg',
    titulo: 'Vão de ponta a ponta',
    texto: 'Fechamento contínuo numa varanda gourmet integrada à sala.',
    tags: ['Perfil preto', 'Vão amplo'],
    alt: 'Varanda gourmet integrada à sala, com envidraçamento contínuo em perfis pretos e vista panorâmica de prédios',
    posicao: '50% 50%',
  },
  {
    arquivo: 'sacada-perfil-branco.jpg',
    titulo: 'Perfis brancos e vista para o verde',
    texto: 'Acabamento branco, no mesmo tom do guarda-corpo do prédio.',
    tags: ['Perfil branco'],
    alt: 'Sacada envidraçada com perfis e guarda-corpo brancos, pia à esquerda e vista para árvores e prédios',
    posicao: '50% 50%',
  },
  {
    arquivo: 'sacada-perfil-branco-lateral.jpg',
    titulo: 'O mesmo projeto, visto de lado',
    texto: 'As folhas acompanham o guarda-corpo por toda a extensão da sacada.',
    tags: ['Perfil branco'],
    alt: 'Vista lateral de sacada envidraçada com perfis brancos acompanhando o guarda-corpo',
    posicao: '50% 50%',
    // O título depende da foto anterior, que nem sempre está ao lado no carrossel da home.
    home: false,
  },
];

const arquivos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/tecnoglass/sacadas/obras/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
const porNome = new Map(Object.entries(arquivos).map(([caminho, modulo]) => [caminho.split('/').pop()!, modulo.default]));
const semExtensao = (arquivo: string) => arquivo.replace(/\.[^.]+$/, '');

// Legenda apontando para arquivo que não existe é erro de digitação: melhor parar a build
// do que publicar a página sem a foto.
const faltando = legendas.filter(legenda => !porNome.has(legenda.arquivo)).map(legenda => legenda.arquivo);
if (faltando.length) {
  throw new Error(`Legenda sem foto em src/assets/tecnoglass/sacadas/obras/: ${faltando.join(', ')}`);
}

const comLegenda: ObraSacada[] = legendas.map(({ arquivo, ...legenda }) => ({
  ...legenda, slug: semExtensao(arquivo), src: porNome.get(arquivo)!,
}));

const semLegenda: ObraSacada[] = [...porNome]
  .filter(([arquivo]) => !legendas.some(legenda => legenda.arquivo === arquivo))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([arquivo, src]) => ({
    slug: semExtensao(arquivo),
    src,
    titulo: 'Sacada envidraçada',
    texto: 'Obra entregue pela Bernardo Tecnoglass.',
    tags: [],
    alt: 'Sacada envidraçada pela Bernardo Tecnoglass',
    posicao: '50% 50%',
  }));

export const sacadasObras: ObraSacada[] = [...comLegenda, ...semLegenda];

/**
 * Abas de filtro do carrossel. Uma obra entra no filtro quando tem uma das etiquetas.
 * Filtro sem nenhuma obra não aparece.
 */
export const filtrosObras = [
  { id: 'perfil-preto', rotulo: 'Perfil preto', etiquetas: ['Perfil preto'] },
  { id: 'perfil-branco', rotulo: 'Perfil branco', etiquetas: ['Perfil branco'] },
  { id: 'em-l', rotulo: 'Em L e de canto', etiquetas: ['Em L', 'De canto', 'Três faces'] },
];

export const filtrosDaObra = (obra: ObraSacada) =>
  filtrosObras.filter(filtro => filtro.etiquetas.some(etiqueta => obra.tags.includes(etiqueta))).map(filtro => filtro.id);

/** Mensagem do WhatsApp quando o visitante pede um orçamento a partir de uma obra. */
export const mensagemObra = (titulo: string) =>
  `Olá! Vim pela página de sacadas, vi a obra “${titulo}” e gostaria de um orçamento parecido.`;
