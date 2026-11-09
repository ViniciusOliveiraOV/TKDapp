import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { ProfileInput } from '../domain/profile';
import { createAccountService } from '../services/accountService';
import { supabase } from '../services/supabase';

type AccountState = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  schoolId: string | null;
  profile: ProfileInput | null;
  favorites: string[];
  error: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  joinSchool: (code: string) => Promise<void>;
  saveProfile: (input: ProfileInput) => Promise<void>;
  toggleFavorite: (movementId: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const AccountContext = createContext<AccountState | null>(null);
const service = supabase ? createAccountService(supabase) : null;

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileInput | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const requestVersion = useRef(0);

  const refresh = useCallback(async () => {
    if (!supabase || !service) return;
    const version = ++requestVersion.current;
    const current = () => version === requestVersion.current;
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!current()) return;
      setUser(data.user);
      if (!data.user) {
        setSchoolId(null); setProfile(null); setFavorites([]); setError(null);
        return;
      }
      const nextSchoolId = await service.getSchoolId();
      if (!current()) return;
      setSchoolId(nextSchoolId);
      if (nextSchoolId) {
        const [nextProfile, nextFavorites] = await Promise.all([service.getProfile(), service.getFavorites()]);
        if (!current()) return;
        setProfile(nextProfile);
        setFavorites(nextFavorites);
      } else {
        setProfile(null); setFavorites([]);
      }
      setError(null);
    } catch (caught) {
      if (current()) setError(caught instanceof Error ? caught.message : 'Falha ao carregar conta');
    } finally {
      if (current()) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void refresh();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        requestVersion.current += 1;
        setUser(null); setSchoolId(null); setProfile(null); setFavorites([]); setError(null);
        setLoading(false);
      } else {
        // Run after the auth callback returns; Supabase may hold its auth lock here.
        setTimeout(() => { void refresh(); }, 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [refresh]);

  const value = useMemo<AccountState>(() => ({
    configured: Boolean(supabase), loading, user, schoolId, profile, favorites, error,
    signUp: async (email, password) => {
      if (!supabase) throw new Error('Supabase não configurado');
      const { data, error: authError } = await supabase.auth.signUp({ email: email.trim(), password });
      if (authError) throw authError;
      return Boolean(data.session);
    },
    signIn: async (email, password) => {
      if (!supabase) throw new Error('Supabase não configurado');
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) throw authError;
      await refresh();
    },
    signOut: async () => {
      if (!supabase) return;
      const { error: authError } = await supabase.auth.signOut();
      if (authError) throw authError;
      requestVersion.current += 1;
      setUser(null); setSchoolId(null); setProfile(null); setFavorites([]); setError(null);
    },
    joinSchool: async (code) => { if (!service) throw new Error('Supabase não configurado'); await service.joinSchool(code.trim()); await refresh(); },
    saveProfile: async (input) => { if (!service) throw new Error('Supabase não configurado'); await service.saveProfile(input, new Date().getFullYear()); await refresh(); },
    toggleFavorite: async (movementId) => {
      if (!service) throw new Error('Entre na sua conta para salvar favoritos');
      const nextIsFavorite = !favorites.includes(movementId);
      await service.setFavorite(movementId, nextIsFavorite);
      setFavorites(current => nextIsFavorite ? [...current, movementId] : current.filter(id => id !== movementId));
    },
    refresh,
  }), [loading, user, schoolId, profile, favorites, error, refresh]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount(): AccountState {
  const account = useContext(AccountContext);
  if (!account) throw new Error('AccountProvider is required');
  return account;
}
