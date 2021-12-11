import { ParamSchema } from "express-validator";

export const existsValidators: ParamSchema = {
	exists: {
		errorMessage: 'Se requiere el parametro {{param}} a para continuar con la petición.',
		bail: true,
	},
};

export const notEmptyValidators: ParamSchema = {
	notEmpty: {
		errorMessage: `El parametro {{param}} no tiene un valor definido.`,
		bail: true,
	},
};

/**
 * Validador para valores que solo sean letras y espacios
 */
export const isAlphaValidator: ParamSchema = {
	in: ['body', 'params'],
	// LIMPIAMOS LOS ESPACIOS SOBRANTES
	trim: {
		options: [' '],
	},
	// VERIFICAMOS LA EXISTENCIA DE SOLO LETRAS Y ESPACIOS
	isAlpha: {
		options: ['es-ES', { ignore: ' .,:;-_!¡¿?()' }],
		errorMessage: `El parametro {{param}} debe contener unicamente letras.`,
		bail: true,
	},
};

// /**
//  * Plantillas de mensajes de error predeterminados para las validaciones indicadas
//  */
// enum EtypeValidator {
// 	EXIST = `El valor {{value}} del parametro {{param}} no se encuentra registrada en el sistema.`,
// 	REGISTRER = `El valor {{value}} del parametro {{param}} ya se encuentra registrada en el sistema.`,
// }

// // Equivalent type keyEtypeValid = 'EXIST' | 'REGISTRER' | 'EMAIL_REGISTRER'
// type keyEtypeValidator = keyof typeof EtypeValidator;

// /**
//  * ejecuta un validador personalizado. Debe ser una promesa<boolean> que resuelva un valor booleano y rechaze nada.
//  * @param {Promise<boolean>} fun function Custom validator
//  * @param {keyEtypeValidator} typeValid tipo de validacion a realizar
//  */
// export const runCustomValidator =
// 	async (fun: Promise<boolean>, typeValid: keyEtypeValidator) => {
// 		await fun
// 			.then((resul) => resul)
// 			.catch(() => { throw new Error(EtypeValidator[typeValid]); });
// }