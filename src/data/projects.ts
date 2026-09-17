import type { ImageMetadata } from 'astro';
import { media } from './media';
import doors from '../assets/tecnoglass/portfolio/portas-premium-v1.png';
import railing from '../assets/tecnoglass/portfolio/guarda-corpo-premium-v1.png';
import balcony from '../assets/tecnoglass/portfolio/sacada-premium-v1.png';
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
}
// TROCA POR FOTOS REAIS: substituir o arquivo importado por uma foto de obra entregue
// e atualizar o `alt`. Os cartões permanecem sem atribuição de localização,
// prazo ou material que não tenha sido informado pelo cliente.
export const projects: Project[] = [
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
    id: 5, title: 'Envidraçamento de sacadas', category: 'Vidros e esquadrias',
    description: 'Envidraçamento que valoriza a vista e a integração da sacada.',
    image: balcony, alt: 'sacada envidraçada com painéis de vidro e vista arborizada',
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
export const categories = ['Todos', 'Vidros e esquadrias', 'Portões', 'Pele de vidro', 'Box para banheiro'];

