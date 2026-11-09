import assert from 'node:assert/strict';
import test from 'node:test';
import { GUB_BELTS, getBeltLabel, getCompetitionDivisions } from '../src/domain/cbtkd2026.ts';

test('2026 competition divisions use birth year and keep overlapping age 17 divisions', () => {
  assert.deepEqual(getCompetitionDivisions(2009, 2026, 'gub'), ['Júnior', 'Adulto']);
  assert.deepEqual(getCompetitionDivisions(2009, 2026, 'dan'), ['Júnior', 'Sub-21', 'Adulto']);
});

test('2026 age boundaries select Mirim, Infantil, Cadete, Júnior and Master divisions', () => {
  assert.deepEqual(getCompetitionDivisions(2019, 2026, 'gub'), ['Mirim']);
  assert.deepEqual(getCompetitionDivisions(2018, 2026, 'gub'), ['Mirim']);
  assert.deepEqual(getCompetitionDivisions(2017, 2026, 'gub'), ['Infantil']);
  assert.deepEqual(getCompetitionDivisions(2012, 2026, 'gub'), ['Cadete']);
  assert.deepEqual(getCompetitionDivisions(2011, 2026, 'gub'), ['Júnior']);
  assert.deepEqual(getCompetitionDivisions(2008, 2026, 'gub'), ['Adulto']);
  assert.deepEqual(getCompetitionDivisions(2005, 2026, 'dan'), ['Sub-21', 'Adulto']);
  assert.deepEqual(getCompetitionDivisions(1995, 2026, 'gub'), ['Adulto', 'Master 1']);
  assert.deepEqual(getCompetitionDivisions(1985, 2026, 'gub'), ['Adulto', 'Master 3']);
  assert.deepEqual(getCompetitionDivisions(1960, 2026, 'gub'), ['Adulto', 'Master 8']);
});

test('future and invalid birth years are rejected', () => {
  assert.throws(() => getCompetitionDivisions(2027, 2026, 'gub'), RangeError);
  assert.throws(() => getCompetitionDivisions(0, 2026, 'gub'), RangeError);
  assert.throws(() => getCompetitionDivisions(NaN, 2026, 'gub'), RangeError);
});

test('2026 CBTKD gub colors follow the official ten-rank sequence', () => {
  assert.deepEqual(GUB_BELTS.map(({ gub, color }) => [gub, color]), [
    [10, 'Branca'], [9, 'Cinza'], [8, 'Amarela'], [7, 'Laranja'],
    [6, 'Verde'], [5, 'Verde escuro'], [4, 'Azul claro'],
    [3, 'Azul escuro'], [2, 'Vermelha'], [1, 'Vermelho escuro'],
  ]);
  assert.equal(getBeltLabel('gub-4'), '4º Gub · Azul claro');
  assert.equal(getBeltLabel('dan-1'), '1º Dan · Preta');
});
