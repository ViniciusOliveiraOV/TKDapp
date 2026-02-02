import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: 'Bem-vindo ao TKDapp! 🥋',
      description: 'Aprenda técnicas de Taekwondo com vídeos e dicas',
      emoji: '🥋',
    },
    {
      title: 'Explore por Categorias',
      description: 'Chutes, bloqueios, posturas e mais!',
      emoji: '🎯',
    },
    {
      title: 'Salve seus Favoritos',
      description: 'Marque os movimentos para praticar depois',
      emoji: '⭐',
    },
  ];
  
  const finish = async () => {
    await AsyncStorage.setItem('@tkdapp:onboarding_completed', 'true');
    navigation.replace('Categorias');
  };
  
  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };
  
  const skip = () => {
    finish();
  };
  
  const currentStep = steps[step];
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{currentStep.emoji}</Text>
        <Text style={styles.title}>{currentStep.title}</Text>
        <Text style={styles.description}>{currentStep.description}</Text>
      </View>
      
      <View style={styles.pagination}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === step && styles.activeDot,
            ]}
          />
        ))}
      </View>
      
      <View style={styles.buttons}>
        <TouchableOpacity onPress={skip}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={next}>
          <Text style={styles.nextText}>
            {step === steps.length - 1 ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    paddingVertical: SPACING.xxl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emoji: {
    fontSize: 100,
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.xl,
    gap: SPACING.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 24,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  skipText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  nextText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});