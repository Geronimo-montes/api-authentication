import paqueteDocumentosModel from "../models/paquete-documentos.model";
import {
	CustomValidator,
	ParamSchema,
} from "express-validator";
import {
	comonValidators,
	isAlphaValidator,
	runCustomValidator,
} from "./comon.validator";

export const idpaqueteValidator: ParamSchema = {
	in: ['body', 'params'],
	...comonValidators,
	isInt: {
		options: {},
		errorMessage: `El identificador del paquete debe ser un valor numerico.`,
		bail: true,
	},
	toInt: {},
};

export const nombrePaqueteValidator: ParamSchema = {
	...isAlphaValidator,
	isLength: {
		options: { min: 5, max: 100, },
		errorMessage: `La lonjitud del nombre del paquete debe contener de 5 a 100 caracteres.`,
		bail: true,
	}
};

export const descripcionPaqueteValidator: ParamSchema = {
	...isAlphaValidator,
	isLength: {
		options: { min: 5, max: 300, },
		errorMessage: `La lonjitud de la descripción del paquete debe contener de 5 a 100 caracteres.`,
		bail: true,
	}
};

export const numeroDocsPaqueteValidator: ParamSchema = {
	in: ['body'],
	...comonValidators,
	isInt: {
		options: {},
		errorMessage: `EL numero de documentos que conforman el paquete debe ser un valor numerico.`,
		bail: true,
	},
	toInt: {},
};

export const idpaqueteExistValidator: CustomValidator =
	async (value) => await runCustomValidator(paqueteDocumentosModel.exists(value), 'EXIST');