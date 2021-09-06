import passport from 'passport';
import { Router } from 'express';
import { SignIn, signOut } from '../controllers/user.controler';
import { Erol } from '../models/model.model';

import { validate } from '../validator/validator';
import { checkSchema } from 'express-validator';
import { emailValidator, passwordValidator } from '../validator/auth.validator';

const router = Router();

/**
 * Iniciar sesión
 */
router.post(
  '/sign-in',
  validate(
    checkSchema({
      email: { ...emailValidator },
      password: { ...passwordValidator }
    })
  ),
  SignIn);

/**
 * Cerrar sesión
 */
router.delete(
  '/sign-out',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  signOut);

export default router;