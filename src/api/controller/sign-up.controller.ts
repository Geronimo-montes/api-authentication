import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';

// SERVICES
import { HttpCode } from '@interfaces/codes.interface';
import { ERol } from '@interfaces/IRol.interface';
import FaceIdService from '@services/face-id.service';
import ServerError from '@errors/server.error';
import UserCredentialsService from '@services/user-credentials.service';
import { IUserCredentials } from '@interfaces/IUserCredentials.interface';
import UserService from '@services/user.service';
import { IUser } from '@interfaces/IUser.interface';

/**
 * TODO: TU no eres de aqui
 */
const Admin = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    UserCredentialsInstance = Container.get(UserCredentialsService),
    InstanceUserService = Container.get(UserService),
    { name, email, password } = req.body,
    role = ERol.ADMIN,
    _id_admin = '0';

  console.log();
  Log.info(`⚠️🌐💻  SINGUP--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserService.Add({ _id_admin, name, role })
    .then(({ data }: { data: IUser, msg: string }) =>
      UserCredentialsInstance.Add({ _id_user: data._id, email, password }))
    .then(({ data, msg }: { data: IUserCredentials, msg: string }) =>
      res.status(HttpCode.C2XX.Created).json({ data, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const UserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    UserCredentialsInstance = Container.get(UserCredentialsService),
    { email, password } = req.body,
    _id_user = <string>req.query.id;

  console.log();
  Log.info(`⚠️🌐💻  SINGUP--> '..${req.url}'  💻🌐⚠️`);

  UserCredentialsInstance.Add({ _id_user, email, password })
    .then(({ data, msg }: { data: IUserCredentials, msg: string }) =>
      res.status(HttpCode.C2XX.Created).json({ user_credentials: data, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const FaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceFaceId = Container.get(FaceIdService),
    _id = String(req.query.id),
    direct_to_db = Boolean(req.query.direct_to_db);

  console.log({ direct_to_db });
  Log.info(`⚠️🌐💻  SIGNUP--> '..${req.url}'  💻🌐⚠️`);

  InstanceFaceId.Add(_id, req.files, direct_to_db)
    .then(({ data, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ data, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const Pin = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger');

  console.log();
  Log.info(`⚠️🌐💻  SINGIN--> '..${req.url}'  💻🌐⚠️`);

  return new ServerError('METOD_NOT_IMPLEMENT');
}

export default {
  /**
   * TODO: Agregar Bloqueo de ruta a nivel de administrador
   * Registro de Administrador
   */
  Admin,
  /**
   * Registra el metodo user credentials
   */
  UserCredentials,
  /**
   * Registra el metodo Face-Id al usuario y lo agrega al modelo
   */
  FaceId,
  /**
   * 
   */
  Pin,
}