import {
	ResponseData
} from "../config/response";
import {
	MulterError
} from "multer";
import {
	Request,
	Response,
	NextFunction,
} from "express";

/**
 * Manejador de errores provacados por multer
 */
const ErrorHandlerMulter =
	(err: MulterError, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof MulterError) {
			// IMPRIMIMOS EL ERROR EN CONSOLA
			console.log({ err });
			// 
			if (res.headersSent) return next(err);
			// MODIFICAMOS EL MENSAJE PREDEFINIDO POR UNO PERSONALIZADO
			err.message = EmulterErros[err.code];
			// RETORNAMOS EL MENSAJE DE ERRROR
			return res.status(500).json(new ResponseData(false, err.message, err));
		} else {
			next(err);
		}
	}

enum EmulterErros {
	'LIMIT_FIELD_COUNT' = `Se proporcionaron desiados archivos.`,
	'LIMIT_UNEXPECTED_FILE' = `EL formato del archivo no correspondo con el formato esperado.`,
	'LIMIT_FILE_SIZE' = `El archivo es demasiado pesado, exede los 2MB permitidos.`,
	'LIMIT_PART_COUNT' = `El archivo proporcionado no puede ser subido al sistema.`,
	'LIMIT_FILE_COUNT' = `El archivo proporcionado no puede ser subido al sistema.`,
	'LIMIT_FIELD_KEY' = `El archivo proporcionado no puede ser subido al sistema.`,
	'LIMIT_FIELD_VALUE' = `El archivo proporcionado no puede ser subido al sistema.`,
};

export default ErrorHandlerMulter;