import passport from 'passport';
import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { checkSchema } from 'express-validator';
import { isAuthenticate } from '../middlewares/auth.middleware';
import { singinSchemaPost } from '../validator/Schemas/auth.schema';
import {
  SignIn,
  signOut,
} from '../controllers/user.controler';

const router = Router()
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

export default router;