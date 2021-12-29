import { IUser } from "@interfaces/IUser.interface";
import mongoose, { Document } from "mongoose";

const User = new mongoose.Schema(
  {
    _id_admin: String,

    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      unique: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    _id_face_id: {
      type: mongoose.Types.ObjectId,
      ref: "FaceId",
      required: false,
      default: null,
    },

    _id_credentials: {
      type: mongoose.Types.ObjectId,
      ref: "UserCredentials",
      required: false,
      default: null,
    },
  }
);

export default mongoose
  .model<IUser & Document>('User', User);