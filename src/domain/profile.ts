import { getBeltLabel } from './cbtkd2026.ts';

export interface ProfileInput {
  displayName: string;
  birthYear: number;
  rankCode: string;
  guardianConfirmed: boolean;
}

export function validateProfileInput(input: ProfileInput, year: number): ProfileInput {
  const displayName = input.displayName.trim();
  if (!displayName || displayName.length > 80) {
    throw new Error('A valid name is required');
  }
  if (!Number.isInteger(year) || !Number.isInteger(input.birthYear) || input.birthYear < 1900 || input.birthYear > year) {
    throw new RangeError('Invalid birth year');
  }
  getBeltLabel(input.rankCode);
  if (year - input.birthYear < 18 && !input.guardianConfirmed) {
    throw new Error('A guardian account is required for minors');
  }
  return {
    displayName,
    birthYear: input.birthYear,
    rankCode: input.rankCode,
    guardianConfirmed: input.guardianConfirmed,
  };
}
