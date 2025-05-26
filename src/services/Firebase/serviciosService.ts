//src/services/Firebase/ServiciosService.ts
import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { Servicio } from "../../models/Servicio";

// Registrar un nuevo servicio con ID generado automáticamente
export const registrarServicio = async (servicio: Omit<Servicio, "id">) => {
  const ref = await addDoc(collection(db, "servicios"), servicio);
  return ref.id;
};

// Obtener todos los servicios con sus IDs
export const obtenerServicios = async (): Promise<Servicio[]> => {
  const snapshot = await getDocs(collection(db, "servicios"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Servicio, "id">),
  }));
};

// Eliminar un servicio por ID
export const eliminarServicio = async (id: string) => {
  const ref = doc(db, "servicios", id);
  await deleteDoc(ref);
};

// Actualizar un servicio existente
export const actualizarServicio = async (id: string, datos: Omit<Servicio, "id">) => {
  const ref = doc(db, "servicios", id);
  await setDoc(ref, datos);
};