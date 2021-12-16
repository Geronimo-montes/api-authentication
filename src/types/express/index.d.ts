import { Document, Model } from 'mongoose';
import { IUser } from '@interfaces/IUser.interface';
import { ERol } from '@interfaces/IRol.interface';
import { type } from 'os';
import { IDataFace } from '@interfaces/IDataFace.interface';


/**
 * 
 */
declare global {
  namespace Express {
    export interface Request {
      IUser: IUser & Document;
    }


  }

  /**
   * 
   */
  namespace Models {
    /**
     * Interfaces que se refieren a los modelos
     * 
     * TODO: Investigar como estructurar los types en NodeJS 
     * para modificar esta implementación
     */
    export type Roles = ERol;
    export type User = IUser;
    export type dataFace = IDataFace;

    /**
     * 
     */
    export type UserModel = Model<IUser & Document>;
    export type DataFaceModel = Model<IDataFace & Document>;
  }
}
