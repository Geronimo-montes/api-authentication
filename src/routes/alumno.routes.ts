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
  PutAlumnoEstatus,
  PostAlumno,
  PutAlumno,
  ValidarMatricula,
} from '../controllers/alumno.controler';
import {
  AlumnoSchemaPutEstatus,
  AlumnoSchemaGetAll,
  AlumnoSchemaMatriculaExist,
  AlumnoSchemaMatriculaRegistrer,
  AlumnoSchemaPost,
  AlumnoSchemaPut,
} from '../validator/Schemas/alumno.schema';

const router = Router()
  .use(passport.authenticate(isAuthenticate, { session: false }))
  // LISTAR DATOS DEL ALUMNO MEDIANTE SU MATRICULA
  .get(
    '/:matricula',
    validate(checkSchema(AlumnoSchemaMatriculaExist)),
    AlumnoByMatricula
  )
  // LISTAR ALUMNOS POR UNIDAD ACADEMICA
  .get(
    '/all/:clave',
    validate(checkSchema(AlumnoSchemaGetAll)),
    AllAlumnosByUnidadAcademica
  )
  // VALIDAR EXISTENCIA DE LA MATRICULA EN EL SISTEMA
  .get(
    '/validar/:matricula',
    validate(checkSchema(AlumnoSchemaMatriculaRegistrer)),
    ValidarMatricula,
  )
  .use(passport.authenticate(isAdmin, { session: false }))
  // REGISTRAR NUEVO ALUMNO
  .post(
    '/:matricula',
    validate(checkSchema(AlumnoSchemaMatriculaRegistrer)),
    uploadPerfil.single('perfil'),
    validate(checkSchema(AlumnoSchemaPost)),
    PostAlumno
  )
  // ACTUALIZAR INFORMACION DEL ALUMNO MEDIANTE SU MATRICULA
  .put(
    '/:matricula',
    validate(checkSchema(AlumnoSchemaMatriculaExist)),
    uploadPerfil.none(),
    validate(checkSchema(AlumnoSchemaPut)),
    PutAlumno
  )
  // ALTA / BAJA ALUMNO REGISTRADO
  .put(
    '/:matricula/:estatus',
    validate(checkSchema(AlumnoSchemaPutEstatus)),
    PutAlumnoEstatus
  );

export default router;
