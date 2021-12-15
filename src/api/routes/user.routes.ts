import { Router } from "express"
import biometricFaceRoutes from "./biometric-face";

const route = Router();

export default (app: Router) => {
  app.use('/user', route)

  biometricFaceRoutes(route);

  return app;
}