import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import MovementsScreen from '../screens/MovementsScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';
import PoomsaeScreen from '../screens/PoomsaeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CurriculumScreen from '../screens/CurriculumScreen';
import { MovementCategory } from '../types';
import { useTheme } from '../contexts/ThemeContext';

export type RootStackParamList = {
  Onboarding: undefined;
  Categorias: NavigatorScreenParams<MainTabParamList> | undefined;
  Movimentos: { category: MovementCategory };
  Detalhes: { movementId: string };
  Curriculo: undefined;
};

export type MainTabParamList = {
  Explorar: undefined;
  Poomsae: undefined;
  Favoritos: undefined;
  Perfil: undefined;
  Sobre: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MyTabs() {
  const { colors } = useTheme();
  
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
        name="Poomsae"
        component={PoomsaeScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🥋</Text>,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
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
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text> }} />
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
        <Stack.Screen name="Curriculo" component={CurriculumScreen} options={{ title: 'Zonas e graduações' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
