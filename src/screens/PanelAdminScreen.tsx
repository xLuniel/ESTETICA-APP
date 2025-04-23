import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PanelAdminScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Panel Administrativo</Text>

      {/* Aquí puedes reemplazar con gráficos y estadísticas reales */}
      <View style={styles.card}>
        <Text style={styles.title}>Ventas del mes</Text>
        <Text style={styles.info}>$5,400</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Citas programadas</Text>
        <Text style={styles.info}>27</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Asistencia empleados</Text>
        <Text style={styles.info}>95%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Comentarios de clientes</Text>
        <Text style={styles.info}>12 nuevos</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff0f5' },
  header: { fontSize: 24, color: '#d4af37', marginBottom: 16, textAlign: 'center' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#333' },
  info: { fontSize: 16, color: '#555', marginTop: 8 },
});
