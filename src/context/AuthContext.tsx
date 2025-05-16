// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'src/services/firebaseConfig';// ajusta la ruta según tu estructura
import { Usuario } from 'src/models/Usuario';

/*type RolUsuario = 'cliente' | 'empleado' | 'admin';

type Usuario = {
  uid: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
};*/

type AuthContextType = {
  user: Usuario | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDocRef = doc(db, 'usuarios', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        const userData: Usuario = {
          uid,
          nombre: data.nombre,
          email: data.email,
          rol: data.rol,
          creadoEn: data.creadoEn?.toDate?.() || new Date(),
          perfil: {
            telefono: data.perfil?.telefono || '',
            direccion: data.perfil?.direccion || '',
            imagen: data.perfil?.imagen || '',
          },
        };
        setUser(userData);
      } else {
        console.error('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("FirebaseUser:", firebaseUser);

      if (firebaseUser) {
        try {
        const uid = firebaseUser.uid;
        const userDocRef = doc(db, 'usuarios', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          const userData: Usuario = {
            uid,
            nombre: data.nombre,
            email: data.email,
            rol: data.rol,
            creadoEn: data.creadoEn?.toDate?.() || new Date(),
              perfil: {
                telefono: data.perfil?.telefono || '',
                direccion: data.perfil?.direccion || '',
                imagen: data.perfil?.imagen || '',
              },
          };
          setUser(userData);
          console.log("User data loaded:", userData);
        } else {
          console.warn("No se encontró el documento del usuario.");
          setUser(null);
        }
      } catch (error){
        console.error("Error al obtener datos del usuario:", error);
        setUser(null);
        }
      } else {
        console.log("No hay usuario autenticado.");
      setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};