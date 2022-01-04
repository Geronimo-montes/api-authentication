import { Schema } from "express-validator";
import { emailValidator, nameValidator, passwordValidator } from "../auth.validator";


const signUpSchemaPost: Schema = {
	name: { ...nameValidator },
	email: { ...emailValidator },
	password: { ...passwordValidator },
};

const signInSchemaPost: Schema = {
	email: { ...emailValidator },
	password: { ...passwordValidator },
};

const signOutSchemaDelete: Schema = {

};

const refreshSessionSchemaPut: Schema = {

};

const editProfileSchemaPut: Schema = {

};

export default {
	/**
	 * 
	 * @description ...
	 * 
	 * @field <String>name
	 * @field <string>email
	 * @field <string>password
	 */
	signUpPost: signUpSchemaPost,

	/**
	 * 
	 * @description ...
	 * 
	 * @field <string>email
	 * @field <string>password
	 */
	signInPost: signInSchemaPost,

	signOutDelete: signOutSchemaDelete,

	refreshSessionPut: refreshSessionSchemaPut,

	editProfilePut: editProfileSchemaPut,
}