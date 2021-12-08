import { Schema } from "express-validator";
import { emailValidator, passwordValidator, } from "@validator/auth.validator";

/**
 * Realiza las validaciones necesarias para iniciar sesion
 */
export const singinSchemaPost: Schema = {
	email: { ...emailValidator },
	password: { ...passwordValidator }
};