// src/types.ts
export type Empleado = {
  id: string;
  nombre: string;
  rol: 'esteticista' | 'recepcionista' | 'admin'| 'usuario';    
  disponibilidad: Record<string, string[]>; 
  // e.g. { '2025-05-10': ['10:00','11:00'], ... }
};

export type Cliente = {
  id: string;
  nombre: string;
  historialServicios: string[];
  notas: string;
};

export type Servicio = {
  id: string;
  nombre: string;
  duracionMin: number;
  precio: number;
};

export type Cita = {
  id: string;
  clienteId: string;
  servicioId: string;
  empleadoId: string;
  fecha: string;      // 'YYYY-MM-DD'
  hora: string;       // 'HH:mm'
};
