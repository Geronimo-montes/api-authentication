import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';
import ServerError from '@errors/server.error';
import { HttpCode } from '@interfaces/codes.interface';


const route = Router();

export default (app: Router) => {
  app.use('/sign-out', route);

  route
    .delete(
      '',
      (req, res, next) =>
        res.status(HttpCode.C2XX.Created).json(true)
    )
}