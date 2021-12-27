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
import { IDataFace } from '@interfaces/models/IDataFace.interface';

const AddFaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService),
    InstanceRecogniceFace = Container.get(RecogniceFaceService),
    _id = req.params.id;


  InstanceAuthService.GetUser({ _id })
    .then((user: IUser) => {
      if (!user)
        throw new UserNotFoundError('Usuario no Registrado');

      return InstanceRecogniceFace.AddFaceToModel(user, req.files);
    })
    .then((face_id: IDataFace) => {
      const msg = `Face Id agregado para ${face_id.email}`;
      Log.info(`⚠️🌐 🌐💻  FaceIdRoutes: Petición Exitosa: '${msg}'  💻🌐 🌐⚠️`);

      return res.status(HTTP.C200.Created).json({ face_id, msg });
    })
    .catch((err) => next(err));
}

const UpdateFaceId = async (req: Request, res: Response, next: NextFunction) => {
  const
    Log: Logger = Container.get('logger'),
    InstanceAuthService = Container.get(AuthService);

  Promise.resolve('Resolve...')
    .then((data) => {
      const msg = ``;
      Log.info(`⚠️🌐 🌐💻  AuthRoute: { Petición Exitosa: '${data}: ${msg}' }  💻🌐 🌐⚠️`);
      res.status(HTTP.C200.Created).json({ msg });
    })
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