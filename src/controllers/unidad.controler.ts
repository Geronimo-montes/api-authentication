import unidadModel from "../models/unidad.model";
import { ResponseData } from "../config/response";
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  Erol,
  Iunidadacademica,
  Iusuario,
} from "../models/model.model";

/**
 * Lista las unidades registradas en el sistema
 */
export const AllUnidades =
  (req: Request, res: Response, next: NextFunction) => {
    unidadModel.getAllUnidadesAcademicas()
      .then((data: Iunidadacademica[]) =>
        res.status(200).json(new ResponseData(true, '', data)))
      .catch((err) => next(new Error(err)));
  }

/**
 * Obtiene los datos de la unidad academica indicada. Valida que la unidad 
 * sea la correspondiente cuando se trata de un usario con rol: auxiliar, jefatura
 */
export const GetUnidadById =
  (req: Request, res: Response, next: NextFunction) => {
    const usuario: Iusuario = <Iusuario>req.user;

    switch (usuario.rol) {
      case Erol.AUXILIAR, Erol.JEFATURA:
        // SOLO PUEDEN CONSULTAR LA UNIDAD ACADEMICA A LA QUE ESTAN ASIGNADOS
        if (usuario.clave !== req.params.clave)
          next(`EL usuario ${usuario.nombre} ${usuario.ape_1} no tiene permisos para consultar esta unidad academica.`);
    }

    // CONSULTAMOS LA UNIDAD ACADEMICA MEDIANTE SU ID
    unidadModel.getUnidadAcademicaById(req.params.clave)
      .then((data: Iunidadacademica) =>
        res.status(200).json(new ResponseData(true, '', data)))
      .catch((err) => next(new Error(err)));
  }

/**
 * Actualiza los campos de modificados de la unidad academica seleccionada. 
 */
export const UpdateUnidadAcademica =
  (req: Request, res: Response, next: NextFunction) => {
    // UPDATE A LA INFORMACION CONTENIDA EN LA PETICION
    unidadModel.updateUnidadAcademica({ ...req.body, perfil: req.file?.filename })
      .then((respons) => res.status(200).json(new ResponseData(true, respons, null)))
      .catch((err) => next(new Error(err)));
  }

/**
 * Regisrra una unidad academica nueva en la BD.
 */
export const NewUnidadAcademica =
  (req: Request, res: Response, next: NextFunction) => {
    // UNA VEZ SUBIDA LA IMAGEN DE PERFIL REGISTRAMOS LOS DATOS DE LA UNIDAD
    unidadModel.newUnidadAcademica({ ...req.body, perfil: req.file?.filename })
      .then((repons) => res.status(200).json(new ResponseData(true, repons, null)))
      .catch((err) => next(new Error(err)));
  }