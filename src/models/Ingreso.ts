export type TipoIngreso = "servicio" | "producto";

export interface Ingreso {
  id: string;
  tipo: TipoIngreso;
  monto: number;
  fecha: Date;
  referenciaId: string; // citaId o ventaId
  generadoPor: string;  // uid
}
