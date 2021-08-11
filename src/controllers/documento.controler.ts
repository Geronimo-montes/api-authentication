import { Request, Response } from 'express';
import { ResponseData } from "../config/response";
import { Idocumento, Ipackdocumentacion } from '../models/model.model';
import packDocumentoModel from '../models/pack-documento.model';

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
