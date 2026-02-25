export type ProjectCategory = 'Cozinhas' | 'Dormitórios' | 'Living' | 'Corporativo';

export interface Project {
  id: number;
  title: string;
  location: string;
  description: string;
  price?: string; // Optional if we don't want to show aggressive pricing
  tags?: string[];
  category: ProjectCategory;
  image: string;
  specs: {
    style: string;
    executionTime: string;
    materials: string;
  };
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: 'Shield' | 'Leaf' | 'Clock' | 'Award';
}