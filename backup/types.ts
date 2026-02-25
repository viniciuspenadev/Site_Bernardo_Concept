export type ProjectStatus = 'Lançamento' | 'Em Obras' | 'Pronto para Morar';

export type ConstructionStage = 'Fundação' | 'Estrutura' | 'Acabamento' | 'Entrega';

export interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  price: string; // Still useful for internal sorting/reference
  financingCondition?: string; // The conversion hook (e.g., "Entrada + R$ 900")
  tags?: string[]; // E.g. ['MCMV', 'Alto Padrão']
  status: ProjectStatus;
  image: string;
  constructionProgress: number; // 0 to 100
  currentStage?: ConstructionStage;
  specs: {
    area: number; // m2
    bedrooms: number;
    parking: number;
    suites: number;
  };
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: 'Shield' | 'Leaf' | 'Clock' | 'Award';
}