import { ErrorFormatter, ValidationChain, validationResult, } from "express-validator";
import { Request, Response, NextFunction, } from 'express';
import { ResponseData } from "@utils/response";

export default (validations: ValidationChain[]) => {
	return async (request: Request, response: Response, next: NextFunction) => {
		for (let validation of validations) {
			const result: any = await validation.run(request);
			if (result.errors.length) break;
		}

		const err = validationResult(request)
			.formatWith(errorFormatter)
			.array({ onlyFirstError: true })[0];

		if (!err) return next();

		console.error({ err });
		response.status(400).json(new ResponseData(false, err.msg, err));
	}
};

/**
 * Formatea el error para retornar un objeto compuesto
 */
const errorFormatter: ErrorFormatter =
	({ location, param, value, msg, nestedErrors }) => {
		msg = msg.replace('{{param}}', param).replace('{{value}}', value);
		return { location, param, value, msg, nestedErrors };
	};
