import mongoose, { Types } from "mongoose";
import { IRoomSchema } from "./Room";

export interface ILodging {
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  description: string;
  rating: number;
  rooms: Types.DocumentArray<IRoomSchema>;
  cheapestPrice: number;
  featured: boolean;
}

interface ILodgingSchema extends ILodging, mongoose.Document {
  city_lower: string;
}

const LodgingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  city_lower: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  photos: {
    type: [String]
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ],
  cheapestPrice: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
});

LodgingSchema.pre<ILodgingSchema>("save", function (next) {
  this.city_lower = this.city.toLowerCase();
  next();
});

export default mongoose.model<ILodgingSchema>("Lodging", LodgingSchema);
