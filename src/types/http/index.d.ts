import { C100, C200, C300, C400, C500 } from "@interfaces/http/codes.interface";
import { Error } from "@interfaces/http/error.interface";
import { type } from "os";

declare global {
  /**
   * @namespace HTTPError
   */
  namespace HTTPCode {

    /**
     * @interface HTTPCodes
     */
    export type Code = C100 | C200 | C300 | C400 | C500;

    /**
     * @interface Error
     */
    type ErrorBase = Error;
  }
}