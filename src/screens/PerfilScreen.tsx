//src/screen/PerfilScreen.ts
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Usuario } from "src/models/Usuario";
import { actualizarPerfilUsuario } from "../services/Firebase/UsuariosService";
import { subirImagenPerfil } from "../services/Firebase/imagenService";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilScreen() {
  const { user, signOut } = useAuth();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estado] = useState("");
  const [imagen, setImagen] = useState("");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setTelefono(user.perfil.telefono);
      setDireccion(user.perfil.direccion);
      setImagen(user.perfil.imagen);
    }
  }, [user]);

  const handleSeleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
          if (!user) return; // 🔒 Asegura que user no sea null
      try {
        const uri = result.assets[0].uri;
        const urlDescargada = await subirImagenPerfil(uri, user.uid);
        setImagen(urlDescargada);
        await actualizarPerfilUsuario(user.uid, {
          telefono,
          direccion,
          imagen: urlDescargada,
        });
        Alert.alert("Imagen actualizada");
      } catch (error) {
        Alert.alert("Error", "No se pudo actualizar la imagen.");
      }
    }
  };

  const handleGuardar = async () => {
        if (!user) return; // 🔒 Asegura que user no sea null
    try {
      await actualizarPerfilUsuario(user.uid, {
        telefono,
        direccion,
        imagen,
      });
      Alert.alert("Perfil actualizado");
      setEditando(false);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el perfil.");
    }
  };

if (!user) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}><Ionicons name="person-circle-outline" size={24} /> PERFIL</Text>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleSeleccionarImagen}>
          {imagen ? (
            <Image source={{ uri: imagen }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={64} color="#888" />
            </View>
          )}
          <Ionicons name="camera-outline" size={20} style={styles.cameraIcon} />
        </TouchableOpacity>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.estado}>{estado || "Frase de estado"}</Text>
      </View>

      {editando ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
            <Text style={styles.botonTexto}>Guardar Cambios</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>📧 Correo: {user.email}</Text>
          <Text style={styles.label}>📞 Teléfono: {telefono}</Text>
          <Text style={styles.label}>🏠 Dirección: {direccion}</Text>

          <TouchableOpacity style={styles.botonEditar} onPress={() => setEditando(true)}>
            <Ionicons name="create-outline" size={20} color="#000" />
            <Text style={{ marginLeft: 5 }}>Editar</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: "#e0f0ff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
  },
  nombre: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  estado: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
  },
  botonEditar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  botonGuardar: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
