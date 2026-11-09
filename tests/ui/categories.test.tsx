import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CategoriesScreen from '../../src/screens/CategoriesScreen';

jest.mock('../../src/contexts/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff', white: '#fff', shadow: '#000', primary: '#236', border: '#ddd',
      text: { primary: '#111', secondary: '#555' },
    },
  }),
}));
jest.mock('../../src/contexts/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key === 'kicks' ? 'Chutes' : key }),
}));
jest.mock('../../src/contexts/AccountContext', () => ({ useAccount: () => ({ profile: null }) }));

test('selecting a category opens its movement list in the parent stack', async () => {
  const navigate = jest.fn();
  const navigation = { getParent: () => ({ navigate }) } as any;
  const view = await render(<CategoriesScreen navigation={navigation} route={{} as any} />);
  await fireEvent.press(view.getByText('Chutes'));
  expect(navigate).toHaveBeenCalledWith('Movimentos', { category: 'Chutes' });
});
