import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'typedi';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import middlewares from '@api/middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/test-face-data', route)

  route
    .post(
      '/video',
      middlewares.uploadFiles.single('video'),
      middlewares.validator(checkSchema({})),
      async (req: Request, res: Response, next: NextFunction) => {
        const nameMedod = req.url;
        const file = req.file;

        Promise.resolve({})
          .then(({ }) => res.status(201).json({ nameMedod, file }))
          .catch((err) => next(new Error(err.message)));
      }
    )
    .post(
      '/images',
      middlewares.uploadFiles.array('images', 20),
      middlewares.validator(checkSchema({})),
      async (req: Request, res: Response, next: NextFunction) => {
        const nameMedod = req.url;
        const file = req.file;

        Promise.resolve({})
          .then(({ }) => res.status(201).json({ nameMedod, file }))
          .catch((err) => next(new Error(err.message)));
      }
    );
};
