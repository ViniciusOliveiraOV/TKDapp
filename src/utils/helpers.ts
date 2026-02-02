import { COLORS } from '../constants/theme';

export const translateCategoryName = (categoryName: string): string => {
  const mapping: Record<string, string> = {
    'Chutes': 'kicks',
    'Bloqueios': 'blocks',
    'Posturas': 'stances',
    'Socos': 'punches',
    'Defesas': 'defenses',
  };
  return mapping[categoryName] || categoryName.toLowerCase();
};

export const translateCategoryDescription = (categoryName: string): string => {
  const mapping: Record<string, string> = {
    'Chutes': 'kicksDesc',
    'Bloqueios': 'blocksDesc',
    'Posturas': 'stancesDesc',
    'Socos': 'punchesDesc',
    'Defesas': 'defensesDesc',
  };
  return mapping[categoryName] || categoryName;
};

export const translateDifficulty = (difficulty: string): string => {
  switch (difficulty) {
    case 'Iniciante':
      return 'beginner';
    case 'Intermediário':
      return 'intermediate';
    case 'Avançado':
      return 'advanced';
    default:
      return difficulty.toLowerCase();
  }
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Iniciante':
      return COLORS.difficulty.beginner;
    case 'Intermediário':
      return COLORS.difficulty.intermediate;
    case 'Avançado':
      return COLORS.difficulty.advanced;
    default:
      return COLORS.text.light;
  }
};

export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const searchMovements = (
  searchQuery: string,
  movementName: string,
  koreanName: string
): boolean => {
  const normalized = normalizeText(searchQuery);
  return (
    normalizeText(movementName).includes(normalized) ||
    normalizeText(koreanName).includes(normalized)
  );
};
