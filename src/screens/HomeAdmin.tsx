// src/screens/HomeAdmin.tsx
/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeAdmin() {
  const navigation = useNavigation() as any;

  const opciones = [
    { label: 'Control de Empleados', screen: 'Empleados' },
    { label: 'Control de Clientes', screen: 'Clientes' },
    { label: 'Control de Productos', screen: 'Productos' },
    { label: 'Control de Cortes y Más', screen: 'Cortes' },
    { label: 'Control de Inventario', screen: 'Inventario' },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menú</Text>
      {opciones.map((opcion, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => navigation.navigate(opcion.screen)}>
          <Text style={styles.buttonText}>{opcion.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 20 },
  button: { backgroundColor: '#000', padding: 14, borderRadius: 12, width: '90%', marginVertical: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontFamily: 'sans-serif-medium' },
});*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AdminTabRoutes = 'Inicio' | 'Panel' | 'Empleados' | 'Clientes' | 'Perfil' | 'Productos' | 'Cortes' | 'Inventario';

const opciones: { label: string; screen: AdminTabRoutes }[] = [
  { label: 'Control de Empleados', screen: 'Empleados' },
  { label: 'Control de Clientes', screen: 'Clientes' },
  { label: 'Control de Productos', screen: 'Productos' },
  { label: 'Control de Cortes y Más', screen: 'Cortes' },
  { label: 'Control de Inventario', screen: 'Inventario' },
];

export default function HomeAdmin() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menú</Text>
      {opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(opcion.screen)}
        >
          <Text style={styles.buttonText}>{opcion.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 12,
    width: '90%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },
});
