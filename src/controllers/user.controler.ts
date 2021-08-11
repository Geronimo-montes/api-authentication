import userModel from '../models/user.model';
import { Request, Response } from 'express';
import { Iusuario } from '../models/model.model';
import { ResponseData } from '../config/response';
import { createToken, getDataOfToken, getToken } from './jwt.controler';


/**
 * Inicio de sesión de usuario. Se proporcionan el usuario y la contraseña para la validacion de inicio de sesión.
 * @param req email password
 * @param res 
 * @returns 
 */
export const signIn = (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400)
      .json(new ResponseData(false, 'Porfavor envia tu correo y contraseña', null));
  //obtenemos los datos de la cuenta
  userModel.singIn(req.body.email, req.body.password)
    .then((resSingIn: Iusuario) => {
      if (resSingIn) {
        // data del usuario
        userModel.getUsuarioById(resSingIn.idusuario)
          .then((usuario) => {
            if (usuario) {
              const token = createToken(usuario);
              //insertamos la bandera de sesion para indicar que el usuario esta conectado
              userModel.insertSesion(resSingIn.idusuario)
                .then(() => {
                  res.status(200)
                    .json(new ResponseData(true, 'Sesión iniciada con exito', { token }));
                }).catch((err) => res.status(500).send(err)); // catch inserttoken
            } else {
              res.status(200).json(
                new ResponseData(false, 'No es posible obtener los datos de usuario.', null)); //error if data
            }
          }).catch((err) => res.status(500).send(err)); //catch getdata
      } else {
        res.status(200).json(
          new ResponseData(false, 'Correo y/o contraseña incorrectos.', null)); // error if usuario
      }
    }).catch((err) => res.status(500).send(err)); //catch getusuario
}

/**
 * Cierre de sesion de usuario. Elimina el token de accceso de la base de datos, marca el usuario como desconectado.
 * @param req 
 * @param res 
 */
export const signOut = (req: Request, res: Response) => {
  const token: string = getToken(req.headers);
  const usuario: Iusuario = getDataOfToken(token).usuario;

  userModel.deleteSesion(usuario.idusuario)
    .then((data) => {
      if (data)
        res.status(200)
          .json(new ResponseData(true, 'Cierre de sesion exitoso.', null));
      else
        res.status(200)
          .json(new ResponseData(false, 'Error al cerrar la sesion', null));
    })
    .catch((err) => res.status(500).send(err)); // catch inserttoken
}
