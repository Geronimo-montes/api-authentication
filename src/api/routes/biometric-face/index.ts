import { Router } from "express"
import addFaceDataRoutes from "@api/routes/biometric-face/add-face-data.routes";

const route = Router();

export default (app: Router) => {
  app.use('/biometric-face', route)

  addFaceDataRoutes(route);

  return app;
}