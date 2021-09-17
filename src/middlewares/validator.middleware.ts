import {
	ResponseData
} from '../config/response';
import {
	Request,
	Response,
	NextFunction,
} from 'express';
import {
	ErrorFormatter,
	ValidationChain,
	validationResult,
} from "express-validator";


/**
 *  para capturar los errores producidos tras validar los parametros
 */
export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		// VERIFICAMOS LA EXISTENCIA DE ERRRORES EN EL ARRAY
		for (let validation of validations) {
			const result: any = await validation.run(req);
			if (result.errors.length) break;
		}

		// TRATAMOS EL ERROR Y OBTENEMOS EL PRIMERO
		const err = validationResult(req)
			// FORMATEAMOS EL OBJETO DE ERROR
			.formatWith(formatErrorValidate)
			// INDICAMOS QUE DEL ARRAY GENERADO SOLO QUEREMOS EL PRIMERO
			.array({ onlyFirstError: true })[0];
		// SI NO EXISTEN ERRORES PASAMOS A LA SIGUIENTE FUNCION DE MIDDLEWARE
		if (!err) return next();
		// IMPRIMIMOS EL ERROR
		console.error({ err });
		// RETORNAMOS EL ERROR QUE SE PRODUJO
		res.status(400).json(new ResponseData(false, err.msg, err));
	}
};

/**
 * Formatea el error para retornar un objeto compuesto
 */
const formatErrorValidate: ErrorFormatter =
	({ location, param, value, msg, nestedErrors }) => {
		msg = msg.replace('{{param}}', param);
		msg = msg.replace('{{value}}', value);
		return { location, param, value, msg, nestedErrors };
	};
