import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  country: String;
  img: String;
  city: String;
  phone: String;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserSchema extends IUser, mongoose.Document {}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    country: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUserSchema>("User", UserSchema);
