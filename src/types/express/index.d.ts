import { IUser } from '@interfaces/models/IUser.interface';
import { Document } from 'mongoose';

declare global {

  /**
   * @namespace Express
   */
  namespace Express {

    /**
     * @interface Request 
     * @description Objeto que nos permiete manipular la peticiones que se generen en el uso de nuestra aplicación
     */
    export interface Request {
      User: IUser & Document;
    }
  }
}
