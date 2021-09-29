import { validate } from '../middlewares/validator.middleware';
import { checkSchema } from 'express-validator';
import uploadFile from '../middlewares/documento.middleware';
import passport from 'passport';
import { Router } from 'express';
import {
  isAdmin,
  isAuthenticate,
} from '../middlewares/auth.middleware';
import {
  DonwloadAllFilesByPaquete,
  DonwloadFileDocumentoById,
  GetAllDocumentosByIdpaquete,
  GetDocumentoById,
  GetEntregasByPaqueteMatricula,
  GetFileDocumentoById,
  PostFileDocumento,
  PutFileDocumento,
} from '../controllers/documento.controler';
import {
  documentoSchemaGetAll,
  documentoSchemaGetById,
  documentoSchemaGetFile,
  documentoSchemaGetZip,
  documentoSchemaPost,
  documentoSchemaPut,
} from '../validator/Schemas/documento.schema';

const router = Router()
  .use(passport.authenticate(isAuthenticate, { session: false }))
  // LISTADO DE LOS DOCUMENTOS DE UNA PAQUETE
  .get(
    '/:idpaquete/all',
    validate(checkSchema(documentoSchemaGetAll)),
    GetAllDocumentosByIdpaquete
  )
  // LISTADO DE INFORMACION TECNICA DE UN DOCUMENTO
  .get(
    '/:idpaquete/:iddocumento',
    validate(checkSchema(documentoSchemaGetById)),
    GetDocumentoById
  )
  // LISTADO DE DE DOCUMENTOS ENTREGADOS
  .get(
    '/entregas/:idpaquete/:matricula',
    validate(checkSchema(documentoSchemaGetZip)),
    GetEntregasByPaqueteMatricula
  )
  // GENERA UN DESCARBABLE CON EL PAQUETE DE ENTREGAS
  .get(
    '/download/:idpaquete/:matricula',
    validate(checkSchema(documentoSchemaGetZip)),
    DonwloadAllFilesByPaquete,
  )
  // OBTIENE EL ARCHIVO SOLICITADO
  .get(
    '/:idpaquete/:iddocumento/:matricula',
    validate(checkSchema(documentoSchemaGetFile)),
    GetFileDocumentoById,
  )
  // OBTIENE EL ARCHIVO SOLICITADO
  .get(
    '/download/:idpaquete/:iddocumento/:matricula',
    validate(checkSchema(documentoSchemaGetFile)),
    DonwloadFileDocumentoById,
  )
  // SUBE EL DOCUMENTO INDICADO AL SISTEMA, REGISTRA LA ENTREGA EN LA BD
  .post(
    '/:idpaquete/:iddocumento/:matricula',
    validate(checkSchema(documentoSchemaPost)),
    uploadFile.single('file'),
    PostFileDocumento,
  )
  .use(passport.authenticate(isAdmin, { session: false }))
  // ACTUALIZA LA INFORMACION TECNICA DEL DOCUMENTO
  .put(
    '/:idpaquete/:iddocumento/:matricula',
    validate(checkSchema(documentoSchemaPut)),
    uploadFile.single('file'),
    PutFileDocumento
  )

export default router;