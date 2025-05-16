export interface Horario {
    dia: string; // "lunes", "martes"...
    desde: string; // "09:00"
    hasta: string; // "17:00"
  }
  
  export interface DisponibilidadEmpleado {
    empleadoId: string;
    diasDisponibles: string[];
    horarios: Horario[];
  }
  