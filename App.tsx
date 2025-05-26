// App.tsx
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';


import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AppProvider } from "./src/context/AppContext";

//Navegacion
import AuthStack from './src/navigation/AuthStack';
import MainNavigator from './src/navigation/MainNavigation';


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