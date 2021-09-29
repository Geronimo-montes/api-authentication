import documentoModel from '../models/paquete-documentos.model';
import { ResponseData } from "../config/response";
import {
  Eestatus,
  Ipackdocumentacion,
} from '../models/model.model';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

export const GetAllPaquetesDocumentos =
  (req: Request, res: Response, next: NextFunction) => {
    documentoModel
      // LISTAMOS LOS PAQUETES DE DOCUMETNOS REGISTRADOS
      .getAllPaquetesDocumentos()
      // RESPONDEMOS LA SOLICITUD CON UN RESPONSEDATA
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      // EN CASO DE ERROR DESCIAMOS EL ERROR HACIA EL MANEJADOR DE ERRORES
      .catch((err) => next(new Error(err)));
  };

export const GetPaqueteDocumentosById =
  (req: Request, res: Response, next: NextFunction) => {
    const { idpaquete } = req.params;
    documentoModel
      // COSULTAMOs LOS DATOS DEL ID PROPORCIONADO
      .getPaqueteDocumentosById(Number(idpaquete))
      // RESPONDEMOS LA SOLICITUD CON LOS DATOS RESULTANTES
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  };

export const PutPaqueteDocumentos =
  (req: Request, res: Response, next: NextFunction) => {

    const { idpaquete, nombre, descripcion } = req.body;

    console.log(idpaquete, nombre, descripcion);

    documentoModel
      // LANZAMOS LA ACTUALIZACION
      .updatePaqueteDocumentos(idpaquete, nombre, descripcion)
      // RESPONDEMOS LA SOLICITUD CON EL MENSAJE RETORNADO
      .then((respons) => res.status(200).json(new ResponseData(true, respons, null)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  };

export const DeletePaqueteDocumentos =
  (req: Request, res: Response, next: NextFunction) => {

    const { idpaquete, estatus } = req.params;

    documentoModel
      // REGISTRAMOS LOS DATOS DEL PAQUETE
      .deletePaqueteDocumentos(Number(idpaquete), estatus)
      // RESPONDEMOS LA SOLICITUD CON EL MENSAJE RETORNADO
      .then((respons) => res.status(200).json(new ResponseData(true, respons, null)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  }

export const PostPaqueteDocumentos =
  (req: Request, res: Response, next: NextFunction) => {

    const
      files = Array(req.files).values().next().value,
      names = files.map((file: Express.Multer.File) => file.filename)

    documentoModel
      // REGISTRAMOS LOS DATOS DEL PAQUETE
      .newPaqueteDocumentos(req.body, names)
      // RESPONDEMOS LA SOLICITUD CON EL MENSAJE RETORNADO
      .then((respons) => res.status(200).json(new ResponseData(true, respons, null)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  }

