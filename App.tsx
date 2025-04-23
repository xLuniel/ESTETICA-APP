// App.tsx
import React from 'react';
import 'react-native-gesture-handler';  // Asegúrate de importar esto primero
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Contexto de autenticación
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';   // Stack para Login
import AppDrawer from './src/navigation/AppDrawer';   // el drawer

// Pantallas
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';

// Provider de React Native Paper
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

function RootNavigator() {
  const { user } = useAuth();
  return user ? <AppDrawer /> : <AuthStack />;
}