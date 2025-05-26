//src/services/firebase/usuarioService
import {db} from "../firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { Usuario } from "src/models/Usuario";
import { deleteDoc } from "firebase/firestore";

// Crear o actualizar usuario
export const guardarUsuario = async (usuario: Usuario) => {
  const ref = doc(db, "usuarios", usuario.uid);
  try {
    await setDoc(ref, usuario, { merge: true });
    console.log(" Usuario guardado en Firestore");
  } catch (error) {
    console.error("Error guardando usuario en Firestore:", error);
    throw error;
  }
};

// Obtener usuario por UID (incluye el `uid` correctamente)
export const obtenerUsuarioPorId = async (uid: string): Promise<Usuario | null> => {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as Usuario;
  return { ...data, uid: snap.id }; // asegura que `uid` está presente
};

// Obtener todos los usuarios (también corrige el `uid`)
export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  const snapshot = await getDocs(collection(db, "usuarios"));
  return snapshot.docs.map(doc => {
    const data = doc.data() as Usuario;
    return { ...data, uid: doc.id };
  });
};

export const actualizarPerfilUsuario = async (
  uid: string,
  perfil: Partial<Usuario["perfil"]>
) => {
  const ref = doc(db, "usuarios", uid);
  try {
    await setDoc(ref, { perfil }, { merge: true });
    console.log("Perfil actualizado correctamente.");
  } catch (error) {
    console.error("Error actualizando el perfil:", error);
    throw error;
  }
};

export const eliminarUsuario = async (uid: string) => {
  try {
    await deleteDoc(doc(db, "usuarios", uid));
    console.log("Usuario eliminado de Firestore");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

