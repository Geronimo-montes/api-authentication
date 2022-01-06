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
      '',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({
        // req.query.id
      })),
      ctrl.user.FindOne,
    )
    /******/
    .put(
      '',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({
        // req.query.id
      })),
      ctrl.user.AltaBaja,
    )
    /******/
    .put(
      '',
      middlewares.isAuth,
      middlewares.isAdmin,
      middlewares.validator(checkSchema({
        // req.query.id
      })),
      ctrl.user.UpdeteOne,
    )
}