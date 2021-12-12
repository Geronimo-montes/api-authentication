import { Router } from 'express';
import validator from '@api/middlewares/validator.middleware';
import { singInSchemaPost, singUpSchemaPost } from '@validator/Schemas/app.schema';
import { checkSchema } from 'express-validator';
import { SignUp, SignIn } from './controllers/auth.controller';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route)
  route
    // METODOS DE LA RUTA
    .post(
      '/signup',
      validator(checkSchema(singUpSchemaPost)),
      SignUp
    )
    .post(
      '/signin',
      validator(checkSchema(singInSchemaPost)),
      SignIn
    )
    .delete(
      '/signout',
      validator(checkSchema({})),
      () => { }
    );
};
