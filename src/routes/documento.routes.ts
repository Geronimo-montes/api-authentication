import passport from 'passport';
import { Erol } from '../models/model.model';
import { Router } from 'express';
import { isAdmin, isAuthenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validator.middleware';
import { checkSchema } from 'express-validator';
import {
  AllPaquetesDocumentos,
  DetallePaqueteDocumentos,
  NewPaqueteDocumentos,
  PaqueteDocumentosById,
  UpdatePaqueteDocumentos,
  UploadDocumentoAlumno,
} from '../controllers/documento.controler';

const router = Router()
  .use(passport.authenticate(isAuthenticate, { session: false }))
  // LISTADO DE LOS PAQUETES DE DOCUMENTOS REGISTRADOS
  .get(
    '/all',
    validate(checkSchema({})),
    AllPaquetesDocumentos
  )
  // LISTADO DE DATOS DEL PAQUETE DE DOCUMENTACION
  .get(
    '/:idpaquetedocumentos',
    validate(checkSchema({})),
    PaqueteDocumentosById
  )
  // LISTA DE DOCUMENTOS QUE PERTENECEN AL PAQUETE DE DOCUMENTOS
  .get(
    '/detalle-paquete/:idpaquetedocumentos',
    validate(checkSchema({})),
    DetallePaqueteDocumentos
  )
  // SUBE EL DOCUMENTO INDICADO AL SISTEMA, REGISTRA LA ENTREGA EN LA BD
  .post(
    '/upload/:name',
    passport.authenticate(
      [Erol.DIRECTOR],
      { session: false }
    ),
    UploadDocumentoAlumno
  )
  .use(passport.authenticate(isAdmin, { session: false }))
  // REGISTAR DE UN NUEVO PAQUETE DE DOCUMENTOS
  .post(
    '/new',
    validate(checkSchema({})),
    NewPaqueteDocumentos
  )
  // ACTUALIZA LA INFORMACION DEL PAQUETE DE DOCUMENTOS
  .put(
    '/update',
    validate(checkSchema({})),
    UpdatePaqueteDocumentos
  )

export default router;