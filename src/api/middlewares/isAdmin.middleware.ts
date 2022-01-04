import AuthenticateError from "@errors/auth.error";
import { ERol } from "@interfaces/IRol.interface";
import { NextFunction, Request, Response } from "express";

/**
 * Valid Role Admin
 */
export default (request: Request, response: Response, next: NextFunction) => {
  const role = request.token.role;

  if (role != ERol.ADMIN)
    throw new AuthenticateError('UNAUTHORIZED');

  next();
}