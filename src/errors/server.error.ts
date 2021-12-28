import util from 'util';
import { HttpCode } from "@interfaces/codes.interface";

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorMessages = {
  METOD_NOT_IMPLEMENT: "Ruta no implementada...",
  NOT_FOUND_404: "Not Found 404",
  FAIL_EXECUTE_SCRIPT: "No es posible ejecutar el script",
};

/**
 * Obj accesible con el objeto literal AuthErrorCode
 */
const errorCodeHttp = {
  METOD_NOT_IMPLEMENT: HttpCode.C5XX.Not_Implemented,
  NOT_FOUND_404: HttpCode.C4XX.Not_Found,
  FAIL_EXECUTE_SCRIPT: HttpCode.C5XX.Internal_Server_Error,
}

/**
 * Colección codigos de error
 */
export type ServerErrorCode = keyof typeof errorMessages;

/**
 * 
 * @param code 
 */
function ServerError(code: ServerErrorCode) {
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

util.inherits(ServerError, Error);

export default ServerError;
