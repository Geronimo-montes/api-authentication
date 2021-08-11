import alumnoModel from "../models/alumno.model"
import { ResponseData } from "../config/response";
import {
  Request,
  Response
} from 'express';
import {
  Erol,
  Ialumno,
  IdocumentoEntregado,
  Iusuario
} from "../models/model.model";

/**
 * Lista los alumnos de la unidad academica proporcionada.
 */
export const AllAlumnosByUnidadAcademica = async (req: Request, res: Response) => {
  //Se verifica la existencia del parametro
  if (!req.params.idunidad)
    return res.status(400)
      .json(new ResponseData(false, 'La unidad academica que desea consultar no se encuentra registrada.', null))

  const idunidad: number = Number(req.params.idunidad);
  const usuario: Iusuario = <Iusuario>req.user;

  // Se valida si el usuario es auxiliar o jefatura y se compara el parametro de la ruta y el idunidad registrado, si son distintos se deniega el acceso, dado que solo tienen permitido consultar la unidad a la que estan asignados
  if (usuario.rol === Erol.JEFATURA || usuario.rol === Erol.AUXILIAR)
    if (usuario.idunidad !== Number(idunidad))
      return res.status(400)
        .json(new ResponseData(false, 'Acceso denegado.', null));

  //Pasados los filtros de seguridad se listan los alumnos de la unidad academica
  alumnoModel.getAllAlumnosByUnidadAcademica(Number(idunidad))
    .then((data: Ialumno[]) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Lista los datos de un alumno mediante la matricula proporcionada.
  */
export const AlumnoByMatricula = (req: Request, res: Response) => {
  if (!req.params.matricula)
    return res.status(400)
      .json(new ResponseData(false, 'No se puede consultar el id proporcionado', null))

  alumnoModel.getAlumnoByMatricula(req.params.matricula)
    .then((data: Ialumno) => {
      res.status(200)
        .json(new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}

/**
 * Se proporciona los datos de un alumno y se actualizan en la base de datos.
 * Parametro esperado [body.data]
 */
export const UpdateAlumno = (req: Request, res: Response) => {
  if (!req.body.data)
    return res.status(400)
      .json(new ResponseData(false, 'No se puede actualizar el alumno, matricula no valida.', null))

  const alumno: Ialumno = req.body.data;

  alumnoModel.updateAlumno(alumno)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            `Información del alumno ${alumno.nombre} ${alumno.ape_1} ${alumno.ape_2} actualizados con exito.` :
            `Error al actualizar la información del alumno ${alumno.nombre} ${alumno.ape_1} ${alumno.ape_2}.`,
          null
        ));
    }).catch((err) => res.status(500).send(err));
}

export const NewAlumno = (req: Request, res: Response) => {
  if (!req.body.data)
    return res.status(400).json(
      new ResponseData(false, 'No se puede registrar la información proporcionada.', null));

  const alumno: Ialumno = req.body.data;

  alumnoModel.newAlumno(alumno)
    .then((data: boolean) => {
      res.status(200).json(
        new ResponseData(
          data,
          (data) ?
            `Alumno ${alumno.nombre} ${alumno.ape_1} ${alumno.ape_2} registrada con exito.` :
            `Error al registrar los datos del alumno ${alumno.nombre} ${alumno.ape_1} ${alumno.ape_2}`,
          null
        ));
    }).catch((err) => res.status(500).send(err));
}

export const GetDocEntregadosAlumnoPack = (req: Request, res: Response) => {
  if (!req.params.matricula || !req.params.idpaquete)
    return res.status(400).json(
      new ResponseData(false, 'No se puede obtener lo información requerida', null));

  const
    matricula = req.params.matricula,
    idpaquete = Number(req.params.idpaquete);

  alumnoModel.getDocsEntregadosAlumnoPack(matricula, idpaquete)
    .then((data: IdocumentoEntregado[]) => {
      res.status(200).json(
        new ResponseData(true, '', data));
    }).catch((err) => res.status(500).send(err));
}
