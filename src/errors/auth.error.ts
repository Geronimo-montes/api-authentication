import util from 'util';
import { HttpCode } from "@interfaces/codes.interface";

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorMessages = {
  UNAUTHORIZED: "No se cuenta con los privilegios necesarios para completar la petición",
};

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorCodeHttp = {
  UNAUTHORIZED: HttpCode.C4XX.Unauthorized,
}

/**
 * Colección codigos de error
 */
export type AuthenticateErrorCode = keyof typeof errorMessages;

/**
 * 
 * @param code 
 */
function AuthenticateError(code: AuthenticateErrorCode) {
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

util.inherits(AuthenticateError, Error);

export default AuthenticateError;
