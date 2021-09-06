import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../config/response";


/**
 * Middleware que se encarga de manejar los errores de la api
 */
export const ErrorHandler =
	(err: IError, req: Request, res: Response, next: NextFunction) => {

		console.error({ err });

		if (res.headersSent)
			return next(err);

		if (err)
			return res.status(500).json(new ResponseData(false, ErrorStr(err), err));

		next();
	}

/**
 * Estructura de los errores producidos en el servidor
 * Tres numeros que indican el error
 * 1: Origen (validators, controler, etc)
 * 2 y 3: numeracion de errores 
 */
export interface IError {
	CODIGO: number;
	ERROR: string;
	MENSAJE: string;
};

/**
 * Funcipn que se encarga de contruir le mensaje de error con el objeto.
 * @param {IError} error 
 * @returns {string}
 */
export const ErrorStr = (error: IError): string => {
	return `Codigo ${error.CODIGO} ${error.ERROR}: ${error.MENSAJE}`;
};

/**
 * Funcion que construye un objeto de tipo IError con la cadena de error proporcionada.
 * @param error 
 * @returns 
 */
export const ErrorObj = (error: string): IError => {
	let str = error.slice(7)

	let err: IError = {
		CODIGO: Number(str.slice(0, 3)),
		ERROR: str.slice(4, str.indexOf(':')),
		MENSAJE: str.slice(str.indexOf(':') + 2),
	};

	return err;
}