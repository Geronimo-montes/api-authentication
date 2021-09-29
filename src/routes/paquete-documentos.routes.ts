import passport from "passport";
import { Router } from "express";
import { checkSchema } from "express-validator";
import { validate } from "../middlewares/validator.middleware";
import uploadPerfil from "../middlewares/file-perfil.middleware";
import {
  isAdmin,
  isAuthenticate,
} from "../middlewares/auth.middleware";
import {
  paqueteSchemaEstatusPut,
  paqueteSchemaGetAll,
  paqueteSchemaGetById,
  paqueteSchemaPost,
  paqueteSchemaPut,
} from "../validator/Schemas/paquete-documentos.schema";
import {
  GetAllPaquetesDocumentos,
  PostPaqueteDocumentos,
  GetPaqueteDocumentosById,
  PutPaqueteDocumentos,
  DeletePaqueteDocumentos,
} from "../controllers/paquete-documentos.controler";

const router = Router()
  .use(passport.authenticate(isAuthenticate, { session: false }))
  // LISTADO DE LOS PAQUETES DE DOCUMENTOS REGISTRADOS
  .get(
    '/get/all',
    validate(checkSchema(paqueteSchemaGetAll)),
    GetAllPaquetesDocumentos
  )
  // LISTADO DE DATOS DEL PAQUETE DE DOCUMENTACION
  .get(
    '/:idpaquete',
    validate(checkSchema(paqueteSchemaGetById)),
    GetPaqueteDocumentosById
  )
  .use(passport.authenticate(isAdmin, { session: false }))
  // ACTUALIZA LA INFORMACION DEL PAQUETE DE DOCUMENTOS
  .put(
    '/:idpaquete',
    uploadPerfil.none(),
    validate(checkSchema(paqueteSchemaPut)),
    PutPaqueteDocumentos
  )
  // BORRA UN PAQUETE DE DOCUMENTOS
  .put(
    '/:idpaquete/:estatus',
    validate(checkSchema(paqueteSchemaEstatusPut)),
    DeletePaqueteDocumentos
  )
  // REGISTAR DE UN NUEVO PAQUETE DE DOCUMENTOS
  .post(
    '/new',
    uploadPerfil.array('files', 20),
    validate(checkSchema(paqueteSchemaPost)),
    PostPaqueteDocumentos
  );

export default router;