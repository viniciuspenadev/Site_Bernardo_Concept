import type { ImageMetadata } from 'astro';
import { media } from './media';
import { sacadasObras } from './sacadas-obras';
import doors from '../assets/tecnoglass/portfolio/portas-premium-v1.png';
import railing from '../assets/tecnoglass/portfolio/guarda-corpo-premium-v1.png';
import canopy from '../assets/tecnoglass/portfolio/cobertura-premium-v1.png';
import showerWood from '../assets/tecnoglass/portfolio/box-madeira-v1.png';
import showerNeutral from '../assets/tecnoglass/portfolio/box-neutro-v1.png';
import showerPremium from '../assets/tecnoglass/portfolio/box-premium-v1.png';
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: ImageMetadata;
  alt: string;
  /** object-position do recorte vertical do cartão. Padrão: centro. */
  position?: string;
}
// TROCA POR FOTOS REAIS: substituir o arquivo importado por uma foto de obra entregue
// e atualizar o `alt`. Os cartões permanecem sem atribuição de localização,
// prazo ou material que não tenha sido informado pelo cliente.
const projetosBase: Project[] = [
  {
    id: 7, title: 'Pele de vidro para fachadas', category: 'Pele de vidro',
    description: 'Pele de vidro para uma arquitetura marcada pela luz e pela transparência.',
    image: media.glassBuilding.src, alt: media.glassBuilding.alt,
  },
  {
    id: 8, title: 'Box de vidro com perfis pretos', category: 'Box para banheiro',
    description: 'Box com perfis pretos em um banheiro de tons acolhedores e acabamento amadeirado.',
    image: showerWood, alt: 'Box de vidro com ferragens pretas e revestimento amadeirado ao fundo',
  },
  {
    id: 9, title: 'Box de vidro em tons neutros', category: 'Box para banheiro',
    description: 'Vidro transparente e estrutura preta em uma composição de tons neutros.',
    image: showerNeutral, alt: 'Box transparente com estrutura preta, revestimento bege e nichos laterais',
  },
  {
    id: 10, title: 'Box de vidro para banheiros contemporâneos', category: 'Box para banheiro',
    description: 'Box em vidro com perfis escuros e iluminação acolhedora.',
    image: showerPremium, alt: 'box de vidro em banheiro com nicho iluminado e bancada de madeira',
  },
  {
    id: 3, title: 'Portas de correr para sala e jardim', category: 'Vidros e esquadrias',
    description: 'Portas de correr em uma composição que aproxima o living e o jardim.',
    image: doors, alt: 'portas de correr com perfis pretos entre sala e jardim',
  },
  {
    id: 4, title: 'Guarda-corpo de vidro para varanda', category: 'Vidros e esquadrias',
    description: 'Guarda-corpo em vidro para uma arquitetura de linhas leves e vistas abertas.',
    image: railing, alt: 'guarda-corpo de vidro em varanda contemporânea',
  },
  {
    id: 6, title: 'Cobertura de vidro para área externa', category: 'Vidros e esquadrias',
    description: 'Cobertura de vidro em uma área externa acolhedora e cheia de luz natural.',
    image: canopy, alt: 'cobertura de vidro com estrutura escura sobre um terraço',
  },
  {
    id: 1, title: 'Esquadrias e guarda-corpo de vidro', category: 'Vidros e esquadrias',
    description: 'Guarda-corpo em vidro, janelas integradas e portas de correr em uma fachada residencial.',
    image: media.facade.src, alt: media.facade.alt,
  },
  {
    id: 2, title: 'Portão residencial de estrutura metálica', category: 'Portões',
    description: 'Linhas retas e acabamento escuro na composição de um portão residencial.',
    image: media.gate.heroMobile, alt: media.gate.alt,
  },
];

// Sacadas: as fotos reais da página de sacadas (src/data/sacadas-obras.ts), na mesma ordem.
// Substituem o antigo cartão de sacada, que era imagem gerada. O limite mantém o carrossel
// equilibrado entre os produtos mesmo quando chegarem mais fotos de sacada.
const SACADAS_NA_HOME = 6;
const sacadas: Project[] = sacadasObras
  .filter(obra => obra.home !== false)
  .slice(0, SACADAS_NA_HOME)
  .map((obra, index) => ({
    id: 100 + index, title: obra.titulo, category: 'Sacadas', description: obra.texto,
    image: obra.src, alt: obra.alt, position: obra.posicao,
  }));

/**
 * Intercala as categorias para o carrossel não mostrar o mesmo produto em sequência.
 * Cada categoria é espalhada por igual ao longo da lista; depois, um ajuste troca o que
 * ainda ficar repetido, inclusive entre o último e o primeiro (o carrossel dá a volta).
 * A ordem dentro de cada categoria é preservada.
 */
function mesclarPorCategoria<T extends { category: string }>(lista: T[]): T[] {
  const grupos = new Map<string, T[]>();
  for (const item of lista) {
    const grupo = grupos.get(item.category);
    if (grupo) grupo.push(item);
    else grupos.set(item.category, [item]);
  }
  const total = lista.length;
  const ordenados = [...grupos.values()].sort((a, b) => b.length - a.length);
  const sequencia = ordenados
    .flatMap((grupo, g) => grupo.map((item, i) => ({ item, posicao: (i + (g + 1) / (ordenados.length + 1)) * total / grupo.length })))
    .sort((a, b) => a.posicao - b.posicao)
    .map(({ item }) => item);

  const repete = (a: number, b: number) => sequencia[a].category === sequencia[b].category;
  for (let tentativa = 0; tentativa < total; tentativa++) {
    const i = sequencia.findIndex((_, indice) => repete(indice, (indice + 1) % total));
    if (i < 0) break;
    const alvo = (i + 1) % total;
    for (let distancia = 1; distancia < total; distancia++) {
      const k = (alvo + distancia) % total;
      if (k === i) continue;
      [sequencia[alvo], sequencia[k]] = [sequencia[k], sequencia[alvo]];
      const vizinhos = [alvo, k].flatMap(p => [[(p - 1 + total) % total, p], [p, (p + 1) % total]]);
      if (vizinhos.every(([a, b]) => !repete(a, b))) break;
      [sequencia[alvo], sequencia[k]] = [sequencia[k], sequencia[alvo]];
    }
  }
  return sequencia;
}

export const projects: Project[] = mesclarPorCategoria([...projetosBase, ...sacadas]);
export const categories = ['Todos', 'Vidros e esquadrias', 'Sacadas', 'Portões', 'Pele de vidro', 'Box para banheiro'];

/** Identificador da categoria para os filtros do carrossel: "Box para banheiro" → "box-para-banheiro". */
export const categoriaId = (nome: string) =>
  nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
