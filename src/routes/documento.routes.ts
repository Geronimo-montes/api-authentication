import passport from 'passport';
import { Erol } from '../models/model.model';
import { Router } from 'express';
import {
  AllPaquetesDocumentos,
  DetallePaqueteDocumentos,
  NewPaqueteDocumentos,
  PaqueteDocumentosById,
  UpdatePaqueteDocumentos,
  UploadDocumentoAlumno,
} from '../controllers/documento.controler';

const router = Router();

/**
 * Lista de paquetes de documentos registrados
 */
router.get(
  '/all',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  AllPaquetesDocumentos
);

/**
 * Lista ls informacion tecnica de el  paquete de documentos indicado. Solo incluye la informacion del paquete.
 */
router.get(
  '/:idpaquetedocumentos',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  PaqueteDocumentosById
);

/**
 * Lista la informacion de los documentos que pertenecen al paquete indicado.
 */
router.get(
  '/detalle-paquete/:idpaquetedocumentos',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  DetallePaqueteDocumentos
);

/**
 * Lista la informacion de los documentos que pertenecen al paquete indicado.
 */
router.put(
  '/update',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  UpdatePaqueteDocumentos
);

/**
 * Lista la informacion de los documentos que pertenecen al paquete indicado.
 */
router.post(
  '/new',
  passport.authenticate(
    [Erol.DIRECTOR, Erol.AUXILIAR, Erol.JEFATURA],
    { session: false }
  ),
  NewPaqueteDocumentos
);


router.post(
  '/upload/:name',
  passport.authenticate(
    [Erol.DIRECTOR],
    { session: false }
  ),
  UploadDocumentoAlumno
);

export default router;