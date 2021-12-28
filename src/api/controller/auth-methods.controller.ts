import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
// SERVICES
import AuthService from '@services/auth.service';
import RecogniceFaceService from '@services/recognice_face.service';
// 
import { HttpCode } from '@interfaces/codes.interface';

/**
 * 
 */
const AddFaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    _id = req.params.id;

  console.log();
  Log.info(`⚠️🌐💻  SIGNUP--> '..${req.url}'  💻🌐⚠️`);

  InstanceRecogniceFace.AddFaceToModel(_id, req.files)
    .then(({ data, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ data, msg }))
    .catch((err) => next(err));
}

/**
 * 
 */
const UpdateFaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService);

  console.log();
  Log.info(`⚠️🌐💻  SIGNUP--> '..${req.url}'  💻🌐⚠️`);

  Promise.resolve({ data: '', msg: 'Resolve...' })
    .then(({ data, msg }) =>
      res.status(HttpCode.C2XX.Created).json({ data, msg }))
    .catch((err) => next(err));
}

export default {
  /**
   * 
   */
  AddFaceId,
  /**
   * 
   */
  UpdateFaceId,
}