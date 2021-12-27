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
      middlewares.validator(checkSchema({})),
      controller.user.FindOne,
    )
    /******/
    .get(
      '/:id',
      middlewares.validator(checkSchema({})),
      controller.user.All,
    )
    /******/
    .put(
      '/:id',
      middlewares.validator(checkSchema({})),
      controller.user.UpdeteOne,
    )
    /******/
    .delete(
      '/:id',
      middlewares.validator(checkSchema({})),
      controller.user.DeleteOne,
    )
}