import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from "express-validator";
import { ResponseData } from '../config/response';
import { ErrorObj, ErrorStr, IError } from '../errors/error.middleware';


/**
 * validate se encarga de verificar el resultado de las validaciones individuales. En caso de que alguna de ellas marque un error se retorna un mensaje con los errores resultantes.
 * @param validations 
 * @returns Si no se produce ningun error durante la validación se pasa al controlador. En caso de producirse un error, retorna el error 400 con un array de errores.
 */
export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		for (let validation of validations) {
			const result: any = await validation.run(req);
			if (result.errors.length) break;
		}

		const errors = validationResult(req);
		if (errors.isEmpty()) return next();

		const error = ErrorObj(errors.array()[0].msg);
		console.error({ error });

		res.status(400).json(new ResponseData(
			false,
			ErrorStr(error),
			error
		));
	}
}