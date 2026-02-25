import { Project, Feature } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Residencial Trinova',
    location: 'Bairro Jardins',
    description: 'Um novo conceito de moradia que une sofisticação e conforto. Vista panorâmica definitiva.',
    price: 'R$ 850.000',
    financingCondition: 'Entrada Facilitada em 36x',
    tags: ['Alto Padrão', 'Vista Panorâmica'],
    status: 'Em Obras',
    constructionProgress: 65,
    currentStage: 'Acabamento',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop',
    specs: {
      area: 125,
      bedrooms: 3,
      suites: 1,
      parking: 2
    }
  },
  {
    id: 2,
    title: 'Edifício Blue Tower',
    location: 'Centro Histórico',
    description: 'Studios modernos e inteligentes no coração da cidade. Ideal para investimento ou primeira moradia.',
    price: 'R$ 420.000',
    financingCondition: 'Parc. a partir de R$ 990/mês',
    tags: ['Minha Casa Minha Vida', 'Investimento'],
    status: 'Pronto para Morar',
    constructionProgress: 100,
    currentStage: 'Entrega',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
    specs: {
      area: 45,
      bedrooms: 1,
      suites: 1,
      parking: 1
    }
  },
  {
    id: 3,
    title: 'Villas do Parque',
    location: 'Zona Sul',
    description: 'Condomínio de casas com segurança 24h e lazer completo para sua família.',
    price: 'R$ 1.200.000',
    financingCondition: 'Consulte condições especiais',
    tags: ['Condomínio Fechado'],
    status: 'Lançamento',
    constructionProgress: 0,
    currentStage: 'Fundação',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    specs: {
      area: 210,
      bedrooms: 4,
      suites: 2,
      parking: 3
    }
  },
  {
    id: 4,
    title: 'Grand Palace',
    location: 'Bela Vista',
    description: 'Alto padrão com acabamento premium. Varanda gourmet integrada.',
    price: 'R$ 980.000',
    financingCondition: 'Fluxo direto com a construtora',
    tags: ['Varanda Gourmet'],
    status: 'Em Obras',
    constructionProgress: 30,
    currentStage: 'Estrutura',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    specs: {
      area: 156,
      bedrooms: 3,
      suites: 3,
      parking: 3
    }
  },
  {
    id: 5,
    title: 'Eco Life Garden',
    location: 'Vila Madalena',
    description: 'Sustentabilidade e tecnologia. Painéis solares e reuso de água. Financiamento facilitado.',
    price: 'R$ 750.000',
    financingCondition: 'Use seu FGTS na entrada',
    tags: ['Minha Casa Minha Vida', 'Sustentável'],
    status: 'Lançamento',
    constructionProgress: 5,
    currentStage: 'Fundação',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    specs: {
      area: 98,
      bedrooms: 2,
      suites: 1,
      parking: 1
    }
  },
  {
    id: 6,
    title: 'Business Center Norte',
    location: 'Zona Norte',
    description: 'Salas comerciais flexíveis próximas ao metrô. O endereço do seu sucesso.',
    price: 'R$ 380.000',
    financingCondition: 'Entrada + 120 meses',
    tags: ['Comercial'],
    status: 'Pronto para Morar',
    constructionProgress: 100,
    currentStage: 'Entrega',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    specs: {
      area: 42,
      bedrooms: 0,
      suites: 0,
      parking: 1
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
    description: 'Certificação internacional de eficiência energética e menor impacto.',
    icon: 'Leaf'
  },
  {
    id: 3,
    title: 'Pontualidade',
    description: 'Cronograma rigoroso e transparência total via app.',
    icon: 'Clock'
  },
  {
    id: 4,
    title: 'Legado Sólido',
    description: '15 anos redefinindo o skyline da cidade com projetos icônicos.',
    icon: 'Award'
  }
];