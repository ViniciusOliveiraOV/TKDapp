import React from 'react';
import { render } from '@testing-library/react-native';
import VideoPlayer from '../../src/components/VideoPlayer';

jest.mock('react-native-youtube-iframe', () => () => null);

test('a movement video shows its source and public-demo status', async () => {
  const view = await render(<VideoPlayer videos={['2N9ftiNzKck']} />);
  expect(view.getByText(/Conheça o Ap Chagi/)).toBeTruthy();
  expect(view.getByText(/Sergio Moller Taekwondo/)).toBeTruthy();
  expect(view.getByText(/demonstração pública/i)).toBeTruthy();
});
