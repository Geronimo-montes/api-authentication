import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import AuthService from '@services/auth.service';
import middlewares from '@api/middlewares';

import authSchemas from '@validator/Schemas/auth.schema';


const route = Router();

export default (app: Router) => {
  app.use('/auth', route)
  route
    .post(
      '/sign-up',
      middlewares.validator(checkSchema(authSchemas.signInPost)),
      async (req: Request, res: Response, next: NextFunction) => {
        Container.get(AuthService)
          .SignUp(req.body)
          .then(({ user, token }) => res.status(201).json({ user, token }))
          .catch((err) => next(new Error(err.message)))
      }
    )
    .post(
      '/sign-in',
      middlewares.validator(checkSchema(authSchemas.signUpPost)),
      async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        Container.get(AuthService)
          .SignIn(email, password)
          .then(({ user, token }) => res.status(201).json({ user, token }))
          .catch((err) => {
            console.log({ err });
            return next(err);
          });
      }
    )
    .delete(
      '/sign-out',
      middlewares.validator(checkSchema(authSchemas.signOutDelete)),
      async (req: Request, res: Response, next: NextFunction) => {
        const nameMedod = req.url;
        Promise.resolve({})
          .then(({ }) => res.status(201).json({ nameMedod }))
          .catch((err) => next(new Error(err.message)));
      }
    )
    .put(
      '/refresh-session',
      middlewares.validator(checkSchema(authSchemas.refreshSessionPut)),
      async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve({})
          .then(({ }) => res.status(201).json({}))
          .catch((err) => next(new Error(err.message)))
      }
    )
    .put(
      '/edit-profile',
      middlewares.validator(checkSchema(authSchemas.editProfilePut)),
      async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve({})
          .then(({ }) => res.status(201).json({}))
          .catch((err) => next(new Error(err.message)))
      }
    )
};
