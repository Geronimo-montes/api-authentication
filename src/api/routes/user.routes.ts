import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import ctrl from '@api/controller';


const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route
    /******/
    .post(
      '',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({
        // req.body.name
      })),
      ctrl.user.Add,
    )
    /******/
    .get(
      '/all',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      ctrl.user.All,
    )
    /******/
    .get(
      '/:id',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      ctrl.user.FindOne,
    )
    /******/
    .put(
      '/:id',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      ctrl.user.AltaBaja,
    )
    /******/
    .put(
      '/:id',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({})),
      ctrl.user.UpdeteOne,
    )
}