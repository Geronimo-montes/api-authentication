import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';
import ServerError from '@errors/server.error';


const route = Router();

export default (app: Router) => {
  app.use("/sign-in", route);

  route
    /******/
    .post(
      '/user-credentials',
      middlewares.validator(checkSchema(Schemas.auth.signInPost)),
      controller.signIn.UserCredentials,
    )
    /******/
    .post(
      '/face-id',
      middlewares.uploadFiles.array('files', 20),
      controller.signIn.FaceId,
    )
    /******/
    .post(
      '/pin',
      middlewares.validator(checkSchema({})),
      controller.signIn.Pin,
    )
    .get('', () => { throw new ServerError('METHOD_NOT_ALLOWED') })
    .put('', () => { throw new ServerError('METHOD_NOT_ALLOWED') })
    .delete('', () => { throw new ServerError('METHOD_NOT_ALLOWED') })
}