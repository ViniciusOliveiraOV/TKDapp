import { useColorScheme } from 'react-native';

export const COLORS_LIGHT = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  secondary: '#FF9800',
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#1a1a1a',
  text: {
    primary: '#1a1a1a',
    secondary: '#666',
    light: '#999',
  },
  difficulty: {
    beginner: '#4CAF50',
    intermediate: '#FF9800',
    advanced: '#F44336',
  },
  border: '#e0e0e0',
  shadow: '#000',
  favorite: '#FFD700',
};

export const COLORS_DARK = {
  primary: '#64B5F6',
  primaryDark: '#1565C0',
  secondary: '#FFB74D',
  background: '#121212',
  white: '#1E1E1E',
  black: '#FFFFFF',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    light: '#666',
  },
  difficulty: {
    beginner: '#66BB6A',
    intermediate: '#FFB74D',
    advanced: '#EF5350',
  },
  border: '#333',
  shadow: '#000',
  favorite: '#FFD700',
};

// Export default COLORS (light mode) for backwards compatibility
export const COLORS = COLORS_LIGHT;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const useThemeColors = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
};
