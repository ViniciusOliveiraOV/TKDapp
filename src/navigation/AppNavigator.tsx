import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import MovementsScreen from '../screens/MovementsScreen';
import DetailScreen from '../screens/DetailScreen';
import { MovementCategory } from '../types';
import { COLORS } from '../constants/theme';

export type RootStackParamList = {
  Categorias: undefined;
  Movimentos: { category: MovementCategory };
  Detalhes: { movementId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Categorias"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Categorias"
          component={CategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Movimentos"
          component={MovementsScreen}
          options={({ route }) => ({ title: route.params.category })}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetailScreen}
          options={{ title: 'Detalhes do Movimento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
