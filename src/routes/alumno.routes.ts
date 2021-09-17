import uploadPerfil from '../middlewares/file-perfil.middleware';
import passport from 'passport';
import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { checkSchema } from 'express-validator';
import {
  isAdmin,
  isAuthenticate
} from '../middlewares/auth.middleware';
import {
  AllAlumnosByUnidadAcademica,
  AlumnoByMatricula,
  GetDocEntregadosAlumnoPack,
  NewAlumno,
  UpdateAlumno,
  ValidarMatricula,
} from '../controllers/alumno.controler';
import {
  AlumnoSchemaGet,
  AlumnoSchemaGetAll,
  AlumnoSchemaGetDoc,
  AlumnoSchemaPost,
  AlumnoSchemaPut,
} from '../validator/Schemas/alumno.schema';

const router = Router()
  .use(passport.authenticate(isAdmin, { session: false }))
  // LISTAR ALUMNOS POR UNIDAD ACADEMICA
  .get(
    '/all/:clave',
    validate(checkSchema(AlumnoSchemaGetAll)),
    AllAlumnosByUnidadAcademica
  )
  // VALIDAR EXISTENCIA DE LA MATRICULA EN EL SISTEMA
  .get(
    '/validar/:matricula',
    validate(checkSchema(AlumnoSchemaGet)),
    ValidarMatricula,
  )
  // REGISTRAR NUEVO ALUMNO
  .post(
    '/new',
    uploadPerfil.single('perfil'),
    validate(checkSchema(AlumnoSchemaPost)),
    NewAlumno
  )
  // ACTUALIZAR INFORMACION DEL ALUMNO MEDIANTE SU MATRICULA
  .put(
    '/update',
    uploadPerfil.none(),
    validate(checkSchema(AlumnoSchemaPut)),
    UpdateAlumno
  )
  .use(passport.authenticate(isAuthenticate, { session: false }))
  // LISTAR DATOS DEL ALUMNO MEDIANTE SU MATRICULA
  .get(
    '/:matricula',
    validate(checkSchema(AlumnoSchemaGet)),
    AlumnoByMatricula
  )
  // 
  .get( //docs
    '/:matricula/:idpaquete',
    validate(checkSchema(AlumnoSchemaGetDoc)),
    GetDocEntregadosAlumnoPack
  );

export default router;