import { Logger } from 'winston';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import middlewares from '@api/middlewares';

import AuthService from '@services/auth.service';
import Schemas from '@validator';


const route = Router();

export default (app: Router) => {
  app.use('/auth', route)
  route
    .post(
      '/admin/sign-up',
      middlewares.validator(checkSchema(Schemas.auth.signInPost)),
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        Container.get(AuthService)
          .SignUpAdmin(req.body)
          .then(({ user, token }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({ user, token });
          })
          .catch((err) => next(err));
      }
    )
    .post(
      '/sign-up',
      middlewares.validator(checkSchema(Schemas.auth.signInPost)),
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        Container.get(AuthService)
          .SignUp(req.body)
          .then(({ user, token }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({ user, token });
          })
          .catch((err) => next(err));
      }
    )
    .post(
      '/sign-in',
      middlewares.validator(checkSchema(Schemas.auth.signUpPost)),
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        const { email, password } = req.body;

        Container.get(AuthService)
          .SignIn(email, password)
          .then(({ user, token }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({ user, token });
          })
          .catch((err) => {
            console.log({ err });
            return next(err);
          });
      }
    )
    .delete(
      '/sign-out',
      middlewares.validator(checkSchema(Schemas.auth.signOutDelete)),
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        const nameMedod = req.url;
        Promise.resolve({})
          .then(({ }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({ nameMedod });
          })
          .catch((err) => next(err));;
      }
    )
    .put(
      '/refresh-session',
      middlewares.validator(checkSchema(Schemas.auth.refreshSessionPut)),
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        Promise.resolve({})
          .then(({ }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({});
          })
          .catch((err) => next(err));
      }
    )
    .put(
      '/edit-profile',
      middlewares.validator(checkSchema(Schemas.auth.editProfilePut)),
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        Promise.resolve({})
          .then(({ }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({});
          })
          .catch((err) => next(err));
      }
    )
};
