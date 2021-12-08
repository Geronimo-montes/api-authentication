import userModel from '../../../models/auth.model';
import { Iusuario } from '../../../models/interface/usuario.interface';
import { ResponseData } from '../../../models/response.model';
import { createToken } from '../../middlewares/auth.middleware';
import { NextFunction, Request, Response } from 'express';

/**
 * Inicio de sesión de usuario. Se proporcionan el usuario y la contraseña para la validacion de inicio de sesión.
 */
export const SignIn = (req: Request, res: Response, next: NextFunction) => {
  // VALIDAMOS LAS CREDENCIALES, SI SON VALIDAS RETRONAMOS LA SIGUIENTE PROMESA
  userModel.singIn(req.body.email, req.body.password)
    // CREAMOS LA SESION DE USUARIO
    .then((idusuario: number) => userModel.insertSesion(idusuario))
    // OBTENEMOS LA DATA COMPETA DEL USUARIO
    .then((idusuario: number) => userModel.getUsuarioById(idusuario))
    // SE CREA EL TOKEN
    .then((usuario: Iusuario) => {
      const token = createToken(usuario);
      res.status(200)
        .json(new ResponseData(true, 'Sesión iniciada con exito.', { token }));
    }).catch((err) => next(new Error(err)));
}

/**
 * Cierre de sesion de usuario. Elimina el token de accceso de la base de datos, marca el usuario como desconectado.
 */
export const signOut = (req: Request, res: Response, next: NextFunction) => {
  const usuario: Iusuario = <Iusuario>req.user;

  userModel.deleteSesion(usuario.idusuario)
    // BORRAMOS LA SESIÓN
    .then(() => res.status(200).json(new ResponseData(true, 'Cierre de sesion exitoso.', null)))
    .catch((err) => next(new Error(err)));
}
