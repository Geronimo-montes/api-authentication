import { IUser } from "@interfaces/IUser.interface";
import mongoose, { Document } from "mongoose";

const User = new mongoose.Schema(
  {
    _id_admin: String,
    perfil: {
      type: String,
      required: false,
      default: 'static/user.png',
    },
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

    estatus: {
      type: String,
      enum: ['a', 'b'],
      required: false,
      default: 'a',
    }
  }
);

export default mongoose
  .model<IUser & Document>('User', User);