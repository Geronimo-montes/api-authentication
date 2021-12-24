import { Error100 } from "./code.error";
import { Error200 } from "./code.error";
import { Error300 } from "./code.error";
import { Error400 } from "./code.error";
import { Error500 } from "./code.error";

/**
 * Ccódigos de respuesta del HTTP
 */
export class HTMLCode {

  /**
   * 1xx: Respuestas informativas
   */
  static get Errs100() {
    return Error100;
  }

  /**
   * 2xx: Peticiones correctas
   */
  static get Errs200() {
    return Error200;
  }

  /**
   * 3xx: Redirecciones
   */
  static get Errs300() {
    return Error300;
  }

  /**
   * 4xx: Errores del cliente
   */
  static get Errs400() {
    return Error400;
  }

  /**
   * 5xx: Errores de servidor
   */
  static get Errs500() {
    return Error500;
  }
}

export interface ErrorBase extends Error {

  /** Name of the MulterError constructor. */
  name: string;

  /** Identifying error code. */
  code: HTMLCode;

  /** Descriptive error message. */
  message: string;
}