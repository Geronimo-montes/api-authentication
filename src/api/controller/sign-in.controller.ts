import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';

import { HttpCode } from '@interfaces/codes.interface';

import ServerError from '@errors/server.error';

import FaceIdService from '@services/face-id.service';
import UserCredentialsService from '@services/user-credentials.service';

/**
 * 
 */
const UserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserCredentialsService = Container.get(UserCredentialsService),
    { email, password } = req.body;

  console.log();
  Log.info(`⚠️🌐💻  SINGIN--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserCredentialsService.SignIn(email, password)
    .then(({ user, token, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const FaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceRecogniceFace = Container.get(FaceIdService),
    files = req.files; // IS REQUIRED

  console.log();
  Log.info(`⚠️🌐💻  SINGIN--> '..${req.url}'  💻🌐⚠️`);

  return InstanceRecogniceFace.SignIn()
    .then(({ user, token, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const Pin = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger');

  console.log();
  Log.info(`⚠️🌐💻  SINGIN--> '..${req.url}'  💻🌐⚠️`);

  return new ServerError('METOD_NOT_IMPLEMENT');
}



export default {
  /**
   * Email y Password.
   */
  UserCredentials,
  /**
   * Facial recognition 
   */
  FaceId,
  /**
   * Pin numeric
   */
  Pin,
}