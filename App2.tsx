import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegistroScreen() {
  const [form, setForm] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    fechaNacimiento: '',
    domicilio: '',
    imagen: null as string | null,
    registro: '',
  });

  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      alert('Permiso denegado para acceder a la galería');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      setForm({ ...form, imagen: resultado.assets[0].uri });
    }
  };

  const generarRegistro = () => {
    const { nombre, apellidoP, apellidoM, fechaNacimiento } = form;
    const id =
      nombre.charAt(0).toUpperCase() +
      apellidoP.substring(0, 2).toUpperCase() +
      apellidoM.substring(0, 2).toUpperCase() +
      fechaNacimiento.replaceAll('-', '');
    setForm({ ...form, registro: id });
  };

  const onChangeFecha = (_event: any, selectedDate?: Date) => {
    setMostrarCalendario(Platform.OS === 'ios');
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      setForm({ ...form, fechaNacimiento: isoDate });
    }
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#e0f2fe' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Registro de Usuario</Text>

      <TextInput
        placeholder="Nombre"
        style={{ backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#374151', fontSize: 16, color: '#000000', padding: 12, marginBottom: 16, borderRadius: 8 }}
        value={form.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        placeholder="Apellido Paterno"
        style={{ backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#374151', fontSize: 16, color: '#000000', padding: 12, marginBottom: 16, borderRadius: 8 }}
        value={form.apellidoP}
        onChangeText={(text) => handleChange('apellidoP', text)}
      />
      <TextInput
        placeholder="Apellido Materno"
        style={{ backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#374151', fontSize: 16, color: '#000000', padding: 12, marginBottom: 16, borderRadius: 8 }}
        value={form.apellidoM}
        onChangeText={(text) => handleChange('apellidoM', text)}
      />

      <TouchableOpacity
        onPress={() => setMostrarCalendario(true)}
        style={{ backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#374151', padding: 12, marginBottom: 16, borderRadius: 8 }}
      >
        <Text style={{ fontSize: 16, color: '#374151' }}>
          {form.fechaNacimiento ? `Fecha: ${form.fechaNacimiento}` : 'Selecciona fecha de nacimiento'}
        </Text>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          value={form.fechaNacimiento ? new Date(form.fechaNacimiento) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeFecha}
        />
      )}

      <TextInput
        placeholder="Domicilio"
        style={{ backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#374151', fontSize: 16, color: '#000000', padding: 12, marginBottom: 16, borderRadius: 8 }}
        value={form.domicilio}
        onChangeText={(text) => handleChange('domicilio', text)}
      />

      <TouchableOpacity
        onPress={seleccionarImagen}
        style={{ backgroundColor: '#3b82f6', padding: 12, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }}
      >
        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Subir Imagen</Text>
      </TouchableOpacity>

      {form.imagen && (
        <Image
          source={{ uri: form.imagen }}
          style={{ width: 160, height: 160, borderRadius: 9999, alignSelf: 'center', marginBottom: 16, borderWidth: 4, borderColor: '#c7d2fe' }}
        />
      )}

      <TouchableOpacity
        onPress={generarRegistro}
        style={{ backgroundColor: '#1d4ed8', padding: 12, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 }}
      >
        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Generar Registro</Text>
      </TouchableOpacity>

      {form.registro ? (
        <Text style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#15803d' }}>
          Registro generado: {form.registro}
        </Text>
      ) : null}
    </ScrollView>
  );
}
