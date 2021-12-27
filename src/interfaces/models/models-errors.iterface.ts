import { HTTP } from "@interfaces/http/codes.interface";

/**
 * @interface Error
 */
interface UserModelError extends HTTPCode.ErrorBase {
}


export class UserNotFoundError implements UserModelError {
  name: string;
  message: string;
  status: any;

  constructor(message: string, name?: string, status?: HTTPCode.Code) {
    this.message = message;
    this.name = (name) ? name : 'User Not Found';
    this.status = (status) ? status : HTTP.C400.Not_Found;
  }
}


export class FaceNotFoundError implements UserModelError {
  name: string;
  message: string;
  status: any;

  constructor(message: string, name?: string, status?: HTTPCode.Code) {
    this.message = message;
    this.name = (name) ? name : 'Face Not Found';
    this.status = (status) ? status : HTTP.C400.Not_Found;
  }
}