import { HTTP } from "@interfaces/http/codes.interface";

/**
 * @interface Error
 */
interface ModelError extends HTTPCode.ErrorBase {
}


export class AuthenticateError implements ModelError {
  name: string;
  message: string;
  status: any;

  constructor(message: string, name?: string, status?: HTTPCode.Code) {
    this.message = message;
    this.name = (name) ? name : 'Authenticate Error';
    this.status = (status) ? status : HTTP.C400.Bad_Request;
  }
}

export class UserNotFoundError implements ModelError {
  name: string;
  message: string;
  status: any;

  constructor(message: string, name?: string, status?: HTTPCode.Code) {
    this.message = message;
    this.name = (name) ? name : 'User Not Found';
    this.status = (status) ? status : HTTP.C400.Not_Found;
  }
}


export class FaceNotFoundError implements ModelError {
  name: string;
  message: string;
  status: any;

  constructor(message: string, name?: string, status?: HTTPCode.Code) {
    this.message = message;
    this.name = (name) ? name : 'Face Not Found';
    this.status = (status) ? status : HTTP.C400.Not_Found;
  }
}

export class ExecuteScriptError implements ModelError {
  name: string;
  message: string;
  status: any;

  constructor(message: string, name?: string, status?: HTTPCode.Code) {
    this.message = message;
    this.name = (name) ? name : 'Execute Script Error';
    this.status = (status) ? status : HTTP.C500.Internal_Server_Error;
  }
}

