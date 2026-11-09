import type { Movement, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Chutes',
    icon: '🦵',
    description: 'Técnicas de chutes do Taekwondo',
  },
  {
    id: '2',
    name: 'Bloqueios',
    icon: '🛡️',
    description: 'Técnicas de defesa e bloqueio',
  },
  {
    id: '3',
    name: 'Posturas',
    icon: '🧍',
    description: 'Posições fundamentais',
  },
  {
    id: '4',
    name: 'Socos',
    icon: '👊',
    description: 'Técnicas de soco',
  },
  {
    id: '5',
    name: 'Defesas',
    icon: '🙌',
    description: 'Movimentos defensivos',
  },
];

export const movements: Movement[] = [
  // Chutes
  {
    id: '1',
    name: 'Chute Frontal',
    koreanName: 'Ap Chagi',
    category: 'Chutes',
    description: 'Chute básico executado com a parte frontal do pé, empurrando o alvo para frente.',
    difficulty: 'Iniciante',
    tips: [
      'Mantenha o equilíbrio na perna de apoio',
      'Eleve o joelho antes de estender a perna',
      'Atinja o alvo com a bola do pé',
    ],
    videos: ['2N9ftiNzKck', '746mc032TCs', '6Jn_OrIFAJg'],
  },
  {
    id: '2',
    name: 'Chute Giratório',
    koreanName: 'Dollyo Chagi',
    category: 'Chutes',
    description: 'Chute circular executado girando o quadril, atingindo o alvo com o peito do pé.',
    difficulty: 'Intermediário',
    tips: [
      'Gire o quadril completamente',
      'Mantenha as mãos em guarda',
      'Pivote na perna de apoio',
    ],
    videos: ['PkQTB7oHITY'],
  },
  {
    id: '3',
    name: 'Chute Lateral',
    koreanName: 'Yop Chagi',
    category: 'Chutes',
    description: 'Chute executado lateralmente, atingindo o alvo com a borda externa do pé.',
    difficulty: 'Intermediário',
    tips: [
      'Corpo perpendicular ao alvo',
      'Joelho levantado antes da extensão',
      'Use o calcanhar ou a borda do pé',
    ],
    videos: ['M825zz7gxN0'],
  },
  {
    id: '4',
    name: 'Chute Descendente',
    koreanName: 'Naeryo Chagi',
    category: 'Chutes',
    description: 'Chute executado de cima para baixo, golpeando o alvo com o calcanhar.',
    difficulty: 'Avançado',
    tips: [
      'Levante a perna o mais alto possível',
      'Mantenha a perna estendida',
      'Golpeie com força descendente',
    ],
    videos: ['fXQFSpgl0Qc', 'jmXlOI85nTQ'],
  },
  {
    id: '5',
    name: 'Chute em Gancho',
    koreanName: 'Huryeo Chagi',
    category: 'Chutes',
    description: 'Chute giratório que atinge o alvo em um movimento circular amplo.',
    difficulty: 'Avançado',
    tips: [
      'Movimento fluido e contínuo',
      'Gire 360 graus',
      'Mantenha o olhar no alvo',
    ],
    videos: ['TqC0tUw5cpA', 'LSBRU0Qj8p8'],
  },

  // Bloqueios
  {
    id: '6',
    name: 'Bloqueio Alto',
    koreanName: 'Eolgul Makgi',
    category: 'Bloqueios',
    description: 'Bloqueio executado acima da cabeça para defender ataques superiores.',
    difficulty: 'Iniciante',
    tips: [
      'Antebraço paralelo à testa',
      'Movimento ascendente forte',
      'Proteja a cabeça',
    ],
    videos: ['aGwsE_Ajyw0'],
  },
  {
    id: '7',
    name: 'Bloqueio Médio Externo',
    koreanName: 'Momtong Bakat Makgi',
    category: 'Bloqueios',
    description: 'Bloqueio na altura do tronco, movendo o braço de dentro para fora.',
    difficulty: 'Iniciante',
    tips: [
      'Braço na altura do ombro',
      'Movimento lateral forte',
      'Proteja o tronco',
    ],
    videos: ['a8M3Ii-wSB4'],
  },
  {
    id: '8',
    name: 'Bloqueio Baixo',
    koreanName: 'Arae Makgi',
    category: 'Bloqueios',
    description: 'Bloqueio executado na direção descendente para defender ataques baixos.',
    difficulty: 'Iniciante',
    tips: [
      'Antebraço horizontal na altura do abdômen',
      'Movimento descendente forte',
      'Proteja a região inferior',
    ],
    videos: ['BNCR5Y2kXFs'],
  },

  // Posturas
  {
    id: '9',
    name: 'Postura de Caminhada',
    koreanName: 'Ap Seogi',
    category: 'Posturas',
    description: 'Postura básica com pés na largura dos ombros, um pé à frente.',
    difficulty: 'Iniciante',
    tips: [
      'Pés paralelos',
      'Peso distribuído igualmente',
      'Joelhos levemente flexionados',
    ],
    videos: ['I5b3pcvOGm0'],
  },
  {
    id: '10',
    name: 'Postura do Cavaleiro',
    koreanName: 'Juchum Seogi',
    category: 'Posturas',
    description: 'Postura larga e baixa com pés afastados e joelhos flexionados.',
    difficulty: 'Iniciante',
    tips: [
      'Pés duas vezes a largura dos ombros',
      'Joelhos flexionados a 90 graus',
      'Costas retas',
    ],
    videos: ['MzbPxmQ_x-w'],
  },
  {
    id: '11',
    name: 'Postura Frontal Longa',
    koreanName: 'Ap Kubi',
    category: 'Posturas',
    description: 'Postura com perna dianteira flexionada e traseira estendida.',
    difficulty: 'Intermediário',
    tips: [
      '70% do peso na perna dianteira',
      'Joelho dianteiro sobre o tornozelo',
      'Perna traseira estendida',
    ],
    videos: ['wiM959FiQwY'],
  },

  // Socos
  {
    id: '12',
    name: 'Soco Reto',
    koreanName: 'Jireugi',
    category: 'Socos',
    description: 'Soco básico executado em linha reta com rotação do punho.',
    difficulty: 'Iniciante',
    tips: [
      'Rotação do quadril',
      'Punho fechado firmemente',
      'Cotovelo próximo ao corpo',
    ],
    videos: ['aQRgKBQ2_e8'],
  },
  {
    id: '13',
    name: 'Soco Lateral',
    koreanName: 'Yeop Jireugi',
    category: 'Socos',
    description: 'Soco executado lateralmente com rotação do tronco.',
    difficulty: 'Intermediário',
    tips: [
      'Gire o tronco completamente',
      'Punho na altura do peitoral',
      'Mantenha a guarda alta',
    ],
    videos: ['irauOTsqLAg'],
  },

  // Defesas
  {
    id: '14',
    name: 'Defesa com a Faca da Mão',
    koreanName: 'Sonnal Makgi',
    category: 'Defesas',
    description: 'Defesa executada com a lateral da mão aberta.',
    difficulty: 'Intermediário',
    tips: [
      'Mão aberta e tensa',
      'Movimento circular',
      'Impacto com a lateral da mão',
    ],
    videos: ['Jp_HVYlcHO0'],
  },
  {
    id: '15',
    name: 'Defesa em X',
    koreanName: 'Otkoreo Makgi',
    category: 'Defesas',
    description: 'Defesa com os braços cruzados formando um X.',
    difficulty: 'Avançado',
    tips: [
      'Braços cruzados firmemente',
      'Boa amplitude de cobertura',
      'Reação rápida',
    ],
    videos: ['lQqjyzSNg-I'],
  },
];
