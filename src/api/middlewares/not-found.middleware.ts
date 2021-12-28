import ServerError from "@errors/server.error";
import { HttpCode } from "@interfaces/codes.interface";
import { NextFunction, Request, Response } from "express";

/**
 * ERROR 404: Not Found
 */
export default (request: Request, response: Response, next: NextFunction) => {
  let err = new ServerError('NOT_FOUND_404');
  err['status'] = HttpCode.C4XX.Not_Found;
  next(err);
}