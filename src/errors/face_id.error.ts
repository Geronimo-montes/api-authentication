import util from 'util';
import { HttpCode } from "@interfaces/codes.interface";

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorMessages = {
  FACE_NOT_FOUND: "El usuario no se encuentra registrado en el modelo",
  FACE_DATA_DUPLICATE: "EL usuario ya se ha registrado en el modelo",
};

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorCodeHttp = {
  FACE_NOT_FOUND: HttpCode.C4XX.Not_Found,
  FACE_DATA_DUPLICATE: HttpCode.C4XX.Bad_Request,
}

/**
 * Colección codigos de error
 */
export type FaceIdErrorCode = keyof typeof errorMessages;

/**
 * 
 * @param code 
 */
function FaceIdError(code: FaceIdErrorCode) {
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

util.inherits(FaceIdError, Error);

export default FaceIdError;