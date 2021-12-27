import { Logger } from 'winston';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
// SERVICES
import AuthService from '@services/auth.service';
import RecogniceFaceService from '@services/recognice_face.service';

import { HTTP } from '@interfaces/http/codes.interface';
import { IUser } from '@interfaces/models/IUser.interface';
import { UserNotFoundError } from '@interfaces/models/models-errors.iterface';

const AddFaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    InstanceAuthService = Container.get(AuthService),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    _id = req.params.id;

  InstanceAuthService.GetUser({ _id })
    .then((user: IUser) => {
      if (!user)
        throw new UserNotFoundError('Usuario no Registrado');

      return InstanceRecogniceFace.AddFaceToModel(user, req.files);
    })
    .then(({ data, msg }) =>
      res.status(HTTP.C200.Created).json({ data, msg }))
    .catch((err) => next(err));
}

const UpdateFaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    InstanceAuthService = Container.get(AuthService);

  Promise.resolve({ data: '', msg: 'Resolve...' })
    .then(({ data, msg }) =>
      res.status(HTTP.C200.Created).json({ data, msg }))
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