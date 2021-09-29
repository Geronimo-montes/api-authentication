import { CustomValidator, ParamSchema } from "express-validator";
import documentoModel from "../models/documento.model";
import { comonValidators, isAlphaValidator, runCustomValidator } from "./comon.validator";

export const iddocumentoDocumentoValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	isInt: {
		options: {},
		errorMessage: `El identificador del documento debe ser un valor numerico.`,
		bail: true,
	},
	toInt: {},
};

export const nombreDocumentoValidator: ParamSchema = {
	...isAlphaValidator,
	isLength: {
		options: { min: 5, max: 100, },
		errorMessage: `La lonjitud del nombre del documento debe contener de 5 a 100 caracteres.`,
		bail: true,
	}
};

export const formatoDocumentoValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	isIn: {
		options: [['png', 'jpg', 'pdf']],
		errorMessage: `El formato proporcionado no es soportado por el servidor.`,
		bail: true,
	},
};

export const pesoDocumentoValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	isInt: {
		options: {},
		errorMessage: `EL numero de documentos que conforman el paquete debe ser un valor numerico.`,
		bail: true,
	},
	toInt: true,
};

export const requeridoDocumentoValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	isBoolean: {
		options: {},
		errorMessage: 'El campo requerido requiere un valor booleano.',
		bail: true,
	},
	toBoolean: true,
	customSanitizer: {
		options: ((value, { req }) => (value) ? 'a' : 'b'),
	},
};

export const iddocumentoExistValidator: CustomValidator =
	async (value) =>
		await runCustomValidator(documentoModel.Exist(value), 'EXIST');
