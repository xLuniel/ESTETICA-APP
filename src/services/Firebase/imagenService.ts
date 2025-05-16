import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as uuid from "uuid";

const storage = getStorage();

export const subirImagenPerfil = async (uri: string, uid: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileRef = ref(storage, `usuarios/${uid}/perfil_${uuid.v4()}`);
  await uploadBytes(fileRef, blob);
  return await getDownloadURL(fileRef);
};
