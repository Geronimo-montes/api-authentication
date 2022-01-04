import { ValidationError, validationResult } from "express-validator";
import { ValidationChain } from "express-validator";
import { ErrorFormatter } from "express-validator";
import { NextFunction, } from 'express';
import { Container } from "typedi";
import { Response } from 'express';
import { Request } from 'express';
import { Logger } from "winston";
import { result } from "lodash";

/* TODO: FORMATO PARA LAS VALIDACIONES DE PARAMETROS
{
	"code" : 1024,
	"message" : "Validation Failed",
		"errors" : [
			{
				"code": 5432,
				"field": "first_name",
				"message": "First name cannot have fancy characters"
			},
			{
				"code": 5622,
				"field": "password",
				"message": "Password cannot be blank"
			}
		]
}
*/

export default (validations: ValidationChain[]) => {
	return async (request: Request, response: Response, next: NextFunction) => {
		const LOG = <Logger>Container.get('logger');


		for (let validation of validations)
			await validation.run(request);

		const errs: ValidationError[] = validationResult(request)
			.formatWith(errValidationFormatter)
			.array({ onlyFirstError: true });

		if (!errs || errs.length == 0) return next();

		const _json = {
			code: 1024,
			message: 'Validations Params Error',
			errs,
		}

		LOG.error(errs)
		return response.status(400).json(_json);
	}
};

/**
 * Formatea el error para retornar un objeto compuesto
 */
const errValidationFormatter: ErrorFormatter =
	({ location, param, value, msg, nestedErrors }) => {
		msg = msg
			.replace('{{param}}', param)
			.replace('{{value}}', value);

		return { location, param, value, msg, nestedErrors };
	};
