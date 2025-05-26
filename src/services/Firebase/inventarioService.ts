// src/services/Firebase/inventarioService.ts
import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { InventarioItem } from "../../models/Inventario";

const INVENTARIO_COLLECTION = "inventario";

export const registrarProductoInventario = async (
  item: Omit<InventarioItem, 'id'>
): Promise<string> => {
  const ref = await addDoc(collection(db, INVENTARIO_COLLECTION), item);
  return ref.id;
};

export const actualizarProductoInventario = async (
  id: string,
  datos: Omit<InventarioItem, 'id'>
): Promise<void> => {
  const ref = doc(db, INVENTARIO_COLLECTION, id);
  await setDoc(ref, datos, { merge: true });
};

export const eliminarProductoInventario = async (id: string): Promise<void> => {
  const ref = doc(db, INVENTARIO_COLLECTION, id);
  await deleteDoc(ref);
};

export const obtenerInventario = async (): Promise<InventarioItem[]> => {
  const snapshot = await getDocs(collection(db, INVENTARIO_COLLECTION));
  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<InventarioItem, 'id'>)
  }));
};
