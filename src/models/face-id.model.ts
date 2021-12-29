
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
    }
  }
);

export default mongoose
  .model<IFaceId & Document>('FaceId', FaceId);