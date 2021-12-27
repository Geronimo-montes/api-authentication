import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';

// SERVICES
import AuthService from '@services/auth.service';
import { HTTP } from '@interfaces/http/codes.interface';

const Admin = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    AuthServiceInstance = Container.get(AuthService);

  AuthServiceInstance.SignUpAdmin(req.body)
    .then(({ user, token }) => {
      const msg = `Usuario ${user.email} Registrado`;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ user, token, msg });
    })
    .catch((err) => next(err));
}

const User = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    AuthServiceInstance = Container.get(AuthService);

  AuthServiceInstance.SignUp(req.body)
    .then(({ user, token }) => {
      const msg = `Usuario ${user.email} Registrado`;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ user, token, msg });
    })
    .catch((err) =>
      next(err));
}


export default {
  /**
   * TODO: Agregar Bloque de ruta a nivel de administrador
   * Registro de Administrador
   */
  Admin,
  /**
   * Registro para usuarios
   */
  User,
}