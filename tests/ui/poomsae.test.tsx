import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import PoomsaeScreen from '../../src/screens/PoomsaeScreen';

jest.mock('../../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff', white: '#fff', primary: '#236',
      text: { primary: '#111', secondary: '#555' },
    },
  }),
}));

jest.mock('../../src/components/VideoPlayer', () => {
  const { Text } = require('react-native');
  return ({ videos }: { videos: string[] }) => <Text>video:{videos[0]}</Text>;
});

test('selecting a poomsae shows its verified public demonstration and attribution', async () => {
  const view = await render(<PoomsaeScreen />);
  await fireEvent.press(view.getByText('Taegeuk Il Jang'));
  expect(view.getByText('video:WhkjRruCBTo')).toBeTruthy();
  expect(view.getByText(/KUKKIWON WORLD TAEKWONDO HEADQUARTERS/)).toBeTruthy();
  expect(view.getByText(/demonstração pública/i)).toBeTruthy();
});
