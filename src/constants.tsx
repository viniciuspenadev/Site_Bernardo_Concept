import { Project, Feature } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Cozinha Linear Element',
    location: 'Residência Alphaville',
    description: 'Design limpo com portas em vidro e perfis metálicos, oferecendo um espaço moderno e ultra funcional.',
    category: 'Cozinhas',
    image: '/assets/photos/Cozinha.webp',
    specs: {
      style: 'Minimalista',
      executionTime: '45 dias',
      materials: 'Vidro e Alumínio'
    }
  },
  {
    id: 2,
    title: 'Cozinha Ilha Central',
    location: 'Casa Fazenda Boa Vista',
    description: 'Integração perfeita com a área social. Bancada estendida e marcenaria inteligente para ocultar eletrodomésticos.',
    category: 'Cozinhas',
    image: '/assets/photos/Cozinha-2.webp',
    specs: {
      style: 'Contemporâneo',
      executionTime: '55 dias',
      materials: 'Laca e Dekton'
    }
  },
  {
    id: 3,
    title: 'Living Integrado Essence',
    location: 'Apartamento Jardins',
    description: 'Painéis madeirados que aquecem o ambiente social, criando um espaço de convivência acolhedor e luxuoso.',
    category: 'Living',
    image: '/assets/photos/sala-estar.webp',
    specs: {
      style: 'Acolhedor',
      executionTime: '30 dias',
      materials: 'Lâmina Natural'
    }
  },
  {
    id: 4,
    title: 'Closet Master Open',
    location: 'Cobertura Vila Nova',
    description: 'Exposição elegante com guarda-roupas aberto, iluminação embutida em LED e acabamentos em tons sóbrios.',
    category: 'Dormitórios',
    image: '/assets/photos/Closet-quarto.webp',
    specs: {
      style: 'Sofisticado',
      executionTime: '40 dias',
      materials: 'MDF Nogueira'
    }
  },
  {
    id: 5,
    title: 'Suíte Comfort',
    location: 'Alto de Pinheiros',
    description: 'Cabeceira estofada contínua integrada aos criados-mudos flutuantes, trazendo paz e relaxamento ao dormitório.',
    category: 'Dormitórios',
    image: '/assets/photos/Quarto.webp',
    specs: {
      style: 'Clássico Moderno',
      executionTime: '35 dias',
      materials: 'Tecido e Laca'
    }
  },
  {
    id: 6,
    title: 'Quarto Jovem Urban',
    location: 'Studio Itaim Bibi',
    description: 'Soluções dinâmicas de armários mesclando nichos abertos com portas de correr panorâmicas.',
    category: 'Dormitórios',
    image: '/assets/photos/quarto-2.webp',
    specs: {
      style: 'Industrial / Smart',
      executionTime: '25 dias',
      materials: 'MDF Titânio'
    }
  },
  {
    id: 7,
    title: 'Suíte Guest Minimal',
    location: 'Residencial Campinas',
    description: 'Linhas puras e marcenaria minimalista com toque contemporâneo. Foco no conforto absoluto sem excessos.',
    category: 'Dormitórios',
    image: '/assets/photos/quarto-3.webp',
    specs: {
      style: 'Minimalista',
      executionTime: '30 dias',
      materials: 'Laca Branca'
    }
  }
];

export const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Acabamento Artesanal',
    description: 'Materiais de alta qualidade selecionados a dedo e parceiros renomados.',
    icon: 'Shield'
  },
  {
    id: 2,
    title: 'Sustentabilidade Real',
    description: 'Uso inteligente de materiais duráveis e processos otimizados para um impacto reduzido.',
    icon: 'Leaf'
  },
  {
    id: 3,
    title: 'Pontualidade',
    description: 'Cronograma rigoroso e transparência total via app.',
    icon: 'Clock'
  }
];