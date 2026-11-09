import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { movements } from '../data/movements';
import { useAccount } from '../contexts/AccountContext';
import Card from '../components/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SPACING, FONT_SIZES } from '../constants/theme';

export default function FavoritesScreen({ navigation }: BottomTabScreenProps<MainTabParamList, 'Favoritos'>) {
  const { favorites, configured } = useAccount();
  const { colors } = useTheme();
  const { t } = useLanguage();
  
  const favoriteMovements = movements.filter(m => favorites.includes(m.id));

  if (!configured) return <View style={[styles.empty, { backgroundColor: colors.background }]}><Text>Entre na escola para salvar favoritos no seu perfil.</Text></View>;
  
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
        <Card onPress={() => navigation.getParent<NativeStackNavigationProp<RootStackParamList>>()?.navigate('Detalhes', { movementId: item.id })}>
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
