import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { DisponibilidadEmpleado } from "../../models/Disponibilidad";

export const guardarDisponibilidad = async (disponibilidad: DisponibilidadEmpleado) => {
  const ref = doc(db, "disponibilidad", disponibilidad.empleadoId);
  await setDoc(ref, disponibilidad, { merge: true });
};

export const obtenerDisponibilidadEmpleado = async (empleadoId: string): Promise<DisponibilidadEmpleado | null> => {
  const ref = doc(db, "disponibilidad", empleadoId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as DisponibilidadEmpleado) : null;
};
