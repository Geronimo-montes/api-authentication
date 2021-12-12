import { Schema } from "express-validator";
import { emailValidator, nameValidator, passwordValidator } from "../auth.validator";

/**
 * 
 */
export const singUpSchemaPost: Schema = {
	name: { ...nameValidator },
	email: { ...emailValidator },
	password: { ...passwordValidator },
};

/**
 * 
 */
export const singInSchemaPost: Schema = {
	email: { ...emailValidator },
	password: { ...passwordValidator },
};