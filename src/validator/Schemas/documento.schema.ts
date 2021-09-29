import { Schema } from "express-validator";
import { matriculaExistValidator, matriculaValidator } from "../alumno.validator";
import {
	iddocumentoDocumentoValidator,
	iddocumentoExistValidator,
} from "../documento.validator";
import {
	idpaqueteValidator,
	idpaqueteExistValidator,
} from '../paquete-documentos.validator';

export const documentoSchemaGetAll: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	}
};

export const documentoSchemaGetById: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	},
	iddocumento: {
		...iddocumentoDocumentoValidator,
		custom: {
			options: iddocumentoExistValidator,
			bail: true,
		}
	},
};

export const documentoSchemaGetFile: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	},
	iddocumento: {
		...iddocumentoDocumentoValidator,
		custom: {
			options: iddocumentoExistValidator,
			bail: true,
		}
	},
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true,
		}
	},
};

export const documentoSchemaGetZip: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	},
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true,
		}
	},
};

export const documentoSchemaPost: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	},
	iddocumento: {
		...iddocumentoDocumentoValidator,
		custom: {
			options: iddocumentoExistValidator,
			bail: true,
		}
	},
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true,
		}
	},
};

export const documentoSchemaPut: Schema = {
	idpaquete: {
		...idpaqueteValidator,
		custom: {
			options: idpaqueteExistValidator,
			bail: true,
		}
	},
	iddocumento: {
		...iddocumentoDocumentoValidator,
		custom: {
			options: iddocumentoExistValidator,
			bail: true,
		}
	},
	matricula: {
		...matriculaValidator,
		custom: {
			options: matriculaExistValidator,
			bail: true,
		}
	},
};
