import uploadPerfilMiddleware from '../middlewares/alumno-perfil.middleware';
import alumnoModel from "../models/alumno.model"
import { getExtencionFile } from '../middlewares/file.middleware'
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
  // VALIDAMOS LA EXISTENCIA DE LOS PARAMETROS
  if (!req.params.idunidad)
    return res.status(400)
      .json(new ResponseData(false, 'La unidad academica que desea consultar no se encuentra registrada.', null));

  const idunidad: number = Number(req.params.idunidad);
  const usuario: Iusuario = <Iusuario>req.user;

  // Se valida si el usuario es auxiliar o jefatura y se compara el parametro de la ruta y el idunidad registrado, si son distintos se deniega el acceso, dado que solo tienen permitido consultar la unidad a la que estan asignados
  if (usuario.rol === Erol.JEFATURA || usuario.rol === Erol.AUXILIAR)
    if (usuario.idunidad !== Number(idunidad))
      return res.status(403)
        .json(new ResponseData(false, 'Acceso denegado. No cuentas con los permisos necesarios.', null));

  //Pasados los filtros de seguridad se listan los alumnos de la unidad academica
  alumnoModel.getAllAlumnosByUnidadAcademica(Number(idunidad))
    .then((data: Ialumno[]) =>
      res.status(200).json(new ResponseData(true, '', data)))
    .catch((err) =>
      res.status(500).json(new ResponseData(false, err, null)))
}

/**
 * Lista los datos de un alumno mediante la matricula proporcionada.
  */
export const AlumnoByMatricula = (req: Request, res: Response) => {
  if (!req.params.matricula)
    return res.status(400)
      .json(new ResponseData(false, 'No se puede consultar el id proporcionado', null))

  const matricula = req.params.matricula;
  alumnoModel.validarMatricula(matricula)
    // RETONARMOS LA SIGUIENTE PROMESA
    .then(() => alumnoModel.getAlumnoByMatricula(matricula))
    .catch((err) => res.status(500).json(new ResponseData(false, err, null)))
    // RESULTADOS DEL REGISTRO
    .then((data) => res.status(200).json(new ResponseData(true, '', data)))
    .catch((err) => res.status(500).json(new ResponseData(false, err, null)))
    // MENSAJE DE FINALIZACION
    .then(() => { console.log('Registro finalizado.'); });
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
    }).catch((err) => res.status(500).json(new ResponseData(false, err, null)));
}

/**
 * Valida si la matricula proporcionada ya se encuentra registrada. Retorna ResponseData: true para el caso de que se encuentre registrada; false: en caso contrario.
 */
export const ValidarMatricula = (req: Request, res: Response) => {
  if (!req.params.matricula)
    return res.status(400).json(
      new ResponseData(false, 'No se ha proporcionado la matricula del alumno.', null));

  alumnoModel.validarMatricula(req.params.matricula)
    .then((response) => res.status(200).json(new ResponseData(true, '', false)))
    .catch((err) => res.status(200).json(new ResponseData(false, err, true)));
}

/**
 * Registra los datos de un alumno nuevo, en el sistema
 * @param req.body: {
 *   perfil: file;
 *   name: string;
 *   matricula: string;
 *   idunidad: number;
 *   nombre: string;
 *   ape_1: string;
 *   ape_2: string;
 *   genero: Egenero;
 *   direccion: string;
 *   telefono: string;
 *   email: string;
 * }
 */
export const NewAlumno = (req: Request, res: Response) => {
  // VALIDAMOS SI RECIBIMOS PARAMETROS
  if (!req.body.data)
    res.status(200).json(
      new ResponseData(false, 'No se puede registrar la información proporcionada.', null));

  // VALIDACIONES DE LOS VALORES RECIBIDOS
  const alumno: Ialumno = req.body.data;
  const err: string | undefined =
    (!alumno.matricula) ?
      `Porfavor proporcione la matricula del alumno.`
      : (!alumno.idunidad) ?
        `Porfavor proporcione la unidad a la que pertenece el alumno.`
        : (!alumno.nombre || !alumno.ape_1) ?
          `Porfavor proporcione el nombre completo. Nombre y primer apellido son obligatorios. `
          : (!alumno.genero) ?
            `Porfavor indique el genero del alumno.`
            : (!alumno.direccion || !alumno.telefono || !alumno.email) ?
              `Porfavor proporcione correo electronico, telefono y dirección.` : undefined;

  // AL PRODUCIRSE UN ERROR, INTERRUMPIMOS EL FLUJO E INFORMAMOS AL USUARIO
  if (err)
    return res.status(500).json(new ResponseData(false, err, null));

  alumnoModel.validarMatricula(alumno.matricula)
    // RETONARMOS LA SIGUIENTE PROMESA
    .then(() => alumnoModel.newAlumno(alumno))
    .catch((err) => res.status(500).json(new ResponseData(false, err, null)))
    // RESULTADOS DEL REGISTRO
    .then(() => res.status(200).json(
      new ResponseData(
        true,
        `Alumno ${alumno.nombre} ${alumno.ape_1} registrado con exito.`,
        null
      )))
    .catch((err) => res.status(500).json(new ResponseData(false, err, null)))
    .then(() => { console.log('Registro finalizado.'); });
}

/**
 * Actauliza la foto de perfil de usuario del alumno
 */
export const UploadPerfil = async (req: Request, res: Response) => {
  try {
    await uploadPerfilMiddleware(req, res); // llamada al middleware

    // Validacion de los parametros
    if (!req.file)
      return res.status(400)
        .json(new ResponseData(false, `Favor de subir un archivo.`, null));
    else if (!req.params.matricula)
      return res.status(400)
        .json(new ResponseData(false, `La matricula proporcionada no esta registrada`, null));

    const
      matricula = req.params.matricula,
      name = req.params.name,
      ext = getExtencionFile(req.file);

    await alumnoModel.updateRutaPerfil(matricula, name, ext)
      .then(() => res.status(200).json(
        new ResponseData(true, `Archivo subido exitosamente.`, null))
      ).catch((err) => console.log({ err }));


  } catch (err) {
    console.log({ err });
    res.status(500)
      .json(new ResponseData(
        false,
        `No es posible subir el archivo. Error: ${err}.`,
        null
      ));
  }
}

/**
 * 
 */
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
    }).catch((err) => res.status(500).json(new ResponseData(false, err, null)));
}
