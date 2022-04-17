import Express from "express";
import MailModel from "../models/mail";
import { Track } from "../models/mail/types";
import MailBoxModel from "../models/mailBox";

class InfoRouter {
  router: Express.Router;

  constructor() {
    this.router = Express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.router.get(
      "/data",
      async (req: Express.Request, res: Express.Response) => {
        const mailCount = await MailModel.countDocuments();
        const mailBoxCount = await MailBoxModel.countDocuments();

        let randomMail: any = await MailModel.find({});
        randomMail = randomMail[Math.floor(Math.random() * randomMail.length)];

        const tracks = randomMail.tracks;
        let randomTracks: Track[] = [];
        while (true) {
          const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
          const check = randomTracks.filter(
            (track) => track.trackId === randomTrack.trackId
          );

          if (check.length === 1) continue;
          else {
            randomTracks.push(randomTrack);

            if (randomTracks.length === 3) break;
          }
        }

        return res.status(200).json({
          mailCount,
          mailBoxCount,
          randomTracks,
        });
      }
    );
  }
}

export default new InfoRouter().router;
