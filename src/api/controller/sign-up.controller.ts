import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';

// SERVICES
import AuthService from '@services/auth.service';
import { HttpCode } from '@interfaces/codes.interface';
import { ERol } from '@interfaces/IRol.interface';

/**
 * 
 */
const Admin = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    AuthServiceInstance = Container.get(AuthService),
    { name, email, password } = req.body,
    role = ERol.ADMIN;

  console.log();
  Log.info(`⚠️🌐💻  SINGIN--> '..${req.url}'  💻🌐⚠️`);

  AuthServiceInstance.SignUp({ name, email, password, role })
    .then(({ user, token, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const User = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    AuthServiceInstance = Container.get(AuthService),
    { name, email, password } = req.body,
    _id_admin = req.token._id,
    role = ERol.USER;

  console.log();
  Log.info(`⚠️🌐💻  SINGIN--> '..${req.url}'  💻🌐⚠️`);

  AuthServiceInstance.SignUp({ name, email, password, role }, _id_admin)
    .then(({ user, token, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}


export default {
  /**
   * TODO: Agregar Bloqueo de ruta a nivel de administrador
   * Registro de Administrador
   */
  Admin,
  /**
   * Registro para usuarios
   */
  User,
}