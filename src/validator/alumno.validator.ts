import alumnoModel from "../models/alumno.model";
import {
	CustomValidator,
	ParamSchema
} from "express-validator";
import {
	comonValidators,
	runCustomValidator,
} from "./comon.validator";

/**
 * Validator utilizado para las matriculas de alumnos registrados.
 */
export const matriculaValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	// LAS MATRICULAS SON LONGITUD 10
	isLength: {
		options: { min: 10, max: 10 },
		errorMessage: `La lonjitud de la parametro matricula debe de ser de 10 caracteres.`,
		bail: true,
	},
	// DEVEN CUMPLIR CON CIERTO FORMATO ESPESIFICADO
	isNumeric: {
		options: { no_symbols: true },
		errorMessage: `La matricula de un estudiante debe contener unicamente numeros.`,
		bail: true,
	},
};

/**
 * Verifica si la matricula proporcionada existe en el sistema. Validador util antes de lanzar una consulta a la BD.
 */
export const matriculaExistValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(alumnoModel.exists(value), 'EXIST');

/**
* Verifica si la matricula ya se encuentra registrada en el sistema. Validador util antes de lanzar un registro de un alumno.
*/
export const matriculaIsRegistrerValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(alumnoModel.isRegistrer(value), 'REGISTRER');

/**
 * Verifica si el email ya se encuentra registrada en el sistema. Validador util antes de lanzar un registro de un alumno.
*/
export const emailIsRegistrerValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(alumnoModel.emailIsRegistrer(value), 'REGISTRER');


