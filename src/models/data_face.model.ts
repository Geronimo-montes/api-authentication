import { IDataFace } from '@interfaces/IDataFace.interface';
import mongoose from "mongoose";

const DataFace = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      required: [true, 'Proporcione un email'],
      lowercase: true,
      unique: true,
      index: true,
    },

    number_files: {
      type: Number,
    }
  }
);

export default mongoose
  .model<IDataFace & mongoose.Document>('DataFace', DataFace);