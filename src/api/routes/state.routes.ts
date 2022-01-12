

import { HttpCode } from '@interfaces/codes.interface';
import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use("/status", route);

  route
    /**
     * Rutas para verificar el estado del servidor
     */
    .get(
      ``,
      (req, res) =>{
        console.log('GET STATUS API OK')
        return res.status(HttpCode.C2XX.OK).send('Ok')
      } 
    )
    .head(
      ``,
      (req, res) =>{
        console.log('HEAD STATUS API OK')
        return res.status(HttpCode.C2XX.OK).send('Ok')
      } 
    );

}