import { Schema } from "express-validator";
import { emailValidator, nameValidator, passwordValidator } from "../auth.validator";

/**
 * Schema de validacion para la ruta saludo
 */
export const singUpSchemaPost: Schema = {
	name: { ...nameValidator },
	email: { ...emailValidator },
	password: { ...passwordValidator },
};