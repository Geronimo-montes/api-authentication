import passport from 'passport';
import { Router } from 'express';
import { signIn, signOut } from '../controllers/user.controler';
import { Erol } from '../models/model.model';

const router = Router();

/**
 * Iniciar sesión
 */
router.post('/sign-in', signIn);

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