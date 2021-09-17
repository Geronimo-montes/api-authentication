import { Schema } from "express-validator";
import {
	emailValidator,
	estatusValidator,
	isAlphaValidator,
	telefonoValidator
} from "../comon.validator";
import {
	emailIsRegistrerValidator,
	empleadoExistValidator,
	idempleadoValidator,
	rolValidator
} from "../empleado.validator";
import {
	claveExistValidator,
	claveValidator
} from "../unidad.validator";

export const EmpleadoSchemaGetAll: Schema = {};

export const EmpleadoSchemaGetAllUnidad: Schema = {
	clave: {
		...claveValidator,
		custom: {
			options: claveExistValidator,
			bail: true,
		}
	},
};

export const EmpleadoSchemaGet: Schema = {
	idempleado: {
		...idempleadoValidator,
		custom: {
			options: empleadoExistValidator,
			bail: true,
		}
	}
};

export const EmpleadoSchemaPost: Schema = {
	email: {
		...emailValidator,
		custom: {
			options: emailIsRegistrerValidator,
			bail: true,
		}
	},
	password: {},
	rol: { ...rolValidator },
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
	telefono: { ...telefonoValidator },
};

export const EmpleadoSchemaPut: Schema = {
	idusuario: {
		...idempleadoValidator,
		custom: {
			options: empleadoExistValidator,
			bail: true,
		}
	},
	email: { ...emailValidator },
	password: {},
	rol: { ...rolValidator },
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
	telefono: { ...telefonoValidator },
	estatus: { ...estatusValidator },
};
