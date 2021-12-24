import { ERol } from "./IRol.interface";

export interface IUser {
  _id: string;
  role: ERol;
  name: string;
  email: string;
  password?: string;
  salt?: string;
}