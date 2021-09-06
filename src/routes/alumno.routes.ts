import { Router } from 'express';
import passport from 'passport';
import { Erol } from '../models/model.model';
import {
  AllAlumnosByUnidadAcademica,
  AlumnoByMatricula,
  GetDocEntregadosAlumnoPack,
  NewAlumno,
  UpdateAlumno,
  UploadPerfil,
  ValidarMatricula,
} from '../controllers/alumno.controler';

const router = Router();

/**
 * Lista de alumnos por unidad academica
 */
router.get(
  '/all/:idunidad',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.JEFATURA, Erol.AUXILIAR],
    { session: false }
  ),
  AllAlumnosByUnidadAcademica
);

/**
 * get data alumno by matricula
 */
router.get(
  '/:matricula',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.JEFATURA, Erol.AUXILIAR],
    { session: false }
  ),
  AlumnoByMatricula
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
  UpdateAlumno
);

/**
 * Verifica si la matricula esta registrada en el sistema
 */
router.get(
  '/validar/:matricula',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  ValidarMatricula
)

/**
 * Registra un alumno nuevo. Se espera el parametro: data.
 */
router.post(
  '/new',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  NewAlumno
);

/**
 * update data alumno by matricula. Se espera el parametro: data.
 */
router.get(
  '/:matricula/:idpaquete',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  GetDocEntregadosAlumnoPack
);

/**
 * Actualiza la foto de perfil del alumno
 */
router.post(
  '/upload/:matricula/:name',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  UploadPerfil
);

export default router;