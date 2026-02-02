import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { movements } from '../data/movements';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { getDifficultyColor, searchMovements } from '../utils/helpers';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Movimentos'>;

export default function MovementsScreen({ route, navigation }: Props) {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

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
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar movimento..."
      />
      
      {filteredMovements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'Nenhum movimento encontrado' : 'Nenhum movimento nesta categoria'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMovements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate('Detalhes', { movementId: item.id })}>
              <View style={styles.cardHeader}>
                <Text style={styles.movementName}>{item.name}</Text>
                <Badge
                  text={item.difficulty}
                  color={getDifficultyColor(item.difficulty)}
                />
              </View>
              <Text style={styles.koreanName}>{item.koreanName}</Text>
              <Text style={styles.belt}>{item.belt}</Text>
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
    backgroundColor: COLORS.background,
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
    color: COLORS.text.primary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  koreanName: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontStyle: 'italic',
    marginBottom: SPACING.xs,
  },
  belt: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.light,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});
