// App.tsx
import React from 'react';
import 'react-native-gesture-handler';  // Asegúrate de importar esto primero
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

// Contexto de autenticación
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AppProvider } from "./src/context/AppContext";

<<<<<<< Updated upstream
// Pantallas
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import Recuperar from './src/screens/Recuperar';
=======
//Navegacion
import AuthStack from './src/navigation/AuthStack';   // Stack para Login
import MainNavigator from './src/navigation/MainNavigation';
>>>>>>> Stashed changes

// Provider de React Native Paper
import { Provider as PaperProvider } from 'react-native-paper';

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <MainNavigator userRole={user.rol} /> : <AuthStack />;
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <AppProvider>
        <NavigationContainer>
        <RootNavigator />
        </NavigationContainer>
        </AppProvider>
      </AuthProvider>
    </PaperProvider>
  );
}