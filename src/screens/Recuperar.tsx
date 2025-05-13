// src/screens/ResetPasswordScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = () => {
    if (!email || !newPassword) {
      Alert.alert('Error', 'Por favor, rellena todos los campos.');
      return;
    }

    // Agregar logica para reestablecer contraseña
    setSuccess(true);

    // Limpiar campos
    setEmail('');
    setNewPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>

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
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Button title="Reestablecer contraseña" onPress={handleReset} />

      {success && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            ✅ Tu contraseña ha sido reestablecida exitosamente.
          </Text>
        </View>
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Regresar" onPress={() => navigation.goBack()} />
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
  successBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#e0ffe0',
    borderRadius: 8,
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  successText: {
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
  }
});
