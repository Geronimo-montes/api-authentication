import uploadPerfil from '../middlewares/file-perfil.middleware';
import passport from 'passport';
import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { checkSchema } from 'express-validator';
import { isAdmin, isAuthenticate } from '../middlewares/auth.middleware';
import {
  AllEmpleados,
  EmpleadoById,
  NewEmpleado,
  UpdateEmpleado,
  AllEmpleadosByUnidad,
  UpdateEstatusEmpleado
} from '../controllers/empleado.controler';
import {
  EmpleadoEstatusSchemaPut,
  EmpleadoSchemaGet,
  EmpleadoSchemaGetAll,
  EmpleadoSchemaGetAllUnidad,
  EmpleadoSchemaPost,
  EmpleadoSchemaPut,
} from '../validator/Schemas/empleado.schema';

const router = Router()
  .use(passport.authenticate(isAuthenticate, { session: false }))
  .use(passport.authenticate(isAdmin, { session: false }))
  // LISTADO DE TODOS LOS EMPLEADOS REGISTRADOS EN EL SISTEMA
  .get(
    '/',
    validate(checkSchema(EmpleadoSchemaGetAll)),
    AllEmpleados
  )
  // LISTADO DE TODOS LOS EMPLEADOS REGISTRADOS EN EL SISTEMA FILTRADO POR UNIDAD
  .get(
    '/all/:clave',
    validate(checkSchema(EmpleadoSchemaGetAllUnidad)),
    AllEmpleadosByUnidad
  )
  // LISTADO DE LOS DATOS DEL EMPLEADO ESPECIFICADO
  .get(
    '/:idempleado',
    validate(checkSchema(EmpleadoSchemaGet)),
    EmpleadoById
  )
  // ACTUALIZACION DE LA INFORMACION DE UN EMPLEADO
  .put(
    '/:idempleado',
    uploadPerfil.none(),
    validate(checkSchema(EmpleadoSchemaPut)),
    UpdateEmpleado
  )
  .put(
    '/:idempleado/:estatus',
    validate(checkSchema(EmpleadoEstatusSchemaPut)),
    UpdateEstatusEmpleado
  )
  // REGISTRO DE UN NUEVO EMPLEADO
  .post(
    '/new',
    uploadPerfil.single('perfil'),
    validate(checkSchema(EmpleadoSchemaPost)),
    NewEmpleado
  );

export default router;