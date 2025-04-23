import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Servicio = {
  id: string;
  nombre: string;
  precio: number;
  duracionMin: number;
};

const datosMock: Servicio[] = [
    { id: 's1', nombre: 'Facial Completo', duracionMin: 60, precio: 50 },
    { id: 's2', nombre: 'Masaje Relajante', duracionMin: 45, precio: 40 },
    { id: 's3', nombre: 'Exfoliación Corporal', duracionMin: 30, precio: 35 },
    { id: 's4', nombre: 'Depilación con Cera', duracionMin: 20, precio: 25 },
    { id: 's5', nombre: 'Manicura y Pedicura', duracionMin: 50, precio: 45 },
    { id: 's6', nombre: 'Corte de Cabello Masculino', duracionMin: 30, precio: 30 },
    { id: 's7', nombre: 'Corte de Cabello Femenino', duracionMin: 45, precio: 35 },
    { id: 's8', nombre: 'Corte de Cabello Infantil', duracionMin: 25, precio: 20 },
    { id: 's9', nombre: 'Peinado para Evento', duracionMin: 60, precio: 55 },
    { id: 's10', nombre: 'Coloración de Cabello', duracionMin: 90, precio: 70 },
  // …añade más
];

export default function ServiciosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Servicios</Text>
      <FlatList
        data={datosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.info}>Precio: ${item.precio}</Text>
            <Text style={styles.info}>Duración: {item.duracionMin} min</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay servicios disponibles.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff0f5', padding: 16 },
  header: { fontSize: 24, color: '#d4af37', marginBottom: 12, textAlign: 'center' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#333' },
  info: { fontSize: 14, color: '#555', marginTop: 4 },
  empty: { textAlign: 'center', color: '#777', marginTop: 20 },
});
