import React from 'react';
import { render } from '@testing-library/react-native';
import CurriculumScreen from '../../src/screens/CurriculumScreen';

jest.mock('../../src/contexts/AccountContext', () => ({ useAccount: () => ({ profile: { displayName: 'Lia', birthYear: 2009, rankCode: 'gub-8' } }) }));

test('curriculum shows official age and rank placement without claiming school requirements', async () => {
  const view = await render(<CurriculumScreen />);
  expect(view.getAllByText(/Júnior/).length).toBeGreaterThan(0);
  expect(view.getAllByText(/8º Gub/).length).toBeGreaterThan(0);
  expect(view.getByText(/Aguardando o currículo do mestre/)).toBeTruthy();
});
