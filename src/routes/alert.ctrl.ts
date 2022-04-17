import Express from "express";
import { Socket } from "socket.io";

class AlertRouter {
  router: Express.Router;

  constructor() {
    this.router = Express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.router.get(
      "/success/:id",
      (req: Express.Request, res: Express.Response) => {
        const { id } = req.params;
        const socket = req.app.get("socket") as Socket;
        socket.emit("alert", "편지 작성이 완료되었습니다.");

        return res.status(200).json({
          message: `Thx :), Back-End Confirm ${id} :)`,
        });
      }
    );
  }
}

export default new AlertRouter().router;
