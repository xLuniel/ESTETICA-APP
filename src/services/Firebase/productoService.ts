import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { Producto } from "../../models/Producto";

export const guardarProducto = async (producto: Producto) => {
  const ref = doc(db, "productos", producto.id);
  await setDoc(ref, producto, { merge: true });
};

export const obtenerProductos = async (): Promise<Producto[]> => {
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs.map(doc => doc.data() as Producto);
};
