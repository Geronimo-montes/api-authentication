import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
// SERVICES
import AuthService from '@services/auth.service';
import RecogniceFaceService from '@services/recognice_face.service';

import { HTTP } from '@interfaces/http/codes.interface';

const FindOne = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService);

  Promise.resolve('Resolve...')
    .then((data) => {
      const msg = ``;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${data}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ msg });
    })
    .catch((err) => next(err));
}

const All = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService);

  Promise.resolve('Resolve...')
    .then((data) => {
      const msg = ``;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${data}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ msg });
    })
    .catch((err) => next(err));
}

const UpdeteOne = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService);

  Promise.resolve('Resolve...')
    .then((data) => {
      const msg = ``;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${data}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ msg });
    })
    .catch((err) => next(err));
}

const DeleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService);

  Promise.resolve('Resolve...')
    .then((data) => {
      const msg = ``;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${data}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ msg });
    })
    .catch((err) => next(err));
}

export default {
  /**
   * Get data by user.id
   */
  FindOne,
  /**
   * Listado de usuarios registrados rol = 'User
   */
  All,
  /**
  * Update
  */
  UpdeteOne,
  /**
  * Delete
  */
  DeleteOne,

}