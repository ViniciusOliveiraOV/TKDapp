import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { categories } from '../data/movements';
import Card from '../components/Card';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Categorias'>;

export default function CategoriesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Movimentos</Text>
      <Text style={styles.subtitle}>Selecione uma categoria</Text>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Movimentos', { category: item.name })}>
            <View style={styles.cardRow}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    color: COLORS.text.secondary,
  },
  list: {
    padding: SPACING.lg,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    marginRight: SPACING.lg,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
    color: COLORS.text.primary,
  },
  cardDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
});
