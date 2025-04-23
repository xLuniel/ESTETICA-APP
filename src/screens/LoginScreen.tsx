// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

type Role = 'admin' | 'recepcionista' | 'esteticista' | 'usuario'; 

// Definimos las 4 cuentas de prueba
const TEST_USERS: Record<string, { password: string; role: Role }> = {
  'ad1@estetica.com': { password: 'Admin123',       role: 'admin' },
  're2@estetica.com': { password: 'Recep123',       role: 'recepcionista' },
  'es3@estetica.com': { password: 'Estetica123',    role: 'esteticista' },
  'us4@estetica.com': { password: 'Usuario123',     role: 'usuario' },
};

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validación de campos
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa correo y contraseña.');
      return;
    }

    // Buscamos el usuario en nuestro objeto de prueba
    const record = TEST_USERS[email.toLowerCase()];
    if (!record || record.password !== password) {
      Alert.alert('Credenciales inválidas', 'Verifica tu correo y contraseña.');
      return;
    }

    // Si coincide, hacemos signIn con nombre, correo y rol
    signIn({
      name: email.split('@')[0], 
      email,
      role: record.role,
    });

    // Limpiar campos (opcional)
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Ingresar" onPress={handleLogin} />
      
      {/* Instrucciones de prueba */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Cuentas de prueba:</Text>
        <Text>Admin: ad1@estetica.com / Admin123</Text>
        <Text>Recep: re2@estetica.com / Recep123</Text>
        <Text>Esteticista: es3@estetica.com / Estetica123</Text>
        <Text>Usuario: us4@estetica.com / Usuario123</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff0f5'
  },
  title: {
    fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#d4af37'
  },
  input: {
    height: 50, borderColor: '#d4af37', borderWidth: 1,
    borderRadius: 8, marginBottom: 15, paddingHorizontal: 10,
    backgroundColor: '#ffffff'
  },
  footer: {
    marginTop: 30, padding: 10, borderTopWidth: 1, borderTopColor: '#ddd'
  },
  footerTitle: {
    fontWeight: '600', marginBottom: 5, color: '#555'
  }
});
