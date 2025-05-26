//src/models/Servicio.ts
export interface Servicio {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    subcategoria: string;
    dias: string[];
  }