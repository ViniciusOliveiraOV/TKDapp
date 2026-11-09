import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAccount } from '../contexts/AccountContext';
import { getBeltLabel, getCompetitionDivisions } from '../domain/cbtkd2026';
import ProfileForm from '../components/ProfileForm';

export default function ProfileScreen() {
  const { configured, profile, user, signOut } = useAccount();
  if (!configured || !profile) return <View style={{ padding: 24 }}><Text>Perfis privados estão disponíveis após configurar Supabase e entrar na escola.</Text></View>;
  const divisions = getCompetitionDivisions(profile.birthYear, 2026, profile.rankCode.startsWith('dan') ? 'dan' : 'gub');
  return <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={{ padding: 24, gap: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>{profile.displayName}</Text>
      <Text>{getBeltLabel(profile.rankCode)}</Text>
      <Text>Zona etária CBTKD 2026: {divisions.length ? divisions.join(', ') : 'Sem categoria nesta tabela'}</Text>
      <Text>A idade de competição considera 2026 menos o ano de nascimento; algumas categorias se sobrepõem.</Text>
      <Text>Conta: {user?.email}</Text>
      <Pressable accessibilityRole="button" onPress={() => { void signOut(); }}><Text style={{ color: '#145a84' }}>Sair da conta</Text></Pressable>
    </View>
    <ProfileForm initial={profile} />
  </ScrollView>;
}
