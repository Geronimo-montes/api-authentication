import empleadoModel from "../models/empleado.model";
import {
	CustomValidator,
	ParamSchema,
} from "express-validator";
import { Erol } from "../models/model.model";
import {
	comonValidators,
	runCustomValidator,
} from "./comon.validator";

/**
 * Validator utilizado para el idempleado
 */
export const idempleadoValidator: ParamSchema = {
	in: ['params', 'body'],
	...comonValidators,
	// EL PARAMETRO DEBE SER NUMERICO
	isNumeric: {
		errorMessage: `EL valor del id del empleado debe ser numerico.`,
		bail: true,
	},
	// CONVERTIMOS A ENTERO
	toInt: {},
};

export const rolValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	// VERIFICAMOS SI EL EL PERTENECE A LOS EXISTENTES
	isIn: {
		options: [[Erol.AUXILIAR, Erol.JEFATURA, Erol.DIRECTOR]],
		errorMessage: `El rol proporcionado no corresponde con los existentes en el sistema.`,
		bail: true,
	},
}

/**
 * Verifica si la empleado proporcionada existe en el sistema. Validador util antes de lanzar una consulta a la BD.
 */
export const empleadoExistValidator: CustomValidator =
	async (value,) =>
		await runCustomValidator(empleadoModel.exists(value), 'EXIST');

/**
* Verifica si la empleado ya se encuentra registrada en el sistema. Validador util antes de lanzar un registro de un empleado.
*/
export const empleadoIsRegistrerValidator: CustomValidator =
	async (value,) =>
		await runCustomValidator(empleadoModel.isRegistrer(value), 'REGISTRER');

/**
* Verifica si el email ya se encuentra registrada en el sistema. Validador util antes de lanzar un registro de un alumno.
*/
export const emailIsRegistrerValidator: CustomValidator =
	async (value,) =>
		await runCustomValidator(empleadoModel.emailIsRegistrer(value), 'REGISTRER');