export interface IUser {
  _id: string;
  role: string;
  name: string;
  email: string;
  password?: string;
  salt?: string;
}
