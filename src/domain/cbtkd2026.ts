export type RankKind = 'gub' | 'dan';

// CBTKD 2026 National Competition Technical Regulation, Article 29 (belt chart).
export const GUB_BELTS: ReadonlyArray<{ gub: number; color: string }> = [
  { gub: 10, color: 'Branca' },
  { gub: 9, color: 'Cinza' },
  { gub: 8, color: 'Amarela' },
  { gub: 7, color: 'Laranja' },
  { gub: 6, color: 'Verde' },
  { gub: 5, color: 'Verde escuro' },
  { gub: 4, color: 'Azul claro' },
  { gub: 3, color: 'Azul escuro' },
  { gub: 2, color: 'Vermelha' },
  { gub: 1, color: 'Vermelho escuro' },
];

// The CBTKD counts age by year of birth; divisions overlap by design.
export function getCompetitionDivisions(birthYear: number, year: number, rank: RankKind): string[] {
  if (!Number.isInteger(birthYear) || !Number.isInteger(year) || birthYear < 1900 || birthYear > year) {
    throw new RangeError('Invalid birth year or competition year');
  }

  const age = year - birthYear;
  const divisions: string[] = [];
  if (age >= 7 && age <= 8) divisions.push('Mirim');
  if (age >= 9 && age <= 11) divisions.push('Infantil');
  if (age >= 12 && age <= 14) divisions.push('Cadete');
  if (age >= 15 && age <= 17) divisions.push('Júnior');
  if (age >= 17 && age <= 21 && rank === 'dan') divisions.push('Sub-21');
  if (age >= 17) divisions.push('Adulto');
  if (age >= 31) divisions.push(`Master ${Math.min(Math.floor((age - 31) / 5) + 1, 8)}`);
  return divisions;
}

export function getBeltLabel(rank: string): string {
  const [kind, levelText] = rank.split('-');
  const level = Number(levelText);
  if (kind === 'gub') {
    const belt = GUB_BELTS.find(({ gub }) => gub === level);
    if (belt) return `${level}º Gub · ${belt.color}`;
  }
  if (kind === 'dan' && Number.isInteger(level) && level >= 1 && level <= 10) {
    return `${level}º Dan · Preta`;
  }
  throw new RangeError('Unknown graduation');
}
