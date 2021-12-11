import { Router } from 'express';
import validator from '@api/middlewares/validator-handler.middleware';
import { singUpSchemaPost } from '@validator/Schemas/app.schema';
import { checkSchema } from 'express-validator';
import { SingUp } from './controllers/auth.controller';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route)
  route
    // METODOS DE LA RUTA
    .post(
      '/signup', // RUTA
      validator(checkSchema(singUpSchemaPost)), // VALIDADORES DE PARAMETROS
      SingUp // METODO
    );
};
