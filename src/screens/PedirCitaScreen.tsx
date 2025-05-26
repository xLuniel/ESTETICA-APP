// src/screens/PedirCitaScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Menu } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { Servicio } from 'src/models/Servicio';
import { obtenerServicios} from 'src/services/Firebase/serviciosService'
import { Usuario } from 'src/models/Usuario';
import { Cita } from 'src/models/Cita';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from 'src/services/firebaseConfig';
import { obtenerDisponibilidadEmpleado } from 'src/services/Firebase/disponibilidadService';
import { obtenerUsuarioPorId } from 'src/services/Firebase/UsuariosService';
import { guardarCita } from 'src/services/Firebase/citasService';
import { DisponibilidadEmpleado } from 'src/models/Disponibilidad';

export default function PedirCitaScreen() {
  const [disponibilidades, setDisponibilidades] = useState<Map<string, DisponibilidadEmpleado>>(new Map());
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [empleados, setEmpleados] = useState<Usuario[]>([]);
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fecha, setFecha] = useState<string>('');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Usuario | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [subcategorias, setSubcategorias] = useState<string[]>([]);
  const [categoriaMenuVisible, setCategoriaMenuVisible] = useState(false);
  const [subcategoriaMenuVisible, setSubcategoriaMenuVisible] = useState(false);


useEffect(() => {
  const cargarDatos = async () => {
    const usuariosSnapshot = await getDocs(collection(db, 'usuarios'));
    const empleadosObtenidos: Usuario[] = [];

    usuariosSnapshot.forEach(doc => {
      const data = doc.data() as Usuario;
        if (data.rol === 'empleado') {
          empleadosObtenidos.push({ ...data, uid: doc.id });
        }
      });
    setEmpleados(empleadosObtenidos);

    const serviciosSnapshot = await getDocs(collection(db, 'servicios'));
    const serviciosObtenidos: Servicio[] = [];
    serviciosSnapshot.forEach(doc => {
      const data = doc.data() as Servicio;
      serviciosObtenidos.push({ ...data, id: doc.id });
    });
    setServicios(serviciosObtenidos);
    const categoriasUnicas = Array.from(new Set(serviciosObtenidos.map(s => s.categoria)));//se agrego
     setCategorias(categoriasUnicas);

  };

  cargarDatos();
}, []);

useEffect(() => {
  const cargarDisponibilidades = async () => {
    const mapa = new Map<string, any>();
    for (const emp of empleados) {
      const disponibilidad = await obtenerDisponibilidadEmpleado(emp.uid);
      if (disponibilidad) {
        mapa.set(emp.uid, disponibilidad);
      }
    }
    setDisponibilidades(mapa);
  };

  if (empleados.length > 0) {
    cargarDisponibilidades();
  }
}, [empleados]);

