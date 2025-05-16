/*import React from 'react';
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
});*/


// src/screens/EmpleadosScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { registrarUsuario } from 'src/services/Firebase/authService';
import { obtenerUsuarios } from 'src/services/Firebase/UsuariosService';
import { Usuario, RolUsuario } from 'src/models/Usuario';
import { eliminarUsuario } from 'src/services/Firebase/UsuariosService';

export default function EmpleadosScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<RolUsuario>('empleado');
  const [empleados, setEmpleados] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarEmpleados = async () => {
    setLoading(true);
    try {
      const todos = await obtenerUsuarios();
      const soloEmpleados = todos.filter(u => u.rol === 'empleado' || u.rol === 'admin');
      setEmpleados(soloEmpleados);
    } catch (error) {
      console.error('Error cargando empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const manejarRegistro = async () => {
    if (!nombre || !email || !password) {
      return Alert.alert('Campos incompletos', 'Completa todos los campos');
    }

    try {
      await registrarUsuario(email, password, {
        nombre,
        email,
        rol,
        creadoEn: new Date(),
        perfil: {
          telefono: '',
          direccion: '',
          imagen: '',
        },
      });
      Alert.alert('Éxito', 'Empleado registrado correctamente');
      setNombre('');
      setEmail('');
      setPassword('');
      setRol('empleado');
      cargarEmpleados();
    } catch (error: any) {
      Alert.alert('Error al registrar', error.message);
    }
  };

  const manejarEliminar = (uid: string) => {
  Alert.alert(
    "Eliminar empleado",
    "¿Estás seguro de que deseas eliminar este empleado?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await eliminarUsuario(uid);
            Alert.alert("Empleado eliminado");
            cargarEmpleados();
          } catch (error) {
            Alert.alert("Error al eliminar", (error as Error).message);
          }
        },
      },
    ]
  );
};


  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Empleado</Text>

      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Correo" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      <View style={styles.rolContainer}>
        <TouchableOpacity onPress={() => setRol('empleado')} style={[styles.rolButton, rol === 'empleado' && styles.rolSelected]}>
          <Text style={styles.rolText}>Empleado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRol('admin')} style={[styles.rolButton, rol === 'admin' && styles.rolSelected]}>
          <Text style={styles.rolText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registrarButton} onPress={manejarRegistro}>
        <Text style={styles.registrarButtonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Lista de Empleados</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={empleados}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View style={styles.empleadoItem}>
              <Text>{item.nombre} - {item.email} ({item.rol})</Text>
            <TouchableOpacity onPress={() => manejarEliminar(item.uid)} style={styles.eliminarBtn}>
              <Text style={styles.eliminarText}>Eliminar</Text>
            </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 10,
  },
  rolContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rolButton: {
    flex: 1, padding: 10, backgroundColor: '#eee',
    borderRadius: 8, marginHorizontal: 5, alignItems: 'center',
  },
  rolSelected: { backgroundColor: '##007BFF' },
  rolText: { color: '#000' },
  registrarButton: {
    backgroundColor: '#000', padding: 12,
    borderRadius: 10, alignItems: 'center', marginBottom: 20,
  },
  registrarButtonText: { color: '#fff', fontSize: 16 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  empleadoItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },

  eliminarBtn: {
  backgroundColor: '#ff4444',
  padding: 6,
  borderRadius: 6,
  marginTop: 4,
  alignSelf: 'flex-start',
},
eliminarText: {
  color: '#fff',
  fontWeight: 'bold',
},

});

