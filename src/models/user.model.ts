import { IUser } from "@interfaces/IUser.interface";
import mongoose, { Document } from "mongoose";

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
      enum: ['admin', 'user'],
      default: 'user',
    },
  }
);

export default mongoose
  .model<IUser & Document>('User', User);