useEffect(() => { //se agrego
  if (categoriaSeleccionada) {
    const subs = servicios
      .filter(s => s.categoria === categoriaSeleccionada)
      .map(s => s.subcategoria);
    setSubcategorias(Array.from(new Set(subs)));
  } else {
    setSubcategorias([]);
    setSubcategoriaSeleccionada(null);
  }
}, [categoriaSeleccionada, servicios]);
  
  const serviciosFiltrados = servicios.filter(
  s => s.categoria === categoriaSeleccionada && s.subcategoria === subcategoriaSeleccionada
);
  

  const onDayPress = (day: { dateString: string }) => {
    setFecha(day.dateString);
    setEmpleadoSeleccionado(null);

    const diaSemana = new Date(day.dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
    }).toLowerCase();

    for (const emp of empleados) {
      const disponibilidad = disponibilidades.get(emp.uid);
      if (!disponibilidad || !disponibilidad.diasDisponibles.includes(diaSemana)) continue;
      
      if (disponibilidad.horarios.some(h => h.dia === diaSemana)) {
        setEmpleadoSeleccionado(emp);
        break;
      }
    }
  };

  const handleBook = async () => {
    if (!servicio || !fecha || !empleadoSeleccionado) {
      Alert.alert('Faltan datos', 'Selecciona servicio, fecha');
      return;
    }

    const cliente = auth.currentUser;
    if (!cliente) {
      Alert.alert('Error', 'No has iniciado sesión');
      return;
    }

    const clienteId = cliente.uid;
    const usuario = await obtenerUsuarioPorId(clienteId);

    if (!usuario || usuario.rol !== 'cliente') {
      Alert.alert('Permiso denegado', 'Solo los clientes pueden reservar citas');
      return;
    }

    try {
      const nuevaCita: Cita = {
        clienteId,
        empleadoId: empleadoSeleccionado.uid,
        servicioId: servicio.id,
        fecha,
        estado: 'pendiente',
      };

      await guardarCita(nuevaCita);

      Alert.alert(
        'Cita agendada',
        `Servicio: ${servicio.nombre}\nFecha: ${fecha}\nEmpleado: ${empleadoSeleccionado.nombre}`    
        );

      // Reset
      setServicio(null);
      setFecha('');
      setEmpleadoSeleccionado(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la cita');
    }
  };

  const canBook = !!(servicio && fecha && empleadoSeleccionado);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineLarge" style={styles.header}>Solicitar Cita</Text>

{/* Selector de Categoría */}
<Text style={styles.label}>Selecciona Categoría:</Text>
<Menu
  visible={categoriaMenuVisible}
  onDismiss={() => setCategoriaMenuVisible(false)}
  anchor={
    <Button mode="outlined" onPress={() => setCategoriaMenuVisible(true)} style={styles.selector}>
      {categoriaSeleccionada || 'Elegir Categoría'}
    </Button>
  }
>
  {categorias.map(cat => (
    <Menu.Item key={cat} onPress={() => {
      setCategoriaSeleccionada(cat);
      setCategoriaMenuVisible(false);
    }} title={cat} />
  ))}
</Menu>

{/* Selector de Subcategoría */}
{categoriaSeleccionada && (
  <>
    <Text style={styles.label}>Selecciona Subcategoría:</Text>
    <Menu
      visible={subcategoriaMenuVisible}
      onDismiss={() => setSubcategoriaMenuVisible(false)}
      anchor={
        <Button mode="outlined" onPress={() => setSubcategoriaMenuVisible(true)} style={styles.selector}>
          {subcategoriaSeleccionada || 'Elegir Subcategoría'}
        </Button>
      }
    >
      {subcategorias.map(sub => (
        <Menu.Item key={sub} onPress={() => {
          setSubcategoriaSeleccionada(sub);
          setSubcategoriaMenuVisible(false);
        }} title={sub} />
      ))}
    </Menu>
  </>
)}

      {/* Selector de servicio */}
      {categoriaSeleccionada && subcategoriaSeleccionada && (
  <>
    <Text style={styles.label}>Selecciona Servicio:</Text>
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.selector}>
          {servicio ? servicio.nombre : 'Elige un Servicio'}
        </Button>
      }
    >
      {serviciosFiltrados.map(s => (
        <Menu.Item
          key={s.id}
          onPress={() => {
            setServicio(s);
            setMenuVisible(false);
          }}
          title={`${s.nombre} ($${s.precio}) - ${s.descripcion}`}
        />
      ))}
    </Menu>
  </>
)}

      {/* Fecha */}
      <Text style={styles.label}>Selecciona Fecha:</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={fecha ? { [fecha]: { selected: true } } : {}}
      />

      {/* Empleado asignado */}
      {empleadoSeleccionado && (
        <Text style={styles.info}>Esteticista: {empleadoSeleccionado.nombre}</Text>
      )}

      {/* Botón Reservar */}
      <Button
        mode="contained"
        onPress={handleBook}
        disabled={!canBook}
        style={[
          styles.bookBtn,
          { backgroundColor: canBook ? '#d4af37' : 'gray' },
        ]}
      >
        Reservar Cita
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff0f5' },
  header: { textAlign: 'center', marginBottom: 24, color: '#d4af37' },
  selector: { marginBottom: 16 },
  label: { marginTop: 16, marginBottom: 8, fontWeight: '600' },
  horasContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  horaBtn: { margin: 4 },
  info: { marginTop: 12, fontStyle: 'italic', color: '#555' },
  bookBtn: { marginTop: 24, padding: 8 },
  boton: { marginTop: 24,},
});