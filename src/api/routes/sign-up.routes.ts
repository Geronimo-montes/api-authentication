/**
 * TODO: Sign-up Rounte---> Add validators
 */
import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import ctlr from '@api/controller';
import ServerError from '@errors/server.error';


const route = Router();

export default (app: Router) => {
  app.use("/sign-up", route);

  route
    /******/
    // TODO: ADD MIDDLEWARE API TOKEN AND ROLE OWNER
    .post(
      '/admin',
      middlewares.validator(checkSchema(Schemas.auth.signUpPost)),
      ctlr.signUp.Admin,
    )
    /******/
    /**
     * qry :id
     * body email, password
     */
    .post(
      '/user-credentials',
      middlewares.isAuth,
      middlewares.validator(checkSchema({
        // req.query.id ---> _id_user <Reference>
        // req.body.email
        // req.body.password
      })),
      ctlr.signUp.UserCredentials,
    )
    /******/
    .post(
      '/face-id',
      middlewares.isAuth,
      middlewares.uploadFiles.array('files', 20),
      middlewares.validator(checkSchema({
        // req.query.id ---> _id_user <Reference>
      })),
      ctlr.signUp.FaceId,
    )
    .get('', () => { throw new ServerError('METHOD_NOT_ALLOWED') })
    .put('', () => { throw new ServerError('METHOD_NOT_ALLOWED') })
    .delete('', () => { throw new ServerError('METHOD_NOT_ALLOWED') })
}