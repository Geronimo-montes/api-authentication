import passport from 'passport';
import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { validate } from '@validator/validator.middleware';
import { singinSchemaPost } from '@validator/Schemas/auth.shema';
import { isAuthenticate } from '@api/middlewares/auth.middleware';

import { SignIn, signOut } from './controllers/auth.controler'

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route
    // INICIAR SESION
    .post(
      '/sign-in',
      validate(checkSchema(singinSchemaPost)),
      SignIn
    )
    // CERRAR SESION
    .use(passport.authenticate(isAuthenticate, { session: false }))
    .delete(
      '/sign-out',
      signOut
    );
}
