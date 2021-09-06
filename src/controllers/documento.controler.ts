import { Request, Response } from 'express';
import { ResponseData } from "../config/response";
import uploadDocumentoMiddleware from '../middlewares/documento.middleware';
import { Idocumento, Ipackdocumentacion } from '../models/model.model';
import packDocumentoModel from '../models/pack-documento.model';
import { getExtencionFile } from '../middlewares/file.middleware';

/**
 * Lista la información de los paquete de documentos registrados
 */
export const AllPaquetesDocumentos = (req: Request, res: Response) => {
  packDocumentoModel.getAllPaquetesDocumentos()
    .then((data: Ipackdocumentacion[]) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Obtiene la informacion tecnica del paquete de documentos proporcionado
 */
export const PaqueteDocumentosById = (req: Request, res: Response) => {
  if (!req.params.idpaquetedocumentos)
    return res.status(400).json(
      new ResponseData(false, 'El paquete que desea consultar no esta registrado.', null))

  const id_paquete_documentos: number = Number(req.params.idpaquetedocumentos);

  packDocumentoModel.getPaqueteDocumentosById(id_paquete_documentos)
    .then((data: Ipackdocumentacion) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Lista los datos de los documentos que pertenecen al pquete proporcionado
 */
export const DetallePaqueteDocumentos = (req: Request, res: Response) => {
  if (!req.params.idpaquetedocumentos)
    return res.status(400).json(
      new ResponseData(false, 'El paquete que desea consultar no esta registrado.', null))

  const id_paquete_documentos: number = Number(req.params.idpaquetedocumentos);

  packDocumentoModel.getDetallePaqueteDocumentos(id_paquete_documentos)
    .then((data: Idocumento[]) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Revlidar datos de entrada?
 */
export const UpdatePaqueteDocumentos = (req: Request, res: Response) => {
  if (!req.body.data)
    return res.status(400).json(
      new ResponseData(false, 'No se puede actualizar los datos del paquete proporcionado.', null))

  const paquete_documentos: Ipackdocumentacion = req.body.data;

  packDocumentoModel.updatePaqueteDocumentos(paquete_documentos)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            `Datos del paquete ${paquete_documentos.nombre} actualizados con exito.` :
            `Error al actualizar los datos del paquete ${paquete_documentos.nombre}. Verifique la información.`,
          null
        ));
    }).catch((err) => res.status(500).send(err));
}

/*
  ruta_imagen: {},
  nombre: 'assadfsadf',
  descripcion: 'asdfsadfasdf',
  numero_documentos: 3,
  detalleDocumento: [
    {
      foto_ejemplo: {},
      nombre: 'asdfasdf',
      formato: 'jpg',
      peso_max: '1',
      requerido: false
    // },
*/
export const NewPaqueteDocumentos = (req: Request, res: Response) => {

  console.log(req.body.data);

  if (!req.body.data)
    return res.status(400).json(
      new ResponseData(false, 'No se puede registrar los datos del paquete proporcionado. ', null))

  const paquete_documentos = req.body.data;
  packDocumentoModel.newPaqueteDocumentos(paquete_documentos)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            `Datos del paquete ${paquete_documentos.nombre} registrados con exito.` :
            `Error al registrar los datos del paquete ${paquete_documentos.nombre}. Verifique la información.`,
          null
        ));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Actauliza la foto de perfil de usuario del alumno
 */
export const UploadDocumentoAlumno = async (req: Request, res: Response) => {
  try {
    await uploadDocumentoMiddleware(req, res);

    // Validacion de los parametros
    if (!req.file)
      return res.status(400)
        .json(new ResponseData(false, `Favor de subir un archivo.`, null));
    else if (!req.body.matricula)
      return res.status(400)
        .json(new ResponseData(false, `La matricula proporcionada no esta registrada`, null));
    else if (!req.body.idpaquete)
      return res.status(400)
        .json(new ResponseData(false, `Paquete de documentos desconocido.`, null));
    else if (!req.body.iddocumento)
      return res.status(400)
        .json(new ResponseData(false, `Documento no registrado en el paquete.`, null));

    const
      name = `${req.params.name}${getExtencionFile(req.file)}`,
      matricula = req.body.matricula,
      idpaquete = Number(req.body.idpaquete),
      iddocumento = Number(req.body.iddocumento);

    await packDocumentoModel
      .insertDocumentoEntregado(name, matricula, idpaquete, iddocumento)
      .then(() => res.status(200).json(
        new ResponseData(true, `Archivo subido exitosamente.`, null)))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500)
      .json(new ResponseData(
        false,
        `No es posible subir el archivo. Error: ${err}.`,
        null
      ));
  }
}