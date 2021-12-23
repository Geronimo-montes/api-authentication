import { Document, Model } from 'mongoose';

export = models;

declare namespace models {

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