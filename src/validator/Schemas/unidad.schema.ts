import { Schema } from "express-validator";
import {
	direccionValidator,
	emailValidator,
	estatusValidator,
	isAlphaValidator,
	telefonoValidator,
} from "../comon.validator";
import {
	claveExistValidator,
	claveIsRegistrerValidator,
	claveValidator,
	emailIsRegistrerValidator,
} from "../unidad.validator";


/**
 * Validador para la ruta unidad-academica/all
 */
export const UnidadSchemaGetAll: Schema = {};

/**
 * Validador para la ruta unidad-academica/:clave
 */
export const UnidadSchemaGet: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveExistValidator,
			bail: true,
		}
	},
};

/**
 * Validador para el registro de una nueva unidad academica. Valida la existencia de la unidad en el sistema antes de subir el archivo
 */
export const UnidadSchemaClavePost: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveIsRegistrerValidator,
			bail: true,
		},
	},
};

/**
 * Validador para el registro de una nueva unidad academica
 */
export const UnidadSchemaPost: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveIsRegistrerValidator,
			bail: true,
		},
	},
	nombre: { ...isAlphaValidator },
	direccion: { ...direccionValidator },
	correo: {
		...emailValidator,
		custom: {
			options: emailIsRegistrerValidator,
			bail: true,
		},
	},
	telefono: { ...telefonoValidator },
};

/**
 * Validador para la ruta unidad-academica/update
 */
export const UnidadSchemaPut: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveExistValidator,
			bail: true,
		}
	},
	nombre: { ...isAlphaValidator },
	direccion: { ...direccionValidator },
	correo: { ...emailValidator },
	telefono: { ...telefonoValidator },
};

export const UnidadSchemaEstatusPut: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveExistValidator,
			bail: true,
		}
	},
	estatus: { ...estatusValidator },
}