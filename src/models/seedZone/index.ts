import { model, Schema } from "mongoose";
import { SeedZone } from "./types";

const schema = new Schema<SeedZone>(
  {
    trackId: { type: String, required: true },
    danceability: { type: Number, required: true },
    energy: { type: Number, required: true },
    key: { type: Number, required: true },
    loudness: { type: Number, required: true },
    speechiness: { type: Number, required: true },
    acousticness: { type: Number, required: true },
    instrumentalness: { type: Number, required: true },
    liveness: { type: Number, required: true },
    valence: { type: Number, required: true },
    tempo: { type: Number, required: true },
  },
  {
    collection: "SeedZone",
  }
);

const SeedZoneModel = model<SeedZone>("SeedZone", schema);
export default SeedZoneModel;
