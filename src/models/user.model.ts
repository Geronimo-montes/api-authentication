import { ERol } from '@interfaces/IRol.interface';
import { IUser } from '@interfaces/IUser.interface';
import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'Proporcione un email'],
      lowercase: true,
      unique: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      enum: [ERol.ADMIN, ERol.USER],
      default: ERol.USER,
    },
  }
);

export default mongoose
  .model<IUser & mongoose.Document>('User', User);