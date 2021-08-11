import empleadoModel from "../models/empleado.model"
import { ResponseData } from "../config/response";
import { Iusuario } from "../models/model.model";
import {
  Request,
  Response
} from 'express';

/**
 * Lista los empleados registrados en el sistema con rol auxiliar o jefatura.
 */
export const AllEmpleados = (req: Request, res: Response) => {
  empleadoModel.getAllEmpleados() // Obtenemos el listado de empleados
    .then((data: Iusuario[]) => res.status(200).json(new ResponseData(true, '', data)))
    .catch((err) => res.status(500).send(err));
}

/**
 * Lista los datos de un alumno mediante la matricula proporcionada.
  */
export const EmpleadoById = (req: Request, res: Response) => {
  if (!req.params.idempleado)
    return res.status(400)
      .json(new ResponseData(false, 'No se puede consultar el id proporcionado', null))

  const idempleado: number = Number(req.params.idempleado);
  empleadoModel.getEmpleadoByid(idempleado)
    .then((data: Iusuario) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Se proporciona los datos de un alumno y se actualizan en la base de datos.
 * Parametro esperado [body.data]
 */
export const UpdateEmpleado = (req: Request, res: Response) => {
  if (!req.body.data)
    return res.status(400)
      .json(new ResponseData(false, 'No se puede actualizar el alumno, matricula no valida.', null))

  const empleado: Iusuario = req.body.data;

  empleadoModel.updateEmpleado(empleado)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            `Información del empleado ${empleado.nombre} ${empleado.ape_1} ${empleado.ape_2} actualizados con exito.` :
            `Error al actualizar la información del empleado ${empleado.nombre} ${empleado.ape_1} ${empleado.ape_2}.`,
          null
        ));
    }).catch((err) => res.status(500).send(err));
}

export const NewEmpleado = (req: Request, res: Response) => {
  if (!req.body.data)
    return res.status(400).json(
      new ResponseData(false, 'No se puede registrar la información proporcionada.', null));

  const empleado: Iusuario = req.body.data;

  empleadoModel.newEmpleado(empleado)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            `Empleado ${empleado.nombre} ${empleado.ape_1} ${empleado.ape_2} registrada con exito.` :
            `Error al registrar los datos del empleado ${empleado.nombre} ${empleado.ape_1} ${empleado.ape_2}`,
          null
        ));
    }).catch((err) => res.status(500).send(err));
}
