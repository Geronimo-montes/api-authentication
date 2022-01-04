import util from 'util';
import { HttpCode } from "@interfaces/codes.interface";

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorMessages = {
  CREDENTIALS_NOT_FOUND: "El usuario no se encuentra registrado en el modelo",
  CREDENTIALS_DUPLICATE: "Las credenciales para este usuario ya han sido registradas",
  INVALID_PASSWORD: "La contraseña proporcionada no es correcta.",
};

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorCodeHttp = {
  CREDENTIALS_NOT_FOUND: HttpCode.C4XX.Not_Found,
  CREDENTIALS_DATA_DUPLICATE: HttpCode.C4XX.Bad_Request,
  INVALID_PASSWORD: HttpCode.C4XX.Bad_Request,
}

/**
 * Colección codigos de error
 */
export type CredentialsIdErrorCode = keyof typeof errorMessages;

/**
 * 
 * @param code 
 */
function UserCredentialsError(code: CredentialsIdErrorCode) {
  // 
  Error.captureStackTrace(this, this.constructor);

  // 
  this.name = this.constructor.name;
  // 
  this.message = errorMessages[code];
  // 
  this.status = errorCodeHttp[code];
  // 
  this.code = code;
}

util.inherits(UserCredentialsError, Error);

export default UserCredentialsError;