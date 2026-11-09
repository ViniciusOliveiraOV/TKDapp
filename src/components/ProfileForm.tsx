import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import type { ProfileInput } from '../domain/profile';
import { GUB_BELTS, getBeltLabel } from '../domain/cbtkd2026';
import { useAccount } from '../contexts/AccountContext';

const ranks = [...GUB_BELTS.map(({ gub }) => `gub-${gub}`), ...Array.from({ length: 10 }, (_, index) => `dan-${index + 1}`)];

export default function ProfileForm({ initial }: { initial?: ProfileInput | null }) {
  const { saveProfile } = useAccount();
  const [name, setName] = useState(initial?.displayName ?? '');
  const [birthYear, setBirthYear] = useState(initial ? String(initial.birthYear) : '');
  const [rankCode, setRankCode] = useState(initial?.rankCode ?? 'gub-10');
  const [guardianConfirmed, setGuardianConfirmed] = useState(initial?.guardianConfirmed ?? false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const minor = Number.isInteger(Number(birthYear)) && new Date().getFullYear() - Number(birthYear) < 18;

  const submit = async () => {
    setError(null); setSaving(true);
    try {
      await saveProfile({ displayName: name, birthYear: Number(birthYear), rankCode, guardianConfirmed });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível salvar o perfil');
    } finally {
      setSaving(false);
    }
  };

  return <ScrollView contentContainerStyle={{ padding: 24, gap: 14, backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 24, fontWeight: '700' }}>Perfil do praticante</Text>
    <Text>Nome do praticante</Text>
    <TextInput accessibilityLabel="Nome do praticante" value={name} onChangeText={setName} autoCapitalize="words" style={{ borderWidth: 1, borderColor: '#aaa', padding: 12, borderRadius: 8 }} />
    <Text>Ano de nascimento</Text>
    <TextInput accessibilityLabel="Ano de nascimento" value={birthYear} onChangeText={setBirthYear} keyboardType="number-pad" maxLength={4} style={{ borderWidth: 1, borderColor: '#aaa', padding: 12, borderRadius: 8 }} />
    <Text>Graduação atual (CBTKD 2026)</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {ranks.map(rank => <Pressable key={rank} accessibilityRole="button" onPress={() => setRankCode(rank)} style={{ borderWidth: 1, borderColor: rank === rankCode ? '#145a84' : '#aaa', backgroundColor: rank === rankCode ? '#e3f3ff' : '#fff', padding: 8, borderRadius: 6 }}><Text>{getBeltLabel(rank)}</Text></Pressable>)}
    </View>
    {minor && <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: guardianConfirmed }} onPress={() => setGuardianConfirmed(!guardianConfirmed)} style={{ padding: 8 }}><Text>{guardianConfirmed ? '☑' : '☐'} Sou responsável legal e uso minha própria conta para este menor</Text></Pressable>}
    <Text>As zonas etárias são categorias de competição CBTKD 2026. As exigências de conteúdo por faixa dependem do currículo do mestre.</Text>
    {error && <Text accessibilityRole="alert" style={{ color: '#a00' }}>{error}</Text>}
    <Pressable accessibilityRole="button" disabled={saving} onPress={submit} style={{ backgroundColor: '#145a84', padding: 14, borderRadius: 8, alignItems: 'center' }}><Text style={{ color: '#fff', fontWeight: '700' }}>{saving ? 'Salvando...' : 'Salvar perfil'}</Text></Pressable>
    {saving && <ActivityIndicator />}
  </ScrollView>;
}
