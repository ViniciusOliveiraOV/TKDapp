export type PilotStage = 'preview' | 'loading' | 'sign-in' | 'invite' | 'profile' | 'catalog';

export function getPilotStage(state: {
  configured: boolean;
  loading: boolean;
  signedIn: boolean;
  schoolId: string | null;
  profile: object | null;
}): PilotStage {
  if (!state.configured) return 'preview';
  if (state.loading) return 'loading';
  if (!state.signedIn) return 'sign-in';
  if (!state.schoolId) return 'invite';
  if (!state.profile) return 'profile';
  return 'catalog';
}
