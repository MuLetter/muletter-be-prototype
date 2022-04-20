import Express from "express";
import MailBoxModel from "../models/mailBox";

class MapRouter {
  router: Express.Router;

  constructor() {
    this.router = Express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.router.get(
      "/",
      async (req: Express.Request, res: Express.Response) => {
        try {
          const { centerX, centerY, pointOffset } = req.query;

          const mailBoxes = await MailBoxModel.find({
            $and: [
              {
                $and: [
                  {
                    "point.x": {
                      $lte:
                        parseFloat(centerX as string) +
                        parseFloat(pointOffset as string),
                    },
                  },
                  {
                    "point.x": {
                      $gte:
                        parseFloat(centerX as string) -
                        parseFloat(pointOffset as string),
                    },
                  },
                ],
              },
              {
                $and: [
                  {
                    "point.y": {
                      $lte:
                        parseFloat(centerY as string) +
                        parseFloat(pointOffset as string),
                    },
                  },
                  {
                    "point.y": {
                      $gte:
                        parseFloat(centerY as string) -
                        parseFloat(pointOffset as string),
                    },
                  },
                ],
              },
            ],
          })
            .limit(10)
            .skip(0);

          return res.status(200).json({
            mailBoxes,
          });
        } catch (err) {
          return res.status(500).json({
            message: "Sorry :(, ServerError,,",
          });
        }
      }
    );
  }
}

export default new MapRouter().router;
