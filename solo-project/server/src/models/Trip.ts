//Imports mongoose tools
import { Schema, model, Document } from "mongoose";

export interface ITrip extends Document {
  destination: string;
  date: Date;
  coords: {
    lat: number;
    lng: number;
  };
  weather: {
    temp: number;
    summary: string;
    icon: string;
  };
}

const tripSchema = new Schema<ITrip>({
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  weather: {
    temp: { type: Number, required: true },
    summary: { type: String, required: true },
    icon: { type: String, required: true },
  },
});

export default model<ITrip>("Trip", tripSchema);