import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { poomsae } from '../data/poomsae';
import { getVideoSource } from '../data/videoSources';
import VideoPlayer from '../components/VideoPlayer';
import { useTheme } from '../contexts/ThemeContext';
import { FONT_SIZES, SPACING } from '../constants/theme';

export default function PoomsaeScreen() {
  const { colors } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = poomsae.find(({ id }) => id === selectedId);
  const source = selected ? getVideoSource(selected.videoId) : undefined;

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Poomsae</Text>
      <Text style={[styles.note, { color: colors.text.secondary }]}>
        Demonstrações públicas de referência. A sequência por faixa da escola aguarda validação do mestre.
      </Text>
      {(['taegeuk', 'dan'] as const).map((group) => (
        <View key={group}>
          <Text style={[styles.heading, { color: colors.text.primary }]}>
            {group === 'taegeuk' ? 'Taegeuk' : 'Faixas pretas'}
          </Text>
          {poomsae.filter((form) => form.group === group).map((form) => (
            <TouchableOpacity
              key={form.id}
              onPress={() => setSelectedId(form.id)}
              style={[styles.item, { backgroundColor: colors.white, borderColor: colors.border }]}
            >
              <Text style={{ color: colors.text.primary }}>{form.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {selected && source && (
        <View style={styles.selected}>
          <Text style={[styles.heading, { color: colors.text.primary }]}>{selected.name}</Text>
          <Text style={[styles.note, { color: colors.text.secondary }]}>
            Demonstração pública · {source.publisher} · {source.title}
          </Text>
          <VideoPlayer videos={[selected.videoId]} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  title: { fontSize: FONT_SIZES.xxxl, fontWeight: 'bold', marginBottom: SPACING.sm },
  heading: { fontSize: FONT_SIZES.xl, fontWeight: 'bold', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  note: { fontSize: FONT_SIZES.sm, lineHeight: 20 },
  item: { padding: SPACING.md, borderWidth: 1, borderRadius: 8, marginBottom: SPACING.sm },
  selected: { marginTop: SPACING.md },
});
