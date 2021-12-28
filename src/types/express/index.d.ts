
import { Document, Model } from 'mongoose';
import { IUser } from '@interfaces/IUser.interface';
import { C1XX, C2XX, C3XX, C4XX, C5XX } from '@interfaces/codes.interface';
import { IDataFace } from '@interfaces/IDataFace.interface';

import { AuthenticateErrorCode } from '@errors/auth.error';
import { UserErrorCode } from '@errors/user.error';
import { ServerErrorCode } from '@errors/server.error';
import { FaceIdErrorCode } from '@errors/face_id.error';

declare global {
  namespace Express {
    interface Request {
      curren_user: IUser & Document;
      token: IUser & Document;
    }
  }

  namespace Models {
    type UserModel = Model<IUser & Document>;
    type DataFaceModel = Model<IDataFace & Document>;

  }

  namespace HTTP {
    type Code = C1XX | C2XX | C3XX | C4XX | C5XX;
  }

  namespace ERROR {
    type AuthCode = AuthenticateErrorCode;
    type UserCode = UserErrorCode;
    type ServerCode = ServerErrorCode;
    type FaceIdCode = FaceIdErrorCode;
  }
}
