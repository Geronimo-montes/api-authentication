import uploadPerfil from '../middlewares/file-perfil.middleware';
import passport from 'passport';
import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { checkSchema } from 'express-validator';
import {
  isAdmin,
  isAuthenticate,
} from '../middlewares/auth.middleware';
import {
  AllUnidades,
  NewUnidadAcademica,
  GetUnidadById,
  UpdateUnidadAcademica,
  putEstatusUnidadAcademica
} from '../controllers/unidad.controler';
import {
  UnidadSchemaClavePost,
  UnidadSchemaEstatusPut,
  UnidadSchemaGet,
  UnidadSchemaGetAll,
  UnidadSchemaPost,
  UnidadSchemaPut
} from '../validator/Schemas/unidad.schema';

const router = Router()
  .use(passport.authenticate(isAuthenticate, { session: false }))
  // LISTADO DE LOS DATOS DE UNA UNIDAD MEDIANTE LA CLAVE
  .get(
    '/:clave',
    validate(checkSchema(UnidadSchemaGet)),
    GetUnidadById
  )
  .use(passport.authenticate(isAdmin, { session: false }))
  // LISTADO DE UNIDADES ACADEMICAS REGISTRADAS
  .get(
    '/get/all',
    validate(checkSchema(UnidadSchemaGetAll)),
    AllUnidades
  )
  // REGISTRO DE UNA NUEVA UNIDAD
  .post(
    '/:clave',
    validate(checkSchema(UnidadSchemaClavePost)),
    uploadPerfil.single('perfil'),
    validate(checkSchema(UnidadSchemaPost)),
    NewUnidadAcademica
  )
  // ACTUALIZACION DE LOS DATOS DE LA UNIDAD MEDIANTE SU CLAVE
  .put(
    '/:clave',
    validate(checkSchema(UnidadSchemaGet)),
    uploadPerfil.none(),
    validate(checkSchema(UnidadSchemaPut)),
    UpdateUnidadAcademica
  )
  // ALTA BAJA UNIDAD REGISTRADA EN EL SISTEMA
  .put(
    '/:clave/:estatus',
    validate(checkSchema(UnidadSchemaEstatusPut)),
    putEstatusUnidadAcademica
  );

export default router;
