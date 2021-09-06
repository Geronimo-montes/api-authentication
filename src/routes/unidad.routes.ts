import passport from 'passport';
import { Router } from 'express';
import { Erol } from '../models/model.model';
import { validate } from '../validator/validator';
import { checkSchema } from 'express-validator';
import {
  AllUnidades,
  NewUnidadAcademica,
  GetUnidadById,
  UpdateUnidadAcademica
} from '../controllers/unidad.controler';
import {
  claveValidator,
  direccionValidator,
  idunidadValidator,
  isAlphaValidator,
  telefonoValidator,
  emailValidator,
  claveIsRegistrerValidator,
  claveExistValidator,
  emailIsRegistrerValidator,
} from '../validator/unidad.validator';

const router = Router();

/**
 * Lista de unidades academicas
 */
router.get(
  '/all',
  passport.authenticate([Erol.DIRECTOR], { session: false }),
  AllUnidades
);

/**
 * Lista los datos de una unidad academica dado un id
 */
router.get(
  '/:idunidad',
  validate(
    checkSchema({
      idunidad: { ...idunidadValidator },
    }),
  ),
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  GetUnidadById
);

/**
 * actualiza los datos de una unidad academica; parametro esperado: unidad_academica
 */
router.put(
  '/update',
  validate(
    checkSchema({
      idunidad: { ...idunidadValidator, },
      clave: {
        ...claveValidator,
        custom: { options: claveExistValidator, bail: true }
      },
      nombre: { ...isAlphaValidator },
      direccion: { ...direccionValidator },
      correo: { ...emailValidator },
      telefono: { ...telefonoValidator },
    }),
  ),
  passport.authenticate([Erol.DIRECTOR], { session: false }),
  UpdateUnidadAcademica
);

/**
 * Registro los datos de una nueva unidad academica en la base de datos
 * clave, nombre, perfil, direccion, correo, telefono
 */
router.post(
  '/new',
  validate(
    checkSchema({
      clave: {
        ...claveValidator,
        custom: { options: claveIsRegistrerValidator, bail: true },
      },
      nombre: { ...isAlphaValidator },
      direccion: { ...direccionValidator },
      correo: {
        ...emailValidator,
        custom: { options: emailIsRegistrerValidator, bail: true },
      },
      telefono: { ...telefonoValidator },
    }),
  ),
  passport.authenticate([Erol.DIRECTOR], { session: false }),
  NewUnidadAcademica
);

export default router;
