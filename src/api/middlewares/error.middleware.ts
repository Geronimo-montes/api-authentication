import { HttpCode } from "@interfaces/codes.interface";
import { NextFunction, Request, Response } from "express";

export default (err: any, request: Request, response: Response, next: NextFunction) => {
  if (!err.status)
    err = {
      status: HttpCode.C5XX.Internal_Server_Error,
      name: 'InternalServerError',
      message: 'Internal Server Error',
    }

  return response
    .status(err.status)
    .json(err);
}