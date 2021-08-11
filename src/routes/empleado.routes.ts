import { Router } from 'express';
import passport from 'passport';
import { Erol } from '../models/model.model';
import {
  AllEmpleados,
  EmpleadoById,
  NewEmpleado,
  UpdateEmpleado
} from '../controllers/empleado.controler';

const router = Router();

router.get(
  '/all',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  AllEmpleados
);

/**
 * get data alumno by matricula
 */
router.get(
  '/:idempleado',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  EmpleadoById
);

/**
 * update data alumno by matricula. Se espera el parametro: data.
 */
router.put(
  '/update',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  UpdateEmpleado
);

/**
 * update data alumno by matricula. Se espera el parametro: data.
 */
router.post(
  '/new',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  NewEmpleado
);


export default router;