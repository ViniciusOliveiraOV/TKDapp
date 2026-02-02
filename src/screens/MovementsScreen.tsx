import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { movements } from '../data/movements';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { getDifficultyColor, searchMovements, translateDifficulty } from '../utils/helpers';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SPACING, FONT_SIZES } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Movimentos'>;

export default function MovementsScreen({ route, navigation }: Props) {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();
  const { t } = useLanguage();

  const filteredMovements = useMemo(() => {
    let filtered = movements.filter((m) => m.category === category);
    
    if (searchQuery.trim()) {
      filtered = filtered.filter((m) =>
        searchMovements(searchQuery, m.name, m.koreanName)
      );
    }
    
    return filtered;
  }, [category, searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('search')}
      />
      
      {filteredMovements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            {searchQuery ? t('noMovementsFound') : t('noMovementsInCategory')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMovements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate('Detalhes', { movementId: item.id })}>
              <View style={styles.cardHeader}>
                <Text style={[styles.movementName, { color: colors.text.primary }]}>
                  {item.name}
                </Text>
                <Badge
                  text={t(translateDifficulty(item.difficulty))}
                  color={getDifficultyColor(item.difficulty)}
                />
              </View>
              <Text style={[styles.koreanName, { color: colors.text.secondary }]}>
                {item.koreanName}
              </Text>
              <Text style={[styles.belt, { color: colors.text.light }]}>
                {item.belt}
              </Text>
            </Card>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  movementName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    flex: 1,
    marginRight: SPACING.sm,
  },
  koreanName: {
    fontSize: FONT_SIZES.md,
    fontStyle: 'italic',
    marginBottom: SPACING.xs,
  },
  belt: {
    fontSize: FONT_SIZES.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
  },
});
