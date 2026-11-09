import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { useAccount } from '../contexts/AccountContext';
import { getPilotStage } from '../domain/pilotFlow';
import ProfileForm from './ProfileForm';
import AppNavigator from '../navigation/AppNavigator';

export default function PilotGate() {
  const account = useAccount();
  const stage = getPilotStage({ configured: account.configured, loading: account.loading, signedIn: Boolean(account.user), schoolId: account.schoolId, profile: account.profile });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invite, setInvite] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    setMessage(null); setBusy(true);
    try { await action(); }
    catch (caught) { setMessage(caught instanceof Error ? caught.message : 'Tente novamente'); }
    finally { setBusy(false); }
  };

  if (stage === 'loading') return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /><Text style={{ textAlign: 'center' }}>Carregando conta...</Text></View>;
  if (stage === 'preview') return <View style={{ flex: 1 }}><Text style={{ padding: 8, textAlign: 'center', backgroundColor: '#fff1bf' }}>Prévia pública: configure Supabase para ativar contas privadas</Text><AppNavigator /></View>;
  if (stage === 'catalog') return <AppNavigator />;
  if (stage === 'profile') return <ProfileForm />;

  return <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 14, backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 26, fontWeight: '700' }}>{stage === 'sign-in' ? 'Entrar na escola' : 'Código da escola'}</Text>
    {stage === 'sign-in' ? <>
      <Text>Conta do próprio adulto ou de um responsável legal</Text>
      <TextInput accessibilityLabel="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 12, borderRadius: 8 }} />
      <TextInput accessibilityLabel="Senha" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, padding: 12, borderRadius: 8 }} />
      <Pressable accessibilityRole="button" disabled={busy} onPress={() => run(() => account.signIn(email, password))} style={{ backgroundColor: '#145a84', padding: 14 }}><Text style={{ color: '#fff' }}>Entrar</Text></Pressable>
      <Pressable accessibilityRole="button" disabled={busy} onPress={() => run(async () => { const signedIn = await account.signUp(email, password); if (!signedIn) setMessage('Conta criada. Confirme o e-mail e depois entre.'); })} style={{ padding: 14 }}><Text>Criar conta</Text></Pressable>
    </> : <>
      <Text>Peça o código de convite ao mestre. Ele permite participar desta escola.</Text>
      <TextInput accessibilityLabel="Código de convite" placeholder="Código de convite" autoCapitalize="none" value={invite} onChangeText={setInvite} style={{ borderWidth: 1, padding: 12, borderRadius: 8 }} />
      <Pressable accessibilityRole="button" disabled={busy} onPress={() => run(() => account.joinSchool(invite))} style={{ backgroundColor: '#145a84', padding: 14 }}><Text style={{ color: '#fff' }}>Entrar na escola</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={() => run(account.signOut)}><Text>Sair da conta</Text></Pressable>
    </>}
    {message && <Text accessibilityRole="alert" style={{ color: message.startsWith('Conta criada') ? '#145a84' : '#a00' }}>{message}</Text>}
    {account.error && <Text accessibilityRole="alert" style={{ color: '#a00' }}>{account.error}</Text>}
    {busy && <ActivityIndicator />}
  </View>;
}
