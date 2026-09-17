import type { ImageMetadata } from 'astro';
import type { serviceGroups } from './content';
import doors from '../assets/tecnoglass/portfolio/portas-premium-v1.png';
import gate from '../assets/tecnoglass/hero/portao-mobile-v1.png';
import glass from '../assets/tecnoglass/hero/pele-vidro-mobile-v1.png';
import balcony from '../assets/tecnoglass/portfolio/sacada-premium-v1.png';

// As mesmas imagens de alta qualidade já aprovadas no hero e no portfólio.
// TROCA POR FOTOS REAIS: substituir o arquivo importado por uma foto de obra entregue
// e atualizar o `alt`.
// Associação por serviço para não depender da ordem das seções.
export const servicePhotos = {
  esquadrias: {
    src: doors,
    alt: 'Portas de correr com esquadrias pretas integrando sala e jardim',
    position: '50% 50%',
  },
  portoes: {
    src: gate,
    alt: 'Portão residencial preto com estrutura metálica e fechamento em tela',
    position: '50% 70%',
  },
  vidros: {
    src: glass,
    alt: 'Fachada comercial com pele de vidro refletindo o céu',
    position: '55% 65%',
  },
  sacadas: {
    src: balcony,
    alt: 'Envidraçamento de sacada com painéis recolhidos na lateral e vista arborizada',
    position: '55% 45%',
  },
} satisfies Record<(typeof serviceGroups)[number]['id'], {
  src: ImageMetadata;
  alt: string;
  position: string;
}>;
