import { Eestatus, Erol } from "./common.interface";

export interface Iusuario {
  idusuario: number;
  perfil: string;
  email: string;
  password?: string;
  rol: Erol;
  sesion_conectada?: string;
  ultima_conexion?: Date;
  estatus?: Eestatus;
};

