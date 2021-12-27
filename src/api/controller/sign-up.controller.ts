import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';

// SERVICES
import AuthService from '@services/auth.service';
import { HTTP } from '@interfaces/http/codes.interface';
import { ERol } from '@interfaces/models/IRol.interface';

const Admin = async (req: Request, res: Response, next: NextFunction) => {
  const
    AuthServiceInstance = Container.get(AuthService);

  AuthServiceInstance.SignUp(req.body, ERol.ADMIN)
    .then(({ user, token, msg }) =>
      res.status(HTTP.C200.Created).json({ user, token, msg }))
    .catch((err) => next(err));
}

const User = async (req: Request, res: Response, next: NextFunction) => {
  const
    AuthServiceInstance = Container.get(AuthService);

  AuthServiceInstance.SignUp(req.body, ERol.USER)
    .then(({ user, token, msg }) =>
      res.status(HTTP.C200.Created).json({ user, token, msg }))
    .catch((err) => next(err));
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