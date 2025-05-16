//src/services/firebase/authService
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Usuario } from "src/models/Usuario";
import { guardarUsuario } from "./UsuariosService";

/**
 * Registrar un nuevo usuario con email y password
 */
export const registrarUsuario = async (email: string, password: string, datosUsuario: Omit<Usuario, "uid">) => {
  try{
  // 1. Crear usuario en Firebase Auth
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  // 2. Guardar el usuario en Firestore con el UID asignado
  const nuevoUsuario: Usuario = {
    ...datosUsuario,
    uid,
  };
  await guardarUsuario(nuevoUsuario);
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    throw error; // Esto es clave para que se capture en la pantalla
  }
};
/**
 * Iniciar sesión con email y password
 */
export const iniciarSesion = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};
/**
 * Cerrar sesión
 */
export const cerrarSesion = async () => {
  await signOut(auth);
};
