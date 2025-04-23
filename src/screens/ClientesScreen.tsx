import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatosClientes } from '../services/mockData'; // Importa la función para obtener datos

type Cliente = {
  id: string;
  nombre: string;
  historialServicios: string[];
  notas: string;
};

export default function ClientesScreen() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
  
    useEffect(() => {
      const loadClientes = async () => {
        const loadedClientes = await getDatosClientes();
        setClientes(loadedClientes);
      };
  
      loadClientes();
    }, []);
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Historial</Text>
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.info}>Historial: {item.historialServicios.join(', ')}</Text>
              {item.notas ? <Text style={styles.info}>Notas: {item.notas}</Text> : null}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No hay clientes registrados.</Text>}
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