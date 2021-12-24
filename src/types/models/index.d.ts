import { IDataFace } from '@interfaces/IDataFace.interface';
import { IUser } from '@interfaces/IUser.interface';
import { Document, Model } from 'mongoose';

declare global {
  namespace Models {
    type UserModel = Model<IUser & Document>;

    type DataFaceModel = Model<IDataFace & Document>;
  }
}
