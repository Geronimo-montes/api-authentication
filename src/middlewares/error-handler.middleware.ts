import {
	ResponseData
} from "../config/response";
import {
	Request,
	Response,
	NextFunction,
} from "express";


/**
 * Middleware que se encarga de manejar los errores de la clase Error
 */
const ErrorHandler =
	(err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof Error) {
			// IMPRIMIMOS EL ERROR EN CONSOLA
			console.log({ err }, 'ERROR');
			// 
			if (res.headersSent) return next(err);
			// RETORNAMOS EL MENSAJE DE ERRROR
			return res.status(500).json(new ResponseData(false, err.message, err));
		} else {
			next(err);
		}
	}

export default ErrorHandler;