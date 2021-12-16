import { Logger } from 'winston';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import middlewares from '@api/middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/{file}', route);

  route
    // METODOS DE LA RUTA
    .post(
      // NOMBRE DEL PUNTO FINAL DE LA PETICIÓN
      '/{test}',
      // <schema>Object Con validaiiones de parametros
      middlewares.validator(checkSchema({})),
      // async Function|<Promise<any>>Object funcion u objeto para el control de la ruta
      async (req: Request, res: Response, next: NextFunction) => {
        const Log: Logger = Container.get('logger');

        Promise.resolve({})
          .then(({ }) => {
            Log.info(`⚠️🌐 🌐💻  Info: Resolucion Exitosa: '${req.url}'  💻🌐 🌐⚠️`);
            res.status(201).json({ nameMedod: req.url });
          })
          .catch((err) => next(new Error(err.message)));
      }
    )
};
