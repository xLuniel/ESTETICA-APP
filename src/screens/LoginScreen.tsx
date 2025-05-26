// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

type Role = 'admin' | 'recepcionista' | 'esteticista' | 'usuario'; 

// Definimos las 4 cuentas de prueba
const TEST_USERS: Record<string, { password: string; role: Role }> = {
  'ad1@estetica.com': { password: 'Admin123',       role: 'admin' },
  're2@estetica.com': { password: 'Recep123',       role: 'recepcionista' },
  'es3@estetica.com': { password: 'Estetica123',    role: 'esteticista' },
  'us4@estetica.com': { password: 'Usuario123',     role: 'usuario' },
};


export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useAuth } from 'src/context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
>>>>>>> Stashed changes

=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useAuth } from 'src/context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

>>>>>>> Stashed changes
  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // La redirección a la pantalla correspondiente ya la controla App.tsx
    } catch (error) {
      Alert.alert('Error', 'Correo o contraseña incorrecta');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brushes</Text>
      <Image source={require('../../assets/img1.png')} style={styles.image} />
      <Text style={styles.subtitle}>Inicio de Sesión</Text>

      <TextInput placeholder="Correo" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} onChangeText={setPassword} value={password} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <Button title="Ingresar" onPress={handleLogin} />
      
      {/* Instrucciones de prueba */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Cuentas de prueba:</Text>
        <Text>Admin: ad1@estetica.com / Admin123</Text>
        <Text>Recep: re2@estetica.com / Recep123</Text>
        <Text>Esteticista: es3@estetica.com / Estetica123</Text>
        <Text>Usuario: us4@estetica.com / Usuario123</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.bluext} onPress={() => navigation.navigate('Recuperar')}>¿Olvidaste tu contraseña?</Text>
      </View>
=======
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
>>>>>>> Stashed changes
=======
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff0f5'
  },
  title: {
    fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#d4af37'
  },
  input: {
    height: 50, borderColor: '#d4af37', borderWidth: 1,
    borderRadius: 8, marginBottom: 15, paddingHorizontal: 10,
    backgroundColor: '#ffffff'
  },
  footer: {
    marginTop: 30, padding: 10, borderTopWidth: 1, borderTopColor: '#ddd'
  },
  footerTitle: {
    fontWeight: '600', marginBottom: 5, color: '#555'
  },
  bluext: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
=======
=======
>>>>>>> Stashed changes
  container: { padding: 24, alignItems: 'center', backgroundColor: '#f5f9fc', flex: 1 },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
  subtitle: { fontSize: 18, marginVertical: 20 },
  input: { width: '100%', padding: 12, marginVertical: 8, borderWidth: 1, borderRadius: 8 },
  button: { backgroundColor: '#3a4b57', padding: 14, borderRadius: 8, width: '100%', marginTop: 12 },
  buttonText: { color: 'white', textAlign: 'center' },
  link: { color: '#3a4b57', marginTop: 16 },
  image: { width: 120, height: 120, marginVertical: 20 }
<<<<<<< Updated upstream
});
>>>>>>> Stashed changes
=======
});
>>>>>>> Stashed changes
