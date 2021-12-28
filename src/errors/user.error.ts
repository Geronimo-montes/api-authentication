import util from 'util';
import { HttpCode } from "@interfaces/codes.interface";

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorMessages = {
  USER_NOT_FOUND: "El usuario no se encuentra registrado",
  USER_DUPLICATE: "El usuario ya esta registado en el sistema"

};

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorCodeHttp = {
  USER_NOT_FOUND: HttpCode.C4XX.Bad_Request,
  USER_DUPLICATE: HttpCode.C4XX.Bad_Request,
}

/**
 * Colección codigos de error
 */
export type UserErrorCode = keyof typeof errorMessages;

/**
 * 
 * @param code 
 */
function UserError(code: UserErrorCode) {
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

util.inherits(UserError, Error);

export default UserError;