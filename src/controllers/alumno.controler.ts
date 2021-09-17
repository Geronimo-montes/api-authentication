import alumnoModel from "../models/alumno.model"
import { ResponseData } from "../config/response";
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  Erol,
  Ialumno,
  IdocumentoEntregado,
  Iusuario,
} from "../models/model.model";

/**
 * Lista los alumnos de la unidad academica proporcionada.
 */
export const AllAlumnosByUnidadAcademica =
  (req: Request, res: Response, next: NextFunction) => {
    const usuario: Iusuario = <Iusuario>req.user;

    switch (usuario.rol) {
      case Erol.AUXILIAR, Erol.JEFATURA:
        // SOLO PUEDEN CONSULTAR LA UNIDAD ACADEMICA A LA QUE ESTAN ASIGNADOS
        if (usuario.clave !== req.params.clave)
          next(`EL usuario ${usuario.nombre} ${usuario.ape_1} no tiene permisos para consultar esta unidad academica.`);
    }

    // LISTAMOS LOS ALUMNOS DE LA UNIDAD ACADEMICA SELECCIONADA
    alumnoModel.getAllAlumnosByUnidadAcademica(req.params.clave)
      .then((data: Ialumno[]) =>
        res.status(200).json(new ResponseData(true, '', data)))
      // EN CASO DE ERROR DESCIAMOS EL ERROR HACIA EL MANEJADOR DE ERRORES
      .catch((err) => next(new Error(err)));
  };

/**
 * Lista los datos de un alumno mediante la matricula proporcionada.
 */
export const AlumnoByMatricula =
  (req: Request, res: Response, next: NextFunction) => {
    alumnoModel
      // ONTENEMOS LA INFORMACION COMPLETA DEL ALUMNO
      .getAlumnoByMatricula(req.params.matricula)
      // RETORNAMOS LA DATA OBTENIDA
      .then((data) => res.status(200).json(new ResponseData(true, '', data)))
      // EN CASO DE ERROR DESCIAMOS EL ERROR HACIA EL MANEJADOR DE ERRORES
      .catch((err) => next(new Error(err)));
  };

/**
 * Registra los datos de un alumno nuevo, en el sistema
 */
export const NewAlumno =
  async (req: Request, res: Response, next: NextFunction) => {
    alumnoModel
      // UNA VEZ SUBIDA LA IMAGEN DE PERFIL REGISTRAMOS LOS DATOS DEL ALUMNO
      .newAlumno({ ...req.body, perfil: req.file?.filename })
      // RESPONDEMOS LA SOLICITUD CON UN RESPONSEDATA
      .then((repons) => res.status(200).json(new ResponseData(true, repons, null)))
      // EN CASO DE ERROR DESCIAMOS EL ERROR HACIA EL MANEJADOR DE ERRORES
      .catch((err) => next(new Error(err)));
  }

/**
 * Se proporciona los datos de un alumno y se actualizan en la base de datos.
 * Parametro esperado [body.data]
 */
export const UpdateAlumno =
  (req: Request, res: Response, next: NextFunction) => {
    alumnoModel
      // SUBIDA LA NUEVA IMAGEN ACTUALIZAMOS LA INFO DEL ALUMNO
      .updateAlumno({ ...req.body, perfil: req.file?.filename })
      // RESPONDEMOS LA SOLICITUD CON UN RESPONSEDATA
      .then((respons) => res.status(200).json(new ResponseData(true, respons, null)))
      // EN CASO DE ERROR DESCIAMOS EL ERROR HACIA EL MANEJADOR DE ERRORES
      .catch((err) => next(new Error(err)));
  };

/**
 * Dentro de los validares realizamos la verificacion de la existencia. LLegado a este punto solo fata retornar un
 */
export const ValidarMatricula =
  (req: Request, res: Response, next: NextFunction) => {
    // LA VALIDACION SE REALIZA DIRECTAMENTE DESDE LA VALIDACION DE LOS PARAMETROS
    return res.status(200).json(new ResponseData(true, '', false));
  };

/**
 * 
 */
export const GetDocEntregadosAlumnoPack =
  (req: Request, res: Response, next: NextFunction) => {
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
      }).catch((err) => res.status(500).json(new ResponseData(false, err, null)));
  }
