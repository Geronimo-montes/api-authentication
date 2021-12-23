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
      UserModel: models.IUser & Document;
    }
  }


  namespace models {

    /**
     * 
     */
    enum ERol {
      ADMIN = 'admin',  // Usuario que tiene el poder de modificar los registros
      USER = 'user',    //Solo puede utilizar las rutas de autenticación
    }

    /**
     * 
     */
    interface IUser {
      _id: string;
      role: ERol;
      name: string;
      email: string;
      password?: string;
      salt?: string;
    }

    /**
     * 
     */
    interface IDataFace {
      name: string;
      email: string;
      number_files: number;
    }

    /**
     * 
     */
    type UserModel = Model<IUser & Document>;

    /**
     * 
     */
    type DataFaceModel = Model<IDataFace & Document>;

  }
}