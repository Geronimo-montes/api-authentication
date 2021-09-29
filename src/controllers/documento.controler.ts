import compressing from 'compressing';
import documentoModel from '../models/documento.model';
import packDocumentoModel from '../models/documento.model';
import fs from 'fs';
import {
  ResponseData
} from "../config/response";
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import path from 'path';

export const GetAllDocumentosByIdpaquete =
  (req: Request, res: Response, next: NextFunction) => {
    const { idpaquete } = req.params;
    packDocumentoModel
      // REALIZAMOS LA PERTICION DEL DETALLE DEL PAQUETE
      .getDocumentosByPaquete(Number(idpaquete))
      // RESPONDEMOS LA SOLICITUD CON EL MENSAJE RETORNADO
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  }

export const GetDocumentoById =
  (req: Request, res: Response, next: NextFunction) => {
    const { idpaquete, iddocumento } = req.params;
    documentoModel
      // RALIZAMOS LA PETICION DEL DETALLE DEL DOCUMENTO
      .getDocumentoById(Number(idpaquete), Number(iddocumento))
      // RESPONDEMOS LA SOLICITUD CON EL MENSAJE RETORNADO
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  }

export const GetEntregasByPaqueteMatricula =
  (req: Request, res: Response, next: NextFunction) => {
    const { idpaquete, matricula } = req.params;
    documentoModel
      // RALIZAMOS LA PETICION DEL DETALLE DEL DOCUMENTO
      .getDocsEntregadosAlumnoPack(Number(idpaquete), matricula)
      // RESPONDEMOS LA SOLICITUD CON EL MENSAJE RETORNADO
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      // RESPONDEMOS EN CASO DE ERROR CON EL DESCIO DE ERROR HACIA EL MANEJADOR
      .catch((err) => next(new Error(err)));
  }

export const DonwloadAllFilesByPaquete =
  (req: Request, res: Response, next: NextFunction) => {
    const
      { idpaquete, matricula } = req.params,
      pathDir = `${__dirname}/../private/temp/zip`,
      pathZip = `${__dirname}/../private/temp/compres.zip`;


    // CREAMOS LA CARPETA CONTENEDORA DE LOS ARCHIVOS A COMPRIMIR
    fs.promises.mkdir(pathDir)
      // RALIZAMOS LA PETICION DEL DETALLE DEL LA ENTREGA
      .then(() => documentoModel
        .getDocumentosEntregadosByPaquete(Number(idpaquete), matricula))
      // MOVEMOS LOS DOCUMENTOS A LA CARPETA
      .then((data) => Promise.all(data.map((d) => fs.copyFileSync
        (d.ruta, `${pathDir}/${d.iddocumento}${path.extname(d.ruta)}`))
      ))
      // CREAMOS EL ARCHIVO COMPRIMIDO
      .then(() => compressing.zip.compressDir(pathDir, pathZip))
      // DESCARGAMOS EL ZIP
      .then(() => res.download(pathZip))
      // REDIRIGIMOS AL MANEJADOR DE ERRORES 
      .catch((err) => next(new Error(err)))
      // ELIMINAMOS LA CARPETA CONTENEDORA DE LOS ARCHIVOS COMPRIMIDOS
      .finally(() => {
        fs.rmdirSync(pathDir, { recursive: true });
      });
  }

export const GetFileDocumentoById =
  (req: Request, res: Response, next: NextFunction) => {
    const { idpaquete, iddocumento, matricula } = req.params;
    documentoModel
      // RALIZAMOS LA PETICION DEL DETALLE DEL LA ENTREGA
      .getDocumentoEntregadoById(Number(idpaquete), Number(iddocumento), matricula)
      // RESPONDEMOS LA SOLICITUD CON EL ARCHIVO
      .then((data) => res.sendFile(data.ruta))
      // REDIRIGIMOS AL MANEJADOR DE ERRORES 
      .catch((err) => next(new Error(err)))
  }

export const DonwloadFileDocumentoById =
  (req: Request, res: Response, next: NextFunction) => {
    const
      { idpaquete, iddocumento, matricula } = req.params;
    documentoModel
      // RALIZAMOS LA PETICION DEL DETALLE DEL LA ENTREGA
      .getDocumentoEntregadoById(Number(idpaquete), Number(iddocumento), matricula)
      // RESPONDEMOS LA SOLICITUD CON EL ARCHIVO
      .then((data) => res.download(data.ruta))
      // REDIRIGIMOS AL MANEJADOR DE ERRORES 
      .catch((err) => next(new Error(err)))
  }

export const PostFileDocumento =
  (req: Request, res: Response, next: NextFunction) => {
    const
      filename = `${req.file?.destination.replace('\\', '/')}\\${req.file?.filename}`,
      { idpaquete, iddocumento, matricula } = req.params;

    documentoModel
      // OBTENEMOS LOS DATOS TECNICOS DEL DOCUMENTO
      .getDocumentoById(Number(idpaquete), Number(iddocumento))
      // REGISTRAMOS LA ENTREGA DEL DOCUMENTO JUNTO CON LA UBICACION ASIGNADA
      .then((data) => documentoModel.insertDocumentoEntregado(
        filename, matricula, Number(idpaquete), Number(iddocumento)))
      // RESPONDEMOS CON EL ARCHIVO
      .then((respons) => res.status(200).json(new ResponseData(true, respons, null)))
      // EN CASO DE ERROR
      .catch((err) => {
        fs.unlink(filename, (err) => next(err))
        next(new Error(err));
      });
  }

export const PutFileDocumento =
  (req: Request, res: Response, next: NextFunction) => {
    const
      filename = `${req.file?.destination.replace('\\', '/')} / ${req.file?.filename}`,
      { idpaquete, iddocumento, matricula } = req.params;

    documentoModel
      // RALIZAMOS LA PETICION DEL DETALLE DEL LA ENTREGA
      .getDocumentoEntregadoById(Number(idpaquete), Number(iddocumento), matricula)
      // LANZAMOS LA ACTUALIZACION
      .then((data) =>
        documentoModel.updateDocumentoEntregado(
          filename, data.ruta, data.matricula, data.idpaquete, data.iddocumento))
      .then((ruta) => {
        fs.unlink(ruta, (err) => {
          return (err) ?
            Promise.reject(err) :
            Promise.resolve();
        });
      })
      .then(() => res.status(200).json(new ResponseData(true, 'Si se pudo', null)))
      // REDIRIGIMOS AL MANEJADOR DE ERRORES 
      .catch((err) => next(new Error(err)))
  };