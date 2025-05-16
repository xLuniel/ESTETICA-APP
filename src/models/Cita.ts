export type EstadoCita = "pendiente" | "confirmada" | "cancelada" | "completada";

export interface Cita {
  clienteId: string;
  empleadoId: string;
  servicioId: string;
  fecha: string; // formato YYYY-MM-DD
  estado: EstadoCita;
}