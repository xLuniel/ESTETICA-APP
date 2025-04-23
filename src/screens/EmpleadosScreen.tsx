import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

type Empleado = {
  id: string;
  nombre: string;
  rol: 'esteticista' | 'recepcionista' | 'admin' | 'usuario'; 
  disponibilidad: string[];
};

const datosMock: Empleado[] = [
  { id: '1', nombre: 'Ana Pérez', rol: 'esteticista', disponibilidad: ['Lunes', 'Miércoles'] },
  { id: '2', nombre: 'Carlos Gómez', rol: 'esteticista', disponibilidad: ['Martes', 'Jueves'] },
  { id: '3', nombre: 'Laura Martínez', rol: 'esteticista', disponibilidad: ['Lunes', 'Viernes'] },
  { id: '4', nombre: 'Sofía López', rol: 'recepcionista', disponibilidad: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] },
  { id: '5', nombre: 'Miguel Torres', rol: 'admin', disponibilidad: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] },
  { id: '6', nombre: 'Elena Ramírez', rol: 'esteticista', disponibilidad: ['Miércoles', 'Viernes'] },
  { id: '7', nombre: 'Javier Sánchez', rol: 'esteticista', disponibilidad: ['Lunes', 'Jueves'] },
  { id: '8', nombre: 'María Fernández', rol: 'esteticista', disponibilidad: ['Martes', 'Viernes'] },
  { id: '9', nombre: 'Pedro López', rol: 'recepcionista', disponibilidad: ['Lunes', 'Miércoles', 'Viernes'] },
  { id: '10', nombre: 'Lucía García', rol: 'admin', disponibilidad: ['Martes', 'Jueves'] },
  // …añade más
];

export default function EmpleadosScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Empleados</Text>
      <FlatList
        data={datosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.info}>Rol: {item.rol}</Text>
            <Text style={styles.info}>Disponible: {item.disponibilidad.join(', ')}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay empleados registrados.</Text>}
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
