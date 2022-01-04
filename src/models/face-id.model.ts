
import { IFaceId } from "@interfaces/IFaceId.interface";
import mongoose, { Document } from "mongoose";

const FaceId = new mongoose.Schema(
  {
    _id_user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    number_files: {
      type: Number,
    },

    index: Number,

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
  .model<IFaceId & Document>('FaceId', FaceId);