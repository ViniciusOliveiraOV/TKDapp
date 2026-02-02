import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { categories } from '../data/movements';
import Card from '../components/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translateCategoryName, translateCategoryDescription } from '../utils/helpers';
import { SPACING, FONT_SIZES } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Categorias'>;

export default function CategoriesScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {t('appTitle')}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
        {t('selectCategory')}
      </Text>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Movimentos', { category: item.name })}>
            <View style={styles.cardRow}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
                  {t(translateCategoryName(item.name))}
                </Text>
                <Text style={[styles.cardDescription, { color: colors.text.secondary }]}>
                  {t(translateCategoryDescription(item.name))}
                </Text>
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
    paddingTop: 60,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginBottom: SPACING.xl,
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
  },
  cardDescription: {
    fontSize: FONT_SIZES.sm,
  },
});
