// src/navigation/AppDrawer.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';

// Importa tus pantallas
import HomeScreen from '../screens/HomeScreen';                             // Siempre
import CalendarScreen from '../screens/CalendarScreen';                     // admin + empleados
import EmpleadosScreen from '../screens/EmpleadosScreen';                   // admin + empleados
import ClientesScreen from '../screens/ClientesScreen';                     // admin + empleados
import ServiciosScreen from '../screens/ServiciosScreen';                   // todos
import RequestAppointmentScreen from '../screens/PedirCitaScreen';          // todos usuarios
import PanelAdminScreen from '../screens/PanelAdminScreen';                 // solo admin
import Prueba from '../screens/Prueba';                                     // solo admin

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const { user } = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#fff0f5' },
        headerTintColor: '#d4af37',
      }}
    >
      {/* Todos los usuarios ven esta opción */}
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />

      {/* Solo Admin y Empleados ven la Agenda */}
      {(user?.role === 'admin' || user?.role === 'recepcionista') && (
        <Drawer.Screen
          name="Agenda"
          component={CalendarScreen}
          options={{ title: 'Agenda de Citas' }}
        />
      )}

      {/* Solo Admin y Empleados ven Gestión de Clientes */}
      {(user?.role === 'admin' || user?.role === 'esteticista' || user?.role === 'recepcionista') && (
        <Drawer.Screen
          name="Clientes"
          component={ClientesScreen}
          options={{ title: 'Clientes' }}
        />
      )}

      {/* Admin y Empleados ven Gestión de Empleados */}
      {(user?.role === 'admin' || user?.role === 'recepcionista') && (
        <Drawer.Screen
          name="Empleados"
          component={EmpleadosScreen}
          options={{ title: 'Empleados' }}
        />
      )}

      {/* Todos los usuarios ven Servicios */}
      <Drawer.Screen
        name="Servicios"
        component={ServiciosScreen}
        options={{ title: 'Servicios' }}
      />

      {/* Todos los usuarios ven Pedir Cita */}
      <Drawer.Screen
        name="PedirCita"
        component={RequestAppointmentScreen}
        options={{ title: 'Pedir Cita' }}
      />

      {/* Solo Admin ve Panel Administrativo */}
      {user?.role === 'admin' && (
      <>
        <Drawer.Screen
          name="PanelAdministrativo"
          component={PanelAdminScreen}
          options={{ title: 'Panel Administrativo' }}
        />
        <Drawer.Screen
          name="Prueba"
          component={Prueba}
          options={{ title: 'Prueba' }}
        />
      </>
    )}
    </Drawer.Navigator>
  );
}
