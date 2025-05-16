//src/models/Usuario
export type RolUsuario = "admin" | "empleado" | "cliente";

export interface PerfilUsuario {
  telefono: string;
  direccion: string;
  imagen: string;
}

export interface Usuario {
  uid: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  creadoEn: Date;
  perfil: PerfilUsuario;
}
