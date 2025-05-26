// src/screens/HomeAdmin.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeAdmin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel del Empleado</Text>
      <Text style={styles.subtitle}>Gestiona servicios, agenda, perfil</Text>
    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginTop: 10, textAlign: 'center' },
});
