//src/services/firebase/citasService.ts
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Cita } from "../../models/Cita";

// Guardar una nueva cita con ID generado automáticamente
export const guardarCita = async (cita: Omit<Cita, "id">) => {
  const ref = await addDoc(collection(db, "citas"), cita);
  return ref.id; // Devuelve el ID generado si lo necesitas
};

// Obtener todas las citas con su ID
export const obtenerCitas = async (): Promise<Cita[]> => {
  const snapshot = await getDocs(collection(db, "citas"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Cita, "id">),
  }));
};