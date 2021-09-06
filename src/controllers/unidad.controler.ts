import unidadModel from "../models/unidad.model";
import { NextFunction, Request, Response } from 'express';
import { ResponseData } from "../config/response";
import { Erol, Iunidadacademica, Iusuario } from "../models/model.model";
import { IError } from "../errors/error.middleware";
import { ERRORS_VALIDATOR } from "../errors/error.validators";

/**
 * Lista las unidades registradas en el sistema
 */
export const AllUnidades = (req: Request, res: Response, next: NextFunction) => {
  unidadModel.getAllUnidadesAcademicas()
    .then((data: Iunidadacademica[]) =>
      res.status(200).json(new ResponseData(true, '', data)))
    .catch((err: IError) => next(err));
}

/**
 * Obtiene los datos de la unidad academica indicada. Valida que la unidad 
 * sea la correspondiente cuando se trata de un usario con rol: auxiliar, jefatura
 */
export const GetUnidadById = (req: Request, res: Response, next: NextFunction) => {
  const idunidad = Number(req.params.idunidad);
  const usuario: Iusuario = <Iusuario>req.user;

  switch (usuario.rol) {
    case Erol.AUXILIAR, Erol.JEFATURA:
      // SOLO PUEDEN CONSULTAR LA UNIDAD ACADEMICA A LA QUE ESTAN ASIGNADOS
      if (usuario.idunidad !== idunidad)
        next(ERRORS_VALIDATOR.UNIDAD.UNAUTORIZED);
  }

  unidadModel.getUnidadAcademicaById(idunidad)
    // CONSULTAMOS LA UNIDAD ACADEMICA MEDIANTE SU ID
    .then((data: Iunidadacademica) =>
      res.status(200)
        .json(new ResponseData(true, '', data)))
    .catch((err) => next(err));
}

/**
 * Actualiza los campos de modificados de la unidad academica seleccionada. 
 * Parametros esperados [data]
 */
export const UpdateUnidadAcademica = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  unidadModel.updateUnidadAcademica(data)
    .then((respons: string) =>
      res.status(200).json(new ResponseData(true, respons, null)))
    .catch((err: IError) => next(err));
}

/**
 * Regisrra una unidad academica nueva en la BD.
 */
export const NewUnidadAcademica = (req: Request, res: Response, next: NextFunction) => {
  const data: Iunidadacademica = req.body;

  unidadModel.newUnidadAcademica(data)
    .then((repons: string) =>
      res.status(200).json(
        new ResponseData(true, repons, null)))
    .catch((err: IError) => next(err));
}