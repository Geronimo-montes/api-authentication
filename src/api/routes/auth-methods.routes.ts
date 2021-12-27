import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';


const route = Router();

export default (app: Router) => {
  app.use('/auth-method', route);

  route
    /******/
    .post(
      '/face-id/images/:id',
      /* FUNCIONES DE MIDDLEWARE */
      middlewares.isAuth,
      middlewares.multerMiddleware.images.array('images', 20),
      controller.auth_methods.AddFaceId,
    )
    /******/
    .put(
      '/face-id/:id',
      middlewares.validator(checkSchema({})),
      controller.auth_methods.UpdateFaceId,
    )
}