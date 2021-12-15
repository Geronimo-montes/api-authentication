import { Schema } from "express-validator";
import { emailValidator, nameValidator, passwordValidator } from "../auth.validator";

/**
 * @param <String>name
 * @param <string>email
 * @param <string>password
 */
const signUpSchemaPost: Schema = {
	name: { ...nameValidator },
	email: { ...emailValidator },
	password: { ...passwordValidator },
};

/**
 * @param <string>email
 * @param <string>password
 */
const signInSchemaPost: Schema = {
	email: { ...emailValidator },
	password: { ...passwordValidator },
};

/**
 * 
 */
const signOutSchemaDelete: Schema = {

};

/**
 * 
 */
const refreshSessionSchemaPut: Schema = {
};

/**
 * 
 */
const editProfileSchemaPut: Schema = {

};

export default {
	signInPost: signInSchemaPost,
	signUpPost: signUpSchemaPost,
	signOutDelete: signOutSchemaDelete,
	refreshSessionPut: refreshSessionSchemaPut,
	editProfilePut: editProfileSchemaPut,
}