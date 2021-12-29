import util from 'util';
import { HttpCode } from "@interfaces/codes.interface";

const errorMessages = {
  METOD_NOT_IMPLEMENT: "Metodo no implementado para la URI solicitada",
  NOT_FOUND_404: "Not Found 404",
  FAIL_EXECUTE_SCRIPT: "No es posible ejecutar el script",
  TYPE_FILE_NOT_SUPORTED: "El tipo de archivo no es compatible con el servidor",
  METHOD_NOT_ALLOWED: "La URI de la petición no soporta el metodo solicitado",
};

const errorCodeHttp = {
  METOD_NOT_IMPLEMENT: HttpCode.C5XX.Not_Implemented,
  NOT_FOUND_404: HttpCode.C4XX.Not_Found,
  FAIL_EXECUTE_SCRIPT: HttpCode.C5XX.Internal_Server_Error,
  TYPE_FILE_NOT_SUPORTED: HttpCode.C4XX.Not_Acceptable,
  METHOD_NOT_ALLOWED: HttpCode.C4XX.Method_Not_Allowed
}

export type ServerErrorCode = keyof typeof errorMessages;

function ServerError(code: ServerErrorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = errorMessages[code];
  this.status = errorCodeHttp[code];
  this.code = code;
}

util.inherits(ServerError, Error);

export default ServerError;
