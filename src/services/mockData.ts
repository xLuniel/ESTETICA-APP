// src/services/mockData.ts
import { Servicio, Cliente, Empleado } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDatosClientes = async (): Promise<Cliente[]> => {
  const storedData = await AsyncStorage.getItem('clientes');
  return storedData ? JSON.parse(storedData) : datosMock;
};

export const setDatosClientes = async (clientes: Cliente[]): Promise<void> => {
  await AsyncStorage.setItem('clientes', JSON.stringify(clientes));
};

export const servicios: Servicio[] = [
    { id: 's1', nombre: 'Facial Completo', duracionMin: 60, precio: 50 },
    { id: 's2', nombre: 'Masaje Relajante', duracionMin: 45, precio: 40 },
    { id: 's3', nombre: 'Exfoliación Corporal', duracionMin: 30, precio: 35 },
    { id: 's4', nombre: 'Depilación con Cera', duracionMin: 20, precio: 25 },
    { id: 's5', nombre: 'Manicura y Pedicura', duracionMin: 50, precio: 45 },
    { id: 's6', nombre: 'Corte de Cabello Masculino', duracionMin: 30, precio: 30 },
    { id: 's7', nombre: 'Corte de Cabello Femenino', duracionMin: 45, precio: 35 },
    { id: 's8', nombre: 'Corte de Cabello Infantil', duracionMin: 25, precio: 20 },
    { id: 's9', nombre: 'Peinado para Evento', duracionMin: 60, precio: 55 },
    { id: 's10', nombre: 'Coloración de Cabello', duracionMin: 90, precio: 70 },
  ];


export const datosMock: Cliente[] = [
    { id: '1', nombre: 'María López', historialServicios: ['Facial', 'Masaje'], notas: 'Alergia a fragancias' },
    { id: '2', nombre: 'Jorge Díaz', historialServicios: ['Manicure'], notas: '' },
    { id: '3', nombre: 'Lucía Hernández', historialServicios: ['Corte de Cabello Femenino', 'Coloración de Cabello'], notas: 'Prefiere productos naturales' },
    { id: '4', nombre: 'Pedro Martínez', historialServicios: ['Corte de Cabello Masculino'], notas: 'Solicita estilista específico' },
    { id: '5', nombre: 'Sofía Ramírez', historialServicios: ['Peinado para Evento'], notas: 'Tiene el cabello rizado' },
    { id: '6', nombre: 'Andrés Gómez', historialServicios: ['Masaje Relajante', 'Exfoliación Corporal'], notas: 'Requiere cita los fines de semana' },
    { id: '7', nombre: 'Valentina Torres', historialServicios: ['Facial Completo'], notas: 'Piel sensible' },
    { id: '8', nombre: 'Diego Fernández', historialServicios: ['Corte de Cabello Infantil'], notas: 'Niño de 5 años, necesita atención especial' },
    { id: '9', nombre: 'Camila Sánchez', historialServicios: ['Manicura y Pedicura'], notas: 'Prefiere esmaltes veganos' },
    { id: '10', nombre: 'Luis Rodríguez', historialServicios: ['Depilación con Cera'], notas: 'Primera vez, explicar el proceso' },
  ];
  
  
  export const empleados: Empleado[] = [
    {
      id: '1',
      nombre: 'Ana Pérez',
      rol: 'esteticista',
      disponibilidad: {
        '2025-04-23': ['10:00', '11:00', '14:00'],
        '2025-04-24': ['09:00', '13:00'],
      },
    },
    {
      id: '2',
      nombre: 'Carlos Gómez',
      rol: 'esteticista',
      disponibilidad: {
        '2025-04-23': ['10:00', '12:00', '15:00'],
        '2025-04-24': ['11:00', '16:00'],
      },
    },
    {
      id: '3',
      nombre: 'Laura Martínez',
      rol: 'esteticista',
      disponibilidad: {
        '2025-04-23': ['09:00', '11:00', '13:00'],
        '2025-04-24': ['10:00', '14:00'],
      },
    },
    {
      id: '4',
      nombre: 'Sofía López',
      rol: 'recepcionista',
      disponibilidad: {
        '2025-04-23': ['09:00', '17:00'],
        '2025-04-24': ['09:00', '17:00'],
      },
    },
    {
      id: '5',
      nombre: 'Miguel Torres',
      rol: 'admin',
      disponibilidad: {
        '2025-04-23': ['09:00', '17:00'],
        '2025-04-24': ['09:00', '17:00'],
      },
    },
    {
      id: '6',
      nombre: 'Elena Ramírez',
      rol: 'esteticista',
      disponibilidad: {
        '2025-04-23': ['10:00', '12:00', '16:00'],
        '2025-04-24': ['09:00', '15:00'],
      },
    },
    {
      id: '7',
      nombre: 'Javier Sánchez',
      rol: 'esteticista',
      disponibilidad: {
        '2025-04-23': ['11:00', '13:00', '17:00'],
        '2025-04-24': ['10:00', '14:00'],
      },
    },
    {
      id: '8',
      nombre: 'María Fernández',
      rol: 'esteticista',
      disponibilidad: {
        '2025-04-23': ['09:00', '12:00', '15:00'],
        '2025-04-24': ['11:00', '16:00'],
      },
    },
    {
      id: '9',
      nombre: 'Pedro López',
      rol: 'recepcionista',
      disponibilidad: {
        '2025-04-23': ['09:00', '17:00'],
        '2025-04-24': ['09:00', '17:00'],
      },
    },
    {
      id: '10',
      nombre: 'Lucía García',
      rol: 'admin',
      disponibilidad: {
        '2025-04-23': ['09:00', '17:00'],
        '2025-04-24': ['09:00', '17:00'],
      },
    },
  ];
  