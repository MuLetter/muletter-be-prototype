import { model, Schema } from "mongoose";
import { Mail, Track } from "./types";

const trackSchema = new Schema<Track>({
  trackId: { type: String, required: true },
  trackName: { type: String, required: true },
  artistIds: { type: String, required: true },
  artistNames: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: Number, required: true },
});

const schema = new Schema<Mail>(
  {
    mailBoxId: { type: Schema.Types.ObjectId, required: true },
    tracks: [trackSchema],
    visualImage: { type: String, required: true },
    ecv: { type: Number, required: true },
    createdAt: { type: String, required: true },
  },
  { collection: "Mail" }
);
const MailModel = model<Mail>("Mail", schema);
export default MailModel;
