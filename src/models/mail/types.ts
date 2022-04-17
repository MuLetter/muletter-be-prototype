import { Types } from "mongoose";

export type Track = {
  trackId: string;
  trackName: string;
  artistIds: string;
  artistNames: string;
  image: string;
  duration: number;
};

export type Mail = {
  mailBoxId: Types.ObjectId;
  tracks: Track[];
  visualImage: string;
  ecv: number;
  createdAt: string;
};
