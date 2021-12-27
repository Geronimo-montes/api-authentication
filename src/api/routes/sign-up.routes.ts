import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';


const route = Router();

export default (app: Router) => {
  app.use("/sign-up", route);

  route
    /******/
    .post(
      '/admin',
      middlewares.validator(checkSchema(Schemas.auth.signUpPost)),
      controller.signUp.Admin,
    )
    /******/
    .post(
      '/user',
      middlewares.validator(checkSchema(Schemas.auth.signUpPost)),
      controller.signUp.User,
    );
}