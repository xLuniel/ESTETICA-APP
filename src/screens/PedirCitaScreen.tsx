// src/screens/PedirCitaScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Menu } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { servicios, empleados } from '../services/mockData';
import { Servicio, Empleado } from '../types';
import { datosMock, getDatosClientes, setDatosClientes } from '../services/mockData';



export default function PedirCitaScreen() {
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('');
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);

  // 1. Cuando pulso un día, recopilo todas las horas de esteticistas
  const onDayPress = (day: { dateString: string }) => {
    console.log('Fecha seleccionada:', day.dateString);
    setFecha(day.dateString);
    const horas = empleados
      .filter(e => e.rol === 'esteticista')
      .flatMap(e => e.disponibilidad[day.dateString] || []);
    const uniq = Array.from(new Set(horas)).sort();
    setHorasDisponibles(uniq);
    // Reseteo selección previa
    setHora('');
    setEmpleadoSeleccionado(null);
  };

  // 2. Al seleccionar hora, asigno el primer esteticista libre
  const onSelectHora = (h: string) => {
    setHora(h);
    const disponibles = empleados.filter(e => e.disponibilidad[fecha]?.includes(h));
    if (disponibles.length) {
      setEmpleadoSeleccionado(disponibles[0]);
    } else {
      Alert.alert('No hay esteticistas', 'Elige otra hora o fecha');
      setEmpleadoSeleccionado(null);
    }
  };

  // 3. Intento reservar
  const handleBook = async () => {
    if (!servicio || !fecha || !hora || !empleadoSeleccionado) {
      Alert.alert('Faltan datos', 'Selecciona servicio, fecha, hora y esteticista');
      return;
    }
  
    // Simulación de reserva
    Alert.alert(
      'Cita agendada',
      `Servicio: ${servicio.nombre}\nFecha: ${fecha}\nHora: ${hora}\nEsteticista: ${empleadoSeleccionado.nombre}`
    );
  
    // Actualizar historial del cliente
    const clienteId = '1'; // Obtener cliente dinámicamente
    const clientes = await getDatosClientes();
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
      cliente.historialServicios.push(servicio.nombre);
      await setDatosClientes(clientes);
    }
  
    // Limpieza de estados
    setServicio(null);
    setFecha('');
    setHora('');
    setEmpleadoSeleccionado(null);
  };
  
  
  // 4. Determinar si el botón debe estar activo
  const canBook = !!(servicio && fecha && hora && empleadoSeleccionado);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineLarge" style={styles.header}>
        Solicitar Cita
      </Text>

      {/* Selector de Servicio */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.selector}
          >
            {servicio ? servicio.nombre : 'Elige un Servicio'}
          </Button>
        }
      >
        {servicios.map(s => (
          <Menu.Item
            key={s.id}
            onPress={() => {
              setServicio(s);
              setMenuVisible(false);
            }}
            title={`${s.nombre} (${s.duracionMin}min - $${s.precio})`}
          />
        ))}
      </Menu>

      {/* Calendario */}
      <Text style={styles.label}>Selecciona Fecha:</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={fecha ? { [fecha]: { selected: true } } : {}}
      />

      {/* Horas disponibles */}
      {horasDisponibles.length > 0 && (
        <>
          <Text style={styles.label}>Selecciona Hora:</Text>
          <View style={styles.horasContainer}>
            {horasDisponibles.map(h => (
              <Button
                key={h}
                mode={h === hora ? 'contained' : 'outlined'}
                onPress={() => onSelectHora(h)}
                style={styles.horaBtn}
              >
                {h}
              </Button>
            ))}
          </View>
        </>
      )}

      {/* Esteticista asignado */}
      {empleadoSeleccionado && (
        <Text style={styles.info}>
          Esteticista: {empleadoSeleccionado.nombre}
        </Text>
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
});
