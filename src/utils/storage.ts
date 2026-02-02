import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@tkdapp:favorites';

export const getFavorites = async (): Promise<string[]> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavorites = async (favorites: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const toggleFavorite = async (movementId: string): Promise<string[]> => {
  try {
    const favorites = await getFavorites();
    const index = favorites.indexOf(movementId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(movementId);
    }
    
    await saveFavorites(favorites);
    return favorites;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return [];
  }
};
