import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAccount } from '../contexts/AccountContext';
import { GUB_BELTS, getBeltLabel, getCompetitionDivisions } from '../domain/cbtkd2026';

const zones = [
  'Mirim · 7–8 anos', 'Infantil · 9–11 anos', 'Cadete · 12–14 anos',
  'Júnior · 15–17 anos', 'Sub-21 · 17–21 anos, Dan', 'Adulto · a partir de 17 anos',
  'Master 1 · 31–35 anos', 'Master 2 · 36–40 anos', 'Master 3 · 41–45 anos',
  'Master 4 · 46–50 anos', 'Master 5 · 51–55 anos', 'Master 6 · 56–60 anos',
  'Master 7 · 61–65 anos', 'Master 8 · acima de 65 anos',
];

export default function CurriculumScreen() {
  const { profile } = useAccount();
  const divisions = profile ? getCompetitionDivisions(profile.birthYear, 2026, profile.rankCode.startsWith('dan') ? 'dan' : 'gub') : [];
  return <ScrollView contentContainerStyle={{ padding: 24, gap: 12, backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 25, fontWeight: '700' }}>Zonas etárias e graduações</Text>
    <Text>Referência: regulamento técnico nacional de Kyorugui CBTKD 2026. Idade calculada pelo ano de nascimento.</Text>
    {profile && <View style={{ padding: 12, backgroundColor: '#e3f3ff', borderRadius: 8 }}>
      <Text style={{ fontWeight: '700' }}>{profile.displayName}: {getBeltLabel(profile.rankCode)}</Text>
      <Text>Zona em 2026: {divisions.length ? divisions.join(', ') : 'sem categoria nesta tabela'}</Text>
    </View>}
    <Text style={{ fontSize: 19, fontWeight: '700' }}>Zonas de competição</Text>
    {zones.map(zone => <Text key={zone} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>{zone}</Text>)}
    <Text style={{ fontSize: 19, fontWeight: '700' }}>Faixas</Text>
    {GUB_BELTS.map(({ gub }) => <Text key={gub} style={{ padding: 8 }}>{getBeltLabel(`gub-${gub}`)}</Text>)}
    <Text>Dan: faixas pretas do 1º ao 10º Dan na tabela de 2026.</Text>
    <Text style={{ fontWeight: '700' }}>Aguardando o currículo do mestre para atribuir técnicas e poomsae a cada zona e faixa.</Text>
  </ScrollView>;
}
