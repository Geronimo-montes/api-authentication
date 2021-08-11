import { Router } from 'express';
import passport from 'passport';
import { AllUnidadesAcademicas, NewUnidadAcademica, UnidadAcademicaById, UpdateUnidadAcademica } from '../controllers/unidad.controler';
import { Erol } from '../models/model.model';

const router = Router();

/**
 * Lista de unidades academicas
 */
router.get(
  '/all',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  AllUnidadesAcademicas);

/**
 * Lista los datos de una unidad academica dado un id
 */
router.get(
  '/:idunidad',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  UnidadAcademicaById
);

/**
 * actualiza los datos de una unidad academica; parametro esperado: unidad_academica
 */
router.put(
  '/update',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  UpdateUnidadAcademica
);

/**
 * Registro los datos de una nueva unidad academica en la base de datos
 */
router.post(
  '/new',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  NewUnidadAcademica
);


export default router;