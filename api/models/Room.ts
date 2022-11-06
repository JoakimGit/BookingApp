import mongoose from "mongoose";

export interface IRoom {
  title: string;
  price: number;
  maxPeople: number;
  description: string;
  roomNumbers: [{ number: string; unavailableDates: [Date] }];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomSchema extends IRoom, mongoose.Document {}

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    maxPeople: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: false
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IRoomSchema>("Room", RoomSchema);
