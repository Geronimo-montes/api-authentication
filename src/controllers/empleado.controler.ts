import empleadoModel from "../models/empleado.model"
import { ResponseData } from "../config/response";
import {
  NextFunction,
  Request,
  Response
} from 'express';

/**
 * Lista los empleados registrados en el sistema con rol auxiliar o jefatura.
 */
export const AllEmpleados =
  (req: Request, res: Response, next: NextFunction) => {
    empleadoModel.getAllEmpleados()
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      .catch((err) => next(new Error(err)));
  }

export const AllEmpleadosByUnidad =
  (req: Request, res: Response, next: NextFunction) => {

    const { clave } = req.params;
    empleadoModel.getAllEmpleadosByUnidad(clave)
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      .catch((err) => next(new Error(err)));
  }

/**
 * Lista los datos de un alumno mediante la matricula proporcionada.
  */
export const EmpleadoById =
  (req: Request, res: Response, next: NextFunction) => {
    empleadoModel.getEmpleadoByid(Number(req.params.idempleado))
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      .catch((err) => next(new Error(err)));
  }

/**
 * Se proporciona los datos de un alumno y se actualizan en la base de datos.
 * Parametro esperado [body.data]
 */
export const UpdateEmpleado =
  (req: Request, res: Response, next: NextFunction) => {
    empleadoModel.updateEmpleado({ ...req.body })
      .then((repons: string) =>
        res.status(200).json(new ResponseData(true, repons, null)))
      .catch((err) => next(new Error(err)));
  }

export const UpdateEstatusEmpleado =
  (req: Request, res: Response, next: NextFunction) => {
    const { idempleado, estatus } = req.params;
    empleadoModel.updateEstatusEmpleado(Number(idempleado), estatus)
      .then((repons: string) =>
        res.status(200).json(new ResponseData(true, repons, null)))
      .catch((err) => next(new Error(err)));
  }

/**
 * Registra un nuevo empleado en el sistema 
 */
export const NewEmpleado =
  (req: Request, res: Response, next: NextFunction) => {
    empleadoModel.newEmpleado({ ...req.body, perfil: req.file?.filename })
      .then((repons: string) =>
        res.status(200).json(new ResponseData(true, repons, null)))
      .catch((err) => next(new Error(err)));
  }
