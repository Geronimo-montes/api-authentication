import { Router } from "express"
import addFaceDataRoutes from "@api/routes/biometric-face/add-face-data.routes";
import testFaceDataRoutes from "./test-face-data.routes";

const route = Router();

export default (app: Router) => {
  app.use('/biometric-face', route)

  addFaceDataRoutes(route);
  testFaceDataRoutes(route);

  return app;
}