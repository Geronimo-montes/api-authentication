import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
// SERVICES
import AuthService from '@services/auth.service';
import RecogniceFaceService from '@services/recognice_face.service';

import { HTTP } from '@interfaces/http/codes.interface';


const UserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService),
    { email, password } = req.body;

  console.log();
  Log.info(`⚠️🌐💻  AuthRoute: Request--> '..${req.url}'  💻🌐⚠️`);

  InstanceAuthService.SignIn(email, password)
    .then(({ user, token, msg }) =>
      res.status(HTTP.C200.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

const FaceId_Imgs = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    files = req.files; // IS REQUIRED

  console.log();
  Log.info(`⚠️🌐💻  AuthRoute: Request--> '..${req.url}'  💻🌐⚠️`);

  return InstanceRecogniceFace.SignIn()
    .then(({ user, token, msg }) =>
      res.status(HTTP.C200.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

const FaceId_Video = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    files = req.files; // IS REQUIRED

  console.log();
  Log.info(`⚠️🌐💻  AuthRoute: Request--> '..${req.url}'  💻🌐⚠️`);

  return InstanceRecogniceFace.SignIn()
    .then(({ user, token, msg }) =>
      res.status(HTTP.C200.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

const Pin = async (req: Request, res: Response, next: NextFunction) => {
}



export default {
  /**
   * Email y Password.
   */
  UserCredentials,
  /**
   * Facial recognition 
   */
  FaceId_Imgs,
  FaceId_Video,
  /**
   * Pin numeric
   */
  Pin,
}