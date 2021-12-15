import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import middlewares from '@api/middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/file', route);

  route
    // METODOS DE LA RUTA
    .post(
      // NOMBRE DEL PUNTO FINAL DE LA PETICIÓN
      '/test',
      // <schema>Object Con validaiiones de parametros
      middlewares.validator(checkSchema({})),
      // async Function|<Promise<any>>Object funcion u objeto para el control de la ruta
      async (req: Request, res: Response, next: NextFunction) => {
        const nameMedod = req.url;
        Promise.resolve({})
          .then(({ }) => res.status(201).json({ nameMedod }))
          .catch((err) => next(new Error(err.message)));
      }
    )
    // METODOS DE LA RUTA
    .post(
      // NOMBRE DEL PUNTO FINAL DE LA PETICIÓN
      '/upload',
      middlewares.uploadFiles.single('file'),
      // <schema>Object Con validaiiones de parametros
      middlewares.validator(checkSchema({})),
      // async Function|<Promise<any>>Object funcion u objeto para el control de la ruta
      (req: Request, res: Response, next: NextFunction,) => {
        return res.status(201).json({ file: req.file })
      }
    );
};
