import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';


const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route
    /******/
    .get(
      '/all',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      controller.user.All,
    )
    /******/
    .get(
      '/:id',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      controller.user.FindOne,
    )
    /******/
    .put(
      '/:id',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      controller.user.UpdeteOne,
    )
    /******/
    .delete(
      '/:id',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      controller.user.DeleteOne,
    )
}