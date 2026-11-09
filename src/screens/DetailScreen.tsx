import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { movements } from '../data/movements';
import Badge from '../components/Badge';
import VideoPlayer from '../components/VideoPlayer';
import { getDifficultyColor, translateDifficulty } from '../utils/helpers';
import { useAccount } from '../contexts/AccountContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetailScreen({ route }: Props) {
  const { movementId } = route.params;
  const movement = movements.find((m) => m.id === movementId);
  const { configured, favorites, toggleFavorite } = useAccount();
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const isFavorite = favorites.includes(movementId);
  const { colors } = useTheme();
  const { t } = useLanguage();

  const handleToggleFavorite = async () => {
    try { await toggleFavorite(movementId); setFavoriteError(null); }
    catch (caught) { setFavoriteError(caught instanceof Error ? caught.message : 'Falha ao salvar favorito'); }
  };

  if (!movement) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text.secondary }]}>
          Movimento não encontrado
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              {movement.name}
            </Text>
            <Text style={[styles.koreanName, { color: colors.primary }]}>
              {movement.koreanName}
            </Text>
          </View>
          {configured && <TouchableOpacity accessibilityRole="button" onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '⭐' : '☆'}</Text>
          </TouchableOpacity>}
        </View>
        {favoriteError && <Text accessibilityRole="alert" style={{ color: '#a00' }}>{favoriteError}</Text>}
      </View>

      <VideoPlayer videos={movement.videos} />

      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              Categoria
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              {movement.category}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
              Currículo por faixa
            </Text>
            <Text style={[styles.infoValue, { color: colors.text.primary }]}>
              Aguardando validação do mestre
            </Text>
          </View>
        </View>

        <Badge
          text={`${t('difficulty')}: ${t(translateDifficulty(movement.difficulty))}`}
          color={getDifficultyColor(movement.difficulty)}
          style={styles.difficultyBadge}
          textStyle={styles.difficultyText}
        />
      </View>

      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Descrição
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          {movement.description}
        </Text>
      </View>

      {movement.tips && movement.tips.length > 0 && (
        <View style={[styles.section, { backgroundColor: colors.white }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            {t('tips')}
          </Text>
          {movement.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={[styles.tipBullet, { color: colors.primary }]}>
                •
              </Text>
              <Text style={[styles.tipText, { color: colors.text.secondary }]}>
                {tip}
              </Text>
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONT_SIZES.md,
  },
  header: {
    padding: SPACING.xl,
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
    marginBottom: SPACING.sm,
  },
  koreanName: {
    fontSize: FONT_SIZES.xl,
    fontStyle: 'italic',
  },
  favoriteButton: {
    padding: SPACING.sm,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  section: {
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
    marginBottom: SPACING.xs,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
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
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.sm,
  },
  tipBullet: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.sm,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: FONT_SIZES.md,
    flex: 1,
    lineHeight: 24,
  },
});
