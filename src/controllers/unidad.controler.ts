import unidadModel from "../models/unidad.model";
import { Request, Response } from 'express';
import { ResponseData } from "../config/response";
import { Erol, Iunidadacademica, Iusuario } from "../models/model.model";
import userModel from "../models/user.model";

/**
 * Lista las unidades registradas en el sistema
 */
export const AllUnidadesAcademicas = (req: Request, res: Response) => {
  unidadModel.getAllUnidadesAcademicas()
    .then((data: Iunidadacademica[]) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Obtiene los datos de la unidad academica indicada. Valida que la unidad 
 * sea la correspondiente cuando se trata de un usario con rol: auxiliar, jefatura
 */
export const UnidadAcademicaById = (req: Request, res: Response) => {
  if (!req.params.idunidad) //validamos que el parametro exista
    return res.status(400).json(
      new ResponseData(false, 'No se puede consultar la unidad académica deseada.', null))

  const idunidad = Number(req.params.idunidad);
  const usuario: Iusuario = <Iusuario>req.user; // req.user contiene los datos de usuario

  // para los usuario auxiliar y jefatura se debe validar que el id proporcionado corresponde al de la unidad académica asiganda
  if (usuario.rol === Erol.AUXILIAR || usuario.rol === Erol.JEFATURA) {
    if (usuario.idunidad !== idunidad)
      return res.status(400)
        .json(new ResponseData(false, 'Acceso denegado.', null))
  }

  // Pasados las validaciones se realiza la consulta
  unidadModel.getUnidadAcademicaById(idunidad)
    .then((data: Iunidadacademica) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Actualiza los campos de modificados de la unidad academica seleccionada. 
 * Parametros esperados [unidad_academica]
 */
export const UpdateUnidadAcademica = (req: Request, res: Response) => {
  if (!req.body.unidad_academica) //validamos que el parametro exista
    return res.status(400).json(
      new ResponseData(false, 'No se puede actualizar la unidad académica, identificador no registrado.', null));

  const unidad_academica = req.body.unidad_academica;

  unidadModel.updateUnidadAcademica(unidad_academica)
    .then((data: boolean) => {

      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            'Datos de la unidad académica actualizados con exito.' :
            'Error al actualizar los datos de la unidad académica. Verifique la información.',
          null
        ));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Regisrra una unidad academica nueva en la BD.
 */
export const NewUnidadAcademica = (req: Request, res: Response) => {
  if (!req.body.unidad_academica) //validamos que el parametro exista
    return res.status(400).json(
      new ResponseData(false, 'No se puede registrar la unidad académica proporcionada.', null));

  const unidad_academica: Iunidadacademica = req.body.unidad_academica;

  unidadModel.newUnidadAcademica(unidad_academica)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            'Unidad académica registrada con exito.' :
            'Error al registrar los datos de la unidad académica.',
          null
        ));
    }).catch((err) => res.status(500).send(err));
}