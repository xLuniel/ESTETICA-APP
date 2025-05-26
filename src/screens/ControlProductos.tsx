// src/screens/ControlProductos.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert,
  TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator
} from 'react-native';
import { Servicio } from 'src/models/Servicio';
import { registrarServicio, obtenerServicios, eliminarServicio, actualizarServicio } from 'src/services/Firebase/serviciosService';
import { useAuth } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

const categorias = {
  "Servicios de cabello": [
    "Corte de cabello",
    "Peinados",
    "Tintes",
    "Tratamientos capilares",
    "Extensiones",
  ],
  "Servicios de uñas": [
    "Manicura",
    "Pedicura",
    "Diseño de uñas",
  ],
  "Servicios de maquillaje": [
    "Maquillaje facial",
    "Maquillaje de cejas y pestañas",
  ],
  "Servicios de estética": [
    "Depilación",
    "Tratamientos faciales",
    "Tratamientos corporales",
    "Micropigmentación",
  ],
  "Otros servicios": [
    "Asesoría de imagen",
    "Spa de manos y pies",
    "Bronceado",
    "Barbería",
  ],
} as const;

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function ControlProductos() {
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [dias, setDias] = useState<string[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.rol !== 'admin') return;
    cargarServicios();
  }, [user]);

  const cargarServicios = async () => {
    setLoading(true);
    try {
      const data = await obtenerServicios();
      setServicios(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setSubcategoria('');
    setDias([]);
    setEditandoId(null);
  };

  const manejarGuardar = async () => {
    if (!nombre || !descripcion || !precio || !categoria || !subcategoria) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const precioFloat = parseFloat(precio);
    if (isNaN(precioFloat)) {
      Alert.alert('Error', 'El precio debe ser un número válido');
      return;
    }

    const nuevoServicio: Omit<Servicio, 'id'> = {
      nombre,
      descripcion,
      precio: precioFloat,
      categoria,
      subcategoria,
      dias,
    };

    try {
      if (editandoId) {
        await actualizarServicio(editandoId, nuevoServicio);
        Alert.alert('Editado', 'Producto actualizado con éxito');
      } else {
        await registrarServicio(nuevoServicio);
        Alert.alert('Agregado', 'Producto registrado con éxito');
      }
      limpiarFormulario();
      cargarServicios();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el producto');
    }
  };

  const manejarEditar = (servicio: Servicio) => {
    setNombre(servicio.nombre);
    setDescripcion(servicio.descripcion);
    setPrecio(servicio.precio.toString());
    setCategoria(servicio.categoria);
    setSubcategoria(servicio.subcategoria);
    setDias(servicio.dias);
    setEditandoId(servicio.id);
  };

  const manejarEliminar = async (id: string) => {
    Alert.alert('Eliminar', '¿Estás seguro que deseas eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive', onPress: async () => {
          try {
            await eliminarServicio(id);
            Alert.alert('Eliminado', 'Producto eliminado');
            cargarServicios();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el producto');
          }
        }
      }
    ]);
  };

  if (user?.rol !== 'admin') {
    return <View style={styles.center}><Text>No tienes acceso a esta sección.</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.inner}>
            <Text style={styles.title}>{editandoId ? 'Editar Producto' : 'Nuevo Producto'}</Text>
            <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
            <TextInput placeholder="Descripción" style={styles.input} value={descripcion} onChangeText={setDescripcion} multiline />
            <TextInput placeholder="Precio" style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric" />

            <Text style={styles.label}>Categoría:</Text>
            <Picker
              selectedValue={categoria}
              onValueChange={(value) => {
                setCategoria(value);
                setSubcategoria('');
              }}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona una categoría:" value="" />
              {Object.keys(categorias).map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>

            <Text style={styles.label}>Subcategoría:</Text>
            <Picker
              selectedValue={subcategoria}
              onValueChange={setSubcategoria}
              enabled={!!categoria}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona una subcategoría:" value="" />
              {categoria && categorias[categoria as keyof typeof categorias].map((sub) => (
                <Picker.Item key={sub} label={sub} value={sub} />
              ))}
            </Picker>

            <Text style={styles.label}>Días que se ofrece el servicio:</Text>
            {diasSemana.map((dia) => (
              <Checkbox.Item
                key={dia}
                label={dia}
                status={dias.includes(dia) ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (dias.includes(dia)) {
                    setDias(dias.filter(d => d !== dia));
                  } else {
                    setDias([...dias, dia]);
                  }
                }}
              />
            ))}

            <TouchableOpacity style={styles.saveButton} onPress={manejarGuardar}>
              <Text style={styles.saveText}>{editandoId ? 'Guardar Cambios' : 'Registrar Producto'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={limpiarFormulario} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Productos Registrados</Text>
            {loading && <ActivityIndicator size="large" color="#333" />}
          </View>
        }
        data={servicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
            <Text>${item.precio.toFixed(2)}</Text>
            <Text>Categoría: {item.categoria}</Text>
            <Text>Subcategoría: {item.subcategoria}</Text>
            <Text>Días: {Array.isArray(item.dias) ? item.dias.join(', ') : 'No especificado'}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => manejarEditar(item)} style={styles.editButton}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => manejarEliminar(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.inner}
        ListEmptyComponent={!loading ? <Text>No hay productos registrados.</Text> : null}
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
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 10, backgroundColor: '#fff'
  },
  label: { fontWeight: 'bold', marginTop: 10 },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#3a4b57', padding: 14,
    borderRadius: 8, alignItems: 'center', marginBottom: 10
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { alignItems: 'center', marginBottom: 20 },
  cancelText: { color: '#888' },
  subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  itemCard: {
    backgroundColor: '#fff', padding: 12,
    borderRadius: 8, marginBottom: 10,
    borderColor: '#ccc', borderWidth: 1
  },
  itemName: { fontWeight: 'bold', fontSize: 16 },
  actions: { flexDirection: 'row', marginTop: 10 },
  editButton: {
    backgroundColor: '#f0ad4e', padding: 8,
    borderRadius: 6, marginRight: 10
  },
  editText: { color: '#fff', fontWeight: 'bold' },
  deleteButton: {
    backgroundColor: '#d9534f', padding: 8,
    borderRadius: 6
  },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});
