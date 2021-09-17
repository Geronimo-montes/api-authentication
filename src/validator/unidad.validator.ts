import unidadModel from "../models/unidad.model";
import {
	CustomValidator,
	ParamSchema,
} from "express-validator";
import {
	comonValidators,
	runCustomValidator,
} from "./comon.validator";

export const claveValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	// VERIFICAMOS EL TIPO DE DATO
	isNumeric: {
		errorMessage: `La clave de la unidad academica debe contener valores numericos unicamente.`,
		bail: true,
	},
	// LAS CLAVES DE ESCUELA TIENEN 5 DIGITOS
	isLength: {
		options: { max: 5, min: 5 },
		errorMessage: `La clave de la unidad academica debe tener una longitud de 5 caracteres.`,
		bail: true,
	},
};

/**
 * Valida la existencia del idunidad existente en la peticion
 */
export const claveExistValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(unidadModel.exists(value), 'EXIST');

/**
 * Usada en el registro de una unidad. Valida que la clave no este registrada en el sistema
 */
export const claveIsRegistrerValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(unidadModel.isRegistrer(value), 'REGISTRER');

/**
 * Usada en el registro de una unidad. Valida que el correo no este registrada en el sistema
 */
export const emailIsRegistrerValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(unidadModel.emailIsRegistrer(value), 'REGISTRER');
