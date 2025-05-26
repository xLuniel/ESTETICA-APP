// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useAuth } from 'src/context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // La redirección a la pantalla correspondiente ya la controla App.tsx
    } catch (error) {
      Alert.alert('Error', 'Correo o contraseña incorrecta');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brushes</Text>
      <Image source={require('../../assets/img1.png')} style={styles.image} />
      <Text style={styles.subtitle}>Inicio de Sesión</Text>

      <TextInput placeholder="Correo" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} onChangeText={setPassword} value={password} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', backgroundColor: '#f5f9fc', flex: 1 },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
  subtitle: { fontSize: 18, marginVertical: 20 },
  input: { width: '100%', padding: 12, marginVertical: 8, borderWidth: 1, borderRadius: 8 },
  button: { backgroundColor: '#3a4b57', padding: 14, borderRadius: 8, width: '100%', marginTop: 12 },
  buttonText: { color: 'white', textAlign: 'center' },
  link: { color: '#3a4b57', marginTop: 16 },
  image: { width: 120, height: 120, marginVertical: 20 }
});