import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import { Logger } from 'winston';
import middlewares from '@api/middlewares';
import AuthService from '@services/auth.service';
import RecogniceFaceService from '@services/recognice_face.service';
// TODO: Delete y generate schema
import { nameValidator } from '@validator/auth.validator';

const route = Router();

export default (app: Router) => {
  app.use('/add-face-data', route)

  route
    /******/
    .post(
      '/video/:name',
      /* FUNCIONES DE MIDDLEWARE */
      middlewares.isAuth,
      middlewares.validator(checkSchema({ name: { ...nameValidator } })),
      middlewares.multerMiddleware.images.array('images', 20),
      /* FUNCION DE LA RUTA */
      middlewares.validator(checkSchema({})),
      async (req: Request, res: Response, next: NextFunction) => {
        const nameMedod = req.url;
        const file = req.file;

        Promise.resolve({})
          .then(({ }) => res.status(201).json({ nameMedod, file }))
          .catch((err) => next(err));
      }
    )
    /******/
    .post(
      '/images/:name',
      /* FUNCIONES DE MIDDLEWARE */
      middlewares.isAuth,
      middlewares.validator(checkSchema({ name: { ...nameValidator } })),
      middlewares.multerMiddleware.images.array('images', 20),
      /* FUNCION DE LA RUTA */
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');
        try {
          const { name, email } = await Container.get(AuthService).GetUser(req.params.name);
          const { msg, dataFace } = await Container.get(RecogniceFaceService)
            .AddFaceToModel({ name, email, files: req.files });

          Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
          res.status(201).json({ msg, dataFace });
        } catch (err) {
          (err) => next(err);
        }
      })
};