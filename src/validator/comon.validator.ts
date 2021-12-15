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

export const isAlphaValidator: ParamSchema = {
	in: ['body', 'params'],
	// LIMPIAMOS LOS ESPACIOS SOBRANTES
	trim: { options: [' '] },
	// VERIFICAMOS LA EXISTENCIA DE SOLO LETRAS Y ESPACIOS
	isAlpha: {
		options: ['es-ES', { ignore: ' .,:;-_!¡¿?()' }],
		errorMessage: `El parametro {{param}} debe contener unicamente letras.`,
		bail: true,
	},
};