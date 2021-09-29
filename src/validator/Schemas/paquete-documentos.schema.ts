import { Schema } from "express-validator";
import {
	idpaqueteValidator,
	nombrePaqueteValidator,
	descripcionPaqueteValidator,
	numeroDocsPaqueteValidator,
	idpaqueteExistValidator,
} from "../paquete-documentos.validator";
import {
	nombreDocumentoValidator,
	formatoDocumentoValidator,
	pesoDocumentoValidator,
	requeridoDocumentoValidator,
} from "../documento.validator";
import { estatusValidator } from "../comon.validator";

export const paqueteSchemaGetAll: Schema = {};

export const paqueteSchemaGetById: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	}
};

export const paqueteSchemaPut: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	},
	nombre: { ...nombrePaqueteValidator },
	descripcion: { ...descripcionPaqueteValidator },
};

export const paqueteSchemaEstatusPut: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		},
	},
	estatus: { ...estatusValidator }
};

export const paqueteSchemaPost: Schema = {
	nombre: { ...nombrePaqueteValidator },
	descripcion: { ...descripcionPaqueteValidator },
	numero_documentos: { ...numeroDocsPaqueteValidator },
	'nombre.*': { ...nombreDocumentoValidator },
	'formato.*': { ...formatoDocumentoValidator },
	'peso_max.*': { ...pesoDocumentoValidator },
	'requerido.*': { ...requeridoDocumentoValidator },
};