import { Schema } from "express-validator";
import {
	claveExistValidator,
	claveValidator,
} from "../unidad.validator";
import {
	emailIsRegistrerValidator,
	matriculaExistValidator,
	matriculaIsRegistrerValidator,
	matriculaValidator,
} from "../alumno.validator";
import {
	direccionValidator,
	emailValidator,
	isAlphaValidator,
	telefonoValidator,
	generoValidator,
	estatusValidator,
} from "../comon.validator";


export const AlumnoSchemaMatriculaExist: Schema = {
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true
		},
	},
};

export const AlumnoSchemaMatriculaRegistrer: Schema = {
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaIsRegistrerValidator,
			bail: true,
		},
	},
};

/**
 * Validador para la ruta alumno/all
 */
export const AlumnoSchemaGetAll: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveExistValidator,
			bail: true,
		}
	}
};

/**
 * Validador para registro de nuevo alumno
 */
export const AlumnoSchemaPost: Schema = {
	...AlumnoSchemaMatriculaRegistrer,
	clave: {
		...claveValidator,
		custom: {
			options: claveExistValidator,
			bail: true,
		}
	},
	nombre: { ...isAlphaValidator },
	ape_1: { ...isAlphaValidator },
	ape_2: { ...isAlphaValidator },
	genero: { ...generoValidator },
	direccion: { ...direccionValidator },
	telefono: { ...telefonoValidator },
	email: {
		...emailValidator,
		custom: {
			options: emailIsRegistrerValidator,
			bail: true,
		},
	},
};

/**
 * Validador para la actualizacion de los datos de un alumno
 */
export const AlumnoSchemaPut: Schema = {
	...AlumnoSchemaMatriculaExist,
	nombre: { ...isAlphaValidator },
	ape_1: { ...isAlphaValidator },
	ape_2: { ...isAlphaValidator },
	genero: { ...generoValidator },
	direccion: { ...direccionValidator },
	telefono: { ...telefonoValidator },
	email: { ...emailValidator },
};

/**
 * Validador para la actualizacion de los datos de un alumno
 */
export const AlumnoSchemaPutEstatus: Schema = {
	...AlumnoSchemaMatriculaExist,
	estatus: { ...estatusValidator },
};