import { LiteralUnion } from "express-jwt";
import { IFaceId } from "./IFaceId.interface";
import { ERol } from "./IRol.interface";
import { IUserCredentials } from "./IUserCredentials.interface";

export interface IUser {
  _id_admin?: string;
  _id?: string;
  perfil?: string;
  name: string;
  role: ERol;
  _id_face_id?: string | IFaceId;
  _id_credentials?: string | IUserCredentials;
  create_date?: string,
  update_date?: string,
  estatus?: 'a' | 'b';
}