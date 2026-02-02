import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { movements } from '../data/movements';
import { getFavorites } from '../utils/storage';
import Card from '../components/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SPACING, FONT_SIZES } from '../constants/theme';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const { t } = useLanguage();
  
  useEffect(() => {
    loadFavorites();
  }, []);
  
  const loadFavorites = async () => {
    const favIds = await getFavorites();
    setFavorites(favIds);
    setLoading(false);
  };
  
  const favoriteMovements = movements.filter(m => favorites.includes(m.id));
  
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  if (favoriteMovements.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.text.primary }]}>
          {t('noFavorites')}
        </Text>
        <Text style={[styles.emptyHint, { color: colors.text.secondary }]}>
          {t('noFavoritesHint')}
        </Text>
      </View>
    );
  }
  
  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={favoriteMovements}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card onPress={() => {}}>
          <Text style={[styles.name, { color: colors.text.primary }]}>
            {item.name}
          </Text>
          <Text style={[styles.korean, { color: colors.primary }]}>
            {item.koreanName}
          </Text>
          <Text style={[styles.description, { color: colors.text.secondary }]}>
            {item.description}
          </Text>
        </Card>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  emptyHint: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
  list: {
    padding: SPACING.lg,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  korean: {
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.sm,
  },
});