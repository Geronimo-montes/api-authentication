import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';

import { ERol } from '@interfaces/IRol.interface';
import { IUser } from '@interfaces/IUser.interface';
import { HttpCode } from '@interfaces/codes.interface';

import UserService from '@services/user.service';

/**
 * 
 */
const Add = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserService = Container.get(UserService),
    _id_admin = req.token._id,
    role = ERol.USER,
    { name } = req.body;

  console.log();
  Log.info(`⚠️🌐💻  USER--> '..${req.url}'  💻🌐⚠️`);

  // throw new UserError('USER_DUPLICATE');
  InstanceUserService.Add({ _id_admin, name, role })
    .then(({ data, msg }: { data: IUser, msg: string }) =>
      res.status(HttpCode.C2XX.OK).json({ data, msg }))
    .catch((err) => next(err));
}

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
    _id = <string>req.query.id;

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
    _id = <string>req.query.id,
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
const AltaBaja = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceUserService = Container.get(UserService),
    _id_admin = req.token._id,
    _id = <string>req.query.id,
    { estatus } = req.body;


  console.log();
  Log.info(`⚠️🌐💻  USER--> '..${req.url}'  💻🌐⚠️`);

  InstanceUserService.AltaBaja(_id_admin, _id, estatus)
    .then((data) =>
      res.status(HttpCode.C2XX.OK).json(data))
    .catch((err) => next(err));
}

export default {
  /**
   * Registra un nuevo usuario
   */
  Add,
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
  AltaBaja,

}