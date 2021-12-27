import { IDataFace } from '@interfaces/models/IDataFace.interface';
import { IUser } from '@interfaces/models/IUser.interface';
import { Document, Model } from 'mongoose';

declare global {

  /**
   * @namespace Models
   */
  namespace Models {

    /**
     * @interface UserModel
     */
    export type UserModel = Model<IUser & Document>;

    /**
     * @interface DataFaceModel
     */
    export type DataFaceModel = Model<IDataFace & Document>;

  }
}
