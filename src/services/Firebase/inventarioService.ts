import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { InventarioItem } from "../../models/Inventario";

export const guardarInventarioItem = async (item: InventarioItem) => {
  const ref = doc(db, "inventario", item.id);
  await setDoc(ref, item, { merge: true });
};

export const obtenerInventario = async (): Promise<InventarioItem[]> => {
  const snapshot = await getDocs(collection(db, "inventario"));
  return snapshot.docs.map(doc => doc.data() as InventarioItem);
};