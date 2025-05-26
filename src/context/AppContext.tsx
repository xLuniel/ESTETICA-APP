//src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Usuario } from "src/models/Usuario";
import { Servicio } from "../models/Servicio";
import { DisponibilidadEmpleado } from "../models/Disponibilidad";

// Importar servicios
import { obtenerServicios } from "../services/Firebase/serviciosService";
import { obtenerUsuarios } from "../services/Firebase/UsuariosService";
import { obtenerDisponibilidadEmpleado } from "../services/Firebase/disponibilidadService";

// Tipado del contexto
interface AppContextProps {
  usuarios: Usuario[];
  servicios: Servicio[];
  disponibilidad: DisponibilidadEmpleado[];
  loading: boolean;
}

// Crear el contexto
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadEmpleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [usuariosData, serviciosData] = await Promise.all([
          obtenerUsuarios(),
          obtenerServicios(),
        ]);

        setUsuarios(usuariosData);
        setServicios(serviciosData);

        // Obtener disponibilidad para todos los empleados
        const disponibilidadData: DisponibilidadEmpleado[] = await Promise.all(
          usuariosData
            .filter((u) => u.rol === "empleado")
            .map((u) => obtenerDisponibilidadEmpleado(u.uid))
        ).then((res) => res.filter(Boolean) as DisponibilidadEmpleado[]);

        setDisponibilidad(disponibilidadData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <AppContext.Provider value={{ usuarios, servicios, disponibilidad, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
};
