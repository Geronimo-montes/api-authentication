import { CustomValidator, ParamSchema } from "express-validator";
import { existsValidators, isAlphaValidator, notEmptyValidators } from "./comon.validator";

/**
 * Cadena de validadores para el email. Se compone de una cadena de promesas, al detectar una inconsistencia manda un error, el cual, representa el mensaje de error producido
 */
// const EmailValidatorsCustom: CustomValidator =
// 	async (value, { req, location, path }) => {
// 		await userModel.findOne(value)
// 			.then((res) => value)
// 			.catch((err) => { throw new Error(`El correo electronico {{value}} no se encuentra registrado en sistema.`); });
// 		;
// 	};

/**
 * VAlidador utilizado para validar el nombre del saludo
 */
export const nameValidator: ParamSchema = {
	in: ['params'],
	...isAlphaValidator
};

/**
 * VAlidador utilizado para authenticar usuario
 */
export const emailValidator: ParamSchema = {
	in: ['body'],
	...existsValidators,
	...notEmptyValidators,
	// NORMALIZAMOS EL VALOR DEL EMAIL
	normalizeEmail: {},
	// VERIFICAMOS SI EL EMAIL TIENE FORMATO VALIDO
	isEmail: {
		errorMessage: `El formato del correo electronico {{value}} no pertenece a un formato valido.`,
		bail: true,
	},
	// APLICAMOS VALIDADORES PERSONALIZADOS
	// custom: {
	// 	options: EmailValidatorsCustom,
	// 	bail: true,
	// },
};

/**
 * Objeto que contiene los validadores necesarios para el email. Permite utilizar los metodos que vienen por default junto con validaciones custom.
 */
export const passwordValidator: ParamSchema = {
	in: ['body'],
	// VALIDAMOS LA EXISTENCIA DEL PARAMETRO EN LA PETICION
	exists: {
		errorMessage: `Proporcione la contraseña para iniciar sesion`,
		bail: true,
	},
	// VALIDAMOs QUE LA CONTRASEÑA TENGA UNA VALOR DEFINIDO
	notEmpty: {
		errorMessage: `Proporcione la contraseña para iniciar sesion`,
		bail: true,
	}
};