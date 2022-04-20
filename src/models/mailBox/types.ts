import { Mail } from "../mail/types";

export type Track = {
  trackId: string;
  trackName: string;
  artistIds: string;
  artistNames: string;
  image: string;
};

export type Coord = {
  x: number;
  y: number;
};

export type MailBox = {
  title: string;
  imagePath?: string;
  tracks: Track[];
  point?: Coord;
  createdAt: string;
  updatedAt: string;
  mail?: Mail;
};
