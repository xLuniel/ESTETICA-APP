// src/navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import Recuperar from '../screens/Recuperar';
=======
import RegisterScreen from 'src/screens/RegisterScreen';
>>>>>>> Stashed changes
=======
import RegisterScreen from 'src/screens/RegisterScreen';
>>>>>>> Stashed changes

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <Stack.Screen name="Recuperar" component={Recuperar} />
=======
      <Stack.Screen name="Register" component={RegisterScreen} />
>>>>>>> Stashed changes
=======
      <Stack.Screen name="Register" component={RegisterScreen} />
>>>>>>> Stashed changes
    </Stack.Navigator>
  );
}
