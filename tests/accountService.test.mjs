import assert from 'node:assert/strict';
import test from 'node:test';
import { createAccountService } from '../src/services/accountService.ts';

const input = { displayName: 'Lia', birthYear: 2009, rankCode: 'gub-8', guardianConfirmed: true };

test('saving a profile always uses the signed-in user ID', async () => {
  let saved;
  const client = {
    auth: { getUser: async () => ({ data: { user: { id: 'owner-1' } }, error: null }) },
    from: (table) => {
      assert.equal(table, 'profiles');
      return { upsert: async (row) => { saved = row; return { error: null }; } };
    },
  };
  const service = createAccountService(client);
  await service.saveProfile({ ...input, user_id: 'attacker-picked-id' }, 2026);
  assert.deepEqual(saved, {
    user_id: 'owner-1', display_name: 'Lia', birth_year: 2009,
    rank_code: 'gub-8', guardian_confirmed: true,
  });
});

test('a signed-out user cannot save a profile', async () => {
  let wrote = false;
  const service = createAccountService({
    auth: { getUser: async () => ({ data: { user: null }, error: null }) },
    from: () => { wrote = true; throw new Error('should not write'); },
  });
  await assert.rejects(service.saveProfile(input, 2026), /sign in/i);
  assert.equal(wrote, false);
});

test('an invalid school invite is rejected by the server', async () => {
  const service = createAccountService({
    auth: { getUser: async () => ({ data: { user: { id: 'owner-1' } }, error: null }) },
    rpc: async (name, args) => {
      assert.equal(name, 'join_school');
      assert.deepEqual(args, { invite_code: 'wrong' });
      return { data: null, error: new Error('Invalid invite code') };
    },
  });
  await assert.rejects(service.joinSchool('wrong'), /invalid invite code/i);
});

test('loading a profile and favorites filters by the authenticated account', async () => {
  const queries = [];
  const client = {
    auth: { getUser: async () => ({ data: { user: { id: 'owner-1' } }, error: null }) },
    from: (table) => ({
      select: () => ({
        eq: (column, value) => {
          queries.push([table, column, value]);
          if (table === 'profiles') return { maybeSingle: async () => ({ data: {
            display_name: 'Lia', birth_year: 2009, rank_code: 'gub-8', guardian_confirmed: true,
          }, error: null }) };
          return Promise.resolve({ data: [{ movement_id: '1' }], error: null });
        },
      }),
    }),
  };
  const service = createAccountService(client);
  assert.deepEqual(await service.getProfile(), {
    displayName: 'Lia', birthYear: 2009, rankCode: 'gub-8', guardianConfirmed: true,
  });
  assert.deepEqual(await service.getFavorites(), ['1']);
  assert.deepEqual(queries, [['profiles', 'user_id', 'owner-1'], ['favorites', 'user_id', 'owner-1']]);
});

test('adding a favorite writes only the signed-in account ID', async () => {
  let saved;
  const service = createAccountService({
    auth: { getUser: async () => ({ data: { user: { id: 'owner-1' } }, error: null }) },
    from: (table) => {
      assert.equal(table, 'favorites');
      return { upsert: async (row) => { saved = row; return { error: null }; } };
    },
  });
  await service.setFavorite('movement-1', true);
  assert.deepEqual(saved, { user_id: 'owner-1', movement_id: 'movement-1' });
});

test('removing a favorite is scoped to the signed-in account and movement', async () => {
  const filters = [];
  const service = createAccountService({
    auth: { getUser: async () => ({ data: { user: { id: 'owner-1' } }, error: null }) },
    from: (table) => {
      assert.equal(table, 'favorites');
      return { delete: () => ({ eq: (column, value) => {
        filters.push([column, value]);
        return filters.length === 2 ? Promise.resolve({ error: null }) : { eq: (nextColumn, nextValue) => {
          filters.push([nextColumn, nextValue]);
          return Promise.resolve({ error: null });
        } };
      } }) };
    },
  });
  await service.setFavorite('movement-1', false);
  assert.deepEqual(filters, [['user_id', 'owner-1'], ['movement_id', 'movement-1']]);
});

test('school membership is checked for the authenticated account', async () => {
  let filtered;
  const service = createAccountService({
    auth: { getUser: async () => ({ data: { user: { id: 'owner-1' } }, error: null }) },
    from: (table) => {
      assert.equal(table, 'school_memberships');
      return { select: () => ({ eq: (column, id) => {
        filtered = [column, id];
        return { maybeSingle: async () => ({ data: { school_id: 'school-1' }, error: null }) };
      } }) };
    },
  });
  assert.equal(await service.getSchoolId(), 'school-1');
  assert.deepEqual(filtered, ['user_id', 'owner-1']);
});
