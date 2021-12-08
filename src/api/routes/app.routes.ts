import { Router } from "express";
import { saludar } from "./controllers/app.controler";

const route = Router();

export default (app: Router) => {
    app.use("/app", route);

    route
        .get(
            '/saludar',
            saludar,
        );
}
