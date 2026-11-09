import assert from 'node:assert/strict';
import test from 'node:test';
import { getPilotStage } from '../src/domain/pilotFlow.ts';

test('pilot shows a preview only without Supabase configuration', () => {
  assert.equal(getPilotStage({ configured: false, loading: false, signedIn: false, schoolId: null, profile: null }), 'preview');
});

test('pilot requires sign-in, invite, and profile in that order', () => {
  const base = { configured: true, loading: false, signedIn: false, schoolId: null, profile: null };
  assert.equal(getPilotStage(base), 'sign-in');
  assert.equal(getPilotStage({ ...base, signedIn: true }), 'invite');
  assert.equal(getPilotStage({ ...base, signedIn: true, schoolId: 'school-1' }), 'profile');
  assert.equal(getPilotStage({ ...base, signedIn: true, schoolId: 'school-1', profile: { displayName: 'Lia' } }), 'catalog');
  assert.equal(getPilotStage({ ...base, loading: true }), 'loading');
});
