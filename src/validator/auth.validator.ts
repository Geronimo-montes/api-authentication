import { CustomValidator, ParamSchema } from "express-validator";
import { ERRORS_VALIDATOR } from "../errors/error.validators";
import { ErrorStr } from "../errors/error.middleware";
import userModel from "../models/user.model";

/**
 * Cadena de validadores para el email. Se compone de una cadena de promesas, al detectar una inconsistencia manda un error, el cual, representa el mensaje de error producido
 */
const EmailValidatorsCustom: CustomValidator =
	async (value, { req, location, path }) => {
		await userModel.findOne(value)
			.then((res) => value)
			.catch((err) => { throw new Error(ErrorStr(err)); });
		;
	};

/**
 * Objeto que contiene los validadores necesarios para el email. Permite utilizar los metodos que vienen por default junto con validaciones custom.
 */
export const emailValidator: ParamSchema = {
	in: ['body'],
	// VALIDAMOS LA EXISTENCIA DEL PARAMETRO EN LA PETICION
	exists: {
		errorMessage: ErrorStr(ERRORS_VALIDATOR.AUTH.EMAIL.UNDEFINED),
		bail: true,
	},
	// NORMALIZAMOS EL VALOR DEL EMAIL
	normalizeEmail: { },
	// VERIFICAMOS SI EL EMAIL TIENE FORMATO VALIDO
	isEmail: {
		errorMessage: ErrorStr(ERRORS_VALIDATOR.AUTH.EMAIL.INVALID),
		bail: true,
	},
	// APLICAMOS VALIDADORES PERSONALIZADOS
	custom: {
		options: EmailValidatorsCustom,
		bail: true,
	},
};

/**
 * Objeto que contiene los validadores necesarios para el email. Permite utilizar los metodos que vienen por default junto con validaciones custom.
 */
export const passwordValidator: ParamSchema = {
	in: ['body'],
	// VALIDAMOS LA EXISTENCIA DEL PARAMETRO EN LA PETICION
	exists: {
		errorMessage: ErrorStr(ERRORS_VALIDATOR.AUTH.PASSWORD.UNDEFINED),
		bail: true,
	},
};






/**
 * import { CustomSanitizer } from "express-validator";
 *
 * export const parametroSanitizer: CustomSanitizer = value => {
 * 	return value;
 * }
 */