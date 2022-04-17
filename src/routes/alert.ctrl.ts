import Express from "express";

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

        return res.status(200).json({
          message: `Thx :), Back-End Confirm ${id} :)`,
        });
      }
    );
  }
}

export default new AlertRouter().router;
