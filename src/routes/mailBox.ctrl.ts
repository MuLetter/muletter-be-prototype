import Express from "express";
import multer from "multer";
import path from "path";
import moment from "moment-timezone";
import { MailBox, Track } from "../models/mailBox/types";
import MailBoxModel from "../models/mailBox";
import axios from "axios";
import MailModel from "../models/mail";

const upload: Express.RequestHandler = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "static");
    },
    filename: (req, file, cb) => {
      cb(null, `mailbox-image-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
}).single("image");

class MailBoxRouter {
  router: Express.Router;

  constructor() {
    this.router = Express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.router.get(
      "/",
      async (req: Express.Request, res: Express.Response) => {
        const mailBox = await MailBoxModel.find({}).sort({ updatedAt: -1 });

        return res.status(200).json({
          mailBoxes: mailBox,
        });
      }
    );

    this.router.get(
      "/:id",
      async (req: Express.Request, res: Express.Response) => {
        const { id } = req.params;
        const mailBox = await MailBoxModel.findOne({
          _id: id,
        });
        let mail: any = await MailModel.find({
          mailBoxId: id,
        })
          .sort({ createdAt: -1 })
          .limit(1);

        if (mail.length === 1) {
          mail = mail[0];
          mail.tracks = mail.tracks.slice(0, 10);
        } else {
          mail = null;
        }

        return res.status(200).json({
          mailBox,
          mail,
        });
      }
    );

    this.router.post(
      "/",
      upload,
      async (req: Express.Request, res: Express.Response) => {
        try {
          const imagePath = req.file && "/static/" + req.file.filename;
          let { title, tracks } = req.body;
          tracks = JSON.parse(tracks) as Track;
          const createdAt = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

          const _mailBox: MailBox = {
            title,
            tracks,
            imagePath,
            createdAt,
            updatedAt: createdAt,
          };

          const mailBox = await MailBoxModel.create(_mailBox);
          const id = mailBox._id;

          const mlServerUri = process.env.ML_SERVER_URI!;
          console.log(
            `[BackEnd Server Message] Write ${id} a letter in the mailbox`
          );
          const requestRes = await axios.post(mlServerUri, {
            id,
          });
          console.log(`[ML Server Message] ${requestRes.data.message}`);

          return res.status(201).json({
            mailBox,
          });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            message: "Sorry :( It's Server Error.",
          });
        }
      }
    );
  }
}

export default new MailBoxRouter().router;
