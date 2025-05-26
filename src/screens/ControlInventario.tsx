// src/screens/ControlInventario.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert,
  TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  registrarProductoInventario,
  obtenerInventario,
  eliminarProductoInventario,
  actualizarProductoInventario
} from 'src/services/Firebase/inventarioService';
import { InventarioItem } from 'src/models/Inventario';

export default function ControlInventario() {
  const { user } = useAuth();
  const [items, setItems] = useState<InventarioItem[]>([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [minimo, setMinimo] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.rol !== 'admin') return;
    fetchItems();
  }, [user]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await obtenerInventario();
      setItems(data as InventarioItem[]);
    } catch {
      Alert.alert('Error', 'No se pudo cargar el inventario');
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setPrecio('');
    setCantidad('');
    setMinimo('');
    setEditandoId(null);
  };

  const handleGuardar = async () => {
    if (!nombre || !precio || !cantidad || !minimo) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const precioFloat = parseFloat(precio);
    const cantInt = parseInt(cantidad, 10);
    const minInt = parseInt(minimo, 10);
    if (isNaN(precioFloat) || isNaN(cantInt) || isNaN(minInt)) {
      Alert.alert('Error', 'Precio o cantidad inválidos');
      return;
    }

    const nuevoItem: Omit<InventarioItem, 'id'> = {
      nombre,
      precio: precioFloat,
      cantidad: cantInt,
      minimo: minInt,
      fechaActualizacion: new Date()
    };
    try {
      if (editandoId) {
        await actualizarProductoInventario(editandoId, nuevoItem);
        Alert.alert('Editado', 'Ítem de inventario actualizado');
      } else {
        await registrarProductoInventario(nuevoItem);
        Alert.alert('Agregado', 'Ítem de inventario agregado');
      }
      limpiarFormulario();
      fetchItems();
    } catch {
      Alert.alert('Error', 'No se pudo guardar el ítem');
    }
  };

  const handleEditar = (item: InventarioItem) => {
    setNombre(item.nombre);
    setPrecio(item.precio.toString());
    setCantidad(item.cantidad.toString());
    setMinimo(item.minimo.toString());
    setEditandoId(item.id);
  };

  const handleEliminar = (id: string) => {
    Alert.alert(
      'Eliminar',
      '¿Seguro que deseas eliminar este ítem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            try {
              await eliminarProductoInventario(id);
              Alert.alert('Eliminado', 'Ítem eliminado');
              fetchItems();
            } catch {
              Alert.alert('Error', 'No se pudo eliminar el ítem');
            }
          }
        }
      ]
    );
  };

  if (user?.rol !== 'admin') {
    return (
      <View style={styles.center}>
        <Text>No tienes permiso para acceder.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.inner}>
            <Text style={styles.title}>{editandoId ? 'Editar Ítem' : 'Nuevo Ítem'}</Text>
            <TextInput
              placeholder="Nombre del Producto"
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              placeholder="Precio"
              style={styles.input}
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
            <TextInput
              placeholder="Cantidad"
              style={styles.input}
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />
            <TextInput
              placeholder="Cantidad Mínima"
              style={styles.input}
              keyboardType="numeric"
              value={minimo}
              onChangeText={setMinimo}
            />
            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
              <Text style={styles.buttonText}>{editandoId ? 'Guardar Cambios' : 'Agregar Ítem'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={limpiarFormulario}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Inventario Actual</Text>
            {loading && <ActivityIndicator size="large" color="#333" />}
          </View>
        }
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>Nombre: {item.nombre}</Text>
            <Text>Precio: ${item.precio.toFixed(2)}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Text>Mínimo: {item.minimo}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditar(item)} style={styles.editBtn}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEliminar(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.inner}
        ListEmptyComponent={!loading ? <Text>No hay ítems en inventario.</Text> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  inner: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#3a4b57',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  cancel: { color: '#888', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  itemCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  itemName: { fontWeight: 'bold', fontSize: 16 },
  actions: { flexDirection: 'row', marginTop: 10 },
  editBtn: {
    backgroundColor: '#f0ad4e',
    padding: 8,
    borderRadius: 6,
    marginRight: 10
  },
  editText: { color: '#fff', fontWeight: 'bold' },
  deleteBtn: {
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 6
  },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});
