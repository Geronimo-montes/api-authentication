export interface Iunidadacademica {
  clave: string;
  nombre: string;
  perfil: string;
  direccion: string;
  correo: string;
  telefono: string;
  estatus: Eestatus;
};

export interface Iusuario {
  idusuario: number;
  perfil: string;
  email: string;
  password?: string;
  rol: Erol;
  sesion_conectada?: string;
  clave?: string;
  idjefatura?: number;
  jefatura?: string;
  nombre?: string;
  ape_1?: string;
  ape_2?: string;
  telefono?: string;
  ultima_conexion?: Date;
  estatus?: Eestatus;
};

export enum Erol {
  DIRECTOR = 'director',
  JEFATURA = 'jefatura',
  AUXILIAR = 'auxiliar'
};

export enum Eestatus {
  ALTA = 'a',
  BAJA = 'b'
};

export interface Ialumno {
  matricula: string;
  clave: string;
  perfil: string;
  nombre: string;
  ape_1: string;
  ape_2: string;
  genero: Egenero;
  direccion: string;
  telefono: string;
  email: string;
  estatus: Eestatus;
};

export interface IdocumentoEntregado {
  ruta: string; // agregar campo a la bd
  matricula: string;
  idpaquete: number;
  iddocumento: number;
  fecha_entrega: Date;
}

export enum Egenero {
  MASCULINO = 'm',
  FEMENINO = 'f'
};

export interface Ipackdocumentacion {
  idpaquete: number;
  ruta_imagen: string;
  nombre: string;
  descripcion: string;
  numero_documentos: number;
  detalleDocumento: Idocumento[];
  fecha_creacion: Date;
  fecha_modificacion: Date;
  estatus: Eestatus;
};

export interface Idocumento {
  iddocumento: number;
  idpaquete: number;
  nombre: string;
  formato: Eformato;
  peso_max: number;
  requerido: Erequerido;
  foto_ejemplo: string;
  estatus: Eestatus;
};

export enum Eformato {
  PDF = 'pdf',
  PNG = 'png',
  JPG = 'jpg',
  DOCX = 'docx'

}

export enum Erequerido {
  REQUERIDO = 'a',
  OPCIONAL = 'o',
  OTRO_ESTADO = 'w'
}