// src/screens/HomeCliente.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeCliente = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a, Cliente</Text>
      <Text style={styles.subtitle}>Aquí puedes pedir citas, ver tus servicios y editar tu perfil.</Text>
    </View>
  );
};

export default HomeCliente;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginTop: 10, textAlign: 'center' },
});
