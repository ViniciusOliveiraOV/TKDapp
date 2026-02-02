import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

export default function AboutScreen() {
  const { colors, mode, setMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const themeOptions = [
    { value: 'light' as const, label: t('themeLight') },
    { value: 'dark' as const, label: t('themeDark') },
    { value: 'auto' as const, label: t('themeAuto') },
  ];

  const languageOptions = [
    { value: 'pt' as const, label: t('languagePt') },
    { value: 'en' as const, label: t('languageEn') },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.white }]}>
        <Text style={styles.logo}>🥋</Text>
        <Text style={[styles.appName, { color: colors.primary }]}>TKDapp</Text>
        <Text style={[styles.version, { color: colors.text.secondary }]}>
          {t('version')} 1.0.0
        </Text>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          {t('settings')}
        </Text>
        
        <Text style={[styles.settingLabel, { color: colors.text.secondary }]}>
          {t('theme')}
        </Text>
        <View style={styles.optionsRow}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                { borderColor: colors.border },
                mode === option.value && { 
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setMode(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: colors.text.primary },
                  mode === option.value && { color: colors.white },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.settingLabel, { color: colors.text.secondary, marginTop: SPACING.lg }]}>
          {t('language')}
        </Text>
        <View style={styles.optionsRow}>
          {languageOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                { borderColor: colors.border },
                language === option.value && { 
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setLanguage(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: colors.text.primary },
                  language === option.value && { color: colors.white },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          {t('aboutApp')}
        </Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>
          {t('aboutAppDesc')}
        </Text>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          {t('developer')}
        </Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>
          Vinicius Oliveira
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ViniciusOliveiraOV')}>
          <Text style={[styles.link, { color: colors.primary }]}>GitHub →</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          {t('features')}
        </Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>• {t('feature1')}</Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>• {t('feature2')}</Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>• {t('feature3')}</Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>• {t('feature4')}</Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>• {t('feature5')}</Text>
        <Text style={[styles.text, { color: colors.text.primary }]}>• {t('feature6')}</Text>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          {t('contact')}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ViniciusOliveiraOV/TKDapp')}>
          <Text style={[styles.link, { color: colors.primary }]}>
            {t('repository')} →
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.footer, { color: colors.text.secondary }]}>
        {t('madeWith')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
  logo: {
    fontSize: 60,
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  version: {
    fontSize: FONT_SIZES.sm,
  },
  section: {
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  text: {
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.sm,
    lineHeight: 22,
  },
  link: {
    fontSize: FONT_SIZES.md,
    marginTop: SPACING.sm,
    fontWeight: '600',
  },
  footer: {
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    marginVertical: SPACING.xxl,
  },
  settingLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
  },
  optionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
});