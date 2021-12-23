import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';

import middlewares from '@api/middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/metods', route);

  route
    .get(
      '/',
      middlewares.isAuth,
      (req: Request, res: Response, next: NextFunction,) => {
        return res.status(201).json(
          {
            'metods': {
              'admin': {
                'auth': [
                  '/admin/auth/sign-up-user',
                  '/admin/auth/sign-in',
                  '/admin/auth/sign-out',
                  '/admin/auth/refresh-sesion',
                  '/admin/auth/edit-profile'
                ]
              },
              'user': {
                'auth': [
                  '/user/auth/sign-in/email',
                  '/user/auth/sign-in/pin',
                  '/user/auth/sign-in/biometric-face/video',
                  '/user/auth/sign-in/biometric-face/images',
                  '/user/auth/sign-out',
                  '/user/auth/refresh-sesion',
                  '/user/auth/edit-profile',
                ],
                'face-data': [
                  '/user/biometric-face/add-face-data/video',
                  '/user/biometric-face/add-face-data/images',

                  '/user/biometric-face/update-face-data/video',
                  '/user/biometric-face/update-face-data/images',

                  '/user/biometric-face/delete-face-data/video',
                  '/user/biometric-face/delete-face-data/images',

                  '/user/biometric-face/test-face-data/video',
                  '/user/biometric-face/test-face-data/images',

                ],
                'pin-data': [
                  '/user/pin/add-pin-data',
                  '/user/pin/update-pin-data',
                  '/user/pin/delete-pin-data',
                  '/user/pin/test-pin-data'
                ],
              }
            }
          }
        );
      }
    )
}
