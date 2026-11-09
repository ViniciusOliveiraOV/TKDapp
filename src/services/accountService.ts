import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProfileInput } from '../domain/profile.ts';
import { validateProfileInput } from '../domain/profile.ts';

export function createAccountService(client: SupabaseClient) {
  const requireUserId = async (): Promise<string> => {
    const { data, error } = await client.auth.getUser();
    if (error) throw error;
    if (!data.user) throw new Error('Sign in to use your profile');
    return data.user.id;
  };

  return {
    saveProfile: async (input: ProfileInput, year: number): Promise<void> => {
      const userId = await requireUserId();
      const profile = validateProfileInput(input, year);
      const { error } = await client.from('profiles').upsert({
        user_id: userId,
        display_name: profile.displayName,
        birth_year: profile.birthYear,
        rank_code: profile.rankCode,
        guardian_confirmed: profile.guardianConfirmed,
      });
      if (error) throw error;
    },
    joinSchool: async (code: string): Promise<void> => {
      await requireUserId();
      const { error } = await client.rpc('join_school', { invite_code: code });
      if (error) throw error;
    },
    getSchoolId: async (): Promise<string | null> => {
      const userId = await requireUserId();
      const { data, error } = await client.from('school_memberships')
        .select('school_id').eq('user_id', userId).maybeSingle();
      if (error) throw error;
      return data?.school_id ?? null;
    },
    getProfile: async (): Promise<ProfileInput | null> => {
      const userId = await requireUserId();
      const { data, error } = await client.from('profiles')
        .select('display_name,birth_year,rank_code,guardian_confirmed')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) throw error;
      return data ? {
        displayName: data.display_name,
        birthYear: data.birth_year,
        rankCode: data.rank_code,
        guardianConfirmed: data.guardian_confirmed,
      } : null;
    },
    getFavorites: async (): Promise<string[]> => {
      const userId = await requireUserId();
      const { data, error } = await client.from('favorites')
        .select('movement_id')
        .eq('user_id', userId);
      if (error) throw error;
      return (data ?? []).map(({ movement_id }) => movement_id);
    },
    setFavorite: async (movementId: string, favorite: boolean): Promise<void> => {
      const userId = await requireUserId();
      if (favorite) {
        const { error } = await client.from('favorites').upsert({ user_id: userId, movement_id: movementId });
        if (error) throw error;
      } else {
        const { error } = await client.from('favorites').delete()
          .eq('user_id', userId).eq('movement_id', movementId);
        if (error) throw error;
      }
    },
  };
}
