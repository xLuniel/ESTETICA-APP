// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { registrarUsuario } from "src/services/Firebase/authService";

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);

  const validarEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmar) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Error', 'Correo no válido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmar) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      await registrarUsuario(email, password, {
        nombre,
        email,
        rol: 'cliente',
        creadoEn: new Date(),
        perfil: {
          telefono: '',
          direccion: '',
          imagen: ''
        }
      });
      Alert.alert('Éxito', 'Usuario registrado');
      //navigation.navigate('Login');
    } catch (error: any) {
      console.log("Error al registrar usuario:", error);
      Alert.alert('Error', error.message || 'No se pudo registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brushes</Text>
      <Image source={require('../../assets/img2.png')} style={styles.image} />
      <Text style={styles.subtitle}>Crear Cuenta</Text>

      <TextInput placeholder="Nombre" style={styles.input} onChangeText={setNombre} value={nombre} />
      <TextInput placeholder="Correo" style={styles.input} onChangeText={setEmail} value={email} keyboardType="email-address" />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} onChangeText={setPassword} value={password} />
      <TextInput placeholder="Confirmar Contraseña" secureTextEntry style={styles.input} onChangeText={setConfirmar} value={confirmar} />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Crear cuenta</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
  buttonDisabled: { backgroundColor: '#a0a0a0' },
  buttonText: { color: 'white', textAlign: 'center' },
  link: { color: '#3a4b57', marginTop: 16 },
  image: { width: 120, height: 120, marginVertical: 20 }
});