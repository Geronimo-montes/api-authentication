import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
// SERVICES
import AuthService from '@services/auth.service';
import RecogniceFaceService from '@services/recognice_face.service';

import { HTTP } from '@interfaces/http/codes.interface';
import { FaceNotFoundError, UserNotFoundError } from '@interfaces/models/models-errors.iterface';
import { IUser } from '@interfaces/models/IUser.interface';

const UserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService),
    { email, password } = req.body;

  InstanceAuthService.SignIn(email, password)
    .then(({ user, token }) => {
      const msg = `Inicio de Sesión Exitoso`
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${user.email}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ user, token, msg });
    })
    .catch((err) => next(err));
}

const FaceId_Imgs = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    InstanceAuthService = Container.get(AuthService);

  InstanceRecogniceFace.RecognizeFaceFromGalery()
    .then((data) => {
      if (data == 'unknown')
        throw new FaceNotFoundError('Face Not Recongized');

      return InstanceAuthService.GetUser({ name: data })
    })
    .then((user: IUser) =>
      InstanceRecogniceFace.SignIn(user)
    )
    .then(({ user, token }) => {
      const msg = `Inicio de Sesión Exitoso`
      Log.info(`⚠️🌐 🌐💻  AuthRoute: '${user.email}: ${msg}'  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ user, token, msg });
    })
    .catch((err) => {
      if (err == 'Error: Usuario no registrado')
        return next(new UserNotFoundError('Usuario no Registrado'));

      return next(err);
    });
}

const FaceId_Video = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    InstanceAuthService = Container.get(AuthService);

  InstanceRecogniceFace.RecognizeFaceFromGalery()
    .then((data) =>
      InstanceAuthService.GetUser(data))
    .then(({ email, password }) =>
      InstanceAuthService.SignIn(email, password))
    .then(({ user, token }) => {
      const msg = `Inicio de Sesión Exitoso`
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${user.email}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ user, token, msg });
    })
    .catch((err) => {
      if (err == 'Error: Usuario no registrado')
        return next(new UserNotFoundError('Usuario no Registrado'));

      return next(err);
    });
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