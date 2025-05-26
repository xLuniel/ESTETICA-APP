import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { Ingreso } from "../../models/Ingreso";

export const guardarIngreso = async (ingreso: Ingreso) => {
  const ref = doc(db, "ingresos", ingreso.id);
  await setDoc(ref, ingreso, { merge: true });
};

export const obtenerIngresos = async (): Promise<Ingreso[]> => {
  const snapshot = await getDocs(collection(db, "ingresos"));
  return snapshot.docs.map(doc => doc.data() as Ingreso);
};