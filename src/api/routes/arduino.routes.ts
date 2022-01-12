import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';
import ServerError from '@errors/server.error';
import { Logger } from 'winston';
import Container from 'typedi';
import ArduinoService from '@services/arduino.service';
import { HttpCode } from '@interfaces/codes.interface';


const route = Router();

export default (app: Router) => {
  app.use("/arduino", route);

  route
    /******/
    .post(
      '/user-credentials',
      middlewares.validator(
        checkSchema(Schemas.auth.signInPost),
      ),
      async (req, res, next) => {
        const
          Log: Logger = Container.get('logger'),
          InstanceArduinoService = Container.get(ArduinoService),
          { email, password } = req.body;

        InstanceArduinoService.userCredentials(email, password)
          .then((response) =>
            res.status(HttpCode.C2XX.Created).json(response))
          .catch((err) => next(err));
      }
    )
    /******/
    .post(
      '/face-id',
      middlewares.uploadFiles.array('files', 20),
      async (req, res, next) => {
        const
          Log: Logger = Container.get('logger'),
          InstanceArduinoService = Container.get(ArduinoService);

        InstanceArduinoService.faceID()
          .then((response) =>
            res.status(HttpCode.C2XX.Created).json(response))
          .catch((err) => next(err));
      }
    )
    /******/
    .get(
      '/huella',
      async (req, res, next) => {
        const
          Log: Logger = Container.get('logger'),
          InstanceArduinoService = Container.get(ArduinoService);

        InstanceArduinoService.huella()
          .then((response) =>
            res.status(HttpCode.C2XX.Created).json(response))
          .catch((err) => next(err));
      }
    )
    .get(
      '/huella/:id',
      async (req, res, next) => {
        const
          Log: Logger = Container.get('logger'),
          InstanceArduinoService = Container.get(ArduinoService),
          id = req.params.id;

        InstanceArduinoService.huella_add(id)
          .then((response) =>
            res.status(HttpCode.C2XX.Created).json(response))
          .catch((err) => next(err));
      }
    );
}