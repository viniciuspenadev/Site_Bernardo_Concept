import facade from '../assets/tecnoglass/fachada-vidro-esquadrias.jpeg';
import gate from '../assets/tecnoglass/portao-residencial.jpeg';
import facadeDesktop from '../assets/tecnoglass/hero/fachada-desktop-v1.png';
import facadeMobile from '../assets/tecnoglass/hero/fachada-mobile-v1.png';
import gateDesktop from '../assets/tecnoglass/hero/portao-desktop-v1.png';
import gateMobile from '../assets/tecnoglass/hero/portao-mobile-v1.png';
import glassDesktop from '../assets/tecnoglass/hero/pele-vidro-desktop-v1.png';
import glassMobile from '../assets/tecnoglass/hero/pele-vidro-mobile-v1.png';

// `src` preserva as fotos originais; o cartão do portão usa a edição vertical.
// `heroDesktop` / `heroMobile` usam as edições generativas solicitadas para o hero.
// Astro produz versões menores em WebP; os prompts estão em docs/HERO-IMAGENS.md.
export const media = {
  glassBuilding: {
    src: glassMobile,
    heroDesktop: glassDesktop,
    heroMobile: glassMobile,
    alt: 'Imagem ilustrativa de edifício comercial com fachada inteiramente revestida por pele de vidro',
    illustrative: true,
    label: 'Pele de vidro',
  },
  facade: {
    src: facade,
    heroDesktop: facadeDesktop,
    heroMobile: facadeMobile,
    alt: 'Fachada residencial com guarda-corpo de vidro, janelas integradas e portas de correr com perfis pretos',
    position: '50% 58%',
    label: 'Vidros e esquadrias',
  },
  gate: {
    src: gate,
    heroDesktop: gateDesktop,
    heroMobile: gateMobile,
    alt: 'Portão residencial preto com estrutura metálica e painéis em tela, em frente a uma casa',
    position: '50% 62%',
    label: 'Portões',
  },
};
