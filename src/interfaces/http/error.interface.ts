/**
 * @interface Error
 */
export interface Error {
  /** */
  name: string;
  /** */
  message: string;
  /** Identifying error code. */
  status: HTTPCode.Code;
}