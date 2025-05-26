// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import PedirCitaScreen from '../screens/PedirCitaScreen';
import PanelAdminScreen from '../screens/PanelAdminScreen';

type MenuItem = {
  label: string;
  screen: string;
  icon: string;
};

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="menu"
          size={24}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
      headerRight: () => (
        <IconButton icon="logout" size={24} onPress={signOut} />
      ),
      headerTitle: `Hola, ${user?.name}`,
      headerTitleStyle: { color: '#d4af37' },
      headerStyle: { backgroundColor: '#fff0f5' },
    });
  }, [navigation, signOut, user]);

  const allItems: Record<string, MenuItem> = {
    Agenda:    { label: 'Agenda',    screen: 'Agenda',             icon: 'calendar' },
    Clientes:  { label: 'Clientes',  screen: 'Clientes',           icon: 'account' },
    Empleados: { label: 'Empleados', screen: 'Empleados',          icon: 'account-group' },
    Servicios: { label: 'Servicios', screen: 'Servicios',          icon: 'content-cut' },
    'Pedir Cita': { label: 'Pedir Cita', screen: 'PedirCita', icon: 'calendar-plus' },
    'Panel Admin': { label: 'Panel Admin', screen: 'PanelAdministrativo', icon: 'chart-bar' },
  };

  let menuKeys: string[] = [];
  switch (user?.role) {
    case 'admin':
      menuKeys = ['Agenda','Clientes','Empleados','Servicios','Pedir Cita','Panel Admin'];
      break;
    case 'recepcionista':
      menuKeys = ['Agenda','Clientes','Empleados','Servicios','Pedir Cita'];
      break;
    case 'esteticista':
      menuKeys = ['Agenda','Clientes','Servicios','Pedir Cita'];
      break;
    default:
      menuKeys = ['Servicios','Pedir Cita'];
  }

  const menuItems = menuKeys.map(key => allItems[key]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Centro de Estética</Text>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => navigation.navigate(item.screen as never)}
            style={styles.card}
          >
            <IconButton icon={item.icon as any} size={32} />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff0f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    color: '#d4af37',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
