import { IUserCredentials } from "@interfaces/IUserCredentials.interface";
import mongoose, { Document } from "mongoose";

/***
 * TODO: Cambiar nombre por user._id en todos los metodos de validacion. Mod Modelo Face-Id
 */
const UserCredentials = new mongoose.Schema(
  {
    _id_user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    email: {
      type: String,
      required: [true, 'Proporcione un email'],
      lowercase: true,
      unique: true,
    },

    password: String,

    salt: String,

    create_date: {
      type: Date,
      required: false,
      default: new Date(),
    },

    update_date: {
      type: Date,
      required: false,
      default: new Date(),
    },
  }
);

export default mongoose
  .model<IUserCredentials & Document>('UserCredentials', UserCredentials);