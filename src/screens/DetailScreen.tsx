import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { movements } from '../data/movements';
import Badge from '../components/Badge';
import VideoPlayer from '../components/VideoPlayer';
import { getDifficultyColor } from '../utils/helpers';
import { getFavorites, toggleFavorite } from '../utils/storage';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetailScreen({ route }: Props) {
  const { movementId } = route.params;
  const movement = movements.find((m) => m.id === movementId);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadFavoriteStatus();
  }, []);

  const loadFavoriteStatus = async () => {
    const favorites = await getFavorites();
    setIsFavorite(favorites.includes(movementId));
  };

  const handleToggleFavorite = async () => {
    const updatedFavorites = await toggleFavorite(movementId);
    setIsFavorite(updatedFavorites.includes(movementId));
  };

  if (!movement) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Movimento não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movement.name}</Text>
            <Text style={styles.koreanName}>{movement.koreanName}</Text>
          </View>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <VideoPlayer videos={movement.videos} />

      <View style={styles.section}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Categoria</Text>
            <Text style={styles.infoValue}>{movement.category}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Faixa</Text>
            <Text style={styles.infoValue}>{movement.belt}</Text>
          </View>
        </View>

        <Badge
          text={`Dificuldade: ${movement.difficulty}`}
          color={getDifficultyColor(movement.difficulty)}
          style={styles.difficultyBadge}
          textStyle={styles.difficultyText}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{movement.description}</Text>
      </View>

      {movement.tips && movement.tips.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas</Text>
          {movement.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  koreanName: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.text.secondary,
    fontStyle: 'italic',
  },
  favoriteButton: {
    padding: SPACING.sm,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    marginTop: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  difficultyBadge: {
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: FONT_SIZES.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.sm,
  },
  tipBullet: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    marginRight: SPACING.sm,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    flex: 1,
    lineHeight: 24,
  },
});
