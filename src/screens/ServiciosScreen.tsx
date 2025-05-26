//src/screen/ServiciosScreen.ts
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,
  ActivityIndicator, TouchableOpacity, FlatList,
  SafeAreaView, KeyboardAvoidingView,  Platform,
  TouchableWithoutFeedback, Keyboard,
 } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import { registrarServicio, eliminarServicio, obtenerServicios } from 'src/services/Firebase/serviciosService';
import { Servicio } from 'src/models/Servicio';

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

type CategoriaKey = keyof typeof categorias;

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const RegistrarServicioScreen = () => {
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState<CategoriaKey | ''>('');
  const [subcategoria, setSubcategoria] = useState('');
  const [servicioRegistrado, setServicioRegistrado] = useState<Servicio | null>(null);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);

    const toggleDia = (dia: string) => {
  if (diasSeleccionados.includes(dia)) {
    setDiasSeleccionados(diasSeleccionados.filter(d => d !== dia));
  } else {
    setDiasSeleccionados([...diasSeleccionados, dia]);
  }
};

  const handleRegistrar = async () => {
    if (!descripcion || !precio || !categoria || !subcategoria) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const precioFloat = parseFloat(precio);
    if (isNaN(precioFloat)) {
      Alert.alert('Error', 'El precio debe ser un número válido.');
      return;
    }

    const nuevoServicio: Omit<Servicio, 'id'> = {
      nombre: subcategoria,
      descripcion,
      precio: precioFloat,
      categoria,
      subcategoria,
      dias: diasSeleccionados,
    };

    try {
      const id = await registrarServicio(nuevoServicio);
      const servicioConId: Servicio = { id, ...nuevoServicio };
      setServicios([...servicios, servicioConId]);
      setServicioRegistrado(servicioConId);
      Alert.alert('Éxito', `Servicio registrado con ID: ${id}`);
      setDescripcion('');
      setPrecio('');
      setCategoria('');
      setSubcategoria('');
      setDiasSeleccionados([]);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al registrar el servicio.');
      console.error(error);
    }
  };

  const handleEliminar = async (id: string) => {
    try {
    await eliminarServicio(id);
    setServicios(servicios.filter((servicio) => servicio.id !== id));
    if (servicioRegistrado?.id === id) {
      setServicioRegistrado(null);
    }
  } catch (error) {
    Alert.alert('Error', 'No se pudo eliminar el servicio.');
  }
};

useEffect(() => {
    const fetchServicios = async () => {
        setLoading(true);
      try {
        const datos = await obtenerServicios();
        setServicios(datos);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <FlatList
     ListHeaderComponent= {
    <>    
      <Text style={styles.title}>Registrar Servicio</Text>

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
        style={styles.picker}
        enabled={categoria !== ''}
      >
        <Picker.Item label="Selecciona una subcategoría:" value="" />
        {categoria && categorias[categoria].map((subcat) => (
          <Picker.Item key={subcat} label={subcat} value={subcat} />
        ))}
      </Picker>

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Ej: 150.00"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Días que brinda el servicio:</Text>
      <View style={styles.diasContainer}>
          {diasSemana.map((dia) => (
            <View key={dia} style={styles.diaItem}>
              <Checkbox.Item
              key={dia}
              label={dia}
              status={diasSeleccionados.includes(dia) ? 'checked' : 'unchecked'}
              onPress={() => toggleDia(dia)}
              position="leading" // Muestra la casilla a la izquierda
              />
        </View>
      ))}
   </View>

       <Button title="Registrar Servicio" onPress={handleRegistrar} />
 
     {servicioRegistrado && (
        <View style={styles.servicioRegistrado}>
          <Text style={styles.label}>Último servicio registrado:</Text>
          <Text>Descripción: {servicioRegistrado.descripcion}</Text>
          <Text>Precio: ${servicioRegistrado.precio}</Text>
          <Text>Categoría: {servicioRegistrado.categoria}</Text>
          <Text>Subcategoría: {servicioRegistrado.subcategoria}</Text>
        </View>
      )}

  <Text style={styles.title}>Servicios Registrados</Text>
  {loading && <ActivityIndicator size="large" color="#333" />}
  </>  
} 
      data={loading ? [] : servicios}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.servicioItem}>
          <Text style={styles.bold}>{item.subcategoria}</Text>
              <Text>Descripción: {item.descripcion}</Text>
              <Text>Precio: ${item.precio.toFixed(2)}</Text>
              <Text>Categoría: {item.categoria}</Text>
              <Text>Días de servicio: {Array.isArray(item.dias) ? item.dias.join(', ') : 'no especificado'}</Text>
              <TouchableOpacity onPress={() => handleEliminar(item.id)} style={styles.borrar}>
                <Text style={styles.borrarTexto}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    contentContainerStyle={styles.container}
    />
     </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    gap: 5,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 5,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  resumen: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#eaf3ff',
    borderRadius: 10,
    borderColor: '#d4d4d4',
    borderWidth: 1,
  },
  resumenTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#2c3e50',
  },
  bold: {
    fontWeight: 'bold',
  },

deleteButton: {
    marginTop: 12,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  borrar: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  borrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  servicioRegistrado: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#e0ffe0',
    borderRadius: 5,
  },
  servicioItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  diasContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 8,
},
diaItem: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '45%',
  marginBottom: 5,
},

});
export default RegistrarServicioScreen;
