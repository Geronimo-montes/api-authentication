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
 * Validador para la ruta alumno/:matricula
 */
export const AlumnoSchemaGet: Schema = {
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true
		},
	},
};

/**
 * Validador para la ruta alumno/:matricula/:idpaquete
 */
export const AlumnoSchemaGetDoc: Schema = {
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaIsRegistrerValidator,
			bail: true
		},
	},
};

/**
 * Validador para la ruta alumno/new
 */
export const AlumnoSchemaPost: Schema = {
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaIsRegistrerValidator,
			bail: true,
		},
	},
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
 * Validador para la ruta alumno/update
 */
export const AlumnoSchemaPut: Schema = {
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true
		},
	},
	nombre: { ...isAlphaValidator },
	ape_1: { ...isAlphaValidator },
	ape_2: { ...isAlphaValidator },
	genero: { ...generoValidator },
	direccion: { ...direccionValidator },
	telefono: { ...telefonoValidator },
	email: { ...emailValidator },
	estatus: { ...estatusValidator },
};