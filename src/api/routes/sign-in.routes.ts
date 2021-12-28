import { Router } from 'express';
import { checkSchema } from 'express-validator';
// MIDDLEWARES
import Schemas from "@validator";
import middlewares from "@api/middlewares";
import controller from '@api/controller';


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
      '/face-id/images',
      middlewares.multer.images.array('images', 20),
      controller.signIn.FaceId_Imgs,
    )
    /******/
    .post(
      '/face-id/video',
      middlewares.multer.video.single('video'),
      controller.signIn.FaceId_Video,
    )
    /******/
    .post(
      '/pin',
      middlewares.validator(checkSchema({})),
      controller.signIn.Pin,
    )
}