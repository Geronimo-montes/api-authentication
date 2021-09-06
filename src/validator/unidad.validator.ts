import { CustomValidator, ParamSchema } from "express-validator";
import { ERRORS_VALIDATOR } from "../errors/error.validators";
import { ErrorStr } from "../errors/error.middleware";
import unidadModel from "../models/unidad.model";

/**
 * Validadores de origen comun. Exige que el parametro exista y tenga un valor definido
 */
const comonValidators: ParamSchema = {
	exists: {
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.UNDEFINED),
		bail: true,
	},
	notEmpty: {
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.EMPTY),
		bail: true,
	},
}

export const idunidadValidator: ParamSchema = {
	in: ['params', 'body'],
	...comonValidators,
	isNumeric: { // VERIFICAMOS EL TIPO DE DATO
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
	toInt: { },
};

export const claveValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	isNumeric: { // VERIFICAMOS EL TIPO DE DATO
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
	isLength: { // LAS CLAVES DE ESCUELA TIENEN 5 DIGITOS
		options: { max: 5, min: 5, },
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
};

export const isAlphaValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	trim: { // LIMPIAMOS LOS ESPACIOS SOBRANTES
		options: [' '],
	},
	isAlpha: { // VERIFICAMOS LA EXISTENCIA DE SOLO LETRAS Y ESPACIOS
		options: ['es-ES', { ignore: ' ' }],
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
};

export const direccionValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	trim: { // LIMPIAMOS LOS ESPACIOS SOBRANTES
		options: [' '],
	},
	isAlphanumeric: { // VERIFICAMOS EL TIPO DE DATO
		options: ['es-ES', { ignore: ' ' }],
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
};

export const emailValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	normalizeEmail: { },
	isEmail: { // VERIFICAMOS EL TIPO DE DATO
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
};

export const telefonoValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	isNumeric: { // NUMERO DE TELEFONO SIN LETRAS
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	},
	isLength: { // LAS CLAVES DE ESCUELA TIENEN 5 DIGITOS
		options: { min: 10, max: 20, },
		errorMessage: ErrorStr(ERRORS_VALIDATOR.PARAMS.INVALID),
		bail: true,
	}
};


export const claveExistValidator: CustomValidator =
	async (value, { req, location, path }) => {
		await unidadModel.exists(value)
			.then((exist: boolean) => exist)
			.catch((err) => { throw new Error(ErrorStr(err)); });
	};

export const claveIsRegistrerValidator: CustomValidator =
	async (value, { req, location, path }) => {
		await unidadModel.isRegistrer(value)
			.then((isRegistrer: boolean) => isRegistrer)
			.catch((err) => { throw new Error(ErrorStr(err)); });
	};

export const emailIsRegistrerValidator: CustomValidator =
	async (value, { req, location, path }) => {
		await unidadModel.emailIsRegistrer(value)
			.then((isRegistrer: boolean) => isRegistrer)
			.catch((err) => { throw new Error(ErrorStr(err)); });
	};


/**
 * import { CustomSanitizer } from "express-validator";
 *
 * export const parametroSanitizer: CustomSanitizer = value => {
 * 	return value;
 * }
 */