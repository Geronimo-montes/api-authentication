import { IUser } from '@interfaces/IUser.interface';
import { Document, Model } from 'mongoose';

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

  // namespace Models {
  //   export type UserModel = Model<IUser & Document>
  // }
}
