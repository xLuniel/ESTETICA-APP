// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeCliente from '../screens/HomeCliente';
import HomeEmpleado from '../screens/HomeEmpleado';
import HomeAdmin from '../screens/HomeAdmin';

import PedirCitaScreen from '../screens/PedirCitaScreen';
import ServiciosScreen from '../screens/ServiciosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ClientesScreen from '../screens/ClientesScreen';
import EmpleadosScreen from '../screens/EmpleadosScreen';
import PanelAdminScreen from '../screens/PanelAdminScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();

type Props = {
  userRole: 'cliente' | 'empleado' | 'admin';
};

const commonOptions = (iconName: keyof typeof Ionicons.glyphMap) => ({
  tabBarIcon: ({ color, size }: any) => (
    <Ionicons name={iconName} size={size} color={color} />
  ),
  headerShown: false,
});

export default function MainNavigator({ userRole }: Props) {
  switch (userRole) {
    case 'cliente':
      return (
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={HomeCliente} options={commonOptions('home-outline')} />
          <Tab.Screen name="Citas" component={PedirCitaScreen} options={commonOptions('calendar-outline')} />
          <Tab.Screen name="Perfil" component={PerfilScreen} options={commonOptions('person-outline')} />
        </Tab.Navigator>
      );

    case 'empleado':
      return (
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={HomeEmpleado} options={commonOptions('briefcase-outline')} />
          <Tab.Screen name="Servicios" component={ServiciosScreen} options={commonOptions('cut-outline')} />
          <Tab.Screen name="Agenda" component={CalendarScreen} options={commonOptions('time-outline')} />
          <Tab.Screen name="Perfil" component={PerfilScreen} options={commonOptions('person-outline')} />
        </Tab.Navigator>
      );

    case 'admin':
      return (
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={HomeAdmin} options={commonOptions('settings-outline')} />
          <Tab.Screen name="Panel" component={PanelAdminScreen} options={commonOptions('grid-outline')} />
          <Tab.Screen name="Empleados" component={EmpleadosScreen} options={commonOptions('people-outline')} />
          <Tab.Screen name="Clientes" component={ClientesScreen} options={commonOptions('person-outline')} />
          <Tab.Screen name="Perfil" component={PerfilScreen} options={commonOptions('person-outline')} />
        </Tab.Navigator>
      );

    default:
      return null;
  }
}
