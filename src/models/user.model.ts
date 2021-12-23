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
      enum: ['admin', 'user'],
      default: 'user',
      // enum: [models.ERol.ADMIN, models.ERol.USER],
      // default: models.ERol.USER,
    },
  }
);

export default mongoose
  .model<models.IUser & mongoose.Document>('User', User);