export interface Movement {
  id: string;
  name: string;
  koreanName: string;
  category: MovementCategory;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  belt: string;
  tips?: string[];
  videos: string[]; // Array of YouTube video IDs
}

export type MovementCategory = 
  | 'Chutes'
  | 'Bloqueios'
  | 'Posturas'
  | 'Socos'
  | 'Defesas';

export interface Category {
  id: string;
  name: MovementCategory;
  icon: string;
  description: string;
}
