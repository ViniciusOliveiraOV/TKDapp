import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import MovementsScreen from '../screens/MovementsScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';
import { MovementCategory } from '../types';
import { useTheme } from '../contexts/ThemeContext';

export type RootStackParamList = {
  Onboarding: undefined;
  Categorias: undefined;
  Movimentos: { category: MovementCategory };
  Detalhes: { movementId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const { colors, isDark } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
      }}
    >
      <Tab.Screen
        name="Explorar"
        component={CategoriesScreen}
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>⭐</Text>,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
      <Tab.Screen
        name="Sobre"
        component={AboutScreen}
        options={{ 
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>ℹ️</Text>,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { colors } = useTheme();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Categorias"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Categorias"
          component={MyTabs}
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
