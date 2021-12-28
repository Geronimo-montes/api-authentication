import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
// SERVICES
import AuthService from '@services/auth.service';

import { HttpCode } from '@interfaces/codes.interface';
import UserService from '@services/user.service';
import { IUser } from '@interfaces/IUser.interface';

/**
 * 
 */
const All = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserService = Container.get(UserService),
    _id_admin = req.token._id;

  console.log();
  Log.info(`⚠️🌐💻  USER--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserService.All(_id_admin)
    .then((users: IUser[]) =>
      res.status(HttpCode.C2XX.OK).json(users))
    .catch((err) => next(err));
}

/**
 * 
 */
const FindOne = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserService = Container.get(UserService),
    _id_admin = req.token._id,
    _id = req.params.id;

  console.log();
  Log.info(`⚠️🌐💻  USER--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserService.FindOne(_id_admin, _id)
    .then((user: IUser) =>
      res.status(HttpCode.C2XX.OK).json(user))
    .catch((err) => next(err));
}

/**
 * 
 */
const UpdeteOne = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserService = Container.get(UserService),
    _id_admin = req.token._id;

  console.log();
  Log.info(`⚠️🌐💻  USER--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserService.UpdateOne(_id_admin)
    .then((user: IUser) =>
      res.status(HttpCode.C2XX.OK).json(user))
    .catch((err) => next(err));
}

/**
 * 
 */
const DeleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserService = Container.get(UserService),
    _id_admin = req.token._id;

  console.log();
  Log.info(`⚠️🌐💻  USER--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserService.UpdateOne(_id_admin)
    .then((user: IUser) =>
      res.status(HttpCode.C2XX.OK).json(user))
    .catch((err) => next(err));
}

export default {
  /**
   * Get data by user.id
   */
  FindOne,
  /**
   * Listado de usuarios registrados rol = 'User
   */
  All,
  /**
  * Update
  */
  UpdeteOne,
  /**
  * Delete
  */
  DeleteOne,

}