import { ParamSchema } from "express-validator";

/**
 * Validadores de origen comun. Exige que el parametro exista y tenga un valor definido
 */
export const comonValidators: ParamSchema = {
	exists: {
		errorMessage: 'Se requiere el parametro {{param}} a para continuar con la petición.',
		bail: true,
	},
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
	...comonValidators,
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

/**
 * Validador de direcciones.
 */
export const direccionValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	// LIMPIAMOS LOS ESPACIOS SOBRANTES
	trim: {
		options: [' '],
	},
	// VERIFICAMOS EL TIPO DE DATO
	isAlphanumeric: {
		options: ['es-ES', { ignore: ' .,:;-_!¡¿?()', }],
		errorMessage: `El parametro {{param}} debe contener unicamente letras.`,
		bail: true,
	},
};

// Verifica de forma basica si el formato es correcto, aplica los comonValidators, y prepara el tipo de dato
export const emailValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	normalizeEmail: {},
	// VERIFICAMOS EL TIPO DE DATO
	isEmail: {
		errorMessage: `El parametro {{para}} no corresponde a un formato valido de correo electronico.`,
		bail: true,
	},
};

/**
 * Validador para numeros de telefono de 10 a 20 digitos numericos.
 */
export const telefonoValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	// NUMERO DE TELEFONO SIN LETRAS
	isNumeric: {
		errorMessage: `El parametro {{param}} debe contener unicamente valores numericos.`,
		bail: true,
	},
	// LAS CLAVES DE ESCUELA TIENEN 5 DIGITOS
	isLength: {
		options: { min: 10, max: 20, },
		errorMessage: `El parametro {{param}} debe terner una longitud de 10 a 20 caracteres numericos.`,
		bail: true,
	}
};

/**
 * Validator utilizado para el genero. Valores = f -> Femenino, m -> masculino
 */
export const generoValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	// PASAMOS EL VALOR A MINUSCULAS
	toLowerCase: {},
	// CONOCEMOS QUE LA LONGITUD DEL VALOR ES DE 1
	isLength: {
		options: { min: 1, max: 1 },
		errorMessage: `El parametro {{param}} debe de terner un longitud de 1 caracter.`,
		bail: true,
	},
	// VALIDAMOS SI EL VALOR SE ENCUENTRA EN LE ARRAY DE POSIBLES VALORES
	isIn: {
		options: [['f', 'm']],
		errorMessage: `El parametro {{param}} no tiene un valor permitido.`,
		bail: true,
	},
};


/**
 * Validador para estatus que adquieren valores ['a'-'b'].
 */
export const estatusValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	// PASAMOS EL VALOR A MINUSCULAS
	toLowerCase: {},
	// CONOCEMOS QUE LA LONGITUD DEL VALOR ES DE 1
	isLength: {
		options: { min: 1, max: 1 },
		errorMessage: `El parametro {{param}} debe de terner un longitud de 1 caracter.`,
		bail: true,
	},
	// VALIDAMOS SI EL VALOR SE ENCUENTRA EN LE ARRAY DE POSIBLES VALORES
	isIn: {
		options: [['a', 'b']],
		errorMessage: `El parametro {{param}} no tiene un valor permitido.`,
		bail: true,
	},
};

/**
 * Plantillas de mensajes de error predeterminados para las validaciones indicadas
 */
enum EtypeValidator {
	EXIST = `El valor {{value}} del parametro {{param}} no se encuentra registrada en el sistema.`,
	REGISTRER = `El valor {{value}} del parametro {{param}} ya se encuentra registrada en el sistema.`,
}

// Equivalent type keyEtypeValid = 'EXIST' | 'REGISTRER' | 'EMAIL_REGISTRER'
type keyEtypeValidator = keyof typeof EtypeValidator;

/**
 * ejecuta un validador personalizado. Debe ser una promesa<boolean> que resuelva un valor booleano y rechaze nada.
 * @param {Promise<boolean>} fun function Custom validator 
 * @param {keyEtypeValidator} typeValid tipo de validacion a realizar
 */
export const runCustomValidator =
	async (fun: Promise<boolean>, typeValid: keyEtypeValidator) => {
		await fun
			.then((resul) => resul)
			.catch(() => { throw new Error(EtypeValidator[typeValid]); });
	}