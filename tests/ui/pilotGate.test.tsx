import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import PilotGate from '../../src/components/PilotGate';

const mockJoinSchool = jest.fn(async () => {});
let mockState: any;
jest.mock('../../src/contexts/AccountContext', () => ({ useAccount: () => mockState }));
jest.mock('../../src/navigation/AppNavigator', () => () => null);
jest.mock('../../src/components/ProfileForm', () => () => null);

test('school invite is submitted only after sign-in', async () => {
  mockState = {
    configured: true, loading: false, user: { id: 'owner-1' }, schoolId: null,
    profile: null, error: null, joinSchool: mockJoinSchool, signOut: jest.fn(),
  };
  const view = await render(<PilotGate />);
  await fireEvent.changeText(view.getByPlaceholderText('Código de convite'), 'SCHOOL-SECRET');
  await fireEvent.press(view.getByText('Entrar na escola'));
  await waitFor(() => expect(mockJoinSchool).toHaveBeenCalledWith('SCHOOL-SECRET'));
});
