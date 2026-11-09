import assert from 'node:assert/strict';
import test from 'node:test';
import { movements } from '../src/data/movements.ts';
import { poomsae } from '../src/data/poomsae.ts';
import { getVideoSource } from '../src/data/videoSources.ts';

test('every movement has a matched, attributable demo video', () => {
  assert.equal(movements.length, 15);
  for (const movement of movements) {
    assert.ok(movement.videos.length > 0, movement.name);
    for (const videoId of movement.videos) {
      assert.match(videoId, /^[A-Za-z0-9_-]{11}$/, movement.name);
      const source = getVideoSource(videoId);
      assert.ok(source, `${movement.name}: ${videoId}`);
      assert.ok(source.title && source.publisher, movement.name);
      assert.equal(source.status, 'demo', movement.name);
    }
  }
});

test('the side kick demo excludes ITF and Polish-language alternatives', () => {
  const sideKick = movements.find(({ koreanName }) => koreanName === 'Yop Chagi');
  assert.deepEqual(sideKick?.videos, ['M825zz7gxN0']);
});

test('Ap Kubi is labeled as a long front stance', () => {
  assert.equal(movements.find(({ koreanName }) => koreanName === 'Ap Kubi')?.name, 'Postura Frontal Longa');
});

test('the poomsae references cover eight Taegeuk and nine Dan forms with unique Kukkiwon videos', () => {
  assert.equal(poomsae.filter(({ group }) => group === 'taegeuk').length, 8);
  assert.equal(poomsae.filter(({ group }) => group === 'dan').length, 9);
  assert.equal(new Set(poomsae.map(({ id }) => id)).size, 17);
  assert.equal(new Set(poomsae.map(({ videoId }) => videoId)).size, 17);
  assert.equal(poomsae.find(({ id }) => id === 'taegeuk-7')?.videoId, '6FUM1p6qqhQ');
  for (const form of poomsae) {
    const source = getVideoSource(form.videoId);
    assert.equal(source?.publisher, 'KUKKIWON WORLD TAEKWONDO HEADQUARTERS', form.name);
    assert.ok(source?.title && source.status === 'demo', form.name);
  }
});

test('movements do not claim unapproved belt requirements', () => {
  for (const movement of movements) assert.equal(Object.hasOwn(movement, 'belt'), false);
});
