import assert from 'node:assert/strict';
import test from 'node:test';
import { validateProfileInput } from '../src/domain/profile.ts';

const adult = { displayName: '  Ana Silva  ', birthYear: 1995, rankCode: 'gub-8', guardianConfirmed: false };

test('an adult profile keeps only the minimal validated fields', () => {
  assert.deepEqual(validateProfileInput(adult, 2026), {
    displayName: 'Ana Silva', birthYear: 1995, rankCode: 'gub-8', guardianConfirmed: false,
  });
});

test('a minor profile requires a guardian-owned account', () => {
  assert.throws(() => validateProfileInput({ ...adult, birthYear: 2009 }, 2026), /guardian/i);
  assert.equal(validateProfileInput({ ...adult, birthYear: 2009, guardianConfirmed: true }, 2026).birthYear, 2009);
});

test('invalid birth years, names, and ranks are rejected', () => {
  assert.throws(() => validateProfileInput({ ...adult, birthYear: 2027 }, 2026), RangeError);
  assert.throws(() => validateProfileInput({ ...adult, displayName: ' ' }, 2026), /name/i);
  assert.throws(() => validateProfileInput({ ...adult, rankCode: 'gub-11' }, 2026), RangeError);
});
